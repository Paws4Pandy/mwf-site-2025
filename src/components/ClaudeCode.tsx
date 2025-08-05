import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Loader2, Send, Copy, Check } from 'lucide-react';
import Anthropic from '@anthropic-ai/sdk';

interface ClaudeCodeProps {
  apiKey?: string;
  model?: string;
  placeholder?: string;
  className?: string;
}

export const ClaudeCode: React.FC<ClaudeCodeProps> = ({
  apiKey = process.env.VITE_ANTHROPIC_API_KEY,
  model = 'claude-3-5-sonnet-20241022',
  placeholder = "Ask Claude to help you with code...",
  className = ""
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const anthropic = new Anthropic({
    apiKey: apiKey,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    const newMessages = [...messages, {
      role: 'user' as const,
      content: userMessage,
      timestamp: new Date()
    }];
    setMessages(newMessages);

    try {
      const response = await anthropic.messages.create({
        model: model,
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `You are a helpful coding assistant. Please help with the following request: ${userMessage}`
          }
        ],
      });

      // Add assistant response to chat
      setMessages([...newMessages, {
        role: 'assistant' as const,
        content: response.content[0].type === 'text' ? response.content[0].text : 'Sorry, I could not process that response.',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      setMessages([...newMessages, {
        role: 'assistant' as const,
        content: 'Sorry, there was an error processing your request. Please check your API key and try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Badge variant="secondary">Claude Code</Badge>
          <span>AI Code Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Start a conversation with Claude to get coding help!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">
                        {message.role === 'user' ? 'You' : 'Claude'}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-6 px-2"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        {copied ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Claude is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 resize-none"
            rows={3}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        {/* API Key Notice */}
        {!apiKey && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            ⚠️ Please set your Anthropic API key in the VITE_ANTHROPIC_API_KEY environment variable
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaudeCode; 