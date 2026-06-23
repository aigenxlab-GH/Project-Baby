#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const DISCLOSURE = `
> **Fact-Checked & Transparent:** This article was written with AI assistance and fact-checked against current CDC, WHO, ACOG, and NHS guidelines. All health information is based on authoritative medical sources. Last verified: June 2026.
`;

function addDisclosureToFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if disclosure already exists
    if (content.includes('Fact-Checked & Transparent')) {
      return { file: path.basename(filePath), status: 'skipped', reason: 'already has disclosure' };
    }

    // Split frontmatter from body
    const parts = content.split('---\n');
    if (parts.length < 3) {
      return { file: path.basename(filePath), status: 'error', reason: 'invalid frontmatter' };
    }

    const frontmatter = parts[0] + '---\n' + parts[1] + '---\n';
    let body = parts.slice(2).join('---\n');

    // Find first ## heading
    const firstHeadingMatch = body.match(/\n##\s+/);

    if (!firstHeadingMatch) {
      return { file: path.basename(filePath), status: 'error', reason: 'no H2 heading found' };
    }

    // Insert disclosure before first heading
    const insertPos = body.indexOf('\n## ', firstHeadingMatch.index === 0 ? 1 : 0);
    const newBody = body.slice(0, insertPos) + '\n' + DISCLOSURE + '\n' + body.slice(insertPos);

    // Write back
    fs.writeFileSync(filePath, frontmatter + newBody, 'utf8');

    return { file: path.basename(filePath), status: 'updated' };
  } catch (err) {
    return { file: path.basename(filePath), status: 'error', reason: err.message };
  }
}

function main() {
  const contentDir = path.join(__dirname, 'content');

  // Find all .mdx files in blog and products
  const blogFiles = glob.sync(path.join(contentDir, 'blog', '*.mdx'));
  const productFiles = glob.sync(path.join(contentDir, 'products', '**', '*.mdx'));

  const allFiles = [...blogFiles, ...productFiles];

  console.log(`\nProcessing ${allFiles.length} files...\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  allFiles.forEach((file, idx) => {
    const result = addDisclosureToFile(file);

    if (result.status === 'updated') updated++;
    else if (result.status === 'skipped') skipped++;
    else if (result.status === 'error') errors++;

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
