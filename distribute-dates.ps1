# Distribution script for publication dates across MDX files
# Blog: 180 files, Apr 20 - Jun 20 (60 days)
# Products: 200 files, Apr 15 - Jun 15 (60 days)

# Define date ranges and distributions
$blogDir = "C:\AIGenXLab\Projects\Project-Baby\content\blog"
$productsDir = "C:\AIGenXLab\Projects\Project-Baby\content\products"

# Blog distribution: 20, 30, 45, 50, 35 across 60 days
$blogStartDate = [DateTime]::new(2026, 4, 20)
$blogDistribution = @(
    @{days = (0..13); count = 20}      # Days 1-14: 20 files
    @{days = (14..27); count = 30}     # Days 15-28: 30 files
    @{days = (28..41); count = 45}     # Days 29-42: 45 files
    @{days = (42..55); count = 50}     # Days 43-56: 50 files
    @{days = (56..59); count = 35}     # Days 57-60: 35 files
)

# Products distribution: similar pattern, starts Apr 15
$productsStartDate = [DateTime]::new(2026, 4, 15)
$productsDistribution = @(
    @{days = (0..13); count = 22}      # Days 1-14: 22 files (~20)
    @{days = (14..27); count = 33}     # Days 15-28: 33 files (~30)
    @{days = (28..41); count = 50}     # Days 29-42: 50 files (~45)
    @{days = (42..55); count = 55}     # Days 43-56: 55 files (~50)
    @{days = (56..59); count = 40}     # Days 57-60: 40 files (~35)
)

$updatedAtDate = '2026-06-23'
$totalProcessed = 0
$totalUpdated = 0

# Helper function to build date list for a distribution
function Get-DateList {
    param([DateTime]$startDate, [Array]$distribution)

    $dates = @()
    foreach ($bucket in $distribution) {
        $bucketDays = $bucket.days
        $bucketCount = $bucket.count

        # Spread files across the day range in this bucket
        if ($bucketDays.Count -gt 0) {
            $daySpan = $bucketDays[-1] - $bucketDays[0] + 1
            $step = [Math]::Max(1, [int]($daySpan / $bucketCount))

            for ($i = 0; $i -lt $bucketCount; $i++) {
                $dayOffset = $bucketDays[0] + (($i % $daySpan) * $step)
                $date = $startDate.AddDays($dayOffset)
                $dates += $date.ToString('yyyy-MM-dd')
            }
        }
    }

    return $dates
}

# Build date lists
$blogDates = Get-DateList -startDate $blogStartDate -distribution $blogDistribution
$productsDates = Get-DateList -startDate $productsStartDate -distribution $productsDistribution

Write-Host "Blog dates prepared: $($blogDates.Count)" -ForegroundColor Green
Write-Host "Product dates prepared: $($productsDates.Count)" -ForegroundColor Green

# Shuffle dates for more natural appearance
$blogDates = $blogDates | Sort-Object {Get-Random}
$productsDates = $productsDates | Sort-Object {Get-Random}

# Process blog files
Write-Host "`nProcessing blog files..." -ForegroundColor Cyan
$blogFiles = Get-ChildItem -Path $blogDir -Filter "*.mdx" -File -Recurse
Write-Host "Found $($blogFiles.Count) blog files"

$dateIndex = 0
foreach ($file in $blogFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $publishDate = if ($dateIndex -lt $blogDates.Count) { $blogDates[$dateIndex] } else { $blogDates[-1] }

    # Replace publishedAt date while preserving format
    $newContent = $content -replace "publishedAt:\s*['\"]?[0-9]{4}-[0-9]{2}-[0-9]{2}['\"]?", "publishedAt: '$publishDate'"

    # Ensure updatedAt is set to 2026-06-23
    $newContent = $newContent -replace "updatedAt:\s*['\"]?[0-9]{4}-[0-9]{2}-[0-9]{2}['\"]?", "updatedAt: '$updatedAtDate'"

    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $totalUpdated++
    }

    $totalProcessed++
    $dateIndex++

    if ($totalProcessed % 20 -eq 0) {
        Write-Host "  Processed $totalProcessed files..." -ForegroundColor Gray
    }
}

Write-Host "Blog files processed: $totalProcessed, updated: $totalUpdated" -ForegroundColor Green

# Process product files
Write-Host "`nProcessing product files..." -ForegroundColor Cyan
$productFiles = Get-ChildItem -Path $productsDir -Filter "*.mdx" -File -Recurse
Write-Host "Found $($productFiles.Count) product files"

$dateIndex = 0
$productUpdated = 0
$productProcessed = 0

foreach ($file in $productFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $publishDate = if ($dateIndex -lt $productsDates.Count) { $productsDates[$dateIndex] } else { $productsDates[-1] }

    # Replace publishedAt date
    $newContent = $content -replace "publishedAt:\s*['\"]?[0-9]{4}-[0-9]{2}-[0-9]{2}['\"]?", "publishedAt: '$publishDate'"

    # Ensure updatedAt is set to 2026-06-23
    $newContent = $newContent -replace "updatedAt:\s*['\"]?[0-9]{4}-[0-9]{2}-[0-9]{2}['\"]?", "updatedAt: '$updatedAtDate'"

    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $productUpdated++
    }

    $productProcessed++
    $dateIndex++

    if ($productProcessed % 30 -eq 0) {
        Write-Host "  Processed $productProcessed files..." -ForegroundColor Gray
    }
}

Write-Host "Product files processed: $productProcessed, updated: $productUpdated" -ForegroundColor Green

# Summary
Write-Host "`n" -ForegroundColor White
Write-Host "=== SUMMARY ===" -ForegroundColor Yellow
Write-Host "Blog files: $totalProcessed processed, $totalUpdated updated" -ForegroundColor Green
Write-Host "Product files: $productProcessed processed, $productUpdated updated" -ForegroundColor Green
Write-Host "Total: $($totalProcessed + $productProcessed) files processed" -ForegroundColor Green
Write-Host "Date range: Blog Apr 20 - Jun 20, Products Apr 15 - Jun 15" -ForegroundColor Green
Write-Host "Updated At: All files set to $updatedAtDate" -ForegroundColor Green
