/**
 * Products library — uses the pre-compiled content cache (content-cache.json).
 *
 * On Cloudflare Workers, process.cwd() returns '/' and runtime filesystem reads fail.
 * This module imports the cache statically so esbuild bundles the data into handler.mjs,
 * eliminating all runtime fs calls — same approach as src/lib/mdx.ts.
 */

import type { ProductReview, ProductCategory } from '@/types/product';

type CacheEntry = Record<string, unknown>;
type ContentCache = Record<string, Record<string, CacheEntry>>;

// Lazy-loaded cache — only parsed the first time getProductsCache() is called.
// Using require() inside a function instead of a top-level import means V8 does NOT
// parse this 1.4 MB JSON during Worker cold-start initialization, which was causing
// Error 1102 (exceeded 10ms CPU limit) on Cloudflare Workers free plan.
// For force-static pages, this function is never called at runtime → zero parse cost.
let _productsCache: ContentCache | null = null;
function getProductsCache(): ContentCache {
  if (!_productsCache) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _productsCache = require('@/data/content-cache-products.json') as unknown as ContentCache;
  }
  return _productsCache;
}

function cacheEntryToProduct(
  entry: CacheEntry,
  category: ProductCategory,
  slug: string,
): ProductReview {
  return {
    ...(entry as Omit<ProductReview, 'slug' | 'category'>),
    slug,
    category,
  } as ProductReview;
}

export function getAllProducts(): ProductReview[] {
  const cache = getProductsCache();
  const all: ProductReview[] = [];

  for (const [key, entries] of Object.entries(cache)) {
    if (!key.startsWith('products/')) continue;
    const category = key.replace('products/', '') as ProductCategory;
    for (const [slug, entry] of Object.entries(entries)) {
      all.push(cacheEntryToProduct(entry, category, slug));
    }
  }

  return all.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getProductsByCategory(category: ProductCategory): ProductReview[] {
  const cache = getProductsCache();
  const categoryData = cache[`products/${category}`];
  if (!categoryData) return [];

  return Object.entries(categoryData)
    .map(([slug, entry]) => cacheEntryToProduct(entry, category, slug))
    .sort((a, b) => b.ourScore - a.ourScore);
}

export function getProductBySlug(category: ProductCategory, slug: string): ProductReview | null {
  const cache = getProductsCache();
  const categoryData = cache[`products/${category}`];
  if (!categoryData) return null;
  const entry = categoryData[slug];
  if (!entry) return null;
  return cacheEntryToProduct(entry, category, slug);
}

export function getFeaturedProducts(limit = 6): ProductReview[] {
  return getAllProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}
