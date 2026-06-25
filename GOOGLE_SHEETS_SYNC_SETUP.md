# Google Sheets Auto-Sync Setup Guide

## Overview
This system lets you manage all affiliate links in ONE Google Sheet. Any updates automatically sync to your site.

---

## Step 1: Create Google Service Account

### 1a. Go to Google Cloud Console
1. Open https://console.cloud.google.com
2. Create a new project (or use existing)
3. Go to **APIs & Services** → **Credentials**

### 1b. Create Service Account
1. Click **+ Create Credentials** → **Service Account**
2. Fill in:
   - Service account name: `pregnancy-sprout-sync`
   - Click **Create and Continue**
3. Click **+ Create Key** → **JSON**
4. Download the JSON file

### 1c. Save Credentials
Save the downloaded JSON file as:
```
C:\AIGenXLab\Projects\Project-Baby\google-credentials.json
```

### 1d. Enable Google Sheets API
1. Go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click **Enable**

---

## Step 2: Create Google Sheet Template

### 2a. Create New Google Sheet
1. Go to https://sheets.google.com
2. Create new spreadsheet
3. Name it: **"Affiliate Links Master"**

### 2b. Set Column Headers (Row 1)
```
Category | Product Slug | ASIN | URL | Status | Notes
```

### 2c. Example Data
```
baby-bouncers | nuna-leaf-grow-review | B07D7ZJH9P | https://www.amazon.com/dp/B07D7ZJH9P?tag=pregnancysp0a-20 | active | High-end lounger
baby-bouncers | fisher-price-bouncer | B08T16G4VZ | https://www.amazon.com/dp/B08T16G4VZ?tag=pregnancysp0a-20 | active | Affordable option
```

### 2d. Share with Service Account
1. Copy the Service Account email from the JSON file (looks like: `xxx@xxx.iam.gserviceaccount.com`)
2. Share the Google Sheet with this email (give **Viewer** access)
3. Copy the Sheet URL: you'll need the Sheet ID

---

## Step 3: Run Sync Script

### 3a. First Sync Test
```bash
cd C:\AIGenXLab\Projects\Project-Baby
python sync_affiliate_links_from_sheet.py "Affiliate Links Master"
```

### 3b. Schedule Regular Syncs
Add to your deployment pipeline or run manually before pushing updates.

---

## Column Definitions

| Column | Purpose | Example |
|--------|---------|---------|
| **Category** | Product category folder | `baby-bouncers` |
| **Product Slug** | MDX filename (no .mdx) | `nuna-leaf-grow-review` |
| **ASIN** | Amazon product ID | `B07D7ZJH9P` |
| **URL** | Full affiliate link | `https://www.amazon.com/dp/B07D7ZJH9P?tag=pregnancysp0a-20` |
| **Status** | `active` or `skip` | `active` |
| **Notes** | Any notes (optional) | `Replaced broken link` |

---

## Workflow

1. **Find broken link** (manually or via validation)
2. **Open Google Sheet** "Affiliate Links Master"
3. **Find the product row**
4. **Update ASIN and URL** with working link
5. **Set Status to `active`**
6. **Save the sheet**
7. **Run sync script**: `python sync_affiliate_links_from_sheet.py`
8. **Push to GitHub** → Site deploys automatically

---

## Troubleshooting

### Error: "Failed to authenticate"
- Check `google-credentials.json` is in the right location
- Make sure you downloaded it from Google Cloud (not a regular Google account)

### Error: "File not found"
- Category folder doesn't exist
- Product slug doesn't match MDX filename
- Check that the MDX file actually exists in `content/products/[category]/`

### Changes not showing up
- Make sure you ran the sync script
- Check that the Google Sheet columns match exactly
- Make sure the Service Account has access to the sheet

---

## Adding New Products

1. Create the MDX file: `content/products/[category]/[slug].mdx`
2. Add a row to Google Sheet with that category and slug
3. Run sync script → link will be added automatically

---

## Next: Automated Deployment

Once working, you can add this to your CI/CD:
```bash
# Before push
python sync_affiliate_links_from_sheet.py "Affiliate Links Master"
git add content/
git commit -m "Sync affiliate links from sheet"
git push
```

This way, updates to the sheet automatically deploy to production!
