'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import HeaderAd from '@/components/ads/HeaderAd';
import InContentAd from '@/components/ads/InContentAd';
import ArticleBottomAd from '@/components/ads/ArticleBottomAd';
import Footer from '@/components/Footer';

interface BabyMonitor {
  id: string;
  rank: number;
  name: string;
  priceRange: string;
  rating: number;
  reviews: number;
  type: string;
  videoQuality: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  affiliateLink?: string;
}

const monitors: BabyMonitor[] = [
  {
    id: 'product-1',
    rank: 1,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    type: '[Type: Video/Audio/WiFi]',
    videoQuality: '[Resolution/Features]',
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
    type: '[Type: Video/Audio/WiFi]',
    videoQuality: '[Resolution/Features]',
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
    type: '[Type: Video/Audio/WiFi]',
    videoQuality: '[Resolution/Features]',
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
    type: '[Type: Video/Audio/WiFi]',
    videoQuality: '[Resolution/Features]',
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
    type: '[Type: Video/Audio/WiFi]',
    videoQuality: '[Resolution/Features]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
];

export default function BestBabyMonitors2026() {
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
          <span>Best Baby Monitors 2026</span>
        </nav>

        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Baby Monitors 2026: WiFi Video & Audio Options
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Find peace of mind with the best baby monitors on the market. Compare video quality, WiFi reliability,
            temperature monitoring, and parent app features across 5 top options.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ WiFi & non-WiFi options</span>
            <span>✓ {monitors.length} top picks reviewed</span>
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
                  <th className="border border-gray-300 px-4 py-2 text-left">Monitor</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Video Quality</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {monitors.map((monitor) => (
                  <tr key={monitor.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-lg">{monitor.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{monitor.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{monitor.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{monitor.priceRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{monitor.videoQuality}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {monitor.rating > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{monitor.rating}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Monitor Reviews</h2>
          <div className="space-y-8">
            {monitors.map((monitor) => (
              <div key={monitor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{monitor.rank}. {monitor.name}</h3>
                    <p className="text-gray-600 mt-1">Type: {monitor.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{monitor.priceRange}</div>
                    {monitor.rating > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{monitor.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedProduct(expandedProduct === monitor.id ? null : monitor.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === monitor.id ? '▼ Hide Details' : '▶ Show Details'}
                </button>
                {expandedProduct === monitor.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {monitor.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cons:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {monitor.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{monitor.bestFor}</p>
                    </div>
                    {monitor.affiliateLink && (
                      <a
                        href={monitor.affiliateLink}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Baby Monitor Buyer's Guide</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">What to Look For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Video resolution (720p, 1080p, or 4K)</li>
              <li>✓ Night vision capability</li>
              <li>✓ WiFi connectivity & app reliability</li>
              <li>✓ Temperature monitoring</li>
              <li>✓ Two-way talk feature</li>
              <li>✓ Battery life on parent unit</li>
              <li>✓ Pan & tilt functionality</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Do I need WiFi for a baby monitor?', a: '[Answer to be added]' },
              { q: 'Is a video monitor worth the extra cost?', a: '[Answer to be added]' },
              { q: 'How far away can I monitor my baby?', a: '[Answer to be added]' },
              { q: 'Are baby monitors safe around babies?', a: '[Answer to be added]' },
              { q: 'Can I use my smartphone as a baby monitor?', a: '[Answer to be added]' },
              { q: 'Which monitor has the longest battery life?', a: '[Answer to be added]' },
              { q: 'Do monitors emit radiation?', a: '[Answer to be added]' },
              { q: 'Can I use multiple monitors for multiple rooms?', a: '[Answer to be added]' },
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
              <Link href="/tools/registry-checklist" className="text-blue-600 hover:text-blue-800">
                → Baby Registry Checklist
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
