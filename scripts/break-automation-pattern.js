#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper: Parse frontmatter and content
function parseMdx(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatterStr = match[1];
  const body = match[2];

  // Simple YAML parser for our use case
  const frontmatter = {};
  const lines = frontmatterStr.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const trimmedKey = key.trim();
      let value = valueParts.join(':').trim();

      // Remove quotes
      if ((value.startsWith("'") && value.endsWith("'")) ||
          (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      }

      frontmatter[trimmedKey] = value;
    }
  }

  return { frontmatter, body };
}

// Helper: Generate random date in range
function getRandomDate(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const random = start + Math.random() * (end - start);
  return new Date(random).toISOString().split('T')[0];
}

// Helper: Add days to date
function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Helper: Determine template type (A=40%, B=35%, C=25%)
function getTemplateType(index) {
  const rand = Math.random() * 100;
  if (rand < 40) return 'A';
  if (rand < 75) return 'B';
  return 'C';
}

// Helper: Reorganize content sections for different templates
function reorganizeSections(body, templateType) {
  // Extract all heading sections
  const sections = body.split(/(?=^## )/m).filter(s => s.trim());

  if (templateType === 'B') {
    // Move FAQ and Key Takeaways - and add myth-busting
    // This is a simplified approach - just reorganize what exists
    return body; // In real implementation, would do more complex reorganization
  }

  if (templateType === 'C') {
    // Add research callouts
    return body; // In real implementation, would add research callout boxes
  }

  return body;
}

// Helper: Generate YAML-compliant date string
function formatDate(dateStr) {
  return `'${dateStr}'`;
}

// Helper: Build new frontmatter
function buildFrontmatter(original, publishedAt, updatedAt) {
  const lines = [];
  const keyOrder = [
    'title', 'description', 'image', 'imageAlt', 'publishedAt', 'updatedAt',
    'author', 'category', 'tags', 'readingTime', 'featured', 'productName', 'brand',
    'modelYear', 'priceRange', 'ourScore', 'starRating', 'bottomLine', 'pros', 'cons',
    'affiliateLinks', 'specsTable', 'faqs'
  ];

  // Build ordered frontmatter
  for (const key of keyOrder) {
    if (original[key] !== undefined) {
      if (key === 'publishedAt' || key === 'updatedAt') {
        lines.push(`${key}: '${key === 'publishedAt' ? publishedAt : updatedAt}'`);
      } else if (key === 'tags' || key === 'pros' || key === 'cons') {
        // Keep arrays as-is
        lines.push(`${key}:`);
        const items = original[key].split(',').map(s => s.trim());
        for (const item of items) {
          lines.push(`  - ${item}`);
        }
      } else if (key === 'affiliateLinks' || key === 'specsTable' || key === 'faqs') {
        // Skip complex objects - keep as string
        if (original[key]) {
          lines.push(`${key}: ${original[key]}`);
        }
      } else if (typeof original[key] === 'number') {
        lines.push(`${key}: ${original[key]}`);
      } else {
        lines.push(`${key}: '${original[key]}'`);
      }
    }
  }

  return lines.join('\n');
}

// Main processing function
async function processFiles() {
  const contentDir = '/c/AIGenXLab/Projects/Project-Baby/content';

  // Get all blog articles
  const blogFiles = fs.readdirSync(path.join(contentDir, 'blog'))
    .filter(f => f.endsWith('.mdx'))
    .map(f => ({
      path: path.join(contentDir, 'blog', f),
      type: 'blog',
      name: f
    }));

  // Get all product reviews
  const productFiles = [];
  const productCatsDir = path.join(contentDir, 'products');
  const categories = fs.readdirSync(productCatsDir).filter(f => {
    return fs.statSync(path.join(productCatsDir, f)).isDirectory();
  });

  for (const cat of categories) {
    const catDir = path.join(productCatsDir, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.mdx'));
    for (const f of files) {
      productFiles.push({
        path: path.join(catDir, f),
        type: 'product',
        category: cat,
        name: f
      });
    }
  }

  console.log(`Found ${blogFiles.length} blog articles and ${productFiles.length} product reviews`);

  // Generate date ranges
  const blogStartDate = '2026-04-20';
  const blogEndDate = '2026-06-20';
  const productStartDate = '2026-04-15';
  const productEndDate = '2026-06-15';

  let processedCount = 0;

  // Process blog articles
  for (let i = 0; i < blogFiles.length; i++) {
    const file = blogFiles[i];
    try {
      const content = fs.readFileSync(file.path, 'utf8');
      const parsed = parseMdx(content);

      if (!parsed) continue;

      // Generate dates for blog
      const publishedAt = getRandomDate(blogStartDate, blogEndDate);
      let updatedAt = publishedAt;

      // Vary updates - ~60% same, ~25% 5-10 days later, ~15% 14-21 days later
      const updateRand = Math.random();
      if (updateRand > 0.60 && updateRand <= 0.85) {
        updatedAt = addDays(publishedAt, 5 + Math.floor(Math.random() * 6));
      } else if (updateRand > 0.85) {
        updatedAt = addDays(publishedAt, 14 + Math.floor(Math.random() * 8));
      }

      // Build new frontmatter
      const newFrontmatter = buildFrontmatter(parsed.frontmatter, publishedAt, updatedAt);
      const newContent = `---\n${newFrontmatter}\n---\n${parsed.body}`;

      fs.writeFileSync(file.path, newContent, 'utf8');
      processedCount++;

      if (processedCount % 20 === 0) {
        console.log(`Processed ${processedCount} files...`);
      }
    } catch (err) {
      console.error(`Error processing ${file.name}: ${err.message}`);
    }
  }

  // Process product reviews
  for (let i = 0; i < productFiles.length; i++) {
    const file = productFiles[i];
    try {
      const content = fs.readFileSync(file.path, 'utf8');
      const parsed = parseMdx(content);

      if (!parsed) continue;

      // Generate dates for products
      const publishedAt = getRandomDate(productStartDate, productEndDate);
      let updatedAt = publishedAt;

      // Vary updates - ~70% same, ~20% 3-7 days later, ~10% 10-18 days later
      const updateRand = Math.random();
      if (updateRand > 0.70 && updateRand <= 0.90) {
        updatedAt = addDays(publishedAt, 3 + Math.floor(Math.random() * 5));
      } else if (updateRand > 0.90) {
        updatedAt = addDays(publishedAt, 10 + Math.floor(Math.random() * 9));
      }

      // Build new frontmatter
      const newFrontmatter = buildFrontmatter(parsed.frontmatter, publishedAt, updatedAt);
      const newContent = `---\n${newFrontmatter}\n---\n${parsed.body}`;

      fs.writeFileSync(file.path, newContent, 'utf8');
      processedCount++;

      if (processedCount % 20 === 0) {
        console.log(`Processed ${processedCount} files...`);
      }
    } catch (err) {
      console.error(`Error processing ${file.name}: ${err.message}`);
    }
  }

  console.log(`\nSuccess! Processed ${processedCount} total files`);
  console.log(`Blog articles: published 2026-04-20 to 2026-06-20`);
  console.log(`Product reviews: published 2026-04-15 to 2026-06-15`);
  console.log(`Update dates varied: 60-75% same as published, 15-25% 5-10 days later, 10-15% 14-21 days later`);
}

processFiles().catch(console.error);
