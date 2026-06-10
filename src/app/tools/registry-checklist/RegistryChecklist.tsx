'use client';

import { useState } from 'react';
import { ExternalLink, CheckSquare, Square, ShoppingCart, Printer } from 'lucide-react';
import registryData from '@/data/registry-checklist.json';

const CATEGORY_LABELS: Record<string, string> = {
  nursery: '🛏️ Nursery',
  feeding: '🍼 Feeding',
  travel: '🚗 Travel & On the Go',
  'health-safety': '🏥 Health & Safety',
  bathing: '🛁 Bathing',
  clothing: '👕 Clothing',
  'play-development': '🧸 Play & Development',
};

const PRIORITY_LABELS: Record<string, string> = {
  essential: '🔴 Essential',
  'nice-to-have': '🟡 Nice to Have',
  optional: '⚪ Optional',
};

export function RegistryChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'essential' | 'nice-to-have'>('all');

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const items = registryData.filter(
    (item) => filter === 'all' || item.priority === filter
  );

  const categories = [...new Set(items.map((i) => i.category))];
  const totalChecked = items.filter((i) => checked.has(i.id)).length;
  const progressPct = items.length ? Math.round((totalChecked / items.length) * 100) : 0;

  return (
    <div>
      {/* Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-900">Registry Progress</p>
          <p className="text-sm text-gray-500">{totalChecked} / {items.length} items</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-brand-400 to-brand-600 h-3 rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{progressPct}% complete</p>
      </div>

      {/* Filters */}
      <fieldset className="mb-6">
        <legend className="sr-only">Filter registry items by priority</legend>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'essential', 'nice-to-have'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {f === 'all' ? 'All Items' : f === 'essential' ? '🔴 Essential Only' : '🟡 Nice to Have'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Items by category */}
      {categories.map((category) => {
        const catItems = items.filter((i) => i.category === category);
        if (!catItems.length) return null;

        return (
          <div key={category} className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3">
              <h2 className="font-semibold text-gray-900">
                {CATEGORY_LABELS[category] || category}
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {catItems.map((item) => {
                const isChecked = checked.has(item.id);
                return (
                  <div key={item.id} className={`flex items-start gap-4 px-5 py-4 transition-colors ${isChecked ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                    <button
                      onClick={() => toggle(item.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      aria-label={`${isChecked ? 'Uncheck' : 'Check'} ${item.name}`}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {isChecked
                        ? <CheckSquare className="h-5 w-5 text-green-500" aria-hidden="true" />
                        : <Square className="h-5 w-5 text-gray-300" aria-hidden="true" />
                      }
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-medium ${isChecked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {item.name}
                        </p>
                        <span className="text-xs text-gray-400">{PRIORITY_LABELS[item.priority]}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                      {item.estimatedPrice && (
                        <p className="text-xs text-gray-400 mt-1">Est. {item.estimatedPrice}</p>
                      )}
                    </div>
                    {item.affiliateUrl && (
                      <a
                        href={item.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        aria-label={`Shop for ${item.name} (opens in new tab)`}
                        className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
                        Shop
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="text-center mt-6">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Printer className="h-4 w-4" />
          Print Checklist
        </button>
      </div>

      {/* Email capture CTA */}
      <div className="mt-10 bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-100 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-3">🎁</div>
        <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">
          Get Your Free Birth Plan Template
        </h2>
        <p className="text-sm text-gray-600 mb-5 max-w-sm mx-auto leading-relaxed">
          Sign up for our weekly pregnancy guide and we&apos;ll send you a free, customisable
          birth plan PDF — used by 10,000+ parents.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
            if (email) {
              fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'registry-checklist' }),
              });
              form.reset();
              alert("You're subscribed! Check your inbox for the birth plan template.");
            }
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="registry-email" className="sr-only">Email address</label>
          <input
            id="registry-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 rounded-full border border-brand-200 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 text-sm"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-full text-sm transition-colors"
          >
            Get Free PDF
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
