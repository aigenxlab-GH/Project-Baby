import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function getAllMdx(dir) {
  const results = [];
  if (!statSync(dir).isDirectory()) return results;
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) results.push(...getAllMdx(full));
    else if (extname(f) === '.mdx') results.push(full);
  }
  return results;
}

const files = getAllMdx('content');
let fixed = 0;

const EM_DASH = '—';
const EN_DASH = '–';
const RSQUOTE = '’';
const LDQUOTE = '“';
const RDQUOTE = '”';

for (const f of files) {
  const buf = readFileSync(f);
  let text = buf.toString('utf8');
  const orig = text;

  // Replace known mojibake sequences (UTF-8 bytes misread as Latin-1)
  // â€" = em dash (U+2014), â€" = en dash (U+2013)
  // These appear as specific byte combos when UTF-8 is double-decoded
  text = text
    .replace(/â€”/g, EM_DASH)  // â€" → —
    .replace(/â€“/g, EN_DASH)  // â€" → –
    .replace(/â€™/g, RSQUOTE)  // â€™ → '
    .replace(/â€œ/g, LDQUOTE)  // â€œ → "
    .replace(/â€/g, RDQUOTE)  // â€  → "
    .replace(/Â /g, ' ')             // Â  → non-breaking space → regular space
    .replace(/^﻿/, '');                         // BOM

  if (text !== orig) {
    writeFileSync(f, text, 'utf8');
    console.log('Fixed:', f.replace(/.*content[/\\]/, 'content/'));
    fixed++;
  }
}
console.log(`\nDone. Fixed ${fixed} files.`);
