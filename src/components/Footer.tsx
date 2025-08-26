import React from 'react';
import { Link } from 'react-router-dom';
import { getTypographyClasses } from '@/lib/design-system';
import { footerNavigation } from '@/assets/config/navigation';
import { socialLinks, socialOrder } from '@/assets/config/social';
import AppIcon from '@/components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-design-black text-design-white">
      <div className="max-w-full px-0">
        {/* Full-width black background - no padding to avoid background photo showing */}
        <div className="w-full bg-design-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Social Media Icons - At Top */}
            <div className="flex flex-wrap justify-center gap-4 mb-24 pt-16">
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
                  <h3 className={getTypographyClasses('h3', 'text-lg text-design-white')}>
                    Andreina Ford
                  </h3>
                </div>
                <p className={getTypographyClasses('body', 'text-sm mb-4 text-design-white/70')}>
                  Professional mortgage guidance for Ontario residents.
                  <br />
                  Not affiliated with any specific lender.
                </p>
                <p className={getTypographyClasses('caption', 'text-xs text-design-white/60')}>
                  <span className="font-semibold text-design-white/60">Andreina Ford</span><br/>
                  Mortgage Agent Level 2<br/>
                  License #M24000357<br/>
                  BRX Mortgage #13463
                </p>
              </div>

              {/* Free Tools */}
              <div className="pl-2">
                <h3 className={getTypographyClasses('h3', 'text-lg mb-4 text-design-brand-red')}>
                  Free Tools
                </h3>
                <ul className="space-y-2">
                  {footerNavigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href} 
                        className={getTypographyClasses('body', 'text-design-white/60 hover:text-design-white transition-colors')}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="pl-2">
                <h3 className={getTypographyClasses('h3', 'text-lg mb-4 text-design-brand-red')}>
                  Services
                </h3>
                <ul className="space-y-2">
                  {footerNavigation.services.map((item) => (
                    <li key={item.name}>
                      {item.external ? (
                        <a 
                          href={item.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={getTypographyClasses('body', 'text-design-white/60 hover:text-design-white transition-colors')}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link 
                          to={item.href} 
                          className={getTypographyClasses('body', 'text-design-white/60 hover:text-design-white transition-colors')}
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
                <h3 className={getTypographyClasses('h3', 'text-lg mb-4 text-design-brand-red')}>
                  Get Help
                </h3>
                <ul className="space-y-2">
                  {footerNavigation.help.map((item) => (
                    <li key={item.name}>
                      {item.external ? (
                        <a 
                          href={item.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={getTypographyClasses('body', 'text-design-white/60 hover:text-design-white transition-colors')}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link 
                          to={item.href} 
                          className={getTypographyClasses('body', 'text-design-white/60 hover:text-design-white transition-colors')}
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
            <div className="border-t border-design-white/20 mt-24 pt-24">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center space-x-8 flex-wrap">
                  {/* BRX Mortgage */}
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
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      BRX MORTGAGE<br/>
                      #13463
                    </div>
                  </a>
                  
                  {/* Canada */}
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
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      PROUDLY<br/>
                      CANADIAN
                    </div>
                  </a>
                  
                  {/* CMHC */}
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
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      CANADA MORTGAGE<br/>
                      & HOUSING CORP
                    </div>
                  </a>
                  
                  {/* FSRA */}
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
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      FINANCIAL SERVICES<br/>
                      REGULATORY AUTHORITY
                    </div>
                  </a>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center w-full mb-24">
                  <p className={getTypographyClasses('body', 'text-design-white/60 text-sm')}>
                    © {currentYear} MortgageWithFord.ca. Making Ontario mortgages simple.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    {footerNavigation.legal.map((item) => (
                      <Link 
                        key={item.name}
                        to={item.href} 
                        className={getTypographyClasses('body', 'text-design-white/60 hover:text-design-white text-sm transition-colors')}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;