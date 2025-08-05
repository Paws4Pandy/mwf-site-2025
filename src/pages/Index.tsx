
import React from 'react';
import NavCard from '@/components/NavCard';
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, Home } from 'lucide-react';
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
        
        {/* Hero section */}
        <section className="py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto opacity-0 animate-fade-in-delay-1">
            
            {/* Main Headlines */}
            <div className="mb-16 space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-league-spartan font-bold text-charcoal tracking-tight leading-tight">
                I Don't Sell Mortgages.
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-league-spartan font-bold text-brand-burgundy tracking-tight leading-tight">
                I Guard Your Six-Figure Investment.
              </h2>
            </div>

            {/* Subheadline */}
            <div className="mb-20">
              <p className="text-xl md:text-2xl lg:text-3xl font-opensauce text-slate-blue max-w-4xl mx-auto leading-relaxed font-medium">
                Get radical transparency in a process that affects your family's financial future for decades.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a 
                href="https://callme.mortgagewithford.ca"
                className="inline-flex items-center px-8 py-4 bg-brand-burgundy text-soft-white font-opensauce font-semibold text-lg rounded-lg hover:bg-charcoal transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📞 Book Your Call
              </a>
              <a 
                href="https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268"
                className="inline-flex items-center px-8 py-4 bg-bronze text-soft-white font-opensauce font-semibold text-lg rounded-lg hover:bg-slate-blue transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🚀 Apply Now
              </a>
            </div>
          </div>
        </section>
        
        {/* Navigation Cards */}
        <section className="py-20">
          <h2 className="text-3xl md:text-4xl mb-12 text-center opacity-0 animate-fade-in-delay-2 text-charcoal font-league-spartan font-bold">
            What will you <span className="text-brand-burgundy">explore</span> today?
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
          <h3 className="text-3xl font-hammersmith mb-6 font-normal text-pure-black">
            Connect With Me
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a href="https://www.instagram.com/mortgage.with.ford" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <Instagram size={24} />
            </a>
            <a href="http://facebook.mortgagewithford.ca" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <Facebook size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mortgagewithford/" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <Linkedin size={24} />
            </a>
            <a href="https://www.youtube.com/@MortgagewithFord" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <Youtube size={24} />
            </a>
            <a href="https://www.tiktok.com/@mortgage.with.ford?lang=en" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <TikTokIcon size={24} />
            </a>
            <a href="https://app.ownwell.ca/join/mymortgageassistant" target="_blank" rel="noopener noreferrer" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <Home size={24} />
            </a>
            <a href="mailto:ask@mortgagewithford.ca" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
              <Mail size={24} />
            </a>
            <a href="tel:6137437866" className="p-3 bg-light-azure border border-hunter-green/20 rounded-full hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300">
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
