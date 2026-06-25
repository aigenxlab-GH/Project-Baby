"""
Diagnose why all links are broken
Test: with affiliate tag vs without tag
"""

import requests
import time

test_asins = [
    "B07N8NCDZD",  # Evenflo ExerSaucer (you showed this is broken)
    "B07P7XGQRT",  # Baby Einstein Activity Jumper
    "B00BKJOM0U",  # Angelcare Bath
    "B00CPC2A36",  # Dr. Brown's Bottle
]

def test_both_formats(asin):
    """Test with and without affiliate tag"""

    # Without tag
    url_no_tag = f"https://www.amazon.com/dp/{asin}"

    # With tag
    url_with_tag = f"https://www.amazon.com/dp/{asin}?tag=pregnancysp0a-20"

    print(f"\nTesting {asin}:")
    print(f"  No tag:  {url_no_tag}")

    try:
        resp = requests.head(url_no_tag, timeout=5, allow_redirects=True)
        print(f"    Status: {resp.status_code} {'[OK]' if resp.status_code < 400 else '[BROKEN]'}")
    except Exception as e:
        print(f"    Error: {e}")

    print(f"  With tag: {url_with_tag}")
    try:
        resp = requests.head(url_with_tag, timeout=5, allow_redirects=True)
        print(f"    Status: {resp.status_code} {'[OK]' if resp.status_code < 400 else '[BROKEN]'}")
    except Exception as e:
        print(f"    Error: {e}")

    time.sleep(1)

print("\n" + "="*60)
print("DIAGNOSING BROKEN LINKS")
print("="*60)

for asin in test_asins:
    test_both_formats(asin)

print("\n" + "="*60)
