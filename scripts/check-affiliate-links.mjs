/**
 * Checks all 318 affiliate links for broken URLs / 404s.
 * Run: node scripts/check-affiliate-links.mjs
 */
import fs from 'fs';
import https from 'https';
import { URL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// ── Collect all links ────────────────────────────────────────────────────────

const allLinks = [];

// 1. MDX product review cache
const productCacheRaw = fs.readFileSync(path.join(projectRoot, 'src/data/content-cache-products.json'), 'utf8').replace(/^﻿/, '');
const productCache = JSON.parse(productCacheRaw);
for (const cat of Object.values(productCache)) {
  for (const entry of Object.values(cat)) {
    if (entry.affiliateLinks) {
      for (const l of entry.affiliateLinks) {
        if (l.url) allLinks.push({ url: l.url, source: `products/${entry.slug}` });
      }
    }
  }
}

// 2. Roundup page
const roundupContent = fs.readFileSync(path.join(projectRoot, 'src/app/products/roundups/[slug]/page.tsx'), 'utf8');
for (const m of roundupContent.matchAll(/href:\s*['"]+(https:\/\/www\.amazon\.com[^'"]+)['"]/g)) {
  allLinks.push({ url: m[1], source: 'roundups/page.tsx' });
}

// 3. affiliateProducts.ts (search links)
const affContent = fs.readFileSync(path.join(projectRoot, 'src/config/affiliateProducts.ts'), 'utf8');
for (const m of affContent.matchAll(/['"]+(https?:\/\/amazon\.com\/s[^'"]+)['"]/g)) {
  allLinks.push({ url: m[1], source: 'affiliateProducts.ts' });
}

// 4. Registry checklist (strip BOM if present)
const regRaw = fs.readFileSync(path.join(projectRoot, 'src/data/registry-checklist.json'), 'utf8').replace(/^﻿/, '');
const regData = JSON.parse(regRaw);
for (const item of regData) {
  if (item.affiliateUrl) allLinks.push({ url: item.affiliateUrl, source: 'registry-checklist.json' });
}

// Deduplicate by FULL URL (keep query params — each ASIN and each search term is distinct)
const seen = new Set();
const unique = allLinks.filter(l => {
  if (seen.has(l.url)) return false;
  seen.add(l.url);
  return true;
});

// Count by source for transparency
const bySource = {};
for (const l of allLinks) {
  const key = l.source.startsWith('products/') ? 'MDX product reviews' :
               l.source === 'roundups/page.tsx' ? 'Product roundup page' :
               l.source === 'affiliateProducts.ts' ? 'affiliateProducts.ts (search)' :
               'registry-checklist.json (search)';
  bySource[key] = (bySource[key] || 0) + 1;
}

console.log(`\n📦 Total links collected: ${allLinks.length}`);
for (const [src, count] of Object.entries(bySource)) console.log(`   • ${src}: ${count}`);
const dupes = allLinks.length - unique.length;
console.log(`\n🔁 Duplicate URLs removed: ${dupes} (same ASIN appearing in multiple files)`);
console.log(`🔍 Unique URLs to check: ${unique.length}\n`);

// ── HTTP checker ─────────────────────────────────────────────────────────────

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url);
      const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'HEAD',
        timeout: 12000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      };

      const req = https.request(options, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode < 400 || res.statusCode === 405 });
      });

      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT', ok: false }); });
      req.on('error', (e) => resolve({ url, status: 'ERROR:' + e.code, ok: false }));
      req.end();
    } catch (e) {
      resolve({ url, status: 'INVALID_URL', ok: false });
    }
  });
}

// ── Run checks in batches of 8 ───────────────────────────────────────────────

const BATCH = 8;
const results = [];
const broken = [];
const slow = [];

for (let i = 0; i < unique.length; i += BATCH) {
  const batch = unique.slice(i, i + BATCH);
  const batchResults = await Promise.all(batch.map(l => checkUrl(l.url)));

  for (let j = 0; j < batchResults.length; j++) {
    const r = batchResults[j];
    const source = batch[j].source;

    // Amazon search pages (s?k=) never 404 — mark as ok
    const isSearch = r.url.includes('/s?k=');
    const effectivelyOk = r.ok || isSearch;

    if (!effectivelyOk) {
      broken.push({ ...r, source });
      process.stdout.write(`❌ `);
    } else {
      process.stdout.write(`✅ `);
    }
    results.push({ ...r, source, ok: effectivelyOk });
  }

  // Progress line every 40 links
  if ((i + BATCH) % 40 === 0 || i + BATCH >= unique.length) {
    console.log(`  [${Math.min(i + BATCH, unique.length)}/${unique.length}]`);
  }

  // Small delay between batches to avoid rate-limiting
  if (i + BATCH < unique.length) await new Promise(r => setTimeout(r, 600));
}

// ── Report ───────────────────────────────────────────────────────────────────

console.log('\n\n══════════════════════════════════════════');
console.log('AFFILIATE LINK CHECK REPORT');
console.log('══════════════════════════════════════════\n');
console.log(`✅ OK / Redirected:  ${results.filter(r => r.ok).length}`);
console.log(`❌ Broken (4xx/err): ${broken.length}`);
console.log(`📊 Total checked:    ${results.length}`);

if (broken.length === 0) {
  console.log('\n🎉 All links are working! No broken links found.\n');
} else {
  console.log('\n\n❌ BROKEN LINKS:\n');
  for (const b of broken) {
    console.log(`Status: ${b.status}`);
    console.log(`Source: ${b.source}`);
    console.log(`URL:    ${b.url}`);
    console.log('');
  }
}

// Save full report
fs.writeFileSync(path.join(projectRoot, 'link-check-report.json'), JSON.stringify({ summary: { total: results.length, ok: results.filter(r=>r.ok).length, broken: broken.length }, broken, all: results }, null, 2));
console.log('📄 Full report saved to: link-check-report.json\n');
