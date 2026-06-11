/**
 * Expands all 200 MDX product reviews with 4–5 new content sections.
 * Generates product-specific content from real frontmatter data (pros, cons,
 * specs, price, competitors in same category).
 *
 * Run: node scripts/expand-product-reviews.mjs
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(projectRoot, 'content', 'products');

// ── Safety standards by category ────────────────────────────────────────────

const SAFETY_BY_CAT = {
  'car-seats': `Car seats sold in the United States must comply with **FMVSS 213** (Federal Motor Vehicle Safety Standard No. 213), which governs dynamic crash performance, harness strength, and flammability. Look for **JPMA certification** as an additional quality marker. All infant car seats are also tested against **ASTM F2050**. The safest installation method is always LATCH or a correctly tightened seat belt — never both simultaneously unless the manufacturer explicitly permits it.`,

  'cribs': `Cribs must meet **ASTM F1169** (full-size cribs) or **ASTM F406** (non-full-size cribs) and comply with **CPSC 16 CFR Parts 1219 and 1220**, which prohibit drop-side rails and mandate slat spacing of no more than 2⅜ inches. **GREENGUARD Gold** certification means the crib has been independently tested for over 360 chemical emissions — important for a product your baby sleeps in 12–16 hours daily.`,

  'strollers': `Strollers must meet **ASTM F833**, which covers stability, braking, structural integrity, and restraint systems. JPMA-certified strollers carry an independent quality verification seal. Always use the provided harness — stroller injuries are most commonly caused by falls from an unrestrained child.`,

  'monitors': `Baby monitors are regulated by the **FCC** for radio frequency emissions. Video monitors sold in the US must meet FCC Part 15 requirements. For WiFi monitors, look for **WPA2/WPA3 encryption** and two-factor authentication to prevent unauthorized access. Audio monitors carry no child-specific safety standards — the safety guarantee is in the connection reliability, not the device itself.`,

  'breast-pumps': `Breast pumps classified as milk-expression devices are regulated by the **FDA as Class II medical devices**, requiring 510(k) clearance. All parts that contact milk must be **BPA-free** and phthalate-free. Under the Affordable Care Act, most insurance plans are required to cover a breast pump — check your insurer before purchasing.`,

  'high-chairs': `High chairs must meet **ASTM F404**, which covers stability, restraint systems, tray security, and folding/reclining mechanisms. **JPMA-certified** high chairs carry additional independent safety verification. Always use the provided 5-point harness — never the tray alone as a restraint. Check the base footprint for stability before purchasing for hard floors.`,

  'baby-carriers': `Soft baby carriers and wraps should meet **ASTM F2236** and are independently verified by the **JPMA**. The key safety principle is the **TICKS rule**: Tight, In view at all times, Close enough to kiss, Keep chin off chest, Supported back. Carriers that allow a chin-to-chest position are a suffocation risk for newborns.`,

  'baby-bouncers': `Infant bouncers and rockers must comply with **ASTM F2167**, which governs structural integrity, restraint system strength, and stability under dynamic loading. The **CPSC** issued guidance in 2019 restricting inclined sleep products to a maximum 10° angle — verify the product meets current standards. Never use a bouncer as a sleep surface.`,

  'bouncers': `Infant bouncers and rockers must comply with **ASTM F2167**, which governs structural integrity, restraint system strength, and stability. The **CPSC** issued guidance restricting inclined sleep products to a maximum 10° angle. Always use the provided restraint harness and never use a bouncer as an overnight sleep surface.`,

  'baby-swings': `Infant swings must meet **ASTM F2088**, which covers structural strength, restraint integrity, and stability across swing arc. The **CPSC** prohibits marketing swings as sleep products unless they meet flat-sleep safety standards. A baby who falls asleep in a swing should be transferred to a firm, flat sleep surface.`,

  'swings': `Infant swings must meet **ASTM F2088**. The **CPSC** prohibits marketing swings as sleep products unless they meet flat-sleep safety standards. Always transfer a sleeping baby from a swing to a firm, flat surface — the AAP recommends babies sleep on their back on a firm, flat, uninclined surface.`,

  'sleep-sacks': `Wearable blankets and sleep sacks should comply with **ASTM F3186** and meet **CPSC flammability standards** (16 CFR Part 1615/1616). Look for TOG ratings to match warmth to room temperature — overheating is a SIDS risk factor. The **AAP** recommends no loose bedding in the crib; a sleep sack is the safe alternative to blankets.`,

  'baby-gates': `Baby gates must meet **ASTM F1004** (expansion gates / pressure mount) and **ASTM F1559** (hardware mount gates). **JPMA certification** is the industry quality mark. For stair tops, only hardware-mounted gates are safe — pressure-mounted gates can be dislodged by a falling child. Verify the gate opening is narrow enough that a child cannot get their head through.`,

  'humidifiers': `Humidifiers for nurseries are not specifically regulated as child safety devices, but should carry **ETL or UL electrical safety listings**. Cool-mist ultrasonic models are preferred over warm-mist for nurseries — no heating element means no burn risk. Clean the water tank every 3 days minimum to prevent mold and bacterial growth that gets aerosolized into the air.`,

  'baby-bathtubs': `Infant bath seats and tubs must comply with **ASTM F2670**, which governs stability and structural integrity. **Never leave a baby unattended in any bath product** — infant drowning can occur in as little as 1–2 inches of water in seconds. Bathtub seats are not safety devices and provide no drowning protection.`,

  'activity-centers': `Activity centers and exersaucers must comply with **ASTM F2012**, which covers structural integrity, entrapment hazards, and toy component safety. The **AAP recommends limiting jumper/exersaucer use to 20 minutes per session** — extended use in a fixed hip-flexion position can affect developing hip and leg muscle patterns. Always ensure the baby's feet flat on the floor.`,

  'play-mats': `Play mats and activity gyms must meet **ASTM F963** toy safety standards and **CPSC** regulations. Foam play mats should be **non-toxic, phthalate-free, and formamide-free** — look for certifications like OEKO-TEX Standard 100 or GREENGUARD Gold. All hanging toy components should be checked regularly for wear, and removed before the baby can pull them down independently.`,

  'white-noise': `White noise machines are not regulated as medical devices but must meet **FCC Part 15** for electronic emissions. The **AAP recommends** placing white noise machines at least 7 feet from the baby's sleep space and keeping volume below 50 dB — equivalent to a quiet conversation. Most machines tested at close range exceed safe infant hearing exposure levels when set to maximum volume.`,

  'teething-toys': `Teething toys must comply with **ASTM F963** toy safety standards and **CPSC regulations**. Look for products certified **BPA-free, phthalate-free, and PVC-free** — these chemicals are often found in cheaper plastic teethers and can leach under the heat and pressure of chewing. Avoid liquid-filled teethers, which can puncture and leak. Natural rubber teethers (like Sophie la Girafe) should be checked for mold growth inside hollow designs.`,

  'baby-thermometers': `Medical thermometers sold in the US require **FDA 510(k) clearance** as Class II medical devices. Accuracy is clinically defined as ±0.2°C (±0.4°F). Rectal temperature remains the gold standard for infants under 3 months — other methods (temporal, axillary) have wider error ranges. For AAP-defined fever thresholds: any temperature ≥ 100.4°F (38°C) rectally in an infant under 3 months requires immediate medical evaluation.`,

  'nursing-feeding': `Breast pump accessories and nursing products that contact milk must be **BPA-free, phthalate-free**, and food-contact safe per **FDA 21 CFR**. Silicone manual pumps carry no formal safety certification requirements, but reputable brands use food-grade silicone compliant with FDA food contact standards. Replace silicone membranes and valves every 2–3 months as microscopic tears reduce suction efficiency.`,

  'potty-training': `Potty seats and training products are not regulated under a specific child safety standard beyond **CPSC general regulations** and **ASTM F963** for toy-like components. The key safety consideration is structural stability — a potty that tips during use is a fall hazard. The **AAP recommends** waiting for readiness signs (typically 18–24 months) rather than starting training by age, to avoid prolonged unsuccessful training that increases anxiety.`,

  'sippy-cups': `Sippy cups and transition cups must be **BPA-free** (banned in children's products under CPSC regulations since 2012) and meet **FDA food-contact safety standards** for materials. Look for **phthalate-free and lead-free** certifications. Stainless steel interiors are the safest option as they do not leach any chemicals regardless of temperature. Avoid honey or juice in sippy cups for infants under 12 months.`,

  'diaper-bags': `Diaper bags are not regulated as safety products, but bags with frame structures or backpack harness systems should be checked for **CPSC general product safety** compliance. The key safety consideration is weight distribution — an overloaded single-shoulder bag increases fall risk when worn while carrying a baby. Backpack-style bags are ergonomically superior for extended carrying.`,

  'diaper-pails': `Diaper pails are not subject to specific child safety standards, but should have **child-resistant lid mechanisms** to prevent access to soiled diapers. Diaper disposal systems that use refill cartridges will emit odor if the sealing mechanism degrades — inspect seals every 3 months. For environmental considerations, standard refill bags are not biodegradable; compostable liner options are available for select pail models.`,

  'bath-toys': `Bath toys must comply with **ASTM F963** toy safety standards, which govern small parts, entrapment, and mechanical hazards. Squeeze toys with holes are prone to internal mold growth within 2–4 weeks of regular use — mold inside squeeze toys is invisible from outside and can be expelled into bathwater. Sealed bath toys (no holes) and open-bottom designs that allow drainage eliminate this risk entirely.`,

  'baby-food-makers': `Baby food makers and blenders that contact food must meet **FDA 21 CFR food contact material standards** and be **BPA-free**. Steam-blend units should carry **UL or ETL electrical safety listing**. From a nutrition standpoint, homemade purees retain more water-soluble vitamins (C, B vitamins) than commercially jarred food because home preparation avoids the high-heat sterilisation processing that degrades these nutrients.`,

  'baby-loungers': `Infant loungers and positioners are regulated under **CPSC 16 CFR Part 1236** (effective 2022), which prohibits inclined sleep products over 10° and requires loungers to carry warnings that they are not for sleep. The **AAP** position is that any inclined sleep surface increases SIDS risk. Use loungers only for supervised awake time, never for naps or overnight sleep.`,

  'nursing-chairs': `Nursing gliders and recliners are covered by **BIFMA (Business and Institutional Furniture Manufacturer's Association)** standards for structural integrity and durability. Look for chairs tested to hold **300–400 lbs** to accommodate both parent and baby during feeding. Mechanism durability (glider track, recliner mechanism) is the most common failure point — choose chairs with metal rather than plastic glider mechanisms for longevity.`,

  'baby-nail-care': `Baby nail care tools are not regulated under a specific infant safety standard but must meet **CPSC general product regulations**. Electric nail files should carry **UL or ETL electrical safety certification**. The safest time to trim infant nails is during sleep or after a bath when nails are softest. Never use adult scissors — infant nail clippers have a curved blade designed for the small, curved nail profile of newborns.`,
};

// ── Category-specific "Who It's For" intros ─────────────────────────────────

const WHO_INTRO = {
  'car-seats': 'choosing an infant car seat',
  'cribs': 'setting up a nursery',
  'strollers': 'choosing a primary stroller',
  'monitors': 'setting up nursery monitoring',
  'breast-pumps': 'choosing a breast pump',
  'high-chairs': 'choosing a high chair',
  'baby-carriers': 'choosing a baby carrier',
  'baby-bouncers': 'choosing a bouncer',
  'bouncers': 'choosing a bouncer',
  'baby-swings': 'choosing a swing',
  'swings': 'choosing a swing',
  'sleep-sacks': 'choosing a sleep sack',
  'baby-gates': 'childproofing their home',
  'humidifiers': 'buying a nursery humidifier',
  'baby-bathtubs': 'choosing a baby bathtub',
  'activity-centers': 'choosing an activity center',
  'play-mats': 'choosing a play mat',
  'white-noise': 'buying a white noise machine',
  'teething-toys': 'choosing teething toys',
  'baby-thermometers': 'buying a baby thermometer',
  'nursing-feeding': 'nursing and bottle feeding',
  'potty-training': 'starting potty training',
  'sippy-cups': 'transitioning off the bottle',
  'diaper-bags': 'choosing a diaper bag',
  'diaper-pails': 'managing diaper disposal',
  'bath-toys': 'buying bath toys',
  'baby-food-makers': 'making homemade baby food',
  'baby-loungers': 'choosing a baby lounger',
  'nursing-chairs': 'choosing a nursing chair',
  'baby-nail-care': 'trimming baby nails',
};

// ── Parent tips by category (3–4 tips) ──────────────────────────────────────

const TIPS_BY_CAT = {
  'car-seats': [
    'Register your car seat with the manufacturer immediately after purchase — safety recalls are notified by registration.',
    'The chest clip must sit at armpit level, not stomach level. Repositioning it takes 10 seconds and is one of the most common installation mistakes.',
    'A correctly installed rear-facing seat should not move more than 1 inch side-to-side at the belt path.',
    'Car seats expire — check the manufacture date on the sticker and the printed expiry date (typically 6–10 years from manufacture).',
  ],
  'cribs': [
    'Assemble the crib before the baby arrives — assembling furniture with a newborn in the house is unexpectedly stressful.',
    'The mattress should fit snugly with no more than 2 fingers\' width gap between mattress and crib rail on all sides.',
    'A firm, flat mattress is safer than a soft one — resist the impulse to add mattress toppers, pillows, or padded bumpers.',
    'Lower the mattress to the lowest position before your baby can pull to stand — typically around 5–6 months.',
  ],
  'strollers': [
    'Test the fold in the store parking lot with one hand before buying — many "one-hand folds" require two hands in practice.',
    'Register your stroller with the manufacturer for recall notifications — stroller recalls happen several times per year industry-wide.',
    'A rain cover is worth buying at the same time as the stroller — you\'ll need it within the first month.',
    'For city use, measure your building\'s elevator and front door before choosing a stroller — width at the wheels varies significantly across models.',
  ],
  'monitors': [
    'Place the camera at the far corner of the room at ceiling height — this gives the widest view of the entire crib.',
    'For WiFi monitors, change the default password immediately out of the box and enable two-factor authentication if available.',
    'Test the alert response time before relying on it — walk around your house with the parent unit and find any dead zones.',
    'Battery backup is worth prioritising — a monitor that fails during a power cut is useless when you need it most.',
  ],
  'breast-pumps': [
    'Flange size matters more than any other pump component — the wrong size reduces output and causes pain. Measure nipple diameter and size up by 2–3mm.',
    'Build a pumping schedule that mirrors your baby\'s feeding frequency — dropping below 8 pump/feed sessions per day will reduce supply.',
    'Clean pump parts in hot soapy water after every session, or use a microwave steam bag. Dishwasher cleaning degrades silicone parts faster.',
    'Keep a set of pump parts at work to avoid transporting wet parts in your bag — the extra investment pays for itself in convenience.',
  ],
  'high-chairs': [
    'Wipe the harness straps weekly — food residue builds up in the buckle mechanism and causes it to jam.',
    'The tray should be removable and dishwasher-safe — check this before buying, not after.',
    'Position the high chair away from walls and tables the baby can push off — leverage against a surface can tip a chair.',
    'Introduce solids at the table, not in front of a screen — meal-time attention improves self-regulation of food intake.',
  ],
  'baby-carriers': [
    'Practice carrier positions in front of a mirror with a doll or rolled blanket before using with a newborn.',
    'In warm weather, dress the baby one layer lighter inside the carrier — your body heat raises their temperature significantly.',
    'Check all buckle connections before every carry, especially after washing the carrier.',
    'The baby\'s weight should sit in your centre of gravity (hips/lower back), not pulling forward from your shoulders.',
  ],
  'baby-bouncers': [
    'Limit bouncer sessions to 20–30 minutes of supervised awake time — extended use in a fixed reclined position is not developmentally neutral.',
    'Place the bouncer on the floor, never on a table, counter, or bed — falls from elevated surfaces are a leading cause of infant injury.',
    'Always buckle the harness, even for a 2-minute supervised session. Babies move more than you expect.',
    'Wash the seat cover monthly — food, spit-up, and moisture create a bacterial environment against the baby\'s skin.',
  ],
  'bouncers': [
    'Limit bouncer sessions to 20–30 minutes of supervised awake time.',
    'Place the bouncer on the floor only — never on a table, counter, or sofa. Falls from elevated surfaces are a leading cause of infant injury.',
    'Always buckle the harness, even for a brief supervised session.',
    'Wash the seat cover monthly — food, spit-up, and moisture create bacterial growth against the baby\'s skin.',
  ],
  'baby-swings': [
    'Introduce the swing before the baby is overtired — an already-screaming baby often refuses a new sleep environment.',
    'A baby who falls asleep in the swing should be transferred to a firm, flat crib within 30 minutes of sleeping.',
    'Lower swing speeds first — many babies find high-speed swinging overstimulating rather than soothing.',
    'Weight limits matter — check the maximum weight and transition out of the swing before hitting it.',
  ],
  'swings': [
    'Introduce the swing before the baby is overtired — an already-screaming baby often refuses a new environment.',
    'A baby who falls asleep in the swing should be transferred to a flat crib within 30 minutes.',
    'Try lower swing speeds first — many babies find high-speed swinging overstimulating.',
    'Always use the harness, and check the weight limit regularly as babies grow fast.',
  ],
  'sleep-sacks': [
    'Match TOG rating to room temperature: 0.5 TOG for 75°F+, 1.0 TOG for 68–75°F, 2.5 TOG for below 68°F.',
    'Size generously — a sleep sack that restricts leg movement reduces hip development. Check length at the hem.',
    'Layer a onesie underneath rather than a full pajama set in mild weather — overheating is a SIDS risk factor.',
    'Wash before first use — new sleep sacks often contain finishing chemicals that can irritate sensitive newborn skin.',
  ],
  'baby-gates': [
    'For stair tops, always use hardware mount. No exceptions — pressure-mount gates are not safe at stair tops.',
    'After installation, apply 30 lbs of force to the gate to test the mount — replicate the force of a child falling against it.',
    'Check that the latch mechanism cannot be operated by a 2-year-old — test it with your non-dominant hand.',
    'Replace the gate when the child can reach the latch from either side — typically around age 3.',
  ],
  'humidifiers': [
    'Empty and rinse the water tank every 24–48 hours — stagnant water is a breeding ground for mold and bacteria that get aerosolized.',
    'Use distilled water in ultrasonic models to prevent white mineral dust from coating nursery surfaces.',
    'Target 40–60% relative humidity — below 30% dries out mucous membranes; above 60% promotes mold growth on walls.',
    'Place the humidifier at least 3 feet from the crib and never directly on the floor where a crawling baby can reach it.',
  ],
  'baby-bathtubs': [
    'Fill the tub with 2–3 inches of warm water only — more is unnecessary and increases drowning risk.',
    'Test water temperature with your elbow, not your hand — the elbow is more sensitive to temperature than fingers.',
    'Never leave the baby unattended, even to answer the door or phone — bring everything you need before starting the bath.',
    'Transition out of the infant tub to the big bath when the baby can sit unsupported — typically 6–8 months.',
  ],
  'activity-centers': [
    'Adjust the height so the baby\'s feet are flat on the floor with a slight knee bend — tiptoeing in an exersaucer stresses hip development.',
    'Limit sessions to 20 minutes — prolonged use in a fixed upright position is not recommended for pre-walking development.',
    'Rotate toys periodically to maintain engagement — babies habituate quickly to fixed stimuli.',
    'Use activity centers only after the baby has solid head and neck control — typically 4–6 months.',
  ],
  'play-mats': [
    'Lay the mat on a flat, stable surface — carpet can cause the mat to shift unexpectedly during rolling.',
    'Remove hanging toys when the baby is strong enough to pull them — typically around 4–5 months — to prevent pulling the arch down.',
    'Tummy time on a play mat should start from day one — even 1–2 minutes per session builds neck and shoulder strength.',
    'Clean the mat surface weekly with a damp cloth and mild soap — it lives on the floor and accumulates dust and bacteria quickly.',
  ],
  'white-noise': [
    'Place the machine at least 7 feet from the baby\'s head and keep volume at or below 50 dB — equivalent to a quiet conversation.',
    'Start white noise at sleep time only, not all day — continuous sound exposure is not the same as sleep-cued sound.',
    'Pink noise (emphasis on lower frequencies) is preferred by many infants over pure white noise — experiment with both.',
    'A consistent sound cue trains the sleep association within 2–3 weeks — use the same sound every sleep period.',
  ],
  'teething-toys': [
    'Refrigerate (do not freeze) rubber teethers for added soothing effect — frozen teethers can be too hard and damage gum tissue.',
    'Inspect teethers weekly for cracks, tears, or discoloration — damaged teethers can harbour bacteria inside micro-tears.',
    'Natural rubber teethers with hollow interiors should be checked for mold — squeeze under running water and look for black specks.',
    'Have 2–3 different teether types on rotation — different gum zones need different textures at different teething stages.',
  ],
  'baby-thermometers': [
    'Rectal temperature is the most accurate method for infants under 3 months — confirm a fever rectally before calling a doctor.',
    'A fever in an infant under 3 months (≥100.4°F / 38°C) is a medical emergency regardless of the baby\'s appearance.',
    'Calibrate temporal and ear thermometers by comparing readings against a rectal reading at least once in the first month.',
    'Replace AAA batteries proactively — low battery in a thermometer gives erratic low readings, not obvious error warnings.',
  ],
  'nursing-feeding': [
    'Flange sizing is the most impactful and most overlooked factor in pump comfort and output — remeasure if output drops.',
    'Build a freezer stash gradually — 20–40 oz is sufficient for most back-to-work scenarios.',
    'Label all stored breast milk with date and time — FIFO (first in, first out) prevents older milk from expiring.',
    'Nipple confusion is rare in babies over 6 weeks — introducing a bottle before then is riskier than after.',
  ],
  'potty-training': [
    'Readiness signs matter more than age — rushing before readiness doubles the average training duration.',
    'Consistency between all caregivers (daycare, grandparents) is the single biggest predictor of training success.',
    'Praise the process, not the result — "great job sitting on the potty" works better than outcome-focused praise.',
    'Nighttime dryness typically follows daytime training by 6–12 months and cannot be trained — it is developmental.',
  ],
  'sippy-cups': [
    'Transition directly from bottle to open cup or straw cup if possible — the sippy spout promotes the same tongue-thrust pattern as a bottle.',
    'Limit juice entirely in the first year — the AAP recommends no juice before age 1 and no more than 4oz per day for ages 1–3.',
    'Straw cups develop oral motor skills faster than sippy spouts — most babies can master a straw by 9–12 months.',
    'Wash valve components after every use — milk residue in silicone valves cannot be removed by dishwasher alone.',
  ],
  'diaper-bags': [
    'Pack the night before — a disorganised diaper bag causes more stress than a missing feature.',
    'Keep a go-bag with 2 diapers, wipes, and a change of clothes permanently in the car — separate from the main diaper bag.',
    'A wet bag (waterproof pouch) for dirty clothes is the most useful accessory not included in most bags.',
    'Wash the bag interior monthly — wet wipes, food pouches, and formula leaks create hidden bacterial growth.',
  ],
  'diaper-pails': [
    'Empty the pail every 2–3 days regardless of capacity — letting it reach full capacity allows odour to accumulate.',
    'A baking soda disc inside the lid absorbs odour between emptying cycles — replace monthly.',
    'Line the outer bin with a standard trash bag before inserting the refill cartridge — catches leaks from the bottom.',
    'In summer, wrap soiled diapers in a small bag before placing in the pail — heat amplifies odour significantly.',
  ],
  'bath-toys': [
    'Squeeze bath toys after every bath and let them dry completely — closing wet toys traps moisture and grows mold within 2 weeks.',
    'Seal the hole in squeeze toys with aquarium-safe glue if you want to keep them — eliminates the mold problem entirely.',
    'Replace bath toys every 3–6 months regardless of visible wear — internal mold growth is invisible until it is extensive.',
    'Store bath toys in a mesh bag that allows air circulation — a sealed plastic container is the worst storage option.',
  ],
  'baby-food-makers': [
    'Start with single-ingredient purees and introduce one new food every 3–5 days to identify allergies.',
    'Freeze leftover purees in ice cube trays — each cube is approximately 1 oz, making portion control simple.',
    'Steam vegetables before blending to preserve more nutrients than boiling — water-soluble vitamins leach into boiling water.',
    'The consistency target is smooth and pourable at 4–6 months, mashed-lumpy at 8–9 months, minced at 10–12 months.',
  ],
  'baby-loungers': [
    'Use loungers for supervised awake time only — not for naps, overnight sleep, or unsupervised time.',
    'Place the lounger on the floor, not a sofa or bed — babies can roll or shift off elevated surfaces faster than you expect.',
    'Never leave the room with a baby in a lounger — the supervised-only rule is non-negotiable.',
    'Transition out of the lounger when the baby shows any ability to roll — typically 3–4 months.',
  ],
  'nursing-chairs': [
    'Test the lumbar support before buying — you may spend 8–12 hours per day in this chair in the first weeks.',
    'A footstool or ottoman at the right height reduces shoulder and arm fatigue significantly during feeding.',
    'The ideal seat height places your knees at or slightly below hip level — most standard chairs are too low for tall parents.',
    'Buy a chair with washable upholstery — spit-up, breast milk, and formula spills are inevitable.',
  ],
  'baby-nail-care': [
    'Trim nails during sleep or immediately after a bath when nails are soft and the baby is calm.',
    'Use a dedicated baby nail clipper, not adult scissors — the curved blade matches the nail profile and reduces nick risk.',
    'If you nick the skin, apply gentle pressure with a clean cloth — it will stop bleeding within 2 minutes. Never use a Band-Aid on a baby\'s finger.',
    'File after clipping to remove sharp edges — this is where electric nail files outperform clippers for nervous parents.',
  ],
};

// ── Value tier language ──────────────────────────────────────────────────────

function valueText(priceRange, ourScore, productName) {
  const tier = {
    budget: `At its price point, the ${productName} represents excellent value — the core function is delivered without the premium price tag of category leaders. For budget-conscious families who need reliable performance over luxury features, this is the right choice.`,
    'mid-range': `The ${productName} sits in the mid-range where the best value-per-dollar typically lives. You get the features that matter without paying for premium branding or marginal spec improvements. Families who want quality without overspending will find this tier the smartest purchase.`,
    premium: `The ${productName} is a premium investment, and it justifies the price through superior build quality, extended usability, or features unavailable at lower price points. For parents who want the best available and plan to use it across multiple children, the lifetime cost-per-use is often lower than cheaper alternatives replaced sooner.`,
  }[priceRange] || `The ${productName} offers solid performance at its price point.`;

  const scoreText = ourScore >= 9.0
    ? `Our score of **${ourScore}/10** reflects an exceptional product — among the top in its category.`
    : ourScore >= 8.0
    ? `Our score of **${ourScore}/10** reflects a strong performer with only minor trade-offs.`
    : `Our score of **${ourScore}/10** reflects a capable product with some limitations worth understanding before buying.`;

  return `${scoreText} ${tier}`;
}

// ── Competitor comparison ────────────────────────────────────────────────────

function buildComparisons(product, siblings) {
  // siblings = other products in same category, sorted by ourScore desc
  const others = siblings.filter(s => s.slug !== product.slug).sort((a, b) => b.ourScore - a.ourScore);
  if (others.length === 0) return null;

  const top = others[0];
  const lines = [];

  const priceTierOrder = ['budget', 'mid-range', 'premium'];
  const pIdx = priceTierOrder.indexOf(product.priceRange);
  const tIdx = priceTierOrder.indexOf(top.priceRange);

  lines.push(`**${product.productName} vs ${top.productName}**`);

  if (pIdx < tIdx) {
    lines.push(`The ${top.productName} is the higher-priced option with a score of ${top.ourScore}/10. The extra cost buys ${top.pros?.[0]?.toLowerCase() || 'additional features'}. The ${product.productName} at the ${product.priceRange} tier delivers the core function at a lower price — choose it if budget is a constraint.`);
  } else if (pIdx > tIdx) {
    lines.push(`The ${product.productName} is the premium option here. Compared to the ${top.productName} (${top.priceRange}, ${top.ourScore}/10), the additional investment buys ${product.pros?.[0]?.toLowerCase() || 'superior build quality'}. If budget allows, the ${product.productName} is the better long-term choice.`);
  } else {
    // same tier
    if (product.ourScore >= top.ourScore) {
      lines.push(`Both are ${product.priceRange} options. The ${product.productName} scores ${product.ourScore}/10 versus the ${top.productName} at ${top.ourScore}/10. The key differentiator is ${product.pros?.[0]?.toLowerCase() || 'its core feature set'}. For most buyers, either is a solid choice — the ${product.productName} edges ahead on overall score.`);
    } else {
      lines.push(`Both are ${product.priceRange} options. The ${top.productName} scores ${top.ourScore}/10 versus ${product.productName} at ${product.ourScore}/10. The ${product.productName} distinguishes itself through ${product.pros?.[0]?.toLowerCase() || 'specific strengths'}. Choose the ${product.productName} if ${product.pros?.[1]?.toLowerCase() || 'its specific features'} matter most to your situation.`);
    }
  }

  if (others.length >= 2) {
    const second = others[1];
    lines.push('');
    lines.push(`**Also consider:** The **${second.productName}** (${second.priceRange}, ${second.ourScore}/10) — ${second.bottomLine?.split('.')[0] || 'another strong option in this category'}.`);
  }

  return lines.join('\n');
}

// ── Who It's For ─────────────────────────────────────────────────────────────

function buildWhoFor(product, catKey) {
  const intro = WHO_INTRO[catKey] || 'choosing in this category';
  const lines = [
    `The **${product.productName}** is the right choice when ${intro} if:`,
  ];

  const priceMap = {
    budget: 'you want solid performance without a premium price tag',
    'mid-range': 'you want quality features without paying for top-tier branding',
    premium: 'you want the best available and plan to use it across multiple children',
  };
  lines.push(`- You are ${priceMap[product.priceRange] || 'looking for good value'}`);

  if (product.pros?.length >= 1) lines.push(`- ${product.pros[0]} is a priority for you`);
  if (product.pros?.length >= 2) lines.push(`- ${product.pros[1]} matters in your household`);

  const specsArr = Object.entries(product.specsTable || {});
  if (specsArr.length > 0) {
    const [specKey, specVal] = specsArr[0];
    lines.push(`- The spec that matters most for your situation: **${specKey}: ${specVal}**`);
  }

  lines.push('');
  lines.push(`**Think twice if:** ${product.cons?.[0] || 'any of the listed cons are deal-breakers for your situation'}.`);

  return lines.join('\n');
}

// ── Generate full expansion block ────────────────────────────────────────────

function generateExpansion(product, catKey, siblings) {
  const sections = [];

  // 1. Who It's For (only if not already in body)
  sections.push(`## Who It's For\n\n${buildWhoFor(product, catKey)}`);

  // 2. Safety Standards
  const safetyText = SAFETY_BY_CAT[catKey];
  if (safetyText) {
    sections.push(`## Safety Standards & Certifications\n\n${safetyText}`);
  }

  // 3. vs Competitors
  const compText = buildComparisons(product, siblings);
  if (compText) {
    sections.push(`## How It Compares\n\n${compText}`);
  }

  // 4. Value for Money
  sections.push(`## Value for Money\n\n${valueText(product.priceRange, product.ourScore, product.productName)}`);

  // 5. Parent Tips
  const tips = TIPS_BY_CAT[catKey];
  if (tips?.length) {
    const tipLines = tips.map(t => `- ${t}`).join('\n');
    sections.push(`## Parent Tips\n\n${tipLines}`);
  }

  return '\n\n' + sections.join('\n\n');
}

// ── Process all MDX files ────────────────────────────────────────────────────

// Load all frontmatter from cache for competitor lookup
const cacheRaw = fs.readFileSync(path.join(projectRoot, 'src/data/content-cache-products.json'), 'utf8').replace(/^﻿/, '');
const cache = JSON.parse(cacheRaw);

// Build sibling map: catKey → array of product frontmatter
const siblingMap = {};
for (const [cacheKey, entries] of Object.entries(cache)) {
  const catKey = cacheKey.replace('products/', '');
  siblingMap[catKey] = Object.entries(entries).map(([slug, e]) => ({ ...e, slug }));
}

let processed = 0;
let skipped = 0;
let errors = 0;
const results = [];

// Walk all category directories
const catDirs = fs.readdirSync(contentRoot, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const catKey of catDirs) {
  const catDir = path.join(contentRoot, catKey);
  const siblings = siblingMap[catKey] || [];
  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.mdx'));

  for (const file of files) {
    const filePath = path.join(catDir, file);
    try {
      const raw = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
      const { data: frontmatter, content: body } = matter(raw);

      // Skip if already expanded (check for expansion markers)
      if (body.includes("## Who It's For") || body.includes("## Safety Standards")) {
        skipped++;
        results.push({ file, status: 'skipped (already expanded)' });
        continue;
      }

      const product = { ...frontmatter, slug: file.replace('.mdx', '') };

      // Split body at "## Related Articles" to insert before it
      const relatedMatch = body.match(/\n## Related Articles/);
      let bodyBefore = body;
      let bodyRelated = '';
      if (relatedMatch) {
        const idx = body.indexOf('\n## Related Articles');
        bodyBefore = body.slice(0, idx);
        bodyRelated = body.slice(idx);
      }

      const expansion = generateExpansion(product, catKey, siblings);
      const newBody = bodyBefore + expansion + bodyRelated;

      // Rebuild full file
      const newFile = matter.stringify(newBody, frontmatter);
      fs.writeFileSync(filePath, newFile, 'utf8');
      processed++;
      results.push({ file, status: 'expanded' });
    } catch (err) {
      errors++;
      results.push({ file, status: `error: ${err.message}` });
    }
  }
}

console.log('\n✅ Expansion complete');
console.log(`   Expanded : ${processed}`);
console.log(`   Skipped  : ${skipped} (already had sections)`);
console.log(`   Errors   : ${errors}`);

if (errors > 0) {
  console.log('\nErrors:');
  results.filter(r => r.status.startsWith('error')).forEach(r => console.log(' -', r.file, ':', r.status));
}
