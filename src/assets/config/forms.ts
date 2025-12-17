// Form field types and configurations
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface FormType {
  id: string;
  title: string;
  subtitle: string;
  fields: FormField[];
  submitButtonText: string;
  apiEndpoint: string;
  successMessage: string;
  privacyNote?: string;
  emailTemplate: string;
  confirmationEmail: boolean;
}

// Centralized form configurations
export const FORM_TYPES: Record<string, FormType> = {
  contact: {
    id: 'contact',
    title: "Let's Talk Mortgages",
    subtitle: "Get personalized advice for your mortgage needs",
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@email.com',
        required: true
      },
      {
        name: 'phone',
        label: 'Phone (Optional)',
        type: 'tel',
        placeholder: '(555) 123-4567',
        required: false
      },
      {
        name: 'purpose',
        label: 'What would you like to do?',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select an option' },
          { value: 'purchase', label: 'Purchase a home' },
          { value: 'refinance', label: 'Refinance my mortgage' },
          { value: 'switch', label: 'Switch lenders' },
          { value: 'transfer', label: 'Transfer my mortgage' },
          { value: 'debt-consolidation', label: 'Pay off debt / Consolidate' }
        ]
      }
    ],
    submitButtonText: 'Send Message',
    apiEndpoint: '/api/send-email',
    successMessage: "Thank you for reaching out! I'll get back to you within 24 hours.",
    privacyNote: "Your information is secure and will never be shared.",
    emailTemplate: 'contact-submission',
    confirmationEmail: true
  },
  
  consultation: {
    id: 'consultation',
    title: "Book a Consultation",
    subtitle: "Schedule a personalized mortgage consultation",
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@email.com',
        required: true
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: '(555) 123-4567',
        required: true
      },
      {
        name: 'purpose',
        label: 'Consultation Type',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select consultation type' },
          { value: 'purchase', label: 'First-time home buyer' },
          { value: 'refinance', label: 'Refinancing consultation' },
          { value: 'investment', label: 'Investment property' },
          { value: 'commercial', label: 'Commercial mortgage' },
          { value: 'general', label: 'General mortgage advice' }
        ]
      },
      {
        name: 'message',
        label: 'Additional Details (Optional)',
        type: 'textarea',
        placeholder: 'Tell me more about your mortgage needs...',
        required: false
      }
    ],
    submitButtonText: 'Book Consultation',
    apiEndpoint: '/api/send-email',
    successMessage: "Consultation request received! I'll contact you to schedule our meeting.",
    privacyNote: "Your information is confidential and secure.",
    emailTemplate: 'consultation-request',
    confirmationEmail: true
  },
  
  quickQuote: {
    id: 'quickQuote',
    title: "Get a Quick Quote",
    subtitle: "Receive a preliminary mortgage estimate",
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@email.com',
        required: true
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: '(555) 123-4567',
        required: true
      },
      {
        name: 'propertyValue',
        label: 'Property Value',
        type: 'text',
        placeholder: '$500,000',
        required: true
      },
      {
        name: 'downPayment',
        label: 'Down Payment',
        type: 'text',
        placeholder: '$100,000',
        required: true
      },
      {
        name: 'purpose',
        label: 'Mortgage Type',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select mortgage type' },
          { value: 'purchase', label: 'Purchase' },
          { value: 'refinance', label: 'Refinance' },
          { value: 'switch', label: 'Switch/Transfer' }
        ]
      }
    ],
    submitButtonText: 'Get Quote',
    apiEndpoint: '/api/send-email',
    successMessage: "Quote request received! I'll send you a detailed estimate soon.",
    privacyNote: "Your financial information is kept strictly confidential.",
    emailTemplate: 'quote-request',
    confirmationEmail: true
  },

  newsletter: {
    id: 'newsletter',
    title: "Stay Updated",
    subtitle: "Get mortgage industry updates and tips",
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@email.com',
        required: true
      }
    ],
    submitButtonText: 'Subscribe',
    apiEndpoint: '/api/send-email',
    successMessage: "Thanks for subscribing! You'll receive valuable mortgage insights.",
    privacyNote: "We respect your privacy and will never spam you.",
    emailTemplate: 'newsletter-signup',
    confirmationEmail: true
  }
};

// Utility functions
export const getFormType = (formTypeId: string): FormType | null => {
  return FORM_TYPES[formTypeId] || null;
};

export const getDefaultFormData = (formType: FormType): Record<string, string> => {
  const defaultData: Record<string, string> = {};
  formType.fields.forEach(field => {
    defaultData[field.name] = '';
  });
  return defaultData;
};

// Legacy export for backward compatibility
export const formConfigs = {
  submission: {
    endpoint: "hello@mortgagewithford.ca",
    method: "POST" as const,
    redirectAfterSubmission: "/contact"
  },
  forms: FORM_TYPES
} as const;