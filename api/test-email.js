import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    console.log('Environment check:', {
      hasUser: !!gmailUser,
      hasPass: !!gmailPass,
      userValue: gmailUser ? gmailUser.substring(0, 5) + '***' : 'missing',
      passValue: gmailPass ? gmailPass.substring(0, 4) + '***' : 'missing'
    });

    if (!gmailUser || !gmailPass) {
      return res.status(500).json({
        error: 'Gmail credentials not configured',
        details: {
          hasUser: !!gmailUser,
          hasPass: !!gmailPass
        }
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    // Verify connection
    await transporter.verify();

    // Send simple test email
    const info = await transporter.sendMail({
      from: gmailUser,
      to: 'andreina@mortgagewithford.ca',
      subject: 'Email Test - MortgageWithFord.ca',
      html: `
        <h2>✅ Email System Test</h2>
        <p>This is a test email to confirm Gmail integration is working.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p>If you receive this, the email system is properly configured!</p>
      `
    });

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email test error:', error);
    return res.status(500).json({
      error: 'Email test failed',
      details: error.message
    });
  }
}