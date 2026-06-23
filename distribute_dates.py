#!/usr/bin/env python3
"""
Distribution script for publication dates across MDX files
Blog: 180 files, Apr 20 - Jun 20 (60 days)
Products: 200 files, Apr 15 - Jun 15 (60 days)
"""

import os
import re
from datetime import datetime, timedelta
import random

blog_dir = r"C:\AIGenXLab\Projects\Project-Baby\content\blog"
products_dir = r"C:\AIGenXLab\Projects\Project-Baby\content\products"
updated_at_date = "2026-06-23"

def generate_dates(start_date_str, distribution):
    """Generate dates based on distribution buckets"""
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    dates = []

    for bucket in distribution:
        days = bucket['days']
        count = bucket['count']

        if not days:
            continue

        min_day = min(days)
        max_day = max(days)
        day_span = max_day - min_day + 1

        for i in range(count):
            day_offset = min_day + int((i % day_span) * (day_span / count))
            date = start_date + timedelta(days=day_offset)
            dates.append(date.strftime("%Y-%m-%d"))

    # Shuffle for natural appearance
    random.shuffle(dates)
    return dates

# Blog distribution
blog_distribution = [
    {'days': list(range(14)), 'count': 20},       # Days 0-13: 20 files
    {'days': list(range(14, 28)), 'count': 30},  # Days 14-27: 30 files
    {'days': list(range(28, 42)), 'count': 45},  # Days 28-41: 45 files
    {'days': list(range(42, 56)), 'count': 50},  # Days 42-55: 50 files
    {'days': list(range(56, 60)), 'count': 35},  # Days 56-59: 35 files
]

# Product distribution
product_distribution = [
    {'days': list(range(14)), 'count': 22},       # Days 0-13: 22 files
    {'days': list(range(14, 28)), 'count': 33},  # Days 14-27: 33 files
    {'days': list(range(28, 42)), 'count': 50},  # Days 28-41: 50 files
    {'days': list(range(42, 56)), 'count': 55},  # Days 42-55: 55 files
    {'days': list(range(56, 60)), 'count': 40},  # Days 56-59: 40 files
]

blog_dates = generate_dates("2026-04-20", blog_distribution)
product_dates = generate_dates("2026-04-15", product_distribution)

print(f"Blog dates prepared: {len(blog_dates)}")
print(f"Product dates prepared: {len(product_dates)}")

# Process blog files
print("\nProcessing blog files...")
blog_files = []
for root, dirs, files in os.walk(blog_dir):
    for file in files:
        if file.endswith(".mdx"):
            blog_files.append(os.path.join(root, file))

blog_files.sort()
blog_updated = 0

for idx, file_path in enumerate(blog_files):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    publish_date = blog_dates[idx] if idx < len(blog_dates) else blog_dates[-1]

    # Replace publishedAt date
    new_content = re.sub(
        r"publishedAt:\s*['\"]?\d{4}-\d{2}-\d{2}['\"]?",
        f"publishedAt: '{publish_date}'",
        content
    )

    # Replace updatedAt date
    new_content = re.sub(
        r"updatedAt:\s*['\"]?\d{4}-\d{2}-\d{2}['\"]?",
        f"updatedAt: '{updated_at_date}'",
        new_content
    )

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        blog_updated += 1

    if (idx + 1) % 20 == 0:
        print(f"  Processed {idx + 1} blog files...")

print(f"Blog files processed: {len(blog_files)}, updated: {blog_updated}")

# Process product files
print("\nProcessing product files...")
product_files = []
for root, dirs, files in os.walk(products_dir):
    for file in files:
        if file.endswith(".mdx"):
            product_files.append(os.path.join(root, file))

product_files.sort()
product_updated = 0

for idx, file_path in enumerate(product_files):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    publish_date = product_dates[idx] if idx < len(product_dates) else product_dates[-1]

    # Replace publishedAt date
    new_content = re.sub(
        r"publishedAt:\s*['\"]?\d{4}-\d{2}-\d{2}['\"]?",
        f"publishedAt: '{publish_date}'",
        content
    )

    # Replace updatedAt date
    new_content = re.sub(
        r"updatedAt:\s*['\"]?\d{4}-\d{2}-\d{2}['\"]?",
        f"updatedAt: '{updated_at_date}'",
        new_content
    )

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        product_updated += 1

    if (idx + 1) % 30 == 0:
        print(f"  Processed {idx + 1} product files...")

print(f"Product files processed: {len(product_files)}, updated: {product_updated}")

# Summary
print("\n=== SUMMARY ===")
print(f"Blog files: {len(blog_files)} processed, {blog_updated} updated")
print(f"Product files: {len(product_files)} processed, {product_updated} updated")
print(f"Total: {len(blog_files) + len(product_files)} files processed")
print(f"Date ranges: Blog Apr 20-Jun 20, Products Apr 15-Jun 15")
print(f"Updated At: All files set to {updated_at_date}")
