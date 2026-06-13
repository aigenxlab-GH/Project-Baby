'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Loader2, BookOpen, Baby, ShoppingBag, ChevronRight } from 'lucide-react';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: 'article' | 'product' | 'week' | 'name' | 'tool';
}

const typeConfig: Record<SearchItem['type'], { label: string; color: string; Icon: React.ComponentType<{ className?: string }> }> = {
  article: { label: 'Article', color: 'bg-blue-100 text-blue-700', Icon: BookOpen },
  product: { label: 'Product', color: 'bg-amber-100 text-amber-700', Icon: ShoppingBag },
  week: { label: 'Pregnancy Week', color: 'bg-pink-100 text-pink-700', Icon: Baby },
  name: { label: 'Baby Name', color: 'bg-purple-100 text-purple-700', Icon: Search },
  tool: { label: 'Tool', color: 'bg-teal-100 text-teal-700', Icon: ChevronRight },
};

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const performSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  // Search on load if query param present
  useEffect(() => {
    if (initialQuery) performSearch(initialQuery);
  }, [initialQuery, performSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      performSearch(query.trim());
    }
  }

  return (
    <div>
      {/* Search box */}
      <form onSubmit={handleSubmit} className="mb-8" role="search">
        <label htmlFor="site-search" className="sr-only">Search PregnancySprout</label>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pregnancy guides, baby names, products…"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 text-sm"
              autoComplete="off"
              aria-label="Search PregnancySprout"
            />
          </div>
          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm py-8">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span>Searching…</span>
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          <p className="text-sm text-gray-500 mb-4" aria-live="polite">
            {results.length === 0
              ? `No results found for "${query}"`
              : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>

          {results.length > 0 && (
            <ul className="space-y-3" aria-label="Search results">
              {results.map((item) => {
                const { label, color, Icon } = typeConfig[item.type];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-brand-200 transition-all group"
                    >
                      <div className={`p-2 rounded-lg flex-shrink-0 ${color}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{label}</span>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600 transition-colors leading-snug">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-brand-400 flex-shrink-0 mt-1" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {/* Empty state — not yet searched */}
      {!loading && !searched && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-200 mx-auto mb-4" aria-hidden="true" />
          <p className="text-gray-500 text-sm">Type at least 2 characters to search</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['due date', 'morning sickness', 'baby monitor', 'sleep training', 'baby names'].map((term) => (
              <button
                key={term}
                onClick={() => { setQuery(term); performSearch(term); router.push(`/search?q=${encodeURIComponent(term)}`); }}
                className="text-xs bg-gray-100 hover:bg-brand-100 text-gray-600 hover:text-brand-700 px-3 py-2.5 rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
