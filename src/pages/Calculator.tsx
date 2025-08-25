import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MortgageCalculator } from '@/components/calculator/MortgageCalculator';
import { AdvancedMortgageCalculator } from '@/components/calculator/AdvancedMortgageCalculator';
import LandTransferTaxCalculator from '@/components/calculator/LandTransferTaxCalculator';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';
import { Calculator as CalculatorIcon, TrendingUp, Home, FileText, DollarSign } from 'lucide-react';

// Tab configuration with icons and descriptions
const tabs = [
  {
    id: 'quick-payment',
    label: 'Quick Payment',
    icon: CalculatorIcon,
    description: 'Get instant mortgage payment estimates',
    component: MortgageCalculator
  },
  {
    id: 'stress-test',
    label: 'Stress Test',
    icon: TrendingUp,
    description: 'Verify qualification with stress test',
    component: AdvancedMortgageCalculator
  },
  {
    id: 'heloc',
    label: 'HELOC',
    icon: Home,
    description: 'Home Equity Line of Credit calculator',
    component: null // Coming soon
  },
  {
    id: 'land-transfer',
    label: 'Land Transfer Tax',
    icon: FileText,
    description: 'Calculate land transfer tax costs',
    component: LandTransferTaxCalculator
  },
  {
    id: 'rental-income',
    label: 'Rental Income',
    icon: DollarSign,
    description: 'Investment property calculations',
    component: null // Coming soon
  }
];

// Coming Soon component for placeholder tabs
const ComingSoon: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-16 text-center border border-white/20 shadow-2xl">
      <div className="text-6xl mb-6">🚀</div>
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <p className="text-xl text-white/80 mb-8">{description}</p>
      <div className="bg-gradient-to-r from-design-lilac/20 to-design-gold/20 rounded-lg p-4 border border-design-gold/30">
        <p className="text-design-gold font-semibold">Coming Soon!</p>
        <p className="text-white/90 text-sm mt-2">We're working hard to bring you this calculator. Stay tuned!</p>
      </div>
    </div>
  </div>
);

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('quick-payment');

  // Get the active tab configuration
  const activeTabConfig = tabs.find(tab => tab.id === activeTab) || tabs[0];
  const ActiveComponent = activeTabConfig.component;

  return (
    <div className="min-h-screen relative">
      {/* Optimized Gradient Background - replaces 5.2MB SVG with 3KB CSS */}
      <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-hunter-green via-sage to-warm-gray" />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="fixed inset-0 bg-black/10 z-[1]" />
      
      {/* Scrollable content container */}
      <div className="relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4">
          <Header transparent={true} />
        
        {/* Main content */}
        <section className="py-10 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12 opacity-0 animate-fade-in-delay-1">
              <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ED8071] leading-[0.85] mb-4">
                Mortgage
                <br />
                <span className="text-white">Calculators</span>
              </h1>
            </div>
            
            <div className="mb-16 opacity-0 animate-fade-in-delay-2">
              <p className="text-xl md:text-2xl font-roboto-flex text-white/90 max-w-4xl mx-auto leading-relaxed">
                Calculate your mortgage payments, explore CMHC insurance premiums and learn more about how to qualify for a home purchase
              </p>
            </div>
          </div>

          {/* Tab Navigation - LIQUID GLASS MORPHISM */}
          <div className="mb-16 opacity-0 animate-fade-in-delay-3">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <div key={tab.id} className="relative">
                    <LiquidGlassWrapper
                      mode={activeTab === tab.id ? 'prominent' : 'standard'}
                      intensity={activeTab === tab.id ? 0.3 : 0.2}
                      scale={0.3}
                      className="absolute inset-0 rounded-2xl"
                    />
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`group relative z-10 overflow-hidden px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex-1 min-w-[200px] max-w-[260px] ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-design-lilac to-design-lilac/90 text-white shadow-2xl scale-105 border-2 border-design-lilac'
                          : 'bg-white/70 border-2 border-white/40 hover:bg-white/80 text-design-charcoal hover:text-design-lilac shadow-lg'
                      }`}
                      style={{
                        boxShadow: activeTab === tab.id 
                          ? '0 12px 40px rgba(139, 69, 139, 0.4), 0 6px 20px rgba(221, 168, 63, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {/* Animated background shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {/* Content */}
                      <div className="relative flex items-center justify-center gap-3">
                        <IconComponent className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-design-charcoal'}`} />
                        <span className={`text-lg font-medium ${activeTab === tab.id ? 'text-white' : 'text-design-charcoal'}`}>{tab.label}</span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
            
          </div>

          {/* Calculator Content - Increased spacing with Liquid Glass */}
          <div className="mt-20 mb-20 opacity-0 animate-fade-in-delay-4">
            <LiquidGlassWrapper
              mode="standard"
              intensity={0.3}
              scale={0.5}
            >
              {ActiveComponent ? (
                <ActiveComponent />
              ) : (
                <ComingSoon 
                  title={activeTabConfig.label}
                  description={activeTabConfig.description}
                />
              )}
            </LiquidGlassWrapper>
          </div>
          
        </section>
        
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Calculator;