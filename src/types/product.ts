export type ProductCategory =
  | 'strollers'
  | 'cribs'
  | 'car-seats'
  | 'monitors'
  | 'breast-pumps'
  | 'high-chairs'
  | 'baby-carriers'
  | 'bouncers'
  | 'swings'
  | 'white-noise-machines'
  | 'activity-centers'
  | 'baby-bathtubs'
  | 'baby-bouncers'
  | 'baby-food-makers'
  | 'baby-gates'
  | 'baby-loungers'
  | 'baby-nail-care'
  | 'baby-swings'
  | 'baby-thermometers'
  | 'bath-toys'
  | 'diaper-bags'
  | 'diaper-pails'
  | 'humidifiers'
  | 'nursing-chairs'
  | 'nursing-feeding'
  | 'play-mats'
  | 'potty-training'
  | 'sippy-cups'
  | 'sleep-sacks'
  | 'teething-toys'
  | 'white-noise';

export interface AffiliateLink {
  retailer: 'amazon' | 'walmart' | 'target' | 'buybuybaby';
  url: string;
  price?: string;
  inStock?: boolean;
}

export interface ProductReview {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: ProductCategory;
  slug: string;
  productName: string;
  brand: string;
  modelYear?: number;
  priceRange: 'budget' | 'mid-range' | 'premium';
  ourScore: number;
  starRating: number;
  pros: string[];
  cons: string[];
  bottomLine: string;
  affiliateLinks: AffiliateLink[];
  image: string;
  imageAlt: string;
  faqs?: Array<{ q: string; a: string }>;
  specsTable?: Record<string, string>;
  featured?: boolean;
  tags: string[];
  content?: string;
  wordCount?: number;
  readingTime?: number;
}
