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
      {/* Vector 1 - Green */}
      <div 
        className="absolute"
        style={{
          width: '807.96px',
          height: '1034.32px',
          left: '860px',
          top: '231px',
          background: '#00DD81',
          filter: 'blur(175px)'
        }}
      />

      {/* Vector 3 - Blue */}
      <div 
        className="absolute"
        style={{
          width: '1112.33px',
          height: '786.18px',
          left: '-201px',
          top: '555px',
          background: '#0038FF',
          filter: 'blur(175px)'
        }}
      />

      {/* Vector 2 - Magenta */}
      <div 
        className="absolute"
        style={{
          width: '1112.33px',
          height: '786.18px',
          left: '-201px',
          top: '603px',
          background: '#FF00F5',
          filter: 'blur(175px)'
        }}
      />

      {/* Ellipse 1 - Red */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '984px',
          height: '653px',
          left: '423px',
          top: '732px',
          background: '#FF4545',
          filter: 'blur(175px)'
        }}
      />

      {/* Ellipse 2 - Pink */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '756px',
          height: '502px',
          left: '439px',
          top: '808px',
          background: '#FF50D4',
          filter: 'blur(75px)'
        }}
      />

      {/* Ellipse 3 - Yellow */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '353px',
          height: '353px',
          left: '1114px',
          top: '781px',
          background: '#FFF181',
          filter: 'blur(125px)'
        }}
      />

      {/* 50% Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {children}
    </div>
  );
};

export default PageBackground;