import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, User, Calendar } from 'lucide-react';
import { getArticleBySlug, getAllSlugs, getAllArticles, getRelatedArticles } from '@/lib/mdx';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/lib/utils';
import { InContentAd } from '@/components/ads/InContentAd';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { InlineNewsletter } from '@/components/shared/InlineNewsletter';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { AuthorBox } from '@/components/blog/AuthorBox';
import { injectHeadingIds, extractToc } from '@/lib/toc';

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

const fallbackImages: Record<string, string> = {
  pregnancy: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=85&auto=format&fit=crop',
  products: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=1200&q=85&auto=format&fit=crop',
  parenting: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&q=85&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=85&auto=format&fit=crop',
};

// Auto-link authoritative health organisations when mentioned in article body text.
// This adds in-body citations without requiring manual linking in every MDX file.
// Only links bare mentions (not ones already inside an <a> tag).
const AUTHORITY_LINKS: [RegExp, string, string][] = [
  [/\bNHS\b/g, 'https://www.nhs.uk', 'NHS (National Health Service)'],
  [/\bWHO\b/g, 'https://www.who.int', 'World Health Organization'],
  [/\bAAP\b/g, 'https://www.aap.org', 'American Academy of Pediatrics'],
  [/\bNICE\b/g, 'https://www.nice.org.uk', 'NICE (National Institute for Health and Care Excellence)'],
  [/\bRCOG\b/g, 'https://www.rcog.org.uk', 'Royal College of Obstetricians and Gynaecologists'],
  [/\bCDC\b/g, 'https://www.cdc.gov', 'Centers for Disease Control and Prevention'],
];

function linkAuthorities(html: string): string {
  // Only replace in text content — not inside existing <a> tags or HTML attributes
  return html.replace(/(<a[^>]*>[\s\S]*?<\/a>)|([^<>]+)/g, (match, link, text) => {
    if (link) return link; // already a link — don't touch
    if (!text) return match;
    let result = text;
    for (const [regex, url, title] of AUTHORITY_LINKS) {
      result = result.replace(
        regex,
        `<a href="${url}" target="_blank" rel="noopener noreferrer" title="${title}" class="authority-link">${regex.source.replace(/\\b/g, '').replace(/\\/g, '')}</a>`
      );
    }
    return result;
  });
}

// Convert raw markdown to HTML (simple but effective)
function markdownToHtml(md: string): string {
  const html = md
    // headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // unordered lists
    .replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>')
    // ordered lists
    .replace(/^\s*\d+\. (.+)$/gm, '<li>$1</li>')
    // blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // horizontal rules
    .replace(/^---$/gm, '<hr />')
    // paragraphs: wrap non-tag lines
    .replace(/^(?!<[a-z/]).+$/gm, (line) => line.trim() ? `<p>${line}</p>` : '')
    // clean up empty li wrappers
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // clean multiple blank lines
    .replace(/\n{3,}/g, '\n\n');

  // Auto-link authority mentions AFTER all HTML is generated
  return linkAuthorities(html);
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug('blog', slug);
  if (!article) notFound();

  const all = getAllArticles('blog');
  const related = getRelatedArticles(article, all, 3);

  const heroImage = article.image?.startsWith('http')
    ? article.image
    : fallbackImages[article.category as string] || fallbackImages.default;

  // Inject id= attributes into headings, then extract TOC
  const htmlWithIds = injectHeadingIds(markdownToHtml(article.content));
  const tocItems = extractToc(htmlWithIds);

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

      <div className="container mx-auto max-w-6xl px-4 py-8 dark:text-gray-200">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-600 font-medium truncate max-w-[250px]">{article.title}</span>
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
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-5">{article.description}</p>
            <div className="flex flex-wrap items-center gap-5 text-xs text-gray-400 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> {article.author || 'PregnancySprout Editorial Team'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Published {formatDate(article.publishedAt)}
              </span>
              {article.updatedAt && article.updatedAt !== article.publishedAt && (
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="h-3.5 w-3.5" /> Updated {formatDate(article.updatedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
              </span>
            </div>
          </header>

          {/* Table of Contents — mobile inline, desktop in sidebar */}
          {tocItems.length >= 3 && (
            <TableOfContents items={tocItems} />
          )}

          {/* Article body — properly rendered markdown */}
          <div
            className="prose prose-sm max-w-none
              prose-headings:font-serif prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:font-bold
              prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3 prose-h3:font-semibold
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-li:text-gray-700 prose-li:leading-relaxed
              prose-ul:my-4 prose-ol:my-4
              prose-strong:text-gray-900
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-brand-400 prose-blockquote:bg-brand-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-4
              prose-hr:border-gray-200 prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          <InContentAd />

          {/* Inline newsletter CTA */}
          <InlineNewsletter
            headline="Enjoying this article?"
            subtext="Get weekly pregnancy tips, baby guides, and a free Birth Plan template — straight to your inbox."
          />

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq: { q: string; a: string }, i: number) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author attribution box */}
          <AuthorBox
            author={article.author}
            reviewedBy="NHS, WHO, and NICE"
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
          />

          {/* Nav */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link href="/blog" className="flex items-center gap-1.5 text-sm text-brand-600 hover:underline font-medium">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Blog
            </Link>
          </div>
        </article>

        {/* Desktop TOC sidebar */}
        {tocItems.length >= 3 && (
          <aside className="hidden xl:block">
            <TableOfContents items={tocItems} />
          </aside>
        )}

        </div>{/* end 2-column grid */}

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-14 pt-8 border-t border-gray-100">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => {
                const relImg = rel.image?.startsWith('http')
                  ? rel.image
                  : fallbackImages[rel.category as string] || fallbackImages.default;
                return (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <Image src={relImg} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="300px" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">{rel.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{rel.readingTime} min read</p>
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
