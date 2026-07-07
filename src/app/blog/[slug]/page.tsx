import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { getArticleBySlug, getAllSlugs, getAllArticles, getRelatedArticles } from '@/lib/mdx';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/lib/utils';
import { InContentAd } from '@/components/ads/InContentAd';
import { HeaderAd } from '@/components/ads/HeaderAd';
import { ArticleBottomAd } from '@/components/ads/ArticleBottomAd';
import { SidebarAd } from '@/components/ads/SidebarAd';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { SourceCitations, PREGNANCY_CITATIONS, NEWBORN_CITATIONS, SLEEP_CITATIONS, FEEDING_CITATIONS, POSTPARTUM_CITATIONS, TODDLER_CITATIONS, PRODUCT_CITATIONS } from '@/components/shared/SourceCitations';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AuthorBox } from '@/components/blog/AuthorBox';
import { ShareButtons } from '@/components/shared/ShareButtons';
import { injectHeadingIds, extractToc } from '@/lib/toc';
import { markdownToHtml } from '@/lib/markdown';
import { getArticleImage } from '@/lib/article-images';
import { getRelatedShoppingLink, injectSectionShoppingLinks } from '@/lib/related-shopping';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug('blog', slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.description,
    ...(article.noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      images: article.image?.startsWith('http') ? [{ url: article.image, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.description },
  };
}



function splitHtmlAtNthParagraph(html: string, n: number): [string, string] {
  let count = 0;
  for (const match of html.matchAll(/<\/p>/g)) {
    count++;
    if (count === n) {
      const idx = match.index! + match[0].length;
      return [html.slice(0, idx), html.slice(idx)];
    }
  }
  return [html, ''];
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug('blog', slug);
  if (!article) notFound();

  const all = getAllArticles('blog');
  const related = getRelatedArticles(article, all, 3);
  const shoppingLink = getRelatedShoppingLink(article.title, article.category);

  const heroImage = getArticleImage(slug, article.category);

  // Inject id= attributes into headings, then extract TOC.
  // injectSectionShoppingLinks first adds a "Shop [Category]" link at the
  // end of each ### subsection that names a specific product type (only
  // affects multi-topic roundup articles — a no-op everywhere else).
  const htmlWithIds = injectHeadingIds(
    markdownToHtml(injectSectionShoppingLinks(article.content), { linkAuthorities: true }),
  );
  const tocItems = extractToc(htmlWithIds);

  // Map article category to authoritative citation set
  const categoryToCitations: Record<string, typeof PREGNANCY_CITATIONS> = {
    pregnancy:  PREGNANCY_CITATIONS,
    newborn:    NEWBORN_CITATIONS,
    sleep:      SLEEP_CITATIONS,
    feeding:    FEEDING_CITATIONS,
    postpartum: POSTPARTUM_CITATIONS,
    toddler:    TODDLER_CITATIONS,
    products:   PRODUCT_CITATIONS,
    gear:       PRODUCT_CITATIONS,
  };
  const citations = categoryToCitations[article.category ?? ''] ?? PREGNANCY_CITATIONS;

  // Split article body for two mid-content ad injection points.
  // Part 1: paragraphs 1–3 (intro — user receives value before seeing first ad).
  // Part 2: paragraphs 4 to midpoint. Part 3: rest.
  const [part1, rest] = splitHtmlAtNthParagraph(htmlWithIds, 3);
  const paraCount = (htmlWithIds.match(/<\/p>/g) || []).length;
  const midOffset = Math.max(1, Math.floor(paraCount / 2) - 3);
  const [part2, part3] = splitHtmlAtNthParagraph(rest, midOffset);

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        author={article.author}
        image={heroImage}
        url={`${siteConfig.url}/blog/${slug}`}
        faqs={article.faqs}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: article.title, href: `/blog/${slug}` },
      ]} />

      <HeaderAd />

      <div className="container mx-auto max-w-6xl px-4 py-8 dark:text-gray-200">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="py-1 hover:text-brand-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="py-1 hover:text-brand-600">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-600 dark:text-gray-400 font-medium truncate max-w-[250px]">{article.title}</span>
        </nav>

        {/* 2-column layout: article + sticky TOC sidebar */}
        <div className="xl:grid xl:grid-cols-[1fr_260px] xl:gap-12 xl:items-start">

        {/* Main article column */}
        <article>
          {/* Medical disclaimer at top */}
          <MedicalDisclaimer variant="inline" />

          {/* Hero image */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <Image
              src={heroImage}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {article.category && (
              <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {article.category}
              </span>
            )}
          </div>

          {/* Header */}
          <header className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
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

          {/* Table of Contents — mobile inline only; desktop version lives in <aside> */}
          {tocItems.length >= 3 && (
            <TableOfContents items={tocItems} mobileOnly />
          )}

          {/* Article body — split into 3 segments so ads can be injected mid-article */}
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
            dangerouslySetInnerHTML={{ __html: part1 }}
          />

          <InContentAd />

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
            dangerouslySetInnerHTML={{ __html: part2 }}
          />

          {part3 && (
            <>
              <InContentAd />
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
                dangerouslySetInnerHTML={{ __html: part3 }}
              />
            </>
          )}

          <ArticleBottomAd />

          {/* Source citations — authoritative references per category */}
          <SourceCitations citations={citations} />

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

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* "What to do next" — matched product category or topical hub.
              Every article gets one; category pages show "coming soon"
              gracefully when nothing's live yet, so this never 404s. */}
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

          {/* Share buttons */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <ShareButtons
              url={`/blog/${slug}`}
              title={article.title}
              image={heroImage}
              description={article.description}
            />
          </div>

          {/* Nav */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <Link href="/blog" className="flex items-center gap-1.5 text-sm text-brand-600 hover:underline font-medium">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Blog
            </Link>
          </div>
        </article>

        {/* Desktop sidebar: TOC + ad. Sticky lives on the aside (the grid item) —
            with items-start on the grid, the aside can travel the full row height.
            TableOfContents renders null below 3 headings, so the ad still shows. */}
        <aside className="hidden xl:block self-start">
          <TableOfContents items={tocItems} />
          <div className="mt-6">
            <SidebarAd />
          </div>
        </aside>

        </div>{/* end 2-column grid */}

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-14 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relImg = getArticleImage(rel.slug, rel.category);
                return (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all">
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
      </div>
    </>
  );
}
