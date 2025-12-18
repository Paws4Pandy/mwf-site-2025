import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { headerNavigation } from '@/assets/config/navigation';
import { getTypographyClasses } from '@/lib/design-system';

interface HeaderProps {
  showDivider?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true, transparent = false }) => {
  const location = useLocation();

  return (
    <>
      <header className={`py-6 sm:py-8 relative ${transparent ? 'bg-transparent' : 'bg-design-green'}`}>
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

            {/* Desktop Navigation Menu */}
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {headerNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`font-anton text-white text-sm lg:text-base transition-all duration-300 relative pb-1 ${
                      isActive ? 'font-bold' : 'font-normal'
                    } hover:text-white/80`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Optional Divider */}
      {showDivider && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-design-white/20 to-transparent"></div>
      )}
    </>
  );
};

export default Header;