/**
 * Optimize ALL Article Titles & Descriptions (Recursive - All Directories)
 * Searches content/ and all subdirectories for .mdx files
 *
 * Run: node scripts/optimize-all-content.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_BASE = path.join(__dirname, '../content');

// Title optimization rules by category/keyword patterns
const TITLE_PATTERNS = {
  // Pregnancy articles
  'pregnancy': {
    pattern: /^pregnancy/i,
    template: (title, year = '2026') => {
      if (title.includes('week') || title.match(/week \d+/i)) {
        return title.replace(/^pregnancy week (\d+)/i, `Pregnancy Week $1: Complete Guide, Symptoms & What to Expect (${year})`);
      }
      return `${title} During Pregnancy: Complete Guide for Expecting Mothers (${year})`;
    },
    description: (title) => {
      const keyword = title.toLowerCase();
      return `Learn everything about ${keyword} during pregnancy. Includes symptoms, safety tips, and expert medical guidance.`;
    }
  },

  // Buying guides
  'buying': {
    pattern: /^best|guide|comparison/i,
    template: (title) => {
      const match = title.match(/best\s+(.+?)(?:\s+(?:for|2026|guide|comparison))?$/i);
      const product = match ? match[1] : title;
      return `Best ${product} 2026: Safety, Features & Buying Guide for New Parents`;
    },
    description: (title) => {
      return `Compare options for ${title.toLowerCase()}. See safety features, prices, and expert recommendations for families.`;
    }
  },

  // Newborn care
  'newborn': {
    pattern: /newborn|baby care/i,
    template: (title) => {
      return `${title}: Complete Parent's Guide with Tips & Safety (2026)`;
    },
    description: (title) => {
      return `Essential guide on ${title.toLowerCase()}. Step-by-step instructions, safety tips, and answers to common questions.`;
    }
  },

  // Labor & delivery
  'labor': {
    pattern: /labor|delivery|birth/i,
    template: (title) => {
      return `${title}: What to Expect, Options & Pain Management Guide`;
    },
    description: (title) => {
      return `Complete guide to ${title.toLowerCase()}. Covers options, recovery, and important questions for healthcare providers.`;
    }
  },

  // Postpartum
  'postpartum': {
    pattern: /postpartum|recovery|after birth/i,
    template: (title) => {
      return `${title}: Week-by-Week Recovery, Tips & When to Call Doctor`;
    },
    description: (title) => {
      return `Essential postpartum guide. What's normal, recovery timeline, when to seek help, and self-care tips.`;
    }
  },

  // Feeding
  'feeding': {
    pattern: /feeding|breastfeed|formula|pump|bottle|solids|weaning/i,
    template: (title) => {
      return `${title}: How-To Guide, Tips & Answers to Common Questions`;
    },
    description: (title) => {
      return `Complete guide to ${title.toLowerCase()}. Best practices, common challenges, solutions, and expert tips.`;
    }
  },

  // Baby development/milestones
  'development': {
    pattern: /milestone|development|when do babies|language|motor/i,
    template: (title) => {
      return `${title}: Developmental Timeline & What to Expect by Age`;
    },
    description: (title) => {
      return `Learn about ${title.toLowerCase()} with month-by-month milestones and normal development signs.`;
    }
  },

  // Health & safety
  'health': {
    pattern: /health|safety|sick|illness|vaccine|medication/i,
    template: (title) => {
      return `${title}: Safety Information, Prevention & When to Seek Help`;
    },
    description: (title) => {
      return `Medical information on ${title.toLowerCase()}. Based on NHS, WHO guidelines. Prevention and when to contact doctor.`;
    }
  },

  // Baby names
  'names': {
    pattern: /name|meaning|origin/i,
    template: (title) => {
      if (title.includes('baby name')) {
        return title.replace(/baby name/i, 'Baby Name: Meaning, Origin & Popularity');
      }
      return `${title} Baby Names: Meanings, Origins & Popularity Trends`;
    },
    description: (title) => {
      return `Explore ${title.toLowerCase()}. Meanings, origins, popularity trends, and similar name suggestions.`;
    }
  },

  // FAQ/Common questions
  'faq': {
    pattern: /^(can|is|what|when|how|why)/i,
    template: (title) => {
      return `${title}? Expert Answers & Medical Facts`;
    },
    description: (title) => {
      return `${title}? Expert answers from NHS, WHO, pediatric organizations. Real parent insights included.`;
    }
  },

  // Tool pages
  'tools': {
    pattern: /calculator|tracker|timer|generator|guide/i,
    template: (title) => {
      return `${title}: How to Use & Get Accurate Results`;
    },
    description: (title) => {
      return `Learn how to use ${title.toLowerCase()}. Step-by-step guide and what the results mean.`;
    }
  },
};

// Get optimization rules
function getTitleOptimizationRules(category, filename) {
  for (const [key, rules] of Object.entries(TITLE_PATTERNS)) {
    if (category.includes(key) || filename.includes(key)) {
      return rules;
    }
  }

  for (const [key, rules] of Object.entries(TITLE_PATTERNS)) {
    if (rules.pattern.test(filename)) {
      return rules;
    }
  }

  return {
    template: (title) => `${title}: Complete Guide for Parents (2026)`,
    description: (title) => `Learn about ${title.toLowerCase()}. Expert tips, medical info, and parent Q&A.`,
  };
}

// Recursively find all MDX files
function getAllMDXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMDXFiles(filePath, fileList); // Recurse
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Optimize single article
function optimizeArticle(filePath) {
  const filename = path.basename(filePath, '.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const category = data.category || '';
  const currentTitle = data.title || '';

  const rules = getTitleOptimizationRules(category, filename);

  let newTitle = rules.template(currentTitle);

  if (newTitle.length > 65) {
    newTitle = newTitle.substring(0, 62) + '...';
  }

  let newDescription = rules.description(currentTitle);

  if (newDescription.length > 160) {
    newDescription = newDescription.substring(0, 157) + '...';
  } else if (newDescription.length < 120) {
    newDescription = newDescription + ` Trusted advice for parents.`;
  }

  const titleChanged = newTitle !== currentTitle;
  const descChanged = newDescription !== (data.description || '');

  data.title = newTitle;
  data.description = newDescription;

  const newFileContent = matter.stringify(content, data);
  fs.writeFileSync(filePath, newFileContent);

  return {
    filename,
    filePath: filePath.replace(CONTENT_BASE, ''),
    titleChanged,
    descChanged,
    oldTitle: currentTitle,
    newTitle,
  };
}

// Main execution
async function main() {
  console.log(`\n🚀 Optimizing ALL Article Titles & Descriptions (Recursive)\n`);
  console.log(`📊 SEO Formula: [Keyword] [Year] [Benefit] [Hook]\n`);
  console.log(`📁 Searching content/ and all subdirectories...\n`);

  // Get all MDX files recursively
  const allFiles = getAllMDXFiles(CONTENT_BASE);

  if (allFiles.length === 0) {
    console.log(`❌ No articles found in ${CONTENT_BASE}`);
    return;
  }

  console.log(`📊 Found ${allFiles.length} total articles\n`);

  let successCount = 0;
  let changedTitles = 0;
  let changedDescs = 0;
  const results = [];

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];
    const filename = path.basename(filePath, '.mdx');

    try {
      process.stdout.write(`⏳ [${i + 1}/${allFiles.length}] ${filename.substring(0, 35)}...`);

      const result = optimizeArticle(filePath);

      if (result.titleChanged || result.descChanged) {
        console.log(' ✅');
        if (result.titleChanged) changedTitles++;
        if (result.descChanged) changedDescs++;
      } else {
        console.log(' ⏭️');
      }

      results.push(result);
      successCount++;
    } catch (error) {
      console.log(` ❌ ${error.message}`);
    }
  }

  // Summary
  console.log(`\n${'='.repeat(70)}`);
  console.log(`\n✅ Optimization Complete:\n`);
  console.log(`   Total articles processed: ${successCount}/${allFiles.length}`);
  console.log(`   Titles updated: ${changedTitles}`);
  console.log(`   Descriptions updated: ${changedDescs}`);
  console.log(`\n${'='.repeat(70)}\n`);

  // Show samples
  console.log(`📝 Sample Changes (First 5 updated):\n`);
  let shown = 0;
  results.forEach(result => {
    if ((result.titleChanged || result.descChanged) && shown < 5) {
      console.log(`📄 ${result.filePath}`);
      if (result.titleChanged) {
        console.log(`   Old: "${result.oldTitle}"`);
        console.log(`   New: "${result.newTitle}"`);
      }
      console.log();
      shown++;
    }
  });

  console.log(`\n💡 Next steps:`);
  console.log(`   1. npm run build && npm run dev`);
  console.log(`   2. Verify changes at http://localhost:3000`);
  console.log(`   3. Commit and deploy\n`);
}

main().catch(console.error);
