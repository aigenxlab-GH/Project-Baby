export const adsConfig = {
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXXXXXXX',
  // Slot IDs are set via env vars so they can be configured without a code deploy.
  // Defaults are XXXX placeholders — the AdSlot component checks for 'XXXX' and
  // returns null if any slot isn't configured, preventing AdSense TagError console
  // errors from fake slot IDs being pushed to adsbygoogle[].
  slots: {
    headerBanner:  process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER   || 'XXXXXXXXXX',
    inContent:     process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT  || 'XXXXXXXXXX',
    sidebar:       process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR  || 'XXXXXXXXXX',
    footerBanner:  process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER   || 'XXXXXXXXXX',
    articleBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE  || 'XXXXXXXXXX',
  },
};

// Routes where ad units are suppressed because the pages don't carry enough
// content to justify them under AdSense's "Valuable Inventory" policy, which
// prohibits serving ads on pages with little or no publisher content.
//
// STATUS (2026-08-14): the reason this block was added no longer holds. When it
// was written, baby-name pages rendered one templated sentence from a data row.
// They now carry a real SSA popularity chart, quick facts, a five-year trend, a
// "where this name is most popular" state breakdown and cited sources —
// measured at ~600 rendered words, against ~935 for a week-by-week page that
// already serves ads.
//
// It is kept ON PURPOSE until AdSense approval lands. Google reviews the live
// site, and the largest page group on it being the thinnest is the wrong thing
// to put in front of a reviewer. This is deferred revenue, not an oversight.
//
// AFTER APPROVAL, do this rather than simply deleting the prefix:
//   enable ads only where getNameStats(slug) returns data — 1,085 pages at
//   ~600 words — and keep the ~117 names with no SSA match suppressed, since
//   those still render ~389 words (e.g. /baby-names/alcyone). A blanket removal
//   would put ads back on the genuinely thin ones.
//
// /baby-names/top-100 is exempt — it has substantial content and is now built
// from the SSA national ranking.
const AD_FREE_PREFIXES = ['/baby-names/'];
const AD_FREE_EXCEPTIONS = ['/baby-names/top-100'];

export function isAdFreePath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (AD_FREE_EXCEPTIONS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return false;
  return AD_FREE_PREFIXES.some((p) => pathname.startsWith(p));
}
