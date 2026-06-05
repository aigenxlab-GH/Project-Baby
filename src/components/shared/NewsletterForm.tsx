'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
  variant?: 'default' | 'footer' | 'inline';
  placeholder?: string;
}

export function NewsletterForm({ variant = 'default', placeholder = 'Enter your email' }: Props) {
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
        setMessage('You\'re subscribed! Check your inbox for a confirmation email.');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }

  const isFooter = variant === 'footer';

  return (
    <form onSubmit={handleSubmit} className={isFooter ? 'flex gap-2 min-w-80' : 'flex flex-col gap-4'}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          {!isFooter && <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className={`w-full rounded-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400
              ${isFooter
                ? 'bg-white text-gray-900 border-white pl-4'
                : 'bg-white border-gray-200 pl-10 text-gray-900'
              }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
      {status === 'error' && <p className="text-red-500 text-xs">{message}</p>}
      {!isFooter && (
        <p className="text-xs text-gray-500 leading-relaxed">
          We respect your privacy. Unsubscribe anytime. See our <a href="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</a> for how we use your data.
        </p>
      )}
    </form>
  );
}
