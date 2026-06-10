import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // API routes — not public content
          // NOTE: /_next/ is intentionally NOT blocked.
          // Googlebot needs /_next/static/ to render JavaScript and CSS.
          // Blocking /_next/ prevents proper page rendering in Google's index.
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // llms.txt helps AI crawlers (ChatGPT, Perplexity, Gemini etc.) understand
    // the site structure — referenced here for discoverability (fix #26).
    // See: https://llmstxt.org/
  };
}
