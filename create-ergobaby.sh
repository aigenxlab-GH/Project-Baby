#!/bin/bash

# Sanity Configuration
PROJECT_ID="mnwolxvz"
DATASET="production"
TOKEN="sklfTLYhf1CEEg6WYD8BgNjqTNGwKxnREXGcYRNNCnXezDkUpBSTzIoNSZ87jTal0u46IJRchXEMxG1ADLJ4mmQDzP9pan6uEOd8YS8JIRSywRh7uHLrNT5zQSOSN1cUFgrIegnobc4yEH8O2GqK5nFwHdZkeAqqcjXc6xIgvvfyzylDXsTt"

# API Endpoint
API_URL="https://${PROJECT_ID}.sanity.io/v2021-06-07/data/mutate/${DATASET}"

# Product Data (JSON)
PRODUCT_DATA='{
  "mutations": [
    {
      "create": {
        "_type": "productReview",
        "productName": "Ergobaby Omni 360 All-Position Baby Carrier",
        "brand": "Ergobaby",
        "slug": {
          "_type": "slug",
          "current": "ergobaby-omni-360-all-position-baby-carrier"
        },
        "category": "baby-carriers",
        "modelYear": 2026,
        "ourScore": 8.5,
        "priceRange": "premium",
        "description": "The Ergobaby Omni 360 is the most versatile baby carrier available today. Four ergonomic carry positions from newborn to 48 months, with premium comfort and premium price to match. An investment carrier for parents who value long-term wear comfort and developmental support.",
        "bottomLine": "The gold standard for multi-position carriers. If you will wear your baby daily for years, it pays for itself in comfort alone.",
        "bestFor": "Babywearing parents who want one carrier for newborn through toddler years. Active parents who carry for hours daily. Parents who prioritize ergonomic support and developmental positioning over budget constraints. Second-time parents who know their carrying preferences and want the best.",
        "pros": [
          "Four ergonomic carry positions (newborn to 48 months)",
          "Exceptional lumbar support for extended wear",
          "M-position design supports healthy hip development",
          "Adjustable for XS to XXL body types",
          "Excellent long-term durability and resale value",
          "Responsive customer service and replacement parts available",
          "Comfortable for 2+ hours of continuous wear"
        ],
        "cons": [
          "Premium price point (GBP 120-150) barriers for budget-conscious families",
          "Learning curve for switching between four positions",
          "Bulky when folded; not as portable as wraps",
          "Newborn insert adds one more piece to track",
          "Generates more heat than wraps in hot climates",
          "Harness adjustments take practice to perfect"
        ],
        "affiliateLinks": {
          "US": {"asin": "B0D5XCH6N5", "available": true, "price": "GBP 120-150"},
          "UK": {"asin": "B0FFH6XGB2", "available": true, "price": "GBP 120-150"},
          "CA": {"asin": "B0DX3PNK5F", "available": true, "price": "GBP 120-150"},
          "DE": {"asin": "B0BXSKVFXK", "available": true, "price": "GBP 120-150"},
          "FR": {"asin": "B0FFH6TP13", "available": true, "price": "GBP 120-150"},
          "IT": {"asin": "B0FFH6TP13", "available": true, "price": "GBP 120-150"},
          "ES": {"asin": "B0BXSKVFXK", "available": true, "price": "GBP 120-150"}
        },
        "specsTable": [
          {"_key": "key-1", "key": "Brand", "value": "Ergobaby"},
          {"_key": "key-2", "key": "Carrier Type", "value": "Structured with newborn insert"},
          {"_key": "key-3", "key": "Age Range", "value": "Newborn (with insert) - 48 months"},
          {"_key": "key-4", "key": "Weight Capacity", "value": "3.2kg - 15kg"},
          {"_key": "key-5", "key": "Carry Positions", "value": "4 (front inward, front outward, hip, back)"},
          {"_key": "key-6", "key": "Material", "value": "Cotton & polyester blend"},
          {"_key": "key-7", "key": "Folded Size", "value": "23.5 x 17.1 inches"},
          {"_key": "key-8", "key": "Newborn Insert", "value": "Included"},
          {"_key": "key-9", "key": "Safety", "value": "CPSC tested, hip dysplasia ergonomics approved"}
        ],
        "faqs": [
          {"_key": "faq-1", "q": "Is the Omni 360 worth the price compared to budget carriers?", "a": "If you will wear your baby 15+ hours weekly for multiple years, yes. The per-hour cost becomes competitive, and the comfort premium prevents back pain that cheaper carriers often cause. For occasional wear, a budget carrier works fine."},
          {"_key": "faq-2", "q": "Can I use it from newborn without the insert?", "a": "No. The newborn insert is necessary for proper support from birth. Without it, safe use begins around 5-6 months when babies can sit with minimal support."},
          {"_key": "faq-3", "q": "How long does the learning curve take?", "a": "5-10 minutes to understand four positions; 30 seconds to switch between them after practice. Most parents are comfortable within a week."},
          {"_key": "faq-4", "q": "Is it safe for hip dysplasia prevention?", "a": "Yes. The M-position design (legs bent, knees higher than hips) is researched and supports healthy hip socket development. This is a genuine safety advantage over carriers that let legs dangle."},
          {"_key": "faq-5", "q": "What is the warranty?", "a": "1-year standard warranty covers defects. Replacement parts are available for GBP 25-40 (straps, belts), making repairs feasible for years beyond warranty."}
        ],
        "title": "Ergobaby Omni 360 All-Position Baby Carrier Review 2026 - Worth the Premium Price?",
        "tags": ["baby-carriers", "newborn-carriers", "ergonomic-carriers", "babywearing", "toddler-carriers", "structured-carriers", "long-term-carriers", "lumbar-support", "hip-dysplasia", "premium-carriers"],
        "featured": false,
        "published": false,
        "author": "Michael Thompson",
        "publishedAt": "2026-07-01T00:00:00Z",
        "updatedAt": "2026-07-01T00:00:00Z"
      }
    }
  ]
}'

echo "Creating Ergobaby Omni 360 product in Sanity..."
echo ""

# Make the API request
RESPONSE=$(curl -s -X POST \
  "$API_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "$PRODUCT_DATA")

# Parse response
DOC_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)

if [ -n "$DOC_ID" ]; then
  echo "✅ SUCCESS! Product created in Sanity"
  echo "📄 Document ID: $DOC_ID"
  echo ""
  echo "Status: DRAFT (unpublished)"
  echo "Next: Log into Sanity Studio, add product image, and publish"
else
  echo "❌ ERROR creating product"
  echo ""
  echo "Response:"
  echo "$RESPONSE"
  exit 1
fi
