import os
import re
import csv
import requests
from urllib.parse import urlencode, quote
import time
import sys

# Fix encoding on Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Broken links from verification (35 total)
BROKEN_LINKS = [
    {"name": "Comotomo Baby Bottle", "asin": "B004C053BA", "category": "Nursing Feeding"},
    {"name": "Haakaa Silicone Breast Pump Gen 2", "asin": "B07CWK4S5W", "category": "Breast Pumps"},
    {"name": "Philips Avent Anti-Colic Bottle", "asin": "B0961QRR5K", "category": "Nursing Feeding"},
    {"name": "Bright Starts Tummy Time Prop & Play", "asin": "B07FX5F7NR", "category": "Play Mats"},
    {"name": "Fisher-Price Deluxe Kick 'n Play Piano Gym", "asin": "B07BQNQKN5", "category": "Play Mats"},
    {"name": "Lovevery Play Gym", "asin": "B07Q38BVCK", "category": "Play Mats"},
    {"name": "Skip Hop Explore & More Baby Play Mat", "asin": "B07H1P5JN4", "category": "Play Mats"},
    {"name": "Levoit LV600HH Hybrid Ultrasonic Humidifier", "asin": "B07V1P3YQC", "category": "Humidifiers"},
    {"name": "Pure Enrichment MistAire Ultrasonic Cool Mist Humidifier", "asin": "B013IJPTFK", "category": "Humidifiers"},
    {"name": "Safety 1st 360 Degree Ultrasonic Humidifier", "asin": "B07BVGTXWD", "category": "Humidifiers"},
    {"name": "Nuby Silicone Spout Sippy Cup", "asin": "B07BGLXFHQ", "category": "Sippy Cups"},
    {"name": "Pura Kiki Stainless Steel Sippy Cup", "asin": "B07RJMQC73", "category": "Sippy Cups"},
    {"name": "Tommee Tippee First Sips Trainer Cup", "asin": "B09BRDP8SR", "category": "Sippy Cups"},
    {"name": "Babyzen YOYO2 Stroller", "asin": "B0856NX5D7", "category": "Strollers"},
    {"name": "Doona Infant Car Seat & Stroller", "asin": "B07HML1BT5", "category": "Strollers"},
    {"name": "Graco Modes Pramette Travel System", "asin": "B07Y5VQYFW", "category": "Strollers"},
    {"name": "Spectra S1 Plus Electric Breast Pump", "asin": "B00DBKFFJM", "category": "Breast Pumps"},
    {"name": "Spectra S2 Plus", "asin": "B00BLBLR1I", "category": "Breast Pumps"},
    {"name": "Angelcare Soft Touch Bath Support", "asin": "B00BKJOM0U", "category": "Baby Bathtubs"},
    {"name": "BabyBjörn Bouncer Bliss", "asin": "B07XF8VP6M", "category": "Baby Bouncers"},
    {"name": "Solly Baby Wrap Carrier", "asin": "B09QXS5KRN", "category": "Baby Carriers"},
    {"name": "Kiinde Kozii Bottle Warmer", "asin": "B00Q74NCVS", "category": "Baby Food Makers"},
    {"name": "Snuggle Me Organic Lounger", "asin": "B075RJ9LYW", "category": "Baby Loungers"},
    {"name": "SNOO Smart Sleeper Bassinet", "asin": "B0716KN18Z", "category": "Cribs"},
    {"name": "Storkcraft Tuscany 4-in-1 Convertible Crib", "asin": "B07BZ5TNMW", "category": "Cribs"},
    {"name": "Arlo Baby Monitor", "asin": "B072XZH4SB", "category": "Monitors"},
    {"name": "Infant Optics DXR-8 Pro", "asin": "B08FF4GV5C", "category": "Monitors"},
    {"name": "Nanit Pro Smart Baby Monitor", "asin": "B0FTSL4FXJ", "category": "Monitors"},
    {"name": "Owlet Dream Sock", "asin": "B09QY3FKWM", "category": "Monitors"},
    {"name": "Babyletto Tuba Swivel Glider", "asin": "B07ZCFQX5N", "category": "Nursing Chairs"},
    {"name": "DaVinci Olive Upholstered Swivel Glider", "asin": "B07BYFQN26", "category": "Nursing Chairs"},
    {"name": "Fisher-Price Laugh & Learn Smart Stages Potty", "asin": "B07Y5DVXZB", "category": "Potty Training"},
    {"name": "Jool Baby Potty Training Seat", "asin": "B07WBFN7HQ", "category": "Potty Training"},
    {"name": "Sophie la Girafe Teether", "asin": "B000IXKWEG", "category": "Teething Toys"},
    {"name": "DaVinci Kalani 4-in-1 Convertible Crib", "asin": "B000FT7NSI", "category": "Cribs"},
]

AFFILIATE_TAG = "pregnancysp0a-20"
AFFILIATE_URL_TEMPLATE = "https://www.amazon.com/dp/{asin}?tag={tag}"

def test_url(url, timeout=5):
    """Test if a URL is accessible (returns 200-299 status)"""
    try:
        response = requests.head(url, timeout=timeout, allow_redirects=True)
        return response.status_code < 400
    except Exception as e:
        return False

