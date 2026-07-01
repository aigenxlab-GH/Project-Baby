import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { BabyNameGenerator } from './BabyNameGenerator';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Baby Name Generator — Find Beautiful Baby Names by Origin & Meaning',
  description: 'Generate unique baby name ideas by gender, origin, starting letter, and syllables. Discover meaningful names with origins and meanings. Save favorites.',
  alternates: { canonical: `${siteConfig.url}/tools/baby-name-generator` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I choose the perfect baby name?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consider: (1) Sound—say it aloud with your last name, (2) Meaning—does it reflect your values or heritage? (3) Nickname options—what could it be shortened to? (4) Initials—do they spell anything unintended? (5) Cultural significance—does it honor your family or background? (6) Popularity—do you want something unique or familiar? Our generator helps you explore options by filtering these criteria.'
      }
    },
    {
      '@type': 'Question',
      name: 'What makes a good baby name?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A good baby name: is easy to pronounce and spell, has a meaning you love, flows well with your last name, feels timeless (won\'t feel dated later), offers nickname options if the full name is long, and represents something meaningful to your family. Avoid names with unfortunate initials, overly trendy spellings, or names you can\'t pronounce yourself.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I choose a popular or unique baby name?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both have pros and cons. Popular names (like Emma or Liam) are familiar and easy to spell, but your child may share the name with classmates. Unique names stand out but may require frequent corrections and spelling help. Middle ground: choose a name that\'s known but not in the top 5, or use a unique spelling of a classic name. Consider your community—uniqueness is relative.'
      }
    },
    {
      '@type': 'Question',
      name: 'What should I know about name origins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Names have cultural and historical origins. Using a name from your heritage honors your family. If borrowing from another culture, understand its meaning and significance—avoid appropriation of sacred names. Some names work across cultures (like Sophia or Alexander), while others are deeply tied to specific traditions. Research the name\'s origin and ask yourself why you\'re drawn to it.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I change my baby\'s name later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can legally change your child\'s name through the court system, but it involves paperwork and costs. Some parents wait a few days after birth to finalize the name, allowing time to see which name "fits" their baby. Once you submit the birth certificate, changes are possible but require more effort. Take your time deciding—it\'s an important choice, but changeability provides some flexibility.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I know if my baby\'s name will age well?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Imagine your child at different ages: as a baby, a school-aged child, a teenager, and a professional adult. Does the name work in all contexts? Avoid extremely trendy names (like Khaleesi from Game of Thrones) that may feel dated. Test it in professional scenarios: "This is [name], your accountant" or "Hello, I\'m [name], your surgeon." Names that sound good across ages and professions tend to age well.'
      }
    },
    {
      '@type': 'Question',
      name: 'What about gender-neutral baby names?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gender-neutral names (like Alex, Jordan, Casey) are increasingly popular and offer flexibility. Some parents choose them to let their child define their own identity. Others use them as middle names with more gendered first names. Gender-neutral names can be modern or traditional—research options in our generator to explore.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I check if a name is too popular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check the US Social Security Administration\'s "Popular Baby Names" database for current rankings, or search your country\'s equivalent. Know that popularity varies by region—a name popular in California may be uncommon in rural areas. If uniqueness matters, aim for names outside the top 100-200 for your child\'s birth year.'
      }
    }
  ],
};

