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
      <div className={styles.container.grid}>
        {/* Left Column - Input Controls */}
        <AGlassCard className={styles.cards.inputCard}>
          <h2 className={styles.typography.sectionHeader}>
            {messages.landTransferTax.title}
          </h2>
          <p className={styles.typography.bodyText}>
            {messages.landTransferTax.subtitle}
          </p>
          
          <div className={styles.form.group}>
            {/* Property Value Slider */}
            <div>
              <label className={`block ${styles.typography.label} mb-2`}>
                {messages.landTransferTax.labels.propertyValue}: <span className={styles.typography.value}>{formatCurrency(propertyValue)}</span>
              </label>
              <input
                type="range"
                min={defaults.landTransferTax.propertyValue.min}
                max={defaults.landTransferTax.propertyValue.max}
                step={defaults.landTransferTax.propertyValue.step}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <div className={styles.form.range.container}>
                <span>$100K</span>
                <span>$10M</span>
              </div>
              <div className="mt-2">
                <span className={`text-lg ${styles.typography.helper}`}>
                  Current LTT Rate: <span className={styles.typography.value}>{currentRate}</span>
                </span>
              </div>
            </div>

            {/* Location Toggle */}
            <div className="mt-6">
              <h4 className={styles.typography.sectionHeader}>Property Location</h4>
              <div className="space-y-4">
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
              </div>
            </div>

            {/* First-Time Buyer Toggle */}
            <div className="mt-6">
              <h4 className={styles.typography.sectionHeader}>Rebates</h4>
              <div className="space-y-4">
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
          </div>
        </AGlassCard>

        {/* Results Panel */}
        <div className={styles.cards.resultContainer}>
          {/* Main Result */}
          <AGlassCard className={`${styles.cards.monthlyPayment} text-center`}>
            <h3 className={styles.typography.sectionHeader}>Total Land Transfer Tax</h3>
            <div className={styles.typography.result}>
              {formatCurrency(lttResults.total)}
            </div>
            <p className={styles.typography.resultLabel}>Amount Due at Closing</p>
          </AGlassCard>

          {/* Tax Breakdown */}
          <AGlassCard className={styles.cards.breakdownCard}>
            <h4 className={styles.typography.sectionHeader}>Tax Breakdown</h4>
            <div className="space-y-4">
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
              
              <div className={`${styles.results.breakdown.row} border-t pt-3`}>
                <span className={styles.results.breakdown.label}>Subtotal:</span>
                <span className={styles.results.breakdown.value}>{formatCurrency(lttResults.ontarioLTT + lttResults.torontoLTT)}</span>
              </div>
              
              {isFirstTimeBuyer && lttResults.rebates > 0 && (
                <div className={styles.results.breakdown.row}>
                  <span className="text-green-400 text-xl font-medium font-body">Rebates:</span>
                  <span className="text-green-400 font-bold text-xl font-calculator">-{formatCurrency(lttResults.rebates)}</span>
                </div>
              )}
              
              <div className={`${styles.results.breakdown.row} border-t pt-3 font-bold`}>
                <span className={styles.results.breakdown.label}>Final Amount:</span>
                <span className={styles.results.breakdown.value}>{formatCurrency(lttResults.total)}</span>
              </div>
            </div>
          </AGlassCard>

          {/* Tax Rate Information */}
          <AGlassCard className={styles.cards.optionsCard}>
            <h4 className={styles.typography.sectionHeader}>
              <Info className="inline w-5 h-5 mr-2" />
              LTT Rate Schedule
            </h4>
            <div className="space-y-3">
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>$0 - $55,000:</span>
                <span className={styles.results.breakdown.value}>0.5%</span>
              </div>
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>$55,001 - $250,000:</span>
                <span className={styles.results.breakdown.value}>1.0%</span>
              </div>
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>$250,001 - $400,000:</span>
                <span className={styles.results.breakdown.value}>1.5%</span>
              </div>
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>$400,001 - $2,000,000:</span>
                <span className={styles.results.breakdown.value}>2.0%</span>
              </div>
              <div className={styles.results.breakdown.row}>
                <span className={styles.results.breakdown.label}>Over $2,000,000:</span>
                <span className={styles.results.breakdown.value}>2.5%</span>
              </div>
            </div>
          </AGlassCard>

          {/* First-Time Buyer Information */}
          {isFirstTimeBuyer && (
            <div className={styles.results.success.container}>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h4 className={styles.results.success.text}>
                    First-Time Buyer Rebates Applied
                  </h4>
                  <div className={styles.results.success.body}>
                    <p>Ontario Rebate: Up to {formatCurrency(4000)}</p>
                    {isInToronto && <p>Toronto Rebate: Up to {formatCurrency(4475)}</p>}
                    <p className="mt-2">You're saving: <span className="font-calculator">{formatCurrency(lttResults.rebates)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className={styles.results.warning.container}>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-design-gold mt-1" />
              <div>
                <h4 className={styles.results.warning.text}>Important Notice</h4>
                <p className={styles.results.warning.body}>
                  This calculator provides estimates only. Actual LTT may vary based on specific circumstances. 
                  Consult with a lawyer or your mortgage professional for precise calculations.
                </p>
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