export interface ArticleFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  category: 'pregnancy' | 'baby-names' | 'products' | 'parenting' | 'blog' | 'tools';
  tags: string[];
  image: string;
  imageAlt: string;
  canonical?: string;
  noIndex?: boolean;
  faqs?: Array<{ q: string; a: string }>;
  relatedSlugs?: string[];
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
  wordCount: number;
}
