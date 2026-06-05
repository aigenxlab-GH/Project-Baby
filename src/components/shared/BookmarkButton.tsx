'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const STORAGE_KEY = 'ps_bookmarked_weeks';

function getBookmarks(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

function saveBookmarks(weeks: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks));
  } catch { /* noop */ }
}

interface Props {
  weekNum: number;
}

export function BookmarkButton({ weekNum }: Props) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(getBookmarks().includes(weekNum));
  }, [weekNum]);

  function toggle() {
    const current = getBookmarks();
    const updated = current.includes(weekNum)
      ? current.filter((w) => w !== weekNum)
      : [...current, weekNum].sort((a, b) => a - b);
    saveBookmarks(updated);
    setSaved(!current.includes(weekNum));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-pressed={saved}
        aria-label={saved ? `Remove week ${weekNum} from bookmarks` : `Save week ${weekNum} to bookmarks`}
        title={saved ? 'Remove bookmark' : 'Save this week'}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
          saved
            ? 'bg-brand-50 border-brand-300 text-brand-700 hover:bg-brand-100'
            : 'bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600'
        }`}
      >
        {saved
          ? <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
          : <Bookmark className="h-4 w-4" aria-hidden="true" />}
        {saved ? 'Saved' : 'Save week'}
      </button>

      {/* Toast */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="absolute top-full mt-2 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-10 animate-in fade-in duration-200"
        >
          {saved ? '✓ Saved to bookmarks' : 'Removed from bookmarks'}
        </div>
      )}
    </div>
  );
}

/* ── Saved Weeks Panel (shown in sidebar) ─────────────────── */
export function SavedWeeksPanel() {
  const [weeks, setWeeks] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWeeks(getBookmarks());
    // Listen for storage changes (other tabs)
    const handler = () => setWeeks(getBookmarks());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  if (!mounted || weeks.length === 0) return null;

  function remove(w: number) {
    const updated = getBookmarks().filter((x) => x !== w);
    saveBookmarks(updated);
    setWeeks(updated);
  }

  return (
    <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookmarkCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
        <h3 className="font-semibold text-brand-900 text-sm">Saved Weeks</h3>
        <span className="ml-auto text-xs text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">{weeks.length}</span>
      </div>
      <ul className="space-y-1.5">
        {weeks.map((w) => (
          <li key={w} className="flex items-center justify-between">
            <a
              href={`/pregnancy/week-by-week/week-${w}`}
              className="text-sm text-brand-700 hover:underline font-medium"
            >
              Week {w}
            </a>
            <button
              onClick={() => remove(w)}
              aria-label={`Remove week ${w} from saved`}
              className="text-gray-400 hover:text-red-400 transition-colors text-xs"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => { saveBookmarks([]); setWeeks([]); }}
        className="mt-3 text-xs text-gray-400 hover:text-red-500 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}
