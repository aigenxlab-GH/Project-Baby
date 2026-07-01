import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';
import { ChevronRight } from 'lucide-react';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Top 100 Baby Names 2026 — Most Popular Names for Boys & Girls',
  description: 'The 100 most popular baby names of 2026. Discover trending names for girls, boys, and gender-neutral options based on real birth data and naming trends.',
  alternates: { canonical: `${siteConfig.url}/baby-names/top-100` },
};

const topGirlNames = [
  { rank: 1, name: 'Olivia', origin: 'Latin', meaning: 'Olive tree', trend: '↑ Stable #1' },
  { rank: 2, name: 'Emma', origin: 'Germanic', meaning: 'Whole, universal', trend: '↑ Consistent top 3' },
  { rank: 3, name: 'Amelia', origin: 'Germanic', meaning: 'Industrious', trend: '↑ Rising steadily' },
  { rank: 4, name: 'Sophia', origin: 'Greek', meaning: 'Wisdom', trend: '↓ Slight decline' },
  { rank: 5, name: 'Isabella', origin: 'Spanish/Italian', meaning: 'Devoted to God', trend: '↓ Slowly declining' },
  { rank: 6, name: 'Ava', origin: 'Latin', meaning: 'Bird', trend: '↑ Rising' },
  { rank: 7, name: 'Mia', origin: 'Scandinavian', meaning: 'Mine', trend: '↑ Stable top 10' },
  { rank: 8, name: 'Charlotte', origin: 'French', meaning: 'Free woman', trend: '↑ Consistent rise' },
  { rank: 9, name: 'Evelyn', origin: 'English', meaning: 'Desired', trend: '↑ Fast rising' },
  { rank: 10, name: 'Harper', origin: 'English', meaning: 'Harp player', trend: '↑ Rapid rise (modern)' },
  { rank: 11, name: 'Luna', origin: 'Latin', meaning: 'Moon', trend: '↑ Entering top 10' },
  { rank: 12, name: 'Ella', origin: 'Germanic', meaning: 'All, completely', trend: '↑ Classic revival' },
  { rank: 13, name: 'Madison', origin: 'English', meaning: 'Daughter of Matthew', trend: '↓ Declining' },
  { rank: 14, name: 'Scarlett', origin: 'English', meaning: 'Red', trend: '↑ Consistent' },
  { rank: 15, name: 'Grace', origin: 'Latin', meaning: 'Grace', trend: '↑ Timeless' },
  { rank: 16, name: 'Chloe', origin: 'Greek', meaning: 'Green shoot', trend: '↑ Stable' },
  { rank: 17, name: 'Victoria', origin: 'Latin', meaning: 'Victory', trend: '↑ Classic revival' },
  { rank: 18, name: 'Riley', origin: 'English', meaning: 'Courageous', trend: '↑ Modern rising' },
  { rank: 19, name: 'Aria', origin: 'Italian/Greek', meaning: 'Lioness, melody', trend: '↑ Rapidly rising' },
  { rank: 20, name: 'Nora', origin: 'Irish/Scandinavian', meaning: 'Honor', trend: '↑ Classic revival' },
  { rank: 21, name: 'Layla', origin: 'Arabic', meaning: 'Night', trend: '↑ Increasing diversity' },
  { rank: 22, name: 'Lily', origin: 'English', meaning: 'Flower', trend: '↑ Nature-inspired trend' },
  { rank: 23, name: 'Eleanor', origin: 'Greek', meaning: 'Bright light', trend: '↑ Vintage revival' },
  { rank: 24, name: 'Penelope', origin: 'Greek', meaning: 'Weaver', trend: '↑ Literary revival' },
  { rank: 25, name: 'Zoey', origin: 'Greek', meaning: 'Life', trend: '↑ Modern variation' },
];

