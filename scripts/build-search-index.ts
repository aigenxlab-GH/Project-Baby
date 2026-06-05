/**
 * build-search-index.ts
 *
 * Generates a static search index JSON file at build time.
 * This file is imported by the search API route, avoiding any
 * fs/path calls at edge runtime (required for Cloudflare Pages).
 *
 * Run: npx tsx scripts/build-search-index.ts
 * Output: src/data/search-index.json
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const cwd = process.cwd();

interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: 'article' | 'product' | 'week' | 'tool';
}

function getMdxFiles(dir: string): string[] {
  const abs = path.join(cwd, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter((f) => f.endsWith('.mdx'));
}

function readFrontmatter(filePath: string): { title: string; description: string } {
  try {
    const raw = fs.readFileSync(path.join(cwd, filePath), 'utf-8');
    const { data } = matter(raw);
    return {
      title: (data.title as string) || '',
      description: (data.description as string) || '',
    };
  } catch {
    return { title: '', description: '' };
  }
}

function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Blog articles
  for (const file of getMdxFiles('content/blog')) {
    const slug = file.replace('.mdx', '');
    const { title, description } = readFrontmatter(`content/blog/${file}`);
    if (title) items.push({ title, description, href: `/blog/${slug}`, type: 'article' });
  }

  // Parenting articles
  for (const topic of ['newborn', 'sleep', 'feeding', 'development']) {
    for (const file of getMdxFiles(`content/parenting/${topic}`)) {
      const slug = file.replace('.mdx', '');
      const { title, description } = readFrontmatter(`content/parenting/${topic}/${file}`);
      if (title) items.push({ title, description, href: `/parenting/${topic}/${slug}`, type: 'article' });
    }
  }

  // Products
  const productsDir = path.join(cwd, 'content/products');
  if (fs.existsSync(productsDir)) {
    for (const cat of fs.readdirSync(productsDir)) {
      for (const file of getMdxFiles(`content/products/${cat}`)) {
        const slug = file.replace('.mdx', '');
        const { title, description } = readFrontmatter(`content/products/${cat}/${file}`);
        if (title) items.push({ title, description, href: `/products/${cat}/${slug}`, type: 'product' });
      }
    }
  }

  // Pregnancy weeks (from JSON data — no fs calls needed here but included for completeness)
  for (let w = 1; w <= 40; w++) {
    items.push({
      title: `${w} Weeks Pregnant`,
      description: `Baby development, symptoms, and tips for week ${w} of pregnancy.`,
      href: `/pregnancy/week-by-week/week-${w}`,
      type: 'week',
    });
  }

  // Tools (static — no content files)
  const tools: SearchItem[] = [
    { title: 'Due Date Calculator', description: 'Calculate your estimated due date from LMP, conception date, or IVF transfer.', href: '/tools/due-date-calculator', type: 'tool' },
    { title: 'Ovulation Calculator', description: 'Find your fertile window and ovulation date.', href: '/tools/ovulation-calculator', type: 'tool' },
    { title: 'Contraction Timer', description: 'Time contractions during labour to know when to go to hospital.', href: '/tools/contraction-timer', type: 'tool' },
    { title: 'Baby Name Generator', description: 'Discover unique baby names with meanings and origins.', href: '/tools/baby-name-generator', type: 'tool' },
    { title: 'Registry Checklist', description: 'Complete baby registry checklist for everything you need.', href: '/tools/registry-checklist', type: 'tool' },
    { title: 'Pregnancy Symptom Checker', description: 'Check common pregnancy symptoms and what they mean.', href: '/tools/symptom-checker', type: 'tool' },
  ];
  items.push(...tools);

  return items;
}

const index = buildIndex();
const outPath = path.join(cwd, 'src/data/search-index.json');
fs.writeFileSync(outPath, JSON.stringify(index, null, 2), 'utf-8');

console.log(`✓ Search index built: ${index.length} items → src/data/search-index.json`);
