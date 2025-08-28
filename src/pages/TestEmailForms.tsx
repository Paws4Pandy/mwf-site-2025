import React, { useState } from 'react';
import PageBackground from '@/components/PageBackground';
import Header from '@/components/Header';
import EmailNotificationPopup from '@/components/EmailNotificationPopup';
import EmailService from '@/services/EmailService';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const TestEmailForms = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'contact' as const
  });
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTestResult = (result: any) => {
    setTestResults(prev => [...prev, { ...result, timestamp: new Date().toISOString() }]);
  };

  const testDirectSubmission = async () => {
    setIsSubmitting(true);
    try {
      const result = await EmailService.submitNotification({
        name: formData.name || 'Test User',
        email: formData.email || 'test@example.com',
        type: formData.type,
        source: 'test-page',
        message: formData.message || 'This is a test message'
      });
      
      addTestResult({
        test: 'Direct EmailService Submission',
        success: result.success,
        message: result.message,
        error: result.error
      });
    } catch (error) {
      addTestResult({
        test: 'Direct EmailService Submission',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testAPIEndpoint = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'API Test User',
          email: formData.email || 'apitest@example.com',
          type: formData.type,
          message: formData.message || 'Testing API endpoint directly'
        })
      });
      
      const result = await response.json();
      
      addTestResult({
        test: 'API Endpoint Direct Call',
        success: response.ok,
        status: response.status,
        message: result.message || result.error,
        response: result
      });
    } catch (error) {
      addTestResult({
        test: 'API Endpoint Direct Call',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const testLocalStorage = () => {
    try {
      const testData = {
        id: crypto.randomUUID(),
        name: formData.name || 'LocalStorage Test',
        email: formData.email || 'localstorage@test.com',
        type: formData.type,
        message: 'Testing localStorage fallback',
        timestamp: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
      existing.push(testData);
      localStorage.setItem('emailNotifications', JSON.stringify(existing));
      
      addTestResult({
        test: 'LocalStorage Fallback',
        success: true,
        message: 'Data saved to localStorage',
        data: testData,
        totalStored: existing.length
      });
    } catch (error) {
      addTestResult({
        test: 'LocalStorage Fallback',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const clearTestResults = () => {
    setTestResults([]);
    localStorage.removeItem('emailNotifications');
  };

  return (
    <PageBackground>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Header />
        
        <div className="max-w-6xl mx-auto mt-20">
          <h1 className="text-5xl font-anton text-white mb-8">Email Form Testing Suite</h1>
          
          {/* Test Form Inputs */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-abril text-white mb-6">Test Form Data</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white/90 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50"
                  placeholder="Test User"
                />
              </div>
              
              <div>
                <label className="block text-white/90 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50"
                  placeholder="test@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white/90 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-white/90 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                >
                  <option value="contact">Contact</option>
                  <option value="playbooks">Playbooks</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white/90 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 h-24"
                placeholder="Test message..."
              />
            </div>
          </div>

          {/* Test Actions */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-abril text-white mb-6">Test Actions</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setShowPopup(true)}
                disabled={isSubmitting}
                className="px-6 py-3 bg-design-lilac hover:bg-design-lilac/90 text-white rounded-xl transition-all disabled:opacity-50"
              >
                Test Email Popup
              </button>
              
              <button
                onClick={testDirectSubmission}
                disabled={isSubmitting}
                className="px-6 py-3 bg-design-lilac hover:bg-design-lilac/90 text-white rounded-xl transition-all disabled:opacity-50"
              >
                Test EmailService
              </button>
              
              <button
                onClick={testAPIEndpoint}
                disabled={isSubmitting}
                className="px-6 py-3 bg-design-lilac hover:bg-design-lilac/90 text-white rounded-xl transition-all disabled:opacity-50"
              >
                Test API Endpoint
              </button>
              
              <button
                onClick={testLocalStorage}
                disabled={isSubmitting}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all disabled:opacity-50"
              >
                Test LocalStorage
              </button>
              
              <button
                onClick={clearTestResults}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all"
              >
                Clear Results
              </button>
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h2 className="text-2xl font-abril text-white mb-6">Test Results</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${
                      result.success 
                        ? 'bg-green-500/20 border border-green-500/30' 
                        : 'bg-red-500/20 border border-red-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{result.test}</h3>
                        <p className="text-white/80 text-sm mt-1">
                          {result.message || result.error || 'No message'}
                        </p>
                        {result.status && (
                          <p className="text-white/60 text-xs mt-1">Status: {result.status}</p>
                        )}
                        {result.response && (
                          <details className="mt-2">
                            <summary className="text-white/60 text-xs cursor-pointer">
                              View Response
                            </summary>
                            <pre className="text-white/60 text-xs mt-1 overflow-x-auto">
                              {JSON.stringify(result.response, null, 2)}
                            </pre>
                          </details>
                        )}
                        <p className="text-white/40 text-xs mt-2">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Email Notification Popup */}
      <EmailNotificationPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Test Email Popup"
      />
    </PageBackground>
  );
};

export default TestEmailForms;