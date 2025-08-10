import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import MortgageCalculator from '@/components/calculator/MortgageCalculator';
import { AdvancedMortgageCalculator } from '@/components/calculator/AdvancedMortgageCalculator';
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
    component: null // Coming soon
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
      <div className="bg-gradient-to-r from-design-plum/20 to-design-gold/20 rounded-lg p-4 border border-design-gold/30">
        <p className="text-design-gold font-semibold">Coming Soon!</p>
        <p className="text-white/70 text-sm mt-2">We're working hard to bring you this calculator. Stay tuned!</p>
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
    <PageBackground>
      {/* Header outside container for consistent positioning */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10 pt-24">
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1 pt-8">
          {/* Main heading - updated to plural "Calculators" */}
          <h1 className="text-4xl md:text-6xl mb-8 text-center font-noto-serif-display italic font-normal">
            <span className="text-design-plum">Mortgage</span> <span className="text-design-gold">Calculators</span>
          </h1>
          
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <p className="text-white/80 text-lg leading-relaxed mb-2">
              Calculate your mortgage payments, explore CMHC insurance premiums
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              and learn more about how to qualify for a home purchase
            </p>
          </div>

          {/* Tab Navigation - LIQUID GLASS MORPHISM */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <LiquidGlassWrapper
                    key={tab.id}
                    mode={activeTab === tab.id ? 'prominent' : 'standard'}
                    intensity={activeTab === tab.id ? 0.6 : 0.3}
                    scale={0.4}
                  >
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 flex-1 min-w-[200px] max-w-[240px] ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-design-plum to-design-gold shadow-2xl scale-105'
                          : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
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
                        <IconComponent className="w-5 h-5" />
                        <span className="font-hammersmith text-sm">{tab.label}</span>
                      </div>
                    </button>
                  </LiquidGlassWrapper>
                );
              })}
            </div>
            
          </div>

          {/* Calculator Content - Increased spacing with Liquid Glass */}
          <div className="mt-20 mb-20">
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
    </PageBackground>
  );
};

export default Calculator;