import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Download, MessageCircle, ChevronDown, ChevronUp, Home, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AGlassCard from '@/components/ui/AGlassCard';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import NewsletterSignupModal from '@/components/NewsletterSignupModal';
import { CONTACT_CONFIG } from '@/assets/config/contact';
import { getFormType, getDefaultFormData } from '@/assets/config/forms';
import { getTypographyClasses } from '@/lib/design-system';

const Contact = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  
  // Get form configuration for contact form
  const formConfig = getFormType('contact');
  const [formData, setFormData] = useState(() => getDefaultFormData(formConfig!));

  // Service areas across Ontario
  const serviceAreas = [
    { name: 'Greater Toronto Area', description: 'Toronto, Mississauga, Brampton, Markham, Vaughan, Richmond Hill, Oakville, Burlington' },
    { name: 'Prince Edward County', description: 'Picton, Wellington, Bloomfield, Consecon, Carrying Place, Cherry Valley' },
    { name: 'Quinte Region', description: 'Belleville, Trenton, Brighton, Cobourg, Port Hope, Campbellford' },
    { name: 'Kingston & Area', description: 'Kingston, Gananoque, Brockville, Prescott, Cornwall, Smith Falls' }
  ];

  // Local FAQs
  const localFaqs = [
    {
      question: "Do you serve all of Ontario?",
      answer: "Yes! I'm licensed to serve all of Ontario. All consultations are conducted virtually for your convenience, making it easy to access my services from anywhere in the province."
    },
    {
      question: "What are typical down payment requirements in Ontario?",
      answer: "Standard requirements are 5% for homes under $500,000, and 10% for the portion above $500,000. First-time buyers may qualify for additional incentives. I'll help you understand all your options."
    },
    {
      question: "Do you work with self-employed clients?",
      answer: "Absolutely! I have access to alternative lenders who understand non-traditional income sources and can help self-employed clients secure competitive rates."
    },
    {
      question: "Can you help with investment properties?",
      answer: "Yes! I specialize in investment property financing throughout Ontario, including cottage country and rental properties. I understand the unique considerations for investment purchases."
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setFormStatus('idle');
    
    try {
      // Track contact form submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
          event_category: 'engagement',
          event_label: 'contact_page',
          user_email: formData.email
        });
      }
      // Add region to form data if selected
      const messageLines = [];
      formConfig?.fields.forEach(field => {
        if (formData[field.name] && field.name !== 'name' && field.name !== 'email') {
          if (field.type === 'select' && field.options) {
            const selectedOption = field.options.find(opt => opt.value === formData[field.name]);
            messageLines.push(`${field.label}: ${selectedOption?.label || formData[field.name]}`);
          } else {
            messageLines.push(`${field.label}: ${formData[field.name]}`);
          }
        }
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'contact',
          message: messageLines.join('\n'),
          formType: 'contact'
        })
      });

      if (response.ok) {
        setFormStatus('success');
        
        // Track successful contact submission
        if (typeof gtag !== 'undefined') {
          gtag('event', 'contact_form_success', {
            event_category: 'conversion',
            event_label: 'contact_page'
          });
        }
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData(getDefaultFormData(formConfig!));
          setFormStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Contact form error:', error);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            {/* Hero Section - No Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 sm:mb-16 pt-8 sm:pt-10 md:pt-16 px-2 sm:px-4"
            >
              <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6">
                Contact Andreina
              </h1>
              <p className="font-roboto-flex text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-3 sm:mb-4">
                Mortgage Advice Across Ontario
              </p>
              <p className="font-roboto-flex text-base sm:text-lg text-white/70 max-w-4xl mx-auto">
                Local roots. Smart strategies. Mortgage solutions that actually fit.
              </p>
            </motion.section>

            {/* Service Areas Section - Ontario Wide */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="font-roboto-flex font-semibold text-3xl md:text-4xl text-white mb-8 text-center">Serving All of Ontario</h2>
              
              {/* Service Areas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                {serviceAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-full">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-[#ED8071]" />
                        </div>
                        <h3 className="font-roboto-flex font-semibold text-xl text-white mb-3">{area.name}</h3>
                        <p className="font-roboto-flex text-white/80 text-sm leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </AGlassCard>
                  </motion.div>
                ))}
              </div>
              
              {/* Coverage Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AGlassCard className="hover:bg-white/5 transition-all duration-300">
                  <div className="text-center mb-8">
                    <h3 className="font-roboto-flex font-semibold text-2xl text-white mb-4">Complete Ontario Coverage</h3>
                    <p className="font-roboto-flex text-white/80 text-lg mb-6">
                      Licensed to serve all of Ontario with convenient virtual consultations.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto mb-3 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-[#ED8071]" />
                      </div>
                      <h4 className="font-roboto-flex text-white font-semibold mb-2">Virtual Consultations</h4>
                      <p className="font-roboto-flex text-white/70 text-sm">Convenient online meetings for all Ontario residents</p>
                    </div>
                    
                    <div>
                      <div className="w-12 h-12 mx-auto mb-3 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-[#ED8071]" />
                      </div>
                      <h4 className="font-roboto-flex text-white font-semibold mb-2">Full Service</h4>
                      <p className="font-roboto-flex text-white/70 text-sm">Complete mortgage solutions wherever you are</p>
                    </div>
                  </div>
                </AGlassCard>
              </motion.div>
            </motion.section>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                  <h2 className="font-roboto-flex font-semibold text-3xl md:text-4xl text-white mb-6">Get in Touch</h2>
              
                  {formStatus === 'success' ? (
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="py-8 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-[#ED8071]" />
                      </div>
                      <h3 className="font-roboto-flex font-semibold text-xl text-white mb-2">Message Sent!</h3>
                      <p className="font-roboto-flex text-white/70">I'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>

                      {formConfig?.fields.filter(field => field.name !== 'name' && field.name !== 'email').map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-white/80 mb-1">
                            {field.label} {field.required && '*'}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              name={field.name}
                              required={field.required}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                            >
                              <option value="">Select...</option>
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value} className="bg-black">
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              name={field.name}
                              required={field.required}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent resize-none"
                              placeholder={field.placeholder}
                            />
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              required={field.required}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ED8071] focus:border-transparent"
                              placeholder={field.placeholder}
                            />
                          )}
                        </div>
                      ))}

                      {formStatus === 'error' && (
                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                          <p className="text-red-200 text-sm">Failed to send message. Please try again or call directly.</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isFormSubmitting}
                        className="w-full bg-[#ED8071] hover:bg-[#ED8071]/90 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isFormSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AGlassCard>
              </motion.div>

              {/* Contact Info & Guide Download */}
              <div className="space-y-8">
                {/* Contact Information */}
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

                {/* Free Mortgage Guide */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <Download className="w-6 h-6 text-[#ED8071]" />
                      </div>
                      <h3 className="font-roboto-flex font-semibold text-2xl text-white mb-3">Free Mortgage Guide</h3>
                      <p className="font-roboto-flex text-white/80 mb-6 text-sm">
                        Essential mortgage basics guide covering down payments, application process, costs, and Ontario-specific information.
                      </p>
                      <LiquidGlassButton
                        href="/guides/mortgage-basics-guide.html"
                        variant="accent"
                        size="md"
                        icon={<Download size={18} />}
                        className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white w-full"
                        onClick={() => {
                          // Track guide download
                          if (typeof gtag !== 'undefined') {
                            gtag('event', 'guide_download_click', {
                              event_category: 'engagement',
                              event_label: 'contact_page'
                            });
                          }
                        }}
                      >
                        Download Guide
                      </LiquidGlassButton>
                    </div>
                  </AGlassCard>
                </motion.div>

                {/* Business Hours */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                    <h2 className="font-roboto-flex font-semibold text-3xl md:text-4xl text-white mb-6">Business Hours</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-[#ED8071]" />
                        <p className="font-roboto-flex text-lg text-white">Response Time</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="font-roboto-flex font-medium text-white">Monday - Friday</p>
                          <p className="font-roboto-flex text-white/60">9:00 AM - 8:00 PM</p>
                        </div>
                        <div>
                          <p className="font-roboto-flex font-medium text-white">Saturday - Sunday</p>
                          <p className="font-roboto-flex text-white/60">10:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-white/5 rounded-lg">
                        <p className="font-roboto-flex text-sm text-white">
                          <span className="font-medium">Quick Response:</span> 2-4 hours during business hours
                        </p>
                        <p className="font-roboto-flex text-sm text-white mt-1">
                          <span className="font-medium">After Hours:</span> Response within 24 hours
                        </p>
                        <p className="font-roboto-flex text-sm text-white mt-1">
                          <span className="font-medium">Urgent Pre-approvals:</span> Same-day service available
                        </p>
                      </div>
                    </div>
                  </AGlassCard>
                </motion.div>

                {/* Newsletter Signup */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-[#ED8071]" />
                      </div>
                      <h3 className="font-roboto-flex font-semibold text-2xl text-white mb-3">Stay Updated</h3>
                      <p className="font-roboto-flex text-white/80 mb-6 text-sm">
                        Get the latest mortgage rates, market updates, and insider tips delivered to your inbox.
                      </p>
                      <button
                        onClick={() => setIsNewsletterModalOpen(true)}
                        className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Join Newsletter
                      </button>
                    </div>
                  </AGlassCard>
                </motion.div>
              </div>
            </div>

            {/* Local FAQs - No Outer Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="font-roboto-flex font-semibold text-3xl md:text-4xl text-white mb-8 text-center">Frequently Asked Questions</h2>
              
              <AGlassCard className="hover:bg-white/5 transition-all duration-300">
                
                <div className="space-y-4">
                  {localFaqs.map((faq, index) => (
                    <div key={index} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full text-left flex justify-between items-start group"
                      >
                        <h3 className="font-roboto-flex text-lg text-white group-hover:text-[#ED8071] transition-colors pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-[#ED8071] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-[#ED8071] flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <p className="font-roboto-flex text-white/80 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </AGlassCard>
            </motion.section>
          </div>
        </div>
        
        <Footer />
      </div>
      
      {/* Newsletter Modal */}
      <NewsletterSignupModal 
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

// Declare gtag for tracking
declare global {
  function gtag(...args: any[]): void;
}

export default Contact;