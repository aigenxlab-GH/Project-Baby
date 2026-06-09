import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Mail, Clock, ChevronRight, AlertCircle, MessageSquare, FileEdit, Package, Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | PregnancySprout',
  description: 'Get in touch with the PregnancySprout team. We welcome questions, content suggestions, feedback, corrections, and partnership enquiries.',
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const reasons = [
  {
    icon: FileEdit,
    title: 'Content Question or Suggestion',
    desc: 'Have an idea for a topic we haven\'t covered? Want clarification on something you read?',
    color: 'text-blue-500 bg-blue-50 border-blue-100',
  },
  {
    icon: FileEdit,
    title: 'Content Correction',
    desc: 'Spotted outdated or inaccurate information? We take accuracy seriously and update quickly.',
    color: 'text-amber-500 bg-amber-50 border-amber-100',
  },
  {
    icon: Package,
    title: 'Product or Affiliate Enquiry',
    desc: 'Questions about a product review, or interested in having your product considered?',
    color: 'text-purple-500 bg-purple-50 border-purple-100',
  },
  {
    icon: Shield,
    title: 'Privacy or Data Request',
    desc: 'Want to access, correct, or delete your personal data? Email us with your request.',
    color: 'text-teal-500 bg-teal-50 border-teal-100',
  },
  {
    icon: MessageSquare,
    title: 'Partnership or Advertising',
    desc: 'Interested in working with PregnancySprout? We welcome relevant partnership discussions.',
    color: 'text-pink-500 bg-pink-50 border-pink-100',
  },
  {
    icon: MessageSquare,
    title: 'General Feedback',
    desc: 'Anything else — we\'re happy to hear from you.',
    color: 'text-green-500 bg-green-50 border-green-100',
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#fdf8fa] min-h-screen">

      {/* Hero bar */}
      <div className="bg-gradient-to-r from-brand-600 to-purple-600 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <MessageSquare className="h-10 w-10 text-white/80 mx-auto mb-3" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Get in Touch</h1>
          <p className="text-white/80 text-base max-w-lg mx-auto">
            We&apos;d love to hear from you — whether it&apos;s a question, feedback, or a partnership idea.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-10">

        {/* Medical emergency notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 mb-8">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 leading-relaxed">
            <strong>Medical emergency?</strong> Do not email us — call your maternity unit, midwife, GP,
            or emergency services (999 / 911) immediately. PregnancySprout cannot provide medical advice or assistance.
          </p>
        </div>

        {/* Main email card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8 text-center">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-brand-500" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Email Us</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Send your message directly to our team. We read every email and reply personally.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-colors shadow-md"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.email}
          </a>
          <div className="flex items-center justify-center gap-2 mt-5">
            <Clock className="h-4 w-4 text-gray-400" />
            <p className="text-sm text-gray-500">
              We typically reply within <strong className="text-gray-700">1–2 business days</strong>
            </p>
          </div>
        </div>

        {/* Reasons to contact */}
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">What Can We Help With?</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {reasons.map((item) => (
            <div
              key={item.title}
              className={`flex gap-4 bg-white rounded-2xl border p-5 ${item.color.split(' ')[2]}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.color}`}>
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Helpful links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h3 className="font-serif text-base font-bold text-gray-900 mb-4">Helpful Pages</h3>
          <ul className="space-y-3">
            {[
              { label: 'About PregnancySprout', href: '/about', desc: 'Our mission, team, and editorial standards' },
              { label: 'Affiliate Disclosure', href: '/affiliate-disclosure', desc: 'How our affiliate links work' },
              { label: 'Privacy Policy', href: '/privacy-policy', desc: 'How we handle your data' },
              { label: 'Terms & Conditions', href: '/terms', desc: 'Site terms of use' },
              { label: 'Editorial Standards', href: '/editorial-standards', desc: 'How we research and fact-check content' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-600 transition-colors group"
                >
                  <ChevronRight className="h-4 w-4 text-brand-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <div>
                    <span className="font-medium text-gray-800 group-hover:text-brand-600">{item.label}</span>
                    <span className="text-gray-400 ml-2 text-xs">{item.desc}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Response note */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 text-center">
          <p className="text-sm text-brand-800 leading-relaxed">
            <strong>Partnership & advertising enquiries</strong> may take up to 5 business days.
            Please include your website URL and a brief description of the collaboration you have in mind.
          </p>
        </div>

      </div>
    </div>
  );
}
