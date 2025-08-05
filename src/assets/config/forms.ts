export const formConfigs = {
  // Form submission settings
  submission: {
    endpoint: "hello@mortgagewithford.ca", // Gmail endpoint
    method: "POST" as const,
    redirectAfterSubmission: "/guides" // Redirect to downloadable guides page
  },
  
  // Form types and their configurations
  forms: {
    contact: {
      id: "contact-form",
      title: "Contact Form",
      fields: ["name", "email", "phone", "message"],
      required: ["name", "email", "message"],
      emailTemplate: "contact-submission",
      confirmationEmail: true
    },
    
    officeHours: {
      id: "office-hours-form", 
      title: "Join Live Drop-in Office Hours",
      fields: ["name", "email"],
      required: ["name", "email"],
      emailTemplate: "office-hours-signup",
      confirmationEmail: true,
      fromEmail: "andreina@mortgagewithford.ca",
      helpLink: "#what-is-live-drop-in-office-hours"
    },
    
    newsletter: {
      id: "newsletter-form",
      title: "Subscribe for Mortgage Industry Updates", 
      fields: ["name", "email"],
      required: ["name", "email"],
      emailTemplate: "newsletter-signup",
      confirmationEmail: true,
      submitTo: "hello@mortgagewithford.ca"
    },
    
    consultation: {
      id: "consultation-form",
      title: "Book a Consultation",
      fields: ["name", "email", "phone", "propertyType", "timeline", "message"],
      required: ["name", "email", "phone", "timeline"],
      emailTemplate: "consultation-request",
      confirmationEmail: true
    },
    
    preApproval: {
      id: "pre-approval-form", 
      title: "Mortgage Pre-Approval Application",
      fields: ["name", "email", "phone", "income", "downPayment", "propertyValue", "employmentType"],
      required: ["name", "email", "phone", "income", "downPayment"],
      emailTemplate: "pre-approval-application",
      confirmationEmail: true
    }
  },
  
  // Email templates
  emailTemplates: {
    client: {
      subject: "Thank you for contacting Mortgage with Ford",
      body: "Hi {name},\n\nThank you for reaching out! We've received your message and will get back to you within 24 hours.\n\nBest regards,\nAndreina Ford\nMortgage Agent Level 2"
    },
    internal: {
      subject: "New form submission from {name}",
      body: "New {formType} submission received from {name} ({email})"
    }
  }
} as const;