import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, TrendingUp, TrendingDown, Minus, BookOpen } from 'lucide-react';
import { getNameBySlug, getRelatedNames, getAllNames } from '@/lib/baby-names';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SourceCitations } from '@/components/shared/SourceCitations';
import { PopularityChart } from '@/components/baby-names/PopularityChart';
import { getNameStats, primaryStats, computeTrend, describeMove, getStatsMeta } from '@/lib/name-stats';

interface Props {
  params: Promise<{ name: string }>;
}

// Pre-render every name page at build time as static HTML (1202 records
// collapse to ~1101 unique slugs — Next dedupes the duplicates below).
// Cloudflare serves them from the CDN edge — zero Worker CPU usage.
export function generateStaticParams() {
  const seen = new Set<string>();
  const params: { name: string }[] = [];
  for (const n of getAllNames()) {
    const slug = n.name.toLowerCase();
    if (seen.has(slug)) continue;
    seen.add(slug);
    params.push({ name: slug });
  }
  return params;
}

// Any slug not in the pre-rendered list → 404 (never hits the Worker at runtime).
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name: nameSlug } = await params;
  const nameData = getNameBySlug(nameSlug);
  if (!nameData) return {};

  const stats = getNameStats(nameSlug);
  const title = `${nameData.name} Baby Name Meaning, Origin & Popularity`;

  // Lead the description with real SSA figures where we have them — far more
  // useful in a SERP than the generic meaning sentence.
  let rawDesc: string;
  if (stats) {
    const s = primaryStats(stats);
    rawDesc = `${nameData.name} means "${nameData.meaning}". In ${s.latest.year} it ranked #${s.latest.rank} in the US with ${s.latest.count.toLocaleString()} babies named ${nameData.name}. See its full popularity history since ${s.firstSeen}.`;
  } else {
    rawDesc = `The name ${nameData.name} means "${nameData.meaning}" and has ${nameData.origin.join(', ')} origins. Learn about the name's meaning, nicknames, and similar names.`;
  }
  // Cap at 153 chars at the last word boundary to avoid SERP truncation warnings.
  const description = rawDesc.length > 153
    ? rawDesc.substring(0, rawDesc.lastIndexOf(' ', 150)) + '…'
    : rawDesc;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/baby-names/${nameData.name.toLowerCase()}` },
    openGraph: { title, description },
    // Names with no SSA record (given to fewer than 5 US babies in any year)
    // can't be given real popularity data, so they'd stay genuinely thin.
    // Keep them browsable for visitors, but don't ask Google to index them.
    ...(stats ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function NameDetailPage({ params }: Props) {
  const { name: nameSlug } = await params;
  const nameData = getNameBySlug(nameSlug);
  if (!nameData) notFound();

  const related = getRelatedNames(nameData, 8);

  // Real popularity data from the SSA dataset (null for names never given to
  // 5+ US babies in a single year — SSA's publication threshold).
  const stats = getNameStats(nameSlug);
  const s = stats ? primaryStats(stats) : null;
  const trend = s ? computeTrend(s) : 'unknown';
  const move = s ? describeMove(s) : null;
  const statsMeta = getStatsMeta();

  const genderColor = nameData.gender === 'girl' ? 'text-pink-600 bg-pink-50 dark:text-pink-400 dark:bg-pink-950/40' :
    nameData.gender === 'boy' ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40' : 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/40';

  const chartTone = nameData.gender === 'girl' ? 'pink' : nameData.gender === 'boy' ? 'blue' : 'purple';

  const trendIcon = trend === 'rising' ?
    <TrendingUp className="h-4 w-4 text-green-500" /> :
    trend === 'falling' ?
    <TrendingDown className="h-4 w-4 text-red-400" /> :
    <Minus className="h-4 w-4 text-gray-400" />;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${nameData.name} Baby Name Meaning and Origin`,
    description: `The name ${nameData.name} means "${nameData.meaning}".`,
    author: { '@type': 'Organization', name: siteConfig.name },
    url: `${siteConfig.url}/baby-names/${nameData.name.toLowerCase()}`,
  };

  return (
    <div>
      <JsonLd data={schema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Baby Names', href: '/baby-names' },
        { name: nameData.name, href: `/baby-names/${nameData.name.toLowerCase()}` },
      ]} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="py-1 hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/baby-names" className="py-1 hover:text-brand-600 dark:hover:text-brand-400">Baby Names</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{nameData.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 pt-6 pb-12">
        {/* Header */}
        <div className={`rounded-3xl p-8 mb-10 text-center ${nameData.gender === 'girl' ? 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40' : nameData.gender === 'boy' ? 'bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/40' : 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40'}`}>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">{nameData.name}</h1>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${genderColor}`}>
              {nameData.gender} name
            </span>
            {nameData.origin.map((o) => (
              <span key={o} className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {o}
              </span>
            ))}
            {trend !== 'unknown' && (
              <div className="flex items-center gap-1.5 bg-white dark:bg-gray-800 rounded-full px-3 py-1.5 border border-gray-200 dark:border-gray-700">
                {trendIcon}
                <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{trend}</span>
              </div>
            )}
            {s && (
              <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                #{s.latest.rank.toLocaleString()} in {s.latest.year}
              </span>
            )}
          </div>
        </div>

        {/* Meaning */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-brand-500" />
            Meaning of {nameData.name}
          </h2>
          <div className="bg-brand-50 dark:bg-brand-950/40 rounded-2xl p-6 border border-brand-100 dark:border-brand-900">
            <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed">
              The name <strong>{nameData.name}</strong> means{' '}
              <strong className="text-brand-700 dark:text-brand-300">&ldquo;{nameData.meaning}&rdquo;</strong>.
              It has origins in {nameData.origin.join(' and ')} and is a{' '}
              {nameData.syllables}-syllable {nameData.gender} name.
            </p>
          </div>
        </section>

        {/* Popularity — real SSA data */}
        {s && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How Popular Is {nameData.name}?
            </h2>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-2">
              In {s.latest.year}, <strong>{s.latest.count.toLocaleString()}</strong> babies in the United States
              were named {nameData.name}, making it the <strong>#{s.latest.rank.toLocaleString()}</strong> most
              popular {stats!.primary === 'F' ? "girls'" : "boys'"} name that year
              {move ? <> — {move}</> : null}.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {nameData.name} was at its most popular in <strong>{s.peak.year}</strong>, when it ranked{' '}
              <strong>#{s.peak.rank.toLocaleString()}</strong> with {s.peak.count.toLocaleString()} births.
              It first appears in the records in {s.firstSeen}, and roughly{' '}
              <strong>{s.totalBabies.toLocaleString()}</strong> babies have been given the name since then.
            </p>

            <PopularityChart series={s.series} name={nameData.name} tone={chartTone} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: `Rank in ${s.latest.year}`, value: `#${s.latest.rank.toLocaleString()}` },
                { label: 'Peak rank', value: `#${s.peak.rank.toLocaleString()} (${s.peak.year})` },
                { label: 'First recorded', value: s.firstSeen.toString() },
                { label: 'Babies named, all-time', value: s.totalBabies.toLocaleString() },
              ].map((fact) => (
                <div key={fact.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{fact.label}</p>
                  <p className="font-bold text-gray-900 dark:text-white">{fact.value}</p>
                </div>
              ))}
            </div>

            {stats!.f && stats!.m && stats!.splitF >= 10 && stats!.splitF <= 90 && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-5 bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900 rounded-xl p-4">
                <strong>{nameData.name} is used for both girls and boys.</strong> Across all years on record,{' '}
                {stats!.splitF}% of babies named {nameData.name} were girls and {100 - stats!.splitF}% were boys.
                In {stats!.f.latest.year} it ranked #{stats!.f.latest.rank.toLocaleString()} for girls
                ({stats!.f.latest.count.toLocaleString()} births) and #{stats!.m.latest.rank.toLocaleString()} for
                boys ({stats!.m.latest.count.toLocaleString()} births).
              </p>
            )}
          </section>
        )}

        {/* Quick Facts */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-5">{nameData.name} — Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Gender', value: nameData.gender },
              { label: 'Origin', value: nameData.origin.join(', ') },
              { label: 'Syllables', value: nameData.syllables.toString() },
              { label: 'Popularity Rank', value: s ? `#${s.latest.rank.toLocaleString()}` : 'Not ranked' },
            ].map((fact) => (
              <div key={fact.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{fact.label}</p>
                <p className="font-bold text-gray-900 dark:text-white capitalize">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nicknames */}
        {nameData.nicknames && nameData.nicknames.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Nicknames for {nameData.name}</h2>
            <div className="flex flex-wrap gap-2">
              {nameData.nicknames.map((n) => (
                <span key={n} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium">{n}</span>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        {nameData.tags.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Style & Vibe</h2>
            <div className="flex flex-wrap gap-2">
              {nameData.tags.map((tag) => (
                <span key={tag} className="bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 px-4 py-1.5 rounded-full text-sm capitalize">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {/* Related Names */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-5">Names Similar to {nameData.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map((n) => (
                <Link
                  key={n.id}
                  href={`/baby-names/${n.name.toLowerCase()}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 text-center hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-all"
                >
                  <p className="font-serif font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">{n.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.meaning.slice(0, 30)}…</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Keep exploring — the page previously dead-ended on the related grid */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Keep Exploring Baby Names</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { href: '/baby-names', title: 'Browse all baby names', desc: 'Filter by gender, origin, letter and style' },
              { href: '/baby-names/top-100', title: 'Top 100 names', desc: 'The most popular picks this year' },
              { href: '/tools/baby-name-generator', title: 'Name generator', desc: 'Find names matching your taste' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-all"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{l.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{l.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {s && (
          <SourceCitations
            intro={`Popularity figures on this page are calculated from ${statsMeta.source} birth records covering ${statsMeta.firstYear}–${statsMeta.latestYear}. SSA publishes names given to at least five babies in a year.`}
            citations={[
              {
                organisation: 'US Social Security Administration',
                title: 'Popular Baby Names — national data, 1880 to present',
                url: 'https://www.ssa.gov/oact/babynames/limits.html',
                year: statsMeta.latestYear,
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
