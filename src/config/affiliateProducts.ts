/**
 * CENTRALIZED AFFILIATE PRODUCTS DATABASE
 * Single source of truth for all affiliate links
 * Easy to update across entire application
 *
 * Usage in articles:
 * <AffiliateLink productId="best-car-seats" retailer="amazon" text="Check Price" />
 *
 * Update links globally by editing this file
 */

export interface AffiliateProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  affiliateLinks: {
    amazon?: string;
    buyBaby?: string;
    target?: string;
    walmart?: string;
    wayfair?: string;
    bestBuy?: string;
    etsy?: string;
  };
  commissionRate: number; // percentage
  priority: 'premium' | 'high' | 'medium' | 'low';
}

export const affiliateProducts: Record<string, AffiliateProduct> = {
  // ============================================
  // CAR SEATS & CARRIERS
  // ============================================
  'best-car-seats': {
    id: 'best-car-seats',
    name: 'Best Car Seats for Newborns',
    category: 'car-seats',
    description: 'Top-rated infant car seats with safety features',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=infant+car+seat&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=car+seat',
      target: 'https://www.target.com/s?searchTerm=car+seat',
    },
    commissionRate: 7,
    priority: 'premium',
  },

  'convertible-car-seats': {
    id: 'convertible-car-seats',
    name: 'Best Convertible Car Seats',
    category: 'car-seats',
    description: 'Convertible car seats that grow with your child',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=convertible+car+seat&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=convertible+car+seat',
      target: 'https://www.target.com/s?searchTerm=convertible+car+seat',
    },
    commissionRate: 8,
    priority: 'premium',
  },

  'baby-carriers': {
    id: 'baby-carriers',
    name: 'Best Baby Carriers',
    category: 'carriers',
    description: 'Structured carriers, wraps, and slings',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+carrier&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=baby+carrier',
      target: 'https://www.target.com/s?searchTerm=baby+carrier',
    },
    commissionRate: 6,
    priority: 'high',
  },

  // ============================================
  // STROLLERS & TRAVEL SYSTEMS
  // ============================================
  'best-strollers': {
    id: 'best-strollers',
    name: 'Best Strollers for Newborns',
    category: 'strollers',
    description: 'Full-featured strollers with excellent maneuverability',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=stroller+newborn&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=stroller',
      target: 'https://www.target.com/s?searchTerm=stroller',
    },
    commissionRate: 8,
    priority: 'premium',
  },

  'travel-systems': {
    id: 'travel-systems',
    name: 'Best Travel Systems',
    category: 'strollers',
    description: 'Stroller and car seat combinations',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=travel+system+stroller+car+seat&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=travel+system',
      target: 'https://www.target.com/s?searchTerm=travel+system',
    },
    commissionRate: 9,
    priority: 'premium',
  },

  'toddler-stroller': {
    id: 'toddler-stroller',
    name: 'Best Toddler Strollers',
    category: 'strollers',
    description: 'Lightweight strollers for growing toddlers',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=toddler+stroller&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=toddler+stroller',
      target: 'https://www.target.com/s?searchTerm=toddler+stroller',
    },
    commissionRate: 7,
    priority: 'high',
  },

  // ============================================
  // CRIBS & FURNITURE
  // ============================================
  'best-cribs': {
    id: 'best-cribs',
    name: 'Best Cribs & Bassinets',
    category: 'furniture',
    description: 'Safe, durable cribs meeting CPSC standards',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+crib&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=crib',
      target: 'https://www.target.com/s?searchTerm=crib',
    },
    commissionRate: 8,
    priority: 'premium',
  },

  'convertible-crib': {
    id: 'convertible-crib',
    name: 'Best Convertible Cribs',
    category: 'furniture',
    description: 'Cribs that convert to toddler beds',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=convertible+crib&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=convertible+crib',
      target: 'https://www.target.com/s?searchTerm=convertible+crib',
    },
    commissionRate: 9,
    priority: 'premium',
  },

  'baby-furniture-sets': {
    id: 'baby-furniture-sets',
    name: 'Best Baby Furniture Sets',
    category: 'furniture',
    description: 'Coordinated nursery furniture collections',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+furniture+set&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=furniture+set',
      target: 'https://www.target.com/s?searchTerm=furniture+set',
    },
    commissionRate: 8,
    priority: 'premium',
  },

  'toddler-bed': {
    id: 'toddler-bed',
    name: 'Best Toddler Beds',
    category: 'furniture',
    description: 'Low toddler beds for safe transitions',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=toddler+bed&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=toddler+bed',
      target: 'https://www.target.com/s?searchTerm=toddler+bed',
    },
    commissionRate: 7,
    priority: 'high',
  },

  // ============================================
  // FEEDING & NURSING
  // ============================================
  'breast-pumps': {
    id: 'breast-pumps',
    name: 'Best Breast Pumps',
    category: 'feeding',
    description: 'Electric and manual breast pump options',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=breast+pump&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=breast+pump',
      target: 'https://www.target.com/s?searchTerm=breast+pump',
    },
    commissionRate: 7,
    priority: 'high',
  },

  'nursing-pillow': {
    id: 'nursing-pillow',
    name: 'Best Nursing Pillows',
    category: 'feeding',
    description: 'Comfortable support pillows for breastfeeding',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=nursing+pillow&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=nursing+pillow',
      target: 'https://www.target.com/s?searchTerm=nursing+pillow',
    },
    commissionRate: 6,
    priority: 'medium',
  },

  'high-chair': {
    id: 'high-chair',
    name: 'Best High Chairs',
    category: 'feeding',
    description: 'Easy-to-clean high chairs for mealtime',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=high+chair&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=high+chair',
      target: 'https://www.target.com/s?searchTerm=high+chair',
    },
    commissionRate: 7,
    priority: 'high',
  },

  'bottle-sterilizer': {
    id: 'bottle-sterilizer',
    name: 'Best Bottle Sterilizers',
    category: 'feeding',
    description: 'UV, steam, and microwave sterilizers',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=bottle+sterilizer&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=sterilizer',
      target: 'https://www.target.com/s?searchTerm=sterilizer',
    },
    commissionRate: 6,
    priority: 'medium',
  },

  // ============================================
  // SLEEP & SOOTHING
  // ============================================
  'baby-monitor': {
    id: 'baby-monitor',
    name: 'Best Baby Monitors',
    category: 'sleep',
    description: 'Video, audio, and wearable monitors',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+monitor&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=baby+monitor',
      target: 'https://www.target.com/s?searchTerm=baby+monitor',
    },
    commissionRate: 7,
    priority: 'premium',
  },

  'baby-swing': {
    id: 'baby-swing',
    name: 'Best Baby Swings',
    category: 'sleep',
    description: 'Soothing swings with various motion options',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+swing&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=swing',
      target: 'https://www.target.com/s?searchTerm=swing',
    },
    commissionRate: 7,
    priority: 'high',
  },

  'baby-bouncer': {
    id: 'baby-bouncer',
    name: 'Best Baby Bouncers',
    category: 'sleep',
    description: 'Gentle bouncers and rockers',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+bouncer&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=bouncer',
      target: 'https://www.target.com/s?searchTerm=bouncer',
    },
    commissionRate: 6,
    priority: 'high',
  },

  'white-noise-machine': {
    id: 'white-noise-machine',
    name: 'Best White Noise Machines',
    category: 'sleep',
    description: 'Soothing sound machines for better sleep',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=white+noise+machine&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=white+noise',
      target: 'https://www.target.com/s?searchTerm=white+noise',
    },
    commissionRate: 6,
    priority: 'medium',
  },

  // ============================================
  // HEALTH & SAFETY
  // ============================================
  'baby-monitor-video': {
    id: 'baby-monitor-video',
    name: 'Best Video Baby Monitors',
    category: 'health',
    description: 'Advanced video monitoring with night vision',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=video+baby+monitor&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=video+monitor',
      target: 'https://www.target.com/s?searchTerm=video+monitor',
    },
    commissionRate: 7,
    priority: 'high',
  },

  'baby-thermometer': {
    id: 'baby-thermometer',
    name: 'Best Baby Thermometers',
    category: 'health',
    description: 'Digital, infrared, and pacifier thermometers',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+thermometer&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=thermometer',
      target: 'https://www.target.com/s?searchTerm=thermometer',
    },
    commissionRate: 5,
    priority: 'medium',
  },

  'baby-gates': {
    id: 'baby-gates',
    name: 'Best Baby Gates',
    category: 'safety',
    description: 'Safety gates for stairs and doorways',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+gate&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=baby+gate',
      target: 'https://www.target.com/s?searchTerm=baby+gate',
    },
    commissionRate: 6,
    priority: 'high',
  },

  // ============================================
  // BATHING
  // ============================================
  'baby-bath-tub': {
    id: 'baby-bath-tub',
    name: 'Best Baby Bath Tubs',
    category: 'bathing',
    description: 'Safe, supportive baby bathing solutions',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+bath+tub&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=bath+tub',
      target: 'https://www.target.com/s?searchTerm=bath+tub',
    },
    commissionRate: 6,
    priority: 'medium',
  },

  'bathing-system': {
    id: 'bathing-system',
    name: 'Best Baby Bathing Systems',
    category: 'bathing',
    description: 'Complete bathing systems with seats and support',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=baby+bathing+system&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=bathing+system',
      target: 'https://www.target.com/s?searchTerm=bathing',
    },
    commissionRate: 7,
    priority: 'high',
  },

  // ============================================
  // UTILITY
  // ============================================
  'diaper-pail': {
    id: 'diaper-pail',
    name: 'Best Diaper Pails',
    category: 'utility',
    description: 'Odor-control diaper disposal solutions',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=diaper+pail&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=diaper+pail',
      target: 'https://www.target.com/s?searchTerm=diaper+pail',
    },
    commissionRate: 5,
    priority: 'medium',
  },

  'humidifier': {
    id: 'humidifier',
    name: 'Best Humidifiers for Babies',
    category: 'utility',
    description: 'Cool mist humidifiers for baby rooms',
    affiliateLinks: {
      amazon: 'https://amazon.com/s?k=humidifier+baby&tag=pregnancysprout-20',
      buyBaby: 'https://www.buybuybaby.com/search?q=humidifier',
      target: 'https://www.target.com/s?searchTerm=humidifier',
      walmart: 'https://www.walmart.com/search?q=baby+humidifier',
    },
    commissionRate: 6,
    priority: 'medium',
  },

  // ============================================
  // WAYFAIR (FURNITURE & DECOR)
  // ============================================
  'nursery-furniture-sets': {
    id: 'nursery-furniture-sets',
    name: 'Nursery Furniture Sets',
    category: 'furniture',
    description: 'Complete nursery furniture collections and sets',
    affiliateLinks: {
      wayfair: 'https://www.wayfair.com/nursery/sb0/nursery-furniture_1.html',
      amazon: 'https://amazon.com/s?k=nursery+furniture+set&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=nursery+furniture',
    },
    commissionRate: 12,
    priority: 'premium',
  },

  'baby-bedding-sets': {
    id: 'baby-bedding-sets',
    name: 'Baby Bedding Sets',
    category: 'furniture',
    description: 'Crib bedding sets with pillows and blankets',
    affiliateLinks: {
      wayfair: 'https://www.wayfair.com/nursery/sb0/crib-bedding_1.html',
      amazon: 'https://amazon.com/s?k=baby+bedding+set&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=baby+bedding',
    },
    commissionRate: 10,
    priority: 'high',
  },

  'changing-tables': {
    id: 'changing-tables',
    name: 'Changing Tables',
    category: 'furniture',
    description: 'Nursery changing tables with storage',
    affiliateLinks: {
      wayfair: 'https://www.wayfair.com/nursery/sb0/changing-tables_1.html',
      amazon: 'https://amazon.com/s?k=changing+table&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=changing+table',
    },
    commissionRate: 11,
    priority: 'high',
  },

  // ============================================
  // BEST BUY (TECH & MONITORS)
  // ============================================
  'baby-monitor-wifi': {
    id: 'baby-monitor-wifi',
    name: 'WiFi Baby Monitors',
    category: 'monitors',
    description: 'Smart WiFi-enabled baby monitors with app control',
    affiliateLinks: {
      bestBuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=baby+monitor',
      amazon: 'https://amazon.com/s?k=wifi+baby+monitor&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=smart+baby+monitor',
    },
    commissionRate: 8,
    priority: 'high',
  },

  'night-light-projectors': {
    id: 'night-light-projectors',
    name: 'Night Light Projectors',
    category: 'sleep',
    description: 'Star/moon projector night lights for nursery',
    affiliateLinks: {
      bestBuy: 'https://www.bestbuy.com/site/searchpage.jsp?st=night+light+projector',
      amazon: 'https://amazon.com/s?k=projector+night+light&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=night+light+projector',
    },
    commissionRate: 7,
    priority: 'medium',
  },

  // ============================================
  // ETSY (HANDMADE & UNIQUE ITEMS)
  // ============================================
  'personalized-nursery-decor': {
    id: 'personalized-nursery-decor',
    name: 'Personalized Nursery Decor',
    category: 'furniture',
    description: 'Custom name signs and personalized room decorations',
    affiliateLinks: {
      etsy: 'https://www.etsy.com/search?q=personalized+nursery+decor',
      amazon: 'https://amazon.com/s?k=personalized+nursery+wall+decor&tag=pregnancysprout-20',
    },
    commissionRate: 9,
    priority: 'medium',
  },

  'handmade-baby-quilts': {
    id: 'handmade-baby-quilts',
    name: 'Handmade Baby Quilts',
    category: 'bedding',
    description: 'Custom handmade baby quilts and blankets',
    affiliateLinks: {
      etsy: 'https://www.etsy.com/search?q=baby+quilt+handmade',
      amazon: 'https://amazon.com/s?k=baby+quilt&tag=pregnancysprout-20',
    },
    commissionRate: 10,
    priority: 'medium',
  },

  'wooden-toys': {
    id: 'wooden-toys',
    name: 'Wooden Baby Toys',
    category: 'toys',
    description: 'Eco-friendly wooden toys and teethers',
    affiliateLinks: {
      etsy: 'https://www.etsy.com/search?q=wooden+baby+toys',
      amazon: 'https://amazon.com/s?k=wooden+baby+toys&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=wooden+toys',
    },
    commissionRate: 8,
    priority: 'medium',
  },

  // ============================================
  // WALMART (BUDGET-FRIENDLY OPTIONS)
  // ============================================
  'budget-strollers': {
    id: 'budget-strollers',
    name: 'Budget-Friendly Strollers',
    category: 'strollers',
    description: 'Affordable strollers without breaking the bank',
    affiliateLinks: {
      walmart: 'https://www.walmart.com/cp/strollers/1088666',
      amazon: 'https://amazon.com/s?k=affordable+stroller&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=affordable+stroller',
    },
    commissionRate: 6,
    priority: 'high',
  },

  'budget-car-seats': {
    id: 'budget-car-seats',
    name: 'Budget Car Seats',
    category: 'car-seats',
    description: 'Affordable infant and convertible car seats',
    affiliateLinks: {
      walmart: 'https://www.walmart.com/cp/car-seats/1088665',
      amazon: 'https://amazon.com/s?k=affordable+car+seat&tag=pregnancysprout-20',
      target: 'https://www.target.com/s?searchTerm=affordable+car+seat',
    },
    commissionRate: 6,
    priority: 'high',
  },
};

/**
 * Helper function to get affiliate link
 * Usage: getAffiliateLink('best-car-seats', 'amazon')
 */
export function getAffiliateLink(productId: string, retailer: 'amazon' | 'buyBaby' | 'target' | 'walmart' | 'wayfair' | 'bestBuy' | 'etsy'): string | null {
  const product = affiliateProducts[productId];
  if (!product) return null;
  return product.affiliateLinks[retailer] || null;
}

/**
 * Helper function to get product by ID
 */
export function getProduct(productId: string): AffiliateProduct | null {
  return affiliateProducts[productId] || null;
}

/**
 * Get all products in a category
 */
export function getProductsByCategory(category: string): AffiliateProduct[] {
  return Object.values(affiliateProducts).filter(p => p.category === category);
}

/**
 * Get all premium/high-priority products (for featured sections)
 */
export function getFeaturedProducts(): AffiliateProduct[] {
  return Object.values(affiliateProducts).filter(p => p.priority === 'premium' || p.priority === 'high');
}
