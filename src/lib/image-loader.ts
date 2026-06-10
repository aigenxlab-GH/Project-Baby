/**
 * Custom Next.js image loader — routes all remote images through wsrv.nl,
 * a free image proxy CDN that handles:
 *   - WebP conversion       (30–80% smaller than JPEG/PNG)
 *   - Exact-width resizing  (no oversized images on mobile)
 *   - Global CDN caching    (7-day cache, served from edge)
 *
 * This completely bypasses the need for `sharp` (which doesn't run on
 * Cloudflare Workers) while still delivering optimised images.
 *
 * Configured in next.config.mjs:
 *   images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' }
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Pass through SVGs — they're already vector, no raster optimisation needed
  if (src.endsWith('.svg')) return src;

  // Pass through data URIs (base64 images) unchanged
  if (src.startsWith('data:')) return src;

  // Pass through relative paths (local public/ assets) unchanged
  if (!src.startsWith('http://') && !src.startsWith('https://')) return src;

  // Unsplash already applies optimisation via its URL params (?w=, &q=, &auto=format)
  // wsrv.nl re-fetching them would add latency with no quality gain — skip
  if (src.includes('images.unsplash.com') || src.includes('plus.unsplash.com')) return src;

  // Lower default quality saves significant bytes on mobile (was 80, now 72).
  // Visual difference is imperceptible at typical mobile screen density.
  const q = quality ?? 72;

  // wsrv.nl parameters:
  //   url     = fully-encoded source image URL
  //   w       = output width in pixels (Next.js passes the correct breakpoint)
  //   q       = quality 1–100
  //   output  = webp  (best compression, supported by all modern browsers)
  //   maxage  = 30d   (increased from 7d — product images rarely change)
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&q=${q}&output=webp&maxage=30d`;
}
