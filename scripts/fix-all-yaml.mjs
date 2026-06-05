import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import matter from 'gray-matter';

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
let errors = 0;

for (const f of files) {
  // Check if it parses OK first
  const text = readFileSync(f, 'utf8');
  try {
    matter(text);
    continue; // fine, skip
  } catch (_) {
    // needs fixing
  }

  // Fix: em/en dash immediately before quote char inside YAML values
  let t = text;
  t = t.replaceAll('—"', '— ');
  t = t.replaceAll('–"', '– ');
  t = t.replaceAll("—'", "— ");
  t = t.replaceAll("–'", "– ");

  try {
    matter(t);
    writeFileSync(f, t, 'utf8');
    console.log('✅ Fixed:', f.split(/[/\\]/).slice(-2).join('/'));
    fixed++;
  } catch (e2) {
    console.log('❌ Still broken:', f.split(/[/\\]/).slice(-2).join('/'), '—', e2.message.slice(0, 60));
    errors++;
  }
}

console.log(`\nFixed: ${fixed} | Still broken: ${errors}`);
