'use client';

import { useState } from 'react';
import { Clock, Droplet, Utensils } from 'lucide-react';
import feedingData from '@/data/feeding-schedule.json';
import { SourceCitations, FEEDING_CITATIONS } from '@/components/shared/SourceCitations';

export function FeedingScheduleTracker() {
  const [selectedId, setSelectedId] = useState(feedingData[0].id);
  const selected = feedingData.find((d) => d.id === selectedId) ?? feedingData[0];

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
        <label htmlFor="age-select" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          How old is your baby?
        </label>
        <select
          id="age-select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          {feedingData.map((d) => (
            <option key={d.id} value={d.id}>{d.ageLabel}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-brand-50 dark:bg-brand-950/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Utensils className="h-4 w-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-300">Feeds Per Day</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{selected.feedsPerDay}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Typical Interval</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{selected.intervalHours} hrs</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Droplet className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">If Formula Feeding</p>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">{selected.formulaAmountOz}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 mb-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">If Breastfeeding</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{selected.breastfeedingNote}</p>
      </div>

      {selected.solidsNote && (
        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-5 mb-4">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Solid Foods</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{selected.solidsNote}</p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-300">
        <strong>These are general ranges, not a prescription.</strong> Every baby feeds differently — follow your baby's hunger and fullness cues, and check with your pediatrician if you have concerns about feeding amounts, weight gain, or growth.
      </div>

      <SourceCitations citations={FEEDING_CITATIONS} />
    </div>
  );
}
