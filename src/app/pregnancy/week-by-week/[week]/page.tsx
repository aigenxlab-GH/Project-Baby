import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle, Baby } from 'lucide-react';
import { getWeekData, getAllWeeks } from '@/lib/pregnancy-data';
import { siteConfig } from '@/config/site';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { InContentAd } from '@/components/ads/InContentAd';
import { SidebarAd } from '@/components/ads/SidebarAd';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { InlineNewsletter } from '@/components/shared/InlineNewsletter';

// Beautiful trimester-specific images
const trimesterImages = {
  1: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=900&q=85&auto=format&fit=crop',
  2: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85&auto=format&fit=crop',
  3: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=85&auto=format&fit=crop',
} as const;

interface Props {
  params: Promise<{ week: string }>;
}

export async function generateStaticParams() {
  const weeks = getAllWeeks();
  return weeks.map((w) => ({ week: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { week: weekSlug } = await params;
  const weekNum = parseInt(weekSlug.replace('week-', ''), 10);
  const data = getWeekData(weekNum);
  if (!data) return {};

  const title = `${weekNum} Weeks Pregnant — Baby Development & Symptoms`;
  const description = `What happens at ${weekNum} weeks pregnant? Baby is the size of ${data.babySize.comparison}. Learn about baby development, symptoms, and tips for week ${weekNum}.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/pregnancy/week-by-week/week-${weekNum}` },
    openGraph: { title, description, type: 'article' },
  };
}

export default async function WeekPage({ params }: Props) {
  const { week: weekSlug } = await params;
  const weekNum = parseInt(weekSlug.replace('week-', ''), 10);

  if (isNaN(weekNum) || weekNum < 1 || weekNum > 40) notFound();

  const data = getWeekData(weekNum);
  if (!data) notFound();

  const prevWeek = weekNum > 1 ? weekNum - 1 : null;
  const nextWeek = weekNum < 40 ? weekNum + 1 : null;
  const trimesterLabel = data.trimester === 1 ? 'First' : data.trimester === 2 ? 'Second' : 'Third';

  const emoji = weekNum <= 4 ? '🌱' : weekNum <= 8 ? '🫘' : weekNum <= 13 ? '🍋' : weekNum <= 20 ? '🥑' : weekNum <= 28 ? '🌽' : weekNum <= 35 ? '🍍' : '👶';

  return (
    <div>
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Pregnancy', href: '/pregnancy' },
        { name: 'Week by Week', href: '/pregnancy/week-by-week' },
        { name: `Week ${weekNum}`, href: `/pregnancy/week-by-week/week-${weekNum}` },
      ]} />
      <ArticleJsonLd
        title={`${weekNum} Weeks Pregnant`}
        description={`Baby development and symptoms at ${weekNum} weeks pregnant`}
        publishedAt="2026-01-01"
        author={siteConfig.name}
        image="/og-default.jpg"
        url={`/pregnancy/week-by-week/week-${weekNum}`}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="container mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/pregnancy" className="hover:text-brand-600">Pregnancy</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/pregnancy/week-by-week" className="hover:text-brand-600">Week by Week</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium">Week {weekNum}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
          {/* Main Content */}
          <article>
            {/* Header with Image */}
            <div className="rounded-3xl overflow-hidden mb-10 relative">
              {/* Background image */}
              <div className="relative h-56 md:h-72">
                <Image
                  src={trimesterImages[data.trimester]}
                  alt={`${weekNum} weeks pregnant`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-medium text-white/80 uppercase tracking-widest mb-1">
                    {trimesterLabel} Trimester · Week {weekNum} of 40
                  </p>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold">
                    {weekNum} Weeks Pregnant
                  </h1>
                </div>
              </div>
              {/* Stats bar */}
              <div className="bg-gradient-to-br from-brand-50 to-pink-50 border border-brand-100 rounded-b-3xl p-6">
                <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-4">
                  <div className="text-center">
                    <p className="text-3xl mb-1">{emoji}</p>
                    <p className="font-medium text-gray-700">Size of {data.babySize.comparison}</p>
                  </div>
                  {data.babySize.lengthCm > 0 && (
                    <div className="text-center">
                      <p className="font-bold text-2xl text-gray-900">{data.babySize.lengthCm} cm</p>
                      <p>Length</p>
                    </div>
                  )}
                  {data.babySize.weightGrams > 0 && (
                    <div className="text-center">
                      <p className="font-bold text-2xl text-gray-900">{data.babySize.weightGrams}g</p>
                      <p>Weight</p>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-bold text-2xl text-gray-900">{data.trimester}</p>
                    <p>Trimester</p>
                  </div>
                </div>
                {data.keyMilestone && (
                  <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 text-sm font-medium text-brand-700 shadow-sm border border-brand-100">
                      <Baby className="h-4 w-4" />
                      Milestone: {data.keyMilestone}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Week 1</span>
                <span className="font-medium text-brand-600">Week {weekNum} ({Math.round((weekNum / 40) * 100)}%)</span>
                <span>Week 40</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={weekNum}
                aria-valuemin={1}
                aria-valuemax={40}
                aria-label={`Pregnancy progress: week ${weekNum} of 40`}
                className="w-full bg-gray-100 rounded-full h-3"
              >
                <div
                  className="bg-gradient-to-r from-brand-400 to-brand-600 h-3 rounded-full transition-all"
                  style={{ width: `${(weekNum / 40) * 100}%` }}
                />
              </div>
            </div>

            {/* Medical disclaimer */}
            <MedicalDisclaimer variant="inline" />

            <InContentAd />

            {/* Baby Development */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Baby className="h-6 w-6 text-brand-500" />
                Baby Development at {weekNum} Weeks
              </h2>
              <ul className="space-y-3">
                {data.babyDevelopment.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-brand-50 rounded-xl px-4 py-3">
                    <CheckCircle className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Mom Symptoms */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5">
                Symptoms at {weekNum} Weeks Pregnant
              </h2>
              <ul className="space-y-3">
                {data.momSymptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </section>

            <InContentAd />

            {/* Tips */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5">
                Tips for Week {weekNum}
              </h2>
              <ul className="space-y-3">
                {data.momTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 bg-green-50 rounded-xl px-4 py-3">
                    <span className="text-green-500 font-bold flex-shrink-0">{i + 1}.</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Checklist */}
            {data.checklistItems && data.checklistItems.length > 0 && (
              <section className="mb-10 bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
                  Week {weekNum} Checklist
                </h2>
                <ul className="space-y-2">
                  {data.checklistItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Newsletter CTA */}
            <InlineNewsletter
              headline={nextWeek ? `Get updates for Week ${nextWeek}` : 'Congratulations — Week 40!'}
              subtext={nextWeek
                ? `Weekly pregnancy tips delivered to your inbox — plus a free Birth Plan template.`
                : 'Get postpartum recovery tips and newborn care guides delivered free.'}
            />

            {/* Prev / Next Navigation */}
            <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
              {prevWeek ? (
                <Link
                  href={`/pregnancy/week-by-week/week-${prevWeek}`}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:text-brand-600 transition-colors text-sm font-medium"
                >
                  <ChevronLeft className="h-4 w-4" /> Week {prevWeek}
                </Link>
              ) : <div />}
              {nextWeek ? (
                <Link
                  href={`/pregnancy/week-by-week/week-${nextWeek}`}
                  className="flex items-center gap-2 px-5 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium"
                >
                  Week {nextWeek} <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/tools/due-date-calculator"
                  className="flex items-center gap-2 px-5 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium"
                >
                  Due Date Calculator <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>

          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <SidebarAd />
            <div className="mt-8 bg-gray-50 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Jump to a Week</h3>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
                  <Link
                    key={w}
                    href={`/pregnancy/week-by-week/week-${w}`}
                    className={`text-center py-1.5 rounded-lg text-sm font-medium transition-colors
                      ${w === weekNum
                        ? 'bg-brand-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-600 border border-gray-100'
                      }`}
                  >
                    {w}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
