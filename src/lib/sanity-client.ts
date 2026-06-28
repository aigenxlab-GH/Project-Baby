import { createClient } from 'next-sanity';
import type { ProductReview, ProductCategory, AffiliateLink } from '@/types/product';

export const sanityClient = createClient({
  projectId: 'mnwolxvz',
  dataset: 'production',
  apiVersion: '2024-06-28',
  useCdn: false, // Always fresh data at build time
});

// ── Region config ──────────────────────────────────────────────────────────────
const REGION_CONFIG: Record<string, { domain: string; tag: string }> = {
  US: { domain: 'amazon.com',    tag: 'pregnancysp0a-20' },
  UK: { domain: 'amazon.co.uk', tag: 'pregnancysp0a-21' },
  CA: { domain: 'amazon.ca',    tag: 'pregnancysp07-20' },
  DE: { domain: 'amazon.de',    tag: 'pregnancyspde-21' },
  FR: { domain: 'amazon.fr',    tag: 'pregnancyspfr-21' },
  IT: { domain: 'amazon.it',    tag: 'pregnancyspit-21' },
  ES: { domain: 'amazon.es',    tag: 'pregnancyspes-21' },
};

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

function transformAffiliateLinks(links: SanityAffiliateLinks | null | undefined): AffiliateLink[] {
  if (!links) return [];
  return Object.entries(links)
    .filter(([key, val]) => val?.asin && val?.available !== false && REGION_CONFIG[key])
    .map(([key, val]) => {
      const { domain, tag } = REGION_CONFIG[key];
      return {
        retailer: 'amazon' as const,
        url: `https://www.${domain}/dp/${val.asin}?tag=${tag}`,
        price: val.price || undefined,
        inStock: true,
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
    author: p.author || 'PregnancySprout Editorial Team',
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

export async function getSanityProducts(): Promise<ProductReview[]> {
  try {
    const results = await sanityClient.fetch<SanityProduct[]>(PUBLISHED_PRODUCTS_QUERY);
    console.log(`[sanity-client] Fetched ${results?.length || 0} products from Sanity`);
    if (results?.length) {
      console.log('[sanity-client] Product slugs:', results.map(p => p.slug).join(', '));
    }
    return (results || []).map(sanityProductToReview);
  } catch (err) {
    console.error('[sanity-client] Failed to fetch products from Sanity:', err);
    return [];
  }
}
