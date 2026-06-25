#!/usr/bin/env python3
"""
Test all Amazon affiliate links in the CSV and create a cleaned version.
Identifies broken vs working links and generates a summary report.
"""

import csv
import requests
from urllib.parse import urlparse
import time
from collections import defaultdict

# Configuration
INPUT_FILE = r'C:\AIGenXLab\Projects\Project-Baby\affiliate_links_complete.csv'
OUTPUT_FILE = r'C:\AIGenXLab\Projects\Project-Baby\affiliate_links_cleaned.csv'
REPORT_FILE = r'C:\AIGenXLab\Projects\Project-Baby\affiliate_links_report.txt'

# Timeout for each request (seconds)
REQUEST_TIMEOUT = 5

# Headers to mimic browser request
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

def test_link(url):
    """
    Test if a link is working.
    Returns: ('WORKING', status_code) or ('BROKEN', reason)
    """
    try:
        # Follow redirects
        response = requests.head(url, timeout=REQUEST_TIMEOUT, headers=HEADERS, allow_redirects=True)

        # 200-299 = working, 30x redirects are OK (product still exists)
        if 200 <= response.status_code < 400:
            return ('WORKING', response.status_code)
        elif response.status_code == 404:
            return ('BROKEN', '404 Not Found')
        elif response.status_code == 410:
            return ('BROKEN', '410 Gone')
        else:
            # Other error codes
            return ('BROKEN', f'HTTP {response.status_code}')

    except requests.Timeout:
        return ('BROKEN', 'Timeout')
    except requests.ConnectionError:
        return ('BROKEN', 'Connection Error')
    except Exception as e:
        return ('BROKEN', str(e))

def extract_asin(url):
    """Extract ASIN (B-code) from Amazon URL"""
    # URLs look like: https://www.amazon.com/dp/B07P7XGQRT?tag=...
    if '/dp/' in url:
        parts = url.split('/dp/')
        if len(parts) > 1:
            asin = parts[1].split('?')[0]
            return asin
    return None

def main():
    """Main function to test links and generate report"""

    print("Starting affiliate link verification...")
    print(f"Reading from: {INPUT_FILE}")
    print()

    # Read input CSV
    rows = []
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"Total links to test: {len(rows)}")
    print()

    # Test each link
    results = []
    working_count = 0
    broken_count = 0
    category_stats = defaultdict(lambda: {'working': 0, 'broken': 0})
    broken_products = []

    for idx, row in enumerate(rows, 1):
        url = row.get('URL', '').strip()
        category = row.get('Category', '').strip()
        product_name = row.get('Product Name', '').strip()
        retailer = row.get('Retailer', '').strip()

        print(f"[{idx}/{len(rows)}] Testing: {product_name[:50]}", end=' ... ')

        # Skip if URL is empty or not Amazon
        if not url or 'amazon.com' not in url:
            status = 'SKIPPED'
            reason = 'Not Amazon URL'
            print(f"{status}")
            row['Status'] = status
            row['Details'] = reason
            results.append(row)
            continue

        # Test the link
        status, details = test_link(url)
        print(f"{status} ({details})")

        # Add status to row
        row['Status'] = status
        row['Details'] = details

        if status == 'WORKING':
            working_count += 1
            category_stats[category]['working'] += 1
            results.append(row)
        elif status == 'BROKEN':
            broken_count += 1
            category_stats[category]['broken'] += 1
            broken_products.append({
                'category': category,
                'product': product_name,
                'reason': details,
                'url': url
            })
        elif status == 'SKIPPED':
            pass

        # Rate limiting - be nice to Amazon
        time.sleep(0.5)

    # Filter to keep only WORKING links for the cleaned CSV
    working_rows = [r for r in results if r.get('Status') == 'WORKING']

    print()
    print("=" * 80)
    print("SUMMARY REPORT")
    print("=" * 80)
    print(f"Total links tested:    {len(rows)}")
    print(f"Links working:         {working_count}")
    print(f"Links broken:          {broken_count}")
    print(f"Percentage working:    {(working_count/len(rows)*100):.1f}%")
    print()

    print("WORKING LINKS BY CATEGORY:")
    print("-" * 80)
    for category in sorted(category_stats.keys()):
        stats = category_stats[category]
        total = stats['working'] + stats['broken']
        print(f"  {category:30} {stats['working']:3}/{total:3} working ({stats['working']/total*100:5.1f}%)")

    if broken_products:
        print()
        print("BROKEN PRODUCTS:")
        print("-" * 80)
        for item in broken_products:
            print(f"  [{item['category']}]")
            print(f"    Product: {item['product']}")
            print(f"    Reason: {item['reason']}")
            print()

    # Write cleaned CSV with only working links + status column
    print()
    print(f"Writing cleaned CSV with {len(working_rows)} working links...")

    if working_rows:
        # Write with status column
        fieldnames = list(working_rows[0].keys())
        if 'Status' not in fieldnames:
            fieldnames.append('Status')
        if 'Details' not in fieldnames:
            fieldnames.append('Details')

        with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(working_rows)

        print(f"Cleaned CSV saved to: {OUTPUT_FILE}")

    # Write detailed report
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("AFFILIATE LINKS VERIFICATION REPORT\n")
        f.write("=" * 80 + "\n\n")

        f.write(f"Total links tested:    {len(rows)}\n")
        f.write(f"Links working:         {working_count}\n")
        f.write(f"Links broken:          {broken_count}\n")
        f.write(f"Percentage working:    {(working_count/len(rows)*100):.1f}%\n\n")

        f.write("WORKING LINKS BY CATEGORY:\n")
        f.write("-" * 80 + "\n")
        for category in sorted(category_stats.keys()):
            stats = category_stats[category]
            total = stats['working'] + stats['broken']
            f.write(f"  {category:30} {stats['working']:3}/{total:3} working ({stats['working']/total*100:5.1f}%)\n")

        if broken_products:
            f.write("\nBROKEN PRODUCTS:\n")
            f.write("-" * 80 + "\n")
            for item in broken_products:
                f.write(f"\n[{item['category']}]\n")
                f.write(f"  Product: {item['product']}\n")
                f.write(f"  Reason: {item['reason']}\n")
                f.write(f"  URL: {item['url']}\n")

    print(f"Report saved to: {REPORT_FILE}")
    print()
    print("=" * 80)
    print("VERIFICATION COMPLETE")
    print("=" * 80)

if __name__ == '__main__':
    main()
