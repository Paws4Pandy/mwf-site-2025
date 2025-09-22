import React from 'react';
import { Link } from 'react-router-dom';
import { getTypographyClasses } from '@/lib/design-system';
import { footerNavigation } from '@/assets/config/navigation';
import { socialLinks, socialOrder } from '@/assets/config/social';
import AppIcon from '@/components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-transparent text-design-white">
      <div className="max-w-full px-0">
        {/* Full-width transparent background */}
        <div className="w-full bg-transparent py-12">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
            

            <div className="grid md:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">

              {/* Brand Section - Takes 2 columns */}
              <div className="md:col-span-2 pr-0 md:pr-4">
                <h3 className="text-lg text-[#ffa072] font-serif italic mb-3">
                  Andreina Ford
                </h3>
                
                <p className={getTypographyClasses('caption', 'text-xs text-design-white/60 mb-4')}>
                  Mortgage Agent Level 2<br/>
                  License #M24000357<br/>
                  Tango ON #13691
                </p>
                
                {/* Social Media Icons - Below Tango ON */}
                <div className="flex gap-3 mb-4">
                  {socialOrder.map((platform) => {
                    const social = socialLinks[platform];
                    const iconMap = {
                      facebook: 'Facebook_perspective_matte_s.png',
                      instagram: 'Instagram_perspective_matte_s.png',
                      linkedin: 'Linkedin_perspective_matte_s.png',
                      youtube: 'Youtube_perspective_matte_s.png'
                    };
                    
                    return (
                      <a 
                        key={platform}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
                        title={`${social.name} - ${social.handle}`}
                      >
                        <img 
                          src={`/${iconMap[platform as keyof typeof iconMap]}`}
                          alt={social.name}
                          className="w-6 h-6 object-contain"
                          width="24"
                          height="24"
                          loading="lazy"
                        />
                      </a>
                    );
                  })}
                </div>
                
                {/* Professional Guidance - Below Social Icons */}
                <p className={getTypographyClasses('body', 'text-sm text-design-white/70 mb-4')}>
                  Professional mortgage guidance for Ontario residents. Not affiliated with any specific lender.
                </p>
                
              </div>

              {/* Free Tools */}
              <div className="pl-4">
                <h3 className={getTypographyClasses('body', 'text-sm mb-4 text-white font-bold')}>
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
              <div className="pl-4">
                <h3 className={getTypographyClasses('body', 'text-sm mb-4 text-white font-bold')}>
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
              <div className="pl-4">
                <h3 className={getTypographyClasses('body', 'text-sm mb-4 text-white font-bold')}>
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
                  {/* Add Privacy, Terms, Disclaimer */}
                  {footerNavigation.legal.map((item) => (
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
            </div>
            
            {/* Copyright - Centered above line break */}
            <div className="text-center mt-12 mb-8">
              <p className={getTypographyClasses('body', 'text-design-white/60 text-sm')}>
                © {currentYear} MortgageWithFord.ca. Making Ontario mortgages simple.
              </p>
            </div>
            
            {/* Trust Badges & Regulatory */}
            <div className="border-t border-design-white/20 pt-24">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center space-x-6 sm:space-x-8 md:space-x-12 flex-wrap gap-y-6">
                  {/* Tango Financial */}
                  <a 
                    href="https://tangofinancial.ca/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/Tango_Ontario_White.png" 
                      alt="Tango Ontario" 
                      className="h-8 mb-2"
                      width="120"
                      height="32"
                      loading="lazy"
                    />
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      Tango ON<br/>
                      #13691
                    </div>
                  </a>
                  
                  {/* Canada */}
                  <a 
                    href="https://www.canada.ca" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/canada.png" 
                      alt="Government of Canada" 
                      className="h-8 mb-2"
                      width="64"
                      height="32"
                      loading="lazy"
                    />
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      Proudly<br/>
                      Canadian
                    </div>
                  </a>
                  
                  {/* CMHC */}
                  <a 
                    href="https://www.cmhc-schl.gc.ca" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/cmhc-logo.png" 
                      alt="CMHC" 
                      className="h-10 mb-2"
                      width="80"
                      height="40"
                      loading="lazy"
                    />
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      Canada Mortgage<br/>
                      & Housing Corp
                    </div>
                  </a>
                  
                  {/* FSRA */}
                  <a 
                    href="https://www.fsrao.ca" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="/fsra logo.png" 
                      alt="FSRA" 
                      className="h-8 mb-2"
                      width="80"
                      height="32"
                      loading="lazy"
                    />
                    <div className={getTypographyClasses('caption', 'text-design-white/60')}>
                      Financial Services<br/>
                      Regulatory Authority
                    </div>
                  </a>
                </div>
                
                <div className="w-full mb-24">
                  {/* Legal links moved to Help column, copyright moved to first column */}
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