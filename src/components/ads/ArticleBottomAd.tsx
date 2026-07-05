import { AdSlot } from './AdSlot';
import { adsConfig } from '@/config/ads';

export function ArticleBottomAd() {
  if (adsConfig.publisherId.includes('XXXX')) return null;
  return (
    <div className="my-8 py-4 border-t border-b border-gray-100 dark:border-gray-800">
      <AdSlot slot={adsConfig.slots.articleBottom} format="horizontal" className="max-w-2xl mx-auto" />
    </div>
  );
}
