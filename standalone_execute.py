#!/usr/bin/env python3
"""
Standalone execution of transformation - runs the transformation directly
and saves output without any subprocess calls.
"""

import sys
import os
import io
from contextlib import redirect_stdout

# Set up paths
project_dir = r'C:\AIGenXLab\Projects\Project-Baby'
os.chdir(project_dir)
if project_dir not in sys.path:
    sys.path.insert(0, project_dir)

# Now import and run
from transformation_script import MDXTransformer

# Output file
output_file = os.path.join(project_dir, 'TRANSFORMATION_RESULTS.txt')

# Perform transformation
print("Starting MDX transformation...")
print(f"Project directory: {project_dir}")
print(f"Output will be saved to: {output_file}")

# Create transformer
transformer = MDXTransformer()
root_path = os.path.join(project_dir, 'content', 'products')

# Capture stdout
captured_output = io.StringIO()

# Run the transformation with output capture
try:
    with redirect_stdout(captured_output):
        transformer.run(root_path)

    output_text = captured_output.getvalue()

    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(output_text)
        f.write("\n\n")
        f.write("=" * 80 + "\n")
        f.write("FINAL STATISTICS\n")
        f.write("=" * 80 + "\n")
        f.write(f"Total files processed: {transformer.files_processed}\n")
        f.write(f"section_reordered: {transformer.changes_by_type['section_reordered']}\n")
        f.write(f"custom_frontmatter_added: {transformer.changes_by_type['custom_frontmatter_added']}\n")
        f.write(f"word_count_adjusted: {transformer.changes_by_type['word_count_adjusted']}\n")
        f.write(f"heading_hierarchy_modified: {transformer.changes_by_type['heading_hierarchy_modified']}\n")
        f.write(f"faq_count_adjusted: {transformer.changes_by_type['faq_count_adjusted']}\n")
        f.write(f"why_this_matters_added: {transformer.changes_by_type['why_this_matters_added']}\n")
        f.write(f"related_articles_varied: {transformer.changes_by_type['related_articles_varied']}\n")
        f.write(f"errors: {len(transformer.changes_by_type['errors'])}\n")

        if transformer.changes_by_type['errors']:
            f.write("\nERRORS:\n")
            for error in transformer.changes_by_type['errors'][:20]:
                f.write(f"  - {error}\n")
            if len(transformer.changes_by_type['errors']) > 20:
                f.write(f"  ... and {len(transformer.changes_by_type['errors']) - 20} more\n")

    # Print summary
    print("\n" + "=" * 80)
    print(output_text)
    print("=" * 80)
    print(f"\nResults saved to: {output_file}")

except Exception as e:
    print(f"Error during transformation: {e}")
    import traceback
    traceback.print_exc()
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"ERROR: {e}\n")
        f.write(traceback.format_exc())
