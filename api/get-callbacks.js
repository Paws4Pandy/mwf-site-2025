import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? 'https://mortgage-with-ford-august-2025-qnh7d1eyy.vercel.app' 
    : 'http://localhost:8080'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get callbacks from the last 7 days
    const callbacks = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      const dayCallbacks = await kv.get(`callbacks:${dateKey}`) || [];
      callbacks.push(...dayCallbacks);
    }
    
    // Sort by timestamp (newest first)
    callbacks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    res.status(200).json({
      success: true,
      callbacks: callbacks.slice(0, 50), // Limit to 50 most recent
      count: callbacks.length
    });
    
  } catch (error) {
    console.error('Get callbacks error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve callbacks' 
    });
  }
}