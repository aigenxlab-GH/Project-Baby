import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BabyNamesBrowser } from './BabyNamesBrowser';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Baby Names — Browse 1,188+ Names with Meanings & Origins',
  description: 'Search over 1,100 baby names by gender, origin, meaning, and starting letter. Find the perfect name for your baby girl, boy, or gender-neutral names.',
  alternates: { canonical: `${siteConfig.url}/baby-names` },
};

export default function BabyNamesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Baby Names', href: '/baby-names' }]} />
      <Breadcrumb items={[{ name: 'Baby Names', href: '/baby-names' }]} />
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Baby Names
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse 1,188+ baby names with meanings, origins, and popularity trends.
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
