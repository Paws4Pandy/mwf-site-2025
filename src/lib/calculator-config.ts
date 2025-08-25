/**
 * CENTRALIZED CALCULATOR CONFIGURATION
 * Single source of truth for all calculator styling and behavior
 * No hardcoding allowed
 */

import { getTypographyClasses, getButtonClasses, getCardClasses } from './design-system';

// ==================== CALCULATOR STYLING PRESETS ====================
export const calculatorStyles = {
  // Main container
  container: {
    wrapper: 'max-w-4xl mx-auto',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
  },
  
  // Typography presets (using design system)
  typography: {
    title: getTypographyClasses('h2', 'mb-8 text-center'),
    sectionTitle: getTypographyClasses('h3', 'mb-6'),
    label: 'text-2xl font-roboto-flex font-semibold text-design-gold mb-2',
    value: 'font-roboto-flex font-bold text-design-gold',
    helper: 'text-lg text-white/80 font-roboto-flex',
    result: 'text-3xl font-roboto-flex font-bold text-white',
    resultLabel: 'text-xl font-roboto-flex font-medium text-white/80',
  },
  
  // Form elements
  form: {
    group: 'space-y-4',
    slider: {
      track: 'w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer',
      thumb: 'appearance-none h-6 w-6 bg-design-gold rounded-full cursor-pointer border-2 border-white shadow-lg',
      container: 'relative',
    },
    range: {
      container: 'flex justify-between text-lg text-white/80 mt-1',
      min: 'text-white/60',
      max: 'text-white/60',
    },
    checkbox: {
      container: 'flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10',
      input: 'w-5 h-5 rounded border-white/30 bg-white/10 text-design-gold focus:ring-design-gold focus:border-design-gold',
      label: 'text-white font-roboto-flex font-medium',
      description: 'text-white/70 font-roboto-flex text-sm mt-1',
    },
  },
  
  // Results display
  results: {
    card: getCardClasses('glass', 'border-design-gold/20'),
    grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
    item: {
      container: 'text-center p-4 bg-white/5 rounded-lg border border-white/10',
      value: 'text-3xl font-roboto-flex font-bold text-design-gold',
      label: 'text-white/80 font-roboto-flex text-sm mt-1',
    },
    warning: {
      container: 'mt-4 p-4 bg-design-red/10 border border-design-red/20 rounded-lg',
      text: 'text-white font-roboto-flex',
      highlight: 'text-design-crimson font-semibold',
    },
    tip: {
      container: 'mt-4 p-4 bg-design-gold/10 border border-design-gold/20 rounded-lg',
      text: 'text-white font-roboto-flex',
      highlight: 'text-design-gold font-semibold',
    },
  },
  
  // Action buttons
  actions: {
    primary: getButtonClasses('primary', 'w-full mb-4'),
    secondary: getButtonClasses('secondary', 'w-full'),
    group: 'space-y-3 mt-6',
  },
} as const;

// ==================== CALCULATOR PRESETS ====================
export const calculatorDefaults = {
  mortgage: {
    purchasePrice: {
      min: 100000,
      max: 5000000,
      step: 10000,
      default: 1000000,
    },
    downPayment: {
      minPercent: 5, // 5% minimum
      step: 1000,
    },
    interestRate: {
      min: 1.0,
      max: 10.0,
      step: 0.01,
      default: 5.5,
    },
    amortization: {
      options: [15, 20, 25, 30],
      default: 25,
    },
  },
  
  landTransferTax: {
    propertyValue: {
      min: 100000,
      max: 10000000,
      step: 10000,
      default: 800000,
    },
    rebates: {
      firstTimeBuyer: 4000,
      newBuild: 13000,
    },
  },
} as const;