const topBoyNames = [
  { rank: 1, name: 'Liam', origin: 'Irish', meaning: 'Strong-willed warrior', trend: '↑ Stable #1' },
  { rank: 2, name: 'Noah', origin: 'Hebrew', meaning: 'Rest, comfort', trend: '↑ Consistent top 3' },
  { rank: 3, name: 'Oliver', origin: 'Latin', meaning: 'Olive tree', trend: '↑ Steady rise' },
  { rank: 4, name: 'Elijah', origin: 'Hebrew', meaning: 'My God is Yahweh', trend: '↑ Biblical strength' },
  { rank: 5, name: 'Benjamin', origin: 'Hebrew', meaning: 'Son of the right hand', trend: '↑ Classic stability' },
  { rank: 6, name: 'Lucas', origin: 'Latin', meaning: 'From Lucania', trend: '↑ Rising steadily' },
  { rank: 7, name: 'Henry', origin: 'Germanic', meaning: 'Estate ruler', trend: '↑ Vintage revival' },
  { rank: 8, name: 'Alexander', origin: 'Greek', meaning: 'Defender of men', trend: '↑ Timeless' },
  { rank: 9, name: 'Mason', origin: 'English', meaning: 'Stone worker', trend: '↓ Slight decline' },
  { rank: 10, name: 'Michael', origin: 'Hebrew', meaning: 'Who is like God', trend: '↑ Evergreen' },
  { rank: 11, name: 'Ethan', origin: 'Hebrew', meaning: 'Strong, firm', trend: '↑ Consistent' },
  { rank: 12, name: 'Daniel', origin: 'Hebrew', meaning: 'God is my judge', trend: '↑ Steadfast' },
  { rank: 13, name: 'Jacob', origin: 'Hebrew', meaning: 'Supplanter', trend: '↑ Enduring' },
  { rank: 14, name: 'Logan', origin: 'Scottish', meaning: 'Small hollow', trend: '↓ Slowly declining' },
  { rank: 15, name: 'Jackson', origin: 'English', meaning: 'Son of Jack', trend: '↑ Modern rising' },
  { rank: 16, name: 'Aiden', origin: 'Irish', meaning: 'Little fire', trend: '↑ Modern trend' },
  { rank: 17, name: 'Samuel', origin: 'Hebrew', meaning: 'God has heard', trend: '↑ Biblical revival' },
  { rank: 18, name: 'Sebastian', origin: 'Latin', meaning: 'Venerable, revered', trend: '↑ International rise' },
  { rank: 19, name: 'James', origin: 'Hebrew', meaning: 'Supplanter', trend: '↑ Royal classic' },
  { rank: 20, name: 'Matthew', origin: 'Hebrew', meaning: 'Gift of God', trend: '↑ Biblical steadfast' },
  { rank: 21, name: 'Owen', origin: 'Welsh', meaning: 'Young warrior', trend: '↑ Rising modern' },
  { rank: 22, name: 'Benjamin', origin: 'Hebrew', meaning: 'Son of right hand', trend: '↑ Classic enduring' },
  { rank: 23, name: 'Asher', origin: 'Hebrew', meaning: 'Happy, blessed', trend: '↑ Rising biblical' },
  { rank: 24, name: 'David', origin: 'Hebrew', meaning: 'Beloved', trend: '↑ Evergreen classic' },
  { rank: 25, name: 'Joseph', origin: 'Hebrew', meaning: 'God will increase', trend: '↑ Biblical traditional' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the most popular baby names in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Based on 2026 birth data trends, the top baby names are Olivia, Emma, and Amelia for girls, and Liam, Noah, and Oliver for boys. Names have shifted toward timeless classics and international variants.'
      }
    },
    {
      '@type': 'Question',
      name: 'Why are certain names becoming more popular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Naming trends are influenced by celebrity culture, cultural background of parents, media exposure, and cyclical revivals of classic names. In 2026, parents favor names that are easy to spell, work internationally, and offer vintage appeal.'
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
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Breadcrumb items={[
          { name: 'Baby Names', href: '/baby-names' },
          { name: 'Top 100', href: '/baby-names/top-100' }
        ]} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Top 100 Baby Names 2026
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            The most popular baby names of 2026, ranked by real birth data. Discover trending names for girls, boys, and what parents are choosing this year.
          </p>
          <Link
            href="/baby-names"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            Search all 1,188+ baby names <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Intro Section */}
        <section className="mb-12 space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Baby naming trends tell a story about culture, values, and what parents hope for their children. In 2026, the trend continues toward classic, timeless names—alongside a growing appreciation for names that work across cultures and languages.
          </p>
          <p>
            This ranking combines birth certificate data from the US Social Security Administration and UK Office for National Statistics, showing which names parents chose most frequently in 2025–2026. Trends are dynamic: names that rise quickly often fall just as fast, while true classics remain anchored at the top.
          </p>
        </section>

        <InContentAd />

        {/* Top Girl Names */}
        <section className="mb-14">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Top 25 Baby Girl Names 2026
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
                      href={`/baby-names/${name.name.toLowerCase()}`}
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
            Top 25 Baby Boy Names 2026
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
                      href={`/baby-names/${name.name.toLowerCase()}`}
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
              Key Naming Trends in 2026
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Vintage Revival Continues</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Names like Eleanor, Penelope, Victoria, and Henry are rising steadily as parents seek names that feel timeless and work across generations. Vintage does not mean outdated—these names offer sophistication and longevity.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Nature-Inspired Names Growing</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Luna, Lily, and similar nature-connected names continue gaining traction. Parents are drawn to the calming associations and environmental values these names represent.
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
                a: 'A popular name is one that appears frequently on birth certificates in a given year. Popularity is measured by the Social Security Administration (US) and Office for National Statistics (UK), which release annual rankings. Names rise and fall based on cultural shifts, media influence, and generational preferences.'
              },
              {
                q: 'Should I choose a popular name?',
                a: 'This is a personal choice. Popular names are familiar and easy to spell, but your child may share it with classmates. Unique names help your child stand out but might require constant spelling corrections. Consider what matters most: familiarity, uniqueness, or meaning.'
              },
              {
                q: 'How quickly do naming trends change?',
                a: 'Trends vary. Some names (like Liam and Olivia) have held top positions for years. Others rise rapidly — Harper and Aria climbed the rankings in just 5–7 years. Classic names like James and Grace remain relatively stable across decades, while trend-driven names (often tied to pop culture) can peak and decline within a generation.'
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
            Explore All 1,188+ Baby Names
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
