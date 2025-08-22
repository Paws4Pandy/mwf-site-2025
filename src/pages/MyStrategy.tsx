import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import WhoIWorkFor from '@/components/WhoIWorkFor';
import AGlassCard from '@/components/ui/AGlassCard';

const MyStrategy = () => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);





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
          
            {/* Scrollable content container */}
      <div className="relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4">
          <Header transparent={true} />
        
        {/* Main content */}
        <section className="py-10 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12 opacity-0 animate-fade-in-delay-1">
              <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ED8071] leading-[0.85] mb-4">
                Who I
                <br />
                <span className="text-white">Work For</span>
              </h1>
            </div>
            
            <div className="mb-16 opacity-0 animate-fade-in-delay-2">
              <p className="text-xl md:text-2xl font-hk-grotesk-light text-white/90 max-w-4xl mx-auto leading-relaxed">
                Mortgages with advocacy first - protecting your interests, demystifying the process, and making homeownership a force for equity
              </p>
            </div>
          </div>

          {/* Who I Work For Section */}
          <WhoIWorkFor />
          
          <div className="flex justify-center gap-4 mt-12 opacity-0 animate-fade-in-delay-1">
            <LiquidGlassButton
              href="https://callme.mortgagewithford.ca"
              variant="primary"
              size="lg"
              external={true}
              className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white"
            >
              Build Your Path
            </LiquidGlassButton>
            <LiquidGlassButton
              href="/"
              variant="secondary"
              size="lg"
            >
              Back to Home
            </LiquidGlassButton>
          </div>
        </section>
        
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyStrategy;