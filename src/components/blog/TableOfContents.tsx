'use client';

import { useState, useEffect, useRef } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import type { TocItem } from '@/lib/toc';

export type { TocItem };

interface Props {
  items: TocItem[];
}

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (!items.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ── Desktop: sticky sidebar card ─────────────────── */}
      <nav
        aria-label="Table of contents"
        className="hidden xl:block sticky top-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 max-h-[70vh] overflow-y-auto"
      >
        <div className="flex items-center gap-2 mb-4">
          <List className="h-4 w-4 text-brand-600" aria-hidden="true" />
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">In this article</h2>
        </div>
        <ol className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`text-left w-full text-sm leading-snug py-1 px-2 rounded-lg transition-all ${
                  item.level === 3 ? 'pl-5' : ''
                } ${
                  activeId === item.id
                    ? 'bg-brand-100 dark:bg-brand-950/50 text-brand-700 dark:text-brand-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.level === 3 && <span className="text-gray-300 dark:text-gray-600 mr-1">└</span>}
                {item.text}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Mobile: collapsible inline banner ────────────── */}
      <div className="xl:hidden mb-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="toc-mobile-list"
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Contents ({items.length} sections)
          </span>
          {mobileOpen
            ? <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            : <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />}
        </button>

        {mobileOpen && (
          <ol id="toc-mobile-list" className="px-5 pb-4 space-y-1 border-t border-gray-100 dark:border-gray-800">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`text-left w-full text-sm py-1.5 text-brand-600 dark:text-brand-400 hover:underline ${item.level === 3 ? 'pl-4' : ''}`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}

// injectHeadingIds and extractToc live in @/lib/toc (server-safe)
// Import them from there in Server Components.
