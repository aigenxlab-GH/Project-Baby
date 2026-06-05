import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// The mojibake pattern: UTF-8 bytes of a Windows-1252 misread character
// c3a2 e282ac 93 = â€" = em dash (—)
// c3a2 e282ac 99 = â€™ = right single quote (')
// c3a2 e282ac 9c = â€œ = left double quote (")
// c3a2 e282ac 9d = â€  = right double quote (")

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

for (const f of files) {
  const buf = readFileSync(f);
  // Work at Buffer level for precise byte replacement
  let hex = buf.toString('hex');
  const orig = hex;

  // c3a2 e282ac 93 = â€" = — (em dash)
  hex = hex.replace(/c3a2e282ac93/g, 'e28094');
  // c3a2 e282ac 94 = â€" = – (en dash)
  hex = hex.replace(/c3a2e282ac94/g, 'e28093');
  // c3a2 e282ac 99 = â€™ = ' (right single quote)
  hex = hex.replace(/c3a2e282ac99/g, 'e28099');
  // c3a2 e282ac 9c = â€œ = " (left double quote)
  hex = hex.replace(/c3a2e282ac9c/g, 'e2809c');
  // c3a2 e282ac 9d = â€  = " (right double quote)
  hex = hex.replace(/c3a2e282ac9d/g, 'e2809d');
  // c3 82 c2 a0 = Â  = non-breaking space → regular space
  hex = hex.replace(/c382c2a0/g, '20');
  // BOM ef bb bf
  if (hex.startsWith('efbbbf')) hex = hex.slice(6);

  if (hex !== orig) {
    writeFileSync(f, Buffer.from(hex, 'hex'));
    console.log('Fixed:', f.replace(/.*content[/\\]/, 'content/'));
    fixed++;
  }
}
console.log(`\nDone. Fixed ${fixed} files.`);
