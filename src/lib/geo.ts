import type { AffiliateLink } from '@/types/product';
import REGION_CONFIG from '@/config/regions.json';

const COUNTRY_TO_REGION: Record<string, string> = {
  // North America
  US: 'US',
  CA: 'CA',
  MX: 'US',

  // Europe
  GB: 'UK',
  IE: 'UK',
  DE: 'DE',
  AT: 'DE',
  CH: 'DE',
  FR: 'FR',
  IT: 'IT',
  ES: 'ES',
  PT: 'ES',
  NL: 'DE',
  BE: 'DE',

  // Default fallback
};

export function getRegionForCountry(countryCode: string): string {
  return COUNTRY_TO_REGION[countryCode] || 'US';
}

export function filterAffiliateLinksForCountry(
  links: AffiliateLink[],
  countryCode: string
): AffiliateLink[] {
  if (!links.length) return links;

  const region = getRegionForCountry(countryCode);

  // Try to find link for the visitor's own region.
  const regionLink = links.find((link) => link.url?.includes(getAmazonDomain(region)));
  if (regionLink) return [regionLink];

  // That product isn't available in the visitor's region (e.g. a DE-only gap).
  // Prefer the US link over an arbitrary one — US has near-total coverage
  // (113/113 products), so this is far more likely to be a working link than
  // whichever region happens to come first in the data.
  const usLink = links.find((link) => link.url?.includes(getAmazonDomain('US')));
  if (usLink) return [usLink];

  return links;
}

function getAmazonDomain(region: string): string {
  const domains = REGION_CONFIG as Record<string, { domain: string; tag: string }>;
  return domains[region]?.domain || 'amazon.com';
}
