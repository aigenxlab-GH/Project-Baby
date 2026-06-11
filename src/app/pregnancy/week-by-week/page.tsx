import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllWeeks } from '@/lib/pregnancy-data';
import { siteConfig } from '@/config/site';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Pregnancy Week by Week — Your Complete Guide',
  description: 'Follow your pregnancy journey with our detailed week-by-week guides covering baby development, symptoms, and tips for all 40 weeks.',
  alternates: { canonical: `${siteConfig.url}/pregnancy/week-by-week` },
};

const trimesterInfo = [
  { num: 1, label: 'First Trimester', weeks: '1–13', desc: 'From conception through the first 13 weeks — all major organs form and morning sickness is common.', color: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900' },
  { num: 2, label: 'Second Trimester', weeks: '14–27', desc: 'The "golden trimester" — nausea fades, you\'ll feel baby move, and energy returns.', color: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900' },
  { num: 3, label: 'Third Trimester', weeks: '28–40', desc: 'Baby gains weight rapidly and prepares for birth. Prepare your hospital bag and birth plan!', color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900' },
];

export default function WeekByWeekPage() {
  const weeks = getAllWeeks();
  const byTrimester = [1, 2, 3].map((t) => weeks.filter((w) => w.trimester === t));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Pregnancy', href: '/pregnancy' }, { name: 'Week by Week', href: '/pregnancy/week-by-week' }]} />
      <Breadcrumb items={[{ name: 'Pregnancy', href: '/pregnancy' }, { name: 'Week by Week', href: '/pregnancy/week-by-week' }]} />
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Pregnancy Week by Week
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Detailed guides for all 40 weeks of pregnancy — baby development, symptoms,
          what to expect, and expert tips.
        </p>
      </div>

      {/* Trimester overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {trimesterInfo.map((t) => (
          <div key={t.num} className={`rounded-2xl border p-6 ${t.color}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Trimester {t.num}</p>
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-1">{t.label}</h2>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Weeks {t.weeks}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Weeks by trimester */}
      {byTrimester.map((trimesterWeeks, idx) => (
        <div key={idx} className="mb-14">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {trimesterInfo[idx].label} — Weeks {trimesterInfo[idx].weeks}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
            {trimesterWeeks.map((week) => (
              <Link
                key={week.week}
                href={`/pregnancy/week-by-week/${week.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 text-center hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all"
              >
                <p className="font-bold text-brand-600 dark:text-brand-400 text-xl mb-1">W{week.week}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {week.babySize.comparison}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
