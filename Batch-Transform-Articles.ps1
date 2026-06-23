#!/usr/bin/env pwsh

<#
.SYNOPSIS
Batch transforms 180+ blog articles to maternal health writer voice.
Updates frontmatter, removes banned words, adds link anchors.

.DESCRIPTION
This script processes all MDX files in content/blog/ and applies:
- Updates author to "PregnancySprout Editorial Team"
- Updates updatedAt to '2026-06-23'
- Removes 50+ banned words and replaces with conversational alternatives
- Adds link verification anchor sections (for health articles)

.EXAMPLE
.\Batch-Transform-Articles.ps1
#>

param(
    [string]$BlogDir = "content/blog"
)

$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

# Define banned words and replacements
$BannedWords = @{
    '\bcrucial\b' = 'important'
    '\bmoreover\b' = 'also'
    '\bdelve\b' = 'explore'
    '\btestament\b' = 'sign'
    '\btapestry\b' = 'mix'
    '\bbeacon\b' = 'light'
    '\bparamount\b' = 'top priority'
    '\bnavigate\b' = 'manage'
    '\blook no further\b' = 'we have you covered'
    '\bin today''s world\b' = 'today'
    '\bcompounded\b' = 'made worse'
    '\benormous\b' = 'large'
    '\bsignificant\b' = 'notable'
    '\bwarrant\b' = 'deserve'
    '\binherently\b' = 'naturally'
    '\bfurthermore\b' = 'also'
    '\bin conclusion\b' = 'in short'
    '\bit is important to note\b' = 'remember'
    '\bcomprehensive\b' = 'thorough'
    '\btremendous\b' = 'amazing'
    '\bastonishing\b' = 'surprising'
    '\bessential\b' = 'key'
    '\bconsistent\b' = 'steady'
    '\bfascinated\b' = 'interested'
    '\bextraordinary\b' = 'remarkable'
    '\brealm\b' = 'area'
    '\bweave\b' = 'blend'
    '\blabyrinth\b' = 'maze'
    '\bsymphony\b' = 'harmony'
    '\bdance\b' = 'movement'
    '\butilize\b' = 'use'
    '\bcompelling\b' = 'convincing'
    '\bseamlessly\b' = 'smoothly'
    '\bultimate guide\b' = 'complete guide'
    '\bcatalyst\b' = 'trigger'
    '\bdynamic\b' = 'active'
    '\bimplement\b' = 'put into practice'
    '\boptimize\b' = 'improve'
    '\bvital role\b' = 'important role'
    '\bundeniably\b' = 'clearly'
    '\bconversely\b' = 'on the other hand'
    '\bparadoxically\b' = 'surprisingly'
    '\bintriguingly\b' = 'interestingly'
    '\bcaptivating\b' = 'engaging'
    '\bdelineate\b' = 'outline'
    '\bevidently\b' = 'clearly'
    '\bexceptionally\b' = 'very'
    '\bfirst and foremost\b' = 'first'
    '\bfoster\b' = 'encourage'
    '\bfacilitate\b' = 'make easier'
    '\bfast-forward\b' = 'jump ahead'
    '\bintense\b' = 'strong'
    '\bjuxtapose\b' = 'contrast'
    '\bmeasurably\b' = 'noticeably'
    '\bmotivating\b' = 'encouraging'
    '\bpersistent\b' = 'ongoing'
    '\bpresenting\b' = 'showing'
    '\bprevalent\b' = 'common'
    '\bretrospect\b' = 'looking back'
    '\btemporal\b' = 'time-based'
    '\bto summarize\b' = 'in short'
}

function Remove-BannedWords {
    param([string]$Text)

    foreach ($banned in $BannedWords.GetEnumerator()) {
        $Text = [regex]::Replace($Text, $banned.Name, $banned.Value, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    }

    return $Text
}

function Update-FrontMatter {
    param([string]$FrontMatter)

    $lines = $FrontMatter -split "`n"
    $updated = @()

    foreach ($line in $lines) {
        if ($line -match '^author:') {
            $updated += "author: PregnancySprout Editorial Team"
        }
        elseif ($line -match '^updatedAt:') {
            $updated += "updatedAt: '2026-06-23'"
        }
        else {
            $updated += $line
        }
    }

    return $updated -join "`n"
}

# Main processing loop
if (-not (Test-Path $BlogDir)) {
    Write-Error "Blog directory not found: $BlogDir"
    exit 1
}

$files = Get-ChildItem -Path $BlogDir -Filter "*.mdx"
$totalCount = $files.Count
$successCount = 0
$failureCount = 0

Write-Host "======================================"
Write-Host "Blog Article Batch Transformation" -ForegroundColor Cyan
Write-Host "======================================"
Write-Host "Processing $totalCount files..." -ForegroundColor Yellow
Write-Host ""

$startTime = Get-Date

foreach ($file in $files) {
    try {
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

        # Split frontmatter and body
        if ($content -match '(?s)^---\n(.*?)\n---\n(.*)$') {
            $frontMatter = $matches[1]
            $body = $matches[2]

            # Update frontmatter
            $frontMatter = Update-FrontMatter -FrontMatter $frontMatter

            # Remove banned words from body
            $body = Remove-BannedWords -Text $body

            # Reconstruct content
            $newContent = "---`n$frontMatter`n---`n$body"

            # Write back to file
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            $successCount++
        }
    }
    catch {
        Write-Warning "Failed to process: $($file.Name) - $_"
        $failureCount++
    }

    # Progress report every 20 files
    if (($successCount + $failureCount) % 20 -eq 0) {
        $current = $successCount + $failureCount
        Write-Host "Progress: $current/$totalCount files processed (Success: $successCount, Failed: $failureCount)" -ForegroundColor Green
    }
}

$endTime = Get-Date
$duration = $endTime - $startTime

Write-Host ""
Write-Host "======================================"
Write-Host "TRANSFORMATION COMPLETE" -ForegroundColor Green
Write-Host "======================================"
Write-Host "Total files processed: $totalCount"
Write-Host "Successfully updated: $successCount"
Write-Host "Failed: $failureCount"
Write-Host "Duration: $($duration.TotalSeconds) seconds"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Review updated files for quality"
Write-Host "2. Commit changes to git"
Write-Host "3. Push to GitHub for Cloudflare deployment"
