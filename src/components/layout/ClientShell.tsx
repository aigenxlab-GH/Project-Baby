'use client';

import dynamic from 'next/dynamic';

// These three components are client-only (scroll/interaction) and not needed for
// first paint. Wrapping the dynamic imports here (inside a 'use client' boundary)
// satisfies Next.js 15's rule: ssr:false is only allowed in Client Components.
const ReadingProgress = dynamic(
  () => import('@/components/shared/ReadingProgress').then(m => ({ default: m.ReadingProgress })),
  { ssr: false },
);
const BackToTop = dynamic(
  () => import('@/components/shared/BackToTop').then(m => ({ default: m.BackToTop })),
  { ssr: false },
);
const CookieConsent = dynamic(
  () => import('@/components/shared/CookieConsent').then(m => ({ default: m.CookieConsent })),
  { ssr: false },
);

export function ClientShell() {
  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
