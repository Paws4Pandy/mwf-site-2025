/**
 * CENTRALIZED CALCULATOR CONFIGURATION
 * Single source of truth for all calculator styling and behavior
 * No hardcoding allowed - ALL UI MUST USE THIS CONFIG
 */

import { getTypographyClasses, getButtonClasses, getCardClasses } from './design-system';

// ==================== CALCULATOR STYLING PRESETS ====================
export const calculatorStyles = {
  // Main container - Updated per user requirements
  container: {
    wrapper: 'max-w-7xl mx-auto', // Wider container
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16', // More spacing between cards
    fullWidth: 'w-full', // Full width elements
    stressTestLayout: 'space-y-8', // Epic full-width stress test layout
    halfWidthGrid: 'grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8', // Half-width cards below
  },
  
  // Typography presets (using design system)
  typography: {
    title: getTypographyClasses('h2', 'mb-8 text-center'),
    sectionTitle: getTypographyClasses('h3', 'mb-6'),
    subHeading: 'text-2xl font-serif italic text-white font-normal', // 2px larger, Roboto Serif italics, white
    label: 'text-2xl font-medium text-white/90 font-body', // Calculator labels - White/muted
    value: 'font-bold text-[#F7A279] font-calculator', // Values in labels - CORAL
    helper: 'text-xl text-white/80 font-calculator', // Helper text
    result: 'text-4xl font-bold text-white font-calculator', // Main result
    resultLabel: 'text-xl font-medium text-gray-100 font-body', // Result labels
    sectionHeader: 'text-3xl font-bold text-white font-display', // Section headers
    bodyText: 'text-xl text-white/80 font-body leading-relaxed', // Body text
  },
  
  // Color scheme - Updated with coral accent
  colors: {
    primary: '#F7A279', // Coral color per user requirement
    secondary: '#228F9D', // Teal for buttons per user requirement
    accent: 'design-charcoal',
    highlight: '#F7A279', // Changed from gold to coral
    warning: '#F7A279', // Coral instead of gold
    success: 'green-500',
    error: 'red-500',
  },
  
  // Form elements
  form: {
    group: 'space-y-6', // More spacing
    groupEpic: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8', // Epic grid layout for stress test
    slider: {
      track: 'w-full h-[2px] bg-gradient-to-r from-black to-[#F7A279] rounded-lg appearance-none cursor-pointer slider-custom',
      container: 'relative',
      thumb: 'w-5 h-5 bg-white rounded-full cursor-pointer border-2 border-white shadow-lg', // White dot
    },
    range: {
      container: 'flex justify-between text-xl text-white/80 mt-1 font-calculator',
      min: 'text-white/80',
      max: 'text-white/80',
    },
    checkbox: {
      container: 'flex items-center space-x-3 cursor-pointer',
      input: 'w-5 h-5 text-design-lilac focus:ring-design-lilac border-design-charcoal/30 rounded',
      label: 'text-xl font-semibold text-white font-display',
      description: 'text-design-lilac text-xl font-medium mt-1 ml-8 font-body leading-relaxed',
    },
  },
  
  // Card styles - NO gradient on payment card per user requirement
  cards: {
    inputCard: 'AGlassCard hover:shadow-2xl transition-all duration-300 flex flex-col', // Left side input card
    inputCardFullWidth: 'AGlassCard hover:shadow-2xl transition-all duration-300 w-full p-8', // Epic full-width input card
    resultContainer: 'flex flex-col space-y-4', // Right side container (no wrapper)
    monthlyPayment: 'rounded-2xl shadow-xl p-6 text-center text-white bg-design-charcoal mb-4', // Simple background, no gradient
    optionsCard: 'AGlassCard hover:shadow-2xl transition-all duration-300', // Individual cards on right
    breakdownCard: 'AGlassCard hover:shadow-2xl transition-all duration-300', // Payment breakdown card
    qualificationCard: {
      pass: 'bg-gradient-to-r from-green-100 to-green-200 text-green-900 shadow-xl p-6 rounded-2xl text-center w-full', // Light green styling
      fail: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-900 shadow-xl p-6 rounded-2xl text-center w-full', // Light orange styling
    },
    stressTestCard: 'bg-gradient-to-r from-yellow-200/20 to-yellow-300/30 border border-yellow-300/40 rounded-xl p-6 shadow-sm w-full', // Full width stress test
  },
  
  // Results display
  results: {
    grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
    item: {
      container: 'text-center p-4',
      value: 'text-3xl font-bold text-[#F7A279] font-calculator', // Coral color for values
      label: 'text-xl font-medium text-white font-body',
    },
    breakdown: {
      row: 'flex justify-between items-center',
      label: 'text-xl font-medium text-white font-body',
      value: 'font-bold text-white text-xl font-calculator',
      highlight: 'font-bold text-[#F7A279] text-xl font-calculator', // Coral for highlighted values
    },
    warning: {
      container: 'bg-yellow-200/20 border border-yellow-300/40 rounded-lg p-4',
      text: 'text-white text-xl font-semibold font-display',
      body: 'text-white/80 text-xl mt-2 font-body leading-relaxed',
    },
    info: {
      container: 'bg-gradient-to-r from-yellow-200/20 to-yellow-300/30 border border-yellow-300/40 rounded-xl p-4 shadow-sm',
      icon: 'text-[#F7A279] text-xl mt-0.5',
      text: 'text-xl mt-1 text-white/80 font-body leading-relaxed',
    },
    success: {
      container: 'bg-design-lilac/10 border border-design-lilac/30 rounded-lg p-3 mt-3',
      text: 'text-white text-xl font-semibold font-display',
      body: 'text-white/80 text-xl mt-1 font-body leading-relaxed',
    },
  },
  
  // Action buttons - Consistent layout like Advanced Calculator
  actions: {
    primary: 'w-full', // Use with LiquidGlassButton
    secondary: 'w-full',
    group: 'grid lg:grid-cols-2 gap-8 mt-6', // Same layout as Advanced Calculator
    container: 'mt-16 mb-16', // Container wrapper for buttons below cards - increased padding top and bottom
  },
  
  // Layout specific styles
  layout: {
    scrollableContent: 'flex-1 overflow-y-auto space-y-4 mb-4',
    fixedHeight: 'h-[800px] flex flex-col',
    flexColumn: 'flex flex-col',
  },
} as const;

