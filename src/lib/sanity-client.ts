import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';
import type { ProductReview, ProductCategory, AffiliateLink } from '@/types/product';
import REGION_CONFIG from '@/config/regions.json';
import { DEFAULT_AUTHOR } from '@/config/authors';

export const sanityClient = createClient({
  projectId: 'mnwolxvz',
  dataset: 'production',
  apiVersion: '2024-06-28',
  useCdn: false, // Always fresh data at build time
});

// ── Portable text → markdown ───────────────────────────────────────────────────
type SanityChild = { _type?: string; text?: string; marks?: string[] };
type SanityMarkDef = { _key: string; _type: string; href?: string };
type SanityBlock = {
  _type: string;
  style?: string;
  listItem?: string;
  children?: SanityChild[];
  markDefs?: SanityMarkDef[];
};

function childText(child: SanityChild, markDefs: SanityMarkDef[]): string {
  let t = child.text || '';
  if (!child.marks?.length) return t;
  for (const mark of child.marks) {
    if (mark === 'strong') t = `**${t}**`;
    else if (mark === 'em') t = `*${t}*`;
    else if (mark === 'code') t = `\`${t}\``;
    else {
      const def = markDefs.find((d) => d._key === mark);
      if (def?._type === 'link' && def.href) t = `[${t}](${def.href})`;
    }
  }
  return t;
}

function portableTextToMarkdown(blocks: SanityBlock[]): string {
  if (!blocks?.length) return '';
  return blocks
    .map((block) => {
      if (block._type !== 'block') return '';
      const defs = block.markDefs || [];
      const text = (block.children || []).map((c) => childText(c, defs)).join('');
      if (!text.trim()) return '';
      if (block.listItem === 'bullet') return `- ${text}`;
      if (block.listItem === 'number') return `1. ${text}`;
      switch (block.style) {
        case 'h2': return `## ${text}`;
        case 'h3': return `### ${text}`;
        case 'h4': return `#### ${text}`;
        case 'blockquote': return `> ${text}`;
        default: return text;
      }
    })
    .filter(Boolean)
    .join('\n\n');
}

// ── Affiliate link transform ───────────────────────────────────────────────────
type SanityRegionLink = { asin?: string; available?: boolean; price?: string };
type SanityAffiliateLinks = Record<string, SanityRegionLink>;
const REGIONS = REGION_CONFIG as Record<string, { domain: string; tag: string }>;

function transformAffiliateLinks(links: SanityAffiliateLinks | null | undefined): AffiliateLink[] {
  if (!links) return [];
  // NOTE ON `available`: this is NOT a stock check and must not be turned into
  // one. It records whether the ASIN is listed on that storefront at all — 5
  // links are false because the product has no listing in that country (aden +
  // anais on ES/IT, OXO Tot on CA/DE, Munchkin on CA). Dropping the filter would
  // send those visitors to a dead Amazon page.
  //
  // Live stock is deliberately not modelled anywhere: no inStock field, and no
  // `availability` in the Offer schema. The link goes to Amazon and Amazon shows
  // whether it can be bought.
  return Object.entries(links)
    .filter(([key, val]) => val?.asin && val?.available !== false && REGIONS[key])
    .map(([key, val]) => {
      const { domain, tag } = REGIONS[key];
      return {
        retailer: 'amazon' as const,
        url: `https://www.${domain}/dp/${val.asin}?tag=${tag}`,
        price: val.price || undefined,
      };
    });
}

// ── Specs table transform ──────────────────────────────────────────────────────
type SanitySpecItem = { _key?: string; key?: string; value?: string };

function transformSpecsTable(specs: SanitySpecItem[] | null | undefined): Record<string, string> {
  if (!specs?.length) return {};
  return specs.reduce<Record<string, string>>((acc, item) => {
    if (item.key && item.value) acc[item.key] = item.value;
    return acc;
  }, {});
}

