/**
 * Products library — merges two sources at build time (next build / SSG):
 *   1. MDX content cache (src/data/content-cache-products.json) — 193 existing products
 *   2. Sanity CMS — products added/edited via pregnancysprout.sanity.studio
 *
 * Sanity products override MDX products when both share the same category+slug.
 * All functions are async because fetching from Sanity requires a network call.
 * All pages are force-static — the Cloudflare Worker serves pre-rendered HTML
 * and never calls these functions at runtime.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ProductReview, ProductCategory } from '@/types/product';
import { getSanityProducts } from './sanity-client';

type CacheEntry = Record<string, unknown>;
type ContentCache = Record<string, Record<string, CacheEntry>>;

// ── MDX JSON cache (read at build time, not bundled into Worker) ───────────────
let _mdxCache: ContentCache | null = null;
function getMdxCache(): ContentCache {
  if (!_mdxCache) {
    try {
      const p = path.join(process.cwd(), 'src/data/content-cache-products.json');
      _mdxCache = JSON.parse(fs.readFileSync(p, 'utf-8')) as ContentCache;
    } catch {
      _mdxCache = {};
    }
  }
  return _mdxCache;
}

function cacheEntryToProduct(entry: CacheEntry, category: ProductCategory, slug: string): ProductReview {
  return { ...(entry as Omit<ProductReview, 'slug' | 'category'>), slug, category } as ProductReview;
}

// ── Merged product map: category/slug → ProductReview ─────────────────────────
// Built once per build process. Sanity products override MDX products.
let _merged: Map<string, ProductReview> | null = null;

async function getMerged(): Promise<Map<string, ProductReview>> {
  if (_merged) return _merged;

  _merged = new Map();

  // Only fetch from Sanity (MDX cache disabled — content files preserved for later reuse)
  const sanity = await getSanityProducts();
  for (const p of sanity) {
    if (p.category && p.slug) {
      _merged.set(`${p.category}/${p.slug}`, p);
    }
  }

  return _merged;
}

// ── Public API (all async) ─────────────────────────────────────────────────────

export async function getAllProducts(): Promise<ProductReview[]> {
  const merged = await getMerged();
  return Array.from(merged.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getProductsByCategory(category: ProductCategory): Promise<ProductReview[]> {
  const merged = await getMerged();
  return Array.from(merged.values())
    .filter((p) => p.category === category)
    .sort((a, b) => b.ourScore - a.ourScore);
}

export async function getProductBySlug(
  category: ProductCategory,
  slug: string,
): Promise<ProductReview | null> {
  const merged = await getMerged();
  const product = merged.get(`${category}/${slug}`);
  if (!product) return null;

  // Sanity products already have content serialized from portable text
  if (product.content && product.content.trim().length > 0) return product;

  // MDX products — read body from filesystem (only at next build time in Node.js)
  let content = '';
  try {
    const filePath = path.join(process.cwd(), 'content', 'products', category, `${slug}.mdx`);
    content = matter(fs.readFileSync(filePath, 'utf-8')).content;
  } catch {
    // No MDX file (Sanity-only product without body, or Worker runtime — no-op)
  }

  return { ...product, content };
}

export async function getFeaturedProducts(limit = 6): Promise<ProductReview[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.featured).slice(0, limit);
}
