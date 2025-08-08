import React from 'react';

interface GlassIconProps {
  size?: number;
  className?: string;
}

// Icon 1: Complex geometric shape with multiple gradients
export const GeometricGlassIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`geo-grad1-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF720" />
          <stop offset="100%" stopColor="#3CD500" />
        </linearGradient>
        <linearGradient id={`geo-grad2-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0340E" />
          <stop offset="100%" stopColor="#360940" />
        </linearGradient>
        <linearGradient id={`geo-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`geo-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      
      {/* Main geometric shape */}
      <g transform="translate(10, 10)">
        {/* Blurred background */}
        <rect x="0" y="0" width="30" height="30" fill={`url(#geo-grad1-${uniqueId})`} filter={`url(#geo-blur-${uniqueId})`} rx="2" />
        
        {/* Main rectangles */}
        <rect x="5" y="5" width="8" height="20" fill={`url(#geo-grad1-${uniqueId})`} rx="1" />
        <rect x="17" y="5" width="8" height="20" fill={`url(#geo-grad2-${uniqueId})`} rx="1" />
        
        {/* Glass panels */}
        <rect x="7" y="7" width="4" height="16" fill={`url(#geo-glass-${uniqueId})`} rx="0.5" />
        <rect x="19" y="7" width="4" height="16" fill={`url(#geo-glass-${uniqueId})`} rx="0.5" />
        
        {/* Highlights */}
        <rect x="6" y="6" width="2" height="4" fill={`url(#geo-grad1-${uniqueId})`} rx="0.5" />
        <rect x="22" y="6" width="2" height="4" fill={`url(#geo-grad1-${uniqueId})`} rx="0.5" />
      </g>
    </svg>
  );
};

// Icon 2: Circular glass with glow
export const CircularGlassIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`circ-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#72EDF2" />
          <stop offset="100%" stopColor="#5151E5" />
        </linearGradient>
        <linearGradient id={`circ-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`circ-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      
      {/* Glow effect */}
      <circle cx="25" cy="25" r="20" fill={`url(#circ-grad-${uniqueId})`} filter={`url(#circ-blur-${uniqueId})`} opacity="0.6" />
      
      {/* Small glow */}
      <circle cx="30" cy="30" r="8" fill={`url(#circ-grad-${uniqueId})`} opacity="0.8" />
      
      {/* Main glass circle */}
      <circle cx="25" cy="25" r="18" fill={`url(#circ-glass-${uniqueId})`} />
      
      {/* Glass highlight */}
      <rect x="20" y="20" width="10" height="4" fill={`url(#circ-glass-${uniqueId})`} rx="1" transform="rotate(-15 25 22)" />
    </svg>
  );
};

// Icon 3: Vertical bar with gradient
export const VerticalBarIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`bar-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF655C" />
          <stop offset="100%" stopColor="#7C0397" />
        </linearGradient>
        <linearGradient id={`bar-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`bar-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      
      {/* Blurred background */}
      <rect x="15" y="5" width="20" height="40" fill={`url(#bar-grad-${uniqueId})`} filter={`url(#bar-blur-${uniqueId})`} rx="2" />
      
      {/* Main bar */}
      <rect x="20" y="8" width="10" height="34" fill={`url(#bar-grad-${uniqueId})`} rx="2" />
      
      {/* Glass overlay */}
      <rect x="18" y="10" width="14" height="30" fill={`url(#bar-glass-${uniqueId})`} rx="2" />
      
      {/* Bottom highlight */}
      <rect x="22" y="35" width="6" height="3" fill={`url(#bar-glass-${uniqueId})`} rx="1.5" />
    </svg>
  );
};

// Icon 4: Square with plus symbol
export const SquarePlusIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`square-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B73FF" />
          <stop offset="100%" stopColor="#000DFF" />
        </linearGradient>
        <linearGradient id={`square-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`square-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      
      {/* Blurred background */}
      <rect x="10" y="10" width="30" height="30" fill={`url(#square-grad-${uniqueId})`} filter={`url(#square-blur-${uniqueId})`} rx="4" />
      
      {/* Main square */}
      <rect x="12" y="12" width="26" height="26" fill={`url(#square-grad-${uniqueId})`} rx="4" />
      
      {/* Glass overlay */}
      <rect x="10" y="10" width="30" height="30" fill={`url(#square-glass-${uniqueId})`} rx="4" />
      
      {/* Plus symbol */}
      <g transform="translate(25, 25)">
        <rect x="-2" y="-8" width="4" height="16" fill={`url(#square-glass-${uniqueId})`} rx="1" />
        <rect x="-8" y="-2" width="16" height="4" fill={`url(#square-glass-${uniqueId})`} rx="1" />
      </g>
    </svg>
  );
};

