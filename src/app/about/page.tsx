import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Heart, Shield, Star, Baby, FileText, Users, CheckCircle, BookOpen, Globe } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'About PregnancySprout — Our Mission and Editorial Standards',
  description: 'Learn about PregnancySprout, our mission to support expecting and new parents, our editorial standards, and how we keep our content accurate and trustworthy.',
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  {
    icon: Heart,
    title: 'Written for Real Parents',
    desc: 'Every article is written with new and expecting parents in mind — practical, clear, and free from unnecessary medical jargon. We cover what you actually need to know.',
    color: 'text-pink-500 bg-pink-50 border-pink-100',
  },
  {
    icon: Shield,
    title: 'Accuracy First',
    desc: 'Our content is carefully researched using peer-reviewed sources, NHS and WHO guidelines, and established medical literature. We always recommend consulting your own healthcare provider.',
    color: 'text-teal-500 bg-teal-50 border-teal-100',
  },
  {
    icon: Star,
    title: 'Honest Product Guidance',
    desc: 'Product coverage is based on thorough research, verified specifications, and independent reviews. Affiliate relationships are always disclosed and never influence our recommendations.',
    color: 'text-amber-500 bg-amber-50 border-amber-100',
  },
  {
    icon: Baby,
    title: 'Every Stage Covered',
    desc: 'From trying to conceive through toddlerhood — week-by-week pregnancy guides, baby names, product reviews, parenting tips, and free tools all in one place.',
    color: 'text-purple-500 bg-purple-50 border-purple-100',
  },
  {
    icon: FileText,
    title: 'Free Tools, No Sign-Up',
    desc: 'Our due date calculator, contraction timer, ovulation calculator, baby name generator, and registry checklist are completely free with no account required.',
    color: 'text-blue-500 bg-blue-50 border-blue-100',
  },
  {
    icon: Users,
    title: 'Growing Continuously',
    desc: 'PregnancySprout is a growing resource. We continuously add new guides, articles, and tools based on what parents are searching for and asking about.',
    color: 'text-green-500 bg-green-50 border-green-100',
  },
];

