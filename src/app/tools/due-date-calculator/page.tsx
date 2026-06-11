import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { DueDateCalculator } from './DueDateCalculator';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Due Date Calculator — Find Your Baby\'s Due Date',
  description: 'Calculate your pregnancy due date instantly. Enter your LMP or conception date to find your estimated due date, current week, and key milestones.',
  alternates: { canonical: `${siteConfig.url}/tools/due-date-calculator` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is a due date calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). This is called Naegele\'s rule. If you know your conception date, add 266 days (38 weeks) instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the due date calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The due date is an estimate. Only about 5% of babies are born on their exact due date. Most babies are born within 2 weeks before or after the estimated due date. Your healthcare provider may adjust the date based on ultrasound measurements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a normal pregnancy length?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A full-term pregnancy is 39–40 weeks. Babies born at 37–38 weeks are considered early term, 39–40 weeks are full term, and 41 weeks+ are late term. Babies born before 37 weeks are premature.',
      },
    },
  ],
};

export default function DueDateCalculatorPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Due Date Calculator', href: '/tools/due-date-calculator' },
      ]} />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Pregnancy Due Date Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Enter your last period or conception date to instantly calculate your due date,
            current pregnancy week, and trimester.
          </p>
        </div>
        <DueDateCalculator />

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
