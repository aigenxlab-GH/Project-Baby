/**
 * Phase 2 Batch 3: Final 3 high-value deep rewrites.
 * Run: node scripts/deep-rewrite-reviews-batch3.mjs
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(projectRoot, 'content', 'products');

const DEEP_REVIEWS = {

// ════════════════════════════════════════════════════════════════════════════
'strollers/uppababy-vista-v2-review': `
The **UPPAbaby VISTA V2** is the stroller that premium parents argue about most: is the $1,099 price justified? The answer depends on one factor more than any other — whether you're planning a second child. If yes, the VISTA V2's conversion to a true double stroller (without buying a new frame) changes the lifetime cost calculation completely. If no, the Bugaboo Fox 5 and Baby Jogger City Mini GT2 deliver comparable or better performance at lower prices.

## The Twin/Sibling Expansion: Why It Changes Everything

The VISTA V2 converts to a double stroller by adding a RumbleSeat ($230) for a second child. The first child rides in the main seat; the second rides in the RumbleSeat attached to the front or rear of the frame. The total weight remains manageable at 33 lbs for the double configuration.

No other premium stroller at the $1,099 price point offers this conversion capability on the same frame. The Bugaboo Donkey (which converts to a double) starts at approximately $1,300 in single configuration. The Bugaboo Fox 5 doesn't convert to a double at all.

For families who will have two children within a 2–3 year window, the VISTA V2's total cost for a double is $1,099 + $230 = $1,329 — compared to $1,099 for the VISTA V2 (single) plus approximately $700 for a separate tandem stroller later = $1,799. The VISTA V2 saves $470 for two-child families.

## What the V2 Adds Over the Original VISTA

The V2 update was substantive:

**Bigger underseat basket:** 30% more capacity — now holds two full shopping bags or a diaper bag plus groceries.
**Improved bassinet ventilation:** The bassinet has added mesh ventilation panels on both ends.
**Bumper bar redesign:** Lower profile, easier mounting and removal.
**Toddler seat improvements:** Better harness padding and canopy extension.

The most important of these is the basket — the original VISTA's basket was its most-criticised feature, and the V2 meaningfully addressed it.

## The Bassinet: Full Safe-Sleep

The VISTA V2 bassinet (included in most configurations) is approved by UPPAbaby for overnight safe sleep. This is a specific claim — most stroller bassinets are not approved for overnight sleep. The VISTA's bassinet ventilation and firm, flat base meet the standards required for extended sleep.

For parents who want one product that covers both pram and overnight bassinet duties, the included bassinet reduces the need for a separate standalone bassinet during the newborn period.

## Ride Quality: Premium but Not Fox-Level

The VISTA V2's suspension is good. Push quality over mixed surfaces is excellent. However, side-by-side comparisons consistently show the Bugaboo Fox 5 absorbs vibration and rough surfaces more smoothly — the Fox's suspension system is more refined.

The practical difference matters most on cobblestones and rough urban terrain. On smooth pavement, both are excellent. The VISTA V2's larger wheels (11-inch rear) provide confident straight-line rolling that compensates partially for the suspension difference.

## Underseat Storage: Category-Leading

The V2's underseat basket is the largest in its class. Access from the rear is easy, access from the side requires some reach. It holds a full diaper bag, two shopping bags, or a folded rain cover with room to spare. For parents who use the stroller as a daily transport tool and need to carry items, this is a meaningful practical advantage.

## VISTA V2 vs. Bugaboo Fox 5: The Real Decision

| Factor | VISTA V2 | Bugaboo Fox 5 |
|---|---|---|
| Price (single) | $1,099 | £1,399 |
| Expandable to double | Yes ($230) | No (requires Donkey) |
| Bassinet included | Usually yes | Sold separately (~$290) |
| Ride quality | Excellent | Better |
| Underseat storage | Best in class | Good |
| Weight | 27 lbs | 21.8 lbs |
| Second child option | RumbleSeat on same frame | Requires different model |

If you're having two children: VISTA V2. If you want the single best single-child stroller: Fox 5.

## Our Verdict

9.4/10. The best stroller for families planning two children. The sister/brother expansion on the same frame justifies the premium. The included bassinet with overnight approval and the class-leading basket are additional value. For single-child families who don't need the double conversion, the Bugaboo Fox 5 delivers better pure stroller performance.

## Related Articles
- [Bugaboo Fox 5 Review](/products/strollers/bugaboo-fox-5-review)
- [Baby Jogger City Mini GT2 Review](/products/strollers/baby-jogger-city-mini-gt2-review)
- [Babyzen YOYO2 Review](/products/strollers/babyzen-yoyo2-stroller-review)
- [Doona Infant Car Seat Stroller Review](/products/strollers/doona-infant-car-seat-stroller-review)
`,

// ════════════════════════════════════════════════════════════════════════════
'baby-carriers/babybjorn-one-air-review': `
The **BabyBjörn One Air** is the carrier for parents who value Scandinavian design and brand confidence above all other purchasing criteria. It covers all four carry positions (front inward, front outward, hip, back), starts at 8 lbs without an insert, and its mesh construction makes it the most breathable structured carrier available for warm-weather use. At $250, it costs $70 more than the Ergobaby Omni 360 — the comparison most parents eventually make.

## The Mesh Construction: The Differentiator

The "Air" in One Air refers to the 3D mesh fabric — a spacer mesh with a rigid open structure that allows continuous airflow between the baby and the carrier. In warm climates, during summer use, or for wearers who run physically warm, the One Air's breathability is noticeably better than any woven-fabric carrier.

In temperate or cool weather, the mesh provides less warmth than a woven carrier — some parents cover the baby's back with a thin blanket in sub-60°F temperatures.

## From Birth Without Insert

The One Air accommodates babies from 8 lbs without an insert by adjusting the waist belt and shoulder strap length. Most structured carriers with newborn compatibility require a bulky foam insert. The One Air achieves newborn fit through adjustment rather than an insert. The practical difference: one product, no insert to locate and configure.

At 8 lbs minimum (versus the Ergobaby Omni 360's 7 lbs), the difference is minimal — most newborns are 7–8 lbs at birth and reach 8 lbs within the first 2 weeks.

## Four Carry Positions

**Front inward-facing:** Baby faces the wearer. Correct position for newborns and infants — keeps the baby's head supported and their hips in the M-position.

**Front outward-facing:** Baby faces out. Suitable from approximately 5–6 months when the baby has neck and trunk control. The outward-facing seat spreads the thighs — some critics argue BabyBjörn's outward position doesn't achieve the ideal hip angle (legs should be spread in M-position, not hanging), but for brief carries this is not clinically significant.

**Hip carry:** Baby on the side. Good for quick carries and for babies 5+ months with hip control.

**Back carry:** Toddler on the wearer's back. The primary position for heavy toddlers on longer walks.

## Ergonomics for the Wearer

The waist belt transfers weight to the hips — the correct approach for all structured carriers. The padded shoulder straps have no crossing configuration (unlike some carriers that cross at the back for better load distribution). For carries over 1.5–2 hours with a heavy toddler, a crossback design can provide better balance. The One Air is best for 30–90 minute carries.

## BabyBjörn One Air vs. Ergobaby Omni 360

The most common comparison. Both carriers do essentially the same thing — four positions, from birth, structured carrier. Key differences:

- **Breathability:** One Air mesh is better — significantly more airflow
- **Price:** One Air $250 vs. Omni 360 $180 — $70 premium
- **Weight distribution for long carries:** Omni 360's crossback option provides better balance for 2+ hour carries
- **Brand aesthetic:** BabyBjörn's design is more minimalist/premium-feeling; a design preference, not a functional difference
- **Warmth:** Omni 360's woven fabric provides more warmth in cool weather

For warm climates or summer-primary use: One Air. For year-round use where long-duration carries are planned: Omni 360. For budget-conscious buyers: Omni 360 at $70 less with comparable functionality.

## The BabyBjörn Brand Factor

BabyBjörn has been making infant carriers since 1961. They have one of the strongest brand trust records in the category. For first-time parents who don't want to research carrier brand credibility, BabyBjörn's history provides confidence that the Omni 360 doesn't quite match by reputation alone.

## Our Verdict

8.8/10. The best structured carrier for warm climates and parents who prioritise breathability. The $70 premium over the Ergobaby Omni 360 is justified primarily for warm-weather/summer-specific use. In cooler climates, the Omni 360 delivers equivalent performance at lower cost. Both are excellent carriers — the choice comes down to climate and preference.

## Related Articles
- [Ergobaby Omni 360 Review](/products/baby-carriers/ergobaby-omni-360-review)
- [Solly Baby Wrap Review](/products/baby-carriers/solly-baby-wrap-review)
- [Moby Wrap Original Review](/products/baby-carriers/moby-wrap-original-review)
`,

};

// ── Apply rewrites ────────────────────────────────────────────────────────────
let written = 0;
let missing = 0;

for (const [key, newBody] of Object.entries(DEEP_REVIEWS)) {
  const [catKey, slug] = key.split('/');
  const filePath = path.join(contentRoot, catKey, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ File not found: ${filePath}`);
    missing++;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  const { data: fm } = matter(raw);
  const newFile = matter.stringify(newBody.trim(), fm);
  fs.writeFileSync(filePath, newFile, 'utf8');
  written++;
  console.log(`✅ ${key}`);
}

console.log(`\n✅ Batch 3 complete: ${written} written, ${missing} not found`);
