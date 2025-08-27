import React from 'react';

interface PiggyBankIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export const PiggyBankIcon: React.FC<PiggyBankIconProps> = ({ 
  size = 48, 
  className = '', 
  color = '#FFB6C1' // Light pink default
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="50" cy="55" rx="35" ry="25" fill={color} />
      
      {/* Head */}
      <ellipse cx="30" cy="50" rx="20" ry="18" fill={color} />
      
      {/* Snout */}
      <ellipse cx="18" cy="52" rx="8" ry="6" fill="#FF91A4" />
      
      {/* Nostrils */}
      <circle cx="15" cy="52" r="1.5" fill="#D1547A" />
      <circle cx="21" cy="52" r="1.5" fill="#D1547A" />
      
      {/* Eye */}
      <circle cx="28" cy="45" r="3" fill="#000" />
      <circle cx="29" cy="44" r="1" fill="#FFF" />
      
      {/* Ears */}
      <path d="M25 35 L20 28 L28 30 Z" fill={color} />
      <path d="M35 35 L38 28 L42 32 Z" fill={color} />
      
      {/* Legs */}
      <rect x="25" y="70" width="8" height="12" rx="3" fill="#FF91A4" />
      <rect x="40" y="70" width="8" height="12" rx="3" fill="#FF91A4" />
      <rect x="55" y="70" width="8" height="12" rx="3" fill="#FF91A4" />
      <rect x="70" y="70" width="8" height="12" rx="3" fill="#FF91A4" />
      
      {/* Tail */}
      <path 
        d="M82 52 Q88 45, 85 38 Q82 32, 88 28" 
        stroke="#FF91A4" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Coin slot */}
      <rect x="40" y="35" width="20" height="3" rx="1" fill="#D1547A" />
      
      {/* Coin */}
      <ellipse cx="50" cy="25" rx="8" ry="3" fill="#FFD700" />
      <text x="50" y="27" fontSize="6" fill="#B8860B" textAnchor="middle">$</text>
    </svg>
  );
};

export default PiggyBankIcon;