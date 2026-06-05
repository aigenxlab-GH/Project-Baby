import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { RegistryChecklist } from './RegistryChecklist';

export const metadata: Metadata = {
  title: 'Baby Registry Checklist — Everything You Need for Your Newborn',
  description: 'Complete baby registry checklist with 30+ essential items. Categorized by nursery, feeding, travel, clothing, and health. With affiliate links to the best products.',
  alternates: { canonical: `${siteConfig.url}/tools/registry-checklist` },
};

export default function RegistryChecklistPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
          Baby Registry Checklist
        </h1>
        <p className="text-gray-600 text-lg">
          Everything you need for your new baby — organized by category with estimated
          prices and product recommendations.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 text-amber-800 rounded-full px-4 py-2 text-sm">
          <span>⚠️</span>
          <a href="/affiliate-disclosure" className="underline">Affiliate disclosure</a>
          <span>— we may earn commissions from purchases.</span>
        </div>
      </div>
      <RegistryChecklist />
    </div>
  );
}
