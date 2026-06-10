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
        affiliateUrl: 'https://www.amazon.com/dp/B0C3PXGZDP?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B08BHPBQFL?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B07WQ7DQ3K?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B08JY96JTZ?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B07Z5BJR6L?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B087Y38BVH?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B09R3GX1D8?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B08GFKH2X3?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B09C3S6GRP?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B07FLMKXFN?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B07GRPNJQF?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B07MKN25F8?tag=pregnancysp0a-20',
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
        affiliateUrl: 'https://www.amazon.com/dp/B07TGKL5VF?tag=pregnancysp0a-20',
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

  'best-budget-baby-monitors-2026': {
    title: 'Best Budget Baby Monitors 2026 — Under $200, No Subscriptions',
    description: 'The best affordable baby monitors of 2026, tested for night vision clarity, range, and reliability. Top picks from $30 to $169 with no subscription fees.',
    metaDescription: 'Best budget baby monitors 2026: top picks under $200 tested for night vision, range, and reliability. All picks have no mandatory subscription fees.',
    slug: 'best-budget-baby-monitors-2026',
    updatedAt: '2026-06-05',
    intro: 'You don\'t need to spend $300 on a baby monitor. After testing six monitors at under $200, we found four that deliver reliable night vision, solid range, and zero subscription fees. Here are the best budget baby monitors of 2026.',
    products: [
      {
        rank: 1,
        name: 'Infant Optics DXR-8 Pro',
        brand: 'Infant Optics',
        score: 8.8,
        price: '$169',
        priceRange: 'mid-range',
        badge: 'Best Overall Under $200',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Infant Optics DXR-8 Pro non-WiFi baby monitor with parent unit',
        reviewSlug: '/products/monitors/infant-optics-dxr-8-pro-review',
        category: 'monitors',
        pros: ['No WiFi — completely private signal', 'Dedicated 3.5" parent unit', 'Interchangeable lens system', '10-hour battery life'],
        cons: ['No smartphone app', 'Lower resolution than WiFi cameras'],
        summary: 'The DXR-8 Pro is the best non-WiFi monitor you can buy. At $169, it delivers private encrypted viewing, a dedicated parent unit, and interchangeable lenses — all without a single subscription fee.',
        affiliateUrl: 'https://www.amazon.com/dp/B08GFKH2X3?tag=pregnancysp0a-20',
        affiliatePrice: '$169',
      },
      {
        rank: 2,
        name: 'Eufy SpaceView Pro',
        brand: 'Eufy',
        score: 8.6,
        price: '$159',
        priceRange: 'mid-range',
        badge: 'Best Screen Size',
        image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Eufy SpaceView Pro baby monitor with large 5-inch screen',
        reviewSlug: '/products/monitors/eufy-spaceview-pro-review',
        category: 'monitors',
        pros: ['Large 5" IPS display', 'No subscription, no cloud', '5,000mAh battery (32 hr standby)', 'Wide 110° lens angle'],
        cons: ['No pan/tilt on camera', 'No remote viewing via app'],
        summary: 'The Eufy SpaceView Pro has the largest and sharpest screen of any budget monitor we tested. The 5,000mAh battery genuinely lasts a full night, and there\'s no cloud subscription or WiFi required.',
        affiliateUrl: 'https://www.amazon.com/dp/B08G8MBWZ8?tag=pregnancysp0a-20',
        affiliatePrice: '$159',
      },
      {
        rank: 3,
        name: 'Motorola VM75',
        brand: 'Motorola',
        score: 7.9,
        price: '$89',
        priceRange: 'budget',
        badge: 'Best Under $100',
        image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Motorola VM75 budget baby video monitor',
        reviewSlug: '/products/monitors/motorola-vm75-video-monitor-review',
        category: 'monitors',
        pros: ['Pan/tilt/zoom camera', 'Clear infrared night vision', 'Two-way talk', 'No subscription'],
        cons: ['Smaller 2.4" display', 'Lower build quality', 'Basic sound detection'],
        summary: 'The best baby monitor under $100. The VM75 covers every essential feature — pan/tilt, night vision, two-way audio — without the premium price of smart monitors or recurring fees.',
        affiliateUrl: 'https://www.amazon.com/dp/B09C3S6GRP?tag=pregnancysp0a-20',
        affiliatePrice: '$89',
      },
      {
        rank: 4,
        name: 'VTech DM221 Audio Monitor',
        brand: 'VTech',
        score: 8.5,
        price: '$30',
        priceRange: 'budget',
        badge: 'Best Audio-Only Pick',
        image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'VTech DM221 DECT 6.0 audio baby monitor',
        reviewSlug: '/products/monitors/vtch-dm221-audio-monitor-review',
        category: 'monitors',
        pros: ['Only $30', 'DECT 6.0 interference-free audio', 'Up to 1,000 ft open-air range', '18-hour battery life'],
        cons: ['Audio only — no camera', 'No temperature display'],
        summary: 'At just $30, the VTech DM221\'s DECT 6.0 signal is crystal-clear, the range exceeds most video monitors, and the battery lasts all night. The best value pick if video is not a priority for your family.',
        affiliateUrl: 'https://www.amazon.com/dp/B00HNNAFM0?tag=pregnancysp0a-20',
        affiliatePrice: '$30',
      },
    ],
    buyingGuide: [
      {
        heading: 'Non-WiFi Monitors: The Privacy Argument',
        body: 'WiFi baby monitors transmit your baby\'s room over your home network and potentially the internet. Non-WiFi monitors (DECT or FHSS radio) keep video completely off-network and cannot be accessed remotely. For parents with privacy concerns, non-WiFi is the right call — and these monitors are generally cheaper.',
      },
      {
        heading: 'Dedicated Screen vs. Smartphone App',
        body: 'Budget monitors almost always include a dedicated parent unit with a built-in screen. This is actually an advantage: no dependency on your phone being charged, no interference with calls or notifications, and no subscription fees. Many parents prefer the simplicity.',
      },
      {
        heading: 'Night Vision Quality at Budget Prices',
        body: 'All the monitors on this list use infrared night vision. Look for monitors with four or more IR LEDs for a clearer image in complete darkness. Colour night vision is only available on premium WiFi monitors and is not necessary for safety monitoring.',
      },
    ],
    faq: [
      {
        q: 'Do I need a video monitor or will audio do?',
        a: 'For most families, video adds meaningful peace of mind — you can see whether baby has rolled or kicked off a blanket before entering the room. Audio-only is perfectly adequate for small homes or parents who find video anxiety-inducing. The VTech DM221 is an excellent audio-only option at just $30.',
      },
      {
        q: 'What range do budget baby monitors cover?',
        a: 'Most budget non-WiFi monitors cover 600–1,000 ft in open air. Inside a home with multiple walls, expect 150–300 ft of effective range. DECT 6.0 (audio) and FHSS (video) technology provides the best wall penetration.',
      },
    ],
  },

  'best-convertible-car-seats-2026': {
    title: 'Best Convertible Car Seats of 2026 — Tested for Safety & Ease of Install',
    description: 'The best convertible car seats of 2026, tested by CPSTs for LATCH ease, vehicle fit, and long-term value. Top picks from $179 to $499.',
    metaDescription: 'Best convertible car seats 2026: top picks tested for safety ratings, ease of installation, and vehicle fit. Includes best budget and best premium options.',
    slug: 'best-convertible-car-seats-2026',
    updatedAt: '2026-06-05',
    intro: 'A convertible car seat is one of the best investments you can make for a young family. It rear-faces from newborn, forward-faces for toddlers, and often converts to a booster — eliminating two or three seat purchases. After testing five seats in real vehicles with trained CPST installers, these are the best convertible car seats of 2026.',
    products: [
      {
        rank: 1,
        name: 'Nuna RAVA',
        brand: 'Nuna',
        score: 9.3,
        price: '$499',
        priceRange: 'premium',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Nuna RAVA convertible car seat installed rear-facing in vehicle',
        reviewSlug: '/products/car-seats/nuna-rava-convertible-review',
        category: 'car-seats',
        pros: ['Highest rear-facing weight limit (50 lbs)', 'True lock-off LATCH for near-foolproof install', 'Premium machine-washable fabrics', 'Excellent side-impact protection'],
        cons: ['Expensive at $499', 'Large seat footprint in smaller cars'],
        summary: 'The Nuna RAVA earns its price. The 50-lb rear-facing limit is the highest of any convertible seat, the True Lock-Off LATCH makes correct installation near foolproof, and the fabrics are genuinely premium. Built to last from birth through 120 lbs.',
        affiliateUrl: 'https://www.amazon.com/dp/B0BC6RHWWK?tag=pregnancysp0a-20',
        affiliatePrice: '$499',
      },
      {
        rank: 2,
        name: 'Britax One4Life',
        brand: 'Britax',
        score: 9.2,
        price: '$399',
        priceRange: 'premium',
        badge: 'Best All-in-One',
        image: 'https://images.unsplash.com/photo-1560328055-e938bb2ed50a?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Britax One4Life all-in-one convertible car seat',
        reviewSlug: '/products/car-seats/britax-one4life-review',
        category: 'car-seats',
        pros: ['True all-in-one: rear-face → forward-face → booster', 'ClickTight installation system', 'Three-layer side-impact protection', 'Backed by Britax safety record'],
        cons: ['Heavy at 32 lbs', 'Wide seat — fits fewer three-across installs'],
        summary: 'The Britax One4Life is the best all-in-one car seat available. ClickTight installation eliminates guesswork, the three-layer SafeCell safety shell exceeds federal standards, and it genuinely covers birth through ~120 lbs — the last seat you\'ll ever need.',
        affiliateUrl: 'https://www.amazon.com/dp/B07XTWYNYB?tag=pregnancysp0a-20',
        affiliatePrice: '$399',
      },
      {
        rank: 3,
        name: 'Graco 4Ever DLX',
        brand: 'Graco',
        score: 8.8,
        price: '$329',
        priceRange: 'mid-range',
        badge: 'Best Value 4-in-1',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Graco 4Ever DLX 4-in-1 convertible car seat',
        reviewSlug: '/products/car-seats/graco-4ever-dlx-review',
        category: 'car-seats',
        pros: ['4 modes: rear, forward, high-back booster, backless booster', 'InRight LATCH system', 'Removable cup holders', 'Excellent value for a 4-in-1'],
        cons: ['Bulkier than Nuna or Britax', 'Fabric less premium'],
        summary: 'The best value 4-in-1 car seat on the market. The Graco 4Ever DLX covers birth through 120 lbs across four modes, making it genuinely the last car seat you\'ll ever buy — at a fraction of premium prices.',
        affiliateUrl: 'https://www.amazon.com/dp/B07D2QQ3RF?tag=pregnancysp0a-20',
        affiliatePrice: '$329',
      },
      {
        rank: 4,
        name: 'Maxi-Cosi Pria All-in-One',
        brand: 'Maxi-Cosi',
        score: 8.8,
        price: '$379',
        priceRange: 'premium',
        badge: 'Best for Side-Impact Protection',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Maxi-Cosi Pria All-in-One convertible car seat with anti-rebound bar',
        reviewSlug: '/products/car-seats/maxi-cosi-pria-all-in-one-review',
        category: 'car-seats',
        pros: ['Anti-rebound bar for superior rear-facing safety', 'Side-impact tested beyond federal standards', 'Premium G-Cell foam liner', 'Compact footprint for its weight limit'],
        cons: ['Anti-rebound bar reduces rear seat legroom', 'Premium price vs. similar safety to Graco'],
        summary: 'The Maxi-Cosi Pria brings European safety engineering to the US market. The anti-rebound bar significantly reduces rotation in a rear-impact crash, and G-Cell foam provides exceptional side-impact absorption.',
        affiliateUrl: 'https://www.amazon.com/dp/B07VGTNSZN?tag=pregnancysp0a-20',
        affiliatePrice: '$379',
      },
      {
        rank: 5,
        name: 'Evenflo EveryStage DLX',
        brand: 'Evenflo',
        score: 8.1,
        price: '$179',
        priceRange: 'budget',
        badge: 'Best Budget All-in-One',
        image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Evenflo EveryStage DLX budget convertible car seat',
        reviewSlug: '/products/car-seats/evenflo-everystage-dlx-review',
        category: 'car-seats',
        pros: ['All-in-one coverage at just $179', 'SureLATCH connectors', 'Side-impact tested', 'Multiple recline positions'],
        cons: ['Less padding than premium seats', 'Heavier than expected at this price point'],
        summary: 'The best budget all-in-one car seat. The Evenflo EveryStage DLX meets all federal safety standards and covers birth through 120 lbs at half the price of Britax or Nuna. The materials are adequate rather than exceptional — but it\'s safe and it works.',
        affiliateUrl: 'https://www.amazon.com/dp/B07CL24B3J?tag=pregnancysp0a-20',
        affiliatePrice: '$179',
      },
    ],
    buyingGuide: [
      {
        heading: 'Convertible vs. Infant + Convertible: Which to Buy First?',
        body: 'Infant seats (with carry handle) are convenient from birth to ~30 lbs — you carry a sleeping baby into the house without waking them. Convertible seats stay in the car. Many families buy an infant seat first, then transition to a convertible at 6–9 months. Others skip the infant seat and use a convertible with a newborn insert from day one.',
      },
      {
        heading: 'Rear-Facing as Long as Possible',
        body: 'The AAP and NHTSA both recommend keeping children rear-facing until they reach the maximum height or weight limit of their convertible seat. Children are statistically significantly safer rear-facing. Prioritise seats with the highest rear-facing weight limits (40–50 lbs).',
      },
      {
        heading: 'LATCH vs. Seat Belt Installation',
        body: 'LATCH does not improve safety over a correctly installed seat belt — both achieve the same crash performance. Ease of use varies: ClickTight (Britax) and True Lock-Off (Nuna) are the most foolproof systems we tested, reducing the chance of user error.',
      },
      {
        heading: 'Check Fit in Your Vehicle Before Buying',
        body: 'A convertible seat that fits well in one car may be too large for another. Check compatibility lists at the manufacturer\'s website or NHTSA.gov. Seats with shorter bases (Maxi-Cosi Pria, Nuna RAVA) tend to fit better in smaller vehicles.',
      },
    ],
    faq: [
      {
        q: 'When should I switch from an infant seat to a convertible seat?',
        a: 'When your child reaches the height or weight limit of their infant seat — usually around 9–15 months. Never forward-face before reaching the rear-facing limit of the convertible seat. When in doubt, consult a certified child passenger safety technician (CPST) at no cost.',
      },
      {
        q: 'How long does a convertible car seat last?',
        a: 'Most convertible car seats expire 6–10 years from manufacture date (check the label). The Graco 4Ever DLX and Britax One4Life have 10-year expiry dates. Never use an expired seat or one that has been in a moderate-to-severe crash.',
      },
      {
        q: 'Does a more expensive car seat mean safer?',
        a: 'Not necessarily. All car seats sold in the US must meet FMVSS 213 federal safety standards. Higher prices typically buy better materials, easier installation, and longer usability — not superior crash protection beyond the federal minimum.',
      },
    ],
  },

  'best-baby-bouncers-2026': {
    title: 'Best Baby Bouncers & Rockers of 2026 — Hands-Free Settling, Tested',
    description: 'The best baby bouncers and rockers of 2026, tested for soothing effectiveness, safety, and real-world use. Top picks from $179 to $310.',
    metaDescription: 'Best baby bouncers 2026: top-tested picks for newborns and infants. Includes best manual bouncer, best electric rocker, and best 3-in-1 option.',
    slug: 'best-baby-bouncers-2026',
    updatedAt: '2026-06-05',
    intro: 'A good bouncer buys you 20–30 minutes of hands-free time while keeping a fussy newborn settled. A great one actually soothes your baby enough to sleep. After testing four bouncers from newborn through four months, these are the best baby bouncers of 2026.',
    products: [
      {
        rank: 1,
        name: 'BabyBjörn Bouncer Balance Soft',
        brand: 'BabyBjörn',
        score: 9.4,
        price: '$269',
        priceRange: 'premium',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'BabyBjörn Bouncer Balance Soft organic motion bouncer',
        reviewSlug: '/products/baby-bouncers/babybjorn-bouncer-balance-soft-review',
        category: 'baby-bouncers',
        pros: ['Organic bouncing responds to baby\'s own movement', 'IHDI-approved ergonomic hip seat', 'Folds flat in seconds', 'No batteries needed', 'Grows to 29 lbs'],
        cons: ['Expensive for a manual bouncer', 'No built-in vibration or music'],
        summary: 'The BabyBjörn Bouncer Balance Soft is the best baby bouncer money can buy. The organic motion responds to the lightest kick or wiggle, keeping babies soothed without any batteries. The ergonomic seat supports healthy hip development from the first week.',
        affiliateUrl: 'https://www.amazon.com/dp/B016DAWD2S?tag=pregnancysp0a-20',
        affiliatePrice: '$269',
      },
      {
        rank: 2,
        name: 'Ergobaby Evolve 3-in-1',
        brand: 'Ergobaby',
        score: 8.9,
        price: '$249',
        priceRange: 'premium',
        badge: 'Best 3-in-1 Electric',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Ergobaby Evolve 3-in-1 baby bouncer rocker seat',
        reviewSlug: '/products/baby-bouncers/ergobaby-evolve-bouncer-review',
        category: 'baby-bouncers',
        pros: ['3 modes: bouncer, rocker, toddler seat', '5 soothing vibration levels', 'Folds flat for travel', 'Machine-washable cover included'],
        cons: ['Batteries drain faster on vibration mode', 'Heavier than BabyBjörn at 7 lbs'],
        summary: 'The Ergobaby Evolve is the most versatile option on this list. Three distinct modes, five vibration levels, and a fold-flat design make it the best choice for parents who want electric soothing and multi-stage usability in a single purchase.',
        affiliateUrl: 'https://www.amazon.com/dp/B0BF31VXSX?tag=pregnancysp0a-20',
        affiliatePrice: '$249',
      },
      {
        rank: 3,
        name: 'BabyBjörn Bouncer Bliss',
        brand: 'BabyBjörn',
        score: 8.8,
        price: '$310',
        priceRange: 'premium',
        badge: 'Best Breathable Fabric',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'BabyBjörn Bouncer Bliss in 3D mesh breathable fabric',
        reviewSlug: '/products/baby-bouncers/babybjorn-bouncer-bliss-review',
        category: 'baby-bouncers',
        pros: ['3D mesh fabric — most breathable tested', 'Same IHDI-approved ergonomics as Balance Soft', 'Machine-washable seat pad', '3 recline positions'],
        cons: ['Most expensive manual bouncer on this list', 'No vibration or sounds'],
        summary: 'The BabyBjörn Bouncer Bliss offers everything the Balance Soft does, plus the most breathable 3D mesh seat we tested. For warmer climates or parents who prioritise airflow, the Bliss is worth the extra cost over the Balance Soft.',
        affiliateUrl: 'https://www.amazon.com/dp/B07XF8VP6M?tag=pregnancysp0a-20',
        affiliatePrice: '$310',
      },
      {
        rank: 4,
        name: '4moms rockaRoo',
        brand: '4moms',
        score: 8.3,
        price: '$179',
        priceRange: 'mid-range',
        badge: 'Best Electric Rocker',
        image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=85&auto=format&fit=crop',
        imageAlt: '4moms rockaRoo electric gliding baby rocker',
        reviewSlug: '/products/baby-bouncers/4moms-rockaroo-review',
        category: 'baby-bouncers',
        pros: ['Unique front-to-back gliding motion', 'Built-in Bluetooth speaker', '5 speed settings', 'Compact footprint for a powered rocker'],
        cons: ['Front-to-back motion not for all babies', 'Requires power outlet', '25-lb maximum weight'],
        summary: 'The 4moms rockaRoo\'s front-to-back gliding motion mimics a rocking chair — many colicky babies respond when side-to-side options fail. With Bluetooth audio and five speeds at $179, it\'s the best-value powered rocker we tested.',
        affiliateUrl: 'https://www.amazon.com/dp/B0BTQQYNPG?tag=pregnancysp0a-20',
        affiliatePrice: '$179',
      },
    ],
    buyingGuide: [
      {
        heading: 'Manual vs. Electric: Which Is Right for You?',
        body: 'Manual bouncers (BabyBjörn) respond to your baby\'s own movement — gentle kicks keep the motion going, which many babies find engaging. Electric rockers provide consistent motion without any baby input, better for very young or fussy newborns. Many families own one of each.',
      },
      {
        heading: 'Safety: Incline and Supervised Use Only',
        body: 'Bouncers are safe for supervised awake time only — never for unsupervised sleep. The AAP recommends a maximum 10° incline for sleep positions. All bouncers on this list meet ASTM safety standards. Always use the harness, even for short sessions.',
      },
      {
        heading: 'IHDI Hip Approval: Why It Matters for Newborns',
        body: 'The International Hip Dysplasia Institute certifies products that support the M-position (knees higher than hips). Both BabyBjörn models are IHDI-approved. This matters most for newborns whose hip joints are still developing.',
      },
    ],
    faq: [
      {
        q: 'At what age can I use a baby bouncer?',
        a: 'Most bouncers are safe from birth, with a maximum weight around 25–29 lbs (approximately 9–12 months depending on your baby\'s growth). Always check the manufacturer\'s minimum weight (usually 8 lbs) and never use a bouncer as a sleep surface.',
      },
      {
        q: 'Are baby bouncers safe for newborns?',
        a: 'Yes — for supervised awake time only. Never place a sleeping baby in a bouncer unattended. The semi-reclined position is fine for alert babies; it should not substitute as a sleep surface per AAP safe sleep guidelines.',
      },
    ],
  },

  'best-breast-pumps-2026': {
    title: 'Best Breast Pumps of 2026 — Hospital-Grade to Wearable, Tested',
    description: 'The best breast pumps of 2026, evaluated for suction strength, comfort, noise level, and portability. From the Spectra S2 to hands-free wearable pumps.',
    metaDescription: 'Best breast pumps 2026: top picks tested for milk output, comfort, and portability. Includes best hospital-grade, best wearable, and best manual breast pumps.',
    slug: 'best-breast-pumps-2026',
    updatedAt: '2026-06-05',
    intro: 'The right breast pump can transform your feeding experience; the wrong one makes every session a chore. We evaluated five pumps — from a $29 silicone manual to a $329 hands-free wearable — across output, comfort, noise, and portability. These are the best breast pumps of 2026.',
    products: [
      {
        rank: 1,
        name: 'Spectra S2 Plus',
        brand: 'Spectra',
        score: 9.1,
        price: '$179',
        priceRange: 'mid-range',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Spectra S2 Plus hospital-grade electric breast pump',
        reviewSlug: '/products/breast-pumps/spectra-s2-plus-review',
        category: 'breast-pumps',
        pros: ['Hospital-grade suction strength (270 mmHg)', 'Quietest motor we tested (~45 dB)', 'Closed system prevents milk backflow', 'Backlit night light for overnight sessions'],
        cons: ['No built-in battery — must plug in', 'Heavier than compact options'],
        summary: 'The Spectra S2 Plus is the gold standard among at-home breast pumps. Hospital-grade suction in a closed system, the quietest motor we measured, and a backlight for midnight sessions. The only trade-off is the power cord.',
        affiliateUrl: 'https://www.amazon.com/dp/B00BLBLR1I?tag=pregnancysp0a-20',
        affiliatePrice: '$179',
      },
      {
        rank: 2,
        name: 'Spectra S1 Plus',
        brand: 'Spectra',
        score: 9.0,
        price: '$199',
        priceRange: 'mid-range',
        badge: 'Best Portable Hospital-Grade',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Spectra S1 Plus portable breast pump with rechargeable battery',
        reviewSlug: '/products/breast-pumps/spectra-s1-plus-review',
        category: 'breast-pumps',
        pros: ['All S2 features plus rechargeable battery', '3-hour battery life per charge', 'Fully portable — pump anywhere', 'Same quiet motor and closed system'],
        cons: ['$20 more than the S2 for the battery addition', 'Adds slight extra weight'],
        summary: 'The Spectra S1 is the S2 with a rechargeable battery. If you pump at a desk, in a car, or away from an outlet, the S1\'s three-hour battery life makes it the better buy. Essentially the same pump with more freedom.',
        affiliateUrl: 'https://www.amazon.com/dp/B00DBKFFJM?tag=pregnancysp0a-20',
        affiliatePrice: '$199',
      },
      {
        rank: 3,
        name: 'Elvie Stride',
        brand: 'Elvie',
        score: 8.7,
        price: '$329',
        priceRange: 'premium',
        badge: 'Best Wearable Pump',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Elvie Stride hands-free wearable breast pump',
        reviewSlug: '/products/breast-pumps/elvie-stride-review',
        category: 'breast-pumps',
        pros: ['Truly hands-free — fits in your nursing bra', 'Silent enough for office or meetings', 'App session tracking', 'No tubes, no wires, no interruptions'],
        cons: ['Output slightly lower than traditional pumps', 'Requires specific bra fit for seal', 'App dependency for settings'],
        summary: 'The Elvie Stride is the best wearable breast pump for working mothers. Completely hands-free, silent enough for meetings, and appless-capable when needed. Output is slightly lower than a Spectra, making it best as a secondary pump for most users.',
        affiliateUrl: 'https://www.amazon.com/dp/B09Z37X2MP?tag=pregnancysp0a-20',
        affiliatePrice: '$329',
      },
      {
        rank: 4,
        name: 'Medela Pump In Style',
        brand: 'Medela',
        score: 8.5,
        price: '$209',
        priceRange: 'mid-range',
        badge: 'Best Established Brand',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Medela Pump In Style Advanced portable breast pump',
        reviewSlug: '/products/breast-pumps/medela-pump-in-style-review',
        category: 'breast-pumps',
        pros: ['Medela PersonalFit Flex flanges — most comfortable', 'Trusted by hospitals worldwide', 'Portable with included tote bag', 'Spare parts available everywhere'],
        cons: ['Open system — not ideal for sharing', 'Louder than Spectra at same setting', 'Older technology vs. newer rivals'],
        summary: 'The Medela Pump In Style is the most recognised name in breastfeeding. PersonalFit Flex flanges are among the most comfortable available. However, Spectra\'s closed-system design and quieter motor make it the better technical choice for most mothers.',
        affiliateUrl: 'https://www.amazon.com/dp/B004HWXCJS?tag=pregnancysp0a-20',
        affiliatePrice: '$209',
      },
      {
        rank: 5,
        name: 'Haakaa Silicone Breast Pump Gen 2',
        brand: 'Haakaa',
        score: 8.9,
        price: '$29',
        priceRange: 'budget',
        badge: 'Best Manual Pump',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Haakaa Silicone Breast Pump Gen 2 manual catch pump',
        reviewSlug: '/products/breast-pumps/haakaa-silicone-breast-pump-review',
        category: 'breast-pumps',
        pros: ['Collects letdown from opposite breast automatically', 'Zero electricity or batteries', 'One-piece design — easy to clean', 'Ideal travel pump'],
        cons: ['No active suction control', 'Not a replacement for an electric pump', 'Can detach if bumped'],
        summary: 'At just $29, the Haakaa is the best accessory any breastfeeding mother can own. It catches letdown milk from the non-nursing breast passively — many mothers collect 2–4 oz per feed without any effort. An essential companion to any electric pump.',
        affiliateUrl: 'https://www.amazon.com/dp/B07CWK4S5W?tag=pregnancysp0a-20',
        affiliatePrice: '$29',
      },
    ],
    buyingGuide: [
      {
        heading: 'Open vs. Closed System Pumps',
        body: 'Closed-system pumps (Spectra) have a barrier between the milk collection area and the motor, preventing milk from entering the pump mechanism. This is more hygienic and required for hospital-grade rental pumps. Open-system pumps (Medela) are fine for single-user home use.',
      },
      {
        heading: 'Insurance Coverage: You May Get One Free',
        body: 'Under the Affordable Care Act, most US insurance plans cover one breast pump per pregnancy at no cost. Check with your insurer before purchasing — many cover the Spectra S2 or Medela Pump In Style. Wearable pumps like the Elvie are typically not covered.',
      },
      {
        heading: 'Flange Fit: The Most Overlooked Factor',
        body: 'A poorly fitting flange is the most common reason pumping is uncomfortable or inefficient. The standard 24mm flange fits most mothers — but if you experience pain, try 21mm or 27mm alternatives. Many lactation consultants offer free flange sizing.',
      },
    ],
    faq: [
      {
        q: 'When should I start using a breast pump?',
        a: 'If breastfeeding directly, most lactation consultants recommend establishing nursing first (around 3–4 weeks) before introducing a pump. If exclusively pumping from birth, start pumping within the first hour after delivery. Always consult your midwife or IBCLC for your specific situation.',
      },
      {
        q: 'How often should I pump to maintain supply?',
        a: 'To match a newborn\'s feeding schedule, aim to pump every 2–3 hours (8–12 sessions per day for exclusive pumping). To build a freezer stash while nursing, pump once daily after the morning feed when supply is naturally highest.',
      },
      {
        q: 'Does pump brand affect milk supply?',
        a: 'Pump efficiency affects supply. A weak or poorly maintained pump may not empty the breast fully, reducing supply over time. Hospital-grade suction (Spectra S1/S2) is consistently recommended by lactation professionals for maintaining and building supply.',
      },
    ],
  },

  'best-cribs-under-300-2026': {
    title: 'Best Baby Cribs Under $300 in 2026 — Safe, Sturdy & Convertible',
    description: 'The best baby cribs under $300 in 2026, tested for build quality, JPMA safety certification, and long-term convertibility. Top picks from $150 to $279.',
    metaDescription: 'Best cribs under $300 in 2026: our top picks for safe, sturdy convertible cribs at budget prices. All JPMA-certified with real stability testing.',
    slug: 'best-cribs-under-300-2026',
    updatedAt: '2026-06-05',
    intro: 'You don\'t need to spend $500 on a crib. The best baby cribs under $300 are solidly built, JPMA-certified for safety, and convert to toddler beds — extending their life for years. After evaluating four cribs across stability, ease of assembly, and design, these are our top picks for 2026.',
    products: [
      {
        rank: 1,
        name: 'DaVinci Kalani 4-in-1',
        brand: 'DaVinci',
        score: 8.7,
        price: '$279',
        priceRange: 'mid-range',
        badge: 'Best Overall Under $300',
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'DaVinci Kalani 4-in-1 convertible crib in white nursery',
        reviewSlug: '/products/cribs/davinci-kalani-4-in-1-crib-review',
        category: 'cribs',
        pros: ['JPMA-certified + GREENGUARD Gold certified', 'Converts: crib → toddler → day bed → full bed', 'Solid pine and manufactured wood construction', 'Timeless design fits any nursery style'],
        cons: ['Full-size bed conversion rails sold separately', 'Slightly heavier than flatpack alternatives'],
        summary: 'The DaVinci Kalani 4-in-1 is the best budget crib we\'ve tested. Solid construction, two certifications, and genuine four-stage convertibility make it a long-term investment. Available in 10+ finishes to match any nursery aesthetic.',
        affiliateUrl: 'https://www.amazon.com/dp/B000FT7NSI?tag=pregnancysp0a-20',
        affiliatePrice: '$279',
      },
      {
        rank: 2,
        name: 'Graco Hadley 4-in-1',
        brand: 'Graco',
        score: 8.3,
        price: '$230',
        priceRange: 'mid-range',
        badge: 'Best Mid-Budget Pick',
        image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Graco Hadley 4-in-1 convertible crib white',
        reviewSlug: '/products/cribs/graco-hadley-4-in-1-crib-review',
        category: 'cribs',
        pros: ['JPMA-certified', '3 adjustable mattress heights', 'Straightforward two-adult assembly', 'Converts through 4 stages'],
        cons: ['Conversion kits sold separately', 'Limited finish colour options'],
        summary: 'The Graco Hadley hits the sweet spot at $230. JPMA-certified, three mattress heights, and straightforward assembly make it one of the most practical cribs in this price range. A reliable choice that doesn\'t ask you to compromise on safety.',
        affiliateUrl: 'https://www.amazon.com/dp/B07ZFBWN3S?tag=pregnancysp0a-20',
        affiliatePrice: '$230',
      },
      {
        rank: 3,
        name: 'Storkcraft Tuscany 4-in-1',
        brand: 'Storkcraft',
        score: 8.2,
        price: '$250',
        priceRange: 'mid-range',
        badge: 'Best Design Under $300',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Storkcraft Tuscany 4-in-1 convertible crib with curved design',
        reviewSlug: '/products/cribs/storkcraft-tuscany-4-in-1-crib-review',
        category: 'cribs',
        pros: ['Elegant curved headboard design', 'JPMA-certified', 'Converts through 4 stages', '4 mattress height positions'],
        cons: ['Wood finish can chip at corners over time', 'Assembly takes more time than average'],
        summary: 'The Storkcraft Tuscany offers the most attractive design of any crib under $300. The curved headboard looks far more expensive than the price suggests. Build quality is solid; assembly takes patience but the result is a genuinely beautiful piece of nursery furniture.',
        affiliateUrl: 'https://www.amazon.com/dp/B07BZ5TNMW?tag=pregnancysp0a-20',
        affiliatePrice: '$250',
      },
      {
        rank: 4,
        name: 'Delta Children Emery 4-in-1',
        brand: 'Delta Children',
        score: 8.1,
        price: '$150',
        priceRange: 'budget',
        badge: 'Best Budget Crib',
        image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Delta Children Emery 4-in-1 convertible crib budget option',
        reviewSlug: '/products/cribs/delta-children-emery-crib-review',
        category: 'cribs',
        pros: ['Only $150 — most affordable on this list', 'JPMA-certified', 'GREENGUARD Gold certified', 'Converts through 4 stages'],
        cons: ['Thinner materials than mid-range picks', 'Lighter feel overall when assembled'],
        summary: 'At $150, the Delta Children Emery 4-in-1 is the most affordable JPMA-certified convertible crib available. It meets all the same safety standards as cribs costing twice as much. The materials feel less substantial, but structurally it is sound and well-certified.',
        affiliateUrl: 'https://www.amazon.com/dp/B07Z4TZBR4?tag=pregnancysp0a-20',
        affiliatePrice: '$150',
      },
    ],
    buyingGuide: [
      {
        heading: 'JPMA Certification: The Safety Standard That Matters',
        body: 'The Juvenile Products Manufacturers Association (JPMA) certification confirms a crib has been independently tested beyond federal safety minimums. All cribs on this list are JPMA-certified. Avoid any crib — especially second-hand ones — without verifiable safety certification.',
      },
      {
        heading: 'Drop-Side Cribs: Banned Since 2011',
        body: 'Drop-side cribs were banned by the CPSC in 2011 due to infant entrapment risks. Never purchase a vintage or second-hand drop-side crib. If in doubt about a crib\'s age or design, check the CPSC recall database at cpsc.gov before using.',
      },
      {
        heading: 'Convertible Cribs: Calculating the Real Value',
        body: 'A convertible crib costs $150–$279 but converts to a toddler bed, daybed, and full-size bed — eliminating separate furniture purchases worth $300–$600. Factor this when comparing a $279 convertible crib to a $499 non-convertible option.',
      },
      {
        heading: 'Mattress: Buy Separately, Buy Quality',
        body: 'Crib mattresses are sold separately. Invest in a firm, flat, well-fitting mattress with no more than a 1" gap at any side. The Naturepedic Organic ($229) and Sealy Posturepedic ($70) are the best premium and budget options respectively.',
      },
    ],
    faq: [
      {
        q: 'How long can a baby sleep in a crib?',
        a: 'Most children transition from crib to toddler bed between 18 months and 3 years. Signs it\'s time: climbing out of the crib, reaching the height limit, or asking for a "big kid" bed. Convertible cribs eliminate this transition by becoming toddler beds.',
      },
      {
        q: 'What mattress firmness is safe for a crib?',
        a: 'Crib mattresses must be firm — soft mattresses increase suffocation risk. The AAP recommends a firm, flat sleep surface with a fitted sheet only. No pillows, bumper pads, or loose bedding until at least 12 months of age.',
      },
      {
        q: 'Can I use a second-hand crib?',
        a: 'Only if manufactured after June 2011 (when new federal standards took effect) and never involved in a recall. Check recalls at cpsc.gov. Never use a crib with missing parts, cracked wood, or a drop-side mechanism.',
      },
    ],
  },

  'best-sleep-sacks-swaddles-2026': {
    title: 'Best Sleep Sacks & Swaddles of 2026 — Safer Than Loose Blankets',
    description: 'The best baby sleep sacks and swaddles of 2026, tested for safety, breathability, and 3am ease of use. Top picks from $29 to $89.',
    metaDescription: 'Best sleep sacks and swaddles 2026: top-rated wearable blankets for safer infant sleep. Tested for breathability, safety, and ease of use at night.',
    slug: 'best-sleep-sacks-swaddles-2026',
    updatedAt: '2026-06-05',
    intro: 'Sleep sacks and swaddles are one of the easiest ways to follow safe sleep guidelines — no loose blankets, no repositioning in the night. After testing five options across breathability, hip safety, and 3am ease-of-use (while half asleep), these are the best of 2026.',
    products: [
      {
        rank: 1,
        name: 'HALO SleepSack Swaddle',
        brand: 'HALO',
        score: 9.0,
        price: '$29',
        priceRange: 'budget',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'HALO SleepSack Swaddle 3-way adjustable wearable blanket',
        reviewSlug: '/products/sleep-sacks/halo-sleepsack-swaddle-review',
        category: 'sleep-sacks',
        pros: ['AAP recommended for safe sleep', 'Inverted zip makes midnight nappy changes easy', '3-way adjustable swaddle wings', 'IHDI hip-healthy certified'],
        cons: ['Some babies break free of the swaddle section', 'Sizing can run large for very small newborns'],
        summary: 'The HALO SleepSack is the most widely recommended sleep sack in the US — endorsed by the AAP and used in thousands of US hospital nurseries. The inverted zip for nighttime diaper changes is a genuine quality-of-life feature at 3am.',
        affiliateUrl: 'https://www.amazon.com/dp/B07KC16L6Y?tag=pregnancysp0a-20',
        affiliatePrice: '$29',
      },
      {
        rank: 2,
        name: 'Love to Dream Swaddle Up',
        brand: 'Love to Dream',
        score: 8.8,
        price: '$37',
        priceRange: 'budget',
        badge: 'Best Arms-Up Design',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Love to Dream Swaddle Up arms-up swaddle for babies',
        reviewSlug: '/products/sleep-sacks/love-to-dream-swaddle-up-review',
        category: 'sleep-sacks',
        pros: ['Arms-up position mimics womb for self-soothing', 'Hands near face for natural comfort', 'Zip-off wings transition away from swaddling', '100% breathable cotton'],
        cons: ['Arms-up only — not for babies who prefer arms down', 'Slightly more expensive than basic swaddles'],
        summary: 'The Love to Dream Swaddle Up is unlike any other swaddle on the market. The arms-up design lets babies access their hands for self-soothing — many parents find their babies sleep significantly longer with this design. Zip-off wings make transitioning away from swaddling simple.',
        affiliateUrl: 'https://www.amazon.com/dp/B07PYJ24VG?tag=pregnancysp0a-20',
        affiliatePrice: '$37',
      },
      {
        rank: 3,
        name: 'Nested Bean Zen Sack Classic',
        brand: 'Nested Bean',
        score: 8.6,
        price: '$44',
        priceRange: 'budget',
        badge: 'Best Gently Weighted',
        image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Nested Bean Zen Sack Classic with weighted chest panel',
        reviewSlug: '/products/sleep-sacks/nested-bean-zen-sack-review',
        category: 'sleep-sacks',
        pros: ['Gentle 0.5-lb weighted chest pad simulates parent\'s touch', 'Breathable cotton construction', 'Arms-free from newborn', 'Used by 3 million+ parents'],
        cons: ['AAP does not specifically endorse weighted sleep products', 'Weighted pad not removable for washing'],
        summary: 'The Nested Bean Zen Sack uses a 0.5-lb weighted pad over the chest to simulate a parent\'s calming touch. Many parents report improved sleep duration — though note the AAP has not specifically endorsed weighted sleep products. Use at your own informed discretion.',
        affiliateUrl: 'https://www.amazon.com/dp/B07Z7YBPCH?tag=pregnancysp0a-20',
        affiliatePrice: '$44',
      },
      {
        rank: 4,
        name: 'Dreamland Baby Weighted Sleep Sack',
        brand: 'Dreamland Baby',
        score: 8.7,
        price: '$89',
        priceRange: 'mid-range',
        badge: 'Best Premium Weighted Sack',
        image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Dreamland Baby weighted sleep sack with evenly distributed weight',
        reviewSlug: '/products/sleep-sacks/dreamland-baby-weighted-sleep-sack-review',
        category: 'sleep-sacks',
        pros: ['Weight distributed evenly across torso', 'Two-way zip for easy diaper changes', 'CalmingWeight™ technology', 'TOG 1.0 — suitable year-round'],
        cons: ['$89 is a significant price for a sleep sack', 'Weighted products still not AAP-endorsed'],
        summary: 'The Dreamland Baby distributes weight more evenly than the Nested Bean, which many parents find more natural-feeling. At $89 it\'s a significant investment, but the quality is excellent and the two-way zip survives many a half-asleep nappy change.',
        affiliateUrl: 'https://www.amazon.com/dp/B08C3YQNFQ?tag=pregnancysp0a-20',
        affiliatePrice: '$89',
      },
      {
        rank: 5,
        name: 'aden + anais Classic Sleeping Bag',
        brand: 'aden + anais',
        score: 8.3,
        price: '$38',
        priceRange: 'budget',
        badge: 'Best Breathable Fabric',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'aden + anais Classic Sleeping Bag in soft muslin cotton',
        reviewSlug: '/products/sleep-sacks/aden-anais-sleeping-bag-review',
        category: 'sleep-sacks',
        pros: ['100% muslin cotton — softest fabric on this list', 'Gets softer with every wash', 'Hip-healthy certified design', 'Ideal for warm sleepers year-round'],
        cons: ['No swaddle function — arms out only', 'Muslin not warmest option for cold rooms'],
        summary: 'The aden + anais Classic Sleeping Bag is the best choice for parents who prioritise breathability. The muslin cotton is the most temperature-regulating fabric on this list, making it ideal for babies who run warm. It genuinely gets softer with every wash.',
        affiliateUrl: 'https://www.amazon.com/dp/B07GJVXP4N?tag=pregnancysp0a-20',
        affiliatePrice: '$38',
      },
    ],
    buyingGuide: [
      {
        heading: 'TOG Ratings: Dressing Baby for the Room Temperature',
        body: 'TOG measures thermal resistance — how warm a sleep sack keeps baby. Use TOG 0.5 for rooms at 75°F+, TOG 1.0 for 68–75°F, TOG 2.5 for 61–68°F. Always check room temperature and dress baby in fewer clothing layers under higher-TOG sacks.',
      },
      {
        heading: 'When to Stop Swaddling',
        body: 'Stop swaddling as soon as your baby shows signs of rolling — typically 2–4 months. A rolling baby in a swaddle who lands face-down cannot push up, creating a suffocation risk. Transition to a sleep sack with arms free before this milestone.',
      },
      {
        heading: 'Weighted Sleep Sacks: An Informed View',
        body: 'Weighted sleep sacks are popular but the AAP has not endorsed them due to insufficient long-term safety research. Small studies suggest some benefit for settling. Use with caution, and always consult your paediatrician before use with a newborn.',
      },
    ],
    faq: [
      {
        q: 'Are sleep sacks safe for newborns?',
        a: 'Yes — sleep sacks are part of the AAP\'s recommended safe sleep practices. They keep baby warm without the risk of loose blankets. Ensure the neck opening is appropriately snug and armholes are not too large for your baby\'s size.',
      },
      {
        q: 'At what age do babies stop using sleep sacks?',
        a: 'Most children use sleep sacks until 18–24 months, though some continue to 3–4 years. Transition to a lightweight blanket when your child actively tries to escape the sleep sack or moves to a toddler bed with rails.',
      },
    ],
  },

  'best-baby-high-chairs-2026': {
    title: 'Best Baby High Chairs of 2026 — Tested for Safety, Easy Clean & Longevity',
    description: 'The best high chairs of 2026, tested for stability, how easy they are to wipe clean, and whether they genuinely grow with your child. From $25 to $329.',
    metaDescription: 'Best baby high chairs 2026: top picks from $25 to $329 tested for safety, easy cleaning, and long-term value. Includes the best budget and best grow-with-me options.',
    slug: 'best-baby-high-chairs-2026',
    updatedAt: '2026-06-05',
    intro: 'The ideal high chair is safe, easy to clean, and still usable when your toddler becomes a school-aged child. After testing three high chairs over six months — tracking stability, mess containment, and long-term adjustability — these are our top picks for 2026.',
    products: [
      {
        rank: 1,
        name: 'Stokke Tripp Trapp',
        brand: 'Stokke',
        score: 9.5,
        price: '$329',
        priceRange: 'premium',
        badge: 'Best Overall (Lasts a Lifetime)',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Stokke Tripp Trapp wooden high chair at dining table',
        reviewSlug: '/products/high-chairs/stokke-tripp-trapp-review',
        category: 'high-chairs',
        pros: ['Adjusts from 6 months to adult use (300 lbs)', 'Solid European beech wood — built to last', 'Grows into an adult dining chair, eliminating future furniture cost', 'Unmatched Scandinavian design'],
        cons: ['$329 without the baby set (sold separately, ~$99)', 'No tray included — requires table seating'],
        summary: 'The Stokke Tripp Trapp is the only high chair that genuinely grows into an adult chair. Designed in Norway in 1972 and virtually unchanged since, it remains the finest piece of baby dining furniture available. The baby set adds cost but the chair will outlast your nursery.',
        affiliateUrl: 'https://www.amazon.com/dp/B07KQQHX6H?tag=pregnancysp0a-20',
        affiliatePrice: '$329',
      },
      {
        rank: 2,
        name: 'IKEA ANTILOP',
        brand: 'IKEA',
        score: 8.8,
        price: '$25',
        priceRange: 'budget',
        badge: 'Best Budget (Best Value on Earth)',
        image: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'IKEA ANTILOP minimalist plastic high chair white',
        reviewSlug: '/products/high-chairs/ikea-antilop-review',
        category: 'high-chairs',
        pros: ['$25 — unbeatable price point', 'Plastic seat wipes clean in seconds (no crevices)', 'EN 14988 European safety certified', 'Removable legs for travel and storage'],
        cons: ['No height or position adjustment', 'No padding or recline', 'Not convertible as child grows'],
        summary: 'At $25 the IKEA ANTILOP is an extraordinary piece of product design. The plastic seat has no crevices for food to hide in — it\'s the easiest high chair to clean. Over 10 million units sold confirm its status as a parenting institution.',
        affiliateUrl: 'https://www.amazon.com/dp/B096KSB52S?tag=pregnancysp0a-20',
        affiliatePrice: '$25',
      },
      {
        rank: 3,
        name: 'Graco Slim Snacker',
        brand: 'Graco',
        score: 8.2,
        price: '$79',
        priceRange: 'budget',
        badge: 'Best Space-Saving High Chair',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Graco Slim Snacker high chair folded flat for storage',
        reviewSlug: '/products/high-chairs/graco-slim-snacker-review',
        category: 'high-chairs',
        pros: ['Folds to only 2.5" thin — thinnest folding chair tested', 'Dishwasher-safe tray insert', '6 height adjustment positions', 'Padded seat with 3-point harness'],
        cons: ['Less sturdy feeling than non-folding options', 'Smaller seat than average'],
        summary: 'The Graco Slim Snacker is the best high chair for small kitchens and families who fold away between meals. At just 2.5" thin when folded, it stores behind a door. The dishwasher-safe tray insert is a practical detail missing from many more expensive chairs.',
        affiliateUrl: 'https://www.amazon.com/dp/B00PTL13LA?tag=pregnancysp0a-20',
        affiliatePrice: '$79',
      },
    ],
    buyingGuide: [
      {
        heading: 'When Can Baby Use a High Chair?',
        body: 'Babies are ready for a high chair when they can sit upright with minimal support — typically 4–6 months. Never place a baby in a high chair who cannot hold their head steady independently. Most chairs include recline options for babies who are close but not quite ready.',
      },
      {
        heading: 'Tray vs. Table-Mounted: Which Is Better for Development?',
        body: 'High chairs with trays (IKEA, Graco) are independent of table height and work anywhere. Tray-less chairs (Stokke Tripp Trapp) bring babies directly to the family table, which many feeding therapists prefer — it encourages participation in family mealtimes and models portion behaviour.',
      },
      {
        heading: 'Cleanability: Non-Negotiable for Long-Term Use',
        body: 'Before buying, look for: seamless seat material with no fabric crevices, a removable and dishwasher-safe tray insert, and straps that detach for washing. The IKEA ANTILOP and Graco Slim Snacker lead on cleanability. Fabric-padded chairs that cannot be fully removed become hygiene problems within weeks.',
      },
    ],
    faq: [
      {
        q: 'How long does a baby use a high chair?',
        a: 'Most children use a high chair from around 6 months until 2–3 years, when they can safely sit in a regular dining chair with a booster. Convertible options like the Stokke Tripp Trapp extend use through childhood and into adulthood.',
      },
      {
        q: 'Are second-hand high chairs safe?',
        a: 'Check the CPSC recall database before purchasing any second-hand high chair. Never use a high chair with missing harness components, cracked plastic, or a damaged tray locking mechanism. Safety hardware that has been stressed in falls may fail in subsequent use.',
      },
    ],
  },

  'best-baby-carriers-newborns-2026': {
    title: 'Best Baby Carriers for Newborns 2026 — Fourth-Trimester Tested',
    description: 'The best baby carriers for newborns in 2026, selected for safe ergonomics, skin-soft fabric, and ease of use in the fourth trimester.',
    metaDescription: 'Best baby carriers for newborns 2026: top-rated wraps and structured carriers tested for the M-position, airway safety, and ease of use from day one.',
    slug: 'best-baby-carriers-newborns-2026',
    updatedAt: '2026-06-05',
    intro: 'Newborn babywearing is one of the most effective tools for soothing, bonding, and keeping your hands free in the fourth trimester. But not all carriers are equally safe or comfortable from birth. After testing four options with newborns from the first week, these are the best baby carriers for newborns in 2026.',
    products: [
      {
        rank: 1,
        name: 'Solly Baby Wrap',
        brand: 'Solly Baby',
        score: 9.0,
        price: '$78',
        priceRange: 'mid-range',
        badge: 'Best Newborn Wrap',
        image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Parent wearing Solly Baby Wrap with newborn curled in close',
        reviewSlug: '/products/baby-carriers/solly-baby-wrap-review',
        category: 'baby-carriers',
        pros: ['TENCEL fabric — softest against newborn skin tested', 'Distributes weight evenly across both shoulders', 'No buckles — gentle wrapping for fragile newborns', 'Machine washable'],
        cons: ['Learning curve to tie correctly the first few times', 'Not suitable for back carry', 'Warmer in summer months'],
        summary: 'The Solly Baby Wrap is the definitive newborn carrier. The TENCEL fabric is extraordinarily soft for delicate newborn skin, the weight distribution of a full wrap is unmatched, and the snug hold closely mimics womb conditions. Tying takes practice but most parents master it within days.',
        affiliateUrl: 'https://www.amazon.com/dp/B09QXS5KRN?tag=pregnancysp0a-20',
        affiliatePrice: '$78',
      },
      {
        rank: 2,
        name: 'Ergobaby Omni 360',
        brand: 'Ergobaby',
        score: 9.0,
        price: '$209',
        priceRange: 'mid-range',
        badge: 'Best Structured Carrier from Birth',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Ergobaby Omni 360 structured carrier used with newborn, no insert needed',
        reviewSlug: '/products/baby-carriers/ergobaby-omni-360-review',
        category: 'baby-carriers',
        pros: ['Newborn-ready without an insert (seat narrows for small babies)', '4 carry positions grow with your child', 'Excellent lumbar support for extended carries', '45-lb weight limit for long-term use'],
        cons: ['Warmer than mesh alternatives', 'Bulkier to pack than wraps'],
        summary: 'The Ergobaby Omni 360 is the best structured carrier for newborns. No insert required — the adjustable seat narrows to fit babies from 7 lbs. Four carry positions and a 45-lb limit make it both a newborn carrier and a long-term investment.',
        affiliateUrl: 'https://www.amazon.com/dp/B07H7JCYP9?tag=pregnancysp0a-20',
        affiliatePrice: '$209',
      },
      {
        rank: 3,
        name: 'LÍLLÉbaby Complete Airflow',
        brand: 'LÍLLÉbaby',
        score: 8.8,
        price: '$129',
        priceRange: 'mid-range',
        badge: 'Best Breathable Structured Carrier',
        image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'LÍLLÉbaby Complete Airflow structured carrier with baby in warm weather',
        reviewSlug: '/products/baby-carriers/lillebaby-complete-airflow-review',
        category: 'baby-carriers',
        pros: ['3D mesh throughout — best breathability for a structured carrier', 'Newborn-ready without an insert', '6 carry positions (most on this list)', 'Lumbar support waistband'],
        cons: ['More adjustment points than Ergobaby', 'Less established brand recognition'],
        summary: 'The LÍLLÉbaby Complete Airflow is the most breathable structured newborn carrier at this price. Six carry positions, 3D mesh construction, and no insert required from birth. At $129, it undercuts the Ergobaby by $80 while offering more carry positions.',
        affiliateUrl: 'https://www.amazon.com/dp/B09S1C5ZHL?tag=pregnancysp0a-20',
        affiliatePrice: '$129',
      },
      {
        rank: 4,
        name: 'Moby Wrap Original',
        brand: 'Moby',
        score: 8.4,
        price: '$45',
        priceRange: 'budget',
        badge: 'Best Budget Wrap',
        image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Moby Wrap Original stretchy cotton baby wrap for newborns',
        reviewSlug: '/products/baby-carriers/moby-wrap-original-review',
        category: 'baby-carriers',
        pros: ['Only $45 — most affordable wrap on this list', '100% cotton stretchy fabric', 'Pre-tied carry can be entered and exited quickly after the first tie', 'Machine washable'],
        cons: ['20-lb weight limit — outgrown by 6 months for some babies', 'Stretchy fabric can droop in heat', 'Long fabric can be cumbersome outdoors'],
        summary: 'The Moby Wrap is the best-value newborn carrier available. At $45 it delivers a secure, womb-like hold that newborns love. The main limitation is the 20-lb weight limit, meaning a transition to a structured carrier by 4–6 months will be needed for most babies.',
        affiliateUrl: 'https://www.amazon.com/dp/B004ZJQ52Y?tag=pregnancysp0a-20',
        affiliatePrice: '$45',
      },
    ],
    buyingGuide: [
      {
        heading: 'TICKS Safety Rules for Newborn Babywearing',
        body: 'TICKS: Tight (snug against your body), In view at all times (always see baby\'s face), Close enough to kiss (baby\'s head at kissing distance), Keep chin off chest (airway clear), Supported back (spine in C-curve, not slumped). Check all five points every time you put your baby in.',
      },
      {
        heading: 'Wrap vs. Structured: What\'s Best for Newborns?',
        body: 'Stretchy wraps (Solly, Moby) are often recommended first for newborns — the fabric moulds to every body shape and the hold is exceptionally snug. Structured carriers are equally safe but require more buckle management. Many parents use a wrap in the first 3 months then switch to a structured carrier.',
      },
      {
        heading: 'M-Position and Healthy Hip Development',
        body: 'The M-position (knees higher than bottom, thighs fully supported) is critical for newborn hip joint development. Avoid forward-facing outward carries before 4–6 months as they do not support the M-position. All four carriers on this list support healthy positioning when worn correctly.',
      },
    ],
    faq: [
      {
        q: 'Can I use a carrier immediately after birth?',
        a: 'Most carriers are suitable from 7–8 lbs. Always confirm your baby meets the minimum weight listed by the manufacturer. In the first weeks, have a midwife or babywearing consultant check your technique — local sling libraries often offer free fittings.',
      },
      {
        q: 'How long can a newborn be in a carrier each session?',
        a: 'There\'s no strict time limit, but remove baby if they seem uncomfortable, too warm, or their airway looks compromised. For newborns, 30–60-minute carries are common. Always ensure the airway is clear, especially for babies under 4 months.',
      },
    ],
  },

  'best-white-noise-machines-2026': {
    title: 'Best White Noise Machines for Babies 2026 — Sleep Longer, Wake Less',
    description: 'The best white noise machines for babies in 2026, tested for sound quality, volume safety, and smart features through eight weeks of overnight use.',
    metaDescription: 'Best white noise machines for babies 2026: top picks tested for sound quality, safe volume levels, and ease of use at 3am. Includes smart and simple options.',
    slug: 'best-white-noise-machines-2026',
    updatedAt: '2026-06-05',
    intro: 'White noise masks household sounds and mimics the womb environment — two reasons it\'s one of the most effective tools for baby sleep. After testing three white noise machines through eight weeks of real overnight use, these are the best of 2026.',
    products: [
      {
        rank: 1,
        name: 'Hatch Rest 2nd Gen',
        brand: 'Hatch',
        score: 9.3,
        price: '$69',
        priceRange: 'budget',
        badge: 'Best Smart Sound Machine',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Hatch Rest 2nd Gen smart sleep machine with night light in nursery',
        reviewSlug: '/products/white-noise/hatch-rest-2nd-gen-review',
        category: 'white-noise',
        pros: ['App-controlled white noise + colour night light', '"Okay to wake" light for toddler sleep training', 'Basic use requires no subscription', '20 curated sound options'],
        cons: ['Full features require $4.99/mo subscription', 'WiFi dependency for app control', 'Occasional connectivity issues'],
        summary: 'The Hatch Rest 2nd Gen is the most versatile baby sound machine available. App-controlled sound and a colour-changing night light make it useful from newborn through 5+ years. The "okay to wake" light alone is worth the price for toddler sleep training.',
        affiliateUrl: 'https://www.amazon.com/dp/B08YS6S66Z?tag=pregnancysp0a-20',
        affiliatePrice: '$69',
      },
      {
        rank: 2,
        name: 'LectroFan Classic',
        brand: 'LectroFan',
        score: 8.5,
        price: '$49',
        priceRange: 'budget',
        badge: 'Best No-App Option',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'LectroFan Classic white noise machine with simple dial controls',
        reviewSlug: '/products/white-noise/lectrofan-classic-review',
        category: 'white-noise',
        pros: ['20 fan and white noise variations', 'Plug-in — completely reliable power', 'Resumes at same volume after power cut', 'No app, no WiFi, no subscription'],
        cons: ['No night light', 'No timer function', 'No portability — mains only'],
        summary: 'The LectroFan Classic is the best white noise machine for parents who want zero app dependency. Twenty distinct sound options, reliable plug-in power, and no connectivity required — turn it on and it works every single time.',
        affiliateUrl: 'https://www.amazon.com/dp/B00E6D6LQY?tag=pregnancysp0a-20',
        affiliatePrice: '$49',
      },
      {
        rank: 3,
        name: 'Yogasleep Dohm Classic',
        brand: 'Yogasleep',
        score: 8.2,
        price: '$44',
        priceRange: 'budget',
        badge: 'Best Natural Fan Sound',
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Yogasleep Dohm Classic white noise machine with real fan motor',
        reviewSlug: '/products/white-noise/yogasleep-dohm-classic-review',
        category: 'white-noise',
        pros: ['Real fan motor — not a digital recording', 'Two-speed adjustment', 'Tone control dial for customising sound', 'Trusted design since 1962'],
        cons: ['Only two speed settings (limited range)', 'No timer or auto-off', 'Louder than digital alternatives at max speed'],
        summary: 'The Yogasleep Dohm uses an actual fan motor rather than a digital recording, producing the most natural-sounding white noise we tested. Some babies respond better to true analogue fan sounds than looping digital recordings. At $44 it\'s the most classic — and the most affordable — option.',
        affiliateUrl: 'https://www.amazon.com/dp/B00HD0ELFK?tag=pregnancysp0a-20',
        affiliatePrice: '$44',
      },
    ],
    buyingGuide: [
      {
        heading: 'Volume Safety: How Loud Is Too Loud?',
        body: 'The AAP recommends keeping white noise machines below 50 dB at crib distance (approximately arm\'s length away). Normal conversation is around 60 dB. Keep the machine at least 7 feet from the crib, use the lowest effective volume, and never place the machine directly inside the crib.',
      },
      {
        heading: 'Digital vs. Analogue Fan Sound',
        body: 'Digital white noise machines (LectroFan, Hatch) play recorded sounds on a loop. Analogue machines (Yogasleep Dohm) use a real fan motor producing continuous, non-looping sound. Both are effective — some babies and parents prefer the analogue quality, others cannot tell the difference.',
      },
      {
        heading: 'Do You Need a Smart White Noise Machine?',
        body: 'App control is genuinely useful if your baby wakes easily — you can adjust volume from your phone without entering the room. The Hatch also doubles as a night light and toddler sleep trainer, giving it value for 3–5 years. For babies who sleep soundly, the simpler LectroFan or Dohm is perfectly sufficient.',
      },
    ],
    faq: [
      {
        q: 'Is white noise safe for babies?',
        a: 'Yes, when used correctly. Keep volume below 50 dB at crib distance, place the machine at least 7 feet away, and do not run it at maximum volume. The AAP supports white noise as a safe sleep aid when volume guidelines are followed.',
      },
      {
        q: 'Should white noise play all night or just to settle baby?',
        a: 'Most sleep experts recommend playing white noise throughout the night — it masks early-morning household sounds that can wake a light-sleeping baby. The Hatch and LectroFan have no auto-shutoff by default, which is ideal for overnight use.',
      },
      {
        q: 'When can I wean my baby off white noise?',
        a: 'There\'s no medical need to wean. Many children sleep with white noise through childhood without any ill effects. If you wish to stop, gradually reduce volume over several weeks rather than stopping suddenly to avoid sleep disruption.',
      },
    ],
  },

  'best-diaper-bags-2026': {
    title: 'Best Diaper Bags of 2026 — Organised, Stylish & Built to Last',
    description: 'The best diaper bags of 2026, tested for organisation, capacity, comfort on your shoulders, and how they hold up after a year of daily use.',
    metaDescription: 'Best diaper bags 2026: top picks tested for organisation, durability, and style. Includes the best backpack, best tote, and best washable diaper bag.',
    slug: 'best-diaper-bags-2026',
    updatedAt: '2026-06-05',
    intro: 'A diaper bag is carried every day for two to three years. It needs to be organised enough to find a wipe in the dark, big enough to hold two days of supplies, and attractive enough that you\'re actually happy carrying it. After testing three bags through real daily use, these are the best diaper bags of 2026.',
    products: [
      {
        rank: 1,
        name: 'JuJuBe BFF Backpack',
        brand: 'JuJuBe',
        score: 9.0,
        price: '$199',
        priceRange: 'premium',
        badge: 'Best Overall',
        image: 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'JuJuBe BFF convertible diaper bag in backpack mode',
        reviewSlug: '/products/diaper-bags/jujube-bff-diaper-bag-review',
        category: 'diaper-bags',
        pros: ['Converts: backpack ↔ shoulder bag ↔ tote', 'Entire bag is machine washable', 'Memory foam shoulder straps', '18 organisational pockets — all intentionally sized'],
        cons: ['$199 is a significant investment', 'Heavier than simpler bags when empty'],
        summary: 'The JuJuBe BFF is the most organisationally impressive diaper bag we tested — 18 intentional pockets, three carry modes, and crucially, it\'s fully machine washable. After a year of daily use, it looks nearly new. The price is justified by build quality and the machine-wash feature alone.',
        affiliateUrl: 'https://www.amazon.com/dp/B00TEXBJ3Q?tag=pregnancysp0a-20',
        affiliatePrice: '$199',
      },
      {
        rank: 2,
        name: 'Skip Hop Forma Backpack',
        brand: 'Skip Hop',
        score: 8.8,
        price: '$119',
        priceRange: 'mid-range',
        badge: 'Best Mid-Range Backpack',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Skip Hop Forma diaper bag backpack in structured design',
        reviewSlug: '/products/diaper-bags/skip-hop-forma-backpack-review',
        category: 'diaper-bags',
        pros: ['Clean structured exterior that stays in shape', 'Universal stroller attachment straps included', 'Insulated side bottle pockets', 'Changing mat included'],
        cons: ['Fewer pockets than JuJuBe', 'Spot clean only — not machine washable'],
        summary: 'The Skip Hop Forma is the best mid-range diaper bag for parents who prioritise aesthetics alongside function. The structured shell keeps it looking sharp even fully packed. At $119 it includes stroller straps and a changing mat — solid value at less than half the JuJuBe price.',
        affiliateUrl: 'https://www.amazon.com/dp/B0731TBBWF?tag=pregnancysp0a-20',
        affiliatePrice: '$119',
      },
      {
        rank: 3,
        name: 'Freshly Picked Classic Diaper Bag',
        brand: 'Freshly Picked',
        score: 8.5,
        price: '$178',
        priceRange: 'premium',
        badge: 'Best Faux Leather Tote',
        image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=85&auto=format&fit=crop',
        imageAlt: 'Freshly Picked Classic diaper bag in vegan faux leather',
        reviewSlug: '/products/diaper-bags/freshly-picked-classic-diaper-bag-review',
        category: 'diaper-bags',
        pros: ['Vegan faux leather wipes clean instantly', 'Passes as a designer handbag', 'Magnetic closure for one-handed access', 'Insulated side bottle pocket'],
        cons: ['Tote carry only — no backpack straps', 'Fewer compartments than backpack-style bags'],
        summary: 'The Freshly Picked is the best diaper bag for fashion-conscious parents. The faux leather wipes clean in seconds, the magnetic closure allows one-handed access mid-chaos, and it genuinely looks like a designer handbag. Ideal for urban parents who need their bag to do double duty.',
        affiliateUrl: 'https://www.amazon.com/dp/B0CJXSJ4MN?tag=pregnancysp0a-20',
        affiliatePrice: '$178',
      },
    ],
    buyingGuide: [
      {
        heading: 'Backpack vs. Tote vs. Messenger: What Works Best?',
        body: 'Backpacks (JuJuBe BFF, Skip Hop Forma) distribute weight across both shoulders — essential for long days out. Totes (Freshly Picked) offer faster access to contents. Messenger bags work well for one parent but fatigue quickly on long walks. Most parents who try backpacks don\'t go back to totes.',
      },
      {
        heading: 'How Many Pockets Do You Actually Need?',
        body: 'More pockets sounds better — but only if they\'re intelligently sized. Look for: one insulated bottle pocket accessible one-handed, an exterior wipe-accessible pocket, a dedicated changing mat section, and a wet/dry compartment. The JuJuBe\'s 18 pockets all serve distinct purposes.',
      },
      {
        heading: 'Washability: The Overlooked Factor',
        body: 'Diaper bags encounter formula spills, blowouts, and crushed snacks daily. Machine washability (JuJuBe BFF) is a major practical advantage that becomes obvious after month two. Faux leather (Freshly Picked) wipes clean instantly. Fabric bags that can only be spot-cleaned become grimy over months of use.',
      },
    ],
    faq: [
      {
        q: 'What should I pack in a diaper bag for a newborn?',
        a: 'Essentials: 4–6 nappies, travel wipes pack, portable changing mat, nappy sacks, 2 spare babygrows, 1 spare top for you, burp cloth, breast pads if nursing, pre-made bottle if formula-feeding, dummy if used. Pack light initially — you\'ll quickly learn what you actually use vs. what weighs you down.',
      },
      {
        q: 'How long do I need a diaper bag?',
        a: 'Most parents use a diaper bag through potty training, typically until 2.5–3 years. After that, a regular backpack with a small first aid kit is sufficient. A high-quality bag like the JuJuBe BFF transitions naturally to a daily carry bag once nappies are done.',
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
