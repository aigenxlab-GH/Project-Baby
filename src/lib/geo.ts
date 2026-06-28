import type { AffiliateLink } from '@/types/product';

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

  // Try to find link for user's region
  const regionLink = links.find((link) => link.url?.includes(getAmazonDomain(region)));
  if (regionLink) return [regionLink];

  // Fallback: return all links
  return links;
}

function getAmazonDomain(region: string): string {
  const domains: Record<string, string> = {
    US: 'amazon.com',
    UK: 'amazon.co.uk',
    CA: 'amazon.ca',
    DE: 'amazon.de',
    FR: 'amazon.fr',
    IT: 'amazon.it',
    ES: 'amazon.es',
  };
  return domains[region] || 'amazon.com';
}
