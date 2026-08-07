'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { Footer } from '@/components/layout/Footer';

interface HighChair {
  id: string;
  rank: number;
  name: string;
  priceRange: string;
  rating: number;
  reviews: number;
  type: string;
  material: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  affiliateLink?: string;
}

const chairs: HighChair[] = Array.from({ length: 5 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  priceRange: '[Price Range]',
  rating: 0,
  reviews: 0,
  type: '[Type: Wooden/Metal/Plastic]',
  material: '[Material description]',
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case description]',
}));

export default function BestHighChairs2026() {
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
          <span>Best High Chairs 2026</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best High Chairs 2026: Safety, Cleaning & Value
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Find the perfect high chair for your baby's feeding journey. Compare materials, ease of cleaning,
            safety features, and design across our top 5 picks for 2026.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Modern & minimalist designs</span>
            <span>✓ {chairs.length} best picks reviewed</span>
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
                  <th className="border border-gray-300 px-4 py-2 text-left">High Chair</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Material</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {chairs.map((chair) => (
                  <tr key={chair.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-lg">{chair.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{chair.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{chair.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{chair.priceRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{chair.material}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {chair.rating > 0 ? (
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Reviews</h2>
          <div className="space-y-8">
            {chairs.map((chair) => (
              <div key={chair.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{chair.rank}. {chair.name}</h3>
                    <p className="text-gray-600 mt-1">{chair.type}</p>
                  </div>
                  <div className="text-right text-2xl font-bold text-gray-900">{chair.priceRange}</div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === chair.id ? null : chair.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === chair.id ? '▼ Hide Details' : '▶ Show Details'}
                </button>
                {expandedProduct === chair.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {chair.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cons:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {chair.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{chair.bestFor}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <ArticleBottomAd />

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
          <div className="space-y-4">
            {[
              { q: 'When can babies use a high chair?', a: '[Answer to be added]' },
              { q: 'What features make cleaning easier?', a: '[Answer to be added]' },
              { q: 'Are wooden or plastic high chairs better?', a: '[Answer to be added]' },
              { q: 'Do I need a high chair with wheels?', a: '[Answer to be added]' },
              { q: 'What safety features are essential?', a: '[Answer to be added]' },
            ].map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <summary className="font-semibold text-gray-900">{faq.q}</summary>
                <p className="text-gray-700 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
