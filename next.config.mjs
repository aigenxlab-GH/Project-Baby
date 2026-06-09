import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname in ESM context
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Cloudflare dev emulation is provided by @opennextjs/cloudflare.
// Run `npm run dev:cf` to start the dev server with Cloudflare bindings.
// Standard `npm run dev` (next dev) works for most development tasks.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Output tracing ─────────────────────────────────────────────────────────
  // Tells Next.js the project root is THIS directory, not a parent that contains
  // multiple lockfiles (C:\AIGenXLab\package-lock.json).
  // Silences: "Next.js inferred your workspace root, but it may not be correct"
  outputFileTracingRoot: path.join(__dirname),

  // ── Images ─────────────────────────────────────────────────────────────────
  // Cloudflare Workers don't support the built-in `sharp` image optimiser.
  // We use a custom loader (src/lib/image-loader.ts) that routes images through
  // wsrv.nl — a free image proxy CDN — for WebP conversion + resizing.
  // This gives full image optimisation with zero server-side processing.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    // Sizes cover all common breakpoints: mobile → tablet → desktop → wide
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
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
