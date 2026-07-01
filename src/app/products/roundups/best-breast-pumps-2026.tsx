'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { Footer } from '@/components/layout/Footer';

interface BreastPump {
  id: string;
  rank: number;
  name: string;
  priceRange: string;
  rating: number;
  reviews: number;
  type: string;
  suction: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  affiliateLink?: string;
}

const pumps: BreastPump[] = [
  {
    id: 'product-1',
    rank: 1,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    type: '[Type: Manual/Electric/Wearable]',
    suction: '[Suction mmHg/Cycles per min]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  {
    id: 'product-2',
    rank: 2,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    type: '[Type: Manual/Electric/Wearable]',
    suction: '[Suction mmHg/Cycles per min]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  {
    id: 'product-3',
    rank: 3,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    type: '[Type: Manual/Electric/Wearable]',
    suction: '[Suction mmHg/Cycles per min]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  {
    id: 'product-4',
    rank: 4,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    type: '[Type: Manual/Electric/Wearable]',
    suction: '[Suction mmHg/Cycles per min]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  {
    id: 'product-5',
    rank: 5,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    type: '[Type: Manual/Electric/Wearable]',
    suction: '[Suction mmHg/Cycles per min]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
];

export default function BestBreastPumps2026() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <HeaderAd />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products">Products</Link>
          <span className="mx-2">/</span>
          <span>Best Breast Pumps 2026</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Breast Pumps 2026: Manual, Electric & Wearable Options
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Whether you're pumping exclusively, combining breast and bottle, or expressing occasionally,
            we've reviewed the best breast pumps for every need—from affordable manual options to premium double electrics.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Manual, electric & wearable</span>
            <span>✓ {pumps.length} top options reviewed</span>
            <span>✓ Updated 2026</span>
          </div>
        </article>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Pump</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Suction/Speed</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {pumps.map((pump) => (
                  <tr key={pump.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-lg">{pump.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{pump.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{pump.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{pump.priceRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{pump.suction}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {pump.rating > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{pump.rating}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">[Rating]</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <InContentAd />

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Pump Reviews</h2>
          <div className="space-y-8">
            {pumps.map((pump) => (
              <div key={pump.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{pump.rank}. {pump.name}</h3>
                    <p className="text-gray-600 mt-1">Type: {pump.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{pump.priceRange}</div>
                    {pump.rating > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{pump.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === pump.id ? null : pump.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === pump.id ? '▼ Hide Details' : '▶ Show Details'}
                </button>
                {expandedProduct === pump.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {pump.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cons:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {pump.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{pump.bestFor}</p>
                    </div>
                    {pump.affiliateLink && (
                      <a
                        href={pump.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                      >
                        Check Price on Amazon
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <ArticleBottomAd />

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Breast Pump Buyer's Guide</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">What to Consider:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Suction strength (measurable in mmHg)</li>
              <li>✓ Single vs. double pumping capability</li>
              <li>✓ Portability for work/travel</li>
              <li>✓ Noise level during pumping</li>
              <li>✓ Flange size compatibility</li>
              <li>✓ Warranty coverage</li>
              <li>✓ Insurance coverage (many are covered at 100%)</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Is my breast pump covered by insurance?', a: '[Answer to be added]' },
              { q: 'What suction strength is right for me?', a: '[Answer to be added]' },
              { q: 'Manual vs. electric pumps: which is better?', a: '[Answer to be added]' },
              { q: 'Can I pump with a wearable pump while doing other tasks?', a: '[Answer to be added]' },
              { q: 'How often should I replace pump parts?', a: '[Answer to be added]' },
              { q: 'Can I use a breast pump immediately after birth?', a: '[Answer to be added]' },
              { q: 'What is the best pumping schedule?', a: '[Answer to be added]' },
              { q: 'Are rental pumps better than buying?', a: '[Answer to be added]' },
              { q: 'Can I use one pump for multiple people?', a: '[Answer to be added]' },
            ].map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <summary className="font-semibold text-gray-900">{faq.q}</summary>
                <p className="text-gray-700 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="text-blue-600 hover:text-blue-800">
                → All Baby Products & Roundups
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                → Breastfeeding Blog Articles
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
