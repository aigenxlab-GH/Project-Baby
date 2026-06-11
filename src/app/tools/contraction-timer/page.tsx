import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ContractionTimer } from './ContractionTimer';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contraction Timer — Track Labor Contractions',
  description: 'Free contraction timer for labor. Track frequency, duration, and intensity. Know when to go to the hospital with the 5-1-1 rule.',
  alternates: { canonical: `${siteConfig.url}/tools/contraction-timer` },
};

export default function ContractionTimerPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Contraction Timer', href: '/tools/contraction-timer' },
      ]} />
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
          Contraction Timer
        </h1>
        <p className="text-gray-600">
          Track your contractions during labor. Know when to call your doctor or head to the hospital.
        </p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-sm text-amber-900">
        <strong>511 Rule:</strong> Call your provider when contractions are{' '}
        <strong>5 minutes apart</strong>, lasting <strong>1 minute each</strong>,
        for at least <strong>1 hour</strong>.
      </div>
      <ContractionTimer />
    </div>
  );
}
