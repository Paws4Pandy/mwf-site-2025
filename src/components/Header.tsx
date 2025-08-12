import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getBodyClasses } from '@/assets/config/typography';
import { headerNavigation } from '@/assets/config/navigation';
import AppIcon from '@/components/AppIcon';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { Book } from 'lucide-react';

interface HeaderProps {
  showDivider?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true }) => {
  return (
    <>
      <header className="py-4 sm:py-6 bg-transparent relative">
        <div className="container mx-auto px-4 sm:px-8">
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
            
            {/* Right Side - Anton Font Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/playbooks"
                className="font-anton text-white hover:text-muted-red transition-colors duration-300 text-lg relative group"
              >
                FREE PLAYBOOKS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/rates"
                className="font-anton text-white hover:text-muted-red transition-colors duration-300 text-lg relative group"
              >
                RATES
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/calculator"
                className="font-anton text-white hover:text-muted-red transition-colors duration-300 text-lg relative group"
              >
                CALCULATORS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/meet"
                className="font-anton text-white hover:text-muted-red transition-colors duration-300 text-lg relative group"
              >
                MEET ME
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/strategies"
                className="font-anton text-white hover:text-muted-red transition-colors duration-300 text-lg relative group"
              >
                MY STRATEGIES
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
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