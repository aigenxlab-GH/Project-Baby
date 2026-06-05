import { readFileSync, writeFileSync } from 'fs';

const files = [
  'content/products/car-seats/chicco-keyfit-35-review.mdx',
  'content/products/monitors/nanit-pro-review.mdx',
  'content/products/strollers/baby-jogger-city-mini-gt2-review.mdx',
  'content/products/strollers/uppababy-vista-v2-review.mdx',
];

for (const f of files) {
  let t = readFileSync(f, 'utf8');
  const orig = t;
  // Fix: —" in YAML frontmatter (em-dash immediately before closing quote = broken)
  // Should be: — " or just —
  t = t.replaceAll('—"', '— ');  // em dash + quote → em dash + space
  t = t.replaceAll('–"', '– ');  // en dash + quote → en dash + space
  // Also fix BOM if present
  t = t.replace(/^﻿/, '');
  if (t !== orig) {
    writeFileSync(f, t, 'utf8');
    console.log('Fixed:', f.split('/').pop());
  }
}
console.log('Done');
