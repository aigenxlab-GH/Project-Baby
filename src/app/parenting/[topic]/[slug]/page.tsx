import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { getArticleBySlug, getAllSlugs, getAllArticlesUnder, getRelatedArticles } from '@/lib/mdx';
import { getArticleImage } from '@/lib/article-images';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/lib/utils';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SourceCitations, NEWBORN_CITATIONS, SLEEP_CITATIONS, FEEDING_CITATIONS, PREGNANCY_CITATIONS } from '@/components/shared/SourceCitations';
import { AuthorBox } from '@/components/blog/AuthorBox';
import { getRelatedShoppingLink } from '@/lib/related-shopping';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ topic: string; slug: string }>;
}

export async function generateStaticParams() {
  const topics = ['newborn', 'sleep', 'feeding', 'development', 'toddler', 'postpartum', 'health', 'activities'];
  const params: { topic: string; slug: string }[] = [];
  for (const topic of topics) {
    try {
      const slugs = getAllSlugs(`parenting/${topic}`);
      slugs.forEach(slug => params.push({ topic, slug }));
    } catch { /* no articles yet */ }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic, slug } = await params;
  const article = getArticleBySlug(`parenting/${topic}`, slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.description,
    // Old thin duplicates are marked noIndex: true in frontmatter to prevent
    // content cannibalization with their expanded replacements.
    ...(article.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: `${siteConfig.url}/parenting/${topic}/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: article.title, type: 'image/png' }],
    },
  };
}

import { markdownToHtml } from '@/lib/markdown';

const topicLabels: Record<string, string> = {
  newborn: 'Newborn Care',
  sleep: 'Baby Sleep',
  feeding: 'Feeding & Nutrition',
  development: 'Baby Development',
};

// Map each topic to its authoritative source citations
const topicCitations: Record<string, typeof NEWBORN_CITATIONS> = {
  newborn: NEWBORN_CITATIONS,
  sleep: SLEEP_CITATIONS,
  feeding: FEEDING_CITATIONS,
  development: NEWBORN_CITATIONS,
};

export default async function ParentingArticlePage({ params }: Props) {
  const { topic, slug } = await params;
  const article = getArticleBySlug(`parenting/${topic}`, slug);
  if (!article) notFound();

  const topicLabel = topicLabels[topic] || topic;

  // Related articles — scored by shared tags, pulled across ALL 8 parenting
  // topic subfolders (not just the current one) so e.g. a sleep article can
  // surface a related feeding article. Excludes noIndex articles (old thin
  // duplicates) so we never pass link equity to a page Google won't index.
  const allParenting = getAllArticlesUnder('parenting').filter((a) => !a.noIndex);
  const related = getRelatedArticles(article, allParenting, 3) as Array<typeof article & { section: string }>;
  // Most parenting articles have category: "parenting" (a generic value) in
  // frontmatter — the topic folder (sleep/feeding/newborn/etc.) is a more
  // specific signal for hub matching, so prefer it over a generic category.
  const shoppingLink = getRelatedShoppingLink(
    article.title,
    !article.category || article.category === 'parenting' ? topic : article.category,
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 pt-6 pb-10">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Parenting', href: '/parenting' },
        { name: topicLabel, href: `/parenting/${topic}` },
        { name: article.title, href: `/parenting/${topic}/${slug}` },
      ]} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="py-1 hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/parenting" className="py-1 hover:text-brand-600">Parenting</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/parenting/${topic}`} className="py-1 hover:text-brand-600">{topicLabel}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-600 dark:text-gray-400 font-medium truncate max-w-[200px]">{article.title}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {topicLabel}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{article.description}</p>
          <div className="flex flex-wrap items-center gap-5 text-xs text-gray-400 dark:text-gray-500 pb-6 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> {article.author || 'PregnancySprout Editorial Team'}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Published {formatDate(article.publishedAt)}
            </span>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Calendar className="h-3.5 w-3.5" /> Updated {formatDate(article.updatedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
            </span>
          </div>
        </header>

        {/* Medical disclaimer */}
        <MedicalDisclaimer variant="inline" />

        {/* Article body — markdown rendered to HTML */}
        <div
          className="prose prose-sm max-w-none dark:prose-invert
            prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold
            prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3 prose-h3:font-semibold
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
            prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-relaxed
            prose-ul:my-4 prose-ol:my-4
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-brand-400 prose-blockquote:bg-brand-50 dark:prose-blockquote:bg-brand-950/30 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4
            prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-8"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
        />

        {/* Source citations */}
        <SourceCitations citations={topicCitations[topic] ?? PREGNANCY_CITATIONS} />

        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-10 bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-5">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {article.faqs.map((faq: { q: string; a: string }, i: number) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* "What to do next" — matched product category or topical hub. */}
        {shoppingLink && (
          <Link
            href={shoppingLink.href}
            className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 px-5 py-4 hover:bg-brand-100 dark:hover:bg-brand-950/50 transition-colors group"
          >
            <span className="font-semibold text-brand-700 dark:text-brand-300 text-sm">{shoppingLink.label}</span>
            <ArrowRight className="h-4 w-4 text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>
        )}

        {/* Author attribution box */}
        <AuthorBox
          author={article.author}
          reviewedBy="NHS, WHO, and NICE"
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
        />

        {/* Related articles — cross-topic, tag-scored (mirrors blog article page) */}
        {related.length > 0 && (
          <section className="mt-14 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relTopic = rel.section.split('/')[1] ?? topic;
                const relImg = getArticleImage(rel.slug, rel.category);
                return (
                  <Link key={rel.slug} href={`/parenting/${relTopic}/${rel.slug}`} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <Image src={relImg} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="300px" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">{rel.title}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{rel.readingTime} min read</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back navigation */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <Link
            href={`/parenting/${topic}`}
            className="flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to {topicLabel}
          </Link>
          <Link
            href="/parenting"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            All Parenting Topics →
          </Link>
        </div>
      </article>
    </div>
  );
}
