import React from 'react';
import { Link } from 'react-router-dom';
import GlassSocialIcon from '@/components/icons/GlassSocialIcons';
import TikTokIcon from '@/components/icons/TikTokIcon';
import { Mail, Phone, Home } from 'lucide-react';
import { getBodyClasses } from '@/assets/config/typography';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12" style={{backgroundColor: '#222831', color: '#F4F4F4'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/src/assets/images/logos/BRX_brand_white.png" 
                alt="BRX Mortgage Logo" 
                className="h-8"
              />
              <h3 className="text-lg font-semibold">
                Andreina Ford
              </h3>
            </div>
            <p className="text-sm mb-4" style={{color: '#9CA3AF'}}>
              Professional mortgage guidance for Ontario residents.
              <br />
              Not affiliated with any specific lender.
            </p>
            <p className="text-xs" style={{color: '#6B7280'}}>
              <strong style={{color: '#6B7280'}}>Andreina Ford</strong><br/>
              Mortgage Agent Level 2<br/>
              License #M24000357
            </p>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Free Tools
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/calculator" 
                  className="hover:text-white transition-colors"
                >
                  Affordability Calculator
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="hover:text-white transition-colors"
                >
                  Mortgage Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/perks" 
                  className="hover:text-white transition-colors"
                >
                  Client Perks
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/getting-started" 
                  className="hover:text-white transition-colors"
                >
                  First-Time Buyers
                </Link>
              </li>
              <li>
                <Link 
                  to="/meet" 
                  className="hover:text-white transition-colors"
                >
                  About Andreina
                </Link>
              </li>
              <li>
                <a 
                  href="https://callme.mortgagewithford.ca" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Get Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Get Help
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="https://callme.mortgagewithford.ca" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Book a Call
                </a>
              </li>
              <li>
                <a 
                  href="mailto:ask@mortgagewithford.ca" 
                  className="hover:text-white transition-colors"
                >
                  Email Questions
                </a>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="hover:text-white transition-colors"
                >
                  Contact Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 mt-8 pt-8 border-t border-gray-600">
          <a href="https://www.instagram.com/mortgage.with.ford" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <GlassSocialIcon type="instagram" size={40} />
          </a>
          <a href="http://facebook.mortgagewithford.ca" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <GlassSocialIcon type="facebook" size={40} />
          </a>
          <a href="https://www.linkedin.com/in/mortgagewithford/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <GlassSocialIcon type="linkedin" size={40} />
          </a>
          <a href="https://www.youtube.com/@MortgagewithFord" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <GlassSocialIcon type="youtube" size={40} />
          </a>
          <a href="https://www.tiktok.com/@mortgage.with.ford?lang=en" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-full hover:bg-white/20 hover:border-gray-400 transition-all duration-300">
            <TikTokIcon size={20} className="text-white" />
          </a>
          <a href="https://app.ownwell.ca/join/mymortgageassistant" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-full hover:bg-white/20 hover:border-gray-400 transition-all duration-300">
            <Home size={20} className="text-white" />
          </a>
          <a href="mailto:ask@mortgagewithford.ca" className="p-2 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-full hover:bg-white/20 hover:border-gray-400 transition-all duration-300">
            <Mail size={20} className="text-white" />
          </a>
          <a href="tel:6137437866" className="p-2 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-full hover:bg-white/20 hover:border-gray-400 transition-all duration-300">
            <Phone size={20} className="text-white" />
          </a>
        </div>
        
        {/* Trust Badges & Regulatory */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center space-x-8 flex-wrap">
              {/* BRX Mortgage */}
              <div className="flex items-center space-x-2">
                <div className="text-green-400 text-xl font-bold">
                  BRX
                </div>
                <div className="text-gray-400 text-xs">
                  BRX MORTGAGE<br/>
                  #13463
                </div>
              </div>
              
              {/* Proudly Canadian */}
              <div className="flex items-center space-x-2">
                <div className="text-red-500 text-2xl">
                  🍁
                </div>
                <div className="text-gray-400 text-xs">
                  PROUDLY<br/>
                  CANADIAN
                </div>
              </div>
              
              {/* CMHC */}
              <div className="flex items-center space-x-2">
                <div className="text-blue-400 font-bold text-sm">
                  CMHC
                </div>
                <div className="text-gray-400 text-xs">
                  CANADA MORTGAGE<br/>
                  & HOUSING CORP
                </div>
              </div>
              
              {/* FSRA */}
              <div className="flex items-center space-x-2">
                <div className="text-green-400 font-bold text-sm">
                  FSRA
                </div>
                <div className="text-gray-400 text-xs">
                  FINANCIAL SERVICES<br/>
                  REGULATORY AUTHORITY
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <p className="text-gray-400 text-sm">
                © {currentYear} MortgageWithFord.ca. Making Ontario mortgages simple.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Privacy
                </Link>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Terms
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;