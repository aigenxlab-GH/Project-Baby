import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, User, ExternalLink } from 'lucide-react';
import { getPersonAuthors, resolveAuthor, authorSchema } from '@/config/authors';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { getAllArticles } from '@/lib/mdx';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

// Only named humans get a page. The editorial-team fallback is an Organization
// and is covered by /about, so it is deliberately not routed here.
export function generateStaticParams() {
  return getPersonAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getPersonAuthors().find((a) => a.slug === slug);
  if (!author) return {};
  const title = `${author.name} — Author at ${siteConfig.name}`;
  return {
    title,
    description: author.short,
    alternates: { canonical: `${siteConfig.url}/authors/${author.slug}` },
    openGraph: { title, description: author.short, type: 'profile' },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getPersonAuthors().find((a) => a.slug === slug);
  if (!author) notFound();

  // Articles this person is credited on, newest first.
  const articles = getAllArticles('blog')
    .filter((a) => resolveAuthor(a.author).slug === author.slug)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  return (
    <div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...authorSchema(author, siteConfig.url),
          description: author.bio.join(' '),
          ...(author.avatar ? { image: `${siteConfig.url}${author.avatar}` } : {}),
          worksFor: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Authors', href: '/authors' },
          { name: author.name, href: `/authors/${author.slug}` },
        ]}
      />

      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="py-1 hover:text-brand-600">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{author.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 pt-8 pb-12">
        <header className="flex items-start gap-5 mb-8">
          <div className="flex-shrink-0">
            {author.avatar ? (
              <Image src={author.avatar} alt={author.name} width={88} height={88} className="rounded-full object-cover" />
            ) : (
              <div className="h-22 w-22 h-[88px] w-[88px] rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center">
                <User className="h-9 w-9 text-brand-600 dark:text-brand-400" aria-hidden="true" />
              </div>
            )}
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {author.name}
              {author.credentials && (
                <span className="text-xl text-gray-500 dark:text-gray-400 font-normal">, {author.credentials}</span>
              )}
            </h1>
            {author.role && <p className="text-gray-500 dark:text-gray-400 mt-1">{author.role}</p>}
            {author.sameAs && author.sameAs.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {author.sameAs.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    {new URL(url).hostname.replace('www.', '')}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="prose prose-gray dark:prose-invert max-w-none mb-10">
          {author.bio.map((p, i) => (
            <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">{p}</p>
          ))}
        </section>

        {author.knowsAbout && author.knowsAbout.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-3">Writes About</h2>
            <div className="flex flex-wrap gap-2">
              {author.knowsAbout.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full text-sm bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-900">
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-4">
              Articles by {author.name.split(' ')[0]} ({articles.length})
            </h2>
            <ul className="space-y-3">
              {articles.slice(0, 50).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/blog/${a.slug}`}
                    className="block rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-brand-300 transition-colors"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{a.title}</p>
                    {a.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{a.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
