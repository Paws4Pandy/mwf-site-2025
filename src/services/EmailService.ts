import { formConfigs } from '@/assets/config/forms';

interface EmailSubmissionData {
  name: string;
  email: string;
  type: 'playbooks' | 'newsletter' | 'contact' | 'consultation';
  source?: string;
  message?: string;
  phone?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class EmailService {
  // BrokerMail API endpoint
  private static readonly API_ENDPOINT = '/api/send-email';
  
  static async submitNotification(data: EmailSubmissionData): Promise<EmailResponse> {
    try {
      // Prepare the email data for BrokerMail API
      const emailData = {
        name: data.name,
        email: data.email,
        type: data.type,
        phone: data.phone,
        source: data.source || 'website',
        message: data.message || `${data.name} submitted a ${data.type} form`,
        timestamp: new Date().toISOString()
      };

      // Send to BrokerMail API
      const response = await fetch(EmailService.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: 'Your message has been sent successfully! We\'ll get back to you soon.'
        };
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Email submission error:', error);
      
      // For development, show the error
      if (import.meta.env.DEV) {
        return {
          success: false,
          message: `Email service not available in development. Deploy to Vercel to test emails.`,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
      
      return {
        success: false,
        message: 'Unable to send your message. Please try again or contact us directly at andreina@mortgagewithford.ca',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get form configuration
  static getFormConfig(formType: keyof typeof formConfigs.forms) {
    return formConfigs.forms[formType];
  }
}

export default EmailService;