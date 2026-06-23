#!/usr/bin/env python3
"""
Direct Python execution wrapper for batch_update_mdx.
This imports and runs the main function directly.
"""

import sys
import os

# Add project root to path
sys.path.insert(0, r"C:\AIGenXLab\Projects\Project-Baby")

# Import and run the batch update
from batch_update_mdx import main

if __name__ == "__main__":
    main()
