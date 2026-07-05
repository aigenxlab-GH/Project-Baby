import { ExternalLink, BookOpen } from 'lucide-react';

export interface Citation {
  title: string;
  organisation: string;
  url: string;
  year?: number;
}

interface Props {
  citations: Citation[];
}

/**
 * Displays authoritative source citations at the bottom of health articles.
 * All sources are external links to NHS, WHO, AAP, NICE, RCOG, or peer-reviewed journals.
 * Improves E-E-A-T by making reference chain transparent.
 */
export function SourceCitations({ citations }: Props) {
  if (!citations || citations.length === 0) return null;

  return (
    <aside
      aria-label="Sources and references"
      className="mt-10 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Sources & References</h2>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        This article was researched against the following authoritative health sources:
      </p>
      <ol className="space-y-2">
        {citations.map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5 flex-shrink-0 w-5">
              [{i + 1}]
            </span>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline leading-relaxed group flex items-start gap-1"
            >
              <span>
                <span className="font-medium">{c.organisation}</span>
                {' — '}
                <span className="italic">{c.title}</span>
                {c.year && <span className="text-gray-400 dark:text-gray-500"> ({c.year})</span>}
              </span>
              <ExternalLink className="h-3 w-3 flex-shrink-0 mt-0.5 opacity-50 group-hover:opacity-100" aria-label="Opens in new tab" />
            </a>
          </li>
        ))}
      </ol>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 leading-relaxed">
        Content reviewed against NHS, WHO, AAP, NICE and RCOG guidelines. See our{' '}
        <a href="/editorial-standards" className="text-brand-600 dark:text-brand-400 hover:underline">
          editorial standards
        </a>{' '}
        for our full fact-checking process.
      </p>
    </aside>
  );
}

// ── Standard citation sets per topic ────────────────────────────────────────
// Import these in articles instead of repeating URLs each time.

export const PREGNANCY_CITATIONS: Citation[] = [
  {
    organisation: 'NHS',
    title: 'Pregnancy week by week',
    url: 'https://www.nhs.uk/pregnancy/week-by-week/',
    year: 2024,
  },
  {
    organisation: 'WHO',
    title: 'Pregnancy and childbirth',
    url: 'https://www.who.int/health-topics/pregnancy',
    year: 2024,
  },
  {
    organisation: 'NICE',
    title: 'Antenatal care (NG201)',
    url: 'https://www.nice.org.uk/guidance/ng201',
    year: 2021,
  },
  {
    organisation: 'RCOG',
    title: 'Routine antenatal care for healthy pregnant women',
    url: 'https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/',
    year: 2022,
  },
];

export const NEWBORN_CITATIONS: Citation[] = [
  {
    organisation: 'NHS',
    title: 'Your newborn baby',
    url: 'https://www.nhs.uk/pregnancy/labour-and-birth/after-the-birth/your-newborn-baby/',
    year: 2023,
  },
  {
    organisation: 'AAP',
    title: 'Newborn care guidelines',
    url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx',
    year: 2024,
  },
];

export const SLEEP_CITATIONS: Citation[] = [
  {
    organisation: 'AAP',
    title: 'Safe sleep: back to sleep',
    url: 'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/A-Parents-Guide-to-Safe-Sleep.aspx',
    year: 2022,
  },
  {
    organisation: 'NHS',
    title: 'Reduce the risk of sudden infant death syndrome (SIDS)',
    url: 'https://www.nhs.uk/conditions/sudden-infant-death-syndrome-sids/',
    year: 2023,
  },
  {
    organisation: 'Lullaby Trust',
    title: 'Safer sleep advice',
    url: 'https://www.lullabytrust.org.uk/safer-sleep-advice/',
    year: 2024,
  },
];

export const FEEDING_CITATIONS: Citation[] = [
  {
    organisation: 'WHO',
    title: 'Breastfeeding',
    url: 'https://www.who.int/health-topics/breastfeeding',
    year: 2024,
  },
  {
    organisation: 'NHS',
    title: 'Breastfeeding: the first few days',
    url: 'https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/breastfeeding/the-first-few-days/',
    year: 2023,
  },
  {
    organisation: 'AAP',
    title: 'Breastfeeding and the use of human milk (Policy Statement)',
    url: 'https://publications.aap.org/pediatrics/article/150/1/e2022057988/188347',
    year: 2022,
  },
];

export const POSTPARTUM_CITATIONS: Citation[] = [
  {
    organisation: 'NHS',
    title: 'Your body after birth',
    url: 'https://www.nhs.uk/conditions/baby/support-and-services/your-body-after-birth/',
    year: 2023,
  },
  {
    organisation: 'NICE',
    title: 'Postnatal care (NG194)',
    url: 'https://www.nice.org.uk/guidance/ng194',
    year: 2021,
  },
  {
    organisation: 'WHO',
    title: 'Postnatal care for mothers and newborns',
    url: 'https://www.who.int/publications/i/item/9789241506649',
    year: 2022,
  },
  {
    organisation: 'RCOG',
    title: 'Postnatal mental health',
    url: 'https://www.rcog.org.uk/for-the-public/mental-health-in-pregnancy/',
    year: 2023,
  },
];

export const TODDLER_CITATIONS: Citation[] = [
  {
    organisation: 'AAP',
    title: 'Toddler development and milestones',
    url: 'https://www.healthychildren.org/English/ages-stages/toddler/Pages/default.aspx',
    year: 2024,
  },
  {
    organisation: 'NHS',
    title: 'Your child\'s development: 1–2 years',
    url: 'https://www.nhs.uk/conditions/baby/babys-development/development/your-childs-development-1-to-2-years/',
    year: 2023,
  },
  {
    organisation: 'CDC',
    title: 'Developmental milestones',
    url: 'https://www.cdc.gov/ncbddd/actearly/milestones/index.html',
    year: 2024,
  },
];

export const PRODUCT_CITATIONS: Citation[] = [
  {
    organisation: 'AAP',
    title: 'Product safety guidelines for infants and children',
    url: 'https://www.healthychildren.org/English/safety-prevention/Pages/default.aspx',
    year: 2024,
  },
  {
    organisation: 'CPSC',
    title: 'Baby product safety recalls and standards',
    url: 'https://www.cpsc.gov/Recalls',
    year: 2024,
  },
  {
    organisation: 'NHS',
    title: 'Keeping your baby safe',
    url: 'https://www.nhs.uk/conditions/baby/babys-development/play-and-learning/keeping-baby-safe/',
    year: 2023,
  },
];
