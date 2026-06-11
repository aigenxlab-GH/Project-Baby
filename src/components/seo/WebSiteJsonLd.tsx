import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';

/**
 * Sitewide JSON-LD: WebSite (SiteLinksSearchBox) + Organization/LocalBusiness.
 * Rendered once on the homepage via <WebSiteJsonLd />.
 * Organisation schema satisfies SEOptimizer "Add Local Business Schema" +
 * "Add Business Address" + E-E-A-T sameAs social signals.
 */
export function WebSiteJsonLd() {
  const data = [
    // ── WebSite schema — enables SiteLinksSearchBox in Google SERP ──────────
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
    // ── Organization + LocalBusiness schema ──────────────────────────────────
    // '@type' array lets Google see both entity types simultaneously.
    // address + areaServed satisfy "Add Business Address" audit requirement.
    // sameAs with all 6 social profiles satisfies "Create and link" audit items.
    {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness'],
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      description: siteConfig.description,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'NY',
      },
      areaServed: ['US', 'GB', 'AU', 'CA'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.email,
        contactType: 'customer support',
        availableLanguage: 'English',
      },
      sameAs: Object.values(siteConfig.social),
    },
  ];

  return <JsonLd data={data} />;
}
