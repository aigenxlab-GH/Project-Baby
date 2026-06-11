/**
 * Add `export const dynamic = 'force-static'` to all pages that are missing it.
 * This ensures pages are pre-rendered at build time and served as static HTML
 * from Cloudflare Assets — bypassing the Worker entirely, fixing Error 1102.
 *
 * Run: node scripts/add-force-static.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, '..', 'src', 'app');

// Pages to add force-static to (those missing it and should be static)
const TARGETS = [
  'page.tsx',                          // homepage
  'about/page.tsx',
  'affiliate-disclosure/page.tsx',
  'baby-names/page.tsx',
  'contact/page.tsx',
  'cookie-policy/page.tsx',
  'corrections/page.tsx',
  'editorial-standards/page.tsx',
  'parenting/page.tsx',
  'pregnancy/page.tsx',
  'privacy-policy/page.tsx',
  'products/page.tsx',
  'terms/page.tsx',
  // pages WITH generateStaticParams — add force-static to be explicit
  'products/[category]/page.tsx',
  'products/[category]/[slug]/page.tsx',
  'products/roundups/[slug]/page.tsx',
  'blog/[slug]/page.tsx',
  'baby-names/[name]/page.tsx',
  'parenting/[topic]/page.tsx',
  'parenting/[topic]/[slug]/page.tsx',
  'pregnancy/week-by-week/page.tsx',
  'pregnancy/week-by-week/[week]/page.tsx',
];

let updated = 0, skipped = 0;

for (const rel of TARGETS) {
  const filePath = path.join(appRoot, rel);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ Not found: ${rel}`);
    continue;
  }

  let src = fs.readFileSync(filePath, 'utf8');

  // Already has dynamic export
  if (src.includes("export const dynamic")) {
    console.log(`⏭ Already set: ${rel}`);
    skipped++;
    continue;
  }

  // Insert after the last import line
  const lines = src.split('\n');
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) lastImportIdx = i;
  }

  const insertAfter = lastImportIdx >= 0 ? lastImportIdx : 0;
  lines.splice(insertAfter + 1, 0, '', "export const dynamic = 'force-static';");
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`✅ ${rel}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} already set`);
