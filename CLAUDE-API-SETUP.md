# Claude API Integration Setup Guide

This document outlines how to configure and deploy the Claude AI chatbot integration for your mortgage website.

## Required Environment Variables

Add the following environment variables to your Vercel project:

### 1. Anthropic API Key
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Get this from: https://console.anthropic.com/
- Create an account and generate an API key
- Keep this key secure and never commit it to your repository

### 2. Analytics Authentication Secret
```
ANALYTICS_SECRET=your-secure-random-string-here
```
- Generate a secure random string (32+ characters)
- This protects access to your analytics dashboard
- Example: `openssl rand -base64 32`

### 3. Vercel KV Database
The integration uses Vercel KV for data storage. This is automatically configured when you:
1. Go to your Vercel project dashboard
2. Navigate to Storage tab
3. Create a new KV database
4. Vercel will automatically set the required environment variables

## Deployment Steps

### 1. Install Dependencies
```bash
npm install @anthropic-ai/sdk @vercel/kv @upstash/ratelimit uuid @types/uuid
```

### 2. Set Environment Variables in Vercel
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the variables listed above

### 3. Deploy to Production
```bash
npm run build
vercel --prod
```

## Features Overview

### Chat Interface
- **Location**: Bottom-right corner of main page as floating chat button
- **Voice Integration**: Uses browser's speech recognition and synthesis
- **Cost Tracking**: Real-time display of API costs per conversation
- **Conversation Persistence**: Saves conversations locally for 24 hours

### Analytics Dashboard
- **Access**: Navigate to `/analytics` (protected by ANALYTICS_SECRET)
- **Metrics**: Total requests, costs, tokens, unique users
- **Time Periods**: Today, week, month views
- **Export**: Download conversation data and analytics

### Rate Limiting
- **Limit**: 10 requests per minute per user/conversation
- **Protection**: Prevents API abuse and cost overruns
- **Headers**: Returns rate limit info in response headers

## API Endpoints

### `/api/claude`
- **Method**: POST
- **Purpose**: Process chat messages through Claude AI
- **Rate Limited**: Yes (10/min)
- **Authentication**: None (public endpoint)

### `/api/analytics`
- **Method**: GET
- **Purpose**: Retrieve usage analytics
- **Authentication**: Required (Bearer token)
- **Parameters**: `period` (today/week/month), `conversationId` (optional)

## Cost Management

### Token Pricing (Claude 3 Haiku)
- **Input**: $0.00025 per 1K tokens
- **Output**: $0.00125 per 1K tokens
- **Average cost per message**: ~$0.001-0.003

### Cost Controls
- **Max tokens per response**: 300 (keeps responses concise)
- **Rate limiting**: Prevents excessive usage
- **Real-time tracking**: Users see costs as they chat
- **Analytics monitoring**: Track total spending

## Security Considerations

### API Key Protection
- Never expose `ANTHROPIC_API_KEY` in client-side code
- API routes run server-side only
- Keys are automatically secured by Vercel

### Rate Limiting
- Uses Upstash Redis for distributed rate limiting
- Tracks usage by conversation ID and IP
- Returns 429 status when limits exceeded

### CORS Configuration
- Restricted to your domain in production
- Allows localhost for development
- Blocks unauthorized origins

## Monitoring and Maintenance

### Error Handling
- Graceful fallback for API errors
- User-friendly error messages
- Detailed server-side logging

### Analytics Access
```
URL: https://your-domain.com/analytics
Token: Your ANALYTICS_SECRET value
```

### Conversation Recovery
- Conversations saved to localStorage
- 24-hour automatic expiration
- Export functionality for data retention

## Development vs Production

### Development (localhost:8080)
- Uses `http://localhost:3000/api` endpoints
- CORS allows localhost origins
- Same environment variables required

### Production (mortgagewithford.ca)
- Uses `https://mortgagewithford.ca/api` endpoints
- CORS restricted to production domain
- All features enabled

## Troubleshooting

### Common Issues
1. **API Key Error**: Verify ANTHROPIC_API_KEY is set correctly
2. **Rate Limit**: Wait 1 minute if hitting limits
3. **CORS Error**: Check domain configuration in API routes
4. **Analytics Access**: Verify ANALYTICS_SECRET matches

### Debug Information
- Check browser console for client-side errors
- Monitor Vercel function logs for API issues
- Use analytics dashboard to track usage patterns

## Support
For technical issues with the Claude integration, check:
1. Vercel function logs
2. Browser console errors
3. Network tab for API call failures
4. Environment variable configuration

---

*This integration provides a complete AI-powered mortgage assistance chatbot with cost tracking, analytics, and voice capabilities.*