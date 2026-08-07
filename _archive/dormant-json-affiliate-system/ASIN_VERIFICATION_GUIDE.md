# ASIN Verification Guide - Step by Step

## 📋 Overview

You have **193 products** that need ASIN verification across **7 countries**.

**Tools Created:**
- `asin_verification_template.csv` - Template to fill in
- `update_asin_from_csv.py` - Auto-updates JSON when done

**Time Required:** ~3-4 hours for all 193 products

---

## 🚀 Quick Start (5 Steps)

### **Step 1: Open the CSV File**

```
File: asin_verification_template.csv
Location: C:\AIGenXLab\Projects\Project-Baby\
```

Open it with:
- ✅ Excel (best)
- ✅ Google Sheets
- ✅ LibreOffice Calc

---

### **Step 2: Understand the CSV Columns**

```
| Slug | Product Name | Category | Current ASIN | US | UK | CA | DE | FR | IT | ES | Notes |
|------|--------------|----------|-------------|----|----|----|----|----|----|-------|-------|
```

**Example Row:**
```
babybjorn-bouncer-bliss | BabyBjörn Bouncer Bliss | Baby Bouncers | B07XF8VP6M | | | | | | | |
```

You need to fill in the empty columns (US, UK, CA, DE, FR, IT, ES).

---

### **Step 3: Find ASINs for Each Country**

For **each product**, you need to:

1. **Search on Amazon US**
   - Go to: https://www.amazon.com/s?k=BabyBjörn%20Bouncer%20Bliss
   - Find the exact product
   - Copy ASIN from URL: `amazon.com/dp/[ASIN]`
   - Paste into "US ASIN" column

2. **Search on Amazon UK**
   - Go to: https://www.amazon.co.uk/s?k=BabyBjörn%20Bouncer%20Bliss
   - Find the exact product
   - Copy ASIN: `amazon.co.uk/dp/[ASIN]`
   - Paste into "UK ASIN" column

3. **Repeat for CA, DE, FR, IT, ES**
   - amazon.ca
   - amazon.de
   - amazon.fr
   - amazon.it
   - amazon.es

---

## 📍 ASIN Location in URL

### **How to Find ASIN:**

When you're on an Amazon product page:

```
URL: https://www.amazon.com/dp/B07XF8VP6M?tag=sometracking

ASIN is here: ↑
         B07XF8VP6M

Just copy the 10-character code!
```

---

## ⚡ Efficient Workflow

### **Batch By Category**

Instead of searching all 7 countries for each product:

**Instead of this (SLOW):**
```
Product 1: Check US, UK, CA, DE, FR, IT, ES (7 searches)
Product 2: Check US, UK, CA, DE, FR, IT, ES (7 searches)
...
Total: 193 × 7 = 1,351 searches
```

**Do THIS (FAST):**
```
All Products on Amazon US (193 searches)
All Products on Amazon UK (193 searches)
All Products on Amazon CA (193 searches)
...
```

**Or better:**

```
Take 10-20 products
Search all 7 countries for those
Enter into CSV
Delete rows as done
Repeat in batches
```

---

## 🎯 Best Workflow (Recommended)

### **Batch Approach (2 hours for 193 products):**

**Session 1 (30 min): Amazon US & UK**
```
1. Open amazon.com
2. Search for products in chunks (Bouncers, Strollers, etc.)
3. For each: Copy US ASIN, then search UK site, copy UK ASIN
4. Fill 30-40 rows
```

**Session 2 (30 min): Amazon CA & DE**
```
1. Open amazon.ca
2. Repeat for 30-40 products
3. Then do amazon.de for same 30-40
```

**Session 3 (30 min): Amazon FR, IT, ES**
```
1. Do amazon.fr for remaining products
2. Do amazon.it
3. Do amazon.es
```

**Session 4 (30 min): Verification & Import**
```
1. Review CSV for any mistakes
2. Run: python update_asin_from_csv.py
3. Verify JSON updated
4. Test a few links
```

---

## 💻 Tips for Speed

### **Tip 1: Use Multiple Windows**

```
Window 1: CSV (left side)
Window 2: Amazon search (right side)

Resize so both visible
Faster than switching tabs
```

### **Tip 2: Batch by Product Type**

```
Do all "Bouncers" on US first (easier to find)
Then all on UK
Faster than switching products
```

### **Tip 3: Use Copy/Paste**

```
1. Find product on amazon.com
2. Copy ASIN: Ctrl+C
3. Click US ASIN cell
4. Paste: Ctrl+V
5. Repeat for each country
```

### **Tip 4: Product Not Found?**

