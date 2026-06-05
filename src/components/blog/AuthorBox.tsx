import Link from 'next/link';
import { Users, ExternalLink } from 'lucide-react';

interface AuthorBoxProps {
  author?: string;
  reviewedBy?: string;
  publishedAt?: string;
  updatedAt?: string;
  compact?: boolean;
}

export function AuthorBox({ author, reviewedBy, publishedAt, updatedAt, compact = false }: AuthorBoxProps) {
  const displayAuthor = author ?? 'PregnancySprout Editorial Team';

  if (compact) {
    return (
      <p className="text-sm text-gray-500 flex items-center gap-1.5">
        <Users className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span>
          By <span className="font-medium text-gray-700">{displayAuthor}</span>
          {reviewedBy && (
            <> · Reviewed against <span className="font-medium text-gray-700">{reviewedBy}</span> guidelines</>
          )}
          {updatedAt && (
            <> · Updated {new Date(updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</>
          )}
        </span>
      </p>
    );
  }

  return (
    <div className="mt-10 border-t border-gray-100 pt-8">
      <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
        {/* Avatar placeholder */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center"
          aria-hidden="true"
        >
          <Users className="h-7 w-7 text-brand-600" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-base">{displayAuthor}</p>

          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            Our editorial team researches every article against primary medical sources — NHS, WHO,
            NICE, and RCOG guidelines. We are health writers and parents, not doctors; content is
            reviewed for accuracy but does not constitute medical advice.
          </p>

          {reviewedBy && (
            <p className="text-sm text-brand-700 mt-2 font-medium">
              ✓ Fact-checked against {reviewedBy} guidelines
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            {publishedAt && (
              <span>
                Published{' '}
                {new Date(publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
            {updatedAt && updatedAt !== publishedAt && (
              <span>
                Updated{' '}
                {new Date(updatedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
            <Link
              href="/editorial-standards"
              className="inline-flex items-center gap-1 text-brand-700 hover:underline"
            >
              Editorial standards <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
