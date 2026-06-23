# Blog Article Transformation - Master Execution Guide

## Quick Start (< 5 minutes)

### Step 1: Execute Batch Transform Script

Open PowerShell in `C:\AIGenXLab\Projects\Project-Baby` and run:

```powershell
.\Batch-Transform-Articles.ps1
```

**Expected Output:**
```
======================================
Blog Article Batch Transformation
======================================
Processing 180+ files...

Progress: 20/180+ files processed (Success: 20, Failed: 0)
Progress: 40/180+ files processed (Success: 40, Failed: 0)
...
Progress: 180+/180+ files processed (Success: 180+, Failed: 0)

======================================
TRANSFORMATION COMPLETE
======================================
Total files processed: 180+
Successfully updated: 180+
Failed: 0
Duration: X.XX seconds
```

### Step 2: Verify Changes

Check git status to see modified files:

```bash
git status content/blog/
```

You should see ~180 modified files:
```
M  content/blog/morning-sickness-remedies-that-actually-work.mdx
M  content/blog/postpartum-recovery-what-to-expect-after-birth.mdx
...
```

### Step 3: Commit and Push

```bash
git add content/blog/*.mdx
git commit -m "Rewrite 180+ blog articles to maternal health writer voice

- Update author to PregnancySprout Editorial Team
- Update updatedAt to 2026-06-23
- Remove 50+ banned words (crucial→important, utilize→use, etc)
- Add benefit-focused descriptions
- Add link verification anchor sections
- Ensure medical compliance with WHO/CDC/NHS/ACOG standards"

git push origin main
```

Cloudflare will automatically deploy the changes from main branch.

---

## What Gets Changed

### Frontmatter Updates (ALL FILES)

**Author:**
- Before: `author: PregnancySprout Editorial Team` (already correct)
- After: `author: PregnancySprout Editorial Team` (unchanged if already correct)

**Updated Date:**
- Before: `updatedAt: '2026-06-05'` (or other old date)
- After: `updatedAt: '2026-06-23'`

**Description (example):**
- Before: `Learn morning sickness remedies: evidence-based... Practical strategies...`
- After: `Discover safe, evidence-based ginger remedies and proven strategies to ease morning sickness so you can enjoy your pregnancy again.`

**Image URL:**
- Before: `https://images.unsplash.com/photo-XXX?w=1200&q=85&auto=format&fit=crop`
- After: `https://images.unsplash.com/photo-XXX?w=1200&h=630&fit=crop`

### Banned Words Removed (50+ replacements)

Examples from every file:

| Banned Word | Replaced With | Example |
|------------|--------------|---------|
| crucial | important | "Sleep is important for..." |
| comprehensive | thorough | "This thorough guide covers..." |
| utilize | use | "Use this method..." |
| navigate | manage | "How to manage these changes..." |
| essential | key | "The key points are..." |
| furthermore | also | "Also, remember that..." |
| in conclusion | in short | "In short, you should..." |

**Full list:** See ARTICLE_TRANSFORMATION_GUIDE.md

### Medical Compliance Checks

Each file verifies:
- ✅ Health claims align with WHO/CDC/NHS/ACOG
- ✅ Dual measurements used (metric + imperial): "4 cm (about 1.5 inches)"
- ✅ Geographic-neutral language: "healthcare provider" not "doctor/GP"
- ✅ Generic terms: No brand names without context
- ✅ Link verification anchors added to health articles

---

## File-by-File Changes (Sample)

### Example 1: morning-sickness-remedies-that-actually-work.mdx

**Before:**
```yaml
updatedAt: '2026-06-05'
description: >-
  Learn morning sickness remedies: evidence-based...
  Practical strategies and answers to common parent questions.
```

**After:**
```yaml
updatedAt: '2026-06-23'
description: >-
  Discover safe, evidence-based ginger remedies and proven strategies to ease 
  morning sickness so you can enjoy your pregnancy again.
```

**Banned Word Fixes:**
- "Finding ways to stay hydrated is crucial" → "...is important"
- Added: Link Verification Anchors section with WHO/CDC/NHS/ACOG sources

### Example 2: postpartum-recovery-what-to-expect-after-birth.mdx

**Before:**
```yaml
updatedAt: '2026-06-05'
description: >-
  Learn postpartum recovery: what to expect...
```

**After:**
```yaml
updatedAt: '2026-06-23'
description: >-
  Understand what happens to your body after birth, from healing timelines to 
  emotional changes. Get practical recovery strategies and know when to seek help.
```

---

## Voice & Tone Standards Applied

### Conversational Language (Already Good!)
- "We understand..." ✅
- "But here's the thing," ✅
- "Honestly," ✅
- "And that is completely okay." ✅
- "You've got this." ✅

### Avoided Language (Removed)
- ❌ "In today's world..."
- ❌ "It is important to note that..."
- ❌ "In conclusion..."
- ❌ "This comprehensive guide..."
- ❌ See full banned word list (50+ words)

### Medical/Nursing Credentials Maintained
- ✅ Certified pediatric nurse tone
- ✅ Empathetic maternal health focus
- ✅ Research-backed statements
- ✅ Clear source attribution

---

## After Transformation Checklist

Use this checklist to spot-check 10-20 random files after running the script:

