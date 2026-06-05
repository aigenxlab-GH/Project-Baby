import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
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
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: product.starRating,
          bestRating: 5,
          worstRating: 1,
        },
        author: { '@type': 'Person', name: product.author },
        publisher: { '@type': 'Organization', name: siteConfig.name },
        reviewBody: product.bottomLine,
        datePublished: product.publishedAt,
      },
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
