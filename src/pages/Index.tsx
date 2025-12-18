
import React, { useEffect, useState } from 'react';
import NavCard from '@/components/NavCard';
import { Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import { mainNavigation } from '@/assets/config/navigation';
import { FAQSection } from '@/components/FAQSection';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

const Index = () => {

  return (
    <div>
      {/* Schema Markup for SEO */}
      <SchemaMarkup type="ServiceWithReviews" />
      <SchemaMarkup type="Organization" />
      
      {/* Hero section - Full Width Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image with B&W filter */}
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat grayscale contrast-110 brightness-90"
          style={{ backgroundImage: "url('/room-main.jpg?v=1')" }}
        ></div>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        {/* Left-aligned text content */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Header at top of content */}
          <Header transparent={true} />
          
          <div className="flex flex-col items-start justify-start h-screen max-w-2xl pt-8 md:pt-16 lg:pt-20">
            
            {/* "I don't sell mortgages" image - responsive sizing */}
            <div className="mb-4">
              <img
                src="/i-dont-sell-mortgages.png"
                alt="I don't sell mortgages"
                className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-auto"
                width="576"
                height="80"
                loading="eager"
                fetchpriority="high"
              />
            </div>

            {/* "I Guard" subheading - responsive with mobile-optimized indentation */}
            <div className="mb-16 ml-2 sm:ml-4 md:ml-8">
              <img
                src="/i-guard.png"
                alt="I Guard"
                className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto"
                width="768"
                height="120"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </div>
        </div>
        </section>
        

      
      {/* Main Page Content - Black Background */}
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12 relative z-10">
          
          {/* Personal Info and CTA Section */}
          <section className="py-12 text-center">
            {/* Personal Info */}
            <div className="mb-4 opacity-0 animate-fade-in-delay-1">
              <div className="text-white font-roboto-flex text-base md:text-lg lg:text-xl leading-none">
                <span className="block sm:inline">Andreina Ford</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">Mortgage Agent Level 2</span>
              </div>
            </div>
            
            {/* Licensed Professional */}
            <div className="mb-16 opacity-0 animate-fade-in-delay-2 flex justify-center">
              <div className="flex items-center space-x-4 text-white/80">
                <div className="h-px w-12 bg-white/30"></div>
                <span className="font-roboto-flex text-sm tracking-widest uppercase leading-none">Licensed Mortgage Professional</span>
                <div className="h-px w-12 bg-white/30"></div>
              </div>
            </div>

            {/* Newsletter Signup Button */}
            <div className="flex justify-center opacity-0 animate-fade-in-delay-3 mb-16">
              <LiquidGlassButton
                href="http://app.brokermail.ca/h/t/26FFFD87DF0C4F35"
                variant="primary"
                size="lg"
                external={true}
                icon={<Mail className="w-5 h-5" />}
                className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white border-[#ED8071]"
              >
                Subscribe for News & Giveaways
              </LiquidGlassButton>
            </div>
          </section>

          {/* Navigation Cards */}
          <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-12 text-center opacity-0 animate-fade-in-delay-2 text-white font-roboto-flex font-bold italic font-normal premium-text max-w-3xl mx-auto">
          "Planning is important, but the most important part of every plan is to plan on the plan not going according to plan."
          </h2>
          
          {/* Attribution */}
          <p className="text-center text-white/80 text-sm mb-20 opacity-0 animate-fade-in-delay-2">
            — Morgan Housel
          </p>
          

          
        </section>

          {/* Transparent fade before footer */}
          <div className="h-32 bg-gradient-to-b from-transparent to-black relative z-10 -mb-8"></div>
          
          {/* Footer */}
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default Index;