// ── Sanity product type ────────────────────────────────────────────────────────
type SanityProduct = {
  _id: string;
  productName: string;
  slug: string;
  brand?: string;
  category: string;
  modelYear?: number;
  priceRange?: 'budget' | 'mid-range' | 'premium';
  ourScore?: number;
  starRating?: number;
  description?: string;
  bottomLine?: string;
  pros?: string[];
  cons?: string[];
  title?: string;
  tags?: string[];
  featured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  imageUrl?: string;
  imageAlt?: string;
  affiliateLinks?: SanityAffiliateLinks;
  specsTable?: SanitySpecItem[];
  faqs?: Array<{ q: string; a: string }>;
  body?: SanityBlock[];
};

export function sanityProductToReview(p: SanityProduct): ProductReview {
  return {
    title: p.title || p.productName,
    description: p.description || '',
    publishedAt: p.publishedAt || new Date().toISOString(),
    updatedAt: p.updatedAt,
    author: p.author || DEFAULT_AUTHOR.name,
    category: p.category as ProductCategory,
    slug: p.slug,
    productName: p.productName,
    brand: p.brand || '',
    modelYear: p.modelYear,
    priceRange: p.priceRange || 'mid-range',
    ourScore: p.ourScore || 0,
    starRating: p.starRating || 0,
    pros: p.pros || [],
    cons: p.cons || [],
    bottomLine: p.bottomLine || '',
    affiliateLinks: transformAffiliateLinks(p.affiliateLinks),
    image: p.imageUrl || '',
    imageAlt: p.imageAlt || p.productName,
    faqs: p.faqs,
    specsTable: transformSpecsTable(p.specsTable),
    featured: p.featured || false,
    tags: p.tags || [],
    content: portableTextToMarkdown(p.body || []),
  };
}

// ── GROQ query ─────────────────────────────────────────────────────────────────
const PUBLISHED_PRODUCTS_QUERY = `*[_type == "productReview"] {
  _id,
  productName,
  "slug": slug.current,
  brand,
  category,
  modelYear,
  priceRange,
  ourScore,
  starRating,
  description,
  bottomLine,
  pros,
  cons,
  title,
  tags,
  featured,
  publishedAt,
  updatedAt,
  author,
  "imageUrl": image.asset->url,
  imageAlt,
  affiliateLinks,
  specsTable[] { _key, key, value },
  faqs[] { q, a },
  body[] {
    _type,
    style,
    listItem,
    markDefs[] { _key, _type, href },
    children[] { _type, text, marks }
  }
}`;

// ── Build-time JSON cache (written by scripts/build-sanity-cache.ts) ──────────
// Avoids HTTP calls during @opennextjs/cloudflare SSG — reads from disk instead.
function readBuildCache(): SanityProduct[] | null {
  try {
    const p = path.join(process.cwd(), 'src/data/sanity-products-cache.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const data = JSON.parse(raw) as SanityProduct[];
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    // Not available (Worker runtime or cache not built yet) — fall through to API
  }
  return null;
}

export async function getSanityProducts(): Promise<ProductReview[]> {
  // Prefer the pre-built cache (build-time, Node.js env only)
  const cached = readBuildCache();
  if (cached) {
    console.log(`[sanity-client] Loaded ${cached.length} products from build cache`);
    return cached.map(sanityProductToReview);
  }

  // Fall back to live API fetch
  try {
    const results = await sanityClient.fetch<SanityProduct[]>(PUBLISHED_PRODUCTS_QUERY);
    console.log(`[sanity-client] Fetched ${results?.length || 0} products from Sanity API`);
    if (results?.length) {
      console.log('[sanity-client] Product slugs:', results.map(p => p.slug).join(', '));
    }
    return (results || []).map(sanityProductToReview);
  } catch (err) {
    console.error('[sanity-client] Failed to fetch products from Sanity:', err);
    return [];
  }
}
