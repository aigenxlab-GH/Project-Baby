import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
import { resolveAuthor, authorSchema } from '@/config/authors';
import { absoluteUrl } from '@/lib/utils';
import type { ProductReview } from '@/types/product';

interface Props {
  product: ProductReview;
}

export function ProductJsonLd({ product }: Props) {
  const primaryLink = product.affiliateLinks?.[0];
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
          priceCurrency: 'USD',
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
