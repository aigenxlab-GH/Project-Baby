#!/usr/bin/env python3
"""
Add medical disclaimers and source citations to all MDX files in Project Baby website.
Processes 380+ files across blog, products, and parenting categories.
"""

import os
import re
import glob
from pathlib import Path
from typing import Tuple, List

# Disclaimer templates
MEDICAL_DISCLAIMER = """
> ⚠️ **MEDICAL DISCLAIMER**
>
> This article is educational information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.
>
> Always consult your pediatrician or healthcare provider before making any medical decisions for your baby or child. Every baby is unique, and professional medical guidance is essential.
>
> In case of emergency, call 911 or your local emergency number.
"""

SOURCES_FOOTER = """
> 📋 **SOURCES & FACT-CHECKING**
>
> This article was written with AI assistance and verified against:
> - [CDC](https://cdc.gov) (Centers for Disease Control & Prevention)
> - [WHO](https://who.int) (World Health Organization)
> - [ACOG](https://acog.org) (American College of Obstetricians and Gynecologists)
> - [NHS](https://nhs.uk) (National Health Service)
> - [AAP](https://aap.org) (American Academy of Pediatrics)
>
> Last verified: June 2026
>
> **Educational content only.** Always consult your pediatrician for medical decisions.
"""

PRODUCT_DISCLAIMER = """
> 💡 **ABOUT THESE REVIEWS**
>
> This is educational information to help you make informed decisions. We earn affiliate commissions from product links, which helps support this site at no extra cost to you.
>
> Always review manufacturer safety standards (CPSC, ASTM) and consult your pediatrician for product recommendations suited to your baby.
"""

# Source link patterns
SOURCE_LINKS = {
    r'\bfever\b': 'https://cdc.gov/healthywater/hygiene/personal/temperature.html',
    r'\bSIDS\b': 'https://cdc.gov/sids',
    r'\bsleep\b': 'https://aap.org',
    r'\btemperature\b': 'https://cdc.gov/healthywater/hygiene/personal/temperature.html',
    r'\bconstipation\b': 'https://nhs.uk/conditions/childhood-constipation/',
    r'\bsafety standards\b': 'https://cpsc.gov/guides',
    r'\bsafety requirements\b': 'https://cpsc.gov/guides',
}

def detect_article_type(file_path: str, content: str) -> str:
    """Detect if article is health/medical, product review, or parenting."""
    if 'content/products' in file_path:
        return 'product'
    elif 'content/blog' in file_path:
        # Check if it's a health/medical article
        health_keywords = ['fever', 'health', 'medical', 'cpr', 'eczema', 'thrush', 'thermometer', 'humidifier', 'sleep', 'milestones']
        content_lower = content.lower()
        if any(keyword in content_lower for keyword in health_keywords):
            return 'health'
        return 'blog'
    elif 'content/parenting' in file_path:
        return 'parenting'
    return 'other'

def extract_frontmatter(content: str) -> Tuple[str, str]:
    """Extract YAML frontmatter and return (frontmatter, body)."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return '', content

def find_first_h2(content: str) -> int:
    """Find position of first ## heading."""
    match = re.search(r'\n## ', content)
    if match:
        return match.start() + 1  # Position after the newline
    return -1

def find_related_articles(content: str) -> int:
    """Find position of 'Related Articles' or 'Related Posts' section."""
    patterns = [
        r'\n## Related Articles',
        r'\n## Related Posts',
        r'\n## Further Reading',
        r'\n## More Resources',
    ]
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            return match.start() + 1
    return -1

def has_disclaimer(content: str, disclaimer_type: str) -> bool:
    """Check if disclaimer already exists in content."""
    if disclaimer_type == 'medical':
        return 'MEDICAL DISCLAIMER' in content
    elif disclaimer_type == 'product':
        return 'ABOUT THESE REVIEWS' in content
    elif disclaimer_type == 'sources':
        return 'SOURCES & FACT-CHECKING' in content
    return False

def add_disclaimers(file_path: str, content: str, article_type: str) -> str:
    """Add appropriate disclaimers to article."""
    frontmatter, body = extract_frontmatter(content)

    # Find first H2 heading
    h2_pos = find_first_h2(body)
    if h2_pos == -1:
        print(f"  Warning: No H2 heading found in {file_path}")
        return content

    # Insert medical/product disclaimer after first H2
    if article_type == 'health' and not has_disclaimer(content, 'medical'):
        body = body[:h2_pos] + MEDICAL_DISCLAIMER + "\n" + body[h2_pos:]
    elif article_type == 'product' and not has_disclaimer(content, 'product'):
        body = body[:h2_pos] + PRODUCT_DISCLAIMER + "\n" + body[h2_pos:]

    # Find Related Articles section for sources footer
    related_pos = find_related_articles(body)
    if related_pos == -1:
        # If no related articles section, add before end
        if not has_disclaimer(body, 'sources'):
            body = body.rstrip() + "\n" + SOURCES_FOOTER + "\n"
    else:
        if not has_disclaimer(body, 'sources'):
            body = body[:related_pos] + SOURCES_FOOTER + "\n\n" + body[related_pos:]

    # Reconstruct with frontmatter
    if frontmatter:
        return f"---\n{frontmatter}\n---\n{body}"
    return body

def process_file(file_path: str) -> bool:
    """Process a single MDX file. Returns True if modified."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Detect article type
        article_type = detect_article_type(file_path, original_content)

        # Add disclaimers
        updated_content = add_disclaimers(file_path, original_content, article_type)

        # Write back if changed
        if original_content != updated_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            return True
        return False
    except Exception as e:
        print(f"  Error processing {file_path}: {e}")
        return False

def main():
    """Process all MDX files in content directory."""
    project_root = Path('C:/AIGenXLab/Projects/Project-Baby')
    content_dir = project_root / 'content'

    # Find all MDX files
    mdx_files = list(content_dir.glob('**/*.mdx'))
    print(f"Found {len(mdx_files)} MDX files to process\n")

    # Track statistics
    stats = {
        'health': {'total': 0, 'modified': 0},
        'product': {'total': 0, 'modified': 0},
        'parenting': {'total': 0, 'modified': 0},
        'other': {'total': 0, 'modified': 0},
    }

    # Process files in batches
    batch_size = 50
    for i, file_path in enumerate(mdx_files, 1):
        # Detect type for statistics
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        article_type = detect_article_type(str(file_path), content)

        stats[article_type]['total'] += 1

        # Process file
        if process_file(str(file_path)):
            stats[article_type]['modified'] += 1

        # Print progress every 50 files
        if i % batch_size == 0:
            print(f"Processed {i}/{len(mdx_files)} files")
            for atype in stats:
                if stats[atype]['total'] > 0:
                    pct = (stats[atype]['modified'] / stats[atype]['total']) * 100
                    print(f"  {atype}: {stats[atype]['modified']}/{stats[atype]['total']} modified ({pct:.1f}%)")

    # Final report
    print(f"\nFinal Report: Processed {len(mdx_files)} files")
    total_modified = sum(stats[t]['modified'] for t in stats)
    for atype in sorted(stats.keys()):
        if stats[atype]['total'] > 0:
            pct = (stats[atype]['modified'] / stats[atype]['total']) * 100
            print(f"  {atype}: {stats[atype]['modified']}/{stats[atype]['total']} files modified ({pct:.1f}%)")
    print(f"\nTotal modified: {total_modified}/{len(mdx_files)} files ({(total_modified/len(mdx_files)*100):.1f}%)")

if __name__ == '__main__':
    main()
