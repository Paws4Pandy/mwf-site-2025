import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, TrendingUp, ChevronUp } from 'lucide-react';
import { PremiumGlassCard } from '@/components/ui/PremiumGlassCard';

interface FloatingActionButtonsProps {
  showScrollTop?: boolean;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  showScrollTop = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Calculator Button */}
      <button
        onClick={() => handleNavigation('/calculator')}
        className="group"
        aria-label="Open Mortgage Calculator"
      >
        <PremiumGlassCard
          variant="premium"
          intensity="strong"
          hover={true}
          glow={true}
          className="w-14 h-14 p-0 flex items-center justify-center"
        >
          <Calculator className="w-6 h-6 text-pure-white group-hover:text-yellow-300 transition-colors duration-300" />
          
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-pure-black/90 backdrop-blur-md text-pure-white px-3 py-2 rounded-lg text-sm font-hammersmith whitespace-nowrap border border-light-azure/20">
              Calculator
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-pure-black/90"></div>
            </div>
          </div>
        </PremiumGlassCard>
      </button>

      {/* Rates Button */}
      <button
        onClick={() => handleNavigation('/rates')}
        className="group"
        aria-label="View Current Rates"
      >
        <PremiumGlassCard
          variant="financial"
          intensity="strong"
          hover={true}
          glow={true}
          className="w-14 h-14 p-0 flex items-center justify-center"
        >
          <TrendingUp className="w-6 h-6 text-light-azure group-hover:text-pure-white transition-colors duration-300" />
          
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-pure-black/90 backdrop-blur-md text-pure-white px-3 py-2 rounded-lg text-sm font-hammersmith whitespace-nowrap border border-light-azure/20">
              Current Rates
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-pure-black/90"></div>
            </div>
          </div>
        </PremiumGlassCard>
      </button>

      {/* Scroll to Top Button */}
      {showScrollTop && isVisible && (
        <button
          onClick={scrollToTop}
          className="group"
          aria-label="Scroll to top"
        >
          <PremiumGlassCard
            variant="accent"
            intensity="strong"
            hover={true}
            glow={true}
            className="w-14 h-14 p-0 flex items-center justify-center animate-bounce"
          >
            <ChevronUp className="w-6 h-6 text-pure-white group-hover:text-brand-red transition-colors duration-300" />
            
            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-pure-black/90 backdrop-blur-md text-pure-white px-3 py-2 rounded-lg text-sm font-hammersmith whitespace-nowrap border border-light-azure/20">
                Back to Top
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-pure-black/90"></div>
              </div>
            </div>
          </PremiumGlassCard>
        </button>
      )}
    </div>
  );
};