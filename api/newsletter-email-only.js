import nodemailer from 'nodemailer';

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

// Enhanced email template with organized data
const createNewsletterNotification = (formData) => {
  const categoryLabels = {
    'First-Time Buyer': '🏠 First-Time Home Buyer',
    'Investment Properties': '🏢 Investment Properties',
    'Refinancing': '🔄 Refinancing',
    'Renewal': '📋 Mortgage Renewal',
    'Self-Employed': '💼 Self-Employed Mortgages',
    'Cottage/Vacation': '🏖️ Cottage & Vacation Properties',
    'Rate Updates': '📊 Rate Updates & Market News',
    'General': '📝 General Mortgage Advice'
  };

  const categoryIcon = categoryLabels[formData.category] || '📝 General';
  const signupDate = new Date().toLocaleString();

  return {
    from: process.env.GMAIL_USER,
    to: 'andreina@mortgagewithford.ca',
    subject: `📧 NEW NEWSLETTER SIGNUP: ${formData.name || formData.email} - ${categoryIcon}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #ED8071; border-radius: 12px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ED8071, #8c3839); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">📧 NEW NEWSLETTER SIGNUP</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">${categoryIcon}</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 25px; background: #f9f9f9;">
          <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #ED8071; margin-top: 0; border-bottom: 2px solid #ED8071; padding-bottom: 10px;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #555; width: 30%;">👤 Name:</td>
                <td style="padding: 12px 0; font-size: 16px;">${formData.name || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #555;">📧 Email:</td>
                <td style="padding: 12px 0;"><a href="mailto:${formData.email}" style="color: #ED8071; text-decoration: none; font-weight: bold;">${formData.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #555;">🎯 Interest:</td>
                <td style="padding: 12px 0; font-size: 16px;">${categoryIcon}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 12px 0; font-weight: bold; color: #555;">📍 Source:</td>
                <td style="padding: 12px 0;">${formData.source || 'Contact Page'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #555;">📅 Date:</td>
                <td style="padding: 12px 0;">${signupDate}</td>
              </tr>
            </table>
          </div>

          <!-- Quick Actions -->
          <div style="background: white; border-radius: 8px; padding: 20px;">
            <h3 style="color: #ED8071; margin-top: 0;">🚀 Quick Actions</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="mailto:${formData.email}?subject=Welcome%20to%20MortgageWithFord%20Newsletter!&body=Hi%20${formData.name || 'there'},%0D%0A%0D%0AThank%20you%20for%20signing%20up%20for%20our%20newsletter!" 
                 style="background: #ED8071; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
                📧 Send Welcome Email
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1XrFZhHRtNYFERE2CKFtfFKJjikfIVlF4eLY0RmiP_Wo/edit" 
                 style="background: #4CAF50; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
                📊 Add to Sheet Manually
              </a>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
          📬 Newsletter Signup from MortgageWithFord.ca<br>
          Copy this data to your Google Sheet: <strong>${formData.name || 'N/A'}</strong> | <strong>${formData.email}</strong> | <strong>${formData.category || 'General'}</strong> | <strong>${signupDate}</strong>
        </div>
      </div>
    `
  };
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

    // Create transporter and send email
    const transporter = createTransporter();
    const emailOptions = createNewsletterNotification({ name, email, category, source });
    
    await transporter.sendMail(emailOptions);

    // Log successful signup
    console.log('Newsletter signup recorded via email:', { email, name, category, source });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully signed up for newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter signup error:', error);
    return res.status(500).json({ 
      error: 'Unable to process signup. Please try again.' 
    });
  }
}