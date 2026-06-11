import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Corrections & Updates — PregnancySprout',
  description: 'See corrections and updates made to PregnancySprout articles. We value accuracy and transparency.',
  alternates: { canonical: `${siteConfig.url}/corrections` },
};

export default function CorrectionsPage() {
  const corrections = [
    {
      date: 'June 2026',
      article: '12 Weeks Pregnant: Baby Development & Symptoms',
      issue: 'Clarified average baby weight range based on latest ultrasound standards',
      severity: 'minor',
      status: 'updated',
    },
    {
      date: 'May 2026',
      article: 'Best Baby Monitors 2026',
      issue: 'Updated product availability and pricing information for current market',
      severity: 'minor',
      status: 'updated',
    },
  ];

  return (
    <div className="bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }, { name: 'Corrections', href: '/corrections' }]} />
      <div className="container mx-auto max-w-4xl px-4 pt-4">
        <Breadcrumb items={[{ name: 'About', href: '/about' }, { name: 'Corrections', href: '/corrections' }]} />
      </div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-100">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Corrections & Updates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to accuracy. This page shows corrections and updates we&apos;ve made to our content.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">

        {/* How to report */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-blue-900 mb-2">Found an Error?</h2>
              <p className="text-sm text-blue-800 mb-4">
                PregnancySprout is committed to accuracy. If you spot an inaccuracy in our content, please let us know.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors"
              >
                Report an Error
              </Link>
            </div>
          </div>
        </div>

        {/* Correction process */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">How We Handle Corrections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Report</h3>
              <p className="text-sm text-gray-600">
                Contact us with the article, issue, and source. We review all submissions within 1–2 business days.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verify</h3>
              <p className="text-sm text-gray-600">
                We fact-check the claim against current medical guidelines and research.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Update</h3>
              <p className="text-sm text-gray-600">
                If valid, we correct the content and update the article&apos;s modification date.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Acknowledge</h3>
              <p className="text-sm text-gray-600">
                We credit the reporter and log the correction for transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Corrections log */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Recent Corrections</h2>
          {corrections.length > 0 ? (
            <div className="space-y-4">
              {corrections.map((correction, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-5 ${
                    correction.status === 'updated'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle
                      className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        correction.status === 'updated'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {correction.article}
                        </h3>
                        <span className="text-xs font-medium text-gray-500">
                          {correction.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {correction.issue}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            correction.severity === 'minor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {correction.severity === 'minor'
                            ? 'Minor Update'
                            : 'Important Correction'}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ {correction.status === 'updated' ? 'Updated' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No active corrections at this time.</p>
              <p className="text-sm text-gray-500 mt-2">
                We review all content quarterly for accuracy.
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-brand-50 to-purple-50 rounded-2xl p-8 border border-brand-100 text-center">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">
            Help Us Stay Accurate
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you spot an inaccuracy or have a suggestion, please contact us. We appreciate all feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Report an Issue
            </Link>
            <Link
              href="/editorial-standards"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-brand-600 font-semibold px-6 py-2.5 rounded-full border border-brand-200 transition-colors"
            >
              Editorial Standards
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