// ==================== CALCULATOR MESSAGES ====================
export const calculatorMessages = {
  mortgage: {
    title: 'Mortgage Payment Calculator',
    subtitle: 'Get instant payment estimates with live rates',
    labels: {
      purchasePrice: 'Purchase Price',
      downPayment: 'Down Payment',
      interestRate: 'Interest Rate',
      amortization: 'Amortization Period',
      firstTimeBuyer: 'First-Time Home Buyer',
      newBuild: 'New Construction',
    },
    results: {
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      cmhcPremium: 'CMHC Premium',
      totalCost: 'Total Cost',
    },
    warnings: {
      lowDownPayment: 'Down payment below 20% requires CMHC insurance',
      maxAmortization: 'Amortization over 25 years increases total interest significantly',
    },
    tips: {
      firstTimeBuyer: 'First-time buyers may qualify for additional rebates and programs',
      rateNegotiation: 'Posted rates are often negotiable - contact us for better rates',
    },
  },
  
  landTransferTax: {
    title: 'Land Transfer Tax Calculator',
    subtitle: 'Calculate your land transfer tax costs in Ontario',
    labels: {
      propertyValue: 'Property Value',
      firstTimeBuyer: 'First-Time Home Buyer (up to $4,000 rebate)',
      newBuild: 'New Construction (up to $13,000 rebate)',
    },
    results: {
      provincialTax: 'Provincial LTT',
      municipalTax: 'Municipal LTT',
      totalTax: 'Total Tax',
      rebate: 'Rebate',
      netTax: 'Net Amount Due',
    },
  },
} as const;

// ==================== FORM VALIDATION ====================
export const calculatorValidation = {
  mortgage: {
    purchasePrice: {
      min: calculatorDefaults.mortgage.purchasePrice.min,
      max: calculatorDefaults.mortgage.purchasePrice.max,
      required: true,
      message: 'Purchase price must be between $100,000 and $5,000,000',
    },
    downPayment: {
      minPercent: 5,
      maxPercent: 100,
      required: true,
      validate: (downPayment: number, purchasePrice: number) => {
        const minDown = Math.max(purchasePrice * 0.05, 25000);
        return downPayment >= minDown;
      },
      message: 'Minimum 5% down payment required ($25,000 minimum)',
    },
    interestRate: {
      min: calculatorDefaults.mortgage.interestRate.min,
      max: calculatorDefaults.mortgage.interestRate.max,
      required: true,
      message: 'Interest rate must be between 1.0% and 10.0%',
    },
  },
} as const;

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get calculator style classes by type and element
 */
export const getCalculatorClass = (type: keyof typeof calculatorStyles, element: string) => {
  const typeStyles = calculatorStyles[type] as any;
  return typeStyles[element] || '';
};

/**
 * Get calculator default values
 */
export const getCalculatorDefaults = (calculatorType: keyof typeof calculatorDefaults) => {
  return calculatorDefaults[calculatorType];
};

/**
 * Get calculator messages
 */
export const getCalculatorMessages = (calculatorType: keyof typeof calculatorMessages) => {
  return calculatorMessages[calculatorType];
};

/**
 * Validate calculator input
 */
export const validateCalculatorInput = (
  calculatorType: keyof typeof calculatorValidation,
  field: string,
  value: any,
  context?: any
) => {
  const validation = (calculatorValidation as any)[calculatorType]?.[field];
  if (!validation) return { isValid: true, message: '' };
  
  if (validation.required && (value === null || value === undefined || value === '')) {
    return { isValid: false, message: `${field} is required` };
  }
  
  if (validation.min && value < validation.min) {
    return { isValid: false, message: validation.message };
  }
  
  if (validation.max && value > validation.max) {
    return { isValid: false, message: validation.message };
  }
  
  if (validation.validate && typeof validation.validate === 'function') {
    const isValid = validation.validate(value, context);
    if (!isValid) {
      return { isValid: false, message: validation.message };
    }
  }
  
  return { isValid: true, message: '' };
};

// ==================== RESPONSIVE BREAKPOINTS ====================
export const calculatorBreakpoints = {
  mobile: 'lg:grid-cols-1',
  tablet: 'lg:grid-cols-2', 
  desktop: 'xl:grid-cols-2',
} as const;

export default {
  styles: calculatorStyles,
  defaults: calculatorDefaults,
  messages: calculatorMessages,
  validation: calculatorValidation,
  breakpoints: calculatorBreakpoints,
  
  // Utility functions
  getCalculatorClass,
  getCalculatorDefaults,
  getCalculatorMessages,
  validateCalculatorInput,
};