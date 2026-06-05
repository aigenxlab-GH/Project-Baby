'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { searchNames, getAllOrigins } from '@/lib/baby-names';
import type { NameFilters } from '@/types/baby-name';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function BabyNamesBrowser() {
  const searchParams = useSearchParams();
  const initialGender = (searchParams.get('gender') as NameFilters['gender']) ?? 'all';
  const [filters, setFilters] = useState<NameFilters>({ gender: initialGender });
  const [page, setPage] = useState(1);

  const origins = useMemo(() => getAllOrigins(), []);

  const { names, total, totalPages } = useMemo(
    () => searchNames(filters, page, 48),
    [filters, page]
  );

  function updateFilter(key: keyof NameFilters, value: string | number | undefined) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search baby names..."
            value={filters.query || ''}
            onChange={(e) => updateFilter('query', e.target.value || undefined)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-300 text-gray-900"
          />
        </div>

        {/* Gender Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['all', 'girl', 'boy', 'neutral'] as const).map((g) => (
            <button
              key={g}
              onClick={() => updateFilter('gender', g)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors
                ${filters.gender === g
                  ? g === 'girl' ? 'bg-pink-500 text-white' : g === 'boy' ? 'bg-blue-500 text-white' : g === 'neutral' ? 'bg-purple-500 text-white' : 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {g === 'all' ? 'All Names' : g === 'girl' ? 'Girl Names' : g === 'boy' ? 'Boy Names' : 'Neutral'}
            </button>
          ))}
        </div>

        {/* Letter Filter */}
        <div className="flex flex-wrap gap-1 mb-4">
          <button
            onClick={() => updateFilter('startingLetter', undefined)}
            className={`px-2 py-1 rounded text-xs font-medium ${!filters.startingLetter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {LETTERS.map((l) => (
            <button
              key={l}
              onClick={() => updateFilter('startingLetter', filters.startingLetter === l ? undefined : l)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${filters.startingLetter === l ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Origin Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <select
            value={filters.origin || ''}
            onChange={(e) => updateFilter('origin', e.target.value || undefined)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <option value="">All Origins</option>
            {origins.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-5">
        Showing {names.length} of {total} names
      </p>

      {/* Names Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {names.map((name) => (
          <Link
            key={name.id}
            href={`/baby-names/${name.name.toLowerCase()}`}
            className="group bg-white rounded-xl border border-gray-100 p-4 text-center hover:border-brand-300 hover:shadow-md transition-all"
          >
            <p className="font-serif font-bold text-lg text-gray-900 group-hover:text-brand-600 mb-1">
              {name.name}
            </p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full capitalize mb-2 ${
              name.gender === 'girl' ? 'bg-pink-100 text-pink-700' :
              name.gender === 'boy' ? 'bg-blue-100 text-blue-700' :
              'bg-purple-100 text-purple-700'
            }`}>
              {name.gender}
            </span>
            <p className="text-xs text-gray-500 line-clamp-2">{name.meaning}</p>
            <div className="mt-2 flex justify-center">
              {name.popularityTrend === 'rising' && <TrendingUp className="h-3 w-3 text-green-500" />}
              {name.popularityTrend === 'falling' && <TrendingDown className="h-3 w-3 text-red-400" />}
              {name.popularityTrend === 'stable' && <Minus className="h-3 w-3 text-gray-400" />}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
