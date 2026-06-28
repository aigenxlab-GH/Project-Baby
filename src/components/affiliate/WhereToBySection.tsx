'use client';

import { useCountry } from '@/hooks/useCountry';
import { filterAffiliateLinksForCountry } from '@/lib/geo';
import { BuyButton } from './BuyButton';
import type { AffiliateLink } from '@/types/product';

interface Props {
  links: AffiliateLink[];
}

export function WhereToBuySection({ links }: Props) {
  const country = useCountry();
  const filteredLinks = filterAffiliateLinksForCountry(links, country);

  if (!filteredLinks.length) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 mb-8 border border-gray-100 dark:border-gray-800">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Where to Buy</h2>
      <div className="flex flex-wrap gap-3">
        {filteredLinks.map((link, i) => (
          <BuyButton key={i} href={link.url} price={link.price} />
        ))}
      </div>
    </div>
  );
}
