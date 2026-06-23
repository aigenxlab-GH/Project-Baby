#!/usr/bin/env pwsh
# Run batch rewrite of 180 blog articles
# Usage: .\run_rewrite.ps1

Set-Location "C:\AIGenXLab\Projects\Project-Baby"

Write-Host "Starting batch rewrite of blog articles..." -ForegroundColor Green
Write-Host "Processing 180 files in content/blog/*.mdx`n"

$ScriptPath = "./batch-rewrite.js"

if (Test-Path $ScriptPath) {
    try {
        node $ScriptPath
        Write-Host "`nBatch rewrite complete!" -ForegroundColor Green
    } catch {
        Write-Host "Error running Node.js script: $_" -ForegroundColor Red
        Write-Host "`nTrying Python alternative..." -ForegroundColor Yellow

        $PythonScript = "./batch_rewrite_articles.py"
        if (Test-Path $PythonScript) {
            python $PythonScript
        } else {
            Write-Host "Neither Node.js nor Python script found!" -ForegroundColor Red
        }
    }
} else {
    Write-Host "Script not found at $ScriptPath" -ForegroundColor Red
    exit 1
}

# Report git status
Write-Host "`nGit Status:" -ForegroundColor Cyan
git status --short content/blog | Measure-Object -Line | Select-Object -ExpandProperty Lines | ForEach-Object {
    Write-Host "Modified files: $_" -ForegroundColor Cyan
}
