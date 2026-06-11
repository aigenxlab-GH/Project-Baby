import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Cookie Policy | PregnancySprout',
  description: 'PregnancySprout Cookie Policy — what cookies we use, why we use them, and how to manage or disable them.',
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
};

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    retention: 'Session / 1 year',
    thirdParty: false,
    description:
      'These cookies are required for the website to function and cannot be disabled. They include cookies that remember your cookie consent choice and support core site features.',
    examples: ['ps_cookie_consent — stores your Accept/Decline choice (1 year)'],
  },
  {
    name: 'Analytics Cookies',
    retention: 'Up to 2 years',
    thirdParty: true,
    description:
      'We use Google Analytics 4 (GA4) to understand how visitors use the site — which pages are popular, how long visitors stay, and what devices they use. This data is aggregated and anonymous.',
    examples: ['_ga, _ga_* — Google Analytics identifiers', 'Provided by Google LLC (USA)'],
  },
  {
    name: 'Advertising Cookies',
    retention: 'Up to 13 months',
    thirdParty: true,
    description:
      'If you have accepted cookies, Google AdSense may place advertising cookies to show personalised ads. These cookies track browsing activity across websites.',
    examples: [
      '__gads, __gpi — Google AdSense / DoubleClick',
      'Provided by Google LLC (USA)',
      'California residents: see our Do Not Sell section below',
    ],
  },
  {
    name: 'Functional Cookies',
    retention: 'Up to 1 year',
    thirdParty: false,
    description:
      'These cookies remember your preferences to improve your experience, such as dark mode settings and tool state.',
    examples: ['ps_theme — dark/light mode preference', 'ps_bookmark_* — bookmarked articles (localStorage)'],
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2.5 bg-brand-50 rounded-xl">
          <Cookie className="h-6 w-6 text-brand-600" />
        </div>
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: June 2026</p>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <p>
          This Cookie Policy explains what cookies are, which cookies{' '}
          <strong>{siteConfig.name}</strong> uses, and how you can manage them. It supplements our{' '}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow the
          site to recognise your device and remember information between pages or visits.{' '}
          <strong>Local storage</strong> is a similar browser-based storage mechanism used for some
          preferences (such as bookmarks and theme choice) — it behaves like a cookie but is never
          sent to our server.
        </p>

        <h2>Cookies We Use</h2>

        {cookieTypes.map((type) => (
          <div key={type.name} className="not-prose mb-6 rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-base">{type.name}</h3>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Retention: <strong className="text-gray-700">{type.retention}</strong></span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  type.thirdParty ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}>
                  {type.thirdParty ? 'Third-party' : 'First-party'}
                </span>
              </div>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-gray-700 mb-3">{type.description}</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {type.examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2">
                    <span className="mt-0.5 text-gray-300">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <h2>How to Manage Cookies</h2>
        <p>
          You can manage or delete cookies through your browser settings. Note that disabling cookies
          may affect the functionality of some parts of the site.
        </p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
        </ul>
        <p>
          To opt out of Google Analytics tracking specifically, you can install the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>

        <h2 id="ccpa">California Residents — Do Not Sell or Share My Personal Information</h2>
        <p>
          Under the <strong>California Consumer Privacy Act (CCPA)</strong> and{' '}
          <strong>California Privacy Rights Act (CPRA)</strong>, California residents have the right
          to opt out of the sale or sharing of their personal information.
        </p>
        <p>
          We work with Google AdSense and Google Analytics, which may use your data for personalised
          advertising purposes. This may constitute a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of
          personal information under California law.
        </p>
        <p>
          <strong>To exercise your opt-out right:</strong>
        </p>
        <ol>
          <li>
            <strong>Decline cookies</strong> using the cookie banner when you first visit the site.
            This prevents advertising cookies from being set.
          </li>
          <li>
            <strong>Email us</strong> at{' '}
            <a href={`mailto:${siteConfig.email}?subject=CCPA Opt-Out Request`}>
              {siteConfig.email}
            </a>{' '}
            with the subject line &ldquo;CCPA Opt-Out Request&rdquo; and we will process your request
            within 15 business days.
          </li>
          <li>
            <strong>Use Google&apos;s opt-out tools:</strong>{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              Google Ad Settings
            </a>{' '}
            and the{' '}
            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">
              Digital Advertising Alliance opt-out
            </a>.
          </li>
        </ol>
        <p>
          California residents also have the right to know what personal information we collect, the
          right to delete it, and the right to non-discrimination for exercising these rights. To
          make any of these requests, contact us at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Material changes will be noted at the
          top of this page with an updated date. Continued use of the site after changes constitutes
          acceptance of the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about cookies or this policy, contact us at{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>

        <div className="not-prose mt-8 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
          See also:{' '}
          <Link href="/privacy-policy" className="text-brand-700 hover:underline">Privacy Policy</Link>{' '}
          ·{' '}
          <Link href="/terms" className="text-brand-700 hover:underline">Terms &amp; Conditions</Link>{' '}
          ·{' '}
          <Link href="/affiliate-disclosure" className="text-brand-700 hover:underline">Affiliate Disclosure</Link>
        </div>
      </div>
    </div>
  );
}
