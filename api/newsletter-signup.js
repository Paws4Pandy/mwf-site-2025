import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Google Sheets Configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID; // Your Google Sheet ID
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Initialize Google Sheets client
const initGoogleSheets = async () => {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  
  return doc;
};

// Email notification function
const sendEmailNotification = async (formData) => {
  // Send notification email to you
  const emailResponse = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      type: 'newsletter',
      message: `Newsletter signup from ${formData.source || 'contact page'}`,
      formType: 'newsletter'
    })
  });
  
  return emailResponse.ok;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, category, source } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Initialize Google Sheets
    const doc = await initGoogleSheets();
    
    // Get or create the newsletter sheet
    let sheet = doc.sheetsByTitle['Newsletter Signups'];
    if (!sheet) {
      sheet = await doc.addSheet({ 
        title: 'Newsletter Signups',
        headerValues: ['Name', 'Email', 'Interest Category', 'Signup Date', 'Source Page', 'Status']
      });
    }

    // Add the signup data
    await sheet.addRow({
      'Name': name || '',
      'Email': email,
      'Interest Category': category || 'General',
      'Signup Date': new Date().toISOString(),
      'Source Page': source || 'Contact Page',
      'Status': 'Active'
    });

    // Send email notification (optional - runs in background)
    try {
      await sendEmailNotification({ name, email, category, source });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue anyway - Google Sheets data is more important
    }

    // Track successful signup
    console.log('Newsletter signup recorded:', { email, name, category, source });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully signed up for newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    // Fallback to email-only if Google Sheets fails
    try {
      await sendEmailNotification(req.body);
      return res.status(200).json({ 
        success: true, 
        message: 'Signed up successfully (email backup)' 
      });
    } catch (emailError) {
      console.error('Both Google Sheets and email failed:', emailError);
      return res.status(500).json({ 
        error: 'Unable to process signup. Please try again or contact directly.' 
      });
    }
  }
}