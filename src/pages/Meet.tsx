import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, Shield, BookOpen, Zap, Heart, Award, Coffee } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import WhoIWorkFor from '@/components/WhoIWorkFor';
import AGlassCard from '@/components/ui/AGlassCard';
import GradientBackground from '@/components/GradientBackground';

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
      {/* Optimized Gradient Background */}
      <GradientBackground 
        gradient="cosmic"
        animated={true}
        className="fixed inset-0 w-full h-full z-0"
      />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="fixed inset-0 bg-black/10 z-[1]" />
      
      {/* Scrollable content container */}
      <div className="relative z-10 overflow-y-auto">
        <div className="container mx-auto px-4">
        <Header transparent={true} />
        
        {/* Hero with New Tagline and Photo */}
      <motion.section 
        className="min-h-screen flex items-center px-4 relative overflow-hidden pt-10 md:pt-16"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
       
        
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Photo */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ED8071]/20 to-design-charcoal/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <AGlassCard className="hover:shadow-3xl transition-all duration-500 p-2">
              <img 
                src="/andreina/andreina-mwf-social.jpg" 
                alt="Andreina Ford - Professional Photo"
                className="w-full rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </AGlassCard>
          </motion.div>
          
          {/* Right Side - Text Content */}
          <div className="text-left order-1 lg:order-2">
            <AGlassCard className="mb-6" >
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ED8071] leading-[0.85] mb-4"
              >
                CONTRARIAN by nature
              </motion.h1>
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-anton text-5xl md:text-7xl lg:text-8xl text-white leading-[0.85]"
              >
                strategist BY TRADE
              </motion.h2>
            </AGlassCard>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-roboto-flex text-xl md:text-2xl text-white/90 mb-12 max-w-2xl"
            >
              Turning loopholes into leverage and six-figure loans into smart plays
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="animate-bounce"
            >
              <ChevronDown className="w-8 h-8 text-[#ED8071]" />
              <p className="text-white/60 text-sm mt-2 font-roboto-flex">Scroll to discover my story</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

 {/* Credentials & CTA */}
 <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/90 font-roboto-flex">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
              Level 2 Mortgage Agent
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
              Mom
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
              Art Lover
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
              Community Advocate
            </span>
          </div>
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
                <h2 className="font-anton text-4xl md:text-5xl text-white mb-6">
                  the MOMENT everything changed
                </h2>
                <div className="space-y-4 font-roboto-flex text-white/90 text-lg">
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
                <AGlassCard  className="hover:shadow-2xl transition-all duration-500">
                  <img 
                    src="/andreina/andreina-mwf-pretty.jpg" 
                    alt="Andreina Ford - Professional Photo"
                    className="w-full rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </AGlassCard>
              </div>
            </div>
          </motion.div>
          </AGlassCard>
        </div>
      </section>

  
      {/* Unique Methods & Promises */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-anton text-5xl md:text-6xl text-white text-center mb-16"
          >
            how I'm DIFFERENT
          </motion.h2>

          <div className="space-y-6">
            {/* Radical Transparency */}
            <AGlassCard className="hover:bg-white/15 transition-all duration-300 group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-6">
                <Shield className="w-12 h-12 text-[#ED8071] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-anton text-2xl text-white mb-3">RADICAL TRANSPARENCY</h3>
                  <p className="font-roboto-flex text-white/80 text-lg">
                    I tell you EXACTLY how things work and what to expect next. There's always more than one way to get the deal done and with me, there's no surprises, ever.
                  </p>
                </div>
              </div>
            </motion.div>
            </AGlassCard>

            {/* Education First */}
            <AGlassCard className="hover:bg-white/15 transition-all duration-300 group">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-6">
                <BookOpen className="w-12 h-12 text-[#ED8071] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-anton text-2xl text-white mb-3">EDUCATION FIRST</h3>
                  <p className="font-roboto-flex text-white/80 text-lg">
                    FREE Playbooks teach you to spot BS before it happens. You'll understand 
                    every document you sign. Knowledge is power, and I'm giving it all to you.
                  </p>
                </div>
              </div>
            </motion.div>
            </AGlassCard>

            {/* Accessibility Advocate */}
            <AGlassCard className="hover:bg-white/15 transition-all duration-300 group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-6">
                <Zap className="w-12 h-12 text-[#ED8071] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-anton text-2xl text-white mb-3">ACCESSIBILITY ADVOCATE</h3>
                  <p className="font-roboto-flex text-white/80 text-lg">
                    Complex situations? I love them. Unlike other mortgage agents that get deterred from complexities - I seek them. Constant challenges are what makes this career so fulfilling - so whatever it is; I've got you.
                  </p>
                </div>
              </div>
            </motion.div>
            </AGlassCard>
          </div>
        </div>
      </section>



      {/* Slice of Life */}
      <div className="mt-20">
              <h2 className="font-anton text-4xl md:text-5xl text-[#ED8071] mb-6">
                when it's time to WIND DOWN, find ME:
              </h2>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <AGlassCard >
              <img 
                src="/andreina/andreina-mwf-tub.jpg" 
                alt="Andreina Ford - Personal Life"
                className="w-full rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </AGlassCard>

            <div>
               <div className="space-y-3 font-roboto-flex text-white/90 text-xl">
                <ul className="space-y-3 list-none">
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                    Soaking up this little life with my wife and 3 year old
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                    Writing, reading and drawing
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                    Probably stargazing, low key homebody
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                    Exploring the hidden gems right in my backyard in PEC
                  </li>
                  <li className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-[#ED8071]"></span>
                    Dreaming up ways to buy a hobby farm
                  </li>
                </ul>
              </div>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-anton text-5xl md:text-6xl text-white mb-8"
          >
            Ready to guard YOUR future?
          </motion.h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidGlassButton
              href="https://callme.mortgagewithford.ca"
              variant="primary"
              size="lg"
              external={true}
              className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white"
            >
              Let's Get You HOME
            </LiquidGlassButton>
            
                        
            <LiquidGlassButton
              href="mailto:hello@mortgagewithford.ca"
              variant="secondary"
              size="lg"
              external={true}
              icon={<Coffee size={20} />}
            >
              Meet for Coffee
            </LiquidGlassButton>
          </div>
        </div>
      </section>

        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Meet;