import React from 'react';
import LiquidGlassWrapper from './LiquidGlassWrapper';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  icon
}) => {
  const baseClasses = "group inline-flex items-center justify-center font-hk-grotesk-light font-medium rounded-xl transition-all duration-500 transform hover:-translate-y-1";
  
  const sizeClasses = {
    sm: "px-4 py-3 text-sm h-12",
    md: "px-6 py-4 text-base h-16",
    lg: "px-8 py-4 text-lg h-16"
  };
  
  const variantClasses = {
    primary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black",
    secondary: "bg-transparent border-2 border-design-gold text-design-gold hover:bg-design-gold hover:text-black",
    accent: "bg-gradient-to-r from-design-gold to-yellow-400 border-2 border-transparent text-black hover:from-yellow-400 hover:to-design-gold",
    custom: "border-2 border-transparent"
  };

  const liquidGlassSettings = {
    primary: { mode: 'standard' as const, intensity: 0.4, scale: 0.5 },
    secondary: { mode: 'polar' as const, intensity: 0.3, scale: 0.4 },
    accent: { mode: 'prominent' as const, intensity: 0.5, scale: 0.6 },
    custom: { mode: 'prominent' as const, intensity: 0.5, scale: 0.6 }
  };

  const buttonContent = (
    <>
      {icon && <span className="mr-2 group-hover:animate-float">{icon}</span>}
      {children}
    </>
  );

  if (external) {
    return (
      <LiquidGlassWrapper
        mode={liquidGlassSettings[variant].mode}
        intensity={liquidGlassSettings[variant].intensity}
        scale={liquidGlassSettings[variant].scale}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        >
          {buttonContent}
        </a>
      </LiquidGlassWrapper>
    );
  }

  return (
    <LiquidGlassWrapper
      mode={liquidGlassSettings[variant].mode}
      intensity={liquidGlassSettings[variant].intensity}
      scale={liquidGlassSettings[variant].scale}
    >
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    </LiquidGlassWrapper>
  );
};

export default LiquidGlassButton;
