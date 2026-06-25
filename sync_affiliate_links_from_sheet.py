"""
Sync affiliate links from Google Sheet to site files
Reads from Google Sheets API and updates MDX files automatically
"""

import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
import re
import json
from pathlib import Path

# Google Sheets Setup
SHEET_NAME = "Affiliate Links Master"  # Update with your sheet name
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

def authenticate_google_sheets(credentials_file='google-credentials.json'):
    """Authenticate with Google Sheets API"""
    try:
        creds = ServiceAccountCredentials.from_json_keyfile_name(
            credentials_file, SCOPES
        )
        client = gspread.authorize(creds)
        return client
    except Exception as e:
        print(f"[ERROR] Failed to authenticate Google Sheets: {e}")
        print("[SETUP] You need to:")
        print("  1. Create a Google Service Account")
        print("  2. Download credentials JSON")
        print("  3. Save as google-credentials.json in this directory")
        return None

def get_sheet_data(client, sheet_name):
    """Fetch data from Google Sheet"""
    try:
        sheet = client.open(sheet_name).sheet1
        data = sheet.get_all_records()
        return data
    except Exception as e:
        print(f"[ERROR] Failed to read sheet: {e}")
        return None

def update_mdx_file(category, product_slug, asin, url):
    """Update affiliate link in MDX file"""
    file_path = f"content/products/{category}/{product_slug}.mdx"

    if not os.path.exists(file_path):
        print(f"[SKIP] File not found: {file_path}")
        return False

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find and replace the affiliate URL in frontmatter
        # Look for: url: 'https://www.amazon.com/dp/BXXXXXXXXX?tag=...'
        pattern = r"url: '[^']*(?:amazon\.com|amazon\.co\.uk)[^']*'"
        new_url = f"url: '{url}'"

        updated_content = re.sub(pattern, new_url, content)

        if updated_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"[UPDATED] {product_slug}: {asin}")
            return True
        else:
            print(f"[NO CHANGE] {product_slug}")
            return False
    except Exception as e:
        print(f"[ERROR] Failed to update {product_slug}: {e}")
        return False

def sync_links_from_sheet(credentials_file='google-credentials.json', sheet_name="Affiliate Links Master"):
    """Main sync function"""
    print("\n" + "="*80)
    print("SYNCING AFFILIATE LINKS FROM GOOGLE SHEET")
    print("="*80 + "\n")

    # Authenticate
    client = authenticate_google_sheets(credentials_file)
    if not client:
        return False

    # Get data
    print("[LOADING] Fetching data from Google Sheet...")
    data = get_sheet_data(client, sheet_name)
    if not data:
        return False

    print(f"[OK] Loaded {len(data)} products\n")

    # Sync each link
    updated = 0
    skipped = 0

    for row in data:
        # Expected columns: Category, Product Slug, ASIN, URL, Status
        try:
            category = row.get('Category', '').lower().replace(' ', '-')
            product_slug = row.get('Product Slug', '').lower().replace(' ', '-')
            asin = row.get('ASIN', '')
            url = row.get('URL', '')
            status = row.get('Status', 'active')

            if not category or not product_slug or not asin or not url:
                skipped += 1
                continue

            if status.lower() == 'skip':
                skipped += 1
                continue

            if update_mdx_file(category, product_slug, asin, url):
                updated += 1
            else:
                skipped += 1

        except Exception as e:
            print(f"[ERROR] Row error: {e}")
            skipped += 1

    print(f"\n" + "="*80)
    print("SYNC RESULTS")
    print("="*80)
    print(f"Updated: {updated}")
    print(f"Skipped/Failed: {skipped}")
    print(f"Total processed: {updated + skipped}")
    print("="*80 + "\n")

    return updated > 0

if __name__ == '__main__':
    import sys

    sheet_name = sys.argv[1] if len(sys.argv) > 1 else "Affiliate Links Master"
    creds_file = sys.argv[2] if len(sys.argv) > 2 else "google-credentials.json"

    sync_links_from_sheet(creds_file, sheet_name)
