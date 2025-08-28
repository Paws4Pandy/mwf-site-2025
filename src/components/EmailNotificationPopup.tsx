import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, AlertCircle } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import EmailService from '@/services/EmailService';

interface EmailNotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const EmailNotificationPopup: React.FC<EmailNotificationPopupProps> = ({ 
  isOpen, 
  onClose, 
  title = "Get Notified About Playbooks"
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await EmailService.submitNotification({
        name: name || 'Anonymous',
        email: email,
        type: 'playbooks',
        source: 'coming-soon-page',
        message: `Requested notification for Free Playbooks - ${title}`
      });
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Auto close after 3 seconds
        setTimeout(() => {
          onClose();
          // Reset form state
          setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
            setName('');
          }, 300);
        }, 3000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
      
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
          >
            <div className="relative max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-design-lilac/20 backdrop-blur-xl border border-design-lilac/30 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-design-lilac" />
                    </div>
                    <h2 className="font-anton text-2xl text-white mb-2">{title}</h2>
                    <p className="font-roboto-flex text-white/80">
                      Be the first to know when our comprehensive mortgage playbooks are ready!
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-roboto-flex text-white/90 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-design-lilac focus:ring-2 focus:ring-design-lilac/20 transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-roboto-flex text-white/90 mb-2">
                        Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-design-lilac focus:ring-2 focus:ring-design-lilac/20 transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {error}
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <LiquidGlassButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-design-lilac hover:bg-design-lilac/90 text-white disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Subscribing...
                          </div>
                        ) : (
                          'Notify Me'
                        )}
                      </LiquidGlassButton>
                    </div>
                  </form>

                  <p className="text-xs text-white/60 text-center mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h2 className="font-anton text-2xl text-white mb-2">You're All Set!</h2>
                  <p className="font-roboto-flex text-white/90 mb-4">
                    Thanks for subscribing! We'll notify you as soon as the playbooks are ready.
                  </p>
                  <p className="font-roboto-flex text-white/70 text-sm">
                    Check your email for confirmation and feel free to reach out with questions.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmailNotificationPopup;