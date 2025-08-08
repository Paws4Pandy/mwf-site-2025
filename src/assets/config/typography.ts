// Typography Configuration
// Centralized typography styles for consistent design across all pages

export const typography = {
  // H1 - Main headings
  h1: {
    font: 'font-anton',
    spacing: 'tracking-normal', // 0 letter spacing
    lineHeight: 'leading-tight', // 1 line spacing
    size: 'text-4xl md:text-6xl',
    weight: 'font-normal'
  },
  
  // Subheading - Secondary headings
  subheading: {
    font: 'font-noto-serif-display', // Noto Serif Display Extra Condensed Regular Italics
    style: 'italic',
    spacing: 'tracking-normal', // 0 letter spacing  
    lineHeight: 'leading-tight', // 1 line spacing
    size: 'text-2xl md:text-3xl',
    weight: 'font-normal'
  },
  
  // Body text
  body: {
    font: 'font-hk-grotesk-light', // Using available HK Grotesk
    size: 'text-sm', // 14pt
    weight: 'font-light', // Light 300 weight
    lineHeight: 'leading-relaxed'
  }
} as const;

// CSS class builders
export const getH1Classes = (additionalClasses = '') => 
  `${typography.h1.font} ${typography.h1.spacing} ${typography.h1.lineHeight} ${typography.h1.size} ${typography.h1.weight} ${additionalClasses}`.trim();

export const getSubheadingClasses = (additionalClasses = '') => 
  `${typography.subheading.font} ${typography.subheading.style} ${typography.subheading.spacing} ${typography.subheading.lineHeight} ${typography.subheading.size} ${typography.subheading.weight} ${additionalClasses}`.trim();

export const getBodyClasses = (additionalClasses = '') => 
  `${typography.body.font} ${typography.body.size} ${typography.body.weight} ${typography.body.lineHeight} ${additionalClasses}`.trim();