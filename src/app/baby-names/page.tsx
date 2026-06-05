import { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BabyNamesBrowser } from './BabyNamesBrowser';

export const metadata: Metadata = {
  title: 'Baby Names — Browse 1,188+ Names with Meanings & Origins',
  description: 'Search over 1,100 baby names by gender, origin, meaning, and starting letter. Find the perfect name for your baby girl, boy, or gender-neutral names.',
  alternates: { canonical: `${siteConfig.url}/baby-names` },
};

export default function BabyNamesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Baby Names
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse 1,188+ baby names with meanings, origins, and popularity trends.
          Filter by gender, starting letter, or origin to find the perfect name.
        </p>
      </div>
      <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading names…</div>}>
        <BabyNamesBrowser />
      </Suspense>
    </div>
  );
}
