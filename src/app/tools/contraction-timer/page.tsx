import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ContractionTimer } from './ContractionTimer';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contraction Timer — Labor Tracker & 5-1-1 Rule Guide',
  description: 'Free labor contraction timer. Track frequency, duration, and intensity during labor. Learn the 5-1-1 rule: when to call your doctor or go to hospital.',
  alternates: { canonical: `${siteConfig.url}/tools/contraction-timer` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the 5-1-1 rule for labor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 5-1-1 rule tells you when to call your doctor or head to the hospital: contractions every 5 minutes, lasting 1 minute each, for at least 1 hour straight. Once this pattern is consistent for an hour, it\'s time to go in. This rule applies to first-time mothers; experienced mothers may go in sooner.'
      }
    },
    {
      '@type': 'Question',
      name: 'What does a contraction feel like?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'True labor contractions feel like intense tightening and hardening of the entire uterus that starts in your lower abdomen and may spread to your back. The sensation peaks, then gradually fades. Contractions come at regular intervals and get closer together over time. Unlike Braxton-Hicks (practice contractions), true labor contractions are painful and don\'t stop with movement or hydration.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between Braxton-Hicks and labor contractions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Braxton-Hicks contractions are irregular, painless tightening of the uterus starting around week 20. They don\'t get closer together or more intense. True labor contractions are regular, progressively closer together, increasingly intense, and painful. They don\'t ease up with position changes or hydration. If unsure, time the contractions—if irregular or they stop, they\'re likely Braxton-Hicks.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I go to the hospital?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go immediately if you experience vaginal bleeding, fluid leaking from the vagina (broken water), severe abdominal pain, chest pain, difficulty breathing, or contractions matching the 5-1-1 rule. First-time mothers should go when the 5-1-1 rule is met. Mothers with previous pregnancies may go sooner (3-1-1 rule). Always call your doctor if unsure.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does labor usually last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Average labor lasts 12-24 hours for first-time mothers, though it varies widely (can be 2-48 hours). Subsequent pregnancies tend to be shorter. Labor has three stages: early labor (slow dilation), active labor (faster dilation), and pushing. Walking, changing positions, and relaxation techniques can help labor progress naturally.'
      }
    },
    {
      '@type': 'Question',
      name: 'What can I do to manage labor pain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Natural pain management includes breathing techniques, position changes, hot showers or baths, massage, continuous labor support (partner or doula), and movement. Medical options include epidural anesthesia, IV pain medication, and nitrous oxide ("laughing gas"). Discuss all options with your healthcare provider before labor.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I eat or drink during labor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stay hydrated by sipping water, juice, or sports drinks throughout labor. Some providers allow light snacks like popsicles or crackers during early labor. Avoid heavy meals. Staying hydrated supports your body through labor and reduces fatigue. Ask your healthcare provider about their specific policies.'
      }
    },
    {
      '@type': 'Question',
      name: 'What if I go into labor before my due date?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you think you\'re in labor before 37 weeks (preterm labor), contact your doctor immediately. Signs include regular contractions (5-1-1 rule), vaginal bleeding, fluid leak, or severe abdominal/back pain. Babies born at 37+ weeks are considered "full term" with minimal risk. Before 37 weeks, doctors may try to delay labor to allow fetal development.'
      }
    }
  ],
};

