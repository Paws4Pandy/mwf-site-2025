# Twilio Call Forwarding Setup

## Required Environment Variables

Add these to your Vercel environment variables:

```env
# Twilio Account Credentials
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Phone Numbers
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx  # Your Twilio phone number
FORWARD_TO_NUMBER=+16471234567    # Andreina's business phone number

# Vercel URL (automatically set by Vercel)
VERCEL_URL=your-domain.vercel.app
```

## Setup Instructions

### 1. Create a Twilio Account
1. Go to [Twilio.com](https://www.twilio.com)
2. Sign up for a free trial account (includes $15 credit)
3. Verify your phone number

### 2. Get Your Credentials
1. Go to [Twilio Console](https://console.twilio.com)
2. Find your Account SID and Auth Token on the dashboard
3. Copy these values

### 3. Buy a Phone Number
1. In Twilio Console, go to Phone Numbers > Manage > Buy a Number
2. Choose a local number (Toronto area code 416/647/437)
3. Ensure it has Voice capabilities
4. Cost: ~$1.15/month

### 4. Configure Vercel Environment
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add all the variables listed above
4. Deploy to apply changes

### 5. Update Phone Numbers in Code
1. Update `FORWARD_TO_NUMBER` with Andreina's actual business phone
2. Update the display number in `ElevenLabsWithTransfer.tsx`

## Features

### Current Implementation
- **Voice Bot Integration**: ElevenLabs AI handles initial conversation
- **Call Transfer**: Users can request to speak with Andreina
- **Phone Collection**: Secure form to collect customer phone number
- **Automatic Forwarding**: Initiates call to connect customer with Andreina
- **Call Recording**: Optional recording for quality/training
- **Analytics**: Tracks call metrics and conversation data

### How It Works
1. User talks to ElevenLabs voice bot
2. If they need human assistance, they click "Talk to Andreina"
3. They enter their phone number
4. System initiates a call from Twilio to Andreina
5. Once Andreina answers, it connects to the customer
6. Call is optionally recorded for quality purposes

### Alternative: Direct Callback
If you prefer a simpler callback system without Twilio:
1. Collect customer phone number
2. Send notification to Andreina (email/SMS)
3. Andreina calls customer back manually

## Costs

### Twilio Pricing (USD)
- Phone Number: $1.15/month
- Outbound Calls: $0.0085/minute (to/from Canada)
- Recording: $0.0025/minute
- Storage: $0.0005/recording/month

### Example Monthly Costs
- 100 calls × 5 minutes average = 500 minutes
- Call costs: 500 × $0.0085 = $4.25
- Recording: 500 × $0.0025 = $1.25
- Phone number: $1.15
- **Total: ~$6.65/month**

## Testing

1. Test locally with ngrok:
```bash
npm install -g ngrok
ngrok http 8080
```

2. Update Twilio webhook URLs to ngrok URL
3. Test call forwarding functionality
4. Monitor Twilio Console for call logs

## Security Notes

- Never commit Twilio credentials to git
- Use environment variables only
- Validate all phone numbers before forwarding
- Implement rate limiting to prevent abuse
- Consider adding CAPTCHA for production

## Support

- [Twilio Documentation](https://www.twilio.com/docs/voice)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [ElevenLabs Documentation](https://docs.elevenlabs.io)