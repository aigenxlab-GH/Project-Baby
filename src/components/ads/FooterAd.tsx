'use client';

import { usePathname } from 'next/navigation';
import { AdSlot } from './AdSlot';
import { adsConfig, isAdFreePath } from '@/config/ads';

export function FooterAd() {
  const pathname = usePathname();
  if (adsConfig.publisherId.includes('XXXX')) return null;
  // FooterAd is rendered globally from the root layout, so route-level opt-out
  // has to happen here. usePathname() (rather than headers()) keeps every page
  // statically renderable — reading headers in the layout would opt the whole
  // tree into dynamic rendering.
  if (isAdFreePath(pathname)) return null;
  return (
    <div className="w-full py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl px-4">
        <AdSlot slot={adsConfig.slots.footerBanner} format="horizontal" className="max-w-4xl mx-auto" />
      </div>
    </div>
  );
}