export default function ContractionTimerPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Contraction Timer', href: '/tools/contraction-timer' },
      ]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Contraction Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track your contractions during labor and know exactly when to call your doctor or head to the hospital.
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-8 text-sm text-amber-900 dark:text-amber-200">
          <strong>The 5-1-1 Rule:</strong> Call your provider when contractions are{' '}
          <strong>5 minutes apart</strong>, lasting <strong>1 minute each</strong>,
          for at least <strong>1 hour</strong>.
        </div>
        <ContractionTimer />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Contractions: What Happens During Labor</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A contraction is when the muscles of your uterus tighten and then relax. During labor, these contractions push your baby down the birth canal. Understanding what contractions feel like and how to time them helps you know when you're truly in labor and when it's time to go to the hospital.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Not all uterine tightening is true labor. Braxton-Hicks contractions (practice contractions) are common during pregnancy but don't indicate active labor. Learning the difference helps you avoid unnecessary hospital trips while staying safe.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">The Three Stages of Labor</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Stage 1 — Early/Latent Labor:</strong> Contractions become regular but are still manageable. Your cervix dilates from 0 to 3 cm. Contractions may be 15-20 minutes apart. You can usually stay home, eat, drink, and move around. This stage often takes 8-12 hours for first-time mothers.
              </li>
              <li>
                <strong>Stage 2 — Active Labor:</strong> Contractions become stronger, closer together, and more painful. Your cervix dilates from 3 to 7 cm. Contractions are now 3-5 minutes apart. Pain management and breathing techniques help. This is when you should head to the hospital (around the 5-1-1 rule). Active labor usually lasts 3-5 hours.
              </li>
              <li>
                <strong>Stage 3 — Transition & Pushing:</strong> Contractions are intense and very close (1-2 minutes apart). Your cervix fully dilates to 10 cm. You feel an urge to push. You actively push with contractions to help your baby descend and be born. This stage lasts 30 minutes to 2 hours.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Time Contractions</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Use this contraction timer to track three key measurements:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Frequency:</strong> How many minutes apart contractions start (from the beginning of one to the beginning of the next)</li>
              <li><strong>Duration:</strong> How many seconds each contraction lasts (from start to complete relaxation)</li>
              <li><strong>Intensity:</strong> How strong the contraction feels (mild, moderate, strong, or very strong)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">When to Go to the Hospital</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Follow the 5-1-1 rule:</strong> Call your doctor and head to the hospital when you have:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
              <li>Contractions every 5 minutes</li>
              <li>Lasting 1 minute each</li>
              <li>For at least 1 hour straight</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>First-time mothers</strong> follow the 5-1-1 rule. <strong>Mothers with previous pregnancies</strong> may use the 3-1-1 rule (every 3 minutes) since labor can progress faster.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Go to the hospital immediately if:</strong> You have vaginal bleeding, your water breaks, you feel severe pain that doesn't ease between contractions, you have chest pain or difficulty breathing, or you feel faint.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Pain Management During Labor</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Natural techniques:</strong> Deep breathing, position changes, continuous support from a partner or doula, massage, hot showers, and movement help many mothers manage labor pain without medication.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Medical options:</strong> Epidural (numbs the lower body), IV pain medication, and nitrous oxide provide stronger pain relief. Ask your healthcare provider about these options during pregnancy planning.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Preparing for Labor: What to Expect at the Hospital</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              When you arrive at the hospital, admission staff will check you in and monitor you and your baby. You'll be asked about your contractions, any pain, and when your water broke (if applicable). An initial examination checks your cervical dilation and baby's position. This is called your "cervical exam"—it's brief but can feel uncomfortable.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You'll be hooked up to a fetal monitor, which tracks your baby's heart rate and your contractions continuously (you can usually still move around with wireless monitors). Nurses will place an IV for fluids and emergency medication access. This doesn't mean you'll definitely need medication—it's precautionary.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If your labor progresses very slowly or complications arise, your healthcare provider may recommend medical interventions: labor-inducing medication (Pitocin), breaking your water if it hasn't broken naturally, or in some cases, a cesarean section. These aren't failures—they're tools to keep you and your baby safe.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Recovery: The First Hours After Birth</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Immediately after birth, your baby is placed on your chest for skin-to-skin contact (unless medical issues require otherwise). This promotes bonding and helps regulate your baby's temperature and blood sugar. Your baby may breastfeed within the first hour if interested and able—breastfeeding triggers uterine contractions that help expel the placenta.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You'll experience cramping as your uterus contracts after delivery—these "afterpains" are normal. They intensify during breastfeeding (which is good, it helps your uterus return to pre-pregnancy size). You'll also have vaginal bleeding ("lochia") that's heavier than a period for the first few days, gradually tapering over weeks.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Physically, you'll be sore, exhausted, and emotional—all normal. Your body produced intense hormones during labor; postpartum hormonal shifts can feel overwhelming. Many hospitals keep you for observation for 24-48 hours (48+ for cesarean). During this time, nurses support feeding, monitor you for complications, and help you recover. Don't hesitate to ask for help—that's what they're there for.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
