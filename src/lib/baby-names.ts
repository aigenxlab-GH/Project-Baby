import namesData from '@/data/baby-names.json';
import type { BabyName, NameFilters } from '@/types/baby-name';

const names = namesData as BabyName[];

// Pre-built lookup indexes — computed once at module load, O(1) access at runtime.
const nameBySlugMap = new Map<string, BabyName>(
  names.map((n) => [n.name.toLowerCase(), n])
);

// Index names by gender and by each origin tag for fast related-name lookup.
const namesByGender = new Map<string, BabyName[]>();
const namesByOrigin = new Map<string, BabyName[]>();
const namesByTag    = new Map<string, BabyName[]>();

for (const n of names) {
  const gKey = n.gender;
  if (!namesByGender.has(gKey)) namesByGender.set(gKey, []);
  namesByGender.get(gKey)!.push(n);

  for (const o of n.origin) {
    const oKey = o.toLowerCase();
    if (!namesByOrigin.has(oKey)) namesByOrigin.set(oKey, []);
    namesByOrigin.get(oKey)!.push(n);
  }

  for (const t of n.tags) {
    const tKey = t.toLowerCase();
    if (!namesByTag.has(tKey)) namesByTag.set(tKey, []);
    namesByTag.get(tKey)!.push(n);
  }
}

export function getAllNames(): BabyName[] {
  return names;
}

export function getNameBySlug(slug: string): BabyName | null {
  return nameBySlugMap.get(slug.toLowerCase()) ?? null;
}

export function searchNames(filters: NameFilters, page = 1, pageSize = 48): {
  names: BabyName[];
  total: number;
  totalPages: number;
} {
  let result = [...names];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter((n) => n.name.toLowerCase().includes(q));
  }

  if (filters.gender && filters.gender !== 'all') {
    result = result.filter((n) => n.gender === filters.gender);
  }

  if (filters.startingLetter) {
    result = result.filter(
      (n) => n.startingLetter.toLowerCase() === filters.startingLetter!.toLowerCase()
    );
  }

  if (filters.origin) {
    const o = filters.origin.toLowerCase();
    result = result.filter((n) => n.origin.some((orig) => orig.toLowerCase().includes(o)));
  }

  if (filters.syllables) {
    result = result.filter((n) => n.syllables === filters.syllables);
  }

  if (filters.tag) {
    const t = filters.tag.toLowerCase();
    result = result.filter((n) => n.tags.some((tag) => tag.toLowerCase() === t));
  }

  const total = result.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = result.slice(start, start + pageSize);

  return { names: paginated, total, totalPages };
}

export function getRelatedNames(name: BabyName, limit = 6): BabyName[] {
  // Use pre-built indexes instead of scanning all 1205 names.
  const seen = new Set<string>([name.id]);
  const related: BabyName[] = [];

  // Gather candidates via origin index (highest relevance first)
  for (const o of name.origin) {
    for (const n of namesByOrigin.get(o.toLowerCase()) ?? []) {
      if (!seen.has(n.id) && (n.gender === name.gender || n.gender === 'neutral')) {
        seen.add(n.id);
        related.push(n);
        if (related.length >= limit) return related;
      }
    }
  }

  // Fill remaining slots via tag index
  for (const t of name.tags) {
    for (const n of namesByTag.get(t.toLowerCase()) ?? []) {
      if (!seen.has(n.id) && (n.gender === name.gender || n.gender === 'neutral')) {
        seen.add(n.id);
        related.push(n);
        if (related.length >= limit) return related;
      }
    }
  }

  return related;
}

export function getAllOrigins(): string[] {
  const origins = new Set<string>();
  names.forEach((n) => n.origin.forEach((o) => origins.add(o)));
  return Array.from(origins).sort();
}
