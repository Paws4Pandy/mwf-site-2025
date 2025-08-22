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
        background: 'linear-gradient(114.72deg, rgba(255, 255, 255, 0.39) -51.38%, rgba(255, 255, 255, 0) 62.84%, rgba(196, 196, 196, 0) 100.12%)',
        boxShadow: '2px 2px 4.2px 1px rgba(255, 255, 255, 0.19) inset, 1.5px 1px 1.6px -1px #141414',
        boxSizing: 'border-box',
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