'use client';

import React, { useState, useEffect } from 'react';
import { CONTACT_CONFIG } from '@/assets/config/contact';
import { 
  CMHC_RULES, 
  calculateMinDownPayment, 
  calculateCMHCPremium, 
  calculatePayment,
  formatCurrency,
  formatPercent,
  type MortgageRate 
} from '@/lib/constants/cmhc';
import { useRates, useBest5YearFixed } from '@/contexts/RatesContext';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AGlassCard from '@/components/ui/AGlassCard';
import { TrendingUp, FileText } from 'lucide-react';
import calculatorConfig from '@/lib/calculator-config';

const { styles, defaults, messages } = calculatorConfig;

interface MortgageCalculatorProps {
  onOpenContactForm?: () => void;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ 
  onOpenContactForm
}) => {
  const { rates, loading, error, lastUpdated, refreshRates } = useRates();
  const best5YearFixed = useBest5YearFixed();
  
  const [purchasePrice, setPurchasePrice] = useState(defaults.mortgage.purchasePrice.default);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(best5YearFixed);
  const [amortizationYears, setAmortizationYears] = useState(defaults.mortgage.amortization.default);
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

  return (
    <div className={styles.container.wrapper}>
      <div className={styles.container.grid}>
        {/* Left Column - Input Controls */}
        <AGlassCard className={styles.cards.inputCard}>
          <h2 className={styles.typography.sectionHeader}>
            {messages.mortgage.title}
          </h2>
          
          <div className={styles.form.group}>
            {/* Purchase Price Slider */}
            <div>
              <label className={`block ${styles.typography.label} mb-2`}>
                {messages.mortgage.labels.purchasePrice}: <span className={styles.typography.value}>{formatCurrency(purchasePrice)}</span>
              </label>
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
                  
                  // Keep the same down payment percentage, but respect minimum requirements
                  const newDownPaymentAmount = newPrice * currentDownPaymentPercent;
                  const minRequiredDown = calculateMinDownPayment(newPrice);
                  setDownPayment(Math.max(newDownPaymentAmount, minRequiredDown));
                }}
                className={styles.form.slider.track}
              />
              <div className={styles.form.range.container}>
                <span>$500K</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <label className={`block ${styles.typography.label} mb-2`}>
                {messages.mortgage.labels.downPayment}: <span className={styles.typography.value}>{formatCurrency(downPayment)} ({formatPercent((downPayment/purchasePrice)*100)})</span>
              </label>
              <input
                type="range"
                min={minDownPayment}
                max={purchasePrice * 0.50}
                step={defaults.mortgage.downPayment.step}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <div className={styles.form.range.container}>
                <span>Minimum: {formatCurrency(minDownPayment)}</span>
                <span>50%: {formatCurrency(purchasePrice * 0.50)}</span>
              </div>
              
              {/* Down Payment Info */}
              <div className="mt-3 space-y-2">
                {(downPayment/purchasePrice) > 0.20 && (
                  <div className={styles.results.warning.container}>
                    <p className={styles.results.warning.text}>
                      {messages.mortgage.warnings.highDownPayment}
                    </p>
                    <p className={styles.results.warning.body}>
                      {messages.mortgage.warnings.highDownPaymentBody}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`block ${styles.typography.label}`}>
                  {messages.mortgage.labels.interestRate}: <span className={styles.typography.value}>{interestRate}%</span>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={refreshRates}
                    disabled={loading}
                    className="px-3 py-1 text-xs bg-design-lilac/20 hover:bg-design-lilac/40 text-white rounded border border-design-lilac/30 transition-colors disabled:opacity-50"
                  >
                    {loading ? '⟳' : '↻'} Refresh
                  </button>
                </div>
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
              <div className={styles.form.range.container}>
                <span>3%</span>
                <span>7%</span>
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-1">
                  ⚠️ Using default rates
                </p>
              )}
            </div>
            
            {/* Amortization Period */}
            <div>
              <label className={`block ${styles.typography.label} mb-2`}>
                {messages.mortgage.labels.amortization}: <span className={styles.typography.value}>{amortizationYears} years</span>
              </label>
              <input
                type="range"
                min={defaults.mortgage.amortization.min}
                max={defaults.mortgage.amortization.max}
                step={defaults.mortgage.amortization.step}
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <div className={styles.form.range.container}>
                <span>15 years</span>
                <span>30 years</span>
              </div>
              {amortizationYears > 25 && (
                <p className="text-design-gold text-xl font-medium mt-2">
                  {messages.mortgage.warnings.cmhcSurcharge}
                </p>
              )}
            </div>
          </div>
        </AGlassCard>

        {/* Results Panel - Right Column */}
        <div className={styles.cards.resultContainer}>
          {/* Main Payment Result */}
          <AGlassCard className={`${styles.cards.monthlyPayment} text-center`}>
            <h3 className={styles.typography.sectionHeader}>{messages.mortgage.results.monthlyPayment}</h3>
            <div className={styles.typography.result}>
              {formatCurrency(monthlyPayment)}
            </div>
            <p className={styles.typography.resultLabel}>{messages.mortgage.results.principalInterest}</p>
          </AGlassCard>

          {/* Checkbox Options Card */}
          <AGlassCard className={styles.cards.optionsCard}>
            <h4 className={styles.typography.sectionHeader}>
              {messages.mortgage.sections.additionalOptions}
            </h4>
            
            <div className="space-y-4">
              {/* First-Time Buyer Toggle */}
              <div>
                <label className={styles.form.checkbox.container}>
                  <input
                    type="checkbox"
                    checked={isFirstTimeBuyer}
                    onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                    className={styles.form.checkbox.input}
                  />
                  <span className={styles.form.checkbox.label}>
                    {messages.mortgage.labels.firstTimeBuyer}
                  </span>
                </label>
                {isFirstTimeBuyer && (
                  <p className={styles.form.checkbox.description}>
                    {messages.mortgage.success.firstTimeBuyer}
                  </p>
                )}
              </div>

              {/* New Build Toggle (for First-Time Buyers) */}
              {isFirstTimeBuyer && (
                <div>
                  <label className={styles.form.checkbox.container}>
                    <input
                      type="checkbox"
                      checked={isNewBuild}
                      onChange={(e) => setIsNewBuild(e.target.checked)}
                      className={styles.form.checkbox.input}
                    />
                    <span className={styles.form.checkbox.label}>
                      {messages.mortgage.labels.newBuild}
                    </span>
                  </label>
                  {isNewBuild && amortizationYears === 30 && (
                    <p className="text-design-gold text-xl font-medium mt-1 ml-8 font-body leading-relaxed">
                      {messages.mortgage.warnings.newBuildSurcharge}
                    </p>
                  )}
                </div>
              )}

              {/* Down Payment Source Toggle */}
              <div>
                <label className={styles.form.checkbox.container}>
                  <input
                    type="checkbox"
                    checked={!isTraditionalDownPayment}
                    onChange={(e) => setIsTraditionalDownPayment(!e.target.checked)}
                    className={styles.form.checkbox.input}
                  />
                  <span className={styles.form.checkbox.label}>
                    {messages.mortgage.labels.borrowedDownPayment}
                  </span>
                </label>
                {!isTraditionalDownPayment && ltvRatio > 90 && (
                  <p className="text-design-charcoal text-xl font-medium mt-1 ml-8 font-body leading-relaxed">
                    {messages.mortgage.warnings.borrowedDownPayment}
                  </p>
                )}
              </div>

              {/* Conventional Mortgage Notice */}
              {(downPayment/purchasePrice) >= 0.20 && (
                <div className={styles.results.success.container}>
                  <p className={styles.results.success.text}>
                    {messages.mortgage.success.conventionalMortgage}
                  </p>
                  <p className={styles.results.success.body}>
                    {messages.mortgage.success.conventionalBody}
                  </p>
                </div>
              )}
            </div>
          </AGlassCard>

          {/* Payment Breakdown */}
          <AGlassCard className={styles.cards.breakdownCard}>
            <h4 className={styles.typography.sectionHeader}>{messages.mortgage.sections.paymentBreakdown}</h4>
            <div className="space-y-4">
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
                  {amortizationYears > 25 && (
                    <div className={styles.results.breakdown.row}>
                      <span className={styles.results.breakdown.label}>{messages.mortgage.results.amortizationSurcharge}:</span>
                      <span className={styles.results.breakdown.highlight}>0.25%</span>
                    </div>
                  )}
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
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>{messages.mortgage.labels.amortization}:</span>
                <span className={styles.results.breakdown.value}>{amortizationYears} years</span>
              </div>
            </div>
          </AGlassCard>

          {/* CMHC Notice */}
          {requiresCMHC && isEligibleForCMHC && (
            <div className={styles.results.info.container}>
              <div className="flex items-start space-x-3">
                <span className={styles.results.info.icon}>ℹ️</span>
                <div>
                  <h4 className="font-semibold text-white">
                    CMHC Insurance Required (Official 2025 Rates)
                  </h4>
                  <p className={styles.results.info.text}>
                    LTV over 80% requires mortgage default insurance per CMHC rules.
                    <br />Total Premium: <span className="font-calculator font-semibold">{formatCurrency(cmhcPremium)}</span>
                    <br />Base Rate: <span className="font-calculator font-semibold">{((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}%</span> of loan amount
                    {amortizationYears > 25 && <><br />+ <span className="font-calculator">0.25%</span> amortization surcharge (26-30 years)</>}
                    {isFirstTimeBuyer && isNewBuild && amortizationYears === 30 && <><br />+ <span className="font-calculator">0.20%</span> first-time buyer new build surcharge</>}
                    {purchasePrice >= 1000000 && purchasePrice <= 1500000 && ltvRatio > 80 && <><br />+ <span className="font-calculator">0.25%</span> high-ratio surcharge ($1M-$1.5M)</>}
                    {!isTraditionalDownPayment && ltvRatio > 90 && <><br />Higher rate (<span className="font-calculator">4.50%</span>) for borrowed down payment</>}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* CMHC Ineligible Notice */}
          {!isEligibleForCMHC && (
            <div className="bg-gradient-to-r from-design-charcoal/10 to-design-charcoal/20 border border-design-charcoal/30 rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <span className="text-design-lilac text-xl mt-0.5">⚠️</span>
                <div>
                  <h4 className="font-semibold text-white">
                    CMHC Insurance Not Available
                  </h4>
                  <p className="text-xl mt-1 text-white/80 font-body leading-relaxed">
                    Homes over <span className="font-calculator font-semibold">$1.5M</span> are not eligible for CMHC insurance.
                    <br />Minimum <span className="font-calculator">20%</span> down payment required for conventional mortgage.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* CTA Buttons - Same layout as Advanced Calculator */}
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
          {onOpenContactForm ? (
            <button
              onClick={onOpenContactForm}
              className={`${styles.actions.secondary} px-6 py-4 text-xl font-semibold inline-block rounded-lg text-white transition-all duration-300 text-center font-display`}
            >
              Get Pre-Approved
            </button>
          ) : (
            <LiquidGlassButton
              href={CONTACT_CONFIG.applicationUrl}
              external
              variant="accent"
              size="md"
              icon={<FileText className="w-4 h-4" />}
              className={styles.actions.secondary}
            >
              {CONTACT_CONFIG.cta.primary}
            </LiquidGlassButton>
          )}
        </div>
      </div>
    </div>  
  );
};

export default MortgageCalculator;