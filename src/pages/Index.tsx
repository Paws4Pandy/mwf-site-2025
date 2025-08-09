
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
      {/* Hero Header - Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Empty space for balance */}
            <div className="flex-1"></div>
            
            {/* Right Side - BRX Logo and Hamburger Menu */}
            <div className="flex items-center space-x-4">
              {/* BRX Logo */}
              <img 
                src="/src/assets/images/logos/BRX_brand_white.png" 
                alt="BRX Mortgage Logo" 
                className="h-6 sm:h-8 md:h-10"
              />
              
              {/* Hamburger Menu */}
              <div className="group relative">
                {/* Hamburger Icon */}
                <div className="cursor-pointer flex flex-col space-y-1">
                  <div className="w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 group-hover:rotate-45 group-hover:translate-y-1.5"></div>
                  <div className="w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 group-hover:opacity-0"></div>
                  <div className="w-5 sm:w-6 h-0.5 bg-white transition-all duration-300 group-hover:-rotate-45 group-hover:-translate-y-1.5"></div>
                </div>
                
                {/* Hidden Menu */}
                <div className="absolute top-12 right-0 glass-card-dark rounded-2xl p-6 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/10">
                  <ul className="space-y-3">
                    {[
                      { name: 'Meet', href: '/meet' },
                      { name: 'Getting Started', href: '/getting-started' },
                      { name: 'Resources', href: '/resources' },
                      { name: 'Perks', href: '/perks' },
                      { name: 'Calculator', href: '/calculator' },
                      { name: 'Contact', href: '/contact' }
                    ].map((item) => (
                      <li key={item.name}>
                        <a 
                          href={item.href}
                          className="font-anton text-white text-base hover:text-design-gold transition-colors duration-300 block"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero section - Full Width Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image - Scales to fit browser width */}
        <div 
          className="absolute inset-0 bg-contain sm:bg-cover bg-top sm:bg-left bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/images/hero/mwf-bg-full.svg')" }}
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
