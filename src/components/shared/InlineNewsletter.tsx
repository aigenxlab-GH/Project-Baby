'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Gift } from 'lucide-react';

interface Props {
  variant?: 'article' | 'tool' | 'compact';
  headline?: string;
  subtext?: string;
}

export function InlineNewsletter({
  variant = 'article',
  headline = 'Get weekly pregnancy updates',
  subtext = 'Free week-by-week emails + a free Birth Plan template when you subscribe.',
}: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage('You\'re in! Check your inbox for your free Birth Plan template.');
        setEmail('');
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="my-10 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-3">
        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-900">You&apos;re subscribed!</p>
          <p className="text-sm text-green-800 mt-1">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="my-8 bg-brand-50 border border-brand-100 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-4 w-4 text-brand-600" aria-hidden="true" />
          <p className="font-semibold text-brand-900 text-sm">{headline}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="inline-email-compact" className="sr-only">Email address</label>
          <input
            id="inline-email-compact"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-required="true"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
        {status === 'error' && <p className="text-red-500 text-xs mt-2" role="alert">{message}</p>}
      </div>
    );
  }

  return (
    <aside
      aria-label="Newsletter signup"
      className="my-10 bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-100 rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Mail className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-lg font-bold text-gray-900">{headline}</h3>
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              <Gift className="h-3 w-3" aria-hidden="true" /> Free gift
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{subtext}</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="inline-email" className="sr-only">Email address</label>
            <input
              id="inline-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              aria-required="true"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing…' : 'Get Free Updates'}
            </button>
          </form>
          {status === 'error' && <p className="text-red-500 text-xs mt-2" role="alert">{message}</p>}
          <p className="text-xs text-gray-400 mt-3">
            No spam. Unsubscribe any time. See our{' '}
            <a href="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </aside>
  );
}
