import React from 'react';

interface AGlassCardProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
  padding?: string;
  onClick?: () => void;
}

const AGlassCard: React.FC<AGlassCardProps> = ({ 
  children, 
  className = '',
  width = 'w-full',
  padding = 'p-8',
  onClick
}) => {
  return (
    <div 
      className={`
        ${width} ${padding}
        rounded-[22px]
        backdrop-blur-[20px]
        relative
        transition-all duration-300
        ${className}
      `}
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E"),
          linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)
        `,
        boxShadow: '2px 2px 4.2px 1px rgba(255, 255, 255, 0.08) inset, 1.5px 1px 1.6px -1px #0a0a0a, 0 8px 32px rgba(0, 0, 0, 0.3)',
        boxSizing: 'border-box',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onClick={onClick}
    >
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default AGlassCard;