'use client';

import { ShoppingCart, ExternalLink } from 'lucide-react';
import { getRetailerName } from '@/lib/affiliate';
import { useCountry } from '@/hooks/useCountry';
import { getRegionForCountry } from '@/lib/geo';
import REGION_CONFIG from '@/config/regions.json';

interface Props {
  href: string;
  price?: string;
  productName?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // Verified per-region ASINs (from a live Sanity product), only for cases
  // where the correct regional ASIN is actually known — never fabricate this.
  // When provided, overrides `href` with the visitor's correct regional link.
  regionalAsins?: Record<string, string>;
  className?: string;
}

export function BuyButton({ href, price, productName, variant = 'primary', size = 'md', regionalAsins, className = '' }: Props) {
  const country = useCountry();
  const resolvedHref = (() => {
    if (!regionalAsins) return href;
    const region = getRegionForCountry(country);
    const asin = regionalAsins[region];
    const config = (REGION_CONFIG as Record<string, { domain: string; tag: string }>)[region];
    if (!asin || !config) return href;
    return `https://www.${config.domain}/dp/${asin}?tag=${config.tag}`;
  })();
  const retailer = getRetailerName(resolvedHref) as string;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-medium',
  };

  function handleClick() {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gtag = (window as any).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'affiliate_click', {
          retailer,
          product_name: productName ?? '',
          price: price ?? '',
          link_url: resolvedHref,
        });
      }
    }
  }

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-colors cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span>Check Price on {retailer}</span>
      <ExternalLink className="h-3 w-3 opacity-60" />
    </a>
  );
}
