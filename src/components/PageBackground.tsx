
import React, { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  backgroundImage?: string;
}

const PageBackground: React.FC<PageBackgroundProps> = ({ 
  children, 
  backgroundImage 
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Minimal decorative elements */}
      <div className="hidden md:block absolute top-20 right-20 w-24 h-24 bg-light-azure opacity-30 rounded-full blur-2xl"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-32 h-32 bg-light-crimson opacity-20 rounded-full blur-2xl"></div>
      
      {children}
    </div>
  );
};

export default PageBackground;
