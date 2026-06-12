import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { OvulationCalculator } from './OvulationCalculator';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Ovulation Calculator — Find Your Fertile Window',
  description: 'Calculate your ovulation date and most fertile days. Enter your last period and average cycle length to find the best days to conceive.',
  alternates: { canonical: `${siteConfig.url}/tools/ovulation-calculator` },
};

export default function OvulationCalculatorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Ovulation Calculator', href: '/tools/ovulation-calculator' },
      ]} />
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Ovulation Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Find your most fertile days and best chance to conceive. Enter your cycle details below.
        </p>
      </div>
      <OvulationCalculator />
      <InContentAd />
    </div>
  );
}
