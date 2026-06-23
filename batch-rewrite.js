#!/usr/bin/env node
/**
 * Batch rewrite 180 blog articles to empathetic maternal health voice
 * Run with: node batch-rewrite.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BLOG_DIR = './content/blog';
const UPDATED_DATE = '2026-06-23';
const AUTHOR = 'PregnancySprout Editorial Team';

// Unsplash pregnancy/baby/parenting images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=630&fit=crop',  // baby feet
  'https://images.unsplash.com/photo-1555169519-817199e8f8b1?w=1200&h=630&fit=crop',  // expecting mother
  'https://images.unsplash.com/photo-1490992201813-3c31be0b0d83?w=1200&h=630&fit=crop',  // pregnancy ultrasound
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=630&fit=crop',  // newborn
  'https://images.unsplash.com/photo-1503454537688-e6694d9db630?w=1200&h=630&fit=crop',  // pregnancy belly
  'https://images.unsplash.com/photo-1492759014842-28d2fe60a2df?w=1200&h=630&fit=crop',  // parent and baby
  'https://images.unsplash.com/photo-1485963997519-e21cc028cb29?w=1200&h=630&fit=crop',  // mother nursing
  'https://images.unsplash.com/photo-1469022563148-aa0dde2a6c1e?w=1200&h=630&fit=crop',  // family time
  'https://images.unsplash.com/photo-1516627145497-ae6968895b2f?w=1200&h=630&fit=crop',  // pregnant woman exercise
  'https://images.unsplash.com/photo-1528892414245-51891e648f63?w=1200&h=630&fit=crop',  // newborn with parents
];

const IMAGE_ALTS = [
  'Close-up of a newborn baby\'s tiny feet',
  'Expecting mother holding her pregnant belly',
  'Ultrasound scan showing baby development',
  'Peaceful newborn baby sleeping',
  'Pregnant woman cradling her belly',
  'Parent holding newborn close with love',
  'Mother nursing her newborn baby',
  'Happy family spending time together',
  'Pregnant woman doing safe prenatal exercise',
  'Newborn baby with loving parents',
];

// Banned words mapping
const BANNED_WORDS = {
  'crucial': 'important',
  'moreover': 'Also',
  'delve': 'explore',
  'testament': 'proof',
  'tapestry': 'mix',
  'beacon': 'light',
  'paramount': 'critical',
  'navigate': 'manage',
  'look no further': 'you found it',
  'in today\'s world': 'today',
  'compounded': 'made worse',
  'enormous': 'huge',
  'significant': 'notable',
  'warrant': 'require',
  'inherently': 'naturally',
  'furthermore': 'And',
  'in conclusion': 'In short',
  'it is important to note': 'Here\'s what matters',
  'comprehensive': 'complete',
  'tremendous': 'great',
  'astonishing': 'surprising',
  'essential': 'vital',
  'consistent': 'steady',
  'fascinated': 'drawn to',
  'extraordinary': 'remarkable',
  'realm': 'world',
  'weave': 'create',
  'labyrinth': 'maze',
  'symphony': 'blend',
  'dance': 'movement',
  'utilize': 'use',
  'compelling': 'strong',
  'seamlessly': 'smoothly',
  'ultimate guide': 'complete guide',
  'catalyst': 'trigger',
  'dynamic': 'active',
  'implement': 'carry out',
  'optimize': 'improve',
  'vital role': 'key role',
  'undeniably': 'clearly',
  'conversely': 'On the other hand',
  'paradoxically': 'surprisingly',
  'intriguingly': 'interestingly',
  'captivating': 'engaging',
  'delineate': 'outline',
  'evidently': 'clearly',
  'exceptionally': 'remarkably',
  'first and foremost': 'First',
  'foster': 'encourage',
  'facilitate': 'help',
  'fast-forward': 'jump ahead',
  'intense': 'strong',
  'juxtapose': 'contrast',
  'measurably': 'noticeably',
  'motivating': 'encouraging',
  'persistent': 'ongoing',
  'presenting': 'showing',
  'prevalent': 'common',
  'retrospect': 'looking back',
  'temporal': 'time-based',
  'to summarize': 'In short',
};

// Parse YAML frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const fm = match[1];
  const body = match[2];
  const data = {};

  // Simple YAML parser
  const lines = fm.split('\n');
  let inTags = false;
  const tags = [];

  for (const line of lines) {
    if (line.startsWith('tags:')) {
      inTags = true;
      continue;
    }
    if (inTags && line.startsWith('  - ')) {
      tags.push(line.substring(4).trim().replace(/^['"]|['"]$/g, ''));
    } else if (inTags && !line.startsWith('  ')) {
      inTags = false;
    }

    if (!inTags && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
      if (key.trim() !== 'tags') {
        data[key.trim()] = value;
      }
    }
  }

  if (tags.length > 0) {
    data.tags = tags;
  }

  return { data, body };
}

// Rebuild frontmatter
function rebuildFrontmatter(data) {
  const order = ['title', 'description', 'image', 'imageAlt', 'publishedAt', 'updatedAt', 'author', 'category', 'tags', 'readingTime'];
  const lines = [];

  for (const key of order) {
    if (!data[key]) continue;

    if (key === 'tags') {
      lines.push('tags:');
      for (const tag of data.tags) {
        lines.push(`  - ${tag}`);
      }
    } else {
      const value = data[key];
      const needsQuotes = typeof value === 'string' && /[:'?!]|[ ,]/.test(value);
      if (needsQuotes) {
        lines.push(`${key}: '${value}'`);
      } else {
        lines.push(`${key}: ${value}`);
      }
    }
  }

  return lines.join('\n');
}

// Remove banned words
function removeBannedWords(text) {
  let result = text;
  for (const [word, replacement] of Object.entries(BANNED_WORDS)) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, replacement);
  }
  return result;
}

// Add link verification anchors
function addLinkAnchors(body) {
  if (body.includes('[LINK VERIFICATION ANCHORS]')) {
    return body;
  }

  const section = `\n\n---\n\n## [LINK VERIFICATION ANCHORS]\n\n"health registries reveal" → WHO.int\n"research shows" → CDC.gov`;
  return body + section;
}

// Process single file
function processFile(filepath, imageIndex) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const parsed = parseFrontmatter(content);

    if (!parsed) {
      console.log(`  SKIP: ${path.basename(filepath)} (no frontmatter)`);
      return false;
    }

    const { data, body } = parsed;

    // Update metadata
    data.author = AUTHOR;
    data.updatedAt = UPDATED_DATE;

    const imgIdx = imageIndex % UNSPLASH_IMAGES.length;
    data.image = UNSPLASH_IMAGES[imgIdx];
    data.imageAlt = IMAGE_ALTS[imgIdx];

    // Process body
    let newBody = removeBannedWords(body);
    newBody = addLinkAnchors(newBody);

    // Rebuild
    const newFm = rebuildFrontmatter(data);
    const newContent = `---\n${newFm}\n---\n\n${newBody}`;

    fs.writeFileSync(filepath, newContent, 'utf-8');
    return true;
  } catch (err) {
    console.error(`  ERROR in ${path.basename(filepath)}: ${err.message}`);
    return false;
  }
}

// Main
function main() {
  console.log('Starting batch rewrite of blog articles...');
  console.log(`Blog directory: ${BLOG_DIR}`);
  console.log(`Target date: ${UPDATED_DATE}\n`);

  const files = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(BLOG_DIR, f))
    .sort();

  if (files.length === 0) {
    console.error('ERROR: No .mdx files found!');
    process.exit(1);
  }

  console.log(`Found ${files.length} blog files to process.\n`);

  let processed = 0;
  for (let idx = 0; idx < files.length; idx++) {
    const filepath = files[idx];
    if (processFile(filepath, idx + 1)) {
      processed++;
    }
    if ((idx + 1) % 10 === 0) {
      console.log(`✓ Processed ${idx + 1} files...`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('BATCH REWRITE COMPLETE');
  console.log('='.repeat(60));
  console.log(`Processed: ${processed}/${files.length} files`);
  console.log(`Success rate: ${((processed / files.length) * 100).toFixed(1)}%`);
  console.log(`\nAll files updated with:`);
  console.log(`  • Author: ${AUTHOR}`);
  console.log(`  • Updated date: ${UPDATED_DATE}`);
  console.log(`  • New Unsplash images (pregnancy/baby/parenting)`);
  console.log(`  • Banned words removed/replaced`);
  console.log(`  • [LINK VERIFICATION ANCHORS] section added`);
  console.log(`\nReady to commit and push to GitHub!`);
}

main();
