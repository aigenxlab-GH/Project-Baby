import { AdSlot } from './AdSlot';
import { adsConfig } from '@/config/ads';

export function HeaderAd() {
  if (adsConfig.publisherId.includes('XXXX')) return null;
  return (
    <div className="w-full py-2 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto max-w-7xl px-4">
        <AdSlot slot={adsConfig.slots.headerBanner} format="horizontal" className="max-w-4xl mx-auto" />
      </div>
    </div>
  );
}
