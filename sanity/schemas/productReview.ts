import { defineType, defineField, defineArrayMember } from 'sanity';

const CATEGORIES = [
  { title: 'Mom Essentials', value: 'mom-essentials' },
  { title: 'Baby Essentials', value: 'baby-essentials' },
  { title: 'Strollers', value: 'strollers' },
  { title: 'Car Seats', value: 'car-seats' },
  { title: 'Cribs & Bassinets', value: 'cribs' },
  { title: 'Baby Monitors', value: 'monitors' },
  { title: 'Breast Pumps', value: 'breast-pumps' },
  { title: 'High Chairs', value: 'high-chairs' },
  { title: 'Baby Carriers', value: 'baby-carriers' },
  { title: 'Baby Bouncers', value: 'baby-bouncers' },
  { title: 'Baby Swings', value: 'baby-swings' },
  { title: 'White Noise Machines', value: 'white-noise' },
  { title: 'Activity Centers & Jumpers', value: 'activity-centers' },
  { title: 'Play Mats & Gyms', value: 'play-mats' },
  { title: 'Baby Bathtubs', value: 'baby-bathtubs' },
  { title: 'Baby Gates', value: 'baby-gates' },
  { title: 'Baby Loungers', value: 'baby-loungers' },
  { title: 'Baby Nail Care', value: 'baby-nail-care' },
  { title: 'Baby Thermometers', value: 'baby-thermometers' },
  { title: 'Bath Toys', value: 'bath-toys' },
  { title: 'Diaper Bags', value: 'diaper-bags' },
  { title: 'Diaper Pails', value: 'diaper-pails' },
  { title: 'Humidifiers', value: 'humidifiers' },
  { title: 'Nursing Chairs & Gliders', value: 'nursing-chairs' },
  { title: 'Nursing & Feeding', value: 'nursing-feeding' },
  { title: 'Baby Food Makers', value: 'baby-food-makers' },
  { title: 'Sippy Cups', value: 'sippy-cups' },
  { title: 'Sleep Sacks & Swaddles', value: 'sleep-sacks' },
  { title: 'Teething Toys', value: 'teething-toys' },
  { title: 'Potty Training', value: 'potty-training' },
];

const REGIONS = [
  { key: 'US', label: '🇺🇸 US (amazon.com)', tag: 'pregnancysp0a-20' },
  { key: 'UK', label: '🇬🇧 UK (amazon.co.uk)', tag: 'pregnancysp0a-21' },
  { key: 'CA', label: '🇨🇦 Canada (amazon.ca)', tag: 'pregnancysp07-20' },
  { key: 'DE', label: '🇩🇪 Germany (amazon.de)', tag: 'pregnancyspde-21' },
  { key: 'FR', label: '🇫🇷 France (amazon.fr)', tag: 'pregnancyspfr-21' },
  { key: 'IT', label: '🇮🇹 Italy (amazon.it)', tag: 'pregnancyspit-21' },
  { key: 'ES', label: '🇪🇸 Spain (amazon.es)', tag: 'pregnancyspes-21' },
];

function regionField(region: { key: string; label: string; tag: string }) {
  return defineField({
    name: region.key,
    title: region.label,
    type: 'object',
    description: `Tracking ID: ${region.tag}`,
    fields: [
      defineField({
        name: 'asin',
        title: 'ASIN',
        type: 'string',
        description: 'Amazon product ID (e.g. B07XF8VP6M)',
      }),
      defineField({
        name: 'available',
        title: 'Available in this region',
        type: 'boolean',
        initialValue: true,
      }),
      defineField({
        name: 'price',
        title: 'Approximate Price',
        type: 'string',
        description: 'e.g. $75 or £59',
      }),
    ],
  });
}

export const productReview = defineType({
  name: 'productReview',
  title: 'Product Review',
  type: 'document',
  groups: [
    { name: 'basics', title: '📦 Product Info', default: true },
    { name: 'review', title: '⭐ Review Content' },
    { name: 'media', title: '🖼️ Image' },
    { name: 'links', title: '🔗 Affiliate Links' },
    { name: 'specs', title: '📋 Specs & FAQs' },
    { name: 'seo', title: '🔍 SEO & Publishing' },
  ],
  fields: [
    // ── Product Info ──────────────────────────────────────────────────────────
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basics',
      options: { source: 'productName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      group: 'basics',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basics',
      options: { list: CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modelYear',
      title: 'Model Year',
      type: 'number',
      group: 'basics',
      initialValue: 2026,
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          { title: '💚 Budget (under $50)', value: 'budget' },
          { title: '💛 Mid-Range ($50–$150)', value: 'mid-range' },
          { title: '❤️ Premium ($150+)', value: 'premium' },
        ],
        layout: 'radio',
      },
    }),

    // ── Review Content ────────────────────────────────────────────────────────
    defineField({
      name: 'ourScore',
      title: 'Our Score (out of 10)',
      type: 'number',
      group: 'review',
      validation: (Rule) => Rule.min(0).max(10),
    }),
    defineField({
      name: 'starRating',
      title: 'Star Rating (out of 5)',
      type: 'number',
      group: 'review',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'description',
      title: 'Short Description (for SEO)',
      type: 'text',
      group: 'review',
      rows: 3,
    }),
    defineField({
      name: 'bottomLine',
      title: 'Bottom Line',
      type: 'text',
      group: 'review',
      rows: 2,
      description: 'One-sentence summary shown on product cards',
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For (Target Audience)',
      type: 'text',
      group: 'review',
      rows: 2,
      description: 'Who is this product best suited for? E.g., "Parents who travel frequently" or "Budget-conscious families"',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      group: 'review',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      group: 'review',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'body',
      title: 'Full Review Article',
      type: 'array',
      group: 'review',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // ── Image ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Upload the actual product image — this shows on listing pages',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      group: 'media',
      description: 'Describe the image for accessibility & SEO',
    }),

    // ── Affiliate Links (per region) ──────────────────────────────────────────
    defineField({
      name: 'affiliateLinks',
      title: 'Amazon Links by Region',
      type: 'object',
      group: 'links',
      description: 'Enter the ASIN for each region. Leave blank if product is not available there.',
      fields: REGIONS.map(regionField),
    }),

    // ── Specs & FAQs ─────────────────────────────────────────────────────────
    defineField({
      name: 'specsTable',
      title: 'Specifications Table',
      type: 'array',
      group: 'specs',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'key', title: 'Spec Name', type: 'string' }),
            defineField({ name: 'value', title: 'Spec Value', type: 'string' }),
          ],
          preview: { select: { title: 'key', subtitle: 'value' } },
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'specs',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'q', title: 'Question', type: 'string' }),
            defineField({ name: 'a', title: 'Answer', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'q' } },
        }),
      ],
    }),

    // ── SEO & Publishing ──────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published (live on site)',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Toggle ON to make this product visible on the website',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'seo',
      initialValue: 'PregnancySprout Editorial Team',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'seo',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'productName',
      subtitle: 'category',
      media: 'image',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: `${published ? '✅' : '⏸️'} ${title}`,
        subtitle,
        media,
      };
    },
  },
});
