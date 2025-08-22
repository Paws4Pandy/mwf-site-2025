import React from 'react';
import { Link } from 'react-router-dom';
import { headerNavigation } from '@/assets/config/navigation';

interface HeaderProps {
  showDivider?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true, transparent = false }) => {
  return (
    <>
      <header className={`py-8 sm:py-10 relative ${transparent ? 'bg-transparent' : 'bg-hunter-green'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Left Side - BRX Logo and Agent Info */}
            <div className="flex items-center space-x-4">
              {/* BRX Logo */}
              <Link to="/">
                <img 
                  src="/BRX_brand_white.png" 
                  alt="BRX Mortgage Logo" 
                  className="h-6 sm:h-8 md:h-10"
                />
              </Link>
              
              {/* Agent Name & Title */}
              <div className="leading-none">
                <div className="font-anton text-design-gold text-lg sm:text-xl font-normal">Andreina Ford</div>
                <div className="font-anton text-white text-sm sm:text-base font-normal">Mortgage Agent Level 2</div>
              </div>
            </div>
            
            {/* Right Side - Navigation from Config */}
            <nav className="hidden md:flex items-center gap-6">
              {headerNavigation.map((item) => {
                const isPlaybooks = item.name === 'FREE PLAYBOOKS';
                const linkClassName = `font-anton hover:text-design-gold transition-colors duration-300 text-lg relative group ${
                  isPlaybooks ? 'text-white/60' : 'text-white'
                }`;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={linkClassName}
                  >
                    {item.name}
                    {isPlaybooks && (
                      <span className="text-xs text-design-lilac/80 absolute -top-2 -right-3 bg-design-lilac/20 px-1 rounded">SOON</span>
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-design-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white font-anton text-sm">
                MENU
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Removed separator for seamless integration */}
    </>
  );
};

export default Header;