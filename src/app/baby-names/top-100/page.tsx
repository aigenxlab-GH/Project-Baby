import type { Metadata } from 'next';
import { CURRENT_YEAR } from '@/config/year';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';
import { ChevronRight } from 'lucide-react';
import { getTopNames, getStatsMeta } from '@/lib/name-stats';
import { getNameBySlug } from '@/lib/baby-names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `Top 100 Baby Names ${CURRENT_YEAR} — Most Popular Names for Boys & Girls`,
  description: `The 100 most popular baby names — 50 girls and 50 boys — ranked by official US Social Security Administration birth data, with meanings, origins and five-year trends.`,
  alternates: { canonical: `${siteConfig.url}/baby-names/top-100` },
};

/**
 * Rows are derived, never typed by hand.
 *
 * This page previously carried a hand-written ranking while telling readers it
 * came from SSA and ONS birth-certificate data. It had drifted badly — Charlotte
 * was listed at #8 against an actual SSA rank of #2, Mason at #9 against #36 —
 * and there is no ONS data anywhere in this project. `rank` below is the SSA's
 * own national rank for the latest year; meaning and origin come from
 * baby-names.json. One source of truth for each field.
 *
 * Note the ranks are not contiguous: a handful of names in the national top 100
 * have no page on this site, so their ranks are absent rather than invented. The
 * intro copy says so plainly.
 */
type Row = {
  rank: number;
  name: string;
  slug: string;
  origin: string;
  meaning: string;
  trend: string;
};

const TREND_LABEL: Record<string, string> = {
  rising: '↑ Rising',
  falling: '↓ Falling',
  stable: '→ Stable',
  unknown: '—',
};

function buildRows(sex: 'F' | 'M', limit: number): Row[] {
  return getTopNames(sex, limit).map((t) => {
    const entry = getNameBySlug(t.slug);
    return {
      rank: t.rank,
      name: t.name,
      slug: t.slug,
      origin: entry?.origin?.join(', ') ?? '—',
      meaning: entry?.meaning ?? '',
      trend: TREND_LABEL[t.trend] ?? '—',
    };
  });
}

const topGirlNames = buildRows('F', 50);
const topBoyNames = buildRows('M', 50);
const SSA_YEAR = getStatsMeta().latestYear;

// Prose below cites specific names as rising or falling. Those used to be
// hand-picked and had gone stale against the data on the site's own name pages —
// Victoria was called "rising steadily" while its rank fell #34 -> #54, Luna was
// "gaining traction" while falling #14 -> #27, Harper "climbed" while falling
// #10 -> #16. A reader clicking through would have seen the opposite chart.
// Derive the examples instead so prose and charts cannot disagree.
const movers = getTopNames('F', 200)
  .concat(getTopNames('M', 200))
  .filter((t) => t.rank <= 100 && t.gain != null);
// Sorted by the size of the move, because the copy says "fastest" and
// "furthest". Sorting by current rank would have made those words untrue.
const RISING = movers
  .filter((m) => m.trend === 'rising')
  .sort((a, b) => (b.gain ?? 0) - (a.gain ?? 0))
  .map((m) => m.name);
const FALLING = movers
  .filter((m) => m.trend === 'falling')
  .sort((a, b) => (a.gain ?? 0) - (b.gain ?? 0))
  .map((m) => m.name);
const list = (arr: string[], n: number) => arr.slice(0, n).join(', ');
const TOP3_GIRLS = list(topGirlNames.map((r) => r.name), 3);
const TOP3_BOYS = list(topBoyNames.map((r) => r.name), 3);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `What are the most popular baby names in ${CURRENT_YEAR}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `In the SSA's ${SSA_YEAR} birth data — the most recent year published — the top names are ${TOP3_GIRLS} for girls and ${TOP3_BOYS} for boys.`
      }
    },
    {
      '@type': 'Question',
      name: 'Why are certain names becoming more popular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Naming trends are influenced by celebrity culture, the cultural background of parents, media exposure, and cyclical revivals of classic names. Measured against the last five years of SSA data, the names climbing fastest inside the top 100 are ${list(RISING, 4)}.`
      }
    },
    {
      '@type': 'Question',
      name: 'Should I choose a popular name for my baby?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your preference. Popular names are familiar and easy to spell, but your child may share it with classmates. Unique names stand out but may require spelling corrections. Consider what matters most to your family.'
      }
    },
  ],
};

