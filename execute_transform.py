#!/usr/bin/env python3
import sys
import os

os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')

# Import and run
from transformation_script import MDXTransformer

root_path = r'C:\AIGenXLab\Projects\Project-Baby\content\products'
transformer = MDXTransformer()
transformer.run(root_path)

# Log results
with open(r'C:\AIGenXLab\Projects\Project-Baby\transform_results.txt', 'w') as f:
    f.write("TRANSFORMATION SUMMARY\n")
    f.write("=" * 80 + "\n")
    f.write(f"Total files processed: {transformer.files_processed}\n")
    f.write(f"Sections reordered: {transformer.changes_by_type['section_reordered']}\n")
    f.write(f"Custom frontmatter added: {transformer.changes_by_type['custom_frontmatter_added']}\n")
    f.write(f"Word count adjusted: {transformer.changes_by_type['word_count_adjusted']}\n")
    f.write(f"Heading hierarchy modified: {transformer.changes_by_type['heading_hierarchy_modified']}\n")
    f.write(f"FAQ count adjusted: {transformer.changes_by_type['faq_count_adjusted']}\n")
    f.write(f"Why This Matters added: {transformer.changes_by_type['why_this_matters_added']}\n")
    f.write(f"Related articles varied: {transformer.changes_by_type['related_articles_varied']}\n")
    f.write(f"Errors encountered: {len(transformer.changes_by_type['errors'])}\n")

print("Results saved to transform_results.txt")
