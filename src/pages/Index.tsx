
import React from 'react';
import NavCard from '@/components/NavCard';
import { CircleDollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import RatesTable from '@/components/RatesTable';
import { mainNavigation } from '@/assets/config/navigation';
import { GoogleReviews } from '@/components/GoogleReviews';
import { FAQSection } from '@/components/FAQSection';
import { InternalLinks } from '@/components/InternalLinks';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';


const Index = () => {
  return (
    <div>
      {/* Schema Markup for SEO */}
      <SchemaMarkup type="LocalBusiness" />
      <SchemaMarkup type="Organization" />
      {/* Use centralized header component */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero section - Full Width Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image with B&W filter and noise - contained to hero section */}
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat grayscale contrast-110 brightness-90"
          style={{ backgroundImage: "url('/room-main.jpg?v=1')" }}
        ></div>
        
        {/* Noise overlay - contained to hero section */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        ></div>
        
        {/* Left-aligned text content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-start justify-start h-screen max-w-2xl pt-32 md:pt-40 lg:pt-48">
            
            {/* "I don't sell mortgages" image - slightly larger */}
            <div className="mb-4">
              <img 
                src="/i-dont-sell-mortgages.png" 
                alt="I don't sell mortgages" 
                className="w-full max-w-xl h-auto"
              />
            </div>
            
            {/* "I Guard" subheading - closer, 2x bigger, indented */}
            <div className="mb-16 ml-8">
              <img 
                src="/i-guard.png" 
                alt="I Guard" 
                className="w-full max-w-2xl h-auto"
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
              <div className="text-white font-hk-grotesk-light text-base md:text-lg lg:text-xl leading-none">
                <span className="block sm:inline">Andreina Ford</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">Mortgage Agent Level 2</span>
              </div>
            </div>
            
            {/* Licensed Professional */}
            <div className="mb-16 opacity-0 animate-fade-in-delay-2 flex justify-center">
              <div className="flex items-center space-x-4 text-white/80">
                <div className="h-px w-12 bg-white/30"></div>
                <span className="font-hk-grotesk-light text-sm tracking-widest uppercase leading-none">Licensed Mortgage Professional</span>
                <div className="h-px w-12 bg-white/30"></div>
              </div>
            </div>

            {/* CTA Section - Enhanced Liquid Glass Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center opacity-0 animate-fade-in-delay-3 w-full max-w-5xl mx-auto mb-16">
              <LiquidGlassButton
                href="https://callme.mortgagewithford.ca"
                variant="primary"
                size="md"
                external={true}
                className="w-full sm:w-48 lg:w-52"
                icon="📞"
              >
                Book Call
              </LiquidGlassButton>
              
              <LiquidGlassButton
                href="https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268"
                variant="accent"
                size="lg"
                external={true}
                className="w-full sm:w-64 lg:w-72"
                icon={<CircleDollarSign size={20} className="sm:size-6" />}
              >
                Start Application
              </LiquidGlassButton>
              
              <LiquidGlassButton
                href="/playbooks"
                variant="secondary"
                size="md"
                className="w-full sm:w-48 lg:w-52"
                icon="📚"
              >
                Playbooks
              </LiquidGlassButton>
            </div>
          </section>
          
          {/* Navigation Cards */}
          <section className="py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 sm:mb-12 text-center opacity-0 animate-fade-in-delay-2 text-white font-noto-serif-display italic font-normal premium-text max-w-3xl mx-auto">
          "Planning is important, but the most important part of every plan is to plan on the plan not going according to plan."
          </h2>
          
          {/* Attribution */}
          <p className="text-center text-white/60 text-sm mb-12 opacity-0 animate-fade-in-delay-2">
            — Morgan Housel
          </p>
          
          {/* Current Rates - Compact */}
          <div className="max-w-4xl mx-auto mb-12 opacity-0 animate-fade-in-delay-2">
            <RatesTable 
              title="Current Mortgage Rates" 
              showRefreshButton={false}
              compact={true}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mx-auto max-w-3xl">
            {mainNavigation.map((item, index) => (
              <NavCard 
                key={item.name}
                title={item.name} 
                description={item.description || ''} 
                icon={item.icon as keyof typeof import('@/assets/config/icons').icons} 
                href={item.href} 
                className={`animate-fade-in-delay-${index < 2 ? '2' : '3'}`}
              />
            ))}
          </div>
        </section>

        {/* Google Reviews Section */}
        <GoogleReviews />
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* Internal Links for Better Navigation */}
        <InternalLinks currentPage="/" />
        
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
