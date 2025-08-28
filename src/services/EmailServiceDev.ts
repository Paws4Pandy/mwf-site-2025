// Development Email Service - Uses mailto: links for testing
// In production, this will be replaced with the actual API calls

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

export class EmailServiceDev {
  // Development mode - use mailto links and localStorage
  static async submitNotification(data: EmailSubmissionData): Promise<EmailResponse> {
    try {
      // Store in localStorage for development testing
      const notifications = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
      const newNotification = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        submitted: true
      };
      
      notifications.push(newNotification);
      localStorage.setItem('emailNotifications', JSON.stringify(notifications));
      
      // Log to console in development
      console.log('📧 Email Submission (Dev Mode):', newNotification);
      
      // In development, auto-open mailto link for testing
      if (data.type === 'contact' || data.type === 'consultation') {
        const subject = encodeURIComponent(`${data.type} request from ${data.name}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\n\nMessage:\n${data.message || 'No message'}`
        );
        
        // Create a hidden link and click it
        const mailtoLink = `mailto:andreina@mortgagewithford.ca?subject=${subject}&body=${body}`;
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      return {
        success: true,
        message: '✅ Email queued successfully (Dev Mode - check localStorage and console)'
      };
      
    } catch (error) {
      console.error('Email submission error:', error);
      return {
        success: false,
        message: 'Failed to submit email (Dev Mode)',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  // Get all stored notifications
  static getStoredNotifications() {
    return JSON.parse(localStorage.getItem('emailNotifications') || '[]');
  }
  
  // Clear all stored notifications
  static clearStoredNotifications() {
    localStorage.removeItem('emailNotifications');
  }
  
  // Create mailto link for manual sending
  static createMailtoLink(data: EmailSubmissionData): string {
    const subject = encodeURIComponent(`${data.type} notification request`);
    const body = encodeURIComponent(
      `Hi Andreina,\n\nName: ${data.name}\nEmail: ${data.email}\n\nI would like to be notified when ${data.type} become available.\n\nMessage: ${data.message || 'No additional message'}\n\nThanks!\n${data.name}`
    );
    return `mailto:andreina@mortgagewithford.ca?subject=${subject}&body=${body}`;
  }
}

export default EmailServiceDev;