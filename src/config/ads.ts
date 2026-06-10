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
