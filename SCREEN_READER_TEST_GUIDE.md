# Screen Reader Testing Guide - PregnancySprout

## Tools Required
- **Windows:** NVDA (free, open-source) - Download: https://www.nvaccess.org/
- **macOS:** VoiceOver (built-in) - Enable: System Preferences > Accessibility > VoiceOver
- **Testing Time:** ~30-45 minutes

---

## Test Scenarios

### 1. Homepage Navigation (5 min)
**Using:** NVDA + Firefox/Chrome

1. Start NVDA (Ctrl+Alt+N)
2. Navigate to home page
3. **Expected:** 
   - Logo announced as "PregnancySprout, link"
   - Skip to content link focusable before main nav
   - Main nav has `aria-label="Main navigation"`
   - All links in header are keyboard accessible (Tab to navigate)
   - Theme toggle announces as "Switch to dark/light mode" + `aria-pressed` state

**Test Commands:**
- `H` = Jump to next heading
- `Tab` = Navigate forward through interactive elements
- `Shift+Tab` = Navigate backward
- `Enter` = Activate button/link

---

### 2. Blog Article Page (8 min)
**Route:** `/blog/[slug]` (e.g., any published blog post)

1. Load article page with screen reader
2. **Expected:**
   - Medical disclaimer announces as alert (`role="alert"`)
   - Heading structure: H1 (title) > H2 (sections) > H3 (subsections)
   - NO heading skips (e.g., H1 → H3 is bad)
   - Author, publish date, update date announced clearly
   - Reading time announced (X min read)
   - Links have descriptive text (not "click here")
   - Images have alt text (view source to verify)

**Checklist:**
- [ ] No heading hierarchy violations
- [ ] Medical disclaimer announced as warning
- [ ] Article metadata (author, dates) clear
- [ ] All links descriptive
- [ ] Images have alt text

---

### 3. Product Review Page (8 min)
**Route:** `/products/[category]/[slug]` (e.g., any product)

1. Load product page with screen reader
2. **Expected:**
   - "Thoroughly Reviewed" badge announces clearly
   - Product name (H1) appears first
   - Pros/Cons lists announce as lists (`<ul>` > `<li>`)
   - Rating/score box has proper structure
   - Specs table has:
     - `<caption>` describing table
     - `<thead>` with `<th scope="col">`
     - Proper cell headers
   - Affiliate disclosure announces prominently
   - All buttons have descriptive labels

**Checklist:**
- [ ] Table properly marked with `<caption>` and `scope`
- [ ] Lists announce as lists
- [ ] Buttons have aria-labels where needed
- [ ] Affiliate disclosure is discoverable

---

### 4. Dropdown Navigation (5 min)
**Using:** NVDA + keyboard only

1. Navigate to header
2. Tab to "Products" dropdown button
3. **Expected:**
   - Button announces as "Products, Menu, not expanded"
   - Press Space/Enter to expand
   - Button now announces "expanded"
   - Arrow Down key navigates to submenu items
   - Escape key closes dropdown

**Checklist:**
- [ ] Dropdown announces state (`aria-expanded`)
- [ ] Keyboard navigation works (Arrow keys, Escape)
- [ ] Focus visible indicator shows on all items

---

### 5. Form - Newsletter Signup (5 min)
**Using:** NVDA on newsletter form (any page)

1. Tab to email input
2. **Expected:**
   - Form field role announced
   - Label associated (`<label htmlFor>`)
   - No aria-required needed (HTML `required` attr sufficient)
   - Privacy statement readable
   - Button announces as "Subscribe"
   - Success message announces as `role="status"` or `role="alert"`

**Checklist:**
- [ ] Input has associated label
- [ ] Form is completable with keyboard alone
- [ ] Success/error messages announced

---

### 6. Pregnancy Week Page (8 min)
**Route:** `/pregnancy/week-by-week/[week]` (e.g., week-12)

