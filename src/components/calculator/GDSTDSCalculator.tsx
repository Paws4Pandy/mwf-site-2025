'use client';

import React, { useState } from 'react';
import { CONTACT_CONFIG } from '@/assets/config/contact';
import { formatCurrency } from '@/lib/constants/cmhc';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AGlassCard from '@/components/ui/AGlassCard';
import { Calculator, FileText, Info, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import calculatorConfig from '@/lib/calculator-config';

const { styles, defaults, messages } = calculatorConfig;

interface GDSTDSCalculatorProps {
  onOpenContactForm?: () => void;
}

// GDS calculation (Principal + Interest + Taxes + Heat) / Gross Annual Income
function calculateGDS(
  monthlyPayment: number,
  propertyTax: number,
  heatCost: number,
  condoFees: number,
  grossAnnualIncome: number
): number {
  const monthlyGDS = monthlyPayment + propertyTax + heatCost + (condoFees * 0.5);
  return (monthlyGDS * 12) / grossAnnualIncome * 100;
}

// TDS calculation (GDS + Other Debt Obligations) / Gross Annual Income
function calculateTDS(
  monthlyPayment: number,
  propertyTax: number,
  heatCost: number,
  condoFees: number,
  otherDebt: number,
  grossAnnualIncome: number
): number {
  const monthlyGDS = monthlyPayment + propertyTax + heatCost + (condoFees * 0.5);
  const monthlyTDS = monthlyGDS + otherDebt;
  return (monthlyTDS * 12) / grossAnnualIncome * 100;
}

const GDSTDSCalculator: React.FC<GDSTDSCalculatorProps> = ({ 
  onOpenContactForm 
}) => {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(80000);
  const [monthlyPayment, setMonthlyPayment] = useState(2000);
  const [propertyTax, setPropertyTax] = useState(400);
  const [heatCost, setHeatCost] = useState(100);
  const [condoFees, setCondoFees] = useState(0);
  const [otherDebt, setOtherDebt] = useState(500);

  // Calculate ratios
  const adjustedIncome = grossAnnualIncome;
  const gdsRatio = calculateGDS(monthlyPayment, propertyTax, heatCost, condoFees, adjustedIncome);
  const tdsRatio = calculateTDS(monthlyPayment, propertyTax, heatCost, condoFees, otherDebt, adjustedIncome);

  // CMHC limits
  const gdsLimit = 32;
  const tdsLimit = 40;

  const gdsStatus = gdsRatio <= gdsLimit ? 'pass' : 'fail';
  const tdsStatus = tdsRatio <= tdsLimit ? 'pass' : 'fail';

  return (
    <div className={styles.container.wrapper}>
      <div className={styles.container.stressTestLayout}>
        <h3 className={`text-3xl font-serif italic text-white font-normal text-center mb-20`}>
          GDS/TDS Debt Service Ratios—Qualify for Your Mortgage with CMHC Standards.
        </h3>

        {/* Ratio Results Cards - Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* GDS Ratio Result */}
          <AGlassCard className="text-center p-8">
            <h3 className="text-2xl font-bold text-[#61d6c5] font-display">Gross Debt Service (GDS)</h3>
            <div className={`text-4xl font-bold font-calculator mt-4 ${
              gdsStatus === 'pass' ? 'text-green-400' : 'text-red-400'
            }`}>
              {gdsRatio.toFixed(1)}%
            </div>
            <p className={`${styles.typography.resultLabel} mt-2`}>
              CMHC Limit: {gdsLimit}% {gdsStatus === 'pass' ? '✓ PASS' : '✗ FAIL'}
            </p>
            
            <div className="mt-4 text-sm text-white/80">
              <div>Principal + Interest: {formatCurrency(monthlyPayment)}</div>
              <div>+ Property Tax: {formatCurrency(propertyTax)}</div>
              <div>+ Heat: {formatCurrency(heatCost)}</div>
              {condoFees > 0 && <div>+ 50% Condo Fees: {formatCurrency(condoFees * 0.5)}</div>}
            </div>
          </AGlassCard>

          {/* TDS Ratio Result */}
          <AGlassCard className="text-center p-8">
            <h3 className="text-2xl font-bold text-[#61d6c5] font-display">Total Debt Service (TDS)</h3>
            <div className={`text-4xl font-bold font-calculator mt-4 ${
              tdsStatus === 'pass' ? 'text-green-400' : 'text-red-400'
            }`}>
              {tdsRatio.toFixed(1)}%
            </div>
            <p className={`${styles.typography.resultLabel} mt-2`}>
              CMHC Limit: {tdsLimit}% {tdsStatus === 'pass' ? '✓ PASS' : '✗ FAIL'}
            </p>
            
            <div className="mt-4 text-sm text-white/80">
              <div>GDS Total: {formatCurrency(monthlyPayment + propertyTax + heatCost + (condoFees * 0.5))}</div>
              <div>+ Other Debt: {formatCurrency(otherDebt)}</div>
              <div className="border-t border-white/20 pt-2 mt-2 font-bold">
                Total Monthly: {formatCurrency(monthlyPayment + propertyTax + heatCost + (condoFees * 0.5) + otherDebt)}
              </div>
            </div>
          </AGlassCard>
        </div>

        {/* Input Controls Section */}
        <div className={styles.cards.inputCardFullWidth}>
          
          {/* Row 1: Income and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(grossAnnualIncome)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    Monthly: <span className={styles.typography.value}>{formatCurrency(grossAnnualIncome / 12)}</span>
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="30000"
                max="200000"
                step="5000"
                value={grossAnnualIncome}
                onChange={(e) => setGrossAnnualIncome(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Gross Annual Income
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(monthlyPayment)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    Principal + Interest Only
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="50"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Monthly Mortgage Payment
              </label>
            </div>
          </div>

          {/* Row 2: Housing Costs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(propertyTax)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    Annual: <span className={styles.typography.value}>{formatCurrency(propertyTax * 12)}</span>
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="25"
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Monthly Property Tax
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(heatCost)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    Based on property size & type
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="25"
                value={heatCost}
                onChange={(e) => setHeatCost(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Monthly Heat Cost
              </label>
              {heatCost < 100 && (
                <div className="mt-2 text-yellow-400 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  CMHC guidelines require minimum $100/month for heating costs
                </div>
              )}
            </div>
          </div>

          {/* Row 3: Additional Costs and Debt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-16">
            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(condoFees)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    50% included in GDS/TDS: <span className={styles.typography.value}>{formatCurrency(condoFees * 0.5)}</span>
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="800"
                step="25"
                value={condoFees}
                onChange={(e) => setCondoFees(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Monthly Condo Fees (Optional)
              </label>
            </div>

            <div className="px-8">
              <div className="text-left mb-4">
                <span className={`${styles.typography.value} text-2xl`}>{formatCurrency(otherDebt)}</span>
                <div className="mt-2">
                  <span className={`text-sm ${styles.typography.helper}`}>
                    Credit cards, loans, LOCs
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={otherDebt}
                onChange={(e) => setOtherDebt(Number(e.target.value))}
                className={styles.form.slider.track}
              />
              <label className={`block ${styles.typography.label} mt-4 text-left`}>
                Other Monthly Debt Payments
              </label>
            </div>
            {/* CMHC Rules Information */}
            <div className="px-8">
              <div className="bg-blue-50/10 border border-white/20 rounded-xl p-6 shadow-sm w-full backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-2 font-display text-lg">
                  <Info className="inline w-5 h-5 mr-2" />
                  CMHC Debt Service Rules
                </h4>
                <div className="text-xs text-white/80 space-y-1">
                  <div className="flex justify-between">
                    <span>GDS Limit:</span>
                    <span className="text-[#F7A279] font-bold">39%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TDS Limit:</span>
                    <span className="text-[#F7A279] font-bold">44%</span>
                  </div>
                  <div className="pt-2 border-t border-white/20 mt-2">
                    <div className="text-xs">
                      • Condo fees: 50% included
                    </div>
                    <div className="text-xs">
                      • Heat: Minimum $100/month
                    </div>
                    <div className="text-xs">
                      • Credit cards: Min 3% of balance
                    </div>
                  </div>
                </div>
              </div>
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
                    These calculations follow CMHC guidelines for debt service ratios. Lenders may have additional requirements. 
                    The qualifying interest rate must be the greater of contract rate + 2% or 5.25%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Buttons */}
      <div className={styles.actions.container}>
        <div className={styles.actions.group}>
          <LiquidGlassButton
            href="/rates"
            variant="primary"
            size="md"
            icon={<TrendingUp className="w-4 h-4" />}
            className={styles.actions.primary}
          >
            View Current Rates
          </LiquidGlassButton>
          
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

export default GDSTDSCalculator;