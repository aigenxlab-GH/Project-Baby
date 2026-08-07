# Centralized Affiliate Links System (JSON)

## Overview
All 177+ affiliate links are stored in ONE file: `affiliate-links.json`

When you find a broken link, update the JSON and run the sync script. Done!

---

## Quick Start

### 1. Update a Link

**Find broken link in JSON:**
```json
{
  "slug": "evenflo-exersaucer-triple-fun",
  "name": "Evenflo ExerSaucer Triple Fun Active Learning Center",
  "asin": "B07N8NCDZD",
  "status": "broken",
  "note": "Need replacement"
}
```

**Replace with working ASIN:**
```json
{
  "slug": "evenflo-exersaucer-triple-fun",
  "name": "Evenflo ExerSaucer Triple Fun Active Learning Center",
  "asin": "B01234567890",  // <- New ASIN
  "status": "active",       // <- Change status
  "note": ""
}
```

### 2. Run Sync Script

```bash
python update_affiliate_links_from_json_to_application.py
```

Output:
```
[UPDATED] evenflo-exersaucer-triple-fun -> B01234567890
```

### 3. Done!
The MDX file is automatically updated. Push to GitHub → deploys.

---

## JSON Structure

```json
{
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2026-06-25",
    "totalLinks": 177,
    "affiliateTag": "pregnancysp0a-20"
  },
  "categories": {
    "activity-centers": [
      {
        "slug": "product-slug",              // Filename (no .mdx)
        "name": "Product Name",              // Display name
        "asin": "B0123456789",               // Amazon ASIN
        "price": "$100",                     // Reference price
        "status": "active" | "broken",       // active or broken
        "note": "Optional notes"             // Why broken, replacement, etc.
      }
    ]
  }
}
```

---

## Common Tasks

### Find a Product
Open `affiliate-links.json` and search for product name or ASIN.

### Mark Broken
```json
"status": "broken",
"note": "Product discontinued - need replacement"
```

### Fix Broken Link
1. Search Amazon for replacement product
2. Copy new ASIN from URL: `amazon.com/dp/[B0123456789]`
3. Update JSON:
```json
"asin": "B0NEWASINNEW",
"status": "active",
"note": ""
```
4. Run: `python update_affiliate_links_from_json_to_application.py`

### Add New Product
1. Create MDX file: `content/products/[category]/[slug].mdx`
2. Add to JSON under that category:
```json
{
  "slug": "new-product",
  "name": "New Product Name",
  "asin": "B0123456789",
  "price": "$100",
  "status": "active",
  "note": ""
}
```
3. Run sync script

### View All Broken Links
Search JSON for `"status": "broken"` — lists all broken links with notes.

---

## File Locations

| File | Purpose |
|------|---------|
| `affiliate-links.json` | Master list of all links (edit this) |
| `sync-from-json.py` | Script that applies changes (run this) |
| `content/products/[cat]/[slug].mdx` | Article files (updated automatically) |

---

## Workflow Example

**Scenario:** User reports broken stroller link on `/products/strollers/babyzen-yoyo2`

1. **Find it in JSON:**
   - Search for "babyzen" or category "strollers"
   - Find the broken ASIN

2. **Search Amazon:**
   - Go to: https://amazon.com/s?k=Babyzen+YOYO2
   - Find current product
   - Copy ASIN from URL

3. **Update JSON:**
   ```json
   {
     "slug": "babyzen-yoyo2",
     "asin": "B0NEW1234567",  // <- Updated
     "status": "active",       // <- Changed
     "note": ""                // <- Cleared
   }
   ```

4. **Run sync:**
   ```bash
   python update_affiliate_links_from_json_to_application.py
   ```

5. **Commit & push:**
   ```bash
   git add affiliate-links.json content/products/strollers/babyzen-yoyo2.mdx
   git commit -m "Fix Babyzen YOYO2 affiliate link"
   git push
   ```

6. **Done!** Site deploys with working link.

---

## Regional Affiliate Tags (Future)

When you get your Associate IDs, update metadata:

```json
"metadata": {
  "affiliateTags": {
    "US": "pregnancysp0-20",
    "UK": "pregnancysp0-21",
    "CA": "pregnancysp0-22",
    "AU": "pregnancysp0-23"
  }
}
```

Then update sync script to generate regional links automatically.

---

## Validation

Before committing, check:
- ✅ ASIN is 10 characters (B + 9 digits)
- ✅ Status is either "active" or "broken"
- ✅ JSON is valid (use online JSON validator if unsure)
- ✅ Manually test the link in browser

---

## Support

**Script won't run?**
```bash
python update_affiliate_links_from_json_to_application.py
```
Check:
- Is `affiliate-links.json` in the right folder?
- Do you have Python installed?

**Link not updating?**
- Run the script again
- Check that MDX file exists
- Verify ASIN spelling

**Broken link persists?**
- Make sure you saved the JSON file
- Verify the status is "active" (not "broken")
- Check that ASIN is correct

---

**That's it!** Simple, fast, and fully under your control. 🎯
