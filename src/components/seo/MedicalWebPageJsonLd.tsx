import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

interface Props {
  title: string;
  description: string;
  url: string;
  /** ISO date of last medical content review, e.g. "2026-06-05" */
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
  lastReviewed = '2026-06-05',
  about = 'Pregnancy',
}: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    url: absoluteUrl(url),
    inLanguage: 'en',
    lastReviewed,
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
