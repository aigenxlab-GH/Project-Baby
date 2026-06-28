import affiliateData from '@/data/affiliate-links.json';

export type RegionCode = 'US' | 'UK' | 'CA' | 'DE' | 'FR' | 'IT' | 'ES';

export interface RegionConfig {
  trackingId: string;
  domain: string;
  currency: string;
}

export interface AffiliateLink {
  url: string | null;
  available: boolean;
  asin?: string;
}

/**
 * Get affiliate link for a product in a specific region
 */
export function getAffiliateLink(
  slug: string,
  region: RegionCode
): AffiliateLink {
  // Find product across all categories
  const product = Object.values(affiliateData.categories)
    .flat()
    .find((p: any) => p.slug === slug);

  if (!product) {
    return { url: null, available: false };
  }

  // Check regional availability
  const regional = product.availability?.[region];
  if (!regional || !regional.available) {
    return { url: null, available: false };
  }

  // Get region config
  const regionConfig = affiliateData.metadata.regions[region] as RegionConfig;
  if (!regionConfig) {
    return { url: null, available: false };
  }

  // Build URL
  const url = `https://www.${regionConfig.domain}/dp/${regional.asin}?tag=${regionConfig.trackingId}`;

  return {
    url,
    available: true,
    asin: regional.asin,
  };
}

/**
 * Get all products available in a specific region
 */
export function getProductsForRegion(region: RegionCode) {
  const products = Object.values(affiliateData.categories)
    .flat() as any[];

  return products.filter(p => {
    const regional = p.availability?.[region];
    return regional?.available === true;
  });
}

/**
 * Get region configuration
 */
export function getRegionConfig(region: RegionCode): RegionConfig {
  return affiliateData.metadata.regions[region] as RegionConfig;
}

/**
 * Get all available regions
 */
export function getAllRegions(): RegionCode[] {
  return Object.keys(affiliateData.metadata.regions) as RegionCode[];
}

/**
 * Detect user's region from Cloudflare headers or browser
 */
export function detectUserRegion(): RegionCode {
  // Check Cloudflare header first
  if (typeof window === 'undefined') {
    return 'US'; // Default for server-side
  }

  // Check for stored preference
  const stored = localStorage.getItem('preferredRegion');
  if (stored && isValidRegion(stored)) {
    return stored as RegionCode;
  }

  // Try browser locale
  const browserLocale = navigator.language.split('-')[1]?.toUpperCase();
  const regionMap: Record<string, RegionCode> = {
    'US': 'US',
    'GB': 'UK',
    'CA': 'CA',
    'DE': 'DE',
    'FR': 'FR',
    'IT': 'IT',
    'ES': 'ES',
  };

  if (browserLocale && regionMap[browserLocale]) {
    return regionMap[browserLocale];
  }

  return 'US'; // Default fallback
}

/**
 * Check if region code is valid
 */
export function isValidRegion(region: string): region is RegionCode {
  return ['US', 'UK', 'CA', 'DE', 'FR', 'IT', 'ES'].includes(region);
}

/**
 * Get region display name
 */
export function getRegionName(region: RegionCode): string {
  const names: Record<RegionCode, string> = {
    US: '🇺🇸 United States',
    UK: '🇬🇧 United Kingdom',
    CA: '🇨🇦 Canada',
    DE: '🇩🇪 Germany',
    FR: '🇫🇷 France',
    IT: '🇮🇹 Italy',
    ES: '🇪🇸 Spain',
  };
  return names[region];
}
