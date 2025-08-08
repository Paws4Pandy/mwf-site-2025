// Contact Configuration
// Centralized contact information and CTAs

export const CONTACT_CONFIG = {
  // Primary contact information
  email: 'ask@mortgagewithford.ca',
  phone: '6137437866',
  
  // Application and booking URLs
  applicationUrl: 'https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268',
  bookingUrl: 'https://callme.mortgagewithford.ca',
  
  // Call-to-action text
  cta: {
    primary: 'Start Application',
    secondary: 'Book Call',
    calculator: 'Get Pre-Approved'
  },
  
  // Professional details
  agent: {
    name: 'Andreina Ford',
    title: 'Mortgage Agent Level 2',
    license: 'M24000357',
    brokerage: 'BRX Mortgage',
    brokerageNumber: '#13463'
  }
} as const;