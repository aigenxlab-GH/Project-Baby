'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { Footer } from '@/components/layout/Footer';

interface BabyEssential {
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

const essentials: BabyEssential[] = Array.from({ length: 8 }, (_, i) => ({
  id: `product-${i + 1}`,
  rank: i + 1,
  name: '[Product Name - User to Add]',
  category: '[Category: Sleep/Feeding/Safety/Comfort/Travel]',
  priceRange: '[Price Range]',
  rating: 0,
  reviews: 0,
  pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
  cons: ['[Con 1]', '[Con 2]'],
  bestFor: '[Use case description]',
}));

export default function BestBabyEssentials2026() {
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
          <span>Best Baby Essentials 2026</span>
        </nav>

        {/* Header */}
        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Baby Essentials 2026: Must-Have Items for New Parents
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            The essential items every baby needs from day one. From sleep solutions to feeding gear and safety products,
            we've curated the most important items parents recommend, tested, and rely on.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Sleep, feeding & safety covered</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Baby Essentials Buying Guide</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">What Every Baby Needs:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Safe sleep solutions (bassinet, crib, mattress)</li>
              <li>✓ Feeding essentials (bottles, sterilizers, highchair)</li>
              <li>✓ Safety gear (gates, monitors, thermometers)</li>
              <li>✓ Comfort items (swaddles, white noise, pacifiers)</li>
              <li>✓ Travel-friendly products (strollers, car seats)</li>
              <li>✓ Health and wellness items (temperature monitors, humidifiers)</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What are the absolute must-have baby items?', a: '[Answer to be added]' },
              { q: 'How much should I spend on baby essentials?', a: '[Answer to be added]' },
              { q: 'Can I skip any of these essentials and save money?', a: '[Answer to be added]' },
              { q: 'Which items should I buy new vs. used?', a: '[Answer to be added]' },
              { q: 'Do I need all these items before baby arrives?', a: '[Answer to be added]' },
              { q: 'What essentials can wait until after birth?', a: '[Answer to be added]' },
              { q: 'Are premium baby essentials worth the extra cost?', a: '[Answer to be added]' },
              { q: 'Where can I find the best deals on baby essentials?', a: '[Answer to be added]' },
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
              <Link href="/products/roundups/best-mom-essentials-2026" className="text-blue-600 hover:text-blue-800">
                → Best Mom Essentials 2026
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-blue-600 hover:text-blue-800">
                → All Baby Products & Roundups
              </Link>
            </li>
            <li>
              <Link href="/tools/registry-checklist" className="text-blue-600 hover:text-blue-800">
                → Baby Registry Checklist Tool
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
