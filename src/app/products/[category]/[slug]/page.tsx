import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

// Convert raw markdown body to HTML — same approach used in blog/[slug]/page.tsx
// Plain regex transform: no MDX compilation, no heavy dependencies, Cloudflare-safe.
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-600 hover:underline">$1</a>')
    .replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>')
    .replace(/^\s*\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^(?!<[a-z/]).+$/gm, (line) => line.trim() ? `<p>${line}</p>` : '')
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n{3,}/g, '\n\n');
}
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { siteConfig } from '@/config/site';
import { BuyButton } from '@/components/affiliate/BuyButton';
import { InContentAd } from '@/components/ads/InContentAd';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { ShareButtons } from '@/components/shared/ShareButtons';
import type { ProductCategory } from '@/types/product';

export const dynamic = 'force-static';

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
  'baby-swings': 'Baby Swings',
  'baby-bouncers': 'Baby Bouncers',
  'white-noise-machines': 'White Noise Machines',
  'white-noise': 'White Noise Machines',
  'activity-centers': 'Activity Centers',
  'baby-bathtubs': 'Baby Bathtubs',
  'baby-food-makers': 'Baby Food Makers',
  'baby-gates': 'Baby Gates',
  'baby-loungers': 'Baby Loungers',
  'baby-nail-care': 'Baby Nail Care',
  'baby-thermometers': 'Baby Thermometers',
  'bath-toys': 'Bath Toys',
  'diaper-bags': 'Diaper Bags',
  'diaper-pails': 'Diaper Pails',
  humidifiers: 'Humidifiers',
  'nursing-chairs': 'Nursing Chairs',
  'nursing-feeding': 'Nursing & Feeding',
  'play-mats': 'Play Mats',
  'potty-training': 'Potty Training',
  'sippy-cups': 'Sippy Cups',
  'sleep-sacks': 'Sleep Sacks & Swaddles',
  'teething-toys': 'Teething Toys',
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
  'breast-pumps': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'high-chairs': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'baby-carriers': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'sleep-sacks': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=85&auto=format&fit=crop',
  'baby-gates': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=85&auto=format&fit=crop',
  'activity-centers': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'play-mats': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'teething-toys': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'bath-toys': 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=1200&q=85&auto=format&fit=crop',
  'baby-bathtubs': 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=1200&q=85&auto=format&fit=crop',
  'diaper-bags': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
  'diaper-pails': 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=85&auto=format&fit=crop',
  humidifiers: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=85&auto=format&fit=crop',
  'white-noise': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=85&auto=format&fit=crop',
  'nursing-chairs': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
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

      <HeaderAd />

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
        <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full px-4 py-1.5 text-xs mb-6">
          <span>Affiliate disclosure: We may earn a commission from purchases. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.</span>
        </div>

        <article>
          {/* Reviewer credentials box */}
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-200">Thoroughly Reviewed</p>
              <p className="text-blue-800 dark:text-blue-300 text-xs mt-0.5">
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
            <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 mb-8 border border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Where to Buy</h2>
              <div className="flex flex-wrap gap-3">
                {product.affiliateLinks.map((link, i) => (
                  <BuyButton key={i} href={link.url} price={link.price} />
                ))}
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-5 border border-green-100 dark:border-green-900">
              <h2 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Pros
              </h2>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-green-700 dark:text-green-200 flex items-start gap-2">
                    <span className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0">✓</span>{pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl p-5 border border-red-100 dark:border-red-900">
              <h2 className="font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-1.5">
                <XCircle className="h-4 w-4" /> Cons
              </h2>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-700 dark:text-red-200 flex items-start gap-2">
                    <span className="text-red-400 dark:text-red-400 mt-0.5 flex-shrink-0">✗</span>{con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom line */}
          <div className="bg-brand-50 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900 rounded-2xl p-5 mb-8">
            <h2 className="font-semibold text-brand-800 dark:text-brand-300 mb-2 text-sm">Our Bottom Line</h2>
            <p className="text-brand-700 dark:text-brand-200 leading-relaxed">{product.bottomLine}</p>
          </div>

          <InContentAd />

          {/* In-depth review body — MDX narrative content */}
          {product.content && product.content.trim().length > 20 && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-bold text-gray-900">In-Depth Review</h2>
                {product.readingTime && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    {product.readingTime} min read
                  </span>
                )}
              </div>
              <div
                className="prose prose-sm max-w-none
                  prose-headings:font-serif
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:font-bold
                  prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-h3:font-semibold
                  prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-700 dark:prose-li:text-gray-200 prose-li:leading-relaxed
                  prose-ul:my-3 prose-ol:my-3
                  prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-400 prose-blockquote:bg-brand-50 dark:prose-blockquote:bg-brand-950/40 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4
                  prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-6"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(product.content) }}
              />
            </section>
          )}

          {/* How we evaluate */}
          <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 mb-8">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">How We Evaluate {catLabel}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
              Every product on PregnancySprout is evaluated against a consistent framework: verified manufacturer specifications, independent safety certifications (JPMA, ASTM, CPSC compliance), verified user feedback patterns from multiple retail platforms, and comparison against direct competitors in the same price tier.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Our scoring reflects real-world usability for parents — not just spec-sheet comparisons. We weight safety (40%), value for money (25%), ease of use (20%), and longevity/durability (15%). Products scoring above 8.5 represent exceptional value in their category.</span>
            </p>
          </div>

          {/* Affiliate & Trust info */}
          <div className="bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-8">
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-700 dark:text-gray-200">Affiliate disclosure:</strong> PregnancySprout may earn a commission from purchases made through links on this page. This does not affect our recommendation — we only suggest products we genuinely believe offer good value. <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">Learn more about how we test products.</Link>
            </p>
          </div>

          <ArticleBottomAd />

          {/* Specs table — card list on mobile, table on sm+ */}
          {product.specsTable && Object.keys(product.specsTable).length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Specifications</h2>

              {/* Mobile: stacked key-value cards */}
              <dl className="sm:hidden space-y-2">
                {Object.entries(product.specsTable).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start gap-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl px-4 py-3">
                    <dt className="text-sm font-medium text-gray-700 dark:text-gray-200 flex-shrink-0">{key}</dt>
                    <dd className="text-sm text-gray-600 dark:text-gray-300 text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Desktop: proper table */}
              <div className="hidden sm:block rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
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
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/60' : 'bg-white dark:bg-gray-900/30'}>
                        <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200 w-2/5">{key}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <section className="mt-8 bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {product.faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800/60 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Share buttons */}
          <div className="mt-8 pt-5 border-t border-gray-100">
            <ShareButtons
              url={`/products/${category}/${slug}`}
              title={`${product.productName} Review — PregnancySprout`}
              image={product.image}
              description={product.bottomLine}
            />
          </div>

          {/* Back nav */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
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