```
If product doesn't exist in a country:
- Leave cell EMPTY
- Add note in "Notes" column: "Not available in UK"
- Mark as "available: false" in JSON (will update automatically)
```

---

## 📊 Example: How to Fill CSV

### **Before (Empty):**

```
Product: BabyBjörn Bouncer Bliss

| Product Name | Current ASIN | US | UK | CA | DE | FR | IT | ES | Notes |
|-----|-----------|-----|-----|-----|-----|-----|-----|-----|-------|
| BabyBjörn Bouncer Bliss | B07XF8VP6M | | | | | | | | |
```

### **After (Filled):**

```
| Product Name | Current ASIN | US | UK | CA | DE | FR | IT | ES | Notes |
|-----|-----------|-----|-----|-----|-----|-----|-----|-----|-------|
| BabyBjörn Bouncer Bliss | B07XF8VP6M | B07XF8VP6M | B08ABC1234 | B09DEF5678 | B0AGHI9012 | B0BJKL3456 | B0CMNO7890 | B0DPQR1234 | All in stock |
```

---

## ✅ After Filling CSV

### **Step 1: Save CSV**

```
File → Save
Or: Ctrl+S
```

### **Step 2: Run Update Script**

```bash
cd C:\AIGenXLab\Projects\Project-Baby
python update_asin_from_csv.py
```

### **Step 3: Check Output**

```
[UPDATED] Product 1
[UPDATED] Product 2
...
[OK] Updated: 193 products
```

### **Step 4: Verify JSON**

```bash
# Check a few entries in affiliate-links.json
# Verify ASINs are correct
```

---

## 🧪 Testing After Update

### **Test 3-5 Random Products**

```
For each product:
1. Get slug from CSV
2. Check affiliate-links.json
3. Find product → look at "availability" section
4. Verify ASINs for each region are filled
5. Check that they match what you entered
```

---

## ⚠️ Important Notes

### **Products Not Available in All Countries**

If a product doesn't exist on amazon.de:

```json
{
  "slug": "product-name",
  "availability": {
    "US": { "asin": "B07XF8VP6M", "available": true },
    "UK": { "asin": "B08ABC1234", "available": true },
    "DE": { "asin": "", "available": false }  ← Not available
  }
}
```

Leave ASIN blank and mark "available: false"

---

### **Same ASIN Across Regions**

If a product has the SAME ASIN everywhere:

```csv
Product Name | US ASIN | UK ASIN | CA ASIN | ...
Baby Item | B07XF8VP6M | B07XF8VP6M | B07XF8VP6M | ... (all same)
```

That's fine! The system handles it.

---

## 🚀 Quick Reference

### **Amazon Search URLs**

Copy/paste these and add product name:

```
US:     https://www.amazon.com/s?k=PRODUCT_NAME
UK:     https://www.amazon.co.uk/s?k=PRODUCT_NAME
CA:     https://www.amazon.ca/s?k=PRODUCT_NAME
DE:     https://www.amazon.de/s?k=PRODUCT_NAME
FR:     https://www.amazon.fr/s?k=PRODUCT_NAME
IT:     https://www.amazon.it/s?k=PRODUCT_NAME
ES:     https://www.amazon.es/s?k=PRODUCT_NAME
```

---

## 📞 Help

### **Problem: Product Not Found on Amazon**

```
Possible causes:
1. Product discontinued
2. Wrong product name
3. Brand difference between regions
4. Different variant (color, size)

Solution:
- Search for similar product
- Use closest match
- Add note in "Notes" column
- Mark available: false if can't find
```

### **Problem: Different Product Variants**

```
Example: Baby Bouncer comes in 2 colors

US: Blue version ASIN: B07XF8VP6M
UK: Only Gray version ASIN: B08ABC1234

Solution:
- Use the ASIN for that region
- Even if different variant
- They're same product, different availability
```

---

## ✨ You Got This!

```
193 products × 7 countries = 1,351 ASINs to verify

With batching: ~2-4 hours total
Average: ~8-15 seconds per product

Timeline:
- Day 1: Do 50 products (1 hour)
- Day 2: Do 70 products (1.5 hours)
- Day 3: Do 73 products + testing (1.5 hours)

DONE!
```

---

## 📝 Checklist

- [ ] CSV file created and opened
- [ ] Understand column structure
- [ ] Verified at least 5 products manually
- [ ] Filled CSV with ASINs
- [ ] Saved CSV
- [ ] Ran `python update_asin_from_csv.py`
- [ ] Checked JSON for updates
- [ ] Tested 3-5 links on each Amazon site
- [ ] All working? ✅

---

**Status:** Ready to verify ASINs
**Effort:** 2-4 hours
**Impact:** 100% correct regional affiliate links

Let's do this! 🚀
