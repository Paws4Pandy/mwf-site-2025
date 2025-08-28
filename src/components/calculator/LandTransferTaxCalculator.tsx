'use client';

import React, { useState } from 'react';
import { CONTACT_CONFIG } from '@/assets/config/contact';
import { formatCurrency } from '@/lib/constants/cmhc';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AGlassCard from '@/components/ui/AGlassCard';
import { Calculator, FileText, Info, AlertCircle, TrendingUp } from 'lucide-react';
import calculatorConfig from '@/lib/calculator-config';

const { styles, defaults, messages } = calculatorConfig;

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
  const [propertyValue, setPropertyValue] = useState(defaults.landTransferTax.propertyValue.default);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [isInToronto, setIsInToronto] = useState(true);

  const lttResults = lttCalculator(propertyValue, isInToronto, isFirstTimeBuyer);
  const currentRate = getLTTRateForBracket(propertyValue);

  return (
    <div className={styles.container.wrapper}>
      <div className={styles.container.stressTestLayout}>
        <h3 className={`text-3xl font-serif italic text-white font-normal text-center mb-20`}>
          Land Transfer Tax Calculator—Know Your Closing Costs Before You Buy.
        </h3>

        {/* Total LTT and Breakdown Cards - Moved to Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Total LTT Result */}
          <AGlassCard className="text-center p-8">
            <h3 className="text-3xl font-bold text-[#61d6c5] font-display">Total Land Transfer Tax</h3>
            <div className="text-4xl font-bold text-[#61d6c5] font-calculator mt-4">
              {formatCurrency(lttResults.total)}
            </div>
            <p className={`${styles.typography.resultLabel} mt-2`}>Amount Due at Closing</p>
            
            {/* First-Time Buyer Rebate Notice */}
            {isFirstTimeBuyer && lttResults.rebates > 0 && (
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-green-400 font-bold text-sm">✓ First-Time Buyer Rebates Applied</p>
                <p className="text-xs text-white/60">You're saving {formatCurrency(lttResults.rebates)}</p>
              </div>
            )}
          </AGlassCard>

          {/* Tax Breakdown Card */}
          <AGlassCard className="p-8">
            <h4 className={styles.typography.sectionHeader}>Tax Breakdown</h4>
            <div className="space-y-4 mt-6">
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>{messages.landTransferTax.results.provincialTax}:</span>
                <span className={styles.results.breakdown.highlight}>{formatCurrency(lttResults.ontarioLTT)}</span>
              </div>
              
              {isInToronto && (
                <div className={styles.results.breakdown.row}>
                  <span className={styles.results.breakdown.label}>{messages.landTransferTax.results.municipalTax}:</span>
                  <span className={styles.results.breakdown.highlight}>{formatCurrency(lttResults.torontoLTT)}</span>
                </div>
              )}
              
              {isFirstTimeBuyer && lttResults.rebates > 0 && (
                <div className={styles.results.breakdown.row}>
                  <span className="text-green-400 text-xl font-medium font-body">Rebates:</span>
                  <span className="text-green-400 font-bold text-xl font-calculator">-{formatCurrency(lttResults.rebates)}</span>
                </div>
              )}
              
              <div className={`${styles.results.breakdown.row} border-t pt-3 font-bold`}>
                <span className={styles.results.breakdown.label}>Current LTT Rate:</span>
                <span className={styles.results.breakdown.value}>{currentRate}</span>
              </div>
            </div>
          </AGlassCard>
        </div>

        {/* Input Controls Section */}
        <div className={styles.cards.inputCardFullWidth}>
          
          {/* Row 1: Property Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(propertyValue)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    Current LTT Rate: <span className={styles.typography.value}>{currentRate}</span>
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={defaults.landTransferTax.propertyValue.min}
                max={defaults.landTransferTax.propertyValue.max}
                step={defaults.landTransferTax.propertyValue.step}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                {messages.landTransferTax.labels.propertyValue}
              </label>
            </div>

            {/* LTT Rate Schedule Information */}
            <div className="px-8">
              <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm w-full backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-2 font-display text-lg">
                  <Info className="inline w-5 h-5 mr-2" />
                  Ontario LTT Rate Schedule
                </h4>
                <div className="text-xs text-white/80 space-y-1">
                  <div className="flex justify-between">
                    <span>$0 - $55,000:</span>
                    <span className="text-[#F7A279]">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$55,001 - $250,000:</span>
                    <span className="text-[#F7A279]">1.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$250,001 - $400,000:</span>
                    <span className="text-[#F7A279]">1.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$400,001 - $2,000,000:</span>
                    <span className="text-[#F7A279]">2.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Over $2,000,000:</span>
                    <span className="text-[#F7A279]">2.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Location and First-Time Buyer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
            <div className="px-8">
              <div className="space-y-4">
                {/* Location Toggle */}
                <div>
                  <label className={styles.form.checkbox.container}>
                    <input
                      type="checkbox"
                      checked={isInToronto}
                      onChange={(e) => setIsInToronto(e.target.checked)}
                      className={styles.form.checkbox.input}
                    />
                    <span className={styles.form.checkbox.label}>
                      Located in Toronto (Additional Municipal LTT applies)
                    </span>
                  </label>
                </div>

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
                      {messages.landTransferTax.labels.firstTimeBuyer}
                    </span>
                  </label>
                  {isFirstTimeBuyer && (
                    <p className={styles.form.checkbox.description}>
                      You may be eligible for up to {formatCurrency(isInToronto ? 8475 : 4000)} in rebates
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* First-Time Buyer Information Card */}
            <div className="px-8">
              {isFirstTimeBuyer ? (
                <div className="bg-green-50/10 border border-green-400/20 rounded-xl p-6 shadow-sm w-full backdrop-blur-sm">
                  <h4 className="font-semibold text-white mb-2 font-display text-lg">
                    🎉 First-Time Buyer Rebates
                  </h4>
                  <div className="text-sm text-white/80 space-y-1">
                    <div className="flex justify-between">
                      <span>Ontario Rebate:</span>
                      <span className="text-green-400">Up to {formatCurrency(4000)}</span>
                    </div>
                    {isInToronto && (
                      <div className="flex justify-between">
                        <span>Toronto Rebate:</span>
                        <span className="text-green-400">Up to {formatCurrency(4475)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-white/20 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Your Savings:</span>
                        <span className="text-green-400">{formatCurrency(lttResults.rebates)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm w-full backdrop-blur-sm">
                  <h4 className="font-semibold text-white mb-2 font-display text-lg">
                    About Land Transfer Tax
                  </h4>
                  <p className="text-white/90 text-sm font-body leading-relaxed">
                    Land Transfer Tax is paid when you purchase a property. Toronto has both provincial and municipal LTT, while other Ontario cities only have provincial LTT.
                  </p>
                  <p className="text-white/90 text-sm font-body leading-relaxed mt-2">
                    First-time buyers may be eligible for rebates that can significantly reduce or eliminate LTT costs.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="mb-16">
            <div className="bg-yellow-50/10 border border-yellow-400/20 rounded-xl p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-design-gold mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Important Notice</h4>
                  <p className="text-white/90 text-sm font-body leading-relaxed">
                    This calculator provides estimates only. Actual LTT may vary based on specific circumstances. 
                    Consult with a lawyer or your mortgage professional for precise calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Buttons - Same layout as Advanced Calculator */}
      <div className={styles.actions.container}>
        <div className={styles.actions.group}>
          {/* Get Pre-Approved Button */}
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

export default LandTransferTaxCalculator;