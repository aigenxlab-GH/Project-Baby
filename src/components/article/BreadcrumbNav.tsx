import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  current: string;
}

export function BreadcrumbNav({ items, current }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6"
    >
      <ol className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-400 flex-wrap">
        <li>
          <Link
            href="/"
            className="min-h-[44px] flex items-center hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Home
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            {index === items.length - 1 ? (
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="min-h-[44px] flex items-center hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}

        {current && (
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-600 dark:text-gray-400 font-medium truncate max-w-[250px]">
              {current}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
