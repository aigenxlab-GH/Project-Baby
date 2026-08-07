# Dormant/retired roundup .tsx files

**`slug-route/page.tsx`** — this was the live `/products/roundups/[slug]`
route. Retired 2026-08-08 at the user's explicit request: these "Best X of
2026" pages were hand-written, hardcoded content (specific ASINs, prices,
rankings baked directly into the page source) that duplicated the
Sanity-driven category pages and required separate manual upkeep whenever a
product's ASIN or price changed. All 13 roundup URLs now 301-redirect to
their matching `/products/{category}` page (see `next.config.mjs`) — the
category page, backed by Sanity, is now the single source of truth.

**The other 13 files** (`best-*-2026.tsx`) were never actually live routes at
all — they sat directly under `src/app/products/roundups/` but weren't named
`page.tsx`, so Next.js App Router never served them. Archived here
(2026-08-08) during the same cleanup rather than deleted, matching the
project's existing convention for dormant content
(see `_archive/content-products-dormant-mdx/`). They also had an incomplete
`rel="noopener noreferrer"` attribute (missing `nofollow sponsored`) on their
Amazon links.
