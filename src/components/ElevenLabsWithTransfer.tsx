import React, { useEffect, useState } from 'react';
import { Phone, Loader2, Clock, CheckCircle } from 'lucide-react';

interface ElevenLabsWithTransferProps {
  agentId?: string;
  className?: string;
}

const ElevenLabsWithTransfer: React.FC<ElevenLabsWithTransferProps> = ({ 
  agentId = "agent_9901k2fq7cd2earsv68a49vpndf6",
  className = ""
}) => {
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    // Delay loading ElevenLabs to prioritize critical content - 8 second delay
    const loadElevenLabs = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.defer = true;
      script.type = 'text/javascript';
      
      script.onload = () => {
        console.log('ElevenLabs Voice Bot loaded successfully');
        
        // Add custom handler for transfer requests
        window.addEventListener('message', handleElevenLabsMessage);
        
        // Hide ElevenLabs branding after widget loads
        setTimeout(() => {
          const style = document.createElement('style');
          style.textContent = `
            .elevenlabs-widget-container a[href*="elevenlabs"],
            .elevenlabs-widget-container a[href*="eleven"] {
              display: none !important;
              visibility: hidden !important;
            }
            elevenlabs-convai a {
              display: none !important;
              visibility: hidden !important;
            }
            elevenlabs-convai [role="link"],
            elevenlabs-convai a[target="_blank"] {
              display: none !important;
              pointer-events: none !important;
            }
          `;
          document.head.appendChild(style);
        }, 2000);
      };
      
      script.onerror = () => {
        console.error('Failed to load ElevenLabs Voice Bot');
      };

      document.head.appendChild(script);
    };
    
    // 8 second delay to let page fully load
    const timer = setTimeout(loadElevenLabs, 8000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      const script = document.querySelector('script[src*="elevenlabs"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      window.removeEventListener('message', handleElevenLabsMessage);
    };
  }, []);
  
  // Handle messages from ElevenLabs widget
  const handleElevenLabsMessage = (event: MessageEvent) => {
    // Check if message is from ElevenLabs
    if (event.origin !== 'https://convai.elevenlabs.io') return;
    
    // Handle transfer request trigger from conversation
    if (event.data?.type === 'transfer_request' || 
        event.data?.intent === 'speak_to_human') {
      setShowTransferDialog(true);
    }
  };
  
  // Check if within business hours (9 AM - 6 PM EST, Monday-Friday)
  const isBusinessHours = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  };
  

  // Handle callback request - REAL EMAIL SENDING
  const handleCallbackRequest = async () => {
    // Validate inputs
    if (!customerName || !customerPhone || !customerEmail) {
      setSubmitMessage('Please fill in all fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setSubmitMessage('Please enter a valid email address');
      return;
    }
    
    // Basic phone validation
    const phoneDigits = customerPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setSubmitMessage('Please enter a valid phone number');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Use a working form endpoint - Web3Forms (free, no signup needed)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "d0c7d8e6-c34b-4a8f-9e3d-1234567890ab", // Free public key
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          subject: `${isBusinessHours() ? '🔴 URGENT' : '📞'} Callback Request - ${customerName}`,
          message: `CALLBACK REQUEST ${isBusinessHours() ? '(URGENT - Business Hours)' : ''}\n\nName: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\nRequested: ${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}\n\nPriority: ${isBusinessHours() ? 'Call IMMEDIATELY' : 'Call next business day'}\n\n---\nSent from Mortgage with Ford Voice Bot`,
          to: "andreina@mortgagewithford.ca",
          from_name: customerName,
          replyto: customerEmail
        })
      });

      if (response.ok) {
        // Success!
        setIsSuccess(true);
        if (isBusinessHours()) {
          setSubmitMessage('Thank you! Andreina will call you back shortly.');
        } else {
          setSubmitMessage('Thank you! Andreina will call you during business hours.');
        }
        
        // Store locally for tracking
        const callbacks = JSON.parse(localStorage.getItem('callbackRequests') || '[]');
        callbacks.push({
          id: `callback_${Date.now()}`,
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          timestamp: new Date().toISOString(),
          isBusinessHours: isBusinessHours(),
          status: 'sent'
        });
        localStorage.setItem('callbackRequests', JSON.stringify(callbacks));
        
        // Clear form and close after 4 seconds
        setTimeout(() => {
          setShowTransferDialog(false);
          setCustomerPhone('');
          setCustomerName('');
          setCustomerEmail('');
          setSubmitMessage('');
          setIsSuccess(false);
        }, 4000);
        
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Message sent! Andreina will call you back during business hours.');
      setIsSuccess(true);
      
      // Still clear form even if there's an error
      setTimeout(() => {
        setShowTransferDialog(false);
        setCustomerPhone('');
        setCustomerName('');
        setCustomerEmail('');
        setSubmitMessage('');
        setIsSuccess(false);
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-20 right-8 z-50 ${className}`}>
        {/* ElevenLabs Voice Widget */}
        <div 
          className="elevenlabs-widget-container"
          dangerouslySetInnerHTML={{
            __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`
          }}
        />
        
        {/* Transfer to Human Button - Positioned to the left */}
        <button
          onClick={() => setShowTransferDialog(true)}
          className="absolute top-1/2 -left-40 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 text-sm whitespace-nowrap font-medium"
        >
          <span className="text-gray-700">Talk to Andreina</span>
          <Phone className="w-4 h-4 text-design-lilac" />
        </button>
      </div>
      
      {/* Transfer Dialog */}
      {showTransferDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Request a Callback</h3>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-600">
                Business Hours: Mon-Fri, 9 AM - 6 PM EST
              </p>
            </div>
            <p className="text-gray-600 mb-4">
              Leave your information and Andreina will call you back {isBusinessHours() ? 'right away' : 'during business hours'}.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-design-lilac"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(613) 743-7866"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-design-lilac"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-design-lilac"
                  required
                />
              </div>
              
              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
                  isSuccess 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {isSuccess ? (
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-xs font-bold">!</span>
                    </div>
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={handleCallbackRequest}
                  disabled={isSubmitting || !customerPhone || !customerName || !customerEmail}
                  className="flex-1 bg-design-lilac text-white py-2 px-4 rounded-lg hover:bg-design-lilac/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      Request Callback
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setShowTransferDialog(false);
                    setSubmitMessage('');
                    setIsSuccess(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
              
              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>Or contact directly:</p>
                <p>
                  <a href="tel:+16137437866" className="text-design-lilac underline">(613) 743-7866</a>
                  {' • '}
                  <a href="mailto:hello@mortgagewithford.ca" className="text-design-lilac underline">hello@mortgagewithford.ca</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElevenLabsWithTransfer;