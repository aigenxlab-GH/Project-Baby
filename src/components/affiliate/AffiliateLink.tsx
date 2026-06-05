'use client';

import { ReactNode } from 'react';
import { addAmazonTag, isAmazonUrl } from '@/lib/affiliate';

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  retailer?: string;
  productName?: string;
}

export function AffiliateLink({ href, children, className, retailer, productName }: Props) {
  const finalUrl = isAmazonUrl(href) ? addAmazonTag(href) : href;

  function handleClick() {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', 'affiliate_click', {
        retailer: retailer || 'unknown',
        product: productName || 'unknown',
        url: finalUrl,
      });
    }
  }

  return (
    <a
      href={finalUrl}
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
