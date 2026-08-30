import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The country cookie is only ever read by useCountry(), consumed by
// AffiliateLinkButton/BuyButton/ProductComparison/WhereToBySection (all under
// /products/**) and ChecklistTool (only on the 2 tool routes matched below).
// Every other route — all 1,085 name pages, 208 articles, 40 week pages, the
// other 7 tools, homepage, etc. — has zero use for this cookie.
//
// The old matcher ran this on almost every request site-wide
// ('/((?!_next/static|_next/image|favicon.ico).*)'), which forces Cloudflare
// to invoke the Worker's JS for every one of those ~1,350 pages that could
// otherwise be served as a pure static asset with no CPU cost. Confirmed via
// the Cloudflare dashboard (2026-08-20): Worker invocations (109.79k) were
// within 5% of total requests (115.72k) — almost nothing was reaching the
// edge-cache/static-asset fast path — with cache hit rate collapsed to 1.13%
// and CPU time P90 at 11ms, over the free plan's 10ms-per-request ceiling
// (298 Worker errors that day, +861% — see wrangler.toml's Error 1102 note).
// Narrowing the matcher lets ~90% of pages bypass the Worker function and
// middleware entirely.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Read Cloudflare's country header for geolocation-based affiliate link filtering
  const country = request.headers.get('cf-ipcountry') || 'US';
  response.cookies.set('country', country, {
    maxAge: 24 * 60 * 60,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/products/:path*', '/tools/hospital-bag-checklist', '/tools/registry-checklist'],
};
