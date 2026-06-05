import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}
