import React from 'react';
import { Link } from 'react-router-dom';
import { getBodyClasses } from '@/assets/config/typography';
import { footerNavigation } from '@/assets/config/navigation';
import { socialLinks, socialOrder } from '@/assets/config/social';
import AppIcon from '@/components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-black" style={{color: '#F4F4F4'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons - At Top */}
        <div className="flex flex-wrap justify-center gap-4 mb-24 pt-16">
          {/* Social Platform Icons Only - Stop at TikTok */}
          {socialOrder.map((platform) => {
            const social = socialLinks[platform];
            return (
              <a 
                key={platform}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:scale-110 transition-all duration-300"
                title={`${social.name} - ${social.handle}`}
              >
                <AppIcon 
                  name={social.icon as keyof typeof import('@/assets/config/icons').icons}
                  size="xl"
                  variant="glass"
                />
              </a>
            );
          })}
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="pr-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/BRX_brand_white.png" 
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
              License #M24000357<br/>
              BRX Mortgage #13463
            </p>
          </div>

          {/* Free Tools */}
          <div className="pl-2">
            <h3 className="text-lg font-semibold mb-4 text-design-gold">
              Free Tools
            </h3>
            <ul className="space-y-2 text-gray-400">
              {footerNavigation.tools.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="pl-2">
            <h3 className="text-lg font-semibold mb-4 text-design-gold">
              Services
            </h3>
            <ul className="space-y-2 text-gray-400">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.href} 
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Get Help */}
          <div className="pl-2">
            <h3 className="text-lg font-semibold mb-4 text-design-gold">
              Get Help
            </h3>
            <ul className="space-y-2 text-gray-400">
              {footerNavigation.help.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.href} 
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Trust Badges & Regulatory */}
        <div className="border-t border-gray-600 mt-24 pt-24">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center space-x-8 flex-wrap">
              {/* BRX Mortgage - Link to BRX website */}
              <a 
                href="https://www.brxmortgage.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/BRX_brand_white.png" 
                  alt="BRX Mortgage" 
                  className="h-6"
                />
                <div className="text-gray-400 text-xs">
                  BRX MORTGAGE<br/>
                  #13463
                </div>
              </a>
              
              {/* Canada - Link to Government of Canada */}
              <a 
                href="https://www.canada.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/canada.png" 
                  alt="Government of Canada" 
                  className="h-6"
                />
                <div className="text-gray-400 text-xs">
                  PROUDLY<br/>
                  CANADIAN
                </div>
              </a>
              
              {/* CMHC - Link to CMHC website */}
              <a 
                href="https://www.cmhc-schl.gc.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/cmhc.svg" 
                  alt="CMHC" 
                  className="h-6"
                />
                <div className="text-gray-400 text-xs">
                  CANADA MORTGAGE<br/>
                  & HOUSING CORP
                </div>
              </a>
              
              {/* FSRA - Link to FSRA website */}
              <a 
                href="https://www.fsrao.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/fsra.svg" 
                  alt="FSRA" 
                  className="h-6"
                />
                <div className="text-gray-400 text-xs">
                  FINANCIAL SERVICES<br/>
                  REGULATORY AUTHORITY
                </div>
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center w-full mb-24">
              <p className="text-gray-400 text-sm">
                © {currentYear} MortgageWithFord.ca. Making Ontario mortgages simple.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {footerNavigation.legal.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.href} 
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;