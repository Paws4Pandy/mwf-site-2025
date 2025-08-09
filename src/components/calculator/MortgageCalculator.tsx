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
    <div className="max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column - Input Controls */}
        <div className="rounded-2xl shadow-xl backdrop-blur-sm border-2 p-8 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20 flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-8 text-white">
            Mortgage Details
          </h3>
          
          <div className="space-y-10 flex-1">
            {/* Purchase Price Slider */}
            <div>
              <label className="block text-xl font-bold mb-2 text-white font-hk-grotesk-light font-light">
                Purchase Price: <span className="font-bold text-white">{formatCurrency(purchasePrice)}</span>
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
                                              <div className="flex justify-between text-sm text-white/80 mt-1 font-hk-grotesk-light font-light">
                  <span>$500K</span>
                  <span>$2M</span>
                </div>
              </div>

            {/* Down Payment Slider */}
            <div>
              <label className="block text-xl font-bold mb-2 text-white font-hk-grotesk-light font-light">
                Down Payment: <span className="font-bold text-white">{formatCurrency(downPayment)} ({formatPercent((downPayment/purchasePrice)*100)})</span>
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
              <div className="flex justify-between text-base text-white/90 mt-1 font-medium font-hk-grotesk-light font-light">
                <span>Minimum: {formatCurrency(minDownPayment)}</span>
                <span>50%: {formatCurrency(purchasePrice * 0.50)}</span>
              </div>
              
              {/* Down Payment Info */}
              <div className="mt-3 space-y-2">
                
                {(downPayment/purchasePrice) > 0.20 && (
                  <div className="bg-design-gold/10 border border-design-gold/30 rounded-lg p-4">
                    <p className="text-white text-base font-semibold">
                      ℹ️ High Down Payment Notice
                    </p>
                    <p className="text-white/80 text-base mt-2">
                      Consider keeping more cash for closing costs, renovations, or investments
                    </p>
                  </div>
                )}
                

                
                

              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xl font-bold text-white font-hk-grotesk-light font-light">
                  Interest Rate: <span className="font-bold text-white">{interestRate}%</span>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={refreshRates}
                    disabled={loading}
                    className="px-3 py-1 text-xs bg-design-plum/20 hover:bg-design-plum/40 text-white rounded border border-design-plum/30 transition-colors disabled:opacity-50"
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
                className="w-full h-4 bg-gradient-to-r from-design-plum/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
              />
              <div className="flex justify-between text-sm text-white/80 mt-2 font-hk-grotesk-light font-light">
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
              <label className="block text-xl font-bold mb-2 text-white font-hk-grotesk-light font-light">
                Amortization: <span className="font-bold text-white">{amortizationYears} years</span>
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
              <div className="flex justify-between text-sm text-white/80 mt-2 font-hk-grotesk-light font-light">
                <span>15 years</span>
                <span>30 years</span>
              </div>
              {amortizationYears > 25 && (
                <p className="text-design-gold text-base font-medium mt-2">
                  ⚠️ CMHC charges 0.25% surcharge for amortization over 25 years
                </p>
              )}
            </div>
            

          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {/* Main Payment Result */}
          <div className="rounded-2xl shadow-xl p-8 text-center text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-design-plum via-design-charcoal to-design-gold">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Monthly Payment</h3>
            <div className="text-6xl font-bold mb-3">
              {formatCurrency(monthlyPayment)}
            </div>
            <p className="text-xl font-medium text-gray-100">Principal & Interest</p>
            </div>
          </div>

          {/* Checkbox Options Card */}
          <div className="rounded-2xl shadow-xl backdrop-blur-sm border-2 p-6 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20">
            <h3 className="text-xl font-bold mb-4 text-white">
              Additional Options
            </h3>
            
            <div className="space-y-4">
              {/* First-Time Buyer Toggle */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFirstTimeBuyer}
                    onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                    className="w-5 h-5 text-design-plum focus:ring-design-plum border-design-charcoal/30 rounded"
                  />
                  <span className="text-lg font-semibold text-white font-hk-grotesk-light font-light">
                    First-time homebuyer
                  </span>
                </label>
                {isFirstTimeBuyer && (
                  <p className="text-design-plum text-sm font-medium mt-1 ml-8 font-hk-grotesk-light font-light">
                    ✓ Eligible for 30-year amortization on new builds & rebates up to $8,475
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
                      className="w-5 h-5 text-design-plum focus:ring-design-plum border-design-charcoal/30 rounded"
                    />
                    <span className="text-lg font-semibold text-white font-hk-grotesk-light font-light">
                      New build home (First-time buyer)
                    </span>
                  </label>
                  {isNewBuild && amortizationYears === 30 && (
                    <p className="text-design-gold text-sm font-medium mt-1 ml-8 font-hk-grotesk-light font-light">
                      ⚠️ Additional 0.20% CMHC surcharge for 30-year new build
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
                    className="w-5 h-5 text-design-plum focus:ring-design-plum border-design-charcoal/30 rounded"
                  />
                  <span className="text-lg font-semibold text-white font-hk-grotesk-light font-light">
                    Borrowed down payment
                  </span>
                </label>
                {!isTraditionalDownPayment && ltvRatio > 90 && (
                  <p className="text-design-charcoal text-sm font-medium mt-1 ml-8 font-hk-grotesk-light font-light">
                    ⚠️ Higher CMHC premium rate (4.50%) for borrowed down payment
                  </p>
                )}
              </div>

              {/* Conventional Mortgage Notice */}
              {(downPayment/purchasePrice) >= 0.20 && (
                <div className="bg-design-plum/10 border border-design-plum/30 rounded-lg p-3 mt-3">
                  <p className="text-white text-sm font-semibold font-hk-grotesk-light font-light">
                    ✓ Conventional Mortgage (20%+ down payment)
                  </p>
                  <p className="text-white/80 text-sm mt-1 font-hk-grotesk-light font-light">
                    No CMHC insurance required - save on premium costs
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white/10 border-white/20">
            <h4 className="text-xl font-bold mb-4 text-white">CMHC Calculation Breakdown</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-white font-hk-grotesk-light font-light">Loan Amount:</span>
                <span className="font-bold text-white text-base font-hk-grotesk-light font-light">{formatCurrency(loanAmount)}</span>
              </div>
              {requiresCMHC && (
                <>
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-white font-hk-grotesk-light font-light">CMHC Premium Rate:</span>
                    <span className="font-bold text-design-gold text-base font-hk-grotesk-light font-light">
                      {((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-white font-hk-grotesk-light font-light">CMHC Insurance:</span>
                    <span className="font-bold text-design-gold text-base font-hk-grotesk-light font-light">{formatCurrency(cmhcPremium)}</span>
                  </div>
                  {amortizationYears > 25 && (
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-white font-hk-grotesk-light font-light">Amortization Surcharge:</span>
                      <span className="font-bold text-design-gold text-base font-hk-grotesk-light font-light">0.25%</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between border-t pt-3">
                <span className="text-base font-medium text-white font-hk-grotesk-light font-light">Total Loan:</span>
                <span className="font-bold text-white text-base font-hk-grotesk-light font-light">{formatCurrency(totalLoanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base font-medium text-white font-hk-grotesk-light font-light">LTV Ratio:</span>
                <span className="font-bold text-white text-base font-hk-grotesk-light font-light">{formatPercent(ltvRatio)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base font-medium text-white font-hk-grotesk-light font-light">Amortization:</span>
                <span className="font-bold text-white text-base font-hk-grotesk-light font-light">{amortizationYears} years</span>
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
                  <p className="text-sm mt-1 text-white/80">
                    LTV over 80% requires mortgage default insurance per CMHC rules.
                    <br />Total Premium: {formatCurrency(cmhcPremium)}
                    <br />Base Rate: {((Object.entries(CMHC_RULES.premiumRates).find(([ltv]) => ltvRatio <= parseFloat(ltv))?.[1] ?? 0) * 100).toFixed(2)}% of loan amount
                    {amortizationYears > 25 && <><br />+ 0.25% amortization surcharge (26-30 years)</>}
                    {isFirstTimeBuyer && isNewBuild && amortizationYears === 30 && <><br />+ 0.20% first-time buyer new build surcharge</>}
                    {purchasePrice >= 1000000 && purchasePrice <= 1500000 && ltvRatio > 80 && <><br />+ 0.25% high-ratio surcharge ($1M-$1.5M)</>}
                    {!isTraditionalDownPayment && ltvRatio > 90 && <><br />Higher rate (4.50%) for borrowed down payment</>}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* CMHC Ineligible Notice */}
          {!isEligibleForCMHC && (
            <div className="bg-gradient-to-r from-design-charcoal/10 to-design-charcoal/20 border border-design-charcoal/30 rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <span className="text-design-plum text-xl mt-0.5">⚠️</span>
                <div>
                  <h4 className="font-semibold text-white">
                    CMHC Insurance Not Available
                  </h4>
                  <p className="text-sm mt-1 text-white/80">
                    Homes over $1.5M are not eligible for CMHC insurance.
                    <br />Minimum 20% down payment required for conventional mortgage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* View Current Rates Button */}
            <a 
              href="/rates" 
              className="px-6 py-3 text-lg font-semibold inline-block rounded-lg text-white hover:text-black transition-all duration-300 bg-design-plum hover:bg-design-gold text-center"
            >
              View Current Rates
            </a>
            
            {/* Start Application Button */}
            {onOpenContactForm ? (
              <button
                onClick={onOpenContactForm}
                className="px-6 py-3 text-lg font-semibold inline-block rounded-lg text-black hover:text-white transition-all duration-300 bg-design-gold hover:bg-design-plum text-center"
              >
                Get Pre-Approved
              </button>
            ) : (
              <a 
                href={CONTACT_CONFIG.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-lg font-semibold inline-block rounded-lg text-black hover:text-white transition-all duration-300 bg-design-gold hover:bg-design-plum text-center"
              >
                {CONTACT_CONFIG.cta.primary}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>  
  );
};

export default MortgageCalculator;