import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RatesService } from '@/services/ratesService';
import type { MortgageRate } from '@/lib/constants/cmhc';

interface RatesContextType {
  rates: MortgageRate[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshRates: () => Promise<void>;
  getBest5YearFixed: () => number;
  getRate: (term: string, type: 'Fixed' | 'Variable') => MortgageRate | null;
}

const RatesContext = createContext<RatesContextType | undefined>(undefined);

interface RatesProviderProps {
  children: ReactNode;
}

export const RatesProvider: React.FC<RatesProviderProps> = ({ children }) => {
  const [rates, setRates] = useState<MortgageRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const freshRates = await RatesService.getRates(forceRefresh);
      setRates(freshRates);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch rates';
      setError(errorMessage);
      console.error('RatesProvider: Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshRates = async () => {
    await fetchRates(true);
  };

  const getBest5YearFixed = (): number => {
    const rate = rates.find(r => r.term === '5 Year' && r.type === 'Fixed');
    if (rate) {
      return parseFloat(rate.rate.replace('%', ''));
    }
    return 4.79; // Fallback rate
  };

  const getRate = (term: string, type: 'Fixed' | 'Variable'): MortgageRate | null => {
    return rates.find(r => r.term === term && r.type === type) || null;
  };

  // Load rates on mount
  useEffect(() => {
    fetchRates();
  }, []);

  // Auto-refresh rates daily at 9 AM EST
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRates(false); // Use cache if available
    }, 24 * 60 * 60 * 1000); // 1 day

    return () => clearInterval(interval);
  }, []);

  const contextValue: RatesContextType = {
    rates,
    loading,
    error,
    lastUpdated,
    refreshRates,
    getBest5YearFixed,
    getRate
  };

  return (
    <RatesContext.Provider value={contextValue}>
      {children}
    </RatesContext.Provider>
  );
};

export const useRates = (): RatesContextType => {
  const context = useContext(RatesContext);
  if (context === undefined) {
    throw new Error('useRates must be used within a RatesProvider');
  }
  return context;
};

// Convenience hooks for common use cases
export const useBest5YearFixed = (): number => {
  const { getBest5YearFixed } = useRates();
  return getBest5YearFixed();
};

export const useRate = (term: string, type: 'Fixed' | 'Variable'): MortgageRate | null => {
  const { getRate } = useRates();
  return getRate(term, type);
};