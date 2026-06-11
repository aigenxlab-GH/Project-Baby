import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Parenting Tips & Baby Development Guides',
  description: 'Expert parenting tips for newborns, infants, and toddlers. Covering sleep training, feeding, development milestones, and more.',
  alternates: { canonical: `${siteConfig.url}/parenting` },
};

const topics = [
  { slug: 'newborn', title: 'Newborn Care', desc: 'The first weeks home with your baby — feeding, sleeping, and newborn basics', emoji: '👶' },
  { slug: 'sleep', title: 'Baby Sleep', desc: 'Sleep training methods, sleep schedules, and safe sleep guidelines', emoji: '😴' },
  { slug: 'feeding', title: 'Feeding & Nutrition', desc: 'Breastfeeding, formula feeding, starting solids, and baby nutrition', emoji: '🍼' },
  { slug: 'development', title: 'Baby Development', desc: 'Developmental milestones, tummy time, and helping your baby grow', emoji: '🌱' },
];

export default function ParentingPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Parenting', href: '/parenting' }]} />
      <Breadcrumb items={[{ name: 'Parenting', href: '/parenting' }]} />
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">Parenting Tips & Guides</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Expert-backed advice to help you navigate the joys and challenges of new parenthood.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/parenting/${topic.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:border-brand-200 transition-all"
          >
            <div className="text-5xl mb-4">{topic.emoji}</div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-brand-600 mb-2">{topic.title}</h2>
            <p className="text-gray-500 mb-4">{topic.desc}</p>
            <div className="flex items-center gap-1 text-brand-600 font-medium text-sm">
              Read Guides <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
