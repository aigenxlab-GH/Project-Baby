import os
import re
import csv
import json

def extract_frontmatter(content):
    match = re.match(r'^---\n([\s\S]*?)\n---', content)
    if not match:
        return None

    frontmatter_text = match.group(1)
    frontmatter = {}

    in_list = False
    current_key = None
    list_content = []

    for line in frontmatter_text.split('\n'):
        # Check if we're starting a YAML list/object
        if line.strip().startswith('affiliateLinks:'):
            in_list = True
            current_key = 'affiliateLinks'
            continue

        if in_list:
            if line.startswith('  - ') or line.startswith('    '):
                list_content.append(line)
            elif line and not line.startswith(' '):
                in_list = False
                if list_content and current_key:
                    frontmatter[current_key] = '\n'.join(list_content)
                    list_content = []

        if not in_list and ':' in line and not line.startswith(' '):
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip("'\"")
            if key and value:
                frontmatter[key] = value

    if list_content and current_key:
        frontmatter[current_key] = '\n'.join(list_content)

    return frontmatter

def find_product_files(directory):
    files = []
    for root, dirs, filenames in os.walk(directory):
        if 'products' in root:
            for filename in filenames:
                if filename.endswith('.mdx'):
                    files.append(os.path.join(root, filename))
    return files

def extract_affiliate_links_from_yaml(yaml_string):
    links = []
    # Parse YAML affiliate links format
    # Format: - retailer: amazon, url: https://..., price: $100, inStock: true

    current_link = {}
    for line in yaml_string.split('\n'):
        line = line.strip()
        if line.startswith('- '):
            if current_link:
                links.append(current_link)
            current_link = {}
            line = line[2:]  # Remove '- '

        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip("'\"")
            current_link[key] = value

    if current_link:
        links.append(current_link)

    return links

def get_product_category(filepath):
    match = re.search(r'products[/\\]([^/\\]+)', filepath)
    return match.group(1).replace('-', ' ').title() if match else 'Unknown'

def get_product_name(filepath):
    match = re.search(r'([^/\\]+)\.mdx$', filepath)
    return match.group(1).replace('-', ' ').title() if match else 'Unknown'

def main():
    content_dir = 'content'
    product_files = find_product_files(content_dir)

    affiliate_data = []

    for filepath in product_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            frontmatter = extract_frontmatter(content)
            if not frontmatter or 'affiliateLinks' not in frontmatter:
                continue

            category = get_product_category(filepath)
            product_name = frontmatter.get('productName', get_product_name(filepath))

            # Extract affiliate links
            yaml_links = frontmatter.get('affiliateLinks', '')
            affiliate_links = extract_affiliate_links_from_yaml(yaml_links)

            for link in affiliate_links:
                affiliate_data.append({
                    'Category': category,
                    'Product Name': product_name,
                    'Retailer': link.get('retailer', 'Unknown'),
                    'URL': link.get('url', 'N/A'),
                    'Price': link.get('price', 'N/A'),
                    'In Stock': link.get('inStock', 'Unknown'),
                    'Domain': extract_domain(link.get('url', '')),
                    'Region': determine_region(link.get('url', ''))
                })
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    # Write CSV
    output_file = 'affiliate_links_complete.csv'

    if affiliate_data:
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            fieldnames = ['Category', 'Product Name', 'Retailer', 'URL', 'Price', 'In Stock', 'Domain', 'Region']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(affiliate_data)

        print(f"\n[OK] Affiliate links CSV created: {output_file}")
        print(f"[STATS] Total affiliate links: {len(affiliate_data)}")

        # Count by retailer
        retailers = {}
        for item in affiliate_data:
            retailer = item['Retailer']
            retailers[retailer] = retailers.get(retailer, 0) + 1

        print(f"\n[RETAILERS]")
        for retailer, count in sorted(retailers.items(), key=lambda x: x[1], reverse=True):
            print(f"  - {retailer}: {count} links")

        # Count by region
        regions = {}
        for item in affiliate_data:
            region = item['Region']
            regions[region] = regions.get(region, 0) + 1

        print(f"\n[REGIONS]")
        for region, count in sorted(regions.items(), key=lambda x: x[1], reverse=True):
            print(f"  - {region}: {count} links")
    else:
        print("[WARNING] No affiliate links found")

def extract_domain(url):
    match = re.search(r'https?://([^/]+)', url)
    return match.group(1) if match else 'Unknown'

def determine_region(url):
    if not url:
        return 'Unknown'

    domain_mapping = {
        'amazon.com': 'US',
        'amazon.co.uk': 'UK',
        'amazon.de': 'Germany',
        'amazon.fr': 'France',
        'amazon.it': 'Italy',
        'amazon.es': 'Spain',
        'amazon.nl': 'Netherlands',
        'amazon.se': 'Sweden',
        'amazon.ca': 'Canada',
        'amazon.au': 'Australia',
        'amazon.in': 'India',
        'amazon.jp': 'Japan',
    }

    for domain, region in domain_mapping.items():
        if domain in url:
            return region

    if 'amazon' in url:
        return 'Amazon (Region Unknown)'

    return 'Other/Unknown'

if __name__ == '__main__':
    main()
