# Batch Rewrite Instructions: 180 Blog Articles

## Quick Summary
Transform all 180 blog articles in `content/blog/*.mdx` to empathetic maternal health writer voice with new Unsplash images, banned word removal, and link verification sections.

## Option 1: Use Node.js Script (Recommended)

### Prerequisites
- Node.js 14+ installed
- Terminal access in project directory

### Execution
```bash
cd C:\AIGenXLab\Projects\Project-Baby
node batch-rewrite.js
```

### What It Does
- Processes all 180 MDX files
- Updates author to "PregnancySprout Editorial Team"
- Sets updatedAt to '2026-06-23'
- Replaces 50+ banned words
- Adds 10 rotating Unsplash pregnancy/baby images
- Adds imageAlt descriptions
- Adds [LINK VERIFICATION ANCHORS] section
- Reports progress every 10 files
- Shows final success statistics

### Expected Output
```
Starting batch rewrite of blog articles...
Found 180 blog files to process.

✓ Processed 10 files...
✓ Processed 20 files...
...
✓ Processed 180 files...

============================================================
BATCH REWRITE COMPLETE
============================================================
Processed: 180/180 files
Success rate: 100.0%

All files updated with:
  • Author: PregnancySprout Editorial Team
  • Updated date: 2026-06-23
  • New Unsplash images (pregnancy/baby/parenting)
  • Banned words removed/replaced
  • [LINK VERIFICATION ANCHORS] section added

Ready to commit and push to GitHub!
```

---

## Option 2: Use Python Script

### Prerequisites
- Python 3.7+ installed
- Terminal access in project directory

### Execution
```bash
cd C:\AIGenXLab\Projects\Project-Baby
python batch_rewrite_articles.py
```

### Same behavior as Node.js option

---

## Option 3: Manual PowerShell Execution

If neither Node.js nor Python work, use PowerShell:

```powershell
cd C:\AIGenXLab\Projects\Project-Baby

# First, define the transformation function
$BannedWords = @{
    'crucial' = 'important'
    'moreover' = 'Also'
    'compounded' = 'made worse'
    'enormous' = 'huge'
    'significant' = 'notable'
    'warrant' = 'require'
    # ... (full list in batch-rewrite.js)
}

# Get all MDX files
$Files = Get-ChildItem -Path "content/blog" -Filter "*.mdx" -File

$ProcessedCount = 0
foreach ($File in $Files) {
    $Content = Get-Content $File.FullName -Raw
    
    # Replace banned words
    foreach ($Word in $BannedWords.Keys) {
        $Content = $Content -replace [regex]::Escape($Word), $BannedWords[$Word]
    }
    
    # Update metadata
    $Content = $Content -replace "updatedAt: '2026-06-22'", "updatedAt: '2026-06-23'"
    
    # Write back
    Set-Content -Path $File.FullName -Value $Content
    $ProcessedCount++
    
    if ($ProcessedCount % 10 -eq 0) {
        Write-Host "Processed $ProcessedCount files..."
    }
}

Write-Host "Complete! Processed $ProcessedCount files."
```

---

## Verification After Batch Rewrite

### Check Modified Files
```bash
git status | grep "modified:" | wc -l
# Should show 180
```

### Spot-Check a File
```bash
git diff content/blog/baby-constipation-diarrhea-signs.mdx
```

Look for:
- ✓ updatedAt changed to '2026-06-23'
- ✓ Author is "PregnancySprout Editorial Team"
- ✓ Image URL updated to Unsplash format
- ✓ imageAlt added with description
- ✓ Banned words replaced (compounded → made worse, enormous → huge, etc.)
- ✓ [LINK VERIFICATION ANCHORS] section at end

### Verify No Files Were Corrupted
```bash
find content/blog -name "*.mdx" -type f -exec sh -c 'grep -q "^---$" "$1" || echo "Bad: $1"' _ {} \;
# Should return nothing (means all files are valid)
```

---

## What Each Transformation Changes

### Frontmatter Updates
- **author**: → "PregnancySprout Editorial Team"
- **updatedAt**: → '2026-06-23'
- **image**: → New Unsplash URL (10 pregnancy/baby/parenting photos rotating)
- **imageAlt**: → Descriptive alt text for accessibility
- **description**: → Cleaned/improved benefit-focused copy

### Body Content Updates
- **Banned words removed**: 50+ words replaced with conversational alternatives:
  - crucial → important
  - moreover → Also
  - delve → explore
  - compounded → made worse
  - enormous → huge
  - significant → notable
  - warrant → require
  - inherently → naturally
  - furthermore → And
  - in conclusion → In short
  - (and 40+ more)

- **Conversational additions**:
  - "But here's the thing,"
  - "Honestly,"
  - "To be fair,"
  - "Now, you might wonder,"
  - "And that is completely okay."

### New Section Added
At the end of every article before the Related Articles section:

```markdown
---

## [LINK VERIFICATION ANCHORS]

"key phrase from article" → Source.domain
"another factual claim" → CDC.gov
```

---

## Commit Strategy

After successful batch rewrite:

```bash
# Stage all modified MDX files
git add content/blog/*.mdx

# Create a commit (auto-signed if configured)
git commit -m "Transform 180 blog articles to maternal health writer voice

- Update author to PregnancySprout Editorial Team
- Set updatedAt to 2026-06-23
- Replace 50+ banned words with conversational alternatives
- Add 10 rotating Unsplash pregnancy/baby/parenting images
- Add imageAlt descriptions for accessibility
- Inject [LINK VERIFICATION ANCHORS] verification section"

# Push to GitHub (Cloudflare deploys from main)
git push origin main
```

---

## Troubleshooting

### Script hangs on a file
- The file likely has invalid YAML frontmatter
- Manually fix the offending file's frontmatter to match YAML syntax
- Restart the script

### Some words not replaced
- Case sensitivity: Script uses case-insensitive matching
- Word boundaries: Only whole words match (e.g., "crucial" but not "crucially")
- Check that the word is in the banned words list

### Images not updating
- Verify Unsplash URLs are accessible: `curl -I https://images.unsplash.com/photo-...`
- If URL is broken, manually replace with working Unsplash URL

### Link anchors not appearing
- Verify file ends properly (no truncation)
- Check that `Related Articles` section exists before anchor injection

---

## File Inventory Before/After

### Before
- 180 files with mixed authorship
- updatedAt: mostly '2026-06-22'
- Mixed image sources
- Outdated/corporate language (crucial, moreover, delve, etc.)
- No link verification anchors

### After
- 180 files with consistent authorship
- updatedAt: all '2026-06-23'
- Consistent Unsplash pregnancy/baby/parenting images
- Warm, empathetic maternal health writer voice
- Link verification anchors for medical compliance

---

## Next Steps

1. **Run the batch script** (Node.js, Python, or PowerShell)
2. **Verify the output** (spot-check 5-10 files)
3. **Commit the changes** (auto-signed with your GitHub account)
4. **Push to main** (Cloudflare automatically deploys)
5. **Monitor deployment** (Cloudflare dashboard)

---

## Questions?

Refer to the script source code:
- JavaScript: `batch-rewrite.js`
- Python: `batch_rewrite_articles.py`
- Both contain detailed comments and banned words lists

The transformation is non-destructive — all changes are text-based and reversible via git.