export default function Top100BabyNamesPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Baby Names', href: '/baby-names' },
        { name: 'Top 100', href: '/baby-names/top-100' }
      ]} />
      <div className="container mx-auto max-w-4xl px-4 pt-6 pb-12">
        <Breadcrumb items={[
          { name: 'Baby Names', href: '/baby-names' },
          { name: 'Top 100', href: '/baby-names/top-100' }
        ]} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Top 100 Baby Names {CURRENT_YEAR}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            The 100 most popular baby names — 50 girls and 50 boys — ranked by US Social Security Administration birth-certificate data for {SSA_YEAR}, the most recent year published.
          </p>
          <Link
            href="/baby-names"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            Search all 1,100+ baby names <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Intro Section */}
        <section className="mb-12 space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Baby naming trends tell a story about culture, values, and what parents hope for their children. In {CURRENT_YEAR}, the trend continues toward classic, timeless names—alongside a growing appreciation for names that work across cultures and languages.
          </p>
          <p>
            Every rank on this page is the name&apos;s official position in the US Social Security Administration&apos;s {SSA_YEAR} birth-certificate data, which is public domain. Rank numbers skip where a name in the national top 100 does not yet have a page on this site — those positions are left out rather than filled in. Trends are calculated from each name&apos;s own rank movement over the last five years of that data.
          </p>
        </section>

        <InContentAd />

        {/* Top Girl Names */}
        <section className="mb-14">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Top 50 Baby Girl Names ({SSA_YEAR} SSA data)
          </h2>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-2xl overflow-hidden border border-pink-100 dark:border-pink-900">
            <div className="grid grid-cols-12 gap-3 p-4 bg-pink-100 dark:bg-pink-950 font-semibold text-sm text-pink-900 dark:text-pink-200">
              <div className="col-span-2">#</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Origin</div>
              <div className="col-span-3">Trend</div>
            </div>
            <div className="divide-y divide-pink-100 dark:divide-pink-900">
              {topGirlNames.map((name) => (
                <div key={name.rank} className="grid grid-cols-12 gap-3 p-4 items-center hover:bg-pink-50 dark:hover:bg-pink-950/50 transition-colors">
                  <div className="col-span-2 font-bold text-pink-600 dark:text-pink-400">{name.rank}</div>
                  <div className="col-span-4">
                    <Link
                      href={`/baby-names/${name.slug}`}
                      className="font-semibold text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      {name.name}
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{name.meaning}</p>
                  </div>
                  <div className="col-span-3 text-sm text-gray-600 dark:text-gray-400">{name.origin}</div>
                  <div className="col-span-3 text-sm font-medium text-gray-700 dark:text-gray-300">{name.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InContentAd />

        {/* Top Boy Names */}
        <section className="mb-14">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Top 50 Baby Boy Names ({SSA_YEAR} SSA data)
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl overflow-hidden border border-blue-100 dark:border-blue-900">
            <div className="grid grid-cols-12 gap-3 p-4 bg-blue-100 dark:bg-blue-950 font-semibold text-sm text-blue-900 dark:text-blue-200">
              <div className="col-span-2">#</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Origin</div>
              <div className="col-span-3">Trend</div>
            </div>
            <div className="divide-y divide-blue-100 dark:divide-blue-900">
              {topBoyNames.map((name) => (
                <div key={name.rank} className="grid grid-cols-12 gap-3 p-4 items-center hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors">
                  <div className="col-span-2 font-bold text-blue-600 dark:text-blue-400">{name.rank}</div>
                  <div className="col-span-4">
                    <Link
                      href={`/baby-names/${name.slug}`}
                      className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {name.name}
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{name.meaning}</p>
                  </div>
                  <div className="col-span-3 text-sm text-gray-600 dark:text-gray-400">{name.origin}</div>
                  <div className="col-span-3 text-sm font-medium text-gray-700 dark:text-gray-300">{name.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Naming Trends Analysis */}
        <section className="mb-14 space-y-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Key Naming Trends in {CURRENT_YEAR}
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Vintage Revival Continues</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Measured over the last five years of SSA data, these names are climbing fastest inside the top 100: {list(RISING, 5)}. Vintage does not mean outdated — these names offer sophistication and longevity.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Nature-Inspired Names Growing</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Movement runs both ways. Over the same five years these top-100 names lost the most ground: {list(FALLING, 5)}. A name peaking is often the start of its decline.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. International Names Gaining Ground</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Names like Aria, Layla, and Sebastian reflect increasing cultural diversity. Parents are choosing names that represent their heritage or simply names that travel well globally.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">4. Short, Simple Names Preferred</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Liam, Mia, Ava, and Ella dominate because they are easy to spell, pronounce, and fit on forms. In an increasingly global world, simplicity is practical.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">5. Biblical Names Show Strength</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Names like Elijah, Benjamin, Samuel, and Asher remain consistently popular, combining traditional values with meaningful origins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                q: 'What makes a name "popular"?',
                a: `A popular name is one that appears frequently on birth certificates in a given year. The rankings on this page come from the US Social Security Administration, which publishes national counts annually; the latest year available is ${SSA_YEAR}. Names rise and fall with cultural shifts, media influence and generational preferences.`
              },
              {
                q: 'Should I choose a popular name?',
                a: 'This is a personal choice. Popular names are familiar and easy to spell, but your child may share it with classmates. Unique names help your child stand out but might require constant spelling corrections. Consider what matters most: familiarity, uniqueness, or meaning.'
              },
              {
                q: 'How quickly do naming trends change?',
                a: `Trends vary. Some names hold the top spots for years — Liam and Olivia have both led their rankings for a decade. Others move fast in either direction: over the last five years of SSA data, ${list(RISING, 3)} climbed hardest inside the top 100, while ${list(FALLING, 3)} fell furthest. Trend-driven names, often tied to pop culture, can peak and decline within a single generation.`
              },
              {
                q: 'What if I want a unique name but also practical?',
                a: 'Look for names that are less common than the top 50 but still recognizable and easy to spell. Many names in the 50–150 range offer this balance: known enough to not cause constant corrections, distinctive enough to feel special.'
              },
            ].map(({ q, a }) => (
              <details key={q} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between gap-4">
                  {q}
                  <span className="text-brand-500 font-bold text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-8 border border-purple-100 dark:border-purple-900 text-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Explore All 1,100+ Baby Names
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Not finding what you're looking for in the top 100? Our full baby names database lets you search by origin, meaning, starting letter, and more.
          </p>
          <Link
            href="/baby-names"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full transition-colors"
          >
            Browse All Names <ChevronRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
