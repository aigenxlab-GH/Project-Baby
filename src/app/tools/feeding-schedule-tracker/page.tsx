import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { FeedingScheduleTracker } from './FeedingScheduleTracker';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Baby Feeding Schedule Tracker — By Age, Breastfeeding & Formula',
  description: 'Interactive baby feeding schedule by age — feeds per day, typical intervals, and formula amounts, from newborn through 12+ months. Based on AAP and WHO guidance.',
  alternates: { canonical: `${siteConfig.url}/tools/feeding-schedule-tracker` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often should a newborn eat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Newborns typically feed 8-12 times per day, roughly every 2-3 hours, including overnight. This is normal for both breastfed and formula-fed babies — newborn stomachs are small and milk (breast milk or formula) digests quickly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much formula should my baby drink by age?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As a general guide: 1-3 oz per feed in the first two weeks, gradually increasing to 4-6 oz by 2-4 months, and 6-8 oz per feed from around 4-6 months onward. These are general ranges — total daily intake and your baby\'s growth are better indicators than any single feed.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I start introducing solid foods?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most babies show readiness for solids around 4-6 months, indicated by good head control, sitting with support, and interest in food. The AAP and WHO recommend exclusive milk feeding (breast milk or formula) for about the first 6 months, with solids introduced gradually alongside continued milk feeding, not as a replacement for it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it normal for feeding patterns to change suddenly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Growth spurts — common around 3 weeks, 6 weeks, 3 months, and 6 months — can temporarily increase how often your baby wants to feed. This is normal and usually settles back to the typical pattern within a few days.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should I continue breastfeeding or formula feeding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The WHO and AAP recommend exclusive breastfeeding for about 6 months, followed by continued breastfeeding alongside solid foods for up to 2 years or longer if both mother and baby wish to continue. Formula-fed babies typically transition to whole milk around 12 months, on a pediatrician\'s guidance.',
      },
    },
  ],
};

export default function FeedingScheduleTrackerPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Feeding Schedule Tracker', href: '/tools/feeding-schedule-tracker' }]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Feeding Schedule Tracker', href: '/tools/feeding-schedule-tracker' }]} />
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Baby Feeding Schedule Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            See typical feeding frequency and amounts by age — for breastfeeding, formula, and
            introducing solids.
          </p>
        </div>
        <FeedingScheduleTracker />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Feeding Schedules Change So Much in the First Year</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A newborn's stomach holds only about a teaspoon at birth, growing to roughly the size of a large egg by one month. That's why feeding starts frequent and gradually spaces out — babies simply can't hold much at once early on, and both frequency and volume shift steadily as they grow.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These changes aren't a strict timeline every baby follows exactly. They're general patterns based on AAP and WHO guidance, useful for knowing what's typical and when to check in with your pediatrician if something feels off.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Breastfeeding vs. Formula: Different Ways to Track Progress</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Formula feeding is easier to measure in exact ounces, since you control what goes into the bottle. Breastfeeding is harder to quantify by volume — most guidance instead focuses on frequency, feeding duration, and indirect signs of adequate intake like wet/dirty diaper counts and steady weight gain.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you're combination feeding (breast and formula), total daily intake matters more than any single feed's source or amount.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">When to Talk to Your Pediatrician</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Contact your pediatrician if your baby consistently refuses feeds, shows signs of dehydration (fewer wet diapers than expected, lethargy), isn't gaining weight as expected at checkups, or if you have any concerns about feeding — these general ranges are a starting reference, not a diagnostic tool.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Feeding Schedule FAQs</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
