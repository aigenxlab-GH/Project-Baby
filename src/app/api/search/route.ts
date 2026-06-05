import { NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { getAllArticles } from '@/lib/mdx';
import { getAllProducts } from '@/lib/products';
import { getAllWeeks } from '@/lib/pregnancy-data';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: 'article' | 'product' | 'week' | 'name' | 'tool';
}

// Build the search index at module level (cached between requests in production)
function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Blog articles
  try {
    const blogs = getAllArticles('blog');
    blogs.forEach((a) => items.push({
      title: a.title,
      description: a.description,
      href: `/blog/${a.slug}`,
      type: 'article',
    }));
  } catch { /* skip */ }

  // Parenting articles
  for (const topic of ['newborn', 'sleep', 'feeding', 'development']) {
    try {
      const articles = getAllArticles(`parenting/${topic}`);
      articles.forEach((a) => items.push({
        title: a.title,
        description: a.description,
        href: `/parenting/${topic}/${a.slug}`,
        type: 'article',
      }));
    } catch { /* skip */ }
  }

  // Products
  try {
    const products = getAllProducts();
    products.forEach((p) => items.push({
      title: p.title,
      description: p.description,
      href: `/products/${p.category}/${p.slug}`,
      type: 'product',
    }));
  } catch { /* skip */ }

  // Pregnancy weeks
  try {
    const weeks = getAllWeeks();
    weeks.forEach((w) => items.push({
      title: `${w.week} Weeks Pregnant`,
      description: `Baby development, symptoms, and tips for week ${w.week} of pregnancy.`,
      href: `/pregnancy/week-by-week/week-${w.week}`,
      type: 'week',
    }));
  } catch { /* skip */ }

  // Tools
  const tools = [
    { title: 'Due Date Calculator', description: 'Calculate your estimated due date from LMP, conception date, or IVF transfer.', href: '/tools/due-date-calculator' },
    { title: 'Ovulation Calculator', description: 'Find your fertile window and ovulation date.', href: '/tools/ovulation-calculator' },
    { title: 'Contraction Timer', description: 'Time contractions during labour to know when to go to hospital.', href: '/tools/contraction-timer' },
    { title: 'Baby Name Generator', description: 'Discover unique baby names with meanings and origins.', href: '/tools/baby-name-generator' },
    { title: 'Registry Checklist', description: 'Complete baby registry checklist for everything you need.', href: '/tools/registry-checklist' },
    { title: 'Pregnancy Symptom Checker', description: 'Check common pregnancy symptoms and what they mean.', href: '/tools/symptom-checker' },
  ];
  tools.forEach((t) => items.push({ ...t, type: 'tool' }));

  return items;
}

let cachedIndex: SearchItem[] | null = null;

function getIndex(): SearchItem[] {
  if (!cachedIndex) cachedIndex = buildIndex();
  return cachedIndex;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const items = getIndex();

  const fuse = new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'description', weight: 0.3 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  });

  const raw = fuse.search(q, { limit: 20 });
  const results = raw.map((r) => r.item);

  return NextResponse.json({ results }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}
