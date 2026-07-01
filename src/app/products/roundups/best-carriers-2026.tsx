import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';
import { ChevronRight, Star } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Best Baby Carriers 2026 — Top Picks for Newborns to Toddlers',
  description: 'Compare the best baby carriers and wraps of 2026: structured carriers, soft wraps, and slings. Find the perfect carrier for comfort, ease of use, and safety.',
  alternates: { canonical: `${siteConfig.url}/products/roundups/best-carriers-2026` },
};

const carriers = [
  {
    rank: 1,
    name: 'Ergobaby Omni 360',
    priceRange: '$150-180',
    type: 'Structured Carrier',
    rating: 4.8,
    pros: [
      'Works from newborn (no insert needed after 4 months)',
      'Multiple carrying positions (front, back, hip)',
      'Exceptional ergonomics and weight distribution',
      'Excellent back support for parent',
      'Adjustable waist and shoulder straps'
    ],
    cons: [
      'Premium price point',
      'Bulkier than soft wraps',
      'Requires practice to master all positions'
    ],
    bestFor: 'Parents wanting versatility and comfort for extended wear',
    affiliate: 'https://amazon.com/Ergobaby-Omni-360-Baby-Carrier/dp/B0156M6KJ2'
  },
  {
    rank: 2,
    name: 'Lillebaby COMPLETE All Seasons Carrier',
    priceRange: '$120-150',
    type: 'Structured Carrier',
    rating: 4.7,
    pros: [
      'Multiple carrying positions including back carry',
      'Works from newborn with optional infant insert',
      'Great weight distribution and back support',
      'Less bulky than some competitors',
      'Good value for features'
    ],
    cons: [
      'Infant insert sold separately for newborns',
      'Buckles can be fiddly at first',
      'Doesn\'t pack as small as wraps'
    ],
    bestFor: 'Active parents wanting multiple carrying positions',
    affiliate: 'https://amazon.com/Lillebaby-Complete-All-Seasons-Baby-Carrier/dp/B00O5LNQFQ'
  },
  {
    rank: 3,
    name: 'Solly Wrap (Soft Wrap)',
    priceRange: '$45-60',
    type: 'Soft Wrap',
    rating: 4.6,
    pros: [
      'Affordable and lightweight',
      'Excellent for newborns (close to parent)',
      'Hands-free and intimate carrying',
      'Great for skin-to-skin bonding',
      'Works for all ages from newborn to toddler'
    ],
    cons: [
      'Steep learning curve for tying',
      'Not ideal for extended toddler wear',
      'Requires practice to tie securely',
      'Can be intimidating for new parents'
    ],
    bestFor: 'Bonding-focused parents comfortable with wrapping techniques',
    affiliate: 'https://amazon.com/Solly-Wrap-Baby-Wrap-Carrier/dp/B004R9AB8A'
  },
  {
    rank: 4,
    name: 'Baby K\'tan (Size-Specific Wrap)',
    priceRange: '$30-45',
    type: 'Pre-sized Wrap',
    rating: 4.3,
    pros: [
      'Super affordable entry to babywearing',
      'No tying required (pre-sized)',
      'Perfect for newborns and young babies',
      'Lightweight and portable',
      'Great backup carrier'
    ],
    cons: [
      'Only works for one position',
      'Size-specific (need to buy new as baby grows)',
      'Limited use duration (rough for older toddlers)',
      'Less versatile than other options'
    ],
    bestFor: 'Budget-conscious parents wanting simple wrap solution',
    affiliate: 'https://amazon.com/Baby-Wrap-Carrier-Hands-Free-Newborn/dp/B003IRCQQ6'
  },
  {
    rank: 5,
    name: 'LennyLamb Ring Sling',
    priceRange: '$40-70',
    type: 'Ring Sling',
    rating: 4.5,
    pros: [
      'Compact and lightweight',
      'Affordable compared to structured carriers',
      'Great for toddler wearing',
      'Easier to learn than wraps',
      'Hip carry is very comfortable'
    ],
    cons: [
      'Learning curve for fit and safety',
      'Not ideal for extended weight on one shoulder',
      'Requires babywearing education',
      'Less intuitive than structured carriers'
    ],
    bestFor: 'Experienced parents wanting lightweight, portable option',
    affiliate: 'https://amazon.com/LennyLamb-Ring-Sling-Baby-Carrier/dp/B00AOLKZWU'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the safest baby carrier for newborns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The safest carriers follow the "TUMMY TO MUMMY" rule: baby\'s airway clear, chin off chest, back supported, and proper seat width. Ergobaby and Lillebaby are excellent options. Avoid carriers with a curled C-position spine or where baby\'s face is covered.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is babywearing bad for baby\'s hips?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Proper babywearing actually supports healthy hip development. Look for carriers with M-position seating (baby\'s legs form an M shape with knees higher than hips). Ergobaby and Lillebaby are specifically designed for this.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long can I wear my baby in a carrier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most parents can comfortably wear babies 1-2 hours continuously. Beyond that, take breaks to give your back rest. Duration depends on carrier quality, your fitness, and baby\'s weight. Structured carriers with good support allow longer wear than soft wraps.'
      }
    },
    {
      '@type': 'Question',
      name: 'When can baby use a carrier without an insert?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once baby is around 4 months (not a hard rule—check weight and head control), most carriers work without newborn inserts. Some carriers like Ergobaby Omni 360 don\'t need inserts at all, while Lillebaby requires one for very young newborns.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between a wrap and a structured carrier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wraps are fabric you tie and are lightweight, affordable, great for bonding. Structured carriers have buckles/zips and are easier to learn, faster to put on, better for longer wear. Wraps excel for newborns; structured carriers excel for active, on-the-go parents.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I babywear while pregnant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but it becomes uncomfortable as your belly grows. Most parents switch to strollers in the third trimester. Soft wraps are easier than structured carriers while pregnant because they distribute weight differently.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is back carrying safe for young babies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Back carrying is safe once baby has strong head and neck control (around 4-5 months). Before that, stick to front carries. Ensure proper seat width (wide enough for thigh support) to protect baby\'s hips.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I know if baby is too hot in a carrier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check baby\'s back of neck (not hands/feet, which are always cooler). If neck is sweaty or hot, remove a layer or take a break. Babywearing generates shared body heat, so dress baby one layer lighter than usual.'
      }
    }
  ]
};

