import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { headerNavigation } from '@/assets/config/navigation';
import { getTypographyClasses } from '@/lib/design-system';

interface HeaderProps {
  showDivider?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true, transparent = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`py-8 sm:py-10 relative ${transparent ? 'bg-transparent' : 'bg-design-green'}`}>
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
                <div className="text-white text-sm sm:text-base">Andreina Ford</div>
                <div className={getTypographyClasses('body', 'text-design-white text-sm sm:text-base font-normal')}>Mortgage Agent Level 2</div>
              </div>
            </div>
            
            {/* Hamburger Menu Button - Always Visible */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-design-white hover:text-design-brand-red transition-colors duration-300 z-50 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Slide-out Navigation Menu */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-design-green shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <nav className="pt-20 px-6">
          <div className="flex flex-col space-y-4">
            {headerNavigation.map((item) => {
              const isPlaybooks = item.name === 'FREE PLAYBOOKS';
              const linkClassName = `font-anton text-lg transition-colors duration-300 block py-2 ${
                isPlaybooks ? 'text-design-white/60' : 'text-design-white hover:text-design-brand-red'
              }`;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={linkClassName}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {isPlaybooks && (
                    <span className="ml-2 text-xs bg-design-brand-red text-design-white px-2 py-1 rounded-full">
                      SOON
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Optional Divider */}
      {showDivider && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-design-white/20 to-transparent"></div>
      )}
    </>
  );
};

export default Header;