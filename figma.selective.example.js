// Example selective sync configuration for mortgage website
// Copy the relevant sections to your figma.config.js

export const mortgageIconSelection = {
  // Common icons for mortgage/finance websites
  iconNames: [
    // Navigation & UI
    'menu',
    'close',
    'arrow',
    'chevron',
    'search',
    'filter',
    
    // User & Account
    'user',
    'profile',
    'login',
    'logout',
    'settings',
    
    // Communication
    'phone',
    'email',
    'chat',
    'message',
    'notification',
    
    // Documents & Files
    'document',
    'file',
    'pdf',
    'download',
    'upload',
    'folder',
    
    // Financial
    'dollar',
    'money',
    'calculator',
    'chart',
    'graph',
    'bank',
    'credit-card',
    'wallet',
    
    // Property & Real Estate
    'home',
    'house',
    'building',
    'location',
    'map',
    'key',
    
    // Actions
    'edit',
    'delete',
    'add',
    'remove',
    'save',
    'share',
    
    // Status & Information
    'check',
    'info',
    'warning',
    'error',
    'success',
    'help',
    'question',
    
    // Time & Calendar
    'calendar',
    'clock',
    'time',
    'schedule',
    
    // Social Media
    'facebook',
    'twitter',
    'linkedin',
    'instagram',
    'youtube',
  ],
  
  // Component patterns for mortgage site
  componentNames: [
    // Navigation components
    'Header',
    'Footer',
    'NavBar',
    'Menu',
    
    // Form components
    'Button',
    'Input',
    'Select',
    'Checkbox',
    'Radio',
    
    // Content components
    'Card',
    'Hero',
    'CTA',
    'Testimonial',
    'FAQ',
    
    // Calculator components
    'Calculator',
    'Slider',
    'RateDisplay',
    
    // Specific mortgage components
    'MortgageCalculator',
    'RateComparison',
    'ApplicationForm',
    'PropertyCard',
  ],
  
  // Frame names to include
  includeFrames: [
    'Icons',
    'Components',
    'Mobile Icons',
    'Desktop Components',
    'Forms',
    'Navigation',
  ],
  
  // Pattern matching (regex)
  patterns: {
    icons: [
      '^Icon/',     // Any component starting with "Icon/"
      '/Icon$',     // Any component ending with "/Icon"
      'icon-',      // Any component containing "icon-"
    ],
    components: [
      '^Button/',   // All button variants
      '^Card/',     // All card variants
      '^Form/',     // All form elements
      'Calculator', // Anything with Calculator
    ],
  },
};

// To use this configuration:
// 1. Import this in your figma.config.js
// 2. Add the relevant sections to your selective configuration
// 3. Customize based on your actual Figma file structure