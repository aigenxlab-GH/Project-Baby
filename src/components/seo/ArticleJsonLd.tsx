import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  image: string;
  url: string;
  faqs?: Array<{ q: string; a: string }>;
}

export function ArticleJsonLd({ title, description, publishedAt, updatedAt, author, image, url, faqs }: Props) {
  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      author: { '@type': 'Person', name: author },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      datePublished: publishedAt,
      dateModified: updatedAt || publishedAt,
      image: absoluteUrl(image),
      url: absoluteUrl(url),
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
    },
  ];

  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  return <JsonLd data={schemas.length === 1 ? schemas[0] : schemas} />;
}
