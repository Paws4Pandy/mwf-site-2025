import React from 'react';

interface GlassSocialIconProps {
  type: 'instagram' | 'twitter' | 'pinterest' | 'facebook' | 'linkedin' | 'youtube' | 'whatsapp' | 'slack';
  size?: number;
  className?: string;
}

const GlassSocialIcon: React.FC<GlassSocialIconProps> = ({ type, size = 50, className = "" }) => {
  const iconSize = size;
  // Generate unique ID suffix for this component instance to avoid gradient conflicts
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);

  const renderIcon = () => {
    switch (type) {
      case 'instagram':
        return (
          <g>
            {/* Glass morphism background circle */}
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            {/* Instagram icon path - simplified and centered */}
            <path 
              d="M15 10h20c2.75 0 5 2.25 5 5v20c0 2.75-2.25 5-5 5H15c-2.75 0-5-2.25-5-5V15c0-2.75 2.25-5 5-5zm10 5c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm10.5-17.5c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5S36.12 11 37.5 11s2.5 1.12 2.5 2.5z" 
              fill={`url(#instagram-${uniqueId})`}
            />
          </g>
        );
      case 'twitter':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M36 16.5c-.9.4-1.9.7-2.9.8 1-.6 1.8-1.6 2.2-2.7-1 .6-2.1 1-3.3 1.2-.9-1-2.2-1.6-3.6-1.6-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1-4.1-.2-7.7-2.2-10.1-5.2-.4.7-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.5 3.3-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9.1 0 14-7.5 14-14v-.6c.96-.7 1.8-1.6 2.46-2.6z" 
              fill={`url(#twitter-${uniqueId})`}
            />
          </g>
        );
      case 'facebook':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M32 15h-3c-2.8 0-3 1.3-3 3.2V22h6l-1 6h-5v16h-6V28h-5v-6h5v-4.4C20 12.9 23.3 9 28.2 9c2.4 0 4.4.2 5 .3V15z" 
              fill={`url(#facebook-${uniqueId})`}
            />
          </g>
        );
      case 'linkedin':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M15 22v19h-6V22h6zm-3-9.3c1.9 0 3.1 1.3 3.1 2.8 0 1.6-1.2 2.8-3.1 2.8s-3.1-1.3-3.1-2.8c0-1.6 1.2-2.8 3.1-2.8zM41 41h-6V30.2c0-2.4-.9-4-3.2-4-1.7 0-2.8 1.2-3.2 2.3-.2.4-.2 1-.2 1.6V41h-6s.1-16.3 0-18h6v2.6c.8-1.2 2.2-2.9 5.4-2.9 3.9 0 6.8 2.6 6.8 8.1V41z" 
              fill={`url(#linkedin-${uniqueId})`}
            />
          </g>
        );
      case 'youtube':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M41 19.1s-.3-2.1-1.2-3c-1.1-1.2-2.4-1.2-3-1.3C32.6 14.5 25 14.5 25 14.5s-7.6 0-11.8.3c-.6.1-1.9.1-3 1.3-.9.9-1.2 3-1.2 3S8.8 21.5 8.8 23.9v2.2c0 2.4.2 4.8.2 4.8s.3 2.1 1.2 3c1.1 1.2 2.6 1.1 3.2 1.2 2.3.2 11.5.3 11.5.3s7.6 0 11.8-.3c.6-.1 1.9-.1 3-1.3.9-.9 1.2-3 1.2-3s.2-2.4.2-4.8v-2.2c.1-2.4-.1-4.7-.1-4.7zM22.2 29.4v-8.6l8.1 4.3-8.1 4.3z" 
              fill={`url(#youtube-${uniqueId})`}
            />
          </g>
        );
      case 'whatsapp':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M25 10c-8.3 0-15 6.7-15 15 0 2.6.7 5.2 2 7.4L10 40l7.8-2c2.1 1.2 4.5 1.8 7.2 1.8 8.3 0 15-6.7 15-15s-6.7-15-15-15zm7.5 21.3c-.3.8-1.5 1.5-2.5 1.7-.7.1-1.6.2-4.6-1-5.1-2.1-8.4-7.3-8.7-7.6-.3-.3-2.4-3.2-2.4-6.1s1.5-4.3 2-4.9c.5-.6 1.1-.7 1.5-.7.4 0 .7 0 1 0 .3 0 .8-.1 1.2 1 .5 1.1 1.6 3.9 1.7 4.2.1.3.2.6 0 1-.1.4-.3.6-.6.9-.3.3-.6.7-.9.9-.3.3-.6.6-.3 1.1.3.5 1.4 2.3 3 3.7 2.1 1.8 3.8 2.3 4.4 2.6.5.3.8.2 1.1-.1.3-.4 1.2-1.4 1.5-1.9.3-.5.7-.4 1.1-.2.4.1 2.6 1.2 3 1.4.5.2.8.3.9.5.1.5.1 1.1-.2 1.9z" 
              fill={`url(#whatsapp-${uniqueId})`}
            />
          </g>
        );
      case 'slack':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M19.3 25c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5v6.3c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V25zm6.3 0c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5v6.3c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V25zm0-6.3c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5V25h2.5c1.4 0 2.5-1.1 2.5-2.5zm6.3 0c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5V25h2.5c1.4 0 2.5-1.1 2.5-2.5z" 
              fill={`url(#slack-${uniqueId})`}
            />
          </g>
        );
      case 'pinterest':
        return (
          <g>
            <circle cx="25" cy="25" r="20" fill={`url(#glass-bg-${uniqueId})`} />
            <path 
              d="M25 10c-8.3 0-15 6.7-15 15 0 6.4 4 11.8 9.6 14-.1-1.3-.3-3.3 0-4.7.3-1.3 1.9-8.1 1.9-8.1s-.5-.9-.5-2.3c0-2.2 1.3-3.8 2.9-3.8 1.4 0 2 1 2 2.3 0 1.4-.9 3.5-1.3 5.4-.4 1.6.8 2.9 2.3 2.9 2.8 0 4.9-2.9 4.9-7.1 0-3.7-2.7-6.3-6.5-6.3-4.4 0-7 3.3-7 6.7 0 1.3.5 2.7 1.1 3.5.1.2.1.3.1.5-.1.5-.4 1.5-.4 1.7-.1.3-.2.4-.5.2-2-.9-3.3-3.7-3.3-5.9 0-4.9 3.6-9.4 10.3-9.4 5.4 0 9.6 3.8 9.6 9 0 5.4-3.4 9.7-8.1 9.7-1.6 0-3.1-.8-3.6-1.8 0 0-.8 3-1 3.7-.4 1.4-1.4 3.1-2.1 4.2 1.6.5 3.2.7 5 .7 8.3 0 15-6.7 15-15S33.3 10 25 10z" 
              fill={`url(#pinterest-${uniqueId})`}
            />
          </g>
        );
      default:
        return null;
    }
  };

  const getGradients = () => (
    <defs>
      {/* Glass morphism background gradient */}
      <linearGradient id={`glass-bg-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
        <stop offset="100%" stopColor="rgba(51,51,51,0.05)" />
      </linearGradient>
      
      {/* Icon-specific gradients */}
      <linearGradient id={`instagram-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#833AB4" />
        <stop offset="30%" stopColor="#FD1D1D" />
        <stop offset="70%" stopColor="#F56040" />
        <stop offset="100%" stopColor="#FFDC80" />
      </linearGradient>
      
      <linearGradient id={`twitter-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1DA1F2" />
        <stop offset="100%" stopColor="#63D7FF" />
      </linearGradient>
      
      <linearGradient id={`facebook-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B5998" />
        <stop offset="100%" stopColor="#03D2FF" />
      </linearGradient>
      
      <linearGradient id={`linkedin-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0077B5" />
        <stop offset="100%" stopColor="#1872CB" />
      </linearGradient>
      
      <linearGradient id={`youtube-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="100%" stopColor="#FF7979" />
      </linearGradient>
      
      <linearGradient id={`whatsapp-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#25D366" />
        <stop offset="100%" stopColor="#9DFFC2" />
      </linearGradient>
      
      <linearGradient id={`slack-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A154B" />
        <stop offset="100%" stopColor="#FF709C" />
      </linearGradient>
      
      <linearGradient id={`pinterest-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BD081C" />
        <stop offset="100%" stopColor="#FFB8C0" />
      </linearGradient>
    </defs>
  );

  return (
    <div className={`inline-block ${className}`} style={{ width: iconSize, height: iconSize }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {getGradients()}
        {renderIcon()}
      </svg>
    </div>
  );
};

export default GlassSocialIcon;