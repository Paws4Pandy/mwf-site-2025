'use client';

import React, { useState, useEffect } from 'react';
import { CONTACT_CONFIG } from '@/assets/config/contact';
import { formatCurrency, formatPercent } from '@/lib/constants/cmhc';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AGlassCard from '@/components/ui/AGlassCard';
import { Calculator, FileText, Info, AlertCircle } from 'lucide-react';

interface LandTransferTaxCalculatorProps {
  onOpenContactForm?: () => void;
}

// Ontario LTT calculation
function calcOntarioLTT(price: number): number {
  let tax = 0;
  if (price > 2000000) {
    tax += (price - 2000000) * 0.025;
    price = 2000000;
  }
  if (price > 400000) {
    tax += (price - 400000) * 0.02;
    price = 400000;
  }
  if (price > 250000) {
    tax += (price - 250000) * 0.015;
    price = 250000;
  }
  if (price > 55000) {
    tax += (price - 55000) * 0.01;
    price = 55000;
  }
  tax += price * 0.005;
  return tax;
}

// Toronto LTT calculation (same rates as Ontario)
function calcTorontoLTT(price: number): number {
  let tax = 0;
  if (price > 2000000) {
    tax += (price - 2000000) * 0.025;
    price = 2000000;
  }
  if (price > 400000) {
    tax += (price - 400000) * 0.02;
    price = 400000;
  }
  if (price > 250000) {
    tax += (price - 250000) * 0.015;
    price = 250000;
  }
  if (price > 55000) {
    tax += (price - 55000) * 0.01;
    price = 55000;
  }
  tax += price * 0.005;
  return tax;
}

// First-time buyer rebate for Ontario
function firstTimeBuyerRebateOntario(price: number): number {
  const tax = calcOntarioLTT(price);
  return Math.min(tax, 4000);
}

// First-time buyer rebate for Toronto
function firstTimeBuyerRebateToronto(price: number): number {
  const tax = calcTorontoLTT(price);
  return Math.min(tax, 4475);
}

// Main LTT calculation logic
function lttCalculator(price: number, isToronto: boolean, isFirstTimeBuyer: boolean) {
  const ontarioLTT = calcOntarioLTT(price);
  const torontoLTT = isToronto ? calcTorontoLTT(price) : 0;
  let rebates = 0;

  if (isFirstTimeBuyer) {
    rebates += firstTimeBuyerRebateOntario(price);
    if (isToronto) {
      rebates += firstTimeBuyerRebateToronto(price);
    }
  }

  const total = Math.max((ontarioLTT + torontoLTT) - rebates, 0);

  return {
    ontarioLTT,
    torontoLTT,
    rebates,
    total
  };
}

// Get the LTT rate for a given bracket
function getLTTRateForBracket(price: number): string {
  if (price <= 55000) return '0.5%';
  if (price <= 250000) return '1.0%';
  if (price <= 400000) return '1.5%';
  if (price <= 2000000) return '2.0%';
  return '2.5%';
}

