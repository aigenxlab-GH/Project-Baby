'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, BarChart2, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductReview } from '@/types/product';

interface Props {
  products: ProductReview[];
  categoryLabel: string;
}

const PRICE_LABEL: Record<string, string> = {
  budget: '💚 Budget',
  'mid-range': '💙 Mid-Range',
  premium: '💜 Premium',
};

export function ProductComparison({ products, categoryLabel }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [open, setOpen] = useState(false);

  function toggleSelect(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, slug];
    });
  }

  const selectedProducts = products.filter((p) => selected.includes(p.slug));

  if (products.length < 2) return null;

  // Collect all spec keys across selected products
  const allSpecKeys = Array.from(
    new Set(selectedProducts.flatMap((p) => Object.keys(p.specsTable ?? {})))
  );

  return (
    <>
      {/* Compare button strip — shown above product list */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <p className="font-semibold text-blue-900 text-sm">
              Compare {categoryLabel} Side by Side
            </p>
            {selected.length > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {selected.length} selected
              </span>
            )}
          </div>
          {open ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
        </div>

        {open && (
          <div className="mt-4">
            <p className="text-xs text-blue-700 mb-3">Select up to 3 products to compare:</p>
            <div className="flex flex-wrap gap-2">
              {products.map((p) => {
                const isSelected = selected.includes(p.slug);
                return (
                  <button
                    key={p.slug}
                    onClick={() => toggleSelect(p.slug)}
                    aria-pressed={isSelected}
                    disabled={!isSelected && selected.length >= 3}
                    className={`text-xs font-medium px-3 py-2.5 rounded-full border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    {isSelected && <span aria-hidden="true">✓ </span>}
                    {p.productName}
                  </button>
                );
              })}
            </div>

            {selectedProducts.length >= 2 && (
              <button
                onClick={() => setShowTable(true)}
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                <BarChart2 className="h-4 w-4" aria-hidden="true" />
                Compare {selectedProducts.length} Products
              </button>
            )}
          </div>
        )}
      </div>

      {/* Comparison modal */}
      {showTable && selectedProducts.length >= 2 && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Comparing ${selectedProducts.length} ${categoryLabel}`}
          className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setShowTable(false); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-900">Product Comparison</h2>
                <p className="text-sm text-gray-500 mt-0.5">{categoryLabel} — side-by-side</p>
              </div>
              <button
                onClick={() => setShowTable(false)}
                aria-label="Close comparison"
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <caption className="sr-only">
                  Side-by-side comparison of {selectedProducts.map((p) => p.productName).join(', ')}
                </caption>

                {/* Product headers */}
                <thead>
                  <tr className="border-b border-gray-100">
                    <th scope="col" className="text-left px-6 py-4 w-36 font-medium text-gray-500">Feature</th>
                    {selectedProducts.map((p) => (
                      <th key={p.slug} scope="col" className="px-6 py-4 text-center">
                        <Link
                          href={`/products/${p.category}/${p.slug}`}
                          className="text-brand-600 hover:underline font-semibold text-base leading-snug block"
                        >
                          {p.productName}
                        </Link>
                        <span className="text-xs text-gray-500 font-normal">{p.brand}</span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Score */}
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-600">Our Score</td>
                    {selectedProducts.map((p) => (
                      <td key={p.slug} className="px-6 py-3 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-600 text-white font-bold text-lg mx-auto">
                          {p.ourScore.toFixed(1)}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Price range */}
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-600">Price Range</td>
                    {selectedProducts.map((p) => (
                      <td key={p.slug} className="px-6 py-3 text-center text-xs font-medium">
                        {PRICE_LABEL[p.priceRange] ?? p.priceRange}
                      </td>
                    ))}
                  </tr>

                  {/* Affiliate price */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-600">Price</td>
                    {selectedProducts.map((p) => {
                      const link = p.affiliateLinks?.[0];
                      return (
                        <td key={p.slug} className="px-6 py-3 text-center">
                          {link?.price
                            ? <span className="font-bold text-gray-900">{link.price}</span>
                            : <span className="text-gray-400">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Pros count */}
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-600">Key Pros</td>
                    {selectedProducts.map((p) => (
                      <td key={p.slug} className="px-6 py-4">
                        <ul className="space-y-1.5">
                          {p.pros.slice(0, 3).map((pro, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-green-700">
                              <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-green-500" aria-hidden="true" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-3 font-medium text-gray-600">Key Cons</td>
                    {selectedProducts.map((p) => (
                      <td key={p.slug} className="px-6 py-4">
                        <ul className="space-y-1.5">
                          {p.cons.slice(0, 2).map((con, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-red-600">
                              <XCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-red-400" aria-hidden="true" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Specs from specsTable */}
                  {allSpecKeys.slice(0, 6).map((key, rowIdx) => (
                    <tr key={key} className={rowIdx % 2 === 0 ? 'bg-gray-50 border-b border-gray-100' : 'border-b border-gray-100'}>
                      <td className="px-6 py-3 font-medium text-gray-600">{key}</td>
                      {selectedProducts.map((p) => (
                        <td key={p.slug} className="px-6 py-3 text-center text-gray-700">
                          {p.specsTable?.[key] ?? <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* CTA row */}
                  <tr className="bg-brand-50">
                    <td className="px-6 py-4 font-medium text-gray-600">Review</td>
                    {selectedProducts.map((p) => {
                      const link = p.affiliateLinks?.[0];
                      return (
                        <td key={p.slug} className="px-6 py-4 text-center space-y-2">
                          <Link
                            href={`/products/${p.category}/${p.slug}`}
                            className="block text-xs text-brand-600 hover:underline font-medium"
                          >
                            Full Review →
                          </Link>
                          {link && (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              className="block text-xs bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                              {link.price ? `Buy ${link.price}` : 'View Price'}
                            </a>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
              Affiliate disclosure: links may earn a commission. <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">Learn more</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
