import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MortgageCalculator from '@/components/calculator/MortgageCalculator';
import { AdvancedMortgageCalculator } from '@/components/calculator/AdvancedMortgageCalculator';
import LandTransferTaxCalculator from '@/components/calculator/LandTransferTaxCalculator';
import GDSTDSCalculator from '@/components/calculator/GDSTDSCalculator';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
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
    id: 'land-transfer',
    label: 'Land Transfer Tax',
    icon: FileText,
    description: 'Calculate land transfer tax costs',
    component: LandTransferTaxCalculator
  },
  {
    id: 'gds-tds',
    label: 'GDS/TDS Ratios',
    icon: DollarSign,
    description: 'Debt service ratio qualification calculator',
    component: GDSTDSCalculator
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
  // Get tab from URL parameter or default to quick-payment
  const urlParams = new URLSearchParams(window.location.search);
  const tabFromUrl = urlParams.get('tab') || 'quick-payment';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Get the active tab configuration
  const activeTabConfig = tabs.find(tab => tab.id === activeTab) || tabs[0];
  const ActiveComponent = activeTabConfig.component;

  return (
    <div className="min-h-screen relative">
      {/* Background image using 105.png */}
      <div 
        className="fixed inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/105.png)' }}
      />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="fixed inset-0 bg-black/10 z-[1]" />
      
      {/* Scrollable content container */}
      <div className="relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4">
          <Header transparent={true} />
        
        {/* Main content */}
        <section className="py-10 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-20 opacity-0 animate-fade-in-delay-1">
              <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ED8071] leading-[0.85] mb-4">
                Mortgage
                <br />
                <span className="text-white">Calculators</span>
              </h1>
            </div>
            
          </div>

          {/* Tab Navigation - Using LiquidGlassButton */}
          <div className="mb-16 opacity-0 animate-fade-in-delay-3">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <LiquidGlassButton
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variant={activeTab === tab.id ? "accent" : "primary"}
                    size="md"
                    icon={<IconComponent className="w-5 h-5" />}
                    className="min-w-[200px] max-w-[260px]"
                  >
                    {tab.label}
                  </LiquidGlassButton>
                );
              })}
            </div>
            
          </div>

          {/* Calculator Content - Improved spacing and padding */}
          <div className="mt-32 mb-32 opacity-0 animate-fade-in-delay-4 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <LiquidGlassWrapper
                mode="standard"
                intensity={0.3}
                scale={0.5}
                className="p-8 md:p-12"
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
