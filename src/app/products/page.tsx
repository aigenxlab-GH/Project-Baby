import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Best Baby Products — Honest Reviews & Buying Guides',
  description: 'Expert reviews of the best baby products — strollers, car seats, cribs, monitors, breast pumps, and more. Find the right products for every budget.',
  alternates: { canonical: `${siteConfig.url}/products` },
};

const categories = [
  { slug: 'strollers', label: 'Strollers', emoji: '🛒', desc: 'Travel systems, joggers, lightweight & umbrella strollers' },
  { slug: 'car-seats', label: 'Car Seats', emoji: '🚗', desc: 'Infant, convertible, and all-in-one car seats' },
  { slug: 'cribs', label: 'Cribs & Bassinets', emoji: '🛏️', desc: 'Convertible cribs, mini cribs, bassinets, and bedside sleepers' },
  { slug: 'monitors', label: 'Baby Monitors', emoji: '📷', desc: 'Video, audio, and wearable baby monitors' },
  { slug: 'breast-pumps', label: 'Breast Pumps', emoji: '🍼', desc: 'Electric, manual, and wearable breast pumps' },
  { slug: 'high-chairs', label: 'High Chairs', emoji: '🪑', desc: 'Traditional, hook-on, and booster high chairs' },
  { slug: 'baby-carriers', label: 'Baby Carriers', emoji: '👶', desc: 'Wraps, ring slings, structured carriers, and backpacks' },
  { slug: 'bouncers', label: 'Bouncers & Swings', emoji: '🎠', desc: 'Infant bouncers, swings, and rockers' },
  { slug: 'swings', label: 'Baby Swings', emoji: '🌙', desc: 'Full-size and portable baby swings' },
  { slug: 'white-noise-machines', label: 'White Noise Machines', emoji: '🔊', desc: 'Sound machines for better baby sleep' },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Products', href: '/products' }]} />
      <Breadcrumb items={[{ name: 'Product Reviews', href: '/products' }]} />
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Baby Product Reviews
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Honest, in-depth reviews of the best baby products — tested and rated by parents,
          for every budget.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 text-amber-800 rounded-full px-4 py-2 text-sm">
          <span>⚠️</span>
          <span>Some links on this page are affiliate links. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-brand-200 transition-all duration-200"
          >
            <div className="text-4xl mb-3">{cat.emoji}</div>
            <h2 className="font-serif text-xl font-bold text-gray-900 group-hover:text-brand-600 mb-2">
              {cat.label}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{cat.desc}</p>
            <div className="flex items-center gap-1 text-brand-600 text-sm font-medium">
              View Reviews <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
