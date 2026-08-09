import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  url: string;
  /**
   * ISO date this page's content was last reviewed, e.g. "2026-06-05".
   * Only pass a real date. It used to default to a hardcoded 2026-06-05, which
   * asserted a review date to Google for every health page regardless of when
   * the content actually changed. Omitted from the schema when not supplied —
   * schema.org treats it as optional, and no claim beats a false one.
   */
  lastReviewed?: string;
  /** The medical topic this page is about */
  about?: string;
}

/**
 * MedicalWebPage JSON-LD schema.
 * Use on all health-related content pages (pregnancy weeks, symptom guides, etc.)
 * Signals to Google that this page is health-specific content reviewed against
 * authoritative medical sources.
 * See: https://schema.org/MedicalWebPage
 */
export function MedicalWebPageJsonLd({
  title,
  description,
  url,
  lastReviewed,
  about = 'Pregnancy',
}: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    url: absoluteUrl(url),
    inLanguage: 'en',
    ...(lastReviewed ? { lastReviewed } : {}),
    reviewedBy: {
      '@type': 'Organization',
      name: `${siteConfig.name} Editorial Team`,
      url: `${siteConfig.url}/editorial-standards`,
    },
    about: {
      '@type': 'MedicalCondition',
      name: about,
      relevantSpecialty: {
        '@type': 'MedicalSpecialty',
        name: 'Obstetrics and Gynecology',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.svg`,
        width: 200,
        height: 48,
      },
    },
    // Signal that content follows authoritative guidelines
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'article p:first-of-type'],
    },
  };

  return <JsonLd data={data} />;
}
