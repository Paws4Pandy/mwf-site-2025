import React from 'react';

interface GlassIconV2Props {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export const GlassIconV2: React.FC<GlassIconV2Props> = ({ 
  size = 50, 
  className = '',
  children 
}) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={className}
      style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
    >
      <defs>
        {/* Glass morphism gradient */}
        <linearGradient id={`glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        
        {/* Glow effect */}
        <filter id={`glow-${uniqueId}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Glass background circle */}
      <circle
        cx="25"
        cy="25"
        r="20"
        fill={`url(#glass-${uniqueId})`}
        style={{
          backdropFilter: 'blur(2px)',
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Content area */}
      <g transform="translate(25, 25)">
        {children}
      </g>
    </svg>
  );
};

// Specific icon components
export const GlassWalletIconV2: React.FC<{ size?: number; className?: string }> = ({ 
  size = 50, 
  className = '' 
}) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={className}
    >
      <defs>
        <linearGradient id={`wallet-glow-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDB94" />
          <stop offset="100%" stopColor="#FE749C" />
        </linearGradient>
        <linearGradient id={`wallet-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
      </defs>
      
      {/* Glow effect */}
      <circle
        cx="25"
        cy="25"
        r="18"
        fill={`url(#wallet-glow-${uniqueId})`}
        opacity="0.3"
        filter="blur(4px)"
      />
      
      {/* Glass background */}
      <rect
        x="15"
        y="20"
        width="20"
        height="10"
        rx="2"
        fill={`url(#wallet-glass-${uniqueId})`}
        style={{
          backdropFilter: 'blur(2px)',
          boxShadow: 'inset 0px 1px 3px rgba(255, 255, 255, 0.4)'
        }}
      />
      
      {/* Wallet details */}
      <rect x="17" y="22" width="16" height="6" rx="1" fill="rgba(255, 255, 255, 0.3)" />
      <circle cx="20" cy="25" r="1" fill="rgba(255, 255, 255, 0.6)" />
      <circle cx="23" cy="25" r="1" fill="rgba(255, 255, 255, 0.6)" />
      <circle cx="26" cy="25" r="1" fill="rgba(255, 255, 255, 0.6)" />
    </svg>
  );
};

export default GlassIconV2;
