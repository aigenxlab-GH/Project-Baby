import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';
import { resolveAuthor, authorSchema } from '@/config/authors';

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
  // Resolve the frontmatter byline to a real author record. This previously
  // emitted `{'@type':'Person', name:'PregnancySprout Editorial Team'}` on every
  // article — declaring an editorial team to be a person. authorSchema() picks
  // Person or Organization correctly and adds sameAs/knowsAbout when known.
  const resolved = resolveAuthor(author);

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      author: authorSchema(resolved, siteConfig.url),
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
