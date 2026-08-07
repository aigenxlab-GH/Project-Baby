# Dormant roundup .tsx files

These 13 files sat directly under `src/app/products/roundups/` but were never
named `page.tsx`, so under Next.js App Router they were never actual routes —
confirmed via grep that nothing imports them. The live roundup pages are all
served by the dynamic route `src/app/products/roundups/[slug]/page.tsx`.

Archived here (2026-08-08) during an affiliate-link audit rather than deleted,
matching the project's existing convention for dormant content
(see `_archive/content-products-dormant-mdx/`). They also had an incomplete
`rel="noopener noreferrer"` attribute (missing `nofollow sponsored`) on their
Amazon links — not live today, but would need that fix too if ever resurrected.
