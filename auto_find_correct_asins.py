"""
Auto-find correct ASINs by scraping Amazon search results.
This is faster than manual lookup of 35 products.
"""

import re
import csv
import requests
from bs4 import BeautifulSoup
import time

BROKEN_LINKS = [
    {"name": "Comotomo Baby Bottle", "old_asin": "B004C053BA", "category": "Nursing Feeding"},
    {"name": "Haakaa Silicone Breast Pump Gen 2", "old_asin": "B07CWK4S5W", "category": "Breast Pumps"},
    {"name": "Philips Avent Anti-Colic Bottle", "old_asin": "B0961QRR5K", "category": "Nursing Feeding"},
    {"name": "Bright Starts Tummy Time Prop & Play", "old_asin": "B07FX5F7NR", "category": "Play Mats"},
    {"name": "Fisher-Price Deluxe Kick 'n Play Piano Gym", "old_asin": "B07BQNQKN5", "category": "Play Mats"},
    {"name": "Lovevery Play Gym", "old_asin": "B07Q38BVCK", "category": "Play Mats"},
    {"name": "Skip Hop Explore & More Baby Play Mat", "old_asin": "B07H1P5JN4", "category": "Play Mats"},
    {"name": "Levoit LV600HH Hybrid Ultrasonic Humidifier", "old_asin": "B07V1P3YQC", "category": "Humidifiers"},
    {"name": "Pure Enrichment MistAire Ultrasonic Cool Mist Humidifier", "old_asin": "B013IJPTFK", "category": "Humidifiers"},
    {"name": "Safety 1st 360 Degree Ultrasonic Humidifier", "old_asin": "B07BVGTXWD", "category": "Humidifiers"},
    {"name": "Nuby Silicone Spout Sippy Cup", "old_asin": "B07BGLXFHQ", "category": "Sippy Cups"},
    {"name": "Pura Kiki Stainless Steel Sippy Cup", "old_asin": "B07RJMQC73", "category": "Sippy Cups"},
    {"name": "Tommee Tippee First Sips Trainer Cup", "old_asin": "B09BRDP8SR", "category": "Sippy Cups"},
    {"name": "Babyzen YOYO2 Stroller", "old_asin": "B0856NX5D7", "category": "Strollers"},
    {"name": "Doona Infant Car Seat & Stroller", "old_asin": "B07HML1BT5", "category": "Strollers"},
    {"name": "Graco Modes Pramette Travel System", "old_asin": "B07Y5VQYFW", "category": "Strollers"},
    {"name": "Spectra S1 Plus Electric Breast Pump", "old_asin": "B00DBKFFJM", "category": "Breast Pumps"},
    {"name": "Spectra S2 Plus", "old_asin": "B00BLBLR1I", "category": "Breast Pumps"},
    {"name": "Angelcare Soft Touch Bath Support", "old_asin": "B00BKJOM0U", "category": "Baby Bathtubs"},
    {"name": "BabyBjörn Bouncer Bliss", "old_asin": "B07XF8VP6M", "category": "Baby Bouncers"},
    {"name": "Solly Baby Wrap Carrier", "old_asin": "B09QXS5KRN", "category": "Baby Carriers"},
    {"name": "Kiinde Kozii Bottle Warmer", "old_asin": "B00Q74NCVS", "category": "Baby Food Makers"},
    {"name": "Snuggle Me Organic Lounger", "old_asin": "B075RJ9LYW", "category": "Baby Loungers"},
    {"name": "SNOO Smart Sleeper Bassinet", "old_asin": "B0716KN18Z", "category": "Cribs"},
    {"name": "Storkcraft Tuscany 4-in-1 Convertible Crib", "old_asin": "B07BZ5TNMW", "category": "Cribs"},
    {"name": "Arlo Baby Monitor", "old_asin": "B072XZH4SB", "category": "Monitors"},
    {"name": "Infant Optics DXR-8 Pro", "old_asin": "B08FF4GV5C", "category": "Monitors"},
    {"name": "Nanit Pro Smart Baby Monitor", "old_asin": "B0FTSL4FXJ", "category": "Monitors"},
    {"name": "Owlet Dream Sock", "old_asin": "B09QY3FKWM", "category": "Monitors"},
    {"name": "Babyletto Tuba Swivel Glider", "old_asin": "B07ZCFQX5N", "category": "Nursing Chairs"},
    {"name": "DaVinci Olive Upholstered Swivel Glider", "old_asin": "B07BYFQN26", "category": "Nursing Chairs"},
    {"name": "Fisher-Price Laugh & Learn Smart Stages Potty", "old_asin": "B07Y5DVXZB", "category": "Potty Training"},
    {"name": "Jool Baby Potty Training Seat", "old_asin": "B07WBFN7HQ", "category": "Potty Training"},
    {"name": "Sophie la Girafe Teether", "old_asin": "B000IXKWEG", "category": "Teething Toys"},
    {"name": "DaVinci Kalani 4-in-1 Convertible Crib", "old_asin": "B000FT7NSI", "category": "Cribs"},
]

def search_amazon_for_product(product_name):
    """
    Search Amazon for product and return the ASIN of the first matching result.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    search_url = f"https://www.amazon.com/s?k={product_name.replace(' ', '+')}"

    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()

        # Extract ASIN from search results
        asins = re.findall(r'data-asin="([A-Z0-9]{10})"', response.text)

        if asins:
            # Return first ASIN (usually most relevant)
            return asins[0]
        else:
            return None

    except Exception as e:
        print(f"  Error searching for '{product_name}': {e}")
        return None

def main():
    print("\n" + "="*80)
    print("AUTO-FINDING CORRECT ASINs FOR 35 BROKEN LINKS")
    print("="*80 + "\n")

    corrections = []
    found = 0
    not_found = 0

    for i, item in enumerate(BROKEN_LINKS, 1):
        product_name = item["name"]
        old_asin = item["old_asin"]

        print(f"[{i:2d}/35] Searching: {product_name}...", end=" ", flush=True)

        new_asin = search_amazon_for_product(product_name)

        if new_asin:
            status = "FOUND" if new_asin != old_asin else "SAME"
            print(f"{status}")
            print(f"       Old: {old_asin} -> New: {new_asin}\n")
            found += 1
        else:
            print("NOT FOUND (needs manual verification)\n")
            new_asin = "[MANUAL_LOOKUP]"
            not_found += 1

        corrections.append({
            "Product Name": product_name,
            "Category": item["category"],
            "Old ASIN": old_asin,
            "New ASIN": new_asin,
            "Status": "FOUND" if new_asin != "[MANUAL_LOOKUP]" else "NEEDS_MANUAL"
        })

        time.sleep(1)  # Be respectful to Amazon

    # Write corrections to CSV
    output_file = "affiliate_corrections_auto.csv"
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Product Name', 'Category', 'Old ASIN', 'New ASIN', 'Status'])
        writer.writeheader()
        writer.writerows(corrections)

    print("\n" + "="*80)
    print("RESULTS")
    print("="*80)
    print(f"Found: {found}/35")
    print(f"Needs manual lookup: {not_found}/35")
    print(f"\nSaved to: {output_file}")
    print("="*80 + "\n")

if __name__ == '__main__':
    main()
