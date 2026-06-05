import type { PregnancyWeek } from '@/types/pregnancy-week';
import weeksData from '@/data/pregnancy-weeks.json';

export function getAllWeeks(): PregnancyWeek[] {
  return weeksData as PregnancyWeek[];
}

export function getWeekData(week: number): PregnancyWeek | null {
  const data = weeksData as PregnancyWeek[];
  return data.find((w) => w.week === week) ?? null;
}

export function getTrimesterWeeks(trimester: 1 | 2 | 3): PregnancyWeek[] {
  const data = weeksData as PregnancyWeek[];
  return data.filter((w) => w.trimester === trimester);
}

export function getWeekSlug(week: number): string {
  return `week-${week}`;
}

export function parseWeekFromSlug(slug: string): number {
  return parseInt(slug.replace('week-', ''), 10);
}
