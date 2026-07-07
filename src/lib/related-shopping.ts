/**
 * Matches an article title to a relevant product category or topical hub,
 * so every article can surface a "Shop [category]" or "Explore [hub]" link
 * instead of leaving readers with no next step.
 *
 * Category link always works even with zero live products — the category
 * page itself gracefully shows "Reviews coming soon!" (src/lib/products.ts
 * is Sanity-backed; products get added over time as the catalog grows).
 */

// Keyword → category slug. Order matters: more specific keywords first,
// since matchProductCategory returns the first hit found in title order.
const PRODUCT_CATEGORY_KEYWORDS: Array<[string[], string, string]> = [
  // [keywords, category slug, display label]
  [['stroller', 'pram', 'travel system'], 'strollers', 'Best Strollers'],
  [['car seat'], 'car-seats', 'Best Car Seats'],
  [['crib', 'bassinet', 'cot to toddler bed', ' cot '], 'cribs', 'Best Cribs & Bassinets'],
  [['breast pump', 'breastfeeding pump'], 'breast-pumps', 'Best Breast Pumps'],
  [['carrier', 'babywearing', 'baby wrap'], 'baby-carriers', 'Best Baby Carriers'],
  [['bouncer'], 'baby-bouncers', 'Best Baby Bouncers'],
  [['baby swing'], 'baby-swings', 'Best Baby Swings'],
  [['white noise', 'sound machine'], 'white-noise', 'Best White Noise Machines'],
  [['nursing chair', 'feeding chair', 'glider', 'rocking chair'], 'nursing-chairs', 'Best Nursing Chairs & Gliders'],
  [['bottle feeding', 'nursing pillow', 'nursing bra', 'bottle sterilizer', 'breastfeeding vs formula'], 'nursing-feeding', 'Best Nursing & Feeding Products'],
  [['sleep sack', 'swaddle'], 'sleep-sacks', 'Best Sleep Sacks & Swaddles'],
  [['diaper bag', 'nappy bag'], 'diaper-bags', 'Best Diaper Bags'],
  [['diaper pail', 'nappy bin', 'nappy pail'], 'diaper-pails', 'Best Diaper Pails'],
  [['baby gate', 'stair gate'], 'baby-gates', 'Best Baby Gates'],
  [['bathtub', 'bath tub', 'bathing system', 'bath time', 'bath support'], 'baby-bathtubs', 'Best Baby Bathtubs'],
  [['thermometer', 'temperature dangerous'], 'baby-thermometers', 'Best Baby Thermometers'],
  [['nail clipper', 'nail care', 'nail trimm'], 'baby-nail-care', 'Best Baby Nail Care Kits'],
  [['activity center', 'jumperoo', 'exersaucer'], 'activity-centers', 'Best Activity Centers & Jumpers'],
  [['play mat', 'play gym'], 'play-mats', 'Best Baby Play Mats & Gyms'],
  [['teething toy', 'teether'], 'teething-toys', 'Best Teething Toys'],
  [['bath toy'], 'bath-toys', 'Best Bath Toys'],
  [['baby food maker', 'puree maker'], 'baby-food-makers', 'Best Baby Food Makers & Blenders'],
  [['sippy cup'], 'sippy-cups', 'Best Sippy Cups & Toddler Cups'],
  [['potty training', 'potty seat'], 'potty-training', 'Best Potty Training Seats & Chairs'],
  [['lounger'], 'baby-loungers', 'Best Baby Loungers'],
  [['humidifier'], 'humidifiers', 'Best Humidifiers for Baby Rooms'],
  [['high chair'], 'nursing-feeding', 'Best Nursing & Feeding Products'],
  [['monitor'], 'baby-essentials', 'Baby Essentials'],
  [['gear 2026', 'gear guide', "gear:"], 'baby-essentials', 'Baby Essentials'],
];

export interface ShoppingMatch {
  href: string;
  label: string;
}

/** Matches an article title to the most relevant product category, if any. */
export function matchProductCategory(title: string): ShoppingMatch | null {
  const t = title.toLowerCase();
  for (const [keywords, slug, label] of PRODUCT_CATEGORY_KEYWORDS) {
    if (keywords.some((kw) => t.includes(kw))) {
      return { href: `/products/${slug}`, label };
    }
  }
  return null;
}

