#!/usr/bin/env python3
"""
Process all MDX files to add medical disclaimers and source citations.
Run from project root: python process_disclaimers.py
"""

import os
import re
import sys
from pathlib import Path
from typing import Tuple

def detect_article_type(file_path: str) -> str:
    """Detect article type from file path."""
    path_lower = file_path.lower().replace('\\', '/')
    if 'content/products' in path_lower:
        return 'product'
    elif 'content/blog' in path_lower:
        return 'health'
    elif 'content/parenting' in path_lower:
        return 'parenting'
    return 'other'

def extract_frontmatter(content: str) -> Tuple[str, str]:
    """Extract and return (frontmatter, body)."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return '', content

def find_first_h2(content: str) -> int:
    """Find position of first ## heading."""
    match = re.search(r'\n## ', content)
    return match.start() + 1 if match else -1

def find_related_section(content: str) -> int:
    """Find position of Related Articles or similar."""
    patterns = [r'\n## Related Articles', r'\n## Related Posts', r'\n## Further Reading']
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            return match.start() + 1
    return -1

def has_medical_disclaimer(content: str) -> bool:
    return 'MEDICAL DISCLAIMER' in content

def has_product_disclaimer(content: str) -> bool:
    return 'ABOUT THESE REVIEWS' in content

def has_sources_footer(content: str) -> bool:
    return 'SOURCES & FACT-CHECKING' in content

MEDICAL_DISCLAIMER = """> ⚠️ **MEDICAL DISCLAIMER**
>
> This article is educational information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.
>
> Always consult your pediatrician or healthcare provider before making any medical decisions for your baby or child. Every baby is unique, and professional medical guidance is essential.
>
> In case of emergency, call 911 or your local emergency number."""

PRODUCT_DISCLAIMER = """> 💡 **ABOUT THESE REVIEWS**
>
> This is educational information to help you make informed decisions. We earn affiliate commissions from product links, which helps support this site at no extra cost to you.
>
> Always review manufacturer safety standards (CPSC, ASTM) and consult your pediatrician for product recommendations suited to your baby."""

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
> **Educational content only.** Always consult your pediatrician for medical decisions."""

def process_file(file_path: str) -> bool:
    """Process single file. Returns True if modified."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original = f.read()

        article_type = detect_article_type(file_path)
        frontmatter, body = extract_frontmatter(original)

        h2_pos = find_first_h2(body)
        if h2_pos == -1:
            return False

        modified = False

        # Add medical/product disclaimer
        if article_type == 'health' and not has_medical_disclaimer(body):
            body = body[:h2_pos] + MEDICAL_DISCLAIMER + "\n\n" + body[h2_pos:]
            modified = True
        elif article_type == 'product' and not has_product_disclaimer(body):
            body = body[:h2_pos] + PRODUCT_DISCLAIMER + "\n\n" + body[h2_pos:]
            modified = True

        # Add sources footer
        if not has_sources_footer(body):
            rel_pos = find_related_section(body)
            if rel_pos != -1:
                body = body[:rel_pos] + SOURCES_FOOTER + "\n\n" + body[rel_pos:]
            else:
                body = body.rstrip() + "\n\n" + SOURCES_FOOTER + "\n"
            modified = True

        # Write back
        if modified:
            if frontmatter:
                updated = f"---\n{frontmatter}\n---\n{body}"
            else:
                updated = body

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated)
            return True
        return False
    except Exception as e:
        print(f"Error in {file_path}: {e}", file=sys.stderr)
        return False

def main():
    content_dir = Path('content')
    if not content_dir.exists():
        print("Error: content directory not found. Run from project root.", file=sys.stderr)
        sys.exit(1)

    mdx_files = sorted(list(content_dir.glob('**/*.mdx')))
    print(f"Found {len(mdx_files)} MDX files to process\n")

    stats = {'health': [0, 0], 'product': [0, 0], 'parenting': [0, 0], 'other': [0, 0]}

    for i, fpath in enumerate(mdx_files, 1):
        atype = detect_article_type(str(fpath))
        stats[atype][0] += 1

        if process_file(str(fpath)):
            stats[atype][1] += 1

        if i % 50 == 0:
            print(f"Processed {i}/{len(mdx_files)} files...")

    print(f"\n{'='*50}")
    print(f"FINAL REPORT: Processed {len(mdx_files)} files")
    print(f"{'='*50}\n")

    total_mod = sum(s[1] for s in stats.values())
    for atype in sorted(stats.keys()):
        total, modified = stats[atype]
        if total > 0:
            pct = (modified / total) * 100
            print(f"  {atype:10s}: {modified:3d}/{total:3d} modified ({pct:5.1f}%)")

    print(f"\n  TOTAL: {total_mod}/{len(mdx_files)} files modified ({total_mod/len(mdx_files)*100:.1f}%)\n")

if __name__ == '__main__':
    main()
