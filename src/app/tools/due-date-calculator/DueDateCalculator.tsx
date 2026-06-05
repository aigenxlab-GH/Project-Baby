'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  addDays, differenceInDays,
  format, isAfter
} from 'date-fns';
import { Calculator, Calendar, Baby, ChevronRight } from 'lucide-react';

type Method = 'lmp' | 'conception' | 'ivf';

interface Result {
  dueDate: Date;
  weeksPregnant: number;
  daysPregnant: number;
  trimester: 1 | 2 | 3;
  weekInTrimester: number;
  daysUntilDue: number;
  isOverdue: boolean;
}

function getTrimester(weeks: number): 1 | 2 | 3 {
  if (weeks <= 13) return 1;
  if (weeks <= 27) return 2;
  return 3;
}

export function DueDateCalculator() {
  const [method, setMethod] = useState<Method>('lmp');
  const [dateInput, setDateInput] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    if (!dateInput) {
      setError('Please enter a date.');
      return;
    }

    const inputDate = new Date(dateInput);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isAfter(inputDate, today)) {
      setError('Date cannot be in the future.');
      return;
    }

    let conceptionDate: Date;
    let dueDate: Date;

    if (method === 'lmp') {
      const ovulationOffset = cycleLength - 14;
      dueDate = addDays(inputDate, 280 + (ovulationOffset - 14));
      conceptionDate = addDays(inputDate, 14 + (ovulationOffset - 14));
    } else if (method === 'conception') {
      dueDate = addDays(inputDate, 266);
      conceptionDate = inputDate;
    } else {
      // IVF: add 266 days from egg retrieval (similar to conception)
      dueDate = addDays(inputDate, 266);
      conceptionDate = inputDate;
    }

    const daysPregnant = differenceInDays(today, method === 'lmp' ? inputDate : conceptionDate) + (method === 'lmp' ? 0 : 14);
    const weeksPregnant = Math.floor(Math.max(0, daysPregnant) / 7);
    const daysUntilDue = differenceInDays(dueDate, today);

    setResult({
      dueDate,
      weeksPregnant,
      daysPregnant: Math.max(0, daysPregnant),
      trimester: getTrimester(weeksPregnant),
      weekInTrimester: weeksPregnant <= 13 ? weeksPregnant : weeksPregnant <= 27 ? weeksPregnant - 13 : weeksPregnant - 27,
      daysUntilDue,
      isOverdue: daysUntilDue < 0,
    });
  }

  const trimesterLabel = result
    ? result.trimester === 1 ? 'First Trimester' : result.trimester === 2 ? 'Second Trimester' : 'Third Trimester'
    : '';

  const maxDate = format(new Date(), 'yyyy-MM-dd');
  const minDate = format(addDays(new Date(), -280), 'yyyy-MM-dd');

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Method selector */}
      <div className="bg-gray-50 border-b border-gray-100 p-4">
        <div className="flex gap-2 flex-wrap">
          {([
            { id: 'lmp', label: 'Last Period (LMP)' },
            { id: 'conception', label: 'Conception Date' },
            { id: 'ivf', label: 'IVF Transfer Date' },
          ] as const).map((m) => (
            <button
              key={m.id}
              onClick={() => { setMethod(m.id); setResult(null); setError(''); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${method === m.id ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-brand-50 border border-gray-200'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        {/* Date Input */}
        <div className="mb-6">
          <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" aria-hidden="true" />
            {method === 'lmp' ? 'First day of your last period' : method === 'conception' ? 'Conception date' : 'IVF transfer date'}
          </label>
          <input
            id="date-input"
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            min={minDate}
            max={maxDate}
            aria-required="true"
            aria-describedby={error ? 'date-error' : undefined}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        {/* Cycle length (LMP only) */}
        {method === 'lmp' && (
          <div className="mb-6">
            <label htmlFor="cycle-length" className="block text-sm font-medium text-gray-700 mb-2">
              Average cycle length: <strong>{cycleLength} days</strong>
            </label>
            <input
              id="cycle-length"
              type="range"
              min={21}
              max={45}
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value))}
              aria-label={`Cycle length: ${cycleLength} days`}
              aria-valuemin={21}
              aria-valuemax={45}
              aria-valuenow={cycleLength}
              aria-valuetext={`${cycleLength} days`}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>21 days</span>
              <span>28 days (typical)</span>
              <span>45 days</span>
            </div>
          </div>
        )}

        {error && <p id="date-error" className="text-red-500 text-sm mb-4" role="alert">{error}</p>}

        <button
          onClick={calculate}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-lg transition-colors"
        >
          <Calculator className="h-5 w-5" />
          Calculate Due Date
        </button>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-4">
            {/* Due Date — Hero */}
            <div className="bg-gradient-to-br from-brand-50 to-pink-50 rounded-2xl p-6 text-center border border-brand-100">
              <Baby className="h-10 w-10 text-brand-500 mx-auto mb-3" />
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                {result.isOverdue ? 'Your due date was' : 'Your estimated due date'}
              </p>
              <p className="font-serif text-4xl font-bold text-gray-900">
                {format(result.dueDate, 'MMMM d, yyyy')}
              </p>
              <p className="text-brand-600 font-medium mt-2">
                {result.isOverdue
                  ? `${Math.abs(result.daysUntilDue)} days past due`
                  : `${result.daysUntilDue} days to go`}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Weeks Pregnant', value: `${result.weeksPregnant} weeks` },
                { label: 'Trimester', value: trimesterLabel },
                { label: 'Due Date (Alt)', value: format(result.dueDate, 'dd MMM yyyy') },
                { label: 'Week in Trimester', value: `Week ${result.weekInTrimester}` },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className="font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Link to week guide */}
            {result.weeksPregnant >= 1 && result.weeksPregnant <= 40 && (
              <Link
                href={`/pregnancy/week-by-week/week-${result.weeksPregnant}`}
                className="flex items-center justify-between p-4 bg-white border border-brand-100 rounded-xl hover:border-brand-400 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-900">Read Week {result.weeksPregnant} Guide</p>
                  <p className="text-sm text-gray-500">Baby development, symptoms & tips</p>
                </div>
                <ChevronRight className="h-5 w-5 text-brand-500" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
