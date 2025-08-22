import twilio from 'twilio';
import { kv } from '@vercel/kv';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const forwardToNumber = process.env.FORWARD_TO_NUMBER; // Andreina's business phone

const client = twilio(accountSid, authToken);

// Store call metadata
async function storeCallData(callData) {
  const today = new Date().toISOString().split('T')[0];
  const calls = await kv.get(`calls:${today}`) || [];
  calls.push({
    ...callData,
    timestamp: new Date().toISOString(),
  });
  await kv.set(`calls:${today}`, calls, { ex: 90 * 24 * 60 * 60 }); // 90-day retention
  return calls;
}

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
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { 
      customerPhone, 
      customerName, 
      reason = 'General Inquiry',
      conversationId,
      transcriptSummary 
    } = req.body;
    
    if (!customerPhone) {
      return res.status(400).json({ error: 'Customer phone number is required' });
    }
    
    // Validate phone number format
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(customerPhone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }
    
    // Create call using Twilio
    const call = await client.calls.create({
      from: twilioPhoneNumber,
      to: forwardToNumber,
      url: `${process.env.VERCEL_URL}/api/call-twiml?customerPhone=${encodeURIComponent(customerPhone)}&customerName=${encodeURIComponent(customerName || 'Customer')}&reason=${encodeURIComponent(reason)}`,
      statusCallback: `${process.env.VERCEL_URL}/api/call-status`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      statusCallbackMethod: 'POST',
      record: true, // Record the call for quality/training
    });
    
    // Store call data
    const callData = {
      callSid: call.sid,
      customerPhone,
      customerName,
      reason,
      conversationId,
      transcriptSummary,
      status: call.status,
      direction: 'outbound-api',
      forwardedTo: forwardToNumber,
    };
    
    await storeCallData(callData);
    
    // Log for monitoring
    console.log({
      action: 'call_forwarded',
      callSid: call.sid,
      timestamp: new Date().toISOString(),
      customerPhone: customerPhone.slice(0, -4) + '****', // Partial masking for privacy
    });
    
    // Return response
    res.status(200).json({
      success: true,
      callSid: call.sid,
      status: call.status,
      message: 'Call is being connected to Andreina Ford',
    });
    
  } catch (error) {
    console.error('Call Forward Error:', error);
    
    // Handle Twilio-specific errors
    if (error.code === 20003) {
      return res.status(401).json({ 
        error: 'Authentication failed. Please check Twilio credentials.' 
      });
    }
    
    if (error.code === 21211) {
      return res.status(400).json({ 
        error: 'Invalid phone number. Please check the number and try again.' 
      });
    }
    
    if (error.code === 21608) {
      return res.status(400).json({ 
        error: 'Phone number is not verified. Please verify the number first.' 
      });
    }
    
    // Generic error response
    res.status(500).json({ 
      error: 'Failed to connect call. Please try again or call directly.' 
    });
  }
}