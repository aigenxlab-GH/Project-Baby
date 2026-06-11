import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { FileText } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Terms & Conditions | PregnancySprout',
  description: 'PregnancySprout Terms and Conditions — the rules and guidelines for using our website, content, and tools.',
  alternates: { canonical: `${siteConfig.url}/terms` },
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <p>
        By accessing and using PregnancySprout (&ldquo;the Site&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) at{' '}
        <strong>pregnancysprout.com</strong>, you agree to be bound by these Terms and Conditions.
        If you do not agree with any part of these terms, please do not use the Site.
        These terms apply to all visitors, users, and others who access or use the Site.
      </p>
    ),
  },
  {
    id: 'medical-disclaimer',
    title: '2. Medical Disclaimer — Important',
    content: (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800 space-y-2">
        <p className="font-semibold">Please read this section carefully.</p>
        <p>
          The content on PregnancySprout is provided for <strong>informational and educational purposes only</strong>.
          It is <strong>not medical advice</strong> and is not intended to substitute for professional medical advice,
          diagnosis, or treatment.
        </p>
        <p>
          Always seek the advice of your GP, midwife, obstetrician, paediatrician, or other qualified healthcare
          professional regarding questions you may have about pregnancy, health conditions, medications, or your
          baby&apos;s health.
        </p>
        <p>
          <strong>Never disregard professional medical advice or delay seeking it because of something you have
          read on this website.</strong>
        </p>
        <p>
          If you think you may have a medical emergency, call your maternity unit, doctor, or emergency services
          (999 / 911) immediately.
        </p>
      </div>
    ),
  },
  {
    id: 'content-accuracy',
    title: '3. Accuracy of Content',
    content: (
      <>
        <p className="mb-3">
          We make reasonable efforts to ensure the information on the Site is accurate, current, and
          based on reliable sources including NHS guidelines, WHO recommendations, and peer-reviewed research.
          However:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li>Medical guidelines and recommendations change over time. Content may become outdated.</li>
          <li>We do not warrant that any information on the Site is complete, accurate, or error-free.</li>
          <li>Individual medical circumstances vary. Content is general in nature and may not apply to your specific situation.</li>
          <li>Product information (specifications, prices, availability) may change without notice.</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          If you spot an error or outdated information, please let us know via our{' '}
          <Link href="/contact" className="text-brand-600 hover:underline">Contact page</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    content: (
      <>
        <p className="mb-3">
          All content on the Site — including but not limited to text, articles, guides, graphics, logos,
          tool designs, and the site design itself — is the property of PregnancySprout or its content
          suppliers and is protected by copyright law.
        </p>
        <p className="mb-3">
          You may:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 mb-3">
          <li>View and read content for personal, non-commercial purposes</li>
          <li>Share links to our pages on social media or other websites</li>
          <li>Quote brief excerpts (with attribution and a link back to the original page)</li>
        </ul>
        <p className="mb-3">You may not:</p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li>Reproduce, republish, or distribute our content in full without written permission</li>
          <li>Use our content for commercial purposes without prior agreement</li>
          <li>Scrape, copy, or extract content systematically using automated tools</li>
          <li>Use our brand name, logo, or trademarks without our written consent</li>
        </ul>
      </>
    ),
  },
  {
    id: 'affiliate-links',
    title: '5. Affiliate Links and Advertising',
    content: (
      <>
        <p className="mb-3">
          Some links on this Site are affiliate links. This means we may earn a small commission if you
          click the link and make a purchase, at no additional cost to you.
        </p>
        <p className="mb-3">
          We also display advertisements served by Google AdSense and potentially other advertising networks.
        </p>
        <p className="text-sm text-gray-600">
          Affiliate commissions and advertising revenue help fund the Site and keep our content free.
          These relationships never influence our editorial content, ratings, or recommendations.
          For full details, please read our{' '}
          <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">Affiliate Disclosure</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'tools',
    title: '6. Free Tools',
    content: (
      <>
        <p className="mb-3">
          We provide several free tools including the Due Date Calculator, Ovulation Calculator,
          Contraction Timer, Baby Name Generator, Registry Checklist, and Symptom Checker.
        </p>
        <p className="mb-3">
          These tools are provided &ldquo;as is&rdquo; for informational and convenience purposes only.
          Results from these tools are estimates and should not be relied upon for medical decisions.
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li>Due dates and ovulation estimates are approximate and may differ from your healthcare provider&apos;s assessment.</li>
          <li>The Contraction Timer is not a diagnostic tool and does not replace the judgment of a midwife or doctor.</li>
          <li>The Symptom Checker provides general guidance only. Always consult a healthcare professional about specific symptoms.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'external-links',
    title: '7. External Links',
    content: (
      <p>
        The Site may contain links to third-party websites. These links are provided for convenience
        and information only. We have no control over the content of those sites and accept no
        responsibility for them or for any loss or damage that may arise from your use of them.
        Inclusion of a link does not imply endorsement of the linked site or its contents.
      </p>
    ),
  },
  {
    id: 'user-conduct',
    title: '8. Acceptable Use',
    content: (
      <>
        <p className="mb-3">You agree not to use the Site to:</p>
        <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
          <li>Violate any applicable law or regulation</li>
          <li>Transmit any spam, unsolicited advertising, or harmful content</li>
          <li>Attempt to gain unauthorised access to the Site or its servers</li>
          <li>Interfere with the proper working of the Site</li>
          <li>Upload or transmit viruses or other malicious code</li>
          <li>Collect or harvest data from the Site using automated tools without our prior consent</li>
        </ul>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: '9. Disclaimer of Warranties',
    content: (
      <p>
        The Site and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
        any warranties of any kind, either express or implied, including but not limited to implied
        warranties of merchantability, fitness for a particular purpose, or non-infringement.
        We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
      </p>
    ),
  },
  {
    id: 'limitation',
    title: '10. Limitation of Liability',
    content: (
      <p>
        To the fullest extent permitted by law, PregnancySprout, its operators, and contributors shall
        not be liable for any indirect, incidental, special, consequential, or punitive damages,
        including but not limited to loss of profits, data, or goodwill, arising from your use of or
        inability to use the Site, even if we have been advised of the possibility of such damages.
        Our total liability for any claim shall not exceed £100 / $100.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: '11. Privacy',
    content: (
      <p>
        Your use of the Site is also governed by our{' '}
        <Link href="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</Link>,
        which is incorporated into these Terms by reference. By using the Site, you consent to our
        collection and use of information as described in the Privacy Policy.
      </p>
    ),
  },
  {
    id: 'changes',
    title: '12. Changes to These Terms',
    content: (
      <p>
        We reserve the right to update or modify these Terms at any time without prior notice. Changes
        will take effect immediately upon posting to the Site. The date at the top of this page reflects
        when the terms were last revised. Your continued use of the Site after changes are posted
        constitutes your acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '13. Governing Law',
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with the laws of England and Wales.
        Any disputes arising from these Terms or your use of the Site shall be subject to the exclusive
        jurisdiction of the courts of England and Wales.
      </p>
    ),
  },
  {
    id: 'contact-terms',
    title: '14. Contact',
    content: (
      <p>
        If you have any questions about these Terms and Conditions, please contact us at{' '}
        <a href={`mailto:${siteConfig.email}`} className="text-brand-600 hover:underline">{siteConfig.email}</a>{' '}
        or use our <Link href="/contact" className="text-brand-600 hover:underline">Contact Form</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#fdf8fa] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-8 w-8 text-white/70" />
            <span className="text-white/60 text-sm">Legal</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-white/70 text-sm">Last updated: 5 June 2026 &nbsp;|&nbsp; Effective: 5 June 2026</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-10">

        {/* Summary */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-8">
          <h2 className="font-semibold text-brand-800 text-sm mb-2">Summary (Plain English)</h2>
          <ul className="space-y-1.5 text-sm text-brand-700">
            <li>📖 Use our content for personal reference — don&apos;t republish it commercially</li>
            <li>🏥 Our content is not medical advice — always consult your doctor or midwife</li>
            <li>🔗 Some links are affiliate links — we earn a commission at no cost to you</li>
            <li>🛠️ Our tools are free estimates — not substitutes for professional assessment</li>
            <li>✏️ We may update these terms — continued use means you accept the changes</li>
          </ul>
        </div>

        {/* Table of contents */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 shadow-sm">
          <h2 className="font-semibold text-gray-900 text-sm mb-3">Contents</h2>
          <div className="grid sm:grid-cols-2 gap-1">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm text-brand-600 hover:underline py-0.5">
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm scroll-mt-6">
              <h2 className="font-serif text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{s.title}</h2>
              <div className="text-gray-600 text-sm leading-relaxed">{s.content}</div>
            </section>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 mb-3">
            These terms apply to pregnancysprout.com only.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-brand-600 hover:underline">Privacy Policy</Link>
            <Link href="/affiliate-disclosure" className="text-xs text-brand-600 hover:underline">Affiliate Disclosure</Link>
            <Link href="/contact" className="text-xs text-brand-600 hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
