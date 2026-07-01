import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { OvulationCalculator } from './OvulationCalculator';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Ovulation Calculator — Track Your Fertile Window & Best Days to Conceive',
  description: 'Calculate ovulation date and fertile window. Enter last period & cycle length to find your most fertile days. Scientifically accurate ovulation predictor.',
  alternates: { canonical: `${siteConfig.url}/tools/ovulation-calculator` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many days is a woman fertile during her cycle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A woman is most fertile during her "fertile window," which spans about 5 days before ovulation and the day of ovulation itself (6 days total). Sperm can live up to 5 days in the reproductive tract, so conception is possible if intercourse happens up to 5 days before ovulation. The peak fertility day is ovulation itself.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the most fertile day of the menstrual cycle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ovulation day is the most fertile day. This is when your ovary releases an egg. The egg can be fertilized for about 12-24 hours. Combined with the fact that sperm survives 5 days, your entire "fertile window" is approximately 6 days—the 5 days before ovulation plus ovulation day itself.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I get pregnant the day before ovulation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the day before ovulation is one of your most fertile days. In fact, studies show that intercourse 1-2 days before ovulation has the highest chance of conception. This is because sperm needs time to reach the egg, so timing intercourse just before ovulation (rather than after) is most effective.'
      }
    },
    {
      '@type': 'Question',
      name: 'How accurate is an ovulation calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ovulation calculators are accurate for women with regular, predictable cycles (within 2-3 days each month). If your cycle is irregular, the calculator is less reliable. For more precision, use ovulation predictor kits (OPKs) that detect the LH surge, or track basal body temperature daily. Apps combining multiple tracking methods improve accuracy.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the 12-24 hour window for getting pregnant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After ovulation, the released egg survives for 12-24 hours. During this time, it can be fertilized by sperm. This is why the fertile window extends backward (5 days before ovulation) rather than forward—sperm can wait for the egg, but the egg cannot wait long after release.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can cycle length vary and affect ovulation timing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, cycle length varies naturally. Even women with regular cycles may have variations. Average cycles are 28 days, but normal ranges from 21-35 days. The second half of the cycle (after ovulation) is usually consistent, while the first half varies. This is why tracking your actual cycle length improves accuracy.'
      }
    },
    {
      '@type': 'Question',
      name: 'What signs indicate ovulation is happening?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Physical signs of ovulation include: cervical mucus becoming clear and stretchy (like egg white), slight rise in basal body temperature, mild pelvic cramping or pain (mittelschmerz), breast tenderness, and increased libido. Not all women experience all signs, so tracking multiple indicators improves reliability.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I use the calculator or ovulation predictor kits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both are useful. Calculators are free and easy for women with regular cycles. Ovulation predictor kits (OPKs) detect the LH surge with higher precision but cost money. The best approach: start with the calculator to predict your window, then use OPKs during that predicted window to pinpoint ovulation exactly.'
      }
    }
  ],
};

