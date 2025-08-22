import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Send, Loader2, AlertCircle, 
  MessageSquare, DollarSign, TrendingUp, X,
  Download, Trash2, Volume2, VolumeX
} from 'lucide-react';
import chatService from '@/services/ChatService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  cost?: {
    input: string;
    output: string;
    total: string;
  };
  isPlaying?: boolean;
}

const ClaudeElevenLabsChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState('0.000000');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const elevenLabsRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result: SpeechRecognitionResult) => result[0])
          .map((result: SpeechRecognitionAlternative) => result.transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          setInputText(transcript);
        }
      };
      
      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);
  
  // Load stored conversation on mount
  useEffect(() => {
    chatService.loadStoredConversation();
    const history = chatService.getHistory();
    setMessages(history);
    setTotalCost(chatService.getTotalCost());
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initialize ElevenLabs
  useEffect(() => {
    if (isOpen && !elevenLabsRef.current) {
      // Initialize ElevenLabs voice API
      // This would be your actual ElevenLabs integration
      console.log('Initializing ElevenLabs...');
    }
  }, [isOpen]);
  
  // Toggle speech recognition
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);
  
  // Play audio response using ElevenLabs
  const playAudioResponse = async (text: string) => {
    if (!audioEnabled) return;
    
    setIsSpeaking(true);
    try {
      // This is where you'd integrate with ElevenLabs TTS API
      // For now, using browser's speech synthesis as fallback
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsSpeaking(false);
    }
  };
  
  // Send message to Claude
  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const messageText = inputText.trim();
    setInputText('');
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await chatService.sendMessage(messageText);
      
      // Update messages from service history (includes both user and assistant messages)
      setMessages(chatService.getHistory());
      setTotalCost(chatService.getTotalCost());
      
      // Play audio response
      if (audioEnabled) {
        await playAudioResponse(response.response);
      }
      
    } catch (error: unknown) {
      setError((error instanceof Error ? error.message : 'Failed to get response. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // Clear conversation
  const clearConversation = () => {
    if (confirm('Are you sure you want to clear the conversation?')) {
      chatService.clearConversation();
      setMessages([]);
      setTotalCost('0.000000');
      setError(null);
    }
  };
  
  // Export conversation
  const exportConversation = () => {
    const data = chatService.exportConversation();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-design-lilac text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <MessageSquare className="w-6 h-6" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {messages.length}
          </span>
        )}
      </motion.button>
      
      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-design-lilac text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">Mortgage Assistant</h3>
                  <p className="text-xs opacity-90">Ask me anything about mortgages!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title={audioEnabled ? 'Disable voice' : 'Enable voice'}
                >
                  {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-end text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={exportConversation}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Export conversation"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={clearConversation}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Hi! I'm your mortgage assistant.</p>
                  <p className="text-sm mt-2">Ask me anything about mortgages, rates, or home buying!</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-design-lilac text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                  </div>
                </div>
              )}
              
              {isSpeaking && (
                <div className="flex justify-center">
                  <div className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />
                    <span className="text-xs text-blue-600">Speaking...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mx-4 mb-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type or speak your question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-design-lilac focus:border-transparent"
                  disabled={isLoading}
                />
                
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-design-lilac text-white rounded-lg hover:bg-design-lilac/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {isListening && (
                <p className="text-xs text-gray-500 mt-2 text-center animate-pulse">
                  Listening... Speak now
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClaudeElevenLabsChat;