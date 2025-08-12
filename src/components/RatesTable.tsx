import React from 'react';
import { useRates } from '@/contexts/RatesContext';
import { TrendingDown, TrendingUp, Minus, Info, Star } from 'lucide-react';

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
  
  // Debug logging to understand the issue
  React.useEffect(() => {
    console.log('RatesTable: Current rates:', rates);
    console.log('RatesTable: Rates count:', rates.length);
    console.log('RatesTable: Fixed rates:', rates.filter(r => r.type === 'Fixed'));
    console.log('RatesTable: Variable rates:', rates.filter(r => r.type === 'Variable'));
  }, [rates]);

  if (loading && rates.length === 0) {
    return (
      <div className={`relative rounded-3xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 blur-xl" />
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
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
        </div>
      </div>
    );
  }

  const fixedRates = rates.filter(r => r.type === 'Fixed');
  const variableRates = rates.filter(r => r.type === 'Variable');
  
  console.log('RatesTable: Processing rates...', {
    totalRates: rates.length,
    fixedCount: fixedRates.length,
    variableCount: variableRates.length,
    fixedTerms: fixedRates.map(r => r.term),
    variableTerms: variableRates.map(r => r.term)
  });
  
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
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-light-crimson/20 blur-xl" />
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300">
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
          </div>
        </div>
      )}
      
      {/* Main rates card */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 blur-xl" />
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:shadow-2xl transition-all duration-300">
          
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
              {/* DEBUG INFO - REMOVE AFTER FIXING */}
              <div className="mt-2 p-2 bg-black/50 rounded text-xs text-yellow-300">
                DEBUG: Total: {rates.length} | Fixed: {fixedRates.length} | Variable: {variableRates.length}
                <br/>
                Fixed Terms: {fixedRates.map(r => r.term).join(', ')}
                <br/>
                Variable Terms: {variableRates.map(r => r.term).join(', ')}
              </div>
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
                  <h4 className="font-anton text-brand-red mb-4 text-lg">
                    Fixed Mortgage Rates
                  </h4>
                  <div className="space-y-3">
                    {fixedRates.map((rate, index) => (
                      <div 
                        key={`fixed-${index}`}
                        className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0 group hover:bg-white/5 transition-all duration-200 rounded-lg px-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white font-hammersmith text-lg">
                            {rate.term}
                          </span>
                          <TrendIcon trend={getTrend(rate.term)} />
                        </div>
                        <span className="font-anton text-brand-red text-xl">
                          {rate.rate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Note: Variable Rates section removed - only 5-year variable shows in Popular Rates */}
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
        </div>
      </div>
    </div>
  );
};

export default RatesTable;