#!/usr/bin/env node

/**
 * COMPLETE Product Creator for Sanity CMS
 * Creates product with ALL fields properly formatted in ONE request
 *
 * Usage: SANITY_AUTH_TOKEN=<token> node scripts/create-product-complete.js <json-file>
 */

const { createClient } = require('next-sanity');
const fs = require('fs');

const client = createClient({
  projectId: 'mnwolxvz',
  dataset: 'production',
  apiVersion: '2024-06-28',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

const REGION_CONFIG = {
  US: { domain: 'amazon.com', tag: 'pregnancysp0a-20' },
  UK: { domain: 'amazon.co.uk', tag: 'pregnancysp0a-21' },
  CA: { domain: 'amazon.ca', tag: 'pregnancysp07-20' },
  DE: { domain: 'amazon.de', tag: 'pregnancyspde-21' },
  FR: { domain: 'amazon.fr', tag: 'pregnancyspfr-21' },
  IT: { domain: 'amazon.it', tag: 'pregnayspit-21' },
  ES: { domain: 'amazon.es', tag: 'pregnancyspes-21' },
};

// Convert plain text body to portable text blocks
function textToPortableText(text) {
  if (!text) return [];

  const lines = text.split('\n\n').filter(l => l.trim());
  let blockIndex = 0;

  return lines.map(line => {
    blockIndex++;
    // Detect headers (ends with ":")
    const isHeader = line.trim().endsWith(':') && line.trim().length < 100;

    return {
      _type: 'block',
      _key: `block${blockIndex}`,
      style: isHeader ? 'h2' : 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `span${blockIndex}`,
          text: line.trim().replace(/:$/, ''), // Remove trailing colon from headers
          marks: []
        }
      ]
    };
  });
}

// Build affiliate links with proper format
function buildAffiliateLinks(asins) {
  const links = {};
  Object.entries(asins || {}).forEach(([region, asin]) => {
    const config = REGION_CONFIG[region];
    if (config) {
      links[region] = { asin, available: true };
    }
  });
  return links;
}

// Build specs table with _key
function buildSpecsTable(specs) {
  if (!specs) return [];
  return specs.map((spec, idx) => ({
    _key: `spec-${idx + 1}`,
    key: spec.key,
    value: spec.value
  }));
}

// Build FAQs with _key
function buildFAQs(faqs) {
  if (!faqs) return [];
  return faqs.map((faq, idx) => ({
    _key: `faq-${idx + 1}`,
    q: faq.q,
    a: faq.a
  }));
}

async function createProduct(data) {
  try {
    const product = {
      _type: 'productReview',
      productName: data.productName,
      slug: { _type: 'slug', current: data.slug },
      title: data.title || data.productName,
      description: data.description || '',
      brand: data.brand || '',
      category: data.category,
      modelYear: data.modelYear || new Date().getFullYear(),
      priceRange: data.priceRange || 'mid-range',
      ourScore: data.ourScore || 0,
      starRating: data.starRating || 0,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: data.author || 'PregnancySprout Editorial Team',
      featured: data.featured || false,
      pros: data.pros || [],
      cons: data.cons || [],
      bottomLine: data.bottomLine || '',
      bestFor: data.bestFor || '',
      affiliateLinks: buildAffiliateLinks(data.asins),
      specsTable: buildSpecsTable(data.specsTable),
      faqs: buildFAQs(data.faqs),
      body: textToPortableText(data.reviewBody),
      imageAlt: data.imageAlt || data.productName,
      tags: data.tags || [],
    };

    // Add image if provided
    if (data.imageUrl) {
      product.image = data.imageUrl;
    }

    const result = await client.create(product);
    console.log(`✅ Created: ${result.productName}`);
    console.log(`   ID: ${result._id}`);
    console.log(`   Sections: ${result.body?.length || 0} review blocks`);
    console.log(`   FAQs: ${result.faqs?.length || 0}`);
    console.log(`   Affiliate regions: ${Object.keys(result.affiliateLinks || {}).length}`);
    return result;
  } catch (err) {
    console.error(`❌ Failed: ${err.message}`);
    throw err;
  }
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ SANITY_AUTH_TOKEN required');
    process.exit(1);
  }

  const file = process.argv[2];
  if (!file) {
    console.error('❌ Usage: node create-product-complete.js <json-file>');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const products = Array.isArray(data) ? data : [data];

  console.log(`\n📦 Creating ${products.length} product(s)...\n`);

  for (const product of products) {
    await createProduct(product);
  }

  console.log(`\n✨ Complete! All products created and ready.\n`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