// Article category → topical hub, for content with no product-category match.
const CATEGORY_HUBS: Record<string, ShoppingMatch> = {
  pregnancy: { href: '/pregnancy', label: 'Explore the Pregnancy Hub' },
  'labor-delivery': { href: '/pregnancy', label: 'Explore the Pregnancy Hub' },
  parenting: { href: '/parenting', label: 'Explore Parenting Tips' },
  toddler: { href: '/parenting/toddler', label: 'Explore Toddler Parenting Tips' },
  postpartum: { href: '/parenting/postpartum', label: 'Explore Postpartum Guides' },
  'newborn-care': { href: '/parenting/newborn', label: 'Explore Newborn Care Guides' },
  newborn: { href: '/parenting/newborn', label: 'Explore Newborn Care Guides' },
  feeding: { href: '/parenting/feeding', label: 'Explore Feeding Guides' },
  development: { href: '/parenting/development', label: 'Explore Baby Development Guides' },
  activities: { href: '/parenting/activities', label: 'Explore Baby Activity Ideas' },
  sleep: { href: '/parenting/sleep', label: 'Explore Baby Sleep Guides' },
  health: { href: '/parenting/health', label: 'Explore Baby Health Guides' },
  'health-safety': { href: '/parenting/health', label: 'Explore Baby Health Guides' },
  'baby-names': { href: '/baby-names', label: 'Browse 1,000+ Baby Names' },
  'buying-guides': { href: '/products', label: 'Browse All Product Reviews' },
  'product-comparison': { href: '/products', label: 'Browse All Product Reviews' },
  products: { href: '/products', label: 'Browse All Product Reviews' },
  tools: { href: '/tools', label: 'Explore Free Pregnancy & Baby Tools' },
};

// Title keyword → hub, for the "category: blog" catch-all (33 articles) where
// the category field itself gives no topical signal.
const TITLE_HUB_KEYWORDS: Array<[string[], ShoppingMatch]> = [
  [['baby name', 'name generator'], { href: '/baby-names', label: 'Browse 1,000+ Baby Names' }],
  [['due date', 'week by week'], { href: '/pregnancy/week-by-week', label: 'Pregnancy Week by Week Guide' }],
  [
    ['pregnan', 'trimester', 'morning sickness', 'labor', 'birth plan', 'preeclampsia',
      'heartburn', 'round ligament', 'braxton', 'gestational diabetes', 'prenatal',
      'caffeine', 'stretch marks', 'swollen feet', 'weight gain', 'brain fog',
      'back pain', 'insomnia', 'cravings', 'safe exercises', 'pelvic floor'],
    { href: '/pregnancy', label: 'Explore the Pregnancy Hub' },
  ],
  [
    ['postpartum', 'after birth', 'maternity leave', 'returning to work'],
    { href: '/parenting/postpartum', label: 'Explore Postpartum Guides' },
  ],
  [
    ['newborn', 'hospital bag', 'baby milestones', 'baby proofing'],
    { href: '/parenting/newborn', label: 'Explore Newborn Care Guides' },
  ],
  [
    ['sleep training', 'sleep guide', 'sleep regression'],
    { href: '/parenting/sleep', label: 'Explore Baby Sleep Guides' },
  ],
  [
    ['solid foods', 'weaning', 'breastfeeding', 'formula'],
    { href: '/parenting/feeding', label: 'Explore Feeding Guides' },
  ],
  [
    ['relationship', 'childcare', 'travelling with a baby', 'traveling with a baby'],
    { href: '/parenting', label: 'Explore Parenting Tips' },
  ],
  [
    ['budget-friendly baby products', 'eco-friendly baby products', 'baby registry'],
    { href: '/products', label: 'Browse All Product Reviews' },
  ],
];

/** Matches an article title/category to a topical hub for non-product content. */
export function matchTopicalHub(title: string, category?: string): ShoppingMatch | null {
  if (category && CATEGORY_HUBS[category]) {
    return CATEGORY_HUBS[category];
  }
  const t = title.toLowerCase();
  for (const [keywords, hub] of TITLE_HUB_KEYWORDS) {
    if (keywords.some((kw) => t.includes(kw))) return hub;
  }
  return null;
}

/** Best single "what to do next" link for an article: product first, hub fallback. */
export function getRelatedShoppingLink(title: string, category?: string): ShoppingMatch | null {
  return matchProductCategory(title) || matchTopicalHub(title, category);
}

/**
 * For "roundup of everything" articles that cover multiple product types in
 * one piece (e.g. Best Baby Gear 2025 has ### Car Seat, ### Baby Carrier,
 * ### Breast Pump as separate subsections) — injects a "Shop [Category]"
 * markdown link at the end of each matching ### section, right before the
 * next heading. The single article-level link from getRelatedShoppingLink
 * only covers one topic; this covers each one individually.
 *
 * Only touches level-3 (###) headings — level-2 (##) headings in these
 * articles tend to be generic groupings ("Items Worth Spending More On"),
 * not product types, so matching against them produces false positives.
 */
export function injectSectionShoppingLinks(markdown: string): string {
  const lines = markdown.split('\n');
  const out: string[] = [];
  const seenCategories = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    const h3 = lines[i].match(/^### (.+)$/);
    if (!h3) continue;

    const match = matchProductCategory(h3[1]);
    if (!match || seenCategories.has(match.href)) continue;

    // Find where this section ends: the next heading of level 1-3, or EOF.
    let end = lines.length;
    for (let j = i + 1; j < lines.length; j++) {
      if (/^#{1,3} /.test(lines[j])) { end = j; break; }
    }
    // Copy the section body, then append the link just before the next heading.
    for (let j = i + 1; j < end; j++) out.push(lines[j]);
    out.push('', `**[Shop ${match.label}](${match.href})**`, '');
    seenCategories.add(match.href);
    i = end - 1; // resume the outer loop at the next heading
  }

  return out.join('\n');
}
