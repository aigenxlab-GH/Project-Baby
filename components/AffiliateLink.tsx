'use client';

import { useRegion } from '@/lib/useRegion';
import { getAffiliateLink, getRegionName, type RegionCode } from '@/lib/affiliateLinks';

interface AffiliateLinkProps {
  slug: string;
  label?: string;
  className?: string;
  showRegion?: boolean;
}

export function AffiliateLink({
  slug,
  label = 'View on Amazon',
  className = '',
  showRegion = false,
}: AffiliateLinkProps) {
  const { region, isLoading } = useRegion();

  if (isLoading) {
    return <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded cursor-not-allowed">Loading...</button>;
  }

  const link = getAffiliateLink(slug, region);

  if (!link.available) {
    return (
      <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded">
        Not available in {getRegionName(region)}
      </div>
    );
  }

  return (
    <a
      href={link.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded transition-colors ${className}`}
    >
      {label}
      {showRegion && ` (${getRegionName(region)})`}
    </a>
  );
}
