export const affiliateConfig = {
  amazon: {
    tag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || 'pregnancysprout-20',
    baseUrl: 'https://www.amazon.com',
  },
  walmart: { tag: 'pregnancysprout' },
  target: { affiliateId: 'pregnancysprout' },
};

export function buildAmazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${affiliateConfig.amazon.tag}`;
}

export function buildAmazonSearchUrl(query: string): string {
  const encoded = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${encoded}&tag=${affiliateConfig.amazon.tag}`;
}
