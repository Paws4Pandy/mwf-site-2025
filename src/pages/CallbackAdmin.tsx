import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import PageBackground from '@/components/PageBackground';
import Header from '@/components/Header';

interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  timestamp: string;
  isBusinessHours: boolean;
  status: 'pending' | 'contacted';
  source: string;
}

const CallbackAdmin = () => {
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simple password protection (in production, use proper auth)
  const handleAuth = () => {
    if (authPassword === 'andreina2024') {
      setIsAuthenticated(true);
      localStorage.setItem('callback_admin_auth', 'true');
      fetchCallbacks();
    } else {
      alert('Incorrect password');
    }
  };
  
  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('callback_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchCallbacks();
    } else {
      setLoading(false);
    }
  }, []);
  
  // Fetch callbacks from API
  const fetchCallbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-callbacks');
      if (response.ok) {
        const data = await response.json();
        setCallbacks(data.callbacks || []);
      }
    } catch (error) {
      console.error('Failed to fetch callbacks:', error);
      // Mock data for demonstration
      setCallbacks([
        {
          id: 'callback_1',
          name: 'John Smith',
          phone: '(416) 555-0123',
          email: 'john@example.com',
          timestamp: new Date().toISOString(),
          isBusinessHours: true,
          status: 'pending',
          source: 'voice-bot'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  // Mark callback as contacted
  const markAsContacted = (id: string) => {
    setCallbacks(prev => 
      prev.map(cb => 
        cb.id === id ? { ...cb, status: 'contacted' } : cb
      )
    );
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'America/Toronto',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  if (!isAuthenticated) {
    return (
      <PageBackground>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
            <input
              type="password"
              placeholder="Enter password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleAuth}
              className="w-full bg-design-lilac text-white py-2 rounded-lg hover:bg-design-lilac/90"
            >
              Login
            </button>
          </div>
        </div>
      </PageBackground>
    );
  }
  
  return (
    <PageBackground>
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Callback Requests</h1>
            <button
              onClick={fetchCallbacks}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
              <p className="text-gray-500 mt-2">Loading callbacks...</p>
            </div>
          ) : callbacks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No callback requests at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {callbacks
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map(callback => (
                <div
                  key={callback.id}
                  className={`border rounded-lg p-6 ${
                    callback.status === 'contacted'
                      ? 'bg-gray-50 border-gray-200'
                      : callback.isBusinessHours
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{callback.name}</h3>
                        {callback.isBusinessHours && callback.status === 'pending' && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                            Business Hours - Priority
                          </span>
                        )}
                        {callback.status === 'contacted' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Contacted
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${callback.phone}`} className="text-design-lilac hover:underline">
                            {callback.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${callback.email}`} className="text-design-lilac hover:underline">
                            {callback.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formatTime(callback.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {callback.status === 'pending' && (
                      <button
                        onClick={() => markAsContacted(callback.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark as Contacted
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageBackground>
  );
};

export default CallbackAdmin;