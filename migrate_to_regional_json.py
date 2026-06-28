#!/usr/bin/env python3
"""
Migrate affiliate-links.json from old format (single tracking ID)
to new format (7 regions with regional tracking IDs)
"""

import json
import re

def migrate_json():
    # Read old JSON
    with open('affiliate-links.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Define regional metadata
    regions = {
        "US": {
            "trackingId": "pregnancysp0a-20",
            "domain": "amazon.com",
            "currency": "USD"
        },
        "UK": {
            "trackingId": "pregnancysp0a-21",
            "domain": "amazon.co.uk",
            "currency": "GBP"
        },
        "CA": {
            "trackingId": "pregnancysp07-20",
            "domain": "amazon.ca",
            "currency": "CAD"
        },
        "DE": {
            "trackingId": "pregnancyspde-21",
            "domain": "amazon.de",
            "currency": "EUR"
        },
        "FR": {
            "trackingId": "pregnancyspfr-21",
            "domain": "amazon.fr",
            "currency": "EUR"
        },
        "IT": {
            "trackingId": "pregnancyspit-21",
            "domain": "amazon.it",
            "currency": "EUR"
        },
        "ES": {
            "trackingId": "pregnancyspes-21",
            "domain": "amazon.es",
            "currency": "EUR"
        }
    }

    # Update metadata
    data["metadata"]["version"] = "3.0"
    data["metadata"]["lastUpdated"] = "2026-06-26"
    data["metadata"]["regions"] = regions
    if "affiliateTag" in data["metadata"]:
        del data["metadata"]["affiliateTag"]
    if "instructions" in data["metadata"]:
        data["metadata"]["instructions"] = "COMPLETE affiliate inventory with 7-region support. Products have availability per region. Use getAffiliateLink(slug, region) helper to generate links."

    # Migrate all products
    product_count = 0
    for category_name, products in data["categories"].items():
        for product in products:
            # Extract ASIN from URL or existing asin field
            asin = product.get("asin")

            # Create availability object for all regions (same ASIN for all)
            availability = {}
            for region_code in regions.keys():
                availability[region_code] = {
                    "asin": asin,
                    "available": product.get("status") == "active"
                }

            # Update product structure
            product["availability"] = availability

            # Remove old fields
            if "url" in product:
                del product["url"]
            if "asin" in product:
                del product["asin"]
            if "page" in product:
                del product["page"]

            product_count += 1

    print(f"[OK] Migrated {product_count} products to regional format")
    print(f"[OK] Added 7 regions with tracking IDs")

    # Write new JSON
    with open('affiliate-links.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"[OK] Updated affiliate-links.json (version 3.0)")
    print("\nRegional Tracking IDs:")
    for region_code, config in regions.items():
        print(f"  {region_code}: {config['trackingId']} ({config['domain']})")

if __name__ == '__main__':
    migrate_json()
