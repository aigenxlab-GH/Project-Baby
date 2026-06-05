'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Shuffle, Heart, X } from 'lucide-react';
import { searchNames, getAllOrigins } from '@/lib/baby-names';
import type { BabyName, NameFilters } from '@/types/baby-name';

export function BabyNameGenerator() {
  const [filters, setFilters] = useState<NameFilters>({ gender: 'all' });
  const [generated, setGenerated] = useState<BabyName[]>([]);
  const [favorites, setFavorites] = useState<BabyName[]>([]);
  const origins = useMemo(() => getAllOrigins(), []);

  function generate() {
    const { names } = searchNames(filters, 1, 1000);
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    setGenerated(shuffled.slice(0, 12));
  }

  function addFavorite(name: BabyName) {
    setFavorites((prev) => prev.some((n) => n.id === name.id) ? prev : [...prev, name]);
  }

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((n) => n.id !== id));
  }

  function updateFilter(key: keyof NameFilters, value: string | number | undefined) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setGenerated([]);
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Gender</p>
          <div className="flex gap-2 flex-wrap">
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
                {g === 'all' ? 'Any' : g}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Starting letter</p>
            <select
              value={filters.startingLetter || ''}
              onChange={(e) => updateFilter('startingLetter', e.target.value || undefined)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="">Any letter</option>
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Origin</p>
            <select
              value={filters.origin || ''}
              onChange={(e) => updateFilter('origin', e.target.value || undefined)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="">Any origin</option>
              {origins.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
        >
          <Shuffle className="h-5 w-5" />
          Generate Names
        </button>
      </div>

      {/* Generated Names */}
      {generated.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-gray-900">Suggestions</h2>
            <button onClick={generate} className="text-sm text-brand-600 hover:underline flex items-center gap-1">
              <Shuffle className="h-3.5 w-3.5" /> Shuffle
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {generated.map((name) => {
              const isFav = favorites.some((f) => f.id === name.id);
              return (
                <div key={name.id} className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-brand-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <Link href={`/baby-names/${name.name.toLowerCase()}`} className="font-serif font-bold text-lg text-gray-900 hover:text-brand-600">
                      {name.name}
                    </Link>
                    <button onClick={() => isFav ? removeFavorite(name.id) : addFavorite(name)}>
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-pink-500 text-pink-500' : 'text-gray-300 hover:text-pink-400'}`} />
                    </button>
                  </div>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full capitalize mt-1 mb-2 ${name.gender === 'girl' ? 'bg-pink-100 text-pink-700' : name.gender === 'boy' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {name.gender}
                  </span>
                  <p className="text-xs text-gray-500 line-clamp-2">{name.meaning}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
            Your Favorites ({favorites.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map((name) => (
              <div key={name.id} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-pink-200">
                <Link href={`/baby-names/${name.name.toLowerCase()}`} className="font-semibold text-gray-900 hover:text-brand-600">
                  {name.name}
                </Link>
                <button onClick={() => removeFavorite(name.id)}>
                  <X className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
