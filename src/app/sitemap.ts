import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { siteConfig } from '@/config/site';
import { getAllSlugs, getAllArticles } from '@/lib/mdx';
import { getAllProducts } from '@/lib/products';
import { getAllNames } from '@/lib/baby-names';
import unmatchedNames from '@/data/name-stats-unmatched.json';

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
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

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
      url: url('/tools/hospital-bag-checklist'),
      lastModified: fileMtime('src/app/tools/hospital-bag-checklist/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/tools/feeding-schedule-tracker'),
      lastModified: fileMtime('src/app/tools/feeding-schedule-tracker/page.tsx', BUILD_DATE),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: url('/tools/growth-percentile-calculator'),
      lastModified: fileMtime('src/app/tools/growth-percentile-calculator/page.tsx', BUILD_DATE),
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
  // Old thin duplicates are marked noIndex: true in frontmatter and excluded.
  const parentingPages: MetadataRoute.Sitemap = parentingTopics.flatMap((topic) => {
    try {
      return getAllArticles(`parenting/${topic}`)
        .filter((a) => !a.noIndex)
        .map((a) => ({
          url: url(`/parenting/${topic}/${a.slug}`),
          lastModified: fileMtime(`content/parenting/${topic}/${a.slug}.mdx`, BUILD_DATE),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
    } catch { return []; }
  });

  // ── Product detail pages — real freshness from Sanity, not the filesystem ──
  // Products are Sanity-sourced (src/lib/products.ts disabled the MDX cache),
  // so publishedAt/updatedAt on the fetched document is the true freshness
  // signal — no dependency on the dormant content/products/*.mdx files.
  const products = await getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.category}/${p.slug}`),
    lastModified: p.updatedAt || p.publishedAt || BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // ── Product category hub pages ────────────────────────────────────────────
  // Freshness = the most recently updated product within that category
  // (Sanity-sourced, same reasoning as productPages above).
  const productCategories = [
    // Essentials hub pages
    'mom-essentials', 'baby-essentials',
    // Core gear
    'strollers', 'cribs', 'car-seats', 'breast-pumps',
    'baby-carriers', 'baby-bouncers', 'baby-swings', 'white-noise',
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
  const productCategoryLatest = (cat: string): string => {
    const inCat = products.filter((p) => p.category === cat);
    if (!inCat.length) return BUILD_DATE;
    return inCat.reduce((latest, p) => {
      const d = p.updatedAt || p.publishedAt || BUILD_DATE;
      return new Date(d).getTime() > new Date(latest).getTime() ? d : latest;
    }, BUILD_DATE);
  };
  const productCategoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: url(`/products/${cat}`),
    lastModified: productCategoryLatest(cat),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Roundup pages ("Best X of 2026") were retired 2026-08-08 — 301-redirected
  // to their matching category page (see next.config.mjs). No longer in the
  // sitemap; the category pages already cover this content in the sitemap.

  // ── Baby name detail pages ────────────────────────────────────────────────
  // Names dataset changes very infrequently — use data file mtime
  // lastModified tracks the stats file too — regenerating SSA data should
  // prompt a recrawl of every name page, not just a baby-names.json edit.
  const nameDataMtime = fileMtime('src/data/name-stats.json', fileMtime('src/data/baby-names.json', BUILD_DATE));

  // 1202 records collapse to ~1101 unique slugs (a name can be catalogued as
  // both a boy's and a girl's name). Emitting both produced ~97 duplicate URLs.
  // Names with no SSA record are noindexed on the page itself, so they must not
  // be advertised here either.
  const unmatched = new Set((unmatchedNames as string[]).map((s) => s.toLowerCase()));
  const seenSlugs = new Set<string>();
  const namePages: MetadataRoute.Sitemap = [];
  for (const n of getAllNames()) {
    const slug = n.name.toLowerCase();
    if (seenSlugs.has(slug) || unmatched.has(slug)) continue;
    seenSlugs.add(slug);
    namePages.push({
      url: url(`/baby-names/${slug}`),
      lastModified: nameDataMtime,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    });
  }

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
    ...namePages,
  ];
}
