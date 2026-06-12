/**
 * Products library — uses the pre-compiled content cache for metadata,
 * and the raw MDX files for article body content.
 *
 * The products cache (content-cache-products.json) intentionally omits the MDX
 * body to keep the Cloudflare Worker bundle small. The body is read from the
 * filesystem at build time by getProductBySlug(), which only runs during `next build`
 * (Node.js environment). Product detail pages are force-static — the Cloudflare Worker
 * serves the pre-rendered HTML and never calls getProductBySlug() at runtime.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

  // Read the MDX body directly from disk — only runs during `next build` (Node.js).
  // The products cache omits the body to keep the Cloudflare Worker bundle small.
  // On Cloudflare at runtime, product pages are served pre-rendered; this branch
  // is never reached, so the try/catch is just a safety net.
  let content = '';
  try {
    const filePath = path.join(process.cwd(), 'content', 'products', category, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    content = matter(raw).content;
  } catch {
    // Cloudflare Worker runtime — filesystem not available. No-op: the HTML for this
    // page was already baked in at build time via force-static pre-rendering.
  }

  return cacheEntryToProduct({ ...entry, content }, category, slug);
}

export function getFeaturedProducts(limit = 6): ProductReview[] {
  return getAllProducts()
    .filter((p) => p.featured)
    .slice(0, limit);
}
