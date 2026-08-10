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
export const SANDEEP: Author = {
  slug: 'sandeep-singsarva',
  name: 'Sandeep Singsarva',
  role: 'Founder & Editor',
  short:
    "I'm a parent of two — my youngest is three — and I started researching all of this the day my wife told me she was pregnant with our first. I work in IT, not medicine, so everything health-related here is researched against published NHS, WHO and AAP guidance with the sources cited.",
  bio: [
    "I'm Sandeep Singsarva, founder and editor of PregnancySprout. I started researching pregnancy, newborn care and baby gear the day my wife told me she was expecting our first child, and I never really stopped. We now have two children; our youngest daughter is three.",
    "I work in IT, not healthcare. I am not a doctor, midwife or nurse, and nothing on this site is individually reviewed by a clinician. What I do is read the published guidance — NHS, WHO, NICE, RCOG and the American Academy of Pediatrics — and set it out in plain language, citing the sources on each article so you can check any claim at its origin.",
    "For product research I compare manufacturer specifications, safety certifications and current pricing, and draw on patterns in verified customer reviews. I don't claim to have hands-on tested products I haven't.",
    'For anything concerning your own care or your baby\'s, please speak to your midwife, GP or health visitor. This site is a starting point for questions, not a replacement for them.',
  ],
  knowsAbout: ['Pregnancy', 'Newborn care', 'Infant feeding', 'Baby products', 'Baby names', 'Parenting'],
  sameAs: ['https://www.linkedin.com/in/sandeep-singsarva'],
  isPerson: true,
};

export const AUTHORS: Author[] = [SANDEEP, EDITORIAL_TEAM];

/** Byline used when an article doesn't name one. */
export const DEFAULT_AUTHOR = SANDEEP;

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
