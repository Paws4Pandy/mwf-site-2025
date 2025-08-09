
import React from 'react';
import NavCard from '@/components/NavCard';
import { CircleDollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';
import RatesTable from '@/components/RatesTable';
import { mainNavigation } from '@/assets/config/navigation';


const Index = () => {
  return (
    <div>
      {/* Use centralized header component */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero section - Full Width Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image - Scales to fit browser width */}
        <div 
          className="absolute inset-0 bg-contain sm:bg-cover bg-top sm:bg-left bg-no-repeat"
          style={{ backgroundImage: "url('/mwf-bg-full.svg')" }}
        ></div>
        
        {/* Hero Content - Positioned below "I Guard" text */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center pt-[20rem] sm:pt-[24rem] md:pt-[20rem] lg:pt-[16rem] xl:pt-[32rem] mb-2">
            
            {/* Personal Info - Above CTA Buttons */}
            <div className="mb-1 opacity-0 animate-fade-in-delay-1 text-center">
              <div className="text-white font-hk-grotesk-light text-base md:text-lg lg:text-xl leading-none px-4">
                <span className="block sm:inline">Andreina Ford</span>
                <span className="hidden sm:inline"> • </span>
                <span className="block sm:inline">Mortgage Agent Level 2</span>
              </div>
            </div>
            
            {/* Licensed Professional - With Dashes */}
            <div className="mb-16 opacity-0 animate-fade-in-delay-2">
              <div className="flex items-center space-x-4 text-white/80">
                <div className="h-px w-12 bg-white/30"></div>
                <span className="font-hk-grotesk-light text-sm tracking-widest uppercase leading-none">Licensed Mortgage Professional</span>
                <div className="h-px w-12 bg-white/30"></div>
              </div>
            </div>


            {/* CTA Section - Centered Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center opacity-0 animate-fade-in-delay-3 w-full max-w-5xl mx-auto">
            <a 
              href="https://callme.mortgagewithford.ca"
              className="group inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-hk-grotesk-light font-medium text-sm sm:text-base lg:text-lg rounded-xl hover:bg-white hover:text-black transition-all duration-500 transform hover:-translate-y-1 w-full sm:w-48 lg:w-52 h-12 sm:h-16"
            >
              <span className="mr-2 text-lg sm:text-xl group-hover:animate-float">📞</span>
              Book Call
            </a>
            
            <a 
              href="https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268"
              className="group inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-hk-grotesk-light font-medium text-sm sm:text-base lg:text-lg rounded-xl hover:bg-white hover:text-black transition-all duration-500 transform hover:-translate-y-1 w-full sm:w-64 lg:w-72 h-12 sm:h-16"
            >
              <CircleDollarSign size={20} className="sm:size-6 mr-2 group-hover:animate-float" />
              Start Application
            </a>
            
            <a 
              href="/Free playbooks"
              className="group inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-hk-grotesk-light font-medium text-sm sm:text-base lg:text-lg rounded-xl hover:bg-white hover:text-black transition-all duration-500 transform hover:-translate-y-1 w-full sm:w-48 lg:w-52 h-12 sm:h-16"
            >
              <span className="mr-2 text-lg sm:text-xl group-hover:animate-float">📚</span>
              Playbooks
            </a>
            </div>
          </div>
        </div>
        </section>
        

      
      {/* Main Page Content - Black Background */}
      <div className="bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12 relative z-10">
          
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

        
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
