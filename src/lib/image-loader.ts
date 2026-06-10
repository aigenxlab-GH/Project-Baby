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

  // Unsplash has a native Image API — use it directly instead of piping through wsrv.nl.
  // Benefits vs the old "pass through unchanged" approach:
  //   • w=<width>     → correct breakpoint size (was always 400px before, ignoring Next.js width)
  //   • q=<quality>   → matches our quality setting
  //   • auto=format   → serves WebP to modern browsers; JPEG fallback for older ones
  //   • fit=crop      → consistent 16:9 crop, prevents layout shifts on aspect-ratio containers
  //   • fm=webp       → explicitly request WebP (strips EXIF metadata in the process)
  // Fixes: SEOptimizer "properly sized images" (MEDIUM) + "image metadata" (LOW).
  if (src.includes('images.unsplash.com') || src.includes('plus.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', String(width));
      url.searchParams.set('q', String(quality ?? 72));
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('fm', 'webp');
      return url.toString();
    } catch {
      // Malformed URL — fall through to wsrv.nl path
    }
  }

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
