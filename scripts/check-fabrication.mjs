/**
 * Recursive fabrication validator. Re-runnable; exits non-zero if anything is
 * found so it can be looped until clean. Checks repo sources AND live Sanity.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '_archive', '.open-next', 'dist']);

const CHECKS = [
  ['fabricated testing', /\b(we|i|our team)\s+(have\s+|had\s+|personally\s+)?(tested|trialled|trialed|road-tested|put .{0,20} through)\b|\bafter (weeks|months|days) of testing\b|\bin our tests\b/i],
  ['invented parent personas', /Real Parent Story|says [A-Z][a-z]+,? (a |an )?(mother|father|mum|mom|dad|parent) of/],
  ['invented expert attributions', /(explains|says|notes|according to)\s+(Dr\.?\s+)?[A-Z][a-z]+ [A-Z][a-z]+,?\s+(a |an )?(paediatric|pediatric|certified|registered|midwife|physiotherapist|sleep (consultant|researcher|educator|specialist)|lactation|nutritionist|dietitian)/],
  ['fake expert titles', /\b(Dr\.?\s+)?(Rachel Foster|Anna Bergstrom|Sarah Mitchell|Emma Richards|Emma Clarke|Lisa Thompson|Michael Thompson|Sophie Bennett)\b/],
  ['false credential claims', /\b(certified midwi\w+|medically reviewed|reviewed by (a )?(doctor|physician|midwife|nurse))\b/i],
  // Only declarative site-voice narrative counts. Reader-voice FAQ questions
  // ("How do I stop my baby scratching?") are legitimate and pervasive, so
  // questions are excluded in isAllowed() below.
  ['first-person family narrative', /\bmy (wife|husband|sister|grandmother|mother-in-law)\b|\bmy (baby|son|daughter)\b(?=[^?]*$)|\bour (midwife|health visitor|paediatrician|pediatrician|second baby|first baby|eldest|youngest)\b|\bwhen our (baby|son|daughter|first|second|child)\b/i],
  ['scene-setting fabrication', /\bit was \d{1,2}:\d{2}\s?(am|pm)\b/i],
  ['medication doses', /\b\d+(\.\d+)?\s?(mg|mcg|IU|micrograms?)\b/],
  ['dosing instructions', /\b(paracetamol|ibuprofen|calpol|nurofen|aspirin)[^.]{0,110}(times a day|every \d+ ?hours?|maximum of)/i],
  ['stale claims', /1,188|\/products\/roundups/],
  // The site is written by one named person. Claiming a team of people is the
  // same class of problem as claiming credentials nobody holds — it was still
  // on /about, the homepage, category pages and the old AuthorBox after the
  // named byline shipped, contradicting "One person, not a team" on the very
  // same page. Editorial "we" for the site as an entity is fine and not matched.
  ['team-implying claims', /\bour editorial team\b|\bour team of\b|\bour (writers|reviewers|experts|editors)\b|\bwe are (health )?writers\b|\bteam of (writers|experts|editors)\b/i],
  // Added 2026-08-13. The pattern above requires the word "our", so it read as
  // prose-only and missed `name: "PregnancySprout Editorial Team"` sitting in a
  // schema.org reviewedBy field on 40 live week-by-week pages — a medical-review
  // claim made to Google rather than to the reader. Match the entity name itself,
  // wherever it appears.
  ['editorial-team entity', /\bEditorial Team\b/],
  // Added 2026-08-14. 'fabricated testing' looks for first-person testing
  // ("I tested", "we tested") and so missed two live claims phrased around it:
  // "Learn more about how we test products" on all 113 product pages, and "tested
  // and rated by parents" on the products index -- both flatly contradicted by the
  // author bio, which says hands-on testing is not claimed.
  // `tested and rated` needs an actor: a bed guard "tested and rated for use with your mattress" is
  // the manufacturer testing to a standard, which is a legitimate product fact.
  ['implied testing', /\bhow we test\b|\btested and rated by (parents|us|our|the team)\b|\bour testing (process|method)\b/i],
  // "Expert" is a credential claim. This site is researched curation by a named
  // non-clinician, so calling its own output expert is the same class of unsupported
  // claim as the "certified midwives" line removed earlier.
  ['self-applied expert claims', /\bexpert (articles?|guidance|tips?|content|advice|reviews?|views?|perspectives?|opinions?|analysis|takes?|verdicts?)\b|\bour experts\b|\bexpert-(written|reviewed|backed)\b/i],
  // A review claim is only honest with a real named reviewer, and there is none.
  // Deliberately NOT a bare /reviewedBy/: AuthorBio takes a `reviewedBy` prop
  // that renders "Researched against NHS, WHO and NICE guidance" — a true
  // statement about sources, not a claim that anyone reviewed the page. Match
  // only the schema-object forms (`reviewedBy: {`, `"reviewedBy":`) plus prose.
  ['unbacked review claims', /\breviewedBy\s*:\s*[{'"]|"reviewedBy"\s*:|\bmedically reviewed by\b|\breviewed by (our|the) (team|editorial|medical|expert)/i],
];

// Legitimate matches that must not be reported.
const ALLOW = [
  /hands-on training/i, /if i tested/i, /if testing/i, /My Baby (Eat|Only)/,
  /not a doctor|nothing here is|not individually|do not claim|don't claim/i,
  /health visitors are registered nurses/i,
  /caffeine|coffee|\btea\b|chocolate|cola|energy drink|matcha|espresso|latte|cappuccino/i,
  /emollient|sodium|sugar|protein|omega|calcium per day for children/i,
  /provides approximately|provides roughly|200 ?mg per day|200mg\/day|under 200/i,
  /Dr\. Brown/i,                       // baby bottle brand
  /fabricat/i,                          // our own comments describing removals
  /^\s*\/\//,                           // code comments
];

// Reader-voice questions and FAQ entries are legitimate everywhere.
const QUESTIONY = [/\?/, /^\s*-\s*q:/i, /^\s*###?#?\s/, /^\s*\*\*.*\*\*\s*$/, /name:\s*['"]/];

// An attributed customer review is explicitly permitted by the project's own
// standard: a real reviewer identity carrying a verification marker. Quotes
// inside such a passage ("my baby loves this") are the CUSTOMER speaking, not
// the site claiming experience. Encoded here rather than judged case-by-case,
// so the validator can reach a true zero instead of needing manual triage.
const ATTRIBUTED_REVIEW = [
  /verified (Amazon )?(buyer|purchaser|purchase)/i,
  /Amazon Customer/i,
  /\d\s*★/,
  /\b\d(\.\d)?\s*(\/\s*5|stars?\b)/i,
  /—\s*[A-Z][A-Za-zÀ-ÿ'’.]+(\s+[A-Z][A-Za-zÀ-ÿ'’.]+)*,\s*(verified|UK|US)/i,
  /\b[A-Z][a-z]+('s)? (review|experience) (reflects|identifies|captures)/,
  /a (UK|US|Canadian|German|Spanish) parent who (purchased|bought)/i,
];

/**
 * True when the first-person phrase sits inside a quotation — i.e. someone
 * else is speaking, not the site. This is the semantic test that actually
 * separates "My daughter had woken for the fourth time" (site claiming
 * experience — a violation) from Amber Garcia's review saying "My baby loves
 * this lounger" (a customer, correctly quoted — permitted).
 * Counts quote delimiters before the match: an odd count means it opened and
 * did not close, so the match is inside the quoted span.
 */
