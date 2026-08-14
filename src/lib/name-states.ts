/**
 * "Where is this name most popular" — top 5 US states by births for the latest
 * SSA year.
 *
 * Data is built by scripts/build-name-states.mjs from the SSA's state-level
 * dataset (namesbystate.zip). Raw birth counts only: no score, no star rating,
 * no derived "popularity index". The number shown is the number the SSA
 * published. Keep it that way — a computed score here would be exactly the kind
 * of invented metric this site has spent a lot of effort removing.
 *
 * At ~54 KB a direct import is fine. name-stats.json (~2 MB) is the one that
 * must be read with fs at build time; see the note in src/lib/name-stats.ts
 * about the 3 MiB Cloudflare Worker limit.
 *
 * Coverage is partial by design: the SSA suppresses any state/year/name count
 * below 5 for privacy, so ~160 of the 1,085 names have no state rows at all.
 * Callers must handle null rather than substituting anything.
 */

import data from '@/data/name-states.json';

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan',
  MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
  OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

export interface StatePopularity {
  code: string;
  state: string;
  /** Babies given this name in that state, as published by the SSA. */
  births: number;
}

// TS widens the JSON tuples to (string | number)[], so the pair shape is
// asserted here rather than at every call site.
const NAMES = data.names as unknown as Record<string, Array<[string, number]>>;

export function getNameStates(slug: string): StatePopularity[] | null {
  const rows = NAMES[slug.toLowerCase()];
  if (!rows?.length) return null;
  return rows.map(([code, births]) => ({
    code,
    state: STATE_NAMES[code] ?? code,
    births,
  }));
}

export function getStatesMeta() {
  return data.meta as {
    source: string;
    license: string;
    year: number;
    topN: number;
    namesCovered: number;
    namesTotal: number;
    note: string;
    generated: string;
  };
}
