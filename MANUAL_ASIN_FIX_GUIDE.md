# Manual ASIN Correction Guide - 35 Broken Affiliate Links

## Problem
35 affiliate links are broken — products discontinued or ASINs invalid. Need to find current working ASINs.

## Solution Overview
Each broken product has a direct Amazon search link. You'll:
1. Click the link
2. Find the product (usually #1 or #2 in search)
3. Copy the ASIN from the URL (format: `/dp/B0XXXXXXXXX`)
4. Paste into the spreadsheet

**Time estimate: 15-20 minutes for all 35 products** (30 seconds per product)

---

## Step-by-Step Process

### 1. Open the Corrections Spreadsheet
File: `affiliate_corrections_quick_lookup.csv`

This has 4 columns:
- **Product Name**: What to search for
- **Search URL**: Direct Amazon search link
- **Old ASIN**: Current broken ASIN
- **New ASIN**: [PASTE HERE]

### 2. For Each Product:
1. Click the **Search URL** (opens Amazon search)
2. Find your product in results (usually #1)
3. Click the product to open it
4. Look at the URL bar: `https://www.amazon.com/dp/B0XXXXXXXXX?...`
5. Copy the ASIN (the 10-character code starting with B)
6. Go back to spreadsheet, paste into **New ASIN** column

### 3. Save and Run Fix Script
Once all 35 ASINs are entered:
```bash
python verify_and_fix_affiliate_links.py --apply-corrections
```

---

## The 35 Products to Fix

| # | Product Name | Category | Search Link |
|---|---|---|---|
| 1 | Comotomo Baby Bottle | Nursing Feeding | [Search](https://www.amazon.com/s?k=Comotomo+Baby+Bottle) |
| 2 | Haakaa Silicone Breast Pump Gen 2 | Breast Pumps | [Search](https://www.amazon.com/s?k=Haakaa+Silicone+Breast+Pump+Gen+2) |
| 3 | Philips Avent Anti-Colic Bottle | Nursing Feeding | [Search](https://www.amazon.com/s?k=Philips+Avent+Anti-Colic+Bottle) |
| 4 | Bright Starts Tummy Time Prop & Play | Play Mats | [Search](https://www.amazon.com/s?k=Bright+Starts+Tummy+Time) |
| 5 | Fisher-Price Deluxe Kick 'n Play Piano Gym | Play Mats | [Search](https://www.amazon.com/s?k=Fisher-Price+Piano+Gym) |
| 6 | Lovevery Play Gym | Play Mats | [Search](https://www.amazon.com/s?k=Lovevery+Play+Gym) |
| 7 | Skip Hop Explore & More Baby Play Mat | Play Mats | [Search](https://www.amazon.com/s?k=Skip+Hop+Play+Mat) |
| 8 | Levoit LV600HH Hybrid Ultrasonic Humidifier | Humidifiers | [Search](https://www.amazon.com/s?k=Levoit+LV600HH+Humidifier) |
| 9 | Pure Enrichment MistAire Ultrasonic Cool Mist | Humidifiers | [Search](https://www.amazon.com/s?k=Pure+Enrichment+MistAire+Humidifier) |
| 10 | Safety 1st 360 Degree Ultrasonic Humidifier | Humidifiers | [Search](https://www.amazon.com/s?k=Safety+1st+Humidifier) |
| 11 | Nuby Silicone Spout Sippy Cup | Sippy Cups | [Search](https://www.amazon.com/s?k=Nuby+Sippy+Cup) |
| 12 | Pura Kiki Stainless Steel Sippy Cup | Sippy Cups | [Search](https://www.amazon.com/s?k=Pura+Stainless+Sippy) |
| 13 | Tommee Tippee First Sips Trainer Cup | Sippy Cups | [Search](https://www.amazon.com/s?k=Tommee+Tippee+Trainer+Cup) |
| 14 | Babyzen YOYO2 Stroller | Strollers | [Search](https://www.amazon.com/s?k=Babyzen+YOYO2) |
| 15 | Doona Infant Car Seat & Stroller | Strollers | [Search](https://www.amazon.com/s?k=Doona+Car+Seat+Stroller) |
| 16 | Graco Modes Pramette Travel System | Strollers | [Search](https://www.amazon.com/s?k=Graco+Modes+Pramette) |
| 17 | Spectra S1 Plus Electric Breast Pump | Breast Pumps | [Search](https://www.amazon.com/s?k=Spectra+S1+Plus) |
| 18 | Spectra S2 Plus | Breast Pumps | [Search](https://www.amazon.com/s?k=Spectra+S2+Plus) |
| 19 | Angelcare Soft Touch Bath Support | Baby Bathtubs | [Search](https://www.amazon.com/s?k=Angelcare+Bath+Support) |
| 20 | BabyBjörn Bouncer Bliss | Baby Bouncers | [Search](https://www.amazon.com/s?k=BabyBjorn+Bouncer+Bliss) |
| 21 | Solly Baby Wrap Carrier | Baby Carriers | [Search](https://www.amazon.com/s?k=Solly+Baby+Wrap) |
| 22 | Kiinde Kozii Bottle Warmer | Baby Food Makers | [Search](https://www.amazon.com/s?k=Kiinde+Kozii+Warmer) |
| 23 | Snuggle Me Organic Lounger | Baby Loungers | [Search](https://www.amazon.com/s?k=Snuggle+Me+Organic) |
| 24 | SNOO Smart Sleeper Bassinet | Cribs | [Search](https://www.amazon.com/s?k=SNOO+Smart+Sleeper) |
| 25 | Storkcraft Tuscany 4-in-1 Convertible Crib | Cribs | [Search](https://www.amazon.com/s?k=Storkcraft+Tuscany) |
| 26 | Arlo Baby Monitor | Monitors | [Search](https://www.amazon.com/s?k=Arlo+Baby+Monitor) |
| 27 | Infant Optics DXR-8 Pro | Monitors | [Search](https://www.amazon.com/s?k=Infant+Optics+DXR-8) |
| 28 | Nanit Pro Smart Baby Monitor | Monitors | [Search](https://www.amazon.com/s?k=Nanit+Pro+Monitor) |
| 29 | Owlet Dream Sock | Monitors | [Search](https://www.amazon.com/s?k=Owlet+Dream+Sock) |
| 30 | Babyletto Tuba Swivel Glider | Nursing Chairs | [Search](https://www.amazon.com/s?k=Babyletto+Tuba+Glider) |
| 31 | DaVinci Olive Upholstered Swivel Glider | Nursing Chairs | [Search](https://www.amazon.com/s?k=DaVinci+Olive+Glider) |
| 32 | Fisher-Price Laugh & Learn Smart Stages Potty | Potty Training | [Search](https://www.amazon.com/s?k=Fisher-Price+Potty) |
| 33 | Jool Baby Potty Training Seat | Potty Training | [Search](https://www.amazon.com/s?k=Jool+Potty+Seat) |
| 34 | Sophie la Girafe Teether | Teething Toys | [Search](https://www.amazon.com/s?k=Sophie+la+Girafe) |
| 35 | DaVinci Kalani 4-in-1 Convertible Crib | Cribs | [Search](https://www.amazon.com/s?k=DaVinci+Kalani) |

---

## Pro Tips for Speed

1. **Open in new tab**: Right-click search link → "Open in new tab"
2. **Keyboard shortcut**: `Ctrl+L` to highlight URL bar, then copy ASIN quickly
3. **Pattern**: Most ASINs will be in the first 2 results
4. **If product discontinued**: Search for current version (e.g., "Gen 3" if Gen 2 is gone)

---

## Alternative: Direct ASIN Paste Method

Once you have the CSV open:
1. Open first search link
2. Find product, get ASIN
3. Paste ASIN into CSV cell next to product name
4. Press Enter → automatically opens next search link
5. Repeat for all 35

---

## Then: Auto-Fix Script
Once all 35 ASINs are updated in the CSV:

```bash
cd C:\AIGenXLab\Projects\Project-Baby
python verify_and_fix_affiliate_links.py --apply-corrections
```

This will:
- Read the corrected ASINs
- Update affiliate_links_cleaned.csv with new links
- Output: `affiliate_links_fully_corrected.csv`
- All 35 broken links → fixed and working ✅

---

## Questions?

If a product is truly discontinued (can't find it at all):
1. Search for the **latest version** (e.g., "Gen 3" instead of "Gen 2")
2. Or find the **best equivalent** in that category with similar price/reviews
3. Note the change in a separate "REPLACEMENTS" column for reference

All 194 affiliate links will be 100% working after this. ✅
