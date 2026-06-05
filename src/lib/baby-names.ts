import namesData from '@/data/baby-names.json';
import type { BabyName, NameFilters } from '@/types/baby-name';

const names = namesData as BabyName[];

export function getAllNames(): BabyName[] {
  return names;
}

export function getNameBySlug(slug: string): BabyName | null {
  const normalized = slug.toLowerCase();
  return names.find((n) => n.name.toLowerCase() === normalized) ?? null;
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
  return names
    .filter(
      (n) =>
        n.id !== name.id &&
        (n.gender === name.gender || n.gender === 'neutral') &&
        (n.origin.some((o) => name.origin.includes(o)) ||
          n.tags.some((t) => name.tags.includes(t)))
    )
    .slice(0, limit);
}

export function getAllOrigins(): string[] {
  const origins = new Set<string>();
  names.forEach((n) => n.origin.forEach((o) => origins.add(o)));
  return Array.from(origins).sort();
}
