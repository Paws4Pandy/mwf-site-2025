// CMHC Rules and Calculation Constants (2025)

export interface MortgageRate {
  term: string;
  type: 'Fixed' | 'Variable';
  rate: string;
}

export const CMHC_RULES = {
  downPaymentRules: {
    maxInsurablePrice: 1500000, // Maximum home price eligible for CMHC insurance
    minDownPaymentUnder500k: 0.05, // 5% for first $500k
    minDownPaymentOver500k: 0.10, // 10% for portion over $500k
    conventionalThreshold: 0.20 // 20% down payment for conventional mortgage
  },
  
  // CMHC Premium Rates (2025) - based on LTV ratio
  premiumRates: {
    '95': 0.04, // 95.01% to 95% LTV = 4.00%
    '90': 0.031, // 90.01% to 95% LTV = 3.10%
    '85': 0.028, // 85.01% to 90% LTV = 2.80%
    '80': 0.020 // 80.01% to 85% LTV = 2.00%
  } as Record<string, number>,
  
  // Additional surcharges
  surcharges: {
    amortizationOver25Years: 0.0025, // 0.25% for 26-30 year amortization
    firstTimeBuyerNewBuild30Year: 0.002, // 0.20% for first-time buyer new build 30-year
    highRatioOver1M: 0.0025, // 0.25% for high-ratio mortgages $1M-$1.5M
    borrowedDownPaymentOver90LTV: 0.045 // 4.50% rate for borrowed down payment over 90% LTV
  },
  
  // Maximum amortization periods
  maxAmortization: {
    conventional: 30, // years
    insured: 25, // years (30 for first-time buyers on new builds)
    firstTimeBuyerNewBuild: 30 // years
  }
} as const;

// Calculate minimum down payment based on CMHC rules
export const calculateMinDownPayment = (purchasePrice: number): number => {
  if (purchasePrice <= 500000) {
    return purchasePrice * CMHC_RULES.downPaymentRules.minDownPaymentUnder500k;
  } else {
    const first500k = 500000 * CMHC_RULES.downPaymentRules.minDownPaymentUnder500k;
    const over500k = (purchasePrice - 500000) * CMHC_RULES.downPaymentRules.minDownPaymentOver500k;
    return first500k + over500k;
  }
};

// Calculate CMHC premium
export const calculateCMHCPremium = (
  loanAmount: number,
  purchasePrice: number,
  isTraditionalDownPayment: boolean = true,
  isNewBuild: boolean = false,
  amortizationYears: number = 25,
  isFirstTimeBuyer: boolean = false
): number => {
  const ltvRatio = (loanAmount / purchasePrice) * 100;
  
  // No CMHC premium if LTV <= 80% or price > $1.5M
  if (ltvRatio <= 80 || purchasePrice > CMHC_RULES.downPaymentRules.maxInsurablePrice) {
    return 0;
  }
  
  // Special case: borrowed down payment over 90% LTV
  if (!isTraditionalDownPayment && ltvRatio > 90) {
    let premium = loanAmount * CMHC_RULES.surcharges.borrowedDownPaymentOver90LTV;
    
    // Add surcharges
    if (amortizationYears > 25) {
      premium += loanAmount * CMHC_RULES.surcharges.amortizationOver25Years;
    }
    
    if (isFirstTimeBuyer && isNewBuild && amortizationYears === 30) {
      premium += loanAmount * CMHC_RULES.surcharges.firstTimeBuyerNewBuild30Year;
    }
    
    if (purchasePrice >= 1000000 && purchasePrice <= 1500000 && ltvRatio > 80) {
      premium += loanAmount * CMHC_RULES.surcharges.highRatioOver1M;
    }
    
    return premium;
  }
  
  // Find the appropriate premium rate based on LTV
  let baseRate = 0;
  for (const [ltvThreshold, rate] of Object.entries(CMHC_RULES.premiumRates)) {
    if (ltvRatio <= parseFloat(ltvThreshold)) {
      baseRate = rate;
      break;
    }
  }
  
  let premium = loanAmount * baseRate;
  
  // Add surcharges
  if (amortizationYears > 25) {
    premium += loanAmount * CMHC_RULES.surcharges.amortizationOver25Years;
  }
  
  if (isFirstTimeBuyer && isNewBuild && amortizationYears === 30) {
    premium += loanAmount * CMHC_RULES.surcharges.firstTimeBuyerNewBuild30Year;
  }
  
  if (purchasePrice >= 1000000 && purchasePrice <= 1500000 && ltvRatio > 80) {
    premium += loanAmount * CMHC_RULES.surcharges.highRatioOver1M;
  }
  
  return premium;
};

// Calculate monthly mortgage payment
export const calculatePayment = (
  loanAmount: number,
  annualInterestRate: number,
  amortizationYears: number
): number => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalPayments = amortizationYears * 12;
  
  if (monthlyRate === 0) {
    return loanAmount / totalPayments;
  }
  
  const factor = Math.pow(1 + monthlyRate, totalPayments);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format percentage
export const formatPercent = (percent: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(percent / 100);
};
