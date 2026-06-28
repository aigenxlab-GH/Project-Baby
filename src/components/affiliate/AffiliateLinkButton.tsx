'use client';

import { useCountry } from '@/hooks/useCountry';
import { filterAffiliateLinksForCountry } from '@/lib/geo';
import { BuyButton } from './BuyButton';
import type { AffiliateLink } from '@/types/product';

interface Props {
  links: AffiliateLink[];
  productName: string;
}

export function AffiliateLinkButton({ links, productName }: Props) {
  const country = useCountry();
  const filteredLinks = filterAffiliateLinksForCountry(links, country);
  const primaryLink = filteredLinks[0];

  if (!primaryLink) return null;

  return (
    <BuyButton
      href={primaryLink.url}
      price={primaryLink.price}
      productName={productName}
    />
  );
}
