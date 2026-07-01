'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { Footer } from '@/components/layout/Footer';

const humidifiers = Array.from({ length: 5 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  priceRange: '[Price Range]',
  type: '[Type: Cool/Warm Mist]',
  coverage: '[Room size coverage]',
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case]',
}));

export default function BestHumidifiers2026() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <HeaderAd />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> <span>/</span> <Link href="/products">Products</Link> <span>/</span> <span>Best Humidifiers</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Baby Humidifiers 2026: Moisture & Respiratory Relief
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Keep your baby's room at the right humidity. Compare cool mist and warm mist humidifiers with safety features and ease of cleaning.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Cool & warm mist options</span>
            <span>✓ {humidifiers.length} reviewed</span>
          </div>
        </article>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Humidifier</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {humidifiers.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold">{h.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{h.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{h.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{h.priceRange}</td>
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
            {humidifiers.map((h) => (
              <div key={h.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{h.rank}. {h.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{h.priceRange}</div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === h.id ? null : h.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === h.id ? '▼ Hide' : '▶ Show'}
                </button>
                {expandedProduct === h.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700">{h.bestFor}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <ArticleBottomAd />
      </main>

      <Footer />
    </div>
  );
}
