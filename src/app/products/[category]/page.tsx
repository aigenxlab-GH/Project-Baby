import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Star, ShieldCheck, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { getProductsByCategory } from '@/lib/products';
import { siteConfig } from '@/config/site';
import { ProductCard } from '@/components/affiliate/ProductCard';
import { ProductComparison } from '@/components/affiliate/ProductComparison';
import { InContentAd } from '@/components/ads/InContentAd';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { resolveProductImage } from '@/lib/product-images';
import type { ProductCategory, ProductReview } from '@/types/product';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ category: string }>;
}

// Computed automatically from live ourScore/priceRange — never hand-authored,
// so a badge can never go stale when a product's score or price changes.
// A product gets at most one badge, in this priority order.
function getBadges(products: ProductReview[]): Record<string, string> {
  if (products.length < 2) return {};
  const badges: Record<string, string> = {};
  const remaining = [...products];

  const bestOverall = [...remaining].sort((a, b) => b.ourScore - a.ourScore)[0];
  if (bestOverall) {
    badges[bestOverall.slug] = 'Best Overall';
    remaining.splice(remaining.indexOf(bestOverall), 1);
  }

  const bestBudget = remaining
    .filter((p) => p.priceRange === 'budget')
    .sort((a, b) => b.ourScore - a.ourScore)[0];
  if (bestBudget) {
    badges[bestBudget.slug] = 'Best Budget';
    remaining.splice(remaining.indexOf(bestBudget), 1);
  }

  const bestPremium = remaining
    .filter((p) => p.priceRange === 'premium')
    .sort((a, b) => b.ourScore - a.ourScore)[0];
  if (bestPremium) badges[bestPremium.slug] = 'Best Premium';

  return badges;
}

const categoryLabels: Record<string, string> = {
  // ── Essentials ───────────────────────────────────────────────────────────
  'mom-essentials': 'Mom Essentials',
  'baby-essentials': 'Baby Essentials',
  // ── Core categories ──────────────────────────────────────────────────────
  strollers: 'Best Strollers',
  'car-seats': 'Best Car Seats',
  cribs: 'Best Cribs & Bassinets',
  'breast-pumps': 'Best Breast Pumps',
  'baby-carriers': 'Best Baby Carriers',
  'baby-bouncers': 'Best Baby Bouncers',
  'baby-swings': 'Best Baby Swings',
  'white-noise': 'Best White Noise Machines',
  // ── Feeding & nursing ────────────────────────────────────────────────────
  'nursing-feeding': 'Best Nursing & Feeding Products',
  'nursing-chairs': 'Best Nursing Chairs & Gliders',
  // ── Sleep ────────────────────────────────────────────────────────────────
  'sleep-sacks': 'Best Sleep Sacks & Swaddles',
  // ── Travel & gear ────────────────────────────────────────────────────────
  'diaper-bags': 'Best Diaper Bags',
  'diaper-pails': 'Best Diaper Pails',
  // ── Safety & health ──────────────────────────────────────────────────────
  'baby-gates': 'Best Baby Gates',
  'baby-bathtubs': 'Best Baby Bathtubs',
  'baby-thermometers': 'Best Baby Thermometers',
  'baby-nail-care': 'Best Baby Nail Care Kits',
  // ── Play & development ───────────────────────────────────────────────────
  'activity-centers': 'Best Activity Centers & Jumpers',
  'play-mats': 'Best Baby Play Mats & Gyms',
  'teething-toys': 'Best Teething Toys',
  'bath-toys': 'Best Bath Toys',
  // ── Feeding & kitchen ────────────────────────────────────────────────────
  'baby-food-makers': 'Best Baby Food Makers & Blenders',
  'sippy-cups': 'Best Sippy Cups & Toddler Cups',
  // ── Toddler ──────────────────────────────────────────────────────────────
  'potty-training': 'Best Potty Training Seats & Chairs',
  // ── Other ────────────────────────────────────────────────────────────────
  'baby-loungers': 'Best Baby Loungers',
  humidifiers: 'Best Humidifiers for Baby Rooms',
};

export async function generateStaticParams() {
  return Object.keys(categoryLabels).map((category) => ({ category }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  return {
    title: `${label} 2026 — Reviews & Buying Guide`,
    description: `Honest reviews of the ${label.toLowerCase()} for 2026. Expert tested, parent approved — find the best option for every budget.`,
    alternates: { canonical: `${siteConfig.url}/products/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const products = await getProductsByCategory(category as ProductCategory);
  const label = categoryLabels[category] || category;
  // Strip a leading "Best " so prose like "the best {x}" doesn't read "the best best strollers".
  const cleanLabel = label.replace(/^Best\s+/i, '').toLowerCase();
  const badges = getBadges(products);
  const topPick = products.length >= 2
    ? [...products].sort((a, b) => b.ourScore - a.ourScore)[0]
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: label, href: `/products/${category}` },
      ]} />

      <HeaderAd />

      <div className="container mx-auto max-w-7xl px-4 pt-4 pb-10">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-3" aria-label="Breadcrumb">
        <Link href="/" className="py-1 hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <Link href="/products" className="py-1 hover:text-brand-600">Products</Link>
        <ChevronRight className="h-3 w-3" aria-hidden="true" />
        <span className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">{label}</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{label} — 2026 Reviews</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
        {topPick
          ? <>Our editorial team researched and scored {products.length} {cleanLabel} for 2026. Our top pick is the <strong className="text-gray-900 dark:text-white">{topPick.productName}</strong>, scoring {topPick.ourScore}/10 — but we've ranked options for every budget below.</>
          : <>Our editorial team researched and ranked the best {cleanLabel} for 2026 — honest pros, cons, and picks for every budget.</>
        }
      </p>

      {/* Trust + disclosure — single compact row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" /> Scored out of 10
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-green-500" aria-hidden="true" /> Safety-checked
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshCw className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" /> Updated June 2026
        </span>
        <span className="hidden sm:inline text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
        <span className="text-gray-400 dark:text-gray-500">
          Affiliate disclosure: we may earn a commission. <Link href="/affiliate-disclosure" className="underline hover:text-brand-600">Learn more</Link>
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">Reviews coming soon!</p>
          <p className="text-sm">We are currently testing products in this category.</p>
        </div>
      ) : (
        <>
          {/* Top Pick callout — computed from live ourScore, never hand-authored */}
          {topPick && (
            <Link
              href={`/products/${topPick.category}/${topPick.slug}`}
              className="flex flex-col sm:flex-row items-center gap-4 mb-6 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-5 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors group"
            >
              <div className="relative w-24 h-24 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl">
                <Image
                  src={resolveProductImage(topPick.image, topPick.category)}
                  alt={topPick.imageAlt || topPick.productName}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" /> Our Top Pick
                </span>
                <p className="font-serif text-lg font-bold text-gray-900 dark:text-white">{topPick.productName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{topPick.bottomLine}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="bg-brand-600 text-white rounded-full px-3 py-1.5 text-sm font-bold">{topPick.ourScore}/10</span>
                <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          )}

          {/* Comparison tool — only shown when 2+ products exist */}
          {products.length >= 2 && (
            <ProductComparison products={products} categoryLabel={label} />
          )}

          <div className="space-y-6">
            {products.map((product, i) => (
              <div key={product.slug}>
                <ProductCard product={product} variant="featured" badge={badges[product.slug]} />
                {(i + 1) % 4 === 0 && <InContentAd />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  );
}
