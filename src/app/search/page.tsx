import type { Metadata } from 'next';
import { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import { SearchResults } from './SearchResults';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Search — PregnancySprout',
  description: 'Search pregnancy guides, baby names, product reviews, and parenting tips on PregnancySprout.',
  alternates: { canonical: `${siteConfig.url}/search` },
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Search', href: '/search' }]} />
      <Breadcrumb items={[{ name: 'Search', href: '/search' }]} />
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Search</h1>
      <p className="text-gray-500 text-sm mb-8">Find pregnancy guides, baby names, product reviews, and more.</p>
      <Suspense fallback={<div className="text-gray-400 text-sm">Loading…</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
