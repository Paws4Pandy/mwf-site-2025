import { formConfigs } from '@/assets/config/forms';

interface EmailSubmissionData {
  name: string;
  email: string;
  type: 'playbooks' | 'newsletter' | 'contact' | 'consultation';
  source?: string;
  message?: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class EmailService {
  private static readonly FORM_ENDPOINT = 'https://formspree.io/f/xdkoygkr'; // Replace with actual endpoint
  
  static async submitNotification(data: EmailSubmissionData): Promise<EmailResponse> {
    try {
      // Prepare the email data
      const emailData = {
        name: data.name,
        email: data.email,
        type: data.type,
        source: data.source || 'website',
        message: data.message || `${data.name} requested to be notified about ${data.type}`,
        subject: `New ${data.type} notification request from ${data.name}`,
        to: 'hello@mortgagewithford.ca',
        timestamp: new Date().toISOString()
      };

      // For development, we'll use a mock API call
      // In production, this would connect to your email service
      
      // Simulate API call
      const response = await fetch(EmailService.FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        // Also store locally for backup/tracking
        const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
        notifications.push({
          ...emailData,
          id: crypto.randomUUID(),
          submitted: true,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('emailNotifications', JSON.stringify(notifications));

        return {
          success: true,
          message: 'Thank you! We\'ll notify you when the playbooks are ready.'
        };
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Email submission error:', error);
      
      // Fallback to localStorage if API fails
      const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
      notifications.push({
        ...data,
        id: crypto.randomUUID(),
        submitted: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('emailNotifications', JSON.stringify(notifications));

      return {
        success: false,
        message: 'There was an issue submitting your request. Please try emailing us directly.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Method to get form configuration
  static getFormConfig(formType: keyof typeof formConfigs.forms) {
    return formConfigs.forms[formType];
  }

  // Method to get submission endpoint
  static getSubmissionEndpoint() {
    return formConfigs.submission.endpoint;
  }

  // Alternative direct mailto method for backup
  static createMailtoLink(data: EmailSubmissionData): string {
    const subject = encodeURIComponent(`${data.type} notification request`);
    const body = encodeURIComponent(
      `Hi Andreina,\n\nName: ${data.name}\nEmail: ${data.email}\n\nI would like to be notified when ${data.type} become available.\n\nThanks!\n${data.name}`
    );
    return `mailto:hello@mortgagewithford.ca?subject=${subject}&body=${body}`;
  }
}

export default EmailService;