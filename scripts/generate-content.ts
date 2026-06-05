/**
 * PregnancySprout Content Pipeline
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Generates SEO-optimised MDX articles using Claude AI.
 *
 * Usage:
 *   npm run generate "Article Topic"
 *   npm run generate "Ferber Sleep Method" parenting sleep
 *   npm run generate "Best Baby Monitors 2026" products monitors
 *
 * Requires ANTHROPIC_API_KEY in .env.local
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env.local manually first â€” bypass tsx dotenvx quirks
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

// Also run dotenv as fallback
dotenv.config({ path: envPath });

// Lazy client â€” created only when first request is made
function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not found in .env.local');
  return new Anthropic({ apiKey });
}

type Section = 'blog' | 'parenting' | 'products';

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function getOutputDir(section: Section, category?: string): string {
  const base = path.join(process.cwd(), 'content');
  if (section === 'parenting' && category) return path.join(base, 'parenting', category);
  if (section === 'products' && category) return path.join(base, 'products', category);
  return path.join(base, 'blog');
}

function buildPrompt(topic: string, section: Section, category?: string, date: string = ''): string {
  const tags = section === 'parenting'
    ? `["${category || 'parenting'}", "baby", "new-parents"]`
    : section === 'products'
    ? `["baby-products", "reviews", "${category || 'gear'}"]`
    : '["pregnancy", "baby", "parenting"]';

  const imgPath = section === 'products' && category
    ? `/images/products/${toSlug(topic)}.jpg`
    : `/images/${section}/${toSlug(topic)}.jpg`;

  return `You are a senior editor at PregnancySprout, a trusted pregnancy and baby website.

Write a comprehensive, SEO-optimised MDX article for the following topic:

TOPIC: "${topic}"
SECTION: ${section}${category ? ` / ${category}` : ''}
DATE: ${date}

â•â•â• REQUIREMENTS â•â•â•

1. START with YAML frontmatter between --- delimiters:

---
title: "[SEO-optimised title including main keyword]"
description: "[150â€“160 char meta description with keyword]"
publishedAt: "${date}"
updatedAt: "${date}"
author: "PregnancySprout Editorial Team"
category: "${section}"
tags: ${tags}
image: "${imgPath}"
imageAlt: "[descriptive alt text]"
faqs:
  - q: "[Common question about the topic]"
    a: "[Comprehensive answer, 2-3 sentences]"
  - q: "[Another common question]"
    a: "[Comprehensive answer, 2-3 sentences]"
  - q: "[Third common question]"
    a: "[Comprehensive answer, 2-3 sentences]"
---

2. ARTICLE BODY after frontmatter:
   - 1,500â€“2,000 words minimum
   - Engaging opening paragraph (no heading needed)
   - 5â€“7 ## H2 sections covering the topic thoroughly
   - Use ### H3 sub-sections where helpful
   - Practical, actionable advice throughout
   - Warm, supportive, expert tone â€” like advice from a trusted friend
   - Always recommend consulting a doctor/midwife for medical concerns
   - Include 2â€“3 natural internal links:
     * [Due Date Calculator](/tools/due-date-calculator)
     * [Symptom Checker](/tools/symptom-checker)
     * [Registry Checklist](/tools/registry-checklist)
     * [Week by Week Guide](/pregnancy/week-by-week)
   - End with a warm, encouraging conclusion

3. OUTPUT only the raw MDX â€” no extra commentary, no code fences around it.`;
}

async function generateArticle(
  topic: string,
  section: Section = 'blog',
  category?: string
): Promise<void> {
  const slug = toSlug(topic);
  const date = new Date().toISOString().split('T')[0];
  const outputDir = getOutputDir(section, category);
  const outputPath = path.join(outputDir, `${slug}.mdx`);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`â­ï¸  Already exists: ${outputPath}`);
    return;
  }

  console.log(`\nðŸ¤– Generating: "${topic}" â†’ ${section}${category ? `/${category}` : ''}...`);

  const message = await getClient().messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 4096,
    messages: [{ role: 'user', content: buildPrompt(topic, section, category, date) }],
  });

  const content = message.content[0].type === 'text' ? message.content[0].text : '';

  if (!content.startsWith('---')) {
    console.warn('âš ï¸  Response did not start with frontmatter â€” saving anyway');
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`âœ… Saved: ${outputPath}`);
}

// â”€â”€ Batch mode â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface ArticleSpec {
  topic: string;
  section: Section;
  category?: string;
}

async function runBatch(articles: ArticleSpec[]): Promise<void> {
  console.log(`\nðŸš€ Starting batch generation of ${articles.length} articles...\n`);
  let success = 0;
  let failed = 0;

  for (const { topic, section, category } of articles) {
    try {
      await generateArticle(topic, section, category);
      success++;
    } catch (err) {
      console.error(`âŒ Failed: "${topic}" â€”`, (err as Error).message);
      failed++;
    }
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\nâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•`);
  console.log(`âœ… Generated: ${success} articles`);
  if (failed > 0) console.log(`âŒ Failed:    ${failed} articles`);
  console.log(`â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•\n`);
}

// â”€â”€ CLI entry point â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const args = process.argv.slice(2);

if (args[0] === '--batch') {
  const batch: ArticleSpec[] = [
    { topic: 'Second Trimester Complete Guide: Weeks 14 to 27', section: 'blog' },
    { topic: 'Third Trimester Complete Guide: Weeks 28 to 40', section: 'blog' },
    { topic: 'Pregnancy Weight Gain Guide: How Much Is Normal', section: 'blog' },
    { topic: 'Pregnancy Stretch Marks: Prevention and Treatment', section: 'blog' },
    { topic: 'Pregnancy Swollen Feet and Ankles: Causes and Remedies', section: 'blog' },
    { topic: 'Pregnancy Back Pain: Causes Relief and When to See a Doctor', section: 'blog' },
    { topic: 'Heartburn During Pregnancy: Why It Happens and How to Get Relief', section: 'blog' },
    { topic: 'Round Ligament Pain in Pregnancy: What It Is and How to Cope', section: 'blog' },
    { topic: 'Pregnancy Insomnia: How to Sleep Better When Pregnant', section: 'blog' },
    { topic: 'Pregnancy Cravings: What They Mean and How to Handle Them', section: 'blog' },
    { topic: 'Sex During Pregnancy: What Is Safe and What Changes', section: 'blog' },
    { topic: 'Travelling While Pregnant: Safety Tips by Trimester', section: 'blog' },
    { topic: 'Working During Pregnancy: Rights Tips and When to Stop', section: 'blog' },
    { topic: 'Prenatal Vitamins: What to Take When to Start and Why', section: 'blog' },
    { topic: 'Pregnancy Yoga: Benefits Poses to Avoid and Getting Started', section: 'blog' },
    { topic: 'Pelvic Floor Exercises During Pregnancy: Complete Guide', section: 'blog' },
    { topic: 'Gestational Diabetes: Symptoms Diet and Management Guide', section: 'blog' },
    { topic: 'Preeclampsia: Signs Risks and What to Do', section: 'blog' },
    { topic: 'Placenta Previa: What It Means for Your Birth Plan', section: 'blog' },
    { topic: 'Group B Strep in Pregnancy: Testing Treatment and Birth Plan', section: 'blog' },
    { topic: 'Iron Deficiency Anaemia in Pregnancy: Signs and Treatment', section: 'blog' },
    { topic: 'Hyperemesis Gravidarum: When Morning Sickness Is Severe', section: 'blog' },
    { topic: 'Breech Baby: Causes Turning Techniques and Birth Options', section: 'blog' },
    { topic: 'Pregnancy After Miscarriage: What to Expect and How to Cope', section: 'blog' },
    { topic: 'Pregnancy After 35: Risks Benefits and What to Expect', section: 'blog' },
    { topic: 'Twin Pregnancy: Week by Week Guide and What to Expect', section: 'blog' },
    { topic: 'VBAC: Vaginal Birth After Caesarean Complete Guide', section: 'blog' },
    { topic: 'Premature Labour: Signs Causes and What Happens', section: 'blog' },
    { topic: 'How to Write a Birth Plan: Templates and Tips', section: 'blog' },
    { topic: 'Braxton Hicks vs Real Contractions: How to Tell the Difference', section: 'blog' },
    { topic: 'The Stages of Labour: Early Active Transition and Pushing', section: 'blog' },
    { topic: 'Pain Relief Options During Labour: Complete Honest Guide', section: 'blog' },
    { topic: 'Epidural vs Natural Birth: Pros Cons and Honest Comparison', section: 'blog' },
    { topic: 'Water Birth: Benefits Risks and What to Expect', section: 'blog' },
    { topic: 'C-Section Birth: What to Expect Before During and After', section: 'blog' },
    { topic: 'Induction of Labour: Why It Happens and What to Expect', section: 'blog' },
    { topic: 'Active Labour Positions That Help Baby Descend', section: 'blog' },
    { topic: 'Hypnobirthing: Does It Work and How to Get Started', section: 'blog' },
    { topic: 'Doula vs Midwife: What Is the Difference and Do You Need One', section: 'blog' },
    { topic: 'Hospital vs Birthing Centre vs Home Birth: Pros and Cons', section: 'blog' },
    { topic: 'Perineal Tears and Episiotomy: What to Expect and Recovery', section: 'blog' },
    { topic: 'C-Section Recovery: Week by Week Timeline and What Helps', section: 'blog' },
    { topic: 'Postpartum Depression Signs Treatment and Where to Get Help', section: 'blog' },
    { topic: 'Postpartum Anxiety: Signs Symptoms and How to Get Help', section: 'blog' },
    { topic: 'Postpartum Hair Loss: Why It Happens and When It Stops', section: 'blog' },
    { topic: 'Diastasis Recti: What It Is and How to Heal It After Birth', section: 'blog' },
    { topic: 'Returning to Exercise After Birth: Safe Timeline and Tips', section: 'blog' },
    { topic: 'Postpartum Sex: When It Is Safe and What Changes', section: 'blog' },
    { topic: 'Contraception After Birth: All Your Options Explained', section: 'blog' },
    { topic: 'How to Increase Breast Milk Supply: 10 Proven Methods', section: 'blog' },
    { topic: 'Breastfeeding Diet: Foods That Help and Foods to Avoid', section: 'blog' },
    { topic: 'Mastitis: Symptoms Treatment and How to Prevent It', section: 'blog' },
    { topic: 'Pumping and Storing Breast Milk: Complete Practical Guide', section: 'blog' },
    { topic: 'Pumping at Work: Rights Setup and Keeping Supply Up', section: 'blog' },
    { topic: 'How to Wean From Breastfeeding: A Gentle Step by Step Guide', section: 'blog' },
    { topic: 'Introducing a Bottle to a Breastfed Baby Without Nipple Confusion', section: 'blog' },
    { topic: 'When to Start Solid Foods: Signs of Readiness and How to Begin', section: 'blog' },
    { topic: 'Baby Led Weaning vs Purees: Which Is Better for Your Baby', section: 'blog' },
    { topic: 'First Foods for Baby at 6 Months: Best Options to Start With', section: 'blog' },
    { topic: 'Baby Food Allergy Introduction: New Guidelines Explained', section: 'blog' },
    { topic: 'Homemade Baby Food: Easy Recipes by Stage and Age', section: 'blog' },
    { topic: 'Baby Constipation: Causes Signs Remedies and When to See a Doctor', section: 'blog' },
    { topic: 'Choking Hazards for Babies: Complete Food Safety Guide', section: 'blog' },
    { topic: 'When Can Babies Have Water Juice and Cows Milk', section: 'blog' },
    { topic: 'Baby Reflux: Signs Causes and How to Help Your Baby', section: 'blog' },
    { topic: 'Newborn Jaundice: Causes Levels Treatment and When to Worry', section: 'blog' },
    { topic: 'Baby Fever: When to Worry When to Wait and How to Treat It', section: 'blog' },
    { topic: 'Baby Vaccinations Schedule: Complete UK and US Guide 2026', section: 'blog' },
    { topic: 'Nappy Rash: Causes Treatment and Prevention Guide', section: 'blog' },
    { topic: 'Baby Eczema: Causes Treatment and Daily Skincare Routine', section: 'blog' },
    { topic: 'Cradle Cap: What It Is How to Treat It and When It Clears', section: 'blog' },
    { topic: 'Tongue Tie in Babies: Signs Diagnosis and Treatment Options', section: 'blog' },
    { topic: 'Flat Head Syndrome in Babies: Prevention and Treatment', section: 'blog' },
    { topic: 'Baby Teething: Timeline Signs Symptoms and Soothing Tips', section: 'blog' },
    { topic: 'RSV in Babies: Symptoms Treatment and When to Go to Hospital', section: 'blog' },
    { topic: 'Baby Growth Spurts: Ages Signs and How to Handle Them', section: 'blog' },
    { topic: 'When Do Babies Start Talking: Milestones and When to Worry', section: 'blog' },
    { topic: 'When Do Babies Start Walking: Milestones and How to Help', section: 'blog' },
    { topic: 'Baby Sign Language: How to Start and Best Signs to Teach', section: 'blog' },
    { topic: 'Separation Anxiety in Babies: What Is Normal and How to Help', section: 'blog' },
    { topic: 'Best Toys for Baby Development by Age 0 to 12 Months', section: 'blog' },
    { topic: 'Toddler Tantrums: Why They Happen and How to Handle Them Calmly', section: 'blog' },
    { topic: 'Potty Training: Complete Step by Step Guide for Parents', section: 'blog' },
    { topic: 'Toddler Sleep Problems: Common Issues and Proven Solutions', section: 'blog' },
    { topic: 'Transitioning From Cot to Bed: When and How to Do It', section: 'blog' },
    { topic: 'Toddler Nutrition: What to Feed Your 1 to 3 Year Old', section: 'blog' },
    { topic: 'Screen Time for Toddlers: What the Research Says', section: 'blog' },
    { topic: 'How to Swaddle a Baby: Step by Step Complete Guide', section: 'blog' },
    { topic: 'Baby Massage: Benefits Techniques and How to Start', section: 'blog' },
    { topic: 'Co-Sleeping Safely: Facts Benefits Risks and Safe Setup', section: 'blog' },
    { topic: 'Dummy Pacifier Pros Cons and When to Introduce One', section: 'blog' },
    { topic: 'Baby Swimming Lessons: When to Start and What to Expect', section: 'blog' },
    { topic: 'Flying with a Baby: Complete Survival Guide for Parents', section: 'blog' },
    { topic: 'Going Back to Work After Baby: Planning and Practicalities', section: 'blog' },
    { topic: 'Choosing a Nursery or Childcare: Questions to Ask', section: 'blog' },
    { topic: 'Preparing Your Pet for a New Baby: Dogs Cats and More', section: 'blog' },
    { topic: 'Preparing Your Toddler for a New Sibling: Age by Age Guide', section: 'blog' },
    { topic: 'Trying to Conceive: How Long It Takes and When to See a Doctor', section: 'blog' },
    { topic: 'Ovulation Symptoms: Signs You Are in Your Fertile Window', section: 'blog' },
    { topic: 'How to Track Your Cycle to Get Pregnant Faster', section: 'blog' },
    { topic: 'PCOS and Pregnancy: Getting Pregnant with Polycystic Ovaries', section: 'blog' },
    { topic: 'Folic Acid Before Pregnancy: When to Start How Much and Why', section: 'blog' },
    { topic: 'IVF Explained: What to Expect at Every Stage of Treatment', section: 'blog' },
    { topic: 'Early Pregnancy Signs Before a Missed Period', section: 'blog' },
    { topic: 'Top 100 Baby Girl Names 2026 with Meanings and Origins', section: 'blog' },
    { topic: 'Top 100 Baby Boy Names 2026 with Meanings and Origins', section: 'blog' },
    { topic: 'Unique Baby Names That Are Easy to Spell and Remember', section: 'blog' },
    { topic: 'Vintage Baby Names Making a Comeback in 2026', section: 'blog' },
    { topic: 'Nature Inspired Baby Names for Girls and Boys', section: 'blog' },
    { topic: 'Indian Baby Names: Beautiful Options with Meanings', section: 'blog' },
    { topic: 'Irish Baby Names: Traditional and Modern Picks', section: 'blog' },
    { topic: 'Biblical Baby Names: Timeless Options for Boys and Girls', section: 'blog' },
    { topic: 'Short One Syllable Baby Names for Boys and Girls', section: 'blog' },
    { topic: 'Gender Neutral Baby Names: Unisex Options for 2026', section: 'blog' },
    { topic: 'How to Choose a Middle Name for Your Baby', section: 'blog' },
    { topic: 'Sibling Name Sets: Matching Names for Brothers and Sisters', section: 'blog' },
    { topic: 'Umbilical Cord Care: Keeping It Clean Dry and Healthy', section: 'parenting', category: 'newborn' },
    { topic: 'When to Call the Doctor: Newborn Warning Signs Every Parent Should Know', section: 'parenting', category: 'newborn' },
    { topic: 'How to Bathe a Newborn Safely: Step by Step Guide', section: 'parenting', category: 'newborn' },
    { topic: 'Newborn Nappy Changes: How Often What to Expect and Products', section: 'parenting', category: 'newborn' },
    { topic: 'Swaddling Your Newborn: Techniques Benefits and When to Stop', section: 'parenting', category: 'newborn' },
    { topic: 'Bonding With Your Newborn: Activities for the First Weeks', section: 'parenting', category: 'newborn' },
    { topic: 'Newborn Skin Care: What to Use and What to Avoid', section: 'parenting', category: 'newborn' },
    { topic: 'Taking Your Newborn Outside: When Is It Safe', section: 'parenting', category: 'newborn' },
    { topic: 'Newborn Reflexes: What They Are and When They Disappear', section: 'parenting', category: 'newborn' },
    { topic: 'Newborn Weight Loss and Regain: What Is Normal', section: 'parenting', category: 'newborn' },
    { topic: 'Creating the Perfect Baby Bedtime Routine That Actually Works', section: 'parenting', category: 'sleep' },
    { topic: 'No Cry Sleep Solutions: Gentle Methods That Work', section: 'parenting', category: 'sleep' },
    { topic: 'The Chair Method Sleep Training: Step by Step Guide', section: 'parenting', category: 'sleep' },
    { topic: 'How to Transition From 2 Naps to 1: Signs and Steps', section: 'parenting', category: 'sleep' },
    { topic: 'White Noise for Babies: Benefits How to Use and Best Options', section: 'parenting', category: 'sleep' },
    { topic: 'Baby Sleep Associations: What They Are and How to Change Them', section: 'parenting', category: 'sleep' },
    { topic: 'When Do Babies Sleep Through the Night: Realistic Expectations', section: 'parenting', category: 'sleep' },
    { topic: 'Toddler Sleep Challenges: Common Problems and How to Solve Them', section: 'parenting', category: 'sleep' },
    { topic: 'Room Temperature for Baby Sleep: What Is Safest', section: 'parenting', category: 'sleep' },
    { topic: 'Baby Led Weaning Complete Guide with Meal Ideas by Age', section: 'parenting', category: 'feeding' },
    { topic: 'How Much Should My Baby Eat: Complete Age by Age Guide', section: 'parenting', category: 'feeding' },
    { topic: 'Best First Foods for Baby at 6 Months: What to Offer and How', section: 'parenting', category: 'feeding' },
    { topic: 'Introducing Allergens to Your Baby: Peanuts Eggs Dairy Guide', section: 'parenting', category: 'feeding' },
    { topic: 'Homemade Baby Food Recipes: Easy Purees and Finger Foods', section: 'parenting', category: 'feeding' },
    { topic: 'Paced Bottle Feeding: What It Is and Why It Matters', section: 'parenting', category: 'feeding' },
    { topic: 'Breast Milk Storage Guide: How Long It Lasts and Best Practices', section: 'parenting', category: 'feeding' },
    { topic: 'Combination Feeding Breast and Bottle: How to Make It Work', section: 'parenting', category: 'feeding' },
    { topic: 'Toddler Nutrition Guide: What to Feed Your One to Three Year Old', section: 'parenting', category: 'feeding' },
    { topic: 'Common Breastfeeding Problems and How to Fix Every One', section: 'parenting', category: 'feeding' },
    { topic: 'How to Encourage Your Babys Language Development from Birth', section: 'parenting', category: 'development' },
    { topic: 'Sensory Play Ideas for Babies at Every Age 0 to 12 Months', section: 'parenting', category: 'development' },
    { topic: 'The Fourth Trimester: Understanding Your Babys First Three Months', section: 'parenting', category: 'development' },
    { topic: 'Baby Development Red Flags: When to Ask for a Specialist', section: 'parenting', category: 'development' },
    { topic: 'Gross Motor Development in Babies: Rolling Sitting Crawling Walking', section: 'parenting', category: 'development' },
    { topic: 'Fine Motor Skills in Babies: How They Develop and Activities to Help', section: 'parenting', category: 'development' },
    { topic: 'Social and Emotional Development in the First Year of Life', section: 'parenting', category: 'development' },
    { topic: 'Play Ideas for Babies by Age: What to Do at Every Stage', section: 'parenting', category: 'development' },
    { topic: 'Screen Time for Babies and Toddlers: What the Research Says', section: 'parenting', category: 'development' },
    { topic: 'Cognitive Development in Babies: How Young Babies Learn', section: 'parenting', category: 'development' },
    { topic: 'Best Lightweight Strollers for Travel 2026: Top Picks Reviewed', section: 'products', category: 'strollers' },
    { topic: 'Best Double Strollers for Two Kids 2026: Compared and Reviewed', section: 'products', category: 'strollers' },
    { topic: 'Bugaboo Fox 5 Stroller Review 2026', section: 'products', category: 'strollers' },
    { topic: 'Nuna MIXX Next Stroller Review 2026', section: 'products', category: 'strollers' },
    { topic: 'Best Jogging Strollers for Running Parents 2026', section: 'products', category: 'strollers' },
    { topic: 'Best Budget Strollers Under 200 Dollars 2026', section: 'products', category: 'strollers' },
    { topic: 'Best Convertible Car Seats 2026: Complete Review and Comparison', section: 'products', category: 'car-seats' },
    { topic: 'Graco Extend2Fit Convertible Car Seat Review 2026', section: 'products', category: 'car-seats' },
    { topic: 'Britax Boulevard ClickTight Car Seat Review 2026', section: 'products', category: 'car-seats' },
    { topic: 'Best Infant Car Seats 2026: Safest Options for Newborns', section: 'products', category: 'car-seats' },
    { topic: 'Car Seat Safety Guide: Installation Tips and Common Mistakes', section: 'products', category: 'car-seats' },
    { topic: 'IKEA Sundvik Crib Review 2026: Best Budget Safe Crib', section: 'products', category: 'cribs' },
    { topic: 'Snoo Smart Sleeper Bassinet Review 2026: Is It Worth the Price', section: 'products', category: 'cribs' },
    { topic: 'DaVinci Kalani 4-in-1 Convertible Crib Review 2026', section: 'products', category: 'cribs' },
    { topic: 'Best Bassinets for Newborns 2026: Safest and Most Practical', section: 'products', category: 'cribs' },
    { topic: 'Best Mini Cribs for Small Nurseries 2026', section: 'products', category: 'cribs' },
    { topic: 'Moses Basket vs Bassinet vs Crib: Which Is Right for You', section: 'products', category: 'cribs' },
    { topic: 'Infant Optics DXR-8 Pro Baby Monitor Review 2026', section: 'products', category: 'monitors' },
    { topic: 'Eufy SpaceView Baby Monitor Review 2026', section: 'products', category: 'monitors' },
    { topic: 'Owlet Dream Sock Baby Monitor Review 2026', section: 'products', category: 'monitors' },
    { topic: 'Best Budget Baby Monitors Under 100 Dollars 2026', section: 'products', category: 'monitors' },
    { topic: 'Audio vs Video Baby Monitor: Which Type Do You Need', section: 'products', category: 'monitors' },
    { topic: 'Moby Wrap Baby Carrier Review 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'LILLEbaby Complete All Seasons Carrier Review 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'Best Baby Carriers for Newborns 2026: Structured and Wraps', section: 'products', category: 'baby-carriers' },
    { topic: 'Ring Sling Baby Carrier: How to Use It and Best Options 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'Graco Blossom 6-in-1 High Chair Review 2026', section: 'products', category: 'high-chairs' },
    { topic: 'Stokke Tripp Trapp High Chair Review 2026: Is It Worth the Money', section: 'products', category: 'high-chairs' },
    { topic: 'Best Travel and Portable High Chairs 2026', section: 'products', category: 'high-chairs' },
    { topic: 'Best High Chairs for Baby Led Weaning 2026', section: 'products', category: 'high-chairs' },
    { topic: '4moms mamaRoo 4 Baby Swing Review 2026', section: 'products', category: 'swings' },
    { topic: 'Fisher Price Baby Bouncer Review 2026', section: 'products', category: 'bouncers' },
    { topic: 'Best Baby Swings for Colicky Babies 2026', section: 'products', category: 'swings' },
    { topic: 'Spectra S1 Plus Breast Pump Review 2026', section: 'products', category: 'breast-pumps' },
    { topic: 'Medela Pump In Style Advanced Breast Pump Review 2026', section: 'products', category: 'breast-pumps' },
    { topic: 'Elvie Stride Wearable Breast Pump Review 2026', section: 'products', category: 'breast-pumps' },
    { topic: 'Best Breast Pumps 2026: Manual Electric and Wearable Compared', section: 'products', category: 'breast-pumps' },
    { topic: 'LectroFan Classic White Noise Machine Review 2026', section: 'products', category: 'white-noise-machines' },
    { topic: 'Hatch Rest Sound Machine and Night Light Review 2026', section: 'products', category: 'white-noise-machines' },
    { topic: 'Best White Noise Machines for Babies 2026', section: 'products', category: 'white-noise-machines' },
    { topic: 'Best Baby Changing Tables and Changing Mats 2026', section: 'products', category: 'nursery' },
    { topic: 'Best Baby Bath Tubs 2026: Safest and Most Practical', section: 'products', category: 'nursery' },
    { topic: 'Newton Baby Crib Mattress Review 2026: Is It Worth It', section: 'products', category: 'nursery' },
    { topic: 'Best Night Lights for Baby Nursery 2026', section: 'products', category: 'nursery' },
    { topic: 'Best Baby Bottles for Breastfed Babies 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Tommee Tippee Perfect Prep Machine Review 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Best Sterilisers for Baby Bottles 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Best Baby Safety Gates 2026: Top Picks for Stairs', section: 'products', category: 'safety' },
    { topic: 'Best Baby Sleep Sacks and Sleeping Bags 2026', section: 'products', category: 'clothing' },
  ];

  runBatch(batch).catch(console.error);

} else if (args[0] === '--mega') {
  const mega: ArticleSpec[] = [
    // ── PREGNANCY WEEKS 1-40 ─────────────────────────────────────────────────
    ...Array.from({ length: 40 }, (_, i) => ({
      topic: `${i + 1} Weeks Pregnant: Baby Size Development and What to Expect`,
      section: 'blog' as Section,
    })),
    // ── BABY NAMES: Girls A–Z ────────────────────────────────────────────────
    ...['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map(l => ({
      topic: `Baby Girl Names Starting With ${l}: Meanings Origins and Popularity`,
      section: 'blog' as Section,
    })),
    // ── BABY NAMES: Boys A–Z ─────────────────────────────────────────────────
    ...['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map(l => ({
      topic: `Baby Boy Names Starting With ${l}: Meanings Origins and Popularity`,
      section: 'blog' as Section,
    })),
    // ── BABY NAMES: By Origin ────────────────────────────────────────────────
    { topic: 'French Baby Names for Girls and Boys: Elegant and Beautiful Options', section: 'blog' },
    { topic: 'Spanish Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Italian Baby Names: Beautiful and Melodic Options', section: 'blog' },
    { topic: 'Arabic Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Hebrew Baby Names: Traditional and Modern Options', section: 'blog' },
    { topic: 'Japanese Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Korean Baby Names with Meanings and Pronunciations', section: 'blog' },
    { topic: 'Hindu Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Muslim Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'African Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Norse Viking Baby Names for Boys and Girls', section: 'blog' },
    { topic: 'Celtic Baby Names: Irish Scottish and Welsh Options', section: 'blog' },
    { topic: 'Greek Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Latin Baby Names with Meanings: Classic and Timeless', section: 'blog' },
    { topic: 'Hawaiian Baby Names: Beautiful Pacific Island Options', section: 'blog' },
    { topic: 'Portuguese Baby Names for Girls and Boys', section: 'blog' },
    { topic: 'Polish Baby Names with Meanings and Pronunciations', section: 'blog' },
    { topic: 'Russian Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Turkish Baby Names with Meanings', section: 'blog' },
    { topic: 'Persian Baby Names: Beautiful Iranian Options', section: 'blog' },
    { topic: 'Chinese Baby Names for Girls and Boys with Meanings', section: 'blog' },
    { topic: 'Native American Baby Names with Meanings', section: 'blog' },
    { topic: 'Australian Aboriginal Baby Names with Meanings', section: 'blog' },
    { topic: 'Nigerian Baby Names for Girls and Boys', section: 'blog' },
    { topic: 'Swahili Baby Names with Meanings and Origins', section: 'blog' },
    // ── BABY NAMES: By Theme ─────────────────────────────────────────────────
    { topic: 'Baby Names Meaning Love: Beautiful Options for Girls and Boys', section: 'blog' },
    { topic: 'Baby Names Meaning Strength: Powerful Options for Boys and Girls', section: 'blog' },
    { topic: 'Baby Names Meaning Light: Bright and Positive Options', section: 'blog' },
    { topic: 'Baby Names Meaning Hope: Optimistic Choices for Your Baby', section: 'blog' },
    { topic: 'Baby Names Meaning Peace: Calm and Beautiful Options', section: 'blog' },
    { topic: 'Baby Names Meaning Brave: Courageous Names for Boys and Girls', section: 'blog' },
    { topic: 'Baby Names Meaning Joy: Happy and Cheerful Options', section: 'blog' },
    { topic: 'Baby Names Inspired by Stars and Astronomy', section: 'blog' },
    { topic: 'Baby Names Inspired by the Ocean and Sea', section: 'blog' },
    { topic: 'Baby Names Inspired by Flowers and Plants', section: 'blog' },
    { topic: 'Baby Names Inspired by Mountains and Earth', section: 'blog' },
    { topic: 'Mythological Baby Names: Gods Goddesses and Heroes', section: 'blog' },
    { topic: 'Royal Baby Names: Names Fit for a King or Queen', section: 'blog' },
    { topic: 'Literary Baby Names: Names from Classic Books', section: 'blog' },
    { topic: 'Disney Baby Names Inspired by Your Favourite Characters', section: 'blog' },
    { topic: 'Two Syllable Baby Names for Girls and Boys', section: 'blog' },
    { topic: 'Three Syllable Baby Names for Girls and Boys', section: 'blog' },
    { topic: 'Baby Names Ending in A: Beautiful Feminine and Unisex Options', section: 'blog' },
    { topic: 'Old Fashioned Baby Names Due for a Comeback', section: 'blog' },
    { topic: 'Celebrity Inspired Baby Names for 2026', section: 'blog' },
    // ── BABY DEVELOPMENT: Month by Month ─────────────────────────────────────
    ...Array.from({ length: 12 }, (_, i) => ({
      topic: `Baby Development at ${i + 1} Month${i === 0 ? '' : 's'}: Milestones Skills and Activities`,
      section: 'parenting' as Section,
      category: 'development',
    })),
    // ── BABY DEVELOPMENT: Toddler ────────────────────────────────────────────
    { topic: '12 to 15 Months Toddler Development: What to Expect', section: 'parenting', category: 'development' },
    { topic: '15 to 18 Months Toddler Development: Milestones and Activities', section: 'parenting', category: 'development' },
    { topic: '18 to 24 Months Toddler Development: Language Motor and Social Skills', section: 'parenting', category: 'development' },
    { topic: '2 Year Old Development: Milestones Skills and Activities', section: 'parenting', category: 'development' },
    { topic: '2.5 Year Old Development: What to Expect at 30 Months', section: 'parenting', category: 'development' },
    { topic: '3 Year Old Development: Milestones Activities and What Is Normal', section: 'parenting', category: 'development' },
    { topic: '4 Year Old Development: What to Expect Before School', section: 'parenting', category: 'development' },
    { topic: '5 Year Old Development: School Readiness and Skills', section: 'parenting', category: 'development' },
    // ── PREGNANCY HEALTH ─────────────────────────────────────────────────────
    { topic: 'High Blood Pressure in Pregnancy: Causes Management and Risks', section: 'blog' },
    { topic: 'Thyroid Disorders in Pregnancy: What You Need to Know', section: 'blog' },
    { topic: 'Pregnancy and Asthma: Managing Your Condition Safely', section: 'blog' },
    { topic: 'Pregnancy and Diabetes Type 1 and 2: Managing Your Care', section: 'blog' },
    { topic: 'Pregnancy and Depression: Antenatal Depression Signs and Help', section: 'blog' },
    { topic: 'Pregnancy and Anxiety: Managing Mental Health While Pregnant', section: 'blog' },
    { topic: 'Urinary Tract Infections in Pregnancy: Causes and Treatment', section: 'blog' },
    { topic: 'Yeast Infections During Pregnancy: Safe Treatment Options', section: 'blog' },
    { topic: 'Pregnancy and Back Pain: Causes Prevention and Treatment', section: 'blog' },
    { topic: 'Sciatica During Pregnancy: Relief Tips and Exercises', section: 'blog' },
    { topic: 'Carpal Tunnel Syndrome in Pregnancy: Symptoms and Relief', section: 'blog' },
    { topic: 'Varicose Veins During Pregnancy: Prevention and Treatment', section: 'blog' },
    { topic: 'Hemorrhoids During Pregnancy: Causes and Relief', section: 'blog' },
    { topic: 'Pregnancy and Food Poisoning: What to Do and When to Seek Help', section: 'blog' },
    { topic: 'Safe Medications During Pregnancy: What You Can and Cannot Take', section: 'blog' },
    { topic: 'Pregnancy and COVID-19: What Pregnant Women Need to Know', section: 'blog' },
    { topic: 'Flu During Pregnancy: Treatment Prevention and Risks', section: 'blog' },
    { topic: 'Dental Care During Pregnancy: What Is Safe and What to Avoid', section: 'blog' },
    { topic: 'Hair Dye and Beauty Treatments During Pregnancy: What Is Safe', section: 'blog' },
    { topic: 'Pregnancy and Exercise: Benefits Safety and What to Avoid', section: 'blog' },
    // ── BIRTH PREPARATION ────────────────────────────────────────────────────
    { topic: 'Antenatal Classes: What to Expect and Are They Worth It', section: 'blog' },
    { topic: 'How to Choose a Midwife or OB-GYN: Questions to Ask', section: 'blog' },
    { topic: 'Preparing Your Home for a New Baby: Room by Room Checklist', section: 'blog' },
    { topic: 'Cord Blood Banking: What It Is Should You Do It and How Much It Costs', section: 'blog' },
    { topic: 'Newborn Screening Tests: What They Are and Why They Matter', section: 'blog' },
    { topic: 'Delayed Cord Clamping: Benefits Evidence and How to Request It', section: 'blog' },
    { topic: 'Vitamin K Injection for Newborns: What It Is and Why It Is Given', section: 'blog' },
    { topic: 'Golden Hour After Birth: What It Is and Why It Matters', section: 'blog' },
    { topic: 'What Happens in the First 24 Hours After Birth', section: 'blog' },
    { topic: 'Skin to Skin After C-Section: Is It Possible and How to Request It', section: 'blog' },
    // ── POSTPARTUM DETAILED ───────────────────────────────────────────────────
    { topic: 'Six Week Postnatal Check: What to Expect and Questions to Ask', section: 'blog' },
    { topic: 'Lochia After Birth: How Long It Lasts and What Is Normal', section: 'blog' },
    { topic: 'Perineal Recovery After Birth: Timeline and What Helps', section: 'blog' },
    { topic: 'After Pains Following Birth: What They Are and How to Cope', section: 'blog' },
    { topic: 'Night Sweats After Birth: Why They Happen and When They Stop', section: 'blog' },
    { topic: 'Postpartum Thyroiditis: Symptoms and What to Do', section: 'blog' },
    { topic: 'Postnatal Pelvic Floor Physiotherapy: When to Go and What to Expect', section: 'blog' },
    { topic: 'Returning to Running After Birth: Safe Timeline and Guide', section: 'blog' },
    { topic: 'Postpartum Nutrition: What to Eat to Recover and Heal', section: 'blog' },
    { topic: 'Postpartum Body Image: Coping With Changes After Birth', section: 'blog' },
    { topic: 'Birth Trauma: Recognising It and How to Get Help', section: 'blog' },
    { topic: 'Postnatal Rage: What It Is and Why It Happens', section: 'blog' },
    { topic: 'Dad and Partner Mental Health After Baby: What to Watch For', section: 'blog' },
    { topic: 'Asking for Help After Having a Baby: Why It Matters and How to Do It', section: 'blog' },
    // ── FEEDING SPECIFIC ─────────────────────────────────────────────────────
    { topic: 'Cluster Feeding: What It Is Why It Happens and How to Survive It', section: 'blog' },
    { topic: 'Nursing Strike: Why Babies Suddenly Refuse the Breast', section: 'blog' },
    { topic: 'Low Milk Supply: Real Causes and Evidence-Based Solutions', section: 'blog' },
    { topic: 'Oversupply of Breast Milk: Signs and How to Regulate It', section: 'blog' },
    { topic: 'Blocked Milk Ducts: Symptoms Treatment and Prevention', section: 'blog' },
    { topic: 'Thrush on Nipples: Symptoms Treatment for Mum and Baby', section: 'blog' },
    { topic: 'Breastfeeding with Inverted Nipples: Tips and Solutions', section: 'blog' },
    { topic: 'Night Weaning: How to Stop Night Feeds Gently', section: 'blog' },
    { topic: 'Baby Formula Comparisons: How to Read the Label', section: 'blog' },
    { topic: 'Cows Milk Protein Allergy in Babies: Signs Diagnosis and Dairy-Free Options', section: 'blog' },
    { topic: 'Starting Solids at 4 Months: Is Early Weaning Safe', section: 'blog' },
    { topic: 'Baby Gagging vs Choking: What Is the Difference and What to Do', section: 'blog' },
    { topic: 'Baby Food Pouches: Are They Actually Nutritious', section: 'blog' },
    { topic: 'Introducing Meat to Baby: When How and Best First Options', section: 'blog' },
    { topic: 'Vegetarian Baby Diet: Complete Nutrition Guide for Plant-Based Weaning', section: 'blog' },
    // ── BABY SLEEP ADVANCED ───────────────────────────────────────────────────
    { topic: 'Newborn Sleep: Everything You Need to Survive the First 12 Weeks', section: 'parenting', category: 'sleep' },
    { topic: 'Why Does My Baby Only Sleep on Me: Causes and Gentle Solutions', section: 'parenting', category: 'sleep' },
    { topic: 'Baby Wake Windows by Age: Complete Chart from Newborn to 18 Months', section: 'parenting', category: 'sleep' },
    { topic: 'Early Morning Waking: Why Babies Wake at 5am and How to Fix It', section: 'parenting', category: 'sleep' },
    { topic: 'Baby Fighting Sleep: Why It Happens and How to Handle It', section: 'parenting', category: 'sleep' },
    { topic: 'Short Naps: Why Babies Only Sleep 30 Minutes and How to Extend Them', section: 'parenting', category: 'sleep' },
    { topic: 'Contact Napping: Is It a Problem and How to Transition Away', section: 'parenting', category: 'sleep' },
    { topic: 'Sleep Training While Breastfeeding: How to Do It Without Affecting Supply', section: 'parenting', category: 'sleep' },
    { topic: 'Twins Sleep Training: How to Get Two Babies Sleeping at the Same Time', section: 'parenting', category: 'sleep' },
    { topic: 'Travelling and Baby Sleep: How to Cope With Disruptions', section: 'parenting', category: 'sleep' },
    { topic: 'Daylight Saving Time and Baby Sleep: How to Manage the Clock Change', section: 'parenting', category: 'sleep' },
    // ── BABY HEALTH ADVANCED ──────────────────────────────────────────────────
    { topic: 'Meningitis in Babies: Symptoms and When to Call 999', section: 'blog' },
    { topic: 'Baby Cold and Flu: Treatment Remedies and When to See a Doctor', section: 'blog' },
    { topic: 'Croup in Babies and Toddlers: Symptoms Treatment and When to Seek Help', section: 'blog' },
    { topic: 'Bronchiolitis in Babies: Symptoms Treatment and Recovery', section: 'blog' },
    { topic: 'Ear Infection in Babies: Signs Causes and Treatment', section: 'blog' },
    { topic: 'Baby Eye Infections: Causes Treatment and When to See a Doctor', section: 'blog' },
    { topic: 'Sticky Eyes in Newborns: What Causes It and How to Treat It', section: 'blog' },
    { topic: 'Baby Squint: When Eyes Cross and What to Do', section: 'blog' },
    { topic: 'Fontanelle: What the Soft Spot on Baby Head Tells You', section: 'blog' },
    { topic: 'Baby Weight Chart: What Is a Healthy Weight for Your Baby', section: 'blog' },
    { topic: 'Baby Head Circumference: What It Measures and What Is Normal', section: 'blog' },
    { topic: 'Pyloric Stenosis in Babies: Signs Diagnosis and Treatment', section: 'blog' },
    { topic: 'Intussusception in Babies: Symptoms and Emergency Signs', section: 'blog' },
    { topic: 'Baby Hernia: Types Signs and Treatment Options', section: 'blog' },
    { topic: 'Baby Blocked Tear Duct: How Long It Lasts and How to Help', section: 'blog' },
    { topic: 'Nappy Changing Rash vs Yeast Infection: How to Tell the Difference', section: 'blog' },
    { topic: 'Seborrhoeic Dermatitis in Babies: Causes and Treatment', section: 'blog' },
    { topic: 'Baby Hives and Urticaria: Causes and Treatment', section: 'blog' },
    { topic: 'Chickenpox in Babies: Symptoms Treatment and When to Worry', section: 'blog' },
    { topic: 'Roseola in Babies: What It Is and What the Rash Looks Like', section: 'blog' },
    // ── PARENTING PHILOSOPHY ─────────────────────────────────────────────────
    { topic: 'Attachment Parenting: What It Is and How to Practise It', section: 'blog' },
    { topic: 'Gentle Parenting: Principles Techniques and How to Start', section: 'blog' },
    { topic: 'Positive Parenting: Raising Children Without Punishment', section: 'blog' },
    { topic: 'RIE Parenting: Resources for Infant Educarers Explained', section: 'blog' },
    { topic: 'Montessori Baby: How to Apply Montessori Principles from Birth', section: 'blog' },
    { topic: 'Conscious Parenting: What It Means and How to Start', section: 'blog' },
    { topic: 'Free Range Parenting: Raising Independent Children', section: 'blog' },
    { topic: 'Helicopter Parenting: Signs and How to Step Back', section: 'blog' },
    // ── PARENTING TODDLER ─────────────────────────────────────────────────────
    { topic: 'Setting Boundaries With Toddlers: A Gentle but Firm Guide', section: 'parenting', category: 'development' },
    { topic: 'Toddler Biting: Why It Happens and How to Stop It', section: 'parenting', category: 'development' },
    { topic: 'Toddler Hitting: Why It Happens and How to Respond', section: 'parenting', category: 'development' },
    { topic: 'Toddler Throwing Food: Why It Happens and How to Handle It', section: 'parenting', category: 'development' },
    { topic: 'Toddler Not Talking: When to Worry and When to Wait', section: 'parenting', category: 'development' },
    { topic: 'Toddler Regression After New Baby: Why It Happens and How to Help', section: 'parenting', category: 'development' },
    { topic: 'Imaginary Friends in Toddlers: Is It Normal', section: 'parenting', category: 'development' },
    { topic: 'Fear of the Dark in Toddlers: Causes and How to Help', section: 'parenting', category: 'development' },
    { topic: 'Toddler Discipline Without Smacking: Effective Alternatives', section: 'parenting', category: 'development' },
    { topic: 'Time-Out for Toddlers: Does It Work and How to Use It', section: 'parenting', category: 'development' },
    { topic: 'Positive Reinforcement for Toddlers: Reward Charts and Praise', section: 'parenting', category: 'development' },
    { topic: 'Toddler Emotional Regulation: Helping Your Child Manage Big Feelings', section: 'parenting', category: 'development' },
    // ── ACTIVITIES AND PLAY ───────────────────────────────────────────────────
    { topic: 'Best Sensory Activities for Babies Under 6 Months', section: 'parenting', category: 'development' },
    { topic: 'Best Activities for 6 to 9 Month Old Babies', section: 'parenting', category: 'development' },
    { topic: 'Best Activities for 9 to 12 Month Old Babies', section: 'parenting', category: 'development' },
    { topic: 'Best Activities for 12 to 18 Month Old Toddlers', section: 'parenting', category: 'development' },
    { topic: 'Best Outdoor Activities for Babies and Toddlers', section: 'parenting', category: 'development' },
    { topic: 'Rainy Day Activities for Babies and Toddlers at Home', section: 'parenting', category: 'development' },
    { topic: 'Best Books for Babies: Age by Age Reading Recommendations', section: 'parenting', category: 'development' },
    { topic: 'Music for Baby Development: Benefits and How to Use It', section: 'parenting', category: 'development' },
    // ── FERTILITY ADVANCED ────────────────────────────────────────────────────
    { topic: 'Endometriosis and Fertility: How It Affects Getting Pregnant', section: 'blog' },
    { topic: 'Male Infertility: Causes Tests and Treatment Options', section: 'blog' },
    { topic: 'Unexplained Infertility: What It Means and Your Options', section: 'blog' },
    { topic: 'Egg Freezing: How It Works Costs and Who Should Consider It', section: 'blog' },
    { topic: 'IUI Intrauterine Insemination: What It Is and What to Expect', section: 'blog' },
    { topic: 'Donor Eggs and Donor Sperm: What the Process Involves', section: 'blog' },
    { topic: 'Fertility Supplements: What the Evidence Says', section: 'blog' },
    { topic: 'Fertility Diet: Foods That Help and Hurt Your Chances', section: 'blog' },
    { topic: 'How Age Affects Fertility: The Real Statistics', section: 'blog' },
    { topic: 'Basal Body Temperature Tracking: Complete Guide for TTC', section: 'blog' },
    { topic: 'Cervical Mucus and Fertility: How to Read Your Signs', section: 'blog' },
    { topic: 'Luteal Phase Defect: What It Is and How It Affects Fertility', section: 'blog' },
    // ── PRODUCT REVIEWS ADVANCED ─────────────────────────────────────────────
    { topic: 'Best Baby Monitors with App Control 2026', section: 'products', category: 'monitors' },
    { topic: 'Nanit Pro vs Owlet: Which Smart Baby Monitor Is Better', section: 'products', category: 'monitors' },
    { topic: 'Best Video Baby Monitors Without WiFi 2026', section: 'products', category: 'monitors' },
    { topic: 'UPPAbaby Vista vs Cruz: Which Is Right for Your Family', section: 'products', category: 'strollers' },
    { topic: 'Bugaboo vs Uppababy: Which Premium Stroller Is Worth It', section: 'products', category: 'strollers' },
    { topic: 'Best Strollers for City Living 2026', section: 'products', category: 'strollers' },
    { topic: 'Best Strollers for Newborns That Fully Recline 2026', section: 'products', category: 'strollers' },
    { topic: 'Best Pram Travel Systems 2026: Stroller and Car Seat Combos', section: 'products', category: 'strollers' },
    { topic: 'Chicco Keyfit 35 vs Graco SnugRide: Best Infant Car Seat', section: 'products', category: 'car-seats' },
    { topic: 'Best Extended Rear Facing Car Seats 2026', section: 'products', category: 'car-seats' },
    { topic: 'Best Booster Seats for Toddlers 2026', section: 'products', category: 'car-seats' },
    { topic: 'Graco 4Ever DLX 4-in-1 Car Seat Review 2026', section: 'products', category: 'car-seats' },
    { topic: 'Cybex Sirona Car Seat Review 2026', section: 'products', category: 'car-seats' },
    { topic: 'Best Organic Crib Mattresses 2026', section: 'products', category: 'cribs' },
    { topic: 'Naturepedic Crib Mattress Review 2026', section: 'products', category: 'cribs' },
    { topic: 'IKEA Solgul Crib Mattress Review 2026', section: 'products', category: 'cribs' },
    { topic: 'Best Convertible Cribs That Last Until Age 10 2026', section: 'products', category: 'cribs' },
    { topic: 'Best Changing Table Toppers and Dressers with Changers 2026', section: 'products', category: 'nursery' },
    { topic: 'Best Baby Humidifiers for Nursery 2026', section: 'products', category: 'nursery' },
    { topic: 'Best Air Purifiers for Baby Room 2026', section: 'products', category: 'nursery' },
    { topic: 'Best Nursing Pillows for Breastfeeding 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Boppy vs My Brest Friend Nursing Pillow: Which Is Better', section: 'products', category: 'feeding-gear' },
    { topic: 'Best Bottle Warmers for Breast Milk and Formula 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Munchkin Latch Bottles Review 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Dr Browns Bottles Review 2026: Are They Worth It', section: 'products', category: 'feeding-gear' },
    { topic: 'Comotomo Bottles Review 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Best Baby Food Makers and Blenders 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'BEABA Babycook Baby Food Maker Review 2026', section: 'products', category: 'feeding-gear' },
    { topic: 'Best Breast Milk Bags for Pumping and Storage 2026', section: 'products', category: 'breast-pumps' },
    { topic: 'Haakaa Silicone Breast Pump Review 2026: Worth the Hype', section: 'products', category: 'breast-pumps' },
    { topic: 'Willow Wearable Breast Pump Review 2026', section: 'products', category: 'breast-pumps' },
    { topic: 'Best Baby Monitors Under 50 Dollars 2026: Budget Picks', section: 'products', category: 'monitors' },
    { topic: 'Best Baby Wraps for Plus Size Mums 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'Best Soft Structured Baby Carriers for Dads 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'BabyBjorn Baby Carrier One Review 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'Tula Baby Carrier Free to Grow Review 2026', section: 'products', category: 'baby-carriers' },
    { topic: 'Best Baby Swings for Small Spaces 2026', section: 'products', category: 'swings' },
    { topic: 'MamaRoo vs Snoo: Which Is Worth the Premium Price', section: 'products', category: 'swings' },
    { topic: 'Best Baby Jumpers and Bouncers 2026', section: 'products', category: 'bouncers' },
    { topic: 'Jolly Jumper Review 2026: Still the Best Baby Exerciser', section: 'products', category: 'bouncers' },
    { topic: 'Best Baby Activity Centres and Play Gyms 2026', section: 'products', category: 'toys' },
    { topic: 'Best Play Mats for Babies 2026: Foam Organic and Activity', section: 'products', category: 'toys' },
    { topic: 'Best Baby Toys for 0 to 3 Months 2026', section: 'products', category: 'toys' },
    { topic: 'Best Baby Toys for 3 to 6 Months 2026', section: 'products', category: 'toys' },
    { topic: 'Best Baby Toys for 6 to 12 Months 2026', section: 'products', category: 'toys' },
    { topic: 'Best Montessori Toys for Babies 2026', section: 'products', category: 'toys' },
    { topic: 'Best Baby Bath Toys 2026: Safe and Fun Options', section: 'products', category: 'toys' },
    { topic: 'Best Teething Toys 2026: Safe Options for Sore Gums', section: 'products', category: 'toys' },
    { topic: 'Sophie the Giraffe Teether Review 2026: Is It Worth It', section: 'products', category: 'toys' },
    { topic: 'Best Toddler Toys for 12 to 18 Months 2026', section: 'products', category: 'toys' },
    { topic: 'Best Toddler Toys for 18 to 24 Months 2026', section: 'products', category: 'toys' },
    { topic: 'Best Baby Thermometers 2026: Accurate and Easy to Use', section: 'products', category: 'safety' },
    { topic: 'Frida Baby Nose Aspirator NoseFrida Review 2026', section: 'products', category: 'safety' },
    { topic: 'Best Baby Nail Clippers and Files 2026', section: 'products', category: 'safety' },
    { topic: 'Best Baby First Aid Kits 2026: What to Include', section: 'products', category: 'safety' },
    { topic: 'Best Baby Sleeping Bags and Grobags by Tog Rating 2026', section: 'products', category: 'clothing' },
    { topic: 'Best Newborn Nappy Brands Compared 2026', section: 'products', category: 'clothing' },
    { topic: 'Best Reusable Nappies 2026: Starter Kits Reviewed', section: 'products', category: 'clothing' },
    { topic: 'Best Baby Wipes for Sensitive Skin 2026', section: 'products', category: 'clothing' },
    { topic: 'Best Baby Sunscreen 2026: Safe Options for Sensitive Skin', section: 'products', category: 'safety' },
    { topic: 'Best Baby Monitors With Two Cameras 2026', section: 'products', category: 'monitors' },
    // ── PARENTING: NEWBORN ADVANCED ───────────────────────────────────────────
    { topic: 'Kangaroo Care: Benefits for Premature and Full Term Babies', section: 'parenting', category: 'newborn' },
    { topic: 'What to Do in the First Week Home With Your Newborn', section: 'parenting', category: 'newborn' },
    { topic: 'How to Care for a Premature Baby at Home', section: 'parenting', category: 'newborn' },
    { topic: 'Newborn Hearing and Vision: What Babies Can Actually Sense', section: 'parenting', category: 'newborn' },
    { topic: 'Baby Hiccups: Why They Happen and How to Stop Them', section: 'parenting', category: 'newborn' },
    { topic: 'Newborn Grunting and Noises: What Is Normal', section: 'parenting', category: 'newborn' },
    { topic: 'Baby Sneezing and Stuffy Nose: Normal or Cause for Concern', section: 'parenting', category: 'newborn' },
    { topic: 'How to Take Care of Baby Nails: Trimming and Preventing Scratches', section: 'parenting', category: 'newborn' },
    { topic: 'Safe Ways to Use a Baby Carrier With a Newborn', section: 'parenting', category: 'newborn' },
    { topic: 'How to Change a Nappy: Complete Step by Step Guide', section: 'parenting', category: 'newborn' },
    // ── PARENTING: FEEDING ADVANCED ───────────────────────────────────────────
    { topic: 'Baby Food Stages Explained: Stage 1 2 and 3 Foods', section: 'parenting', category: 'feeding' },
    { topic: 'How to Transition Baby From Formula to Cows Milk', section: 'parenting', category: 'feeding' },
    { topic: 'Iron Rich Foods for Baby Led Weaning', section: 'parenting', category: 'feeding' },
    { topic: 'Finger Foods for Babies: Safe Options by Age', section: 'parenting', category: 'feeding' },
    { topic: 'How to Introduce Eggs to Your Baby Safely', section: 'parenting', category: 'feeding' },
    { topic: 'How to Introduce Fish to Your Baby Safely', section: 'parenting', category: 'feeding' },
    { topic: 'Baby Meal Planning: How to Prepare a Week of Baby Food', section: 'parenting', category: 'feeding' },
    { topic: 'Feeding Twins: Breastfeeding and Formula Feeding Tips', section: 'parenting', category: 'feeding' },
    { topic: 'Baby Snacks: Best Healthy Options for 6 to 12 Months', section: 'parenting', category: 'feeding' },
    { topic: 'Baby Sugar and Salt: When Can Babies Have Them', section: 'parenting', category: 'feeding' },
  ];

  runBatch(mega).catch(console.error);

} else if (args.length >= 1) {
  // Single article mode
  const [topic, section = 'blog', category] = args;
  generateArticle(topic, section as Section, category)
    .then(() => console.log('\nðŸŽ‰ Done!'))
    .catch(err => { console.error('âŒ Error:', err.message); process.exit(1); });

} else {
  console.log(`
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘     PregnancySprout Content Pipeline                 â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

SINGLE ARTICLE:
  npm run generate "Your Article Topic"
  npm run generate "Ferber Method Guide" parenting sleep
  npm run generate "Best Baby Monitors" products monitors

BATCH (generates all 43 articles at once):
  npm run generate:batch

REQUIREMENTS:
  Add ANTHROPIC_API_KEY=your-key-here to .env.local
  Get your key at: https://console.anthropic.com
`);
}
