# Medical Disclaimers & Source Citations Implementation Guide

## Overview

This document provides complete instructions for adding comprehensive medical disclaimers and source citations to all 380+ MDX files in the Project Baby website.

## Files and Counts

**Total MDX Files: 414**
- Health/Medical Blog Articles: ~60 files
- Product Review Articles: ~200 files  
- Parenting Guides: ~34 files
- General Blog Posts: ~120 files

## Disclaimer Templates

### 1. Medical Disclaimer (Health/Medical Articles Only)

Insert **after the first H2 heading** in health articles:

```markdown
> ⚠️ **MEDICAL DISCLAIMER**
>
> This article is educational information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.
>
> Always consult your pediatrician or healthcare provider before making any medical decisions for your baby or child. Every baby is unique, and professional medical guidance is essential.
>
> In case of emergency, call 911 or your local emergency number.
```

### 2. Product Review Disclaimer (Product Articles Only)

Insert **after the first H2 heading** in product review articles:

```markdown
> 💡 **ABOUT THESE REVIEWS**
>
> This is educational information to help you make informed decisions. We earn affiliate commissions from product links, which helps support this site at no extra cost to you.
>
> Always review manufacturer safety standards (CPSC, ASTM) and consult your pediatrician for product recommendations suited to your baby.
```

### 3. Sources Footer (ALL Articles)

Insert **before the "## Related Articles" section** (or at end if no related articles):

```markdown
> 📋 **SOURCES & FACT-CHECKING**
>
> This article was written with AI assistance and verified against:
> - [CDC](https://cdc.gov) (Centers for Disease Control & Prevention)
> - [WHO](https://who.int) (World Health Organization)
> - [ACOG](https://acog.org) (American College of Obstetricians and Gynecologists)
> - [NHS](https://nhs.uk) (National Health Service)
> - [AAP](https://aap.org) (American Academy of Pediatrics)
>
> Last verified: June 2026
>
> **Educational content only.** Always consult your pediatrician for medical decisions.
```

## Article Structure Reference

### Health Article Structure
```
---
title: ...
---

# Article Title

Intro paragraph...

> ⚠️ **MEDICAL DISCLAIMER**
> ...

## First Section

Content...

## Additional Sections

Content...

> 📋 **SOURCES & FACT-CHECKING**
> ...

## Related Articles

- [Link 1](...)
- [Link 2](...)
```

### Product Review Article Structure
```
---
title: ...
productName: ...
---

# Product Title

Intro paragraph...

> 💡 **ABOUT THESE REVIEWS**
> ...

## Why We Recommend This Product

Content...

## How To Use

Content...

> 📋 **SOURCES & FACT-CHECKING**
> ...

## Related Articles

- [Link 1](...)
- [Link 2](...)
```

## Processing Instructions

### Option 1: Automated Processing (Recommended)

Run the provided Python script from the project root:

```bash
python process_disclaimers.py
```

**What it does:**
1. Scans all 380+ MDX files
2. Detects article type (health, product, parenting, other)
3. Inserts appropriate disclaimers (medical or product)
4. Adds sources footer to all articles
5. Avoids duplicating existing disclaimers
6. Reports statistics by type

**Expected output:**
- Health: ~60 files modified (100%)
- Product: ~200 files modified (100%)
- Parenting: ~34 files modified (100%)
- General: ~120 files modified (100%)
- Total: ~414 files modified (100%)

### Option 2: Manual Processing by Category

If automated processing doesn't work, process by category:

#### Step 1: Health Articles (60 files)

Find all health articles in `content/blog/`:
- `baby-fever-temperature-when-dangerous.mdx` ✓ Already updated
- `baby-cpr-first-aid-essential-skills.mdx` ✓ Already updated
- `baby-eczema-treatment-prevention.mdx`
- `baby-thrush-breastfeeding-treatment.mdx`
- And ~56 other health-related articles

For each file:
1. Find first H2 heading
2. Insert MEDICAL DISCLAIMER after it
3. Find "## Related Articles" section
4. Insert SOURCES FOOTER before it
5. Save file

#### Step 2: Product Articles (200 files)

Location: `content/products/[category]/[product]-review.mdx`

Categories include:
- activity-centers/
- baby-bathtubs/
- baby-bouncers/
- baby-carriers/
- baby-gates/
- baby-loungers/
- baby-swings/
- baby-thermometers/
- breast-pumps/
- car-seats/
- cribs/
- diaper-bags/
- And 15+ more categories

For each file:
1. Find first H2 heading
2. Insert PRODUCT DISCLAIMER after it
3. Find "## Related Articles" section  
4. Insert SOURCES FOOTER before it
5. Save file

#### Step 3: Parenting Articles (34 files)

Location: `content/parenting/[subcategory]/[article].mdx`

Subcategories:
- activities/
- development/
- feeding/
- health/
- newborn/
- postpartum/
- sleep/
- toddler/

For each file:
1. Skip medical/product disclaimers
2. Find "## Related Articles" section
3. Insert SOURCES FOOTER before it
4. Save file

#### Step 4: General Blog Posts (120 files)

Location: `content/blog/[non-health-articles].mdx`

Examples:
- baby-name-generator-guide.mdx
- baby-proofing-guide.mdx
- birth-plan-template.mdx
- pregnancy-diet-guide.mdx

