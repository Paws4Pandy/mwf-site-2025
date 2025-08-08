# Design Change Log

## December 2024 - Major Design System Update

### 🎨 **Background Color Standardization**
**Date:** December 2024  
**Files Modified:**
- `src/components/PageBackground.tsx`
- `src/pages/NotFound.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Perks.tsx`

**Changes:**
- ✅ Changed all page backgrounds from white to black (`bg-black`)
- ✅ Updated glass card backgrounds to use `bg-design-cream/20` for consistency
- ✅ Replaced `bg-pure-white` and `bg-white` with design system colors
- ✅ Updated border colors to use `border-design-plum/30` throughout

### 🎯 **Calculator Component Brand Integration**
**Date:** December 2024  
**Files Modified:**
- `src/components/calculator/MortgageCalculator.tsx`
- `src/pages/Calculator.tsx`

**Changes:**
- ✅ **Backgrounds:** Updated from green/gray to design system colors
  - Input panels: `bg-design-cream/20` with `border-design-plum/30`
  - Results panel: Gradient from `design-plum` → `design-charcoal` → `design-gold`
  - Breakdown panel: `bg-design-cream/20` with `border-design-plum/30`

- ✅ **Text Colors:**
  - Headings: `text-design-charcoal`
  - Labels: `text-design-charcoal`
  - Values: `text-design-plum`
  - Descriptions: `text-design-charcoal/80`

- ✅ **Interactive Elements:**
  - Sliders: Gradient from `design-sage/50` → `design-gold/50`
  - Checkboxes: `text-design-plum` with `focus:ring-design-plum`
  - Buttons: `bg-design-gold` with `hover:bg-design-plum`

- ✅ **Notifications:**
  - High down payment: `bg-design-gold/10` with `border-design-gold/30`
  - CMHC available: `bg-design-sage/20` with `border-design-sage/50`
  - Conventional mortgage: `bg-design-plum/10` with `border-design-plum/30`
  - CMHC required: `bg-design-gold/10` with `border-design-gold/30`
  - Not available: `bg-design-charcoal/10` with `border-design-charcoal/30`

### 🔤 **Typography System Update**
**Date:** December 2024  
**Files Modified:**
- `src/index.css`
- `tailwind.config.ts`
- `src/assets/config/typography.ts`
- `src/pages/Index.tsx`

**Changes:**
- ✅ **Font Import:** Added Noto Serif Display Google Font
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Display:ital,wght@1,400&display=swap');
  ```

- ✅ **Tailwind Config:** Added new font family
  ```typescript
  'noto-serif-display': ['Noto Serif Display', 'serif']
  ```

- ✅ **Typography Config:** Updated subheading font
  ```typescript
  subheading: {
    font: 'font-noto-serif-display', // Noto Serif Display Extra Condensed Regular Italics
    style: 'italic',
    // ... other properties
  }
  ```

- ✅ **Implementation:** Replaced `font-PRO-CRIMSON` with `font-noto-serif-display italic font-normal` on Index page

### 🎨 **Design System Color Palette**
**Active Colors:**
- **`design-charcoal` (#423E3A)**: Primary text and headings
- **`design-plum` (#844E6B)**: Accent text and interactive elements  
- **`design-sage` (#BBCEC9)**: Supporting backgrounds and notifications
- **`design-gold` (#DAB453)**: Premium CTAs and highlights
- **`design-cream` (#EFE0DF)**: Background overlays and cards

### 📁 **Files Created/Modified**
**New Files:**
- `src/assets/config/contact.ts` - Contact configuration
- `src/lib/constants/cmhc.ts` - CMHC calculation constants

**Modified Files:**
- `src/components/PageBackground.tsx`
- `src/components/calculator/MortgageCalculator.tsx`
- `src/pages/Calculator.tsx`
- `src/pages/Index.tsx`
- `src/pages/NotFound.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Perks.tsx`
- `src/index.css`
- `tailwind.config.ts`
- `src/assets/config/typography.ts`

### 🎯 **Result**
- ✅ All pages now have consistent black backgrounds
- ✅ Calculator fully integrated with brand color system
- ✅ Typography updated to use Noto Serif Display for elegant, professional appearance
- ✅ Glass morphism effects maintained throughout
- ✅ Design system consistency achieved across all components

### 🔧 **Technical Notes**
- All changes maintain responsive design principles
- Glass morphism effects preserved with backdrop blur
- Hover states and animations updated to match brand colors
- No breaking changes to existing functionality
- All linting errors resolved

### 🎨 **Calculator UI/UX Improvements**
**Date:** December 2024  
**Files Modified:**
- `src/pages/Calculator.tsx`
- `src/components/calculator/MortgageCalculator.tsx`
- `src/components/Header.tsx`
- `src/index.css`

**Changes:**
- ✅ **Page Title Styling:** Updated to use Noto Serif Display italic with color styling
  - "Mortgage" in `design-plum` color
  - "Calculator" in `design-gold` color
- ✅ **Header Integration:** Removed separator line for seamless page integration
- ✅ **Slider Improvements:**
  - Updated gradient to match monthly payment card (`design-plum/30` → `design-gold/50`)
  - Custom slider thumb styling with calming `design-sage` color
  - Gold border and hover effects on slider thumb
- ✅ **Text Readability:** Improved slider range text colors to `text-white/80` and `text-white/90`
- ✅ **Button Enhancement:** Yellow buttons now have black text for better strength and contrast
- ✅ **Layout Improvements:** Added extra padding above calculator and removed second sentence from description
- ✅ **Custom CSS:** Added comprehensive slider styling for both WebKit and Mozilla browsers

### 🎨 **Calculator Spacing & Visual Hierarchy Improvements**
**Date:** December 2024  
**Files Modified:**
- `src/components/calculator/MortgageCalculator.tsx`
- `src/pages/Calculator.tsx`
- `src/index.css`

**Changes:**
- ✅ **Improved Visual Hierarchy:** Increased spacing between major sections (`space-y-10`)
- ✅ **Tighter Slider Sections:** Reduced spacing between labels and sliders (`mb-2` instead of `mb-4`)
- ✅ **Compact Range Text:** Reduced margin above range text (`mt-1` instead of `mt-2`)
- ✅ **Enhanced Subheading Spacing:** Increased padding under page description (`mb-12` instead of `mb-8`)
- ✅ **Updated Slider Thumb:** Changed to light plum color (`#844E6B`) for better visual consistency
- ✅ **Better Section Separation:** Clear visual distinction between purchase price, down payment, and other sections

