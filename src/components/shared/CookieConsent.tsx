'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

const CONSENT_KEY = 'ps_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage blocked (private mode etc.) — show banner
      setVisible(true);
    }
  }, []);

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch { /* noop */ }
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(CONSENT_KEY, 'declined'); } catch { /* noop */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50
        bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 animate-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3 mb-4">
        <Cookie className="h-5 w-5 text-brand-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">We use cookies</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            We use cookies to improve your experience and show relevant ads. See our{' '}
            <Link href="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</Link>{' '}
            and{' '}
            <Link href="/cookie-policy" className="text-brand-600 hover:underline">Cookie Policy</Link>.
            {' '}California residents:{' '}
            <Link href="/cookie-policy#ccpa" className="text-brand-600 hover:underline">Do Not Sell My Info</Link>.
          </p>
        </div>
        <button
          onClick={decline}
          aria-label="Dismiss cookie notice"
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
        >
          Accept All
        </button>
        <button
          onClick={decline}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 rounded-xl transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
