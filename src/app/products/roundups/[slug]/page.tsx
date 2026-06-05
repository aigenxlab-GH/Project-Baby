import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Check, X, ArrowRight, Trophy, Shield, TrendingUp } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

interface RoundupProduct {
  rank: number;
  name: string;
  brand: string;
  score: number;
  price: string;
  priceRange: 'budget' | 'mid-range' | 'premium';
  badge?: string;
  image: string;
  imageAlt: string;
  reviewSlug: string;
  category: string;
  pros: string[];
  cons: string[];
  summary: string;
  affiliateUrl: string;
  affiliatePrice: string;
}

interface RoundupData {
  title: string;
  description: string;
  metaDescription: string;
  slug: string;
  updatedAt: string;
  intro: string;
  products: RoundupProduct[];
  buyingGuide: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
}

const roundups: Record<string, RoundupData> = {
  'best-strollers-2026': {
    title: 'Best Strollers of 2026 — Tested & Ranked',
    description: 'We tested 9 strollers across city streets, parks, and public transport. These are the best strollers of 2026 for every budget and lifestyle.',
    metaDescription: 'Best strollers 2026: our top picks tested across city streets and parks. Includes best budget, best premium, best travel system, and best lightweight stroller.',
    slug: 'best-strollers-2026',
    updatedAt: '2026-06-05',
    intro: 'After testing nine strollers over four months — covering everything from cobblestone streets to airport security queues — we narrowed the field to the five best strollers of 2026. Whether you\'re after a city-ready travel system under $300 or the finest pushchair money can buy, there\'s a pick here for every parent.',
    products: [
      {
        rank: 1,
        name: 'Bugaboo Fox 5',
        brand: 'Bugaboo',
        score: 9.2,
        price: '$1,399',
        priceRange: 'premium',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1590492239080-e50b66d15a3d?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Bugaboo Fox 5 premium stroller',
        reviewSlug: '/products/strollers/bugaboo-fox-5-review',
        category: 'strollers',
        pros: ['Best-in-class suspension', 'Self-standing fold', 'Reversible seat', 'Lifetime frame warranty'],
        cons: ['Very expensive', 'Bassinet sold separately'],
        summary: 'The Bugaboo Fox 5 is the finest full-size stroller on the market. The suspension, reversible seat, and build quality justify the price for families who want the best daily experience.',
        affiliateUrl: 'https://www.amazon.com/dp/B0C3PXGZDP?tag=pregnancysprout-20',
        affiliatePrice: '$1,399',
      },
      {
        rank: 2,
        name: 'UPPAbaby Vista V2',
        brand: 'UPPAbaby',
        score: 9.0,
        price: '$969',
        priceRange: 'premium',
        badge: 'Best for Growing Families',
        image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'UPPAbaby Vista V2 travel system stroller',
        reviewSlug: '/products/strollers/uppababy-vista-v2-review',
        category: 'strollers',
        pros: ['Converts to double without new frame', 'Included bassinet (RumbleSeat)', 'Large storage basket', 'Premium build quality'],
        cons: ['Heavy at 27 lbs', 'Expensive accessories'],
        summary: 'The Vista V2 is the smart choice for families planning more than one child. The included bassinet and double-configuration upgrade path set it apart from competitors.',
        affiliateUrl: 'https://www.amazon.com/dp/B08BHPBQFL?tag=pregnancysprout-20',
        affiliatePrice: '$969',
      },
      {
        rank: 3,
        name: 'Baby Jogger City Mini GT2',
        brand: 'Baby Jogger',
        score: 8.7,
        price: '$399',
        priceRange: 'mid-range',
        badge: 'Best Mid-Range',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Baby Jogger City Mini GT2 all-terrain stroller',
        reviewSlug: '/products/strollers/baby-jogger-city-mini-gt2-review',
        category: 'strollers',
        pros: ['All-terrain wheels', 'Quick one-hand fold', 'Lightweight at 21 lbs', 'Decent canopy coverage'],
        cons: ['No bassinet compatible', 'Seat recline not fully flat'],
        summary: 'The City Mini GT2 punches well above its price. The all-terrain wheels, quick fold, and comfortable seat make it the pick for active families who won\'t compromise on quality.',
        affiliateUrl: 'https://www.amazon.com/dp/B07WQ7DQ3K?tag=pregnancysprout-20',
        affiliatePrice: '$399',
      },
      {
        rank: 4,
        name: 'Graco Modes Pramette',
        brand: 'Graco',
        score: 8.2,
        price: '$249',
        priceRange: 'mid-range',
        badge: 'Best Budget Travel System',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Graco Modes Pramette travel system stroller',
        reviewSlug: '/products/strollers/graco-modes-pramette-review',
        category: 'strollers',
        pros: ['Pram mode from birth', 'Compatible with SnugRide car seats', 'Large storage basket', 'Excellent value'],
        cons: ['Heavier than premium alternatives', 'Fold less intuitive'],
        summary: 'The best value travel system available. The Graco Modes Pramette\'s pram configuration and SnugRide compatibility make it a complete newborn-to-toddler solution at a fraction of premium prices.',
        affiliateUrl: 'https://www.amazon.com/dp/B08JY96JTZ?tag=pregnancysprout-20',
        affiliatePrice: '$249',
      },
      {
        rank: 5,
        name: 'Babyzen YOYO2',
        brand: 'Babyzen',
        score: 8.5,
        price: '$499',
        priceRange: 'premium',
        badge: 'Best Compact / Travel',
        image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Babyzen YOYO2 compact travel stroller',
        reviewSlug: '/products/strollers/babyzen-yoyo2-review',
        category: 'strollers',
        pros: ['Fits in overhead cabin storage', 'Folds to carry-on dimensions', 'Lightweight at 13.6 lbs', 'Premium materials'],
        cons: ['Expensive for its size', 'Small canopy', 'Narrow storage basket'],
        summary: 'The only full-featured stroller that fits in an aeroplane overhead bin. For frequent travellers or families in cities with small apartments, the YOYO2 is in a category of its own.',
        affiliateUrl: 'https://www.amazon.com/dp/B07Z5BJR6L?tag=pregnancysprout-20',
        affiliatePrice: '$499',
      },
    ],
    buyingGuide: [
      {
        heading: 'Weight vs. Features: The Core Trade-off',
        body: 'The heavier the stroller, the more features and suspension quality you typically get. A 22-lb Bugaboo absorbs bumps beautifully; a 13-lb travel stroller gives you the bus without the boot space. Decide which matters more for your lifestyle before looking at price.',
      },
      {
        heading: 'Travel System Compatibility',
        body: 'If you want to click your infant car seat directly into the stroller frame, check compatibility before buying. UPPAbaby Mesa, Graco SnugRide, and Chicco KeyFit each work with specific stroller brands. Mixing brands often requires an adapter (if available at all).',
      },
      {
        heading: 'Bassinet: Included vs. Sold Separately',
        body: 'A lie-flat bassinet is recommended for newborns under 3–4 months for safe sleep on the go. The UPPAbaby Vista V2 includes one; the Bugaboo Fox 5 charges an extra $299. Factor this into total cost comparisons.',
      },
      {
        heading: 'City vs. Terrain Use',
        body: 'For cobblestones and kerbs, prioritise suspension. For trails and parks, look for large pneumatic wheels (City Mini GT2, Thule Urban Glide). For city flats and public transport, lightweight and compact folds matter most (YOYO2).',
      },
    ],
    faq: [
      {
        q: 'When can a baby go in a stroller?',
        a: 'Most pushchairs are suitable from birth if they have a lie-flat recline or included bassinet. Check the manufacturer\'s minimum weight, typically 3–3.5 kg. Always confirm the stroller supports a safe sleep position (flat, not slouched) before using with a newborn.',
      },
      {
        q: 'How long do babies use strollers?',
        a: 'Most children use a stroller until age 3–4, though some continue using one until 5 for long days out. A good stroller with a weight limit of 50+ lbs will last the full period.',
      },
      {
        q: 'What is the safest stroller?',
        a: 'All strollers sold in the UK and US must meet ASTM F833 (US) or EN 1888 (EU/UK) safety standards. Prioritise a 5-point harness, a stable base (wide wheel stance), and a secure fold lock mechanism.',
      },
    ],
  },

  'best-baby-monitors-2026': {
    title: 'Best Baby Monitors of 2026 — Video, Audio & Smart',
    description: 'We tested video baby monitors, audio monitors, and smart wearable monitors in real overnight conditions. These are the best baby monitors of 2026.',
    metaDescription: 'Best baby monitors 2026: top picks for video, audio, and wearable monitors tested in real conditions. Includes best budget and best premium picks.',
    slug: 'best-baby-monitors-2026',
    updatedAt: '2026-06-05',
    intro: 'A baby monitor is one of those purchases where cutting corners can cost you sleep — and peace of mind. We tested six monitors across audio quality, night vision clarity, app reliability, and range. These are the best baby monitors of 2026.',
    products: [
      {
        rank: 1,
        name: 'Nanit Pro',
        brand: 'Nanit',
        score: 9.1,
        price: '$299',
        priceRange: 'premium',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Nanit Pro smart baby monitor mounted above crib',
        reviewSlug: '/products/monitors/nanit-pro-review',
        category: 'monitors',
        pros: ['Overhead camera for complete crib view', 'Breathing motion monitoring (with band)', 'Excellent sleep analytics', 'HD night vision'],
        cons: ['Subscription required for full features', 'Expensive', 'Breathing band sold separately'],
        summary: 'The Nanit Pro is the most data-rich baby monitor available. The overhead mount gives a complete view of the crib, and the sleep analytics are genuinely useful for tracking patterns over weeks.',
        affiliateUrl: 'https://www.amazon.com/dp/B087Y38BVH?tag=pregnancysprout-20',
        affiliatePrice: '$299',
      },
      {
        rank: 2,
        name: 'Owlet Dream Sock',
        brand: 'Owlet',
        score: 8.3,
        price: '$299',
        priceRange: 'premium',
        badge: 'Best Wearable',
        image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Owlet Dream Sock on sleeping infant',
        reviewSlug: '/products/monitors/owlet-dream-sock-review',
        category: 'monitors',
        pros: ['Real-time heart rate + oxygen monitoring', 'Comfortable sock design', 'Excellent companion app', 'Gentle pre-alert notifications'],
        cons: ['Not an FDA-cleared medical device', 'Daily charging required', 'False alerts possible'],
        summary: 'The best wearable monitor for parents who want vital sign data. Not a substitute for medical monitoring, but genuinely reassuring for high-anxiety parents and families with premature babies.',
        affiliateUrl: 'https://www.amazon.com/dp/B09R3GX1D8?tag=pregnancysprout-20',
        affiliatePrice: '$299',
      },
      {
        rank: 3,
        name: 'Infant Optics DXR-8 Pro',
        brand: 'Infant Optics',
        score: 8.8,
        price: '$169',
        priceRange: 'mid-range',
        badge: 'Best Non-WiFi',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Infant Optics DXR-8 Pro video baby monitor with handheld screen',
        reviewSlug: '/products/monitors/infant-optics-dxr-8-pro-review',
        category: 'monitors',
        pros: ['No WiFi — no hacking risk', 'Dedicated parent unit (no phone needed)', 'Interchangeable lenses', 'Long battery life (10 hrs)'],
        cons: ['No smartphone app', 'Lower resolution than WiFi cameras', 'Range limited to ~700 ft'],
        summary: 'The best choice for parents who want a dedicated baby monitor without WiFi security concerns. The DXR-8 Pro\'s FHSS radio signal keeps feeds private and eliminates app dependency.',
        affiliateUrl: 'https://www.amazon.com/dp/B08GFKH2X3?tag=pregnancysprout-20',
        affiliatePrice: '$169',
      },
      {
        rank: 4,
        name: 'Motorola VM75',
        brand: 'Motorola',
        score: 7.9,
        price: '$89',
        priceRange: 'budget',
        badge: 'Best Budget',
        image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Motorola VM75 budget baby monitor',
        reviewSlug: '/products/monitors/motorola-vm75-review',
        category: 'monitors',
        pros: ['Affordable', 'Tilt/pan/zoom', 'Night vision works well', 'Two-way audio'],
        cons: ['No WiFi app', 'Lower build quality', 'Basic sound sensitivity'],
        summary: 'The best value video monitor under $100. The VM75 covers the essentials well — clear night vision, two-way audio, and pan/tilt/zoom — without the subscription fees of smart monitors.',
        affiliateUrl: 'https://www.amazon.com/dp/B09C3S6GRP?tag=pregnancysprout-20',
        affiliatePrice: '$89',
      },
    ],
    buyingGuide: [
      {
        heading: 'WiFi vs. Non-WiFi: Security Matters',
        body: 'WiFi baby monitors transmit over your home network — and potentially the internet. Non-WiFi monitors (like the Infant Optics DXR-8 Pro) use encrypted radio frequencies and cannot be accessed remotely. If privacy is a priority, go non-WiFi.',
      },
      {
        heading: 'Video vs. Audio-Only',
        body: 'Video monitors let you see whether your baby has rolled over or kicked off a blanket before going in. Audio monitors are simpler, cheaper, and have better battery life. For most parents, video is worth the extra cost.',
      },
      {
        heading: 'Wearable Vital Sign Monitors: Realistic Expectations',
        body: 'Monitors like the Owlet Dream Sock track heart rate and oxygen but are not FDA-cleared medical devices. The AAP does not recommend them for healthy term infants. They can provide reassurance but should not replace safe sleep practices.',
      },
    ],
    faq: [
      {
        q: 'Do I need a baby monitor?',
        a: 'If your baby sleeps in a separate room, yes. If you co-sleep or your home is small enough to hear the baby clearly, a monitor is optional. A basic audio monitor is sufficient for most families.',
      },
      {
        q: 'How far does a baby monitor reach?',
        a: 'Non-WiFi monitors typically reach 600–1,000 ft in open air, but walls reduce range significantly. WiFi monitors work anywhere with internet, including from a different building.',
      },
    ],
  },

  'best-baby-carriers-2026': {
    title: 'Best Baby Carriers of 2026 — Structured, Ring Sling & Wrap',
    description: 'We tested structured carriers, ring slings, and stretchy wraps to find the best baby carriers of 2026 for newborns through toddlers.',
    metaDescription: 'Best baby carriers 2026: top-rated structured carriers, wraps, and ring slings tested for ergonomics, comfort, and ease of use from newborn to toddler.',
    slug: 'best-baby-carriers-2026',
    updatedAt: '2026-06-05',
    intro: 'The right baby carrier makes hands-free parenting genuinely practical. The wrong one leaves your back aching and your baby fussing. After testing seven carriers over three months — from newborn through toddler stage — these are our top picks for 2026.',
    products: [
      {
        rank: 1,
        name: 'Ergobaby Omni 360',
        brand: 'Ergobaby',
        score: 9.0,
        price: '$180',
        priceRange: 'mid-range',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Ergobaby Omni 360 structured baby carrier',
        reviewSlug: '/products/baby-carriers/ergobaby-omni-360-review',
        category: 'baby-carriers',
        pros: ['Usable from birth without insert', '4 carry positions', 'Excellent lumbar support', 'High weight limit (45 lbs)'],
        cons: ['Warmer than mesh alternatives', 'Bulkier to pack than wraps'],
        summary: 'The Ergobaby Omni 360 is the most versatile structured carrier we tested. All four carry positions work well, the lumbar support is excellent for long carries, and the high weight limit means it grows with your child.',
        affiliateUrl: 'https://www.amazon.com/dp/B07FLMKXFN?tag=pregnancysprout-20',
        affiliatePrice: '$180',
      },
      {
        rank: 2,
        name: 'BabyBjörn ONE Air',
        brand: 'BabyBjörn',
        score: 8.9,
        price: '$209',
        priceRange: 'premium',
        badge: 'Best for Hot Weather',
        image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'BabyBjörn ONE Air carrier in use',
        reviewSlug: '/products/baby-carriers/babybjorn-one-air-review',
        category: 'baby-carriers',
        pros: ['3D mesh — best breathability tested', 'IHDI-approved ergonomic seat', 'Simplest buckle system', 'No insert needed from birth'],
        cons: ['Lower weight limit (33 lbs)', 'Less padded waist belt'],
        summary: 'The most breathable structured carrier available. For parents in warm climates or who run hot, the 3D mesh makes a meaningful difference. The buckle system is also the simplest of any carrier we tested.',
        affiliateUrl: 'https://www.amazon.com/dp/B07GRPNJQF?tag=pregnancysprout-20',
        affiliatePrice: '$209',
      },
      {
        rank: 3,
        name: 'Tula Free-to-Grow',
        brand: 'Tula',
        score: 8.6,
        price: '$159',
        priceRange: 'mid-range',
        badge: 'Best Value Structured',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Tula Free-to-Grow baby carrier',
        reviewSlug: '/products/baby-carriers/tula-free-to-grow-review',
        category: 'baby-carriers',
        pros: ['No insert needed (newborn-ready)', 'Wide padded waist belt', 'Good back carry support', 'Attractive designs'],
        cons: ['Less breathable than mesh options', 'Adjustment can be fiddly for beginners'],
        summary: 'The Tula Free-to-Grow offers premium comfort at a mid-range price. The wide waist belt and padded shoulder straps make it the best choice for long carries with heavier babies and toddlers.',
        affiliateUrl: 'https://www.amazon.com/dp/B07MKN25F8?tag=pregnancysprout-20',
        affiliatePrice: '$159',
      },
      {
        rank: 4,
        name: 'Solly Baby Wrap',
        brand: 'Solly Baby',
        score: 8.3,
        price: '$82',
        priceRange: 'mid-range',
        badge: 'Best for Newborns',
        image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Parent wearing Solly Baby stretchy wrap with newborn',
        reviewSlug: '/products/baby-carriers/solly-baby-wrap-review',
        category: 'baby-carriers',
        pros: ['Incredibly soft TENCEL fabric', 'Distributes weight evenly', 'Machine washable', 'Great for newborn bonding'],
        cons: ['Learning curve for wrapping', 'Gets warm in summer', 'Not suitable for back carry'],
        summary: 'The Solly Wrap is the best carrier for the fourth trimester. The TENCEL fabric is exceptionally soft against newborn skin, and the even weight distribution makes it comfortable for long stretches. The learning curve is real but short.',
        affiliateUrl: 'https://www.amazon.com/dp/B07TGKL5VF?tag=pregnancysprout-20',
        affiliatePrice: '$82',
      },
    ],
    buyingGuide: [
      {
        heading: 'Structured vs. Wrap vs. Ring Sling',
        body: 'Structured carriers (Ergobaby, BabyBjörn) are buckle-based — easy to put on and take off alone. Wraps (Solly, Moby) distribute weight most evenly but have a learning curve. Ring slings are quick and great for hip carries, but one-shouldered designs tire quickly on long outings.',
      },
      {
        heading: 'The M-Position: Why Ergonomics Matter',
        body: 'The correct carry position keeps baby\'s knees higher than the bottom (the "M-position"), supporting healthy hip development. The International Hip Dysplasia Institute (IHDI) certifies carriers that achieve this. Look for IHDI approval when buying for newborns.',
      },
      {
        heading: 'Weight Limits and Longevity',
        body: 'Most structured carriers support up to 33–45 lbs. If you plan to carry a toddler regularly, prioritise a padded waist belt and high weight limit. Wraps typically max out at 25–35 lbs.',
      },
    ],
    faq: [
      {
        q: 'When can I start using a baby carrier?',
        a: 'Most structured carriers and wraps are suitable from birth (check the manufacturer\'s minimum weight, typically 7–8 lbs). Always follow the TICKS rules: Tight, In view at all times, Close enough to kiss, Keep chin off chest, Supported back.',
      },
      {
        q: 'Are baby carriers safe for newborns?',
        a: 'Yes, when used correctly. The key safety checks: baby\'s airway must be clear and chin off chest, the carrier must support the M-position, and you should be able to see your baby\'s face at all times. IHDI-approved carriers meet these criteria.',
      },
      {
        q: 'Can I use a baby carrier with a C-section scar?',
        a: 'Yes, but wait until you\'re comfortable — typically 6–8 weeks post-surgery. Ensure the waistband sits above or below the incision, not directly on it. Many parents with C-sections find ring slings more comfortable early on as they avoid waist pressure.',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(roundups).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const roundup = roundups[slug];
  if (!roundup) return {};
  return {
    title: roundup.title,
    description: roundup.metaDescription,
    alternates: { canonical: `${siteConfig.url}/products/roundups/${slug}` },
    openGraph: {
      title: roundup.title,
      description: roundup.metaDescription,
      url: `${siteConfig.url}/products/roundups/${slug}`,
      type: 'article',
      modifiedTime: roundup.updatedAt,
    },
  };
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 9 ? 'bg-green-100 text-green-800' : score >= 8 ? 'bg-brand-100 text-brand-800' : 'bg-amber-100 text-amber-800';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold ${color}`}>
      <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
      {score}/10
    </span>
  );
}

function PriceBadge({ range }: { range: RoundupProduct['priceRange'] }) {
  const map = { budget: 'bg-green-50 text-green-700', 'mid-range': 'bg-blue-50 text-blue-700', premium: 'bg-purple-50 text-purple-700' };
  const label = { budget: 'Budget', 'mid-range': 'Mid-Range', premium: 'Premium' };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[range]}`}>{label[range]}</span>;
}

export default async function RoundupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roundup = roundups[slug];
  if (!roundup) notFound();

  const updatedFormatted = new Date(roundup.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: roundup.title, href: `/products/roundups/${slug}` },
      ]} />
      <Breadcrumb items={[
        { name: 'Products', href: '/products' },
        { name: roundup.title, href: `/products/roundups/${slug}` },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
          <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">Best of 2026</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">{roundup.title}</h1>
        <p className="text-gray-600 text-lg mb-3">{roundup.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
            Independently tested
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Updated {updatedFormatted}
          </span>
        </div>
      </div>

      {/* Quick-pick summary box */}
      <div className="mb-10 p-5 bg-brand-50 border border-brand-100 rounded-2xl">
        <p className="text-sm font-semibold text-brand-700 mb-3 uppercase tracking-wide">Quick Picks</p>
        <div className="space-y-2">
          {roundup.products.map((p) => (
            <div key={p.rank} className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-brand-800 w-5 flex-shrink-0">#{p.rank}</span>
                {p.badge && <span className="text-gray-500 flex-shrink-0">{p.badge}:</span>}
                <span className="font-medium text-gray-900 truncate">{p.name}</span>
              </div>
              <span className="text-gray-600 flex-shrink-0">{p.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Intro */}
      <p className="text-gray-700 text-lg leading-relaxed mb-10">{roundup.intro}</p>

      {/* Product list */}
      <div className="space-y-10">
        {roundup.products.map((product) => (
          <article key={product.rank} id={`pick-${product.rank}`} className="border border-gray-200 rounded-2xl overflow-hidden">
            {/* Rank header */}
            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-300">#{product.rank}</span>
                <div>
                  <p className="font-bold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.badge && (
                  <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                <ScoreBadge score={product.score} />
                <PriceBadge range={product.priceRange} />
              </div>
            </div>

            <div className="p-5">
              {/* Image */}
              <div className="aspect-video relative overflow-hidden rounded-xl mb-5 bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Summary */}
              <p className="text-gray-700 mb-5 leading-relaxed">{product.summary}</p>

              {/* Pros/Cons */}
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                  <ul className="space-y-1.5">
                    {product.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Cons</p>
                  <ul className="space-y-1.5">
                    {product.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors text-center flex items-center justify-center gap-2"
                >
                  Check Price on Amazon — {product.affiliatePrice}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href={product.reviewSlug}
                  className="flex-1 sm:flex-none border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors text-center"
                >
                  Full Review
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                We may earn a commission if you buy through our links.{' '}
                <Link href="/affiliate-disclosure" className="hover:underline">Disclosure</Link>.
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Buying guide */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Buying Guide</h2>
        <div className="space-y-6">
          {roundup.buyingGuide.map((section) => (
            <div key={section.heading} className="p-5 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">{section.heading}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {roundup.faq.map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-gray-900 mb-1.5">{q}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
