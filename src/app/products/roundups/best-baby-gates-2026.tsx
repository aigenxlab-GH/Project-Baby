'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import HeaderAd from '@/components/ads/HeaderAd';
import InContentAd from '@/components/ads/InContentAd';
import ArticleBottomAd from '@/components/ads/ArticleBottomAd';
import Footer from '@/components/Footer';

const gates = Array.from({ length: 5 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  priceRange: '[Price Range]',
  rating: 0,
  type: '[Type: Pressure-mounted/Hardware-installed]',
  material: '[Material description]',
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case description]',
}));

export default function BestBabyGates2026() {
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
          <span>Best Baby Gates 2026</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Baby Gates 2026: Safety & Installation Guide
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Keep your crawling and toddling baby safe with the best baby gates on the market.
            Compare pressure-mounted vs. hardware-installed gates for stairs, doorways, and play areas.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Pressure & hardware gates</span>
            <span>✓ {gates.length} top options reviewed</span>
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
                  <th className="border border-gray-300 px-4 py-2 text-left">Gate</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {gates.map((gate) => (
                  <tr key={gate.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-lg">{gate.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{gate.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{gate.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{gate.priceRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {gate.rating > 0 ? (
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
            {gates.map((gate) => (
              <div key={gate.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{gate.rank}. {gate.name}</h3>
                    <p className="text-gray-600 mt-1">{gate.type}</p>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{gate.priceRange}</div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === gate.id ? null : gate.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === gate.id ? '▼ Hide' : '▶ Show'}
                </button>
                {expandedProduct === gate.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {gate.pros.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{gate.bestFor}</p>
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
              { q: 'Pressure-mounted or hardware-installed: which is safer?', a: '[Answer]' },
              { q: 'Can I use a gate on stairs?', a: '[Answer]' },
              { q: 'How do I choose the right gate width?', a: '[Answer]' },
              { q: 'Are baby gates foolproof?', a: '[Answer]' },
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
