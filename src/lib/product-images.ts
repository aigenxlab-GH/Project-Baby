const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=85&auto=format&fit=crop`;

// Per-category fallback images — Unsplash IDs verified via Search API alt_description
export const PRODUCT_CATEGORY_IMAGES: Record<string, string> = {
  strollers:           U('photo-1538077649323'),  // "baby lying on stroller during daytime"
  'car-seats':         U('photo-1634414257452'),  // "a baby sitting in a car with a pacifier in its mouth"
  cribs:               U('photo-1505679208891'),  // "baby in bassinet"
  'breast-pumps':      U('photo-1751890855898'),  // "A baby breastfeeds, clinging to its mother"
  'baby-carriers':     U('photo-1528034191169'),  // "person carrying a baby"
  'baby-bouncers':     U('photo-1550824179-d698bda9996a'), // "gray and black doorway jumper"
  'baby-swings':       U('photo-1608923240332'),  // "baby in pink shirt sitting on blue swing"
  'white-noise':       U('photo-1542387960-f8197d82db42'), // "baby sleeping on gray and white bed"
  'sleep-sacks':       U('photo-1511948374796'),  // "baby covered with white blanket"
  'nursing-chairs':    U('photo-1648375975494'),  // "a woman holding a baby under a blanket"
  'nursing-feeding':   U('photo-1529567054786'),  // "person feeding baby from feeding bottle"
  'diaper-bags':       U('photo-1535571393765'),  // "woman holding baby"
  'diaper-pails':      U('photo-1560251180-24d389314061'), // "baby lying in white textile"
  'baby-gates':        U('photo-1554393180-7953ff534ac7'), // "crawling baby"
  'baby-bathtubs':     U('photo-1554380411-7ba696bc0f2f'), // "baby bathing"
  'baby-thermometers': U('photo-1585207693488'),  // "white thermometer on red surface"
  'baby-nail-care':    U('photo-1508009219918'),  // "person holding baby's hand"
  'activity-centers':  U('photo-1515488042361'),  // "boy sitting on white cloth surrounded by toys"
  'play-mats':         U('photo-1532330393533'),  // "child playing with car plastic toys"
  'teething-toys':     U('photo-1515488042361'),  // "boy sitting on white cloth surrounded by toys"
  'bath-toys':         U('photo-1554380411-7ba696bc0f2f'), // "baby bathing"
  'baby-food-makers':  U('photo-1544829832-c8047d6b9d89'), // "person feeding baby"
  'sippy-cups':        U('photo-1557939663'),     // "a baby sitting in a high chair eating food"
  'potty-training':    U('photo-1556265617-02021d9b0fa5'), // "toddler's bed with mesh canopy"
  'baby-loungers':     U('photo-1591161555818'),  // "woman hugging baby"
  humidifiers:         U('photo-1774578342155-8d7e44a18bfd'), // "A cozy nursery with a white crib and armchair"
  default:             U('photo-1535571393765'),  // "woman holding baby"
};

// CDN hosts known to serve hotlink-safe product images
const TRUSTED_HOSTS = new Set([
  'images.unsplash.com',
  'm.media-amazon.com',
  'n.nordstrommedia.com',
  'target.scene7.com',
  'images.mattel.com',
  'a.storyblok.com',
  'cdn.sanity.io',
]);

function isTrustedUrl(url: string): boolean {
  try {
    return TRUSTED_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function resolveProductImage(image: string | undefined, category: string): string {
  if (image && isTrustedUrl(image)) return image;
  return PRODUCT_CATEGORY_IMAGES[category] ?? PRODUCT_CATEGORY_IMAGES.default;
}
