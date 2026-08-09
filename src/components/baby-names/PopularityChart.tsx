import type { StatPoint } from '@/lib/name-stats';

interface Props {
  series: StatPoint[];
  name: string;
  /** Tailwind stroke/fill hue, matched to the name's gender styling. */
  tone: 'pink' | 'blue' | 'purple';
}

const TONES = {
  pink:   { stroke: '#db2777', fill: '#fce7f3', dark: '#f9a8d4' },
  blue:   { stroke: '#2563eb', fill: '#dbeafe', dark: '#93c5fd' },
  purple: { stroke: '#7c3aed', fill: '#ede9fe', dark: '#c4b5fd' },
};

const W = 720;
const H = 220;
const PAD = { top: 16, right: 12, bottom: 28, left: 12 };

/**
 * Static inline SVG chart of births per year. Server-rendered with no client
 * JS and no external chart library — the project's CSP blocks remote assets,
 * and this keeps the page fully static.
 */
export function PopularityChart({ series, name, tone }: Props) {
  if (series.length < 2) return null;

  const colors = TONES[tone];
  const minYear = series[0][0];
  const maxYear = series[series.length - 1][0];

  // The Y axis is births per year, so the point marked on the chart is the
  // highest-BIRTHS year. That is often a different year from the best-RANK
  // year described in the prose above (a name can hit #1 in a year with fewer
  // total births, because the whole birth cohort was smaller). Labelling this
  // marker with the peak-rank year would pair two unrelated numbers.
  let maxPoint = series[0];
  for (const p of series) if (p[1] > maxPoint[1]) maxPoint = p;
  const maxCount = maxPoint[1];

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (year: number) =>
    PAD.left + ((year - minYear) / Math.max(1, maxYear - minYear)) * plotW;
  const y = (count: number) => PAD.top + plotH - (count / maxCount) * plotH;

  const line = series.map((p) => `${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
  const area = `${PAD.left},${PAD.top + plotH} ${line} ${x(maxYear).toFixed(1)},${(PAD.top + plotH).toFixed(1)}`;

  const peak = maxPoint;

  // Year ticks: first, last, and a few evenly spaced between.
  const tickCount = 5;
  const ticks: number[] = [];
  for (let i = 0; i < tickCount; i++) {
    ticks.push(Math.round(minYear + ((maxYear - minYear) * i) / (tickCount - 1)));
  }

  return (
    <figure className="my-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Chart of babies named ${name} per year in the United States, from ${minYear} to ${maxYear}. The highest yearly total was ${maxCount.toLocaleString()} births in ${maxPoint[0]}.`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* horizontal gridlines */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD.left}
            x2={W - PAD.right}
            y1={PAD.top + plotH - f * plotH}
            y2={PAD.top + plotH - f * plotH}
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="1"
          />
        ))}

        <polygon points={area} fill={colors.fill} className="dark:opacity-20" />
        <polyline points={line} fill="none" stroke={colors.stroke} strokeWidth="2.5" strokeLinejoin="round" />

        {peak && (
          <>
            <circle cx={x(peak[0])} cy={y(peak[1])} r="4.5" fill={colors.stroke} />
            <text
              x={Math.min(Math.max(x(peak[0]), 34), W - 40)}
              y={Math.max(y(peak[1]) - 10, 12)}
              textAnchor="middle"
              className="fill-gray-700 dark:fill-gray-200"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {peak[1].toLocaleString()}
            </text>
          </>
        )}

        {ticks.map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - 8}
            textAnchor="middle"
            className="fill-gray-500 dark:fill-gray-400"
            style={{ fontSize: 12 }}
          >
            {t}
          </text>
        ))}
      </svg>
      <figcaption className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        Babies named {name} per year in the U.S., {minYear}–{maxYear}. Highest yearly total:{' '}
        {maxCount.toLocaleString()} in {maxPoint[0]}.
      </figcaption>
    </figure>
  );
}
