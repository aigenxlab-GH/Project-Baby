"""
Extract ALL affiliate links from content with page/category context
"""

import os
import re
import json
from collections import defaultdict

def extract_from_mdx(file_path):
    """Extract affiliate links from MDX file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        match = re.search(r'^---\n([\s\S]*?)\n---', content)
        if not match:
            return None

        frontmatter = match.group(1)

        # Extract product name
        product_name_match = re.search(r"productName:\s*['\"]([^'\"]+)['\"]", frontmatter)
        product_name = product_name_match.group(1) if product_name_match else None

        # Look for affiliate URL
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
    print("EXTRACTING ALL AFFILIATE LINKS WITH PAGE CONTEXT")
    print("="*80 + "\n")

    products_by_category = defaultdict(list)
    all_asins = set()

    # Walk through content/products directory
    content_products_path = 'content/products'

    for category_folder in os.listdir(content_products_path):
        category_path = os.path.join(content_products_path, category_folder)

        if not os.path.isdir(category_path):
            continue

        # Get all MDX files in this category
        for mdx_file in os.listdir(category_path):
            if mdx_file.endswith('.mdx'):
                file_path = os.path.join(category_path, mdx_file)

                affiliate = extract_from_mdx(file_path)
                if affiliate:
                    all_asins.add(affiliate['asin'])

                    slug = mdx_file.replace('.mdx', '')
                    product_page = f"/products/{category_folder}/{slug}"

                    product = {
                        "slug": slug,
                        "name": affiliate['product_name'] or slug.replace('-', ' ').title(),
                        "asin": affiliate['asin'],
                        "page": product_page,
                        "category": category_folder.replace('-', ' ').title(),
                        "status": "active",
                        "note": ""
                    }

                    products_by_category[category_folder].append(product)
                    print(f"[{category_folder}] {affiliate['asin']} - {affiliate['product_name']}")

    print(f"\n[OK] Extracted {len(all_asins)} unique affiliate links\n")

    # Build JSON
    json_data = {
        "metadata": {
            "version": "2.0",
            "lastUpdated": "2026-06-25",
            "totalLinks": len(all_asins),
            "affiliateTag": "pregnancysp0a-20",
            "instructions": "COMPLETE affiliate inventory extracted from content. Each product includes: page location, category, ASIN, and status."
        },
        "categories": {}
    }

    # Sort categories and add products
    for category in sorted(products_by_category.keys()):
        products = products_by_category[category]
        products.sort(key=lambda x: x['name'])
        json_data["categories"][category] = products
        print(f"[{category.upper()}] {len(products)} products")

    # Write JSON
    with open('affiliate-links.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print(f"\n[OK] Generated: affiliate-links.json")
    print(f"[TOTAL] {json_data['metadata']['totalLinks']} affiliate links")
    print("="*80 + "\n")

if __name__ == '__main__':
    main()
