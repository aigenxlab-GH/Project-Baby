import { AdSlot } from './AdSlot';
import { adsConfig } from '@/config/ads';

export function SidebarAd() {
  if (adsConfig.publisherId.includes('XXXX')) return null;
  return (
    <div className="sticky top-24">
      <AdSlot slot={adsConfig.slots.sidebar} format="rectangle" />
    </div>
  );
}
