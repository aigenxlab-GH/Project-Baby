import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { RegistryChecklist } from './RegistryChecklist';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InContentAd } from '@/components/ads/InContentAd';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Baby Registry Checklist — Essential Items for Newborns 2026',
  description: 'Complete baby registry checklist: essential nursery, feeding, travel, clothing, safety items. Budget-friendly options & premium picks. Everything you really need.',
  alternates: { canonical: `${siteConfig.url}/tools/registry-checklist` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the absolute must-have baby items?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Must-haves: crib/bassinet/safe sleep surface, car seat (required to leave hospital), diapers and wipes, clothing in newborn and 0-3 month sizes, safe feeding supplies (bottles/formula or nursing gear), swaddles/sleep sacks, thermometer, and a stroller. Everything else is helpful but not essential. Many items you\'ll need in the first months can be found secondhand.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much should I spend on a baby registry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Budget varies. Budget-conscious: $1,000-$2,000 (essentials only, buy secondhand where possible). Moderate: $3,000-$5,000 (essentials plus nice-to-haves). Premium: $5,000+ (high-end gear). Focus on what matters most to you. A $200 crib and a $800 crib both serve the same purpose. Prioritize safety, then comfort, then preference.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can I get baby items secondhand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, secondhand items save money significantly. Buy used for: clothing, toys, strollers, and non-electronic items. For safety, buy new: car seats (safety unknown), mattresses (SIDS risk), cribs (safety standards change), and pacifiers. Inspect all used items carefully and research manufacturer recalls before purchasing.'
      }
    },
    {
      '@type': 'Question',
      name: 'What baby items are actually waste (I don\'t need)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Often unnecessary: bottle warmers (room-temp or warm water works), wipe warmers (not needed), specialized diaper pails (regular trash works), luxury diaper creams (basic ones work fine), expensive bedding (simple sheets are fine), and many "baby gadgets" marketed as essentials. Most newborns just need basics. Resist pressure to over-buy.'
      }
    },
    {
      '@type': 'Question',
      name: 'When should I create a baby registry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Create your registry around 5-6 months pregnant, giving family and friends time to see it before baby arrives. You can start adding items earlier to help you think through what you really need. Most retailers allow modifications, so don\'t stress about getting it perfect immediately.'
      }
    },
    {
      '@type': 'Question',
      name: 'Should I register for a stroller, car seat, or travel system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Travel systems (car seat + stroller frame) are convenient and often cheaper than buying separately. However, you\'re locked into that brand. If you like different brands for each, buy separately. Consider your lifestyle: do you need a jogging stroller or lightweight umbrella stroller? Your lifestyle, not trends, should guide this choice.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do I need a bassinet, crib, or both?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bassinet: smaller, bedside, perfect for nighttime feedings in first 3-6 months. Crib: larger, usually in nursery, lasts longer. You can use either alone or both. Cosleeping safely (with proper setup) is also an option. Choose based on your space and sleep plan. Many families use a bassinet first, then transition to crib when baby gets bigger.'
      }
    },
    {
      '@type': 'Question',
      name: 'What feeding items do I need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If breastfeeding: nipple cream, breast pads, supportive bras, lanolin, and possibly a breast pump. If bottle feeding: bottles, nipples (buy a variety—babies have preferences), bottle brush, sterilizer (or use the dishwasher). If combination feeding: have both ready. Start with basics—you\'ll figure out what you prefer after baby arrives.'
      }
    }
  ],
};

