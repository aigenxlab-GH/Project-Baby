#!/usr/bin/env python3
"""Test the transformation on a single file to verify it works"""

import sys
sys.path.insert(0, r'C:\AIGenXLab\Projects\Project-Baby')

from transformation_script import MDXTransformer
import os

# Test with the first file
test_file = r'C:\AIGenXLab\Projects\Project-Baby\content\products\activity-centers\baby-einstein-neighborhood-friends-review.mdx'

if os.path.exists(test_file):
    print(f"Testing with: {os.path.basename(test_file)}")
    transformer = MDXTransformer()
    success, changes = transformer.transform_file(test_file)
    print(f"Success: {success}")
    print(f"Changes: {changes}")
    print("\nFile ID:", transformer.extract_file_id(test_file))
else:
    print(f"File not found: {test_file}")
