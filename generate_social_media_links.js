#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Site URL
const SITE_URL = 'https://pregnancysprout.com';

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = match[1];
  const result = {};
  
  const lines = frontmatter.split('\n');
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    
    if (key && value) {
      result[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  
  return result;
}

function findMdxFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(findMdxFiles(fullPath));
    } else if (item.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function getSlug(filePath) {
  if (filePath.includes('\blog\')) {
    const match = filePath.match(/blog\([^\]+)\.mdx/);
    return match ? `/blog/${match[1]}` : null;
  } else if (filePath.includes('\products\')) {
    const match = filePath.match(/products\([^\]+)\([^\]+)\.mdx/);
    return match ? `/products/${match[1]}/${match[2]}` : null;
  }
  return null;
}

function getType(filePath) {
  return filePath.includes('\blog\') ? 'Blog' : 'Product Review';
}

function getCategory(filePath) {
  if (filePath.includes('\blog\')) {
    return 'General';
  } else if (filePath.includes('\products\')) {
    const match = filePath.match(/products\([^\]+)\/);
    return match ? match[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Product';
  }
  return 'Other';
}

function main() {
  const contentDir = path.join(__dirname, 'content');
  const allFiles = findMdxFiles(contentDir);

  const articles = [];

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const frontmatter = extractFrontmatter(content);
      
      if (!frontmatter) continue;

      const slug = getSlug(file);
      if (!slug) continue;

      const url = SITE_URL + slug;
      const type = getType(file);
      const category = getCategory(file);
      const title = frontmatter.title || 'Untitled';
      const description = frontmatter.description || 'Check out this article';

      articles.push({
        Type: type,
        Category: category,
        Title: title,
        URL: url,
        Description: description,
        'Social Media Caption': `${title}\n\n${description}\n\n${url}`
      });
    } catch (err) {
      console.error(`Error processing ${file}: ${err.message}`);
    }
  }

  // Sort by type, then category, then title
  articles.sort((a, b) => {
    if (a.Type !== b.Type) return a.Type.localeCompare(b.Type);
    if (a.Category !== b.Category) return a.Category.localeCompare(b.Category);
    return a.Title.localeCompare(b.Title);
  });

  // Create CSV
  const headers = ['Type', 'Category', 'Title', 'URL', 'Description', 'Social Media Caption'];
  const csv = [
    headers.join(','),
    ...articles.map(article => [
      article.Type,
      article.Category,
      `"${article.Title.replace(/"/g, '""')}"`,
      article.URL,
      `"${article.Description.replace(/"/g, '""')}"`,
      `"${article['Social Media Caption'].replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  // Write CSV file
  const outputFile = path.join(__dirname, 'social_media_links.csv');
  fs.writeFileSync(outputFile, csv, 'utf8');

  console.log(`\n✅ CSV file created: social_media_links.csv`);
  console.log(`📊 Total articles: ${articles.length}`);
  console.log(`   - Blog articles: ${articles.filter(a => a.Type === 'Blog').length}`);
  console.log(`   - Product reviews: ${articles.filter(a => a.Type === 'Product Review').length}`);
  console.log(`\n📁 File location: ${outputFile}`);
}

main();
