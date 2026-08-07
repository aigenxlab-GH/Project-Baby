#!/usr/bin/env python3
"""
Read ASIN verification CSV and update affiliate-links.json
"""

import json
import csv
from pathlib import Path

def update_json_from_csv():
    """Update JSON with verified ASINs from CSV"""

    # Read CSV
    csv_path = 'asin_verification_template.csv'
    if not Path(csv_path).exists():
        print(f"[ERROR] {csv_path} not found!")
        return

    # Read JSON
    with open('affiliate-links.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Track updates
    updated_count = 0
    skipped_count = 0
    errors = []

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            slug = row['Slug'].strip()
            us_asin = row['US ASIN'].strip()
            uk_asin = row['UK ASIN'].strip()
            ca_asin = row['CA ASIN'].strip()
            de_asin = row['DE ASIN'].strip()
            fr_asin = row['FR ASIN'].strip()
            it_asin = row['IT ASIN'].strip()
            es_asin = row['ES ASIN'].strip()

            # Skip if no ASINs filled
            if not any([us_asin, uk_asin, ca_asin, de_asin, fr_asin, it_asin, es_asin]):
                skipped_count += 1
                continue

            # Find product
            product = None
            for category, items in data['categories'].items():
                for item in items:
                    if item['slug'] == slug:
                        product = item
                        break
                if product:
                    break

            if not product:
                errors.append(f"Product not found: {slug}")
                continue

            # Update ASINs
            regions = {
                'US': us_asin,
                'UK': uk_asin,
                'CA': ca_asin,
                'DE': de_asin,
                'FR': fr_asin,
                'IT': it_asin,
                'ES': es_asin,
            }

            for region, asin in regions.items():
                if asin:  # Only update if provided
                    if region not in product['availability']:
                        product['availability'][region] = {}
                    product['availability'][region]['asin'] = asin
                    # Keep available status
                    if 'available' not in product['availability'][region]:
                        product['availability'][region]['available'] = True

            updated_count += 1
            print(f"[UPDATED] {product['name']}")

    # Write updated JSON
    with open('affiliate-links.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    # Print summary
    print("\n" + "="*60)
    print(f"[OK] Updated: {updated_count} products")
    print(f"[SKIP] Skipped (empty): {skipped_count} products")
    print("="*60)

    if errors:
        print("\n[ERRORS]:")
        for error in errors:
            print(f"  - {error}")

    print("\n[OK] JSON updated successfully!")
    print("[INFO] File: affiliate-links.json")

if __name__ == '__main__':
    update_json_from_csv()
