const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Google Sheets Configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, category, source } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate environment variables
    if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Missing environment variables:', {
        SHEET_ID: !!SHEET_ID,
        EMAIL: !!GOOGLE_SERVICE_ACCOUNT_EMAIL,
        KEY: !!GOOGLE_PRIVATE_KEY
      });
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Initialize Google Sheets
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
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

    console.log('Newsletter signup recorded:', { email, name, category, source });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully signed up for newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Unable to process signup. Please try again or contact hello@mortgagewithford.ca',
      details: error.message
    });
  }
}