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
      // Added 2026-09-03, alongside a real request-quota incident. Google's own
      // Crawl Stats put its total footprint at ~222 requests/day even generously
      // multiplied out — nowhere near the 35,000-100,000+/day the account has
      // hit. robots.txt was previously wide open ('*' -> allow everything),
      // so any bot, including ones that give this site zero benefit, was free
      // to crawl at will.
      //
      // Scoped deliberately to TRAINING crawlers only — bots that scrape content
      // in bulk for a model to learn from later, which produces no citation, no
      // traffic, and no benefit to this site, ever. Explicitly NOT blocked:
      // Googlebot/Bingbot (core search), PerplexityBot/OAI-SearchBot/Claude-User/
      // Claude-SearchBot/ChatGPT-User (LIVE citation bots — a real user's query
      // triggers these, which is exactly what llms.txt below was added for), and
      // Google-Extended — deliberately left off this list even though it's the
      // same category, because Google Search trust is actively being rebuilt
      // after the impressions crash this same incident is part of, and this is
      // not the moment to add anything that could read as reduced cooperation
      // with anything Google-branded.
      { userAgent: 'GPTBot', disallow: '/' },            // OpenAI — training only
      { userAgent: 'CCBot', disallow: '/' },              // Common Crawl — widely reused as AI training data
      { userAgent: 'ClaudeBot', disallow: '/' },          // Anthropic — training only
      { userAgent: 'Bytespider', disallow: '/' },         // ByteDance — training, known for aggressive crawl volume
      { userAgent: 'Amazonbot', disallow: '/' },          // Amazon — training-adjacent, no benefit to an Associates site
      { userAgent: 'Applebot-Extended', disallow: '/' },  // Apple — training opt-out signal (separate from Applebot itself)
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // llms.txt helps AI crawlers (ChatGPT, Perplexity, Gemini etc.) understand
    // the site structure — referenced here for discoverability (fix #26).
    // See: https://llmstxt.org/
  };
}
