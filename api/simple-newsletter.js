module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, category, source } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Log the signup (this will appear in Vercel function logs)
    console.log('Newsletter signup:', {
      name: name || 'Not provided',
      email: email,
      category: category || 'General',
      source: source || 'Contact Page',
      timestamp: new Date().toISOString()
    });

    // For now, just return success - we'll add Google Sheets later once this works
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully signed up for newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    return res.status(500).json({ 
      error: 'Unable to process signup. Please try again or contact hello@mortgagewithford.ca'
    });
  }
}