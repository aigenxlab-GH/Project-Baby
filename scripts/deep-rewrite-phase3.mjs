/**
 * Phase 3: Deep-rewrite every remaining shallow product review (< 1,000-word body)
 * up to 1,300–1,600 words of genuinely useful, UNIQUE content.
 *
 * Anchoring rule: each rewrite is grounded ONLY in the facts already present in
 * the file's frontmatter (productName, brand, priceRange, ourScore, pros, cons,
 * specsTable, faqs, bottomLine). The model is instructed NOT to invent new prices,
 * weights, dimensions, certifications, or study citations. Depth comes from
 * accurate, evergreen category buying-guidance — not fabricated specifics.
 *
 * Frontmatter is preserved verbatim. The existing "## Related Articles" internal
 * links are extracted and re-appended so internal linking/SEO is retained.
 *
 * Resumable: re-running automatically skips any review already over the threshold,
 * so if it crashes midway you can just run it again.
 *
 * Usage:
 *   node scripts/deep-rewrite-phase3.mjs               # all eligible reviews
 *   node scripts/deep-rewrite-phase3.mjs --limit 3     # first 3 only (test batch)
 *   node scripts/deep-rewrite-phase3.mjs --only sippy   # only paths containing "sippy"
 *   node scripts/deep-rewrite-phase3.mjs --dry          # show what would run, no API calls
 *
 * Env:
 *   ANTHROPIC_API_KEY   required (loaded from .env.local)
 *   MODEL               optional, default claude-opus-4-8
 *   CONCURRENCY         optional, default 4
 *   MIN_WORDS           optional body-word threshold, default 1000
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import Anthropic from '@anthropic-ai/sdk';

// dotenv/config loads .env; also load .env.local explicitly (overrides)
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local', override: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(projectRoot, 'content', 'products');

const MODEL = process.env.MODEL || 'claude-opus-4-8';
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const MIN_WORDS = Number(process.env.MIN_WORDS || 1000);
const TARGET_LOW = 1300;
const TARGET_HIGH = 1600;

// ── args ──────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getFlag = (name) => args.includes(`--${name}`);
const getOpt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const LIMIT = getOpt('limit') ? Number(getOpt('limit')) : Infinity;
const ONLY = getOpt('only');
const DRY = getFlag('dry');

if (!process.env.ANTHROPIC_API_KEY && !DRY) {
  console.error('ERROR: ANTHROPIC_API_KEY not set (looked in .env.local). Aborting.');
  process.exit(1);
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── helpers ─────────────────────────────────────────────────────────────────
function walk(d) {
  let r = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) r = r.concat(walk(p));
    else if (e.name.endsWith('.mdx')) r.push(p);
  }
  return r;
}

const wordCount = (s) => s.trim().split(/\s+/).filter(Boolean).length;

// Pull a trailing "## Related Articles" block (internal links) out of a body.
function extractRelated(body) {
  const m = body.match(/\n##\s+Related Articles[\s\S]*$/i);
  if (!m) return { body, related: '' };
  return { body: body.slice(0, m.index).trimEnd(), related: m[0].trim() };
}

// Strip any H1 and any model-generated Related Articles section.
function sanitizeGenerated(text) {
  let t = text.trim();
  // remove leading H1 if present
  t = t.replace(/^#\s+.*\n+/, '');
  // remove any Related Articles section the model added despite instructions
  t = t.replace(/\n##\s+Related Articles[\s\S]*$/i, '').trimEnd();
  return t;
}

const SYSTEM = `You are a senior baby-gear reviewer writing for PregnancySprout, a pregnancy & baby product review site monetised by affiliate links and display ads. You write genuinely useful, specific, honest reviews that help parents make a confident buying decision.

ABSOLUTE RULES — factual integrity:
- Use ONLY the factual data provided in the brief (product name, brand, price range, score, pros, cons, specs, FAQs, bottom line). These are the ground truth.
- Do NOT invent specific prices, exact weights, dimensions, model numbers, certification names, brand-funded studies, or statistics that are not in the brief. Fabricated specs on a review site mislead buyers and create liability.
- Where you need specifics, draw them from the provided specs/pros/cons.
- You MAY (and should) add genuinely accurate, evergreen category guidance that applies to this TYPE of product: how to choose one, what features matter, safe-use practices, typical age ranges, common mistakes, when to upgrade. This is where legitimate depth comes from.

STYLE:
- Honest and balanced. Surface the real limitations (use the provided cons) — do not write an advertisement.
- Vary structure and section headings between reviews. Do NOT follow a fixed template. Each review must read as uniquely written.
- Knowledgeable, direct, parent-to-parent tone. No marketing fluff, no "in conclusion", no em-dash overuse.
- Length: ${TARGET_LOW}–${TARGET_HIGH} words.

FORMAT:
- Markdown. Begin with a short bold lead paragraph that names the product (in **bold**) and states who it is for.
- Use ## section headings (no H1). Use bullet lists where helpful.
- Include a clear verdict section near the end that references the provided score.
- Do NOT output a "Related Articles" section — internal links are appended automatically.
- Do NOT restate the YAML frontmatter. Output only the article body in Markdown.`;

function buildBrief(fm, category, currentBody) {
  const facts = {
    productName: fm.productName,
    brand: fm.brand,
    category,
    modelYear: fm.modelYear,
    priceRange: fm.priceRange,
    approxPrice: (fm.affiliateLinks && fm.affiliateLinks[0] && fm.affiliateLinks[0].price) || undefined,
    ourScore: fm.ourScore,
    starRating: fm.starRating,
    pros: fm.pros,
    cons: fm.cons,
    specsTable: fm.specsTable,
    faqs: fm.faqs,
    bottomLine: fm.bottomLine,
  };
  return `Write the deep-dive review body for the following product. Ground every specific claim in these facts; expand with accurate category buying-guidance for depth.

PRODUCT FACTS (JSON):
${JSON.stringify(facts, null, 2)}

For reference, here is the current shorter draft (rewrite and substantially expand it; keep what is accurate, deepen the reasoning, remove any repetitive boilerplate, and make the structure feel bespoke):
"""
${currentBody.slice(0, 4000)}
"""

Write ${TARGET_LOW}–${TARGET_HIGH} words of unique, useful Markdown now.`;
}

async function rewriteOne(file) {
  const rel = path.relative(contentRoot, file).split(path.sep).join('/');
  const category = rel.split('/')[0];
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
  const { data: fm, content } = matter(raw);
  const { related } = extractRelated(content);

  const brief = buildBrief(fm, category, content);

  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const msg = await client.messages.create({
        model: MODEL,
        max_tokens: 4096,
        system: SYSTEM,
        messages: [{ role: 'user', content: brief }],
      });
      const text = msg.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
      let newBody = sanitizeGenerated(text);
      if (related) newBody = `${newBody}\n\n${related}\n`;

      const words = wordCount(newBody);
      if (words < 1100) {
        // too short — retry once more with a nudge
        if (attempt < 4) {
          await new Promise((r) => setTimeout(r, 800 * attempt));
          continue;
        }
      }

      const newFile = matter.stringify(newBody.trim() + '\n', fm);
      fs.writeFileSync(file, newFile, 'utf8');
      return { rel, words, ok: true };
    } catch (e) {
      lastErr = e;
      const wait = 1500 * attempt;
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  return { rel, ok: false, error: String(lastErr && lastErr.message || lastErr) };
}

// simple concurrency pool
async function runPool(items, worker, concurrency) {
  const results = [];
  let idx = 0;
  let done = 0;
  async function next() {
    const i = idx++;
    if (i >= items.length) return;
    const r = await worker(items[i]);
    results[i] = r;
    done++;
    const tag = r.ok ? `✅ ${String(r.words).padStart(4)}w` : `❌ FAILED`;
    console.log(`[${String(done).padStart(3)}/${items.length}] ${tag}  ${r.rel}${r.error ? '  — ' + r.error : ''}`);
    await next();
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
  return results;
}

// ── main ──────────────────────────────────────────────────────────────────────
(async () => {
  const all = walk(contentRoot);
  let eligible = all
    .map((f) => {
      const raw = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
      const { content } = matter(raw);
      return { f, words: wordCount(content) };
    })
    .filter((x) => x.words < MIN_WORDS)
    .sort((a, b) => a.words - b.words)
    .map((x) => x.f);

  if (ONLY) eligible = eligible.filter((f) => f.toLowerCase().includes(ONLY.toLowerCase()));
  if (Number.isFinite(LIMIT)) eligible = eligible.slice(0, LIMIT);

  console.log(`Model: ${MODEL} | concurrency: ${CONCURRENCY} | threshold: <${MIN_WORDS} words`);
  console.log(`Eligible reviews to rewrite: ${eligible.length}${DRY ? '  (DRY RUN — no API calls)' : ''}\n`);

  if (DRY) {
    eligible.forEach((f) => console.log('  •', path.relative(contentRoot, f).split(path.sep).join('/')));
    return;
  }
  if (eligible.length === 0) {
    console.log('Nothing to do — all reviews already meet the threshold.');
    return;
  }

  const t0 = Date.now();
  const results = await runPool(eligible, rewriteOne, CONCURRENCY);
  const ok = results.filter((r) => r && r.ok).length;
  const failed = results.filter((r) => r && !r.ok);
  const avg = Math.round(results.filter((r) => r && r.ok).reduce((s, r) => s + r.words, 0) / Math.max(ok, 1));

  console.log(`\n──────────────────────────────────────────`);
  console.log(`Done in ${Math.round((Date.now() - t0) / 1000)}s — ${ok}/${eligible.length} rewritten, avg ${avg} words.`);
  if (failed.length) {
    console.log(`\n${failed.length} FAILED (re-run the script to retry just these):`);
    failed.forEach((r) => console.log('  ❌', r.rel, '—', r.error));
  }
  console.log(`\nNext: run "npm run content-cache" (or the full build) to regenerate the JSON the site serves.`);
})();
