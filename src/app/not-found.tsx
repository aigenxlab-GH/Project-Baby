import Link from 'next/link';
import { Home, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    { label: '🤰 Pregnancy Week by Week', href: '/pregnancy/week-by-week' },
    { label: '✨ Baby Names', href: '/baby-names' },
    { label: '📅 Due Date Calculator', href: '/tools/due-date-calculator' },
    { label: '⭐ Product Reviews', href: '/products' },
    { label: '👶 Parenting Tips', href: '/parenting' },
    { label: '📝 Blog', href: '/blog' },
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">

        {/* Big visual number */}
        <div className="relative mb-8">
          <p className="text-[120px] font-serif font-bold leading-none bg-gradient-to-br from-brand-200 to-purple-200 bg-clip-text text-transparent select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl animate-bounce" aria-hidden="true">🌱</span>
          </div>
        </div>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          This page has wandered off
        </h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Primary actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full text-sm transition-colors shadow-sm"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/baby-names"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full text-sm border border-gray-200 transition-colors"
          >
            <Search className="h-4 w-4" />
            Search Names
          </Link>
        </div>

        {/* Quick links grid */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">Popular pages</p>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors text-left"
              >
                <ArrowRight className="h-3 w-3 text-brand-400 flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
