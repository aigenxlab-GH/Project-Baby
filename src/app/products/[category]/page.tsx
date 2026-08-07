import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Star, ShieldCheck, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { getProductsByCategory } from '@/lib/products';
import { siteConfig } from '@/config/site';
import { ProductCard } from '@/components/affiliate/ProductCard';
import { ProductComparison } from '@/components/affiliate/ProductComparison';
import { InContentAd } from '@/components/ads/InContentAd';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import type { ProductCategory } from '@/types/product';

// Links each category to its matching "Best X of 2026" roundup page(s), so
// visitors comparing products can find the roundup and vice versa — these
// roundup pages were previously reachable only via sitemap.xml, with zero
// internal links pointing to them from anywhere on the site. Includes
// `monitors`/`high-chairs` even though those categories have no live
// products yet — better to point an empty category page somewhere useful
// than a dead end.
const CATEGORY_ROUNDUPS: Record<string, { slug: string; label: string }[]> = {
  strollers: [{ slug: 'best-strollers-2026', label: 'Best Strollers of 2026' }],
  'baby-carriers': [
    { slug: 'best-baby-carriers-2026', label: 'Best Baby Carriers of 2026' },
    { slug: 'best-baby-carriers-newborns-2026', label: 'Best Baby Carriers for Newborns 2026' },
  ],
  'breast-pumps': [{ slug: 'best-breast-pumps-2026', label: 'Best Breast Pumps of 2026' }],
  'car-seats': [{ slug: 'best-convertible-car-seats-2026', label: 'Best Convertible Car Seats of 2026' }],
  cribs: [{ slug: 'best-cribs-under-300-2026', label: 'Best Cribs Under $300 in 2026' }],
  'diaper-bags': [{ slug: 'best-diaper-bags-2026', label: 'Best Diaper Bags of 2026' }],
  'sleep-sacks': [{ slug: 'best-sleep-sacks-swaddles-2026', label: 'Best Sleep Sacks & Swaddles of 2026' }],
  'white-noise': [{ slug: 'best-white-noise-machines-2026', label: 'Best White Noise Machines for Babies 2026' }],
  'baby-bouncers': [{ slug: 'best-baby-bouncers-2026', label: 'Best Baby Bouncers & Rockers of 2026' }],
  monitors: [
    { slug: 'best-baby-monitors-2026', label: 'Best Baby Monitors of 2026' },
    { slug: 'best-budget-baby-monitors-2026', label: 'Best Budget Baby Monitors 2026' },
  ],
  'high-chairs': [{ slug: 'best-baby-high-chairs-2026', label: 'Best Baby High Chairs of 2026' }],
};

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ category: string }>;
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
    title: `${label} — Reviews & Buying Guide`,
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
  const roundups = CATEGORY_ROUNDUPS[category] ?? [];

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
        Our editorial team researched and ranked the best {cleanLabel} for 2026 — honest pros, cons, and picks for every budget.
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

      {/* Link to the matching "Best X of 2026" roundup(s) — these comparison
          pages were previously reachable only via sitemap.xml. */}
      {roundups.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {roundups.map((r) => (
            <Link
              key={r.slug}
              href={`/products/roundups/${r.slug}`}
              className="flex-1 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors group"
            >
              <span className="flex items-center gap-2.5">
                <Trophy className="h-5 w-5 text-amber-500 flex-shrink-0" aria-hidden="true" />
                <span className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                  See our {r.label} picks
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}

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
