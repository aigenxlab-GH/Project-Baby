const fs = require('fs');
const path = require('path');

const blogDir = 'C:\\AIGenXLab\\Projects\\Project-Baby\\content\\blog';
const productsDir = 'C:\\AIGenXLab\\Projects\\Project-Baby\\content\\products';
const updatedAtDate = '2026-06-23';

// Helper to generate dates for a distribution
function generateDates(startDate, distribution, totalCount) {
  const dates = [];
  const baseTime = new Date(startDate).getTime();

  let fileIndex = 0;
  for (const bucket of distribution) {
    const { days, count } = bucket;
    const minDay = Math.min(...days);
    const maxDay = Math.max(...days);
    const daySpan = maxDay - minDay + 1;

    for (let i = 0; i < count && fileIndex < totalCount; i++) {
      const dayOffset = minDay + Math.floor((i % daySpan) * (daySpan / count));
      const date = new Date(baseTime + dayOffset * 86400000);
      dates.push(date.toISOString().split('T')[0]);
      fileIndex++;
    }
  }

  // Shuffle for natural appearance
  return dates.sort(() => Math.random() - 0.5);
}

// Blog distribution
const blogDistribution = [
  { days: [...Array(14).keys()], count: 20 },       // Days 0-13: 20 files
  { days: [...Array(14).keys()].map(i => i + 14), count: 30 }, // Days 14-27: 30
  { days: [...Array(14).keys()].map(i => i + 28), count: 45 }, // Days 28-41: 45
  { days: [...Array(14).keys()].map(i => i + 42), count: 50 }, // Days 42-55: 50
  { days: [...Array(4).keys()].map(i => i + 56), count: 35 },  // Days 56-59: 35
];

// Product distribution
const productDistribution = [
  { days: [...Array(14).keys()], count: 22 },       // Days 0-13: 22 files
  { days: [...Array(14).keys()].map(i => i + 14), count: 33 }, // Days 14-27: 33
  { days: [...Array(14).keys()].map(i => i + 28), count: 50 }, // Days 28-41: 50
  { days: [...Array(14).keys()].map(i => i + 42), count: 55 }, // Days 42-55: 55
  { days: [...Array(4).keys()].map(i => i + 56), count: 40 },  // Days 56-59: 40
];

const blogDates = generateDates('2026-04-20', blogDistribution, 180);
const productDates = generateDates('2026-04-15', productDistribution, 200);

console.log(`Blog dates prepared: ${blogDates.length}`);
console.log(`Product dates prepared: ${productDates.length}`);

// Process blog files
console.log('\nProcessing blog files...');
let blogProcessed = 0;
let blogUpdated = 0;
let dateIndex = 0;

const getBlogFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getBlogFiles(fullPath));
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
};

const blogFiles = getBlogFiles(blogDir).sort();
for (const file of blogFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const publishDate = dateIndex < blogDates.length ? blogDates[dateIndex] : blogDates[blogDates.length - 1];

  let newContent = content.replace(
    /publishedAt:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/,
    `publishedAt: '${publishDate}'`
  );

  newContent = newContent.replace(
    /updatedAt:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/,
    `updatedAt: '${updatedAtDate}'`
  );

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    blogUpdated++;
  }

  blogProcessed++;
  dateIndex++;

  if (blogProcessed % 20 === 0) {
    console.log(`  Processed ${blogProcessed} files...`);
  }
}

console.log(`Blog files processed: ${blogProcessed}, updated: ${blogUpdated}`);

// Process product files
console.log('\nProcessing product files...');
let productProcessed = 0;
let productUpdated = 0;
dateIndex = 0;

const productFiles = getBlogFiles(productsDir).sort();
for (const file of productFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const publishDate = dateIndex < productDates.length ? productDates[dateIndex] : productDates[productDates.length - 1];

  let newContent = content.replace(
    /publishedAt:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/,
    `publishedAt: '${publishDate}'`
  );

  newContent = newContent.replace(
    /updatedAt:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/,
    `updatedAt: '${updatedAtDate}'`
  );

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    productUpdated++;
  }

  productProcessed++;
  dateIndex++;

  if (productProcessed % 30 === 0) {
    console.log(`  Processed ${productProcessed} files...`);
  }
}

console.log(`Product files processed: ${productProcessed}, updated: ${productUpdated}`);

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Blog files: ${blogProcessed} processed, ${blogUpdated} updated`);
console.log(`Product files: ${productProcessed} processed, ${productUpdated} updated`);
console.log(`Total: ${blogProcessed + productProcessed} files processed`);
console.log(`Date ranges: Blog Apr 20-Jun 20, Products Apr 15-Jun 15`);
console.log(`Updated At: All files set to ${updatedAtDate}`);
