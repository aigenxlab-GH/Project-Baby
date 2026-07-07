# Archive

Content that is no longer read by the live application, kept for reference instead of being deleted outright.

## content-products-dormant-mdx/

The original 200 product-review `.mdx` files generated early in the project. The live site now reads product data exclusively from Sanity CMS (`src/lib/products.ts` — "MDX cache disabled, content files preserved for later reuse"). These files are **not** wired into any page, sitemap, or build step — moved here on 2026-07-07 to stop them from being confused with the ~113 live, Sanity-sourced products.

If Sanity is ever fully decommissioned in favor of MDX-based products again, this is the starting dataset — but it would need a fresh accuracy pass (ASINs, prices, availability) before reuse, since it predates the current product catalog.
