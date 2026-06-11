'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { Article } from '@/types/article';

// Articles may carry an explicit href (blog vs. parenting routes differ).
// Falls back to /blog/{slug} when absent.
type GridArticle = Article & { href?: string };

interface Props {
  articles: GridArticle[];
  fallbackImages: Record<string, string>;
}

const PER_PAGE = 12;

const CATEGORIES = ['all', 'pregnancy', 'parenting', 'products', 'health'];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function BlogGrid({ articles, fallbackImages }: Props) {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  // Filter by category + search
  const filtered = useMemo(() => {
    let result = articles;
    if (activeCategory !== 'all') {
      result = result.filter((a) => a.category?.toLowerCase() === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [articles, activeCategory, query]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);

  // Reset to page 1 when filter/search changes
  function setFilter(cat: string) { setActiveCategory(cat); setPage(1); }
  function setSearch(val: string) { setQuery(val); setPage(1); }

  // Page number range (show max 5)
  const pageNums = useMemo(() => {
    const range: number[] = [];
    const delta = 2;
    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);
    for (let i = left; i <= right; i++) range.push(i);
    return range;
  }, [page, totalPages]);

  return (
    <div>
      {/* Search + Category filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white dark:bg-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        {/* Category filter pills */}
        <fieldset>
          <legend className="sr-only">Filter by category</legend>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
          {filtered.length === 0
            ? 'No articles found'
            : `Showing ${start + 1}–${Math.min(start + PER_PAGE, filtered.length)} of ${filtered.length} articles`}
        </p>
      </div>

      {/* Article grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <p className="text-gray-500 dark:text-gray-300 mb-2">No articles match your search.</p>
          <button onClick={() => { setSearch(''); setFilter('all'); }} className="text-brand-600 dark:text-brand-400 text-sm hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {paginated.map((article, i) => {
            const imgSrc = article.image?.startsWith('http')
              ? article.image
              : fallbackImages[article.category as string] ?? fallbackImages.default;
            const isFirst = page === 1 && i === 0;

            return (
              <Link
                key={article.href ?? article.slug}
                href={article.href ?? `/blog/${article.slug}`}
                className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 ${isFirst ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative overflow-hidden ${isFirst ? 'h-72' : 'h-48'}`}>
                  <Image
                    src={imgSrc}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={isFirst ? '(max-width: 768px) 100vw, 900px' : '(max-width: 768px) 100vw, 450px'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {article.category && (
                    <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {article.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" aria-hidden="true" />{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{article.readingTime} min read</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h2 className={`font-serif font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2 leading-snug ${isFirst ? 'text-2xl' : 'text-lg'}`}>
                    {article.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">{article.description}</p>
                  <span className="inline-block mt-4 text-brand-600 dark:text-brand-400 text-sm font-semibold group-hover:underline">
                    Read article →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-4">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
          </button>

          {/* Page numbers */}
          {pageNums[0] > 1 && (
            <>
              <button onClick={() => setPage(1)} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">1</button>
              {pageNums[0] > 2 && <span className="text-gray-400 dark:text-gray-500 px-1">…</span>}
            </>
          )}

          {pageNums.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                n === page
                  ? 'bg-brand-600 text-white border border-brand-600'
                  : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {n}
            </button>
          ))}

          {pageNums[pageNums.length - 1] < totalPages && (
            <>
              {pageNums[pageNums.length - 1] < totalPages - 1 && <span className="text-gray-400 dark:text-gray-500 px-1">…</span>}
              <button onClick={() => setPage(totalPages)} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">{totalPages}</button>
            </>
          )}

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
