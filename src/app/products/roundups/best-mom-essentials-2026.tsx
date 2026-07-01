'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { Footer } from '@/components/layout/Footer';

interface MomEssential {
  id: string;
  rank: number;
  name: string;
  category: string;
  priceRange: string;
  rating: number;
  reviews: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  affiliateLink?: string;
}

const essentials: MomEssential[] = Array.from({ length: 8 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  category: '[Category: Nursing/Recovery/Wellness/Fashion/Sleep]',
  priceRange: '[Price Range]',
  rating: 0,
  reviews: 0,
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case description]',
}));

export default function BestMomEssentials2026() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <HeaderAd />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products">Products</Link>
          <span className="mx-2">/</span>
          <span>Best Mom Essentials 2026</span>
        </nav>

        {/* Header */}
        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Mom Essentials 2026: Postpartum & Pregnancy Must-Haves
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Everything a new or expecting mother needs for postpartum recovery, nursing, wellness, and self-care.
            From recovery essentials to everyday comfort items, we've curated the top products that moms actually need and love.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Nursing & recovery products</span>
            <span>✓ {essentials.length} essential items reviewed</span>
            <span>✓ Updated 2026</span>
          </div>
        </article>

        {/* Quick Comparison Table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Rank</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {essentials.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-lg">{item.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{item.category}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.priceRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item.rating > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{item.rating}</span>
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

        {/* Detailed Reviews */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Product Reviews</h2>
          <div className="space-y-8">
            {essentials.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.rank}. {item.name}</h3>
                    <p className="text-gray-600 mt-1">Category: {item.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{item.priceRange}</div>
                    {item.rating > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{item.rating}/5</span>
                        <span className="text-sm text-gray-600">({item.reviews})</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setExpandedProduct(expandedProduct === item.id ? null : item.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === item.id ? '▼ Hide Details' : '▶ Show Details'}
                </button>

                {expandedProduct === item.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {item.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cons:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {item.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{item.bestFor}</p>
                    </div>
                    {item.affiliateLink && (
                      <a
                        href={item.affiliateLink}
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

        {/* Buying Guide */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mom Essentials Buying Guide</h2>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">What Every New Mom Needs:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Nursing-friendly clothing and support items</li>
              <li>✓ Postpartum recovery essentials</li>
              <li>✓ Wellness and self-care products</li>
              <li>✓ Comfortable everyday items for new moms</li>
              <li>✓ Products that support mental health and recovery</li>
              <li>✓ Items that make parenting easier</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What are the most important postpartum recovery items?', a: '[Answer to be added]' },
              { q: 'Do I need all nursing-specific products?', a: '[Answer to be added]' },
              { q: 'When can I return to my normal wardrobe after birth?', a: '[Answer to be added]' },
              { q: 'What wellness products help with postpartum anxiety and mood?', a: '[Answer to be added]' },
              { q: 'Are expensive mom products worth it?', a: '[Answer to be added]' },
              { q: 'Can I use these products if I\'m not breastfeeding?', a: '[Answer to be added]' },
              { q: 'What products help with postpartum sleep?', a: '[Answer to be added]' },
              { q: 'Are there budget-friendly alternatives to expensive brands?', a: '[Answer to be added]' },
            ].map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                <summary className="font-semibold text-gray-900">{faq.q}</summary>
                <p className="text-gray-700 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/products/roundups/best-baby-essentials-2026" className="text-blue-600 hover:text-blue-800">
                → Best Baby Essentials 2026
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-blue-600 hover:text-blue-800">
                → All Baby Products & Roundups
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                → Pregnancy & Postpartum Blog
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
