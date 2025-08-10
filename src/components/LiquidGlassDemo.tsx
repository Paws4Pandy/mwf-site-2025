import React from 'react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

interface LiquidGlassDemoProps {
  className?: string;
}

const LiquidGlassDemo: React.FC<LiquidGlassDemoProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Demo Area */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[400px]">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Liquid Glass Button Demo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LiquidGlassButton
            href="#"
            variant="primary"
            size="lg"
            className="w-full"
            icon="🚀"
          >
            Primary Button
          </LiquidGlassButton>
          
          <LiquidGlassButton
            href="#"
            variant="secondary"
            size="lg"
            className="w-full"
            icon="✨"
          >
            Secondary Button
          </LiquidGlassButton>
          
          <LiquidGlassButton
            href="#"
            variant="accent"
            size="lg"
            className="w-full"
            icon="💫"
          >
            Accent Button
          </LiquidGlassButton>
        </div>
      </div>

      {/* Additional Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Different Sizes</h4>
          <div className="space-y-4">
            <LiquidGlassButton href="#" variant="primary" size="sm" icon="📱">Small</LiquidGlassButton>
            <LiquidGlassButton href="#" variant="primary" size="md" icon="💻">Medium</LiquidGlassButton>
            <LiquidGlassButton href="#" variant="primary" size="lg" icon="🖥️">Large</LiquidGlassButton>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">External Links</h4>
          <div className="space-y-4">
            <LiquidGlassButton 
              href="https://example.com" 
              variant="accent" 
              size="md" 
              external={true}
              icon="🔗"
            >
              External Link
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidGlassDemo;