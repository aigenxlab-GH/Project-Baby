#!/usr/bin/env node

/**
 * Batch create products in Sanity CMS
 * Usage: node scripts/create-sanity-product.js <product-json-file>
 *
 * Example product JSON:
 * {
 *   "productName": "UPPAbaby Minu V3 Travel Stroller",
 *   "slug": "uppababy-minu-v3-travel-stroller",
 *   "brand": "UPPAbaby",
 *   "category": "strollers",
 *   "asins": { "US": "B0...", "UK": "B0...", ... },
 *   ...
 * }
 */

const { createClient } = require('next-sanity');

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

function transformProduct(input) {
  const affiliateLinks = {};
  if (input.asins) {
    Object.entries(input.asins).forEach(([region, asin]) => {
      const config = REGION_CONFIG[region];
      if (config) {
        affiliateLinks[region] = {
          asin,
          available: true,
        };
      }
    });
  }

  return {
    _type: 'productReview',
    productName: input.productName,
    slug: { _type: 'slug', current: input.slug },
    title: input.title || input.productName,
    description: input.description || '',
    brand: input.brand || '',
    category: input.category,
    modelYear: input.modelYear || new Date().getFullYear(),
    priceRange: input.priceRange || 'mid-range',
    ourScore: input.ourScore || 0,
    starRating: input.starRating || 0,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: input.author || 'PregnancySprout Editorial Team',
    featured: input.featured || false,
    pros: input.pros || [],
    cons: input.cons || [],
    bottomLine: input.bottomLine || '',
    affiliateLinks,
    specsTable: input.specsTable || [],
    faqs: input.faqs || [],
    body: input.body || [],
    tags: input.tags || [],
  };
}

async function createProduct(productData) {
  try {
    const transformed = transformProduct(productData);
    const result = await client.create(transformed);
    console.log(`✅ Created: ${result.productName} (${result._id})`);
    return result;
  } catch (err) {
    console.error(`❌ Failed to create ${productData.productName}:`, err.message);
    throw err;
  }
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ SANITY_AUTH_TOKEN not set. Set it before running this script.');
    process.exit(1);
  }

  // Read from stdin or file
  const inputFile = process.argv[2];
  let input;

  try {
    if (inputFile) {
      input = JSON.parse(require('fs').readFileSync(inputFile, 'utf-8'));
    } else {
      input = JSON.parse(require('fs').readFileSync(0, 'utf-8'));
    }
  } catch (err) {
    console.error('❌ Invalid JSON input:', err.message);
    process.exit(1);
  }

  // Handle both single product and array of products
  const products = Array.isArray(input) ? input : [input];

  console.log(`📦 Creating ${products.length} product(s)...\n`);

  for (const product of products) {
    await createProduct(product);
  }

  console.log(`\n✨ Done! ${products.length} product(s) created.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
