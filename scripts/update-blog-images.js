const fs = require('fs');
const path = require('path');
const BLOG = 'content/blog';

const mappings = {
  // PREGNANCY - TRIMESTERS
  'first-trimester-guide':                               '1490645935967-10de6ba17061',
  'first-trimester-survival-guide':                      '1531983412531-1f49a365ffed',
  'second-trimester-guide':                              '1573461641466-b3e4f36a3bbc',
  'second-trimester-complete-guide-weeks-14-to-27':      '1556909172-54557c7e4fb7',
  'third-trimester-guide':                               '1548549045215-d1ff3f8af7db',
  'third-trimester-complete-guide-weeks-28-to-40':       '1597764690523-9bda73bc55d5',
  'ultimate-pregnancy-guide-week-by-week':               '1584302179602-e4c3d3fd629d',
  'pregnancy-guide-hub':                                 '1498296664812-efc6f8765e05',
  'pregnancy-complete-hub':                              '1509105494475-358d372e6ade',
  'pregnancy-symptoms-by-week':                         '1548690312-e3b507d8c110',
  'pregnancy-symptom-tracker-guide':                     '1614738463620-7a27c47d92e3',
  'gestational-diabetes-pregnancy':                      '1551190460-58c1b9e85cac',
  'gestational-diabetes-symptoms-diet-and-management-guide': '1606813902370-28e0e38e7fac',

  // PREGNANCY - SYMPTOMS / DISCOMFORT
  'morning-sickness-remedies':                           '1528712151550-3066a00f5e1e',
  'morning-sickness-remedies-that-actually-work':        '1592507005399-c5c0f5c6082f',
  'heartburn-during-pregnancy-why-it-happens-and-how-to-get-relief': '1567091648813-c9e82028f000',
  'pregnancy-back-pain-causes-relief-and-when-to-see-a-doctor':      '1583447025671-b4fdbd5b4af1',
  'pregnancy-stretch-marks-prevention-and-treatment':    '1583447026233-96e77a0bff76',
  'pregnancy-swollen-feet-and-ankles-causes-and-remedies': '1608571423902-eed61ca5c53a',
  'pregnancy-insomnia-how-to-sleep-better-when-pregnant': '1541781774459-8a89834d97c5',
  'pregnancy-brain-fog-explained':                       '1617791160536-598cf32026fb',
  'round-ligament-pain-in-pregnancy-what-it-is-and-how-to-cope': '1598440937328-05a8c0a20c1e',
  'pregnancy-cravings-safe-foods':                       '1504674900247-0877df9cc836',
  'pregnancy-cravings-what-they-mean-and-how-to-handle-them': '1551218808-7e830b96b95c',
  'pregnancy-weight-gain-guide':                         '1580927437598-c5b6c0c2e7de',
  'pregnancy-weight-gain-guide-how-much-is-normal':      '1578950175966-2f0a0f13b8b6',

  // PREGNANCY - NUTRITION / WELLNESS
  'pregnancy-diet-guide':                                '1512621776951-a57141f2eefd',
  'complete-pregnancy-diet-guide-what-to-eat-and-avoid': '1498837167922-ddd27525d352',
  'prenatal-vitamins-guide':                             '1584308666850-7093b6a8ba8f',
  'prenatal-vitamins-what-to-take-when-to-start-and-why': '1550572016-fcb0a5f9ab19',
  'pregnancy-yoga-benefits-poses-to-avoid-and-getting-started': '1544367067-a83eb49d4c75',
  'exercise-during-pregnancy-safe':                      '1571019613454-1cb2f99b2d8b',
  'safe-exercises-during-pregnancy':                     '1518611012118-696072aa579a',
  'pelvic-floor-exercises-during-pregnancy-complete-guide': '1573385679609-62f7a09e6bc5',

  // PREGNANCY - HEALTH & SAFETY
  'pregnancy-warning-signs-you-should-never-ignore':     '1559757148-5bbe2bce39de',
  'preeclampsia-warning-signs':                          '1598560932820-f3c0b5b6e4c4',
  'preeclampsia-signs-risks-and-what-to-do':             '1614734447600-b60b4e2fd461',
  'group-b-strep-pregnancy':                             '1579154204601-f7f949b3c53d',
  'vaccinations-pregnancy-safety':                       '1530026186672-2cd00ffc50d3',
  'caffeine-pregnancy-safe-amount':                      '1497515114541-f7a75e4c9b4f',
  'listeria-pregnancy-food-safety':                      '1540189549336-e484d9ac0fb6',
  'pain-relief-pregnancy-safe':                          '1584308666735-3d0e4abae66c',
  'dye-hair-pregnancy-safe':                             '1560066984-138daab8c0a6',

  // PREGNANCY - LIFESTYLE
  'flying-while-pregnant-safety':                        '1436491865332-7a61a109cc05',
  'working-during-pregnancy-rights-tips-and-when-to-stop': '1507003211169-0a1dd7228f2d',
  'travelling-while-pregnant-safety-tips-by-trimester':  '1488646953014-95aab05a01b3',
  'sex-during-pregnancy-what-is-safe-and-what-changes':  '1544716278-ca5e3f4abd8c',
  'creative-pregnancy-announcement-ideas-for-every-stage': '1533230408-de24e60a3c13',
  'pregnant-while-breastfeeding':                        '1593113630400-ea4288922702',

  // LABOR & DELIVERY
  'birth-plan-template':                                 '1527090526205-beabba0b9b1b',
  'how-to-write-a-birth-plan-templates-and-tips':        '1583245885440-8022e59f5fb7',
  'when-to-go-to-hospital-labor':                        '1519494026892-6f9f6ec7b9a5',
  'signs-of-labor':                                      '1514508008895-cba5fecbe2d2',
  'signs-of-labor-starting-what-to-watch-for':           '1489824904134-891ab64532f1',
  'labor-positions-guide':                               '1548591931-b9c0bb72ff29',
  'natural-vs-medicated-labor':                          '1521478886225-c12cf33b6f1a',
  'c-section-vs-vaginal-delivery':                       '1530128315048-e61a7e53fabd',
  'episiotomy-explanation-recovery':                     '1579684385127-1ef15d508118',
  'how-to-track-contractions':                           '1538108305955-8c4f80dd3b29',

  // POSTPARTUM
  'postpartum-recovery-guide':                           '1540479859555-c3de9a4ad1ef',
  'postpartum-recovery-timeline':                        '1574941687050-c04ae0c4cefc',
  'postpartum-recovery-what-to-expect-after-birth':      '1589156280159-27698a70f29e',
  'postpartum-depression-vs-baby-blues':                 '1579684395011-e28c6e0fb534',
  'postpartum-bleeding-lochia':                          '1581214082274-9659a7f0a7c6',
  'pelvic-floor-recovery-postpartum':                    '1585129906571-6e79d1748c07',
  'postpartum-hair-loss-causes-solutions':               '1522338476-4c57a41d3c3c',
  'postpartum-fitness-safe-exercises':                   '1571209213789-1f0e6e3db7c7',
  'exercise-after-childbirth-timeline':                  '1583454155040-8941b2c4d1db',

  // NEWBORN CARE
  'newborn-care-tips':                                   '1555771689-acbeecb46f3c',
  'newborn-care-tips-every-new-parent-needs-to-know':    '1537009225477-4be67a5d88a3',
  'newborn-care-hub':                                    '1505160447-7dce0cefc0b7',
  'newborn-baby-care-hub':                               '1474447976701-4acb0c3b7abb',
  'how-often-bathe-newborn':                             '1594003382338-5c41c8994f5d',
  'how-to-bathe-newborn-safely':                         '1583453119967-3b0be7a3b0ba',
  'newborn-breathing-patterns':                          '1542841791-1925b02a2bbb',
  'newborn-scratching-prevention':                       '1534649643709-b3e60f3dabe7',
  'newborn-essentials-checklist':                        '1583454110551-21f2fa2afe61',
  'diaper-rash-treatment-prevention':                    '1560082200-21f9e3f6bef8',

  // FEEDING
  'breastfeeding-vs-formula-feeding':                    '1569163853196-d55f1f6a2d60',
  'breastfeeding-vs-formula-an-honest-comparison':       '1571513800374-841571cbe648',
  'exclusive-pumping-guide':                             '1547592180-85f173d888a2',
  'infant-formula-types-comparison':                     '1590156206776-a1a8e2c1c6a6',
  'food-introduction-order-allergies':                   '1498003145656-f50af2be87f4',
  'when-and-how-to-start-solid-foods-complete-guide':    '1533557428573-e5b8abcb3f1c',
  'transition-to-cows-milk':                             '1499709476466-4ef2eb1e91de',

  // BABY SLEEP & SAFETY
  'baby-sleep-training-methods':                         '1580543091249-4ad1fc949012',
  'baby-sleep-training-methods-complete-guide-for-new-parents': '1566836610593-62ace66b5b72',
  'ultimate-baby-sleep-guide':                           '1517423440428-a5a00c7d3cca',
  'baby-proofing-guide':                                 '1476783916476-b24a56b04acb',
  'baby-proofing-your-home-room-by-room-checklist':      '1491009735900-b1cf9d3fa8b6',

  // BABY MILESTONES & REGISTRY
  'baby-milestones-complete-first-year-development-guide': '1509062522246-fe9921ce6e15',
  'baby-registry-guide-needs-vs-wants':                  '1537365587684-f490102e1225',
  'baby-registry-essentials-priority-items':             '1483374616-33b84c7b7cc2',
  'hospital-bag-checklist':                              '1483683638657-8e2d77fbe6c8',
  'complete-hospital-bag-checklist-for-mom-and-baby':    '1553484771-11a1ebba45c0',
  'calculate-due-date-accuracy':                         '1582468765816-c34e0e57fee0',
  'ovulation-window-tracking':                           '1624912006137-b6d7a0cbb5bf',
  'baby-name-generator-guide':                           '1503254153056-14b9c1e9e5ef',

  // BABY HEALTH
  'baby-fever-temperature-when-dangerous':               '1607356493-a87fa5e8c47f',
  'baby-constipation-diarrhea-signs':                    '1553514029-92e487cc7b53',
  'baby-cpr-first-aid-essential-skills':                 '1584515934326-5e8a2ffe8a71',
  'baby-eczema-treatment-prevention':                    '1559757036-9a6efc7d31e0',
  'baby-thrush-breastfeeding-treatment':                 '1581009137042-c552e485697a',
  'teething-pain-remedies-what-works':                   '1533619239733-7354898bff82',

  // TODDLER HEALTH
  'common-toddler-illnesses-colds-flu':                  '1584308662890-7e58b23b5534',
  'ear-infections-babies-signs-treatment':               '1559757120-f7a56f0b4c56',
  'toddler-allergies-food-environmental':                '1516321165247-4aa89c48be63',
  'when-call-pediatrician-urgent-care':                  '1576091160550-2173dba999ef',

  // TODDLER DEVELOPMENT
  'toddler-milestones-12-24-months':                     '1542386427-8d0aeea42eff',
  'toddler-language-development-talking':                '1541701494-44f69b28e1ea',
  'toddler-cognitive-development-learning':              '1559034994-08759af04119',
  'toddler-emotional-development-empathy':               '1555861496-0cfae09680ce',
  'toddler-gross-motor-development':                     '1476743941346-21f35a6bb40a',
  'toddler-fine-motor-skills-coordination':              '1544964748-e2462a43f29d',
  'toddler-memory-imagination-play':                     '1530190249-4b0d1e0e2d4f',
  'toddler-friendships-making-friends':                  '1558618666-fcd25c85cd64',
  'toddler-social-skills-peers':                         '1565465469-5c05a1f9c3c4',
  'toddler-independence-self-care':                      '1469546048285-b66bc35d08af',
  'toddler-development-delays-concerns':                 '1541516024252-b7e68a90e571',
  'toddler-picky-eating-solutions':                      '1498503182468-75209afbe7e5',
  'toddler-sleep-regression-causes':                     '1555185612993-68c2a24f8b3b',
  'toddler-separation-anxiety-handling':                 '1513532011-33a47d5d47a0',
  'potty-training-readiness-signs':                      '1488208878-abb36ec97cff',
  'communication-toddlers-language':                     '1503252947848-b29ef4c0fedb',
  'toddler-parenting-hub':                               '1560327088-7c47b5a79296',

  // PARENTING
  'parenting-styles-comparison-effects':                 '1477959858617-67f85cf4f1df',
  'parenting-temperament-types-children':                '1446511437394-36cdff3ae1b3',
  'positive-parenting-techniques-confidence':            '1509507504285-44ea8c1d5d46',
  'consistency-parenting-importance':                    '1429194739082-ffb08f9fcfb9',
  'emotional-intelligence-children-building':            '1518531933037-91b2f5f229cc',
  'toddler-boundaries-discipline-strategies':            '1532356993-30ee6b5a7996',
  'screen-time-toddlers-guidelines':                     '1545558014-8692077e9b5c',
  'teaching-toddlers-sharing-turns':                     '1546961342-ea5f72a193c6',
  'encouraging-toddler-independence-safely':             '1510771463517-b4f3c88c4f7c',
  'sibling-rivalry-management-strategies':               '1529156069898-49953e39b3ac',
  'co-parenting-communication-strategies':               '1519689373023-dd07c7988603',
  'toddler-tantrums-why-how-respond':                    '1512438248247-f0f2a5a8b7f0',
  'parent-self-care-burnout-prevention':                 '1499750310190-f1bafa8c8d1f',
  'working-parents-work-life-balance':                   '1521737711867-e3b97375f902',

  // BABY PRODUCTS - BUYING GUIDES
  'best-baby-bath-tubs':                                 '1599566963-a43f95f28571',
  'best-baby-bathing-systems-safety':                    '1544571550-a59e0b3d4b7e',
  'best-baby-bouncers-rockers':                          '1562601579-e40600d82e25',
  'best-baby-carriers-types':                            '1567169946-f45bdbc5b6b3',
  'best-baby-furniture-sets-convertible-cribs':          '1522771739844-6a9f6d5f14af',
  'best-baby-gates-safety':                              '1567965672845-b7a83c543ca1',
  'best-baby-gear-2025':                                 '1491897086688-be93bc7d5b55',
  'best-baby-high-chairs-safety':                        '1493894473891-10fc1e5dbd22',
  'best-baby-monitors-2026-comparison':                  '1587854340731-c0bb6fd33c4b',
  'best-baby-nail-clippers-safety':                      '1580927438067-54a37e31c2b9',
  'best-baby-sleep-solutions-bunpers':                   '1519689679-02d50505ecf9',
  'best-baby-swings-motion-features':                    '1540232498-bcf6d5cf8948',
  'best-baby-thermometers-accuracy':                     '1513115968-6f03af6978be',
  'best-baby-video-monitors-features':                   '1511815168852-a8f6beac8f6c',
  'best-bottle-sterilizers':                             '1557556440-1d19f08e6be0',
  'best-breast-pumps-comparison':                        '1616391182219-e080b4d1042a',
  'best-car-seats-newborns':                             '1503454537195-1dcabb73ffb9',
  'best-convertible-car-seats-newborn-toddler':          '1533483595632-c5f0e57a1936',
  'best-cribs-bassinets-safety':                         '1519689680058-324335c77eba',
  'best-diaper-pails-odor-control':                      '1563916813-d9bcb1c45a14',
  'best-feeding-chairs-babies-toddlers':                 '1528557375823-3f77a7b6c8bc',
  'best-humidifiers-babies':                             '1519457431-44ccd64a579b',
  'best-nursing-pillows-support':                        '1531901673-2d49e32b0aec',
  'best-strollers-newborns-toddlers':                    '1590492239080-e50b66d15a3d',
  'best-toddler-beds-crib-transition':                   '1512290923902-8a9f81dc236c',
  'best-travel-systems-stroller-car-seat':               '1544367567-0f2fcb009e0b',
  'best-white-noise-machines':                           '1518020382113-a7e8fc38eac9',

  // HUB PAGES & BUYING GUIDES
  'buying-guides-hub':                                   '1522199755-76d89cfe17bc',
  'buying-guides-product-reviews-hub':                   '1578916015718-e1c0c3bdf8b3',
  'complete-nursery-setup-guide-furniture':              '1555251791-dc90c2ec2a4e',
  'best-monitors-2026-comparison':                       '1519115568-6f03af6978be',

  // LIFESTYLE
  'budget-friendly-baby-products-saving':                '1586864387967-d02ef85d93e8',
  'childcare-options-daycare-nanny-family':              '1543248939-4296e1fea89b',
  'dating-relationships-after-baby':                     '1516589091380-5d8f6c1b1b1e',
  'mother-baby-bonding-activities':                      '1506794778202-cad84cf45f1d',
  'returning-work-maternity-leave-transition':            '1441984904996-e0b6ba687e04',
  'sustainable-baby-products-eco-friendly':              '1507925921958-8a62f3d1a50d',
  'travel-with-baby-packing-flying-tips':                '1452421822248-d4c2b47f0c81',

  // PRODUCT COMPARISONS
  'cloth-diapers-vs-disposable-comparison':              '1570308816-93cdd5c7f5db',
  'convertible-vs-modular-stroller-comparison':          '1563203369-bd4b5b8a8e72',
  'swing-vs-bouncer-which-better':                       '1535572290543-960fabec2023',
  'wipe-warmer-vs-regular-wipes-comparison':             '1559069612-cbabf8cae98e',
};

