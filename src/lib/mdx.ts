import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Article, ArticleFrontmatter } from '@/types/article';

const contentDir = path.join(process.cwd(), 'content');

function getContentDir(subDir: string): string {
  return path.join(contentDir, subDir);
}

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.mdx'))
    .map((d) => d.name);
}

export function getArticleBySlug(subDir: string, slug: string): Article | null {
  const dir = getContentDir(subDir);
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    ...(data as ArticleFrontmatter),
    slug,
    content,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
  };
}

export function getAllArticles(subDir: string): Article[] {
  const dir = getContentDir(subDir);
  const files = getMdxFiles(dir);

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getArticleBySlug(subDir, slug);
    })
    .filter((a): a is Article => a !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedArticles(current: Article, all: Article[], limit = 3): Article[] {
  return all
    .filter((a) => a.slug !== current.slug)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.article);
}

export function getAllSlugs(subDir: string): string[] {
  const dir = getContentDir(subDir);
  const files = getMdxFiles(dir);
  return files.map((f) => f.replace(/\.mdx$/, ''));
}
