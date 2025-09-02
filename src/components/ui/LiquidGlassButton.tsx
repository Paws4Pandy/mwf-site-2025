import React from 'react';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  icon,
  type = 'button',
  disabled = false
}) => {
  const baseClasses = "group inline-flex items-center justify-center font-roboto-flex font-medium rounded-xl transition-all duration-500 transform hover:-translate-y-1 backdrop-blur-sm bg-white/5 border border-white/20 hover:bg-white/10";
  
  const sizeClasses = {
    sm: "px-4 py-3 text-sm h-12",
    md: "px-6 py-4 text-base h-16",
    lg: "px-8 py-4 text-lg h-16"
  };
  
  const variantClasses = {
    primary: "bg-transparent border-2 border-[#61d6c5] text-[#61d6c5] hover:bg-[#61d6c5] hover:text-white",
    secondary: "bg-transparent border-2 border-design-gold text-design-gold hover:bg-design-gold hover:text-black",
    accent: "bg-gradient-to-r from-[#61d6c5] to-cyan-500 border-2 border-transparent text-white hover:from-cyan-500 hover:to-[#61d6c5]",
    custom: "border-2 border-transparent"
  };

  const buttonContent = (
    <>
      {icon && <span className="mr-2 group-hover:animate-pulse">{icon}</span>}
      {children}
    </>
  );

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {buttonContent}
      </button>
    );
  }

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <a
      href={href || '#'}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {buttonContent}
    </a>
  );
};

export default LiquidGlassButton;