/**
 * Author registry — the single source of truth for who wrote what.
 *
 * WHY THIS EXISTS
 * Every article previously carried `author: PregnancySprout Editorial Team`,
 * emitted as schema.org **Person**. An editorial team is not a person, so the
 * site was declaring a type mismatch to Google on all 215 articles. On a YMYL
 * site, unclear provenance is one of the weakest signals you can send.
 *
 * HONESTY RULE — read before adding an entry
 * Everything in here must be verifiably true about a real person. Do not invent
 * names, credentials, experience or bios. If someone has no formal credentials,
 * say so plainly — "a parent who researches carefully and cites sources" is a
 * perfectly good bio and vastly better than a fabricated qualification. See the
 * fabricated-persona cleanup in git history for why this rule exists.
 */

export interface Author {
  /** URL slug — /authors/<slug> */
  slug: string;
  name: string;
  /** Shown under the name, e.g. "Founder & Editor". Only what is true. */
  role?: string;
  /** Real credentials only. Omit entirely if there are none. */
  credentials?: string;
  /** Short line used under article bylines. */
  short: string;
  /** Full bio for the author page. Plain, honest, first-person is fine. */
  bio: string[];
  /** Topics this author actually writes about — becomes schema knowsAbout. */
  knowsAbout?: string[];
  /**
   * Public profiles that prove this is a real, identifiable person.
   * Becomes schema sameAs, which is how Google links a byline to a real entity.
   */
  sameAs?: string[];
  /** Path under /public, e.g. "/authors/name.jpg". Optional. */
  avatar?: string;
  /** true = schema.org Person, false = Organization. */
  isPerson: boolean;
}

/**
 * The organisational fallback. Correctly typed as an Organization rather than
 * pretending to be a Person. Used for any article without a named human.
 */
export const EDITORIAL_TEAM: Author = {
  slug: 'editorial-team',
  name: 'PregnancySprout Editorial Team',
  short:
    'Researched and written by the PregnancySprout editorial team, against published guidance from the NHS, WHO, NICE, RCOG and the AAP.',
  bio: [
    'PregnancySprout articles are researched against published clinical guidance and cite their sources so you can check any claim yourself.',
    'We are not a medical provider, and nothing here is individually reviewed by a clinician for your situation. Always speak to your own midwife, GP or health visitor about your care.',
  ],
  knowsAbout: ['Pregnancy', 'Childbirth', 'Newborn care', 'Infant feeding', 'Baby products'],
  isPerson: false,
};

/**
 * Named human authors.
 *
 * TO ADD THE SITE OWNER: append an entry below with real details only, then set
 * `author:` in an article's frontmatter to that slug (or change DEFAULT_AUTHOR).
 * Nothing here is pre-filled on purpose — a placeholder persona is exactly the
 * kind of fabrication this project has been removing.
 *
 * Example shape (replace every field with true information):
 *   {
 *     slug: 'firstname-lastname',
 *     name: 'Firstname Lastname',
 *     role: 'Founder & Editor',
 *     short: 'One honest sentence about your actual connection to the topic.',
 *     bio: ['Paragraph one.', 'Paragraph two.'],
 *     knowsAbout: ['Pregnancy', 'Baby products'],
 *     sameAs: ['https://www.linkedin.com/in/...'],
 *     isPerson: true,
 *   }
 */
export const AUTHORS: Author[] = [EDITORIAL_TEAM];

/** Byline used when an article doesn't name one. */
export const DEFAULT_AUTHOR = EDITORIAL_TEAM;

const bySlug = new Map(AUTHORS.map((a) => [a.slug, a]));
const byName = new Map(AUTHORS.map((a) => [a.name.toLowerCase(), a]));

/**
 * Resolves whatever an article's frontmatter says into a real Author.
 * Accepts a slug ("jane-doe") or the full display name, since existing content
 * uses the name form. Falls back to the editorial team rather than inventing.
 */
export function resolveAuthor(value?: string | null): Author {
  if (!value) return DEFAULT_AUTHOR;
  const key = value.trim().toLowerCase();
  return bySlug.get(key) ?? byName.get(key) ?? DEFAULT_AUTHOR;
}

/** Only named humans get their own page; the org fallback doesn't need one. */
export function getPersonAuthors(): Author[] {
  return AUTHORS.filter((a) => a.isPerson);
}

/** schema.org node for an author — Person or Organization, correctly typed. */
export function authorSchema(author: Author, siteUrl: string) {
  return {
    '@type': author.isPerson ? 'Person' : 'Organization',
    name: author.name,
    url: author.isPerson ? `${siteUrl}/authors/${author.slug}` : `${siteUrl}/about`,
    ...(author.credentials ? { honorificSuffix: author.credentials } : {}),
    ...(author.role ? { jobTitle: author.role } : {}),
    ...(author.knowsAbout?.length ? { knowsAbout: author.knowsAbout } : {}),
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
  };
}
