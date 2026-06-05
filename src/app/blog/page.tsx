import type { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Clock, User } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Blog — Pregnancy & Baby Articles',
  description: 'Expert articles on pregnancy, baby care, parenting tips, and product recommendations.',
  alternates: { canonical: `${siteConfig.url}/blog` },
};

// Fallback images per category when article has no image
const fallbackImages: Record<string, string> = {
  pregnancy: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&auto=format&fit=crop',
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
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">Blog</h1>
        <p className="text-gray-500 text-lg">Expert articles on pregnancy, baby care, and parenting.</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">Articles coming soon!</p>
          <p className="text-sm mt-2">Check back for expert pregnancy and parenting content.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, i) => {
            const imgSrc = article.image?.startsWith('http')
              ? article.image
              : fallbackImages[article.category] || fallbackImages.default;

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                {/* Thumbnail */}
                <div className={`relative overflow-hidden ${i === 0 ? 'h-72' : 'h-48'}`}>
                  <Image
                    src={imgSrc}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 900px' : '(max-width: 768px) 100vw, 450px'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {article.category && (
                    <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {article.category}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" aria-hidden="true" />{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{article.readingTime} min read</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h2 className={`font-serif font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug ${i === 0 ? 'text-2xl' : 'text-lg'}`}>
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{article.description}</p>
                  <span className="inline-block mt-4 text-brand-600 text-sm font-semibold group-hover:underline">
                    Read article →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
