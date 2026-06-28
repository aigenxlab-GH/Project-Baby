import { useState, useEffect } from 'react';
import type { RegionCode } from './affiliateLinks';
import { detectUserRegion, isValidRegion } from './affiliateLinks';

export function useRegion() {
  const [region, setRegion] = useState<RegionCode>('US');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check URL parameter first (?region=US)
    const params = new URLSearchParams(window.location.search);
    const urlRegion = params.get('region');

    if (urlRegion && isValidRegion(urlRegion)) {
      setRegion(urlRegion as RegionCode);
      localStorage.setItem('preferredRegion', urlRegion);
      setIsLoading(false);
      return;
    }

    // Detect region
    const detected = detectUserRegion();
    setRegion(detected);
    setIsLoading(false);
  }, []);

  const setPreferredRegion = (newRegion: RegionCode) => {
    setRegion(newRegion);
    localStorage.setItem('preferredRegion', newRegion);

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('region', newRegion);
    window.history.replaceState({}, '', url);
  };

  return { region, setRegion: setPreferredRegion, isLoading };
}
