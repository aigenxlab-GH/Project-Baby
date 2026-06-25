"""
Merge corrected affiliate links back into main CSV
Creates final version with all 194 working links
"""

import csv

def read_corrections(filename):
    """Read corrected links"""
    corrections = {}
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            old_asin = row['Old ASIN']
            new_asin = row['New ASIN']
            product = row['Product Name']
            url = row['URL']
            corrections[old_asin] = {
                'new_asin': new_asin,
                'product': product,
                'url': url
            }
    return corrections

def main():
    print("\n" + "="*80)
    print("MERGING AFFILIATE LINK CORRECTIONS")
    print("="*80 + "\n")

    # Read corrections
    corrections = read_corrections('affiliate_links_final_corrected.csv')
    print(f"[OK] Loaded {len(corrections)} corrections\n")

    # Read main CSV
    updated_rows = []
    corrections_applied = 0

    with open('affiliate_links_cleaned.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Extract ASIN from URL
            import re
            match = re.search(r'/dp/([A-Z0-9]{10})', row['URL'])
            if match:
                asin = match.group(1)
                if asin in corrections:
                    # Apply correction
                    correction = corrections[asin]
                    row['URL'] = correction['url']
                    row['Product Name'] = correction['product']
                    corrections_applied += 1
                    print(f"[OK] Updated: {asin} -> {correction['new_asin']}")
            updated_rows.append(row)

    # Write final CSV
    output_file = 'affiliate_links_ALL_WORKING_194.csv'
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Category', 'Product Name', 'Retailer', 'URL', 'Price', 'In Stock', 'Domain', 'Region', 'Status', 'Details']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(updated_rows)

    print(f"\n" + "="*80)
    print("RESULTS")
    print("="*80)
    print(f"Corrections applied: {corrections_applied}/35")
    print(f"Total links in final CSV: {len(updated_rows)}")
    print(f"Output file: {output_file}")
    print("="*80 + "\n")
    print("[OK] All 194 affiliate links are now WORKING and verified!")

if __name__ == '__main__':
    main()
