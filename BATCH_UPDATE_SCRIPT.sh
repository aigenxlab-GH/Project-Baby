#!/bin/bash

# Comprehensive batch update script for 180 blog articles
# Updates frontmatter and removes banned words
# Execute from: C:\AIGenXLab\Projects\Project-Baby

set -e

BLOG_DIR="content/blog"
LOG_FILE="article_transformation_log.txt"
PROCESSED_COUNT=0
FAILED_COUNT=0

echo "Starting batch transformation of blog articles..."
echo "Started at: $(date)" > "$LOG_FILE"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Find all MDX files
TOTAL_FILES=$(find "$BLOG_DIR" -name "*.mdx" | wc -l)
echo "Found $TOTAL_FILES MDX files to process"
echo "" >> "$LOG_FILE"

for file in "$BLOG_DIR"/*.mdx; do
    if [ -f "$file" ]; then
        PROCESSED_COUNT=$((PROCESSED_COUNT + 1))
        FILENAME=$(basename "$file")

        # Create backup
        cp "$file" "${file}.bak"

        # Update frontmatter
        sed -i "s/^updatedAt: '2026-06-05'/updatedAt: '2026-06-23'/" "$file"
        sed -i "s/^author: .*/author: PregnancySprout Editorial Team/" "$file"

        # Remove banned words (case-insensitive replacements)
        sed -i 's/\bcrucial\b/important/gI' "$file"
        sed -i 's/\bmoreover\b/also/gI' "$file"
        sed -i 's/\bdelve\b/explore/gI' "$file"
        sed -i 's/\btestament\b/sign/gI' "$file"
        sed -i 's/\bparamount\b/top priority/gI' "$file"
        sed -i 's/\bnavigate\b/manage/gI' "$file"
        sed -i 's/\bcomprehensive\b/thorough/gI' "$file"
        sed -i 's/\btremendous\b/amazing/gI' "$file"
        sed -i 's/\bastonishing\b/surprising/gI' "$file"
        sed -i 's/\bessential\b/key/gI' "$file"
        sed -i 's/\bfascinated\b/interested/gI' "$file"
        sed -i 's/\bextraordinary\b/remarkable/gI' "$file"
        sed -i 's/\brealm\b/area/gI' "$file"
        sed -i 's/\butilize\b/use/gI' "$file"
        sed -i 's/\boptimize\b/improve/gI' "$file"
        sed -i 's/\bfoster\b/encourage/gI' "$file"
        sed -i 's/\bfacilitate\b/make easier/gI' "$file"
        sed -i 's/\bto summarize\b/in short/gI' "$file"

        # Report progress every 20 files
        if (( PROCESSED_COUNT % 20 == 0 )); then
            echo -e "${GREEN}✓ Processed $PROCESSED_COUNT/$TOTAL_FILES files${NC}"
            echo "Progress: $PROCESSED_COUNT/$TOTAL_FILES at $(date)" >> "$LOG_FILE"
        fi
    fi
done

echo ""
echo "======================================"
echo -e "${GREEN}Batch transformation complete!${NC}"
echo "======================================"
echo "Total files processed: $TOTAL_FILES"
echo "Successfully updated: $PROCESSED_COUNT"
echo ""
echo "Completion time: $(date)" >> "$LOG_FILE"
echo "Successfully updated: $PROCESSED_COUNT" >> "$LOG_FILE"
