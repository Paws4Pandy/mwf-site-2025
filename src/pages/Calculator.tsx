import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import MortgageCalculator from '@/components/calculator/MortgageCalculator';
import { getH1Classes } from '@/assets/config/typography';

const Calculator = () => {
  return (
    <PageBackground>
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <Header />
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1 pt-8">
          <h1 className="text-4xl md:text-6xl mb-8 text-center font-noto-serif-display italic font-normal">
            <span className="text-design-plum">Mortgage</span> <span className="text-design-gold">Calculator</span>
          </h1>
          
          <div className="mb-24 text-center max-w-3xl mx-auto">
            <p className="text-white/80 text-lg leading-relaxed">
              Calculate your mortgage payments and understand CMHC insurance requirements.
            </p>
          </div>
          
          {/* Mortgage Calculator Component */}
          <MortgageCalculator />
          
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Calculator;