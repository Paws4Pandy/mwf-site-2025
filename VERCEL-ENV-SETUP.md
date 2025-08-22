# Vercel Environment Variables Setup

## 🔑 Required Environment Variables

Add these to your Vercel project at: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

### 1. Anthropic API Key
```
ANTHROPIC_API_KEY=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
```
- **Environment**: Production, Preview, Development
- **Type**: Encrypted

### 2. Analytics Secret
```
ANALYTICS_SECRET=Pq44RnZVt/8Dhgktaqpe0jVUUqcrLWfV4oQzv+AUm5E=
```
- **Environment**: Production, Preview, Development  
- **Type**: Encrypted
- **Usage**: Access your analytics dashboard at `/analytics`

## 🗄️ Vercel KV Database Setup

1. **In your Vercel project dashboard**
2. **Go to Storage tab**
3. **Create new KV database**
4. **Vercel automatically adds these environment variables:**
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

## ✅ Features Enabled After Setup

### Claude AI Chatbot
- **Location**: Bottom-right floating button on main page
- **Voice Input**: Speech recognition enabled
- **Voice Output**: Text-to-speech responses
- **Cost Tracking**: Real-time API cost display
- **Rate Limiting**: 10 requests/minute protection

### Analytics Dashboard
- **URL**: https://your-site.com/analytics
- **Access**: Use your `ANALYTICS_SECRET` as password
- **Metrics**: Requests, costs, tokens, users
- **Periods**: Today, week, month views
- **Export**: Download conversation data

### Vercel Analytics
- **Auto-enabled**: Page views, user sessions
- **Dashboard**: Vercel project analytics tab
- **Privacy-friendly**: GDPR compliant

## 🚀 Deploy After Adding Variables

After adding environment variables, redeploy:
```bash
npm run build
vercel --prod
```

Your Claude AI integration will be fully operational!

## 📊 Access Your Analytics

1. **Vercel Analytics**: Project dashboard → Analytics tab
2. **Claude Analytics**: https://your-site.com/analytics (password: your ANALYTICS_SECRET)
3. **Real-time costs**: Visible in chat interface

---

**Live Site**: https://mortgage-with-ford-august-2025-addie5lkk.vercel.app