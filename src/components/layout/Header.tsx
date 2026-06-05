'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search, Calculator } from 'lucide-react';
import { mainNav } from '@/config/nav';
import { Logo } from '@/components/layout/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearch, setMobileSearch] = useState('');
  const pathname = usePathname();

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className={`sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-gray-950/85 transition-shadow duration-200 ${
          scrolled ? 'shadow-md shadow-brand-100/40 dark:shadow-black/20' : ''
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between gap-4">

            {/* Logo */}
            <Logo size="md" />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {mainNav.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                        isActive(item.href)
                          ? 'text-brand-600 bg-brand-50 dark:bg-brand-950/40'
                          : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.title}
                    </Link>
                    {item.items && (
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setOpenDropdown(null);
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setOpenDropdown(item.title);
                          }
                        }}
                        className="px-1 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                        aria-haspopup="menu"
                        aria-expanded={openDropdown === item.title}
                        aria-label={`Toggle ${item.title} submenu`}
                      >
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            openDropdown === item.title ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {/* Dropdown */}
                  {item.items && (
                    <div
                      role="menu"
                      className={`absolute top-full left-0 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl py-2 mt-1.5 transition-all duration-200 origin-top ${
                        openDropdown === item.title
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          className={`flex items-center px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 ${
                            pathname === sub.href
                              ? 'text-brand-600 bg-brand-50 font-medium'
                              : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                          }`}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right: CTA + mobile trigger */}
            <div className="flex items-center gap-2">
              {/* Search link — desktop */}
              <Link
                href="/baby-names"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                title="Search baby names"
              >
                <Search className="h-4 w-4" />
              </Link>

              {/* CTA button */}
              <Link
                href="/tools/due-date-calculator"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 rounded-full transition-all shadow-sm hover:shadow-md"
              >
                <Calculator className="h-3.5 w-3.5" />
                Due Date
              </Link>

              {/* Dark mode toggle */}
              <ThemeToggle />

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Nav ─────────────────────────────────────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            {/* Mobile search */}
            <div className="px-4 pt-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search baby names…"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && mobileSearch.trim()) {
                      window.location.href = `/baby-names?q=${encodeURIComponent(mobileSearch)}`;
                    }
                  }}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 bg-gray-50"
                />
              </div>
            </div>

            {/* Nav links */}
            <div className="px-4 pb-4 space-y-0.5">
              {mainNav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                      isActive(item.href)
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    {item.title}
                    {isActive(item.href) && (
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                    )}
                  </Link>
                  {item.items && (
                    <div className="ml-4 mb-1 space-y-0.5">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-1.5 text-xs text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <Link
                  href="/tools/due-date-calculator"
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl"
                >
                  <Calculator className="h-4 w-4" />
                  Calculate Your Due Date
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
