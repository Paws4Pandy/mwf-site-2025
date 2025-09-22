import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { headerNavigation } from '@/assets/config/navigation';
import { getTypographyClasses } from '@/lib/design-system';
import AGlassCard from '@/components/ui/AGlassCard';

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
            
            {/* Left Side - Tango Logo and Agent Info */}
            <div className="flex items-center space-x-4">
              {/* Tango Logo */}
              <Link to="/">
                <img 
                  src="/Tango_Ontario_White.png" 
                  alt="Tango Ontario Logo" 
                  className="h-6 sm:h-8 md:h-10"
                  width="120"
                  height="40"
                  loading="lazy"
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
      
      {/* Compact Dropdown Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-2 sm:right-4 z-40 w-72 sm:w-64 max-w-[calc(100vw-1rem)]">
          <AGlassCard className="p-4">
            <nav>
              <div className="flex flex-col space-y-2">
                {headerNavigation.map((item) => {
                  const isPlaybooks = item.name === 'FREE PLAYBOOKS';
                  const linkClassName = `font-roboto-flex text-sm transition-colors duration-300 block py-3 px-3 rounded-lg hover:bg-white/10 ${
                    isPlaybooks ? 'text-[#61d6c5]/60' : 'text-[#61d6c5] hover:text-white'
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
                        <span className="ml-2 text-xs bg-[#61d6c5] text-white px-2 py-1 rounded-full">
                          SOON
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </AGlassCard>
        </div>
      )}
      
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