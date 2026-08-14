import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
import { resolveAuthor, authorSchema } from '@/config/authors';
import { absoluteUrl } from '@/lib/utils';
import type { ProductReview } from '@/types/product';

interface Props {
  product: ProductReview;
}

// Amazon domain -> the currency that storefront actually prices in. Declaring
// USD against an amazon.ca URL is simply wrong, and structured-data validators
// flag currency/locale mismatches.
const CURRENCY_BY_DOMAIN: Array<[string, string]> = [
  ['amazon.com', 'USD'],
  ['amazon.co.uk', 'GBP'],
  ['amazon.ca', 'CAD'],
  ['amazon.de', 'EUR'],
  ['amazon.fr', 'EUR'],
  ['amazon.it', 'EUR'],
  ['amazon.es', 'EUR'],
];

function currencyFor(url: string): string | null {
  // .co.uk before .com would mis-match, so the longest host wins.
  const hit = [...CURRENCY_BY_DOMAIN]
    .sort((a, b) => b[0].length - a[0].length)
    .find(([domain]) => url.includes(`www.${domain}/`));
  return hit ? hit[1] : null;
}


export function ProductJsonLd({ product }: Props) {
  // Sanity stores affiliateLinks as an object keyed by region and
  // Object.entries preserves its alphabetical order, so index 0 was always
  // CA — every one of the 113 products advertised a Canadian storefront as
  // its primary offer, priced in USD. All 113 have a US ASIN, so prefer it.
  const links = product.affiliateLinks ?? [];
  const primaryLink = links.find((l) => l.url.includes('www.amazon.com/')) ?? links[0];
  const data: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.productName,
      brand: { '@type': 'Brand', name: product.brand },
      image: absoluteUrl(product.image),
      description: product.description,
      // Only emit a Review when there is a real score. 15 of 113 products have no
      // starRating in Sanity, and `ratingValue: undefined` was serialising to 0 —
      // publishing a 0-out-of-5 rating for products that were never rated, below
      // the worstRating of 1 this same object declares. Google can surface that
      // as a zero-star rich result.
      ...(typeof product.starRating === 'number' && product.starRating > 0 && {
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: product.starRating,
          bestRating: 5,
          worstRating: 1,
        },
        // Same fix as ArticleJsonLd: resolve the byline instead of asserting
        // Person. This previously emitted whatever string sat in Sanity's
        // author field — which included invented experts with fabricated
        // medical credentials ("Dr. Rachel Foster, Certified Infant Sleep
        // Educator") declared to Google as real people.
        author: authorSchema(resolveAuthor(product.author), siteConfig.url),
        publisher: { '@type': 'Organization', name: siteConfig.name },
        reviewBody: product.bottomLine,
        datePublished: product.publishedAt,
      },
      }),
      // Only include aggregateRating when we have genuine multi-source data
      // Single editorial review is expressed via Review only (no AggregateRating)
      // to comply with Google's structured data guidelines
      ...(primaryLink && {
        offers: {
          '@type': 'Offer',
          url: primaryLink.url,
          ...(currencyFor(primaryLink.url) ? { priceCurrency: currencyFor(primaryLink.url) as string } : {}),
          ...(primaryLink.price && { price: primaryLink.price.replace(/[^0-9.]/g, '') }),
          availability: primaryLink.inStock === false
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
        },
      }),
    },
  ];

  if (product.faqs && product.faqs.length > 0) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: product.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  return <JsonLd data={data} />;
}
