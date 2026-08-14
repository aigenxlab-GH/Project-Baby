/**
 * Builds "where is this name most popular" data from the SSA's state-level
 * dataset.
 *
 * Source: https://www.ssa.gov/oact/babynames/namesbystate.zip
 * 51 files (50 states + DC), format: STATE,SEX,YEAR,NAME,COUNT — 6.7 million
 * rows, ~131 MB extracted. ssa.gov returns 403 to automated downloads (Akamai),
 * so the zip must be fetched in a browser and extracted, then passed via --dir.
 *
 * The raw data is far too large to ship. This reduces it to the top 5 states per
 * name for the latest year — ~54 KB, small enough to import directly. Do not be
 * tempted to ship more of it: see the note in src/lib/name-stats.ts about the
 * 3 MiB Cloudflare Worker limit.
 *
 * COVERAGE CAVEAT, and why pages must handle a miss:
 * the SSA suppresses any state/year/name count below 5 to protect privacy. So a
 * name can be nationally ranked and still have no state rows at all. About 160
 * of our 1,085 names are in that position. Those pages render nothing here
 * rather than a guess.
 *
 * Run:  node scripts/build-name-states.mjs --dir <path to extracted *.TXT>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const DIR = arg('--dir', process.env.SSA_STATE_DIR);
const TOP_N = Number(arg('--top', '5'));

if (!DIR || !fs.existsSync(DIR)) {
  console.error('ERROR: pass --dir <path to extracted namesbystate *.TXT files> (or set SSA_STATE_DIR)');
  process.exit(1);
}

const files = fs.readdirSync(DIR).filter((f) => /^[A-Z]{2}\.TXT$/i.test(f)).sort();
if (!files.length) {
  console.error(`ERROR: no <STATE>.TXT files found in ${DIR}`);
  process.exit(1);
}

// Only names this site has a page for — everything else would be dead weight.
const statsPath = path.join(ROOT, 'src/data/name-stats.json');
if (!fs.existsSync(statsPath)) {
  console.error('ERROR: src/data/name-stats.json missing — run `npm run name-stats` first.');
  process.exit(1);
}
const { names: ourNames, meta: statsMeta } = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
const ours = new Set(Object.keys(ourNames));
const YEAR = statsMeta.latestYear;

/** slug -> { STATE: births } for YEAR, summed across both sex rows. */
const byName = new Map();
let rows = 0;

for (const file of files) {
  const text = fs.readFileSync(path.join(DIR, file), 'utf8');
  for (const line of text.split('\n')) {
    if (!line) continue;
    rows++;
    const [state, , year, name, count] = line.trim().split(',');
    if (Number(year) !== YEAR) continue;
    const slug = name.toLowerCase();
    if (!ours.has(slug)) continue;
    let m = byName.get(slug);
    if (!m) byName.set(slug, (m = {}));
    // A unisex name has separate F and M rows per state; the question this
    // answers is "where is this name used most", so both are counted.
    m[state] = (m[state] || 0) + Number(count);
  }
}

const out = { meta: {}, names: {} };
let totalStates = 0;
for (const [slug, m] of byName) {
  const top = Object.entries(m)
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N)
    .map(([state, births]) => [state, births]);
  if (!top.length) continue;
  out.names[slug] = top;
  totalStates += top.length;
}

out.meta = {
  source: 'US Social Security Administration (state-level)',
  license: 'Public domain (CC0)',
  year: YEAR,
  topN: TOP_N,
  namesCovered: Object.keys(out.names).length,
  namesTotal: ours.size,
  note: 'Counts below 5 per state are suppressed by the SSA, so some names have no state data.',
  generated: new Date().toISOString().slice(0, 10),
};

const outPath = path.join(ROOT, 'src/data/name-states.json');
fs.writeFileSync(outPath, JSON.stringify(out));

const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
console.log(`✓ name-states.json  year ${YEAR}`);
console.log(`  parsed ${rows.toLocaleString()} rows from ${files.length} state files`);
console.log(`  covered ${out.meta.namesCovered} of ${out.meta.namesTotal} names (${totalStates} name/state pairs)`);
console.log(`  ${kb} KB -> src/data/name-states.json`);
const sample = out.names['emma'];
if (sample) console.log(`  example emma: ${sample.map(([s, c]) => `${s} ${c}`).join(', ')}`);
