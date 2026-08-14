/**
 * Rewrites the fabricated claims that check:fabrication finds in live Sanity.
 *
 * WHY THESE EXISTED UNDETECTED
 * The validator's Sanity query asked for `metaDescription`, which is not a field
 * on this document type — the real one is `description`. So product descriptions
 * were never scanned, and body text only as a flat blob. Sixteen claims sat live:
 * 13 "Expert View:" / "Expert Perspective" section headings, 2 "Expert review"
 * descriptions, and 3 invented first-person narratives, one of which also
 * claimed "one of the best-value baby purchases we have tested".
 *
 * The query and the patterns are fixed in check-fabrication.mjs. This script
 * fixes the data.
 *
 * SAFE BY DEFAULT — dry run, no token needed:
 *     node scripts/fix-sanity-claims.mjs
 *
 * To apply, pass an Editor token by environment variable only. Do not paste it
 * into a file or a chat window:
 *     SANITY_TOKEN=xxx node scripts/fix-sanity-claims.mjs --apply
 */

const PROJECT = 'mnwolxvz';
const DATASET = 'production';
const APPLY = process.argv.includes('--apply');
const TOKEN = process.env.SANITY_TOKEN;

// ── literal text replacements, applied to every span in every body block ─────
// Ordered: longest/most specific first, so a general rule cannot eat a specific
// one. Each is applied only where it matches exactly.
const TEXT_RULES = [
  // Invented first-person narratives. Replaced with the same information stated
  // impersonally — the useful product facts are kept, the fabricated scene is not.
  [
    'We live in a 650 sq ft city flat, and every square foot counts. When our midwife suggested getting a baby swing, I nearly laughed — where was I supposed to put it? Then a friend mentioned the Graco Slim Spaces, which at 7.9 inches deep is barely wider than a dinner plate. I ordered it on a Tuesday and by Wednesday it was wedged beside the kitchen island, swinging our daughter to sleep while I ate a hot meal for the first time in weeks.',
    'In a small flat every square foot counts, and a baby swing is often ruled out on size alone. The Graco Slim Spaces is built for exactly that problem: at 7.9 inches deep it is barely wider than a dinner plate, so it fits beside a kitchen island or flat against a wall instead of claiming the middle of a room.',
  ],
  [
    "When our daughter's health visitor recommended a nursery humidifier, she specified a digital one — something that showed the actual humidity reading rather than making us guess.",
    'Health visitors who recommend a nursery humidifier often specify a digital one — a unit that shows the actual humidity reading rather than leaving parents to guess.',
  ],
  [
    'Most units on the market at the time were analogue dials with no feedback.',
    'Many units are analogue dials that give no feedback at all.',
  ],
  [
    'When our second baby arrived, we knew exactly what we actually needed from a bedside crib: easy overnight access, good airflow, and something that would not take up permanent residence in our bedroom. We did not need a premium brand name. We needed a product that worked. The Kinderkraft Neste is that product - and at its price point, it is one of the best-value baby purchases we have tested.',
    'Second-time parents usually know exactly what they need from a bedside crib: easy overnight access, good airflow, and something that will not take up permanent residence in the bedroom. A premium brand name is not the requirement; a product that works is. The Kinderkraft Neste meets that brief, and at its price point it is among the better-value options in the category.',
  ],
];

// ── prefix rules for section headings ───────────────────────────────────────
// "Expert View: X" -> "X". The heading stands perfectly well on its own; the
// word "Expert" was the only part making a claim.
const HEADING_RULES = [
  [/^Expert View:\s*/i, ''],
  [/^Expert Perspective:\s*/i, ''],
  [/^Expert View on\s+/i, 'What the Guidance Says About '],
  [/^Expert Perspective on\s+/i, 'What the Guidance Says About '],
];

// ── description rules ───────────────────────────────────────────────────────
const DESC_RULES = [[/\bExpert review\b/g, 'Full review']];

function fixSpanText(t) {
  let out = t;
  for (const [from, to] of TEXT_RULES) if (out.includes(from)) out = out.split(from).join(to);
  for (const [re, to] of HEADING_RULES) out = out.replace(re, to);
  return out;
}

async function query(q) {
  const url = `https://${PROJECT}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${encodeURIComponent(q)}`;
  const res = await fetch(url, TOKEN ? { headers: { Authorization: `Bearer ${TOKEN}` } } : undefined);
  if (!res.ok) throw new Error(`query failed: ${res.status} ${await res.text()}`);
  return (await res.json()).result ?? [];
}

const docs = await query('*[_type=="productReview"]{_id,"slug":slug.current,description,body}');

const mutations = [];
let spanChanges = 0;
let descChanges = 0;

for (const doc of docs) {
  let touched = false;
  const set = {};

  if (Array.isArray(doc.body)) {
    const body = JSON.parse(JSON.stringify(doc.body));
    for (const block of body) {
      if (!Array.isArray(block.children)) continue;
      for (const child of block.children) {
        if (typeof child.text !== 'string') continue;
        const next = fixSpanText(child.text);
        if (next !== child.text) {
          console.log(`  [body] ${doc.slug}`);
          console.log(`      -  ${child.text.replace(/\s+/g, ' ').slice(0, 100)}`);
          console.log(`      +  ${next.replace(/\s+/g, ' ').slice(0, 100)}`);
          child.text = next;
          spanChanges++;
          touched = true;
        }
      }
    }
    if (touched) set.body = body;
  }

  if (typeof doc.description === 'string') {
    let d = doc.description;
    for (const [re, to] of DESC_RULES) d = d.replace(re, to);
    if (d !== doc.description) {
      console.log(`  [desc] ${doc.slug}`);
      console.log(`      -  ${doc.description.slice(0, 100)}`);
      console.log(`      +  ${d.slice(0, 100)}`);
      set.description = d;
      descChanges++;
      touched = true;
    }
  }

  if (touched) mutations.push({ patch: { id: doc._id, set } });
}

console.log(`\n  documents to update : ${mutations.length}`);
console.log(`  body spans changed  : ${spanChanges}`);
console.log(`  descriptions changed: ${descChanges}`);

if (!APPLY) {
  console.log('\n  DRY RUN — nothing written. Re-run with --apply and SANITY_TOKEN set to write.');
  process.exit(0);
}
if (!TOKEN) {
  console.error('\n  ERROR: --apply needs SANITY_TOKEN in the environment.');
  process.exit(1);
}
if (!mutations.length) {
  console.log('\n  Nothing to do.');
  process.exit(0);
}

// Host must be <project>.api.sanity.io — <project>.sanity.io is the Studio and
// will not accept mutations.
const res = await fetch(
  `https://${PROJECT}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}?returnIds=true`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  }
);
if (!res.ok) {
  console.error(`\n  MUTATE FAILED ${res.status}: ${await res.text()}`);
  process.exit(1);
}
console.log(`\n  ✓ applied to ${mutations.length} documents`);
console.log('  Next: npm run sanity-cache, then rebuild and deploy so the site picks it up.');
