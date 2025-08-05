
import React from 'react';
import NavCard from '@/components/NavCard';
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, Home, CircleDollarSign } from 'lucide-react';
import TikTokIcon from '@/components/icons/TikTokIcon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const Index = () => {
  return <PageBackground>
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header section - always show divider */}
        <Header />
        
        {/* Hero section - Modern 2024-2025 Design */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-design-cream via-design-cream to-design-sage opacity-60"></div>
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-texture opacity-20"></div>
          
          {/* Main content */}
          <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-20">
            
            {/* Primary Headline - Oversized Impact */}
            <div className="mb-12 opacity-0 animate-fade-in-delay-1">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-anton font-normal text-design-charcoal tracking-tighter leading-[0.85] mb-8 premium-text">
                I Don't Sell
                <br />
                <span className="text-design-plum">Mortgages.</span>
              </h1>
            </div>

            {/* Secondary Headline - Elegant Contrast */}
            <div className="mb-16 opacity-0 animate-fade-in-delay-2">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-tan-ashford font-normal text-design-plum tracking-tight leading-tight premium-text">
                I Guard Your Six-Figure Investment.
              </h2>
            </div>

            {/* Value Proposition - Clean Typography */}
            <div className="mb-20 opacity-0 animate-fade-in-delay-3">
              <p className="text-lg md:text-xl lg:text-2xl font-hk-grotesk-light font-light text-design-charcoal/80 max-w-4xl mx-auto leading-relaxed tracking-wide">
                Get radical transparency in a process that affects your family's financial future for decades.
              </p>
            </div>

            {/* CTA Section - Single Focus */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in-delay-4">
              <a 
                href="https://callme.mortgagewithford.ca"
                className="group premium-button professional-glow relative inline-flex items-center px-12 py-6 bg-design-gold text-white font-hk-grotesk-light font-medium text-xl rounded-xl hover:bg-design-charcoal transition-all duration-500 shadow-2xl hover:shadow-design-gold/25 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <span className="mr-3 text-2xl group-hover:animate-float">📞</span>
                Book Your Strategy Call
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-design-gold to-design-plum opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </a>
              
              <a 
                href="https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268"
                className="group inline-flex items-center px-12 py-6 bg-transparent border-2 border-design-plum text-design-plum font-hk-grotesk-light font-medium text-xl rounded-xl hover:bg-design-plum hover:text-design-cream transition-all duration-500 shadow-lg hover:shadow-design-plum/25 transform hover:-translate-y-1"
              >
                <CircleDollarSign size={28} className="mr-3 group-hover:animate-float" />
                Start Application
              </a>
            </div>

            {/* Trust Indicator - Subtle Professional Element */}
            <div className="mt-16 opacity-0 animate-fade-in-delay-5">
              <div className="flex items-center justify-center space-x-4 text-design-charcoal/60">
                <div className="h-px w-12 bg-design-plum/30"></div>
                <span className="font-hk-grotesk-light text-sm tracking-widest uppercase">Licensed Mortgage Professional</span>
                <div className="h-px w-12 bg-design-plum/30"></div>
              </div>
            </div>
          </div>
          
          {/* Subtle scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-delay-6">
            <div className="w-6 h-10 border-2 border-design-plum/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-design-plum/50 rounded-full mt-2 animate-float"></div>
            </div>
          </div>
        </section>
        
        {/* Navigation Cards */}
        <section className="py-20 bg-design-cream/30">
          <h2 className="text-3xl md:text-4xl mb-12 text-center opacity-0 animate-fade-in-delay-2 text-design-charcoal font-hk-grotesk-light font-light premium-text">
            What will you <span className="text-design-plum">explore</span> today?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
            <NavCard title="Meet Me" description="Learn About My Approach" icon="user" href="/meet" className="animate-fade-in-delay-2" />
            <NavCard title="Getting Started" description="First Steps" icon="info" href="/getting-started" className="animate-fade-in-delay-2" />
            <NavCard title="Resources" description="Mortgage Basics 101" icon="document" href="/resources" className="animate-fade-in-delay-3" />
            <NavCard title="Perks" description="Giveaways & Valuable Tools" icon="gift" href="/perks" className="animate-fade-in-delay-3" />
            <NavCard title="Calculators" description="Run Some Numbers" icon="calculator" href="/calculator" className="animate-fade-in-delay-3" />
            <NavCard title="Contact" description="Reach out anytime" icon="message" href="/contact" className="animate-fade-in-delay-3" />
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-10 mb-16 text-center opacity-0 animate-fade-in-delay-3">
          <h3 className="text-3xl font-hk-grotesk-light mb-6 font-light text-design-charcoal premium-text">
            Connect With Me
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a href="https://www.instagram.com/mortgage.with.ford" target="_blank" rel="noopener noreferrer" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Instagram size={24} />
            </a>
            <a href="http://facebook.mortgagewithford.ca" target="_blank" rel="noopener noreferrer" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Facebook size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mortgagewithford/" target="_blank" rel="noopener noreferrer" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Linkedin size={24} />
            </a>
            <a href="https://www.youtube.com/@MortgagewithFord" target="_blank" rel="noopener noreferrer" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Youtube size={24} />
            </a>
            <a href="https://www.tiktok.com/@mortgage.with.ford?lang=en" target="_blank" rel="noopener noreferrer" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <TikTokIcon size={24} />
            </a>
            <a href="https://app.ownwell.ca/join/mymortgageassistant" target="_blank" rel="noopener noreferrer" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Home size={24} />
            </a>
            <a href="mailto:ask@mortgagewithford.ca" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Mail size={24} />
            </a>
            <a href="tel:6137437866" className="p-3 bg-design-sage/30 border border-design-plum/20 rounded-full hover:bg-design-plum hover:text-white hover:border-design-plum transition-all duration-300">
              <Phone size={24} />
            </a>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </PageBackground>;
};

export default Index;
