import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
  showDivider?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showDivider = true }) => {
  return (
    <>
      <header className="py-4 px-4 md:px-8 bg-soft-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-0 animate-fade-in">
            
            {/* Left side - Logo and Agent Info */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="/src/assets/images/logos/BRX_brand_black.png" 
                  alt="BRX Mortgage Logo" 
                  className="h-10 md:h-12"
                />
                <div className="text-left">
                  <h3 className="font-Arial font-bold text-medium text-black">
                    #13463
                  </h3>
              </Link>
              
              <div className="hidden md:flex items-center gap-4">
                <img 
                  src="/src/assets/images/headshots/andreina-ford-white-black2.jpg" 
                  alt="Andreina Ford" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-#efe0df"
                />
                <div className="text-left">
                  <h3 className="font-times-new-roman font-bold text-lg text-charcoal">
                    Andreina Ford
                  </h3>
                  <p className="font-times-new-roman font-bold text-lg text-charcoal">
                    Mortgage Agent Level 2
                  </p>
                  <p className="font-times-new-roman font-bold text-lg text-charcoal">
                    Prince Edward County & Ontario Wide
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Playbook CTA */}
            <div className="flex-shrink-0">
              <Link 
                to="/playbooks" 
                className="inline-flex items-center px-5 py-2.5 bg-brand-burgundy text-soft-white font-opensauce font-medium text-sm rounded-lg hover:bg-charcoal transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                📚 Free Mortgage Playbooks
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {showDivider && (
        <Separator className="bg-brand-burgundy/20 h-px" />
      )}
    </>
  );
};

export default Header;