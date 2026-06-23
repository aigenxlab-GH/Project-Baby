#!/usr/bin/env python3
"""
Silent execution runner - runs transformation and saves output without UI interaction.
Execute this with: python run_transformation_silent.py
"""

import sys
import os

# Set working directory
os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')
sys.path.insert(0, r'C:\AIGenXLab\Projects\Project-Baby')

# Import the transformer
from transformation_script import MDXTransformer

# Create output file
output_file = r'C:\AIGenXLab\Projects\Project-Baby\TRANSFORMATION_RESULTS.txt'

# Capture all output
import io
from contextlib import redirect_stdout, redirect_stderr

# Create file handle
with open(output_file, 'w', encoding='utf-8') as log_file:
    # Create string buffers to capture output
    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()

    # Run transformation with output capture
    with redirect_stdout(stdout_capture), redirect_stderr(stderr_capture):
        root_path = r'C:\AIGenXLab\Projects\Project-Baby\content\products'
        transformer = MDXTransformer()
        transformer.run(root_path)

    # Get captured output
    stdout_text = stdout_capture.getvalue()
    stderr_text = stderr_capture.getvalue()

    # Write to file
    log_file.write("=" * 80 + "\n")
    log_file.write("TRANSFORMATION EXECUTION RESULTS\n")
    log_file.write("=" * 80 + "\n\n")

    log_file.write(stdout_text)

    if stderr_text:
        log_file.write("\n\n" + "=" * 80 + "\n")
        log_file.write("STDERR OUTPUT\n")
        log_file.write("=" * 80 + "\n")
        log_file.write(stderr_text)

    # Add statistics summary
    log_file.write("\n\n" + "=" * 80 + "\n")
    log_file.write("TRANSFORMATION STATISTICS SUMMARY\n")
    log_file.write("=" * 80 + "\n")
    log_file.write(f"Total files processed: {transformer.files_processed}\n")
    log_file.write(f"Files with sections reordered: {transformer.changes_by_type['section_reordered']}\n")
    log_file.write(f"Files with custom frontmatter added: {transformer.changes_by_type['custom_frontmatter_added']}\n")
    log_file.write(f"Files with word count adjusted: {transformer.changes_by_type['word_count_adjusted']}\n")
    log_file.write(f"Files with heading hierarchy modified: {transformer.changes_by_type['heading_hierarchy_modified']}\n")
    log_file.write(f"Files with FAQ count adjusted: {transformer.changes_by_type['faq_count_adjusted']}\n")
    log_file.write(f"Files with 'Why This Matters' added: {transformer.changes_by_type['why_this_matters_added']}\n")
    log_file.write(f"Files with related articles varied: {transformer.changes_by_type['related_articles_varied']}\n")
    log_file.write(f"Number of errors encountered: {len(transformer.changes_by_type['errors'])}\n")

    if transformer.changes_by_type['errors']:
        log_file.write("\n" + "-" * 80 + "\n")
        log_file.write("ERRORS ENCOUNTERED:\n")
        log_file.write("-" * 80 + "\n")
        for idx, error in enumerate(transformer.changes_by_type['errors'][:20], 1):
            log_file.write(f"{idx}. {error}\n")
        if len(transformer.changes_by_type['errors']) > 20:
            log_file.write(f"\n... and {len(transformer.changes_by_type['errors']) - 20} more errors\n")

print(f"Transformation complete. Results saved to: {output_file}")
print(f"Total files processed: {transformer.files_processed}")
