#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DISCLOSURE = `> **Fact-Checked & Transparent:** This article was written with AI assistance and fact-checked against current CDC, WHO, ACOG, and NHS guidelines. All health information is based on authoritative medical sources. Last verified: June 2026.`;

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

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if disclosure already exists
    if (content.includes('Fact-Checked & Transparent')) {
      return { status: 'skipped' };
    }

    // Find first ## heading
    const headingIndex = content.indexOf('\n## ');
    if (headingIndex === -1) {
      return { status: 'error', reason: 'no H2 heading' };
    }

    // Insert disclosure before first heading
    const before = content.substring(0, headingIndex + 1);
    const after = content.substring(headingIndex + 1);

    const newContent = before + DISCLOSURE + '\n\n' + after;

    fs.writeFileSync(filePath, newContent, 'utf8');
    return { status: 'updated' };
  } catch (err) {
    return { status: 'error', reason: err.message };
  }
}

function main() {
  const contentDir = path.join(__dirname, 'content');

  const blogDir = path.join(contentDir, 'blog');
  const productsDir = path.join(contentDir, 'products');

  const blogFiles = findMdxFiles(blogDir);
  const productFiles = findMdxFiles(productsDir);

  const allFiles = [...blogFiles, ...productFiles];

  console.log(`Found ${allFiles.length} MDX files\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  allFiles.forEach((file, idx) => {
    const result = processFile(file);

    if (result.status === 'updated') {
      updated++;
    } else if (result.status === 'skipped') {
      skipped++;
    } else {
      errors++;
    }

    if ((idx + 1) % 50 === 0) {
      console.log(`[${idx + 1}/${allFiles.length}] Progress...`);
    }
  });

  console.log(`\n================================================================================`);
  console.log(`✓ Updated: ${updated} files`);
  console.log(`⊘ Skipped: ${skipped} files (already had disclosure)`);
  console.log(`✗ Errors: ${errors} files`);
  console.log(`================================================================================\n`);
}

main();
