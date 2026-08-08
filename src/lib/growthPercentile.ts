import whoData from '@/data/who-growth-medians.json';

export type Sex = 'boys' | 'girls';
export type Measure = 'weightKg' | 'lengthCm';

// Approximate coefficient of variation (SD as a fraction of the median) per
// measure. WHO's real growth standards use a skew-adjusted LMS/Box-Cox method
// per age; this is a simplified normal-distribution approximation, only
// reasonably accurate near the middle of the distribution (roughly 5th-95th
// percentile) -- see the disclaimer shown alongside every result.
const APPROX_CV: Record<Measure, number> = {
  weightKg: 0.13,
  lengthCm: 0.035,
};

function interpolateMedian(ageMonths: number, sex: Sex, measure: Measure): number {
  const ages = whoData.ageMonths;
  const values = whoData[sex][measure];
  const clamped = Math.max(ages[0], Math.min(ageMonths, ages[ages.length - 1]));

  for (let i = 0; i < ages.length - 1; i++) {
    if (clamped >= ages[i] && clamped <= ages[i + 1]) {
      const span = ages[i + 1] - ages[i];
      const t = span === 0 ? 0 : (clamped - ages[i]) / span;
      return values[i] + t * (values[i + 1] - values[i]);
    }
  }
  return values[values.length - 1];
}

// Standard normal CDF via the Abramowitz & Stegun approximation.
function normalCdf(z: number): number {
  const b1 = 0.319381530, b2 = -0.356563782, b3 = 1.781477937, b4 = -1.821255978, b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;
  if (z >= 0) {
    const t = 1 / (1 + p * z);
    return 1 - c * Math.exp((-z * z) / 2) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
  const t = 1 / (1 - p * z);
  return c * Math.exp((-z * z) / 2) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
}

export function estimatePercentile(value: number, ageMonths: number, sex: Sex, measure: Measure): number {
  const median = interpolateMedian(ageMonths, sex, measure);
  const sd = median * APPROX_CV[measure];
  const z = (value - median) / sd;
  const percentile = normalCdf(z) * 100;
  return Math.round(Math.max(0.1, Math.min(99.9, percentile)) * 10) / 10;
}

export function percentileBand(percentile: number): { label: string; description: string } {
  if (percentile < 3) return { label: 'Below the 3rd percentile', description: 'This is on the lower end of the typical range. Worth discussing at your next checkup, though many healthy babies track along lower percentile lines consistently.' };
  if (percentile < 15) return { label: `Around the ${Math.round(percentile)}th percentile`, description: 'This is in the lower-typical range — many healthy babies grow along this line.' };
  if (percentile < 85) return { label: `Around the ${Math.round(percentile)}th percentile`, description: 'This is within the typical range for this age.' };
  if (percentile < 97) return { label: `Around the ${Math.round(percentile)}th percentile`, description: 'This is in the higher-typical range — many healthy babies grow along this line.' };
  return { label: 'Above the 97th percentile', description: 'This is on the higher end of the typical range. Worth discussing at your next checkup, though many healthy babies track along higher percentile lines consistently.' };
}