// Icon 5: Three dots
export const ThreeDotsIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`dots-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6FD8" />
          <stop offset="100%" stopColor="#3813C2" />
        </linearGradient>
        <linearGradient id={`dots-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`dots-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      
      {/* Blurred background */}
      <circle cx="25" cy="25" r="20" fill={`url(#dots-grad-${uniqueId})`} filter={`url(#dots-blur-${uniqueId})`} opacity="0.6" />
      
      {/* Main glass circle */}
      <circle cx="25" cy="25" r="18" fill={`url(#dots-glass-${uniqueId})`} />
      
      {/* Three dots */}
      <circle cx="18" cy="25" r="3" fill={`url(#dots-glass-${uniqueId})`} />
      <circle cx="25" cy="25" r="3" fill={`url(#dots-glass-${uniqueId})`} />
      <circle cx="32" cy="25" r="3" fill={`url(#dots-glass-${uniqueId})`} />
    </svg>
  );
};

// Icon 6: Diamond shape
export const DiamondIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`diamond-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0B0B" />
          <stop offset="100%" stopColor="#9C0506" />
        </linearGradient>
        <linearGradient id={`diamond-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`diamond-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      
      {/* Blurred background */}
      <polygon points="25,5 40,25 25,45 10,25" fill={`url(#diamond-grad-${uniqueId})`} filter={`url(#diamond-blur-${uniqueId})`} />
      
      {/* Main diamond */}
      <polygon points="25,8 38,25 25,42 12,25" fill={`url(#diamond-glass-${uniqueId})`} />
      
      {/* Plus symbol inside */}
      <g transform="translate(25, 25)">
        <rect x="-1" y="-6" width="2" height="12" fill={`url(#diamond-grad-${uniqueId})`} rx="0.5" />
        <rect x="-6" y="-1" width="12" height="2" fill={`url(#diamond-grad-${uniqueId})`} rx="0.5" />
      </g>
    </svg>
  );
};

// Icon 7: Hexagon
export const HexagonIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`hex-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9D6C" />
          <stop offset="100%" stopColor="#BB4E75" />
        </linearGradient>
        <linearGradient id={`hex-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`hex-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      
      {/* Blurred background */}
      <polygon points="25,5 40,15 40,35 25,45 10,35 10,15" fill={`url(#hex-grad-${uniqueId})`} filter={`url(#hex-blur-${uniqueId})`} />
      
      {/* Main hexagon */}
      <polygon points="25,8 38,17 38,33 25,42 12,33 12,17" fill={`url(#hex-glass-${uniqueId})`} />
      
      {/* Inner details */}
      <circle cx="25" cy="25" r="8" fill={`url(#hex-grad-${uniqueId})`} opacity="0.3" />
    </svg>
  );
};

// Icon 8: Star shape
export const StarIcon: React.FC<GlassIconProps> = ({ size = 50, className = '' }) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" className={className}>
      <defs>
        <linearGradient id={`star-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EFFEA" />
          <stop offset="100%" stopColor="#FF0101" />
        </linearGradient>
        <linearGradient id={`star-glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        <filter id={`star-blur-${uniqueId}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      
      {/* Blurred background */}
      <polygon points="25,5 30,20 45,20 33,30 38,45 25,35 12,45 17,30 5,20 20,20" fill={`url(#star-grad-${uniqueId})`} filter={`url(#star-blur-${uniqueId})`} />
      
      {/* Main star */}
      <polygon points="25,8 29,20 40,20 31,28 35,40 25,32 15,40 19,28 10,20 21,20" fill={`url(#star-glass-${uniqueId})`} />
      
      {/* Center highlight */}
      <circle cx="25" cy="25" r="4" fill={`url(#star-grad-${uniqueId})`} opacity="0.6" />
    </svg>
  );
};

// Icons are already exported individually above
