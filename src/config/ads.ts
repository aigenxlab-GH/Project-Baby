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
// Baby-name detail pages currently render a single templated sentence built
// from a data row. They're being enriched with real SSA popularity data; once
// that ships, remove the '/baby-names/' prefix below to restore ads there.
// /baby-names/top-100 is exempt — it has substantial hand-written content.
const AD_FREE_PREFIXES = ['/baby-names/'];
const AD_FREE_EXCEPTIONS = ['/baby-names/top-100'];

export function isAdFreePath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (AD_FREE_EXCEPTIONS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return false;
  return AD_FREE_PREFIXES.some((p) => pathname.startsWith(p));
}
