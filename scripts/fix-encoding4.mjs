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

// The sequence c3a2 e282ac is the 3-byte UTF-8 encoding for U+00E2 (â) + U+20AC (€)
// This is double-encoded Windows-1252. The NEXT byte tells us which character it should be:
// 22 (") or 94 = em-dash (—), 93 = en-dash (–), 99 = ' 9c = " 9d = "
// Since the file shows â€" the display char after is – or —
// We just need to replace the multi-byte string 'â€' (however it appears) with the correct char

const files = getAllMdx('content');
let fixed = 0;

for (const f of files) {
  const buf = readFileSync(f);
  // Convert to Latin-1 string to see the raw bytes
  const latin1 = buf.toString('latin1');
  const orig = latin1;

  let result = latin1;
  // â€" (bytes: e2 80 93 in utf8 for en-dash, but misread)
  // The actual pattern in the file: c3a2 e282ac = â€  then next byte varies
  // Let's do a string-level fix on the UTF-8 decoded version
  const utf8 = buf.toString('utf8');
  const origUtf8 = utf8;

  // â€" sequence in utf8: the char â (U+00E2), char € (U+20AC), then a control char
  // Replace these common mojibake patterns
  const fixed_text = utf8
    .replace(/â€”/g, '—')  // â€" → em dash
    .replace(/â€–/g, '–')  // â€" → en dash
    .replace(/â€™/g, "'")  // â€™ → right single quote
    .replace(/â€œ/g, '"')  // â€œ → left double quote
    .replace(/â€/g, '—')         // catch-all â€ → em dash (for â€" followed by quote)
    .replace(/Â /g, ' ')         // Â  → space
    .replace(/^﻿/, '');               // BOM

  if (fixed_text !== origUtf8) {
    writeFileSync(f, fixed_text, 'utf8');
    console.log('Fixed:', f.replace(/.*[/\\]content[/\\]/, 'content/'));
    fixed++;
  }
}
console.log(`\nDone. Fixed ${fixed} files.`);
