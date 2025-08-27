import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RatesTable from '@/components/RatesTable';
import RateComparisonWidget from '@/components/RateComparisonWidget';
import CalculatorSelection from '@/components/CalculatorSelection';
import MortgageFAQ from '@/components/MortgageFAQ';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';
import { TrendingUp, Home, FileText, DollarSign, Calculator } from 'lucide-react';

// Tab configuration with icons and descriptions
const tabs = [
  {
    id: 'current-rates',
    label: 'Current Rates',
    icon: TrendingUp,
    description: 'View today\'s mortgage rates',
    component: RatesTable
  },
  {
    id: 'calculators',
    label: 'Calculators',
    icon: DollarSign,
    description: 'Access mortgage calculators',
    component: CalculatorSelection
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: FileText,
    description: 'Frequently asked questions',
    component: MortgageFAQ
  }
];

const Rates = () => {
  const [activeTab, setActiveTab] = useState('current-rates');

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
              <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ffa072] leading-[0.85] mb-4">
                Current
                <br />
                <span className="text-white">Mortgage Rates</span>
              </h1>
            </div>
            
          </div>

          {/* Tab Navigation - Using LiquidGlassButton */}
          <div className="mb-16 opacity-0 animate-fade-in-delay-3">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      min-w-[200px] max-w-[260px] px-6 py-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 font-roboto-flex font-bold
                      ${activeTab === tab.id 
                        ? 'bg-gray-800 border-gray-600 text-white shadow-lg' 
                        : 'bg-transparent border-white text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
          </div>

          {/* Rates Content - Improved spacing and padding */}
          <div className="mt-32 mb-32 opacity-0 animate-fade-in-delay-4 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <LiquidGlassWrapper
                mode="standard"
                intensity={0.3}
                scale={0.5}
                className="p-8 md:p-12"
              >
                {activeTab === 'current-rates' && (
                  <RatesTable 
                    title="" 
                    compact={false}
                  />
                )}
                {activeTab === 'calculators' && <CalculatorSelection />}
                {activeTab === 'faq' && <MortgageFAQ />}
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

export default Rates;