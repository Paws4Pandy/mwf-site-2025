import React, { useState } from 'react';
import { FileText, CheckCircle, Home, RefreshCw, DollarSign, Users, BookOpen, AlertCircle, Eye, Mail, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AGlassCard from '@/components/ui/AGlassCard';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

const guides = [
  {
    id: 'first-time-buyer',
    title: 'First-Time Home Buyer Checklist',
    description: 'Everything you need to know about buying your first home in Canada',
    iconPath: '/guides/icons/keys-icon.png',
    features: [
      'Step-by-step process guide',
      'Document checklist',
      'First-time buyer incentives',
      'Budget planning worksheet'
    ],
    fileName: 'first-time-buyer-checklist.html',
    color: 'from-design-teal to-design-azure',
    pages: 12,
    readTime: '5 minutes'
  },
  {
    id: 'refinance',
    title: 'Refinance Mortgage Checklist',
    description: 'Complete guide to refinancing your mortgage for better rates or equity access',
    iconPath: '/guides/icons/money-icon.png',
    features: [
      'When to refinance calculator',
      'Cost-benefit analysis',
      'Required documentation',
      'Timeline and process'
    ],
    fileName: 'refinance-mortgage-checklist.html',
    color: 'from-design-green to-design-sage',
    pages: 10,
    readTime: '4 minutes'
  },
  {
    id: 'reverse-mortgage',
    title: 'Reverse Mortgage Education',
    description: 'Understanding reverse mortgages for Canadian homeowners 55+',
    iconPath: '/guides/icons/piggy-bank-icon.png',
    features: [
      'Eligibility requirements',
      'Pros and cons analysis',
      'Payment options explained',
      'Estate planning considerations'
    ],
    fileName: 'reverse-mortgage-education.html',
    color: 'from-design-red to-design-crimson',
    pages: 15,
    readTime: '7 minutes'
  },
  {
    id: 'renewal-switching',
    title: 'Renewal & Switching Lenders',
    description: 'Navigate mortgage renewals and find better rates with new lenders',
    iconPath: '/guides/icons/document-icon.png',
    features: [
      'Renewal timeline checklist',
      'Rate comparison worksheet',
      'Switching costs calculator',
      'Negotiation strategies'
    ],
    fileName: 'renewal-switching-checklist.html',
    color: 'from-design-gold to-gray-orange',
    pages: 8,
    readTime: '3 minutes'
  }
];

// Global type declaration
declare global {
  function gtag(...args: any[]): void;
}

const Guides = () => {
  const [emailModalOpen, setEmailModalOpen] = useState<string | null>(null);
  const [emailForm, setEmailForm] = useState({ yourEmail: '', friendEmail: '' });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleView = (fileName: string, guideId: string) => {
    // Open PDF in new tab
    window.open(`/guides/${fileName}`, '_blank');
    
    // Track view event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'guide_view', {
        event_category: 'engagement',
        event_label: guideId,
        value: 1
      });
    }
  };

  const handleEmailGuide = async (guideId: string) => {
    setEmailSending(true);

    try {
      // Send guide via the updated API
      const response = await fetch('/api/send-guide-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId,
          yourEmail: emailForm.yourEmail,
          friendEmail: emailForm.friendEmail
        })
      });

      if (response.ok) {
        setEmailSuccess(true);
        setTimeout(() => {
          setEmailModalOpen(null);
          setEmailForm({ yourEmail: '', friendEmail: '' });
          setEmailSuccess(false);
        }, 2000);
      } else {
        // If API fails, show informative message
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send guide');
      }
    } catch (error) {
      // In development mode, API routes might not work
      if (window.location.hostname === 'localhost') {
        alert(`Development mode: API routes only work in production.

Guide request logged:
- Guide: ${guides.find(g => g.id === guideId)?.title || 'Unknown'}
- Email: ${emailForm.yourEmail}
${emailForm.friendEmail ? `- Friend: ${emailForm.friendEmail}` : ''}

In production, this will send the guide instantly to your email.`);
      } else {
        alert('Please contact us directly at andreina@mortgagewithford.ca to receive the guide.');
      }
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Using 49.png to match My Strategy page */}
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
        
        {/* Main content */}
        <section className="py-10 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12 opacity-0 animate-fade-in-delay-1">
              <div className="inline-flex items-center gap-2 bg-[#ED8071]/20 px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-5 h-5 text-[#ED8071]" />
                <span className="text-[#ED8071] font-roboto-flex font-medium">Free Resources</span>
              </div>
              
              <h1 className="font-anton text-5xl md:text-7xl lg:text-8xl text-[#ED8071] leading-[0.85] mb-4">
                Free Mortgage
                <br />
                <span className="text-white">Guides</span>
              </h1>
            </div>
            
            <div className="mb-16 opacity-0 animate-fade-in-delay-2">
              <p className="text-xl md:text-2xl font-roboto-flex text-white/90 max-w-4xl mx-auto leading-relaxed">
                Download our no b.s guides on figuring out how all of this mortgage information can make sense! 
                Each guide is packed with checklists, worksheets, and expert insights.
              </p>
            </div>
          </div>

            {/* Success Message for Form Redirects */}
            {window.location.search.includes('success=true') && (
              <div className="mb-12">
                <AGlassCard className="bg-green-500/10 border-green-500/30">
                  <div className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <p className="text-design-white text-lg">
                      Thank you for your submission! Browse our guides below to learn more about the mortgage process.
                    </p>
                  </div>
                </AGlassCard>
              </div>
            )}

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 opacity-0 animate-fade-in-delay-3 max-w-4xl mx-auto">
              {guides.map((guide) => {
                return (
                  <AGlassCard 
                    key={guide.id} 
                    className="group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Centered Icon Above Text */}
                      <div className="text-center mb-6">
                        <div className="mb-4 flex justify-center">
                          <img 
                            src={guide.iconPath} 
                            alt={guide.title}
                            className="w-20 h-20 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-serif italic text-design-white font-normal mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-sm sm:text-base text-design-azure leading-relaxed mb-2">
                          {guide.description}
                        </p>
                        <div className="text-xs sm:text-sm text-design-azure/70">
                          {guide.readTime} read
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {guide.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-design-gold flex-shrink-0" />
                            <span className="text-design-white text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <LiquidGlassButton
                          onClick={() => handleView(guide.fileName, guide.id)}
                          variant="primary"
                          size="md"
                          icon={<Eye className="w-5 h-5" />}
                          className="flex-1 min-w-0 bg-[#ED8071] hover:bg-[#ED8071]/90 text-white border-[#ED8071]"
                        >
                          View
                        </LiquidGlassButton>
                        
                        <LiquidGlassButton
                          onClick={() => setEmailModalOpen(guide.id)}
                          variant="secondary"
                          size="md"
                          icon={<Mail className="w-5 h-5" />}
                          className="flex-1 min-w-0"
                        >
                          Email Guide
                        </LiquidGlassButton>
                      </div>

                      {/* Email Modal */}
                      {emailModalOpen === guide.id && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                          <AGlassCard className="w-full max-w-md m-4">
                            <div className="p-6">
                              {emailSuccess ? (
                                <div className="text-center py-8">
                                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                  <h3 className="text-xl font-roboto-flex text-design-white mb-2">
                                    Guide Sent Successfully!
                                  </h3>
                                  <p className="text-design-azure">
                                    Check your email for the guide.
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <h3 className="text-xl font-serif italic text-design-white mb-4">
                                    Email {guide.title}
                                  </h3>
                                  
                                  <div className="space-y-4">
                                    <input
                                      type="email"
                                      placeholder="Your email"
                                      value={emailForm.yourEmail}
                                      onChange={(e) => setEmailForm({...emailForm, yourEmail: e.target.value})}
                                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-design-white placeholder-white/50"
                                    />
                                    
                                    <input
                                      type="email"
                                      placeholder="Friend's email (optional)"
                                      value={emailForm.friendEmail}
                                      onChange={(e) => setEmailForm({...emailForm, friendEmail: e.target.value})}
                                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-design-white placeholder-white/50"
                                    />
                                    
                                    <div className="flex gap-3">
                                      <LiquidGlassButton
                                        onClick={() => handleEmailGuide(guide.id)}
                                        disabled={!emailForm.yourEmail || emailSending}
                                        variant="accent"
                                        size="md"
                                        icon={<Send className="w-4 h-4" />}
                                        className="flex-1"
                                      >
                                        {emailSending ? 'Sending...' : 'Email Guide'}
                                      </LiquidGlassButton>
                                      
                                      <LiquidGlassButton
                                        onClick={() => {
                                          setEmailModalOpen(null);
                                          setEmailForm({ yourEmail: '', friendEmail: '' });
                                        }}
                                        variant="secondary"
                                        size="md"
                                        className="flex-1"
                                      >
                                        Cancel
                                      </LiquidGlassButton>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </AGlassCard>
                        </div>
                      )}
                    </div>
                  </AGlassCard>
                );
              })}
            </div>


          <div className="flex justify-center gap-4 mt-12 opacity-0 animate-fade-in-delay-4">
            <LiquidGlassButton
              href="https://callme.mortgagewithford.ca"
              variant="primary"
              size="lg"
              external={true}
              className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white"
            >
              Book Your Free Consultation
            </LiquidGlassButton>
            <LiquidGlassButton
              href="/contact"
              variant="secondary"
              size="lg"
            >
              Contact Us
            </LiquidGlassButton>
          </div>
        </section>
        
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Guides;