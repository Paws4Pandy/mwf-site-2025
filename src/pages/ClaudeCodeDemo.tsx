import React from 'react';
import ClaudeCode from '../components/ClaudeCode';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Code, Bot, MessageSquare } from 'lucide-react';

const ClaudeCodeDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Claude Code Assistant</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant coding help and guidance from Claude AI. Ask questions, get code reviews, 
            debug issues, or learn new programming concepts.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">AI-Powered</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Powered by Claude 3.5 Sonnet, one of the most advanced AI models for coding assistance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Real-time Chat</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interactive chat interface with message history and copy-to-clipboard functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Code Focused</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Specialized for coding questions, debugging, and programming guidance.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">Setup Required</Badge>
              <span>Getting Started</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">1. Get Your API Key</h3>
              <p className="text-sm text-gray-600 mb-2">
                Sign up at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a> and create an API key.
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">2. Set Environment Variable</h3>
              <p className="text-sm text-gray-600 mb-2">
                Create a <code className="bg-gray-200 px-1 rounded">.env</code> file in your project root and add:
              </p>
              <code className="block bg-gray-200 p-2 rounded text-sm">
                VITE_ANTHROPIC_API_KEY=your_api_key_here
              </code>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">3. Start Chatting</h3>
              <p className="text-sm text-gray-600">
                Ask Claude anything about coding - from syntax questions to architectural decisions!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Claude Code Component */}
        <ClaudeCode 
          placeholder="Ask me anything about coding! For example: 'How do I create a React component?' or 'Debug this JavaScript code...'"
          className="shadow-lg"
        />

        {/* Example Prompts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Example Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Code Review</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• "Review this React component for best practices"</li>
                  <li>• "Check this TypeScript code for type safety"</li>
                  <li>• "Optimize this JavaScript function"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Learning & Debugging</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• "Explain how async/await works in JavaScript"</li>
                  <li>• "Help me debug this error message"</li>
                  <li>• "Show me how to use React hooks"</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClaudeCodeDemo; 