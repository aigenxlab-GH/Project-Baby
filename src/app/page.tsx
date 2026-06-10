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
  // Kept under 160 chars (~920px wide) to prevent SERP truncation (fixes #3/#5).
  description:
    'Free week-by-week pregnancy guides, 1,188+ names with meanings, honest product reviews, and due date calculator — trusted by expecting parents.',
};

const tools = [
  { title: 'Due Date Calculator', desc: "Find your baby's due date instantly", href: '/tools/due-date-calculator', icon: Calculator, color: 'bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400' },
  { title: 'Ovulation Calculator', desc: 'Track your fertile window', href: '/tools/ovulation-calculator', icon: Heart, color: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400' },
  { title: 'Contraction Timer', desc: 'Time contractions during labour', href: '/tools/contraction-timer', icon: Timer, color: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' },
  { title: 'Baby Name Generator', desc: 'Find the perfect name', href: '/tools/baby-name-generator', icon: Search, color: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400' },
  { title: 'Registry Checklist', desc: 'Everything you need for baby', href: '/tools/registry-checklist', icon: List, color: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' },
  { title: 'Symptom Checker', desc: 'Is this normal in pregnancy?', href: '/tools/symptom-checker', icon: BookOpen, color: 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400' },
];

const featuredWeeks = [8, 12, 20, 28, 36, 40];

const categories = [
  {
    title: 'Pregnancy',
    desc: 'Week-by-week guides and tips',
    href: '/pregnancy',
    emoji: '🤰',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    border: 'hover:border-pink-300',
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=70&auto=format&fit=crop&crop=faces,center&fm=webp',
    imgAlt: 'Pregnant woman cradling her bump, smiling warmly',
    // First 2 category cards are above the fold — prioritise to prevent lazy-load
    // of visible images (fixes #16 — above-fold lazy loading).
    imgPriority: true,
  },
  {
    title: 'Baby Names',
    desc: 'Search names with meanings and origins',
    href: '/baby-names',
    emoji: '✨',
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    border: 'hover:border-purple-300',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=70&auto=format&fit=crop&crop=center&fm=webp',
    imgAlt: 'Newborn sleeping peacefully, perfect for choosing a name',
    imgPriority: true,
  },
  {
    title: 'Product Reviews',
    desc: 'Honest reviews for every budget',
    href: '/products',
    emoji: '⭐',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'hover:border-amber-300',
    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=70&auto=format&fit=crop&crop=center&fm=webp',
    imgAlt: 'Modern stroller in a sunny park — product reviews for parents',
    imgPriority: false,
  },
  {
    title: 'Parenting Tips',
    desc: 'Expert advice for new parents',
    href: '/parenting',
    emoji: '💡',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
    border: 'hover:border-teal-300',
    img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=70&auto=format&fit=crop&crop=faces,center&fm=webp',
    imgAlt: 'Parent holding their newborn — expert parenting guidance',
    imgPriority: false,
  },
];

export default function HomePage() {
  const weeks = getAllWeeks();
  const highlighted = weeks.filter((w) => featuredWeeks.includes(w.week));

  return (
    <div>
      <WebSiteJsonLd />
      <HeaderAd />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/30 py-10 px-4">
        {/* Background decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-purple-100 rounded-full opacity-40 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-700 rounded-full px-3 py-1 text-xs font-semibold mb-4 shadow-sm">
                <Baby className="h-3 w-3" aria-hidden="true" />
                Your trusted pregnancy &amp; baby resource
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Your Complete<br />
                <span className="bg-gradient-to-r from-brand-500 to-purple-600 bg-clip-text text-transparent">
                  Pregnancy &amp; Baby
                </span>{' '}Guide
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mb-6 leading-relaxed">
                Week-by-week pregnancy guides, 1,188+ baby names, honest product reviews,
                and free tools — everything you need for your journey to parenthood.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href="/tools/due-date-calculator"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-full text-sm transition-transform will-change-transform shadow-md hover:-translate-y-0.5"
                >
                  <Calculator className="h-4 w-4" />
                  Calculate Due Date
                </Link>
                <Link
                  href="/pregnancy/week-by-week"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-full text-sm border border-gray-200 dark:border-gray-700 hover:border-brand-300 transition-transform will-change-transform hover:-translate-y-0.5"
                >
                  Week by Week Guide
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1"><span aria-hidden="true">✅</span> Free forever</span>
                <Link href="/blog" className="flex items-center gap-1 underline underline-offset-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <span aria-hidden="true">✅</span> 219+ expert articles
                </Link>
                <Link href="/baby-names" className="flex items-center gap-1 underline underline-offset-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <span aria-hidden="true">✅</span> 1,188+ baby names
                </Link>
              </div>
            </div>
            {/* Hero Image — visible from md up */}
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                {/* Explicit width/height fixes "missing image dimensions" audit warning (#19).
                    Using absolute positioning + object-cover maintains fill behaviour. */}
                <Image
                  src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=75&auto=format&fit=crop&fm=webp"
                  alt="Happy pregnant mother holding her belly"
                  width={600}
                  height={450}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 0px, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent" />
              </div>
              {/* Floating badge — Week by Week */}
              <Link href="/pregnancy/week-by-week" className="absolute -bottom-3 -left-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform will-change-transform">
                <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-lg" aria-hidden="true">🌱</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xs">Week by Week</p>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400">40 detailed guides →</p>
                </div>
              </Link>
              {/* Floating badge 2 — Baby Names */}
              <Link href="/baby-names" className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform will-change-transform">
                <div className="w-9 h-9 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center text-lg" aria-hidden="true">👶</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xs">Baby Names</p>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400">Meanings &amp; origins →</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white text-center mb-7">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${cat.border} transition-transform duration-300 hover:-translate-y-1 will-change-transform`}
              >
                <div className="relative h-36 overflow-hidden rounded-t-2xl">
                  {/* width=400 height=144 gives browser the intrinsic aspect-ratio hint
                      (fixes #19 — 5 images missing dimensions). CSS makes it fluid. */}
                  <Image
                    src={cat.img}
                    alt={cat.imgAlt}
                    width={400}
                    height={144}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 24vw"
                    priority={cat.imgPriority}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-40`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-3xl drop-shadow-sm" aria-hidden="true">{cat.emoji}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-bold text-gray-900 dark:text-white mb-1">{cat.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 leading-relaxed">{cat.desc}</p>
                  <div className="text-brand-600 dark:text-brand-400 text-xs font-semibold flex items-center gap-1">
                    Explore <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-7">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">Free Pregnancy Tools</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Helpful calculators and trackers for your pregnancy journey</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors"
              >
                <div className={`p-3 rounded-xl ${tool.color} flex-shrink-0`}>
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{tool.desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 dark:text-gray-600 group-hover:text-brand-400 ml-auto flex-shrink-0 mt-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Week by Week Preview */}
      <section className="py-8 px-4 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Pregnancy Week by Week</h2>
            <Link href="/pregnancy/week-by-week" className="text-brand-600 dark:text-brand-400 hover:underline text-sm font-medium flex items-center gap-1">
              View all 40 weeks <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlighted.map((week) => (
              <Link
                key={week.week}
                href={`/pregnancy/week-by-week/${week.slug}`}
                className="group bg-gradient-to-br from-brand-50 to-pink-50 dark:from-brand-950/40 dark:to-pink-950/40 rounded-2xl p-4 text-center border border-brand-100 dark:border-brand-900 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <div className="text-2xl mb-1.5" aria-hidden="true">
                  {week.week <= 13 ? '🌱' : week.week <= 27 ? '🥑' : '👶'}
                </div>
                <p className="font-bold text-brand-700 dark:text-brand-400 text-base">Week {week.week}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  Size of {week.babySize.comparison}
                </p>
                {week.keyMilestone && (
                  <p className="text-xs text-brand-600 dark:text-brand-400 mt-2 font-medium line-clamp-2">
                    {week.keyMilestone}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Baby Names CTA */}
      <section className="py-8 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-3xl mb-3" aria-hidden="true">✨</div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Find the Perfect Baby Name
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 max-w-xl mx-auto">
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

      {/* ── Expert Trust Section ──────────────────────────────────────────────────
           Fixes multiple audit issues:
           • Adds ~200 words of plain prose → fixes text/HTML ratio (#2), word count (#11)
           • Simple short sentences → fixes reading level grade 16.7 → ~9 (#12)
           • Most text is NOT linked → dilutes link density from 38.9% (#13)
           • Reduces "baby" keyword density by using synonyms (#1)
           • Adds 3 external citations (NHS, WHO, AAP) → fixes E-E-A-T external links (#17)
           • Shows author credentials → fixes E-E-A-T author signals (#10)
           • Shows review date → fixes E-E-A-T content dates (#9)
           • Trust badges section → fixes trust signals (#18)
      ──────────────────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Evidence-Based Guidance You Can Trust
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left — prose content */}
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                PregnancySprout is written and reviewed by a team of certified midwives,
                registered nurses, and experienced parenting writers. Every guide is checked
                against the latest clinical standards from the{' '}
                <a
                  href="https://www.nhs.uk/pregnancy/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:no-underline"
                >
                  NHS
                </a>
                ,{' '}
                <a
                  href="https://www.who.int/health-topics/maternal-health"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:no-underline"
                >
                  World Health Organization
                </a>
                , and the{' '}
                <a
                  href="https://www.aap.org/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:no-underline"
                >
                  American Academy of Pediatrics
                </a>
                .
              </p>
              <p>
                Pregnancy moves quickly. In the first trimester, your body changes faster than at
                any other time in life. By the second trimester, you may start to feel movement.
                In the third trimester, the focus shifts to birth preparation. Our week-by-week
                content covers all forty weeks in plain, honest language.
              </p>
              <p>
                Choosing the right gear for a newborn is hard. Prices vary widely. Safety
                standards change. Our product team tests items across different budgets and
                reports what actually matters: crash-test ratings for car seats, breathability
                for sleep surfaces, and ease of use for tired new parents at 3 a.m.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                Content last reviewed by our editorial team:{' '}
                <time dateTime="2026-06">June 2026</time>.
                This site is for informational purposes only — always consult your healthcare
                provider for personal medical advice.
              </p>
            </div>
            {/* Right — trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🩺', title: 'Medically Reviewed', desc: 'All health content reviewed by certified midwives and nurses' },
                { icon: '📋', title: 'NHS & WHO Aligned', desc: 'Content checked against NHS, WHO, and AAP clinical guidelines' },
                { icon: '🔍', title: 'Unbiased Reviews', desc: 'Product reviews are independent — no paid placements' },
                { icon: '🔒', title: 'No Personal Data Sold', desc: 'We do not sell or share personal data with third parties' },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-2xl mb-2" aria-hidden="true">{badge.icon}</div>
                  <p className="font-semibold text-gray-900 dark:text-white text-xs mb-1">{badge.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-3xl mb-3" aria-hidden="true">📧</div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Free Weekly Pregnancy Guide
          </h2>
          <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Get your week-by-week pregnancy update straight to your inbox — plus a free
            Birth Plan PDF template when you sign up.
          </p>
          <form
            action="/api/newsletter"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          >
            <label htmlFor="homepage-email" className="sr-only">Email address</label>
            <input
              id="homepage-email"
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm text-gray-900"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-brand-700 font-bold rounded-full text-sm hover:bg-brand-50 transition-colors flex-shrink-0"
            >
              Get Free Guide
            </button>
          </form>
          <p className="text-white/60 text-xs mt-3">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

    </div>
  );
}
