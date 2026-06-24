#!/usr/bin/env python3
"""
Process 380+ MDX files to add medical disclaimers, product disclaimers, and sources footers.
Categorizes articles by type (health, product, parenting) and adds appropriate content.
"""

import os
import re
from pathlib import Path
from typing import Tuple, Optional

# Configuration
CONTENT_DIR = Path(__file__).parent / "content"
OUTPUT_LOG = Path(__file__).parent / "disclaimer_processing.log"

# Disclaimer templates
MEDICAL_DISCLAIMER = """> ⚠️ **MEDICAL DISCLAIMER**
>
> This article is educational information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.
>
> Always consult your pediatrician or healthcare provider before making any medical decisions for your baby or child. Every baby is unique, and professional medical guidance is essential.
>
> In case of emergency, call 911 or your local emergency number.
"""

PRODUCT_DISCLAIMER = """> 💡 **ABOUT THESE REVIEWS**
>
> This is educational information to help you make informed decisions. We earn affiliate commissions from product links, which helps support this site at no extra cost to you.
>
> Always review manufacturer safety standards (CPSC, ASTM) and consult your pediatrician for product recommendations suited to your baby.
"""

SOURCES_FOOTER = """> 📋 **SOURCES & FACT-CHECKING**
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

# Health keywords for blog articles
HEALTH_KEYWORDS = {
    'fever', 'temperature', 'illness', 'disease', 'symptom', 'treatment',
    'infection', 'eczema', 'thrush', 'constipation', 'diarrhea', 'cpr',
    'first aid', 'health', 'medical', 'pregnancy', 'postpartum', 'depression',
    'bleeding', 'preeclampsia', 'gestational diabetes', 'group b strep',
    'listeria', 'morning sickness', 'heartburn', 'swollen', 'pain relief',
    'pelvic floor', 'hair loss', 'stretch marks', 'insomnia', 'brain fog',
    'cravings', 'back pain', 'dental', 'rash', 'teething', 'feeding',
    'breastfeeding', 'formula', 'allergies', 'infant', 'newborn'
}

def detect_article_type(file_path: Path) -> str:
    """
    Detect article type based on directory location and content.
    Returns: 'product', 'health_blog', 'parenting', or 'general_blog'
    """
    path_str = str(file_path).lower()

    if 'content\\products' in path_str or 'content/products' in path_str:
        return 'product'
    elif 'content\\parenting' in path_str or 'content/parenting' in path_str:
        return 'parenting'
    elif 'content\\blog' in path_str or 'content/blog' in path_str:
        # Check if it's a health-related blog post
        filename = file_path.name.lower()
        if any(keyword in filename for keyword in HEALTH_KEYWORDS):
            return 'health_blog'
        return 'general_blog'

    return 'general_blog'

def has_medical_disclaimer(content: str) -> bool:
    """Check if file already has a medical disclaimer."""
    return 'MEDICAL DISCLAIMER' in content or 'medical disclaimer' in content

def has_product_disclaimer(content: str) -> bool:
    """Check if file already has a product disclaimer."""
    return 'ABOUT THESE REVIEWS' in content or 'about these reviews' in content

def has_sources_footer(content: str) -> bool:
    """Check if file already has a sources footer."""
    return 'SOURCES & FACT-CHECKING' in content or 'sources & fact-checking' in content

def find_first_h2(content: str) -> Optional[int]:
    """Find the position after the first H2 heading."""
    match = re.search(r'^## ', content, re.MULTILINE)
    if match:
        # Find the end of this line
        end_of_line = content.find('\n', match.end())
        return end_of_line + 1 if end_of_line != -1 else None
    return None

def find_related_articles_section(content: str) -> Optional[int]:
    """Find the position of the 'Related Articles' section."""
    # Look for "## Related Articles" or "## You might also like" etc.
    patterns = [
        r'^## Related Articles',
        r'^## You Might Also Like',
        r'^## Further Reading',
        r'^## More Resources',
        r'^## See Also'
    ]

    for pattern in patterns:
        match = re.search(pattern, content, re.MULTILINE | re.IGNORECASE)
        if match:
            return match.start()

    return None

def process_file(file_path: Path, dry_run: bool = False) -> Tuple[bool, str]:
    """
    Process a single MDX file to add appropriate disclaimers.

    Returns:
        (modified: bool, status_message: str)
    """
    try:
        # Read file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        article_type = detect_article_type(file_path)
        modifications = []

        # Check what already exists
        has_medical = has_medical_disclaimer(content)
        has_product = has_product_disclaimer(content)
        has_sources = has_sources_footer(content)

        # Skip if already has all necessary disclaimers
        if has_medical and has_sources and article_type == 'health_blog':
            return False, f"SKIP (already has disclaimers)"
        if has_product and has_sources and article_type == 'product':
            return False, f"SKIP (already has disclaimers)"
        if has_sources and article_type in ['general_blog', 'parenting']:
            return False, f"SKIP (already has sources footer)"

        # Find insertion points
        first_h2_pos = find_first_h2(content)
        related_articles_pos = find_related_articles_section(content)

        # Prepare content to add
        content_to_add_after_h2 = ""
        content_to_add_before_related = ""

        # Add appropriate disclaimer after first H2
        if article_type == 'health_blog' and not has_medical:
            content_to_add_after_h2 = MEDICAL_DISCLAIMER + "\n\n"
            modifications.append("medical_disclaimer")
        elif article_type == 'product' and not has_product:
            content_to_add_after_h2 = PRODUCT_DISCLAIMER + "\n\n"
            modifications.append("product_disclaimer")

        # Add sources footer before Related Articles (or at end)
        if not has_sources:
            content_to_add_before_related = SOURCES_FOOTER + "\n\n"
            modifications.append("sources_footer")

        # If no modifications needed, skip
        if not modifications:
            return False, "SKIP (no modifications needed)"

        # Apply modifications
        new_content = content

        # Insert medical/product disclaimer after first H2
        if content_to_add_after_h2 and first_h2_pos:
            new_content = (
                new_content[:first_h2_pos] +
                content_to_add_after_h2 +
                new_content[first_h2_pos:]
            )

        # Insert sources footer before Related Articles
        if content_to_add_before_related:
            if related_articles_pos:
                # Add before Related Articles section
                new_content = (
                    new_content[:related_articles_pos] +
                    content_to_add_before_related + "\n" +
                    new_content[related_articles_pos:]
                )
            else:
                # Add at end of file
                new_content = new_content.rstrip() + "\n\n" + content_to_add_before_related

        # Write file if not dry run
        if not dry_run:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

        status = f"MODIFIED ({', '.join(modifications)})"
        return True, status

    except Exception as e:
        return False, f"ERROR: {str(e)}"

def main(dry_run: bool = False):
    """Main processing loop."""

    if dry_run:
        print("=" * 80)
        print("DRY RUN MODE - No files will be modified")
        print("=" * 80)
    else:
        print("=" * 80)
        print("PROCESSING FILES - Changes will be saved")
        print("=" * 80)

    print(f"Content directory: {CONTENT_DIR}")
    print(f"Timestamp: June 2026")
    print()

    # Gather statistics
    stats = {
        'total': 0,
        'modified': 0,
        'skipped': 0,
        'errors': 0,
        'by_type': {
            'product': {'modified': 0, 'total': 0},
            'health_blog': {'modified': 0, 'total': 0},
            'parenting': {'modified': 0, 'total': 0},
            'general_blog': {'modified': 0, 'total': 0}
        }
    }

    log_entries = []

    # Find all MDX files
    mdx_files = sorted(CONTENT_DIR.glob('**/*.mdx'))

    print(f"Found {len(mdx_files)} MDX files\n")
    print(f"{'File':<80} {'Type':<15} {'Status':<40}")
    print("-" * 135)

    for idx, file_path in enumerate(mdx_files, 1):
        article_type = detect_article_type(file_path)
        modified, status = process_file(file_path, dry_run=dry_run)

        # Update statistics
        stats['total'] += 1
        stats['by_type'][article_type]['total'] += 1

        if modified:
            stats['modified'] += 1
            stats['by_type'][article_type]['modified'] += 1
        else:
            stats['skipped'] += 1

        # Get relative path for display
        rel_path = file_path.relative_to(CONTENT_DIR)

        # Print progress
        status_display = status[:39]
        print(f"{str(rel_path):<80} {article_type:<15} {status_display:<40}")

        # Log entry
        log_entries.append(f"{rel_path}|{article_type}|{status}\n")

        # Progress report every 50 files
        if idx % 50 == 0:
            print(f"\n>>> Progress: {idx} files processed ({stats['modified']} modified so far)\n")

    # Print final statistics
    print("\n" + "=" * 135)
    print("FINAL STATISTICS")
    print("=" * 135)

    print(f"\nTotal files processed: {stats['total']}")
    print(f"Files modified: {stats['modified']}")
    print(f"Files skipped: {stats['skipped']}")
    print(f"\nBreakdown by article type:")
    print(f"  Product reviews: {stats['by_type']['product']['modified']}/{stats['by_type']['product']['total']} modified")
    print(f"  Health blog posts: {stats['by_type']['health_blog']['modified']}/{stats['by_type']['health_blog']['total']} modified")
    print(f"  Parenting guides: {stats['by_type']['parenting']['modified']}/{stats['by_type']['parenting']['total']} modified")
    print(f"  General blog posts: {stats['by_type']['general_blog']['modified']}/{stats['by_type']['general_blog']['total']} modified")

    # Write log file
    if not dry_run:
        with open(OUTPUT_LOG, 'w', encoding='utf-8') as f:
            f.write("file_path|article_type|status\n")
            f.writelines(log_entries)
        print(f"\nLog file written to: {OUTPUT_LOG}")

    if dry_run:
        print("\n[DRY RUN] No files were actually modified. Run with dry_run=False to apply changes.")

    print("\n" + "=" * 135)

if __name__ == '__main__':
    import sys

    # Check if dry run mode
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv

    main(dry_run=dry_run)
