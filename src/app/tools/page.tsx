import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Calculator, Heart, Timer, Search, List, Activity, ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Free Pregnancy & Baby Tools',
  description: 'Free online tools for expecting parents — due date calculator, ovulation calculator, contraction timer, baby name generator, and registry checklist.',
  alternates: { canonical: `${siteConfig.url}/tools` },
};

const tools = [
  { title: 'Due Date Calculator', desc: 'Find your baby\'s estimated due date by entering your last period date.', href: '/tools/due-date-calculator', icon: Calculator, color: 'text-pink-600 bg-pink-50', badge: 'Most Popular' },
  { title: 'Ovulation Calculator', desc: 'Calculate your fertile window and best days to conceive.', href: '/tools/ovulation-calculator', icon: Heart, color: 'text-purple-600 bg-purple-50' },
  { title: 'Contraction Timer', desc: 'Time contractions during labor and know when to go to the hospital.', href: '/tools/contraction-timer', icon: Timer, color: 'text-blue-600 bg-blue-50' },
  { title: 'Baby Name Generator', desc: 'Generate unique baby name ideas filtered by gender, origin, and more.', href: '/tools/baby-name-generator', icon: Search, color: 'text-green-600 bg-green-50' },
  { title: 'Registry Checklist', desc: 'Complete baby registry with 30+ essential items and product recommendations.', href: '/tools/registry-checklist', icon: List, color: 'text-amber-600 bg-amber-50' },
  { title: 'Symptom Checker', desc: 'Look up pregnancy symptoms to learn what\'s normal and when to call your doctor.', href: '/tools/symptom-checker', icon: Activity, color: 'text-teal-600 bg-teal-50' },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }]} />
      <Breadcrumb items={[{ name: 'Free Tools', href: '/tools' }]} />
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Free Pregnancy & Baby Tools</h1>
        <p className="text-gray-600 text-lg">Helpful calculators, timers, and planners — all free.</p>
      </div>
      <div className="grid gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center gap-5 bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all"
          >
            <div className={`p-4 rounded-2xl flex-shrink-0 ${tool.color}`}>
              <tool.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-gray-900 group-hover:text-brand-600">{tool.title}</h2>
                {tool.badge && (
                  <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">{tool.badge}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-brand-400 flex-shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
