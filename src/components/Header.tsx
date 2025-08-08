import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getBodyClasses } from '@/assets/config/typography';

interface HeaderProps {
  showDivider?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true }) => {
  return (
    <>
      <header className="py-4 sm:py-6 bg-black">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Side - Agent Name & Title */}
            <div className="flex-1">
              <div className={`${getBodyClasses('text-white leading-none')}`}>
                <span className="block sm:inline">Andreina Ford</span>
                <span className="hidden sm:inline text-white/60"> • </span>
                <span className="block sm:inline text-white/80">Mortgage Agent Level 2</span>
              </div>
            </div>
            
            {/* Right Side - BRX Logo and Hamburger Menu */}
            <div className="flex items-center space-x-4">
              {/* BRX Logo */}
              <Link to="/">
                <img 
                  src="/src/assets/images/logos/BRX_brand_white.png" 
                  alt="BRX Mortgage Logo" 
                  className="h-6 sm:h-8 md:h-10"
                />
              </Link>
              
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
      </header>
      
      {/* Removed separator for seamless integration */}
    </>
  );
};

export default Header;