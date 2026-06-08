/**
 * CONTENT ENHANCEMENT SCRIPT
 * Fixes two quality issues:
 * 1. ⚠️ Some topics could use more research
 * 2. ⚠️ Some common parenting topics covered elsewhere
 *
 * What it does:
 * 1. Identifies articles that need research enhancement
 * 2. Creates enhancement prompts for Ollama
 * 3. Suggests unique angles for common topics
 * 4. Adds deeper citations and expert references
 * 5. Differentiates content from competitors
 *
 * Run: node scripts/enhance-content-quality.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const http = require('http');

const BLOG_DIR = path.join(__dirname, '../content/blog');
const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'mistral';

// Articles that need research enhancement (low medical citations)
const RESEARCH_ENHANCEMENTS = {
  'parenting-styles-comparison-effects': {
    title: 'Parenting Styles: Authoritative, Permissive, and Authoritarian',
    topic: 'psychology',
    enhancements: [
      'Add citations from Diana Baumrind\'s parenting research',
      'Include recent meta-analysis on parenting effectiveness',
      'Add cultural context (different styles across cultures)',
      'Include practical examples for each style'
    ]
  },
  'emotional-intelligence-children-building': {
    title: 'Building Emotional Intelligence in Children from the Start',
    topic: 'psychology',
    enhancements: [
      'Reference Daniel Goleman\'s emotional intelligence framework',
      'Include brain development science (amygdala, prefrontal cortex)',
      'Add age-based strategies (newborn to toddler)',
      'Include research on long-term benefits'
    ]
  },
  'positive-parenting-techniques-confidence': {
    title: 'Positive Parenting Techniques: Building Confidence',
    topic: 'psychology',
    enhancements: [
      'Add evidence-based techniques (backed by research)',
      'Include self-esteem vs confidence distinction',
      'Add failure/setback handling strategies',
      'Include neurological basis for positive reinforcement'
    ]
  }
};

// Topics that are common across many sites - need unique angle
const UNIQUE_ANGLE_ENHANCEMENTS = {
  'toddler-tantrums-why-how-respond': {
    title: 'Toddler Tantrums: Why They Happen and How to Respond',
    uniqueAngles: [
      'Brain science perspective (amygdala vs prefrontal cortex)',
      'Cultural differences in tantrums',
      'Differentiate from autism/sensory processing',
      'Prevention strategies (not just response strategies)',
      'Parent emotional regulation (not just child behavior)'
    ]
  },
  'when-babies-sleep-through-night': {
    title: 'When Do Babies Sleep Through the Night?',
    uniqueAngles: [
      'Neurological development markers for sleep capability',
      'Individual variation (genetics + temperament)',
      'Sleep science vs cultural expectations',
      'International perspectives on co-sleeping',
      'Parental sleep deprivation context'
    ]
  },
  'baby-rolling-over-timeline': {
    title: 'Baby Rolling Over: When and How It Happens',
    uniqueAngles: [
      'Tummy time importance + alternatives',
      'Individual variation (not a strict milestone)',
      'Risk factors for delay',
      'When to worry vs normal variation',
      'Safety considerations during rolling'
    ]
  }
};

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
      timeout: 120000, // 2 minutes timeout for Ollama
    };

    const req = http.request(options, (res) => {
      let data = '';

      // Set a timeout for reading response
      const responseTimeout = setTimeout(() => {
        reject(new Error('Response timeout from Ollama'));
      }, 120000);

      res.on('data', (chunk) => {
        clearTimeout(responseTimeout);
        data += chunk;
      });

      res.on('end', () => {
        clearTimeout(responseTimeout);
        try {
          const response = JSON.parse(data);
          resolve(response.response || '');
        } catch (e) {
          reject(new Error(`Invalid JSON response from Ollama`));
        }
      });
    });

    req.on('error', (err) => {
      if (err.message.includes('ECONNREFUSED')) {
        reject(new Error('Ollama is not running. Start Ollama with: ollama serve'));
      } else {
        reject(err);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout to Ollama API'));
    });

    req.write(requestData);
    req.end();
  });
}

async function enhanceResearchDepth(slug, enhancements) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Create enhancement prompt
    const enhancementPrompt = `The following article needs research enhancement:

Title: ${data.title}
Current content length: ${content.length} characters

Enhancement areas needed:
${enhancements.map((e, i) => `${i + 1}. ${e}`).join('\n')}

Please provide ONLY the additional content sections (as markdown) that would enhance this article.
Keep it 300-400 words, focused on research/citations/evidence.
Format with H3 headings for each enhancement section.`;

    console.log(`   📚 Requesting research enhancement...`);
    const enhancement = await ollamaRequest(enhancementPrompt);

    if (enhancement && enhancement.length > 100) {
      // Add enhancement section before "Related Articles"
      let newContent = content;
      if (content.includes('## Related Articles')) {
        newContent = content.replace(
          '## Related Articles',
          `## Research & Evidence\n\n${enhancement}\n\n## Related Articles`
        );
      } else {
        newContent = content + `\n\n## Research & Evidence\n\n${enhancement}`;
      }

      const newFileContent = matter.stringify(newContent, data);
      fs.writeFileSync(filePath, newFileContent);
      return { success: true, charsAdded: enhancement.length };
    }

    return { success: false, reason: 'Empty response' };
  } catch (error) {
    return { success: false, reason: error.message };
  }
}

async function addUniqueAngle(slug, angles) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Create unique angle prompt
    const anglePrompt = `The article "${data.title}" is a common parenting topic.
Please enhance it with unique angles that differentiate it from competitors:

Unique angles to add:
${angles.map((a, i) => `${i + 1}. ${a}`).join('\n')}

Add 2-3 of these angles to the article. Keep it 300-400 words total.
Use H3 headings for each angle.
Format as markdown.`;

    console.log(`   🎯 Requesting unique angle content...`);
    const angleContent = await ollamaRequest(anglePrompt);

    if (angleContent && angleContent.length > 100) {
      // Add unique angles section
      let newContent = content;
      if (content.includes('## FAQ')) {
        newContent = content.replace(
          '## FAQ',
          `## What Makes This Different\n\n${angleContent}\n\n## FAQ`
        );
      } else {
        newContent = content + `\n\n## What Makes This Different\n\n${angleContent}`;
      }

      const newFileContent = matter.stringify(newContent, data);
      fs.writeFileSync(filePath, newFileContent);
      return { success: true, charsAdded: angleContent.length };
    }

    return { success: false, reason: 'Empty response' };
  } catch (error) {
    return { success: false, reason: error.message };
  }
}

async function main() {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📚 CONTENT ENHANCEMENT SCRIPT`);
  console.log(`${'='.repeat(70)}\n`);
  console.log(`🎯 Enhancement goals:`);
  console.log(`   ✓ Deepen research citations in 3+ articles`);
  console.log(`   ✓ Add unique angles to common topics`);
  console.log(`   ✓ Differentiate from competitors`);
  console.log(`   ✓ Improve authority & credibility\n`);

  let researchEnhanced = 0;
  let angleEnhanced = 0;
  let totalCharsAdded = 0;

  // Enhance research depth
  console.log(`📚 RESEARCH ENHANCEMENT PHASE:\n`);
  for (const [slug, details] of Object.entries(RESEARCH_ENHANCEMENTS)) {
    process.stdout.write(`⏳ ${slug.substring(0, 40)}...`);
    const result = await enhanceResearchDepth(slug, details.enhancements);

    if (result.success) {
      console.log(` ✅ (+${result.charsAdded} chars)`);
      researchEnhanced++;
      totalCharsAdded += result.charsAdded || 0;
    } else {
      console.log(` ❌ (${result.reason})`);
    }
  }

  // Add unique angles
  console.log(`\n🎯 UNIQUE ANGLE ENHANCEMENT PHASE:\n`);
  for (const [slug, details] of Object.entries(UNIQUE_ANGLE_ENHANCEMENTS)) {
    process.stdout.write(`⏳ ${slug.substring(0, 40)}...`);
    const result = await addUniqueAngle(slug, details.uniqueAngles);

    if (result.success) {
      console.log(` ✅ (+${result.charsAdded} chars)`);
      angleEnhanced++;
      totalCharsAdded += result.charsAdded || 0;
    } else {
      console.log(` ❌ (${result.reason})`);
    }
  }

  console.log(`\n${'='.repeat(70)}\n`);
  console.log(`✅ ENHANCEMENT COMPLETE:\n`);
  console.log(`   Research enhanced: ${researchEnhanced}/${Object.keys(RESEARCH_ENHANCEMENTS).length}`);
  console.log(`   Unique angles added: ${angleEnhanced}/${Object.keys(UNIQUE_ANGLE_ENHANCEMENTS).length}`);
  console.log(`   Total chars added: ${totalCharsAdded}`);

  console.log(`\n📈 IMPROVEMENTS:\n`);
  console.log(`   ✓ Higher authority citations`);
  console.log(`   ✓ Unique differentiation vs competitors`);
  console.log(`   ✓ Deeper research coverage`);
  console.log(`   ✓ Better expertise signals for Google`);

  console.log(`\n💡 Next steps:`);
  console.log(`   1. npm run build && npm run dev`);
  console.log(`   2. Review enhanced articles in browser`);
  console.log(`   3. Monitor rankings for enhanced articles`);
  console.log(`   4. Consider applying to more articles\n`);

  console.log(`${'='.repeat(70)}\n`);
}

main().catch(console.error);
