'use client';

import { Minus, Plus } from 'lucide-react';

interface Props {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  minLabel?: string;
  midLabel?: string;
  maxLabel?: string;
}

export function SliderControl({
  id, label, value, min, max, step = 1, unit = '', onChange, minLabel, midLabel, maxLabel,
}: Props) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div>
      <div className="flex items-center justify-between mb-2 gap-3">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}: <strong>{value}{unit}</strong>
        </label>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={decrement}
            disabled={value <= min}
            aria-label={`Decrease ${label}`}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={value >= max}
            aria-label={`Increase ${label}`}
            className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        aria-label={`${label}: ${value}${unit}`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        className="w-full accent-brand-600"
      />
      {(minLabel || midLabel || maxLabel) && (
        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-400 mt-1">
          <span>{minLabel}</span>
          <span>{midLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
