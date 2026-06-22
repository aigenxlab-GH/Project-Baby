import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { siteConfig } from '@/config/site';
import { getAllSlugs, getAllArticles } from '@/lib/mdx';
import { getAllProducts } from '@/lib/products';
import { getAllNames } from '@/lib/baby-names';

// Force static pre-rendering at build time (Node.js context where `fs` is available).
// Without this, Cloudflare Workers would try to execute `fs.statSync` at request
// time in the edge runtime, which fails even with nodejs_compat for some paths.
export const dynamic = 'force-static';

const url = (p: string) => `${siteConfig.url}${p}`;

/**
 * Returns the real last-modified date of a file.
 * Falls back to a provided default if the file doesn't exist.
 */
function fileMtime(filePath: string, fallback: string): string {
  try {
    const abs = path.join(process.cwd(), filePath);
    return fs.statSync(abs).mtime.toISOString();
  } catch {
    return fallback;
  }
}

/**
 * Returns the most-recently-modified date across a set of MDX files in a directory.
 * Used for section hub pages whose freshness depends on their content.
 */
function dirLatestMtime(dirPath: string, fallback: string): string {
  try {
    const abs = path.join(process.cwd(), dirPath);
    if (!fs.existsSync(abs)) return fallback;
    const files = fs.readdirSync(abs).filter((f) => f.endsWith('.mdx'));
    if (!files.length) return fallback;
    const latest = files.reduce((max, f) => {
      const mt = fs.statSync(path.join(abs, f)).mtime.getTime();
      return mt > max ? mt : max;
    }, 0);
    return latest ? new Date(latest).toISOString() : fallback;
  } catch {
    return fallback;
  }
}

/**
 * SITEMAP RULES:
 * - Only include pages that are indexable (no robots: { index: false })
 * - Excluded: /search (noindex), /affiliate-disclosure (noindex)
 * - lastmod uses real file modification time — not build time — so Google
 *   knows which pages actually changed between crawls.
 * - Trailing slashes: NONE (matches trailingSlash: false in next.config.mjs)
 * - All URLs must exactly match the canonical href in each page's metadata.
 */
