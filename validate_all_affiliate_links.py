"""
Validate all 177 affiliate links - test each one to confirm it actually works
Reports broken links so they can be fixed
"""

import csv
import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def test_link(asin, url, product_name, category):
    """Test if a single affiliate link works"""
    try:
        response = requests.head(url, timeout=10, allow_redirects=True)
        is_working = response.status_code < 400
        return {
            'asin': asin,
            'product': product_name,
            'category': category,
            'url': url,
            'status_code': response.status_code,
            'working': is_working
        }
    except Exception as e:
        return {
            'asin': asin,
            'product': product_name,
            'category': category,
            'url': url,
            'status_code': 'ERROR',
            'working': False,
            'error': str(e)
        }

def main():
    print("\n" + "="*80)
    print("VALIDATING ALL 177 AFFILIATE LINKS")
    print("="*80 + "\n")

    # Read final CSV
    links = []
    with open('affiliate_links_ALL_WORKING.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            import re
            match = re.search(r'/dp/([A-Z0-9]{10})', row['URL'])
            if match:
                asin = match.group(1)
                links.append({
                    'asin': asin,
                    'product': row['Product Name'],
                    'category': row['Category'],
                    'url': row['URL']
                })

    print(f"[OK] Loaded {len(links)} links to test\n")

    # Test all links with threading
    working = []
    broken = []

    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(test_link, link['asin'], link['url'], link['product'], link['category']): link for link in links}

        completed = 0
        for future in as_completed(futures):
            completed += 1
            result = future.result()

            if result['working']:
                working.append(result)
                status = "[OK]"
            else:
                broken.append(result)
                status = "[BROKEN]"

            print(f"{status} {completed:3d}/{len(links)} | {result['asin']} | {result['product'][:40]}")
            time.sleep(0.2)  # Be respectful to Amazon

    # Report results
    print(f"\n" + "="*80)
    print("VALIDATION RESULTS")
    print("="*80)
    print(f"Working: {len(working)}/177")
    print(f"Broken: {len(broken)}/177")

    if broken:
        print(f"\n[BROKEN LINKS - NEED REPLACEMENT]\n")
        for link in broken:
            print(f"{link['asin']} | {link['category']:20s} | {link['product']}")

        # Save broken links to CSV
        with open('broken_links_to_fix.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['ASIN', 'Category', 'Product', 'URL', 'Status'])
            writer.writeheader()
            for link in broken:
                writer.writerow({
                    'ASIN': link['asin'],
                    'Category': link['category'],
                    'Product': link['product'],
                    'URL': link['url'],
                    'Status': f"HTTP {link.get('status_code', 'ERROR')}"
                })

        print(f"\n[SAVED] Broken links list: broken_links_to_fix.csv")
    else:
        print(f"\n[SUCCESS] All 177 links are working!")

    print("="*80 + "\n")

if __name__ == '__main__':
    main()
