import React from 'react';
import Header from '@/components/Header';
import AGlassCard from '@/components/ui/AGlassCard';

const TestGlass = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Gradient Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/gradients/17.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/10 z-[1]" />
      
      {/* Scrollable content */}
      <div className="relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4">
          <Header transparent={true} />
          
          <section className="py-20">
            <div className="max-w-7xl mx-auto flex justify-center">
              <AGlassCard>
                <h1 className="font-anton text-4xl text-white mb-4">
                  AND GLASS CARD TEST
                </h1>
                <p className="font-hk-grotesk-light text-lg text-white/80">
                  This is the new AndGlassCard component with your exact specifications.
                </p>
                <div className="mt-4">
                  <p className="text-white/60 text-sm">
                    Width: 1063px • Height: 508px • Border Radius: 92.145px
                  </p>
                </div>
              </AGlassCard>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TestGlass;