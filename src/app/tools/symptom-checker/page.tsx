import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { SymptomChecker } from './SymptomChecker';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Pregnancy Symptom Checker — Is This Normal During Pregnancy?',
  description: 'Check pregnancy symptoms: is it normal or concerning? Learn which symptoms need doctor attention immediately vs. those that are typical. Medical information guide.',
  alternates: { canonical: `${siteConfig.url}/tools/symptom-checker` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is pregnancy nausea normal vs. concerning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Normal morning sickness: mild to moderate nausea, especially mornings, manageable with food/rest, and improves by week 16. Concerning: severe vomiting preventing food/water intake, weight loss, dizziness, dark urine, or continuing past week 16 (may indicate hyperemesis gravidarum—contact doctor). Some nausea is completely normal; severe versions need treatment.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is spotting/light bleeding normal in pregnancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Light spotting (few drops) occasionally can be normal, especially after intercourse or exams. Concerning: heavy bleeding like a period, bright red bleeding with clots, bleeding with severe cramping, or bleeding any trimester. Call your doctor for any bleeding during pregnancy—some is fine, but it needs evaluation.'
      }
    },
    {
      '@type': 'Question',
      name: 'What about cramping during pregnancy—is it normal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mild cramping is normal, especially during first trimester (stretching ligaments). Braxton-Hicks contractions (painless tightening) are normal starting week 20. Concerning: severe cramping, constant pain, cramping with bleeding, or premature contractions (before 37 weeks). Trust your instincts—if cramping feels wrong, contact your provider.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I call my doctor immediately?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call immediately for: severe abdominal pain, heavy vaginal bleeding, fluid leaking from vagina, chest pain, difficulty breathing, severe headache with vision changes, high fever (>101°F), loss of consciousness, or no fetal movement (after 28 weeks). Don\'t wait—if you\'re unsure, call your provider. They\'d rather you check than have you worry alone.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is swelling/edema normal during pregnancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mild swelling of feet/ankles is normal, especially in hot weather or after standing. Concerning: sudden severe swelling, swelling in one leg only, swelling with headache/visual changes/abdominal pain (preeclampsia signs), or swelling of hands/face. Elevate legs, stay hydrated, and mention swelling at your next visit. Report sudden increases to your doctor.'
      }
    },
    {
      '@type': 'Question',
      name: 'What about back pain during pregnancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Back pain is extremely common as your body changes and your center of gravity shifts. Normal: dull aching, worse after activity, improving with rest/stretching. Concerning: severe sharp pain, back pain with other labor symptoms, or back pain with fever. Prenatal massage, maternity support belts, and physical therapy help. Mention severe pain to your provider.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is fatigue normal, or should I be concerned?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Extreme fatigue is incredibly common in first and third trimesters—your body is working hard. Normal: needing extra sleep, feeling exhausted, needing to rest frequently. Try: more sleep, iron-rich foods, staying hydrated. Concerning: fatigue so severe you can\'t function, plus other symptoms like shortness of breath (may indicate anemia). Mention to your doctor if unusual.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I track fetal movement and when?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start noticing movement around week 16-25 (first pregnancies later). By 28 weeks, establish a routine: count kicks daily. You should feel 10+ movements in 2 hours, or fewer consistent with baby\'s pattern. Concerning: sudden decrease in movement. If you notice changes, eat a snack, lie down, and count again. If still decreased, call your doctor immediately.'
      }
    }
  ],
};

