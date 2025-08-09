
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import ProcessMap from '@/components/ProcessMap';

const GettingStarted = () => {
  return <PageBackground>
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <Header />
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1">
          {/* Process Map Section */}
          <div className="my-16">
            <h2 className="text-3xl font-hammersmith font-normal mb-10 text-center text-hunter-green">
              How I <span className="text-muted-red">Work With You</span>
            </h2>
            
            <ProcessMap />
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>;
};

export default GettingStarted;
