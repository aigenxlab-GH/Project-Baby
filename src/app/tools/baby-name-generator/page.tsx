import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BabyNameGenerator } from './BabyNameGenerator';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Baby Name Generator — Find the Perfect Name',
  description: 'Generate beautiful baby name ideas instantly. Filter by gender, origin, starting letter, and number of syllables. Save your favorites.',
  alternates: { canonical: `${siteConfig.url}/tools/baby-name-generator` },
};

export default function BabyNameGeneratorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Baby Name Generator', href: '/tools/baby-name-generator' }]} />
      <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Baby Name Generator', href: '/tools/baby-name-generator' }]} />
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">Baby Name Generator</h1>
        <p className="text-gray-600 text-lg">
          Filter by gender, origin, starting letter, and more to discover the perfect name for your baby.
        </p>
      </div>
      <BabyNameGenerator />
    </div>
  );
}
