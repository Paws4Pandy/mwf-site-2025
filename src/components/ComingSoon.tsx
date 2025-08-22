import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft, Mail } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import PageBackground from '@/components/PageBackground';
import Header from '@/components/Header';
import EmailNotificationPopup from '@/components/EmailNotificationPopup';

interface ComingSoonProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title = "Free Playbooks",
  description = "Professional mortgage guidance with radical transparency and insider knowledge.",
  showBackButton = true 
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        <section className="py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Construction Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="mb-12"
            >
              <div className="w-32 h-32 mx-auto bg-design-lilac/20 backdrop-blur-xl border border-design-lilac/30 rounded-full flex items-center justify-center">
                <Construction className="w-16 h-16 text-design-lilac" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-anton font-normal text-design-charcoal tracking-tighter leading-[0.85] mb-8 premium-text">
                {title}
                <br />
                <span className="text-design-lilac">Coming Soon</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <p className="text-xl md:text-2xl font-hk-grotesk-light font-light text-white/90 max-w-4xl mx-auto leading-relaxed mb-6">
                {description}
              </p>
              <p className="text-lg font-hk-grotesk-light text-white/90 max-w-3xl mx-auto">
                I'm working hard to bring you comprehensive mortgage playbooks. 
                Stay tuned for professional guidance that will transform your home buying journey!
              </p>
            </motion.div>

            {/* Status Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 mb-16"
            >
              <div className="bg-design-cream/50 border border-design-lilac/20 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-anton text-design-lilac mb-2">🚧</div>
                <div className="text-sm font-hk-grotesk-light text-white/80 uppercase tracking-widest">In Development</div>
              </div>
              <div className="bg-design-cream/50 border border-design-lilac/20 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-anton text-design-lilac mb-2">📚</div>
                <div className="text-sm font-hk-grotesk-light text-white/80 uppercase tracking-widest">Content Creation</div>
              </div>
              <div className="bg-design-cream/50 border border-design-lilac/20 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-anton text-design-lilac mb-2">🎯</div>
                <div className="text-sm font-hk-grotesk-light text-white/80 uppercase tracking-widest">Quality Focus</div>
              </div>
            </motion.div>

            {/* Notification Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-design-cream/50 border border-design-lilac/20 rounded-2xl p-8 backdrop-blur-sm mb-12 max-w-2xl mx-auto"
            >
              <h3 className="font-anton text-2xl text-white mb-4">
                Get Notified When Ready
              </h3>
              <p className="font-hk-grotesk-light text-white/90 mb-6">
                Be the first to access these comprehensive mortgage playbooks
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setIsPopupOpen(true);
                  }}
                  className="px-8 py-4 bg-design-lilac text-white rounded-xl hover:bg-design-lilac/90 transition-all"
                >
                  <Mail className="w-5 h-5 inline mr-2" />
                  Notify Me
                </button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {showBackButton && (
                <LiquidGlassButton
                  href="/"
                  variant="secondary"
                  size="lg"
                  icon={<ArrowLeft className="w-5 h-5" />}
                >
                  Back to Home
                </LiquidGlassButton>
              )}
              
              <LiquidGlassButton
                href="/calculator"
                variant="primary"
                size="lg"
                className="bg-design-lilac hover:bg-design-lilac/90 text-white"
              >
                Try Calculator Instead
              </LiquidGlassButton>
              
              <LiquidGlassButton
                href="https://callme.mortgagewithford.ca"
                variant="accent"
                size="lg"
                external={true}
              >
                Book a Consultation
              </LiquidGlassButton>
            </motion.div>
          </div>
        </section>
      </div>
      
      {/* Email Notification Popup */}
      <EmailNotificationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={`Get Notified About ${title}`}
      />
    </PageBackground>
  );
};

export default ComingSoon;