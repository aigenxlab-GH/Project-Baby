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
  "imageUrl": image.asset->url,
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
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', () => {
        // Concatenate as Buffers, not strings. setEncoding is never called, so
        // each chunk arrives as a Buffer; `body += chunk` decodes each one on
        // its own, and a multi-byte UTF-8 character split across a chunk
        // boundary becomes U+FFFD. That shipped mojibake to live product
        // pages (e.g. "31<?>31-inch" for "31x31-inch"). Non-deterministic,
        // because it depends on where the network splits the response.
        const body = Buffer.concat(chunks).toString('utf8');
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
    if (!Array.isArray(results) || results.length === 0) {
      // Deliberately fatal. This used to fall through to an empty cache,
      // which shipped all 113 product pages as 200-status "Product Not
      // Found" shells until the next deploy. A bad fetch must stop the
      // deploy, not silently publish a broken catalogue.
      console.error('  ✗ Sanity returned no products — aborting the build.');
      process.exit(1);
    }
    fs.writeFileSync(outputPath, JSON.stringify(results));
    console.log(`  ✓ sanity-products-cache.json: ${results.length} products`);
  } catch (err) {
    // Do not write the cache here: leaving the previous file in place is
    // safer than clobbering it with an empty array.
    console.error('  ✗ Sanity fetch failed — aborting the build:', err);
    process.exit(1);
  }
}

main();
