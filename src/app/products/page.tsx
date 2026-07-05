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

const categoryGroups = [
  {
    group: 'Essentials',
    emoji: '⭐',
    categories: [
      { slug: 'mom-essentials', label: 'Mom Essentials', desc: 'Postpartum recovery & self-care' },
      { slug: 'baby-essentials', label: 'Baby Essentials', desc: 'Must-haves for day one' },
    ],
  },
  {
    group: 'Feeding & Nursing',
    emoji: '🍼',
    categories: [
      { slug: 'breast-pumps', label: 'Breast Pumps', desc: 'Electric, manual & wearable' },
      { slug: 'nursing-chairs', label: 'Nursing Chairs', desc: 'Gliders & recliners' },
      { slug: 'nursing-feeding', label: 'Nursing & Feeding', desc: 'Accessories & supplies' },
      { slug: 'sippy-cups', label: 'Sippy Cups', desc: 'Toddler drinking cups' },
      { slug: 'baby-food-makers', label: 'Food Makers', desc: 'Blenders & steamers' },
    ],
  },
  {
    group: 'Sleep & Comfort',
    emoji: '😴',
    categories: [
      { slug: 'cribs', label: 'Cribs & Bassinets', desc: 'Convertible & portable cribs' },
      { slug: 'sleep-sacks', label: 'Sleep Sacks', desc: 'Swaddles & sleep wearables' },
      { slug: 'white-noise', label: 'White Noise', desc: 'Sound machines' },
      { slug: 'baby-bouncers', label: 'Bouncers', desc: 'Infant bouncers & rockers' },
      { slug: 'baby-swings', label: 'Baby Swings', desc: 'Full-size & portable swings' },
      { slug: 'humidifiers', label: 'Humidifiers', desc: 'Baby room humidifiers' },
    ],
  },
  {
    group: 'Travel & Gear',
    emoji: '🚗',
    categories: [
      { slug: 'strollers', label: 'Strollers', desc: 'Travel systems & joggers' },
      { slug: 'car-seats', label: 'Car Seats', desc: 'Infant & convertible seats' },
      { slug: 'baby-carriers', label: 'Baby Carriers', desc: 'Wraps & structured carriers' },
      { slug: 'diaper-bags', label: 'Diaper Bags', desc: 'Stylish & functional bags' },
      { slug: 'diaper-pails', label: 'Diaper Pails', desc: 'Odor-control containers' },
    ],
  },
  {
    group: 'Health & Safety',
    emoji: '🛡️',
    categories: [
      { slug: 'baby-thermometers', label: 'Thermometers', desc: 'Digital & infrared' },
      { slug: 'baby-gates', label: 'Baby Gates', desc: 'Safety gates & barriers' },
      { slug: 'baby-nail-care', label: 'Nail Care', desc: 'Nail clippers & tools' },
      { slug: 'baby-bathtubs', label: 'Baby Tubs', desc: 'Bath tubs & seats' },
    ],
  },
  {
    group: 'Play & Development',
    emoji: '🎨',
    categories: [
      { slug: 'activity-centers', label: 'Activity Centers', desc: 'Jumpers & play gyms' },
      { slug: 'play-mats', label: 'Play Mats', desc: 'Mats & floor gyms' },
      { slug: 'bath-toys', label: 'Bath Toys', desc: 'Water play toys' },
      { slug: 'teething-toys', label: 'Teething Toys', desc: 'Chew toys & rings' },
      { slug: 'baby-loungers', label: 'Baby Loungers', desc: 'Loungers & nests' },
      { slug: 'potty-training', label: 'Potty Training', desc: 'Seats & training aids' },
    ],
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 pt-6 pb-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Products', href: '/products' }]} />
      <Breadcrumb items={[{ name: 'Product Reviews', href: '/products' }]} />
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Baby Product Reviews
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Honest, in-depth reviews of the best baby products — tested and rated by parents,
          for every budget. All 28 categories organized by type.
        </p>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Some links on this page are affiliate links. <Link href="/affiliate-disclosure" className="underline hover:text-brand-600">Learn more</Link>.
        </p>
      </div>

      {/* Grouped categories */}
      <div className="space-y-12">
        {categoryGroups.map((group) => (
          <div key={group.group}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{group.emoji}</span>
              <h2 className="font-serif text-2xl font-bold text-gray-900">{group.group}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-brand-200 transition-all duration-200"
                >
                  <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-brand-600 mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{cat.desc}</p>
                  <div className="flex items-center gap-1 text-brand-600 text-sm font-medium">
                    View Reviews <ChevronRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
