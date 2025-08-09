import React from 'react';
import { getIcon, getIconSize, iconSizes, iconVariants } from '@/assets/config/icons';
import GlassSocialIcon from '@/components/icons/GlassSocialIcons';

interface AppIconProps {
  name: keyof typeof import('@/assets/config/icons').icons;
  size?: keyof typeof iconSizes;
  variant?: keyof typeof iconVariants;
  className?: string;
  color?: string;
}

/**
 * Unified icon wrapper component that handles both Lucide and custom icons
 * Provides consistent sizing, styling, and variant support across the app
 */
const AppIcon: React.FC<AppIconProps> = ({ 
  name, 
  size = 'medium', 
  variant = 'solid',
  className = '',
  color 
}) => {
  const IconComponent = getIcon(name);
  const iconSize = getIconSize(size);

  // Handle glass variant with custom glass social icons for social platforms
  if (variant === 'glass' && ['instagram', 'facebook', 'linkedin', 'youtube'].includes(name)) {
    return (
      <GlassSocialIcon 
        type={name as 'instagram' | 'facebook' | 'linkedin' | 'youtube'} 
        size={iconSize}
        className={className}
      />
    );
  }

  // Handle custom TikTok icon component
  if (name === 'tiktok') {
    return (
      <IconComponent 
        size={iconSize}
        className={`${className} ${color ? color : 'text-current'}`}
      />
    );
  }

  // Default Lucide icon handling
  const baseClasses = `${color ? color : 'text-current'} ${className}`;
  
  // Apply variant-specific styling
  const variantClasses = {
    solid: 'fill-current',
    outline: 'stroke-current fill-none',
    glass: 'text-current' // Fallback for glass variant
  };

  return (
    <IconComponent 
      size={iconSize}
      className={`${baseClasses} ${variantClasses[variant]}`}
    />
  );
};

export default AppIcon;