export default function SymptomCheckerPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Symptom Checker', href: '/tools/symptom-checker' }]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Symptom Checker', href: '/tools/symptom-checker' }]} />
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">Pregnancy Symptom Checker</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Select your symptoms to understand what&apos;s normal during pregnancy and when to contact your healthcare provider.</p>
          <div className="mt-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 text-sm text-blue-900 dark:text-blue-200">
            <strong>Important Disclaimer:</strong> This tool is for educational and informational purposes only. It is not a substitute for professional medical advice. Always contact your healthcare provider if you have symptoms or concerns. In emergencies, call 911.
          </div>
        </div>
        <SymptomChecker />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Pregnancy Symptoms: Normal vs. Concerning</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Pregnancy brings constant changes—some expected, others surprising. Learning which symptoms are typical and which need medical attention helps you stay calm and know when to reach out to your healthcare provider. This guide covers the most common pregnancy symptoms and when they warrant a call to your doctor.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Remember: trust your instincts. If something feels wrong, contact your provider. They would rather you ask than worry alone. Every pregnancy is unique, and your doctor knows your medical history best.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">First Trimester Symptoms: What to Expect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Morning sickness (nausea & vomiting):</strong> Affects 70% of pregnant women. Usually starts week 4-6, peaks around week 9, and improves by week 14-16. While called "morning sickness," it can happen any time. This is normal. Manage with small frequent meals, ginger, and staying hydrated.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Breast tenderness:</strong> Your breasts may feel swollen and sore due to hormonal changes. This usually improves after the first trimester. A supportive bra helps.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Fatigue:</strong> Extreme exhaustion is normal as your body adjusts. Rest as much as possible. This typically improves in the second trimester.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Spotting:</strong> Light spotting (a few drops) around your period date can occur, especially if your period was light. This may be "implantation bleeding." However, any bleeding should be discussed with your doctor to rule out complications.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Second Trimester: The "Honeymoon" Phase</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Many women feel their best during weeks 14-20. Morning sickness usually ends, energy returns, and pregnancy starts showing. New symptoms may include:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Increased appetite:</strong> Normal. Eat nutritious foods and don't restrict calories—you need extra nutrition for your growing baby.</li>
              <li><strong>Fetal movement:</strong> You'll start feeling your baby move (flutter, then kicks). This is incredibly exciting. Enjoy noticing these movements.</li>
              <li><strong>Darkened skin patches:</strong> Some women develop dark patches on the face ("chloasma" or "mask of pregnancy"). These usually fade after pregnancy.</li>
              <li><strong>Braxton-Hicks contractions:</strong> Starting around week 20, you may feel painless tightening of the uterus. These are practice contractions—normal and harmless.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Third Trimester: The Final Stretch</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              As you approach your due date, new symptoms reflect your baby's growth:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Increased back/pelvic pain:</strong> Your body is preparing for delivery. Prenatal massage and physical therapy help.</li>
              <li><strong>Swelling:</strong> Your feet, ankles, hands, and face may swell due to fluid retention. Normal and usually goes away after delivery.</li>
              <li><strong>Shortness of breath:</strong> As your baby grows upward, your lungs have less room. This improves once baby "drops" into the pelvis.</li>
              <li><strong>Frequent urination:</strong> Increased from the beginning, but intensifies as baby presses on your bladder.</li>
              <li><strong>Stronger Braxton-Hicks:</strong> These may become more frequent and intense. If they become regular (every 5 minutes for an hour), it may be true labor.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Red Flags: When to Call Your Doctor Immediately</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>CALL 911 OR GO TO THE EMERGENCY ROOM if you experience:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
              <li>Severe chest pain or difficulty breathing</li>
              <li>Sudden severe headache with vision changes</li>
              <li>Severe abdominal pain</li>
              <li>Loss of consciousness or fainting</li>
              <li>Heavy vaginal bleeding (soaking pads)</li>
              <li>Fluid leaking from vagina (may be broken water)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>CALL YOUR DOCTOR TODAY if you experience:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Vaginal bleeding (any amount)</li>
              <li>Severe or persistent cramping</li>
              <li>Fever above 100.4°F (38°C)</li>
              <li>Sudden severe swelling, especially with headache or vision changes</li>
              <li>Decreased fetal movement (week 28+)</li>
              <li>Severe nausea/vomiting you can't control</li>
              <li>Painful or painful urination</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">When to Schedule an Appointment (Not Emergency)</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>New rashes or skin changes</li>
              <li>Severe heartburn or constipation</li>
              <li>Pain during intercourse</li>
              <li>Vaginal discharge that seems unusual (color, smell, consistency)</li>
              <li>Mild swelling or any new symptom you're unsure about</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Managing Common Pregnancy Discomforts</h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Morning sickness:</strong> Eat small frequent meals, avoid triggers, try ginger, stay hydrated.</li>
              <li><strong>Back pain:</strong> Prenatal massage, maternity support belt, good posture, stretching.</li>
              <li><strong>Heartburn:</strong> Small meals, avoid spicy foods, sleep propped up, antacids approved for pregnancy.</li>
              <li><strong>Constipation:</strong> Increase fiber, drink water, prenatal vitamins with docusate (stool softener).</li>
              <li><strong>Fatigue:</strong> Rest when you can, iron-rich foods, ask for help with household tasks.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Pregnancy Nutrition & Wellness</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Nutrition during pregnancy supports your baby's development and your health. You don't need to "eat for two" (calories don't double), but you need nutrient-dense foods. Key nutrients include: folate (leafy greens, legumes) to prevent neural tube defects, iron (red meat, spinach, fortified cereals) to prevent anemia, calcium (dairy, fortified plant-based options) for baby's bones, and protein (chicken, fish, beans, eggs) for growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Foods to avoid during pregnancy: raw or undercooked meat/eggs, unpasteurized dairy, high-mercury fish (shark, swordfish, king mackerel), raw sprouts, and unwashed produce. Listeria (found in deli meats and soft cheeses) poses risk. Proper food handling and cooking eliminate most risks.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Exercise during pregnancy is beneficial if you had normal pre-pregnancy fitness. Walking, swimming, prenatal yoga, and modified strength training are generally safe. Avoid contact sports and high-impact activities. Your growing belly shifts your center of gravity—balance becomes harder around 6-9 months.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Sleep becomes harder as you progress. Pillows between your knees and under your belly help. Left-side sleeping is ideal (improves blood flow). Don't panic if you occasionally flip to your back—your body usually wakes you if blood flow decreases. Nightmares and vivid dreams are common in pregnancy (hormones and anxiety); journaling can help process them.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Mental Health During Pregnancy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Pregnancy hormones affect mood profoundly. Anxiety and depression during pregnancy are common—affecting 10-20% of pregnant women—but often go unrecognized because pregnancy is "supposed to" be happy. If you're struggling, speak up. Treatment (therapy and sometimes medication) is safe and effective.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Common emotional experiences: identity shifts ("who am I if I'm not just myself anymore?"), anxiety about labor and birth, financial worries, relationship strain, and grief about losing your pre-pregnancy body or life. These are normal. A therapist specializing in perinatal mental health helps immensely.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Intrusive thoughts (disturbing images or worries about harm) are extremely common but distressing. These are not predictions—they're your anxious brain running worst-case scenarios. Reassurance helps temporarily, but cognitive-behavioral therapy (CBT) is most effective long-term.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Building a support network before birth helps immensely. Prenatal classes, support groups (online or in-person), close friendships, and family connections reduce isolation postpartum. You cannot "do this alone," nor should you try—humans are social creatures, and parenting requires a village.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Symptom Checker FAQs</h2>
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
