import nodemailer from 'nodemailer';

// Gmail SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
};

// Admin notification email template
const createAdminNotification = (formData) => {
  const purposeLabels = {
    purchase: 'Purchase a home',
    refinance: 'Refinance mortgage',
    switch: 'Switch lenders',
    transfer: 'Transfer mortgage',
    'debt-consolidation': 'Pay off debt / Consolidate',
    investment: 'Investment property',
    commercial: 'Commercial mortgage',
    general: 'General mortgage advice'
  };

  // Get form type for subject
  const formTypeLabels = {
    contact: 'CONTACT',
    consultation: 'CONSULTATION REQUEST',
    quickQuote: 'QUOTE REQUEST',
    newsletter: 'NEWSLETTER SIGNUP'
  };

  const formTypeLabel = formTypeLabels[formData.type] || 'FORM SUBMISSION';
  const purposeLabel = purposeLabels[formData.purpose] || formData.purpose || 'General Inquiry';

  return {
    from: process.env.GMAIL_USER,
    to: 'andreina@mortgagewithford.ca',
    subject: `🔔 NEW ${formTypeLabel}: ${formData.name} - ${purposeLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; text-align: center;">⚡ NEW ${formTypeLabel}</h2>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 10px 0;">${formData.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${formData.email}" style="color: #4CAF50;">${formData.email}</a></td>
            </tr>
            ${formData.phone ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 10px 0;"><a href="tel:${formData.phone}" style="color: #4CAF50;">${formData.phone}</a></td>
            </tr>
            ` : ''}
            ${formData.purpose ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Purpose:</td>
              <td style="padding: 10px 0;">${purposeLabels[formData.purpose] || formData.purpose}</td>
            </tr>
            ` : ''}
            ${formData.propertyValue ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Property Value:</td>
              <td style="padding: 10px 0;">${formData.propertyValue}</td>
            </tr>
            ` : ''}
            ${formData.downPayment ? `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Down Payment:</td>
              <td style="padding: 10px 0;">${formData.downPayment}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #555;">Submitted:</td>
              <td style="padding: 10px 0;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          ${formData.message ? `
          <h3 style="color: #333; margin-top: 30px;">Additional Details</h3>
          <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #4CAF50;">
            ${formData.message.replace(/\n/g, '<br>')}
          </div>
          ` : ''}
        </div>
        
        <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px;">
          Sent automatically from MortgageWithFord.ca Contact Form
        </div>
      </div>
    `
  };
};

// User confirmation email template
const createUserConfirmation = (formData) => {
  return {
    from: '"Andreina Ford Mortgage Agent" <' + process.env.GMAIL_USER + '>',
    to: formData.email,
    subject: 'Thank you for contacting Mortgage with Ford!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${formData.name}!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your message has been received</p>
        </div>
        
        <div style="background: white; padding: 40px; border: 1px solid #ddd;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for reaching out through my website! I've received your inquiry about 
            <strong>${formData.purpose === 'purchase' ? 'purchasing a home' :
                     formData.purpose === 'refinance' ? 'refinancing your mortgage' :
                     formData.purpose === 'switch' ? 'switching lenders' :
                     formData.purpose === 'transfer' ? 'transferring your mortgage' :
                     formData.purpose === 'debt-consolidation' ? 'debt consolidation' :
                     formData.purpose}</strong>
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>You'll hear from me within 24 hours (usually much sooner!)</li>
              <li>We'll schedule a convenient time to discuss your mortgage needs</li>
            </ul>
          </div>
          
          <p style="color: #555; font-size: 16px; margin-top: 30px;">
            <strong>Need immediate assistance?</strong><br>
            Call me directly at <a href="tel:6137437866" style="color: #667eea;">613-743-7866</a> or book a time in my calendar to chat <a href="https://callme.mortgagewithford.ca" style="color: #667eea;">callme.mortgagewithford.ca</a>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Andreina Ford</strong><br>
            Mortgage Agent Level 2<br>
            BRX Mortgage #13463<br>
            📧 andreina@mortgagewithford.ca<br>
            🌐 <a href="https://www.mortgagewithford.ca" style="color: #667eea;">www.mortgagewithford.ca</a>
          </p>
        </div>
      </div>
    `
  };
};

export default async function handler(req, res) {
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
    const { name, email, type, message, phone, purpose, formType, ...otherFields } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log('Gmail credentials not configured, logging form submission:', {
        name, email, type, phone, purpose, message, timestamp: new Date().toISOString()
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully! (Email service pending configuration)' 
      });
    }

    const transporter = createTransporter();
    
    // Build comprehensive form data object
    const formData = { 
      name, 
      email, 
      type: formType || type || 'contact', 
      message, 
      phone, 
      purpose,
      ...otherFields // Include any additional fields (propertyValue, downPayment, etc.)
    };

    // Send notification email to admin
    const adminEmail = createAdminNotification(formData);
    await transporter.sendMail(adminEmail);

    // Send confirmation email to user
    const confirmationEmail = createUserConfirmation(formData);
    await transporter.sendMail(confirmationEmail);

    console.log('Emails sent successfully to:', {
      admin: 'andreina@mortgagewithford.ca',
      user: email,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Log the submission even if email fails
    console.log('Form submission (email failed):', {
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      phone: req.body.phone,
      purpose: req.body.purpose,
      message: req.body.message,
      error: error.message,
      timestamp: new Date().toISOString()
    });

    return res.status(500).json({ 
      error: 'Failed to send emails. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}