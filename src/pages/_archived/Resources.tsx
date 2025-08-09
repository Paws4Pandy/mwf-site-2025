
import React from 'react';
import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import MortgageBasics from '@/components/MortgageBasics';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';

const Resources = () => {
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <Header />
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1">
          <h1 className="text-4xl md:text-6xl font-league-spartan font-bold mb-8 text-center text-pure-black">
            Mortgage <span className="text-muted-red">Resources</span>
          </h1>
          
          <MortgageBasics />
          <ResourcesSection />
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>
  );
};

export default Resources;
