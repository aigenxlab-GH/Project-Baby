#!/usr/bin/env node
/**
 * Affiliate Link Monitor
 * Queries Sanity for all product ASINs, tests each Amazon URL,
 * and reports any that are broken or discontinued.
 *
 * Run: node scripts/check-affiliate-links.js
 * Used by: .github/workflows/affiliate-link-monitor.yml
 */

const https = require('https');

const TOKEN = process.env.SANITY_AUTH_TOKEN;
if (!TOKEN) { console.error('Missing SANITY_AUTH_TOKEN'); process.exit(1); }

const REGIONS = [
  { key: 'US', domain: 'www.amazon.com',    tag: 'pregnancysp0a-20' },
  { key: 'UK', domain: 'www.amazon.co.uk',  tag: 'pregnancysp0a-21' },
  { key: 'CA', domain: 'www.amazon.ca',     tag: 'pregnancysp07-20' },
  { key: 'DE', domain: 'www.amazon.de',     tag: 'pregnancyspde-21' },
  { key: 'FR', domain: 'www.amazon.fr',     tag: 'pregnancyspfr-21' },
  { key: 'IT', domain: 'www.amazon.it',     tag: 'pregnancyspit-21' },
  { key: 'ES', domain: 'www.amazon.es',     tag: 'pregnancyspes-21' },
];

// Realistic browser headers to avoid bot detection
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate',
  'Connection': 'keep-alive',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function queryApi(groq) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'mnwolxvz.api.sanity.io',
      path: '/v2021-06-07/data/query/production?query=' + encodeURIComponent(groq),
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + TOKEN },
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject);
    req.end();
  });
}

// Check a single Amazon URL — follows redirects, returns status info
function checkUrl(asin, region) {
  return new Promise((resolve) => {
    const url = `https://${region.domain}/dp/${asin}?tag=${region.tag}`;
    const options = {
      hostname: region.domain,
      path: `/dp/${asin}?tag=${region.tag}`,
      method: 'GET',
      headers: HEADERS,
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      const status = res.statusCode;
      const location = res.headers['location'] || '';

      // Follow one redirect manually
      if ((status === 301 || status === 302 || status === 303) && location) {
        // If redirect does NOT contain the ASIN, product is gone
        const redirectHasAsin = location.includes(asin) || location.includes('/dp/');
        if (!redirectHasAsin) {
          resolve({ url, status, result: 'DISCONTINUED', detail: `Redirected to: ${location}` });
        } else {
          resolve({ url, status, result: 'OK', detail: 'Redirected to product page' });
        }
      } else if (status === 200) {
        resolve({ url, status, result: 'OK', detail: '' });
      } else if (status === 404) {
        resolve({ url, status, result: 'NOT_FOUND', detail: '404 Not Found' });
      } else if (status === 503 || status === 429) {
        resolve({ url, status, result: 'BLOCKED', detail: `Amazon rate-limited (${status}) — recheck manually` });
      } else {
        resolve({ url, status, result: 'UNKNOWN', detail: `Unexpected status ${status}` });
      }
      res.resume(); // drain
    });

    req.on('timeout', () => { req.destroy(); resolve({ url, status: 0, result: 'TIMEOUT', detail: 'Request timed out' }); });
    req.on('error', (e) => resolve({ url, status: 0, result: 'ERROR', detail: e.message }));
    req.end();
  });
}

async function main() {
  console.log('Fetching products from Sanity...');
  const r = await queryApi(
    `*[_type == "productReview" && published == true] | order(productName asc) {
      _id, productName, category, "slug": slug.current,
      "links": affiliateLinks
    }`
  );
  const products = r.result || [];
  console.log(`Found ${products.length} published products\n`);

  const broken = [];
  const blocked = [];
  let checked = 0;
  let ok = 0;

  for (const product of products) {
    const links = product.links || {};

    for (const region of REGIONS) {
      const rData = links[region.key];
      if (!rData || !rData.asin || rData.available === false) continue;

      const { asin } = rData;
      const result = await checkUrl(asin, region);
      checked++;

      if (result.result === 'OK') {
        ok++;
      } else if (result.result === 'BLOCKED') {
        blocked.push({ product, region: region.key, asin, ...result });
        console.log(`  ~ [${region.key}] ${product.productName} — BLOCKED (rate limit)`);
      } else {
        broken.push({ product, region: region.key, asin, ...result });
        console.log(`  ✗ [${region.key}] ${product.productName} — ${result.result} (ASIN: ${asin})`);
      }

      // Throttle: 800ms between requests to avoid rate limiting
      await sleep(800);
    }
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Checked: ${checked} links`);
  console.log(`OK:      ${ok}`);
  console.log(`Broken:  ${broken.length}`);
  console.log(`Blocked: ${blocked.length} (rate-limited — not counted as broken)`);

  // Output structured JSON for the GitHub Actions step to read
  const output = { checked, ok, broken, blocked };
  require('fs').writeFileSync('affiliate-check-results.json', JSON.stringify(output, null, 2));

  if (broken.length > 0) {
    console.log('\nBROKEN LINKS:');
    for (const b of broken) {
      console.log(`  ${b.product.productName} [${b.region}] ASIN:${b.asin} → ${b.result}`);
      console.log(`    https://sanity.io/manage/project/mnwolxvz — edit: ${b.product._id}`);
    }
    process.exit(1); // Signal failure to GitHub Actions
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
