const fs = require('fs');
const path = require('path');
const BLOG = 'content/blog';

// ALL confirmed real Unsplash photo IDs verified from pregnancysprout.com codebase + Unsplash page fetches
// Grouped by topic so each article gets a relevant image

const POOLS = {
  pregnancy: [
    '1519823551278-64ac92734fb1', // pregnant woman
    '1457342813143-a1ae27448a82', // pregnant woman lying down
    '1568043625493-2b0633c7c491', // pregnant woman / family
    '1538678867871-8a43e7487746', // pregnancy / belly
    '1585771724684-38269d6639fd', // pregnancy
    '1586023492125-27b2c045efd7', // pregnancy
    '1507003211169-0a1dd7228f2d', // woman / lifestyle / working
    '1529429617124-95b109e86bb8', // pregnancy lifestyle
    '1531983412531-1f49a365ffed', // mother / pregnancy
    '1653063264246-0c0f3b266cfa', // pregnancy / parenting
    '1631549916768-4119b2e5f926', // pregnancy / baby
    '1611946443064-be5ddf96b4e2', // pregnancy
  ],

  baby: [
    '1476703993599-0035a21b17a9', // mother with baby
    '1566004100631-35d015d6a491', // newborn baby
    '1590650046871-92965baa6be8', // baby smiling
    '1555252333-9f8e92e65df9',    // baby / newborn
    '1631563019676-dade0dbf9b20', // baby
    '1556742049-0cfed4f6a45d',    // baby / newborn
    '1470116945706-e6bf5d5a53ca', // baby / child
    '1552819289-824d37ca69d2',    // baby sleeping
    '1560707857-b897819e06fb',    // parent with baby
    '1551934262-db2d7dd517f4',    // baby
    '1510154221590-ff63e90a136f', // mother / baby
    '1582486225644-aeacf6aa0b1b', // mother / baby
    '1480985041486-c65b20c01d1f', // newborn / baby
    '1604917621956-10dfa7cce2e7', // newborn baby
    '1543342384-1f1350e27861',    // baby / newborn
    '1552819289-e14fbbcea868',    // baby / newborn
    '1542385151-efd9000785a0',    // baby / toddler
  ],

  toddler: [
    '1569913486515-b74bf7751574', // toddler tantrum
    '1516627145497-ae6968895b74', // toddler / potty training
    '1545558014-8692077e9b5c',    // toddler / teaching / sharing
    '1558618666-fcd25c85cd64',    // child / family
    '1440288736878-766bd5839edb', // child / toddler
    '1484820540004-14229fe36ca4', // children / playing
    '1503919545889-aef636e10ad4', // toddler
    '1611890293555-2cb0075ecd3e', // toddler development
    '1566513857792-9a52cd97e06d', // child / toddler
  ],

  parenting: [
    '1505751172876-fa1923c5c528', // family
    '1513094775335-5ae4cf4a7b80', // family / parenting
    '1514706986008-37c7f3e48f05', // parenting
    '1515488042361-ee00e0ddd4e4', // parenting
    '1518640467707-6811f4a6ab73', // parenting / lifestyle
    '1519340241574-2cec6aef0c01', // family
    '1501886564641-e55a61b1f5da', // lifestyle / mother
    '1576091160550-2173dba999ef', // health / medical
  ],

  feeding: [
    '1493894473891-10fc1e5dbd22', // baby feeding / high chair
    '1674637828373-3b8d7cded475', // breastfeeding
    '1648634008591-4ede52875841', // breastfeeding / nursing
    '1567201719502-255e0b3c683a', // breastfeeding
    '1669810432286-358c5622668e', // breastfeeding / nursing
    '1616391182219-e080b4d1042a', // breast pump
  ],

  product: [
    '1491013516836-7db643ee125a', // baby products
    '1503454537195-1dcabb73ffb9', // car seat
    '1519689680058-324335c77eba', // crib / nursery
    '1590492239080-e50b66d15a3d', // stroller
    '1544367567-0f2fcb009e0b',    // travel system
    '1533483595632-c5f0e57a1936', // convertible car seat
    '1518020382113-a7e8fc38eac9', // white noise machine
    '1519457431-44ccd64a579b',    // humidifier
    '1522771739844-6a9f6d5f14af', // nursery furniture
    '1512290923902-8a9f81dc236c', // toddler bed
    '1528557375823-3f77a7b6c8bc', // feeding chair / high chair
    '1584515933487-779824d29309', // baby product
    '1584516150909-c43483ee7932', // baby product
    '1591474200742-8e512e6f98f8', // baby product
    '1594736797933-d0401ba2fe65', // baby product
    '1563203369-26f2e4a5ccf7',    // stroller comparison
    '1567515004624-219c11d31f2e', // baby product
    '1548531174879-f38a17e5b0a3', // baby product
    '1548532928-b34e3be62fc6',    // baby product
    '1548686304-89d188a80029',    // baby product
    '1553481187-be93c21490a9',    // baby product
    '1554819177-a87aec3fc66d',    // baby product
    '1560328055-e938bb2ed50a',    // baby product
    '1565120130276-dfbd9a7a3ad7', // baby product
    '1566041510639-8d95a2490bfb', // baby product
    '1567967412737-0b22be20d25e', // baby product
    '1574158622682-e029699b87b7', // baby product
    '1578004608831-4c28e75c81c3', // baby product
    '1578985545062-69928b1d9587', // baby product
    '1550159930-40066082a4fc',    // baby product
    '1524503033411-c9566986fc8f', // baby product
    '1526634332515-d56c5fd16991', // baby product
    '1536640712-4d4c36ff0e4e',    // baby product
    '1596462502278-27bfdc403348', // baby / lifestyle
    '1603921326210-6edd2d60ca68', // parenting / family
    '1608138278596-4f54ede56d77', // baby / parenting
    '1621188988909-fbef0a8fce32', // pregnancy / motherhood
    '1612531386530-97286d97c2d2', // baby / family
  ],
};

