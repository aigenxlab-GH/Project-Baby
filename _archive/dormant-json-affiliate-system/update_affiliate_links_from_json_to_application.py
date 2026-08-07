"""
Sync affiliate links from JSON to MDX files
Simple, fast, no external dependencies
"""

import json
import os
import re
from pathlib import Path

AFFILIATE_TAG = "pregnancysp0a-20"
AFFILIATE_URL_TEMPLATE = "https://www.amazon.com/dp/{asin}?tag={tag}"

def load_affiliate_links(json_file='affiliate-links.json'):
    """Load all affiliate links from JSON"""
    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data
    except Exception as e:
        print(f"[ERROR] Failed to load JSON: {e}")
        return None

def update_mdx_file(category, slug, asin):
    """Update affiliate link in MDX file"""
    file_path = f"content/products/{category}/{slug}.mdx"

    if not os.path.exists(file_path):
        print(f"  [SKIP] File not found: {file_path}")
        return False

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Build new URL
        new_url = AFFILIATE_URL_TEMPLATE.format(asin=asin, tag=AFFILIATE_TAG)

        # Find and replace the affiliate URL in frontmatter
        # Pattern: url: 'https://www.amazon.com/dp/BXXXXXXXXX?tag=...'
        pattern = r"url: '[^']*(?:amazon\.com|amazon\.co\.uk)[^']*'"
        new_url_line = f"url: '{new_url}'"

        updated_content = re.sub(pattern, new_url_line, content)

        if updated_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"  [UPDATED] {slug} -> {asin}")
            return True
        else:
            print(f"  [NO CHANGE] {slug}")
            return False
    except Exception as e:
        print(f"  [ERROR] {slug}: {e}")
        return False

def main():
    print("\n" + "="*80)
    print("SYNCING AFFILIATE LINKS FROM JSON")
    print("="*80 + "\n")

    # Load JSON
    data = load_affiliate_links('affiliate-links.json')
    if not data:
        return False

    metadata = data.get('metadata', {})
    print(f"[OK] Loaded {metadata.get('totalLinks', 0)} affiliate links\n")

    # Sync each category
    total_updated = 0
    total_skipped = 0
    broken_links = []

    categories = data.get('categories', {})
    for category, products in categories.items():
        print(f"[CATEGORY] {category.upper()}")

        for product in products:
            slug = product.get('slug')
            asin = product.get('asin')
            status = product.get('status', 'active')
            note = product.get('note', '')

            if status == 'broken':
                broken_links.append({
                    'category': category,
                    'slug': slug,
                    'asin': asin,
                    'note': note
                })
                print(f"  [BROKEN] {slug} - {note}")
                total_skipped += 1
                continue

            if update_mdx_file(category, slug, asin):
                total_updated += 1
            else:
                total_skipped += 1

        print()

    # Report
    print("="*80)
    print("SYNC RESULTS")
    print("="*80)
    print(f"Updated: {total_updated}")
    print(f"Skipped/Not Found: {total_skipped}")
    print(f"Total processed: {total_updated + total_skipped}\n")

    if broken_links:
        print("[BROKEN LINKS - NEED REPLACEMENT]\n")
        for link in broken_links:
            print(f"  {link['category']}/{link['slug']}")
            print(f"    ASIN: {link['asin']}")
            print(f"    Status: {link['note']}\n")

    print("="*80 + "\n")

    return total_updated > 0

if __name__ == '__main__':
    import sys

    # Optional: specify JSON file as argument
    json_file = sys.argv[1] if len(sys.argv) > 1 else 'affiliate-links.json'

    main()
