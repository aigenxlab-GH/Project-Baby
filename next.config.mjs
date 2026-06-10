import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname in ESM context
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Cloudflare dev emulation is provided by @opennextjs/cloudflare.
// Run `npm run dev:cf` to start the dev server with Cloudflare bindings.
// Standard `npm run dev` (next dev) works for most development tasks.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Tree-shaking for large icon/component libraries ────────────────────────
  // Tells Next.js to only bundle the specific icons/components imported,
  // not the entire lucide-react package. Saves ~40-70KB on every page.
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

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
        // Long cache for all Next.js static chunks (immutable — hashed filenames)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // ── Content Security Policy ───────────────────────────────────────
          // Allows: self, Google Analytics, AdSense, Unsplash images, wsrv.nl CDN
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://googleads.g.doubleclick.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://wsrv.nl https://*.mattel.com https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.amazon.com https://*.amazonaws.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com",
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