1. Load page with NVDA
2. **Expected:**
   - Medical disclaimer announces at top
   - Week number announced in heading (H1)
   - Baby development list announces as list
   - Symptoms section announces as list
   - Tips section announces as ordered/unordered list
   - Progress bar: announced as status (not interactive)
   - Checklist items interactive and keyboard accessible

**Checklist:**
- [ ] All lists properly marked
- [ ] Medical disclaimer prominent
- [ ] No interactive elements without labels

---

## Quick Keyboard Navigation Test

**Every page should support:**
- `Tab` = Move forward through interactive elements
- `Shift+Tab` = Move backward
- `Enter` = Activate button/link
- `Space` = Toggle checkbox/button
- `Escape` = Close modal/dropdown
- `Arrow Keys` = Navigate within menu/tab list

---

## Common Issues to Watch For

### ❌ **FAIL: Missing Alt Text on Images**
```jsx
// Bad
<img src="baby.jpg" /> 
// Good
<img src="baby.jpg" alt="Happy baby playing with soft toys" />
```

### ❌ **FAIL: Non-Descriptive Link Text**
```jsx
// Bad
<a href="/product">Click here</a>
// Good
<a href="/product">Read full Best Stroller Review</a>
```

### ❌ **FAIL: Missing Form Labels**
```jsx
// Bad
<input type="email" placeholder="Enter email" />
// Good
<label htmlFor="email">Email address</label>
<input id="email" type="email" />
```

### ❌ **FAIL: No Focus Visible Indicator**
- All interactive elements should have visible focus ring
- Test: Tab through page, can you see where focus is?

### ✅ **PASS: Proper Heading Hierarchy**
```jsx
// Good
<h1>Main Topic</h1>
<h2>Section 1</h2>
<h3>Subsection</h3>
<h2>Section 2</h2>
```

---

## NVDA Commands Cheat Sheet

| Command | Action |
|---------|--------|
| `Ctrl+Alt+N` | Start NVDA |
| `H` | Next heading |
| `Shift+H` | Previous heading |
| `L` | Next list |
| `Tab` | Next focusable element |
| `Shift+Tab` | Previous focusable element |
| `F` | Next form field |
| `A` | Next article |
| `D` | Next landmark (nav, main, etc) |
| `Enter` | Activate button/link |
| `Space` | Toggle checkbox |
| `Alt+Down` | Navigate dropdown |

---

## Accessibility Pass Criteria

✅ **MUST PASS:**
1. All links have descriptive text (not "click here")
2. All images have alt text (or marked as decorative)
3. No heading hierarchy skips (H1 → H2 → H3, not H1 → H3)
4. All form inputs have associated labels
5. All interactive elements keyboard accessible
6. Focus indicator visible on all elements
7. Medical disclaimers announce as alerts/warnings
8. Dropdowns have `aria-expanded` state
9. Color not sole means of conveying information

✅ **SHOULD PASS:**
1. Page landmarks (banner, nav, main, contentinfo) present
2. Skip to main content link works
3. Table structure proper (caption, headers, scope)
4. Lists properly marked (no fake lists with divs)
5. ARIA labels where needed (buttons without text, icons, etc)

---

## Reporting Issues

If you find accessibility issues:
1. Note the page URL
2. Describe what screen reader says vs. expected
3. Note which NVDA/browser combination
4. Report at: `/contact` → "Accessibility Issue"

---

## Expected Improvements (This Round)

- ✅ Skip to content link (was present, enhanced)
- ✅ ARIA labels on dropdown toggles
- ✅ Medical disclaimer with `role="alert"`
- ✅ Table captions & scope attributes
- ✅ Focus visible outlines on all interactive elements
- ✅ Author/date metadata clearly announced
- ✅ Form privacy statement linked
- ✅ Header with `role="banner"`
- ✅ Footer with `role="contentinfo"`

---

**Last Updated:** June 2026  
**Target Accessibility Score:** 9.2/10 (from 7.5/10)
