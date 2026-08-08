import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { GrowthPercentileCalculator } from './GrowthPercentileCalculator';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';
import { SourceCitations, type Citation } from '@/components/shared/SourceCitations';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Baby Growth Percentile Calculator — Weight & Length by Age (0-24 Months)',
  description: 'Estimate your baby\'s weight and length percentile by age, based on WHO growth reference medians. Educational estimate only — not a substitute for your pediatrician\'s growth chart.',
  alternates: { canonical: `${siteConfig.url}/tools/growth-percentile-calculator` },
};

const GROWTH_CITATIONS: Citation[] = [
  {
    organisation: 'WHO',
    title: 'WHO Child Growth Standards',
    url: 'https://www.who.int/tools/child-growth-standards',
    year: 2024,
  },
  {
    organisation: 'CDC',
    title: 'Growth Charts — Clinical Growth Charts',
    url: 'https://www.cdc.gov/growthcharts/clinical_charts.htm',
    year: 2024,
  },
  {
    organisation: 'AAP',
    title: 'How to Read a Growth Chart',
    url: 'https://www.healthychildren.org/English/health-issues/conditions/Growth/Pages/How-to-Read-a-Growth-Chart-Understanding-Percentiles.aspx',
    year: 2023,
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a growth percentile actually mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A percentile compares your baby to a reference population of babies the same age and sex. For example, a baby at the 60th percentile for weight is heavier than about 60% of babies that age, and lighter than about 40%. It is a comparison, not a grade — there is no "best" percentile to be at.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a low or high percentile a problem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Healthy babies grow along a wide range of percentile lines — a baby consistently tracking at the 10th percentile can be just as healthy as one at the 90th. Pediatricians generally pay closer attention to significant, sudden changes in a baby\'s own growth trend over time than to the specific percentile number itself.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why might this calculator give a different result than my pediatrician\'s chart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool uses simplified reference medians and an approximate statistical method for general educational purposes. Official growth charts use the WHO or CDC\'s exact statistical model (which accounts for skew in the data), calculated from your baby\'s precise measurements. For an accurate, clinically-tracked percentile, use the chart your pediatrician plots at checkups.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use WHO or CDC growth charts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The CDC recommends using WHO growth standards for infants and children from birth to 2 years, and CDC growth charts from age 2 onward. WHO standards are based on breastfed infants as the growth norm; CDC charts are based on a broader US reference population.',
      },
    },
  ],
};

export default function GrowthPercentileCalculatorPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Growth Percentile Calculator', href: '/tools/growth-percentile-calculator' }]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Growth Percentile Calculator', href: '/tools/growth-percentile-calculator' }]} />
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Baby Growth Percentile Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Estimate your baby's weight and length percentile for ages 0-24 months, based on WHO
            growth reference medians.
          </p>
        </div>
        <GrowthPercentileCalculator />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Growth Percentiles</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A growth percentile compares your baby's measurement (weight, length, or head circumference) against a reference population of babies the same age and sex. It's a comparison tool, not a health score — there's no universally "good" percentile to aim for.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              What matters more than any single percentile is your baby's own growth trend over multiple checkups. A baby who consistently tracks near the 20th percentile is generally considered to be growing just as healthily as one tracking near the 80th — consistency along a baby's own curve is the key signal pediatricians look for.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">WHO vs. CDC Growth Charts</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The CDC recommends pediatricians use WHO growth standards for children from birth to 24 months, then switch to CDC growth charts from age 2 onward. The WHO standards describe how children grow under optimal conditions (based on breastfed infants across multiple countries); CDC charts describe how a US reference population has actually grown, which includes a broader mix of feeding methods.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This calculator uses simplified WHO reference medians for the 0-24 month range.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Why This Tool Is an Estimate, Not a Diagnosis</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Official growth charts use a statistical method that accounts for the natural skew in how weight and length are distributed at each age — a more precise calculation than the simplified approximation used here. This tool is meant to give you a general sense of where a measurement falls, for educational purposes. For an accurate, clinically-tracked percentile plotted against your baby's own growth history, rely on the chart your pediatrician keeps at checkups.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Growth Percentile FAQs</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <SourceCitations citations={GROWTH_CITATIONS} />
      </div>
    </div>
  );
}
