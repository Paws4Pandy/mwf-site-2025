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
    <div className="min-h-screen relative overflow-hidden bg-design-charcoal">
      {/* Soft Green Glow - Top Right */}
      <div 
        className="absolute"
        style={{
          width: '900px',
          height: '900px',
          left: '70%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(167, 243, 208, 0.4) 0%, rgba(167, 243, 208, 0.1) 40%, transparent 70%)',
          filter: 'blur(120px)'
        }}
      />

      {/* Gentle Blue Mist - Left Side */}
      <div 
        className="absolute"
        style={{
          width: '1000px',
          height: '700px',
          left: '-20%',
          top: '40%',
          background: 'radial-gradient(ellipse, rgba(186, 230, 253, 0.35) 0%, rgba(186, 230, 253, 0.08) 50%, transparent 80%)',
          filter: 'blur(150px)'
        }}
      />

      {/* Soft Purple Accent - Center */}
      <div 
        className="absolute"
        style={{
          width: '800px',
          height: '600px',
          left: '30%',
          top: '50%',
          background: 'radial-gradient(ellipse, rgba(233, 213, 255, 0.25) 0%, rgba(233, 213, 255, 0.05) 60%, transparent 85%)',
          filter: 'blur(140px)'
        }}
      />

      {/* Warm Peach Glow - Bottom Right */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '700px',
          height: '500px',
          left: '60%',
          top: '65%',
          background: 'radial-gradient(ellipse, rgba(254, 215, 170, 0.3) 0%, rgba(254, 215, 170, 0.08) 50%, transparent 75%)',
          filter: 'blur(130px)'
        }}
      />

      {/* Gentle Rose Tint - Bottom Left */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '400px',
          left: '10%',
          top: '70%',
          background: 'radial-gradient(ellipse, rgba(251, 207, 232, 0.2) 0%, rgba(251, 207, 232, 0.05) 55%, transparent 80%)',
          filter: 'blur(110px)'
        }}
      />

      {/* Soft Yellow Accent - Top Center */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          left: '45%',
          top: '5%',
          background: 'radial-gradient(circle, rgba(254, 249, 195, 0.25) 0%, rgba(254, 249, 195, 0.06) 60%, transparent 85%)',
          filter: 'blur(100px)'
        }}
      />


      {children}
    </div>
  );
};

export default PageBackground;