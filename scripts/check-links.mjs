/**
 * Link and sitemap integrity validator.
 *
 * WHY THIS EXISTS
 * Ad-hoc greps kept producing different answers to the same question, because
 * `grep -n` counts lines, `grep -o` counts occurrences and `grep -l` counts
 * files — and the scope drifted between runs (sometimes including generated
 * caches under src/data/). Scope, units and exclusions are fixed here so the
 * same question always returns the same number.
 *
 * Every count below states its unit and scope. Never report a bare number.
 *
 * Run:  npm run check:links            (offline, deterministic)
 *       npm run check:links -- --live  (also sweeps the deployed sitemap)
 *
 * Exits non-zero on any finding so it can gate a build.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LIVE = process.argv.includes('--live');
const SITE = 'https://pregnancysprout.com';

// Links are only checked in content/. Anything under src/data/ is a generated
// cache (content-cache*.json, search-index.json) rebuilt by other scripts, and
// _archive/ is dormant and never served.
const LINK_SCOPE = 'content/';

function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');
const readJson = (p) => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8')); } catch { return null; }
};

// ── redirect table, read from the real config ───────────────────────────────
// Imported and invoked rather than parsed textually: the config is the source
// of truth and a regex over it would drift.
const cfg = (await import(pathToFileURL(path.join(ROOT, 'next.config.mjs')).href)).default;
const redirectRules = typeof cfg.redirects === 'function' ? await cfg.redirects() : [];

const exactRedirects = new Map();
const wildcardRedirects = [];
for (const r of redirectRules) {
  if (r.source.includes(':')) {
    wildcardRedirects.push({ prefix: r.source.split(':')[0], destination: r.destination });
  } else {
    exactRedirects.set(r.source.replace(/\/$/, ''), r.destination);
  }
}
const isRedirected = (url) =>
  exactRedirects.has(url) || wildcardRedirects.some((w) => url.startsWith(w.prefix));
const destinationOf = (url) => exactRedirects.get(url) ?? '(wildcard rule)';

// ── content URLs ────────────────────────────────────────────────────────────
const mdxFiles = walk(path.join(ROOT, 'content'), '.mdx');
const mdxUrlOf = (file) => '/' + rel(file).replace(/^content\//, '').replace(/\.mdx$/, '');
const mdxUrls = new Set(mdxFiles.map(mdxUrlOf));

// ── every URL the site can legitimately serve ───────────────────────────────
const validUrls = new Set(mdxUrls);

for (const n of readJson('src/data/baby-names.json') ?? []) {
  validUrls.add(`/baby-names/${String(n.name).toLowerCase()}`);
}
for (const p of readJson('src/data/sanity-products-cache.json') ?? []) {
  const slug = p.slug?.current ?? p.slug;
  if (p.category) validUrls.add(`/products/${p.category}`);
  if (p.category && slug) validUrls.add(`/products/${p.category}/${slug}`);
}
for (let w = 1; w <= 40; w++) validUrls.add(`/pregnancy/week-by-week/week-${w}`);
for (const f of walk(path.join(ROOT, 'src/app'), 'page.tsx')) {
  const url = '/' + rel(f).replace(/^src\/app\//, '').replace(/\/?page\.tsx$/, '');
  if (!url.includes('[')) validUrls.add(url === '/' ? '/' : url.replace(/\/$/, ''));
}
validUrls.add('/');

// ── check 1: orphaned content ───────────────────────────────────────────────
// An MDX file whose own URL is intercepted by a redirect can never be served,
// yet sitemap.ts still lists it. This is the bug behind GSC "Page with redirect".
const orphans = mdxFiles
  .map((f) => ({ file: rel(f), url: mdxUrlOf(f) }))
  .filter((x) => isRedirected(x.url))
  .map((x) => ({ ...x, destination: destinationOf(x.url) }));

// ── check 1b: redirect destinations that go nowhere ─────────────────────────
// A redirect pointing at a URL the site cannot serve is worse than no redirect:
// Google follows it from an indexed old URL and lands on an empty shell. Found
// two of these on the first run — /products/monitors and /products/high-chairs
// were never defined in categoryLabels, so they rendered with the raw slug as a
// title ("monitors 2026") and zero products.
const deadDestinations = [...exactRedirects.entries()]
  .filter(([, dest]) => dest.startsWith('/') && !dest.includes(':'))
  .filter(([, dest]) => !validUrls.has(dest.replace(/(.)\/$/, '$1')))
  .map(([source, dest]) => ({ source, dest }));

// ── checks 2 & 3: internal links ────────────────────────────────────────────
// The regex captures the full href, so matching is inherently boundary-safe.
// That matters: several orphan slugs are prefixes of their own redirect targets
// (e.g. baby-sleep-training-methods), and a substring match would wrongly
// capture links to the live article.
const LINK_RE = /\]\((\/[^)\s"']+)\)|href="(\/[^"]+)"/g;
const hops = [];
const broken = [];

for (const f of walk(path.join(ROOT, LINK_SCOPE), '.mdx')) {
  const text = fs.readFileSync(f, 'utf8');
  for (const m of text.matchAll(LINK_RE)) {
    const url = (m[1] ?? m[2]).split('#')[0].split('?')[0].replace(/(.)\/$/, '$1');
    if (!url.startsWith('/')) continue;
    if (isRedirected(url)) hops.push({ file: rel(f), url, destination: destinationOf(url) });
    else if (!validUrls.has(url)) broken.push({ file: rel(f), url });
  }
}

const fileCount = (rows) => new Set(rows.map((r) => r.file)).size;

// ── report ──────────────────────────────────────────────────────────────────
console.log(`Scope: links checked in ${LINK_SCOPE} only (src/data/* generated caches and _archive/ excluded)`);
console.log(`Redirects loaded from next.config.mjs: ${exactRedirects.size} exact, ${wildcardRedirects.length} wildcard\n`);

console.log(`  orphaned content:  ${orphans.length} files (MDX whose own URL is redirected away — unreachable)`);
console.log(`  dead redirects:    ${deadDestinations.length} rules (redirect destination is not a servable URL)`);
console.log(`  redirect hops:     ${hops.length} occurrences across ${fileCount(hops)} files (internal links pointing at a redirect source)`);
console.log(`  broken links:      ${broken.length} occurrences across ${fileCount(broken)} files (internal links with no matching page)`);

if (orphans.length) {
  console.log('\n--- orphaned content ---');
  for (const o of orphans) console.log(`  ${o.file}\n      ${o.url}  ->  ${o.destination}`);
}

if (deadDestinations.length) {
  console.log('\n--- dead redirects (destination does not exist) ---');
  for (const d of deadDestinations) console.log(`  ${d.source}\n      ->  ${d.dest}`);
}

const groupByUrl = (rows) => {
  const by = {};
  for (const r of rows) (by[r.url] ||= []).push(r.file);
  return Object.entries(by).sort((a, b) => b[1].length - a[1].length);
};

if (hops.length) {
  console.log('\n--- redirect hops (occurrences by target) ---');
  for (const [url, files] of groupByUrl(hops)) {
    console.log(`  ${String(files.length).padStart(3)}x  ${url}  ->  ${destinationOf(url)}`);
  }
}
if (broken.length) {
  console.log('\n--- broken links (occurrences by target) ---');
  for (const [url, files] of groupByUrl(broken).slice(0, 30)) {
    console.log(`  ${String(files.length).padStart(3)}x  ${url}`);
  }
}

let liveIssues = 0;
if (LIVE) {
  console.log('\n--- live sitemap sweep ---');
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`  sitemap URLs fetched: ${urls.length}`);
  for (const u of urls) {
    try {
      const res = await fetch(u, { redirect: 'manual' });
      if (res.status !== 200) { console.log(`  HTTP ${res.status}  ${u}`); liveIssues++; continue; }
      const body = await res.text();
      if (/name="robots"[^>]*content="[^"]*noindex/i.test(body)) {
        console.log(`  NOINDEX  ${u}`);
        liveIssues++;
      }
    } catch (err) {
      console.log(`  FETCH FAILED  ${u}  (${err.message})`);
      liveIssues++;
    }
  }
  console.log(`  live issues: ${liveIssues} URLs (non-200, or noindexed while listed in the sitemap)`);
}

const total = orphans.length + deadDestinations.length + hops.length + broken.length + liveIssues;
console.log(`\nTOTAL ISSUES: ${total}`);
process.exitCode = total ? 1 : 0;
