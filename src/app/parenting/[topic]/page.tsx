import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ChevronRight, Baby, Moon, Utensils, TrendingUp, Clock, ArrowRight, Smile, Heart, Activity, Puzzle } from 'lucide-react';
import { getAllArticles } from '@/lib/mdx';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const dynamic = 'force-static';

const topicMeta: Record<string, {
  title: string;
  description: string;
  emoji: string;
  icon: React.ElementType;
  intro: string;
  tips: string[];
}> = {
  newborn: {
    title: 'Newborn Care',
    description: 'Essential guides for the first weeks home with your newborn — feeding, sleeping, soothing, and everything in between.',
    emoji: '👶',
    icon: Baby,
    intro: 'Bringing your newborn home is one of life\'s most magical — and overwhelming — experiences. Our guides walk you through every aspect of newborn care, from the first nappy change to establishing healthy sleep patterns.',
    tips: [
      'Sleep when your baby sleeps — rest matters more than chores',
      'Accept all offers of help from family and friends',
      'Skin-to-skin contact strengthens bonding and regulates temperature',
      'It\'s normal for newborns to lose up to 10% of their birth weight in the first days',
      'Trust your instincts — you know your baby better than anyone',
    ],
  },
  sleep: {
    title: 'Baby Sleep',
    description: 'Sleep training methods, age-by-age sleep schedules, and safe sleep guidelines to help your whole family rest better.',
    emoji: '😴',
    icon: Moon,
    intro: 'Baby sleep is one of the most talked-about topics among new parents. Getting your baby to sleep longer stretches can feel like solving a complex puzzle. Our evidence-based guides cover every sleep training method and age-appropriate schedule.',
    tips: [
      'A consistent bedtime routine signals to your baby it\'s time to sleep',
      'Aim for a dark, cool room at 68–72°F for optimal sleep',
      'Watch for sleep cues — rubbing eyes, yawning — and act early',
      'White noise masks household sounds and extends sleep',
      'An overtired baby is harder to settle — don\'t wait too long past sleepy cues',
    ],
  },
  feeding: {
    title: 'Feeding & Nutrition',
    description: 'Breastfeeding, formula feeding, introducing solids, and keeping your baby well-nourished at every stage.',
    emoji: '🍼',
    icon: Utensils,
    intro: 'Whether you breastfeed, formula feed, or combination feed — every choice is valid as long as your baby is growing and thriving. Our feeding guides cover every method, common challenges, and the transition to solid foods.',
    tips: [
      'Feed on demand in the early weeks — you cannot overfeed a breastfed newborn',
      'Skin-to-skin contact helps establish and maintain milk supply',
      'Wait until 6 months before introducing solid foods, per WHO guidelines',
      'Never add cereal to a bottle — it poses a choking hazard',
      'Both breast milk and formula give your baby excellent nutrition',
    ],
  },
  development: {
    title: 'Baby Development',
    description: 'Month-by-month developmental milestones, activities to support growth, and when to talk to your paediatrician.',
    emoji: '🌱',
    icon: TrendingUp,
    intro: 'Watching your baby grow and develop is one of the greatest joys of parenthood. From that first smile to the first wobbly steps, every milestone is worth celebrating. Our development guides help you understand what to expect and how to support your baby\'s growth.',
    tips: [
      'Every baby develops at their own pace — milestones are ranges, not deadlines',
      'Talk, narrate, and describe everything you do — babies absorb language constantly',
      'Tummy time is essential for physical development from birth',
      'Responsive parenting builds secure attachment',
      'Bring a list of developmental questions to every well-baby check-up',
    ],
  },
  toddler: {
    title: 'Toddler Care',
    description: 'Tantrums, potty training, sleep, behaviour, and activities for toddlers aged 1–3 years.',
    emoji: '🧒',
    icon: Smile,
    intro: 'The toddler years (ages 1–3) are a whirlwind of "no!", big emotions, and incredible growth. Understanding toddler behaviour and development helps you respond with patience and confidence. Our toddler guides cover everything from tantrums to potty training.',
    tips: [
      'Toddlers crave routine — keep mealtimes, naps, and bedtime consistent',
      'Offer limited choices to give toddlers control without overwhelm',
      'Name emotions out loud to help them build emotional vocabulary',
      'Tantrums are normal brain development — stay calm and ride them out',
      'Outdoor play every day regulates mood and improves night sleep',
    ],
  },
  postpartum: {
    title: 'Postpartum Recovery',
    description: 'Physical recovery, postpartum depression, breastfeeding support, and self-care for new mothers.',
    emoji: '💛',
    icon: Heart,
    intro: 'The postpartum period is a time of profound change — physically, emotionally, and mentally. Recovery after birth takes time, and it\'s important to ask for help. Our postpartum guides cover everything from physical healing to recognising postpartum depression.',
    tips: [
      'Rest as much as possible in the first two weeks — healing is your priority',
      'Eat iron-rich foods to replenish blood loss and support energy levels',
      'Postpartum mood changes affect 1 in 5 mothers — you are not alone',
      'Accept help — delegate cooking, cleaning, and errands without guilt',
      'Talk to your doctor if you feel persistently sad, anxious, or numb',
    ],
  },
  health: {
    title: 'Baby Health',
    description: 'Fever, teething, vaccinations, common illnesses, and when to call the doctor — evidence-based guidance.',
    emoji: '🩺',
    icon: Activity,
    intro: 'Every cough, rash, and temperature spike can feel alarming when it\'s your baby. Our baby health guides help you know when to manage symptoms at home and when to seek medical care, with clear and evidence-based advice.',
    tips: [
      'Always call your doctor if a baby under 3 months has any fever above 38°C / 100.4°F',
      'Keep a record of your baby\'s vaccinations and upcoming due dates',
      'Teething does not cause high fever — if your baby has one, look for another cause',
      'Trust your gut — if something feels wrong, seek medical advice',
      'Keep a digital thermometer, saline drops, and infant paracetamol on hand',
    ],
  },
  activities: {
    title: 'Activities & Play',
    description: 'Age-appropriate play ideas, sensory activities, and learning games to support your baby\'s development.',
    emoji: '🎨',
    icon: Puzzle,
    intro: 'Play is how babies and toddlers learn about the world. The right activities at the right age can boost brain development, language, motor skills, and emotional intelligence. Our activity guides are organised by age and developmental stage so you always know what to try.',
    tips: [
      'Simple household items make the best sensory toys — no expensive gear needed',
      'Follow your baby\'s lead — if they lose interest, try again another day',
      'Reading aloud from birth builds language and bonding simultaneously',
      'Outdoor play offers sensory input no indoor activity can replicate',
      'Unstructured free play is just as valuable as guided activities',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(topicMeta).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const meta = topicMeta[topic];
  if (!meta) return { title: 'Not Found' };
  return {
    title: `${meta.title} Guides & Tips | PregnancySprout`,
    description: meta.description,
    alternates: { canonical: `${siteConfig.url}/parenting/${topic}` },
  };
}

export default async function ParentingTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const meta = topicMeta[topic];
  if (!meta) notFound();

  // ✅ Load articles DYNAMICALLY from actual MDX files — eliminates all 404s
  const articles = getAllArticles(`parenting/${topic}`);

  return (
    <div className="bg-[#fdf8fa] dark:bg-[#0f0f13] min-h-screen">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Parenting', href: '/parenting' },
        { name: meta.title, href: `/parenting/${topic}` },
      ]} />
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Breadcrumb items={[
          { name: 'Parenting', href: '/parenting' },
          { name: meta.title, href: `/parenting/${topic}` },
        ]} />

        {/* Hero */}
        <div className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/30 dark:to-purple-950/30 rounded-3xl p-8 md:p-10 mb-10 border border-brand-100 dark:border-brand-900">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{meta.emoji}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{meta.title}</h1>
          <p className="text-base text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed">{meta.intro}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8">

          {/* Articles — dynamically from MDX */}
          <div>
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-5">
              Guides &amp; Articles
              <span className="ml-2 text-sm font-normal text-gray-400">({articles.length})</span>
            </h2>

            {articles.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center text-gray-500 dark:text-gray-300">
                <p className="text-base mb-2">More guides coming soon!</p>
                <p className="text-sm">Check back shortly for expert {meta.title.toLowerCase()} content.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/parenting/${topic}/${article.slug}`}
                    className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 mb-1.5 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {article.readingTime} min
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Link to all blog content */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                Browse all articles on our blog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Tips */}
            <div className="bg-brand-50 dark:bg-brand-950/30 rounded-2xl border border-brand-100 dark:border-brand-900 p-5 mb-5">
              <h3 className="font-serif text-base font-bold text-gray-900 dark:text-white mb-4">Quick Tips</h3>
              <ul className="space-y-3">
                {meta.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="text-brand-500 font-bold mt-0.5 shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other topics */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Other Topics</h4>
              <div className="space-y-1.5">
                {Object.entries(topicMeta)
                  .filter(([slug]) => slug !== topic)
                  .map(([slug, t]) => (
                    <Link
                      key={slug}
                      href={`/parenting/${slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 py-1.5 transition-colors"
                    >
                      <span>{t.emoji}</span>
                      <span>{t.title}</span>
                      <ChevronRight className="h-3 w-3 ml-auto text-gray-300" />
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
