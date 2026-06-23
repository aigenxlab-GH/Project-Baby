#!/usr/bin/env python3
"""
Execute transformation and save complete output to file.
This script will be run directly to transform all MDX files.
"""

import sys
import os

# Add the project directory to path
sys.path.insert(0, r'C:\AIGenXLab\Projects\Project-Baby')

# Import and run the transformer
from transformation_script import MDXTransformer

# Redirect output to file and console
output_file = r'C:\AIGenXLab\Projects\Project-Baby\transformation_output.txt'

with open(output_file, 'w', encoding='utf-8') as log:
    # Run transformation
    root_path = r'C:\AIGenXLab\Projects\Project-Baby\content\products'
    transformer = MDXTransformer()

    # Capture print statements by redirecting stdout
    import io
    from contextlib import redirect_stdout

    string_io = io.StringIO()

    with redirect_stdout(string_io):
        transformer.run(root_path)

    output_text = string_io.getvalue()

    # Write to file
    log.write(output_text)
    log.write("\n\n=== SUMMARY STATISTICS ===\n")
    log.write(f"Total files processed: {transformer.files_processed}\n")
    log.write(f"section_reordered: {transformer.changes_by_type['section_reordered']}\n")
    log.write(f"custom_frontmatter_added: {transformer.changes_by_type['custom_frontmatter_added']}\n")
    log.write(f"word_count_adjusted: {transformer.changes_by_type['word_count_adjusted']}\n")
    log.write(f"heading_hierarchy_modified: {transformer.changes_by_type['heading_hierarchy_modified']}\n")
    log.write(f"faq_count_adjusted: {transformer.changes_by_type['faq_count_adjusted']}\n")
    log.write(f"why_this_matters_added: {transformer.changes_by_type['why_this_matters_added']}\n")
    log.write(f"related_articles_varied: {transformer.changes_by_type['related_articles_varied']}\n")
    log.write(f"Errors: {len(transformer.changes_by_type['errors'])}\n")

    if transformer.changes_by_type['errors']:
        log.write("\nErrors:\n")
        for error in transformer.changes_by_type['errors'][:20]:
            log.write(f"  {error}\n")

print(f"Transformation complete. Output saved to: {output_file}")
