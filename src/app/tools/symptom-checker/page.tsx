import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { SymptomChecker } from './SymptomChecker';

export const metadata: Metadata = {
  title: 'Pregnancy Symptom Checker — Is This Normal?',
  description: 'Look up pregnancy symptoms to understand what\'s normal, what to monitor, and when to call your doctor immediately.',
  alternates: { canonical: `${siteConfig.url}/tools/symptom-checker` },
};

export default function SymptomCheckerPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">Pregnancy Symptom Checker</h1>
        <p className="text-gray-600 text-lg">Select your symptoms to learn what&apos;s normal and when to call your provider.</p>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-900">
          <strong>Disclaimer:</strong> This tool is for informational purposes only. Always contact your healthcare provider if you are concerned about any symptoms.
        </div>
      </div>
      <SymptomChecker />
    </div>
  );
}
