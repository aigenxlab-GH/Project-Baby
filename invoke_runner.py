#!/usr/bin/env python3
"""
Invoke the transformation runner via VBScript and wait for completion.
"""

import subprocess
import os
import time

os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')

# Execute the VBScript
print("Starting transformation via VBScript...")
result = subprocess.run(
    ['cscript.exe', 'run_silent.vbs'],
    cwd=r'C:\AIGenXLab\Projects\Project-Baby',
    capture_output=True,
    text=True
)

print("VBScript execution completed.")
print("Waiting for Python transformation to finish...")

# Wait a bit for the transformation to complete
time.sleep(5)

# Check if results file exists
results_file = r'C:\AIGenXLab\Projects\Project-Baby\TRANSFORMATION_RESULTS.txt'
if os.path.exists(results_file):
    print(f"\nResults file found at: {results_file}")
    with open(results_file, 'r', encoding='utf-8') as f:
        content = f.read()
    print("\n" + "=" * 80)
    print(content)
    print("=" * 80)
else:
    print(f"Results file not found. Expected at: {results_file}")
    print("VBScript stdout:", result.stdout)
    print("VBScript stderr:", result.stderr)
