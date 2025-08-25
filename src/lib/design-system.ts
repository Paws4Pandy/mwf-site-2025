/**
 * UNIFIED DESIGN SYSTEM
 * Single source of truth for all design tokens
 * No hardcoding allowed - everything from this file
 */

// ==================== BRAND COLORS ====================
export const brandColors = {
  // Primary Brand Colors
  primary: {
    black: '#000000',      // Primary text
    white: '#ffffff',      // Background
    red: '#8c3839',        // Primary accent
    gold: '#DAB453',       // Premium CTAs
    green: '#2b4743',      // Secondary text/Hunter green
  },
  
  // Supporting Colors
  supporting: {
    azure: '#cedeeb',      // Light backgrounds
    crimson: '#ffd3db',    // Soft accents  
    brandRed: '#da7073',   // CTA highlights
    grayOrange: '#dda83f', // Warning/attention
    charcoal: '#423E3A',   // Authoritative text
    lilac: '#A79FC7',      // Sophisticated accent
    sage: '#BBCEC9',       // Supporting backgrounds
    cream: '#EFE0DF',      // Warm background
  },
  
  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Glass/Transparency Effects
  glass: {
    overlay: 'rgba(0, 0, 0, 0.1)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

// ==================== TYPOGRAPHY SYSTEM ====================
export const typography = {
  // Font Families (Google Fonts)
  fonts: {
    display: ['Anton', 'sans-serif'],           // Headings/Branding
    body: ['Roboto Flex', 'sans-serif'],       // Body text/UI
    mono: ['Roboto Mono', 'monospace'],        // Code/Numbers
  },
  
  // Font Scales
  scales: {
    // Mobile-first responsive scales
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px  
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
    '5xl': 'text-5xl',  // 48px
    '6xl': 'text-6xl',  // 60px
  },
  
  // Typography Presets (No Hardcoding)
  presets: {
    h1: {
      font: 'font-anton',
      size: 'text-4xl md:text-6xl',
      weight: 'font-normal',
      color: 'text-white',
      spacing: 'tracking-normal',
      leading: 'leading-tight',
    },
    h2: {
      font: 'font-anton', 
      size: 'text-3xl md:text-4xl',
      weight: 'font-normal',
      color: 'text-design-gold',
      spacing: 'tracking-normal',
      leading: 'leading-tight',
    },
    h3: {
      font: 'font-roboto-flex',
      size: 'text-2xl md:text-3xl', 
      weight: 'font-bold',
      color: 'text-design-charcoal',
      spacing: 'tracking-normal',
      leading: 'leading-tight',
    },
    body: {
      font: 'font-roboto-flex',
      size: 'text-base',
      weight: 'font-normal',
      color: 'text-design-charcoal/90',
      spacing: 'tracking-normal',
      leading: 'leading-relaxed',
    },
    caption: {
      font: 'font-roboto-flex',
      size: 'text-sm',
      weight: 'font-medium',
      color: 'text-design-charcoal/70',
      spacing: 'tracking-normal',
      leading: 'leading-normal',
    },
    button: {
      font: 'font-roboto-flex',
      size: 'text-base',
      weight: 'font-semibold',
      color: 'text-white',
      spacing: 'tracking-wide',
      leading: 'leading-none',
    },
  },
} as const;

// ==================== SPACING SYSTEM ====================
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
} as const;

// ==================== BREAKPOINTS ====================
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ==================== COMPONENT VARIANTS ====================
export const components = {
  button: {
    primary: {
      bg: 'bg-design-gold',
      hover: 'hover:bg-design-gold/90',
      text: 'text-white',
      border: 'border-transparent',
      shadow: 'shadow-lg',
      animation: 'hover:animate-premium-glow',
    },
    secondary: {
      bg: 'bg-white/10',
      hover: 'hover:bg-white/20',
      text: 'text-white',
      border: 'border-white/20',
      shadow: 'shadow-md',
      backdrop: 'backdrop-blur-sm',
    },
    ghost: {
      bg: 'bg-transparent',
      hover: 'hover:bg-design-gold/10',
      text: 'text-design-gold',
      border: 'border-design-gold/30',
      shadow: 'shadow-none',
    },
  },
  
  card: {
    glass: {
      bg: 'bg-white/10',
      border: 'border-white/20',
      backdrop: 'backdrop-blur-sm',
      shadow: 'shadow-2xl',
      rounded: 'rounded-3xl',
    },
    solid: {
      bg: 'bg-white',
      border: 'border-design-sage/20',
      shadow: 'shadow-xl',
      rounded: 'rounded-2xl',
    },
  },
} as const;

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get typography class string (No hardcoding)
 */
export const getTypographyClasses = (preset: keyof typeof typography.presets, additionalClasses = '') => {
  const p = typography.presets[preset];
  return `${p.font} ${p.size} ${p.weight} ${p.color} ${p.spacing} ${p.leading} ${additionalClasses}`.trim();
};

/**
 * Get button variant classes
 */
export const getButtonClasses = (variant: keyof typeof components.button, additionalClasses = '') => {
  const btn = components.button[variant];
  const base = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300';
  return `${base} ${btn.bg} ${btn.hover} ${btn.text} ${btn.border} ${btn.shadow} ${btn.animation || ''} ${btn.backdrop || ''} ${additionalClasses}`.trim();
};

/**
 * Get card variant classes
 */
export const getCardClasses = (variant: keyof typeof components.card, additionalClasses = '') => {
  const card = components.card[variant];
  const base = 'p-6';
  return `${base} ${card.bg} ${card.border} ${card.shadow} ${card.rounded} ${card.backdrop || ''} ${additionalClasses}`.trim();
};

/**
 * Get color value (for inline styles when needed)
 */
export const getColor = (colorPath: string) => {
  const keys = colorPath.split('.');
  let current: any = brandColors;
  
  for (const key of keys) {
    current = current?.[key];
  }
  
  return current || '#000000';
};

/**
 * Responsive utilities
 */
export const responsive = {
  mobile: 'block md:hidden',
  desktop: 'hidden md:block',
  container: 'container mx-auto px-4',
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2', 
    desktop: 'lg:grid-cols-3',
    wide: 'xl:grid-cols-4',
  },
} as const;

// ==================== FONT LOADING CONFIG ====================
export const fontConfig = {
  // Google Fonts URLs (Single source)
  imports: [
    'https://fonts.googleapis.com/css2?family=Anton:wght@400&display=swap',
    'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700&display=swap',
  ],
  
  // Tailwind config
  tailwindFontFamily: {
    'anton': typography.fonts.display,
    'roboto-flex': typography.fonts.body,
    'sans': typography.fonts.body, // Default
  },
};

// ==================== ANIMATIONS ====================
export const animations = {
  // Gradient background animation
  gradientShift: 'animate-[gradientShift_15s_ease_infinite]',
  
  // Premium effects
  premiumGlow: 'animate-premium-glow',
  float: 'animate-float',
  fadeIn: 'animate-fade-in',
  
  // Staggered animations
  stagger: {
    1: 'animate-fade-in-delay-1',
    2: 'animate-fade-in-delay-2', 
    3: 'animate-fade-in-delay-3',
    4: 'animate-fade-in-delay-4',
    5: 'animate-fade-in-delay-5',
    6: 'animate-fade-in-delay-6',
  },
} as const;

// ==================== EXPORT ALL ====================
export default {
  colors: brandColors,
  typography,
  spacing,
  breakpoints,
  components,
  responsive,
  fontConfig,
  animations,
  
  // Utility functions
  getTypographyClasses,
  getButtonClasses,
  getCardClasses,
  getColor,
};