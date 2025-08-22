interface CallForwardRequest {
  customerPhone: string;
  customerName?: string;
  reason?: string;
  conversationId?: string;
  transcriptSummary?: string;
}

interface CallForwardResponse {
  success: boolean;
  callSid?: string;
  status?: string;
  message: string;
  error?: string;
}

class CallForwardService {
  private apiEndpoint: string;
  
  constructor() {
    this.apiEndpoint = process.env.NODE_ENV === 'production'
      ? 'https://mortgage-with-ford-august-2025-qnh7d1eyy.vercel.app/api'
      : 'http://localhost:8080/api';
  }
  
  async forwardCall(request: CallForwardRequest): Promise<CallForwardResponse> {
    try {
      const response = await fetch(`${this.apiEndpoint}/call-forward`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to forward call');
      }
      
      return data;
    } catch (error) {
      console.error('Call forward error:', error);
      return {
        success: false,
        message: 'Failed to connect call',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  // Helper to validate phone number
  validatePhoneNumber(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  }
  
  // Format phone number for display
  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  }
}

export default new CallForwardService();