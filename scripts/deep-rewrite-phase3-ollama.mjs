/**
 * Phase 3 (Groq FREE): deep-rewrite every shallow product review to 1,500+ words.
 * Uses llama-3.1-8b-instant (131k TPM free tier) with a two-pass expand strategy:
 *   Pass 1 — write full review
 *   Pass 2 — if under 1450w, expand with additional sections until 1500+
 *
 * Get a free Groq key at https://console.groq.com
 *
 * Usage:
 *   node scripts/deep-rewrite-phase3-ollama.mjs              # all eligible
 *   node scripts/deep-rewrite-phase3-ollama.mjs --limit 3    # test on 3
 *   node scripts/deep-rewrite-phase3-ollama.mjs --dry        # preview list
 *
 * Env (set in .env.local):
 *   GROQ_API_KEY   required
 *   GROQ_MODEL     default "llama-3.1-8b-instant"
 *   CONCURRENCY    default 4
 *   MIN_WORDS      threshold to skip already-done files, default 1000
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(path.resolve(__dirname, '..'), 'content', 'products');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || 'qwen/qwen3-32b';
const CONCURRENCY = Number(process.env.CONCURRENCY || 2);
const MIN_WORDS = Number(process.env.MIN_WORDS || 1000);
const TARGET = 1500;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const args = process.argv.slice(2);
const getFlag = (n) => args.includes(`--${n}`);
const getOpt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
const LIMIT = getOpt('limit') ? Number(getOpt('limit')) : Infinity;
const ONLY = getOpt('only');
const DRY = getFlag('dry');

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

function extractRelated(body) {
  const m = body.match(/\n##\s+Related Articles[\s\S]*$/i);
  if (!m) return { body, related: '' };
  return { body: body.slice(0, m.index).trimEnd(), related: m[0].trim() };
}
function sanitize(text) {
  let t = text.trim();
  t = t.replace(/^```(?:markdown)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
  t = t.replace(/^#\s+.*\n+/, '');
  t = t.replace(/\n##\s+Related Articles[\s\S]*$/i, '').trimEnd();
  return t;
}

async function callGroq(messages) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages, max_tokens: 3000, temperature: 0.7 }),
  });
  if (res.status === 429) {
    const wait = (Number(res.headers.get('retry-after') || 15) + 2) * 1000;
    await new Promise((r) => setTimeout(r, wait));
    return callGroq(messages);
  }
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  return (await res.json()).choices?.[0]?.message?.content || '';
}

const SYSTEM = `You are a senior baby-gear reviewer writing for PregnancySprout. Write genuinely useful, honest, specific reviews that help parents decide.

RULES:
- Use ONLY facts from the brief (name, brand, price, score, pros, cons, specs, FAQs, bottom line). Do NOT invent specs.
- Add accurate evergreen buying guidance for this product TYPE for depth.
- Honest and balanced — surface the real cons. Not an advertisement.
- Markdown only. Start with a bold lead paragraph. Use ## headings (no H1). Include a verdict section referencing the score.
- Do NOT add a "Related Articles" section.
- Do NOT wrap in code fences. Output article body only.`;

function buildBrief(fm, category, currentBody) {
  const facts = {
    productName: fm.productName, brand: fm.brand, category,
    priceRange: fm.priceRange,
    price: fm.affiliateLinks?.[0]?.price,
    ourScore: fm.ourScore, starRating: fm.starRating,
    pros: fm.pros, cons: fm.cons,
    specsTable: fm.specsTable, faqs: fm.faqs, bottomLine: fm.bottomLine,
  };
  return `Write a deep-dive review for this product. Use the facts below. Add category buying-guidance for depth.

FACTS: ${JSON.stringify(facts, null, 2)}

Existing draft (rewrite and expand it):
"""
${currentBody.slice(0, 800)}
"""

Write a complete review with these 7 sections (write each section fully before moving to the next):
1. **Bold lead paragraph** — product name in bold, who it's for, key benefit (100w)
2. ## Design & Build — materials, size, aesthetics, feel in hand (200w)
3. ## Performance — how well it does its main job, key features from pros (250w)
4. ## What We Like — expand top 3 pros with real-world parent scenarios (200w)
5. ## Drawbacks — honest expanded coverage of each con, no softening (200w)
6. ## Buying Guide — how to choose this product type, age range, safety tips, common mistakes (250w)
7. ## Verdict — score out of 10, who should buy, who should look elsewhere (150w)

Write all 7 sections now. Total must be 1500+ words.`;
}

async function expandReview(existingBody, productName) {
  return callGroq([
    { role: 'system', content: SYSTEM },
    { role: 'user', content: `The following baby product review for "${productName}" is too short. Expand it to at least 1500 words by:
1. Adding more specific detail and real-world context to each existing section
2. Adding a new ## Safe Use & Setup section (200 words) with practical setup tips and safety advice
3. Adding a new ## How It Compares section (200 words) comparing to similar products in this category

Return the COMPLETE expanded review including all original sections plus the new ones. Do not truncate. Do not add Related Articles.

EXISTING REVIEW:
${existingBody}` },
  ]);
}

async function rewriteOne(file) {
  const rel = path.relative(contentRoot, file).split(path.sep).join('/');
  const category = rel.split('/')[0];
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
  const { data: fm, content } = matter(raw);
  const { related } = extractRelated(content);

  try {
    // Pass 1: write full review
    let body = sanitize(await callGroq([
      { role: 'system', content: SYSTEM },
      { role: 'user', content: buildBrief(fm, category, content) },
    ]));

    // Pass 2: expand if still under target
    if (wordCount(body) < TARGET) {
      const expanded = sanitize(await expandReview(body, fm.productName || rel));
      if (wordCount(expanded) > wordCount(body)) body = expanded;
    }

    if (related) body = `${body}\n\n${related}\n`;
    fs.writeFileSync(file, matter.stringify(body.trim() + '\n', fm), 'utf8');
    return { rel, words: wordCount(body), ok: true };
  } catch (e) {
    return { rel, ok: false, error: String(e.message || e) };
  }
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let idx = 0, done = 0;
  async function next() {
    const i = idx++;
    if (i >= items.length) return;
    const r = await worker(items[i]);
    results[i] = r; done++;
    const tag = r.ok ? `✅ ${String(r.words).padStart(4)}w` : `❌ FAILED`;
    console.log(`[${String(done).padStart(3)}/${items.length}] ${tag}  ${r.rel}${r.error ? '  — ' + r.error : ''}`);
    await next();
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
  return results;
}

(async () => {
  if (!GROQ_API_KEY && !DRY) { console.error('ERROR: GROQ_API_KEY not set in .env.local'); process.exit(1); }

  const all = walk(contentRoot);
  let eligible = all
    .map((f) => { const { content } = matter(fs.readFileSync(f, 'utf8').replace(/^﻿/, '')); return { f, words: wordCount(content) }; })
    .filter((x) => x.words < MIN_WORDS)
    .sort((a, b) => a.words - b.words)
    .map((x) => x.f);

  if (ONLY) eligible = eligible.filter((f) => f.toLowerCase().includes(ONLY.toLowerCase()));
  if (Number.isFinite(LIMIT)) eligible = eligible.slice(0, LIMIT);

  console.log(`Groq | model: ${MODEL} | concurrency: ${CONCURRENCY} | threshold: <${MIN_WORDS}w | target: ${TARGET}+w`);
  console.log(`Eligible: ${eligible.length}${DRY ? '  (DRY RUN)' : ''}\n`);

  if (DRY) { eligible.forEach((f) => console.log('  •', path.relative(contentRoot, f).split(path.sep).join('/'))); return; }
  if (!eligible.length) { console.log('Nothing to do.'); return; }

  const t0 = Date.now();
  const results = await runPool(eligible, rewriteOne, CONCURRENCY);
  const ok = results.filter((r) => r?.ok);
  const failed = results.filter((r) => r && !r.ok);
  const avg = Math.round(ok.reduce((s, r) => s + r.words, 0) / Math.max(ok.length, 1));

  console.log(`\n──────────────────────────────────────────`);
  console.log(`Done in ${Math.round((Date.now() - t0) / 1000)}s — ${ok.length}/${eligible.length} rewritten, avg ${avg}w`);
  if (failed.length) { console.log(`\n${failed.length} FAILED:`); failed.forEach((r) => console.log('  ❌', r.rel, '—', r.error)); }
  console.log(`\nNext: npm run content-cache`);
})();
