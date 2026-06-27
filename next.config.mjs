import { fileURLToPath } from 'url';
import path from 'path';

// Resolve __dirname in ESM context
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Cloudflare dev emulation is provided by @opennextjs/cloudflare.
// Run `npm run dev:cf` to start the dev server with Cloudflare bindings.
// Standard `npm run dev` (next dev) works for most development tasks.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header (security + minor response size)
  poweredByHeader: false,

  // Remove console.log in production builds (reduces JS payload slightly)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // ── Tree-shaking for large icon/component libraries ────────────────────────
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

  // ── Duplicate content redirects ────────────────────────────────────────────
  // Consolidates near-duplicate blog posts to a single canonical URL.
  // Google sees a 301 and passes all ranking signals to the target page.
  async redirects() {
    return [
      // HTTP→HTTPS redirect removed — Cloudflare handles this at the edge automatically.
      // Adding it here causes ERR_TOO_MANY_REDIRECTS because Cloudflare sends
      // x-forwarded-proto: http internally even on HTTPS requests.
      { source: '/blog/baby-sleep-training-methods', destination: '/blog/baby-sleep-training-methods-complete-guide-for-new-parents', permanent: true },
      { source: '/blog/morning-sickness-remedies', destination: '/blog/morning-sickness-remedies-that-actually-work', permanent: true },
      { source: '/blog/hospital-bag-checklist', destination: '/blog/complete-hospital-bag-checklist-for-mom-and-baby', permanent: true },
      { source: '/blog/baby-proofing-guide', destination: '/blog/baby-proofing-your-home-room-by-room-checklist', permanent: true },
      { source: '/blog/newborn-care-tips', destination: '/blog/newborn-care-tips-every-new-parent-needs-to-know', permanent: true },
      { source: '/blog/breastfeeding-vs-formula-feeding', destination: '/blog/breastfeeding-vs-formula-an-honest-comparison', permanent: true },
      { source: '/blog/gestational-diabetes-pregnancy', destination: '/blog/gestational-diabetes-symptoms-diet-and-management-guide', permanent: true },
    ];
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
              // GA4 loads from googletagmanager; AdSense from pagead2 + adsbygoogle subdomains.
              // googleads.g.doubleclick.net: AdSense ad serving.
              // adservice.google.com: AdSense impression & conversion pixels.
              // static.cloudflareinsights.com: Cloudflare Web Analytics beacon (auto-injected by CF).
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://adservice.google.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // stats.g.doubleclick.net: GA4 + AdSense image beacons (blocked without this → CSP error).
              // region1.google-analytics.com: GA4 regional data collection endpoint.
              // *.googlesyndication.com: AdSense creative images.
              "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://picsum.photos https://fastly.picsum.photos https://wsrv.nl https://*.mattel.com https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://stats.g.doubleclick.net https://adservice.google.com https://*.amazon.com https://*.amazonaws.com https://ws-na.amazon-adsystem.com https://ir-na.amazon-adsystem.com https://m.media-amazon.com https://cdn.sanity.io",
              // region1.google-analytics.com + region1.analytics.google.com: GA4 regional fetch endpoints.
              // stats.g.doubleclick.net: GA/AdSense beacon XHR.
              // *.doubleclick.net + *.googlesyndication.com: AdSense RTB + ad serving XHR.
              // cloudflareinsights.com: Cloudflare beacon data endpoint.
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://adservice.google.com https://cloudflareinsights.com",
              // *.googlesyndication.com: AdSense ad iframes (all subdomains, not just tpc.).
              // *.doubleclick.net: AdSense DFP iframes.
              "frame-src https://googleads.g.doubleclick.net https://*.doubleclick.net https://tpc.googlesyndication.com https://*.googlesyndication.com",
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
