import React from 'react';
import { useRates } from '@/contexts/RatesContext';
import { TrendingDown, TrendingUp, Minus, Info, Star } from 'lucide-react';
import AGlassCard from '@/components/ui/AGlassCard';

/**
 * STANDARD RATE TABLE DESIGN - APPROVED BY CLIENT (August 2025)
 * 
 * This is the finalized, approved rate table design featuring:
 * - Liquid glass backdrop-blur cards with perfect gradient backgrounds
 * - Popular rates highlighted at top (5-year fixed and variable)
 * - ALL mortgage terms displayed: 1,2,3,4,5,6,10 year for both fixed/variable
 * - Prominent trend arrows (w-5 h-5) with drop shadows
 * - Large, readable fonts: text-lg for terms, text-2xl for popular rates
 * - High contrast white text on glass backgrounds
 * - Professional spacing and hover effects
 * - No 'per annum' text (removed per client request)
 * 
 * CLIENT FEEDBACK: "gradient, cards background, spacing and fonts including 
 * colours are near perfect. save this as a standard 'rate table' design"
 * 
 * DO NOT MODIFY THIS DESIGN WITHOUT CLIENT APPROVAL
 */

interface RatesTableProps {
  title?: string;
  compact?: boolean;
  className?: string;
}

const RatesTable: React.FC<RatesTableProps> = ({ 
  title = "Current Mortgage Rates",
  compact = false,
  className = ""
}) => {
  const { rates, loading, error, lastUpdated } = useRates();
  
  // Default rates for fallback (current RateHub rates)
  const defaultRates = [
    { term: '1 Year', type: 'Fixed' as const, rate: '4.79%' },
    { term: '2 Year', type: 'Fixed' as const, rate: '4.29%' },
    { term: '3 Year', type: 'Fixed' as const, rate: '3.69%' },
    { term: '3 Year', type: 'Variable' as const, rate: '4.15%' },
    { term: '4 Year', type: 'Fixed' as const, rate: '4.29%' },
    { term: '5 Year', type: 'Fixed' as const, rate: '4.04%' },
    { term: '5 Year', type: 'Variable' as const, rate: '3.95%' }
  ];
  
  // Use default rates if no rates are available
  const displayRates = rates.length > 0 ? rates : defaultRates;
  console.log('RatesTable: Using rates:', displayRates);

  if (loading && displayRates.length === 0) {
    return (
      <div className={className}>
        <AGlassCard>
          <div className="animate-pulse">
            <div className="h-6 bg-white/20 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-white/20 rounded w-20"></div>
                  <div className="h-4 bg-white/20 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </AGlassCard>
      </div>
    );
  }

  // Get all rates from context
  console.log('RatesTable: All rates from context:', displayRates);
  
  // Show all fixed rates and variable rates
  const fixedRates = displayRates.filter(r => r.type === 'Fixed');
  const variableRates = displayRates.filter(r => r.type === 'Variable');
  
  console.log('RatesTable: Fixed rates:', fixedRates);
  console.log('RatesTable: Variable rates:', variableRates);
  
  // Get popular rates for highlighting
  const popular5YearFixed = fixedRates.find(r => r.term === '5 Year');
  const popular5YearVariable = variableRates.find(r => r.term === '5 Year');

  // Mock trend data (you could calculate this from historical data)
  const getTrend = (term: string) => {
    const trends: { [key: string]: 'up' | 'down' | 'stable' } = {
      '1 Year': 'down',
      '2 Year': 'stable',
      '3 Year': 'down',
      '4 Year': 'stable',
      '5 Year': 'up',
      '6 Year': 'down',
      '10 Year': 'stable',
      '5 Year Variable': 'down' // Only real variable rate
    };
    return trends[`${term} Variable`] || trends[term] || 'stable';
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-red-500 drop-shadow-lg" />;
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-green-500 drop-shadow-lg" />;
    return <Minus className="w-5 h-5 text-yellow-500 drop-shadow-lg" />;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Popular Rates Section */}
      {!compact && (popular5YearFixed || popular5YearVariable) && (
        <AGlassCard className="hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-brand-red fill-current" />
              <h3 className="font-anton text-white text-xl">
                Popular Rates
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {popular5YearFixed && (
                <div className="bg-gradient-to-br from-brand-red/20 to-transparent backdrop-blur-md border border-brand-red/30 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white font-hammersmith text-2xl">
                        5 Year Fixed
                      </span>
                      <p className="text-white/70 text-sm">Most Popular</p>
                    </div>
                    <div className="text-right">
                      <span className="font-anton text-3xl text-brand-red">
                        {popular5YearFixed.rate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {popular5YearVariable && (
                <div className="bg-gradient-to-br from-light-crimson/20 to-transparent backdrop-blur-md border border-light-crimson/30 rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white font-hammersmith text-2xl">
                        5 Year Variable
                      </span>
                      <p className="text-white/70 text-sm">Flexible Option</p>
                    </div>
                    <div className="text-right">
                      <span className="font-anton text-3xl text-light-crimson">
                        {popular5YearVariable.rate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </AGlassCard>
      )}
      
      {/* Main rates card */}
      <AGlassCard className="hover:shadow-2xl transition-all duration-300">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className={`font-anton text-white ${compact ? 'text-lg' : 'text-2xl'}`}>
                {title}
              </h3>
              {!compact && (
                <p className="text-white/60 text-sm mt-1">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              )}
            </div>
            {/* Refresh button removed - automatic updates only */}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl">
              <p className="text-red-300 text-sm flex items-center gap-2 font-hammersmith">
                <Info className="w-4 h-4" />
                Showing default rates
              </p>
            </div>
          )}

          {/* Rates Display */}
          {compact ? (
            // Compact View
            <div className="grid grid-cols-2 gap-2">
              {[...fixedRates, ...variableRates].map((rate, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 px-3 border-b border-white/10 last:border-b-0"
                >
                  <span className="text-white/90 text-sm font-hammersmith">
                    {rate.term}
                  </span>
                  <span className="text-brand-red font-anton text-sm">
                    {rate.rate}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // Single Column Layout - Only Fixed Rates Displayed
            <div className="space-y-6">
              {/* Fixed Rates Section */}
              {fixedRates.length > 0 && (
                <div>
                  <h4 className="font-anton text-brand-red mb-4 text-xl">
                    Fixed Mortgage Rates
                  </h4>
                  <div className="space-y-4">
                    {fixedRates.map((rate, index) => (
                      <div 
                        key={`fixed-${index}`}
                        className="flex justify-between items-center py-4 border-b border-white/10 last:border-b-0 group hover:bg-white/5 transition-all duration-200 rounded-lg px-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white font-hammersmith text-2xl">
                            {rate.term} Fixed
                          </span>
                          <TrendIcon trend={getTrend(rate.term)} />
                        </div>
                        <span className="font-anton text-brand-red text-3xl">
                          {rate.rate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Variable Rates Section */}
              {variableRates.length > 0 && (
                <div>
                  <h4 className="font-anton text-light-crimson mb-4 text-xl">
                    Variable Mortgage Rates
                  </h4>
                  <div className="space-y-4">
                    {variableRates.map((rate, index) => (
                      <div 
                        key={`variable-${index}`}
                        className="flex justify-between items-center py-4 border-b border-white/10 last:border-b-0 group hover:bg-white/5 transition-all duration-200 rounded-lg px-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white font-hammersmith text-2xl">
                            {rate.term} Variable
                          </span>
                          <TrendIcon trend={getTrend(`${rate.term} Variable`)} />
                        </div>
                        <span className="font-anton text-light-crimson text-3xl">
                          {rate.rate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Info */}
          {!compact && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-white/60 leading-relaxed text-center font-hammersmith">
                Individual rates may vary based on credit score, down payment, and other qualification factors
              </p>
            </div>
          )}
      </AGlassCard>
    </div>
  );
};

export default RatesTable;