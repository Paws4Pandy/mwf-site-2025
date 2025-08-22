import twilio from 'twilio';

const VoiceResponse = twilio.twiml.VoiceResponse;

export default async function handler(req, res) {
  const { customerPhone, customerName, reason } = req.query;
  
  // Create TwiML response
  const twiml = new VoiceResponse();
  
  // Announce the call to Andreina
  twiml.say({
    voice: 'Polly.Joanna',
    language: 'en-US'
  }, `You have an incoming call from ${customerName || 'a website visitor'}. The reason for the call is: ${reason || 'general inquiry'}. Connecting you now.`);
  
  // Brief pause
  twiml.pause({ length: 1 });
  
  // Connect to the customer
  const dial = twiml.dial({
    callerId: process.env.TWILIO_PHONE_NUMBER,
    record: 'record-from-answer',
    recordingStatusCallback: `${process.env.VERCEL_URL}/api/recording-status`,
    timeout: 30,
    action: `${process.env.VERCEL_URL}/api/call-complete`
  });
  
  // Add the customer's phone number
  dial.number({
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    statusCallback: `${process.env.VERCEL_URL}/api/call-status`,
    statusCallbackMethod: 'POST'
  }, customerPhone);
  
  // If the call fails or times out
  twiml.say({
    voice: 'Polly.Joanna',
    language: 'en-US'
  }, 'Sorry, we could not connect the call. Please try again later.');
  
  // Set the content type and send the response
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}