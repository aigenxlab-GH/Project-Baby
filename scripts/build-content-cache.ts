/**
 * Pre-compiles all MDX content into a single JSON file.
 *
 * This is bundled into the Cloudflare Worker via a static import in src/lib/mdx.ts,
 * eliminating all runtime filesystem reads (which fail on Cloudflare Workers because
 * process.cwd() returns '/' and MDX files are not deployed to the worker bundle).
 *
 * Run: tsx scripts/build-content-cache.ts
 * Output: src/data/content-cache.json
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, 'content');
const outputPath = path.join(projectRoot, 'src', 'data', 'content-cache.json');

type ContentEntry = Record<string, unknown>;

/** Read all .mdx files in a directory (non-recursive) and return slug → data map */
function processDirectory(relPath: string): Record<string, ContentEntry> {
  const absDir = path.join(contentRoot, relPath);
  if (!fs.existsSync(absDir)) return {};

  const entries: Record<string, ContentEntry> = {};

  const files = fs.readdirSync(absDir, { withFileTypes: true });
  for (const file of files) {
    if (!file.isFile() || !file.name.endsWith('.mdx')) continue;
    const slug = file.name.replace(/\.mdx$/, '');
    const filePath = path.join(absDir, file.name);

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      entries[slug] = {
        ...data,
        slug,
        content,
        readingTime: Math.ceil(stats.minutes),
        wordCount: stats.words,
      };
    } catch (err) {
      console.warn(`  ⚠ Skipped ${relPath}/${file.name}:`, err);
    }
  }

  return entries;
}

/** Walk content root and return all leaf paths that contain .mdx files */
function discoverLeafPaths(baseRel: string, depth = 0): string[] {
  const abs = path.join(contentRoot, baseRel);
  if (!fs.existsSync(abs)) return [];

  const entries = fs.readdirSync(abs, { withFileTypes: true });
  const hasMdx = entries.some((e) => e.isFile() && e.name.endsWith('.mdx'));
  if (hasMdx) return [baseRel];

  if (depth < 3) {
    return entries
      .filter((e) => e.isDirectory())
      .flatMap((e) =>
        discoverLeafPaths(`${baseRel}/${e.name}`, depth + 1)
      );
  }

  return [];
}

// ── Main ─────────────────────────────────────────────────────────────────────

const topDirs = fs.readdirSync(contentRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const allPaths: string[] = [];
for (const dir of topDirs) {
  allPaths.push(...discoverLeafPaths(dir));
}

const cache: Record<string, Record<string, ContentEntry>> = {};
let totalArticles = 0;

for (const relPath of allPaths) {
  const entries = processDirectory(relPath);
  const count = Object.keys(entries).length;
  if (count > 0) {
    cache[relPath] = entries;
    totalArticles += count;
    console.log(`  ✓ ${relPath}: ${count} articles`);
  }
}

// Write compact JSON (no whitespace) to keep bundle size minimal
fs.writeFileSync(outputPath, JSON.stringify(cache));
console.log(`\n✓ Content cache built: ${totalArticles} total articles → src/data/content-cache.json`);
