
import React from 'react';
import { Link } from 'react-router-dom';
import { getH1Classes, getBodyClasses } from '@/assets/config/typography';
import AppIcon from '@/components/AppIcon';
import LiquidGlassWrapper from '@/components/ui/LiquidGlassWrapper';

interface NavCardProps {
  title: string;
  description: string;
  icon: keyof typeof import('@/assets/config/icons').icons;
  href: string;
  className?: string;
}

const NavCard: React.FC<NavCardProps> = ({
  title,
  description,
  icon,
  href,
  className = ''
}) => {
  return (
    <LiquidGlassWrapper
      mode="standard"
      intensity={0.3}
      scale={0.4}
      disabled={false}
    >
      <Link
        to={href}
        className={`block p-4 sm:p-6 opacity-0 ${className} w-full text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10`}
      >
      <div className="mb-3 sm:mb-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm mx-auto flex items-center justify-center border border-white/30">
        <AppIcon 
          name={icon}
          size="large"
          color="text-white"
        />
      </div>
      <h3 className={`${getH1Classes('text-lg sm:text-xl mb-2 text-white')}`}>{title}</h3>
      <p className={`${getBodyClasses('text-white/80')}`}>{description}</p>
      </Link>
    </LiquidGlassWrapper>
  );
};

export default NavCard;
