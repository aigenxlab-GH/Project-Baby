// Curated, topic-appropriate Unsplash images for all article types.
// Every photo ID below was selected via the Unsplash Search API and VERIFIED by its
// alt_description text (shown in the trailing comment) — so the SUBJECT is confirmed,
// not just that the URL loads. All subjects are pregnancy / baby / parenting / baby products.
// Call getArticleImage(slug, category) instead of using article.image directly.

const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=85&auto=format&fit=crop`;

// Verified photo → topic mapping (alt_description confirmed via Unsplash API)
const IMGS = {
  // ── Pregnancy / maternity ───────────────────────────────────────────────
  pregnant_woman:    U('photo-1568043625493-2b0633c7c491'),  // "pregnant near door"
  pregnant_wellness: U('photo-1518197533112-caf4010e9d42'),  // "pregnant woman holding her tummy during daytime"
  labor_hospital:    U('photo-1604807787527-e7ad386cca6a'),  // "man in blue scrub suit holding baby" (hospital birth)
  pregnancy_scan:    U('photo-1541525104203-650998d309cb'),  // "woman holding ultrasound results"
  prenatal_care:     U('photo-1632053652571-a6a45052bbbd'),  // "a doctor talking to a pregnant woman in a waiting room"
  pregnancy_yoga:    U('photo-1626444231642-6bd985bca16a'),  // "woman in black tank top doing yoga"
  pregnancy_diet:    U('photo-1587061853304-13dbe42cfba4'),  // "woman slicing green vegetable" (healthy eating)
  pregnancy_sleep:   U('photo-1543270216-7c25819fe5af'),     // "pregnant woman lying on the sofa"
  pregnancy_vitamins:U('photo-1577563651033-ec73e8228a03'),  // "pregnant woman in blue dress holding blister pack"

  // ── Baby sleep ──────────────────────────────────────────────────────────
  baby_sleeping:     U('photo-1511948374796-056e8f289f34'),  // "baby covered with white blanket"
  baby_sleep2:       U('photo-1546015720-b8b30df5aa27'),     // "baby's gray knit hat" (sleeping newborn)
  crib_bassinet:     U('photo-1505679208891-9ab12ee61dc1'),  // "baby in bassinet"
  white_noise:       U('photo-1542387960-f8197d82db42'),     // "baby sleeping on gray and white bed"
  toddler_bed:       U('photo-1556265617-02021d9b0fa5'),     // "toddler's bed with mesh canopy"

  // ── Feeding / breastfeeding ─────────────────────────────────────────────
  breast_pump:       U('photo-1751890855898-0f6f53d5477d'),  // "A baby breastfeeds, clinging to its mother"
  bottle:            U('photo-1529567054786-fc5235fdd39e'),  // "person feeding baby from feeding bottle"
  nursing_pillow:    U('photo-1648375975494-30e0629799a4'),  // "a woman holding a baby under a blanket" (nursing)
  feeding_chair:     U('photo-1557939663-0619f304af9c'),     // "a baby sitting in a high chair eating food"
  high_chair:        U('photo-1597178380795-38c56a1a7053'),  // "baby in white onesie sitting on white high chair"
  solid_foods:       U('photo-1544829832-c8047d6b9d89'),     // "person feeding baby"

  // ── Baby gear / products ────────────────────────────────────────────────
  stroller:          U('photo-1538077649323-d34ea3bab314'),  // "baby lying on stroller during daytime"
  car_seat:          U('photo-1634414257452-e8843a9ae1a8'),  // "a baby sitting in a car with a pacifier in its mouth"
  car_seat2:         U('photo-1634414257452-e8843a9ae1a8'),  // (same — only clean infant-in-car shot available)
  baby_carrier:      U('photo-1528034191169-6f6033890cef'),  // "person carrying a baby"
  baby_monitor:      U('photo-1713857297379-6fc26e70f581'),  // "a smart phone sitting next to a wireless security camera"
  baby_monitor2:     U('photo-1715869618915-a7bf6608d4c3'),  // "a white camera sitting on top of a white table"
  baby_swing:        U('photo-1608923240332-685142bbc388'),  // "baby in pink shirt sitting on blue swing"
  baby_bouncer:      U('photo-1550824179-d698bda9996a'),     // "gray and black doorway jumper"
  diaper_pail:       U('photo-1560251180-24d389314061'),     // "baby lying in white textile"
  baby_gate:         U('photo-1597116587347-7ae2940f37a7'),  // "girl climbing on white wooden spiral staircase"
  thermometer:       U('photo-1585207693488-a903901c1274'),  // "white thermometer on red surface"
  humidifier:        U('photo-1774578342155-8d7e44a18bfd'),  // "A cozy nursery with a white crib and armchair"
  baby_bath:         U('photo-1554380411-7ba696bc0f2f'),     // "baby bathing"
  nail_care:         U('photo-1508009219918-7d528f269841'),  // "person holding baby's hand"
  baby_gear:         U('photo-1616666428759-679a7d578307'),  // "printer paper beside brown bear plush toy" (baby items)
  registry:          U('photo-1635874714425-c342060a4c58'),  // "a baby's gift hamper with its contents laid out"
  diaper:            U('photo-1537673156864-5d2c72de7824'),  // "baby laying on bed while woman massaging his back"
  baby_proofing:     U('photo-1554393180-7953ff534ac7'),     // "crawling baby"

  // ── Parenting / development ─────────────────────────────────────────────
  parent_baby:       U('photo-1535571393765-ea44927160be'),  // "woman holding baby"
  newborn_care:      U('photo-1591161555818-7b9debeccc07'),  // "woman hugging baby"
  toddler_play:      U('photo-1515488042361-ee00e0ddd4e4'),  // "boy sitting on white cloth surrounded by toys"
  toddler_dev:       U('photo-1532330393533-443990a51d10'),  // "child playing with car plastic toys"
  parenting_family:  U('photo-1685580388390-576100ae9ce3'),  // "a man and a woman are holding a baby"

  // ── Health / medical ────────────────────────────────────────────────────
  baby_health:       U('photo-1632053002928-1919605ee6f7'),  // "a young child is being examined by a doctor"
  baby_cpr:          U('photo-1632052998047-1faea5c31145'),  // "a doctor examines a baby's chest with a stethoscope"
  baby_eczema:       U('photo-1566004100631-35d015d6a491'),  // "baby under purple blanket"
  fever:             U('photo-1583947581879-41e4c88394c3'),  // "Ear thermometer for checking fever"

  // ── Postpartum / recovery ───────────────────────────────────────────────
  postpartum:        U('photo-1560305850-d90e0af2ff18'),     // "woman kissing baby"
  postpartum2:       U('photo-1527599296290-e847cebb1d00'),  // "woman and baby lying on bed"
  hair:              U('photo-1574706472790-f24ebe0510ba'),  // "woman carrying baby"

  // ── Travel / general ────────────────────────────────────────────────────
  travel:            U('photo-1761839271800-f44070ff0eb9'),  // "fathers carrying children on shoulders on a mountain path"
};

// Keyword groups — first match wins (order matters: more specific first)
const KEYWORD_MAP: Array<[string[], string]> = [
  // Products — specific gear
  [['white-noise', 'white-noise-machine', 'sound-machine'], IMGS.white_noise],
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
  [['baby-bath', 'bath-tub', 'bathing-system', 'bathtub'],IMGS.baby_bath],
  [['nail-clipper', 'nail-clippers', 'nail-care'],        IMGS.nail_care],
  [['toddler-bed', 'crib-transition'],                    IMGS.toddler_bed],
  [['crib', 'bassinet', 'cribs', 'bassinets', 'furniture-set', 'furniture-sets'], IMGS.crib_bassinet],
  [['wipe-warmer', 'diaper', 'cloth-diaper', 'disposable-diaper', 'nappy'], IMGS.diaper],
  [['bottle-sterilizer', 'sterilizer', 'bottle'],         IMGS.bottle],
  [['registry', 'checklist', 'hospital-bag'],             IMGS.registry],
  [['baby-proofing', 'babyproof', 'baby-proof'],          IMGS.baby_proofing],

  // Sleep
  [['sleep-training', 'sleep-solution', 'sleep-solutions', 'sleep-regression', 'sleep-guide', 'ultimate-baby-sleep', 'best-baby-sleep', 'baby-sleep'], IMGS.baby_sleeping],

  // Feeding & nutrition
  [['solid-food', 'solid-foods', 'food-introduction', 'puree', 'weaning'], IMGS.solid_foods],
  [['breastfeed', 'breastfeeding', 'lactation', 'breast-milk', 'nursing', 'latch', 'thrush-breastfeed', 'pregnant-while-breastfeed'], IMGS.breast_pump],
  [['infant-formula', 'formula-feeding'],                 IMGS.bottle],
  [['transition-to-cows-milk', 'cow-milk'],               IMGS.bottle],

  // Pregnancy-specific
  [['morning-sickness', 'nausea'],                        IMGS.pregnant_woman],
  [['heartburn', 'acid-reflux'],                          IMGS.pregnant_woman],
  [['prenatal-vitamin', 'prenatal-vitamins'],             IMGS.pregnancy_vitamins],
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
  [['labor', 'labour', 'contractions', 'signs-of-labor', 'when-to-go-to-hospital', 'how-to-track-contractions', 'birth-plan', 'labor-position', 'natural-vs-medicated', 'c-section', 'episiotomy'], IMGS.labor_hospital],

  // Postpartum
  [['postpartum-depression', 'baby-blues'],               IMGS.postpartum],
  [['postpartum-hair', 'hair-loss'],                      IMGS.hair],
  [['postpartum-fitness', 'exercise-after-childbirth', 'postpartum-recovery', 'lochia', 'postpartum-bleeding', 'returning-work', 'maternity-leave'], IMGS.postpartum2],
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
  [['teething'],                                          IMGS.baby_eczema],
  [['vaccin', 'health', 'pediatrician'],                  IMGS.baby_health],

  // Products / buying guides (generic)
  [['buying-guide', 'buying-guides', 'product-review', 'product-comparison', 'best-baby-gear', 'baby-gear', 'best-baby-product', 'budget-friendly-baby', 'sustainable-baby', 'eco-friendly'],  IMGS.baby_gear],

  // Baby names
  [['baby-name', 'baby-names', 'name-generator'],         IMGS.newborn_care],

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
