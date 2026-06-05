// Strip any accidental trailing slash from the env var so all canonical URLs
// and sitemap entries are consistent: https://pregnancysprout.com/blog (not /blog/)
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pregnancysprout.com';
const siteUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;

export const siteConfig = {
  name: 'PregnancySprout',
  tagline: 'Your Complete Pregnancy & Baby Guide',
  description:
    'Expert guides on pregnancy week by week, baby names, product reviews, and parenting tips. Everything you need for your journey to parenthood.',
  url: siteUrl,
  ogImage: '/og-default.jpg',
  twitterHandle: '@pregnancysprout',
  email: 'hello@pregnancysprout.com',
  authors: [{ name: 'PregnancySprout Editorial Team', url: 'https://pregnancysprout.com/about' }],
  keywords: [
    'pregnancy',
    'baby',
    'parenting',
    'baby names',
    'pregnancy week by week',
    'baby products',
    'baby development',
    'newborn',
    'toddler',
  ],
};
