'use client';

import { AlertCircle } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'inline' | 'minimal';
  className?: string;
}

export function MedicalDisclaimer({ variant = 'banner', className = '' }: Props) {
  if (variant === 'minimal') {
    return (
      <p className={`text-xs text-gray-500 ${className}`}>
        <strong>Medical Disclaimer:</strong> This content is for informational purposes only. Always consult your healthcare provider.
      </p>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4 mb-6 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-900 dark:text-amber-300 font-semibold mb-1">Medical Information</p>
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
              The information on this page is for educational and informational purposes only. It is not medical advice and should not be used to diagnose or treat any medical condition. Always consult your healthcare provider (doctor, midwife, or nurse) before making any decisions about your pregnancy or your baby&apos;s health.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4 mb-8 ${className}`} role="alert" aria-live="polite">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-red-900 dark:text-red-300 text-sm mb-1">Medical Disclaimer</h3>
          <p className="text-xs text-red-800 dark:text-red-400 leading-relaxed">
            This content is for educational and informational purposes only. It is <strong>not medical advice</strong> and is not a substitute for professional medical diagnosis, treatment, or advice from your healthcare provider. Always seek the advice of your doctor, midwife, obstetrician, paediatrician, or other qualified healthcare professional with any questions you may have about pregnancy, your baby, or your health. Never disregard or delay professional medical advice because of something you&apos;ve read here.
          </p>
          <p className="text-xs text-red-700 dark:text-red-400 mt-2 font-medium">
            If you are experiencing an emergency, call 999 (UK) or 911 (US) immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
