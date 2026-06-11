import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Learn about our affiliate relationships and how we earn from qualifying purchases.',
  alternates: { canonical: `${siteConfig.url}/affiliate-disclosure` },
  robots: { index: false },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-6">Affiliate Disclosure</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-gray-700 dark:text-gray-200">
        <p className="text-lg font-medium text-gray-900">Last updated: June 5, 2026</p>

        <p>
          {siteConfig.name} participates in affiliate marketing programs, including the{' '}
          <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program
          designed to provide a means for sites to earn advertising fees by advertising and linking
          to Amazon.com.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">What This Means</h2>
        <p>
          When you click on certain links on our website and make a purchase, we may receive a small
          commission at <strong>no additional cost to you</strong>. These commissions help us maintain
          the website, produce high-quality content, and keep all our tools free.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
        <p>
          We only recommend products we genuinely believe will benefit our readers. Our editorial
          opinions are never influenced by affiliate relationships. All product reviews are based on
          research, expert input, and/or hands-on testing.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">Identifying Affiliate Links</h2>
        <p>
          Affiliate links on our site are marked with a disclosure notice near product sections.
          All affiliate links use <code>rel=&quot;nofollow sponsored&quot;</code> attributes as required
          by Google&apos;s guidelines and the FTC.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">FTC Compliance</h2>
        <p>
          In accordance with the Federal Trade Commission (FTC) guidelines, we clearly disclose our
          affiliate relationships. This disclosure complies with the FTC&apos;s 16 CFR, Part 255:{' '}
          &quot;Guides Concerning the Use of Endorsements and Testimonials in Advertising.&quot;
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Questions about our affiliate practices? Contact us at{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </div>
  );
}
