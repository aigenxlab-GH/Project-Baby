/**
 * Derived statistics for pregnancy week pages.
 *
 * Everything here is COMPUTED from the existing src/data/pregnancy-weeks.json
 * dataset (unit conversions, week-over-week deltas, timeline arithmetic). No
 * medical claims are invented — the qualitative content on those pages still
 * comes from the curated dataset, and size figures are averages that vary
 * considerably between healthy pregnancies, which the UI states explicitly.
 */

export interface WeekSize {
  comparison: string;
  lengthCm: number;
  weightGrams: number;
}

export interface WeekRecord {
  week: number;
  trimester: number;
  babySize: WeekSize;
}

const CM_PER_INCH = 2.54;
const GRAMS_PER_OZ = 28.3495;
const GRAMS_PER_LB = 453.592;

export function cmToInches(cm: number): string {
  return (cm / CM_PER_INCH).toFixed(cm < 5 ? 2 : 1);
}

/** Grams as oz below a pound, then as "Xlb Yoz" — how US parents actually read it. */
export function gramsToImperial(g: number): string {
  if (g <= 0) return '—';
  if (g < GRAMS_PER_LB) return `${(g / GRAMS_PER_OZ).toFixed(1)} oz`;
  const lb = Math.floor(g / GRAMS_PER_LB);
  const oz = Math.round((g - lb * GRAMS_PER_LB) / GRAMS_PER_OZ);
  // 16 oz rounds up into the next pound rather than displaying "3lb 16oz".
  return oz === 16 ? `${lb + 1} lb` : `${lb} lb ${oz} oz`;
}

/** Growth since the previous week, or null at week 1 / when data is absent. */
export function weekOverWeekGrowth(weeks: WeekRecord[], week: number) {
  const cur = weeks.find((w) => w.week === week);
  const prev = weeks.find((w) => w.week === week - 1);
  if (!cur || !prev) return null;
  const lengthDelta = +(cur.babySize.lengthCm - prev.babySize.lengthCm).toFixed(2);
  const weightDelta = Math.round(cur.babySize.weightGrams - prev.babySize.weightGrams);
  if (lengthDelta <= 0 && weightDelta <= 0) return null;
  return {
    lengthDelta,
    weightDelta,
    // Percentage weight gain is the striking number in late pregnancy.
    weightPct:
      prev.babySize.weightGrams > 0
        ? Math.round((weightDelta / prev.babySize.weightGrams) * 100)
        : null,
  };
}

/** How much of the baby's eventual birth size has been reached by this week. */
export function shareOfBirthSize(weeks: WeekRecord[], week: number) {
  const cur = weeks.find((w) => w.week === week);
  const term = weeks.find((w) => w.week === 40);
  if (!cur || !term || term.babySize.lengthCm <= 0) return null;
  return {
    lengthPct: Math.round((cur.babySize.lengthCm / term.babySize.lengthCm) * 100),
    weightPct:
      term.babySize.weightGrams > 0 && cur.babySize.weightGrams > 0
        ? Math.round((cur.babySize.weightGrams / term.babySize.weightGrams) * 100)
        : null,
  };
}

export function timeline(week: number) {
  const weeksLeft = Math.max(0, 40 - week);
  const trimesterEnd = week <= 13 ? 13 : week <= 27 ? 27 : 40;
  return {
    weeksLeft,
    daysLeft: weeksLeft * 7,
    percentComplete: Math.round((week / 40) * 100),
    weeksToTrimesterEnd: Math.max(0, trimesterEnd - week),
    trimesterEnd,
    // "Full term" is 39-40 weeks; 37 is the start of early term.
    weeksToFullTerm: Math.max(0, 39 - week),
  };
}
