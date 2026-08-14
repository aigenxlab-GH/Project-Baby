import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BabyNamesBrowser } from './BabyNamesBrowser';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getAllNames } from '@/lib/baby-names';

export const dynamic = 'force-static';

// Derived so the advertised total cannot drift from the data.
const NAME_COUNT = getAllNames().length;
const NAME_COUNT_ROUNDED = Math.floor(NAME_COUNT / 100) * 100;

export const metadata: Metadata = {
  title: `Baby Names — Browse ${NAME_COUNT_ROUNDED.toLocaleString()}+ Names with Meanings & Origins`,
  description: `Search over ${NAME_COUNT_ROUNDED.toLocaleString()} baby names by gender, origin, meaning, and starting letter. Find the perfect name for your baby girl, boy, or gender-neutral names.`,
  alternates: { canonical: `${siteConfig.url}/baby-names` },
};

export default function BabyNamesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 pt-6 pb-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Baby Names', href: '/baby-names' }]} />
      <Breadcrumb items={[{ name: 'Baby Names', href: '/baby-names' }]} />
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Baby Names
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Browse {NAME_COUNT_ROUNDED.toLocaleString()}+ baby names with meanings, origins, and popularity trends.
          Filter by gender, starting letter, or origin to find the perfect name.
        </p>
      </div>
      {/* aria-busy on the Suspense boundary so screen readers announce the loading state */}
      <div role="region" aria-label="Baby names browser" aria-live="polite">
        <Suspense fallback={
          <div
            role="status"
            aria-label="Loading baby names"
            aria-busy="true"
            className="text-center py-12 text-gray-400 animate-pulse"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                  <div className="h-6 bg-gray-100 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        }>
          <BabyNamesBrowser />
        </Suspense>
      </div>
    </div>
  );
}
