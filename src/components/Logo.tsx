
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-7xl'
  };
  
  return (
    <Link to="/" className="flex flex-col no-underline">
      <div className={`font-league-spartan font-bold tracking-tighter ${sizeClasses[size]} ${className}`}>
        Mortgage with Ford.ca
      </div>
      {size !== 'sm' && (
        <>
          <div className="text-md mt-1 font-hammersmith text-hunter-green">
            Based in Prince Edward County - Serving Ontario Wide.
          </div>
          <div className="text-md mt-1 font-opensauce font-semibold text-hunter-green">
            Andreina Ford - Mortgage Agent Level 2
          </div>
        </>
      )}
    </Link>
  );
};

export default Logo;
