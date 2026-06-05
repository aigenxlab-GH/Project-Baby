import { affiliateConfig } from '@/config/affiliates';

export function addAmazonTag(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('tag', affiliateConfig.amazon.tag);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function isAmazonUrl(url: string): boolean {
  return url.includes('amazon.com') || url.includes('amzn.to');
}

export function getRetailerName(url: string): string {
  if (url.includes('amazon.com') || url.includes('amzn')) return 'Amazon';
  if (url.includes('walmart.com')) return 'Walmart';
  if (url.includes('target.com')) return 'Target';
  if (url.includes('buybuybaby.com')) return 'buybuy BABY';
  return 'Retailer';
}
