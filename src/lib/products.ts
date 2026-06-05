import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ProductReview, ProductCategory } from '@/types/product';

const productsDir = path.join(process.cwd(), 'content', 'products');

export function getAllProducts(): ProductReview[] {
  if (!fs.existsSync(productsDir)) return [];
  const categories = fs.readdirSync(productsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
  const all: ProductReview[] = [];

  for (const cat of categories) {
    const catDir = path.join(productsDir, cat.name);
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const slug = file.replace('.mdx', '');
      const product = getProductBySlug(cat.name as ProductCategory, slug);
      if (product) all.push(product);
    }
  }

  return all.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getProductsByCategory(category: ProductCategory): ProductReview[] {
  const catDir = path.join(productsDir, category);
  if (!fs.existsSync(catDir)) return [];

  return fs
    .readdirSync(catDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => getProductBySlug(category, f.replace('.mdx', '')))
    .filter((p): p is ProductReview => p !== null)
    .sort((a, b) => b.ourScore - a.ourScore);
}

export function getProductBySlug(category: ProductCategory, slug: string): ProductReview | null {
  const filePath = path.join(productsDir, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);

  return {
    ...(data as Omit<ProductReview, 'slug' | 'category'>),
    slug,
    category,
  } as ProductReview;
}

export function getFeaturedProducts(limit = 6): ProductReview[] {
  return getAllProducts().filter((p) => p.featured).slice(0, limit);
}
