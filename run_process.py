#!/usr/bin/env python3
import subprocess
import sys

# Run the disclaimer processing script
result = subprocess.run([sys.executable, 'process_disclaimers.py'],
                       cwd=r'C:\AIGenXLab\Projects\Project-Baby',
                       capture_output=True,
                       text=True)

print(result.stdout)
if result.stderr:
    print("STDERR:", result.stderr)

sys.exit(result.returncode)
