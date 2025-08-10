import React, { useEffect, useRef } from 'react';

interface LiquidGlassWrapperProps {
  children: React.ReactNode;
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';
  intensity?: number;
  scale?: number;
  className?: string;
  disabled?: boolean;
}

const LiquidGlassWrapper: React.FC<LiquidGlassWrapperProps> = ({
  children,
  mode = 'standard',
  intensity = 0.5,
  scale = 0.5,
  className = '',
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const liquidGlassRef = useRef<any>(null);

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    // Dynamically import LiquidGlass to avoid SSR issues
    const initLiquidGlass = async () => {
      try {
        const { LiquidGlass } = await import('../../../liquid-glass-react/src/index');
        
        if (containerRef.current && !liquidGlassRef.current) {
          liquidGlassRef.current = new LiquidGlass(containerRef.current, {
            mode,
            intensity,
            scale,
          });
        }
      } catch (error) {
        console.log('Liquid Glass component not available:', error);
      }
    };

    initLiquidGlass();

    // Cleanup
    return () => {
      if (liquidGlassRef.current) {
        try {
          liquidGlassRef.current.destroy?.();
        } catch (error) {
          console.log('Error destroying liquid glass:', error);
        }
      }
    };
  }, [mode, intensity, scale, disabled]);

  useEffect(() => {
    if (liquidGlassRef.current && !disabled) {
      try {
        liquidGlassRef.current.update?.({
          mode,
          intensity,
          scale,
        });
      } catch (error) {
        console.log('Error updating liquid glass:', error);
      }
    }
  }, [mode, intensity, scale, disabled]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default LiquidGlassWrapper;
