# 📋 INTEGRATION GUIDE - UX/SEO COMPONENTS

This guide shows how to integrate all UX/SEO components into your article pages.

## Example: Complete Article Page Layout

Here's a sample `src/app/blog/[slug]/page.tsx` with all enhancements:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ReadingProgress } from '@/components/article/ReadingProgress';
import { TableOfContents } from '@/components/article/TableOfContents';
import { BreadcrumbNav } from '@/components/article/BreadcrumbNav';
import { CommentsSection } from '@/components/article/CommentsSection';
import { PriceComparison } from '@/components/affiliate/PriceComparison';
import { generateFAQSchema } from '@/lib/schema';

export default function ArticlePage({ params }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch your article data
    // const data = await getArticle(params.slug);
    // setArticle(data);
  }, [params.slug]);

  if (!article) return <div>Loading...</div>;

  // Build breadcrumb data
  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: article.category, href: `/blog?category=${article.category}` },
  ];

  // Generate FAQ schema if exists
  const faqSchema = article.faqs
    ? generateFAQSchema(article.faqs, `https://yoursite.com/blog/${article.slug}`)
    : null;

  return (
    <>
      {/* Add Reading Progress - appears at top of page */}
      <ReadingProgress />

      {/* Add FAQ Schema to head */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav items={breadcrumbs} current={article.title} />

        {/* Main Article with TOC Sidebar */}
        <div className="xl:grid xl:grid-cols-[1fr_260px] xl:gap-12 xl:items-start">
          {/* Article Content */}
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <p className="text-lg text-gray-600">{article.description}</p>
            </header>

            {/* Article body would go here */}
            <div className="prose max-w-none">
              {/* Your MDX content */}
            </div>

            {/* Price Comparison for relevant products */}
            {article.relatedProducts && article.relatedProducts.length > 0 && (
              <section className="mt-12">
                <h2>Where to Buy</h2>
                {article.relatedProducts.map((productId) => (
                  <div key={productId} className="mb-6">
                    <PriceComparison productId={productId} />
                  </div>
                ))}
              </section>
            )}

            {/* FAQs Section if exists */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="mt-12">
                <h2>Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="p-4 border border-gray-200 rounded-lg hover:border-brand-400 transition-colors"
                    >
                      <summary className="font-semibold cursor-pointer">
                        {faq.question}
                      </summary>
                      <p className="mt-2 text-gray-700">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Table of Contents Sidebar */}
          <TableOfContents />
        </div>

        {/* Comments Section */}
        <CommentsSection pageId={article.slug} pageTitle={article.title} />
      </div>
    </>
  );
}
```

## Integration Checklist

### Step 1: Import Components
- [ ] Add all component imports to your article page
- [ ] Import schema utilities if using FAQs
- [ ] Import PriceComparison for product articles

### Step 2: Update Article Data Structure
Your article frontmatter should include:
```mdx
---
title: "Your Article Title"
description: "..."
category: "buying-guides"
tags: [...]
faqs:
  - question: "Question?"
    answer: "Answer..."
relatedProducts:
  - "product-id-1"
  - "product-id-2"
---
```

### Step 3: Add to Header
In your header/navbar component:
```tsx
import { SearchBar } from '@/components/Search/SearchBar';

export function Header() {
  return (
    <nav>
      {/* other nav items */}
      <SearchBar /> {/* Add this */}
    </nav>
  );
}
```

### Step 4: Add to Root Layout
In `src/app/layout.tsx`:
```tsx
import { ReadingProgress } from '@/components/article/ReadingProgress';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReadingProgress /> {/* This appears on all pages */}
        {children}
      </body>
    </html>
  );
}
```

## Component Usage Examples

### Table of Contents
```tsx
<TableOfContents />
```
- Auto-extracts H2, H3, H4 from article
- Mobile: Collapsible dropdown
- Desktop: Sticky sidebar
- Smooth scrolling + active highlighting

### Reading Progress
```tsx
<ReadingProgress />
```
- Place in root layout
- Appears as gradient bar at top
- Shows scroll percentage
- Works on all pages

### Breadcrumbs
```tsx
<BreadcrumbNav 
  items={[
    { label: 'Blog', href: '/blog' },
    { label: 'Parenting', href: '/blog?category=parenting' }
  ]} 
  current="Article Title"
