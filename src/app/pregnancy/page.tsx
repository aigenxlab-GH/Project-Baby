import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Baby, Calculator } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Pregnancy Guide — Week by Week, Symptoms & Tips',
  description: 'Complete pregnancy guide covering all 40 weeks of pregnancy, symptoms, nutrition, exercise, and preparation for birth.',
  alternates: { canonical: `${siteConfig.url}/pregnancy` },
};

export default function PregnancyHubPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Pregnancy', href: '/pregnancy' }]} />
      <Breadcrumb items={[{ name: 'Pregnancy', href: '/pregnancy' }]} />
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Pregnancy Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about your pregnancy — week by week guides, symptoms,
          nutrition, and preparing for birth.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Link href="/pregnancy/week-by-week" className="group bg-gradient-to-br from-brand-50 to-pink-50 rounded-3xl p-8 border border-brand-100 hover:border-brand-300 hover:shadow-lg transition-all">
          <Baby className="h-10 w-10 text-brand-500 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Week by Week</h2>
          <p className="text-gray-600 mb-4">Follow your baby&apos;s development and your changing body, week by week through all 40 weeks.</p>
          <div className="flex items-center gap-1 text-brand-600 font-medium">
            Start Reading <ChevronRight className="h-4 w-4" />
          </div>
        </Link>

        <Link href="/tools/due-date-calculator" className="group bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all">
          <Calculator className="h-10 w-10 text-purple-500 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Due Date Calculator</h2>
          <p className="text-gray-600 mb-4">Find your estimated due date and see how many weeks pregnant you are today.</p>
          <div className="flex items-center gap-1 text-purple-600 font-medium">
            Calculate Now <ChevronRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { title: 'First Trimester', desc: 'Weeks 1–13: conception, morning sickness, first ultrasound', href: '/pregnancy/week-by-week/week-1', emoji: '🌱' },
          { title: 'Second Trimester', desc: 'Weeks 14–27: feeling movements, anatomy scan, baby shower', href: '/pregnancy/week-by-week/week-14', emoji: '🥑' },
          { title: 'Third Trimester', desc: 'Weeks 28–40: nesting, birth prep, hospital bag, labor signs', href: '/pregnancy/week-by-week/week-28', emoji: '👶' },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-brand-200 transition-all">
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-brand-600 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