const LandTransferTaxCalculator: React.FC<LandTransferTaxCalculatorProps> = ({ 
  onOpenContactForm
}) => {
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [isToronto, setIsToronto] = useState(false);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);

  const lttResult = lttCalculator(purchasePrice, isToronto, isFirstTimeBuyer);
  const effectiveRate = (lttResult.total / purchasePrice) * 100;
  const torontoAdminFee = isToronto ? 86.78 * 1.13 : 0; // $86.78 + HST
  const totalWithFees = lttResult.total + torontoAdminFee;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input Controls */}
        <AGlassCard className="hover:shadow-2xl transition-all duration-300 flex flex-col">
            <h2 className="text-3xl font-bold mb-8 text-white font-display">
              Calculate your Land Transfer Tax
            </h2>
            
            <div className="space-y-6">
              {/* Purchase Price Slider */}
              <div>
                <label className="block text-3xl font-bold mb-2 text-gray-orange font-display">
                  Purchase Price: <span className="font-bold text-gray-orange font-calculator">{formatCurrency(purchasePrice)}</span>
                </label>
                <input
                  type="range"
                  min="300000"
                  max="3000000"
                  step="25000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full h-4 bg-gradient-to-r from-design-lilac/30 to-design-gold/50 rounded-lg appearance-none cursor-pointer slider-custom"
                />
                <div className="flex justify-between text-xl text-white/80 mt-1 font-calculator">
                  <span>$300K</span>
                  <span>$3M</span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-white/80 text-xl font-body">
                    Current bracket rate: <span className="font-bold text-gray-orange font-calculator">{getLTTRateForBracket(purchasePrice)}</span>
                  </span>
                </div>
              </div>

              {/* Location Toggle */}
              <div>
                <label className="block text-3xl font-bold mb-4 text-gray-orange font-display">
                  Property Location
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsToronto(false)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 font-semibold ${
                      !isToronto 
                        ? 'border-design-lilac bg-design-lilac/20 text-white' 
                        : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    Rest of Ontario
                  </button>
                  <button
                    onClick={() => setIsToronto(true)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 font-semibold ${
                      isToronto 
                        ? 'border-design-gold bg-design-gold/20 text-white' 
                        : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    City of Toronto
                  </button>
                </div>
                {isToronto && (
                  <div className="mt-3 bg-design-gold/10 border border-design-gold/30 rounded-lg p-3">
                    <p className="text-white text-xl font-semibold">
                      <Info className="w-4 h-4 inline mr-1" />
                      Toronto Property Notice
                    </p>
                    <p className="text-white/80 text-xl mt-1">
                      You'll pay both Provincial and Municipal Land Transfer Tax
                    </p>
                  </div>
                )}
              </div>

              {/* First-Time Buyer Toggle */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFirstTimeBuyer}
                    onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                    className="w-5 h-5 text-design-lilac focus:ring-design-lilac border-design-charcoal/30 rounded"
                  />
                  <span className="text-3xl font-semibold text-white font-display">
                    First-time homebuyer
                  </span>
                </label>
                {isFirstTimeBuyer && (
                  <div className="mt-3 bg-design-lilac/10 border border-design-lilac/30 rounded-lg p-3">
                    <p className="text-white text-xl font-semibold">
                      ✓ First-Time Buyer Rebates Available
                    </p>
                    <ul className="text-white/80 text-xl mt-2 space-y-1">
                      <li>• Ontario rebate: up to $4,000</li>
                      {isToronto && <li>• Toronto rebate: up to $4,475</li>}
                      <li>• Must be 18+ and Canadian citizen/PR</li>
                      <li>• Must occupy within 9 months</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Rate Breakdown */}
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h4 className="text-3xl font-bold mb-3 text-white font-display">
                  Ontario LTT Rate Structure
                </h4>
                <div className="space-y-3 text-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-body">First $55,000:</span>
                    <span className="text-white font-semibold font-calculator">0.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-body">$55,001 - $250,000:</span>
                    <span className="text-white font-semibold font-calculator">1.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-body">$250,001 - $400,000:</span>
                    <span className="text-white font-semibold font-calculator">1.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-body">$400,001 - $2,000,000:</span>
                    <span className="text-white font-semibold font-calculator">2.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 font-body">Over $2,000,000:</span>
                    <span className="text-white font-semibold font-calculator">2.5%</span>
                  </div>
                  {isToronto && (
                    <div className="mt-3 pt-2 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="text-design-gold font-body">Toronto adds identical rates</span>
                        <span className="text-design-gold font-semibold font-calculator">Double the tax</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
        </AGlassCard>

        {/* Results Panel */}
        <AGlassCard className="hover:shadow-2xl transition-all duration-300">
          <div className="h-[800px] flex flex-col">
            {/* Main LTT Result */}
            <div className="rounded-2xl shadow-xl p-6 text-center text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-design-lilac via-design-charcoal to-design-gold mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-3 font-display">Total Land Transfer Tax</h3>
                <div className="text-4xl font-bold mb-2 font-calculator">
                  {formatCurrency(totalWithFees)}
                </div>
                <p className="text-3xl font-medium text-gray-100 font-body">
                  {effectiveRate.toFixed(3)}% of purchase price
                </p>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {/* Tax Breakdown */}
              <div className="backdrop-blur-sm rounded-2xl shadow-xl p-4 border-2 hover:shadow-2xl transition-all duration-300 bg-white/10 border-white/20">
                <h4 className="text-3xl font-bold mb-3 text-white font-display">Tax Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-medium text-white font-body">Ontario LTT:</span>
                    <span className="font-bold text-white text-xl font-calculator">{formatCurrency(lttResult.ontarioLTT)}</span>
                  </div>
                  
                  {isToronto && (
                    <div className="flex justify-between">
                      <span className="text-xl font-medium text-white font-body">Toronto LTT:</span>
                      <span className="font-bold text-design-gold text-xl font-calculator">{formatCurrency(lttResult.torontoLTT)}</span>
                    </div>
                  )}

                  {isFirstTimeBuyer && lttResult.rebates > 0 && (
                    <div className="flex justify-between">
                      <span className="text-xl font-medium text-green-400 font-body">First-Time Buyer Rebates:</span>
                      <span className="font-bold text-green-400 text-xl font-calculator">-{formatCurrency(lttResult.rebates)}</span>
                    </div>
                  )}

                  {isToronto && (
                    <div className="flex justify-between">
                      <span className="text-xl font-medium text-white font-body">Toronto Admin Fee (incl. HST):</span>
                      <span className="font-bold text-white text-xl font-calculator">{formatCurrency(torontoAdminFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-t pt-3">
                    <span className="text-xl font-medium text-white font-body">Total Amount Due:</span>
                    <span className="font-bold text-white text-xl font-calculator">{formatCurrency(totalWithFees)}</span>
                  </div>
                </div>
              </div>

              {/* Rebate Details */}
              {isFirstTimeBuyer && (
                <div className="bg-gradient-to-r from-green-500/10 to-green-500/20 border border-green-500/30 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl mt-0.5">✓</span>
                    <div>
                      <h4 className="font-semibold text-white">
                        First-Time Buyer Rebates Applied
                      </h4>
                      <div className="text-xl mt-2 text-white/80 space-y-1 font-body">
                        <p>• Ontario rebate: <span className="font-calculator">{formatCurrency(Math.min(lttResult.ontarioLTT, 4000))}</span></p>
                        {isToronto && (
                          <p>• Toronto rebate: <span className="font-calculator">{formatCurrency(Math.min(lttResult.torontoLTT, 4475))}</span></p>
                        )}
                        <p className="mt-2 font-semibold text-green-400">
                          Total savings: <span className="font-calculator">{formatCurrency(lttResult.rebates)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Notes */}
              <div className="bg-gradient-to-r from-design-gold/10 to-design-gold/20 border border-design-gold/30 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-design-gold w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Important Considerations</h4>
                    <ul className="text-xl mt-2 text-white/80 space-y-1 font-body leading-relaxed">
                      <li>• LTT is due on closing date</li>
                      <li>• Additional costs may include legal fees and title insurance</li>
                      <li>• Non-residents may face additional speculation tax (15%)</li>
                      {isFirstTimeBuyer && (
                        <>
                          <li>• First-time buyer status must be declared and verified</li>
                          <li>• Property must be occupied as principal residence within 9 months</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Comparison */}
              {!isFirstTimeBuyer && (
                <div className="bg-design-lilac/10 border border-design-lilac/30 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-white mb-2">💡 Did you know?</h4>
                  <p className="text-xl text-white/80 font-body">
                    First-time buyers could save up to <span className="font-calculator font-semibold">{formatCurrency(isToronto ? 8475 : 4000)}</span> in rebates on this purchase.
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons - Fixed at bottom */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Mortgage Calculator Button */}
              <LiquidGlassButton
                href="/calculator"
                variant="primary"
                size="md"
                icon={<Calculator className="w-4 h-4" />}
                className="w-full"
              >
                Mortgage Calculator
              </LiquidGlassButton>
              
              {/* Get Pre-Approved Button */}
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

export default LandTransferTaxCalculator;