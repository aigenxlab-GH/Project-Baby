import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function getAllMdx(dir) {
  const results = [];
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) results.push(...getAllMdx(full));
    else if (extname(f) === '.mdx') results.push(full);
  }
  return results;
}

const files = getAllMdx('content');
let fixed = 0;

for (const f of files) {
  const orig = readFileSync(f, 'utf8');
  let text = orig;

  // Remove BOM if present
  text = text.replace(/^﻿/, '');

  // Fix curly quotes and dashes (Unicode replacements)
  text = text
    .replace(/’/g, "'")   // right single quote
    .replace(/‘/g, "'")   // left single quote
    .replace(/“/g, '"')   // left double quote
    .replace(/”/g, '"')   // right double quote
    .replace(/–/g, '–')   // en dash
    .replace(/—/g, '—')   // em dash
    .replace(/â€”/g, '"')  // mojibake right quote
    .replace(/â€“/g, '"')  // mojibake left quote
    .replace(/â€™/g, "'")  // mojibake apostrophe
    .replace(/â€“/g, '—')  // mojibake em dash
    .replace(/Â /g, ' ');       // mojibake non-breaking space

  if (text !== orig) {
    writeFileSync(f, text, 'utf8');
    console.log('Fixed:', f.split('/').slice(-2).join('/'));
    fixed++;
  }
}
console.log(`\nTotal files fixed: ${fixed}`);
