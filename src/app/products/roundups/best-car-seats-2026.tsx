'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import HeaderAd from '@/components/ads/HeaderAd';
import InContentAd from '@/components/ads/InContentAd';
import ArticleBottomAd from '@/components/ads/ArticleBottomAd';
import Footer from '@/components/Footer';

interface CarSeat {
  id: string;
  rank: number;
  name: string;
  priceRange: string;
  rating: number;
  reviews: number;
  safetyRating: string;
  type: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  affiliateLink?: string;
}

const carSeats: CarSeat[] = [
  // Product 1 - User to add
  {
    id: 'product-1',
    rank: 1,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    safetyRating: '[NHTSA/Safety Rating]',
    type: '[Type: Infant/Convertible/All-in-One]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  // Product 2 - User to add
  {
    id: 'product-2',
    rank: 2,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    safetyRating: '[NHTSA/Safety Rating]',
    type: '[Type: Infant/Convertible/All-in-One]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  // Product 3 - User to add
  {
    id: 'product-3',
    rank: 3,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    safetyRating: '[NHTSA/Safety Rating]',
    type: '[Type: Infant/Convertible/All-in-One]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  // Product 4 - User to add
  {
    id: 'product-4',
    rank: 4,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    safetyRating: '[NHTSA/Safety Rating]',
    type: '[Type: Infant/Convertible/All-in-One]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
  // Product 5 - User to add
  {
    id: 'product-5',
    rank: 5,
    name: '[Product Name - User to Add]',
    priceRange: '[Price Range]',
    rating: 0,
    reviews: 0,
    safetyRating: '[NHTSA/Safety Rating]',
    type: '[Type: Infant/Convertible/All-in-One]',
    pros: ['[Pro 1]', '[Pro 2]', '[Pro 3]'],
    cons: ['[Con 1]', '[Con 2]'],
    bestFor: '[Use case description]',
  },
];

export default function BestCarSeats2026() {
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
          <span>Best Car Seats 2026</span>
        </nav>

        {/* Header */}
        <article className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Baby Car Seats 2026: Safety First Comparison
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Choosing the right car seat is one of the most critical safety decisions you'll make as a parent.
            This guide covers infant, convertible, and all-in-one options with detailed safety ratings,
            installation ease, and real-world parent feedback.
          </p>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>✓ Safety certified</span>
            <span>✓ {carSeats.length} top options reviewed</span>
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
                  <th className="border border-gray-300 px-4 py-2 text-left">Car Seat</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Safety Rating</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {carSeats.map((seat) => (
                  <tr key={seat.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-lg">{seat.rank}</td>
                    <td className="border border-gray-300 px-4 py-2">{seat.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{seat.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{seat.priceRange}</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">{seat.safetyRating}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {seat.rating > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{seat.rating}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Car Seat Reviews</h2>
          <div className="space-y-8">
            {carSeats.map((seat) => (
              <div key={seat.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{seat.rank}. {seat.name}</h3>
                    <p className="text-gray-600 mt-1">Type: {seat.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{seat.priceRange}</div>
                    {seat.rating > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-2">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{seat.rating}/5</span>
                        <span className="text-sm text-gray-600">({seat.reviews})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Safety Rating: {seat.safetyRating}</p>
                </div>

                <button
                  onClick={() => setExpandedProduct(expandedProduct === seat.id ? null : seat.id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  {expandedProduct === seat.id ? '▼ Hide Details' : '▶ Show Details'}
                </button>

                {expandedProduct === seat.id && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pros:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {seat.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cons:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {seat.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Best For:</h4>
                      <p className="text-gray-700">{seat.bestFor}</p>
                    </div>
                    {seat.affiliateLink && (
                      <a
                        href={seat.affiliateLink}
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

        {/* Buyer's Guide */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Seat Buyer's Guide 2026</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">What to Look For:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ NHTSA 5-star safety rating</li>
              <li>✓ Ease of installation (LATCH vs. seat belt)</li>
              <li>✓ Crash test performance data</li>
              <li>✓ Recline options for newborn comfort</li>
              <li>✓ Machine-washable fabric for easy cleaning</li>
              <li>✓ Weight limits (infant vs. convertible usage)</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How long should a baby use an infant car seat?', a: '[Answer to be added]' },
              { q: 'When should I switch to a convertible car seat?', a: '[Answer to be added]' },
              { q: 'Are expensive car seats safer?', a: '[Answer to be added]' },
              { q: 'Can I use a used car seat?', a: '[Answer to be added]' },
              { q: 'What is LATCH and is it safer than a seat belt?', a: '[Answer to be added]' },
              { q: 'Do I need a car seat for taxis or rentals?', a: '[Answer to be added]' },
              { q: 'How do I know if my car seat is installed correctly?', a: '[Answer to be added]' },
              { q: 'What if my car seat is in an accident?', a: '[Answer to be added]' },
              { q: 'Are booster seats necessary?', a: '[Answer to be added]' },
              { q: 'Which car seat is best for small vehicles?', a: '[Answer to be added]' },
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
              <Link href="/products" className="text-blue-600 hover:text-blue-800">
                → All Baby Products & Roundups
              </Link>
            </li>
            <li>
              <Link href="/tools/registry-checklist" className="text-blue-600 hover:text-blue-800">
                → Baby Registry Checklist Tool
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                → Pregnancy & Baby Blog
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
