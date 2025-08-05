
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const Meet = () => {
  return <PageBackground>
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <Header />
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1">
          <h1 className="text-4xl md:text-6xl font-league-spartan font-bold mb-8 text-center text-pure-black">
            Welcome! Nice to <span className="text-muted-red">Meet You!</span>
          </h1>
          
          <div className="bg-opacity-70 backdrop-blur-sm border border-hunter-green/30 rounded-lg p-8 mb-10 shadow-sm bg-pure-white/[0.41] px-[39px] mx-0 my-0 py-[39px]">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-pure-white rounded-md">
              <div className="md:w-1/3">
                <div className="">
                  <img src="/lovable-uploads/59838530-0c06-4b13-8800-ce90bc56d60e.png" alt="Andreina Ford" className="w-auto h-auto object-cover" />
                </div>
              </div>
              <div className="md:w-2/3 px-[67px] py-[41px] rounded-md">
                <p className="text-hunter-green/80 mb-4 text-lg font-medium px-0 my-0 text-left mx-0 py-[15px] font-opensauce">
                  Hey! I'm Andreina and I enjoy transforming mortgage complexity into clarity for a new generation of Ontario homebuyers.
                </p>
                <p className="text-hunter-green/80 mb-4 font-medium text-lg font-opensauce">
                  As a licensed level 2 mortgage agent, I noticed something troubling: the path to homeownership is unnecessarily complicated, especially for <span className="text-muted-red font-hammersmith">millennials and Gen Z</span> facing today's unique housing challenges. The traditional mortgage industry thrives on confusion—complex terms, hidden processes, and information gatekeeping that leaves you feeling like you need an interpreter just to understand your options.
                </p>
                <p className="text-hunter-green font-hammersmith mb-4 text-xl font-semibold text-center py-[26px]">
                  I believe you deserve better.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>;
};

export default Meet;
