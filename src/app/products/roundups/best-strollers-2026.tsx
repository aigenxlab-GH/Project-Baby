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
  title: 'Best Baby Strollers 2026 — Top Picks for Every Budget & Lifestyle',
  description: 'Compare the best baby strollers of 2026: travel systems, joggers, lightweight strollers. Find the perfect stroller for your family with our expert reviews, pros & cons, and buyer\'s guide.',
  alternates: { canonical: `${siteConfig.url}/products/roundups/best-strollers-2026` },
};

const strollers = [
  {
    rank: 1,
    name: 'UPPAbaby Vista V2',
    priceRange: 'Premium ($850-1,000)',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=75&auto=format&fit=crop',
    rating: 4.8,
    pros: [
      'Premium build quality with excellent suspension',
      'Expands to fit 2+ children (bassinet + toddler seat)',
      'Smooth handling on all terrain types',
      'Excellent storage basket for daily essentials',
      'Multiple recline positions for sleeping'
    ],
    cons: [
      'Premium price point ($850+)',
      'Slightly heavier than lightweight strollers',
      'Learning curve for conversions'
    ],
    bestFor: 'Parents seeking long-term durability and expandability',
    affiliate: 'https://amazon.com/UPPAbaby-Reversible-Toddler-Seat-Included/dp/B08KH1FSYP'
  },
  {
    rank: 2,
    name: 'Graco Modes Pramette Travel System',
    priceRange: 'Budget ($300-400)',
    image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=600&q=75&auto=format&fit=crop',
    rating: 4.5,
    pros: [
      'Affordable all-in-one solution (car seat + stroller)',
      'Easy one-hand fold for quick storage',
      'Multiple recline and seat positions',
      'Good storage capacity',
      'Compatible with most car seats'
    ],
    cons: [
      'Slightly bulky when folded',
      'Wheels less smooth on uneven surfaces',
      'Lower premium feel vs. luxury brands'
    ],
    bestFor: 'Budget-conscious parents wanting a complete system',
    affiliate: 'https://amazon.com/Graco-Modes-Pramette-Travel-System/dp/B07V5V1MFZ'
  },
  {
    rank: 3,
    name: 'Chicco Bravo Trio Travel System',
    priceRange: 'Mid-Range ($500-650)',
    image: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=600&q=75&auto=format&fit=crop',
    rating: 4.6,
    pros: [
      'Very easy one-hand fold and open',
      'Lightweight but sturdy construction',
      'Excellent maneuverability in tight spaces',
      'Good safety ratings',
      'Reasonable price-to-quality ratio'
    ],
    cons: [
      'Storage basket smaller than competitors',
      'Not ideal for jogging or uneven terrain',
      'Can feel cramped for larger toddlers'
    ],
    bestFor: 'City parents needing easy transport and maneuverability',
    affiliate: 'https://amazon.com/Chicco-Bravo-Trio-Travel-System/dp/B08L4TYKJK'
  },
  {
    rank: 4,
    name: 'BOB Gear Jogging Stroller',
    priceRange: 'Premium ($600-750)',
    image: 'https://images.unsplash.com/photo-1516214104703-3e8191c5e9f9?w=600&q=75&auto=format&fit=crop',
    rating: 4.7,
    pros: [
      'Purpose-built for running and trails',
      'Excellent suspension system',
      'Very maneuverable with lockable front wheel',
      'Lightweight for premium quality',
      'Durable fabric and components'
    ],
    cons: [
      'Not ideal for general shopping (smaller basket)',
      'Premium price for specialized use',
      'Requires two hands for most operations'
    ],
    bestFor: 'Active parents who jog or hike regularly',
    affiliate: 'https://amazon.com/BOB-Gear-Jogging-Stroller-Durable/dp/B07TTXQPZK'
  },
  {
    rank: 5,
    name: 'Baby Jogger City Mini GT2',
    priceRange: 'Mid-Premium ($400-500)',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=75&auto=format&fit=crop',
    rating: 4.5,
    pros: [
      'Lightweight and highly maneuverable',
      'Great for travel and urban environments',
      'Excellent wheel suspension',
      'Good balance of features and price',
      'Compact fold for car storage'
    ],
    cons: [
      'Smaller canopy coverage',
      'Storage basket smaller than full-size strollers',
      'Can feel cramped for tall toddlers'
    ],
    bestFor: 'Travel-focused parents needing compact design',
    affiliate: 'https://amazon.com/Baby-Jogger-City-Mini-Stroller/dp/B08B5XJRYZ'
  }
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best stroller for a newborn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For newborns, look for strollers with fully reclinable seats or ones compatible with infant car seats (travel systems). The UPPAbaby Vista V2 and Graco Modes offer excellent newborn support. Ensure the stroller has good suspension and can fully flatten for napping.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much should I spend on a stroller?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Budget options ($300-400) like the Graco Modes offer good value. Mid-range ($400-650) provides better features. Premium ($700+) offers durability if you plan multiple children. Most families are satisfied with $400-600 strollers that balance quality and cost.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I buy a travel system or separate stroller and car seat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Travel systems are convenient and often cheaper initially. However, if you prefer different brands for each component, buying separately gives you flexibility. Travel systems work well if you frequently move baby between car and stroller while sleeping.'
      }
    },
    {
      '@type': 'Question',
      name: 'What features matter most in a stroller?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key features include: one-hand fold, smooth wheels for your terrain, adequate storage, recline positions, sun canopy, and weight. For frequent travelers, lightweight matters more. For urban parents, maneuverability is critical. For families with multiple kids, expandability matters.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are lightweight strollers worth the extra cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lightweight strollers (6-10 lbs) are worth it if you travel frequently, use public transit, or have multiple children to handle. For parents with cars who rarely fold the stroller, standard-weight options (12-15 lbs) offer better features at lower cost.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long will a stroller last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most strollers remain usable until age 4-5. Premium strollers like UPPAbaby are built for 2+ children and can last 8+ years. Budget strollers typically last 3-4 years before wear. Consider resale value if you plan to sell later.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I buy a jogging stroller if I exercise occasionally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jogging strollers are worth it only if you run/jog regularly (2+ times weekly). For occasional exercise, a standard stroller works fine. Jogging strollers are more expensive and bulkier for daily use.'
      }
    },
    {
      '@type': 'Question',
      name: 'What terrain should I consider when choosing a stroller?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smooth city streets: lightweight strollers work fine. Uneven sidewalks or parks: choose strollers with larger wheels and better suspension. Trails or running: invest in a jogging stroller with locking front wheel. Consider your daily environment.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are expensive strollers worth the investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Premium strollers ($800+) are worth it if you plan multiple children, want long-term durability (8+ years), or use it heavily daily. For one child or occasional use, mid-range strollers ($400-600) offer excellent value with 95% of the features.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I buy a stroller during pregnancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Buy a stroller by month 7-8 of pregnancy. This gives you time to research, read reviews, test in stores, and ensure delivery before baby arrives. Don\'t buy too early (6+ months in advance) as new models release frequently.'
      }
    }
  ]
};

