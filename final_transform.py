#!/usr/bin/env python3
"""
Final transformation executor - direct execution without subprocess.
"""
import os
import sys

# Ensure we're in the right directory
os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')
sys.path.insert(0, r'C:\AIGenXLab\Projects\Project-Baby')

# Import transformation script classes
import io
from contextlib import redirect_stdout
from transformation_script import MDXTransformer

# Create the transformer instance
transformer = MDXTransformer()
root_path = r'C:\AIGenXLab\Projects\Project-Baby\content\products'

# Prepare output capture
output_buffer = io.StringIO()

# Execute transformation
print("=" * 80)
print("STARTING MDX TRANSFORMATION")
print("=" * 80)

try:
    # Run with stdout capture
    with redirect_stdout(output_buffer):
        transformer.run(root_path)

    # Get the captured output
    captured_output = output_buffer.getvalue()

    # Print to console
    print(captured_output)

    # Print summary statistics
    print("\n" + "=" * 80)
    print("TRANSFORMATION COMPLETE - SUMMARY STATISTICS")
    print("=" * 80)
    print(f"Total files processed: {transformer.files_processed}")
    print(f"Files with section_reordered: {transformer.changes_by_type['section_reordered']}")
    print(f"Files with custom_frontmatter_added: {transformer.changes_by_type['custom_frontmatter_added']}")
    print(f"Files with word_count_adjusted: {transformer.changes_by_type['word_count_adjusted']}")
    print(f"Files with heading_hierarchy_modified: {transformer.changes_by_type['heading_hierarchy_modified']}")
    print(f"Files with faq_count_adjusted: {transformer.changes_by_type['faq_count_adjusted']}")
    print(f"Files with why_this_matters_added: {transformer.changes_by_type['why_this_matters_added']}")
    print(f"Files with related_articles_varied: {transformer.changes_by_type['related_articles_varied']}")
    print(f"Total errors encountered: {len(transformer.changes_by_type['errors'])}")

    if transformer.changes_by_type['errors']:
        print("\nERROR DETAILS (first 20):")
        for idx, error in enumerate(transformer.changes_by_type['errors'][:20], 1):
            print(f"  {idx}. {error}")
        if len(transformer.changes_by_type['errors']) > 20:
            print(f"  ... and {len(transformer.changes_by_type['errors']) - 20} more errors")

    # Save to file as well
    output_file = r'C:\AIGenXLab\Projects\Project-Baby\TRANSFORMATION_RESULTS.txt'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(captured_output)
        f.write("\n\n" + "=" * 80 + "\n")
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

    print(f"\nFull results also saved to: {output_file}")

except Exception as e:
    print(f"FATAL ERROR: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 80)
print("EXECUTION SUCCESSFUL")
print("=" * 80)
