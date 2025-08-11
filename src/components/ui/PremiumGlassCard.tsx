import React, { ReactNode, useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PremiumGlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'premium' | 'financial';
  intensity?: 'subtle' | 'moderate' | 'strong' | 'dramatic';
  hover?: boolean;
  glow?: boolean;
}

export const PremiumGlassCard: React.FC<PremiumGlassCardProps> = ({
  children,
  className,
  variant = 'default',
  intensity = 'moderate',
  hover = true,
  glow = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getVariantStyles = () => {
    const styles = {
      default: {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        glow: 'rgba(206, 222, 235, 0.3)'
      },
      accent: {
        background: 'linear-gradient(135deg, rgba(218, 112, 115, 0.2) 0%, rgba(255, 211, 219, 0.1) 100%)',
        border: '1px solid rgba(218, 112, 115, 0.3)',
        glow: 'rgba(218, 112, 115, 0.4)'
      },
      premium: {
        background: 'linear-gradient(135deg, rgba(218, 180, 83, 0.2) 0%, rgba(218, 180, 83, 0.08) 100%)',
        border: '1px solid rgba(218, 180, 83, 0.3)',
        glow: 'rgba(218, 180, 83, 0.4)'
      },
      financial: {
        background: 'linear-gradient(135deg, rgba(43, 71, 67, 0.3) 0%, rgba(43, 71, 67, 0.1) 100%)',
        border: '1px solid rgba(43, 71, 67, 0.4)',
        glow: 'rgba(43, 71, 67, 0.5)'
      }
    };

    return styles[variant];
  };

  const getIntensityStyles = () => {
    const blur = {
      subtle: 'backdrop-blur-md',
      moderate: 'backdrop-blur-xl',
      strong: 'backdrop-blur-2xl',
      dramatic: 'backdrop-blur-3xl'
    };

    return blur[intensity];
  };

  const variantStyles = getVariantStyles();

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative group rounded-3xl overflow-hidden transition-all duration-700 ease-out',
        getIntensityStyles(),
        hover && 'hover:scale-[1.02] hover:-translate-y-2',
        className
      )}
      style={{
        background: variantStyles.background,
        border: variantStyles.border,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 8}deg) rotateY(${(mousePosition.x - 0.5) * 8}deg)`
          : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced glass reflection effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `
            linear-gradient(${45 + mousePosition.x * 90}deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) ${20 + mousePosition.x * 20}%, 
              rgba(255, 255, 255, 0.2) ${25 + mousePosition.x * 20}%, 
              rgba(255, 255, 255, 0.1) ${30 + mousePosition.x * 20}%,
              transparent 35%
            )
          `
        }}
      />

      {/* Multiple shadow layers for depth */}
      <div 
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `
            0 25px 80px ${variantStyles.glow}20,
            0 15px 40px ${variantStyles.glow}30,
            0 8px 20px ${variantStyles.glow}40,
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `
        }}
      />

      {/* Prismatic refraction effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay"
        style={{
          background: `
            conic-gradient(from ${mousePosition.x * 360}deg at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
              rgba(255, 0, 150, 0.1) 0deg,
              rgba(0, 255, 255, 0.1) 60deg, 
              rgba(255, 255, 0, 0.1) 120deg,
              rgba(255, 0, 150, 0.1) 180deg,
              rgba(0, 255, 255, 0.1) 240deg,
              rgba(255, 255, 0, 0.1) 300deg,
              rgba(255, 0, 150, 0.1) 360deg
            )
          `
        }}
      />

      {/* Surface texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Edge highlight */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-60"
        style={{
          background: `
            linear-gradient(90deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 20%, 
              transparent 80%, 
              rgba(255, 255, 255, 0.1) 100%
            ),
            linear-gradient(0deg, 
              rgba(255, 255, 255, 0.05) 0%, 
              transparent 20%, 
              transparent 80%, 
              rgba(255, 255, 255, 0.1) 100%
            )
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glow effect */}
      {glow && (
        <div 
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${variantStyles.glow}40 0%, transparent 70%)`
          }}
        />
      )}
    </div>
  );
};

export default PremiumGlassCard;