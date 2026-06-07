/**
 * Generate Remaining 4 Articles (54-57)
 * Resume from where generation stopped
 *
 * Setup: ollama run mistral (keep running)
 * Run: node scripts/generate-remaining-articles.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'mistral';

// Remaining articles (54-57 out of 57 total)
const ARTICLE_TOPICS = [
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
  console.log(`🚀 Generating ${ARTICLE_TOPICS.length} remaining articles for PregnancySprout`);
  console.log(`📊 Topics: FAQ (4) - Articles [54-57]\n`);
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

    process.stdout.write(`⏳ [${54 + i}/${57}] ${slug.substring(0, 45)}...`);
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
  console.log(`\n✅ You now have all 57 strategic articles!`);
  console.log(`\n💡 After generation, run: npm run build && npm run dev`);
}

main().catch(console.error);
