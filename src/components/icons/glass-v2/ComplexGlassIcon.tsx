import React from 'react';

interface ComplexGlassIconProps {
  size?: number;
  className?: string;
}

const ComplexGlassIcon: React.FC<ComplexGlassIconProps> = ({ 
  size = 272, 
  className = '' 
}) => {
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  
  return (
    <svg
      width={size}
      height={size * 0.89} // Maintain aspect ratio
      viewBox="0 0 272 242"
      className={className}
      style={{ 
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        position: 'relative'
      }}
    >
      <defs>
        {/* Multiple gradient definitions based on the CSS */}
        <linearGradient id={`gradient1-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF720" />
          <stop offset="100%" stopColor="#3CD500" />
        </linearGradient>
        
        <linearGradient id={`gradient2-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0340E" />
          <stop offset="100%" stopColor="#360940" />
        </linearGradient>
        
        <linearGradient id={`gradient3-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#72EDF2" />
          <stop offset="100%" stopColor="#5151E5" />
        </linearGradient>
        
        <linearGradient id={`gradient4-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF655C" />
          <stop offset="100%" stopColor="#7C0397" />
        </linearGradient>
        
        <linearGradient id={`gradient5-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B73FF" />
          <stop offset="100%" stopColor="#000DFF" />
        </linearGradient>
        
        <linearGradient id={`gradient6-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6FD8" />
          <stop offset="100%" stopColor="#3813C2" />
        </linearGradient>
        
        <linearGradient id={`glass-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
        
        {/* Blur filters */}
        <filter id={`blur1-${uniqueId}`}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
        
        <filter id={`blur2-${uniqueId}`}>
          <feGaussianBlur stdDeviation="22" />
        </filter>
        
        <filter id={`blur3-${uniqueId}`}>
          <feGaussianBlur stdDeviation="17" />
        </filter>
        
        <filter id={`blur4-${uniqueId}`}>
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      
      {/* Main container */}
      <g transform="translate(29, 44)">
        
        {/* Row 1 - Top icons */}
        <g transform="translate(0, 0)">
          {/* Icon 1 - Complex geometric shape */}
          <g transform="translate(72.2, 2.8)">
            {/* Blurred background */}
            <rect
              x="0"
              y="0"
              width="6.4"
              height="11.4"
              fill={`url(#gradient1-${uniqueId})`}
              filter={`url(#blur1-${uniqueId})`}
              rx="0.5"
            />
            
            {/* Main shape */}
            <rect
              x="0"
              y="0"
              width="6.4"
              height="11.4"
              fill={`url(#gradient1-${uniqueId})`}
              rx="0.5"
            />
            
            {/* Additional elements */}
            <rect
              x="9.6"
              y="0"
              width="6.4"
              height="11.4"
              fill={`url(#gradient2-${uniqueId})`}
              rx="0.2"
            />
            
            <rect
              x="7"
              y="6.2"
              width="2"
              height="5"
              fill={`url(#gradient2-${uniqueId})`}
              rx="0.2"
            />
            
            <rect
              x="7"
              y="16.2"
              width="2"
              height="5"
              fill={`url(#gradient2-${uniqueId})`}
              rx="0.2"
              transform="rotate(180 8 18.7)"
            />
            
            {/* Glass highlights */}
            <rect
              x="1"
              y="-0.8"
              width="2"
              height="5"
              fill={`url(#gradient1-${uniqueId})`}
              rx="0.2"
              style={{
                boxShadow: 'inset 0px 4px 6.4px rgba(25, 254, 48, 0.25)'
              }}
            />
            
            <rect
              x="13"
              y="-2.8"
              width="2"
              height="5"
              fill={`url(#gradient1-${uniqueId})`}
              rx="0.2"
              style={{
                boxShadow: 'inset 0px 4px 6.4px rgba(25, 254, 48, 0.25)'
              }}
            />
            
            <rect
              x="1"
              y="12.2"
              width="2"
              height="5"
              fill={`url(#gradient1-${uniqueId})`}
              rx="0.2"
              transform="rotate(180 2 14.7)"
              style={{
                boxShadow: 'inset 0px 4px 6.4px rgba(25, 254, 48, 0.25)'
              }}
            />
            
            <rect
              x="13"
              y="7.2"
              width="2"
              height="5"
              fill={`url(#gradient1-${uniqueId})`}
              rx="0.2"
              transform="rotate(180 14 9.7)"
              style={{
                boxShadow: 'inset 0px 4px 6.4px rgba(25, 254, 48, 0.25)'
              }}
            />
            
            {/* Glass panels */}
            <rect
              x="6"
              y="8.2"
              width="4"
              height="11"
              fill={`url(#glass-${uniqueId})`}
              rx="0.5"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
            
            <rect
              x="12"
              y="-0.8"
              width="4"
              height="11"
              fill={`url(#glass-${uniqueId})`}
              rx="0.5"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
            
            <rect
              x="0"
              y="1.2"
              width="4"
              height="14"
              fill={`url(#glass-${uniqueId})`}
              rx="0.5"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </g>
          
          {/* Icon 2 - Circular glass */}
          <g transform="translate(128.2, 1)">
            {/* Blurred glow */}
            <circle
              cx="10.5"
              cy="11"
              r="10.5"
              fill={`url(#gradient3-${uniqueId})`}
              filter={`url(#blur2-${uniqueId})`}
            />
            
            {/* Small glow */}
            <circle
              cx="13"
              cy="12"
              r="5.5"
              fill={`url(#gradient3-${uniqueId})`}
            />
            
            {/* Main glass circle */}
            <circle
              cx="10"
              cy="3"
              r="10"
              fill={`url(#glass-${uniqueId})`}
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
            
            {/* Glass highlight */}
            <rect
              x="9.2"
              y="7"
              width="7.17"
              height="3.58"
              fill={`url(#glass-${uniqueId})`}
              rx="0.2"
              transform="rotate(-15.65 12.785 8.79)"
              style={{
                boxShadow: '0px 1px 1.5px rgba(0, 0, 0, 0.25), inset 0px 8px 4px rgba(255, 255, 255, 0.25)'
              }}
            />
          </g>
          
          {/* Icon 3 - Vertical bar */}
          <g transform="translate(189.2, 2)">
            {/* Blurred background */}
            <rect
              x="0"
              y="0"
              width="13"
              height="16"
              fill={`url(#gradient4-${uniqueId})`}
              filter={`url(#blur3-${uniqueId})`}
              rx="0.5"
            />
            
            {/* Main bar */}
            <rect
              x="4"
              y="3"
              width="3"
              height="16"
              fill={`url(#gradient4-${uniqueId})`}
              rx="0.5"
            />
            
            {/* Glass overlay */}
            <rect
              x="3.2"
              y="2"
              width="13"
              height="8"
              fill={`url(#glass-${uniqueId})`}
              rx="0.5"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2.5px)'
              }}
            />
            
            {/* Bottom highlight */}
            <rect
              x="2.2"
              y="17"
              width="7"
              height="3"
              fill={`url(#glass-${uniqueId})`}
              rx="20"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
          </g>
          
          {/* Icon 4 - Square with plus */}
          <g transform="translate(243.2, 1)">
            {/* Blurred background */}
            <rect
              x="7.26"
              y="1.77"
              width="16.77"
              height="16.77"
              fill={`url(#gradient5-${uniqueId})`}
              filter={`url(#blur4-${uniqueId})`}
              rx="4.5"
            />
            
            {/* Main square */}
            <rect
              x="9.8"
              y="7.41"
              width="16"
              height="16"
              fill={`url(#gradient5-${uniqueId})`}
              rx="4.5"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
            
            {/* Glass overlay */}
            <rect
              x="0"
              y="0"
              width="19.42"
              height="19.42"
              fill={`url(#glass-${uniqueId})`}
              rx="4.5"
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
            
            {/* Plus symbol */}
            <g transform="translate(3.73, 5.42)">
              <rect
                x="0"
                y="0"
                width="2.94"
                height="2.94"
                fill={`url(#glass-${uniqueId})`}
                rx="0.2"
                style={{
                  boxShadow: '0px 1px 1.5px rgba(0, 0, 0, 0.25), inset 0px 8px 4px rgba(255, 255, 255, 0.25)'
                }}
              />
              
              <line
                x1="0"
                y1="1.47"
                x2="0"
                y2="1.47"
                stroke="#1227E1"
                strokeWidth="1"
                transform="rotate(90 0 1.47)"
              />
              
              <line
                x1="1.46"
                y1="0"
                x2="1.46"
                y2="0"
                stroke="#1227E1"
                strokeWidth="1"
                transform="rotate(180 1.46 0)"
              />
            </g>
          </g>
          
          {/* Icon 5 - Three dots */}
          <g transform="translate(3.2, 2)">
            {/* Blurred background */}
            <circle
              cx="7"
              cy="7"
              r="7"
              fill={`url(#gradient6-${uniqueId})`}
              filter={`url(#blur3-${uniqueId})`}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            />
            
            <circle
              cx="14"
              cy="10"
              r="7"
              fill={`url(#gradient6-${uniqueId})`}
              transform="matrix(-1, 0, 0, 1, 0, 0)"
            />
            
            {/* Main glass circle */}
            <circle
              cx="10"
              cy="2"
              r="10"
              fill={`url(#glass-${uniqueId})`}
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(2px)'
              }}
            />
            
            {/* Three dots */}
            <circle
              cx="5"
              cy="11"
              r="1"
              fill={`url(#glass-${uniqueId})`}
              style={{
                boxShadow: '0px 1px 1.5px rgba(0, 0, 0, 0.25), inset 0px 8px 4px rgba(255, 255, 255, 0.25)'
              }}
            />
            
            <circle
              cx="9"
              cy="11"
              r="1"
              fill={`url(#glass-${uniqueId})`}
              style={{
                boxShadow: '0px 1px 1.5px rgba(0, 0, 0, 0.25), inset 0px 8px 4px rgba(255, 255, 255, 0.25)'
              }}
            />
            
            <circle
              cx="13"
              cy="11"
              r="1"
              fill={`url(#glass-${uniqueId})`}
              style={{
                boxShadow: '0px 1px 1.5px rgba(0, 0, 0, 0.25), inset 0px 8px 4px rgba(255, 255, 255, 0.25)'
              }}
            />
          </g>
        </g>
        
        {/* Additional rows would go here - this is a simplified version */}
        
      </g>
    </svg>
  );
};

export default ComplexGlassIcon;