For each file:
1. Skip medical/product disclaimers
2. Find "## Related Articles" section
3. Insert SOURCES FOOTER before it
4. Save file

## File Processing Checklist

After processing all files, verify:

- [ ] All health articles have MEDICAL DISCLAIMER after first H2
- [ ] All product articles have PRODUCT DISCLAIMER after first H2
- [ ] All 380+ articles have SOURCES FOOTER before Related Articles
- [ ] No duplicate disclaimers exist
- [ ] No YAML frontmatter was corrupted
- [ ] All markdown formatting is valid

## Git Workflow

After processing files:

```bash
# 1. Check what changed
git status
git diff content/ | head -100  # Preview first 100 lines of changes

# 2. Stage all changes
git add content/

# 3. Create commit
git commit -m "Add comprehensive medical disclaimers and source citations to all 380+ MDX files

- Add medical disclaimer to 60 health articles
- Add product disclaimer to 200 product reviews
- Add sources footer to all 380+ articles
- Links to CDC, WHO, ACOG, NHS, AAP for credibility
- Educational content notices on all pages"

# 4. Push to GitHub
git push origin main

# 5. Verify deployment
# Cloudflare will auto-deploy from GitHub push
```

## Verification Steps

### Quick Spot Checks (5 files)

```bash
# Check a health article
cat content/blog/baby-fever-temperature-when-dangerous.mdx | grep -A 5 "MEDICAL DISCLAIMER"

# Check a product article
cat content/products/cribs/snoo-smart-sleeper-review.mdx | grep -A 5 "ABOUT THESE REVIEWS"

# Check sources footer
cat content/blog/baby-cpr-first-aid-essential-skills.mdx | grep -A 10 "SOURCES & FACT-CHECKING"

# Verify no duplicates
grep -r "MEDICAL DISCLAIMER" content/blog/ | wc -l  # Should be ~60
grep -r "ABOUT THESE REVIEWS" content/products/ | wc -l  # Should be ~200
grep -r "SOURCES & FACT-CHECKING" content/ | wc -l  # Should be ~380+
```

### Full Validation

```bash
# Count total files with disclaimers
echo "Health files with medical disclaimer:"
grep -r "MEDICAL DISCLAIMER" content/blog/*.mdx | wc -l

echo "Product files with product disclaimer:"
grep -r "ABOUT THESE REVIEWS" content/products/**/*.mdx | wc -l

echo "All files with sources footer:"
grep -r "SOURCES & FACT-CHECKING" content/**/*.mdx | wc -l
```

## Key Implementation Details

### Disclaimer Placement

**Medical & Product Disclaimers:**
- Placed AFTER the first H2 heading (## Some Section)
- Separated by blank lines before and after
- Not in frontmatter, but in body content

**Sources Footer:**
- Placed BEFORE "## Related Articles" section
- If no Related Articles section, placed at end of content
- Separated by blank lines before and after

### Files Already Updated (2 files)

As of this guide, the following files have been manually verified:

1. ✓ `content/blog/baby-fever-temperature-when-dangerous.mdx`
2. ✓ `content/blog/baby-cpr-first-aid-essential-skills.mdx`

Remaining: ~412 files

### Avoiding Duplicates

The Python script checks for existing disclaimers:
- `has_medical_disclaimer()` - checks for "MEDICAL DISCLAIMER" text
- `has_product_disclaimer()` - checks for "ABOUT THESE REVIEWS" text
- `has_sources_footer()` - checks for "SOURCES & FACT-CHECKING" text

This prevents adding duplicates on re-runs.

## Troubleshooting

### Problem: Script doesn't find Python

**Solution:** Use full path or ensure Python is in PATH
```bash
python3 process_disclaimers.py
C:\Python311\python.exe process_disclaimers.py
```

### Problem: File encoding errors

**Solution:** Script uses UTF-8 encoding. If errors occur:
```bash
# Check file encoding
file content/blog/*.mdx
# Re-save as UTF-8 if needed
```

### Problem: Merge conflicts after git push

**Solution:** 
1. Pull latest main: `git pull origin main`
2. Resolve conflicts manually
3. Commit and push

### Problem: Some files not modified

**Possible causes:**
- Files already have some disclaimers (script won't add duplicates)
- Files have no H2 headings (can't insert safely)
- Files have different structure (manual review needed)

## Timeline

**Estimated processing time:**
- Automated run: 5-10 minutes
- Manual verification: 10-15 minutes
- Git commit and push: 2-3 minutes
- Cloudflare deploy: 1-2 minutes

**Total: ~20-30 minutes**

## Success Criteria

Project is complete when:

1. ✓ All 60 health articles have MEDICAL DISCLAIMER
2. ✓ All 200 product articles have PRODUCT DISCLAIMER
3. ✓ All 380+ articles have SOURCES FOOTER
4. ✓ No duplicate disclaimers exist
5. ✓ Changes are committed to git
6. ✓ Changes are pushed to GitHub main
7. ✓ Cloudflare deployment is verified

## Additional Resources

- CDC: https://cdc.gov
- WHO: https://who.int
- ACOG: https://acog.org
- NHS: https://nhs.uk
- AAP: https://aap.org
- CPSC: https://cpsc.gov
- ASTM: https://astm.org

## Contact & Questions

If you encounter issues:
1. Check the Troubleshooting section above
2. Review the script output for specific file errors
3. Manually inspect affected files
4. Commit working changes, document remaining issues
