import { kv } from '@vercel/kv';

// API endpoint to retrieve analytics data
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://mortgage-with-ford-august-2025-qnh7d1eyy.vercel.app' 
    : 'http://localhost:8081'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { period = 'today', conversationId } = req.query;
    
    // Check authorization (you should implement proper auth)
    const authToken = req.headers.authorization;
    if (!authToken || authToken !== `Bearer ${process.env.ANALYTICS_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Get specific conversation data
    if (conversationId) {
      const conversation = await kv.get(`conversation:${conversationId}`);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      return res.status(200).json(conversation);
    }
    
    // Get analytics based on period
    let analytics = {};
    const today = new Date().toISOString().split('T')[0];
    
    switch (period) {
      case 'today':
        analytics = await kv.get(`analytics:${today}`) || {
          totalRequests: 0,
          totalCost: 0,
          totalTokens: 0,
          uniqueUsers: 0,
        };
        break;
        
      case 'week':
        analytics = {
          totalRequests: 0,
          totalCost: 0,
          totalTokens: 0,
          uniqueUsers: new Set(),
          dailyBreakdown: [],
        };
        
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayData = await kv.get(`analytics:${dateStr}`) || {
            totalRequests: 0,
            totalCost: 0,
            totalTokens: 0,
            uniqueUsers: new Set(),
          };
          
          analytics.totalRequests += dayData.totalRequests;
          analytics.totalCost += dayData.totalCost;
          analytics.totalTokens += dayData.totalTokens;
          
          if (dayData.uniqueUsers) {
            dayData.uniqueUsers.forEach(user => analytics.uniqueUsers.add(user));
          }
          
          analytics.dailyBreakdown.push({
            date: dateStr,
            ...dayData,
            uniqueUsers: dayData.uniqueUsers ? dayData.uniqueUsers.size : 0,
          });
        }
        
        analytics.uniqueUsers = analytics.uniqueUsers.size;
        break;
        
      case 'month':
        analytics = {
          totalRequests: 0,
          totalCost: 0,
          totalTokens: 0,
          uniqueUsers: new Set(),
          dailyBreakdown: [],
        };
        
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayData = await kv.get(`analytics:${dateStr}`) || {
            totalRequests: 0,
            totalCost: 0,
            totalTokens: 0,
            uniqueUsers: new Set(),
          };
          
          analytics.totalRequests += dayData.totalRequests;
          analytics.totalCost += dayData.totalCost;
          analytics.totalTokens += dayData.totalTokens;
          
          if (dayData.uniqueUsers) {
            dayData.uniqueUsers.forEach(user => analytics.uniqueUsers.add(user));
          }
          
          if (i < 30) { // Only include last 30 days in breakdown
            analytics.dailyBreakdown.push({
              date: dateStr,
              ...dayData,
              uniqueUsers: dayData.uniqueUsers ? dayData.uniqueUsers.size : 0,
            });
          }
        }
        
        analytics.uniqueUsers = analytics.uniqueUsers.size;
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid period. Use: today, week, or month' });
    }
    
    // Calculate average cost per request
    if (analytics.totalRequests > 0) {
      analytics.averageCostPerRequest = (analytics.totalCost / analytics.totalRequests).toFixed(6);
      analytics.averageTokensPerRequest = Math.round(analytics.totalTokens / analytics.totalRequests);
    }
    
    // Format costs
    analytics.totalCost = analytics.totalCost ? analytics.totalCost.toFixed(6) : '0.000000';
    
    res.status(200).json({
      period,
      data: analytics,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Analytics API Error:', error);
    res.status(500).json({ 
      error: 'An error occurred fetching analytics data.' 
    });
  }
}