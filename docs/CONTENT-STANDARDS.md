# Content standards and how they are enforced

This site is written by one named person, **Sandeep Singsarva**, who works in IT and is not a
clinician. Everything below follows from that single fact: the site earns trust by being accurate
and honest about what it is, not by claiming expertise it does not have.

Two committed validators enforce it. Run both before any content change ships:

```bash
npm run check:fabrication   # 15 categories, repo + all 113 live Sanity products
npm run check:links         # 4 categories, offline; add -- --live to sweep production
```

Both exit non-zero on any finding, so they can gate a build.

---

## Why these exist

Ad-hoc greps kept giving different answers to the same question. One pass reported "67 internal
links" where the true answer was 46 occurrences across 31 files — `grep -n` counts lines, `grep -o`
counts occurrences, and the scope drifted in and out of generated caches. Scope, unit and exclusions
now live in committed files so the number is reproducible.

**Every count either script prints states its unit and scope. Report them the same way — never a
bare number.**

---

## The standing rules

### 1. No fabricated experience, credentials, testing or people

No invented author personas, no fake expert names, no claimed hands-on testing. Product research is
manufacturer specifications, safety certifications, current pricing, and patterns in verified
customer reviews — and the site says exactly that.

**The one permitted exception:** an attributed customer review carrying a verification marker
(a named reviewer, "verified Amazon buyer", a star rating). The test is:

> **Quoted = the customer speaking. Unquoted = the site claiming.**

Roughly 55 products carry these. They are legitimate and must be left alone. The validator
implements this via `insideQuote()`, which checks whether the match falls inside an open quoted
span.

Reader-voice FAQ questions ("How often should I trim my baby's nails?") are also legitimate and
excluded — a question is not an assertion.

### 2. No self-applied "expert"

The site's own output is never "expert articles", "expert advice", "expert tips", "Expert View" or
"expert-backed". Naming an *external* body is fine and encouraged ("NHS guidance", "AAP policy").
Calling our own writing expert is a credential claim of the same class as the invented "certified
midwives" removed earlier.

### 3. No dosing, ever

No amount of any medicine or supplement, anywhere. Keep *what* a nutrient does and *why*; send *how
much* to the reader's midwife, GP, pharmacist or the packet. Dietary figures (caffeine limits,
calcium in milk) are food facts and are fine.

### 4. No invented metrics

No score, star rating or index the site computed itself and presents as a measurement. Show the
source's published number, or nothing. **Baby-name pages carry zero rating fields and must stay that
way.** `ourScore` and `starRating` on products are disclosed editorial scores with a stated method —
that is different, and the method must remain stated.

### 5. No unverifiable state

No stock availability: the site has no stock feed, so any value is a guess. `availability` is
deliberately absent from the `Offer` schema and there is no `inStock` field.

> The `available` flag on Sanity region links is **not** a stock check and must not become one. It
> records whether an ASIN is listed on that storefront at all — 5 links are `false` because the
> product has no listing in that country. Dropping that filter sends those visitors to dead Amazon
> pages.

### 6. No declared profile, address or affiliation that does not exist

Everything in `siteConfig.social` is emitted to Google as an Organization `sameAs` — a claim that
the profile is us — *and* rendered as a footer link. Currently exactly two: Pinterest and LinkedIn
(the **personal** profile; there is no company page). Add a platform only once the account is live.
The Organization schema carries no postal address, because no page on the site states a location.

### 7. Counts are derived, never typed

A hand-typed count of your own content only ever drifts one way. The blog index once advertised
"214+ guides" against an actual 208; the homepage "180+ expert articles" against the same 208; the
products index "28 categories" against 27. All are now computed from the data they describe.

### 8. No "AI" wording in site content

Use neutral phrasing — fact-checked, verified, researched, reviewed against published guidance.

---

## `check:fabrication` — the 15 categories

| Category | Catches |
|---|---|
| fabricated testing | "we tested", "we **have** tested", "in our tests", "hands-on tested" |
| implied testing | "how we test", "tested and rated **by** parents/us" |
| invented parent personas | "Real Parent Story", "says Emma, a mother of two" |
| invented expert attributions | "explains Dr. Jane Smith, a paediatric sleep consultant" |
| fake expert titles | the specific invented names previously used |
| false credential claims | "certified midwife", "medically reviewed" |
| self-applied expert claims | "expert articles/advice/tips/reviews/**View**/**Perspective**" |
| editorial-team entity | "Editorial Team" anywhere |
| unbacked review claims | schema-object `reviewedBy:` forms, "medically reviewed by" |
| team-implying claims | "our editorial team", "our team of writers" |
| first-person family narrative | "my wife", "our midwife", "when our second baby" |
| scene-setting fabrication | "it was 3:47 am" |
| medication doses | any `mg`/`mcg`/`IU` figure, in `content/` only |
| dosing instructions | "paracetamol … every 4 hours" |
| stale claims | retired URLs and superseded numbers |

### Patterns that are deliberately narrow

