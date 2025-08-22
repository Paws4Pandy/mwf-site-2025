import { kv } from '@vercel/kv';
import twilio from 'twilio';

// Initialize Twilio for SMS (optional - only if you have Twilio set up)
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

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
    const { name, phone, email, timestamp, isBusinessHours } = req.body;
    
    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Name, phone, and email are required' });
    }
    
    // Store callback request
    const today = new Date().toISOString().split('T')[0];
    const callbacks = await kv.get(`callbacks:${today}`) || [];
    
    const callbackRequest = {
      id: `callback_${Date.now()}`,
      name,
      phone,
      email,
      timestamp: timestamp || new Date().toISOString(),
      isBusinessHours,
      status: 'pending',
      source: 'voice-bot'
    };
    
    callbacks.push(callbackRequest);
    await kv.set(`callbacks:${today}`, callbacks, { ex: 30 * 24 * 60 * 60 }); // 30-day retention
    
    // Format time for notifications
    const formattedTime = new Date(timestamp).toLocaleString('en-US', { 
      timeZone: 'America/Toronto',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    // Send notifications in parallel
    const notifications = [];
    
    // 1. EMAIL NOTIFICATION to andreina@mortgagewithford.ca
    if (process.env.EMAIL_NOTIFICATION_ENABLED !== 'false') {
      notifications.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Mortgage with Ford <notifications@mortgagewithford.ca>',
            to: 'andreina@mortgagewithford.ca',
            subject: `${isBusinessHours ? '🔴 URGENT' : '📞'} New Callback Request - ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #8c3839;">${isBusinessHours ? '🔴 URGENT - Business Hours Request' : 'New Callback Request'}</h2>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Time:</strong> ${formattedTime}</p>
                  <p><strong>Status:</strong> ${isBusinessHours ? 'Business Hours - Call ASAP' : 'After Hours - Call Next Business Day'}</p>
                </div>
                <div style="margin-top: 20px;">
                  <a href="tel:${phone}" style="background: #8c3839; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Call Now</a>
                  <a href="mailto:${email}" style="background: #666; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-left: 10px;">Send Email</a>
                </div>
              </div>
            `,
            text: `New Callback Request${isBusinessHours ? ' (URGENT - Business Hours)' : ''}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nTime: ${formattedTime}`
          })
        }).catch(err => {
          console.error('Email notification failed:', err);
          return null;
        })
      );
    }
    
    // 2. SMS NOTIFICATION to 613-743-7866 (if Twilio is configured)
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      const smsMessage = isBusinessHours
        ? `🔴 URGENT Callback Request\n${name}\n${phone}\nCall NOW!`
        : `📞 Callback Request\n${name}\n${phone}\nCall next business day`;
      
      notifications.push(
        twilioClient.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+16137437866'
        }).catch(err => {
          console.error('SMS notification failed:', err);
          return null;
        })
      );
    }
    
    // 3. BACKUP: Simple email using form submission (works without API keys)
    if (!process.env.RESEND_API_KEY && !process.env.SENDGRID_API_KEY) {
      // Log for backup notification method
      console.log('CALLBACK REQUEST - MANUAL NOTIFICATION NEEDED:', {
        name,
        phone,
        email,
        timestamp: formattedTime,
        priority: isBusinessHours ? 'HIGH - CALL NOW' : 'NORMAL'
      });
    }
    
    // Execute all notifications in parallel
    await Promise.allSettled(notifications);
    
    res.status(200).json({
      success: true,
      message: isBusinessHours 
        ? 'Callback request received. Andreina will call you shortly.'
        : 'Callback request received. Andreina will call you during business hours.',
      requestId: callbackRequest.id
    });
    
  } catch (error) {
    console.error('Callback request error:', error);
    res.status(500).json({ 
      error: 'Failed to process callback request. Please try again.' 
    });
  }
}