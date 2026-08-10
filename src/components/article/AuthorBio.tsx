import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import type { Author } from '@/config/authors';

interface Props {
  author: Author;
  /** Shown alongside the byline so readers can judge freshness. */
  publishedAt?: string;
  updatedAt?: string;
  /** e.g. "NHS, WHO, NICE" — the guidance this article was researched against. */
  reviewedBy?: string;
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * "Who wrote this, and why should I trust them" block, shown at the end of
 * articles. Every credible health site has one; this one did not, which left
 * provenance entirely to a one-line byline.
 *
 * Renders only what the author record actually contains — no placeholder
 * credentials, no invented experience.
 */
export function AuthorBio({ author, publishedAt, updatedAt, reviewedBy }: Props) {
  return (
    <aside
      aria-label={`About ${author.name}`}
      className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center">
              <User className="h-6 w-6 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
            Written by
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {author.isPerson ? (
              <Link
                href={`/authors/${author.slug}`}
                className="hover:text-brand-600 dark:hover:text-brand-400 underline-offset-2 hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
            {author.credentials && (
              <span className="text-gray-500 dark:text-gray-400 font-normal">, {author.credentials}</span>
            )}
          </p>
          {author.role && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{author.role}</p>
          )}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-1">
            {author.short}
          </p>
          {reviewedBy && (
            <p className="text-sm text-brand-700 dark:text-brand-400 mt-2 font-medium">
              ✓ Researched against {reviewedBy} guidance
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            {publishedAt && <span>Published {fmt(publishedAt)}</span>}
            {updatedAt && updatedAt !== publishedAt && <span>Updated {fmt(updatedAt)}</span>}
            {author.isPerson && (
              <Link
                href={`/authors/${author.slug}`}
                className="font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                More from {author.name.split(' ')[0]} →
              </Link>
            )}
            <Link href="/editorial-standards" className="text-brand-600 dark:text-brand-400 hover:underline">
              Editorial standards
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
