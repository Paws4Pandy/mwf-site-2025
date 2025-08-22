# Notification Setup Guide

## Overview
The system sends instant notifications when someone requests a callback:
- **Email** to: andreina@mortgagewithford.ca
- **SMS** to: 613-743-7866

## Priority Levels
- **🔴 URGENT** - During business hours (Mon-Fri, 9 AM - 6 PM EST)
- **📞 Normal** - After hours (call next business day)

## Email Setup Options

### Option 1: Resend (Recommended - Easiest)
1. Sign up at [Resend.com](https://resend.com) (free tier: 100 emails/day)
2. Get your API key from dashboard
3. Add domain verification for mortgagewithford.ca
4. Add to Vercel environment variables:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Option 2: SendGrid
1. Sign up at [SendGrid.com](https://sendgrid.com) (free tier: 100 emails/day)
2. Create an API key with "Mail Send" permissions
3. Verify sender email address
4. Add to Vercel environment variables:
```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

### Option 3: EmailJS (No Backend Required)
1. Sign up at [EmailJS.com](https://www.emailjs.com)
2. Create email service and template
3. Use directly from frontend (already configured as fallback)

## SMS Setup (via Twilio)

### Setup Steps:
1. Sign up at [Twilio.com](https://www.twilio.com)
2. Get credentials from console dashboard
3. Buy a phone number (Toronto area recommended)
4. Add to Vercel environment variables:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+14165551234
```

### SMS Costs:
- Phone number: $1.15/month
- SMS to Canada: $0.0075/message
- Estimated monthly: ~$5-10

## Environment Variables Summary

Add these to your Vercel project settings:

```env
# Email Notifications (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx           # Option 1: Resend
# OR
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx         # Option 2: SendGrid

# SMS Notifications (optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+14165551234

# Notification Control
EMAIL_NOTIFICATION_ENABLED=true          # Set to false to disable emails
```

## Testing Notifications

1. **Test locally** with environment variables in `.env.local`:
```bash
npm run dev
```

2. **Test callback request**:
   - Go to homepage
   - Click "Talk to Andreina"
   - Fill form and submit
   - Check email and SMS

3. **Monitor logs** in Vercel dashboard for any errors

## Notification Format

### Email Subject:
- Business hours: "🔴 URGENT New Callback Request - [Name]"
- After hours: "📞 New Callback Request - [Name]"

### Email Body:
- Customer name, phone, email
- Request time
- Priority status
- Direct call/email buttons

### SMS Format:
- Business hours: "🔴 URGENT Callback Request\n[Name]\n[Phone]\nCall NOW!"
- After hours: "📞 Callback Request\n[Name]\n[Phone]\nCall next business day"

## Fallback Options

If API services fail, the system:
1. Still saves the callback request
2. Shows success to user
3. Logs to Vercel console
4. You can check admin dashboard at `/callback-admin`

## Quick Start (Minimum Setup)

For immediate notifications without API setup:

1. **Email-to-SMS Gateway** (Free):
   - Most carriers offer email-to-SMS
   - Rogers/Fido: 6137437866@fido.ca
   - Bell: 6137437866@txt.bell.ca
   - Telus: 6137437866@msg.telus.com

2. **Use Webhook** (e.g., Slack, Discord):
   ```env
   NOTIFICATION_WEBHOOK_URL=https://hooks.slack.com/services/xxx
   ```

3. **Manual Check**:
   - Visit `/callback-admin` regularly
   - Password: andreina2024

## Support & Troubleshooting

### Common Issues:

1. **Emails not sending**:
   - Check API key is correct
   - Verify domain/sender email
   - Check Vercel environment variables

2. **SMS not sending**:
   - Verify phone number format (+1 prefix)
   - Check Twilio account balance
   - Ensure phone number is verified

3. **No notifications at all**:
   - Check Vercel function logs
   - Verify environment variables are set
   - Test with console.log debugging

### Testing Without Setup:
Even without email/SMS setup, the system will:
- Save all callback requests
- Show them in admin dashboard
- Log to Vercel console
- Display success to users