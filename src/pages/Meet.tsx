import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, Mail } from 'lucide-react';
import AGlassCard from '@/components/ui/AGlassCard';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

const Meet = () => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="min-h-screen relative">
      {/* Background Image - 49.png */}
      <div 
        className="fixed inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/49.png")' }}
      />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="fixed inset-0 bg-black/20 z-[1]" />
      
      {/* Scrollable content container */}
      <div className="relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4">
        <Header transparent={true} />
        
        {/* Hero with New Tagline and Photo */}
      <motion.section 
        className="py-16 md:py-20 px-4 relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="max-w-5xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Photo */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ED8071]/20 to-design-charcoal/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <img 
              src="/andreina/andreina-mwf-social.jpg" 
              alt="Andreina Ford - Professional Photo"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </motion.div>
          
          {/* Right Side - Text Content */}
          <div className="text-left order-1 lg:order-2">
            <AGlassCard className="mb-4 p-6" >
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-anton text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#ED8071] leading-[0.9] mb-3"
              >
                CONTRARIAN by nature
              </motion.h1>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-anton text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[0.9]"
              >
                strategist BY TRADE
              </motion.h2>
            </AGlassCard>
            
            {/* Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6"
            >
              <ul className="space-y-2 text-white/90 font-roboto-flex list-none">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                  mom to a wild child
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                  wife to my wife
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                  feral feminist
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                  advocate for the voiceless
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="animate-bounce mt-6"
            >
              <ChevronDown className="w-6 h-6 text-[#ED8071]" />
              <p className="text-white/60 text-sm mt-2 font-roboto-flex">Scroll to discover my story</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Subscribe Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <LiquidGlassButton
            href="http://app.brokermail.ca/h/t/26FFFD87DF0C4F35"
            variant="primary"
            size="lg"
            external={true}
            icon={<Mail className="w-5 h-5" />}
            className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white border-[#ED8071]"
          >
            Subscribe for News & Giveaways
          </LiquidGlassButton>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <AGlassCard className="hover:bg-white/15 transition-all duration-300">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-right">
              {/* Story */}
              <div>
                <h2 className="font-anton text-3xl sm:text-4xl md:text-5xl text-white mb-6">
                  the MOMENT everything changed
                </h2>
                <div className="space-y-4 font-roboto-flex text-white/90 text-base sm:text-lg">
                  <p>
                    I'd love to tell you there was one cinematic, life-altering moment that changed everything, but truth is, it was a lifetime. Just five pivotal experiences, each one as unimaginable as the last, stacking like chapters in a plot twist I never see coming.
                  </p>
                  <p>
                    Now, I get to wake up every day obsessed with this career that lets me turn my hard-earned lessons into your unfair advantage.
                  </p>
                  <p className="text-[#ED8071] font-semibold">
                    I was you. I am you. And believe me—I see you.
                  </p>
                </div>
              </div>

              {/* Photo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-muted-red/20 to-brand-red/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <img 
                  src="/andreina/andreina-mwf-pretty.jpg" 
                  alt="Andreina Ford - Professional Photo"
                  className="w-full rounded-2xl shadow-2xl"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          </motion.div>
          </AGlassCard>
        </div>
      </section>

        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Meet;