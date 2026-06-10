import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';

export function WebSiteJsonLd() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/baby-names?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`,
        width: 200,
        height: 48,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.email,
        contactType: 'customer support',
      },
      sameAs: [
        'https://www.pinterest.com/pregnancysprout',
        'https://twitter.com/pregnancysprout',
        'https://www.facebook.com/pregnancysprout',
      ],
    },
  ];

  return <JsonLd data={data} />;
}
