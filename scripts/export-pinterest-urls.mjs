/**
 * Exports every content URL into an XLSX workbook for Pinterest board/pin
 * planning: one sheet per content type, each row a real page with its real
 * title/description pulled from the build caches (not reconstructed), plus
 * columns this script derives — suggested board, a Pinterest-style pin title
 * and description, and a Comments column flagging anything worth knowing
 * before pinning (thin content, zero-product category, missing image, etc).
 *
 * Run: node scripts/export-pinterest-urls.mjs
 * Output: pinterest-urls.xlsx (repo root)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://pregnancysprout.com';
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

const articles = readJson('src/data/content-cache-articles.json');
const products = readJson('src/data/sanity-products-cache.json');

// ── word counts from the built HTML, so "thin content" is measured, not guessed ──
function wordsIn(htmlPath) {
  try {
    let h = fs.readFileSync(htmlPath, 'utf8');
    h = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
    h = h.replace(/<!-- -->/g, '').replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ');
    return h.split(/\s+/).filter(Boolean).length;
  } catch {
    return null;
  }
}

// ── board assignment: matches the 8 boards in the Pinterest plan ────────────
const BOARD_RULES = [
  [/sleep|nap|ferber|swaddl|white-noise|sound-machine/i, 'Baby Sleep Tips'],
  [/feed|breastfeed|formula|weaning|solid|nursing|bottle|pump/i, 'Feeding & Breastfeeding'],
  [/postpartum|fourth-trimester|recovery-after/i, 'Postpartum Recovery'],
  [/newborn|bathing|milestone|tummy-time|development/i, 'Newborn Care'],
  [/registry|checklist|stroller|carrier|car-seat|crib|monitor|gear/i, 'Baby Gear & Registry'],
  [/week-|trimester|pregnan/i, 'Pregnancy Week by Week'],
  [/name/i, 'Baby Names'],
];
function boardFor(slug, title, section) {
  const hay = `${slug} ${title} ${section}`;
  for (const [re, board] of BOARD_RULES) if (re.test(hay)) return board;
  return section.startsWith('parenting') ? 'Newborn Care' : 'Pregnancy Week by Week';
}

// ── a Pinterest-style title: <100 chars, leads with the searched phrase ─────
function pinTitle(title) {
  let t = title.replace(/\s*\|\s*PregnancySprout.*$/i, '').replace(/\s*[-–—]\s*PregnancySprout.*$/i, '');
  return t.length > 100 ? t.slice(0, 97) + '...' : t;
}

// ── a Pinterest-style description: natural sentence(s), <500 chars ──────────
function pinDescription(desc) {
  if (!desc) return '';
  return desc.length > 480 ? desc.slice(0, 477) + '...' : desc;
}

function comment({ words, hasImage, isRedirected, isEmpty }) {
  const notes = [];
  if (isRedirected) notes.push('URL changed since a previous plan — verify before pinning');
  if (isEmpty) notes.push('0 products in this category right now — skip until stocked');
  if (words != null && words < 500) notes.push(`thin (~${words} words) — lower priority`);
  if (!hasImage) notes.push('no source image on file — needs a Canva pin image from scratch');
  return notes.join('; ');
}

const wb = new ExcelJS.Workbook();
wb.creator = 'PregnancySprout';
wb.created = new Date();

const HEADER = ['URL', 'Title', 'Description', 'Category', 'Suggested Board', 'Suggested Pin Title', 'Suggested Pin Description', 'Word Count', 'Comments / Notes'];
const HEADER_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4D2E' } };

function addSheet(name) {
  const ws = wb.addWorksheet(name, { views: [{ state: 'frozen', ySplit: 1 }] });
  ws.columns = [
    { key: 'url', width: 62 },
    { key: 'title', width: 42 },
    { key: 'desc', width: 46 },
    { key: 'cat', width: 20 },
    { key: 'board', width: 22 },
    { key: 'pintitle', width: 42 },
    { key: 'pindesc', width: 46 },
    { key: 'words', width: 10 },
    { key: 'comments', width: 40 },
  ];
  const hr = ws.addRow(HEADER);
  hr.eachCell((c) => {
    c.fill = HEADER_FILL;
    c.font = { color: { argb: 'FFFFFFFF' }, bold: true };
    c.alignment = { vertical: 'middle' };
  });
  ws.autoFilter = { from: 'A1', to: 'I1' };
  return ws;
}
function styleRow(ws, row) {
  row.alignment = { vertical: 'top', wrapText: true };
  row.getCell(1).font = { color: { argb: 'FF15803D' } };
}

// ── Sheet 1: Blog ─────────────────────────────────────────────────────────
const wsBlog = addSheet('Blog');
let n = 0;
for (const [slug, a] of Object.entries(articles.blog || {})) {
  const url = `${SITE}/blog/${slug}`;
  const words = wordsIn(path.join(ROOT, '.next/server/app/blog', `${slug}.html`));
  const row = wsBlog.addRow([
    url, a.title, a.description, a.category || '', boardFor(slug, a.title, 'blog'),
    pinTitle(a.title), pinDescription(a.description), words,
    comment({ words, hasImage: !!a.image, isRedirected: false, isEmpty: false }),
  ]);
  styleRow(wsBlog, row); n++;
}
console.log(`Blog: ${n} rows`);

// ── Sheet 2: Articles (parenting/*) ──────────────────────────────────────
const wsArt = addSheet('Articles (Parenting)');
n = 0;
for (const [section, group] of Object.entries(articles)) {
  if (section === 'blog') continue;
  const topic = section.replace('parenting/', '');
  for (const [slug, a] of Object.entries(group)) {
    const url = `${SITE}/${section}/${slug}`;
    const words = wordsIn(path.join(ROOT, '.next/server/app', section, `${slug}.html`));
    const row = wsArt.addRow([
      url, a.title, a.description, topic, boardFor(slug, a.title, section),
      pinTitle(a.title), pinDescription(a.description), words,
      comment({ words, hasImage: !!a.image, isRedirected: false, isEmpty: false }),
    ]);
    styleRow(wsArt, row); n++;
  }
}
console.log(`Articles: ${n} rows`);

// ── Sheet 3: Best Product (category roundup pages) ──────────────────────
const wsBest = addSheet('Best Product (Category Pages)');
const catSrc = fs.readFileSync(path.join(ROOT, 'src/app/products/[category]/page.tsx'), 'utf8');
const catEntries = [...catSrc.matchAll(/'([a-z0-9-]+)':\s*'([^']+)'/g)]
  .concat([...catSrc.matchAll(/^\s*([a-z0-9]+):\s*'([^']+)',/gm)].map((m) => [m[0], m[1], m[2]]));
const catMap = new Map();
for (const m of catEntries) catMap.set(m[1], m[2]);

const productCategoryCounts = new Map();
for (const p of products) productCategoryCounts.set(p.category, (productCategoryCounts.get(p.category) || 0) + 1);

n = 0;
for (const [slug, label] of catMap) {
  const url = `${SITE}/products/${slug}`;
  const count = productCategoryCounts.get(slug) || 0;
  const desc = `${label} — ${count} product${count === 1 ? '' : 's'} compared on PregnancySprout, researched against manufacturer specs and verified customer reviews.`;
  const row = wsBest.addRow([
    url, label, desc, 'Product Roundup', 'Baby Gear & Registry',
    pinTitle(label), pinDescription(desc), null,
    comment({ words: null, hasImage: true, isRedirected: false, isEmpty: count === 0 }),
  ]);
  styleRow(wsBest, row); n++;
}
console.log(`Best Product: ${n} rows`);

// ── Sheet 4: Product Pages (individual reviews) ──────────────────────────
const wsProd = addSheet('Product Pages');
n = 0;
for (const p of products) {
  const slug = p.slug?.current ?? p.slug;
  const url = `${SITE}/products/${p.category}/${slug}`;
  const title = p.title || p.productName;
  const desc = p.description || p.excerpt || p.bottomLine || '';
  const row = wsProd.addRow([
    url, title, desc, catMap.get(p.category) || p.category, 'Baby Gear & Registry',
    pinTitle(`${p.productName} Review`), pinDescription(desc), null,
    comment({ words: null, hasImage: !!p.imageUrl, isRedirected: false, isEmpty: false })
      + (p.starRating ? '' : (comment({}) ? '; ' : '') + 'no star rating in Sanity — do not imply a rating in the pin'),
  ]);
  styleRow(wsProd, row); n++;
}
console.log(`Product Pages: ${n} rows`);

// ── Sheet 5 (bonus): Free Tools — called out as the strongest Pinterest assets ──
const wsTools = addSheet('Free Tools (bonus)');
const TOOLS = [
  ['due-date-calculator', 'Free Due Date Calculator', 'Work out your estimated due date from your last period using the same method midwives use.'],
  ['ovulation-calculator', 'Free Ovulation Calculator', 'Track your fertile window and predict ovulation based on your cycle.'],
  ['contraction-timer', 'Free Contraction Timer', 'Time your contractions and see the pattern that tells you when to head to hospital.'],
  ['hospital-bag-checklist', 'Hospital Bag Checklist', 'A free printable checklist of what to pack for labour, baby and partner.'],
  ['registry-checklist', 'Baby Registry Checklist', 'What you actually need for a baby registry, sorted by when you need it.'],
  ['feeding-schedule-tracker', 'Feeding Schedule Tracker', 'How often and how much to feed your baby at each age, from newborn to solids.'],
  ['growth-percentile-calculator', 'Growth Percentile Calculator', "See where your baby's height and weight fall on the growth chart."],
  ['symptom-checker', 'Pregnancy Symptom Checker', 'Check a pregnancy symptom against what is normal and what needs medical attention.'],
  ['baby-name-generator', 'Baby Name Generator', 'Generate baby name ideas filtered by origin, meaning and starting letter.'],
];
for (const [slug, title, desc] of TOOLS) {
  const url = `${SITE}/tools/${slug}`;
  const row = wsTools.addRow([
    url, title, desc, 'Free Tool', 'Free Baby Tools',
    pinTitle(title), pinDescription(desc), null,
    'Tools get saved more than articles — prioritise these first.',
  ]);
  styleRow(wsTools, row);
}
console.log(`Free Tools: ${TOOLS.length} rows`);

// ── Sheet 6 (bonus): README ───────────────────────────────────────────────
const wsRead = wb.addWorksheet('Read Me First', { views: [{ state: 'frozen', ySplit: 0 }] });
wsRead.columns = [{ width: 100 }];
const readme = [
  'PregnancySprout — Pinterest URL Export',
  `Generated ${new Date().toISOString().slice(0, 10)} from the live build caches.`,
  '',
  'SHEETS',
  '  Blog                        — content/blog/*.mdx, rendered at /blog/<slug>',
  '  Articles (Parenting)        — content/parenting/**/*.mdx, rendered at /parenting/<topic>/<slug>',
  '  Best Product (Category)     — the 27 "Best X" category roundup pages at /products/<category>',
  '  Product Pages               — 113 individual product reviews at /products/<category>/<slug>',
  '  Free Tools (bonus)          — the 9 free calculators/checklists. Not asked for, added because',
  '                                these get saved more than articles on Pinterest and were flagged',
  '                                as your strongest asset in the Pinterest plan.',
  '',
  'COLUMNS',
  '  URL                         — the exact live page, verified against pregnancysprout.com',
  '  Title / Description         — the real on-site title/meta description, not reworded',
  '  Suggested Board             — which of the 8 Pinterest boards this fits (see the plan artifact)',
  '  Suggested Pin Title         — <=100 chars, leads with the searched phrase (Pinterest is a',
  '                                search engine — write for the search box, not for followers)',
  '  Suggested Pin Description   — <=500 chars, natural language version of the meta description',
  '  Word Count                  — measured from the built HTML, not estimated',
  '  Comments / Notes            — flags worth reading before you pin:',
  '      "thin (~N words)"       — under 500 rendered words, lower priority for a saved pin',
  '      "0 products..."         — category page with nothing in it yet, skip until stocked',
  '      "no source image"       — needs a Canva image built from scratch, not a screenshot',
  '      "no star rating"        — do not show or imply a rating in the pin design',
  '',
  'NOT INCLUDED',
  '  Baby name pages (1,085) and week-by-week pages (40) are omitted — too many rows to be useful',
  '  for manual pin planning. Ask if you want those as a separate sheet; the top-100 page alone is',
  '  a strong single pin and is already listed on the Best Product sheet is not — add on request.',
];
readme.forEach((line, i) => {
  const row = wsRead.addRow([line]);
  if (i === 0) row.font = { bold: true, size: 14 };
  else if (/^[A-Z ]+$/.test(line.trim()) && line.trim().length > 2) row.font = { bold: true };
  row.alignment = { wrapText: false };
});
wb.worksheets.splice(0, wb.worksheets.length, wsRead, wsBlog, wsArt, wsBest, wsProd, wsTools);

const outPath = path.join(ROOT, 'pinterest-urls.xlsx');
await wb.xlsx.writeFile(outPath);
console.log(`\n✓ wrote ${outPath}`);