export default function BestCarriers2026() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Best Carriers 2026', href: '/products/roundups/best-carriers-2026' }
      ]} />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Breadcrumb items={[
          { name: 'Products', href: '/products' },
          { name: 'Best Carriers 2026', href: '/products/roundups/best-carriers-2026' }
        ]} />

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Best Baby Carriers 2026
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Hands-free parenting. Compare structured carriers, soft wraps, and slings that keep your baby close while freeing your hands for life.
          </p>
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-950/40 text-pink-800 dark:text-pink-300 rounded-full px-4 py-2 text-sm">
            <span>👶</span>
            <span>Safe babywearing creates bonding and lets you stay active.</span>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-semibold">Carrier</th>
                  <th className="text-left py-3 px-2 font-semibold">Type</th>
                  <th className="text-left py-3 px-2 font-semibold">Price</th>
                  <th className="text-left py-3 px-2 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {carriers.map((carrier) => (
                  <tr key={carrier.rank} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{carrier.name}</td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{carrier.type}</td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{carrier.priceRange}</td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300 text-xs">{carrier.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-8">Detailed Reviews</h2>
          <div className="space-y-10">
            {carriers.map((carrier) => (
              <div key={carrier.rank} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">{carrier.rank}. {carrier.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{carrier.type} • {carrier.priceRange}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/40 px-3 py-2 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{carrier.rating}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">✅ Pros</h4>
                    <ul className="space-y-2">
                      {carrier.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">❌ Cons</h4>
                    <ul className="space-y-2">
                      {carrier.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-purple-50 dark:bg-purple-950/40 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">👤 Best For: {carrier.bestFor}</p>
                </div>

                <a
                  href={carrier.affiliate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg"
                >
                  Check Price
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <InContentAd />

        {/* Types of Carriers */}
        <section className="mb-12 bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Types of Baby Carriers Explained</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Structured Carriers (Soft Frame)</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Buckles and zips. Best for: Quick on/off, extended wear, multiple positions. Learning curve: Low. Price: $120-200. Examples: Ergobaby, Lillebaby.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Soft Wraps (Woven or Stretchy)</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Long fabric you tie. Best for: Newborns, bonding, minimal bulk. Learning curve: High. Price: $40-100. Examples: Solly, Artipoppe.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ring Slings</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                One-shoulder carry with rings. Best for: Toddlers, portability, easy adjusting. Learning curve: Moderate. Price: $40-70. Examples: LennyLamb, Wildbird.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pre-Sized Wraps</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                No-tie wraps in sizes. Best for: Beginners, simplicity, affordability. Learning curve: None. Price: $30-50. Examples: Baby K\'tan, Solly Lite.
              </p>
            </div>
          </div>
        </section>

        {/* Babywearing Safety */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Safe Babywearing Rules</h2>
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-6">
            <p className="font-semibold text-red-900 dark:text-red-200 mb-4">Remember: TUMMY TO MUMMY</p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li>✓ <strong>Chin off chest:</strong> Baby\'s face visible, airway clear</li>
              <li>✓ <strong>Back supported:</strong> Full back support, not just neck</li>
              <li>✓ <strong>Appropriate seat width:</strong> Baby\'s legs form M-shape, knees higher than hips</li>
              <li>✓ <strong>No cover on face:</strong> Always see baby\'s face clearly</li>
              <li>✓ <strong>Regular breathing:</strong> Watch baby\'s chest rise/fall</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item: any) => (
              <details key={item.name} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                  {item.name}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-center text-white">
          <h2 className="font-serif text-2xl font-bold mb-3">Start Babywearing Today</h2>
          <p className="mb-6 text-pink-100">Choose your carrier above, or read our detailed reviews to find the perfect fit for your family.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50">
            Browse All Products <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