### 🎨 **Calculator Layout Reorganization & Improved Organization**
**Date:** December 2024  
**Files Modified:**
- `src/components/calculator/MortgageCalculator.tsx`

**Changes:**
- ✅ **Consistent Slider Spacing:** Updated interest rate and amortization sections to match purchase price/down payment spacing (`mb-2` instead of `mb-4`)
- ✅ **Reorganized Layout Structure:** Moved all checkboxes to a dedicated "Additional Options" card
- ✅ **Improved Visual Hierarchy:** Created clear separation between input controls, payment results, options, and CMHC breakdown
- ✅ **Consolidated Related Elements:** Conventional mortgage notice now appears in the same card as checkboxes for better logical grouping
- ✅ **Enhanced Developer Experience:** Clear component organization makes the code more maintainable
- ✅ **Better User Experience:** Related options are grouped together, making the interface more intuitive
- ✅ **Tighter Spacing:** Reduced checkbox sizes (`w-5 h-5` instead of `w-6 h-6`) and improved text sizing for better visual balance
- ✅ **Logical Information Flow:** Payment result → Options → CMHC breakdown → CTA

### 🎨 **Calculator Typography & Layout Final Improvements**
**Date:** December 2024  
**Files Modified:**
- `src/components/calculator/MortgageCalculator.tsx`
- `src/assets/config/typography.ts`

**Changes:**
- ✅ **Typography Standardization:** Updated all calculator text to use HK Grotesk Light 300 consistently
  - Labels, values, descriptions, and all body text now use `font-hk-grotesk-light font-light`
  - Payment card and headers remain unchanged as requested
- ✅ **Improved Readability:** Fixed calculation breakdown card colors
  - Changed from `text-design-plum` to `text-white` for better contrast against dark background
  - All text now uses consistent white color with proper opacity levels
- ✅ **Layout Reorganization:** Moved additional options card above CMHC breakdown
  - Better logical flow: Payment result → Options → CMHC breakdown → CTA
  - Improved user experience with related options grouped together
- ✅ **Removed Redundant Notices:** Eliminated CMHC insurance notice from right side cards
  - Removed "✓ CMHC Insurance Available" notice from down payment section
  - Cleaner, less cluttered interface
- ✅ **Updated Typography Config:** Set body text weight to `font-light` (300) for HK Grotesk
- ✅ **Consistent Font Application:** All calculator text now uses uniform font family and weight
- ✅ **Better Visual Hierarchy:** Clear separation between different card sections

---
*Last Updated: December 2024*