export default function OvulationCalculatorPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Ovulation Calculator', href: '/tools/ovulation-calculator' },
      ]} />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Ovulation Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Find your most fertile days and best chance to conceive. Enter your cycle details below and discover exactly when you're ovulating.
          </p>
        </div>

        <OvulationCalculator />
        <InContentAd />

        {/* SEO Content Sections */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">What Is Ovulation?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Ovulation is the release of a mature egg from your ovary. This happens once per menstrual cycle, typically around the middle of your cycle. When the egg is released, it travels down the fallopian tube where it may be fertilized by sperm. If fertilization occurs, the egg implants in the uterus and pregnancy begins. If not fertilized, the egg and uterine lining are shed during your next period.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For couples trying to conceive, understanding when ovulation occurs is critical. Having intercourse during your "fertile window"—the days leading up to and including ovulation—significantly increases your chances of becoming pregnant.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">The Fertile Window: Your 6-Day Pregnancy Window</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Your fertile window is not just ovulation day—it's a 6-day window that includes the 5 days before ovulation and ovulation day itself. This extended window exists because sperm can survive up to 5 days in the reproductive tract, waiting for the egg to be released.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Peak fertility:</strong> The two days immediately before ovulation are your peak fertility days. Intercourse during this time has the highest chance of conception.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This is why timing matters. Many couples misunderstand the fertile window and wait until they think ovulation has occurred—by then, it may be too late. The key is to identify your fertile window in advance using our calculator, then plan intercourse during those days.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">How Does This Calculator Work?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Our ovulation calculator uses a simple formula based on your last period and cycle length. Here's how:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
              <li><strong>Ovulation occurs:</strong> About 14 days before your next period (not 14 days after your last period)</li>
              <li><strong>Input your cycle length:</strong> Count the days from the first day of one period to the first day of your next period</li>
              <li><strong>We calculate backwards:</strong> If your cycle is 28 days, ovulation occurs around day 14. If 35 days, around day 21</li>
              <li><strong>Add the 5-day window:</strong> We add 5 days before ovulation to show your complete fertile window</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Important:</strong> This calculator works best if your cycles are regular (within 2-3 days of the same length each month). If your cycle is irregular, the estimate may be less accurate.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Signs of Ovulation: How to Know It's Happening</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              While this calculator predicts ovulation, your body gives physical signs too. Learning to recognize these signs can help you confirm ovulation is coming:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Cervical mucus changes:</strong> As ovulation approaches, cervical mucus becomes clear, stretchy, and slippery (like egg white). This is the most reliable physical sign. After ovulation, it becomes thick and cloudy again.</li>
              <li><strong>Slight temperature rise:</strong> Basal body temperature (your temperature at rest) rises by 0.3-0.5°C after ovulation. Tracking this requires taking your temperature every morning before getting out of bed.</li>
              <li><strong>Ovulation pain (mittelschmerz):</strong> Some women feel mild cramping or sharp pain in their lower abdomen on the side where ovulation occurs. This can last from a few hours to a couple days.</li>
              <li><strong>Breast tenderness:</strong> Your breasts may feel sore or sensitive before or during ovulation due to hormonal changes.</li>
              <li><strong>Increased libido:</strong> Many women naturally experience increased sexual desire around ovulation—nature's way of promoting reproduction.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Ovulation Calculator vs. Ovulation Predictor Kits: Which Should You Use?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Our calculator:</strong> Free, easy to use, and works well for regular cycles. Best for understanding your general fertile window.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Ovulation predictor kits (OPKs):</strong> Detect the LH (luteinizing hormone) surge that occurs 12-48 hours before ovulation. These are more precise but cost money (usually $0.50-$2 per test).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Best approach:</strong> Use our calculator to predict your fertile window, then use OPKs during those predicted days to pinpoint ovulation exactly. This combines the best of both methods.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Tips for Maximizing Fertility</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Track multiple months:</strong> Cycle lengths can vary. Track for 3-6 months to identify your average cycle length for better predictions.</li>
              <li><strong>Have regular intercourse:</strong> Having sex every 2-3 days throughout your cycle ensures sperm is present when ovulation occurs. You don't need to time it perfectly.</li>
              <li><strong>Reduce stress:</strong> High stress can delay ovulation. Try relaxation techniques, exercise, or counseling if stress is high.</li>
              <li><strong>Maintain healthy weight:</strong> Both obesity and very low body weight can affect ovulation. A healthy BMI supports regular ovulation.</li>
              <li><strong>Avoid smoking and limit alcohol:</strong> Both can affect fertility and ovulation regularity.</li>
              <li><strong>Consider prenatal vitamins:</strong> Start taking folic acid (or prenatal vitamins containing it) before trying to conceive. Folic acid reduces the risk of neural tube defects.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Conception Timing & Success Rates</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Understanding when conception is most likely to occur helps you optimize timing. Studies show that intercourse timed 1-2 days before ovulation has the highest pregnancy success rate—around 20-25% per cycle for couples with no fertility issues. This is because sperm need time to travel through the reproductive tract and position themselves for fertilization.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              For most healthy couples under 35, conception happens within 3-6 months of trying. By age 35, fertility starts to decline gradually, and by 40, the decline accelerates. However, many couples conceive after age 40—age is not a guarantee of infertility, just a statistical trend.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you've been trying for a year (or 6 months if over 35) without conceiving, it's worth consulting a fertility specialist. They can run tests to identify underlying issues like low sperm count, irregular ovulation, or structural problems that might need treatment.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Tracking Methods Beyond the Calculator</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Basal Body Temperature (BBT) Tracking:</strong> Your body temperature rises slightly (0.3-0.5°C) after ovulation. By charting your temperature daily (before getting out of bed), you can confirm when ovulation occurred, though it won't predict it in advance since the rise happens after ovulation. This method requires dedication but is free and medication-free.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Cervical Mucus Monitoring:</strong> Throughout your cycle, cervical mucus changes consistency. Around ovulation, it becomes clear, stretchy, and slippery (like raw egg white)—ideal for sperm survival. Learning to recognize these changes (through observation and sometimes documentation) helps predict your fertile window. This method has no cost and is highly effective once you learn to recognize the patterns.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Fertility Apps & Wearables:</strong> Modern fertility tracking apps combine temperature, symptoms, and cervical mucus data to predict ovulation. Some apps integrate with wearable devices that track temperature changes automatically. While convenient, these apps should be used alongside other methods for accuracy.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Combining Methods:</strong> The most reliable approach combines this calculator, cervical mucus tracking, and either BBT or OPK testing. Using multiple indicators reduces guesswork and increases confidence in your fertile window prediction.
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
