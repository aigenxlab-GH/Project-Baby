'use client';

import { useState } from 'react';
import { addDays, format, startOfDay } from 'date-fns';
import { Heart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Result {
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
}

export function OvulationCalculator() {
  const [lmpDate, setLmpDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    if (!lmpDate) { setError('Please enter your last period date.'); return; }

    const lmp = startOfDay(new Date(lmpDate));
    const ovulationDate = addDays(lmp, cycleLength - 14);
    const fertileStart = addDays(ovulationDate, -5);
    const fertileEnd = addDays(ovulationDate, 1);
    const nextPeriod = addDays(lmp, cycleLength);

    setResult({ ovulationDate, fertileStart, fertileEnd, nextPeriod });
  }

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="space-y-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First day of your last period
            </label>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              max={today}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average cycle length: <strong>{cycleLength} days</strong>
            </label>
            <input
              type="range" min={21} max={45} value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>21 days</span><span>28 typical</span><span>45 days</span>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={calculate}
          className="w-full flex items-center justify-center gap-2 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-lg transition-colors"
        >
          <Heart className="h-5 w-5" /> Calculate Fertile Window
        </button>

        {result && (
          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">Estimated Ovulation Date</p>
              <p className="font-serif text-4xl font-bold text-gray-900">{format(result.ovulationDate, 'MMMM d, yyyy')}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
              <p className="font-semibold text-green-900 mb-1">🟢 Most Fertile Window</p>
              <p className="text-green-800">
                <strong>{format(result.fertileStart, 'MMM d')}</strong> — <strong>{format(result.fertileEnd, 'MMM d, yyyy')}</strong>
              </p>
              <p className="text-sm text-green-700 mt-1">Your 6 highest-fertility days</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Next Period (est.)</p>
                <p className="font-bold text-gray-900">{format(result.nextPeriod, 'MMM d, yyyy')}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Cycle Length</p>
                <p className="font-bold text-gray-900">{cycleLength} days</p>
              </div>
            </div>
            <Link
              href="/tools/due-date-calculator"
              className="flex items-center justify-between p-4 bg-white border border-brand-100 rounded-xl hover:border-brand-400 transition-all"
            >
              <div>
                <p className="font-semibold text-gray-900">Got a positive test?</p>
                <p className="text-sm text-gray-500">Calculate your due date →</p>
              </div>
              <ChevronRight className="h-5 w-5 text-brand-500" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