def search_amazon_url(product_name, category):
    """Generate Amazon search URL for manual verification"""
    search_query = f"{product_name} baby"
    params = urlencode({"k": search_query})
    return f"https://www.amazon.com/s?{params}"

def test_broken_links():
    """Test all broken links and identify which ones are still broken"""
    print("\n" + "="*80)
    print("TESTING 35 BROKEN AFFILIATE LINKS")
    print("="*80 + "\n")

    still_broken = []
    now_working = []

    for i, item in enumerate(BROKEN_LINKS, 1):
        url = AFFILIATE_URL_TEMPLATE.format(asin=item["asin"], tag=AFFILIATE_TAG)
        is_working = test_url(url)

        status = "✅ WORKING" if is_working else "❌ BROKEN"
        print(f"{i:2d}. [{status}] {item['name']}")
        print(f"    ASIN: {item['asin']} | Category: {item['category']}")
        print(f"    URL: {url}\n")

        if is_working:
            now_working.append(item)
        else:
            still_broken.append(item)

        time.sleep(0.5)  # Be respectful to Amazon

    print("\n" + "="*80)
    print(f"RESULTS: {len(now_working)} working | {len(still_broken)} still broken")
    print("="*80 + "\n")

    return still_broken, now_working

def generate_search_urls(broken_items):
    """Generate Amazon search URLs for each broken product"""
    print("\n" + "="*80)
    print("AMAZON SEARCH URLS FOR CORRECTION")
    print("="*80 + "\n")

    corrections_file = "affiliate_corrections_needed.csv"

    with open(corrections_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['#', 'Product Name', 'Category', 'Old ASIN', 'Search URL', 'New ASIN', 'Status'])
        writer.writeheader()

        for i, item in enumerate(broken_items, 1):
            search_url = search_amazon_url(item['name'], item['category'])

            print(f"{i}. {item['name']}")
            print(f"   Category: {item['category']}")
            print(f"   Old ASIN: {item['asin']}")
            print(f"   🔗 Search: {search_url}\n")

            writer.writerow({
                '#': i,
                'Product Name': item['name'],
                'Category': item['category'],
                'Old ASIN': item['asin'],
                'Search URL': search_url,
                'New ASIN': '[TODO]',
                'Status': 'Needs verification'
            })

    print(f"\n[OK] Correction URLs saved to: {corrections_file}")
    print(f"[NEXT] Open each Search URL in browser, find product, get new ASIN from URL")
    print(f"[THEN] Update New ASIN column in {corrections_file}")
    return corrections_file

def apply_corrections_from_csv(corrections_file):
    """Read corrected ASINs from CSV and update affiliate links"""
    print(f"\n[READING] {corrections_file}")

    corrections = {}
    with open(corrections_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            old_asin = row['Old ASIN'].strip()
            new_asin = row['New ASIN'].strip()
            if new_asin and new_asin != '[TODO]':
                corrections[old_asin] = new_asin

    if not corrections:
        print("[WARNING] No corrections found in CSV. Please update 'New ASIN' column first.")
        return None

    print(f"[OK] Found {len(corrections)} corrections\n")

    # Read cleaned CSV
    cleaned_file = "affiliate_links_cleaned.csv"
    updated_rows = []

    with open(cleaned_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            url = row['URL']
            # Extract ASIN from URL
            match = re.search(r'/dp/([A-Z0-9]+)', url)
            if match:
                old_asin = match.group(1)
                if old_asin in corrections:
                    new_asin = corrections[old_asin]
                    row['URL'] = AFFILIATE_URL_TEMPLATE.format(asin=new_asin, tag=AFFILIATE_TAG)
                    print(f"✅ Updated: {old_asin} → {new_asin}")
            updated_rows.append(row)

    # Write updated CSV
    output_file = "affiliate_links_fully_corrected.csv"
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=reader.fieldnames)
        writer.writeheader()
        writer.writerows(updated_rows)

    print(f"\n[OK] Updated links saved to: {output_file}")
    return output_file

def main():
    print("\n🔧 AFFILIATE LINK VERIFICATION & CORRECTION TOOL\n")

    # Step 1: Test all 35 broken links
    still_broken, now_working = test_broken_links()

    if now_working:
        print(f"📌 Good news: {len(now_working)} links now work!")
        print("   These may have been temporarily down during initial verification.\n")

    if still_broken:
        print(f"⚠️  {len(still_broken)} links still broken — need ASIN updates\n")

        # Step 2: Generate search URLs
        corrections_file = generate_search_urls(still_broken)

        print("\n" + "="*80)
        print("NEXT STEPS:")
        print("="*80)
        print(f"1. Open {corrections_file}")
        print("2. For each product, click the 'Search URL' and find it on Amazon")
        print("3. Get the ASIN from the product URL (format: /dp/B0XXXXXXXXX)")
        print("4. Paste the new ASIN into the 'New ASIN' column")
        print("5. Save the file")
        print(f"6. Run: python verify_and_fix_affiliate_links.py --apply-corrections")
        print("="*80 + "\n")
    else:
        print("✅ ALL LINKS WORKING! No corrections needed.\n")

if __name__ == '__main__':
    import sys

    if '--apply-corrections' in sys.argv:
        apply_corrections_from_csv("affiliate_corrections_needed.csv")
    else:
        main()
