import Anthropic from '@anthropic-ai/sdk';
import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize rate limiter
const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

// System prompt for mortgage/lending context
const SYSTEM_PROMPT = `You are Andreina's AI assistant for Mortgage with Ford, a mortgage brokerage focused on transparency, education, and advocacy for borrowers. 

Your role:
- Provide helpful, educational information about mortgages and home buying
- Explain complex financial concepts in simple terms
- Emphasize transparency and borrower advocacy
- Guide users toward informed decisions without providing specific financial advice
- Be warm, professional, and approachable
- If asked about specific rates or approvals, encourage booking a consultation with Andreina

Important context:
- Andreina Ford is a Level 2 Mortgage Agent
- She specializes in helping first-time buyers, LGBTQ2 families, and complex cases
- Focus on education and empowerment
- Never provide specific loan approvals or rate guarantees
- Always recommend consulting with Andreina for personalized advice

Keep responses concise and conversational for voice interaction.`;

// Token pricing (as of 2024)
const PRICING = {
  'claude-3-haiku': { input: 0.00025, output: 0.00125 }, // per 1K tokens
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  'claude-3-opus': { input: 0.015, output: 0.075 },
};

// Calculate cost based on token usage
function calculateCost(inputTokens, outputTokens, model = 'claude-3-haiku') {
  const pricing = PRICING[model] || PRICING['claude-3-haiku'];
  const inputCost = (inputTokens / 1000) * pricing.input;
  const outputCost = (outputTokens / 1000) * pricing.output;
  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  };
}

// Store conversation in KV store
async function storeConversation(conversationId, message, response, cost, metadata) {
  const conversation = await kv.get(`conversation:${conversationId}`) || { messages: [], totalCost: 0 };
  
  conversation.messages.push({
    timestamp: new Date().toISOString(),
    userMessage: message,
    assistantResponse: response,
    cost,
    metadata,
  });
  
  conversation.totalCost += cost.totalCost;
  conversation.lastUpdated = new Date().toISOString();
  
  // Store conversation with 30-day expiry
  await kv.set(`conversation:${conversationId}`, conversation, { ex: 30 * 24 * 60 * 60 });
  
  // Update daily analytics
  const today = new Date().toISOString().split('T')[0];
  const analytics = await kv.get(`analytics:${today}`) || { 
    totalRequests: 0, 
    totalCost: 0, 
    totalTokens: 0,
    uniqueUsers: new Set(),
  };
  
  analytics.totalRequests += 1;
  analytics.totalCost += cost.totalCost;
  analytics.totalTokens += cost.totalTokens;
  analytics.uniqueUsers.add(conversationId);
  
  await kv.set(`analytics:${today}`, analytics, { ex: 90 * 24 * 60 * 60 }); // 90-day retention
  
  return conversation;
}

export default async function handler(req, res) {
  // CORS headers for your domain
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://mortgage-with-ford-august-2025-qnh7d1eyy.vercel.app' 
    : 'http://localhost:8081'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message, conversationId, context = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Rate limiting
    const identifier = conversationId || req.headers['x-forwarded-for'] || 'anonymous';
    const { success, limit, reset, remaining } = await ratelimit.limit(identifier);
    
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', new Date(reset).toISOString());
    
    if (!success) {
      return res.status(429).json({ 
        error: 'Too many requests. Please wait before trying again.',
        retryAfter: reset - Date.now(),
      });
    }
    
    // Prepare messages for Claude
    const messages = [
      ...context.slice(-5), // Keep last 5 messages for context
      { role: 'user', content: message }
    ];
    
    // Call Claude API
    const startTime = Date.now();
    const completion = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Fast and cost-effective
      system: SYSTEM_PROMPT,
      messages,
      max_tokens: 300, // Keep responses concise for voice
      temperature: 0.7,
      metadata: {
        user_id: conversationId,
      },
    });
    
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    // Extract response
    const response = completion.content[0].text;
    
    // Calculate costs
    const cost = calculateCost(
      completion.usage.input_tokens,
      completion.usage.output_tokens,
      'claude-3-haiku'
    );
    
    // Store conversation and analytics
    if (conversationId) {
      await storeConversation(conversationId, message, response, cost, {
        model: 'claude-3-haiku-20240307',
        latency,
        ip: req.headers['x-forwarded-for'],
      });
    }
    
    // Log for monitoring
    console.log({
      conversationId,
      timestamp: new Date().toISOString(),
      cost: cost.totalCost,
      tokens: cost.totalTokens,
      latency,
    });
    
    // Return response
    res.status(200).json({
      response,
      conversationId: conversationId || `conv_${Date.now()}`,
      usage: {
        inputTokens: completion.usage.input_tokens,
        outputTokens: completion.usage.output_tokens,
        totalTokens: cost.totalTokens,
        cost: {
          input: cost.inputCost.toFixed(6),
          output: cost.outputCost.toFixed(6),
          total: cost.totalCost.toFixed(6),
        },
      },
      latency,
    });
    
  } catch (error) {
    console.error('Claude API Error:', error);
    
    // Handle specific error types
    if (error.status === 401) {
      return res.status(500).json({ 
        error: 'API configuration error. Please contact support.' 
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'API rate limit exceeded. Please try again later.' 
      });
    }
    
    if (error.status === 400) {
      return res.status(400).json({ 
        error: 'Invalid request. Please try rephrasing your question.' 
      });
    }
    
    // Generic error response
    res.status(500).json({ 
      error: 'An error occurred processing your request. Please try again.' 
    });
  }
}