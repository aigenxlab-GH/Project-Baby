#!/usr/bin/env python3
import os
import re
from pathlib import Path
from datetime import datetime

# Banned words dictionary - maps banned words to better alternatives
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
    r'\bnot only\.\.\.but also\b': 'both',
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
    r'\bunderstandably\b': 'understandably',
    r'\bconversely\b': 'on the other hand',
    r'\bparadoxically\b': 'surprisingly',
    r'\bintriguingly\b': 'interestingly',
    r'\bcaptivating\b': 'engaging',
    r'\bdelineate\b': 'outline',
    r'\bevidently\b': 'clearly',
    r'\bexceptionally\b': 'exceptionally',
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
}

def remove_banned_words(text):
    """Remove or replace banned words from text."""
    for banned, replacement in BANNED_WORDS.items():
        text = re.sub(banned, replacement, text, flags=re.IGNORECASE)
    return text

def extract_frontmatter(content):
    """Extract YAML frontmatter from MDX content."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def update_description(description, title):
    """Create a punchy, benefit-focused description."""
    if not description:
        return "Discover practical guidance for this important aspect of pregnancy and parenting. Get expert advice and evidence-based strategies."

    # Clean up existing description
    desc = description.replace('Learn ', '').replace('Discover ', '')
    desc = re.sub(r'Practical strategies.*', '', desc)
    desc = re.sub(r'and answers to common parent questions\.', '', desc)

    # Keep first 1-2 sentences max
    sentences = desc.strip().split('. ')
    if sentences:
        desc = sentences[0]
        if len(sentences) > 1:
            desc += '. ' + sentences[1]

    # Ensure it starts with benefit language
    if not any(desc.startswith(x) for x in ['Discover', 'Learn', 'Get', 'Find', 'Explore']):
        desc = 'Discover ' + desc[0].lower() + desc[1:]

    return desc + '.'

def process_file(file_path):
    """Process a single MDX file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = extract_frontmatter(content)
        if not frontmatter:
            print(f"⚠ No frontmatter found: {file_path}")
            return False

        # Parse frontmatter
        lines = frontmatter.split('\n')
        fm_dict = {}
        current_key = None
        current_value = []

        for line in lines:
            if line and not line.startswith(' '):
                if current_key:
                    fm_dict[current_key] = '\n'.join(current_value).strip()
                if ':' in line:
                    current_key, value = line.split(':', 1)
                    current_key = current_key.strip()
                    current_value = [value.strip()]
                else:
                    current_key = None
                    current_value = []
            elif current_key and line.startswith(' '):
                current_value.append(line)

        if current_key:
            fm_dict[current_key] = '\n'.join(current_value).strip()

        # Get title for description
        title = fm_dict.get('title', '').strip("'\"")

        # Update critical fields
        fm_dict['author'] = 'PregnancySprout Editorial Team'
        fm_dict['updatedAt'] = "'2026-06-23'"

        # Update description
        old_desc = fm_dict.get('description', '')
        fm_dict['description'] = '|' if not old_desc else fm_dict['description']

        # Get frontmatter image
        old_image = fm_dict.get('image', '')
        if old_image:
            fm_dict['image'] = old_image.strip("'\"")

        # Update imageAlt if present
        if 'imageAlt' in fm_dict:
            fm_dict['imageAlt'] = '|' + fm_dict.get('imageAlt', '').strip()

        # Remove banned words from body
        body = remove_banned_words(body)

        # Reconstruct frontmatter
        new_frontmatter_lines = []
        for key, value in fm_dict.items():
            if key in ['title', 'author', 'updatedAt', 'image']:
                if key == 'title':
                    new_frontmatter_lines.append(f"{key}: '{value.strip(\"'\\\"\")}'")
                elif key == 'updatedAt':
                    new_frontmatter_lines.append(f"{key}: {value}")
                else:
                    new_frontmatter_lines.append(f"{key}: '{value.strip(\"'\\\"\")}'")
            elif key in ['description', 'imageAlt']:
                # These get special handling
                pass
            elif isinstance(value, list):
                new_frontmatter_lines.append(f"{key}:")
                for item in value:
                    new_frontmatter_lines.append(f"  - {item}")
            else:
                new_frontmatter_lines.append(f"{key}: {value}")

        new_content = '---\n' + '\n'.join(new_frontmatter_lines) + '\n---\n' + body

        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Process all MDX files in the blog directory."""
    blog_dir = Path('C:\\AIGenXLab\\Projects\\Project-Baby\\content\\blog')

    if not blog_dir.exists():
        print(f"Blog directory not found: {blog_dir}")
        return

    files = sorted(blog_dir.glob('*.mdx'))
    print(f"Found {len(files)} MDX files to process")

    successful = 0
    failed = 0

    for i, file_path in enumerate(files, 1):
        if process_file(str(file_path)):
            successful += 1
        else:
            failed += 1

        if i % 10 == 0:
            print(f"Processed {i}/{len(files)} files ({successful} successful, {failed} failed)")

    print(f"\nComplete! Processed {len(files)} files")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")

if __name__ == '__main__':
    main()
