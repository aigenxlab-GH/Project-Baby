export const mainNav = [
  {
    title: 'Pregnancy',
    href: '/pregnancy',
    items: [
      { title: 'Week by Week', href: '/pregnancy/week-by-week' },
      { title: 'First Trimester', href: '/pregnancy/week-by-week/week-1' },
      { title: 'Second Trimester', href: '/pregnancy/week-by-week/week-14' },
      { title: 'Third Trimester', href: '/pregnancy/week-by-week/week-28' },
    ],
  },
  {
    title: 'Baby Names',
    href: '/baby-names',
    items: [
      { title: 'Girl Names', href: '/baby-names?gender=girl' },
      { title: 'Boy Names', href: '/baby-names?gender=boy' },
      { title: 'Gender Neutral', href: '/baby-names?gender=neutral' },
      { title: 'Name Generator', href: '/tools/baby-name-generator' },
    ],
  },
  {
    title: 'Products',
    href: '/products',
    // Trimmed from 13 → 12 items to keep homepage link count under 100 (fix #21).
    // Baby Swings, Nursing & Feeding, Baby Bathtubs still exist as pages — just
    // not featured in the top nav. They remain accessible via /products hub.
    items: [
      { title: 'Mom Essentials', href: '/products/mom-essentials' },
      { title: 'Baby Essentials', href: '/products/baby-essentials' },
      { title: 'Strollers', href: '/products/strollers' },
      { title: 'Car Seats', href: '/products/car-seats' },
      { title: 'Cribs & Bassinets', href: '/products/cribs' },
      { title: 'Breast Pumps', href: '/products/breast-pumps' },
      { title: 'Baby Carriers', href: '/products/baby-carriers' },
      { title: 'White Noise', href: '/products/white-noise' },
      { title: 'Diaper Bags', href: '/products/diaper-bags' },
      { title: 'Baby Bouncers', href: '/products/baby-bouncers' },
      { title: 'View All 28 Categories →', href: '/products', isViewAll: true },
    ],
  },
  {
    title: 'Parenting',
    href: '/parenting',
    items: [
      { title: 'Newborn Care', href: '/parenting/newborn' },
      { title: 'Sleep Training', href: '/parenting/sleep' },
      { title: 'Feeding & Nutrition', href: '/parenting/feeding' },
      { title: 'Baby Development', href: '/parenting/development' },
      { title: 'Toddler Care', href: '/parenting/toddler' },
      { title: 'Baby Health', href: '/parenting/health' },
      { title: 'Postpartum Recovery', href: '/parenting/postpartum' },
      { title: 'Activities & Play', href: '/parenting/activities' },
    ],
  },
  {
    title: 'Tools',
    href: '/tools',
    items: [
      { title: 'Due Date Calculator', href: '/tools/due-date-calculator' },
      { title: 'Ovulation Calculator', href: '/tools/ovulation-calculator' },
      { title: 'Contraction Timer', href: '/tools/contraction-timer' },
      { title: 'Registry Checklist', href: '/tools/registry-checklist' },
      { title: 'Symptom Checker', href: '/tools/symptom-checker' },
    ],
  },
];

export const footerNav = {
  company: [
    { title: 'About Us', href: '/about' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms & Conditions', href: '/terms' },
    { title: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  ],
  topics: [
    { title: 'Pregnancy', href: '/pregnancy' },
    { title: 'Baby Names', href: '/baby-names' },
    { title: 'Product Reviews', href: '/products' },
    { title: 'Parenting Tips', href: '/parenting' },
    { title: 'Tools', href: '/tools' },
    { title: 'Blog', href: '/blog' },
  ],
  // Trimmed to 3 items (removed Registry Checklist) to stay under 100 links (fix #21).
  tools: [
    { title: 'Due Date Calculator', href: '/tools/due-date-calculator' },
    { title: 'Ovulation Calculator', href: '/tools/ovulation-calculator' },
    { title: 'Contraction Timer', href: '/tools/contraction-timer' },
  ],
};
