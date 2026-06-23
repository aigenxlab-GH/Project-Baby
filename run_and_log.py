#!/usr/bin/env python3
"""
Wrapper to run the transformation script and log output to a file.
"""
import sys
import subprocess
import os

# Change to project directory
os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')

# Run the transformation script and capture output
result = subprocess.run(
    [sys.executable, 'transformation_script.py'],
    capture_output=True,
    text=True
)

# Write output to log file
with open('transformation_output.log', 'w', encoding='utf-8') as f:
    f.write("=== STDOUT ===\n")
    f.write(result.stdout)
    f.write("\n=== STDERR ===\n")
    f.write(result.stderr)
    f.write(f"\n=== RETURN CODE ===\n{result.returncode}\n")

print("Transformation completed. Output logged to transformation_output.log")
print("\n--- Output Summary ---")
print(result.stdout)
if result.stderr:
    print("\n--- Errors ---")
    print(result.stderr)
