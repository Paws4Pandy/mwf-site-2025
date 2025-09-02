const nodemailer = require('nodemailer');

// Gmail SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Guide information
const guideInfo = {
  'first-time-buyer': {
    title: 'First-Time Home Buyer Checklist',
    fileName: 'first-time-buyer-checklist.pdf',
    description: 'Everything you need to know about buying your first home in Canada'
  },
  'refinance': {
    title: 'Refinance Mortgage Checklist', 
    fileName: 'refinance-mortgage-checklist.pdf',
    description: 'Complete guide to refinancing your mortgage for better rates or equity access'
  },
  'reverse-mortgage': {
    title: 'Reverse Mortgage Education',
    fileName: 'reverse-mortgage-education.pdf', 
    description: 'Understanding reverse mortgages for Canadian homeowners 55+'
  },
  'renewal-switching': {
    title: 'Renewal & Switching Lenders',
    fileName: 'renewal-switching-checklist.pdf',
    description: 'Navigate mortgage renewals and find better rates with new lenders'
  }
};

// Guide email template
const createGuideEmail = (yourEmail, friendEmail, guideId) => {
  const guide = guideInfo[guideId];
  const recipient = friendEmail || yourEmail;
  const isForFriend = !!friendEmail;
  
  return {
    from: '"Andreina Ford - Mortgage Agent" <' + process.env.GMAIL_USER + '>',
    to: recipient,
    subject: `📋 Free Mortgage Guide: ${guide.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">📋 Your Free Mortgage Guide</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${guide.title}</p>
        </div>
        
        <div style="background: white; padding: 40px; border: 1px solid #ddd;">
          ${isForFriend ? `
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              <strong>${yourEmail}</strong> thought you might find this mortgage guide helpful!
            </p>
          ` : ''}
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h2 style="color: #333; margin-top: 0; font-size: 22px;">${guide.title}</h2>
            <p style="color: #666; margin: 15px 0; font-size: 16px;">${guide.description}</p>
            
            <div style="margin: 30px 0;">
              <a href="https://mortgagewithford.ca/guides/${guide.fileName.replace('.pdf', '.html')}" 
                 style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
                📖 View Guide Online
              </a>
            </div>
            
            <p style="color: #888; font-size: 14px; margin: 20px 0 0 0;">
              You can also <a href="https://mortgagewithford.ca/guides" style="color: #667eea;">browse all our free guides</a> on our website.
            </p>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0; font-size: 18px;">💡 Need Personalized Help?</h3>
            <p style="color: #856404; margin: 10px 0; font-size: 15px;">
              Every mortgage situation is unique. I'm here to help you navigate your specific needs.
            </p>
            <p style="color: #856404; margin: 10px 0; font-size: 15px;">
              📞 <strong>Call:</strong> <a href="tel:6137437866" style="color: #856404;">613-743-7866</a><br>
              📅 <strong>Book a call:</strong> <a href="https://callme.mortgagewithford.ca" style="color: #856404;">callme.mortgagewithford.ca</a>
            </p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Andreina Ford</strong><br>
            Mortgage Agent Level 2 • BRX Mortgage #13463<br>
            📧 andreina@mortgagewithford.ca<br>
            🌐 <a href="https://www.mortgagewithford.ca" style="color: #667eea;">mortgagewithford.ca</a>
          </p>
        </div>
      </div>
    `
  };
};

// Admin notification for guide requests
const createAdminGuideNotification = (yourEmail, friendEmail, guideId) => {
  const guide = guideInfo[guideId];
  
  return {
    from: process.env.GMAIL_USER,
    to: 'andreina@mortgagewithford.ca',
    subject: `📋 Guide Request: ${guide.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; text-align: center;">📋 NEW GUIDE REQUEST</h2>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd;">
          <h3 style="color: #333; margin-top: 0;">Guide Requested</h3>
          <p style="font-size: 16px; color: #333;"><strong>${guide.title}</strong></p>
          
          <h3 style="color: #333; margin-top: 30px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Requester Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${yourEmail}" style="color: #4CAF50;">${yourEmail}</a></td>
            </tr>
            ${friendEmail ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Friend's Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${friendEmail}" style="color: #4CAF50;">${friendEmail}</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Requested:</td>
              <td style="padding: 10px 0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
          Sent automatically from MortgageWithFord.ca Guide System
        </div>
      </div>
    `
  };
};

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { guideId, yourEmail, friendEmail } = req.body;

    // Validate required fields
    if (!guideId || !yourEmail) {
      return res.status(400).json({ error: 'Guide ID and your email are required' });
    }

    // Validate guide exists
    if (!guideInfo[guideId]) {
      return res.status(400).json({ error: 'Invalid guide ID' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(yourEmail) || (friendEmail && !emailRegex.test(friendEmail))) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('Gmail credentials not configured, logging guide request:', {
        guideId, yourEmail, friendEmail, timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Guide request submitted successfully! (Email service pending configuration)' 
      });
    }

    const transporter = createTransporter();

    // Send guide email to user/friend
    const guideEmail = createGuideEmail(yourEmail, friendEmail, guideId);
    await transporter.sendMail(guideEmail);

    // Send notification to admin
    const adminNotification = createAdminGuideNotification(yourEmail, friendEmail, guideId);
    await transporter.sendMail(adminNotification);

    console.log('Guide emails sent successfully:', {
      guideId,
      recipient: friendEmail || yourEmail,
      requester: yourEmail,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Guide sent successfully! Check your email.' 
    });

  } catch (error) {
    console.error('Guide email sending error:', error);
    
    // Log the request even if email fails
    console.log('Guide request (email failed):', {
      guideId: req.body.guideId,
      yourEmail: req.body.yourEmail,
      friendEmail: req.body.friendEmail,
      error: error.message,
      timestamp: new Date().toISOString()
    });

    return res.status(500).json({ 
      error: 'Failed to send guide. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}