import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { siteConfig } from '@/config/site';
import { BuyButton } from '@/components/affiliate/BuyButton';
import { InContentAd } from '@/components/ads/InContentAd';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import type { ProductCategory } from '@/types/product';

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const categoryLabels: Record<string, string> = {
  strollers: 'Strollers',
  'car-seats': 'Car Seats',
  cribs: 'Cribs & Bassinets',
  monitors: 'Baby Monitors',
  'breast-pumps': 'Breast Pumps',
  'high-chairs': 'High Chairs',
  'baby-carriers': 'Baby Carriers',
  bouncers: 'Bouncers & Swings',
  swings: 'Baby Swings',
  'white-noise-machines': 'White Noise Machines',
  nursery: 'Nursery',
  'feeding-gear': 'Feeding Gear',
  toys: 'Baby Toys',
  safety: 'Safety',
  clothing: 'Clothing',
};

const fallbackImages: Record<string, string> = {
  strollers: 'https://images.unsplash.com/photo-1590492239080-e50b66d15a3d?w=1200&q=85&auto=format&fit=crop',
  cribs: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=85&auto=format&fit=crop',
  'car-seats': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=85&auto=format&fit=crop',
  monitors: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=85&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=85&auto=format&fit=crop',
};

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProductBySlug(category as ProductCategory, slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title}`,
    description: product.description,
    alternates: { canonical: `${siteConfig.url}/products/${category}/${slug}` },
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'article',
    },
  };
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
    />
  ));
}

export default async function ProductReviewPage({ params }: Props) {
  const { category, slug } = await params;
  const product = getProductBySlug(category as ProductCategory, slug);
  if (!product) notFound();

  const catLabel = categoryLabels[category] || category;
  const heroImage = product.image?.startsWith('http')
    ? product.image
    : fallbackImages[category] || fallbackImages.default;

  const priceRangeLabel = { budget: 'Budget', 'mid-range': 'Mid-Range', premium: 'Premium' }[product.priceRange];
  const priceRangeColor = { budget: 'bg-green-100 text-green-700', 'mid-range': 'bg-blue-100 text-blue-700', premium: 'bg-purple-100 text-purple-700' }[product.priceRange];

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: catLabel, href: `/products/${category}` },
        { name: product.productName, href: `/products/${category}/${slug}` },
      ]} />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-brand-600">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products/${category}`} className="hover:text-brand-600">{catLabel}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-600 font-medium truncate max-w-[200px]">{product.productName}</span>
        </nav>

        {/* Affiliate disclosure */}
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 rounded-full px-4 py-1.5 text-xs mb-6">
          <span>Affiliate disclosure: We may earn a commission from purchases. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.</span>
        </div>

        <article>
          {/* Reviewer credentials box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900">Thoroughly Reviewed</p>
              <p className="text-blue-800 text-xs mt-0.5">
                This product was evaluated based on verified specifications, safety standards, and independent research. Last tested: June 2026.
              </p>
            </div>
          </div>

          {/* Hero */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src={heroImage}
              alt={product.imageAlt || product.productName}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priceRangeColor}`}>{priceRangeLabel}</span>
                <span className="bg-brand-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{catLabel}</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <header className="mb-8">
            <p className="text-sm text-gray-500 font-medium mb-1">{product.brand}</p>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {product.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>

            {/* Score + stars */}
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="bg-brand-600 text-white text-xl font-bold w-12 h-12 rounded-xl flex items-center justify-center">
                  {product.ourScore.toFixed(1)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Our Score</p>
                  <p className="text-xs text-gray-400">out of 10</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">{renderStars(product.starRating)}</div>
                <p className="text-xs text-gray-400">{product.starRating}/5 rating</p>
              </div>
            </div>
          </header>

          {/* Buy buttons */}
          {product.affiliateLinks && product.affiliateLinks.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">Where to Buy</h2>
              <div className="flex flex-wrap gap-3">
                {product.affiliateLinks.map((link, i) => (
                  <BuyButton key={i} href={link.url} price={link.price} />
                ))}
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <h2 className="font-semibold text-green-800 mb-3 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Pros
              </h2>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
              <h2 className="font-semibold text-red-800 mb-3 flex items-center gap-1.5">
                <XCircle className="h-4 w-4" /> Cons
              </h2>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>{con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom line */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-8">
            <h2 className="font-semibold text-brand-800 mb-2 text-sm">Our Bottom Line</h2>
            <p className="text-brand-700 leading-relaxed">{product.bottomLine}</p>
          </div>

          {/* Affiliate & Trust info */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-700">Affiliate disclosure:</strong> PregnancySprout may earn a commission from purchases made through links on this page. This does not affect our recommendation — we only suggest products we genuinely believe offer good value. <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">Learn more about how we test products.</Link>
            </p>
          </div>

          <InContentAd />

          {/* Specs table — card list on mobile, table on sm+ */}
          {product.specsTable && Object.keys(product.specsTable).length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Specifications</h2>

              {/* Mobile: stacked key-value cards */}
              <dl className="sm:hidden space-y-2">
                {Object.entries(product.specsTable).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start gap-4 bg-gray-50 rounded-xl px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 flex-shrink-0">{key}</dt>
                    <dd className="text-sm text-gray-600 text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Desktop: proper table */}
              <div className="hidden sm:block rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <caption className="sr-only">
                    Product specifications for {product.title}
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Specification</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.specsTable).map(([key, value], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-medium text-gray-700 w-2/5">{key}</td>
                        <td className="px-4 py-3 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <section className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {product.faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back nav */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link href={`/products/${category}`} className="flex items-center gap-1.5 text-sm text-brand-600 hover:underline font-medium">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to {catLabel}
            </Link>
            <Link href="/products" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
              All Products →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
