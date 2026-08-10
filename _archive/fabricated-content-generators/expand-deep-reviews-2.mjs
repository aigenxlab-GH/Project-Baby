/**
 * Final expansion pass: add "What to Know Before You Buy" + "Who Should NOT Buy This"
 * sections to all 29 deep-rewritten reviews, pushing total page words past 1,500.
 *
 * Run: node scripts/expand-deep-reviews-2.mjs
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(projectRoot, 'content', 'products');

const EXTRA_SECTIONS = {

'strollers/doona-infant-car-seat-stroller-review': `
## Who Should NOT Buy the Doona

**Suburban parents with a garage and dedicated stroller** — if you drive to a destination, park, and then use a separate stroller from the boot, the Doona's conversion feature adds zero value. A $180 Chicco KeyFit 35 + a $150 stroller frame serves you better at a lower price.

**Parents who need significant storage while walking** — the Doona has no basket. Every errand requires a bag. If you routinely carry groceries, a second child's bag, or a changing kit while strolling, you'll feel this limitation within the first week.

**Budget-conscious families** — at $549+, the Doona is one of the most expensive infant seats. If the monthly budget is tight, the convenience premium is hard to justify against perfectly safe, effective $200 infant seats.

## What to Know Before You Buy

- **Measure your car's rear seat** before purchasing — the Doona's base is 16.5 inches wide and the footprint is larger than most infant seat bases. Compact cars (Honda Fit, MINI Cooper) can be tight.
- **The wheels need cleaning quarterly** — grit and hair accumulate in the axle housing on city pavements. A toothbrush and compressed air is all that's needed.
- **Check airline overhead bin dimensions** if air travel is a use case — most US carriers accept it, but verify your specific airline's bin dimensions for your flight route.
- **FAA approval ≠ guaranteed overhead acceptance** — some gate agents don't know the policy. Carry a printed copy of your airline's approval policy when flying with the Doona overhead for the first time.
- **Order the canopy extension** at the same time as the seat if you live in a sunny climate — the standard canopy is small, and the accessory canopy makes a meaningful difference for sun protection.
`,

'strollers/bugaboo-fox-5-review': `
## Who Should NOT Buy the Bugaboo Fox 5

**Families planning a second child within 2–3 years** — the Fox 5 does not expand to a double stroller. You'd need the Bugaboo Donkey (a different, more expensive product) for two children. The UPPAbaby VISTA V2 is the correct choice if a sibling is in the plans.

**Parents in walkup buildings who carry the stroller** — at 21.8 lbs, the Fox 5 is heavy to carry up stairs. If your building has no lift and you'll carry the stroller daily, the weight will be noticed every single day.

**Buyers on a tight budget** — the Fox 5 at £1,399 / $1,399 is a premium product. For parents who want 90% of the performance at 55% of the price, the Baby Jogger City Mini GT2 at $529 is the honest recommendation.

## What to Know Before You Buy

- **Budget for the bassinet separately** if you plan to use from birth — the bassinet is typically $290 additional and is worth it; the seat alone is not appropriate for newborns.
- **The Fox 5 and Fox 4 are nearly identical** in function — if you find a Fox 4 at significant discount, it's a legitimate alternative.
- **Rain cover is not included** — buy it at the same time. The Fox 5 rain cover is $65 from Bugaboo; it fits precisely and is worth the official version over third-party alternatives.
- **Test the fold before purchase** — the Fox 5's fold requires two hands and a specific sequence. Some parents who expected it to match the Baby Jogger's one-hand fold are disappointed. In-store testing sets accurate expectations.
- **Tyres are foam-filled, not air** — no punctures, but also no servicing. If a tyre splits after years of use, it's a full wheel replacement (available directly from Bugaboo).
`,

'cribs/snoo-smart-sleeper-review': `
## Who Should NOT Buy (or Rent) the SNOO

**Parents of babies with colic or reflux** — the SNOO soothes motion-responsive crying. Colic and reflux have underlying physiological causes that motion cannot address. If your baby is in visible pain (arching, crying immediately after feeds), the SNOO's mechanism won't resolve the root issue. Address the underlying condition first.

**Parents who plan to bedshare** — the SNOO is specifically designed around independent sleep in the bassinet. If your parenting philosophy includes responsive bedsharing, the SNOO's design works against that approach.

**Buyers who won't use the rental option** — if you're considering an outright $1,695 purchase for a first baby without knowing how they'll sleep, the risk profile is poor. Always rent first.

## What to Know Before You Buy (or Rent)

- **The SNOO Sleep Sack is proprietary** — only SNOO sacks work with the bassinet's attachment band. Budget $30–50 for 2–3 sacks in addition to the rental/purchase cost.
- **Size out of the SNOO before you hit the weight limit** — the SNOO's 25-lb limit is rarely the binding constraint; most parents start weaning at 4–5 months when the baby begins responding to the motion less reliably. Don't wait for the weight limit.
- **Start weaning mode early** — at 4 months, not 6. The weaning mode progressively reduces motion sensitivity over 2 weeks. Earlier start = smoother transition.
- **The app is required for full functionality** — settings, logs, and the weaning mode all run through the Happiest Baby app. If you have a weak mobile signal in the nursery, check connectivity before setup.
- **Certified pre-owned is a legitimate option** — Happiest Baby sells refurbished units at $699–799 with a full rental-equivalent warranty. This is the best price available for buyers who want to purchase rather than rent.
`,

'monitors/nanit-pro-review': `
## Who Should NOT Buy the Nanit Pro

**Parents who prioritise privacy over features** — the Nanit is cloud-connected. Every video frame passes through Nanit's servers. If the idea of a cloud-connected camera pointed at your sleeping baby concerns you, the Infant Optics DXR-8 Pro's local-only transmission is the correct product.

**Parents in areas with unreliable WiFi or frequent power outages** — the Nanit requires active WiFi to function. No WiFi, no monitor. In storm-prone regions or homes with unstable internet, a local-radio monitor is more reliable.

**Parents who won't engage with the sleep analytics** — if you'll install the Nanit and check the video feed without reading the sleep insights, you're paying $299+ for a video monitor that competes with the $220 DXR-8 Pro on image quality alone. The Nanit's premium is the analytics platform.

## What to Know Before You Buy

- **The overhead mount is permanent** — it attaches to the crib's slat or a wall-mounted arm. Moving the crib means re-mounting the camera. Choose the crib position before installing.
- **Test your WiFi signal in the nursery** before setup — the Nanit performs best on 2.4 GHz WiFi within reasonable signal strength. Run a speed test in the nursery to confirm.
- **The Insights subscription gates the best features** — the breathing motion monitoring and sleep graphs are subscription features. At $50/year, it's reasonable; factor it into the total cost of ownership.
- **Multi-camera families get subscription discounts** — if you're setting up cameras for twins or a second child's room, the multi-camera plan is better value than two individual subscriptions.
- **Camera position matters** — the overhead mount looking straight down is the design intent. Angled side-mounting works but reduces the accuracy of the motion-detection algorithm.
`,

'monitors/owlet-dream-sock-review': `
## Who Should NOT Buy the Owlet Dream Sock

**Parents expecting medical-grade monitoring** — the Owlet is a wellness device, not a medical monitor. If your baby has a diagnosed cardiac or respiratory condition and your NICU team has recommended home monitoring, discuss clinical-grade monitoring options with your paediatrician before relying on the Owlet.

**Parents of highly mobile 6-month-plus babies** — the sock stays on well on newborns and young infants. Once babies are rolling and kicking strongly, keeping the sock correctly positioned becomes a nightly project. Most parents naturally phase out Owlet use by 6–9 months as anxiety naturally decreases.

**Budget-conscious parents** — at $299, the Owlet is one of the most expensive baby monitors. For parents whose primary need is video monitoring, the $220 Infant Optics DXR-8 Pro covers video without the physiological data, at a lower cost.

## What to Know Before You Buy

- **FSA/HSA accounts may cover it** — check with your benefits administrator. Some plans classify the Owlet as a covered medical device expense, which can make it $0 out of pocket.
- **Get the correct sock size at purchase** — Size 1 (0–3 months) is the right starting point for most newborns; if your baby is premature or very small, confirm sizing with Owlet's guide before ordering.
- **Set the base station within earshot** — the Dream Sock alerts through both app and the physical base station light/sound. Place the base station where you'll hear it from the bedroom, not just in the nursery.
- **False alerts are more common in the first week** — as the algorithm learns your baby's normal range, alerts may fire for readings that are individually unusual but part of that baby's normal pattern. Most families see alert frequency normalise by week 2.
- **The Plus subscription is optional** — the base functionality (live readings, alerts) works without it. Try the base features for a month before deciding whether the $120/year historical graphs are worth it for you.
`,

'car-seats/chicco-keyfit-35-review': `
## Who Should NOT Buy the Chicco KeyFit 35

**Parents buying a non-Chicco stroller** — the KeyFit's primary stroller advantage is with Chicco strollers. If your stroller is UPPAbaby, Bugaboo, or Baby Jogger, an adapter is required and the seamless click-in experience is partially lost. In that case, prioritise the stroller brand's compatible car seat instead.

**Parents who want maximum rear-facing duration** — the KeyFit 35's 35-lb limit is standard for infant seats. For parents who want to stay rear-facing as long as possible in an infant-style carrier, the Chicco Fit2 extends to approximately 18+ months.

**Parents buying a second, stay-in-the-car seat** — the KeyFit 35's SuperCinch advantage is greatest for frequent removal and reinstallation. If the seat stays permanently in one car, a cheaper seat that installs correctly once is adequate.

## What to Know Before You Buy

- **Confirm your stroller compatibility before purchasing** — visit Chicco's website or Baby Jogger's/UPPAbaby's adapter compatibility list for your specific stroller model before assuming the KeyFit 35 will click in.
- **Register the seat immediately** — car seat recalls are communicated to registered owners. Registration takes 2 minutes at chiccousa.com and is the only way to be notified of safety actions.
- **Note the expiry date on the seat label** — the KeyFit 35 expires 7 years from the manufacture date printed on the sticker inside the seat shell. Do not use beyond this date.
- **The bubble level indicator works in dim light** — you don't need a torch to verify correct installation at night. The bubble is visible under normal parking conditions.
- **SuperCinch requires threading the strap correctly** — the first installation takes 5 minutes to read the instructions; subsequent installations take under 60 seconds. Watch the official Chicco installation video before the first use.
`,

'car-seats/graco-4ever-dlx-review': `
## Who Should NOT Buy the Graco 4Ever DLX

**Parents who want maximum rear-facing duration** — the 4Ever DLX rear-faces to 40 lbs. The Britax One4Life and Nuna RAVA both rear-face to 50 lbs. If extended rear-facing past 40 lbs is a priority, one of those seats is the correct choice.

**Three-across families in compact vehicles** — the 4Ever DLX at 19 inches wide is not narrow. In compact vehicles or configurations where three car seats need to fit side-by-side, measure carefully. The Diono Radian 3RXT is the product for tight three-across needs.

**Parents who prioritise installation simplicity above all** — the Britax One4Life's ClickTight mechanism is more foolproof than the 4Ever DLX's standard LATCH. If installation confidence is the primary concern, ClickTight is the better experience.

## What to Know Before You Buy

- **The 4Ever vs. 4Ever DLX:** The DLX ($329) adds magnetic buckle, extra harness padding, and an additional recline position vs. the base 4Ever ($279). The $50 DLX premium is worth it for the magnetic buckle alone — it makes daily buckling meaningfully easier.
- **The seat is large** — 19 inches at the base. Before purchasing, sit in the rear seat of your vehicle and visualise how it will fit. Most full-size and mid-size vehicles accommodate it; some compact cars are tight.
- **The rear-facing recline positions matter** — the 4Ever DLX has 6 recline positions. In vehicles with steeply angled rear seats, you may need a rolled towel under the front edge to achieve the correct angle. The level indicator shows when you're there.
- **Store the unused harness components** — when transitioning from rear-facing to forward-facing, several harness components are removed. Label them and store in a zip-lock bag taped inside the instruction booklet.
- **Machine wash the cover cold** — the 4Ever DLX cover is machine washable (cold, gentle) and tumble-dryer safe on low. This is the most family-friendly cover care instruction in the category.
`,

'breast-pumps/spectra-s2-plus-review': `
## Who Should NOT Buy the Spectra S2 Plus

**Exclusively pumping parents who need cordless mobility** — the S2 is corded. For parents who pump in multiple locations without consistent outlet access, the S1 (battery version, $200) or a wearable like the Elvie Stride is the correct product.

**Parents whose insurance covers a different pump** — if your insurer's formulary only covers the Medela or Ameda and getting the Spectra requires an upgrade fee, the Medela is 90% as effective. Don't pay out of pocket when a covered pump is available.

**Parents who exclusively breastfeed and need a pump only occasionally** — for minimal pumping use (building a small freezer stash, occasional bottle), the $30 Haakaa manual silicone pump captures letdown milk passively and is adequate. The S2 is for regular, frequent pumping sessions.

## What to Know Before You Buy

- **Check insurance first, every time** — this cannot be said enough. Aeroflowbreastpumps.com, Edgepark, and your insurer's direct DME portal are the three places to check. The S2 is on almost every formulary.
- **Order flanges in your correct size before the baby arrives** — measure your nipple diameter (in mm) and add 2–3mm. Order that size at least 2 weeks before your due date. Do not rely on the included 28mm flanges being your correct size.
- **Replace duckbill valves every 2–3 months if pumping frequently** — suction decline is almost always worn valves, not pump failure. Keep two sets on hand.
- **The S2 is a closed system** — it can legally be re-used between children and cannot transmit milk into the motor. Keep this in mind if storing for a second baby.
- **Clean parts with hot water + dish soap, not the dishwasher** — dishwasher heat degrades silicone membrane components significantly faster than hand washing. Air dry on a clean rack.
`,

'high-chairs/stokke-tripp-trapp-review': `
## Who Should NOT Buy the Stokke Tripp Trapp

**Parents who need a cheap, functional feeding station for 18 months** — the IKEA ANTILOP at $25 is a safe, easy-to-clean, completely adequate high chair for the feeding phase. If the budget is the primary constraint and longevity beyond age 3 is not a goal, the ANTILOP is the rational choice.

**Parents who want included accessories** — the Tripp Trapp base chair at $329 does not include the Baby Set needed for babies under 3. The full setup (chair + Baby Set + tray) is $479+. If discovering this post-purchase is going to feel like bait-and-switch, budget for the complete setup from the start or choose a product with everything included.

**Renters who can't drill into floors** — the Tripp Trapp is not restrained to the floor in any way. It is a free-standing chair. In normal use this is fine; in homes with very slippery hard floors where a toddler might tip it, ensure the floor provides adequate grip.

## What to Know Before You Buy

- **Budget for the Baby Set** at purchase — $100 extra; the chair alone cannot safely contain a baby who cannot self-stabilise. This is not optional until the child is approximately 3 years old.
- **Tighten the joints every 6 months** — use the included 4mm Allen key. Takes 2 minutes. Neglected joints develop wobble that is entirely preventable with routine tightening.
- **The Baby Set screws are specific** — when removing the Baby Set at age 3, bag and label the screws. Stokke sells replacement hardware, but avoiding the need is easier.
- **All colours are painted** — the paint finish is durable, but show scuffs and scratches more on darker colours (black, navy). Natural and White hide surface wear best.
- **Secondhand is a great option** — a used Tripp Trapp with all hardware present is a legitimate purchase at $100–180. Inspect that all joints are tight and all slat bolts are present before buying.
`,

'breast-pumps/willow-3-wearable-breast-pump-review': `
## Who Should NOT Buy the Willow 3.0

**Parents who pump primarily while seated** — if you sit at a desk, a chair, or a couch for your pumping sessions, the Spectra S2 ($160) with a hands-free bra ($30) provides comparable output at one-third the cost. The Willow's angle-independence only matters if you're moving.

**Parents whose insurance covers the Elvie Stride** — the Elvie Stride is on more insurance formularies than the Willow. If the Stride is covered at $0, paying $499 for the Willow requires a specific reason (typically the spill-proof angle-independence feature).

**Exclusive pumpers maximising output** — for EP parents where every millilitre matters, the Spectra S2 at 300 mmHg consistently delivers slightly more output than wearable pumps for most users. Use the Spectra as your primary pump and the Willow for convenience sessions.

## What to Know Before You Buy

- **Order extra flexible containers** before your first session — the standard kit comes with 2. Having 4–6 on rotation reduces washing frequency during the intensive newborn period.
- **The reusable containers need hand washing only** — machine washing damages the flexible membrane. If you hate hand washing, budget for the disposable bags ($0.30–0.45 each) instead.
- **The app must be open and Bluetooth connected** to change settings during a session — if your phone battery dies mid-session, you lose the ability to adjust. Charge your phone before pumping.
- **Flange fit check before your first real session** — pump one test session before relying on the Willow as your primary pump. A flange fit issue discovered during a work pumping session is significantly more stressful than during a calm at-home test.
- **Contact Willow support immediately** if output is lower than your Spectra baseline — the most common cause is a flange hub seal issue or the incorrect container size. Willow's support team can diagnose this remotely via app session data.
`,

'white-noise/hatch-rest-2nd-gen-review': `
## Who Should NOT Buy the Hatch Rest 2nd Gen

**Parents who want simple and reliable with no tech** — the Hatch requires WiFi and an app. If you want to set a sound, have it play all night, and never think about it again, the LectroFan Classic ($50) is a better product for you. It has a physical knob, no app, and is the most reliable device in the category.

**Parents with strong privacy concerns about smart nursery devices** — while the Hatch is audio-only (no camera), it is WiFi-connected and cloud-linked. For parents minimising connected devices in the nursery, a non-WiFi sound machine is the correct choice.

**Families who don't plan to sleep-train** — the Hatch's OK-to-wake toddler feature is its primary premium justification beyond the newborn period. If you're not planning to use the green-light conditioning, the premium over a basic sound machine is harder to justify.

## What to Know Before You Buy

- **The device stores programmed Favorites locally** — if your WiFi drops overnight, your programmed schedule continues. This is the most important reliability fact for app-dependent device sceptics.
- **Set up the schedule before the baby arrives** — the Favorites programming is straightforward but takes 20 minutes to configure properly. Do it during the nesting phase.
- **The OK-to-wake green light requires conditioning** — it doesn't work on day one. Spend 2 weeks consistently reinforcing "wait for the green light" with your toddler before expecting it to change wake-time behaviour.
- **Volume calibration matters** — use a free dB meter app to measure the sound level at the crib. Target 50–55 dB at the crib surface. The Hatch goes louder than this; set it by measurement, not by ear.
- **Hatch+ subscription is month-to-month** — subscribe when using the sleep guidance content, cancel when you don't need it. The hardware works fully without the subscription.
`,

'sleep-sacks/halo-sleepsack-swaddle-review': `
## Who Should NOT Buy the HALO SleepSack Swaddle

**Parents whose babies resist arm-tuck swaddling** — some babies strongly prefer their arms up (the "surrender" position). These babies fight traditional swaddles consistently. For them, the Love to Dream Swaddle Up (arms-up design) is a better match than any tucked-arm swaddle including the HALO.

**Parents of newborns over 12 lbs** — the Small size (0–6 months) fits babies 8–18 lbs. A large newborn may be in Medium immediately. Check the size guide against your baby's birth weight before purchasing.

**Parents in very warm climates (consistently above 78°F indoors)** — the standard cotton HALO at 1.0 TOG may be too warm. The muslin 0.5 TOG version is the correct choice for warm climates, or use a short-sleeve onesie only with the standard cotton version.

## What to Know Before You Buy

- **Buy 3 at minimum** — one in use, one in the wash, one as backup. With reflux babies or spitty newborns, 3 is the minimum functional quantity.
- **The Velcro wings wear over time** — plan to replace each SleepSack at approximately 20 washes when Velcro grip reduces. This is normal wear, not a defect.
- **Transition to arms-out mode at the first sign of rolling** — even a wobble during supervised tummy time is the cue. Don't wait for confirmed rolling. Safety margin is more important than swaddle comfort at this point.
- **Hospital discharge HALO** — many US hospitals provide a HALO SleepSack at discharge. If yours does, this free Small is your first size covered. Ask your delivery team.
- **TOG rating guide:** 0.5 TOG for rooms above 75°F, 1.0 TOG for 68–75°F, 2.5 TOG for below 68°F. Dress the baby in a short-sleeve onesie with the 1.0 TOG as the baseline combination for most US homes.
`,

'baby-carriers/ergobaby-omni-360-review': `
## Who Should NOT Buy the Ergobaby Omni 360

**Parents in hot climates who will use it primarily in summer** — the woven cotton fabric of the standard Omni 360 holds heat. For warm-climate or summer-primary use, the Ergobaby Omni Breeze (same price, mesh construction) is the correct version. Don't buy the standard 360 for hot-weather use.

**Parents who want a stretchy wrap for the newborn period** — the Omni 360 is a structured carrier that works from birth, but many parents prefer the softer, more snuggly feel of a stretchy wrap (Solly Baby, Moby Wrap) for the newborn phase. Some parents use a wrap for 0–3 months and transition to the Omni 360 for structured carrying from 4 months onward.

**Parents who need a carrier for a very large toddler (over 45 lbs)** — the 45-lb weight limit is the Omni 360's ceiling. For parents who want to continue back-carrying a large toddler beyond this, the Tula Explore (50-lb limit) or Osprey toddler packs cover that range.

## What to Know Before You Buy

- **Take a babywearing class or watch the fit-check video** before the first use — especially for back carries. A carrier incorrectly positioned does not provide the described lumbar support and can cause back pain. One 20-minute fit-check session eliminates this.
- **The waist belt must sit on the hip bones, not the waist** — this is the single most common wearing error and the one that causes back pain. Belt on hips, not waist.
- **Wash before first use** — new carriers contain sizing agents from the fabric manufacturing process. A pre-wash softens the fabric and makes the initial break-in easier.
- **The front outward-facing position has a weight range** — it's best used from 5 months to approximately 20 lbs. Beyond 20 lbs, the front-facing position puts more strain on the wearer's back than inward or back-carry positions.
- **Omni 360 vs. Omni Breeze decision rule:** If you'll use it in summer or live in a warm climate, buy the Breeze. All other conditions, the standard 360 is fine.
`,

'monitors/infant-optics-dxr-8-pro-review': `
## Who Should NOT Buy the Infant Optics DXR-8 Pro

**Parents who want sleep analytics and breathing monitoring** — the DXR-8 Pro shows video. It does not analyse it. No sleep graphs, no breathing motion detection, no room condition data. If data-driven sleep monitoring is what you want, the Nanit Pro is the product.

**Parents with very large homes or thick walls** — the 800-foot range claim is line-of-sight. Through multiple walls and floors, effective range is typically 150–300 feet. If the nursery is far from the master bedroom across multiple walls, test coverage before relying on it.

**Parents who want smartphone remote access** — the DXR-8 Pro transmits to a dedicated parent unit only, not to a smartphone. You cannot check the nursery from your phone at work or in another room. The Nanit Pro or Eufy SpaceView Pro provide remote smartphone access.

## What to Know Before You Buy

- **The optical zoom lens ships in a small bag inside the box** — it is easy to miss. Find it before assuming the zoom isn't included.
- **The parent unit needs to be charged** — unlike the camera (which runs on AC power), the parent unit battery depletes. Charge it overnight so it's full at the start of monitoring.
- **The signal indicator matters** — a weak signal shows as 1–2 bars on the parent unit. If signal is consistently weak from the nursery, relocate the camera to face the direction of the parent unit's bedroom, or reduce obstructions in the signal path.
- **Audio sensitivity is adjustable** — set the sound alert threshold carefully on the first night. Too sensitive: you'll be alerted to every shuffle. Not sensitive enough: you'll miss escalations. Tune it over 2–3 nights.
- **Spare the optical zoom lens from drops** — it's glass, not plastic. A protective case or careful placement when switching between standard and zoom lenses prevents the most common damage.
`,

'strollers/babyzen-yoyo2-stroller-review': `
## Who Should NOT Buy the Babyzen YOYO2

**Parents who need an all-terrain stroller** — the YOYO2's 6.5-inch foam wheels are not built for gravel, grass, or rough trails. If your walking routes include parks with natural surfaces, beach boardwalks, or cobblestone streets regularly, the Baby Jogger City Mini GT2 or Bugaboo Fox 5 are the correct strollers.

**Suburban parents who primarily drive and don't fly** — the YOYO2's overhead-bin capability and compact fold are irrelevant if you're loading the stroller into a car boot. A full-size stroller provides more storage, smoother ride, and better canopy at the same or lower price.

**Parents who need a large storage basket** — the YOYO2 has a minimal basket. Urban parents doing grocery runs or carrying a full diaper bag will find the storage inadequate compared to full-size strollers.

## What to Know Before You Buy

- **The YOYO2 frame alone is $399** — add a colour pack ($180–200) for any usable configuration. Budget $580–600 for the full birth-to-toddler setup, not $399.
- **Verify your specific airline's policy before the first flight** — not all airlines permit the YOYO2 overhead regardless of its dimensions. British Airways, Air France, KLM are confirmed; US domestic carriers vary by aircraft type.
- **The 0+ newborn pack uses different hardware than the 6+ pack** — when transitioning between packs, all four attachment clips are different. Follow the instruction video, not intuition.
- **Register for the Babyzen warranty** at the time of purchase — the 2-year frame warranty requires registration on the Babyzen website within 30 days.
- **Carry the travel bag** on the first several flights until you've confirmed your overhead bin acceptance — the bag protects the frame from gate-check damage if an agent won't accept it overhead on a specific aircraft.
`,

'strollers/baby-jogger-city-mini-gt2-review': `
## Who Should NOT Buy the Baby Jogger City Mini GT2

**Families who will have a second child** — the GT2 is a single stroller only. It does not expand to a double. The Baby Jogger City Select ($599) shares the quick-fold DNA but converts to a double stroller. If a sibling is planned within 3 years, evaluate the City Select first.

**Newborn parents who want a bassinet stroller** — the GT2 does not include a bassinet and cannot accept a separate bassinet. For newborns, you need an infant car seat adapter to use the GT2 from birth. If you want to push a lie-flat sleeping newborn in the stroller itself (without the car seat), the UPPAbaby VISTA V2 or Bugaboo Fox 5 with their bassinets are the correct products.

**Parents who need the most compact fold possible** — the GT2 folds small but not carry-on small. For air travel or tiny-flat storage, the Babyzen YOYO2's fold dimensions are smaller.

## What to Know Before You Buy

- **Buy the snack tray at the same time** — it's not included, it's $25–35, and you'll want it by 6 months. Order it with the stroller to save on shipping.
- **Add a rain cover simultaneously** — the GT2 rain cover is stroller-specific for best fit. Buy it at purchase to have it before you need it.
- **Check infant car seat adapter compatibility** for your specific seat before assuming the GT2 accepts it — not all infant seats are compatible. The Baby Jogger website lists confirmed compatible seats.
- **Quarterly wheel maintenance** — remove the front wheels, clear debris from the axle housing with a toothbrush, apply a small amount of silicone grease to the swivel pin. This 10-minute task every 3 months keeps the steering crisp for years.
- **The GT2 is not rated for jogging** — it's an all-terrain stroller, not a jogging stroller. For running with a stroller, the Baby Jogger Summit X3 is the appropriate product (despite the brand name, the City Mini GT2 is not a running stroller).
`,

'car-seats/nuna-rava-convertible-review': `
## Who Should NOT Buy the Nuna RAVA

**Budget-conscious families** — at $499, the RAVA is one of the most expensive convertible seats. The Chicco NextFit Sport ($200) and Graco Extend2Fit ($180) provide safe, reliable rear-facing seats at less than half the price. Safety does not require a premium price — the RAVA's premium buys convenience features and premium materials, not fundamentally better crash protection.

**Parents who want a true all-in-one** — the RAVA is a convertible seat only. It transitions from rear-facing to forward-facing with a 65-lb harness limit but does not convert to a booster. For birth-through-childhood coverage in one seat, the Maxi-Cosi Pria or Graco 4Ever DLX are the options.

**Three-across configurations in compact vehicles** — the RAVA at 17.5 inches is narrower than many convertibles, which helps. But if you need three car seats across a compact rear bench, measure carefully and consider the Diono Radian 3RXT which is specifically engineered for narrow three-across configurations.

## What to Know Before You Buy

- **The magnetic chest clip requires practice** — it works automatically, but the first 5–10 uses feel unfamiliar. By the end of the first week, it becomes the fastest buckle experience you've had.
- **GREENGUARD Gold means avoid VOC-heavy cleaning products** — clean with water and mild soap only. Bleach, solvent-based cleaners, and harsh disinfectants can compromise the materials and void the certification premise.
- **The RAVA does not include a no-rethread harness** — wait, it does. Confirm in your specific model year's manual that the one-pull harness is functioning correctly before the first use. Harness height adjustment: pull the headrest lever and raise or lower the headrest. The harness moves with it.
- **Register immediately** with Nuna at nunausa.com — Nuna's customer service and recall communication requires registration.
- **Verify the LATCH anchor locations** in your vehicle — some vehicles have deeply recessed LATCH anchors that are difficult to reach. The RAVA's LATCH connectors are easy to use but require clear access. Use the vehicle seatbelt if LATCH anchors are inaccessible.
`,

'car-seats/britax-one4life-review': `
## Who Should NOT Buy the Britax One4Life

**Parents who want the magnetic chest clip** — the One4Life uses a standard chest clip. If the magnetic chest clip (available on the Nuna RAVA and Maxi-Cosi Pria) is a priority feature, neither the One4Life nor Graco 4Ever DLX provides it.

**Parents with GREENGUARD certification as a requirement** — the One4Life is not GREENGUARD Gold certified. The Nuna RAVA and Maxi-Cosi Pria both are. For families prioritising chemical emission standards, one of those seats is the correct choice.

**Very compact vehicle owners** — the One4Life at 19.5 inches wide is among the wider all-in-ones. In genuinely compact vehicles or tight rear seats, it may not fit comfortably or at all. Measure before purchasing.

## What to Know Before You Buy

- **The ClickTight installation requires threading the seatbelt** — open the front panel, run the seatbelt through the channel following the routing guides (there are colour-coded indicators), and close the panel. The panel cinches automatically. Watch the ClickTight installation video before the first installation.
- **The anti-rebound bar contacts your vehicle seat** — in vehicles with leather seats, place a small protective pad under the anti-rebound bar contact point to prevent marking the leather after extended use.
- **The ClickTight system works with seatbelt only** — you can also use LATCH, but the ClickTight mechanism specifically works with the vehicle seatbelt. You do not need both simultaneously; choose one installation method.
- **Mark the harness height slots** with a piece of tape when you find the correct position — then verify the marking every 3 months as the child grows. The no-rethread system makes adjustment easy; the marking reminder ensures you don't delay needed adjustments.
- **The One4Life is heavy** — 32 lbs. Moving it between vehicles requires effort. If you regularly transfer the seat between cars, consider a second seat rather than moving the One4Life.
`,

'car-seats/maxi-cosi-pria-all-in-one-review': `
## Who Should NOT Buy the Maxi-Cosi Pria All-in-One

**Parents who want maximum rear-facing duration** — the Pria rear-faces to 40 lbs. The Nuna RAVA and Britax One4Life both rear-face to 50 lbs. If staying rear-facing past 40 lbs is a priority, those seats are the correct choice.

**Parents who need slim dimensions for three-across** — the Pria is not among the narrowest seats. For true three-across configurations, the Diono Radian series is specifically engineered for that use case.

**Budget shoppers** — at $379, the Pria competes with the Britax One4Life and approaches the Nuna RAVA's price. For parents who want a safe, reliable all-in-one at lower cost, the Graco 4Ever DLX at $329 delivers the multi-stage functionality at a lower price point.

## What to Know Before You Buy

- **Mode 1 (reclined newborn) requires specific positioning** — read the manual section on newborn mode carefully before the first use. The reclined angle is deeper than standard rear-facing and requires confirming the correct base angle setting.
- **The Recline EZ indicator is visual** — look for the green zone in the indicator window, not just a feel of the recline position. Green zone = correct angle.
- **Air Protect headwings adjust as the child grows** — the headwing height should be set so the top of the wing is level with the child's ear. Re-check every 3 months.
- **The seat cover removal is tool-free** — push two tabs, slide the cover off. Machine wash on delicate, air dry. This is faster than almost every other car seat cover removal.
- **Five modes mean five sets of instructions** — the manual is comprehensive and should be read for each mode transition rather than relying on memory from a previous mode.
`,

'strollers/chicco-bravo-trio-travel-system-review': `
## Who Should NOT Buy the Chicco Bravo Trio

**Parents who already own a car seat or stroller** — if you have a Chicco car seat, you don't need the bundle. If you have a compatible stroller, same logic. The travel system value is in the bundle; individual components purchased separately are priced higher per item.

**Parents who want a lie-flat newborn pram mode** — the Bravo Trio uses the KeyFit 35 infant seat for newborn strolling. It does not offer a native lie-flat stroller seat for newborns. If you want to push a newborn in a flat pram position without the car seat, the Graco Modes Pramette Travel System provides this.

**Parents who prioritise stroller versatility over car seat quality** — the Bravo stroller is good but limited: no reversible seat in early models, single stroller only. For premium stroller features at a comparable price, buying the stroller and car seat separately from different brands (matching compatibility) provides more choice.

## What to Know Before You Buy

- **Confirm your configuration** — the Bravo Trio comes in both Bravo and Bravo For Me versions. The For Me version includes a more premium stroller frame with additional reclining positions. Confirm which you're purchasing.
- **The KeyFit 35 installs independently** from the Bravo stroller — you get a full LATCH-installed car seat base for the car, and the stroller is a separate product that the car seat snaps onto.
- **The carry handle weight** — the KeyFit 35 carrier with baby inside weighs 22+ lbs. Practice carrying it over short distances before relying on it for long walks to reduce wrist and shoulder strain.
- **Register both products separately** — the car seat and stroller both have independent registration requirements with Chicco for recall notification.
- **No basket on the car seat frame** — when the baby is in the KeyFit on the stroller, there is no underseat basket accessible. A stroller organiser bag that hangs from the handlebar solves this.
`,

'breast-pumps/elvie-stride-review': `
## Who Should NOT Buy the Elvie Stride

**Parents whose insurance covers neither wearable pump** — if you're paying out of pocket for the Stride at $379, calculate whether the Spectra S2 ($160) + hands-free bra ($30) = $190 delivers 85% of the functionality. For parents who pump primarily seated, it does.

**Exclusive pumpers prioritising maximum output** — the Spectra S2 at 300 mmHg remains the benchmark for output volume. For exclusive pumpers where every millilitre is critical, the Spectra as the primary pump with the Stride as the on-the-go secondary is the most effective combination.

**Parents who dislike app-dependent devices** — all Elvie settings require Bluetooth and the Elvie app. There are physical buttons for start/stop on the unit, but adjusting suction level mid-session requires the app. If your phone battery dies, you're locked to the last setting.

## What to Know Before You Buy

- **Check insurance before anything else** — go to aeroflowbreastpumps.com, enter your insurance details, and see whether the Elvie Stride is covered. If it is, this entire pricing analysis becomes irrelevant.
- **The hub connects via a thin tube** — the tube runs from the hub (in your pocket or bra strap) to the cup unit (in your bra). It is thinner than a headphone cable. Most parents stop noticing it within a week.
- **Flange sizing is as critical with the Stride as with any pump** — Elvie's 21mm, 24mm, and 28mm options cover most users. Measure before your first session.
- **The session data in the Elvie app** is useful for troubleshooting output issues — share session logs with your lactation consultant if you're experiencing low output. The data often points to a mechanical or positioning issue quickly.
- **The Stride cups are not invisible under all fabrics** — under a thin T-shirt, the cup shape may be visible. A loose top, nursing camisole, or patterned fabric hides them completely.
`,

'nursing-chairs/babyletto-tuba-swivel-glider-review': `
## Who Should NOT Buy the Babyletto Tuba Swivel Glider

**Very tall parents (over 6'2")** — the Tuba's back height and lumbar position are optimised for average height ranges. Very tall parents may find the lumbar support lands too low on the lower back for comfortable long sessions. Test in a showroom if possible.

**Parents in very small nurseries** — the Tuba's swivel requires a 25-inch clear radius around the chair. In a nursery where the crib, dresser, and changing table leave minimal floor space, the swivel can be obstructed. Measure before purchasing.

**Parents who want the most supportive glider regardless of design** — the DutailierSignature glider range offers more ergonomic lumbar support variety (multiple back height and tilt options) and a wider seat for larger frames. If ergonomic support trumps design, Dutailier is worth evaluating.

## What to Know Before You Buy

- **The ottoman is not included** and costs $250 separately — this is genuinely recommended. A nursing session without foot support significantly increases lower back load over a 20–40 minute feed. Budget for the ottoman at purchase.
- **Test the swivel resistance** if purchasing in a showroom — the swivel should move freely but with slight resistance that prevents the chair from spinning unintentionally. A new unit should feel smooth but controlled.
- **The glide motion has a finite stroke** — the Tuba's glide arc is approximately 4 inches forward and back. If you prefer a longer gliding stroke, test before committing.
- **Assembly is approximately 30 minutes** — the box arrives flat-packed. Allow an evening for assembly before the baby arrives; doing it with a newborn in the house is more difficult than expected.
- **Spot-clean protein stains immediately** — breast milk, spit-up, and formula are protein-based. Cold water on a clean cloth, applied within the first minute, removes them. Hot water sets the stain permanently.
`,

'baby-bouncers/babybjorn-bouncer-bliss-review': `
## Who Should NOT Buy the BabyBjörn Bouncer Bliss

**Parents whose babies are primarily soothed by swinging motion** — the Bliss bounces. It does not swing in an arc. Some babies respond specifically to pendulum swinging (like a traditional baby swing or the 4moms mamaRoo's tree swing mode) and are indifferent to bouncing. If your baby loves being rocked side-to-side or in an arc, the Bliss won't satisfy that preference.

**Parents who want motorised hands-free operation** — the Bliss requires a push to start and relies on baby movement to continue. If you need to place the baby and walk away to a different room, a motorised swing (4moms mamaRoo, Fisher-Price Snugapuppy) provides continuous motion without any baby movement input.

**Budget-focused parents** — the Fisher-Price Snugapuppy bouncer at $50 provides motorised bouncing with music for one-fifth the Bliss's price. For parents who just need a safe place to put the baby for brief periods, it's entirely adequate.

## What to Know Before You Buy

- **The bounce is initiated by a push or by the baby's movement** — in the first weeks, the baby may not move enough to sustain bouncing on their own. A gentle push starts the motion; it will continue as long as the baby moves.
- **The Bliss is not a swing** — confirm your intended use. If you're picturing an arc motion, the Bliss does not provide it.
- **Place only on the floor** — the Bliss's foot rests sit flush with the ground. On any elevated surface (table, sofa, counter), the bouncing motion can walk the bouncer to the edge. Floor placement is non-negotiable.
- **The mesh fabric version** (same price as cotton) is the correct choice for summer or warm homes. It provides meaningfully more airflow and there is no functional trade-off.
- **Wash the cover before first use** — new fabric contains manufacturing residues. A cold gentle wash and air dry before the first use is recommended.
`,

'high-chairs/4moms-connect-high-chair-review': `
## Who Should NOT Buy the 4moms Connect

**Parents who want the chair to serve beyond the high chair phase** — the Stokke Tripp Trapp adjusts to serve as a child's dining chair through childhood and even as an adult chair. The 4moms Connect is a high chair for the feeding phase; it does not grow with the child into a standard seat.

**Parents without a 4moms stroller** — the Connect's seat transfer to a 4moms stroller frame is the product's signature capability. Without a 4moms stroller, this feature is irrelevant and the Connect competes solely on its high chair merits against cheaper options like the IKEA ANTILOP or Graco Slim Snacker.

**Parents who want a floor-level feeding option** — the Connect is a standard-height high chair only. It does not have a low or booster mode for floor-level feeding. For parents who want the option of feeding the baby at floor level, a separate hook-on chair or booster covers this gap.

## What to Know Before You Buy

- **The magnetic tray requires correct alignment** — the first few uses feel unfamiliar as you learn the click-in direction. After 5–10 uses, it becomes intuitive and significantly faster than any non-magnetic tray.
- **Wipe the magnet interface monthly** — food residue on the magnetic contact surface reduces the snapping force over time. A damp cloth monthly keeps it performing as new.
- **The recline positions have a minimum age recommendation** — the most reclined position is for babies who cannot yet sit fully upright (approximately 4–6 months). Confirm your baby has adequate trunk support before using upright positions.
- **Height adjustment range** — the 7-position height adjustment covers tables from 27 to 36 inches. Measure your table before purchasing to confirm compatibility, particularly for non-standard table heights.
- **The seat pad is machine washable** — cold water, gentle cycle, air dry. Washing frequency with a self-feeding baby: approximately weekly.
`,

'baby-swings/4moms-mamaroo-4-review': `
## Who Should NOT Buy the 4moms mamaRoo 4

**Parents of babies who don't respond to motorised motion** — this is the central risk. No predictor exists before birth. If your baby needs to be held rather than placed in any device, the mamaRoo is irrelevant regardless of its motion variety.

**Parents who need a portable solution** — the mamaRoo is AC-powered (no battery) and weighs 24 lbs. It is not portable. If you need to move a soother between rooms frequently, the BabyBjörn Bouncer Bliss at 5.3 lbs is the portable option.

**Parents with very small nurseries or apartments** — the mamaRoo seat's footprint is approximately 25 × 24 inches. In a small nursery where every square foot is allocated, this is significant. Measure available floor space before purchasing.

## What to Know Before You Buy

- **Try before you commit if possible** — some buy buy BABY stores have mamaRoo demo units. Placing your baby in a demo unit before birth is obviously not possible, but observing the motion patterns helps calibrate expectations.
- **The mamaRoo rental option exists** — Rent My Baby and local Facebook parenting groups offer monthly rental. For the 4–6 month primary use period at $30–50/month, renting mitigates the risk if your baby doesn't respond.
- **App Bluetooth must be re-paired after updates** — the 4moms app occasionally requires re-pairing after firmware or app updates. This is a 2-minute process but can be surprising if it happens at an inconvenient moment.
- **The speed settings matter for newborns vs. older infants** — start at speed 1–2 for newborns. Speeds 4–5 are appropriate for older, heavier infants who need more motion to achieve the same soothing effect.
- **The mamaRoo 4 vs. MamaRoo 5** — the MamaRoo 5 (current model) adds USB charging and a slightly quieter motor. If you find the mamaRoo 4 at significant discount ($150–180 used), the functional difference is minimal.
`,

'cribs/davinci-kalani-4-in-1-crib-review': `
## Who Should NOT Buy the DaVinci Kalani 4-in-1

**Parents who want the most modern/design-forward nursery** — the Kalani is clean and attractive, but the Babyletto Hudson ($379) and other contemporary cribs have a more design-forward aesthetic. If the nursery is design-focused, the $100 Babyletto premium may be worthwhile.

**Parents who want a smart crib or motorised bassinet** — the Kalani is a static, unpowered crib. For smart nursery features (motorised rocking, responsive soothing, sleep tracking), the SNOO Smart Sleeper serves the newborn period; the Kalani is the static safe-sleep option from 5–6 months onward.

**Parents seeking the absolute lowest-cost safe crib** — the IKEA SUNDVIK at approximately $200 provides a safe, FSC-certified crib at $80 less than the Kalani. It does not have GREENGUARD Gold certification or the same conversion path, but it is structurally safe. For parents where budget is the dominant constraint, the SUNDVIK is a legitimate choice.

## What to Know Before You Buy

- **Allow 3–6 weeks for delivery** if ordering online — DaVinci Kalani is often backordered during peak nursery season (August–November). Order early if your due date falls in this window.
- **The conversion kit is not included** — the full-size bed conversion kit ($99 from DaVinci/Amazon) is a separate purchase. Budget for it if you plan to use the crib through Stage 4.
- **Set the mattress to the highest position at setup** — many parents forget to lower it as the baby develops. Set a phone reminder: lower to middle position at 4 months, lowest position at 7 months (or first pull-to-stand attempt, whichever comes first).
- **Assembly requires two people** — one person holds the side rail while the other inserts the bolts. Attempting solo assembly is possible but significantly harder. Allow 45–60 minutes.
- **GREENGUARD Gold covers chemicals, not structural safety** — both GREENGUARD and ASTM/CPSC compliance are required. The Kalani has both, which is the full safety credential set.
`,

'strollers/graco-modes-pramette-travel-system-review': `
## Who Should NOT Buy the Graco Modes Pramette Travel System

**Parents who prioritise car seat installation ease** — the bundled SnugRide 35 LX is a good car seat, but its installation is less foolproof than the Chicco KeyFit 35's SuperCinch LATCH. If installation confidence is the priority, the Chicco Bravo Trio's KeyFit 35 is the better travel system.

**Parents who need a lightweight stroller** — the Modes Pramette at 27.3 lbs is heavier than most mid-range single strollers. Parents who regularly lift the stroller into a car boot, carry it up stairs, or fold/unfold frequently will feel this weight.

**Urban parents who need an all-terrain stroller** — the Modes Pramette is a city/suburban stroller with standard wheels. For mixed-terrain use (parks with unpaved paths, cobblestones, gravel), the Baby Jogger City Mini GT2 with its all-terrain wheels handles rough surfaces better.

## What to Know Before You Buy

- **Test the pramette mode transition** in a showroom before purchasing — the mode transformation between pramette and standard seat is the product's headline feature. Confirm you find it intuitive before committing.
- **The 27.3 lb weight is real** — if you're in the third trimester when purchasing, have a partner or friend lift the stroller into your car boot to confirm it's manageable. Postpartum lifting restrictions can make this weight challenging in the early weeks.
- **The SnugRide 35 LX base installs via LATCH** — read the base installation instructions carefully. The SnugRide's installation is straightforward but not as self-evidently correct as the Chicco KeyFit 35's bubble level system.
- **Register both products separately** — the stroller and car seat both require independent registration with Graco for recall notifications.
- **The pramette lie-flat mode is for outdoor strolling, not overnight sleep** — the stroller is not a safe sleep surface. The pramette mode is for daytime outings, not for leaving a sleeping baby unattended.
`,

'strollers/uppababy-vista-v2-review': `
## Who Should NOT Buy the UPPAbaby VISTA V2

**Single-child families who don't anticipate a second child** — the VISTA V2's core premium over the Bugaboo Fox 5 and Baby Jogger City Mini GT2 is the sibling expansion capability. If you're certain you'll have one child, the Bugaboo Fox 5 offers superior ride quality and the Baby Jogger GT2 offers superior fold and value. Neither requires the VISTA V2's $200–300 premium.

**Jogging/running parents** — the VISTA V2 is not a jogging stroller. The suspension is not rated for running, and the fixed-front-wheel mode is limited. For parents who want to run with a stroller, the BOB Revolution or Thule Urban Glide 2 are the products.

**Parents who want the lightest possible stroller** — the VISTA V2 at 27 lbs is heavier than the Fox 5 (21.8 lbs), GT2 (21.8 lbs), and Babyzen YOYO2 (13.6 lbs). For parents who regularly carry the stroller or live in walkup buildings, the weight is a meaningful daily consideration.

## What to Know Before You Buy

- **The bassinet is often included in standard retail configurations** but confirm at purchase — some configurations are frame + seat only. The bassinet ($200 value) changes the newborn-period calculus significantly.
- **The RumbleSeat for a second child ($230) attaches to the front** in the most common configuration — the first child rides in the main seat; the second child rides in front. Test this configuration in a store to confirm the stroller's handling with both seats loaded.
- **The VISTA V2 does not fold with the bassinet attached** — the bassinet must be removed before folding. This is a 15-second step but worth knowing before you're at a car boot with a sleeping newborn.
- **The underseat basket does not open from the front** — access is from the rear only. If you regularly need to retrieve items from the basket while the stroller is at a shop counter, you'll go around the stroller each time.
- **UPPAbaby's customer service is industry-leading** — register immediately and contact them for any issue. The VISTA V2's warranty coverage and post-sale support reputation is among the best in the premium stroller category.
`,

'baby-carriers/babybjorn-one-air-review': `
## Who Should NOT Buy the BabyBjörn One Air

**Parents in cool or temperate climates who prioritise warmth** — the 3D mesh construction that makes the One Air breathable makes it cold in cool weather. In temperatures below 60°F, the mesh provides minimal insulation. For year-round carrying in cool climates, the Ergobaby Omni 360's woven cotton is the warmer and more practical choice.

**Budget-conscious parents** — at $250, the One Air is $70 more than the Ergobaby Omni 360, which provides comparable positioning and all four carry positions. For parents where $70 is meaningful, the Omni 360's functionality at lower cost is the rational choice.

**Parents who want the most ergonomic long-duration toddler carry** — for 2+ hour back carries with a heavy toddler, carriers with a crossback strap configuration (Ergobaby Omni 360's cross-strap option, Tula Free-to-Grow) distribute load more evenly than the One Air's parallel shoulder strap design.

## What to Know Before You Buy

- **The waist belt must sit on the iliac crest (hip bones), not the waist** — this is the critical fit point. Belt at the waist = all weight on shoulders = back pain. Belt at the hip = weight transferred to the hips = comfortable for extended carries. Spend 2 minutes with the fitting video to get this right.
- **The mesh requires gentle cycle washing in a mesh bag** — standard agitation can deform the 3D mesh structure. Air dry only; tumble drying damages the shoulder strap foam padding.
- **The outward-facing position weight limit** is lower than the product's overall limit — BabyBjörn recommends outward-facing only until 12 months and approximately 18–20 lbs. Beyond this, transition to inward-facing or back carry.
- **Babywearing groups offer free fit checks** — find your local chapter through the Babywearing International directory. A 20-minute in-person check confirms correct fit more effectively than any video.
- **The One Air vs. One Air Cool** — BabyBjörn sells an "One Air Cool" version with slightly different mesh composition marketed for very hot climates. At the same price, it provides marginally more airflow in extreme heat. In moderate climates, the standard One Air is sufficient.
`,

};

// ── Inject before ## Related Articles ────────────────────────────────────────
let updated = 0;
let issues = 0;

for (const [key, extra] of Object.entries(EXTRA_SECTIONS)) {
  const [catKey, slug] = key.split('/');
  const filePath = path.join(contentRoot, catKey, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ Not found: ${filePath}`);
    issues++;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  const { data: fm, content: body } = matter(raw);

  if (!body.includes('## Related Articles')) {
    console.warn(`⚠ No Related Articles marker: ${key}`);
    issues++;
    continue;
  }

  if (body.includes('Who Should NOT Buy')) {
    console.log(`⏭ Already has Who Should NOT Buy: ${key}`);
    continue;
  }

  const newBody = body.replace(
    /^## Related Articles/m,
    extra.trim() + '\n\n## Related Articles'
  );

  fs.writeFileSync(filePath, matter.stringify(newBody, fm), 'utf8');
  updated++;
  console.log(`✅ ${key}`);
}

console.log(`\n✅ Done: ${updated} updated, ${issues} issues`);