// Check for duplicate photo IDs
const usedIds = new Map();
const dupes = [];
for (const [slug, id] of Object.entries(mappings)) {
  if (usedIds.has(id)) {
    dupes.push({ slug, id, originalSlug: usedIds.get(id) });
  } else {
    usedIds.set(id, slug);
  }
}

if (dupes.length) {
  console.log('DUPLICATE photo IDs found:');
  dupes.forEach(d => console.log(`  ${d.slug} and ${d.originalSlug} both use ${d.id}`));
  process.exit(1);
}

console.log(`All ${Object.keys(mappings).length} photo IDs are unique. Processing files...`);

let updated = 0;
let skipped = 0;
let notFound = 0;
const results = [];

for (const [slug, photoId] of Object.entries(mappings)) {
  const filepath = path.join(BLOG, slug + '.mdx');
  if (!fs.existsSync(filepath)) {
    notFound++;
    results.push(`NOT FOUND: ${slug}`);
    continue;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  const imageUrl = `https://images.unsplash.com/photo-${photoId}?w=1200&q=85&auto=format&fit=crop`;

  // Remove any existing image line (handles local paths, broken >- insertions, old http URLs)
  content = content.replace(/^image:.*\n?/m, '');

  // Insert before publishedAt: — safe anchor, always at col-0, after any block scalar description
  if (content.match(/^publishedAt:/m)) {
    content = content.replace(/^(publishedAt:)/m, `image: '${imageUrl}'\n$1`);
    fs.writeFileSync(filepath, content, 'utf8');
    updated++;
    results.push(`OK: ${slug}`);
  } else {
    skipped++;
    results.push(`SKIPPED (no publishedAt): ${slug}`);
  }
}

console.log(`\nResults: ${updated} updated | ${skipped} skipped | ${notFound} not found`);
if (notFound > 0 || skipped > 0) {
  results.filter(r => r.startsWith('NOT') || r.startsWith('SKIP')).forEach(r => console.log(' ', r));
}
console.log('Done!');
