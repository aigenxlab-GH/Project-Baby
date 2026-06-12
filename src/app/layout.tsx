import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import './globals.css';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
// Dynamically import non-critical UI — reduces initial JS bundle
// ReadingProgress: only active on scroll, not needed for first paint
// BackToTop, CookieConsent: purely interactive, below-fold
const ReadingProgress = dynamic(() => import('@/components/shared/ReadingProgress').then(m => ({ default: m.ReadingProgress })), { ssr: false });
const BackToTop = dynamic(() => import('@/components/shared/BackToTop').then(m => ({ default: m.BackToTop })), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/shared/CookieConsent').then(m => ({ default: m.CookieConsent })), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // adjustFontFallback generates size-matched CSS metrics for the Arial fallback,
  // so when Inter loads there is no text reflow (eliminates font-swap CLS).
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  // 'optional' — only use the custom font if it loads immediately from cache.
  // New visitors see Georgia (system serif) on first load with zero FOUT CLS.
  // Returning visitors see Playfair from cache. This alone removes heading-font CLS.
  display: 'optional',
  weight: ['700'],
  adjustFontFallback: true,
});

// Viewport is managed here so Next.js generates exactly ONE viewport <meta> tag.
// Previously we had a manual <meta name="viewport"> in <head> JSX AND Next.js
// auto-generating one → SEOmator flagged "2 viewport meta tags" (fix #4).
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#db2777',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.name,
  // hreflang — content is in English targeting both US and UK audiences.
  // All hreflang URLs resolve to the same pages (single-language site).
  // x-default is the canonical fallback for unrecognised locales.
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': siteConfig.url,
      'en-GB': siteConfig.url,
      'x-default': siteConfig.url,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // opengraph-image.tsx auto-generates a branded image — this is the fallback URL
    // type: 'image/png' is explicit so crawlers don't have to guess from
    // the URL format — fixes SEOmator "OG image format" warning (fix #22).
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: `${siteConfig.name} — ${siteConfig.tagline}`, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/icon', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
    shortcut: '/icon',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* ── Theme init (FOUC prevention) ─────────────────────────────────────
            Plain string constant — esbuild never transforms string literals, so no
            __name helper calls will appear here. Runs synchronously before <body>
            paints to toggle the "dark" class without any flash. */}
        <script
          suppressHydrationWarning
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pregnancysprout-theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`,
          }}
        />
        {/* viewport + themeColor are now in the `viewport` export above —
            Next.js generates a single <meta name="viewport"> from that.
            Manual <meta name="viewport"> removed to fix duplicate-tag audit warning. */}
        {/* ── Preconnect: image CDNs + analytics (fix #14 — missing GTM preconnect) ── */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://wsrv.nl" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wsrv.nl" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* LCP preload removed: next/image with priority={true} on the homepage hero
            already injects the correct preload link for that specific image.
            A global preload here fired on every page and triggered browser warnings
            ("preloaded but not used within a few seconds"). */}
        {/* ── Google Analytics 4 ── */}
        {gaMeasurementId && gaMeasurementId !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            {/* Minified GA init — fixes "unminified inline script" audit warning (fix #8) */}
            <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}',{page_path:window.location.pathname});`}</Script>
          </>
        )}
        {/* ── Google AdSense ── */}
        {publisherId && publisherId !== 'ca-pub-XXXXXXXXXXXXXXXXX' && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#fdf8fa] dark:bg-[#0f0f13] antialiased">
        <ThemeProvider>
          <ReadingProgress />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
