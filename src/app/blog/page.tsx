import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getAllArticles } from '@/lib/mdx';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { BlogGrid } from './BlogGrid';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — Pregnancy & Baby Articles',
  description: 'Expert articles on pregnancy, baby care, parenting tips, and product recommendations. Browse 43+ guides for expecting and new parents.',
  alternates: { canonical: `${siteConfig.url}/blog` },
};

const fallbackImages: Record<string, string> = {
  pregnancy: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80&auto=format&fit=crop',
  products: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80&auto=format&fit=crop',
  parenting: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80&auto=format&fit=crop',
};

export default function BlogPage() {
  const articles = getAllArticles('blog');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
      ]} />

      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg">
          Expert articles on pregnancy, baby care, and parenting. {articles.length} guides and counting.
        </p>
      </div>

      <BlogGrid articles={articles} fallbackImages={fallbackImages} />
    </div>
  );
}
