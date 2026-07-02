/**
 * Pre-fetches all published Sanity products before the Next.js build.
 * Writes to src/data/sanity-products-cache.json so static page generation
 * reads from disk instead of making HTTP calls during SSG.
 *
 * Run: tsx scripts/build-sanity-cache.ts
 * Output: src/data/sanity-products-cache.json
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const PROJECT_ID = 'mnwolxvz';
const DATASET = 'production';
const HOST = `${PROJECT_ID}.api.sanity.io`;

const GROQ_QUERY = `*[_type == "productReview"] {
  _id,
  productName,
  "slug": slug.current,
  brand,
  category,
  modelYear,
  priceRange,
  ourScore,
  starRating,
  description,
  bottomLine,
  pros,
  cons,
  title,
  tags,
  featured,
  publishedAt,
  updatedAt,
  author,
  imageAlt,
  affiliateLinks,
  specsTable[] { _key, key, value },
  faqs[] { q, a },
  body[] {
    _type,
    style,
    listItem,
    markDefs[] { _key, _type, href },
    children[] { _type, text, marks }
  }
}`;

function fetchSanity(query: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(query);
    const headers: Record<string, string> = {};
    const token = process.env.SANITY_AUTH_TOKEN;
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = {
      hostname: HOST,
      path: `/v2021-06-07/data/query/${DATASET}?query=${encoded}`,
      method: 'GET',
      headers,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk: string) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          const parsed = JSON.parse(body) as { result?: unknown[] };
          resolve(parsed.result || []);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const outputPath = path.join(process.cwd(), 'src', 'data', 'sanity-products-cache.json');

  console.log('Fetching Sanity products for build cache...');
  try {
    const results = await fetchSanity(GROQ_QUERY);
    fs.writeFileSync(outputPath, JSON.stringify(results));
    console.log(`  ✓ sanity-products-cache.json: ${results.length} products`);
  } catch (err) {
    console.warn('  ⚠ Sanity fetch failed — writing empty cache:', err);
    // Write empty array so the build doesn't crash; pages show "coming soon"
    fs.writeFileSync(outputPath, JSON.stringify([]));
  }
}

main();
