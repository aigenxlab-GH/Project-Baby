/**
 * Build src/data/name-stats.json from the US Social Security Administration's
 * public-domain baby-names dataset (CC0, 1880-present).
 *
 * Source: https://www.ssa.gov/oact/babynames/names.zip  (yob<YEAR>.txt files,
 * rows are `Name,Sex,Count`). SSA only publishes names given to 5+ babies in a
 * given year, so rare/foreign names legitimately have no data — those are
 * reported as unmatched and get noindexed rather than padded with invented text.
 *
 * Usage:
 *   node scripts/build-name-stats.mjs --dir <path-to-extracted-yob-files>
 *
 * ssa.gov blocks plain automated downloads (403); fetch names.zip with a normal
 * browser User-Agent plus `--compressed` and extract it, then point --dir at it.
 *
 * IMPORTANT: the emitted JSON must only ever be imported by SERVER code
 * (the /baby-names/[name] page is force-static, so it's read at build time and
 * baked into HTML). src/lib/baby-names.ts is pulled into a client bundle by
 * BabyNamesBrowser — importing name-stats.json there would ship megabytes to
 * every visitor.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const SSA_DIR = arg('--dir', process.env.SSA_DIR);
if (!SSA_DIR || !fs.existsSync(SSA_DIR)) {
  console.error('ERROR: pass --dir <path to extracted yob*.txt files> (or set SSA_DIR)');
  process.exit(1);
}

// ── 1. Load the names we actually care about ────────────────────────────────
const namesJsonPath = path.join(ROOT, 'src/data/baby-names.json');
const allNames = JSON.parse(fs.readFileSync(namesJsonPath, 'utf8'));

// Collapse to unique slugs. 1202 records -> ~1101 slugs; a name can appear as
// both a boy and a girl record, which is real information we want to keep.
const bySlug = new Map();
for (const n of allNames) {
  const slug = n.name.toLowerCase();
  if (!bySlug.has(slug)) bySlug.set(slug, { name: n.name, genders: new Set(), records: [] });
  bySlug.get(slug).genders.add(n.gender);
  bySlug.get(slug).records.push(n);
}
console.log(`Target names: ${allNames.length} records -> ${bySlug.size} unique slugs`);

// ── 2. Walk every year file, rank within (year, sex), keep only our names ───
const yearFiles = fs
  .readdirSync(SSA_DIR)
  .filter((f) => /^yob\d{4}\.txt$/i.test(f))
  .sort();

if (yearFiles.length === 0) {
  console.error(`ERROR: no yob*.txt files found in ${SSA_DIR}`);
  process.exit(1);
}

/** slug -> sex -> [[year, count, rank], ...] */
const series = new Map();
/** year -> sex -> total births recorded (for share-of-births context) */
const yearTotals = new Map();

for (const file of yearFiles) {
  const year = Number(file.match(/(\d{4})/)[1]);
  const text = fs.readFileSync(path.join(SSA_DIR, file), 'utf8');

  const bySex = { F: [], M: [] };
  for (const line of text.split('\n')) {
    if (!line) continue;
    const [name, sex, countStr] = line.trim().split(',');
    if (!name || !sex || !countStr) continue;
    const bucket = bySex[sex];
    if (bucket) bucket.push([name, Number(countStr)]);
  }

  for (const sex of ['F', 'M']) {
    const rows = bySex[sex];
    if (!rows.length) continue;
    // SSA orders by count descending. Ties share a rank (standard competition
    // ranking: 1, 2, 2, 4) — matching how SSA publishes its own rank tables.
    rows.sort((a, b) => b[1] - a[1]);

    let total = 0;
    for (const r of rows) total += r[1];
    if (!yearTotals.has(year)) yearTotals.set(year, {});
    yearTotals.get(year)[sex] = total;

    let rank = 0;
    let prevCount = null;
    for (let i = 0; i < rows.length; i++) {
      const [name, count] = rows[i];
      if (count !== prevCount) {
        rank = i + 1;
        prevCount = count;
      }
      const slug = name.toLowerCase();
      if (!bySlug.has(slug)) continue;
      if (!series.has(slug)) series.set(slug, { F: [], M: [] });
      series.get(slug)[sex].push([year, count, rank]);
    }
  }
}

const firstYear = Number(yearFiles[0].match(/(\d{4})/)[1]);
const latestYear = Number(yearFiles[yearFiles.length - 1].match(/(\d{4})/)[1]);
console.log(`Parsed ${yearFiles.length} year files (${firstYear}-${latestYear})`);

// ── 3. Derive per-name stats ────────────────────────────────────────────────
function summarize(points) {
  if (!points.length) return null;
  let peak = points[0];
  let totalBabies = 0;
  for (const p of points) {
    totalBabies += p[1];
    // Best (lowest) rank wins; break ties on the higher count.
    if (p[2] < peak[2] || (p[2] === peak[2] && p[1] > peak[1])) peak = p;
  }
  const latest = points[points.length - 1];
  const rankAt = (year) => {
    const hit = points.find((p) => p[0] === year);
    return hit ? hit[2] : null;
  };
  return {
    series: points,
    peak: { year: peak[0], count: peak[1], rank: peak[2] },
    latest: { year: latest[0], count: latest[1], rank: latest[2] },
    firstSeen: points[0][0],
    totalBabies,
    rank5YearsAgo: rankAt(latestYear - 5),
    rank10YearsAgo: rankAt(latestYear - 10),
  };
}

const out = {};
const unmatched = [];

for (const [slug, meta] of bySlug) {
  const s = series.get(slug);
  const f = s ? summarize(s.F) : null;
  const m = s ? summarize(s.M) : null;

  if (!f && !m) {
    unmatched.push(slug);
    continue;
  }

  // Primary series = the sex this name is catalogued under; for 'neutral'
  // (or when the catalogued sex has no SSA data) fall back to whichever has
  // more recorded births, so the page always leads with the meaningful series.
  const genders = meta.genders;
  let primary = null;
  if (genders.has('girl') && f) primary = 'F';
  else if (genders.has('boy') && m) primary = 'M';
  else if (f && m) primary = f.totalBabies >= m.totalBabies ? 'F' : 'M';
  else primary = f ? 'F' : 'M';

  out[slug] = {
    name: meta.name,
    primary,
    f: f || undefined,
    m: m || undefined,
    // Share of the name across sexes over all time — drives the "used for both"
    // note on genuinely unisex names.
    splitF: f && m ? Math.round((100 * f.totalBabies) / (f.totalBabies + m.totalBabies)) : f ? 100 : 0,
  };
}

// ── 4. Write ────────────────────────────────────────────────────────────────
const outPath = path.join(ROOT, 'src/data/name-stats.json');
fs.writeFileSync(outPath, JSON.stringify({ meta: { source: 'US Social Security Administration', license: 'Public domain (CC0)', firstYear, latestYear, generated: new Date().toISOString().slice(0, 10) }, names: out }));

const unmatchedPath = path.join(ROOT, 'src/data/name-stats-unmatched.json');
fs.writeFileSync(unmatchedPath, JSON.stringify(unmatched.sort(), null, 2));

const sizeMb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
console.log(`\nMatched:   ${Object.keys(out).length}`);
console.log(`Unmatched: ${unmatched.length}  -> ${unmatchedPath}`);
console.log(`Wrote ${outPath} (${sizeMb} MB)`);
if (unmatched.length) console.log(`Sample unmatched: ${unmatched.slice(0, 15).join(', ')}`);
