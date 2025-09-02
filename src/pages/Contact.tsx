import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Download, MessageCircle, ChevronDown, ChevronUp, Home, Coffee, CheckCircle, Users } from 'lucide-react';
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

  // Service areas for the map
  const serviceAreas = [
    { name: 'Prince Edward County', lat: 44.0007, lng: -77.2505, description: 'All of PEC, Belleville, Quinte & Trenton', zoom: 10 },
    { name: 'GTA/Durham', lat: 43.8563, lng: -79.0512, description: 'Toronto to Clarington', zoom: 9 },
    { name: 'Greater Ottawa', lat: 45.4215, lng: -75.6972, description: 'Ottawa, Kanata, Orleans', zoom: 10 },
    { name: 'Northumberland', lat: 44.0632, lng: -77.8728, description: 'Cobourg, Port Hope, Brighton', zoom: 10 }
  ];

  // Local FAQs
  const localFaqs = [
    {
      question: "How does buying in Prince Edward County differ from urban markets?",
      answer: "Prince Edward County has unique considerations including seasonal property variations, agricultural zoning regulations, and vacation rental potential. I help navigate these local nuances while securing the best rates from our 90+ lenders."
    },
    {
      question: "What are typical down payment requirements in Eastern Ontario?",
      answer: "Standard requirements are 5% for homes under $500,000, and 10% for the portion above $500,000. First-time buyers may qualify for incentives. Rural properties may have different requirements, which I'll help you understand."
    },
    {
      question: "Do you work with self-employed clients in the region?",
      answer: "Yes! Many of my clients in Eastern Ontario are self-employed, from farmers to tourism operators. I have access to alternative lenders who understand non-traditional income sources."
    },
    {
      question: "Can you help with investment properties in cottage country?",
      answer: "Absolutely! I specialize in recreational and investment properties throughout Eastern Ontario, including cottage country. I understand seasonal rental markets, property management considerations, and can connect you with lenders who embrace these investments."
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

  // Load Google Maps script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 6,
        center: { lat: 44.5, lng: -79.5 }, // Centered on Ontario
        styles: [
          { elementType: 'all', stylers: [{ saturation: -100 }] },
          { elementType: 'geometry', stylers: [{ color: '#e0e0e0' }] },
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#666666' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
          { featureType: 'administrative.province', elementType: 'geometry.fill', stylers: [{ color: '#d0d0d0' }, { visibility: 'on' }] },
          { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#999999' }, { weight: 2 }] },
          { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#b0b0b0' }] }
        ]
      });


      // Add Prince Edward County marker
      new google.maps.Marker({
        position: { lat: 44.0007, lng: -77.2505 },
        map: map,
        title: 'Prince Edward County - Main Office',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#da7073',
          fillOpacity: 1,
          strokeColor: '#8c3839',
          strokeWeight: 3
        }
      });

      // Create mini maps for each service area
      serviceAreas.forEach((area, index) => {
        const miniMapElement = document.getElementById(`mini-map-${index}`);
        if (miniMapElement) {
          const miniMap = new google.maps.Map(miniMapElement, {
            zoom: area.zoom,
            center: { lat: area.lat, lng: area.lng },
            disableDefaultUI: true,
            styles: [
              { elementType: 'all', stylers: [{ saturation: -100 }] },
              { elementType: 'geometry', stylers: [{ color: '#e0e0e0' }] },
              { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
              { elementType: 'labels.text.fill', stylers: [{ color: '#666666' }] },
              { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
              { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#b0b0b0' }] }
            ]
          });
          
          new google.maps.Marker({
            position: { lat: area.lat, lng: area.lng },
            map: miniMap,
            title: area.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#da7073',
              fillOpacity: 0.9,
              strokeColor: '#8c3839',
              strokeWeight: 2
            }
          });
        }
      });
    };

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[src*="maps.googleapis.com"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      delete window.initMap;
    };
  }, []);

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
              className="text-center mb-16 pt-10 md:pt-16"
            >
              <h1 className="font-anton text-5xl md:text-7xl text-white mb-6">
                Contact Andreina
              </h1>
              <p className="font-roboto-flex text-xl text-white/80 max-w-3xl mx-auto mb-4">
                Mortgage Advice Across Eastern Ontario
              </p>
              <p className="font-roboto-flex text-lg text-white/70 max-w-4xl mx-auto">
                Local roots. Smart strategies. Mortgage solutions that actually fit.
              </p>
            </motion.section>

            {/* Main Ontario Map - No Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <div id="map" className="w-full h-[500px] rounded-xl shadow-2xl mb-8"></div>
              
              {/* Service Areas Heading */}
              <h2 className={`${getTypographyClasses('cardTitle')} text-3xl md:text-4xl mb-8 text-center`}>Service Areas</h2>
              
              {/* 4 Mini Maps Grid - Centered with consistent width */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="bg-transparent border-none p-2">
                    <div id={`mini-map-${index}`} className="w-full h-48 rounded-lg mb-4 border border-white/20"></div>
                    <h3 className="font-roboto-flex text-white/90 text-xl mb-2 text-center">{area.name}</h3>
                    <p className="font-roboto-flex text-white/80 text-lg text-center">{area.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Lending Areas Section - Centered */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-transparent border-none p-6">
                  <h3 className={`${getTypographyClasses('cardTitle')} text-3xl md:text-4xl mb-8 text-center`}>Lending Coverage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-roboto-flex text-white/90 text-xl mb-4">Primary Service Areas</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">Prince Edward County & Quinte Region</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">GTA & Durham (Toronto to Clarington)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">Greater Ottawa Area</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">Northumberland County</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-roboto-flex text-white/90 text-xl mb-4">Extended Coverage</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">All of Eastern Ontario</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">Cottage Country Properties</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">Rural & Agricultural Lands</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-[#ED8071]" />
                        <span className="font-roboto-flex text-white/80 text-lg">Investment Properties Province-Wide</span>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
              </div>
            </motion.section>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                  <h2 className="font-anton text-3xl md:text-4xl text-white mb-6">Get in Touch</h2>
              
                  {formStatus === 'success' ? (
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="py-8 text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-[#ED8071]" />
                      </div>
                      <h3 className="font-anton text-xl text-white mb-2">Message Sent!</h3>
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
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] text-white placeholder-white/50 backdrop-blur-sm"
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
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] text-white placeholder-white/50 backdrop-blur-sm"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] text-white placeholder-white/50 backdrop-blur-sm"
                          placeholder="(613) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          Region of Interest
                        </label>
                        <select
                          name="region"
                          value={formData.region || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] text-white backdrop-blur-sm"
                        >
                          <option value="" className="text-black">Select a region</option>
                          <option value="prince-edward-county" className="text-black">Prince Edward County</option>
                          <option value="durham-region" className="text-black">Durham Region</option>
                          <option value="ottawa" className="text-black">Greater Ottawa</option>
                          <option value="northumberland" className="text-black">Northumberland</option>
                          <option value="other" className="text-black">Other Eastern Ontario</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          What would you like to do? *
                        </label>
                        <select
                          name="purpose"
                          required
                          value={formData.purpose || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] text-white backdrop-blur-sm"
                        >
                          <option value="" className="text-black">Select an option</option>
                          <option value="purchase" className="text-black">Purchase a home</option>
                          <option value="refinance" className="text-black">Refinance my mortgage</option>
                          <option value="switch" className="text-black">Switch lenders</option>
                          <option value="renewal" className="text-black">Renew my mortgage</option>
                          <option value="investment" className="text-black">Investment property</option>
                          <option value="vacation" className="text-black">Vacation property</option>
                          <option value="debt-consolidation" className="text-black">Consolidate debt</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-1">
                          Message (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message || ''}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED8071] text-white placeholder-white/50 backdrop-blur-sm resize-none"
                          placeholder="Tell me about your mortgage needs..."
                        />
                      </div>

                      {formStatus === 'error' && (
                        <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                          <p className="text-red-200 text-sm">
                            Unable to send message. Please call directly at (613) 743-7866
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isFormSubmitting}
                        className="w-full bg-[#ED8071] hover:bg-[#ED8071]/90 text-white font-roboto-flex font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isFormSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="font-roboto-flex text-xs text-white/50 text-center">
                        Your information is secure and will never be shared.
                      </p>
                    </form>
                  )}
                </AGlassCard>
              </motion.div>

              {/* Contact Info & Hours */}
              <div className="space-y-6">
                {/* NAP Information */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                    <h2 className="font-anton text-3xl md:text-4xl text-white mb-6">Contact Information</h2>
                    
                    <div className="space-y-4">
                      <a href={`tel:${CONTACT_CONFIG.phone}`} className="flex items-start space-x-3 group">
                        <Phone className="w-5 h-5 text-[#ED8071] mt-1" />
                        <div>
                          <p className="font-roboto-flex text-lg text-white group-hover:text-[#ED8071] transition-colors">
                            (613) 743-7866
                          </p>
                          <p className="font-roboto-flex text-sm text-white/60">Direct line - Text or call</p>
                        </div>
                      </a>

                      <a href={`mailto:${CONTACT_CONFIG.email}`} className="flex items-start space-x-3 group">
                        <Mail className="w-5 h-5 text-[#ED8071] mt-1" />
                        <div>
                          <p className="font-roboto-flex text-lg text-white group-hover:text-[#ED8071] transition-colors">
                            hello@mortgagewithford.ca
                          </p>
                          <p className="font-roboto-flex text-sm text-white/60">For general inquiries</p>
                        </div>
                      </a>

                      <div className="flex items-start space-x-3">
                        <Home className="w-5 h-5 text-[#ED8071] mt-1" />
                        <div>
                          <p className="font-roboto-flex text-lg text-white">BRX Mortgage #13463</p>
                          <p className="font-roboto-flex text-sm text-white/60">License: M24000357</p>
                          <p className="font-roboto-flex text-sm text-white/60">Serving all of Eastern Ontario</p>
                        </div>
                      </div>
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
                    <h2 className="font-anton text-3xl md:text-4xl text-white mb-6">Business Hours</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-[#ED8071]" />
                        <p className="font-roboto-flex text-lg text-white">Response Time</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
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

                {/* CTA Download */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <AGlassCard className="hover:bg-white/5 transition-all duration-300 h-fit">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[#ED8071]/20 rounded-full flex items-center justify-center">
                        <Download className="w-6 h-6 text-[#ED8071]" />
                      </div>
                      <h3 className="font-anton text-2xl text-white mb-3">Free Mortgage Guide</h3>
                      <p className="font-roboto-flex text-white/80 mb-6 text-sm">
                        Eastern Ontario Home Buyer's Guide with local insights, mortgage tips, and pre-approval checklist.
                      </p>
                      <LiquidGlassButton
                        href="/guides"
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
                        Get Free Guide
                      </LiquidGlassButton>
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
              <h2 className="font-anton text-3xl md:text-4xl text-white mb-8 text-center">Local Mortgage Questions</h2>
              
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
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 font-roboto-flex text-white/70"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-white/5 rounded-xl">
                  <div className="text-center mb-6">
                    <p className="font-anton text-lg text-white mb-2">
                      Have a different question?
                    </p>
                    <p className="font-roboto-flex text-white/70 mb-4">
                      Every mortgage situation is unique. Let's discuss your specific needs and find the perfect solution.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <LiquidGlassButton
                      href={CONTACT_CONFIG.bookingUrl}
                      variant="primary"
                      size="lg"
                      external={true}
                      icon={<Phone size={20} />}
                      className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white"
                      onClick={() => {
                        // Track booking CTA click
                        if (typeof gtag !== 'undefined') {
                          gtag('event', 'booking_cta_click', {
                            event_category: 'engagement',
                            event_label: 'contact_page_faq'
                          });
                        }
                      }}
                    >
                      Let's Get You HOME
                    </LiquidGlassButton>
                    
                    <LiquidGlassButton
                      onClick={() => {
                        setIsNewsletterModalOpen(true);
                        // Track newsletter signup CTA click
                        if (typeof gtag !== 'undefined') {
                          gtag('event', 'newsletter_cta_click', {
                            event_category: 'engagement',
                            event_label: 'contact_page_faq'
                          });
                        }
                      }}
                      variant="secondary"
                      size="lg"
                      icon={<Users size={20} />}
                    >
                      Sign up for the real mortgage news
                    </LiquidGlassButton>
                  </div>
                </div>
              </AGlassCard>
            </motion.section>
          </div>
        
          <Footer />
        </div>
        
        {/* Newsletter Signup Modal */}
        <NewsletterSignupModal 
          isOpen={isNewsletterModalOpen}
          onClose={() => setIsNewsletterModalOpen(false)}
        />
      </div>
    </div>
  );
};

// Declare global types
declare global {
  interface Window {
    initMap: () => void;
  }
  const google: any;
  function gtag(...args: any[]): void;
}

export default Contact;