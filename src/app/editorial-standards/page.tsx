import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { CheckCircle, AlertCircle, BookOpen, Users } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Editorial Standards — PregnancySprout',
  description: 'Learn about PregnancySprout\'s editorial standards, fact-checking process, and how we maintain accuracy and trustworthiness.',
  alternates: { canonical: `${siteConfig.url}/editorial-standards` },
};

export default function EditorialStandardsPage() {
  return (
    <div className="bg-white">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }, { name: 'Editorial Standards', href: '/editorial-standards' }]} />
      <div className="container mx-auto max-w-4xl px-4 pt-4">
        <Breadcrumb items={[{ name: 'About', href: '/about' }, { name: 'Editorial Standards', href: '/editorial-standards' }]} />
      </div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-50 to-purple-50 border-b border-brand-100">
        <div className="container mx-auto max-w-4xl px-4 pt-6 pb-12 md:py-16">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Editorial Standards
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How PregnancySprout ensures content accuracy, trustworthiness, and transparency.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 pt-6 pb-12">

        {/* Content sourcing */}
        <section className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <BookOpen className="h-7 w-7 text-brand-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                How We Source Content
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every article and guide on PregnancySprout starts with research into authoritative, evidence-based sources. We prioritize:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Official Health Organizations:</strong> NHS, WHO, AAP, NICE, RCOG, CDC
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Peer-reviewed Research:</strong> Medical journals, clinical studies, and evidence-based guidelines
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Established Medical References:</strong> Textbooks, clinical practice guidelines, and consensus statements
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Expert Consensus:</strong> Recommendations from major medical bodies and professional organizations
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fact-checking */}
        <section className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <AlertCircle className="h-7 w-7 text-brand-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                Our Fact-Checking Process
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Before publication, all content is reviewed for accuracy and alignment with current medical guidelines:
              </p>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-brand-100 text-brand-700 font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                  <div>
                    <strong className="text-gray-900">Research Verification:</strong> All medical claims are cross-referenced against primary sources and authoritative organizations.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-brand-100 text-brand-700 font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                  <div>
                    <strong className="text-gray-900">Guideline Alignment:</strong> Articles are checked against the latest NHS, WHO, and NICE guidelines.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-brand-100 text-brand-700 font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                  <div>
                    <strong className="text-gray-900">Clarity Review:</strong> Content is reviewed to ensure medical terms are explained clearly for a general audience.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-brand-100 text-brand-700 font-bold rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                  <div>
                    <strong className="text-gray-900">Final Approval:</strong> All articles are reviewed for accuracy and completeness before publishing.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Product review methodology */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Product Review Methodology
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Product reviews on PregnancySprout are based on:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Verified Specifications:</strong> We check manufacturer specifications and published reviews.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Safety Standards:</strong> Products are evaluated against relevant safety standards (CPSC, CE, etc.).
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Independent Research:</strong> We research multiple sources including customer reviews, expert opinions, and safety data.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">No Payola:</strong> Products are recommended based on merit. Affiliate relationships do not influence our recommendations.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Value & Price:</strong> We evaluate products based on features, safety, quality, and value for money.
              </div>
            </li>
          </ul>
        </section>

        {/* Keeping content fresh */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Keeping Content Fresh & Accurate
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Medical guidelines and research evolve. We update our content regularly:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Monthly Updates</h3>
              <p className="text-sm text-gray-600">
                High-priority articles are reviewed monthly for accuracy and alignment with latest guidelines.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Quarterly Reviews</h3>
              <p className="text-sm text-gray-600">
                All articles receive a thorough review every quarter to ensure accuracy.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Date Transparency</h3>
              <p className="text-sm text-gray-600">
                All articles show publication date and last update date for transparency.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Correction Log</h3>
              <p className="text-sm text-gray-600">
                Corrections are tracked and published for reader transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Conflicts of interest */}
        <section className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <Users className="h-7 w-7 text-brand-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                Transparency & Conflicts of Interest
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                PregnancySprout is supported by two revenue sources:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <strong className="text-gray-900">Google AdSense:</strong> Display advertising. We have no control over which ads appear.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <strong className="text-gray-900">Affiliate Commissions:</strong> We may earn a small commission (typically 3–7%) when you click product links and make purchases. This costs you nothing extra.
                  </div>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                <strong>Important:</strong> Neither advertising nor affiliate relationships influence our editorial content, product recommendations, or ratings. We only recommend products we genuinely believe are worth buying.
              </p>
            </div>
          </div>
        </section>

        {/* Requesting corrections */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">
            Found an Error?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We welcome corrections and suggestions. If you spot an inaccuracy, please let us know.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Report an Error
          </Link>
          <p className="text-xs text-gray-500 mt-4">
            We respond to all corrections within 1–2 business days.
          </p>
        </section>

      </div>
    </div>
  );
}
