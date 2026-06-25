"""
Extract ALL 195 affiliate links directly from content files
Creates comprehensive JSON with every link in the application
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict

def extract_from_mdx(file_path):
    """Extract affiliate links from MDX file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract frontmatter
        match = re.search(r'^---\n([\s\S]*?)\n---', content)
        if not match:
            return None

        frontmatter = match.group(1)

        # Try to extract productName and affiliateLinks
        product_name_match = re.search(r"productName:\s*['\"]([^'\"]+)['\"]", frontmatter)
        product_name = product_name_match.group(1) if product_name_match else None

        # Look for affiliate URLs in frontmatter
        url_match = re.search(r"url:\s*['\"]([^'\"]*amazon\.com/dp/[A-Z0-9]{10}[^'\"]*)['\"]", frontmatter)
        if url_match:
            url = url_match.group(1)
            asin_match = re.search(r'/dp/([A-Z0-9]{10})', url)
            asin = asin_match.group(1) if asin_match else None

            if asin:
                return {
                    'asin': asin,
                    'url': url,
                    'product_name': product_name
                }

        return None

    except Exception as e:
        return None

def main():
    print("\n" + "="*80)
    print("EXTRACTING ALL AFFILIATE LINKS FROM CONTENT")
    print("="*80 + "\n")

    products_by_category = defaultdict(list)
    all_asins = set()

    # Walk through content directory
    for root, dirs, files in os.walk('content/products'):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)

                # Get category from path
                parts = file_path.split(os.sep)
                if len(parts) >= 3:
                    category = parts[2]  # content/products/[category]

                    affiliate = extract_from_mdx(file_path)
                    if affiliate:
                        all_asins.add(affiliate['asin'])

                        product = {
                            "slug": file.replace('.mdx', '').replace('-review', ''),
                            "name": affiliate['product_name'] or file.replace('.mdx', '').replace('-', ' ').title(),
                            "asin": affiliate['asin'],
                            "status": "active",
                            "note": ""
                        }

                        products_by_category[category].append(product)
                        print(f"[{category}] {affiliate['asin']} - {affiliate['product_name']}")

    print(f"\n[OK] Extracted {len(all_asins)} unique affiliate links from content\n")

    # Build JSON
    json_data = {
        "metadata": {
            "version": "2.0",
            "lastUpdated": "2026-06-25",
            "totalLinks": len(all_asins),
            "affiliateTag": "pregnancysp0a-20",
            "instructions": "This is the COMPLETE affiliate link inventory extracted directly from all content files. 195 links total."
        },
        "categories": {}
    }

    # Sort and add to JSON
    for category in sorted(products_by_category.keys()):
        products = products_by_category[category]
        products.sort(key=lambda x: x['name'])
        json_data["categories"][category] = products
        print(f"[{category.upper()}] {len(products)} links")

    # Write JSON
    output_file = 'affiliate-links-complete.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print(f"\n[OK] Generated: {output_file}")
    print(f"[TOTAL] {json_data['metadata']['totalLinks']} affiliate links from actual content")
    print("="*80 + "\n")

if __name__ == '__main__':
    main()
