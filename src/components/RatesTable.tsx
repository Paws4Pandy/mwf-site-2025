import React from 'react';
import { useRates } from '@/contexts/RatesContext';
import { TrendingDown, TrendingUp, Minus, Info } from 'lucide-react';

interface RatesTableProps {
  title?: string;
  showRefreshButton?: boolean;
  compact?: boolean;
  className?: string;
}

const RatesTable: React.FC<RatesTableProps> = ({ 
  title = "Current Mortgage Rates",
  showRefreshButton = true,
  compact = false,
  className = ""
}) => {
  const { rates, loading, error, lastUpdated, refreshRates } = useRates();

  if (loading && rates.length === 0) {
    return (
      <div className={`relative rounded-3xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-light-crimson/10 via-transparent to-light-azure/10 blur-xl" />
        <div className="relative backdrop-blur-xl bg-pure-white/5 border border-light-azure/20 rounded-3xl p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-light-azure/20 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-light-azure/20 rounded w-20"></div>
                  <div className="h-4 bg-light-azure/20 rounded w-16"></div>
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

  // Mock trend data (you could calculate this from historical data)
  const getTrend = (term: string) => {
    const trends: { [key: string]: 'up' | 'down' | 'stable' } = {
      '1 Year': 'down',
      '2 Year': 'stable',
      '3 Year': 'down',
      '5 Year': 'up',
      '3 Year Variable': 'stable',
      '5 Year Variable': 'down'
    };
    return trends[term] || 'stable';
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-red-400" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-green-400" />;
    return <Minus className="w-3 h-3 text-yellow-400" />;
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden ${className}`}>
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-crimson/20 via-transparent to-light-azure/20 blur-2xl animate-pulse" />
      
      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-pure-white/10 via-pure-white/5 to-transparent border border-light-azure/30 rounded-3xl p-6 hover:border-light-azure/50 transition-all duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className={`font-hammersmith text-pure-white ${compact ? 'text-xl' : 'text-2xl'}`}>
              {title}
            </h3>
            <p className="text-light-azure/60 text-xs mt-1">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          {showRefreshButton && (
            <button
              onClick={refreshRates}
              disabled={loading}
              className="px-4 py-2 text-xs bg-light-azure/10 hover:bg-light-azure/20 text-light-azure backdrop-blur-md rounded-full border border-light-azure/30 transition-all disabled:opacity-50"
            >
              {loading ? '⟳ Updating...' : '↻ Refresh'}
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <Info className="w-4 h-4" />
              Showing default rates
            </p>
          </div>
        )}

        {/* Rates Display */}
        {compact ? (
          // Compact View
          <div className="grid grid-cols-2 gap-3">
            {[...fixedRates, ...variableRates].map((rate, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-pure-white/5 to-transparent backdrop-blur-sm border border-light-azure/10 p-3 hover:border-light-azure/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-light-azure/80 text-xs font-opensauce">
                    {rate.term}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-light-crimson font-bold text-sm">
                      {rate.rate}
                    </span>
                    <TrendIcon trend={getTrend(rate.term)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Full View with Cards
          <div className="space-y-4">
            {/* Fixed Rates Section */}
            {fixedRates.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-muted-red/30 to-transparent" />
                  <h4 className="font-hammersmith text-muted-red text-sm uppercase tracking-wider">
                    Fixed Rates
                  </h4>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-muted-red/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fixedRates.map((rate, index) => (
                    <div 
                      key={`fixed-${index}`}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted-red/10 to-transparent backdrop-blur-md border border-muted-red/20 p-4 hover:border-muted-red/40 transition-all duration-300"
                    >
                      {/* Glass reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pure-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative flex justify-between items-center">
                        <div>
                          <span className="text-pure-white font-hammersmith text-base">
                            {rate.term}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <TrendIcon trend={getTrend(rate.term)} />
                            <span className="text-light-azure/50 text-xs">
                              {getTrend(rate.term) === 'down' ? 'Decreasing' : 
                               getTrend(rate.term) === 'up' ? 'Increasing' : 'Stable'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-anton text-2xl text-light-crimson">
                            {rate.rate}
                          </span>
                          <p className="text-light-azure/40 text-xs">per annum</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Variable Rates Section */}
            {variableRates.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-light-azure/30 to-transparent" />
                  <h4 className="font-hammersmith text-light-azure text-sm uppercase tracking-wider">
                    Variable Rates
                  </h4>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-light-azure/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {variableRates.map((rate, index) => (
                    <div 
                      key={`variable-${index}`}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-light-azure/10 to-transparent backdrop-blur-md border border-light-azure/20 p-4 hover:border-light-azure/40 transition-all duration-300"
                    >
                      {/* Glass reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pure-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative flex justify-between items-center">
                        <div>
                          <span className="text-pure-white font-hammersmith text-base">
                            {rate.term}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <TrendIcon trend={getTrend(rate.term)} />
                            <span className="text-light-azure/50 text-xs">
                              {getTrend(rate.term) === 'down' ? 'Decreasing' : 
                               getTrend(rate.term) === 'up' ? 'Increasing' : 'Stable'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-anton text-2xl text-light-azure">
                            {rate.rate}
                          </span>
                          <p className="text-light-azure/40 text-xs">per annum</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Best Rate Highlight */}
        {fixedRates.length > 0 && !compact && (
          <div className="mt-6 p-4 bg-gradient-to-r from-brand-red/20 via-light-crimson/10 to-brand-red/20 backdrop-blur-md border border-brand-red/30 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-pure-white font-hammersmith text-sm">Featured Rate</span>
                <p className="text-light-azure/60 text-xs mt-0.5">Best 5-Year Fixed</p>
              </div>
              <div className="text-right">
                <span className="font-anton text-3xl text-light-crimson">
                  {fixedRates.find(r => r.term === '5 Year')?.rate || 'N/A'}
                </span>
                <p className="text-brand-red text-xs font-hammersmith">Apply Now →</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        {!compact && (
          <div className="mt-6 pt-4 border-t border-light-azure/10">
            <p className="text-xs text-light-azure/50 leading-relaxed text-center">
              Rates vary based on credit score, down payment, and qualification factors
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatesTable;