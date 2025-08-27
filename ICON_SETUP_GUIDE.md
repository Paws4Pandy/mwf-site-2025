# Icon Setup Guide for Claude

## How to Add Icons to the Project

### 1. PNG/JPG Icons (Best for Complex 3D Icons)
- **Location:** `/src/components/icons/3d-icons/`
- **File size:** Keep under 100KB
- **Usage:** `<img src="/src/components/icons/3d-icons/filename.png" alt="description" />`
- **Example:** The piggy-bank-pink.png (42KB) is a good example

### 2. Simple SVG Icons (Best for Performance)
- **Location:** `/src/components/icons/`
- **Format:** Create as React components
- **Keep them simple with basic shapes
- **Usage:** Import and use as React components

### 3. Avoid Large Figma Icons
- The files in `/src/components/icons/figma/` are 700KB+ each (TOO LARGE!)
- These are auto-generated with unnecessary detail
- Don't use these unless optimized first

## Current Available Icons

### Good Icons (Reasonable Size):
- `/src/components/icons/3d-icons/piggy-bank-pink.png` (42KB)
- `/src/components/icons/3d-icons/paper.png` (53KB)
- `/public/BRX_brand_white.png` (restored)

### Too Large (Don't Use):
- `/src/components/icons/3d-icons/Gold-1.svg` (935KB)
- All files in `/src/components/icons/figma/` (700KB+ each)

## Best Practices
1. Use PNG/JPG for complex 3D-style icons (keep under 100KB)
2. Use simple SVG components for basic icons
3. Organize in clear folder structure
4. Name files descriptively
5. Always check file size before adding

## Quick Reference for Claude
When you ask "how do I add icons?", I'll know to:
- Check `/src/components/icons/3d-icons/` for PNG/JPG files
- Create simple SVG components if needed
- Avoid the large Figma icons
- Keep everything under 100KB for best performance