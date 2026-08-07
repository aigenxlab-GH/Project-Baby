# Dormant JSON-driven affiliate link system

These docs, data files, and Python scripts describe a JSON-file + MDX-sync
workflow for managing affiliate links (`affiliate-links.json` as the source of
truth, synced into content via the various `*.py` scripts). That workflow is
disconnected from the live site: `src/lib/products.ts` reads exclusively from
Sanity CMS ("Only fetch from Sanity — MDX cache disabled"), so editing any file
here has **zero effect** on pregnancysprout.com today.

Archived here (2026-08-08) during an affiliate-link audit — kept for history,
not because they're active. The live affiliate-link system is:
- Data: Sanity CMS (`productReview` documents, `affiliateLinks` field)
- Region/tag mapping: `src/config/regions.json` (single source of truth,
  imported by `src/lib/sanity-client.ts`, `src/lib/geo.ts`, and
  `scripts/check-affiliate-links.js`)
- Rendering: `src/components/affiliate/AffiliateLinkButton.tsx`,
  `WhereToBySection.tsx`, and `BuyButton.tsx`
