/**
 * The "current year" shown in titles like "Best Strollers 2026".
 *
 * WHAT THIS IS FOR
 * Only labels that mean "this year's guide". Never use it for a date that
 * records when something actually happened — publication dates, "last updated"
 * stamps, legal effective dates. Advancing one of those would state something
 * untrue (e.g. claiming a review happened in a month that has not arrived yet).
 *
 * HOW IT ROLLS OVER
 * The year does not change on 1 January. It changes on ROLLOVER_DAY/ROLLOVER_MONTH
 * (10 January by default), which gives a window at the start of the year to
 * refresh content before the site starts advertising the new year.
 *
 * The rule lives here rather than in the deploy schedule on purpose: otherwise
 * any deploy during the first week of January — pushing an article, fixing a
 * typo — would flip every title early. This way the displayed year depends on
 * the date, not on when a build happens to run.
 *
 * TO OVERRIDE
 * Set PINNED_YEAR to a number to freeze the displayed year (e.g. hold 2026 well
 * into 2027 while guides are rewritten), then set it back to null.
 */

/** Set to a number to force the displayed year. null = automatic. */
const PINNED_YEAR: number | null = null;

/** Day and month the site starts showing the new year. */
const ROLLOVER_DAY = 10;
const ROLLOVER_MONTH = 1; // 1 = January

function resolveYear(now = new Date()): number {
  const calendarYear = now.getFullYear();
  const rollover = new Date(calendarYear, ROLLOVER_MONTH - 1, ROLLOVER_DAY);
  // Before the rollover date we are still presenting last year's guides.
  return now < rollover ? calendarYear - 1 : calendarYear;
}

export const CURRENT_YEAR = PINNED_YEAR ?? resolveYear();

/** Exported for tests / verification of the rollover boundary. */
export const __resolveYearForTesting = resolveYear;
