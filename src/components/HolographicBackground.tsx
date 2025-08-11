import React, { useEffect, useState } from 'react';

interface HolographicBackgroundProps {
  children: React.ReactNode;
  variant?: 'midnight' | 'aurora' | 'deep-space' | 'cyber' | 'oceanic';
  intensity?: 'subtle' | 'moderate' | 'vibrant';
}

const HolographicBackground: React.FC<HolographicBackgroundProps> = ({
  children,
  variant = 'midnight',
  intensity = 'moderate'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const getHolographicGradients = () => {
    const gradients = {
      midnight: {
        base: 'from-[#0a0a0a] via-[#1a1a2e] via-[#16213e] to-[#0f0f23]',
        holographic: [
          'radial-gradient(ellipse at 20% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 60%)',
          'radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)',
          'radial-gradient(ellipse at 40% 40%, rgba(167, 243, 208, 0.08) 0%, transparent 50%)',
          'conic-gradient(from 0deg at 70% 30%, transparent 0deg, rgba(139, 92, 246, 0.1) 60deg, transparent 120deg)',
          'conic-gradient(from 180deg at 30% 70%, transparent 0deg, rgba(236, 72, 153, 0.08) 90deg, transparent 180deg)'
        ]
      },
      aurora: {
        base: 'from-[#0d1117] via-[#161b22] via-[#21262d] to-[#010409]',
        holographic: [
          'radial-gradient(ellipse at 30% 20%, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
          'radial-gradient(ellipse at 70% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
          'radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          'linear-gradient(125deg, transparent 0%, rgba(34, 197, 94, 0.05) 30%, transparent 40%, rgba(99, 102, 241, 0.08) 70%, transparent 100%)'
        ]
      },
      'deep-space': {
        base: 'from-[#050505] via-[#1a0033] via-[#2d0066] to-[#0a0014]',
        holographic: [
          'radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.2) 0%, transparent 60%)',
          'radial-gradient(ellipse at 60% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          'conic-gradient(from 45deg at 80% 20%, transparent 0deg, rgba(147, 51, 234, 0.12) 120deg, transparent 240deg)'
        ]
      },
      cyber: {
        base: 'from-[#0f0f0f] via-[#1a2332] via-[#0f2027] to-[#0a0a0a]',
        holographic: [
          'radial-gradient(ellipse at 10% 90%, rgba(34, 197, 94, 0.18) 0%, transparent 60%)',
          'radial-gradient(ellipse at 90% 10%, rgba(14, 165, 233, 0.15) 0%, transparent 70%)',
          'linear-gradient(45deg, transparent 0%, rgba(34, 197, 94, 0.08) 25%, transparent 50%, rgba(14, 165, 233, 0.06) 75%, transparent 100%)',
          'conic-gradient(from 90deg at 40% 60%, transparent 0deg, rgba(34, 197, 94, 0.1) 60deg, transparent 120deg)'
        ]
      },
      oceanic: {
        base: 'from-[#0c1445] via-[#1e3a8a] via-[#1e40af] to-[#0f172a]',
        holographic: [
          'radial-gradient(ellipse at 40% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
          'radial-gradient(ellipse at 80% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 70%)',
          'radial-gradient(circle at 20% 40%, rgba(34, 197, 94, 0.12) 0%, transparent 50%)',
          'linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.1) 40%, transparent 60%)'
        ]
      }
    };

    return gradients[variant];
  };

  const getIntensityMultiplier = () => {
    const multipliers = {
      subtle: 0.6,
      moderate: 1,
      vibrant: 1.4
    };
    return multipliers[intensity];
  };

  const gradientConfig = getHolographicGradients();
  const intensityMultiplier = getIntensityMultiplier();

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${gradientConfig.base}`}>
      {/* Primary holographic layer */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: gradientConfig.holographic.slice(0, 2).join(', '),
          transform: `translate(${mousePosition.x * 20 - 10}px, ${mousePosition.y * 20 - 10}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Secondary animated layer */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: gradientConfig.holographic.slice(2).join(', '),
          transform: `translate(${-mousePosition.x * 15 + 7}px, ${-mousePosition.y * 15 + 7}px) rotate(${time * 0.1}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* Holographic shimmer effects */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(${45 + mousePosition.x * 60}deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.03) ${20 + mousePosition.x * 20}%, 
              transparent ${25 + mousePosition.x * 20}%,
              rgba(147, 51, 234, 0.05) ${40 + mousePosition.y * 30}%,
              transparent ${45 + mousePosition.y * 30}%,
              rgba(59, 130, 246, 0.04) ${70 - mousePosition.x * 20}%,
              transparent ${75 - mousePosition.x * 20}%
            )
          `,
          animation: 'holographic-sweep 8s ease-in-out infinite alternate'
        }}
      />

      {/* Prismatic light rays */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen">
        <div 
          className="absolute w-full h-full"
          style={{
            background: `
              conic-gradient(from ${time * 2}deg at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%,
                transparent 0deg,
                rgba(147, 51, 234, 0.1) 30deg,
                transparent 60deg,
                rgba(59, 130, 246, 0.08) 120deg,
                transparent 150deg,
                rgba(236, 72, 153, 0.06) 210deg,
                transparent 240deg,
                rgba(34, 197, 94, 0.04) 300deg,
                transparent 360deg
              )
            `,
            filter: `blur(${2 * intensityMultiplier}px)`
          }}
        />
      </div>

      {/* Subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='holographicNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0.2 0 0 0 0 0.4 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23holographicNoise)'/%3E%3C/svg%3E")`
        }}
      />

      {children}

      <style jsx>{`
        @keyframes holographic-sweep {
          0% { 
            transform: translateX(-100%) skewX(-15deg); 
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% { 
            transform: translateX(100%) skewX(-15deg); 
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HolographicBackground;