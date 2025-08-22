import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const {
      CallSid,
      CallStatus,
      CallDuration,
      From,
      To,
      Direction,
      Timestamp
    } = req.body;
    
    // Update call status in KV store
    const today = new Date().toISOString().split('T')[0];
    const calls = await kv.get(`calls:${today}`) || [];
    
    // Find and update the call
    const callIndex = calls.findIndex(c => c.callSid === CallSid);
    if (callIndex !== -1) {
      calls[callIndex] = {
        ...calls[callIndex],
        status: CallStatus,
        duration: CallDuration,
        lastUpdated: Timestamp || new Date().toISOString()
      };
    } else {
      // Add new call record if not found
      calls.push({
        callSid: CallSid,
        status: CallStatus,
        duration: CallDuration,
        from: From,
        to: To,
        direction: Direction,
        timestamp: Timestamp || new Date().toISOString()
      });
    }
    
    await kv.set(`calls:${today}`, calls, { ex: 90 * 24 * 60 * 60 });
    
    // Log for monitoring
    console.log({
      action: 'call_status_update',
      callSid: CallSid,
      status: CallStatus,
      duration: CallDuration,
      timestamp: new Date().toISOString()
    });
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Call status update error:', error);
    res.status(500).send('Error processing status update');
  }
}