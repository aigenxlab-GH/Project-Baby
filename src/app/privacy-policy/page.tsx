import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PregnancySprout',
  description: 'PregnancySprout Privacy Policy — how we collect, use, store and protect your personal information when you use our website.',
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

const sections = [
  {
    id: 'who-we-are',
    title: '1. Who We Are',
    content: (
      <>
        <p>
          PregnancySprout (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website at{' '}
          <strong>pregnancysprout.com</strong> (the &ldquo;Site&rdquo;). We are a pregnancy and baby
          information resource providing editorial content, free tools, and product guidance.
        </p>
        <p className="mt-3">
          For privacy enquiries, contact us at:{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">{siteConfig.email}</a>
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    title: '2. What Information We Collect',
    content: (
      <>
        <p className="mb-3">We collect the following categories of information:</p>
        <div className="space-y-4">
          {[
            {
              sub: '2.1 Information You Provide Voluntarily',
              items: [
                'Email address — if you contact us via our contact form or subscribe to updates',
                'Name — if you provide it when contacting us',
                'Message content — the text you submit via our contact form',
              ],
            },
            {
              sub: '2.2 Information Collected Automatically',
              items: [
                'IP address and approximate location (country/region level)',
                'Browser type, operating system, and device type',
                'Pages visited, time spent on pages, and navigation paths',
                'Referring website (how you arrived at our site)',
                'Clicks on links, including affiliate links',
              ],
            },
            {
              sub: '2.3 Cookies and Tracking Technologies',
              items: [
                'Google Analytics cookies — to understand how visitors use our site',
                'Google AdSense cookies — to serve and personalise advertisements',
                'Affiliate tracking cookies — set by retailers when you click affiliate links (e.g. Amazon)',
                'Functional cookies — to remember your preferences on our tools (e.g. registry checklist)',
              ],
            },
          ].map((block) => (
            <div key={block.sub}>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{block.sub}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {block.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: (
      <>
        <p className="mb-3">We use collected information to:</p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li>Respond to your messages and enquiries</li>
          <li>Send you updates or newsletters if you have subscribed (you may unsubscribe at any time)</li>
          <li>Understand how visitors use the Site and improve our content and tools</li>
          <li>Display relevant advertisements via Google AdSense</li>
          <li>Track affiliate link clicks for commission purposes</li>
          <li>Detect and prevent abuse, spam, or fraudulent activity</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          <strong>We do not sell your personal data</strong> to any third party, and we do not use your
          data for any purpose beyond those described above.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: '4. Legal Basis for Processing (UK & EU Visitors)',
    content: (
      <>
        <p className="mb-3 text-sm text-gray-600">Under UK GDPR and EU GDPR, we process your data under the following bases:</p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li><strong>Legitimate interests</strong> — analytics, site improvement, fraud prevention</li>
          <li><strong>Consent</strong> — email newsletters and advertising cookies (you may withdraw consent at any time)</li>
          <li><strong>Contract</strong> — processing enquiries you submit to us</li>
          <li><strong>Legal obligation</strong> — compliance with applicable law</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: '5. Third-Party Services',
    content: (
      <>
        <p className="mb-3 text-sm text-gray-600">We use the following third-party services that may process your data:</p>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-3 py-2 border border-gray-200 font-semibold text-gray-700">Service</th>
                <th className="text-left px-3 py-2 border border-gray-200 font-semibold text-gray-700">Purpose</th>
                <th className="text-left px-3 py-2 border border-gray-200 font-semibold text-gray-700">Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              {[
                { service: 'Google Analytics', purpose: 'Website traffic analytics', url: 'https://policies.google.com/privacy', label: 'Google' },
                { service: 'Google AdSense', purpose: 'Display advertising', url: 'https://policies.google.com/privacy', label: 'Google' },
                { service: 'Amazon Associates', purpose: 'Affiliate product links', url: 'https://www.amazon.com/privacy', label: 'Amazon' },
                { service: 'Cloudflare', purpose: 'Hosting and CDN', url: 'https://www.cloudflare.com/privacypolicy/', label: 'Cloudflare' },
              ].map((row, i) => (
                <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-3 py-2 border border-gray-200 font-medium text-gray-800">{row.service}</td>
                  <td className="px-3 py-2 border border-gray-200 text-gray-600">{row.purpose}</td>
                  <td className="px-3 py-2 border border-gray-200">
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">{row.label} Privacy Policy</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '6. Cookies',
    content: (
      <>
        <p className="mb-3 text-sm text-gray-600">
          Cookies are small text files stored on your device. We use both first-party and third-party cookies.
        </p>
        <p className="mb-3 text-sm text-gray-600">
          <strong>Essential cookies</strong> are required for the site to function (e.g. tool preferences).
          They cannot be disabled without affecting site functionality.
        </p>
        <p className="mb-3 text-sm text-gray-600">
          <strong>Analytics and advertising cookies</strong> are set by Google and affiliate partners.
          You can control or disable these via:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li>Your browser settings (most browsers allow you to block cookies)</li>
          <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Google Ad Settings</a> to opt out of personalised ads</li>
          <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Google Analytics Opt-Out</a> browser add-on</li>
          <li>Your device&apos;s &ldquo;Limit Ad Tracking&rdquo; or &ldquo;Opt out of Ads Personalisation&rdquo; setting</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: '7. Data Retention',
    content: (
      <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
        <li><strong>Contact form submissions</strong> — retained for up to 12 months, then deleted</li>
        <li><strong>Email newsletter subscriptions</strong> — retained until you unsubscribe</li>
        <li><strong>Analytics data</strong> — retained by Google Analytics per their standard retention period (26 months by default)</li>
        <li><strong>Server logs</strong> — retained for up to 90 days for security purposes</li>
      </ul>
    ),
  },
  {
    id: 'your-rights',
    title: '8. Your Rights',
    content: (
      <>
        <p className="mb-3 text-sm text-gray-600">
          Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li><strong>Access</strong> — request a copy of your personal data we hold</li>
          <li><strong>Correction</strong> — request correction of inaccurate data</li>
          <li><strong>Erasure</strong> — request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
          <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
          <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
          <li><strong>Withdraw consent</strong> — withdraw any previously given consent at any time</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          To exercise any of these rights, email us at{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">{siteConfig.email}</a>.
          We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: 'childrens-privacy',
    title: "9. Children's Privacy",
    content: (
      <p className="text-sm text-gray-600">
        Our Site is intended for adults (parents and caregivers). We do not knowingly collect personal
        data from children under 13. If you believe a child has submitted personal data to us, please
        contact us and we will promptly delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '10. Changes to This Policy',
    content: (
      <p className="text-sm text-gray-600">
        We may update this Privacy Policy from time to time. The date at the top of the page reflects
        when it was last revised. Continued use of the Site after changes constitutes your acceptance
        of the updated policy. We encourage you to review this page periodically.
      </p>
    ),
  },
  {
    id: 'contact-privacy',
    title: '11. Contact',
    content: (
      <p className="text-sm text-gray-600">
        For any privacy-related questions or requests, please email us at{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">{siteConfig.email}</a>{' '}
        or use our <Link href="/contact" className="text-brand-600 hover:underline">Contact Form</Link>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#fdf8fa] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-8 w-8 text-white/70" />
            <span className="text-white/60 text-sm">Legal</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/70 text-sm">Last updated: 5 June 2026</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-10">
        {/* Summary box */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-8">
          <h2 className="font-semibold text-brand-800 text-sm mb-2">Summary (Plain English)</h2>
          <ul className="space-y-1.5 text-sm text-brand-700">
            <li>✅ We collect minimal data — only what&apos;s needed to run the site</li>
            <li>✅ We never sell your personal data to anyone</li>
            <li>✅ We use Google Analytics for traffic insights and Google AdSense for ads</li>
            <li>✅ You can opt out of personalised ads and analytics at any time</li>
            <li>✅ You can request deletion of your data by emailing us</li>
          </ul>
        </div>

        {/* Table of contents */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 shadow-sm">
          <h2 className="font-semibold text-gray-900 text-sm mb-3">Contents</h2>
          <ul className="space-y-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-brand-600 hover:underline">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm scroll-mt-6">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{s.title}</h2>
              <div className="text-gray-600 leading-relaxed">{s.content}</div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            This policy applies to pregnancysprout.com only. It does not apply to any third-party websites linked from this site.
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Link href="/terms" className="text-xs text-brand-600 hover:underline">Terms &amp; Conditions</Link>
            <Link href="/affiliate-disclosure" className="text-xs text-brand-600 hover:underline">Affiliate Disclosure</Link>
            <Link href="/contact" className="text-xs text-brand-600 hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
