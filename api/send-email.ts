import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// SMTP Configuration for BrokerMail
const transporter = nodemailer.createTransporter({
  host: 'smtp.api.createsend.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BROKERMAIL_SMTP_TOKEN,
    pass: process.env.BROKERMAIL_SMTP_TOKEN, // Same as username for BrokerMail
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Email templates
const emailTemplates = {
  playbooks: (data: any) => ({
    subject: `New Playbook Request from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #61d6c5;">New Playbook Notification Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong> ${data.message || 'User requested notification for playbooks'}</p>
        <p><strong>Source:</strong> ${data.source || 'Website'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This email was sent via MortgageWithFord.ca</p>
      </div>
    `
  }),
  
  contact: (data: any) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #61d6c5;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${data.message || 'No message provided'}
        </div>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This email was sent via MortgageWithFord.ca</p>
      </div>
    `
  }),
  
  consultation: (data: any) => ({
    subject: `New Consultation Request from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #61d6c5;">New Consultation Request</h2>
        <h3>Contact Information:</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        
        <h3>Mortgage Details:</h3>
        <p><strong>Purchase Price:</strong> ${data.purchasePrice ? `$${data.purchasePrice.toLocaleString()}` : 'Not provided'}</p>
        <p><strong>Down Payment:</strong> ${data.downPayment ? `$${data.downPayment.toLocaleString()}` : 'Not provided'}</p>
        <p><strong>Employment Status:</strong> ${data.employment || 'Not provided'}</p>
        <p><strong>First Time Buyer:</strong> ${data.firstTimeBuyer ? 'Yes' : 'No'}</p>
        
        <h3>Additional Information:</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${data.message || 'No additional message'}
        </div>
        
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This email was sent via MortgageWithFord.ca</p>
      </div>
    `
  }),
  
  newsletter: (data: any) => ({
    subject: `New Newsletter Subscription from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #61d6c5;">New Newsletter Subscription</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This email was sent via MortgageWithFord.ca</p>
      </div>
    `
  })
};

// Auto-responder templates
const autoResponders = {
  playbooks: (name: string) => ({
    subject: 'Thank you for your interest in our Mortgage Playbooks!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #61d6c5;">Hi ${name}!</h2>
        <p>Thank you for your interest in our free mortgage playbooks!</p>
        <p>We're putting the finishing touches on these valuable resources and will notify you as soon as they're ready.</p>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Use our <a href="https://mortgagewithford.ca/calculator" style="color: #61d6c5;">mortgage calculators</a></li>
          <li>Check current <a href="https://mortgagewithford.ca/rates" style="color: #61d6c5;">mortgage rates</a></li>
          <li>Book a <a href="https://mortgagewithford.ca/meet" style="color: #61d6c5;">consultation</a></li>
        </ul>
        <p>Best regards,<br>Andreina Ford<br>Mortgage Broker</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">MortgageWithFord.ca | andreina@mortgagewithford.ca</p>
      </div>
    `
  }),
  
  contact: (name: string) => ({
    subject: 'Thank you for contacting Mortgage with Ford',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #61d6c5;">Hi ${name}!</h2>
        <p>Thank you for reaching out! I've received your message and will get back to you within 24 hours.</p>
        <p>If you need immediate assistance, feel free to call me directly.</p>
        <p>Best regards,<br>Andreina Ford<br>Mortgage Broker</p>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">MortgageWithFord.ca | andreina@mortgagewithford.ca</p>
      </div>
    `
  })
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { name, email, type, message, ...additionalData } = req.body;

    // Validate required fields
    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }

    // Get the appropriate template
    const templateFunction = emailTemplates[type as keyof typeof emailTemplates];
    if (!templateFunction) {
      return res.status(400).json({ error: 'Invalid email type' });
    }

    const emailContent = templateFunction({ name, email, message, ...additionalData });

    // Send notification email to admin
    await transporter.sendMail({
      from: `"MortgageWithFord Website" <noreply@mortgagewithford.ca>`,
      to: process.env.ADMIN_EMAIL || 'andreina@mortgagewithford.ca',
      replyTo: email,
      ...emailContent
    });

    // Send auto-responder if applicable
    const autoResponder = autoResponders[type as keyof typeof autoResponders];
    if (autoResponder && email) {
      const responderContent = autoResponder(name || 'there');
      await transporter.sendMail({
        from: `"Andreina Ford" <andreina@mortgagewithford.ca>`,
        to: email,
        ...responderContent
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Email sent successfully:', { name, email, type });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}