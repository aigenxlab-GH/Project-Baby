/**
 * Generate 80+ parenting articles using Ollama (FREE, local LLM)
 *
 * Setup:
 * 1. Install Ollama: https://ollama.ai
 * 2. Run Ollama with Mistral model:
 *    ollama run mistral
 * 3. Keep Ollama running in background (it serves on localhost:11434)
 * 4. Run this script:
 *    node scripts/generate-articles-ollama.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'mistral'; // Fast, good quality. Alternatives: neural-chat, orca-mini

// Article templates to generate
const ARTICLE_TOPICS = [
  // Newborn (15 articles - reduced for faster generation)
  { topic: 'newborn', title: 'Newborn jaundice: what causes it and when to worry', slug: 'newborn-jaundice-causes-treatment' },
  { topic: 'newborn', title: 'Umbilical cord care: keeping it clean and dry', slug: 'umbilical-cord-care-newborn' },
  { topic: 'newborn', title: 'Newborn skin rashes: diaper rash vs heat rash vs cradle cap', slug: 'newborn-skin-rashes-guide' },
  { topic: 'newborn', title: 'Baby hiccups: why newborns hiccup and when to be concerned', slug: 'baby-hiccups-newborn' },
  { topic: 'newborn', title: 'Newborn screening tests: what they are and why they matter', slug: 'newborn-screening-tests' },
  { topic: 'newborn', title: 'APGAR score explained: what your baby\'s score means', slug: 'apgar-score-explained' },
  { topic: 'newborn', title: 'Newborn eye care: preventing and treating infection', slug: 'newborn-eye-care' },
  { topic: 'newborn', title: 'Soft spots on baby\'s head: fontanels explained', slug: 'baby-fontanels-soft-spots' },
  { topic: 'newborn', title: 'Newborn hearing test: what to expect and what results mean', slug: 'newborn-hearing-test' },
  { topic: 'newborn', title: 'Baby acne: is it normal and how to treat it', slug: 'baby-acne-newborn' },
  { topic: 'newborn', title: 'Milia on baby\'s skin: tiny white bumps explained', slug: 'baby-milia-explained' },
  { topic: 'newborn', title: 'Newborn congestion: saline spray and nasal hygiene', slug: 'newborn-congestion-remedy' },
  { topic: 'newborn', title: 'Baby sneezing and snoring: is it normal?', slug: 'baby-sneezing-snoring-normal' },
  { topic: 'newborn', title: 'Newborn reflexes: startle, rooting, and sucking explained', slug: 'newborn-reflexes-explained' },
  { topic: 'newborn', title: 'Flat head in babies: plagiocephaly and prevention', slug: 'flat-head-baby-plagiocephaly' },

  // Sleep (15 articles)
  { topic: 'sleep', title: 'When do babies sleep through the night? A month-by-month guide', slug: 'when-babies-sleep-through-night' },
  { topic: 'sleep', title: 'Newborn sleep patterns: what to expect in the first weeks', slug: 'newborn-sleep-patterns-first-weeks' },
  { topic: 'sleep', title: 'SIDS prevention: safe sleep practices that actually matter', slug: 'sids-prevention-safe-sleep' },
  { topic: 'sleep', title: 'Co-sleeping safely with your baby: bed-sharing guidelines', slug: 'co-sleeping-bed-sharing-safe' },
  { topic: 'sleep', title: 'Baby sleep position: back, side, or tummy?', slug: 'baby-sleep-position-safe' },
  { topic: 'sleep', title: 'Bassinet vs crib: which is right for your family?', slug: 'bassinet-vs-crib-comparison' },
  { topic: 'sleep', title: 'Swaddling babies: how to swaddle safely', slug: 'how-to-swaddle-baby-safely' },
  { topic: 'sleep', title: 'Wake windows by age: understanding baby tiredness cues', slug: 'baby-wake-windows-by-age' },
  { topic: 'sleep', title: 'Baby sleep regression at 4 months: what\'s happening', slug: '4-month-sleep-regression-baby' },
  { topic: 'sleep', title: 'Sleep training methods: Ferber, extinction, and gentler options', slug: 'sleep-training-methods-comparison' },
  { topic: 'sleep', title: 'Bedtime routine for babies: how to build one that works', slug: 'baby-bedtime-routine-guide' },
  { topic: 'sleep', title: 'Night terrors vs nightmares: what\'s the difference?', slug: 'night-terrors-vs-nightmares-babies' },
  { topic: 'sleep', title: 'Baby waking at night: hunger, discomfort, or habit?', slug: 'baby-waking-night-causes' },
  { topic: 'sleep', title: 'Early morning waking in babies: why and how to fix it', slug: 'early-morning-waking-babies' },
  { topic: 'sleep', title: 'Transition from bassinet to crib: timing and tips', slug: 'bassinet-to-crib-transition' },

  // Feeding (15 articles)
  { topic: 'feeding', title: 'Breast feeding positions: cradle, cross-cradle, side-lying', slug: 'breastfeeding-positions-guide' },
  { topic: 'feeding', title: 'Latching problems: tongue tie and how to fix it', slug: 'baby-tongue-tie-latching-problems' },
  { topic: 'feeding', title: 'Milk supply: how to know if you have enough', slug: 'how-to-know-milk-supply-enough' },
  { topic: 'feeding', title: 'Pumping and storing breast milk: guidelines and tips', slug: 'pumping-storing-breast-milk' },
  { topic: 'feeding', title: 'Cluster feeding: what is it and is it normal?', slug: 'cluster-feeding-explained-babies' },
  { topic: 'feeding', title: 'Bottle feeding: sterilization, warming, and storage', slug: 'bottle-feeding-guide-sterilization' },
  { topic: 'feeding', title: 'Formula feeding: choosing the right formula for your baby', slug: 'formula-feeding-types-guide' },
  { topic: 'feeding', title: 'Weaning and introducing solids: signs of readiness at 6 months', slug: 'signs-readiness-solids-6-months' },
  { topic: 'feeding', title: 'First foods for babies: what to introduce first', slug: 'first-foods-babies-introduce' },
  { topic: 'feeding', title: 'Choking hazards: foods to avoid for babies and toddlers', slug: 'choking-hazards-babies-toddlers' },
  { topic: 'feeding', title: 'Picky eating in toddlers: when should you worry?', slug: 'picky-eater-toddler-concern' },
  { topic: 'feeding', title: 'Food allergies in babies: signs and what to do', slug: 'food-allergies-babies-signs' },
  { topic: 'feeding', title: 'Constipation in babies: causes and remedies', slug: 'baby-constipation-causes-remedies' },
  { topic: 'feeding', title: 'Reflux in babies: what causes it and how to help', slug: 'baby-reflux-causes-help' },
  { topic: 'feeding', title: 'Feeding schedule by age: how often should you feed?', slug: 'baby-feeding-schedule-by-age' },

  // Development (15 articles)
  { topic: 'development', title: 'Developmental milestones: what to expect by month', slug: 'baby-developmental-milestones-monthly' },
  { topic: 'development', title: 'When do babies smile? Social smiling explained', slug: 'when-babies-smile-socially' },
  { topic: 'development', title: 'Baby rolling over: when and how it happens', slug: 'baby-rolling-over-timeline' },
  { topic: 'development', title: 'When do babies sit up? Supporting sitting development', slug: 'when-babies-sit-up-development' },
  { topic: 'development', title: 'Crawling milestones: when and how babies crawl', slug: 'baby-crawling-milestone-when' },
  { topic: 'development', title: 'First words: when babies start talking and what to expect', slug: 'first-words-babies-talking-when' },
  { topic: 'development', title: 'Object permanence: why babies cry when you leave', slug: 'object-permanence-babies-explained' },
  { topic: 'development', title: 'Stranger danger: why babies fear unfamiliar people', slug: 'stranger-anxiety-babies-normal' },
  { topic: 'development', title: 'Separation anxiety: what to expect and how to handle it', slug: 'separation-anxiety-babies-toddlers' },
  { topic: 'development', title: 'Baby vision: what can newborns see?', slug: 'baby-vision-development-newborn' },
  { topic: 'development', title: 'Baby hearing: when do babies hear and respond to sounds?', slug: 'baby-hearing-development-timeline' },
  { topic: 'development', title: 'Fine motor skills: from grasping to pincer grip', slug: 'fine-motor-skills-babies-development' },
  { topic: 'development', title: 'Gross motor skills: reaching developmental milestones', slug: 'gross-motor-skills-development' },
  { topic: 'development', title: 'When do babies babble? Language development starts here', slug: 'baby-babbling-language-development' },
  { topic: 'development', title: 'Bilingual babies: raising children with two languages', slug: 'bilingual-babies-two-languages' },
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
          reject(new Error(`Invalid JSON response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(requestData);
    req.end();
  });
}

async function generateArticle(topicData) {
  const { topic, title, slug } = topicData;

  const prompt = `You are a professional parenting blogger. Write a comprehensive article titled "${title}".

Requirements:
- 600-800 words
- Use clear markdown formatting with H2 and H3 headings
- Cite NHS, WHO, or AAP guidance where relevant
- Use practical, parent-friendly language
- Answer common questions
- Include actionable tips
- Add a FAQ section with 2-3 Q&A pairs
- Start with an engaging intro

Write only the article body (no frontmatter). Use proper markdown syntax.`;

  try {
    const content = await ollamaRequest(prompt);
    return content;
  } catch (error) {
    console.error(`❌ Failed: ${slug}: ${error.message}`);
    return null;
  }
}

function createMDXFile(topicData, content) {
  const { topic, title, slug } = topicData;
  const now = new Date();
  const publishedAt = now.toISOString().split('T')[0];

  const frontmatter = `---
title: "${title}"
description: "Practical parenting guidance on ${title.toLowerCase()}"
publishedAt: "${publishedAt}"
updatedAt: "${publishedAt}"
author: "PregnancySprout Editorial Team"
category: "${topic}"
tags: ["${topic}", "parenting", "baby-care"]
readingTime: 7
---

`;

  return frontmatter + content;
}

async function main() {
  console.log(`🚀 Generating ${ARTICLE_TOPICS.length} articles using Ollama (${MODEL})...`);
  console.log(`⚠️  Make sure Ollama is running: ollama run ${MODEL}\n`);

  const contentBasePath = path.join(__dirname, '../content/parenting');
  let successCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < ARTICLE_TOPICS.length; i++) {
    const topicData = ARTICLE_TOPICS[i];
    const { topic, slug } = topicData;

    const topicDir = path.join(contentBasePath, topic);
    if (!fs.existsSync(topicDir)) {
      fs.mkdirSync(topicDir, { recursive: true });
    }

    const filePath = path.join(topicDir, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      console.log(`⏭️  [${i + 1}/${ARTICLE_TOPICS.length}] ${slug} (already exists)`);
      skippedCount++;
      continue;
    }

    process.stdout.write(`⏳ [${i + 1}/${ARTICLE_TOPICS.length}] ${slug.substring(0, 40)}...`);
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
  console.log(`   Generated: ${successCount} new articles`);
  console.log(`   Skipped: ${skippedCount} (already exist)`);
  console.log(`   Total: ${successCount + skippedCount}/${ARTICLE_TOPICS.length}`);
  console.log(`\n📁 Articles saved to: content/parenting/`);
}

main().catch(console.error);