export default function BabyNameGeneratorPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Baby Name Generator', href: '/tools/baby-name-generator' }]} />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Baby Name Generator', href: '/tools/baby-name-generator' }]} />
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">Baby Name Generator</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover beautiful baby names by gender, origin, meaning, and style. Filter and save your favorites as you explore.
          </p>
        </div>
        <BabyNameGenerator />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Finding the Perfect Baby Name: A Complete Guide</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Choosing a baby name is one of the most exciting and significant decisions you'll make as a parent. This name will become part of your child's identity, influencing how they're perceived and how they feel about themselves. Whether you're drawn to classic names, trendy modern options, or names from your cultural heritage, the process should feel meaningful and personal.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our baby name generator helps you explore thousands of options filtered by your preferences: gender, origin, starting letter, number of syllables, and more. Use it to discover names you might not have considered, then dive deeper into their meanings and origins.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">What Makes a Great Baby Name?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Great baby names share common qualities:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Pronounceability:</strong> People can say it correctly without confusion. When you tell someone the name, they understand immediately how to spell and pronounce it.</li>
              <li><strong>Meaningful:</strong> The name carries significance—whether from your heritage, a family member, a beloved character, or simply a meaning that resonates with your values.</li>
              <li><strong>Timeless:</strong> It won't feel dated in 10 or 20 years. Avoid names that are intensely trendy at the moment unless that matters less to you.</li>
              <li><strong>Versatile:</strong> It works across ages and contexts—as a cute baby name, a school-appropriate name, and a professional-sounding adult name.</li>
              <li><strong>Complementary:</strong> It flows well with your last name when said aloud. Say the full name aloud repeatedly to hear how it sounds.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Popular vs. Unique Baby Names: Finding Your Balance</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Popular names (Top 10-50):</strong> Think Emma, Liam, Olivia, Noah. These names are familiar, easy to spell, and unlikely to be mispronounced. However, your child may share the name with one or more classmates, which some parents want to avoid.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Unique names (Top 100+):</strong> Less common names help your child stand out and feel special. The trade-off: people may mispronounce it, spell it incorrectly, or the child may feel unusual. Uniqueness depends on your community.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Sweet spot:</strong> Many parents choose names that are known and liked but not in the absolute top 5. Or they use a classic first name with a unique middle name. This balance offers familiarity while still feeling somewhat special.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Name Origins and Meanings</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Every name carries history and meaning. Understanding a name's origin enriches your choice:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-3">
              <li><strong>Heritage names:</strong> Using your own cultural heritage honors your family and teaches your child about their background.</li>
              <li><strong>Cross-cultural names:</strong> Names like Sophia, Aria, or Amara work across cultures. Research meanings to ensure they resonate with you.</li>
              <li><strong>Family names:</strong> Naming after a loved one creates connection, though consider the implications (the child isn't that person, just shares a name).</li>
              <li><strong>Invented or modern names:</strong> Some names are newly created or unique spellings of traditional names. These offer individuality but may require constant spelling corrections.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Testing Your Baby Name Choice</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Before finalizing, test the name in different contexts:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Say it aloud repeatedly with your last name—does it flow smoothly?</li>
              <li>Imagine it on a resume or professional email—does it sound accomplished?</li>
              <li>Check the initials—do they spell anything unintended or embarrassing?</li>
              <li>Search it online—is there a celebrity or known person with this name who might overshadow it?</li>
              <li>Say it angrily (as you might call to your child)—does it still feel good?</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Gender-Neutral Baby Names: An Emerging Trend</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Gender-neutral or unisex names like Alex, Jordan, Casey, Riley, and Quinn are increasingly popular. Many parents choose these names to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Allow their child to define their own identity</li>
              <li>Reduce gender stereotyping from a young age</li>
              <li>Offer a name that feels modern and inclusive</li>
              <li>Honor multiple family traditions at once</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Naming Traditions Across Cultures</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Different cultures have rich naming traditions worth understanding:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Patronymic names (Scandinavian, Russian):</strong> Names include the father's name as part of the child's name (e.g., Andersson = "son of Anders"). Some families maintain this tradition; others adapt it for modern times.</li>
              <li><strong>Generational naming (Jewish tradition):</strong> Children are named after deceased relatives to honor them. This connects generations and preserves family legacy.</li>
              <li><strong>Surname as first name (some Western traditions):</strong> Using a family surname as a first name honors that family branch. Examples: Hudson, Carter, Madison.</li>
              <li><strong>Name meaning traditions (many Asian cultures):</strong> Parents choose names based on desired virtues or characteristics. A name meaning "peaceful" or "clever" reflects parental hopes.</li>
              <li><strong>Religious or spiritual names (many traditions):</strong> Names honoring saints, prophets, or spiritual figures connect the child to faith and heritage.</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              Honoring your heritage through naming connects your child to their roots. However, consider how traditional vs. modern the name feels, ensuring your child can carry it comfortably into adulthood and different cultural contexts.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">The Psychology of Names: Impact on Identity</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Research suggests names influence identity development subtly. Children with distinctive names report feeling unique and individualistic. Children with common names may feel more connected to their peers but less memorable. Neither is "better"—it depends on your family values.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A name's meaning and pronunciation matter too. If your chosen name carries pride for your family but is difficult for others to pronounce, your child may grow up explaining it repeatedly—or may develop thick skin and confidence. Some parents give children a heritage name plus an easier nickname for everyday use.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your child will grow into their name. A name you choose as "cute" for a baby may feel completely different when that person is a teenager or professional. The best approach: choose a name you love, that feels authentic to your family, and that you believe your child can wear at every stage of life—from childhood through adulthood.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions About Baby Names</h2>
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
