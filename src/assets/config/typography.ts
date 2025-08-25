// Typography Configuration
// Uses centralized font configuration from fonts.ts

import { typographySystem, getH1Classes, getSubheadingClasses, getBodyClasses } from './fonts';

// Re-export the typography system for backward compatibility
export const typography = {
  h1: typographySystem.h1,
  subheading: typographySystem.subheading,
  body: typographySystem.body
} as const;

// Re-export CSS class builders
export { getH1Classes, getSubheadingClasses, getBodyClasses };