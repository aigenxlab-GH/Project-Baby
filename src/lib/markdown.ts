// Shared markdown-to-HTML converter used by blog, product, and parenting article pages.
// Cloudflare-safe: pure regex, no heavy MDX/remark dependencies.

// Auto-link authoritative health organisations when mentioned in article body text.
const AUTHORITY_LINKS: [RegExp, string, string][] = [
  [/\bNHS\b/g, 'https://www.nhs.uk', 'NHS (National Health Service)'],
  [/\bWHO\b/g, 'https://www.who.int', 'World Health Organization'],
  [/\bAAP\b/g, 'https://www.aap.org', 'American Academy of Pediatrics'],
  [/\bNICE\b/g, 'https://www.nice.org.uk', 'NICE (National Institute for Health and Care Excellence)'],
  [/\bRCOG\b/g, 'https://www.rcog.org.uk', 'Royal College of Obstetricians and Gynaecologists'],
  [/\bCDC\b/g, 'https://www.cdc.gov', 'Centers for Disease Control and Prevention'],
];

function linkAuthorities(html: string): string {
  return html.replace(/(<a[^>]*>[\s\S]*?<\/a>)|([^<>]+)/g, (match, link, text) => {
    if (link) return link;
    if (!text) return match;
    let result = text;
    for (const [regex, url, title] of AUTHORITY_LINKS) {
      result = result.replace(
        regex,
        `<a href="${url}" target="_blank" rel="noopener noreferrer" title="${title}" class="authority-link">${regex.source.replace(/\\b/g, '').replace(/\\/g, '')}</a>`
      );
    }
    return result;
  });
}

function parseRow(row: string): string[] {
  return row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
}

function renderMarkdownTable(rows: string[]): string {
  const sepIdx = rows.findIndex((r) => /^\|[\s:\-|]+\|$/.test(r));
  if (sepIdx < 1) return rows.join('\n');

  const headers = parseRow(rows[0]);
  const dataRows = rows.slice(sepIdx + 1).filter((r) => r.trim());

  let html =
    '<div class="mdx-table-wrap"><table class="mdx-table">';
  html += '<thead><tr>';
  headers.forEach((h) => {
    html += `<th>${h}</th>`;
  });
  html += '</tr></thead><tbody>';

  dataRows.forEach((row, i) => {
    const cells = parseRow(row);
    html += i % 2 === 1 ? '<tr class="mdx-tr-alt">' : '<tr>';
    cells.forEach((c) => {
      html += `<td>${c}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  return html;
}

// Converts pipe-table markdown blocks to HTML tables before other transforms run.
function parseMarkdownTables(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let tableLines: string[] = [];

  const flush = () => {
    if (tableLines.length >= 2) {
      out.push(renderMarkdownTable(tableLines));
    } else {
      out.push(...tableLines);
    }
    tableLines = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      tableLines.push(line.trim());
    } else {
      if (tableLines.length) flush();
      out.push(line);
    }
  }
  if (tableLines.length) flush();

  return out.join('\n');
}

export function markdownToHtml(md: string, options: { linkAuthorities?: boolean } = {}): string {
  // Step 1: convert pipe tables before paragraph wrapping consumes them
  let result = parseMarkdownTables(md);

  // Step 2: standard inline/block transforms
  result = result
    .replace(/^[ \t]*### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^[ \t]*## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^[ \t]*# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-600 hover:underline">$1</a>')
    .replace(/^\s*[-*+] (.+)$/gm, '<li>$1</li>')
    .replace(/^\s*\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr />')
    .replace(/^(?!<[a-z/]).+$/gm, (line) => line.trim() ? `<p>${line}</p>` : '')
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n{3,}/g, '\n\n');

  if (options.linkAuthorities) {
    result = linkAuthorities(result);
  }

  return result;
}
