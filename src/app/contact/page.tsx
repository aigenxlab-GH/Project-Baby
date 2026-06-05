import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Mail, MessageSquare, Clock, ChevronRight, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | PregnancySprout',
  description: 'Get in touch with the PregnancySprout team. We welcome questions, content suggestions, feedback, corrections, and partnership enquiries.',
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="bg-[#fdf8fa] min-h-screen">
      {/* Hero bar */}
      <div className="bg-gradient-to-r from-brand-600 to-purple-600 py-10 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <MessageSquare className="h-10 w-10 text-white/80 mx-auto mb-3" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Get in Touch</h1>
          <p className="text-white/80 text-base max-w-lg mx-auto">
            We&apos;d love to hear from you — whether it&apos;s a question, feedback, or a partnership idea.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-10">

        {/* Medical emergency notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 mb-8">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 leading-relaxed">
            <strong>Medical emergency?</strong> Do not contact us — call your maternity unit, midwife, GP, or emergency services (999 / 911) immediately.
            PregnancySprout cannot provide medical advice or assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_minmax(0,320px)] gap-8">

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-6">We typically reply within 1–2 business days.</p>

            <form className="space-y-5" action="https://formspree.io/f/hello" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" autoComplete="name" required
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" autoComplete="email" required
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Topic
                </label>
                <select
                  id="subject" name="subject"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition bg-white"
                >
                  <option value="">Select a topic…</option>
                  <option value="general">General Question</option>
                  <option value="content-suggestion">Content Suggestion</option>
                  <option value="correction">Content Correction</option>
                  <option value="partnership">Partnership / Advertising</option>
                  <option value="affiliate">Affiliate / Product Review</option>
                  <option value="technical">Technical Issue</option>
                  <option value="privacy">Privacy / Data Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message" name="message" rows={5} required
                  placeholder="Tell us how we can help…"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 transition resize-none"
                />
              </div>

              <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                <Info className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  By submitting this form you agree to our{' '}
                  <Link href="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
                  We use your email solely to respond to your enquiry.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Sidebar info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <Mail className="h-6 w-6 text-brand-500 mb-3" />
              <h3 className="font-serif text-base font-bold text-gray-900 mb-1">Email Us Directly</h3>
              <p className="text-xs text-gray-500 mb-2">For partnership and advertising enquiries:</p>
              <a href={`mailto:${siteConfig.email}`} className="text-brand-600 font-medium text-sm hover:underline break-all">
                {siteConfig.email}
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <Clock className="h-6 w-6 text-purple-500 mb-3" />
              <h3 className="font-serif text-base font-bold text-gray-900 mb-1">Response Time</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We aim to respond to all messages within <strong>1–2 business days</strong>.
                Partnership enquiries may take up to 5 business days.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-3">Helpful Links</h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms & Conditions', href: '/terms' },
                  { label: 'About PregnancySprout', href: '/about' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors">
                      <ChevronRight className="h-3.5 w-3.5 text-brand-400 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-pink-50 rounded-2xl border border-pink-100 p-5">
              <h3 className="font-serif text-sm font-bold text-gray-900 mb-2">Content Corrections</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Spotted an error or outdated information? We take accuracy seriously.
                Select <strong>Content Correction</strong> in the form and we will review and update as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
