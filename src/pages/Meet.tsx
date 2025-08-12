import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageBackground from '@/components/PageBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, Shield, BookOpen, Zap, Heart, Award, Coffee } from 'lucide-react';
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
    <PageBackground>
      <Header />
      
      {/* Hero with New Tagline and Photo */}
      <motion.section 
        className="min-h-screen flex items-center px-4 relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Chunky Liquid Glass Blocks Background */}
        <div className="absolute inset-0 z-0">
          {/* Large blocks with varying transparency */}
          <div className="absolute top-20 left-10 w-96 h-80 bg-white/8 backdrop-blur-xl rounded-3xl rotate-12 transform"></div>
          <div className="absolute top-40 right-20 w-72 h-96 bg-design-plum/12 backdrop-blur-2xl rounded-3xl -rotate-6 transform"></div>
          <div className="absolute bottom-32 left-32 w-80 h-64 bg-design-charcoal/10 backdrop-blur-xl rounded-3xl rotate-45 transform"></div>
          <div className="absolute top-60 left-1/2 w-64 h-72 bg-white/6 backdrop-blur-md rounded-3xl -rotate-12 transform"></div>
          <div className="absolute bottom-20 right-10 w-88 h-56 bg-design-plum/8 backdrop-blur-lg rounded-3xl rotate-30 transform"></div>
          <div className="absolute top-10 right-1/3 w-72 h-48 bg-white/10 backdrop-blur-xl rounded-3xl rotate-18 transform"></div>
          
          {/* Additional glass blocks for more density */}
          <div className="absolute top-5 left-1/4 w-56 h-72 bg-white/4 backdrop-blur-lg rounded-3xl rotate-24 transform"></div>
          <div className="absolute bottom-10 left-1/2 w-64 h-48 bg-design-plum/5 backdrop-blur-md rounded-3xl -rotate-30 transform"></div>
          <div className="absolute top-32 right-10 w-48 h-88 bg-white/7 backdrop-blur-xl rounded-3xl rotate-15 transform"></div>
          <div className="absolute bottom-40 right-1/3 w-72 h-56 bg-design-charcoal/6 backdrop-blur-lg rounded-3xl -rotate-18 transform"></div>
          <div className="absolute top-48 left-1/3 w-40 h-64 bg-white/5 backdrop-blur-md rounded-3xl rotate-35 transform"></div>
          <div className="absolute bottom-60 left-20 w-88 h-40 bg-design-plum/7 backdrop-blur-xl rounded-3xl -rotate-25 transform"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Photo */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-design-plum/20 to-design-charcoal/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative backdrop-blur-xl bg-white/10 border border-white/30 rounded-3xl p-3 hover:shadow-2xl transition-all duration-500">
              <img 
                src="/andreina/andreina-mwf-lean.jpg" 
                alt="Andreina Ford - Professional Photo"
                className="w-full rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </motion.div>
          
          {/* Right Side - Text Content */}
          <div className="text-left order-1 lg:order-2">
            <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-3xl p-6 mb-6">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-anton text-5xl md:text-7xl lg:text-8xl text-design-plum leading-[0.85] mb-4"
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
            </div>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-hk-grotesk-light text-xl md:text-2xl text-white/90 mb-12 max-w-2xl"
            >
              Turning loopholes into leverage and six-figure loans into smart plays
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="animate-bounce"
            >
              <ChevronDown className="w-8 h-8 text-muted-red" />
              <p className="text-white/60 text-sm mt-2 font-hk-grotesk-light">Scroll to discover my story</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Origin Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Story */}
              <div>
                <h2 className="font-anton text-4xl md:text-5xl text-white mb-6">
                  the MOMENT everything changed
                </h2>
                <div className="space-y-4 font-hk-grotesk-light text-white/90 text-lg">
                  <p>
                    I'd love to tell you there was one cinematic, life-altering moment that changed everything, but truth is, it was a lifetime. Just five pivotal experiences, each one as unimaginable as the last, stacking like chapters in a plot twist I never see coming.
                  </p>
                  <p>
                    Now, I get to wake up every day obsessed with this career that lets me turn my hard-earned lessons into your unfair advantage.
                  </p>
                  <p className="text-design-plum font-semibold">
                    I was you. I am you. And believe me—I see you.
                  </p>
                </div>
              </div>

              {/* Photo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-muted-red/20 to-brand-red/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-2 hover:shadow-2xl transition-all duration-500">
                  <img 
                    src="/andreina/andreina-mwf-pretty.jpg" 
                    alt="Andreina Ford - Professional Photo"
                    className="w-full rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who I Work For - Color Blocks */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-anton text-5xl md:text-6xl text-white text-center mb-16"
          >
            who I WORK for
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* First-Time Buyers */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-design-plum/90 backdrop-blur-md border border-design-plum rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="font-anton text-3xl text-white mb-4">FIRST-TIME BUYERS</h3>
              <p className="font-hk-grotesk-light text-white/90 text-lg mb-4">
                "Scared of getting ripped off?"
              </p>
              <p className="font-hk-grotesk-light text-white/80">
                I teach you to spot the BS before it happens. You'll understand every document, 
                every fee, every option.
              </p>
            </motion.div>

            {/* LGBTQ2 Families */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-design-plum/70 backdrop-blur-md border border-design-plum rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="font-anton text-3xl text-white mb-4">LGBTQ2 FAMILIES</h3>
              <p className="font-hk-grotesk-light text-white/90 text-lg mb-4">
                "Equal housing matters"
              </p>
              <p className="font-hk-grotesk-light text-white/80">
                Your family is valid. Your dreams are valid.
              </p>
            </motion.div>

            {/* Moms Like Me */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-design-charcoal/80 backdrop-blur-md border border-design-charcoal rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="font-anton text-3xl text-white mb-4">MOMS LIKE ME</h3>
              <p className="font-hk-grotesk-light text-white/90 text-lg mb-4">
                "Juggling family & finances?"
              </p>
              <p className="font-hk-grotesk-light text-white/80">
                I get it. The mental load, the pressure, the dreams for your kids. 
                Let's build generational wealth together.
              </p>
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white text-2xl font-hk-grotesk-light mt-12"
          >
            Because everyone deserves a fair shot at home
          </motion.p>
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
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <Shield className="w-12 h-12 text-design-plum flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-anton text-2xl text-white mb-3">RADICAL TRANSPARENCY</h3>
                  <p className="font-hk-grotesk-light text-white/80 text-lg">
                    I show you EXACTLY what lenders see. No hidden fees. You get copies of everything. No surprises, ever.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Education First */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <BookOpen className="w-12 h-12 text-design-plum flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-anton text-2xl text-white mb-3">EDUCATION FIRST</h3>
                  <p className="font-hk-grotesk-light text-white/80 text-lg">
                    FREE Playbooks teach you to spot BS before it happens. You'll understand 
                    every document you sign. Knowledge is power, and I'm giving it all to you.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Accessibility Advocate */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <Zap className="w-12 h-12 text-design-charcoal flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-anton text-2xl text-white mb-3">ACCESSIBILITY ADVOCATE</h3>
                  <p className="font-hk-grotesk-light text-white/80 text-lg">
                    Complex situations? Unique circumstances? I fight for solutions when others 
                    say "no." Self-employed, new immigrant, non-traditional income? I've got you.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slice of Life */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-2">
              <img 
                src="/andreina/andreina-mwf-tub.jpg" 
                alt="Andreina Ford - Personal Life"
                className="w-full rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>

            <div>
              <h2 className="font-anton text-4xl md:text-5xl text-white mb-6">
                when I'm NOT fighting mortgage battles
              </h2>
              <div className="space-y-3 font-hk-grotesk-light text-white/90 text-lg">
                <ul className="space-y-3 list-none">
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    Soaking up this little life with my wife and 3 year old
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    Writing, reading and drawing
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    Probably stargazing, low key homebody
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    Exploring the hidden gems right in my backyard in PEC
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Dreaming up ways to buy a hobby farm
                  </li>
                </ul>
              </div>
              <p className="font-hk-grotesk-light text-design-charcoal mt-6 text-xl">
                Because life's about more than mortgages - but getting home should never be a battle.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-anton text-5xl md:text-6xl text-white text-center mb-16"
          >
            advocacy IN ACTION
          </motion.h2>

          <div className="space-y-8">
            <motion.blockquote 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 border-l-4 border-design-plum rounded-r-3xl p-8"
            >
              <p className="font-hk-grotesk-light text-design-charcoal text-xl mb-4">
                "Andreina fought for us when 3 other brokers said we were 'too complex.' 
                She found solutions, not excuses."
              </p>
              <cite className="text-white/70 font-hk-grotesk-light">- Sarah & Kim, Toronto</cite>
            </motion.blockquote>

            <motion.blockquote 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 border-l-4 border-design-plum rounded-r-3xl p-8"
            >
              <p className="font-hk-grotesk-light text-design-charcoal text-xl mb-4">
                "She taught me to spot predatory lending practices. Saved me $40K over 
                5 years compared to the bank's offer."
              </p>
              <cite className="text-white/70 font-hk-grotesk-light">- Marcus, First-Time Buyer</cite>
            </motion.blockquote>

            <motion.blockquote 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 border-l-4 border-design-charcoal rounded-r-3xl p-8"
            >
              <p className="font-hk-grotesk-light text-design-charcoal text-xl mb-4">
                "As a single mom, she made homeownership possible when I thought it was 
                impossible. Changed my family's future."
              </p>
              <cite className="text-white/70 font-hk-grotesk-light">- Jessica, Ottawa</cite>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Credentials & CTA */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/90 font-hk-grotesk-light">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Level 2 Mortgage Agent
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              Mom
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              Art Lover
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
              Community Advocate
            </span>
          </div>

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
              className="bg-design-plum hover:bg-design-plum/90 text-white"
            >
              Let's Get You HOME
            </LiquidGlassButton>
            
            <LiquidGlassButton
              href="https://callme.mortgagewithford.ca"
              variant="secondary"
              size="lg"
              external={true}
            >
              Book No-Judgment Consult
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
    </PageBackground>
  );
};

export default Meet;