function insideQuote(line, re) {
  const i = line.search(re);
  if (i < 0) return false;
  const before = line.slice(0, i);
  const dbl = (before.match(/["“”]/g) || []).length;
  // Apostrophes in "baby's" must not count — only quote-opening single marks.
  const sgl = (before.match(/(^|[\s(—-])['‘’]/g) || []).length;
  return dbl % 2 === 1 || sgl % 2 === 1;
}

function isAllowed(line, rel = '') {
  if (ALLOW.some((r) => r.test(line))) return true;
  if (QUESTIONY.some((r) => r.test(line))) return true;
  if (ATTRIBUTED_REVIEW.some((r) => r.test(line))) return true;
  if (insideQuote(line, /\bmy (wife|husband|sister|grandmother|mother-in-law|baby|son|daughter)\b/i)) return true;
  // Same exemption for the widened first-person pattern: quoted = customer
  // speaking, unquoted = site claiming. See feedback_no_fabricated_content.
  if (insideQuote(line, /\bour (midwife|health visitor|second baby|first baby)\b|\bwhen our (baby|son|daughter|first|second|child)\b/i)) return true;
  // The named author's real, verifiable bio is the point, not a violation.
  if (/config\/authors\.ts$|app\/about\/page\.tsx$/.test(rel)) return true;
  // Caffeine article: dietary limits attributed to NHS/WHO/ACOG, not medication.
  if (/caffeine-pregnancy-safe-amount\.mdx$/.test(rel)) return true;
  return false;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(mdx|md|tsx?|jsx?|mjs|json|txt)$/.test(e.name)) out.push(p);
  }
  return out;
}

const findings = [];

// ── repo sources ────────────────────────────────────────────────────────────
for (const sub of ['src', 'content', 'public', 'scripts']) {
  const dir = path.join(ROOT, sub);
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    // Skip this validator: its own pattern definitions contain the strings it hunts for.
    if (file.endsWith('check-fabrication.mjs')) continue;
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    let text;
    try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
    // Big generated data files: check as one blob, report once.
    const lines = text.length > 2_000_000 ? [text] : text.split('\n');
    const isCode = /\.(tsx?|jsx?|mjs|cjs)$/.test(rel);
    lines.forEach((line, i) => {
      if (isAllowed(line, rel)) return;
      // A code comment ships to nobody. Applied only to the two categories below,
      // because they legitimately match the notes we leave explaining a removal.
      const comment = isCode && /^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line);
      for (const [label, re] of CHECKS) {
        // Doses only matter in prose content, not code/data.
        if (label === 'medication doses' && !rel.startsWith('content/')) continue;
        if (comment && (label === 'editorial-team entity' || label === 'unbacked review claims')) continue;
        if (re.test(line)) {
          findings.push({ where: rel, line: text.length > 2_000_000 ? '(blob)' : i + 1, label, snippet: line.trim().slice(0, 110) });
          break;
        }
      }
    });
  }
}

// ── live Sanity ─────────────────────────────────────────────────────────────
// Every text-bearing field, not a hand-picked subset. The old query asked for
// `metaDescription`, which does not exist on this document type -- the real field
// is `description` -- so product descriptions were never scanned at all, and body
// text was only checked as a flat blob. That is how 18 claims sat live and
// undetected: 13 "Expert View:" section headings, 3 invented first-person
// narratives ("When our midwife suggested..."), and 2 "Expert review" descriptions.
// If a field is added to the schema, add it here.
const q = '*[_type=="productReview"]{"slug":slug.current,author,title,productName,description,excerpt,bestFor,award,"body":pt::text(body),"bottom":bottomLine,pros,cons,"faqtext":faqs[].q + faqs[].a,"specs":specsTable[].value}';
const res = await fetch(`https://mnwolxvz.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(q)}`);
const products = (await res.json()).result ?? [];
for (const p of products) {
  // Mirrors the projection above. `metaDescription` was listed here and is not a
  // real field, so it silently contributed nothing.
  const text = [
    p.body, p.bottom, p.description, p.excerpt, p.title, p.productName, p.bestFor,
    p.award, p.author,
    (p.pros || []).join(' '), (p.cons || []).join(' '),
    (p.faqtext || []).join(' '), (p.specs || []).join(' '),
  ].filter(Boolean).join('\n');
  for (const line of text.split('\n')) {
    if (isAllowed(line)) continue;
    for (const [label, re] of CHECKS) {
      if (label === 'medication doses') continue; // product specs legitimately carry weights
      if (re.test(line)) { findings.push({ where: `sanity:${p.slug}`, line: '-', label, snippet: line.trim().slice(0, 110) }); break; }
    }
  }
}

// ── report ──────────────────────────────────────────────────────────────────
const byLabel = {};
findings.forEach((f) => { (byLabel[f.label] ||= []).push(f); });

console.log(`Repo files scanned + ${products.length} live Sanity products\n`);
for (const [label] of CHECKS) {
  const hits = byLabel[label] || [];
  console.log(`  ${hits.length === 0 ? 'PASS' : 'FAIL'}  ${label.padEnd(32)} ${hits.length}`);
}
if (findings.length) {
  console.log('\n--- findings ---');
  findings.slice(0, 25).forEach((f) => console.log(`  [${f.label}] ${f.where}:${f.line}\n      ${f.snippet}`));
  if (findings.length > 25) console.log(`  ...and ${findings.length - 25} more`);
}
console.log(`\nTOTAL ISSUES: ${findings.length}`);
process.exitCode = findings.length ? 1 : 0;
