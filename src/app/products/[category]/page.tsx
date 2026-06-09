import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import { getProductsByCategory } from '@/lib/products';
import { siteConfig } from '@/config/site';
import { ProductCard } from '@/components/affiliate/ProductCard';
import { ProductComparison } from '@/components/affiliate/ProductComparison';
import { InContentAd } from '@/components/ads/InContentAd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import type { ProductCategory } from '@/types/product';

interface Props {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  strollers: 'Best Strollers',
  'car-seats': 'Best Car Seats',
  cribs: 'Best Cribs & Bassinets',
  monitors: 'Best Baby Monitors',
  'breast-pumps': 'Best Breast Pumps',
  'high-chairs': 'Best High Chairs',
  'baby-carriers': 'Best Baby Carriers',
  bouncers: 'Best Bouncers & Swings',
  swings: 'Best Baby Swings',
  'white-noise-machines': 'Best White Noise Machines',
};

export async function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  return {
    title: `${label} — Reviews & Buying Guide`,
    description: `Honest reviews of the ${label.toLowerCase()} for 2026. Expert tested, parent approved — find the best option for every budget.`,
    alternates: { canonical: `${siteConfig.url}/products/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const products = getProductsByCategory(category as ProductCategory);
  const label = categoryLabels[category] || category;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: label, href: `/products/${category}` },
      ]} />

      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href="/products" className="hover:text-brand-600">Products</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-gray-900 font-medium" aria-current="page">{label}</span>
      </nav>

      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">{label} — 2026 Reviews</h1>
      <p className="text-gray-600 mb-4 max-w-2xl">
        Our editorial team has researched and ranked the best {label.toLowerCase()} for 2026.
        Updated regularly with honest pros, cons, and recommendations for every budget.
      </p>

      {/* Trust bar */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" /> Scored out of 10
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-green-500" aria-hidden="true" /> Safety-checked
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshCw className="h-4 w-4 text-blue-500" aria-hidden="true" /> Updated June 2026
        </span>
      </div>

      <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 rounded-full px-4 py-2 text-sm mb-10">
        <span aria-hidden="true">⚠️</span>
        <span>Affiliate disclosure: We may earn a commission from purchases. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.</span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">Reviews coming soon!</p>
          <p className="text-sm">We are currently testing products in this category.</p>
        </div>
      ) : (
        <>
          {/* Comparison tool — only shown when 2+ products exist */}
          {products.length >= 2 && (
            <ProductComparison products={products} categoryLabel={label} />
          )}

          <div className="space-y-6">
            {products.map((product, i) => (
              <div key={product.slug}>
                <ProductCard product={product} variant="featured" />
                {(i + 1) % 3 === 0 && <InContentAd />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
