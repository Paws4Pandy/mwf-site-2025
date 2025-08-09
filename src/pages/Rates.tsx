import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import RatesTable from '@/components/RatesTable';

const Rates = () => {
  return (
    <PageBackground>
      {/* Header outside container for consistent positioning */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10 pt-24">
        
        <section className="mb-16 opacity-0 animate-fade-in-delay-1 pt-8">
          <h1 className="text-4xl md:text-6xl mb-8 text-center font-noto-serif-display italic font-normal">
            <span className="text-design-plum">Current</span> <span className="text-design-gold">Mortgage Rates</span>
          </h1>
          
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-white/80 text-lg leading-relaxed">
              Current mortgage rates for Ontario residents.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <RatesTable 
              title="Current Mortgage Rates" 
              showRefreshButton={true}
              compact={false}
            />
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/calculator" 
              className="inline-block px-6 py-3 rounded-xl border-2 border-design-gold text-white bg-design-gold/10 hover:bg-design-gold hover:text-black transition-all duration-300 font-medium mr-4"
            >
              Use Calculator
            </a>
            <a 
              href="/" 
              className="inline-block px-6 py-3 rounded-xl border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 font-medium"
            >
              Back to Home
            </a>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Rates;