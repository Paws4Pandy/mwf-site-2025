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
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AGlassCard from '@/components/ui/AGlassCard';
import { TrendingUp, FileText } from 'lucide-react';
import calculatorConfig from '@/lib/calculator-config';

const { styles, defaults, messages } = calculatorConfig;

export const AdvancedMortgageCalculator: React.FC = () => {
  const { rates, loading, error, lastUpdated, refreshRates } = useRates();
  const best5YearFixed = useBest5YearFixed();
  
  const [purchasePrice, setPurchasePrice] = useState(defaults.mortgage.purchasePrice.default);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(best5YearFixed);
  const [amortizationYears, setAmortizationYears] = useState(defaults.mortgage.amortization.default);
  const [term, setTerm] = useState(5); // 5 year term
  const [annualIncome, setAnnualIncome] = useState(defaults.stressTest.annualIncome.default);
  const [monthlyDebts, setMonthlyDebts] = useState(defaults.stressTest.monthlyDebts.default);
  const [propertyTaxes, setPropertyTaxes] = useState(defaults.stressTest.propertyTaxes.default);
  const [heatingCosts, setHeatingCosts] = useState(1200); // Set to $1200 as requested
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isNewBuild, setIsNewBuild] = useState(false);
  const [isTraditionalDownPayment, setIsTraditionalDownPayment] = useState(true);

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
    <div className={styles.container.wrapper}>
      <div className={styles.container.stressTestLayout}>
        <h3 className={`text-3xl font-serif italic text-white font-normal text-center mb-20`}>
          Qualifying Under the Stress Test—How the Numbers Really Work.
        </h3>

        {/* Monthly Payment and CMHC Cards - Moved to Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Monthly Payment Result with GDS/TDS */}
          <AGlassCard className="text-center p-8">
            <h3 className="text-3xl font-bold text-[#61d6c5] font-display">{messages.mortgage.results.monthlyPayment}</h3>
            <div className="text-4xl font-bold text-[#61d6c5] font-calculator mt-4">
              {formatCurrency(monthlyPayment)}
            </div>
            <p className={`${styles.typography.resultLabel} mt-2`}>{messages.mortgage.results.principalInterest}</p>
            
            {/* GDS/TDS Ratios */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/80 font-body">GDS Ratio</p>
                  <p className="text-[#F7A279] font-bold font-calculator text-lg">{formatPercent(gdsRatio * 100)}</p>
                  <p className="text-xs text-white/60">{passesGDS ? '✓ Under 39%' : '❌ Over 39%'}</p>
                </div>
                <div>
                  <p className="text-white/80 font-body">TDS Ratio</p>
                  <p className="text-[#F7A279] font-bold font-calculator text-lg">{formatPercent(tdsRatio * 100)}</p>
                  <p className="text-xs text-white/60">{passesTDS ? '✓ Under 44%' : '❌ Over 44%'}</p>
                </div>
              </div>
            </div>
          </AGlassCard>

          {/* CMHC Card */}
          <AGlassCard className="p-8">
            <h4 className={styles.typography.sectionHeader}>CMHC Details</h4>
            <div className="space-y-4 mt-6">
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>{messages.mortgage.results.loanAmount}:</span>
                <span className={styles.results.breakdown.value}>{formatCurrency(loanAmount)}</span>
              </div>
              {requiresCMHC && (
                <>
                  <div className={styles.results.breakdown.row}>
                    <span className={styles.results.breakdown.label}>{messages.mortgage.results.cmhcRate}:</span>
                    <span className={styles.results.breakdown.highlight}>
                      {((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className={styles.results.breakdown.row}>
                    <span className={styles.results.breakdown.label}>{messages.mortgage.results.cmhcPremium}:</span>
                    <span className={styles.results.breakdown.highlight}>{formatCurrency(cmhcPremium)}</span>
                  </div>
                </>
              )}
              <div className={`${styles.results.breakdown.row} border-t pt-3`}>
                <span className={styles.results.breakdown.label}>{messages.mortgage.results.totalLoan}:</span>
                <span className={styles.results.breakdown.value}>{formatCurrency(totalLoanAmount)}</span>
              </div>
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>{messages.mortgage.results.ltvRatio}:</span>
                <span className={styles.results.breakdown.value}>{formatPercent(ltvRatio)}</span>
              </div>
            </div>
          </AGlassCard>
        </div>

        {/* Input Controls Section - No section title */}
        <div className={styles.cards.inputCardFullWidth}>
          
          {/* Row 1: Income and Debts - Moved to top as requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(annualIncome)}</span>
              </div>
              <input
                type="range"
                min={defaults.stressTest.annualIncome.min}
                max={defaults.stressTest.annualIncome.max}
                step={defaults.stressTest.annualIncome.step}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.stressTest.labels.annualIncome}
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(monthlyDebts)}</span>
              </div>
              <input
                type="range"
                min={defaults.stressTest.monthlyDebts.min}
                max={defaults.stressTest.monthlyDebts.max}
                step={defaults.stressTest.monthlyDebts.step}
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Monthly Debts (Credit Cards, Loans, Line of Credit)
              </label>
            </div>
          </div>

          {/* Row 2: Purchase Price, Down Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(purchasePrice)}</span>
              </div>
              <input
                type="range"
                min={defaults.mortgage.purchasePrice.min}
                max={defaults.mortgage.purchasePrice.max}
                step={defaults.mortgage.purchasePrice.step}
                value={purchasePrice}
                onChange={(e) => {
                  const newPrice = Number(e.target.value);
                  const currentDownPaymentPercent = downPayment / purchasePrice;
                  setPurchasePrice(newPrice);
                  const newDownPaymentAmount = newPrice * currentDownPaymentPercent;
                  const minRequiredDown = calculateMinDownPayment(newPrice);
                  setDownPayment(Math.max(newDownPaymentAmount, minRequiredDown));
                }}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.mortgage.labels.purchasePrice}
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(downPayment)} <span className={`${styles.typography.helper} text-lg`}>({formatPercent((downPayment/purchasePrice)*100)})</span></span>
              </div>
              <input
                type="range"
                min={minDownPayment}
                max={purchasePrice * 0.50}
                step={defaults.mortgage.downPayment.step}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.mortgage.labels.downPayment}
              </label>
            </div>
          </div>

          {/* Row 3: Interest Rate, Term */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{interestRate}%</span>
              </div>
              <input
                type="range"
                min={defaults.mortgage.interestRate.min}
                max={defaults.mortgage.interestRate.max}
                step={defaults.mortgage.interestRate.step}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.mortgage.labels.interestRate}
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{term} years</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Term
              </label>
            </div>
          </div>

          {/* Row 4: Amortization, Property Taxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{amortizationYears} years</span>
              </div>
              <input
                type="range"
                min={defaults.mortgage.amortization.min}
                max={defaults.mortgage.amortization.max}
                step={defaults.mortgage.amortization.step}
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.mortgage.labels.amortization}
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(propertyTaxes)}</span>
              </div>
              <input
                type="range"
                min={defaults.stressTest.propertyTaxes.min}
                max={defaults.stressTest.propertyTaxes.max}
                step={defaults.stressTest.propertyTaxes.step}
                value={propertyTaxes}
                onChange={(e) => setPropertyTaxes(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.stressTest.labels.propertyTaxes}
              </label>
            </div>
          </div>

          {/* Row 5: Heating Costs with Stress Test Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(heatingCosts)}</span>
              </div>
              <input
                type="range"
                min={600}
                max={4000}
                step={50}
                value={heatingCosts}
                onChange={(e) => setHeatingCosts(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.stressTest.labels.heatingCosts}
              </label>
            </div>

            {/* Stress Test Explanation Card */}
            <div className="px-8">
              <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm w-full backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-2 font-display text-lg">
                  What is the Stress Test?
                </h4>
                <p className="text-white/90 text-sm font-body leading-relaxed mb-4">
                  The government requires testing at a higher rate to ensure you can afford payments if rates increase. This protects you from getting in over your head.
                </p>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-white/80 font-body">Your payment ({interestRate.toFixed(2)}%):</span>
                    <span className="text-[#F7A279] font-bold font-calculator">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/80 font-body">Stress test ({stressTestRate.toFixed(2)}%):</span>
                    <span className="text-[#F7A279] font-bold font-calculator">{formatCurrency(stressTestPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      
      {/* CTA Buttons */}
      <div className={styles.actions.container}>
        <div className={styles.actions.group}>
          {/* View Current Rates Button */}
          <LiquidGlassButton
            href="/rates"
            variant="primary"
            size="md"
            icon={<TrendingUp className="w-4 h-4" />}
            className={styles.actions.primary}
          >
            View Current Rates
          </LiquidGlassButton>
          
          {/* Start Application Button */}
          <LiquidGlassButton
            href={CONTACT_CONFIG.applicationUrl}
            external
            variant="accent"
            size="md"
            icon={<FileText className="w-4 h-4" />}
            className={styles.actions.secondary}
          >
            Start My Application
          </LiquidGlassButton>
        </div>
      </div>
    </div>
  );
};