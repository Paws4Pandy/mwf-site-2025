// Chat Service - Integrates Claude AI with ElevenLabs Voice
import { v4 as uuidv4 } from 'uuid';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  cost?: {
    input: string;
    output: string;
    total: string;
  };
}

interface ChatResponse {
  response: string;
  conversationId: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cost: {
      input: string;
      output: string;
      total: string;
    };
  };
  latency?: number;
}

interface AnalyticsData {
  period: string;
  data: {
    totalRequests: number;
    totalCost: string;
    totalTokens: number;
    uniqueUsers: number;
    averageCostPerRequest?: string;
    averageTokensPerRequest?: number;
    dailyBreakdown?: Array<{
      date: string;
      totalRequests: number;
      totalCost: number;
      totalTokens: number;
      uniqueUsers: number;
    }>;
  };
  timestamp: string;
}

export class ChatService {
  private static instance: ChatService;
  private conversationId: string;
  private conversationHistory: ChatMessage[] = [];
  private totalCost: number = 0;
  private apiEndpoint: string;
  
  private constructor() {
    // Generate or retrieve conversation ID
    this.conversationId = this.getOrCreateConversationId();
    
    // Set API endpoint based on environment
    this.apiEndpoint = process.env.NODE_ENV === 'production'
      ? 'https://mortgage-with-ford-august-2025-dqguhgme8.vercel.app/api'
      : 'http://localhost:8081/api';
  }
  
  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }
  
  private getOrCreateConversationId(): string {
    // Try to get existing conversation ID from localStorage
    const stored = localStorage.getItem('conversationId');
    if (stored) {
      const { id, timestamp } = JSON.parse(stored);
      // Check if conversation is less than 24 hours old
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return id;
      }
    }
    
    // Create new conversation ID
    const newId = `conv_${uuidv4()}`;
    localStorage.setItem('conversationId', JSON.stringify({
      id: newId,
      timestamp: Date.now(),
    }));
    return newId;
  }
  
  // Send message to Claude and get response
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      // Prepare context (last 5 exchanges) - don't add user message yet
      const context = this.conversationHistory.slice(-10);
      
      // Call Claude API
      const response = await fetch(`${this.apiEndpoint}/claude`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversationId: this.conversationId,
          context,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        
        // Handle rate limiting
        if (response.status === 429) {
          throw new Error(error.error || 'Too many requests. Please wait a moment.');
        }
        
        throw new Error(error.error || 'Failed to get response');
      }
      
      const data: ChatResponse = await response.json();
      
      // Add both user message and assistant response to history
      this.conversationHistory.push(
        {
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        },
        {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
          cost: data.usage?.cost,
        }
      );
      
      // Update total cost
      if (data.usage?.cost?.total) {
        this.totalCost += parseFloat(data.usage.cost.total);
      }
      
      // Store conversation locally for recovery
      this.storeConversationLocally();
      
      return data;
      
    } catch (error) {
      console.error('Chat Service Error:', error);
      throw error;
    }
  }
  
  // Store conversation in localStorage for recovery
  private storeConversationLocally(): void {
    try {
      const data = {
        conversationId: this.conversationId,
        history: this.conversationHistory.slice(-20), // Keep last 20 messages
        totalCost: this.totalCost,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem('conversationData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to store conversation locally:', error);
    }
  }
  
  // Retrieve stored conversation
  loadStoredConversation(): void {
    try {
      const stored = localStorage.getItem('conversationData');
      if (stored) {
        const data = JSON.parse(stored);
        // Only load if same conversation ID and less than 24 hours old
        if (data.conversationId === this.conversationId && 
            Date.now() - new Date(data.lastUpdated).getTime() < 24 * 60 * 60 * 1000) {
          this.conversationHistory = data.history || [];
          this.totalCost = data.totalCost || 0;
        }
      }
    } catch (error) {
      console.error('Failed to load stored conversation:', error);
    }
  }
  
  // Get conversation history
  getHistory(): ChatMessage[] {
    return this.conversationHistory;
  }
  
  // Get total cost for current session
  getTotalCost(): string {
    return this.totalCost.toFixed(6);
  }
  
  // Clear conversation
  clearConversation(): void {
    this.conversationHistory = [];
    this.totalCost = 0;
    this.conversationId = this.getOrCreateConversationId();
    localStorage.removeItem('conversationData');
  }
  
  // Fetch analytics data (requires authentication)
  async getAnalytics(period: 'today' | 'week' | 'month', authToken: string): Promise<AnalyticsData> {
    try {
      const response = await fetch(`${this.apiEndpoint}/analytics?period=${period}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Analytics fetch error:', error);
      throw error;
    }
  }
  
  // Get conversation details (requires authentication)
  async getConversationDetails(conversationId: string, authToken: string): Promise<Record<string, unknown>> {
    try {
      const response = await fetch(`${this.apiEndpoint}/analytics?conversationId=${conversationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversation details');
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Conversation fetch error:', error);
      throw error;
    }
  }
  
  // Export conversation as JSON
  exportConversation(): string {
    const data = {
      conversationId: this.conversationId,
      history: this.conversationHistory,
      totalCost: this.getTotalCost(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }
  
  // Import conversation from JSON
  importConversation(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      if (data.conversationId && data.history) {
        this.conversationId = data.conversationId;
        this.conversationHistory = data.history;
        this.totalCost = parseFloat(data.totalCost || '0');
        this.storeConversationLocally();
      }
    } catch (error) {
      console.error('Failed to import conversation:', error);
      throw new Error('Invalid conversation data');
    }
  }
}

// Export singleton instance
export default ChatService.getInstance();