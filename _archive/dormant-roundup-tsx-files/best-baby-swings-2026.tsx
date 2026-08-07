'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { Footer } from '@/components/layout/Footer';

const swings = Array.from({ length: 5 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  priceRange: '[Price Range]',
  type: '[Type: Full-Size/Portable/Compact]',
  motion: '[Motion types]',
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case]',
}));

export default function BestBabySwings2026() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <HeaderAd />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> <span>/</span> <Link href="/products">Products</Link> <span>/</span> <span>Best Baby Swings</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Baby Swings 2026: Soothe Your Infant
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Find the perfect swing to soothe your baby with gentle motion. Compare full-size, portable, and compact options with multiple swing speeds.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Multiple size options</span>
            <span>✓ {swings.length} reviewed</span>
          </div>
        </article>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Swing</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {swings.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold">{s.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{s.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{s.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{s.priceRange}</td>
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
            {swings.map((s) => (
              <div key={s.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{s.rank}. {s.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{s.priceRange}</div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === s.id ? null : s.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === s.id ? '▼ Hide' : '▶ Show'}
                </button>
                {expandedProduct === s.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700">{s.bestFor}</p>
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
