import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Calculator, BarChart3, Target, Clock, AlertCircle } from 'lucide-react';
import AGlassCard from '@/components/ui/AGlassCard';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

interface RateComparisonWidgetProps {
  className?: string;
}

const RateComparisonWidget: React.FC<RateComparisonWidgetProps> = ({ className = "" }) => {
  const [selectedComparison, setSelectedComparison] = useState<'trends' | 'calculator' | 'insights'>('trends');

  // Mock data for demonstration - replace with real data from your API
  const rateTrends = [
    { term: '5 Year Fixed', current: '4.04%', previous: '4.19%', change: -0.15, trend: 'down' },
    { term: '5 Year Variable', current: '3.95%', previous: '4.05%', change: -0.10, trend: 'down' },
    { term: '3 Year Fixed', current: '3.69%', previous: '3.89%', change: -0.20, trend: 'down' },
    { term: '1 Year Fixed', current: '4.79%', previous: '4.99%', change: -0.20, trend: 'down' },
  ];

  const marketInsights = [
    {
      title: 'Rate Environment',
      description: 'Rates are trending downward across most terms, creating favorable conditions for borrowers.',
      icon: TrendingDown,
      color: 'text-green-400'
    },
    {
      title: 'Best Value',
      description: '5-year variable rates offer the lowest rates with flexibility for future refinancing.',
      icon: Target,
      color: 'text-blue-400'
    },
    {
      title: 'Market Timing',
      description: 'Current market conditions suggest this may be an optimal time to lock in rates.',
      icon: Clock,
      color: 'text-yellow-400'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change < 0) return 'text-green-400';
    if (change > 0) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className={className}>
      <AGlassCard>
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-anton text-white mb-2">
              Rate Analysis & Insights
            </h2>
            <p className="text-white/80 font-roboto-flex">
              Understand current trends and make informed decisions
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/10 rounded-lg p-1 backdrop-blur-sm">
              {[
                { key: 'trends', label: 'Rate Trends', icon: TrendingUp },
                { key: 'calculator', label: 'Quick Calc', icon: Calculator },
                { key: 'insights', label: 'Market Insights', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedComparison(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    selectedComparison === tab.key
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          {selectedComparison === 'trends' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Rate Changes
              </h3>
              
              <div className="grid gap-4">
                {rateTrends.map((rate, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(rate.trend)}
                      <span className="text-white font-medium">{rate.term}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-lg font-semibold">{rate.current}</div>
                      <div className={`text-sm ${getChangeColor(rate.change)}`}>
                        {rate.change > 0 ? '+' : ''}{rate.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedComparison === 'calculator' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Quick Payment Calculator
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Loan Amount</label>
                    <input
                      type="number"
                      placeholder="500,000"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Rate (%)</label>
                    <input
                      type="number"
                      placeholder="4.04"
                      step="0.01"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Term (years)</label>
                    <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30">
                      <option value="25">25 years</option>
                      <option value="30">30 years</option>
                      <option value="35">35 years</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="text-white font-semibold mb-3">Monthly Payment</h4>
                  <div className="text-3xl font-bold text-white mb-2">$2,456</div>
                  <div className="text-white/70 text-sm">
                    Based on 25-year amortization
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-white/80">
                    <div className="flex justify-between">
                      <span>Principal & Interest:</span>
                      <span>$2,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property Tax:</span>
                      <span>+ $417</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span>+ $83</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedComparison === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Market Analysis
              </h3>
              
              <div className="grid gap-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className={`${insight.color} mt-1`}>
                      <insight.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
                      <p className="text-white/80 text-sm leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-1">Important Note</h4>
                    <p className="text-white/80 text-sm">
                      Rates are subject to change and may vary based on your specific financial situation, 
                      credit score, and property details. Contact us for personalized rate quotes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <LiquidGlassButton
              href="/contact"
              variant="primary"
              size="lg"
              className="mr-4"
            >
              Get Personalized Rates
            </LiquidGlassButton>
            <LiquidGlassButton
              href="/calculator"
              variant="secondary"
              size="lg"
            >
              Full Calculator
            </LiquidGlassButton>
          </div>
        </div>
      </AGlassCard>
    </div>
  );
};

export default RateComparisonWidget;
