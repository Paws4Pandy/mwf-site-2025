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

interface MortgageCalculatorProps {
  onOpenContactForm?: () => void;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ 
  onOpenContactForm
}) => {
  const { rates, loading, error, lastUpdated, refreshRates } = useRates();
  const best5YearFixed = useBest5YearFixed();
  
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(best5YearFixed);
  const [amortizationYears, setAmortizationYears] = useState(25);
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
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input Controls - FIXED HEIGHT */}
        <AGlassCard className="hover:shadow-2xl transition-all duration-300 flex flex-col">
          <h2 className="text-3xl font-bold mb-8 text-white font-display">
            Get instant mortgage payment estimates
          </h2>
          
          <div className="space-y-6">
            {/* Purchase Price Slider */}
            <div>
              <label className="block text-3xl font-bold mb-2 text-gray-orange font-display">
                Purchase Price: <span className="font-bold text-gray-orange font-calculator">{formatCurrency(purchasePrice)}</span>
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
                className="w-full h-4 bg-gradient-to-r from-design-lilac/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-xl text-white/80 mt-1 font-calculator">
                <span>$500K</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <label className="block text-3xl font-bold mb-2 text-gray-orange font-display">
                Down Payment: <span className="font-bold text-gray-orange font-calculator">{formatCurrency(downPayment)} ({formatPercent((downPayment/purchasePrice)*100)})</span>
              </label>
              <input
                type="range"
                min={minDownPayment}
                max={purchasePrice * 0.50}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-lilac/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-xl text-white/80 mt-1 font-calculator">
                <span>Minimum: {formatCurrency(minDownPayment)}</span>
                <span>50%: {formatCurrency(purchasePrice * 0.50)}</span>
              </div>
              
              {/* Down Payment Info */}
              <div className="mt-3 space-y-2">
                {(downPayment/purchasePrice) > 0.20 && (
                  <div className="bg-design-gold/10 border border-design-gold/30 rounded-lg p-4">
                    <p className="text-white text-xl font-semibold font-display">
                      ℹ️ High Down Payment Notice
                    </p>
                    <p className="text-white/80 text-xl mt-2 font-body leading-relaxed">
                      Consider keeping more cash for closing costs, renovations, or investments
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-3xl font-bold text-gray-orange font-display">
                  Interest Rate: <span className="font-bold text-gray-orange font-calculator">{interestRate}%</span>
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
                min="3"
                max="7"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-lilac/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-xl text-white/80 mt-2 font-calculator">
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
              <label className="block text-3xl font-bold mb-2 text-gray-orange font-display">
                Amortization: <span className="font-bold text-gray-orange font-calculator">{amortizationYears} years</span>
              </label>
              <input
                type="range"
                min="15"
                max="30"
                step="1"
                value={amortizationYears}
                onChange={(e) => setAmortizationYears(Number(e.target.value))}
                className="w-full h-4 bg-gradient-to-r from-design-lilac/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-xl text-white/80 mt-2 font-calculator">
                <span>15 years</span>
                <span>30 years</span>
              </div>
              {amortizationYears > 25 && (
                <p className="text-design-gold text-xl font-medium mt-2">
                  ⚠️ CMHC charges 0.25% surcharge for amortization over 25 years
                </p>
              )}
            </div>
          </div>
        </AGlassCard>

        {/* Results Panel - FIXED HEIGHT */}
        <AGlassCard className="hover:shadow-2xl transition-all duration-300">
          <div className="h-[800px] flex flex-col">
          {/* Main Payment Result */}
          <div className="rounded-2xl shadow-xl p-6 text-center text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-design-lilac via-design-charcoal to-design-gold mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-3 font-display">Monthly Payment</h3>
              <div className="text-4xl font-bold mb-2 font-calculator">
                {formatCurrency(monthlyPayment)}
              </div>
              <p className="text-xl font-medium text-gray-100 font-body">Principal & Interest</p>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {/* Checkbox Options Card */}
            <div className="rounded-2xl shadow-xl backdrop-blur-sm border-2 p-4 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20">
              <h4 className="text-3xl font-bold mb-3 text-white font-display">
                Additional Options
              </h4>
              
              <div className="space-y-4">
                {/* First-Time Buyer Toggle */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFirstTimeBuyer}
                      onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                      className="w-5 h-5 text-design-lilac focus:ring-design-lilac border-design-charcoal/30 rounded"
                    />
                    <span className="text-xl font-semibold text-white font-display">
                      First-time homebuyer
                    </span>
                  </label>
                  {isFirstTimeBuyer && (
                    <p className="text-design-lilac text-xl font-medium mt-1 ml-8 font-body leading-relaxed">
                      ✓ Eligible for 30-year amortization on new builds & rebates up to <span className="font-calculator">$8,475</span>
                    </p>
                  )}
                </div>

                {/* New Build Toggle (for First-Time Buyers) */}
                {isFirstTimeBuyer && (
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNewBuild}
                        onChange={(e) => setIsNewBuild(e.target.checked)}
                        className="w-5 h-5 text-design-lilac focus:ring-design-lilac border-design-charcoal/30 rounded"
                      />
                      <span className="text-xl font-semibold text-white font-display">
                        New build home (First-time buyer)
                      </span>
                    </label>
                    {isNewBuild && amortizationYears === 30 && (
                      <p className="text-design-gold text-xl font-medium mt-1 ml-8 font-body leading-relaxed">
                        ⚠️ Additional <span className="font-calculator">0.20%</span> CMHC surcharge for 30-year new build
                      </p>
                    )}
                  </div>
                )}

                {/* Down Payment Source Toggle */}
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!isTraditionalDownPayment}
                      onChange={(e) => setIsTraditionalDownPayment(!e.target.checked)}
                      className="w-5 h-5 text-design-lilac focus:ring-design-lilac border-design-charcoal/30 rounded"
                    />
                    <span className="text-xl font-semibold text-white font-display">
                      Borrowed down payment
                    </span>
                  </label>
                  {!isTraditionalDownPayment && ltvRatio > 90 && (
                    <p className="text-design-charcoal text-xl font-medium mt-1 ml-8 font-body leading-relaxed">
                      ⚠️ Higher CMHC premium rate (<span className="font-calculator">4.50%</span>) for borrowed down payment
                    </p>
                  )}
                </div>

                {/* Conventional Mortgage Notice */}
                {(downPayment/purchasePrice) >= 0.20 && (
                  <div className="bg-design-lilac/10 border border-design-lilac/30 rounded-lg p-3 mt-3">
                    <p className="text-white text-xl font-semibold font-display">
                      ✓ Conventional Mortgage (20%+ down payment)
                    </p>
                    <p className="text-white/80 text-xl mt-1 font-body leading-relaxed">
                      No CMHC insurance required - save on premium costs
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="backdrop-blur-sm rounded-2xl shadow-xl p-4 border-2 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20">
              <h4 className="text-3xl font-bold mb-3 text-white font-display">CMHC Calculation Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-white font-body">Loan Amount:</span>
                  <span className="font-bold text-white text-xl font-calculator">{formatCurrency(loanAmount)}</span>
                </div>
                {requiresCMHC && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-medium text-white font-body">CMHC Premium Rate:</span>
                      <span className="font-bold text-design-gold text-xl font-calculator">
                        {((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-medium text-white font-body">CMHC Insurance:</span>
                      <span className="font-bold text-design-gold text-xl font-calculator">{formatCurrency(cmhcPremium)}</span>
                    </div>
                    {amortizationYears > 25 && (
                      <div className="flex justify-between">
                        <span className="text-xl font-medium text-white font-body">Amortization Surcharge:</span>
                        <span className="font-bold text-design-gold text-xl font-calculator">0.25%</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-xl font-medium text-white font-body">Total Loan:</span>
                  <span className="font-bold text-white text-xl font-calculator">{formatCurrency(totalLoanAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-white font-body">LTV Ratio:</span>
                  <span className="font-bold text-white text-xl font-calculator">{formatPercent(ltvRatio)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-white font-body">Amortization:</span>
                  <span className="font-bold text-white text-xl font-calculator">{amortizationYears} years</span>
                </div>
              </div>
            </div>

            {/* CMHC Notice */}
            {requiresCMHC && isEligibleForCMHC && (
              <div className="bg-gradient-to-r from-design-gold/10 to-design-gold/20 border border-design-gold/30 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-design-gold text-xl mt-0.5">ℹ️</span>
                  <div>
                    <h4 className="font-semibold text-white">
                      CMHC Insurance Required (Official 2025 Rates)
                    </h4>
                    <p className="text-xl mt-1 text-white/80 font-body leading-relaxed">
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

          {/* CTA Buttons - Fixed at bottom */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* View Current Rates Button */}
            <LiquidGlassButton
              href="/rates"
              variant="primary"
              size="md"
              icon={<TrendingUp className="w-4 h-4" />}
              className="w-full"
            >
              View Current Rates
            </LiquidGlassButton>
            
            {/* Start Application Button */}
            {onOpenContactForm ? (
              <button
                onClick={onOpenContactForm}
                className="w-full px-6 py-4 text-xl font-semibold inline-block rounded-lg text-white transition-all duration-300 text-center font-display"
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
                className="w-full"
              >
                {CONTACT_CONFIG.cta.primary}
              </LiquidGlassButton>
            )}
          </div>
          </div>
        </AGlassCard>
      </div>
    </div>  
  );
};

export default MortgageCalculator;