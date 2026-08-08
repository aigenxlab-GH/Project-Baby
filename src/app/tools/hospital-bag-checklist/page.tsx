import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { HospitalBagChecklist } from './HospitalBagChecklist';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Hospital Bag Checklist 2026 — What to Pack for Labor & Delivery',
  description: 'Complete hospital bag checklist for mom, baby, and your partner. Interactive, printable list covering essentials, postpartum recovery, and documents to bring.',
  alternates: { canonical: `${siteConfig.url}/tools/hospital-bag-checklist` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When should I pack my hospital bag?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most care providers recommend packing your hospital bag by 36 weeks, since labor can start earlier than expected. Keep it somewhere easy to grab — by the front door or in the car — along with your car seat already installed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the hospital provide anything, or do I need to bring everything?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hospitals typically provide basics like mesh underwear, pads, a swaddle blanket, a newborn hat, and diapers for your stay. Bringing your own versions of these is about comfort and preference, not necessity — the truly essential items to bring yourself are ID/insurance paperwork, an installed car seat, and going-home outfits for you and baby.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I really need a car seat before I go to the hospital?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most hospitals will not discharge a newborn without a properly installed rear-facing infant car seat, even if you\'re taking a taxi or rideshare home. Install it in your car and have it checked (many fire stations and hospitals offer free installation checks) before your due date.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should my partner or support person pack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A change of clothes, toiletries, phone charger, snacks, and something to pass the time — labor and hospital stays often run 24-48+ hours, and there can be long waiting periods. A pillow or blanket is worth bringing since not all hospital rooms provide bedding for a support person\'s chair or cot.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is a typical hospital stay after birth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical stay is 1-2 nights after a vaginal delivery and 2-4 nights after a cesarean delivery, though this varies by hospital, country, and individual circumstances. Pack enough for at least 2-3 days to be safe.',
      },
    },
  ],
};

export default function HospitalBagChecklistPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Hospital Bag Checklist', href: '/tools/hospital-bag-checklist' }]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Hospital Bag Checklist', href: '/tools/hospital-bag-checklist' }]} />
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Hospital Bag Checklist
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Everything to pack for you, baby, and your support person — organized so nothing
            gets forgotten in the rush.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full px-4 py-2 text-sm">
            <span>⚠️</span>
            <a href="/affiliate-disclosure" className="underline">Affiliate disclosure</a>
            <span>— we may earn commissions from purchases.</span>
          </div>
        </div>
        <HospitalBagChecklist />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">When to Pack Your Hospital Bag</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Most care providers recommend having your hospital bag ready by 36 weeks. Labor doesn't always follow a due date — some babies arrive weeks early — so it's worth having everything packed and easy to grab well before you think you'll need it.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Keep the bag somewhere accessible, like by the front door or already in the car, and make sure your infant car seat is installed ahead of time. Most hospitals require a properly installed car seat before they'll discharge a newborn.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">What the Hospital Usually Provides</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Most hospitals supply the basics during your stay: mesh underwear, pads, a swaddle blanket, a newborn hat, and diapers. Bringing your own versions is about comfort, not necessity — many parents prefer their own toiletries, a proper pillow, or postpartum underwear that fits better than the hospital-issued mesh.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              What hospitals genuinely can't provide: your ID and insurance paperwork, an installed car seat, and a going-home outfit sized for your baby (newborn sizing varies significantly by birth weight).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Packing for a Multi-Day Stay</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A typical hospital stay runs 1-2 nights after a vaginal delivery and 2-4 nights after a cesarean delivery, though this varies by hospital and individual circumstances. Pack enough toiletries and comfortable clothing for at least 2-3 days.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Labor itself can also take longer than expected, with long stretches of waiting — this is worth keeping in mind when packing entertainment, snacks, and chargers for both you and your support person.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Don't Forget Your Support Person</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              It's easy to pack for yourself and baby and forget the person staying with you. A change of clothes, toiletries, a phone charger, snacks, and cash for vending machines all make a long hospital stay more manageable. Many hospital rooms have a fold-out chair or cot for a support person but don't always provide bedding for it.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Hospital Bag Checklist FAQs</h2>
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
