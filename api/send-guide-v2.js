import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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

const guideFiles = {
  'first-time-buyer': 'first-time-buyer-checklist.html',
  'refinance': 'refinance-mortgage-checklist.html',
  'reverse-mortgage': 'reverse-mortgage-education.html',
  'renewal-switching': 'renewal-switching-checklist.html'
};

const guideNames = {
  'first-time-buyer': 'First-Time Home Buyer Checklist',
  'refinance': 'Refinance Mortgage Checklist',
  'reverse-mortgage': 'Reverse Mortgage Education',
  'renewal-switching': 'Renewal & Switching Lenders'
};

const createGuideEmail = (email, guideName, guideContent) => {
  return {
    from: '"Andreina Ford Mortgage Agent" <' + process.env.GMAIL_USER + '>',
    to: email,
    subject: `Your Free ${guideName} - Mortgage with Ford`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ED8071 0%, #da7073 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Your Free ${guideName}</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for your interest!</p>
        </div>

        <div style="background: white; padding: 40px; border: 1px solid #ddd;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Hi there! Here's your free <strong>${guideName}</strong> as requested.
          </p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What's included:</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Step-by-step checklists</li>
              <li>Expert insights and tips</li>
              <li>Important documents to gather</li>
              <li>Common pitfalls to avoid</li>
            </ul>
          </div>

          <div style="border: 2px solid #ED8071; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fff;">
            ${guideContent}
          </div>

          <p style="color: #555; font-size: 16px; margin-top: 30px;">
            <strong>Questions about anything in this guide?</strong><br>
            Call me directly at <a href="tel:6137437866" style="color: #ED8071;">613-743-7866</a> or book a time to chat at <a href="https://callme.mortgagewithford.ca" style="color: #ED8071;">callme.mortgagewithford.ca</a>
          </p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Andreina Ford</strong><br>
            Mortgage Agent Level 2<br>
            Tango ON #13691<br>
            📧 andreina@mortgagewithford.ca<br>
            🌐 <a href="https://www.mortgagewithford.ca" style="color: #ED8071;">www.mortgagewithford.ca</a>
          </p>
        </div>
      </div>
    `
  };
};

export default async function handler(req, res) {
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

  const { guideId, yourEmail, friendEmail } = req.body || {};

  // Simple validation
  if (!guideId || !yourEmail) {
    return res.status(400).json({ error: 'Guide ID and your email are required' });
  }

  // Check if Gmail credentials are configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('Gmail credentials not configured, logging guide request:', {
      guideId, yourEmail, friendEmail, timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Guide request received! (Email service pending configuration)'
    });
  }

  try {
    const transporter = createTransporter();
    const guideName = guideNames[guideId] || 'Mortgage Guide';
    const fileName = guideFiles[guideId];

    if (!fileName) {
      return res.status(400).json({ error: 'Invalid guide ID' });
    }

    // Try to read the guide file
    let guideContent = '';
    try {
      const filePath = path.join(process.cwd(), 'public', 'guides', fileName);
      guideContent = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.log('Could not read guide file, sending notification instead');
      guideContent = `<p>Your ${guideName} is being prepared and will be available shortly. Please check <a href="https://www.mortgagewithford.ca/guides">our guides page</a> or contact me directly.</p>`;
    }

    // Send guide to user
    const userEmail = createGuideEmail(yourEmail, guideName, guideContent);
    await transporter.sendMail(userEmail);

    // Send to friend if provided
    if (friendEmail) {
      const friendEmailObj = createGuideEmail(friendEmail, guideName, guideContent);
      await transporter.sendMail(friendEmailObj);
    }

    // Log successful delivery
    console.log('Guide delivered successfully:', {
      guideId,
      guideName,
      recipients: friendEmail ? [yourEmail, friendEmail] : [yourEmail],
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Guide sent successfully! Check your email.'
    });

  } catch (error) {
    console.error('Guide delivery error:', error);

    return res.status(500).json({
      error: 'Failed to send guide. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}