import React from 'react';
import { useRates } from '@/contexts/RatesContext';
import { formatPercent } from '@/lib/constants/cmhc';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';

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
      <div className={`rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-6 ${className}`}>
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
    );
  }

  const fixedRates = rates.filter(r => r.type === 'Fixed');
  const variableRates = rates.filter(r => r.type === 'Variable');

  return (
    <div className={`rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-bold text-white ${compact ? 'text-lg' : 'text-xl'}`}>
          {title}
        </h3>
        {showRefreshButton && (
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshRates}
              disabled={loading}
              className="px-3 py-1 text-xs bg-design-plum/20 hover:bg-design-plum/40 text-white rounded border border-design-plum/30 transition-colors disabled:opacity-50"
            >
              {loading ? '⟳' : '↻'} {compact ? '' : 'Refresh'}
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">
            ⚠️ Showing default rates
          </p>
        </div>
      )}

      {/* Rates Grid - Compact Design */}
      {compact ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {[...fixedRates, ...variableRates].map((rate, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <span className="text-white/90 text-xs font-light">
                {rate.term}
              </span>
              <span className="text-design-gold font-bold text-sm">
                {rate.rate}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fixed Rates */}
          {fixedRates.length > 0 && (
            <div>
              <h4 className="font-semibold text-design-gold mb-3 text-base">
                Fixed Rates
              </h4>
              <div className="space-y-2">
                {fixedRates.map((rate, index) => (
                  <div 
                    key={`fixed-${index}`}
                    className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-white font-medium text-base">
                      {rate.term}
                    </span>
                    <span className="font-bold text-design-gold text-lg">
                      {rate.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variable Rates */}
          {variableRates.length > 0 && (
            <div>
              <h4 className="font-semibold text-design-plum mb-3 text-base">
                Variable Rates
              </h4>
              <div className="space-y-2">
                {variableRates.map((rate, index) => (
                  <div 
                    key={`variable-${index}`}
                    className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-white font-medium text-base">
                      {rate.term}
                    </span>
                    <span className="font-bold text-design-plum text-lg">
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
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/60 leading-relaxed">
            Individual rates may vary based on credit score, down payment, and other factors.
          </p>
        </div>
      )}

      {/* Best Rate Highlight */}
      {fixedRates.length > 0 && !compact && (
        <div className="mt-3 p-3 bg-design-gold/10 border border-design-gold/30 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Best 5-Year Fixed Rate:</span>
            <span className="font-bold text-design-gold text-lg">
              {fixedRates.find(r => r.term === '5 Year')?.rate || 'N/A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatesTable;