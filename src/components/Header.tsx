import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getBodyClasses } from '@/assets/config/typography';
import { headerNavigation } from '@/assets/config/navigation';
import AppIcon from '@/components/AppIcon';

interface HeaderProps {
  showDivider?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true }) => {
  return (
    <>
      <header className="py-4 sm:py-6 bg-gradient-to-br from-design-plum/20 via-black/95 to-black relative">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Side - Agent Name & Title */}
            <div className="flex-1">
              <div className="leading-none">
                <span className="block sm:inline font-anton text-design-gold text-xl sm:text-2xl font-normal">Andreina Ford</span>
                <span className="hidden sm:inline text-white/60"> • </span>
                <span className="block sm:inline font-noto-serif-display italic text-design-plum text-base sm:text-lg font-normal">Mortgage Agent Level 2</span>
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
                
                {/* Hidden Menu - Extended hover area */}
                <div className="absolute top-8 -right-4 w-60 h-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 group-hover:delay-0 delay-300">
                  <div className="absolute top-4 right-4 bg-black/95 backdrop-blur-sm rounded-2xl p-6 min-w-48 border border-white/10 shadow-2xl">
                  <ul className="space-y-3">
                    {headerNavigation.map((item) => (
                      <li key={item.name} className="flex items-center space-x-3">
                        <AppIcon 
                          name={item.icon as keyof typeof import('@/assets/config/icons').icons}
                          size="small"
                          color="text-design-gold"
                        />
                        <Link 
                          to={item.href}
                          className="font-anton text-white text-base hover:text-design-gold transition-colors duration-300 block flex-1"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  </div>
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