const editorialProcess = [
  { step: '01', title: 'Research', desc: 'Every article starts with a review of current NHS, WHO, AAP, and NICE guidelines, plus peer-reviewed medical literature.' },
  { step: '02', title: 'Writing', desc: 'Content is written in plain English, focused on practical helpfulness, with jargon explained and medical terms clarified.' },
  { step: '03', title: 'Review', desc: 'Articles are reviewed for accuracy, clarity, and completeness before publication. Outdated content is updated as guidelines change.' },
  { step: '04', title: 'Sources cited', desc: 'Where specific statistics or medical claims are made, we cite the source. Readers can verify claims independently.' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#fdf8fa] min-h-screen">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }]} />
      <div className="container mx-auto max-w-4xl px-4 pt-4">
        <Breadcrumb items={[{ name: 'About', href: '/about' }]} />
      </div>
      {/* Hero */}
      <div className="relative overflow-hidden h-72 md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1400&q=85&auto=format&fit=crop"
          alt="Happy family with newborn baby"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/25" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-4xl mx-auto w-full">
          <span className="inline-block bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">About Us</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            About PregnancySprout
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-xl leading-relaxed">
            Practical, honest pregnancy and baby guidance — carefully researched and written for real parents.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">

        {/* Mission statement */}
        <div className="text-center mb-14 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <Globe className="h-10 w-10 text-brand-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We exist to help expecting and new parents navigate pregnancy and early parenthood with
            clear, evidence-based information and genuinely useful free tools — without overwhelming
            them, misleading them, or asking them to pay for it.
          </p>
        </div>

        {/* Editorial Team */}
        <section className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8 text-center">Our Editorial Team</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            PregnancySprout is maintained by a dedicated team committed to evidence-based, accurate content. All articles are reviewed against NHS, WHO, and NICE guidelines.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Team member 1 */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-serif text-2xl font-bold">
                PS
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 text-center mb-1">
                PregnancySprout Editorial Team
              </h3>
              <p className="text-sm text-brand-600 text-center font-medium mb-3">
                Content Research & Review
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our editorial team researches and reviews all content against current NHS, WHO, NICE, AAP, and RCOG guidelines. Every article is fact-checked for accuracy and clarity before publication.
              </p>
            </div>

            {/* Transparency note */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <h3 className="font-serif text-lg font-bold text-amber-900 mb-3">
                Content Quality Standards
              </h3>
              <ul className="text-sm text-amber-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">✓</span> All articles researched against official health guidelines
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">✓</span> Medical claims backed by peer-reviewed sources
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">✓</span> Updated quarterly for medical accuracy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">✓</span> Clear publication & update dates on every article
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">✓</span> Transparent correction process
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values grid */}
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">What We Stand For</h2>
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {values.map((item) => (
            <div
              key={item.title}
              className={`flex gap-4 bg-white rounded-2xl border p-6 hover:shadow-md transition-shadow ${item.color.split(' ')[2]}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial process */}
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Our Editorial Process</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8 shadow-sm">
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            All PregnancySprout content is written and reviewed by our editorial team using current
            medical guidelines, peer-reviewed research, and trusted health organisations including the
            NHS, WHO, AAP, NICE, and RCOG. Product guidance is based on published specifications,
            verified customer reviews, and established safety standards.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            <Link href="/editorial-standards" className="text-brand-600 hover:underline font-semibold">
              Read our full Editorial Standards →
            </Link>
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {editorialProcess.map((p) => (
              <div key={p.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What we are not */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <h2 className="font-serif text-lg font-bold text-amber-900">What PregnancySprout Is Not</h2>
          </div>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />Not a medical provider — we do not give personalised medical advice or diagnoses.</li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />Not a replacement for your GP, midwife, obstetrician, or paediatrician.</li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />Not an emergency service — if you have an urgent concern, call your maternity unit or 999/911.</li>
          </ul>
        </div>

        {/* Revenue / transparency */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">How We Are Funded</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            PregnancySprout is free to use. We fund the site through two sources:
          </p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <div><strong className="text-gray-900">Google AdSense</strong> — display advertising shown on our pages. Ads are served by Google and we have no control over which specific ads appear.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <div><strong className="text-gray-900">Affiliate commissions</strong> — when you click a product link and make a purchase, we may earn a small commission at no extra cost to you. See our <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">Affiliate Disclosure</Link> for full details.</div>
            </li>
          </ul>
          <p className="text-gray-500 text-xs mt-4 leading-relaxed">
            Neither advertising relationships nor affiliate partnerships influence our editorial content, ratings, or recommendations. We only recommend products we genuinely believe offer good value.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-brand-50 to-purple-50 rounded-2xl p-8 border border-brand-100 text-center mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
            Have a question, content suggestion, or spotted an error? We welcome all feedback and respond within 1–2 business days.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Trust & Transparency */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-8 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">Trust & Transparency</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Editorial Standards</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                All PregnancySprout content is researched and reviewed against current medical guidelines from:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ NHS (National Health Service)</li>
                <li>✓ WHO (World Health Organization)</li>
                <li>✓ NICE (National Institute for Health and Care Excellence)</li>
                <li>✓ AAP (American Academy of Pediatrics)</li>
                <li>✓ RCOG (Royal College of Obstetricians and Gynaecologists)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Content Updates</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                We keep our content current and accurate:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ Articles show publication and update dates</li>
                <li>✓ Medical guidelines are reviewed quarterly</li>
                <li>✓ Outdated content is updated or removed</li>
                <li>✓ Reader corrections are welcomed and credited</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-3">Medical Disclaimer</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            The content on PregnancySprout is for informational and educational purposes only. It is not a
            substitute for professional medical advice, diagnosis, or treatment. Always seek the advice
            of your GP, midwife, obstetrician, or other qualified healthcare professional regarding any
            questions about your pregnancy, health, or your baby&apos;s health. Never disregard professional
            medical advice or delay seeking it because of something you have read on this site.
          </p>
        </div>

      </div>
    </div>
  );
}
