import { AdSlot } from './AdSlot';
import { adsConfig } from '@/config/ads';

export function InContentAd() {
  return (
    <div className="my-8">
      <AdSlot slot={adsConfig.slots.inContent} format="rectangle" className="max-w-sm mx-auto" />
    </div>
  );
}
