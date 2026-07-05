import { sanityClient } from './client';
import { sanityImageUrl } from './image';
import type { ProductReview, ProductCategory } from '@/types/product';

const TRACKING_IDS: Record<string, string> = {
  US: 'pregnancysp0a-20',
  UK: 'pregnancysp0a-21',
  CA: 'pregnancysp07-20',
  DE: 'pregnancyspde-21',
  FR: 'pregnancyspfr-21',
  IT: 'pregnancyspit-21',
  ES: 'pregnancyspes-21',
};

const AMAZON_DOMAINS: Record<string, string> = {
  US: 'amazon.com',
  UK: 'amazon.co.uk',
  CA: 'amazon.ca',
  DE: 'amazon.de',
  FR: 'amazon.fr',
  IT: 'amazon.it',
  ES: 'amazon.es',
};

function buildAffiliateUrl(asin: string, region: string): string {
  const domain = AMAZON_DOMAINS[region] ?? AMAZON_DOMAINS.US;
  const tag = TRACKING_IDS[region] ?? TRACKING_IDS.US;
  return `https://www.${domain}/dp/${asin}?tag=${tag}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanityDocToProduct(doc: any): ProductReview {
  const links = doc.affiliateLinks ?? {};
  const affiliateLinks = [];

  if (links.US?.asin && links.US?.available !== false) {
    affiliateLinks.push({
      retailer: 'amazon' as const,
      url: buildAffiliateUrl(links.US.asin, 'US'),
      price: links.US.price,
      inStock: true,
    });
  }

  const specsTable: Record<string, string> = {};
  if (Array.isArray(doc.specsTable)) {
    for (const item of doc.specsTable) {
      if (item.key && item.value) specsTable[item.key] = item.value;
    }
  }

  return {
    title: doc.title ?? `${doc.productName} Review ${doc.modelYear ?? 2026}`,
    description: doc.description ?? '',
    publishedAt: doc.publishedAt ?? new Date().toISOString(),
    updatedAt: doc.updatedAt,
    author: doc.author ?? 'PregnancySprout Editorial Team',
    category: doc.category as ProductCategory,
    slug: doc.slug?.current ?? '',
    productName: doc.productName ?? '',
    brand: doc.brand ?? '',
    modelYear: doc.modelYear,
    priceRange: doc.priceRange ?? 'mid-range',
    ourScore: doc.ourScore ?? 7,
    starRating: doc.starRating ?? 4,
    pros: doc.pros ?? [],
    cons: doc.cons ?? [],
    bottomLine: doc.bottomLine ?? '',
    affiliateLinks,
    image: doc.image ? sanityImageUrl(doc.image, 600) : '',
    imageAlt: doc.imageAlt ?? doc.productName,
    faqs: doc.faqs ?? [],
    specsTable: Object.keys(specsTable).length ? specsTable : undefined,
    featured: doc.featured ?? false,
    tags: doc.tags ?? [],
  };
}

export async function getSanityProducts(): Promise<ProductReview[]> {
  const docs = await sanityClient.fetch(
    `*[(_type == "productReview" || _type == "product") && published == true] | order(category asc, productName asc) {
      _id, title, description, publishedAt, updatedAt, author,
      productName, brand, category, modelYear, priceRange, featured, published,
      ourScore, starRating, pros, cons, bottomLine, tags,
      "slug": slug, image, imageAlt,
      affiliateLinks, specsTable, faqs
    }`,
    {},
    { cache: 'force-cache', next: { tags: ['products'] } }
  );

  return docs.map(sanityDocToProduct);
}

export async function getSanityProductBySlug(
  category: string,
  slug: string,
): Promise<ProductReview | null> {
  const doc = await sanityClient.fetch(
    `*[(_type == "productReview" || _type == "product") && published == true && category == $category && slug.current == $slug][0] {
      _id, title, description, publishedAt, updatedAt, author,
      productName, brand, category, modelYear, priceRange, featured, published,
      ourScore, starRating, pros, cons, bottomLine, tags,
      "slug": slug, image, imageAlt,
      affiliateLinks, specsTable, faqs, body
    }`,
    { category, slug },
    { cache: 'force-cache', next: { tags: ['products'] } }
  );

  return doc ? sanityDocToProduct(doc) : null;
}

export async function getSanityProductsByCategory(category: string): Promise<ProductReview[]> {
  const docs = await sanityClient.fetch(
    `*[(_type == "productReview" || _type == "product") && published == true && category == $category] | order(ourScore desc) {
      _id, title, description, publishedAt, updatedAt, author,
      productName, brand, category, modelYear, priceRange, featured, published,
      ourScore, starRating, pros, cons, bottomLine, tags,
      "slug": slug, image, imageAlt,
      affiliateLinks, specsTable, faqs
    }`,
    { category },
    { cache: 'force-cache', next: { tags: ['products'] } }
  );

  return docs.map(sanityDocToProduct);
}