// ==================== CALCULATOR PRESETS ====================
export const calculatorDefaults = {
  mortgage: {
    purchasePrice: {
      min: 500000,
      max: 2000000,
      step: 25000,
      default: 1000000,
    },
    downPayment: {
      minPercent: 5, // 5% minimum
      step: 5000,
    },
    interestRate: {
      min: 3.0,
      max: 7.0,
      step: 0.01,
      default: 5.5,
    },
    amortization: {
      min: 15,
      max: 30,
      step: 1,
      default: 25,
    },
  },
  
  stressTest: {
    annualIncome: {
      min: 30000,
      max: 300000,
      step: 5000,
      default: 120000,
    },
    monthlyDebts: {
      min: 0,
      max: 5000,
      step: 50,
      default: 500,
    },
    propertyTaxes: {
      min: 1000,
      max: 15000,
      step: 100,
      default: 6000,
    },
    heatingCosts: {
      min: 600,
      max: 4000,
      step: 50,
      default: 1800,
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
    title: 'Get instant mortgage payment estimates',
    subtitle: 'Calculate your mortgage payments with live rates',
    labels: {
      purchasePrice: 'Purchase Price',
      downPayment: 'Down Payment',
      interestRate: 'Interest Rate',
      amortization: 'Amortization',
      firstTimeBuyer: 'First-time homebuyer',
      newBuild: 'New build home (First-time buyer)',
      borrowedDownPayment: 'Borrowed down payment',
    },
    results: {
      monthlyPayment: 'Monthly Payment',
      principalInterest: 'Principal & Interest',
      loanAmount: 'Loan Amount',
      cmhcPremium: 'CMHC Insurance',
      cmhcRate: 'CMHC Premium Rate',
      totalLoan: 'Total Loan',
      ltvRatio: 'LTV Ratio',
      amortizationSurcharge: 'Amortization Surcharge',
    },
    sections: {
      additionalOptions: 'Additional Options',
      paymentBreakdown: 'CMHC Calculation Breakdown',
    },
    warnings: {
      highDownPayment: '️ High Down Payment Notice',
      highDownPaymentBody: 'Consider keeping more cash for closing costs, renovations, or investments',
      cmhcSurcharge: '⚠️ CMHC charges 0.25% surcharge for amortization over 25 years',
      newBuildSurcharge: '⚠️ Additional 0.20% CMHC surcharge for 30-year new build',
      borrowedDownPayment: '⚠️ Higher CMHC premium rate (4.50%) for borrowed down payment',
    },
    success: {
      conventionalMortgage: '✓ Conventional Mortgage (20%+ down payment)',
      conventionalBody: 'No CMHC insurance required - save on premium costs',
      firstTimeBuyer: '✓ Eligible for 30-year amortization on new builds & rebates up to $8,475',
    },
  },
  
  stressTest: {
    title: 'Verify qualification with stress test',
    subtitle: 'Check if you qualify under mortgage stress test rules',
    labels: {
      annualIncome: 'Annual Income',
      monthlyDebts: 'Monthly Debts',
      propertyTaxes: 'Property Taxes (Annual)',
      heatingCosts: 'Heating Costs (Annual)',
    },
    results: {
      stressTestTitle: 'What is the Stress Test?',
      stressTestBody: 'The government requires lenders to test if you can afford higher payments. We calculate your payment at a higher rate to make sure you won\'t struggle if rates go up. This protects you from getting in over your head.',
      yourPayment: 'Your payment @',
      stressTest: 'Stress test @',
      gdsRatio: 'GDS Ratio',
      tdsRatio: 'TDS Ratio',
    },
    qualification: {
      pass: {
        icon: '🎉',
        title: 'You QUALIFY!',
        body: 'You pass the stress test requirements',
      },
      fail: {
        icon: '⚠️',
        title: 'Qualification Challenge',
        body: 'Your debt-to-income ratios exceed lending guidelines',
        advice: 'Consider: Higher income, lower debts, larger down payment, or longer amortization',
      },
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

// Export everything as default for easy import
export default {
  styles: calculatorStyles,
  defaults: calculatorDefaults,
  messages: calculatorMessages,
  
  // Utility functions
  getCalculatorClass,
  getCalculatorDefaults,
  getCalculatorMessages,
};