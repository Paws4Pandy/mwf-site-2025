# Email Form Setup - BrokerMail Integration

## ✅ Configuration Complete

Your email forms are now configured to use **BrokerMail SMTP** exclusively. All form submissions will send immediate email alerts to `andreina@mortgagewithford.ca`.

## 🚀 How It Works

### In Development (Local)
- Forms will show: "Email service not available in development. Deploy to Vercel to test emails."
- This is normal - the BrokerMail API only works when deployed to Vercel

### In Production (Vercel)
- All form submissions go directly to BrokerMail
- You'll receive instant email notifications with:
  - 🔔 Eye-catching subject lines with emojis
  - Color-coded headers by form type
  - Clickable email and phone links
  - Clear formatting for easy reading

## 📧 Email Alert Types

1. **🔔 Playbook Requests** - Red header, high priority
2. **🔔 Contact Forms** - Green header, standard priority  
3. **🚨 Consultation Requests** - Orange header, URGENT priority
4. **📧 Newsletter Signups** - Blue header, informational

## 🧪 Testing Your Forms

### To Test in Production:
1. Deploy to Vercel: `vercel --prod`
2. Visit your live site
3. Submit a test form
4. Check your email at `andreina@mortgagewithford.ca`

### Test Page Available At:
- Development: http://localhost:8080/test-email-forms
- Production: https://yourdomain.com/test-email-forms

## 🔧 Environment Variables Required

Already configured in your `.env.local`:
```
BROKERMAIL_SMTP_TOKEN=bdb3c063-1f54-499a-88e5-0c7c80e2bc45
ADMIN_EMAIL=andreina@mortgagewithford.ca
```

## ⚠️ Important Notes

- **No backup systems** - Only BrokerMail is used
- **No Formspree** - Removed as requested
- **No localStorage fallback in production** - Direct email only
- All emails go to `andreina@mortgagewithford.ca`
- Auto-responders are sent to users who submit forms

## 📱 Form Locations in Your Site

- **Email Popup**: Playbooks page (Coming Soon sections)
- **Contact Form**: Contact page (when created)
- **Consultation Form**: Meet page (when added)
- **Newsletter**: Footer or dedicated section (when added)

## 🛠️ Troubleshooting

If emails aren't arriving:
1. Check Vercel deployment logs
2. Verify environment variables are set in Vercel dashboard
3. Check spam/junk folder
4. Ensure BrokerMail token is valid

## 📞 Need Help?

The email system is fully configured. Deploy to Vercel to start receiving form submission alerts!