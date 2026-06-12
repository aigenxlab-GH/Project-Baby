import { AdSlot } from './AdSlot';
import { adsConfig } from '@/config/ads';

export function FooterAd() {
  return (
    <div className="w-full py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto max-w-7xl px-4">
        <AdSlot slot={adsConfig.slots.footerBanner} format="horizontal" className="max-w-4xl mx-auto" />
      </div>
    </div>
  );
}
