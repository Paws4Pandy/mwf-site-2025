// Test script for BrokerMail SMTP integration
// Run with: node test-email.js

const nodemailer = require('nodemailer');

// SMTP Configuration
const SMTP_TOKEN = 'xyx'; // Your BrokerMail SMTP token
const TEST_EMAIL = 'andreina@mortgagewithford.ca';

// Create transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.api.createsend.com',
  port: 587,
  secure: false,
  auth: {
    user: SMTP_TOKEN,
    pass: SMTP_TOKEN, // Same as username for BrokerMail
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test email content
const testEmail = {
  from: '"MortgageWithFord Test" <noreply@mortgagewithford.ca>',
  to: TEST_EMAIL,
  subject: '🧪 Test Email - BrokerMail SMTP Integration',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #61d6c5;">Test Email from MortgageWithFord</h2>
      <p>This is a test email to verify BrokerMail SMTP integration is working correctly.</p>
      
      <h3>Test Details:</h3>
      <ul>
        <li><strong>SMTP Server:</strong> smtp.api.createsend.com</li>
        <li><strong>Port:</strong> 587</li>
        <li><strong>Authentication:</strong> SMTP Token</li>
        <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      
      <h3>Integration Status:</h3>
      <p style="color: green; font-weight: bold;">✅ If you're reading this, the integration is working!</p>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Deploy to Vercel with environment variables</li>
          <li>Test all form types (contact, consultation, playbooks, newsletter)</li>
          <li>Verify auto-responders are working</li>
        </ol>
      </div>
      
      <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated test email from MortgageWithFord.ca<br>
        Powered by BrokerMail SMTP Service
      </p>
    </div>
  `
};

// Send test email
console.log('🚀 Sending test email to:', TEST_EMAIL);
console.log('📧 Using SMTP server:', 'smtp.api.createsend.com:587');

transporter.sendMail(testEmail)
  .then(info => {
    console.log('✅ SUCCESS! Email sent successfully');
    console.log('📨 Message ID:', info.messageId);
    console.log('📬 Response:', info.response);
    console.log('\n🎉 BrokerMail SMTP integration is working correctly!');
  })
  .catch(error => {
    console.error('❌ ERROR! Failed to send email');
    console.error('Error details:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n⚠️  Authentication failed. Please check:');
      console.error('1. Your SMTP token is correct');
      console.error('2. The token is active in BrokerMail dashboard');
      console.error('3. You\'re using the token for both username and password');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n⚠️  Connection failed. Please check:');
      console.error('1. Your internet connection');
      console.error('2. Firewall settings (port 587 should be open)');
      console.error('3. SMTP server address is correct');
    }
    
    console.error('\nFull error:', error);
  });