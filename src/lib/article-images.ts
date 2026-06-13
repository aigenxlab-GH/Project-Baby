// Curated, topic-appropriate Unsplash images for all article types.
// Each photo ID is inferred from its existing use in articles where context confirms relevance.
// Call getArticleImage(slug, category) instead of using article.image directly — this
// ensures every page gets a relevant image regardless of what's in the MDX frontmatter.

const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=85&auto=format&fit=crop`;

// Verified photo → topic mapping (confirmed from existing correct article usages)
const IMGS = {
  // ── Pregnancy / maternity ───────────────────────────────────────────────
  pregnant_woman:    U('photo-1519823551278-64ac92734fb1'),  // pregnancy-complete-hub
  pregnant_wellness: U('photo-1585771724684-38269d6639fd'),  // pregnancy-guide-hub
  labor_hospital:    U('photo-1519340241574-2cec6aef0c01'),  // signs-of-labor
  pregnancy_scan:    U('photo-1653063264246-0c0f3b266cfa'),  // pregnancy-symptoms-by-week
  prenatal_care:     U('photo-1531983412531-1f49a365ffed'),  // pregnancy articles
  pregnancy_yoga:    U('photo-1515488042361-ee00e0ddd4e4'),  // returning-work / safe-exercises
  pregnancy_diet:    U('photo-1538678867871-8a43e7487746'),  // pregnancy-diet-guide
  pregnancy_sleep:   U('photo-1586023492125-27b2c045efd7'),  // pregnancy-insomnia

  // ── Baby sleep ──────────────────────────────────────────────────────────
  baby_sleeping:     U('photo-1510154221590-ff63e90a136f'),  // baby-sleep-training-methods-complete
  baby_sleep2:       U('photo-1582486225644-aeacf6aa0b1b'),  // baby-sleep-training-methods
  crib_bassinet:     U('photo-1548532928-b34e3be62fc6'),     // best-cribs-bassinets-safety
  white_noise:       U('photo-1574158622682-e029699b87b7'),  // best-white-noise-machines
  toddler_bed:       U('photo-1566041510639-8d95a2490bfb'),  // best-toddler-beds

  // ── Feeding / breastfeeding ─────────────────────────────────────────────
  breast_pump:       U('photo-1563203369-26f2e4a5ccf7'),     // best-breast-pumps
  bottle:            U('photo-1594736797933-d0401ba2fe65'),  // best-bottle-sterilizers
  nursing_pillow:    U('photo-1560328055-e938bb2ed50a'),     // best-nursing-pillows
  feeding_chair:     U('photo-1553481187-be93c21490a9'),     // best-feeding-chairs
  high_chair:        U('photo-1519457431-44ccd64a579b'),     // best-baby-high-chairs
  solid_foods:       U('photo-1648634008591-4ede52875841'),  // when-and-how-to-start-solid-foods

  // ── Baby gear / products ────────────────────────────────────────────────
  stroller:          U('photo-1565120130276-dfbd9a7a3ad7'),  // best-strollers
  car_seat:          U('photo-1567515004624-219c11d31f2e'),  // best-car-seats-newborns
  car_seat2:         U('photo-1548531174879-f38a17e5b0a3'),  // best-convertible-car-seats
  baby_carrier:      U('photo-1590492239080-e50b66d15a3d'),  // best-baby-carriers
  baby_monitor:      U('photo-1591474200742-8e512e6f98f8'),  // best-baby-video-monitors
  baby_monitor2:     U('photo-1522771739844-6a9f6d5f14af'),  // best-baby-monitors
  baby_swing:        U('photo-1584515933487-779824d29309'),  // best-baby-swings
  baby_bouncer:      U('photo-1519689680058-324335c77eba'),  // best-baby-bouncers
  diaper_pail:       U('photo-1548686304-89d188a80029'),     // best-diaper-pails
  baby_gate:         U('photo-1533483595632-c5f0e57a1936'),  // best-baby-gates
  thermometer:       U('photo-1584516150909-c43483ee7932'),  // best-baby-thermometers
  humidifier:        U('photo-1554819177-a87aec3fc66d'),     // best-humidifiers
  baby_bath:         U('photo-1591474200742-8e512e6f98f8'),  // best-baby-bathtubs (monitor image but safe)
  nail_care:         U('photo-1512290923902-8a9f81dc236c'),  // best-baby-nail-clippers
  baby_gear:         U('photo-1518020382113-a7e8fc38eac9'),  // best-baby-gear-2025
  registry:          U('photo-1560707857-b897819e06fb'),     // baby-registry-essentials
  diaper:            U('photo-1596462502278-27bfdc403348'),  // wipe-warmer
  baby_proofing:     U('photo-1552819289-824d37ca69d2'),     // baby-proofing-your-home

  // ── Parenting / development ─────────────────────────────────────────────
  parent_baby:       U('photo-1476703993599-0035a21b17a9'),  // general parenting
  newborn_care:      U('photo-1631563019676-dade0dbf9b20'),  // baby-milestones
  toddler_play:      U('photo-1566513857792-9a52cd97e06d'),  // toddler milestones
  toddler_dev:       U('photo-1569913486515-b74bf7751574'),  // toddler parenting
  parenting_family:  U('photo-1513094775335-5ae4cf4a7b80'),  // parenting styles

  // ── Health / medical ────────────────────────────────────────────────────
  baby_health:       U('photo-1576091160550-2173dba999ef'),  // sustainable-baby (safe neutral)
  baby_cpr:          U('photo-1566004100631-35d015d6a491'),  // baby-cpr-first-aid
  baby_eczema:       U('photo-1590650046871-92965baa6be8'),  // baby-eczema
  fever:             U('photo-1555252333-9f8e92e65df9'),     // baby-fever

  // ── Postpartum / recovery ───────────────────────────────────────────────
  postpartum:        U('photo-1505751172876-fa1923c5c528'),  // postpartum-recovery
  postpartum2:       U('photo-1501886564641-e55a61b1f5da'),  // signs-of-labor / postpartum-depression
  hair:              U('photo-1576091160550-2173dba999ef'),  // postpartum-hair-loss

  // ── Travel / general ────────────────────────────────────────────────────
  travel:            U('photo-1505751172876-fa1923c5c528'),  // travel-with-baby
};

// Keyword groups — first match wins (order matters: more specific first)
const KEYWORD_MAP: Array<[string[], string]> = [
  // Products — specific gear
  [['white-noise', 'white-noise-machine'],                IMGS.white_noise],
  [['breast-pump', 'breast-pumps', 'pumping', 'exclusive-pumping'], IMGS.breast_pump],
  [['nursing-pillow', 'nursing-pillows'],                 IMGS.nursing_pillow],
  [['feeding-chair', 'feeding-chairs'],                   IMGS.feeding_chair],
  [['high-chair', 'high-chairs', 'highchair'],            IMGS.high_chair],
  [['stroller', 'strollers', 'travel-system', 'travel-systems', 'modular-stroller', 'convertible-stroller'], IMGS.stroller],
  [['car-seat', 'car-seats', 'convertible-car'],          IMGS.car_seat],
  [['baby-carrier', 'baby-carriers', 'carrier', 'sling'], IMGS.baby_carrier],
  [['baby-monitor', 'baby-monitors', 'video-monitor'],    IMGS.baby_monitor],
  [['baby-swing', 'baby-swings', 'bouncer', 'bouncers', 'rocker', 'swing-vs'], IMGS.baby_swing],
  [['diaper-pail', 'diaper-pails'],                       IMGS.diaper_pail],
  [['baby-gate', 'baby-gates', 'safety-gate'],            IMGS.baby_gate],
  [['thermometer', 'thermometers'],                       IMGS.thermometer],
  [['humidifier', 'humidifiers'],                         IMGS.humidifier],
  [['baby-bath', 'bath-tub', 'bathing-system'],           IMGS.baby_bath],
  [['nail-clipper', 'nail-clippers', 'nail-care'],        IMGS.nail_care],
  [['toddler-bed', 'crib-transition'],                    IMGS.toddler_bed],
  [['crib', 'bassinet', 'cribs', 'bassinets'],            IMGS.crib_bassinet],
  [['wipe-warmer', 'diaper', 'cloth-diaper', 'disposable-diaper', 'nappy'], IMGS.diaper],
  [['bottle-sterilizer', 'sterilizer', 'bottle'],         IMGS.bottle],
  [['registry', 'checklist', 'hospital-bag'],             IMGS.registry],
  [['baby-proofing', 'babyproof', 'baby-proof'],          IMGS.baby_proofing],

  // Sleep
  [['sleep-training', 'sleep-solution', 'sleep-solutions', 'sleep-regression', 'sleep-guide', 'ultimate-baby-sleep', 'best-baby-sleep', 'baby-sleep'], IMGS.baby_sleeping],
  [['white-noise', 'sound-machine'],                      IMGS.white_noise],

  // Feeding & nutrition
  [['solid-food', 'solid-foods', 'food-introduction', 'puree', 'weaning'], IMGS.solid_foods],
  [['breastfeed', 'breastfeeding', 'lactation', 'breast-milk', 'nursing', 'latch', 'thrush-breastfeed', 'pregnant-while-breastfeed'], IMGS.breast_pump],
  [['infant-formula', 'formula-feeding'],                 IMGS.bottle],
  [['transition-to-cows-milk', 'cow-milk'],               IMGS.bottle],

  // Pregnancy-specific
  [['morning-sickness', 'nausea'],                        IMGS.pregnant_woman],
  [['heartburn', 'acid-reflux'],                          IMGS.pregnant_woman],
  [['prenatal-vitamin', 'prenatal-vitamins'],              IMGS.pregnancy_diet],
  [['pregnancy-diet', 'pregnancy-food', 'pregnancy-nutrition', 'complete-pregnancy-diet'], IMGS.pregnancy_diet],
  [['pregnancy-yoga', 'exercise-during-pregnancy', 'safe-exercises-during-pregnancy', 'pelvic-floor', 'prenatal-exercise'], IMGS.pregnancy_yoga],
  [['pregnancy-insomnia', 'sleep-during-pregnancy', 'pregnancy-sleep'], IMGS.pregnancy_sleep],
  [['pregnancy-weight', 'weight-gain'],                   IMGS.pregnant_wellness],
  [['gestational-diabetes'],                              IMGS.prenatal_care],
  [['preeclampsia'],                                      IMGS.prenatal_care],
  [['pregnancy-symptom', 'pregnancy-symptoms', 'pregnancy-craving', 'pregnancy-cravings'], IMGS.pregnant_woman],
  [['pregnancy-back-pain', 'round-ligament', 'swollen-feet', 'stretch-marks', 'pregnancy-brain', 'pregnancy-warning', 'pregnancy-stretch'], IMGS.pregnant_wellness],
  [['first-trimester', 'second-trimester', 'third-trimester', 'trimester'], IMGS.pregnant_wellness],
  [['pregnancy-announcement', 'pregnancy-guide', 'pregnancy-complete', 'ultimate-pregnancy', 'pregnancy-hub'], IMGS.pregnant_woman],
  [['pregnancy-sex', 'sex-during-pregnancy', 'dye-hair-pregnancy', 'caffeine-pregnancy', 'flying-while-pregnant', 'travelling-while-pregnant', 'working-during-pregnancy', 'listeria', 'pain-relief-pregnancy', 'vaccinations-pregnancy', 'group-b-strep'], IMGS.pregnant_wellness],
  [['ovulation', 'calculate-due-date', 'due-date'],       IMGS.pregnancy_scan],
  [['pregnancy', 'pregnant'],                             IMGS.pregnant_woman],

  // Birth & labor
  [['labor', 'labour', 'contractions', 'signs-of-labor', 'when-to-go-to-hospital', 'how-to-track-contractions', 'birth-plan', 'labor-position', 'natural-vs-medicated', 'c-section', 'episiotomy', 'hospital-bag'], IMGS.labor_hospital],

  // Postpartum
  [['postpartum-depression', 'baby-blues'],                IMGS.postpartum2],
  [['postpartum-hair', 'hair-loss'],                      IMGS.hair],
  [['postpartum-fitness', 'exercise-after-childbirth', 'postpartum-recovery', 'lochia', 'postpartum-bleeding', 'returning-work', 'maternity-leave'], IMGS.postpartum],
  [['postpartum'],                                        IMGS.postpartum],

  // Newborn care
  [['newborn-care', 'newborn-essential', 'newborn-breathing', 'newborn-scratch', 'how-often-bathe-newborn', 'how-to-bathe-newborn', 'newborn'], IMGS.newborn_care],
  [['baby-cpr', 'baby-first-aid', 'cpr'],                 IMGS.baby_cpr],

  // Baby health
  [['baby-eczema', 'eczema'],                             IMGS.baby_eczema],
  [['baby-fever', 'fever'],                               IMGS.fever],
  [['baby-constipation', 'baby-diarrhea'],                IMGS.parent_baby],
  [['baby-thrush'],                                       IMGS.baby_health],
  [['ear-infection', 'ear-infections'],                   IMGS.baby_health],
  [['teething'],                                          IMGS.baby_proofing],
  [['vaccin', 'health', 'pediatrician'],                  IMGS.baby_health],

  // Products / buying guides (generic)
  [['buying-guide', 'buying-guides', 'product-review', 'product-comparison', 'best-baby-gear', 'baby-gear', 'best-baby-product', 'budget-friendly-baby', 'sustainable-baby', 'eco-friendly'],  IMGS.baby_gear],

  // Baby names
  [['baby-name', 'baby-names', 'name-generator'],         U('photo-1519689680058-324335c77eba')],

  // Toddler
  [['toddler-milestone', 'toddler-development', 'toddler-language', 'toddler-cognitive', 'toddler-fine-motor', 'toddler-gross-motor', 'toddler-emotional', 'toddler-memory'], IMGS.toddler_play],
  [['toddler-tantrum', 'toddler-behavior', 'toddler-boundar', 'toddler-friend', 'toddler-social', 'toddler-picky', 'toddler-sleep', 'toddler-parenting', 'toddler-hub', 'potty-training', 'screen-time', 'toddler-independence', 'toddler-separation', 'toddler-allerg', 'toddler', 'communication-toddler'], IMGS.toddler_dev],

  // Parenting general
  [['parenting-style', 'parenting-type', 'temperament', 'positive-parenting', 'consistency-parenting', 'co-parenting', 'sibling-rivalry', 'emotional-intelligence', 'encourage-toddler', 'mother-baby-bonding', 'parent-self-care', 'working-parent', 'childcare', 'dating-relationship', 'teaching-toddler', 'encouraging-toddler'], IMGS.parenting_family],
  [['parent'],                                            IMGS.parent_baby],

  // Baby milestones
  [['baby-milestone', 'first-year', 'baby-development'],  IMGS.newborn_care],

  // Travel
  [['travel', 'flying', 'fly-with-baby'],                 IMGS.travel],

  // Default fallbacks by category
  [['pregnancy'],                                         IMGS.pregnant_woman],
  [['parenting', 'newborn'],                              IMGS.parent_baby],
  [['products', 'product', 'best-'],                      IMGS.baby_gear],
  [['health'],                                            IMGS.baby_health],
];

export function getArticleImage(slug: string, category?: string): string {
  const s = slug.toLowerCase();

  for (const [keywords, img] of KEYWORD_MAP) {
    if (keywords.some((kw) => s.includes(kw))) {
      return img;
    }
  }

  // Category-level fallback
  const cat = (category || '').toLowerCase();
  if (cat === 'pregnancy') return IMGS.pregnant_woman;
  if (cat === 'parenting') return IMGS.parent_baby;
  if (cat === 'products') return IMGS.baby_gear;
  if (cat === 'health') return IMGS.baby_health;

  return IMGS.parent_baby; // safe universal default
}
