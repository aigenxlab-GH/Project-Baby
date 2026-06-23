#!/usr/bin/env python3
"""
Execute batch update directly with output to console and log file.
"""

import os
import sys
from datetime import datetime

# Redirect output to both console and log file
class DualWriter:
    def __init__(self, log_file):
        self.terminal = sys.stdout
        self.log = open(log_file, 'w', encoding='utf-8')

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)
        self.terminal.flush()
        self.log.flush()

    def flush(self):
        pass

# Set up logging
log_file = r"C:\AIGenXLab\Projects\Project-Baby\batch_update_log.txt"
sys.stdout = DualWriter(log_file)

print(f"Starting batch MDX update at {datetime.now().isoformat()}")
print(f"Log file: {log_file}")
print("-" * 80)

try:
    # Change to project directory
    os.chdir(r"C:\AIGenXLab\Projects\Project-Baby")

    # Import and execute the batch update
    from batch_update_mdx import main

    main()

    print("-" * 80)
    print(f"Batch update completed at {datetime.now().isoformat()}")

except Exception as e:
    print(f"ERROR: {str(e)}")
    import traceback
    traceback.print_exc()
    print("-" * 80)
    print(f"Batch update failed at {datetime.now().isoformat()}")
    sys.exit(1)
