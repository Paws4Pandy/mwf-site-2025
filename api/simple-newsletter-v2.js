export default function handler(req, res) {
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

  const { name, email, category, source } = req.body || {};

  // Simple validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Log signup (appears in Vercel function logs)
  console.log('Newsletter signup:', { name, email, category, source });

  // Return success immediately
  return res.status(200).json({ 
    success: true, 
    message: 'Successfully signed up for newsletter!' 
  });
}