function getCategory(slug) {
  if (/^best-|buying-guide|vs-disposable|vs-modular|vs-bouncer|vs-regular|nursery-setup|buying-guides/.test(slug)) {
    return 'product';
  }
  if (/breastfeed|formula-feed|exclusive-pumping|infant-formula|solid-food|cows-milk|food-introduction/.test(slug)) {
    return 'feeding';
  }
  if (/toddler|potty-training|communication-toddlers/.test(slug)) {
    return 'toddler';
  }
  if (/^pregnancy|prenatal|trimester|gestational|morning-sick|heartburn-during|stretch-marks|swollen|insomnia-how|brain-fog|round-ligament|cravings|weight-gain|diet-guide|prenatal-vitamin|yoga|exercise-during|safe-exercise|pelvic-floor-exercise|warning-sign|preeclampsia|group-b-strep|vaccinations-preg|caffeine|listeria|pain-relief-preg|dye-hair|flying-while|working-during|travelling-while|sex-during|pregnancy-ann|pregnant-while|calculate-due|ovulation/.test(slug)) {
    return 'pregnancy';
  }
  if (/newborn|baby-care|bathe-newborn|breathing-pattern|scratching|essentials-checklist|diaper-rash|baby-fever|baby-constip|baby-cpr|baby-eczema|baby-thrush|hospital-bag|baby-milestone|baby-registry|baby-name-gen|baby-sleep|baby-proof|ultimate-baby-sleep|baby-proofing|teething-pain/.test(slug)) {
    return 'baby';
  }
  // labor, postpartum, parenting, lifestyle → parenting pool
  return 'parenting';
}

// Sort files alphabetically for consistent deterministic assignment
const files = fs.readdirSync(BLOG).filter(f => f.endsWith('.mdx')).sort();

// Track index per category for round-robin
const indices = { pregnancy: 0, baby: 0, toddler: 0, parenting: 0, feeding: 0, product: 0 };

let updated = 0;
const stats = { pregnancy: 0, baby: 0, toddler: 0, parenting: 0, feeding: 0, product: 0 };

for (const file of files) {
  const slug = file.replace('.mdx', '');
  const filepath = path.join(BLOG, file);
  let content = fs.readFileSync(filepath, 'utf8');

  const cat = getCategory(slug);
  const pool = POOLS[cat];
  const photoId = pool[indices[cat] % pool.length];
  indices[cat]++;
  stats[cat]++;

  const imageUrl = `https://images.unsplash.com/photo-${photoId}?w=1200&q=85&auto=format&fit=crop`;

  // Remove any existing image line
  content = content.replace(/^image:.*\n?/m, '');

  // Insert before publishedAt (works with both inline and >- block scalar descriptions)
  if (content.match(/^publishedAt:/m)) {
    content = content.replace(/^(publishedAt:)/m, `image: '${imageUrl}'\n$1`);
    fs.writeFileSync(filepath, content, 'utf8');
    updated++;
  }
}

console.log(`\nUpdated ${updated} blog articles`);
console.log('\nDistribution:');
for (const [cat, count] of Object.entries(stats)) {
  const poolSize = POOLS[cat].length;
  const repeats = Math.ceil(count / poolSize);
  console.log(`  ${cat.padEnd(10)}: ${count} articles, ${poolSize} unique IDs, max ${repeats}x repeat`);
}

// Check for duplicates per category (articles that share the SAME image)
console.log('\nDuplicate check per category:');
for (const [cat, count] of Object.entries(stats)) {
  const poolSize = POOLS[cat].length;
  if (count > poolSize) {
    console.log(`  ${cat}: ${count - poolSize} articles share an image with another in the same category`);
  } else {
    console.log(`  ${cat}: all unique within category ✓`);
  }
}
