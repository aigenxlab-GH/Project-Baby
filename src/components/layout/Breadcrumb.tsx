import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Reusable visual breadcrumb nav — pairs with BreadcrumbJsonLd for full SEO coverage.
 * First item is always "Home" (prepended automatically).
 */
export function Breadcrumb({ items, className = '' }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-1 text-xs text-gray-400 mb-6 ${className}`}>
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-brand-600 transition-colors"
      >
        <Home className="h-3 w-3" aria-hidden="true" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            {isLast ? (
              <span
                className="text-gray-600 font-medium truncate max-w-[200px]"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-brand-600 transition-colors truncate max-w-[150px]"
              >
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
