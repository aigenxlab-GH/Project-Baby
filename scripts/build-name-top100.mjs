/**
 * Builds the true national top 100 baby names from the SSA's raw yob*.txt files.
 *
 * WHY THIS EXISTS SEPARATELY FROM build-name-stats.mjs
 * That script only keeps names present in src/data/baby-names.json, because its
 * job is to attach a popularity series to pages this site actually has. The
 * consequence is that it cannot answer "what are the 100 most popular names",
 * only "what are the most popular names we happen to cover" — and 14 girls' and
 * 24 boys' ranks inside the national top 100 belong to names with no page here.
 *
 * /baby-names/top-100 needs the real list. It renders every name at its true
 * rank and links only the ones that have a page, rather than skipping ranks or
 * inventing entries.
 *
 * Ranking matches build-name-stats.mjs exactly: sort by count descending within
 * (year, sex), ties share a rank (competition ranking: 1, 2, 2, 4), which is how
 * the SSA publishes its own tables.
 *
 * Source: https://www.ssa.gov/oact/babynames/names.zip
 * ssa.gov returns 403 to automated downloads (Akamai), so the zip must be
 * fetched in a browser and extracted, then passed here.
 *
 * Run:  node scripts/build-name-top100.mjs --dir <path to extracted yob*.txt>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const SSA_DIR = arg('--dir', process.env.SSA_DIR);
const LIMIT = Number(arg('--limit', '100'));

if (!SSA_DIR || !fs.existsSync(SSA_DIR)) {
  console.error('ERROR: pass --dir <path to extracted yob*.txt files> (or set SSA_DIR)');
  process.exit(1);
}

const yearFiles = fs
  .readdirSync(SSA_DIR)
  .filter((f) => /^yob\d{4}\.txt$/i.test(f))
  .sort();

if (!yearFiles.length) {
  console.error(`ERROR: no yob*.txt files found in ${SSA_DIR}`);
  process.exit(1);
}

/** Returns { F: Map<name, {rank, births}>, M: ... } for one year file. */
function ranksForYear(file) {
  const text = fs.readFileSync(path.join(SSA_DIR, file), 'utf8');
  const bySex = { F: [], M: [] };
  for (const line of text.split('\n')) {
    if (!line) continue;
    const [name, sex, countStr] = line.trim().split(',');
    if (!name || !sex || !countStr) continue;
    bySex[sex]?.push([name, Number(countStr)]);
  }

  const out = { F: new Map(), M: new Map() };
  for (const sex of ['F', 'M']) {
    const rows = bySex[sex];
    rows.sort((a, b) => b[1] - a[1]);
    let rank = 0;
    let prevCount = null;
    rows.forEach(([name, count], i) => {
      if (count !== prevCount) {
        rank = i + 1;
        prevCount = count;
      }
      out[sex].set(name, { rank, births: count });
    });
  }
  return out;
}

const latestFile = yearFiles[yearFiles.length - 1];
const latestYear = Number(latestFile.match(/(\d{4})/)[1]);
const priorFile = yearFiles.find((f) => Number(f.match(/(\d{4})/)[1]) === latestYear - 5);

const latest = ranksForYear(latestFile);
const prior = priorFile ? ranksForYear(priorFile) : { F: new Map(), M: new Map() };

// Same thresholds as computeTrend() in src/lib/name-stats.ts. Kept in sync
// deliberately: the top-100 table and each name's own page must not disagree
// about whether a name is rising.
function trendOf(rankNow, rankThen) {
  if (rankThen == null) return 'unknown';
  const delta = rankThen - rankNow;
  const threshold = Math.max(5, Math.round(rankThen * 0.1));
  if (delta > threshold) return 'rising';
  if (delta < -threshold) return 'falling';
  return 'stable';
}

function topFor(sex) {
  return [...latest[sex].entries()]
    .filter(([, v]) => v.rank <= LIMIT)
    .sort((a, b) => a[1].rank - b[1].rank)
    .map(([name, v]) => {
      const then = prior[sex].get(name)?.rank ?? null;
      return {
        rank: v.rank,
        name,
        slug: name.toLowerCase(),
        births: v.births,
        rank5YearsAgo: then,
        trend: trendOf(v.rank, then),
      };
    });
}

const out = {
  meta: {
    source: 'US Social Security Administration',
    license: 'Public domain (CC0)',
    year: latestYear,
    comparisonYear: priorFile ? latestYear - 5 : null,
    limit: LIMIT,
    generated: new Date().toISOString().slice(0, 10),
  },
  girls: topFor('F'),
  boys: topFor('M'),
};

const outPath = path.join(ROOT, 'src/data/name-top100.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`✓ name-top100.json  year ${latestYear} (vs ${out.meta.comparisonYear ?? 'n/a'})`);
console.log(`  girls: ${out.girls.length}  ranks ${out.girls[0].rank}-${out.girls[out.girls.length - 1].rank}`);
console.log(`  boys:  ${out.boys.length}  ranks ${out.boys[0].rank}-${out.boys[out.boys.length - 1].rank}`);
console.log(`  ${kb} KB -> src/data/name-top100.json`);
console.log(`  top 3 girls: ${out.girls.slice(0, 3).map((g) => `#${g.rank} ${g.name}`).join(', ')}`);
console.log(`  top 3 boys:  ${out.boys.slice(0, 3).map((b) => `#${b.rank} ${b.name}`).join(', ')}`);
