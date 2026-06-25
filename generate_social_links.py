import os
import re
import csv

SITE_URL = 'https://pregnancysprout.com'

def extract_frontmatter(content):
    match = re.match(r'^---\n([\s\S]*?)\n---', content)
    if not match:
        return None

    frontmatter_text = match.group(1)
    frontmatter = {}

    for line in frontmatter_text.split('\n'):
        if ':' not in line:
            continue
        key, value = line.split(':', 1)
        key = key.strip()
        value = value.strip().strip("'\"")
        if key:
            frontmatter[key] = value

    return frontmatter

def find_mdx_files(directory):
    files = []
    for root, dirs, filenames in os.walk(directory):
        for filename in filenames:
            if filename.endswith('.mdx'):
                files.append(os.path.join(root, filename))
    return files

def get_slug(filepath):
    if 'blog' in filepath:
        match = re.search(r'blog[/\\]([^/\\]+)\.mdx', filepath)
        return f'/blog/{match.group(1)}' if match else None
    elif 'products' in filepath:
        match = re.search(r'products[/\\]([^/\\]+)[/\\]([^/\\]+)\.mdx', filepath)
        return f'/products/{match.group(1)}/{match.group(2)}' if match else None
    return None

def get_type(filepath):
    return 'Blog' if 'blog' in filepath else 'Product Review'

def get_category(filepath):
    if 'blog' in filepath:
        return 'General'
    elif 'products' in filepath:
        match = re.search(r'products[/\\]([^/\\]+)', filepath)
        if match:
            return match.group(1).replace('-', ' ').title()
    return 'Product'

def main():
    content_dir = 'content'
    all_files = find_mdx_files(content_dir)

    articles = []

    for filepath in all_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            frontmatter = extract_frontmatter(content)
            if not frontmatter:
                continue

            slug = get_slug(filepath)
            if not slug:
                continue

            url = SITE_URL + slug
            article_type = get_type(filepath)
            category = get_category(filepath)
            title = frontmatter.get('title', 'Untitled')
            description = frontmatter.get('description', 'Check out this article')

            social_caption = f"{title}\n\n{description}\n\n{url}"

            articles.append({
                'Type': article_type,
                'Category': category,
                'Title': title,
                'URL': url,
                'Description': description,
                'Social Media Caption': social_caption
            })
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    # Sort by type, category, title
    articles.sort(key=lambda x: (x['Type'], x['Category'], x['Title']))

    # Write CSV
    output_file = 'social_media_links.csv'

    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Type', 'Category', 'Title', 'URL', 'Description', 'Social Media Caption']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(articles)

    print(f"\n[OK] CSV file created: {output_file}")
    print(f"[STATS] Total articles: {len(articles)}")
    print(f"   - Blog articles: {len([a for a in articles if a['Type'] == 'Blog'])}")
    print(f"   - Product reviews: {len([a for a in articles if a['Type'] == 'Product Review'])}")
    print(f"\n[FILE] Location: C:\\AIGenXLab\\Projects\\Project-Baby\\{output_file}")

if __name__ == '__main__':
    main()
