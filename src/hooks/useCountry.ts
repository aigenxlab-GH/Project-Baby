'use client';

import { useEffect, useState } from 'react';

export function useCountry(): string {
  const [country, setCountry] = useState<string>('US');

  useEffect(() => {
    // Read country from cookie set by middleware
    const cookies = document.cookie
      .split('; ')
      .find((row) => row.startsWith('country='));

    if (cookies) {
      const countryCode = cookies.split('=')[1];
      setCountry(countryCode);
    }
  }, []);

  return country;
}
