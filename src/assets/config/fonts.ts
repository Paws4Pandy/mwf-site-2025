// Centralized Font Configuration
// SIMPLIFIED: Only Anton for H1 and Roboto Flex for everything else

/**
 * Font Import URLs
 */
export const fontImports = [
  // Anton for H1 headings
  'https://fonts.googleapis.com/css2?family=Anton:wght@400&display=swap',
  // Roboto Flex with variable weight for body and subheadings
  'https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;700&display=swap'
];

/**
 * Font Family Definitions
 */
export const fontFamilies = {
  anton: ['Anton', 'sans-serif'],
  robotoFlex: ['Roboto Flex', 'sans-serif']
} as const;

/**
 * Tailwind Font Classes
 */
export const fontClasses = {
  anton: 'font-anton',
  robotoFlex: 'font-roboto-flex'
} as const;

/**
 * Typography System
 * Clean, simple typography with only two fonts
 */
export const typographySystem = {
  // H1 - Main headings (Anton)
  h1: {
    fontClass: fontClasses.anton,
    size: 'text-4xl md:text-6xl',
    weight: 'font-normal',
    lineHeight: 'leading-tight',
    spacing: 'tracking-normal'
  },
  
  // Subheading - Secondary headings (Roboto Flex Bold)
  subheading: {
    fontClass: fontClasses.robotoFlex,
    size: 'text-2xl md:text-3xl',
    weight: 'font-bold', // 700 weight
    lineHeight: 'leading-tight',
    spacing: 'tracking-normal'
  },
  
  // Body text (Roboto Flex Regular)
  body: {
    fontClass: fontClasses.robotoFlex,
    size: 'text-base',
    weight: 'font-normal', // 400 weight
    lineHeight: 'leading-relaxed',
    spacing: 'tracking-normal'
  }
} as const;

/**
 * CSS Class Builders
 */
export const getH1Classes = (additionalClasses = '') => 
  `${typographySystem.h1.fontClass} ${typographySystem.h1.size} ${typographySystem.h1.weight} ${typographySystem.h1.lineHeight} ${typographySystem.h1.spacing} ${additionalClasses}`.trim();

export const getSubheadingClasses = (additionalClasses = '') => 
  `${typographySystem.subheading.fontClass} ${typographySystem.subheading.size} ${typographySystem.subheading.weight} ${typographySystem.subheading.lineHeight} ${typographySystem.subheading.spacing} ${additionalClasses}`.trim();

export const getBodyClasses = (additionalClasses = '') => 
  `${typographySystem.body.fontClass} ${typographySystem.body.size} ${typographySystem.body.weight} ${typographySystem.body.lineHeight} ${typographySystem.body.spacing} ${additionalClasses}`.trim();

/**
 * Get Tailwind config fontFamily object
 */
export const getTailwindFontConfig = () => {
  return {
    'anton': fontFamilies.anton,
    'roboto-flex': fontFamilies.robotoFlex,
    // Set Roboto Flex as default sans font
    'sans': fontFamilies.robotoFlex
  };
};