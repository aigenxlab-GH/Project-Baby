import type { WeekRecord } from '@/lib/pregnancy-week-stats';

interface Props {
  weeks: WeekRecord[];
  currentWeek: number;
  metric: 'length' | 'weight';
}

const W = 720;
const H = 200;
const PAD = { top: 16, right: 14, bottom: 26, left: 14 };

/**
 * Static inline SVG growth curve across all 40 weeks, with the current week
 * marked. Server-rendered, no client JS and no charting library — the project's
 * CSP blocks remote assets and these pages are statically prerendered.
 *
 * Plots the same curated averages already shown on the page, so it adds a way
 * to read the data rather than any new claim.
 */
export function GrowthCurveChart({ weeks, currentWeek, metric }: Props) {
  const points = weeks
    .map((w) => ({
      week: w.week,
      value: metric === 'length' ? w.babySize.lengthCm : w.babySize.weightGrams,
    }))
    .filter((p) => p.value > 0)
    .sort((a, b) => a.week - b.week);

  if (points.length < 2) return null;

  const maxVal = Math.max(...points.map((p) => p.value));
  const minWeek = points[0].week;
  const maxWeek = points[points.length - 1].week;

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (wk: number) => PAD.left + ((wk - minWeek) / Math.max(1, maxWeek - minWeek)) * plotW;
  const y = (v: number) => PAD.top + plotH - (v / maxVal) * plotH;

  const line = points.map((p) => `${x(p.week).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${x(minWeek).toFixed(1)},${(PAD.top + plotH).toFixed(1)} ${line} ${x(maxWeek).toFixed(1)},${(PAD.top + plotH).toFixed(1)}`;

  const current = points.find((p) => p.week === currentWeek);
  const unit = metric === 'length' ? 'cm' : 'g';
  const label = metric === 'length' ? 'Length' : 'Weight';
  const stroke = metric === 'length' ? '#7c3aed' : '#db2777';
  const fill = metric === 'length' ? '#ede9fe' : '#fce7f3';

  const ticks = [minWeek, 10, 20, 30, maxWeek].filter(
    (t, i, arr) => t >= minWeek && t <= maxWeek && arr.indexOf(t) === i
  );

  return (
    <figure className="mt-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Average fetal ${label.toLowerCase()} by pregnancy week, from week ${minWeek} to week ${maxWeek}. At week ${currentWeek} the average is ${current ? current.value : 'not recorded'} ${unit}.`}
        preserveAspectRatio="xMidYMid meet"
      >
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

        <polygon points={area} fill={fill} className="dark:opacity-20" />
        <polyline points={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />

        {current && (
          <>
            <line
              x1={x(current.week)}
              x2={x(current.week)}
              y1={PAD.top}
              y2={PAD.top + plotH}
              stroke={stroke}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.6"
            />
            <circle cx={x(current.week)} cy={y(current.value)} r="5" fill={stroke} />
            <text
              x={Math.min(Math.max(x(current.week), 40), W - 46)}
              y={Math.max(y(current.value) - 11, 13)}
              textAnchor="middle"
              className="fill-gray-800 dark:fill-gray-100"
              style={{ fontSize: 13, fontWeight: 700 }}
            >
              {current.value}{unit}
            </text>
          </>
        )}

        {ticks.map((t) => (
          <text
            key={t}
            x={x(t)}
            y={H - 7}
            textAnchor="middle"
            className="fill-gray-500 dark:fill-gray-400"
            style={{ fontSize: 12 }}
          >
            wk {t}
          </text>
        ))}
      </svg>
      <figcaption className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        Average {label.toLowerCase()} by week ({unit}). Week {currentWeek} highlighted. Individual
        babies vary considerably — these are typical averages, not targets.
      </figcaption>
    </figure>
  );
}
