'use client';

import React from 'react';
import { getAffiliateLink, getProduct } from '@/config/affiliateProducts';

interface AffiliateLinkProps {
  productId: string;
  retailer: 'amazon' | 'buyBaby' | 'target' | 'walmart' | 'wayfair' | 'bestBuy' | 'etsy';
  text: string;
  variant?: 'link' | 'button' | 'badge';
  className?: string;
  newTab?: boolean;
}

export const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  productId,
  retailer,
  text,
  variant = 'link',
  className = '',
  newTab = true,
}) => {
  const affiliateUrl = getAffiliateLink(productId, retailer);
  const product = getProduct(productId);

  if (!product || !affiliateUrl) {
    return <span className="text-red-500">[Product link not configured]</span>;
  }

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        product_id: productId,
        product_name: product.name,
        retailer: retailer,
      });
    }
  };

  const baseStyles = 'font-semibold transition-colors duration-200';
  const variantStyles = {
    link: `text-blue-600 hover:text-blue-800 dark:text-blue-400 underline ${baseStyles}`,
    button: `px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${baseStyles}`,
    badge: `inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm ${baseStyles}`,
  };

  return (
    <a
      href={affiliateUrl}
      target={newTab ? '_blank' : '_self'}
      rel="nofollow sponsored noopener noreferrer"
      className={`${variantStyles[variant]} ${className}`}
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

export const AffiliateDisclosure = () => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
    <p className="text-sm text-blue-800 dark:text-blue-200">
      <strong>💡 Affiliate Disclosure:</strong> We earn from qualifying purchases.
    </p>
  </div>
);
