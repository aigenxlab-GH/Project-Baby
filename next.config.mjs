import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname in ESM context
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// @cloudflare/next-on-pages dev platform — only in development.
// Uses dynamic import + try/catch to avoid:
//   (a) top-level await warnings in CI/production builds
//   (b) hard crash if package is not installed in all environments
if (process.env.NODE_ENV === 'development') {
  try {
    const { setupDevPlatform } = await import('@cloudflare/next-on-pages/next-dev');
    await setupDevPlatform();
  } catch {
    // Safe to ignore — package may not be present in all dev environments.
    // Run `npm install -D @cloudflare/next-on-pages` if you need Cloudflare dev emulation.
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Output tracing ─────────────────────────────────────────────────────────
  // Tells Next.js the project root is THIS directory, not a parent that contains
  // multiple lockfiles (C:\AIGenXLab\package-lock.json).
  // Silences: "Next.js inferred your workspace root, but it may not be correct"
  outputFileTracingRoot: path.join(__dirname),

  // ── Images ─────────────────────────────────────────────────────────────────
  images: {
    // Cloudflare Workers don't support the built-in `sharp` image optimiser.
    // All images are served from Unsplash/Amazon CDN with query-string params
    // already applied (?w=800&q=85), so unoptimized: true is zero-cost here.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },

  // ── URL canonicalization ───────────────────────────────────────────────────
  // Next.js 308-redirects /blog/ → /blog automatically.
  // All canonical tags and sitemap entries use no trailing slash.
  trailingSlash: false,

  // ── Logging ────────────────────────────────────────────────────────────────
  // In development: show full fetch URLs to debug cache/revalidation issues.
  // In production: log only errors (default — don't expose URLs publicly).
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  // ── Security headers ───────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Cloudflare enforces HSTS automatically; keeping it at the app level
          // reinforces the policy and satisfies security scanners.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