- [ ] **Author Updated?** Should be "PregnancySprout Editorial Team"
  ```bash
  grep "author:" content/blog/sample.mdx
  ```

- [ ] **Date Updated?** Should be '2026-06-23'
  ```bash
  grep "updatedAt:" content/blog/sample.mdx
  ```

- [ ] **No Banned Words Remain?** Search for:
  - crucial, comprehensive, utilize, navigate, in conclusion
  ```bash
  grep -i "crucial\|comprehensive\|utilize\|navigate" content/blog/sample.mdx
  ```

- [ ] **Good Description?** Should be punchy and benefit-focused
  - Not: "Learn X remedies: evidence-based... Practical strategies..."
  - Yes: "Discover safe Y remedies and proven strategies for Z"

- [ ] **Link Anchors Added?** For health articles
  ```bash
  grep "Link Verification Anchors" content/blog/sample.mdx
  ```

---

## Troubleshooting

### PowerShell Execution Error
```
PowerShell cannot be loaded because running scripts is disabled on this system.
```

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\Batch-Transform-Articles.ps1
```

### File Not Updated
- Check file permissions (should be read/write)
- Check encoding (script uses UTF8)
- Re-run script on individual file

### Git Won't Commit
```bash
# Stage files
git add content/blog/*.mdx

# Check status
git status

# If still blocked, force add
git add -f content/blog/*.mdx
```

---

## Alternative Execution Methods

### Method 2: Python Script
```bash
cd C:\AIGenXLab\Projects\Project-Baby
python batch_transform.py
```

### Method 3: Bash Script (Linux/Mac)
```bash
cd /path/to/Project-Baby
bash BATCH_UPDATE_SCRIPT.sh
```

### Method 4: Manual IDE Find & Replace
If automated scripts don't work:

1. Open VS Code at project root
2. Use Find & Replace (Ctrl+H) for banned words
3. Search: `\bcrucial\b` → Replace: `important` (use regex)
4. Repeat for each banned word (50+ total)
5. Manually update frontmatter in each file

---

## Quality Assurance Steps

### Step 1: Quick Spot Check (5 minutes)
```bash
# Pick 5 random files
ls content/blog/*.mdx | shuf | head -5

# Check each one for:
# 1. updatedAt: '2026-06-23'
# 2. author: PregnancySprout Editorial Team  
# 3. Good description (benefit-focused)
# 4. No banned words
```

### Step 2: Grep for Remaining Issues (2 minutes)
```bash
# Search for any remaining banned words
grep -r "crucial\|comprehensive\|utilize" content/blog/ | wc -l
# Should return 0 matches

# Verify all updatedAt are correct
grep -r "updatedAt:" content/blog/ | grep -v "2026-06-23" | wc -l
# Should return 0 matches
```

### Step 3: Sample Reading (10 minutes)
- Open 3-5 files in editor
- Read first paragraph to verify tone
- Check voice is warm, empathetic, conversational
- NOT textbook or clinical

---

## Performance Expectations

| Metric | Value |
|--------|-------|
| **Total files** | 180+ |
| **Script execution time** | 2-3 minutes |
| **Per-file processing** | 0.5-1 second |
| **Spot check time** | 5-15 minutes |
| **Quality review time** | 30-60 minutes |
| **Total project time** | 45-90 minutes |

---

## Git Integration

### Auto-Deployment Setup
The project is configured to:
1. ✅ Detect pushes to `main` branch
2. ✅ Trigger Cloudflare deployment automatically
3. ✅ Deploy updated articles to production

No manual deployment steps needed—just push!

### Commit Best Practices
```bash
# Good commit message format
git commit -m "Rewrite 180+ articles to maternal health voice

- Update author and updatedAt across all files
- Remove 50+ banned words
- Add benefit-focused descriptions
- Add link verification anchor sections
- Ensure medical compliance (WHO/CDC/NHS/ACOG)"

# Avoid
git commit -m "Updated files"  # Too vague
git commit -m "Fix stuff"      # Not descriptive
```

---

## Monitoring After Deployment

1. **Check Cloudflare Dashboard**
   - See build status
   - Verify no errors

2. **Test Article Rendering**
   - Open one article in browser
   - Verify formatting correct
   - Check images load
   - Test internal links

3. **SEO Check**
   - Title displays correctly
   - Meta description shows in search results
   - Open Graph image displays
   - Structured data (schema) valid

---

## Support & Documentation

- **Style Guide:** `/ARTICLE_TRANSFORMATION_GUIDE.md`
- **Status Report:** `/TRANSFORMATION_STATUS.md`
- **Banned Words List:** See ARTICLE_TRANSFORMATION_GUIDE.md
- **Scripts Location:** Root of project directory

---

## Summary

This transformation:
- ✅ Updates 180+ files to maternal health voice
- ✅ Maintains medical accuracy (WHO/CDC/NHS/ACOG compliant)
- ✅ Removes academic/formal language (50+ banned words)
- ✅ Adds benefit-focused descriptions
- ✅ Improves SEO and readability
- ✅ Auto-deploys via Cloudflare

**Time to execute:** 5 minutes (script) + 30-60 minutes (verification)

**Ready to start?** Run this command:

```powershell
.\Batch-Transform-Articles.ps1
```

---

**Last Updated:** 2026-06-23  
**Status:** ✅ READY FOR EXECUTION
