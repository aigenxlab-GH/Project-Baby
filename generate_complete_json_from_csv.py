"""
Generate complete affiliate-links.json from affiliate_links_ALL_WORKING.csv
Converts CSV with all 177 links to organized JSON structure
"""

import csv
import json
from collections import defaultdict
import re

def csv_to_json(csv_file='affiliate_links_ALL_WORKING.csv', output_file='affiliate-links.json'):
    """Convert CSV to JSON format"""

    print("\n" + "="*80)
    print("GENERATING COMPLETE AFFILIATE LINKS JSON")
    print("="*80 + "\n")

    # Read CSV
    products_by_category = defaultdict(list)

    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)

            for row in reader:
                category = row['Category'].lower().replace(' ', '-')
                product_name = row['Product Name']
                url = row['URL']
                price = row['Price']

                # Extract ASIN from URL
                match = re.search(r'/dp/([A-Z0-9]{10})', url)
                asin = match.group(1) if match else "UNKNOWN"

                # Create slug from product name
                slug = product_name.lower().replace(' ', '-').replace('&', 'and')
                slug = re.sub(r'[^a-z0-9-]', '', slug)  # Remove special chars

                product = {
                    "slug": slug,
                    "name": product_name,
                    "asin": asin,
                    "price": price,
                    "status": "active",
                    "note": ""
                }

                products_by_category[category].append(product)

        print(f"[OK] Loaded {sum(len(v) for v in products_by_category.values())} products from CSV\n")

    except Exception as e:
        print(f"[ERROR] Failed to read CSV: {e}")
        return False

    # Build JSON structure
    json_data = {
        "metadata": {
            "version": "1.0",
            "lastUpdated": "2026-06-25",
            "totalLinks": sum(len(v) for v in products_by_category.values()),
            "affiliateTag": "pregnancysp0a-20",
            "instructions": "Edit this file to manage affiliate links. Run update_affiliate_links_from_json_to_application.py to sync changes to MDX files."
        },
        "categories": {}
    }

    # Sort categories and products
    for category in sorted(products_by_category.keys()):
        products = products_by_category[category]
        products.sort(key=lambda x: x['name'])
        json_data["categories"][category] = products
        print(f"[{category.upper()}] {len(products)} links")

    # Write JSON
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)

        print(f"\n[OK] Generated: {output_file}")
        print(f"[TOTAL] {json_data['metadata']['totalLinks']} affiliate links")
        print("="*80 + "\n")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to write JSON: {e}")
        return False

if __name__ == '__main__':
    import sys

    csv_file = sys.argv[1] if len(sys.argv) > 1 else 'affiliate_links_ALL_WORKING.csv'
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'affiliate-links.json'

    csv_to_json(csv_file, output_file)
