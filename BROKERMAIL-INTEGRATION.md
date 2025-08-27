# BrokerMail SMTP Integration Guide

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with your BrokerMail SMTP credentials:

```env
BROKERMAIL_SMTP_TOKEN=xyx
ADMIN_EMAIL=andreina@mortgagewithford.ca
NODE_ENV=production
```

### 2. Install Required Dependencies
```bash
npm install nodemailer @vercel/node
```

### 3. Deploy to Vercel
Add these environment variables in your Vercel project settings:
- `BROKERMAIL_SMTP_TOKEN` - Your SMTP token from BrokerMail
- `ADMIN_EMAIL` - Your email address for receiving form submissions

## Integration Details

### SMTP Configuration
- **Server:** smtp.api.createsend.com
- **Port:** 587 (also supports 25, 465, 2525)
- **Authentication:** SMTP token (same for username and password)
- **TLS:** Supported on all ports

### API Endpoint
The email service is available at `/api/send-email`

### Supported Email Types
1. **playbooks** - Playbook notification requests
2. **contact** - General contact form submissions
3. **consultation** - Mortgage consultation requests
4. **newsletter** - Newsletter subscriptions

### Features
- ✅ Auto-responders for each email type
- ✅ HTML email templates with consistent branding
- ✅ Error handling and fallback mechanisms
- ✅ CORS support for frontend integration
- ✅ Development logging

## Frontend Integration

The EmailService class (`src/services/EmailService.ts`) has been updated to use the new API endpoint. Forms will automatically send emails through BrokerMail when deployed.

### Example Usage:
```javascript
import EmailService from '@/services/EmailService';

const result = await EmailService.submitNotification({
  name: 'John Doe',
  email: 'john@example.com',
  type: 'contact',
  message: 'I need help with my mortgage'
});
```

## Testing

### Local Testing
1. Set up your `.env.local` file with your SMTP credentials
2. Run the development server: `npm run dev`
3. Test forms on the website

### Production Testing
After deployment, test each form type:
- Email notification popup (playbooks)
- Contact forms
- Consultation requests
- Newsletter subscriptions

## Security Notes
- Never commit `.env.local` or actual SMTP tokens to version control
- The `.env.example` file shows the structure without sensitive data
- SMTP tokens are stored securely in Vercel environment variables
- All emails include proper authentication and TLS encryption

## Troubleshooting

### Common Issues:
1. **Emails not sending:** Check SMTP token in environment variables
2. **CORS errors:** Ensure SITE_URL is correctly set
3. **Authentication failed:** Verify SMTP token is correct and active

### Email Logs
In development, check the console for email sending logs. In production, check Vercel function logs.

## Support
For issues with BrokerMail SMTP service, contact their support.
For integration issues, check the error logs in Vercel dashboard.