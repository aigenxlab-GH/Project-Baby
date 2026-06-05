import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllSlugs } from '@/lib/mdx';
import { getAllProducts } from '@/lib/products';

const url = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: url('/tools/due-date-calculator'), lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: url('/tools/ovulation-calculator'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/tools/contraction-timer'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/tools/baby-name-generator'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/tools/registry-checklist'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/tools/symptom-checker'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/pregnancy'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/pregnancy/week-by-week'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/baby-names'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/products'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/parenting'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/blog'), lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: url('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/privacy-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/affiliate-disclosure'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Pregnancy week pages (1–40)
  const weekPages: MetadataRoute.Sitemap = Array.from({ length: 40 }, (_, i) => ({
    url: url(`/pregnancy/week-by-week/week-${i + 1}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // All blog articles — dynamically from content folder
  const blogSlugs = getAllSlugs('blog');
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: url(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // All parenting articles
  const parentingTopics = ['newborn', 'sleep', 'feeding', 'development'];
  const parentingPages: MetadataRoute.Sitemap = parentingTopics.flatMap((topic) => {
    try {
      return getAllSlugs(`parenting/${topic}`).map((slug) => ({
        url: url(`/parenting/${topic}/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    } catch { return []; }
  });

  // All product pages
  const products = getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.category}/${p.slug}`),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Product category pages
  const productCategories = [
    'strollers', 'cribs', 'car-seats', 'monitors', 'breast-pumps',
    'high-chairs', 'baby-carriers', 'bouncers', 'swings', 'white-noise-machines',
    'nursery', 'feeding-gear', 'toys', 'safety', 'clothing',
  ];
  const productCategoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: url(`/products/${cat}`),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...weekPages,
    ...blogPages,
    ...parentingPages,
    ...productPages,
    ...productCategoryPages,
  ];
}