export default function RegistryChecklistPage() {
  return (
    <div>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Registry Checklist', href: '/tools/registry-checklist' }]} />
      <div className="container mx-auto max-w-3xl px-4 pt-6 pb-12">
        <Breadcrumb items={[{ name: 'Tools', href: '/tools' }, { name: 'Registry Checklist', href: '/tools/registry-checklist' }]} />
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Baby Registry Checklist
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Everything you need for your new baby — organized by category with budget options
            and what you actually use. No guilt-buying unnecessary items.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full px-4 py-2 text-sm">
            <span>⚠️</span>
            <a href="/affiliate-disclosure" className="underline">Affiliate disclosure</a>
            <span>— we may earn commissions from purchases.</span>
          </div>
        </div>
        <RegistryChecklist />
        <InContentAd />

        {/* SEO Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Baby Registry Essentials: What You Really Need</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Creating a baby registry can feel overwhelming. The baby industry wants you to buy everything, but the truth is: you don't need most of it. This guide breaks down what's truly essential, what's nice-to-have, and what you can skip to save money and space.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The key principle: babies need basics. Safety, comfort, and simplicity matter more than expensive gadgets. Many items marketed as "must-haves" are nice but optional. Start with essentials, then add based on your lifestyle and budget.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Budget Planning: How Much Should You Spend?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Budget varies widely based on your situation:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Tight budget ($1,000-$2,000):</strong> Focus on safety essentials. Buy secondhand where possible (car seat exceptions). Borrow from friends when you can. Many stores offer completion discounts if you've registered with them.</li>
              <li><strong>Moderate budget ($3,000-$5,000):</strong> Buy essentials new, nice-to-haves secondhand or budget versions. Include both budget and premium options in your registry so guests can choose their budget level.</li>
              <li><strong>Higher budget ($5,000+):</strong> You can afford premium versions of everything. Even so, premium doesn't always equal better—research reviews rather than price.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Nursery & Sleep: Creating a Safe Sleep Space</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Essential:</strong> A safe sleep surface (crib, bassinet, or play yard meeting safety standards), firm mattress, fitted sheets, sleep sacks/swaddles. Avoid bumper pads, pillows, and blankets—these increase SIDS risk.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Nice to have:</strong> Blackout curtains (help with sleep schedules), white noise machine (helpful but not necessary), room temperature monitor, nightlight. A bassinette lets you keep baby close for nighttime feedings; a crib works fine from the start if you prefer.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Feeding: Breastfeeding, Bottle Feeding, or Both</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Breastfeeding essentials:</strong> Nipple cream, breast pads (to prevent leaking), comfortable bras. Breast pump (manual or electric) is helpful if you plan to return to work or be away.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Bottle feeding essentials:</strong> Bottles, nipples (buy multiple styles—babies have preferences), a bottle brush, and a way to sterilize (dishwasher works fine). Start with 8-10 bottles; if you'll do formula, you might want more.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Nice to have:</strong> Bottle warmer (not necessary—room temperature works), bottle organizer, feeding pillow (helps positioning but not essential).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Clothing: The Right Amount Without Excess</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Babies grow fast and spit up often. Stock these quantities:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>8-10 onesies in newborn and 0-3 month sizes</li>
              <li>6-8 sleepers or footed pajamas (these are easiest for diaper changes)</li>
              <li>5-7 pairs of pants or leggings</li>
              <li>5-7 outfits (don't go crazy—they grow out quickly)</li>
              <li>8-10 pairs of socks (tiny socks get lost constantly)</li>
              <li>1-2 sweaters/jackets for going out</li>
              <li>Mittens and hats (babies lose heat through their heads)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Travel & Getting Around: Stroller, Car Seat & Carrier</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Essential:</strong> Car seat (required by law to leave the hospital). Choose between installing in your car or using a travel system.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Stroller:</strong> A basic stroller ($100-300) works fine. Travel systems combine car seat + stroller frame. Jogging strollers are only necessary if you plan to run with your baby.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Baby carrier/wrap:</strong> Allows hands-free carrying. Helpful for cooking, shopping, or walking. Many parents use this more than expected—consider prioritizing in your budget.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Diapering & Bath: Daily Essentials</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              <strong>Diapering:</strong> Diapers, wipes, diaper cream (for rashes). You'll use hundreds of diapers monthly. Some parents use cloth diapers (reduces cost long-term but adds laundry). A changing table is nice but not necessary—change on a dresser or bed with a changing pad.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Bathing:</strong> A baby bathtub or sink insert, soft washcloths, baby shampoo/wash. A thermometer ensures water isn't too hot. Babies don't need daily baths—a few times a week is fine.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Second Baby Registry: What Changes?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If you're having a second child, your registry changes significantly. You likely have most basics from the first baby: crib, car seat (though check the expiration—car seats expire), stroller, clothes, and toys. Focus your second registry on: gaps from the first baby (items you wished you'd had), items that wore out or broke, upgraded versions if your budget allows, and any new items for your specific situation.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Many second-time parents ask: "Do I need a second car seat, or can I share?" You'll need at least two installed car seats if both children are in the car simultaneously, or face moving one seat between vehicles. Some parents invest in a second, cheaper car seat as a backup.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Second registry items often focus on time-savers: bottle sterilizer, extra pump parts, stair gates for safety now that you have a mobile first child. Your registry shows what you actually learned from the first baby—a goldmine for gift-givers who know you well.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">Registry Completion & Returns</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Most retailers offer completion discounts (10-20% off items not purchased by guests) after your baby is born or a set date passes. This is significant savings—if your registry totaled $3,000 and guests bought $1,500 worth, the 15% completion discount saves you $225 on the remaining $1,500.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Return policies for registry items vary. Some retailers allow returns on everything; others restrict certain items. Save all receipts and tags. If you receive duplicates, most stores allow returns up to 90 days after purchase (check your retailer's specific policy). Some items, like car seats, cannot be returned once used for safety reasons.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              After baby arrives, update your registry by removing purchased items so guests don't accidentally buy duplicates. If you had a wishlist on the registry for future purchases (like a more expensive monitor or chair), those remain available for future grandparents or relatives shopping for gifts throughout the year.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Registry Checklist FAQs</h2>
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
