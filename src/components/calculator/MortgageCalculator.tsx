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
      <div className={styles.container.stressTestLayout}>
        <h3 className={`text-3xl font-serif italic text-white font-normal text-center mb-20`}>
          Quick Payment Calculator—Your Monthly Payment Estimate in Seconds.
        </h3>

        {/* Monthly Payment and CMHC Cards - Moved to Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Monthly Payment Result */}
          <AGlassCard className="text-center p-8">
            <h3 className="text-3xl font-bold text-[#61d6c5] font-display">{messages.mortgage.results.monthlyPayment}</h3>
            <div className="text-4xl font-bold text-[#61d6c5] font-calculator mt-4">
              {formatCurrency(monthlyPayment)}
            </div>
            <p className={`${styles.typography.resultLabel} mt-2`}>{messages.mortgage.results.principalInterest}</p>
            
            {/* Conventional Mortgage Notice */}
            {(downPayment/purchasePrice) >= 0.20 && (
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-[#F7A279] font-bold text-sm">✓ Conventional Mortgage</p>
                <p className="text-xs text-white/60">No CMHC insurance required</p>
              </div>
            )}
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

        {/* Input Controls Section */}
        <div className={styles.cards.inputCardFullWidth}>
          
          {/* Row 1: Purchase Price, Down Payment */}
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

          {/* Row 2: Interest Rate, Amortization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{interestRate}%</span>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={refreshRates}
                    disabled={loading}
                    className="px-3 py-1 text-xs bg-design-lilac/20 hover:bg-design-lilac/40 text-white rounded border border-design-lilac/30 transition-colors disabled:opacity-50"
                  >
                    {loading ? '⟳' : '↻'} Refresh
                  </button>
                  {error && (
                    <span className="text-red-400 text-xs">⚠️ Using default rates</span>
                  )}
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
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.mortgage.labels.interestRate}
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{amortizationYears} years</span>
                {amortizationYears > 25 && (
                  <p className="text-design-gold text-sm mt-1">+ 0.25% CMHC surcharge</p>
                )}
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
          </div>

          {/* Row 3: Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-16">
            <div className="px-8">
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
                </div>
              </div>
            </div>

            {/* Information Card */}
            <div className="px-8">
              <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm w-full backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-2 font-display text-lg">
                  Quick Payment Calculator
                </h4>
                <p className="text-white/90 text-sm font-body leading-relaxed mb-4">
                  Instant estimate of your monthly mortgage payment includes principal and interest only.
                </p>
                <div className="text-xs text-white/80 space-y-1">
                  <div>• Add property taxes (~$300-600/month)</div>
                  <div>• Add home insurance (~$100-300/month)</div>
                  <div>• Add heating costs (~$100/month)</div>
                </div>
              </div>
            </div>
          </div>

          {/* CMHC Notice */}
          {requiresCMHC && isEligibleForCMHC && (
            <div className="mb-16">
              <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-[#F7A279] text-xl mt-0.5">ℹ️</span>
                  <div>
                    <h4 className="font-semibold text-white">
                      CMHC Insurance Required (Official 2025 Rates)
                    </h4>
                    <p className="text-xl mt-1 text-white/90 font-body leading-relaxed">
                      LTV over 80% requires mortgage default insurance per CMHC rules.
                      <br />Total Premium: <span className="font-calculator font-semibold text-[#F7A279]">{formatCurrency(cmhcPremium)}</span>
                      <br />Base Rate: <span className="font-calculator font-semibold text-[#F7A279]">{((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}%</span> of loan amount
                      {amortizationYears > 25 && <><br />+ <span className="font-calculator text-[#F7A279]">0.25%</span> amortization surcharge (26-30 years)</>}
                      {isFirstTimeBuyer && isNewBuild && amortizationYears === 30 && <><br />+ <span className="font-calculator text-[#F7A279]">0.20%</span> first-time buyer new build surcharge</>}
                      {purchasePrice >= 1000000 && purchasePrice <= 1500000 && ltvRatio > 80 && <><br />+ <span className="font-calculator text-[#F7A279]">0.25%</span> high-ratio surcharge ($1M-$1.5M)</>}
                      {!isTraditionalDownPayment && ltvRatio > 90 && <><br />Higher rate (<span className="font-calculator text-[#F7A279]">4.50%</span>) for borrowed down payment</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CMHC Ineligible Notice */}
          {!isEligibleForCMHC && (
            <div className="mb-16">
              <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-design-lilac text-xl mt-0.5">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-white">
                      CMHC Insurance Not Available
                    </h4>
                    <p className="text-xl mt-1 text-white/90 font-body leading-relaxed">
                      Homes over <span className="font-calculator font-semibold text-[#F7A279]">$1.5M</span> are not eligible for CMHC insurance.
                      <br />Minimum <span className="font-calculator text-[#F7A279]">20%</span> down payment required for conventional mortgage.
                    </p>
                  </div>
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