export default function sitemap(): MetadataRoute.Sitemap {

  // Stable fallback for pages without a content file (static app pages)
  const BUILD_DATE = '2026-06-05T00:00:00.000Z';

  // ── Static indexable pages ────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: url('/'),
      lastModified: fileMtime('src/app/page.tsx', BUILD_DATE),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: url('/pregnancy'),
      lastModified: fileMtime('src/app/pregnancy/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/pregnancy/week-by-week'),
      lastModified: fileMtime('src/app/pregnancy/week-by-week/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/baby-names'),
      lastModified: fileMtime('src/app/baby-names/page.tsx', BUILD_DATE),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: url('/products'),
      lastModified: fileMtime('src/app/products/page.tsx', BUILD_DATE),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: url('/parenting'),
      lastModified: fileMtime('src/app/parenting/page.tsx', BUILD_DATE),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: url('/blog'),
      lastModified: dirLatestMtime('content/blog', BUILD_DATE),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: url('/tools'),
      lastModified: fileMtime('src/app/tools/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Tools
    {
      url: url('/tools/due-date-calculator'),
      lastModified: fileMtime('src/app/tools/due-date-calculator/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: url('/tools/ovulation-calculator'),
      lastModified: fileMtime('src/app/tools/ovulation-calculator/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/tools/contraction-timer'),
      lastModified: fileMtime('src/app/tools/contraction-timer/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/tools/baby-name-generator'),
      lastModified: fileMtime('src/app/tools/baby-name-generator/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/tools/registry-checklist'),
      lastModified: fileMtime('src/app/tools/registry-checklist/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/tools/symptom-checker'),
      lastModified: fileMtime('src/app/tools/symptom-checker/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Informational / legal — indexable
    {
      url: url('/about'),
      lastModified: fileMtime('src/app/about/page.tsx', BUILD_DATE),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: url('/editorial-standards'),
      lastModified: fileMtime('src/app/editorial-standards/page.tsx', BUILD_DATE),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: url('/corrections'),
      lastModified: fileMtime('src/app/corrections/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: url('/contact'),
      lastModified: fileMtime('src/app/contact/page.tsx', BUILD_DATE),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Privacy policy and terms intentionally excluded from sitemap —
    // legal boilerplate is not a ranking target and wastes crawl budget
    // on a new domain. Pages remain crawlable via footer links.
    // NOT included (robots: { index: false }):
    //   /affiliate-disclosure  — marked noindex; disclose via footer link instead
    //   /search                — marked noindex; utility page not for indexing
  ];

  // ── Pregnancy week pages (1–40) ───────────────────────────────────────────
  // Weeks rarely change; use the data file mtime as the freshness signal.
  const weekDataMtime = fileMtime('src/data/pregnancy-weeks.json', BUILD_DATE);
  const weekPages: MetadataRoute.Sitemap = Array.from({ length: 40 }, (_, i) => ({
    url: url(`/pregnancy/week-by-week/week-${i + 1}`),
    lastModified: weekDataMtime,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // ── Blog articles — real mtime from MDX files ─────────────────────────────
  // Hub/navigation-only pages are marked noIndex: true in frontmatter and excluded.
  const blogPages: MetadataRoute.Sitemap = getAllArticles('blog')
    .filter((a) => !a.noIndex)
    .map((a) => ({
      url: url(`/blog/${a.slug}`),
      lastModified: fileMtime(`content/blog/${a.slug}.mdx`, BUILD_DATE),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // ── Parenting articles — real mtime from MDX files ───────────────────────
  // All 8 topic folders — matches generateStaticParams in parenting/[topic]/[slug]/page.tsx
  const parentingTopics = ['newborn', 'sleep', 'feeding', 'development', 'toddler', 'postpartum', 'health', 'activities'];
  const parentingPages: MetadataRoute.Sitemap = parentingTopics.flatMap((topic) => {
    try {
      return getAllSlugs(`parenting/${topic}`).map((slug) => ({
        url: url(`/parenting/${topic}/${slug}`),
        lastModified: fileMtime(`content/parenting/${topic}/${slug}.mdx`, BUILD_DATE),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    } catch { return []; }
  });

  // ── Product detail pages — real mtime ────────────────────────────────────
  const products = getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.category}/${p.slug}`),
    lastModified: fileMtime(`content/products/${p.category}/${p.slug}.mdx`, BUILD_DATE),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ── Product category hub pages ────────────────────────────────────────────
  // All 28 content/products/* folders — matches categoryLabels in products/[category]/page.tsx
  const productCategories = [
    // Core gear
    'strollers', 'cribs', 'car-seats', 'monitors', 'breast-pumps',
    'high-chairs', 'baby-carriers', 'baby-bouncers', 'baby-swings', 'white-noise',
    // Feeding & nursing
    'nursing-feeding', 'nursing-chairs',
    // Sleep
    'sleep-sacks',
    // Travel & gear
    'diaper-bags', 'diaper-pails',
    // Safety & health
    'baby-gates', 'baby-bathtubs', 'baby-thermometers', 'baby-nail-care',
    // Play & development
    'activity-centers', 'play-mats', 'teething-toys', 'bath-toys',
    // Feeding & kitchen
    'baby-food-makers', 'sippy-cups',
    // Toddler
    'potty-training',
    // Other
    'baby-loungers', 'humidifiers',
  ];
  const productCategoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: url(`/products/${cat}`),
    lastModified: dirLatestMtime(`content/products/${cat}`, BUILD_DATE),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ── Roundup articles ─────────────────────────────────────────────────────
  const roundupSlugs = [
    'best-strollers-2026',
    'best-baby-monitors-2026',
    'best-baby-carriers-2026',
    'best-budget-baby-monitors-2026',
    'best-convertible-car-seats-2026',
    'best-baby-bouncers-2026',
    'best-breast-pumps-2026',
    'best-cribs-under-300-2026',
    'best-sleep-sacks-swaddles-2026',
    'best-baby-high-chairs-2026',
    'best-baby-carriers-newborns-2026',
    'best-white-noise-machines-2026',
    'best-diaper-bags-2026',
  ];
  const roundupPages: MetadataRoute.Sitemap = roundupSlugs.map((slug) => ({
    url: url(`/products/roundups/${slug}`),
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // ── Baby name detail pages ────────────────────────────────────────────────
  // Names dataset changes very infrequently — use data file mtime
  const nameDataMtime = fileMtime('src/data/baby-names.json', BUILD_DATE);
  const allNames = getAllNames();
  const namePages: MetadataRoute.Sitemap = allNames.map((n) => ({
    url: url(`/baby-names/${n.name.toLowerCase()}`),
    lastModified: nameDataMtime,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // ── Parenting topic hub pages (all 8 topics) ─────────────────────────────
  const parentingTopicPages: MetadataRoute.Sitemap = parentingTopics.map((topic) => ({
    url: url(`/parenting/${topic}`),
    lastModified: dirLatestMtime(`content/parenting/${topic}`, BUILD_DATE),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...weekPages,
    ...blogPages,
    ...parentingPages,
    ...parentingTopicPages,
    ...productPages,
    ...productCategoryPages,
    ...roundupPages,
    ...namePages,
  ];
}
