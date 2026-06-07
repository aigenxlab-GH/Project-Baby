/**
 * Strategic Article Generator for PregnancySprout
 * Generates articles based on high-intent keywords, affiliate revenue, and user needs
 *
 * Setup: ollama run mistral (keep running)
 * Run: node scripts/generate-strategic-articles.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'mistral';

// Strategic articles mapped to business goals
const ARTICLE_TOPICS = [
  // ============================================
  // PREGNANCY ARTICLES (High traffic, long tail)
  // ============================================
  { category: 'pregnancy', title: 'Pregnancy symptoms by week: what\'s normal and what\'s not', slug: 'pregnancy-symptoms-by-week' },
  { category: 'pregnancy', title: 'First trimester: what to expect in weeks 1-13', slug: 'first-trimester-guide' },
  { category: 'pregnancy', title: 'Second trimester: weeks 14-27 pregnancy guide', slug: 'second-trimester-guide' },
  { category: 'pregnancy', title: 'Third trimester: weeks 28-40 pregnancy guide', slug: 'third-trimester-guide' },
  { category: 'pregnancy', title: 'Prenatal vitamins: what you need and when', slug: 'prenatal-vitamins-guide' },
  { category: 'pregnancy', title: 'Pregnancy cravings explained: what\'s safe to eat', slug: 'pregnancy-cravings-safe-foods' },
  { category: 'pregnancy', title: 'Weight gain during pregnancy: how much is normal?', slug: 'pregnancy-weight-gain-guide' },
  { category: 'pregnancy', title: 'Morning sickness: causes and remedies that work', slug: 'morning-sickness-remedies' },
  { category: 'pregnancy', title: 'Gestational diabetes: risk factors and testing', slug: 'gestational-diabetes-pregnancy' },
  { category: 'pregnancy', title: 'Preeclampsia warning signs every pregnant woman should know', slug: 'preeclampsia-warning-signs' },

  // ============================================
  // PRODUCT BUYING GUIDES (Highest affiliate value)
  // ============================================
  { category: 'buying-guides', title: 'Best car seats for newborns: safety, comfort, and budget', slug: 'best-car-seats-newborns' },
  { category: 'buying-guides', title: 'Best strollers for newborns to toddlers: travel systems vs modular', slug: 'best-strollers-newborns-toddlers' },
  { category: 'buying-guides', title: 'Best baby monitors 2026: video, audio, and wearable comparison', slug: 'best-baby-monitors-2026-comparison' },
  { category: 'buying-guides', title: 'Best cribs and bassinets: safety standards and SIDS prevention', slug: 'best-cribs-bassinets-safety' },
  { category: 'buying-guides', title: 'Best breast pumps: manual, electric, and wearable options', slug: 'best-breast-pumps-comparison' },
  { category: 'buying-guides', title: 'Best baby carriers: structured vs wraps vs slings', slug: 'best-baby-carriers-types' },
  { category: 'buying-guides', title: 'Best bottle sterilizers: UV, steam, and microwave options', slug: 'best-bottle-sterilizers' },
  { category: 'buying-guides', title: 'Best humidifiers for baby rooms: preventing dry skin and congestion', slug: 'best-humidifiers-babies' },
  { category: 'buying-guides', title: 'Best white noise machines for babies: sleep and soothing', slug: 'best-white-noise-machines' },
  { category: 'buying-guides', title: 'Best baby bath tubs: newborn support and safety features', slug: 'best-baby-bath-tubs' },

  // ============================================
  // NEWBORN CARE ESSENTIALS (High traffic)
  // ============================================
  { category: 'newborn-care', title: 'Newborn essentials checklist: what you actually need', slug: 'newborn-essentials-checklist' },
  { category: 'newborn-care', title: 'How to bathe a newborn safely: step-by-step guide', slug: 'how-to-bathe-newborn-safely' },
  { category: 'newborn-care', title: 'Newborn breathing patterns: when to worry about rapid breathing', slug: 'newborn-breathing-patterns' },
  { category: 'newborn-care', title: 'Diaper rash treatment and prevention: what actually works', slug: 'diaper-rash-treatment-prevention' },
  { category: 'newborn-care', title: 'Newborn scratching: why babies scratch and how to prevent injury', slug: 'newborn-scratching-prevention' },
  { category: 'newborn-care', title: 'How often should you bathe a newborn?', slug: 'how-often-bathe-newborn' },

  // ============================================
  // LABOR & DELIVERY PREPARATION (Seasonal high traffic)
  // ============================================
  { category: 'labor-delivery', title: 'Birth plan template: what to include and discuss with your provider', slug: 'birth-plan-template' },
  { category: 'labor-delivery', title: 'Natural vs medicated labor: pros and cons of each option', slug: 'natural-vs-medicated-labor' },
  { category: 'labor-delivery', title: 'Labor positions: which ones help progress and reduce pain', slug: 'labor-positions-guide' },
  { category: 'labor-delivery', title: 'When to go to the hospital: labor signs and false labor', slug: 'when-to-go-to-hospital-labor' },
  { category: 'labor-delivery', title: 'Episiotomy: what it is, when it\'s needed, and recovery', slug: 'episiotomy-explanation-recovery' },
  { category: 'labor-delivery', title: 'C-section vs vaginal delivery: recovery and what to expect', slug: 'c-section-vs-vaginal-delivery' },

  // ============================================
  // POSTPARTUM & RECOVERY (Often overlooked, high intent)
  // ============================================
  { category: 'postpartum', title: 'Postpartum recovery timeline: what\'s normal each week', slug: 'postpartum-recovery-timeline' },
  { category: 'postpartum', title: 'Postpartum bleeding: lochia and when to call your doctor', slug: 'postpartum-bleeding-lochia' },
  { category: 'postpartum', title: 'Postpartum depression vs baby blues: signs and support', slug: 'postpartum-depression-vs-baby-blues' },
  { category: 'postpartum', title: 'Pelvic floor recovery after childbirth: exercises and healing', slug: 'pelvic-floor-recovery-postpartum' },
  { category: 'postpartum', title: 'When can you exercise after giving birth?', slug: 'exercise-after-childbirth-timeline' },

  // ============================================
  // FEEDING COMPARISONS (High revenue potential)
  // ============================================
  { category: 'feeding', title: 'Breastfeeding vs formula feeding: pros, cons, and facts', slug: 'breastfeeding-vs-formula-feeding' },
  { category: 'feeding', title: 'Exclusive pumping: is it right for your family?', slug: 'exclusive-pumping-guide' },
  { category: 'feeding', title: 'Infant formula types: cow\'s milk, goat\'s milk, and hypoallergenic', slug: 'infant-formula-types-comparison' },
  { category: 'feeding', title: 'Introduction to cow\'s milk: when and how to transition', slug: 'transition-to-cows-milk' },
  { category: 'feeding', title: 'Food introduction order: allergenic foods and starting solids', slug: 'food-introduction-order-allergies' },

  // ============================================
  // TOOL SUPPORT ARTICLES (Drive tool usage & engagement)
  // ============================================
  { category: 'tools', title: 'How to calculate your due date: LMP vs ultrasound accuracy', slug: 'calculate-due-date-accuracy' },
  { category: 'tools', title: 'How to track contractions: timing and what pattern means labor', slug: 'how-to-track-contractions' },
  { category: 'tools', title: 'Ovulation window: how to track fertile days and predict it', slug: 'ovulation-window-tracking' },
  { category: 'tools', title: 'Baby name generator: how to use naming trends and meanings', slug: 'baby-name-generator-guide' },
  { category: 'tools', title: 'Pregnancy symptom tracker: what symptoms matter most each trimester', slug: 'pregnancy-symptom-tracker-guide' },

  // ============================================
  // HEALTH & SAFETY (High authority content)
  // ============================================
  { category: 'health-safety', title: 'Group B Streptococcus (GBS) in pregnancy: testing and treatment', slug: 'group-b-strep-pregnancy' },
  { category: 'health-safety', title: 'Vaccinations during pregnancy: which are safe and recommended', slug: 'vaccinations-pregnancy-safety' },
  { category: 'health-safety', title: 'Listeria in pregnancy: foods to avoid and food safety', slug: 'listeria-pregnancy-food-safety' },
  { category: 'health-safety', title: 'Flying while pregnant: safety, comfort, and airline policies', slug: 'flying-while-pregnant-safety' },
  { category: 'health-safety', title: 'Exercise during pregnancy: safe activities by trimester', slug: 'exercise-during-pregnancy-safe' },

  // ============================================
  // COMMON QUESTIONS (Quick wins, low competition)
  // ============================================
  { category: 'faq', title: 'Can you get pregnant while breastfeeding?', slug: 'pregnant-while-breastfeeding' },
  { category: 'faq', title: 'Is it safe to dye hair during pregnancy?', slug: 'dye-hair-pregnancy-safe' },
  { category: 'faq', title: 'Can you drink caffeine while pregnant? How much is safe?', slug: 'caffeine-pregnancy-safe-amount' },
  { category: 'faq', title: 'Is it safe to take pain relief during pregnancy?', slug: 'pain-relief-pregnancy-safe' },
  { category: 'faq', title: 'What causes pregnancy brain fog and memory issues?', slug: 'pregnancy-brain-fog-explained' },
];

function ollamaRequest(prompt) {
  return new Promise((resolve, reject) => {
    const requestData = JSON.stringify({
      model: MODEL,
      prompt: prompt,
      stream: false,
      temperature: 0.7,
      top_p: 0.9,
    });

    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.response || '');
        } catch (e) {
          reject(new Error(`Invalid JSON: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(requestData);
    req.end();
  });
}

async function generateArticle(topicData) {
  const { category, title, slug } = topicData;

  const prompt = `You are a professional pregnancy and parenting expert blogger. Write an article titled "${title}".

Requirements:
- 700-900 words
- Use markdown with H2 and H3 headings
- Reference NHS, WHO, or medical guidelines where relevant
- Practical, parent-friendly language
- Answer real parent questions
- Include 2-3 actionable tips
- Add FAQ section with 2-3 Q&A pairs
- Start with engaging intro paragraph

Write only article body (no frontmatter). Use proper markdown.`;

  try {
    const content = await ollamaRequest(prompt);
    return content;
  } catch (error) {
    console.error(`❌ Failed: ${slug}: ${error.message}`);
    return null;
  }
}

function createMDXFile(topicData, content) {
  const { category, title, slug } = topicData;
  const now = new Date();
  const publishedAt = now.toISOString().split('T')[0];

  const frontmatter = `---
title: "${title}"
description: "${title.toLowerCase()}"
publishedAt: "${publishedAt}"
updatedAt: "${publishedAt}"
author: "PregnancySprout Editorial Team"
category: "${category}"
tags: ["${category}", "pregnancy", "baby", "parenting"]
readingTime: 8
---

`;

  return frontmatter + content;
}

async function main() {
  console.log(`🚀 Generating ${ARTICLE_TOPICS.length} strategic articles for PregnancySprout`);
  console.log(`📊 Topics: Pregnancy (10) | Buying Guides (10) | Newborn (6) | Labor (6) | Postpartum (5) | Feeding (5) | Tools (5) | Health (5) | FAQ (5)\n`);
  console.log(`⚠️  Make sure Ollama is running: ollama run mistral\n`);

  const contentBasePath = path.join(__dirname, '../content/blog');
  let successCount = 0;
  let skippedCount = 0;

  // Ensure blog directory exists
  if (!fs.existsSync(contentBasePath)) {
    fs.mkdirSync(contentBasePath, { recursive: true });
  }

  for (let i = 0; i < ARTICLE_TOPICS.length; i++) {
    const topicData = ARTICLE_TOPICS[i];
    const { slug } = topicData;

    const filePath = path.join(contentBasePath, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      console.log(`⏭️  [${i + 1}/${ARTICLE_TOPICS.length}] ${slug} (exists)`);
      skippedCount++;
      continue;
    }

    process.stdout.write(`⏳ [${i + 1}/${ARTICLE_TOPICS.length}] ${slug.substring(0, 45)}...`);
    const content = await generateArticle(topicData);

    if (content && content.length > 100) {
      const mdxContent = createMDXFile(topicData, content);
      fs.writeFileSync(filePath, mdxContent);
      console.log(' ✅');
      successCount++;
    } else {
      console.log(' ❌');
    }
  }

  console.log(`\n✅ Generation complete:`);
  console.log(`   Generated: ${successCount} articles`);
  console.log(`   Already exist: ${skippedCount}`);
  console.log(`   Total: ${successCount + skippedCount}/${ARTICLE_TOPICS.length}`);
  console.log(`\n📁 Articles saved to: content/blog/`);
  console.log(`\n🎯 Strategic coverage:`);
  console.log(`   - Pregnancy: drives top-of-funnel traffic`);
  console.log(`   - Buying guides: highest affiliate revenue per article`);
  console.log(`   - Product comparison: supports existing product reviews`);
  console.log(`   - Tool support: increases tool usage & engagement`);
  console.log(`\n💡 After generation, run: npm run build && npm run dev`);
}

main().catch(console.error);
