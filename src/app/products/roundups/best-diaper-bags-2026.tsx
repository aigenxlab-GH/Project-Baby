'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeaderAd from '@/components/ads/HeaderAd';
import InContentAd from '@/components/ads/InContentAd';
import ArticleBottomAd from '@/components/ads/ArticleBottomAd';
import Footer from '@/components/Footer';

const bags = Array.from({ length: 5 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  priceRange: '[Price Range]',
  type: '[Type: Backpack/Tote/Messenger]',
  capacity: '[Size/Compartments]',
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case]',
}));

export default function BestDiaperBags2026() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <HeaderAd />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link> <span>/</span> <Link href="/products">Products</Link> <span>/</span> <span>Best Diaper Bags</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Diaper Bags 2026: Style, Function & Organization
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Stylish diaper bags that don't look like traditional baby gear. Compare backpacks, totes, and messenger styles for parents on the go.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Backpacks, totes & messengers</span>
            <span>✓ {bags.length} options reviewed</span>
          </div>
        </article>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bag</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {bags.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold">{b.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{b.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{b.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{b.priceRange}</td>
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
            {bags.map((b) => (
              <div key={b.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{b.rank}. {b.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{b.priceRange}</div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === b.id ? null : b.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === b.id ? '▼ Hide' : '▶ Show'}
                </button>
                {expandedProduct === b.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{b.bestFor}</p>
                    </div>
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
