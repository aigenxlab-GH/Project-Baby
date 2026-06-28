#!/usr/bin/env python3
"""
Generate CSV template for ASIN verification across 7 countries
User fills this in, then we auto-update the JSON
"""

import json
import csv
from pathlib import Path

def generate_asin_template():
    """Create CSV template with all products for ASIN lookup"""

    # Read current JSON
    with open('affiliate-links.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Collect all products
    products = []
    for category, items in data['categories'].items():
        for item in items:
            products.append({
                'slug': item['slug'],
                'name': item['name'],
                'category': item['category'],
                'current_asin_all': item['availability']['US']['asin'],  # Current (likely same for all)
            })

    # Create CSV with columns for each region
    csv_path = 'asin_verification_template.csv'

    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'Slug',
            'Product Name',
            'Category',
            'Current ASIN (All)',
            'US ASIN',
            'UK ASIN',
            'CA ASIN',
            'DE ASIN',
            'FR ASIN',
            'IT ASIN',
            'ES ASIN',
            'Notes'
        ])

        writer.writeheader()

        for product in products:
            writer.writerow({
                'Slug': product['slug'],
                'Product Name': product['name'],
                'Category': product['category'],
                'Current ASIN (All)': product['current_asin_all'],
                'US ASIN': '',  # User fills these in
                'UK ASIN': '',
                'CA ASIN': '',
                'DE ASIN': '',
                'FR ASIN': '',
                'IT ASIN': '',
                'ES ASIN': '',
                'Notes': ''
            })

    print(f"[OK] Generated: {csv_path}")
    print(f"[OK] Total products: {len(products)}")
    print(f"\nInstructions:")
    print("1. Open asin_verification_template.csv in Excel/Google Sheets")
    print("2. For each product, verify ASIN on each Amazon marketplace")
    print("3. Fill in the ASIN for each country column")
    print("4. Save the file")
    print("5. Run: python update_asin_from_csv.py")
    print("\nLinks to check each marketplace:")
    print("  US: https://www.amazon.com/s?k=<product_name>")
    print("  UK: https://www.amazon.co.uk/s?k=<product_name>")
    print("  CA: https://www.amazon.ca/s?k=<product_name>")
    print("  DE: https://www.amazon.de/s?k=<product_name>")
    print("  FR: https://www.amazon.fr/s?k=<product_name>")
    print("  IT: https://www.amazon.it/s?k=<product_name>")
    print("  ES: https://www.amazon.es/s?k=<product_name>")

if __name__ == '__main__':
    generate_asin_template()