export default function BestStrollers2026() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Best Strollers 2026', href: '/products/roundups/best-strollers-2026' }
      ]} />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Breadcrumb items={[
          { name: 'Products', href: '/products' },
          { name: 'Best Strollers 2026', href: '/products/roundups/best-strollers-2026' }
        ]} />

        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Best Baby Strollers 2026
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Find the perfect stroller for your family. Compare top models for every budget, lifestyle, and terrain — from premium expandable systems to lightweight travel strollers.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 rounded-full px-4 py-2 text-sm">
            <span>🛒</span>
            <span>Affiliate links help support our site. We only recommend products we'd buy for our own families.</span>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Stroller</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Price</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Best For</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody>
                {strollers.map((stroller) => (
                  <tr key={stroller.rank} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-2 text-gray-900 dark:text-white font-medium">{stroller.name}</td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{stroller.priceRange}</td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300 text-xs">{stroller.bestFor}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-700 dark:text-gray-300">{stroller.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Reviews */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-8">Best Strollers Reviewed</h2>
          <div className="space-y-10">
            {strollers.map((stroller) => (
              <div key={stroller.rank} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6 p-6">
                  <div className="md:col-span-1">
                    <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img src={stroller.image} alt={stroller.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">{stroller.rank}. {stroller.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stroller.priceRange}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950/40 px-3 py-2 rounded-lg">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">{stroller.rating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">✅ Pros</h4>
                      <ul className="space-y-1">
                        {stroller.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">• {pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">❌ Cons</h4>
                      <ul className="space-y-1">
                        {stroller.cons.map((con, i) => (
                          <li key={i} className="text-sm text-gray-700 dark:text-gray-300">• {con}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950/40 rounded-lg p-3 mb-4">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-200 text-sm">👤 Best For</h4>
                      <p className="text-purple-800 dark:text-purple-300 text-sm mt-1">{stroller.bestFor}</p>
                    </div>

                    <a
                      href={stroller.affiliate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Check Price on Amazon
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InContentAd />

        {/* Why Choose the Right Stroller */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Why the Right Stroller Matters</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              A stroller isn't just a convenience—it's one of the biggest investments you'll make for your baby's first years. The right stroller adapts to your lifestyle, grows with your family, and impacts your daily quality of life. A poor choice can leave you frustrated with a stroller that's too heavy, too bulky, or simply doesn't match how you actually live.
            </p>
            <p>
              Consider your lifestyle honestly: Do you use public transit daily? Are you an outdoor enthusiast? Do you plan more children? Will you travel frequently? Your answers determine which features matter most and which price point makes sense.
            </p>
            <p>
              Quality strollers hold their resale value (50-70% of original cost), so a $600 stroller resold for $300 actually costs $300. Budget strollers often resell for 20-30%, making the true cost closer to the original price. When you factor in resale value, premium strollers become more affordable than they first appear.
            </p>
          </div>
        </section>

        {/* Buyer's Guide */}
        <section className="mb-12 bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Stroller Buyer's Guide</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">1. Choose by Your Primary Use</h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p><strong>City Parent (Flat sidewalks, frequent transit):</strong> Lightweight, compact fold, smooth wheels. Example: Baby Jogger City Mini.</p>
                <p><strong>Suburban Parent (Car-dependent, varied terrain):</strong> Larger wheels, good suspension, spacious basket. Example: UPPAbaby Vista.</p>
                <p><strong>Active Parent (Running, hiking, trails):</strong> Jogging stroller, lockable front wheel, excellent suspension. Example: BOB Gear.</p>
                <p><strong>Budget-Conscious Parent:</strong> Travel system (car seat + stroller bundle), good value. Example: Graco Modes.</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">2. Key Features to Compare</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ <strong>Fold mechanism:</strong> One-hand vs. two-handed (matters if you carry baby)</li>
                <li>✓ <strong>Weight:</strong> Under 10 lbs = lightweight, 12-15 lbs = standard, 18+ lbs = full-size</li>
                <li>✓ <strong>Recline:</strong> Full flat for newborns, multiple positions for growing toddlers</li>
                <li>✓ <strong>Wheels:</strong> Swivel front for maneuverability, lockable for jogging</li>
                <li>✓ <strong>Canopy:</strong> UPF protection, ventilation, coverage</li>
                <li>✓ <strong>Storage:</strong> Basket size matters with multiple children or long outings</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">3. Budget Breakdown</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>$200-400 (Budget):</strong> Basic functionality, lighter weight, good for single-child families</p>
                <p><strong>$400-700 (Mid-Range):</strong> Better build quality, more features, good balance of value</p>
                <p><strong>$700+ (Premium):</strong> Durability for multiple children, expandability, premium materials</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">4. Terrain Considerations</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>Smooth concrete sidewalks: Standard wheel size (6-8 inches) works fine</p>
                <p>Uneven streets or light trails: Larger wheels (10-12 inches) and suspension help</p>
                <p>Off-road/jogging: Specialized jogging stroller with locking front wheel</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Stroller Mistakes to Avoid</h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>❌ <strong>Buying before thinking about your lifestyle:</strong> A jogging stroller is useless if you don't run. A full-size stroller is frustrating on the subway. Match the stroller to how you actually live.</p>
            <p>❌ <strong>Prioritizing newborn fit over toddler fit:</strong> You'll use the stroller for 4-5 years. Make sure the seat is comfortable for a 3-year-old, not just a newborn.</p>
            <p>❌ <strong>Ignoring weight if you carry it:</strong> A 20-lb stroller is brutal if you frequently lift it in/out of a car or up stairs. Consider your physical capability.</p>
            <p>❌ <strong>Skipping the test fold:</strong> Fold the stroller in the store. If you can't figure it out comfortably, you won't use the feature later.</p>
            <p>❌ <strong>Choosing on looks alone:</strong> Trendy aesthetics matter less than function. Buy a stroller that works for your life, not just Instagram photos.</p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => (
              <details key={item.name} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                  {item.name}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="font-serif text-2xl font-bold mb-3">Ready to Choose Your Stroller?</h2>
          <p className="mb-6 text-blue-100">Use our comparison table and guide to narrow down to 2-3 top choices, then read the full reviews above. Visit a store to test the fold and feel the weight before buying.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Browse All Products
            </Link>
            <Link href="/tools/registry-checklist" className="px-6 py-3 bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg transition-colors border border-blue-400">
              View Baby Registry Checklist
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