/>
```

### Price Comparison
```tsx
<PriceComparison productId="best-car-seats" showLabel={true} />
```
- Shows buttons for all available retailers
- Tracks clicks with Google Analytics
- Mobile-responsive
- Includes affiliate disclosure

### FAQ Schema
```tsx
const faqSchema = generateFAQSchema(
  article.faqs,
  `https://yoursite.com/blog/${article.slug}`
);

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

### Comments
```tsx
<CommentsSection pageId={slug} pageTitle={title} />
```
- For Utterances: Update repo in component
- For Disqus: Replace with Disqus script

### Search
```tsx
<SearchBar />
```
- Place in header
- API already exists at /api/search
- Uses Fuse.js for fuzzy search

## New Affiliate Networks

### Available Retailers
1. **Amazon** - General products
2. **Buy Buy Baby** - Baby-specific
3. **Target** - Department store
4. **Walmart** - Budget-friendly
5. **Wayfair** - Furniture & bedding
6. **Best Buy** - Tech & monitors
7. **Etsy** - Handmade & unique

### Using in Articles
```tsx
import { AffiliateLink } from '@/components/affiliate/AffiliateLink';

<AffiliateLink 
  productId="best-car-seats"
  retailer="amazon"
  text="Check Price"
  variant="button"
/>
```

Or use PriceComparison to show all retailers:
```tsx
<PriceComparison productId="best-car-seats" />
```

## New Affiliate Products Added

### Wayfair (Furniture)
- `nursery-furniture-sets` (12% commission)
- `baby-bedding-sets` (10% commission)
- `changing-tables` (11% commission)

### Best Buy (Tech)
- `baby-monitor-wifi` (8% commission)
- `night-light-projectors` (7% commission)

### Etsy (Handmade)
- `personalized-nursery-decor` (9% commission)
- `handmade-baby-quilts` (10% commission)
- `wooden-toys` (8% commission)

### Walmart (Budget)
- `budget-strollers` (6% commission)
- `budget-car-seats` (6% commission)

## Implementation Timeline

### Week 1 (12 hours)
- [ ] Integrate Table of Contents
- [ ] Integrate Reading Progress
- [ ] Integrate Breadcrumbs
- [ ] Add PriceComparison to product articles
- [ ] Run FAQ schema script

### Week 2 (6 hours)
- [ ] Integrate SearchBar in header
- [ ] Setup Comments (Utterances)
- [ ] Test all components

### Week 3 (4 hours)
- [ ] Update articles with FAQ frontmatter
- [ ] Add relatedProducts to articles
- [ ] Final testing

### Deployment
```bash
npm run build && npm run dev
# Test locally
git add .
git commit -m "feat: integrate all UX/SEO components"
git push origin main
```

## Expected Metrics

After full integration:
- **Bounce Rate:** -20%
- **Time on Site:** +20%
- **Completion Rate:** +15%
- **Internal Navigation:** +10%
- **Affiliate Revenue:** +50-100%
- **Organic CTR:** +10% (FAQ rich snippets)

## Troubleshooting

**Table of Contents not showing?**
- Ensure article has H2/H3 headings
- Check heading IDs are auto-generated

**Search not working?**
- Verify `/api/search` route exists
- Check search index file

**Comments not appearing?**
- For Utterances: Verify GitHub app installed
- Check repo name in component

**Price Comparison not showing?**
- Verify product exists in affiliateProducts.ts
- Check retailer links are configured

---

Ready to implement! Follow the integration steps above.
