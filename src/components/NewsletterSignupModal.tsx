import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

interface NewsletterSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterSignupModal: React.FC<NewsletterSignupModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Track newsletter signup
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: 'contact_page',
          user_email: formData.email
        });
      }

      const response = await fetch('/api/simple-newsletter-v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Page'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Don't auto-close, let user navigate to playbooks
      } else {
        const errorData = await response.text();
        console.error('Newsletter signup failed:', response.status, errorData);
        throw new Error(`Server error (${response.status}): ${errorData || 'Failed to sign up'}`);
      }
    } catch (error) {
      setSubmitStatus('error');
      
      // More detailed error handling
      if (error instanceof Error) {
        console.error('Newsletter signup error:', error.message);
        setErrorMessage(`Unable to sign up: ${error.message}. Please try again or contact hello@mortgagewithford.ca`);
      } else {
        console.error('Newsletter signup error:', error);
        setErrorMessage('Unable to sign up. Please try calling (613) 743-7866 or emailing hello@mortgagewithford.ca');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaybooksRedirect = () => {
    // Track playbook redirect
    if (typeof gtag !== 'undefined') {
      gtag('event', 'playbook_redirect', {
        event_category: 'engagement',
        event_label: 'newsletter_success',
        user_email: formData.email
      });
    }
    
    onClose();
    window.location.href = '/playbooks';
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl">
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {submitStatus === 'idle' || submitStatus === 'error' ? (
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="font-anton text-3xl text-pure-black mb-2">
                      Get the Real Mortgage News
                    </h2>
                    <p className="text-gray-600">
                      Skip the fluff. Get actionable insights, rate updates, and insider tips delivered straight to your inbox.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interest Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                      >
                        <option value="">Select your main interest</option>
                        <option value="First-Time Buyer">First-Time Home Buyer</option>
                        <option value="Investment Properties">Investment Properties</option>
                        <option value="Refinancing">Refinancing</option>
                        <option value="Renewal">Mortgage Renewal</option>
                        <option value="Self-Employed">Self-Employed Mortgages</option>
                        <option value="Cottage/Vacation">Cottage & Vacation Properties</option>
                        <option value="Rate Updates">Rate Updates & Market News</option>
                        <option value="General">General Mortgage Advice</option>
                      </select>
                    </div>

                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errorMessage}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#ED8071] hover:bg-[#ED8071]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing up...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Yes, Send Me the Real News
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    No spam, ever. Unsubscribe anytime. Your email stays private.
                  </p>
                </div>
              ) : (
                /* Success State with Playbook CTA */
                <div className="p-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h2 className="font-anton text-2xl text-pure-black text-center mb-2">Welcome to the Inside!</h2>
                  <p className="text-gray-600 text-center mb-6">
                    You're all set to receive the real mortgage news. But first, grab your free mortgage playbooks!
                  </p>
                  
                  <div className="bg-gradient-to-br from-[#ED8071]/10 to-[#ED8071]/5 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="w-6 h-6 text-[#ED8071]" />
                      <h3 className="font-medium text-pure-black">Free Mortgage Playbooks</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Get instant access to insider strategies, checklists, and pro tips that will save you thousands on your next mortgage.
                    </p>
                    <button
                      onClick={handlePlaybooksRedirect}
                      className="w-full bg-[#ED8071] hover:bg-[#ED8071]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Get My Free Playbooks Now
                    </button>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Declare gtag for tracking
declare global {
  function gtag(...args: any[]): void;
}

export default NewsletterSignupModal;