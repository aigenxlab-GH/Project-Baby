import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { DueDateCalculator } from './DueDateCalculator';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Due Date Calculator — Find Your Baby\'s Due Date',
  description: 'Calculate your pregnancy due date instantly. Enter your LMP or conception date to find your estimated due date, current week, and key milestones.',
  alternates: { canonical: `${siteConfig.url}/tools/due-date-calculator` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is a due date calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). This is called Naegele\'s rule. If you know your conception date, add 266 days (38 weeks) instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the due date calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The due date is an estimate. Only about 5% of babies are born on their exact due date. Most babies are born within 2 weeks before or after the estimated due date. Your healthcare provider may adjust the date based on ultrasound measurements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a normal pregnancy length?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A full-term pregnancy is 39–40 weeks. Babies born at 37–38 weeks are considered early term, 39–40 weeks are full term, and 41 weeks+ are late term. Babies born before 37 weeks are premature.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is the due date calculated from the last menstrual period, not conception?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dating pregnancy from the LMP is a medical standard because most women remember their last period more easily than their exact conception date. Ovulation usually occurs about 14 days after the start of the period, so the LMP date plus 280 days accounts for this. It is a consistent, easy-to-remember dating method used worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my due date change during pregnancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, your due date may be adjusted based on ultrasound measurements, especially early in pregnancy. First-trimester ultrasounds (weeks 8-13) are the most accurate for dating - accurate to within 3-5 days. Second-trimester scans are accurate to within 1-2 weeks. After 20 weeks, ultrasound dating becomes less reliable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if my baby doesn\'t arrive by my due date?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you haven\'t gone into labor by your due date, your healthcare provider will continue monitoring you. Most pregnancies continue safely past the due date. However, risks of complications increase slightly after 42 weeks, so your provider may recommend induction (labor-inducing medication) around 41–42 weeks to avoid these risks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I predict my baby\'s arrival more accurately?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most accurate predictor is a first-trimester ultrasound. If that\'s not possible, an accurate LMP date is the next best option. After 20 weeks, ultrasound dating becomes less reliable. Some factors that may shift your due date include irregular menstrual cycles, assisted conception (IVF dates are calculated differently), and carrying multiples.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my cycle is irregular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your menstrual cycle is longer or shorter than 28 days, your actual due date may be different from the standard calculation. For example, a 35-day cycle means you ovulate later than average, so your pregnancy is shorter than 280 days from your LMP. An ultrasound early in pregnancy will adjust your due date to reflect your actual cycle length.',
      },
    },
  ],
};

export default function DueDateCalculatorPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Due Date Calculator', href: '/tools/due-date-calculator' },
      ]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Pregnancy Due Date Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Enter your last period or conception date to instantly calculate your due date,
            current pregnancy week, and trimester.
          </p>
        </div>
        <DueDateCalculator />

        <InContentAd />

        <InContentAd />

        {/* SEO Content Sections */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">How Is Your Due Date Calculated?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Your pregnancy due date is calculated using a simple formula called Naegele's Rule. If you know your last menstrual period (LMP), we add 280 days (exactly 40 weeks) to the first day of your period. This assumes a standard 28-day cycle, though variations are normal.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Why 280 days?</strong> Pregnancy is actually dated from the first day of your last period, not from conception. Even though you're not technically pregnant yet (conception usually occurs about 2 weeks after your last period), this dating method has become the medical standard because it's easy to remember and track.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you know your conception date (when you got pregnant), add 266 days (38 weeks) instead, since conception happens about 2 weeks after your last period.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Your Pregnancy Timeline</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Pregnancy is typically divided into three trimesters:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>First Trimester (Weeks 1-13):</strong> Weeks 1-2 are technically before conception. Conception occurs around week 2-3. This is when your baby's organs and body structures begin forming. Morning sickness, fatigue, and breast tenderness are common.</li>
              <li><strong>Second Trimester (Weeks 14-20):</strong> Most women feel their best during this time. "Morning sickness" typically ends. You'll have your anatomy ultrasound around week 20, where you'll find out your baby's gender if you choose to.</li>
              <li><strong>Third Trimester (Weeks 21-40):</strong> Your baby grows rapidly. You may experience back pain, swollen ankles, and trouble sleeping. Around week 37, your baby is considered "full term" and can be safely born.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">When Will Your Baby Actually Arrive?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Here's an important fact: <strong>only about 5% of babies are born on their exact due date.</strong> The due date is an estimate, not a guarantee.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Typical delivery windows:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
              <li>Within 2 weeks before your due date: Considered "early term"</li>
              <li>Your due date week: "On time"</li>
              <li>Within 2 weeks after your due date: Still "on time" (up to 42 weeks is medically acceptable, though risks increase)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Most healthy pregnancies last 37-42 weeks. Your healthcare provider will monitor your pregnancy and may induce labor if you go too long past your due date to prevent complications.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Factors That Affect Your Due Date</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Several factors can affect when your baby arrives:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Cycle length variations:</strong> If your menstrual cycle is longer or shorter than 28 days, your actual ovulation date (and therefore conception) may be different from the LMP calculation. This is why ultrasound dating is important.</li>
              <li><strong>Ultrasound dating:</strong> First-trimester ultrasounds (weeks 8-13) are the most accurate way to date a pregnancy, accurate to within 3-5 days. Second-trimester ultrasounds are accurate to within 1-2 weeks. If your ultrasound date differs from your LMP date, your doctor will typically use the ultrasound date.</li>
              <li><strong>Baby's genetics:</strong> Babies tend to follow their family patterns. If you or your partner were born early or late, your baby may be too.</li>
              <li><strong>First pregnancy:</strong> First-time mothers tend to deliver 3-5 days earlier on average than mothers having subsequent pregnancies.</li>
              <li><strong>Age and health:</strong> Maternal age and certain health conditions can affect delivery timing.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Calculating Week of Pregnancy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Knowing your week of pregnancy helps you understand where you are in your journey. Here's how it works:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
              <li><strong>Week 1-2:</strong> Before and during your period. Conception will occur during or just after this week.</li>
              <li><strong>Week 4:</strong> When you miss your period. You may get a positive pregnancy test this week.</li>
              <li><strong>Week 8:</strong> You're 2 months pregnant. Your baby is the size of a raspberry.</li>
              <li><strong>Week 12:</strong> End of first trimester. Your baby's organs are mostly formed.</li>
              <li><strong>Week 20:</strong> Halfway through pregnancy. You'll likely have your anatomy ultrasound.</li>
              <li><strong>Week 37:</strong> Your baby is considered "full term" and can be born safely.</li>
              <li><strong>Week 40:</strong> Your due date (estimated).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">When to Contact Your Healthcare Provider</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              While your due date calculator helps you plan, contact your doctor immediately if you experience:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Vaginal bleeding or spotting</li>
              <li>Severe abdominal pain or cramping</li>
              <li>Fluid leaking from the vagina</li>
              <li>Decreased fetal movement (especially in third trimester)</li>
              <li>Severe headache, vision changes, or chest pain</li>
              <li>Fever over 100.4°F (38°C)</li>
              <li>Dizziness or fainting</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Prenatal Milestones by Week</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Understanding what happens at key weeks helps you anticipate tests, appointments, and changes:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Week 8-10:</strong> First ultrasound confirms pregnancy and due date. Viability ultrasound checks for fetal heartbeat. This ultrasound is your baseline for dating accuracy.</li>
              <li><strong>Week 10-13:</strong> Combined screening test (optional) combines blood work and ultrasound to assess Down syndrome and other chromosomal risks.</li>
              <li><strong>Week 15-20:</strong> Second-trimester anatomy ultrasound (the "big" ultrasound). Doctors measure baby thoroughly and check all organ systems. You find out the baby's sex if you choose.</li>
              <li><strong>Week 24-28:</strong> Glucose tolerance test screens for gestational diabetes. You drink glucose solution and have blood drawn 1 hour later.</li>
              <li><strong>Week 28:</strong> Rh antibody test if you're Rh-negative. RhoGAM injection may be given to prevent complications in future pregnancies.</li>
              <li><strong>Week 35-37:</strong> Group B Streptococcus (GBS) screening. A swab checks for bacteria that can affect newborns. If positive, you'll receive antibiotics during labor.</li>
              <li><strong>Week 37+:</strong> Non-stress tests monitor baby's heart rate and your contractions. These become more frequent if you go past your due date.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Preparing for Your Due Date</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              As your due date approaches, practical preparation becomes important. Pack a hospital bag by week 36 with essentials: comfortable clothes for labor, copies of documents (insurance card, ID, prenatal records), toiletries, entertainment, and comfort items. Some hospitals provide lists of what to bring; check your hospital's website.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Discuss your birth plan with your healthcare provider. This includes preferences for labor (pain management options, movement, eating, who can be present), delivery (vaginal or planned cesarean), and immediate postpartum (skin-to-skin contact, breastfeeding). A written plan helps your care team understand your preferences, though flexibility is important—circumstances may require changes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Install your car seat by week 38. Most hospitals won't discharge newborns without proof of an installed car seat. Take an infant CPR class before labor if possible. While rare, knowing what to do in an emergency provides peace of mind and could save a life.
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
