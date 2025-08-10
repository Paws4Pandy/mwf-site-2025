'use client';

import React, { useState, useEffect } from 'react';
import { CONTACT_CONFIG } from '@/assets/config/contact';
import { 
  CMHC_RULES, 
  calculateMinDownPayment, 
  calculateCMHCPremium, 
  calculatePayment,
  formatCurrency,
  formatPercent
} from '@/lib/constants/cmhc';
import { useRates, useBest5YearFixed } from '@/contexts/RatesContext';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { TrendingUp, FileText } from 'lucide-react';



interface AdvancedMortgageCalculatorProps {
  onOpenContactForm?: () => void;
}

export const AdvancedMortgageCalculator: React.FC<AdvancedMortgageCalculatorProps> = ({ onOpenContactForm }) => {
  const { rates, loading, error, lastUpdated, refreshRates } = useRates();
  const best5YearFixed = useBest5YearFixed();
  
  // Mortgage inputs - same as MortgageCalculator
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(best5YearFixed);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isNewBuild, setIsNewBuild] = useState(false);
  const [isTraditionalDownPayment, setIsTraditionalDownPayment] = useState(true);
  
  // Stress test specific inputs
  const [annualIncome, setAnnualIncome] = useState(90000);
  const [monthlyDebts, setMonthlyDebts] = useState(300);
  const [propertyTaxes, setPropertyTaxes] = useState(3600);
  const [heatingCosts, setHeatingCosts] = useState(1200);

  // Update interest rate when live rates are loaded
  useEffect(() => {
    setInterestRate(best5YearFixed);
  }, [best5YearFixed]);

  // Auto-adjust down payment when purchase price changes
  useEffect(() => {
    const minDown = calculateMinDownPayment(purchasePrice);
    if (downPayment < minDown) {
      setDownPayment(minDown);
    }
  }, [purchasePrice, downPayment]);

  const minDownPayment = calculateMinDownPayment(purchasePrice);
  const loanAmount = purchasePrice - downPayment;
  const cmhcPremium = calculateCMHCPremium(loanAmount, purchasePrice, isTraditionalDownPayment, isNewBuild, amortizationYears, isFirstTimeBuyer);
  const totalLoanAmount = loanAmount + cmhcPremium;
  const monthlyPayment = calculatePayment(totalLoanAmount, interestRate, amortizationYears);
  const ltvRatio = (loanAmount / purchasePrice) * 100;
  const requiresCMHC = ltvRatio > 80 && purchasePrice <= CMHC_RULES.downPaymentRules.maxInsurablePrice;
  const isEligibleForCMHC = purchasePrice <= CMHC_RULES.downPaymentRules.maxInsurablePrice;

  // Stress test calculations
  const stressTestRate = Math.max(interestRate + 2, 5.25);
  const stressTestPayment = calculatePayment(totalLoanAmount, stressTestRate, amortizationYears);
  
  // Annual housing costs including taxes and heating
  const annualStressTestPayment = stressTestPayment * 12;
  const annualHousingCost = annualStressTestPayment + propertyTaxes + heatingCosts;
  const annualOtherDebts = monthlyDebts * 12;
  const totalAnnualDebt = annualHousingCost + annualOtherDebts;

  // GDS and TDS ratios for qualification (using stress test payment)
  const gdsRatio = annualHousingCost / annualIncome;
  const tdsRatio = totalAnnualDebt / annualIncome;

  // Pass/Fail stress test per CMHC limits
  const passesGDS = gdsRatio <= 0.39;
  const passesTDS = tdsRatio <= 0.44;
  const passStressTest = passesGDS && passesTDS;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input Controls - EXPANDED TO FIT CONTENT */}
        <LiquidGlassWrapper mode="standard" intensity={0.4} scale={0.3}>
          <div className="rounded-2xl shadow-xl backdrop-blur-sm border-2 p-6 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20 flex flex-col">
          <p className="text-2xl font-bold mb-8 text-hunter-green font-hammersmith">
            Verify qualification with stress test
          </p>
          
          <div className="space-y-6">
            {/* Purchase Price Slider */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Purchase Price: <span className="font-bold text-gray-orange">{formatCurrency(purchasePrice)}</span>
              </label>
              <input
                type="range"
                min="500000"
                max="2000000"
                step="25000"
                value={purchasePrice}
                onChange={(e) => {
                  const newPrice = Number(e.target.value);
                  const currentDownPaymentPercent = downPayment / purchasePrice;
                  
                  setPurchasePrice(newPrice);
                  
                  // Keep the same down payment percentage, but respect minimum requirements
                  const newDownPaymentAmount = newPrice * currentDownPaymentPercent;
                  const minRequiredDown = calculateMinDownPayment(newPrice);
                  setDownPayment(Math.max(newDownPaymentAmount, minRequiredDown));
                }}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-1 font-hk-grotesk-light">
                <span>$500K</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Down Payment: <span className="font-bold text-gray-orange">{formatCurrency(downPayment)} ({formatPercent((downPayment/purchasePrice)*100)})</span>
              </label>
              <input
                type="range"
                min={minDownPayment}
                max={purchasePrice * 0.50}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-base text-white/90 mt-1 font-medium font-hk-grotesk-light">
                <span>Minimum: {formatCurrency(minDownPayment)}</span>
                <span>50%: {formatCurrency(purchasePrice * 0.50)}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-lg font-bold text-gray-orange font-hk-grotesk-light">
                  Interest Rate: <span className="font-bold text-gray-orange">{interestRate}%</span>
                </label>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-2 font-hk-grotesk-light">
                <span>3%</span>
                <span>7%</span>
              </div>
            </div>
            
            {/* Amortization Period */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Amortization: <span className="font-bold text-gray-orange">{amortizationYears} years</span>
              </label>
              <input
                type="range"
                min="15"
                max="30"
                step="1"
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-2 font-hk-grotesk-light">
                <span>15 years</span>
                <span>30 years</span>
              </div>
            </div>

            {/* Annual Income Slider */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Annual Income: <span className="font-bold text-gray-orange">{formatCurrency(annualIncome)}</span>
              </label>
              <input
                type="range"
                min="30000"
                max="300000"
                step="5000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-1 font-hk-grotesk-light">
                <span>$30K</span>
                <span>$300K</span>
              </div>
            </div>

            {/* Monthly Debts Slider */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Monthly Debts: <span className="font-bold text-gray-orange">{formatCurrency(monthlyDebts)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-1 font-hk-grotesk-light">
                <span>$0</span>
                <span>$5K</span>
              </div>
            </div>

            {/* Property Taxes Slider */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Property Taxes (Annual): <span className="font-bold text-gray-orange">{formatCurrency(propertyTaxes)}</span>
              </label>
              <input
                type="range"
                min="1000"
                max="15000"
                step="100"
                value={propertyTaxes}
                onChange={(e) => setPropertyTaxes(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-1 font-hk-grotesk-light">
                <span>$1K</span>
                <span>$15K</span>
              </div>
            </div>

            {/* Heating Costs Slider */}
            <div>
              <label className="block text-lg font-bold mb-2 text-gray-orange font-hk-grotesk-light">
                Heating Costs (Annual): <span className="font-bold text-gray-orange">{formatCurrency(heatingCosts)}</span>
              </label>
              <input
                type="range"
                min="600"
                max="4000"
                step="50"
                value={heatingCosts}
                onChange={(e) => setHeatingCosts(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-1 font-hk-grotesk-light">
                <span>$600</span>
                <span>$4K</span>
              </div>
            </div>
          </div>
          </div>
        </LiquidGlassWrapper>

        {/* Results Panel - EXPANDED TO FIT CONTENT */}
        <LiquidGlassWrapper mode="polar" intensity={0.4} scale={0.3}>
          <div className="flex flex-col">
          {/* Main Payment Result */}
          <div className="rounded-2xl shadow-xl p-6 text-center text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-design-plum via-design-charcoal to-design-gold mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 font-hammersmith">Monthly Payment</h3>
              <div className="text-4xl font-bold mb-2">
                {formatCurrency(monthlyPayment)}
              </div>
              <p className="text-lg font-medium text-gray-100">Principal & Interest</p>
            </div>
          </div>

          {/* Content area - all content visible */}
          <div className="space-y-4 mb-4">
            {/* Payment Breakdown */}
            <div className="backdrop-blur-sm rounded-2xl shadow-xl p-4 border-2 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20">
              <h4 className="text-lg font-bold mb-3 text-white font-hammersmith">Payment Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-white font-hk-grotesk-light">Loan Amount:</span>
                  <span className="font-bold text-white text-base font-hk-grotesk-light">{formatCurrency(loanAmount)}</span>
                </div>
                {requiresCMHC && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-white font-hk-grotesk-light">CMHC Premium Rate:</span>
                      <span className="font-bold text-design-gold text-base font-hk-grotesk-light">
                        {((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-white font-hk-grotesk-light">CMHC Insurance:</span>
                      <span className="font-bold text-design-gold text-base font-hk-grotesk-light">{formatCurrency(cmhcPremium)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between border-t pt-3">
                  <span className="text-base font-medium text-white font-hk-grotesk-light">Total Loan:</span>
                  <span className="font-bold text-white text-base font-hk-grotesk-light">{formatCurrency(totalLoanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-medium text-white font-hk-grotesk-light">LTV Ratio:</span>
                  <span className="font-bold text-white text-base font-hk-grotesk-light">{formatPercent(ltvRatio)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-medium text-white font-hk-grotesk-light">Amortization:</span>
                  <span className="font-bold text-white text-base font-hk-grotesk-light">{amortizationYears} years</span>
                </div>
              </div>
            </div>

            {/* Stress Test Explanation Card */}
            <div className="bg-gradient-to-r from-design-gold/10 to-design-gold/20 border border-design-gold/30 rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <span className="text-design-gold text-xl mt-0.5">📊</span>
                <div>
                  <h4 className="font-semibold text-white mb-2 font-hammersmith">
                    What is the Stress Test?
                  </h4>
                  <p className="text-sm text-white/90 leading-relaxed">
                    The government requires lenders to test if you can afford higher payments. We calculate your payment at a higher rate ({interestRate.toFixed(2)}% vs {stressTestRate.toFixed(2)}%) to make sure you won't struggle if rates go up. This protects you from getting in over your head.
                  </p>
                  <div className="mt-3 bg-white/10 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Your payment @ {interestRate.toFixed(2)}%:</span>
                      <span className="text-white font-bold">{formatCurrency(monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Stress test @ {stressTestRate.toFixed(2)}%:</span>
                      <span className="text-design-gold font-bold">{formatCurrency(stressTestPayment)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification Status - EXPANDED TO SHOW FULL CONTENT */}
            <div
              className={`p-6 rounded-2xl font-bold text-center select-none transform transition-all duration-300 ${
                passStressTest 
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl" 
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl"
              }`}
            >
              {passStressTest ? (
                <div>
                  <span className="text-3xl">🎉</span>
                  <h4 className="text-xl mt-3 font-hammersmith">You QUALIFY!</h4>
                  <p className="text-sm font-normal mt-2 leading-relaxed">You pass the stress test requirements</p>
                  <div className="mt-3 text-xs font-normal space-y-1">
                    <div>GDS Ratio: {formatPercent(gdsRatio)} (✓ Under 39%)</div>
                    <div>TDS Ratio: {formatPercent(tdsRatio)} (✓ Under 44%)</div>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-3xl">⚠️</span>
                  <h4 className="text-xl mt-3 font-hammersmith">Qualification Challenge</h4>
                  <p className="text-sm font-normal mt-2 leading-relaxed">
                    Your debt-to-income ratios exceed lending guidelines
                  </p>
                  <div className="mt-3 text-xs font-normal space-y-1">
                    <div>GDS Ratio: {formatPercent(gdsRatio)} {!passesGDS ? '(❌ Over 39%)' : '(✓ Under 39%)'}</div>
                    <div>TDS Ratio: {formatPercent(tdsRatio)} {!passesTDS ? '(❌ Over 44%)' : '(✓ Under 44%)'}</div>
                  </div>
                  <p className="text-xs font-normal mt-3 leading-relaxed">
                    Consider: Higher income, lower debts, larger down payment, or longer amortization
                  </p>
                </div>
              )}
            </div>
          </div>
          </div>
        </LiquidGlassWrapper>
      </div>
      
      {/* BUTTONS POSITIONED BELOW CARDS AT SAME LEVEL */}
      <div className="grid lg:grid-cols-2 gap-8 mt-6">
        {/* Left Button - View Current Rates */}
        <LiquidGlassButton
          href="/rates"
          variant="primary"
          size="md"
          icon={<TrendingUp className="w-4 h-4" />}
          className="w-full"
        >
          View Current Rates
        </LiquidGlassButton>
        
        {/* Right Button - Start My Application */}
        <LiquidGlassButton
          href={CONTACT_CONFIG.applicationUrl}
          external
          variant="accent"
          size="md"
          icon={<FileText className="w-4 h-4" />}
          className="w-full"
        >
          Start My Application
        </LiquidGlassButton>
      </div>
    </div>
  );
};