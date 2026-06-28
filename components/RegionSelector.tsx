'use client';

import { useRegion } from '@/lib/useRegion';
import { getAllRegions, getRegionName, type RegionCode } from '@/lib/affiliateLinks';

export function RegionSelector() {
  const { region, setRegion, isLoading } = useRegion();

  if (isLoading) {
    return <div className="h-12" />; // Placeholder while loading
  }

  const regions = getAllRegions();

  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-300 px-4 py-3 mb-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-blue-900 mb-3">
          🌍 Select Your Region
        </p>

        <div className="flex flex-wrap gap-2">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                region === r
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
              }`}
            >
              {getRegionName(r)}
            </button>
          ))}
        </div>

        <p className="text-xs text-blue-700 mt-2">
          Current region: <strong>{getRegionName(region)}</strong>
        </p>
      </div>
    </div>
  );
}
