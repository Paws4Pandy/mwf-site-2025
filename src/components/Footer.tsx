import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* CTA section */}
      <section className="py-20 px-6 relative overflow-hidden opacity-0 animate-fade-in-delay-3 mb-32">
        <div className="absolute top-0 right-0 w-32 h-32 bg-muted-red opacity-10 rounded-full blur-3xl"></div>
        
        <div className="backdrop-blur-sm border border-hunter-green/10 p-12 text-center max-w-3xl mx-auto relative z-10 rounded-lg bg-light-azure/20">
          <h2 className="text-3xl md:text-4xl mb-8 font-normal text-hunter-green font-hammersmith">
            Let's make your mortgage journey make sense so you can skip to the good part: finding and funding a home that truly works for you.
          </h2>
          
          <a 
            href="https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268" 
            className="inline-block rounded border-2 border-hunter-green text-pure-white bg-hunter-green hover:bg-pure-white hover:text-pure-black hover:border-pure-black transition-all duration-300 font-medium px-12 py-4 text-lg font-opensauce"
          >
            Apply Now
          </a>
        </div>
      </section>
    
      {/* Main Footer */}
      <footer className="bg-pure-white py-20 border-t border-hunter-green/10">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Logo Section */}
          <div className="text-center mb-16">
            <Link to="/" className="inline-block mb-8">
              <img 
                src="/src/assets/images/logos/BRX_brand_black.png" 
                alt="BRX Mortgage Logo" 
                className="h-16 mx-auto"
              />
            </Link>
          </div>

          {/* Professional Info */}
          <div className="text-left mb-16 space-y-2">
            <h3 className="text-lg font-hammersmith font-bold text-pure-black tracking-tight">
              Andreina Ford
            </h3>
            <p className="text-lg font-hammersmith text-pure-black">
              Mortgage Agent Level 2 | License #M24000357
            </p>
            <p className="text-base font-opensauce text-pure-black">
              BRX Mortgage #13463 (FSRA Ontario)
            </p>
            <p className="text-base font-opensauce text-pure-black">
              Serving Prince Edward County & Ontario Wide
            </p>
          </div>

          {/* Regulatory Logos */}
          <div className="flex justify-center items-center gap-12 mb-16">
            <img 
              src="/src/assets/images/logos/fsra.svg" 
              alt="FSRA Regulated" 
              className="h-12 opacity-100 hover:opacity-80 transition-opacity"
            />
            <img 
              src="/src/assets/images/logos/cmhc.svg" 
              alt="CMHC" 
              className="h-12 opacity-100 hover:opacity-80 transition-opacity"
            />
            <img 
              src="/src/assets/images/logos/canada.png" 
              alt="Canadian Made" 
              className="h-12 opacity-100 hover:opacity-80 transition-opacity"
            />
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8 mb-12">
            <Link 
              to="/privacy" 
              className="text-hunter-green hover:text-muted-red transition-colors font-opensauce"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-hunter-green hover:text-muted-red transition-colors font-opensauce"
            >
              Terms of Service
            </Link>
            <Link 
              to="/sitemap" 
              className="text-hunter-green hover:text-muted-red transition-colors font-opensauce"
            >
              Sitemap
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-hunter-green/10 pt-8">
            <p className="text-hunter-green/70 font-opensauce text-sm">
              © {currentYear} Andreina Ford Mortgage Agent Level 2. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;