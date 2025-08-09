
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { getH1Classes, getSubheadingClasses, getBodyClasses } from '@/assets/config/typography';

const Meet = () => {
  return <div className="bg-black min-h-screen">
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section */}
        <Header />
        
        {/* Main content */}
        <section className="mb-16 opacity-0 animate-fade-in-delay-1">
          <h1 className={`${getH1Classes()} mb-8 text-center text-white`}>
            Welcome! Nice to <span className="text-muted-red">Meet You!</span>
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 mb-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="md:w-1/3">
                <div className="">
                  <img src="/lovable-uploads/59838530-0c06-4b13-8800-ce90bc56d60e.png" alt="Andreina Ford" className="w-auto h-auto object-cover" />
                </div>
              </div>
              <div className="md:w-2/3 px-[67px] py-[41px] rounded-md">
                <p className={`${getBodyClasses('text-white/90 mb-4 px-0 my-0 text-left mx-0 py-[15px]')}`}>
                  Hey! I'm Andreina and I enjoy transforming mortgage complexity into clarity for a new generation of Ontario homebuyers.
                </p>
                <p className={`${getBodyClasses('text-white/90 mb-4')}`}>
                  As a licensed level 2 mortgage agent, I noticed something troubling: the path to homeownership is unnecessarily complicated, especially for <span className={`${getSubheadingClasses('text-muted-red inline')}`}>millennials and Gen Z</span> facing today's unique housing challenges. The traditional mortgage industry thrives on confusion—complex terms, hidden processes, and information gatekeeping that leaves you feeling like you need an interpreter just to understand your options.
                </p>
                <p className={`${getSubheadingClasses('text-white mb-4 text-center py-[26px]')}`}>
                  I believe you deserve better.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>;
};

export default Meet;
