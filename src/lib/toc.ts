// Server-safe utilities for Table of Contents generation.
// No 'use client' — can be called from Server Components.

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Inject id= attributes into every <h2> and <h3> in an HTML string.
 * Slugifies the heading text, deduplicates, returns updated HTML.
 */
export function injectHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<h([23])>(.*?)<\/h[23]>/gi, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count}`;
    seen.set(base, count + 1);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

/**
 * Extract TOC items from HTML that already has id= on headings.
 */
export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3;
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (id && text) items.push({ id, level, text });
  }
  return items;
}
