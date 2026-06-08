'use client';

import React from 'react';
import { getAffiliateLink, getProduct } from '@/config/affiliateProducts';
import { ExternalLink } from 'lucide-react';

interface PriceComparisonProps {
  productId: string;
  showLabel?: boolean;
}

type RetailerType = 'amazon' | 'buyBaby' | 'target' | 'walmart' | 'wayfair' | 'bestBuy' | 'etsy';

const retailerInfo: Record<RetailerType, { name: string; color: string; icon: string }> = {
  amazon: { name: 'Amazon', color: 'bg-amber-100 hover:bg-amber-200', icon: '🛒' },
  buyBaby: { name: 'Buy Buy Baby', color: 'bg-pink-100 hover:bg-pink-200', icon: '👶' },
  target: { name: 'Target', color: 'bg-red-100 hover:bg-red-200', icon: '🎯' },
  walmart: { name: 'Walmart', color: 'bg-blue-100 hover:bg-blue-200', icon: '🏪' },
  wayfair: { name: 'Wayfair', color: 'bg-purple-100 hover:bg-purple-200', icon: '🛋️' },
  bestBuy: { name: 'Best Buy', color: 'bg-yellow-100 hover:bg-yellow-200', icon: '📱' },
  etsy: { name: 'Etsy', color: 'bg-amber-100 hover:bg-amber-200', icon: '🎨' },
};

export function PriceComparison({ productId, showLabel = true }: PriceComparisonProps) {
  const product = getProduct(productId);

  if (!product) {
    return null;
  }

  const availableRetailers: RetailerType[] = (
    Object.keys(product.affiliateLinks) as RetailerType[]
  ).filter((retailer) => product.affiliateLinks[retailer as RetailerType]);

  const handleClick = (_retailer: RetailerType) => {
    // Google Analytics tracking - can be re-enabled after deployment
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', 'affiliate_click', {
    //     product_id: productId,
    //     product_name: product.name,
    //     retailer: _retailer,
    //     source: 'price_comparison',
    //   });
    // }
  };

  return (
    <div className="my-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-700 rounded-lg">
      {showLabel && (
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          💰 Compare Prices Across Retailers:
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {availableRetailers.map((retailer) => {
          const link = getAffiliateLink(productId, retailer);
          const info = retailerInfo[retailer];

          if (!link) return null;

          return (
            <a
              key={retailer}
              href={link}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => handleClick(retailer)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${info.color} dark:${info.color} text-gray-800 dark:text-gray-900 text-sm font-medium transition-all hover:shadow-md`}
            >
              <span>{info.icon}</span>
              <span>{info.name}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          );
        })}
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
        ℹ️ We earn a small commission when you purchase through these links, at no extra cost to you.
      </p>
    </div>
  );
}
