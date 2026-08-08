'use client';

import { useState, useMemo } from 'react';
import { AlertCircle, Weight, Ruler } from 'lucide-react';
import { estimatePercentile, percentileBand, type Sex } from '@/lib/growthPercentile';

const LB_PER_KG = 2.20462;
const IN_PER_CM = 0.393701;

export function GrowthPercentileCalculator() {
  const [sex, setSex] = useState<Sex>('boys');
  const [ageMonths, setAgeMonths] = useState<string>('6');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('lb');
  const [weight, setWeight] = useState<string>('');
  const [lengthUnit, setLengthUnit] = useState<'cm' | 'in'>('in');
  const [length, setLength] = useState<string>('');

  const age = Math.max(0, Math.min(24, Number(ageMonths) || 0));

  const weightResult = useMemo(() => {
    const val = Number(weight);
    if (!weight || Number.isNaN(val) || val <= 0) return null;
    const kg = weightUnit === 'lb' ? val / LB_PER_KG : val;
    return estimatePercentile(kg, age, sex, 'weightKg');
  }, [weight, weightUnit, age, sex]);

  const lengthResult = useMemo(() => {
    const val = Number(length);
    if (!length || Number.isNaN(val) || val <= 0) return null;
    const cm = lengthUnit === 'in' ? val / IN_PER_CM : val;
    return estimatePercentile(cm, age, sex, 'lengthCm');
  }, [length, lengthUnit, age, sex]);

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Baby's Sex</label>
          <div className="flex gap-2">
            {(['boys', 'girls'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSex(s)}
                aria-pressed={sex === s}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-colors ${sex === s ? 'bg-brand-600 text-white' : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
              >
                {s === 'boys' ? 'Boy' : 'Girl'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="age-months" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Age (months, 0-24)
          </label>
          <input
            id="age-months"
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={ageMonths}
            onChange={(e) => setAgeMonths(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="weight-input" className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Weight className="h-4 w-4" aria-hidden="true" /> Weight
            </label>
            <div className="flex gap-1 text-xs">
              {(['lb', 'kg'] as const).map((u) => (
                <button key={u} onClick={() => setWeightUnit(u)} className={`px-2.5 py-1 rounded-full ${weightUnit === u ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold' : 'text-gray-400'}`}>{u}</button>
              ))}
            </div>
          </div>
          <input
            id="weight-input"
            type="number"
            min={0}
            step={0.1}
            placeholder={weightUnit === 'lb' ? 'e.g. 16.5' : 'e.g. 7.5'}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="length-input" className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Ruler className="h-4 w-4" aria-hidden="true" /> Length / Height
            </label>
            <div className="flex gap-1 text-xs">
              {(['in', 'cm'] as const).map((u) => (
                <button key={u} onClick={() => setLengthUnit(u)} className={`px-2.5 py-1 rounded-full ${lengthUnit === u ? 'bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold' : 'text-gray-400'}`}>{u}</button>
              ))}
            </div>
          </div>
          <input
            id="length-input"
            type="number"
            min={0}
            step={0.1}
            placeholder={lengthUnit === 'in' ? 'e.g. 26' : 'e.g. 66'}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
      </div>

      {(weightResult !== null || lengthResult !== null) && (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {weightResult !== null && (
            <div className="bg-brand-50 dark:bg-brand-950/30 rounded-2xl p-5">
              <p className="text-sm font-semibold text-brand-800 dark:text-brand-300 mb-1">Weight</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{percentileBand(weightResult).label}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{percentileBand(weightResult).description}</p>
            </div>
          )}
          {lengthResult !== null && (
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Length / Height</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{percentileBand(lengthResult).label}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{percentileBand(lengthResult).description}</p>
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="text-sm text-blue-800 dark:text-blue-300">
          <strong>This is an estimate for general reference, not a clinical growth chart.</strong> It uses simplified WHO reference medians and an approximate statistical method — it will not exactly match the percentile your pediatrician plots on an official growth chart, especially at the very low or very high end. A single percentile also matters far less than your baby's growth trend over time. This tool is for educational purposes only and is not a substitute for professional medical advice — always discuss growth and percentiles with your pediatrician.
        </div>
      </div>
    </div>
  );
}
