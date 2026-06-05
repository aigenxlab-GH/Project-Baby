import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import { getAllWeeks } from '@/lib/pregnancy-data';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { WebSiteJsonLd } from '@/components/seo/WebSiteJsonLd';
import {
  Baby, Calculator, Timer, List, Search,
  ChevronRight, Heart, BookOpen
} from 'lucide-react';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    'Free pregnancy week-by-week guides (weeks 1–40), 1,188+ baby names with meanings, honest product reviews, and pregnancy tools including due date calculator, ovulation calculator & contraction timer.',
};

const tools = [
  { title: 'Due Date Calculator', desc: "Find your baby's due date instantly", href: '/tools/due-date-calculator', icon: Calculator, color: 'bg-pink-50 text-pink-600' },
  { title: 'Ovulation Calculator', desc: 'Track your fertile window', href: '/tools/ovulation-calculator', icon: Heart, color: 'bg-purple-50 text-purple-600' },
  { title: 'Contraction Timer', desc: 'Time contractions during labour', href: '/tools/contraction-timer', icon: Timer, color: 'bg-blue-50 text-blue-600' },
  { title: 'Baby Name Generator', desc: 'Find the perfect name', href: '/tools/baby-name-generator', icon: Search, color: 'bg-green-50 text-green-600' },
  { title: 'Registry Checklist', desc: 'Everything you need for baby', href: '/tools/registry-checklist', icon: List, color: 'bg-amber-50 text-amber-600' },
  { title: 'Symptom Checker', desc: 'Is this normal in pregnancy?', href: '/tools/symptom-checker', icon: BookOpen, color: 'bg-teal-50 text-teal-600' },
];

const featuredWeeks = [8, 12, 20, 28, 36, 40];

const categories = [
  { title: 'Pregnancy', desc: 'Week-by-week guides and tips', href: '/pregnancy', emoji: '🤰', color: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', border: 'hover:border-pink-300', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80&auto=format&fit=crop' },
  { title: 'Baby Names', desc: 'Search baby names with meanings and origins', href: '/baby-names', emoji: '✨', color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', border: 'hover:border-purple-300', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80&auto=format&fit=crop' },
  { title: 'Product Reviews', desc: 'Honest reviews for every budget', href: '/products', emoji: '⭐', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', border: 'hover:border-amber-300', img: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&q=80&auto=format&fit=crop' },
  { title: 'Parenting Tips', desc: 'Expert advice for new parents', href: '/parenting', emoji: '💡', color: 'from-teal-500 to-green-500', bg: 'bg-teal-50', border: 'hover:border-teal-300', img: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&q=80&auto=format&fit=crop' },
];

export default function HomePage() {
  const weeks = getAllWeeks();
  const highlighted = weeks.filter((w) => featuredWeeks.includes(w.week));

  return (
    <div>
      <WebSiteJsonLd />
      <HeaderAd />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 py-10 px-4">
        {/* Background decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-purple-100 rounded-full opacity-40 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative">
          {/* Mobile hero image — shows only on small screens */}
          <div className="md:hidden relative h-44 rounded-2xl overflow-hidden mb-5">
            <Image
              src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85&auto=format&fit=crop"
              alt="Happy pregnant mother holding her belly"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-700 rounded-full px-3 py-1 text-xs font-semibold mb-4 shadow-sm">
                <Baby className="h-3 w-3" aria-hidden="true" />
                Your trusted pregnancy &amp; baby resource
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Your Complete<br />
                <span className="bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent">
                  Pregnancy &amp; Baby
                </span>{' '}Guide
              </h1>
              <p className="text-sm text-gray-600 max-w-md mb-6 leading-relaxed">
                Week-by-week pregnancy guides, 1,188+ baby names, honest product reviews,
                and free tools — everything you need for your journey to parenthood.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href="/tools/due-date-calculator"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Calculator className="h-4 w-4" />
                  Calculate Due Date
                </Link>
                <Link
                  href="/pregnancy/week-by-week"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full text-sm border border-gray-200 hover:border-brand-300 transition-all hover:-translate-y-0.5"
                >
                  Week by Week Guide
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span aria-hidden="true">✅</span> Free forever</span>
                <span className="flex items-center gap-1"><span aria-hidden="true">✅</span> 72 expert guides</span>
                <span className="flex items-center gap-1"><span aria-hidden="true">✅</span> 1,188+ baby names</span>
              </div>
            </div>
            {/* Hero Image — visible from md up */}
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85&auto=format&fit=crop"
                  alt="Happy pregnant mother holding her belly"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0px, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-lg" aria-hidden="true">🌱</div>
                <div>
                  <p className="font-bold text-gray-900 text-xs">Week by Week</p>
                  <p className="text-[11px] text-gray-500">40 detailed guides</p>
                </div>
              </div>
              {/* Floating badge 2 */}
              <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-pink-100 rounded-lg flex items-center justify-center text-lg" aria-hidden="true">👶</div>
                <div>
                  <p className="font-bold text-gray-900 text-xs">Baby Names</p>
                  <p className="text-[11px] text-gray-500">Meanings &amp; origins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-7">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 ${cat.border} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="relative h-36 overflow-hidden rounded-t-2xl">
                  <Image
                    src={cat.img}
                    alt={`${cat.title} — ${cat.desc}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 24vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-3xl drop-shadow-sm" aria-hidden="true">{cat.emoji}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-bold text-gray-900 mb-1">{cat.title}</h3>
                  <p className="text-gray-500 text-xs mb-3 leading-relaxed">{cat.desc}</p>
                  <div className="text-brand-600 text-xs font-semibold flex items-center gap-1">
                    Explore <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-7">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Free Pregnancy Tools</h2>
            <p className="text-gray-500 text-sm">Helpful calculators and trackers for your pregnancy journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all"
              >
                <div className={`p-3 rounded-xl ${tool.color} flex-shrink-0`}>
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">{tool.desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-brand-400 ml-auto flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Week by Week Preview */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Pregnancy Week by Week</h2>
            <Link href="/pregnancy/week-by-week" className="text-brand-600 hover:underline text-sm font-medium flex items-center gap-1">
              View all 40 weeks <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlighted.map((week) => (
              <Link
                key={week.week}
                href={`/pregnancy/week-by-week/${week.slug}`}
                className="group bg-gradient-to-br from-brand-50 to-pink-50 rounded-2xl p-4 text-center border border-brand-100 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-1.5" aria-hidden="true">
                  {week.week <= 13 ? '🌱' : week.week <= 27 ? '🥑' : '👶'}
                </div>
                <p className="font-bold text-brand-700 text-base">Week {week.week}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  Size of {week.babySize.comparison}
                </p>
                {week.keyMilestone && (
                  <p className="text-xs text-brand-600 mt-2 font-medium line-clamp-2">
                    {week.keyMilestone}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Baby Names CTA */}
      <section className="py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-3xl mb-3" aria-hidden="true">✨</div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
            Find the Perfect Baby Name
          </h2>
          <p className="text-gray-600 text-sm mb-6 max-w-xl mx-auto">
            Browse our collection of baby names with meanings, origins, and popularity trends.
            Filter by gender, origin, starting letter, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/baby-names?gender=girl" className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-full transition-colors">
              Girl Names
            </Link>
            <Link href="/baby-names?gender=boy" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-colors">
              Boy Names
            </Link>
            <Link href="/baby-names?gender=neutral" className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-full transition-colors">
              Gender Neutral
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
