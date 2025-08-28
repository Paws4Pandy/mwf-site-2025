# Environment Variables Setup

## Required Variables for Google Sheets Integration

Add these to your Vercel environment variables:

### Google Sheets Variables
```env
# Your Google Sheet ID (from the URL)
GOOGLE_SHEET_ID=your_sheet_id_here

# From your service account JSON file - "client_email" field
GOOGLE_SERVICE_ACCOUNT_EMAIL=newsletter-manager@your-project-id.iam.gserviceaccount.com

# From your service account JSON file - "private_key" field
# IMPORTANT: Keep the quotes and \n characters exactly as they are
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nContent\nHere\n-----END PRIVATE KEY-----"
```

### Existing Email Variables (if not already set)
```env
# Your Gmail account
GMAIL_USER=andreina@mortgagewithford.ca

# Your Gmail App Password (not regular password)
GMAIL_APP_PASSWORD=your_16_character_app_password
```

## How to Add to Vercel:

1. Go to your Vercel dashboard
2. Select your project: "mortgage-with-ford-august-2025"
3. Go to Settings > Environment Variables
4. Add each variable:
   - Name: GOOGLE_SHEET_ID
   - Value: [your sheet ID]
   - Environment: Production, Preview, Development (check all)
5. Repeat for each variable
6. Redeploy your site

## Finding Values in JSON File:

Open your downloaded service account JSON file and look for:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "client_email": "newsletter-manager@your-project-id.iam.gserviceaccount.com",  ← Use this for GOOGLE_SERVICE_ACCOUNT_EMAIL
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...lots of text...\n-----END PRIVATE KEY-----\n",  ← Use this for GOOGLE_PRIVATE_KEY
  ...
}
```

## Testing:
After adding variables and redeploying:
1. Go to your Contact page
2. Click "Sign up for the real mortgage news"
3. Fill out the form
4. Check your Google Sheet - data should appear automatically!

## Troubleshooting:
- Make sure service account email has Editor access to the sheet
- Verify all environment variables are set correctly
- Check Vercel function logs if there are errors
- Test in development mode first (simulates success)