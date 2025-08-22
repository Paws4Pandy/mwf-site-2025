import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RatesTable from '@/components/RatesTable';
import CalculatorSelection from '@/components/CalculatorSelection';
import MortgageFAQ from '@/components/MortgageFAQ';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';

const Rates = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Gradient Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/gradients/17.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
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
            <div className="mb-12 opacity-0 animate-fade-in-delay-1">
              <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ED8071] leading-[0.85] mb-4">
                Current
                <br />
                <span className="text-white">Mortgage Rates</span>
              </h1>
            </div>
            
            <div className="mb-16 opacity-0 animate-fade-in-delay-2">
              <p className="text-xl md:text-2xl font-hk-grotesk-light text-white/90 max-w-4xl mx-auto leading-relaxed">
                Current mortgage rates for Ontario residents updated daily
              </p>
            </div>
          </div>

          {/* Rates Content - Increased spacing with Liquid Glass */}
          <div className="mt-20 mb-20 opacity-0 animate-fade-in-delay-3">
            <LiquidGlassWrapper
              mode="standard"
              intensity={0.3}
              scale={0.5}
            >
              <div className="max-w-4xl mx-auto">
                <RatesTable 
                  title="" 
                  compact={false}
                />
              </div>
            </LiquidGlassWrapper>
          </div>
          
          {/* Calculator Selection Section */}
          <div className="mt-32 mb-20 opacity-0 animate-fade-in-delay-4">
            <LiquidGlassWrapper
              mode="standard"
              intensity={0.3}
              scale={0.5}
            >
              <div className="max-w-6xl mx-auto">
                <CalculatorSelection />
              </div>
            </LiquidGlassWrapper>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 mb-20 opacity-0 animate-fade-in-delay-5">
            <LiquidGlassWrapper
              mode="standard"
              intensity={0.3}
              scale={0.5}
            >
              <div className="max-w-5xl mx-auto">
                <MortgageFAQ />
              </div>
            </LiquidGlassWrapper>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-center gap-4 mt-12 mb-20 opacity-0 animate-fade-in-delay-6">
            <LiquidGlassButton
              href="/"
              variant="secondary"
              size="lg"
            >
              Back to Home
            </LiquidGlassButton>
          </div>
        </section>
        
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Rates;