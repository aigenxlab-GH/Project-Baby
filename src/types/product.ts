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
  | 'white-noise-machines';

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
}
