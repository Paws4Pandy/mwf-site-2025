import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AGlassCard from '@/components/ui/AGlassCard';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

const Contact = () => {

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
        
          <div className="relative px-4 py-12 max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 sm:mb-16 pt-8 sm:pt-10 md:pt-16 px-2 sm:px-4"
            >
              <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6">
                Contact Andreina
              </h1>
            </motion.section>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              {/* Subscribe Button */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                  <div className="text-center py-8">
                    <h2 className="font-roboto-flex font-semibold text-3xl md:text-4xl text-white mb-4">Stay Connected</h2>
                    <p className="font-roboto-flex text-white/80 mb-8 text-lg">
                      Get the latest mortgage news, market updates, and exclusive giveaways delivered to your inbox.
                    </p>
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
                </AGlassCard>
              </motion.div>

              {/* Direct Contact */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                  <h2 className="font-roboto-flex font-semibold text-3xl md:text-4xl text-white mb-6">Direct Contact</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-[#ED8071] mt-1" />
                      <div>
                        <p className="font-roboto-flex text-lg text-white">613-743-7866</p>
                        <p className="font-roboto-flex text-sm text-white/60">Call or text anytime</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-[#ED8071] mt-1" />
                      <div>
                        <a href="mailto:andreina@mortgagewithford.ca" className="font-roboto-flex text-lg text-white hover:text-[#ED8071] transition-colors">
                          andreina@mortgagewithford.ca
                        </a>
                        <p className="font-roboto-flex text-sm text-white/60">Secure email communication</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Home className="w-5 h-5 text-[#ED8071] mt-1" />
                      <div>
                        <p className="font-roboto-flex text-lg text-white">Tango ON #13691</p>
                        <p className="font-roboto-flex text-sm text-white/60">License: M24000357</p>
                        <p className="font-roboto-flex text-sm text-white/60">Serving all of Ontario</p>
                      </div>
                    </div>
                  </div>
                </AGlassCard>
              </motion.div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Contact;