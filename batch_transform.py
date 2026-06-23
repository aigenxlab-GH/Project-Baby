#!/usr/bin/env python3
"""
Batch transform 180 MDX blog articles to maternal health writer voice.
Handles frontmatter updates and banned word removal systematically.
"""
import os
import re
from pathlib import Path
import yaml
from datetime import datetime

# Banned words to remove or replace
BANNED_WORDS = {
    r'\bcrucial\b': 'important',
    r'\bmoreover\b': 'also',
    r'\bdelve\b': 'explore',
    r'\btestament\b': 'sign',
    r'\btapestry\b': 'mix',
    r'\bbeacon\b': 'light',
    r'\bparamount\b': 'top priority',
    r'\bnavigate\b': 'manage',
    r'\blook no further\b': 'we have you covered',
    r'\bin today\'s world\b': 'today',
    r'\bcompounded\b': 'made worse',
    r'\benormous\b': 'large',
    r'\bsignificant\b': 'notable',
    r'\bwarrant\b': 'deserve',
    r'\binherently\b': 'naturally',
    r'\bfurthermore\b': 'also',
    r'\bin conclusion\b': 'in short',
    r'\bit is important to note\b': 'remember',
    r'\bcomprehensive\b': 'thorough',
    r'\btremendous\b': 'amazing',
    r'\bastonishing\b': 'surprising',
    r'\bessential\b': 'key',
    r'\bconsistent\b': 'steady',
    r'\bfascinated\b': 'interested',
    r'\bextraordinary\b': 'remarkable',
    r'\brealm\b': 'area',
    r'\bweave\b': 'blend',
    r'\blabyrinth\b': 'maze',
    r'\bsymphony\b': 'harmony',
    r'\bdance\b': 'movement',
    r'\butilize\b': 'use',
    r'\bcompelling\b': 'convincing',
    r'\bseamlessly\b': 'smoothly',
    r'\bultimate guide\b': 'complete guide',
    r'\bcatalyst\b': 'trigger',
    r'\bdynamic\b': 'active',
    r'\bimplement\b': 'put into practice',
    r'\boptimize\b': 'improve',
    r'\bvital role\b': 'important role',
    r'\bundeniably\b': 'clearly',
    r'\bconversely\b': 'on the other hand',
    r'\bparadoxically\b': 'surprisingly',
    r'\bintriguingly\b': 'interestingly',
    r'\bcaptivating\b': 'engaging',
    r'\bdelineate\b': 'outline',
    r'\bevidently\b': 'clearly',
    r'\bexceptionally\b': 'very',
    r'\bfirst and foremost\b': 'first',
    r'\bfoster\b': 'encourage',
    r'\bfacilitate\b': 'make easier',
    r'\bfast-forward\b': 'jump ahead',
    r'\bintense\b': 'strong',
    r'\bjuxtapose\b': 'contrast',
    r'\bmeasurably\b': 'noticeably',
    r'\bmotivating\b': 'encouraging',
    r'\bpersistent\b': 'ongoing',
    r'\bpresenting\b': 'showing',
    r'\bprevalent\b': 'common',
    r'\bretrospect\b': 'looking back',
    r'\btemporal\b': 'time-based',
    r'\bto summarize\b': 'in short',
    r'\bnot only\b': 'both',
}

def remove_banned_words(text):
    """Remove or replace banned words from text."""
    for banned, replacement in BANNED_WORDS.items():
        text = re.sub(banned, replacement, text, flags=re.IGNORECASE)
    return text

def split_frontmatter(content):
    """Split MDX content into frontmatter and body."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def update_frontmatter(fm_text):
    """Update frontmatter YAML text."""
    lines = fm_text.split('\n')
    updated_lines = []
    skip_next = False

    for i, line in enumerate(lines):
        # Update author if present
        if line.startswith('author:'):
            updated_lines.append("author: PregnancySprout Editorial Team")
        # Update updatedAt
        elif line.startswith('updatedAt:'):
            updated_lines.append("updatedAt: '2026-06-23'")
        # Keep everything else
        else:
            updated_lines.append(line)

    return '\n'.join(updated_lines)

def process_mdx_file(file_path):
    """Process a single MDX file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = split_frontmatter(content)

        if frontmatter is None:
            return False

        # Update frontmatter
        updated_fm = update_frontmatter(frontmatter)

        # Remove banned words from body
        updated_body = remove_banned_words(body)

        # Reconstruct content
        new_content = f"---\n{updated_fm}\n---\n{updated_body}"

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True

    except Exception as e:
        print(f"ERROR in {file_path}: {str(e)}")
        return False

def main():
    """Main batch processing loop."""
    blog_dir = Path(r'C:\AIGenXLab\Projects\Project-Baby\content\blog')

    if not blog_dir.exists():
        print(f"ERROR: Directory not found: {blog_dir}")
        return

    files = sorted(blog_dir.glob('*.mdx'))
    total = len(files)

    print(f"Starting batch transformation of {total} blog articles...")
    print("=" * 60)

    successful = 0
    failed = 0
    failed_files = []

    for idx, file_path in enumerate(files, 1):
        if process_mdx_file(str(file_path)):
            successful += 1
        else:
            failed += 1
            failed_files.append(file_path.name)

        # Progress report every 20 files
        if idx % 20 == 0:
            print(f"Progress: {idx}/{total} files processed ({successful} OK, {failed} failed)")

    print("\n" + "=" * 60)
    print(f"BATCH TRANSFORMATION COMPLETE")
    print(f"Total files processed: {total}")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")

    if failed_files:
        print(f"\nFailed files:")
        for fname in failed_files:
            print(f"  - {fname}")

if __name__ == '__main__':
    main()