Each of these was widened or narrowed for a reason. Do not "simplify" them.

- **`tested and rated` requires an actor.** A bed guard "tested and rated for use with your
  mattress" is a manufacturer testing to a standard — a legitimate product fact.
- **`reviewedBy` matches only schema-object forms** (`reviewedBy: {`, `"reviewedBy":`), not
  `reviewedBy=`. `AuthorBio` takes a `reviewedBy` prop that renders "Researched against NHS, WHO and
  NICE guidance" — a true statement about sources that never enters schema.
- **Code comments are skipped** for `editorial-team entity` and `unbacked review claims`, because
  the notes explaining these very removals would otherwise match themselves.
- **`check-fabrication.mjs` and `fix-sanity-claims.mjs` are excluded** from the scan — both must
  quote the strings they hunt for.

### The Sanity query is the fragile part

The script scans `src/`, `content/`, `public/`, `scripts/`, **plus every live Sanity product**.

Until 2026-08-14 the Sanity query asked for `metaDescription`, **which is not a field on the
`productReview` type** — the real one is `description`. Product descriptions were never scanned, and
it reported 0 for weeks while 17 fabricated claims sat live.

> **A missing field fails silently and looks like a pass.** If a field is added to the Sanity
> schema, add it to the query in `check-fabrication.mjs`.

`scripts/fix-sanity-claims.mjs` remediates Sanity content. It is **dry-run by default and needs no
token**; applying takes `SANITY_TOKEN` from the environment only. It patches body spans *and* every
plain-text field — the first version did body and description only, and left a "we have tested" in
`bottomLine`.

---

## `check:links` — the 4 categories

Scope is fixed in the file: links are checked in `content/` only. `src/data/*.json` are generated
caches and `_archive/` is dormant, so both are excluded. The redirect table is loaded by importing
`next.config.mjs` and calling `redirects()`, so it cannot drift from the real config.

| Category | Catches |
|---|---|
| orphaned content | an MDX file whose own URL is redirected away — unreachable, yet in the sitemap |
| dead redirects | a redirect whose destination is not a servable URL |
| redirect hops | an internal link pointing at a redirect source |
| broken links | an internal link with no matching page |

`npm run check:links -- --live` additionally fetches every URL in the deployed sitemap and asserts
200 with no stray `noindex`.

**When repointing links, boundary matching is mandatory, not defensive.** `baby-sleep-training-methods`
is a true prefix of its own redirect target. Measured: 62 occurrences without a boundary versus 28
with `[")]` — a naive replace corrupts links to the live article.

---

## What the validators do NOT cover

A clean run means *these patterns* find nothing. It does not mean nothing is wrong. Three live
problems were found in one day that neither script could ever have caught, because they are
different *kinds* of claim:

1. **The value inside a structured-data field.** 40 pages emitted
   `reviewedBy: {name: "PregnancySprout Editorial Team"}` — a medical-review claim made to Google
   rather than to the reader.
2. **A serialisation accident.** `ratingValue: undefined` became `0`, publishing a zero-star rating
   on 15 product pages, below the `worstRating: 1` in the same object.
3. **Hand-typed data contradicting the dataset it claims to come from.** `/baby-names/top-100` cited
   SSA and ONS sourcing while carrying a hand-typed ranking that disagreed with this project's own
   SSA data, and named falling names as rising.

**So when asked to verify, do not stop at running the two scripts.** Also sweep:

- the **values** of every schema.org property in `.next/server/app/**/*.html` — the built output is
  what ships, not the source
- any page holding a hardcoded data array, against the data-driven source
- `public/*.txt` — `llms.txt` is served and describes the site to AI crawlers; it carried a stale
  "editorial team" line
- **every** Sanity field, by fetching `*[]{...}` rather than a projection

And two things no validator will ever certify: the **factual accuracy** of 208 articles against the
guidance they cite, and 113 product spec tables against manufacturer data. Those need
source-by-source reading.

---

## Data pipelines

Three scripts build data from public-domain US Social Security Administration files. `ssa.gov`
returns **403 to automated downloads** (Akamai), so the zips must be fetched in a browser and
extracted, then passed with `--dir`.

| Command | Output | Source |
|---|---|---|
| `npm run name-stats` | `src/data/name-stats.json` (~2 MB) | `names.zip` |
| `npm run name-top100` | `src/data/name-top100.json` (32 KB) | `names.zip` |
| `npm run name-states` | `src/data/name-states.json` (54 KB) | `namesbystate.zip` |

`name-stats.json` is ~2 MB and **must be read with `fs` at build time** — a static `import` is
inlined into the Cloudflare Worker and breaks the 3 MiB free-plan limit. The two small files are
imported directly, which is fine. Each file says which rule applies and why.

Coverage is partial by design in two places, and the pages say so rather than filling gaps:

- `name-top100`: 35 of the 200 national top-100 names have no page here, so they render at their
  true rank unlinked.
- `name-states`: the SSA suppresses any state count below 5 for privacy, so ~160 names have no state
  data and render no block at all.
