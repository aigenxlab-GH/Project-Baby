import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, TrendingUp, TrendingDown, Minus, BookOpen } from 'lucide-react';
import { getNameBySlug, getRelatedNames, getAllNames } from '@/lib/baby-names';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { InContentAd } from '@/components/ads/InContentAd';
import { HeaderAd } from '@/components/ads/HeaderAd';

interface Props {
  params: Promise<{ name: string }>;
}

// Pre-render all 1205 name pages at build time as static HTML.
// Cloudflare serves them from the CDN edge — zero Worker CPU usage.
export function generateStaticParams() {
  return getAllNames().map((n) => ({ name: n.name.toLowerCase() }));
}

// Any slug not in the pre-rendered list → 404 (never hits the Worker at runtime).
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name: nameSlug } = await params;
  const nameData = getNameBySlug(nameSlug);
  if (!nameData) return {};

  const title = `${nameData.name} Baby Name Meaning, Origin & Popularity`;
  const rawDesc = `The name ${nameData.name} means "${nameData.meaning}" and has ${nameData.origin.join(', ')} origins. Learn about the name's popularity, nicknames, and more.`;
  // Cap at 153 chars at the last word boundary to avoid SERP truncation warnings.
  const description = rawDesc.length > 153
    ? rawDesc.substring(0, rawDesc.lastIndexOf(' ', 150)) + '…'
    : rawDesc;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/baby-names/${nameData.name.toLowerCase()}` },
    openGraph: { title, description },
  };
}

export default async function NameDetailPage({ params }: Props) {
  const { name: nameSlug } = await params;
  const nameData = getNameBySlug(nameSlug);
  if (!nameData) notFound();

  const related = getRelatedNames(nameData, 8);

  const genderColor = nameData.gender === 'girl' ? 'text-pink-600 bg-pink-50' :
    nameData.gender === 'boy' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50';

  const trendIcon = nameData.popularityTrend === 'rising' ?
    <TrendingUp className="h-4 w-4 text-green-500" /> :
    nameData.popularityTrend === 'falling' ?
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
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/baby-names" className="hover:text-brand-600">Baby Names</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium">{nameData.name}</span>
          </nav>
        </div>
      </div>

      <HeaderAd />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className={`rounded-3xl p-8 mb-10 text-center ${nameData.gender === 'girl' ? 'bg-gradient-to-br from-pink-50 to-rose-50' : nameData.gender === 'boy' ? 'bg-gradient-to-br from-blue-50 to-sky-50' : 'bg-gradient-to-br from-purple-50 to-violet-50'}`}>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-4">{nameData.name}</h1>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${genderColor}`}>
              {nameData.gender} name
            </span>
            {nameData.origin.map((o) => (
              <span key={o} className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200">
                {o}
              </span>
            ))}
            <div className="flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 border border-gray-200">
              {trendIcon}
              <span className="text-sm text-gray-600 capitalize">{nameData.popularityTrend}</span>
            </div>
          </div>
        </div>

        {/* Meaning */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-brand-500" />
            Meaning of {nameData.name}
          </h2>
          <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
            <p className="text-gray-800 text-lg leading-relaxed">
              The name <strong>{nameData.name}</strong> means{' '}
              <strong className="text-brand-700">&ldquo;{nameData.meaning}&rdquo;</strong>.
              It has origins in {nameData.origin.join(' and ')} and is a{' '}
              {nameData.syllables}-syllable {nameData.gender} name.
            </p>
          </div>
        </section>

        <InContentAd />

        {/* Quick Facts */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5">{nameData.name} — Quick Facts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Gender', value: nameData.gender },
              { label: 'Origin', value: nameData.origin.join(', ') },
              { label: 'Syllables', value: nameData.syllables.toString() },
              { label: 'Popularity Rank', value: nameData.popularityRank ? `#${nameData.popularityRank}` : 'Unranked' },
            ].map((fact) => (
              <div key={fact.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{fact.label}</p>
                <p className="font-bold text-gray-900 capitalize">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nicknames */}
        {nameData.nicknames && nameData.nicknames.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Nicknames for {nameData.name}</h2>
            <div className="flex flex-wrap gap-2">
              {nameData.nicknames.map((n) => (
                <span key={n} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">{n}</span>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        {nameData.tags.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Style & Vibe</h2>
            <div className="flex flex-wrap gap-2">
              {nameData.tags.map((tag) => (
                <span key={tag} className="bg-brand-50 text-brand-700 border border-brand-200 px-4 py-1.5 rounded-full text-sm capitalize">{tag}</span>
              ))}
            </div>
          </section>
        )}

        {/* Related Names */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-5">Names Similar to {nameData.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map((n) => (
                <Link
                  key={n.id}
                  href={`/baby-names/${n.name.toLowerCase()}`}
                  className="group bg-white rounded-xl border border-gray-100 p-4 text-center hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <p className="font-serif font-bold text-gray-900 group-hover:text-brand-600">{n.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.meaning.slice(0, 30)}…</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
