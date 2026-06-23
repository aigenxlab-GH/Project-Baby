#!/usr/bin/env python3
"""
Direct execution of transformation with full output capture and file logging.
"""

import subprocess
import sys
import os

os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')

# Execute the transformation script
result = subprocess.run(
    [sys.executable, 'transformation_script.py'],
    capture_output=True,
    text=True,
    cwd=r'C:\AIGenXLab\Projects\Project-Baby'
)

# Save output to file
output_path = r'C:\AIGenXLab\Projects\Project-Baby\TRANSFORMATION_RESULTS.txt'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(result.stdout)
    if result.stderr:
        f.write('\n\n=== STDERR ===\n')
        f.write(result.stderr)
    f.write(f'\n\nReturn code: {result.returncode}')

# Also print to console
print(result.stdout)
if result.stderr:
    print('STDERR:', result.stderr)

print(f'\n\nOutput saved to: {output_path}')
