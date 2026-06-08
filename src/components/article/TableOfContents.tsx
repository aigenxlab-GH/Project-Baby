'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Extract headings from the article content
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll('h2, h3, h4')
    ) as HTMLElement[];

    const extractedHeadings: Heading[] = headingElements
      .filter((heading) => heading.textContent)
      .map((heading) => {
        // Generate ID if not present
        if (!heading.id) {
          heading.id = heading.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-') || '';
        }
        return {
          id: heading.id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1]),
        };
      });

    setHeadings(extractedHeadings);
  }, []);

  useEffect(() => {
    // Track scroll position to highlight current section
    const handleScroll = () => {
      const headingElements = headings.map((h) =>
        document.getElementById(h.id)
      );

      let currentId = '';
      for (const heading of headingElements) {
        if (!heading) continue;
        if (heading.getBoundingClientRect().top < 100) {
          currentId = heading.id;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile TOC - Collapsible */}
      <div className="xl:hidden mb-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list h-4 w-4 text-brand-600"
            >
              <path d="M3 12h.01"></path>
              <path d="M3 18h.01"></path>
              <path d="M3 6h.01"></path>
              <path d="M8 12h13"></path>
              <path d="M8 18h13"></path>
              <path d="M8 6h13"></path>
            </svg>
            Contents ({headings.length} sections)
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <nav className="px-5 py-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`text-left w-full text-sm leading-snug py-1 px-2 rounded-lg transition-all ${
                      activeId === heading.id
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    style={{ paddingLeft: `${(heading.level - 2) * 16 + 8}px` }}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop TOC - Sticky Sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden xl:block sticky top-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 max-h-[70vh] overflow-y-auto"
      >
        <div className="flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-list h-4 w-4 text-brand-600"
          >
            <path d="M3 12h.01"></path>
            <path d="M3 18h.01"></path>
            <path d="M3 6h.01"></path>
            <path d="M8 12h13"></path>
            <path d="M8 18h13"></path>
            <path d="M8 6h13"></path>
          </svg>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            In this article
          </h2>
        </div>

        <ol className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full text-sm leading-snug py-1 px-2 rounded-lg transition-all ${
                  activeId === heading.id
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
