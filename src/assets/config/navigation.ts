// Navigation Configuration
// Centralized navigation structure for consistent menus across components

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  description?: string;
  external?: boolean;
}

// Main navigation menu items - SEO optimized
export const mainNavigation: NavItem[] = [
  {
    name: 'MEET ME',
    href: '/meet',
    icon: 'user',
    description: 'Meet Andreina Ford, experienced Level 2 Mortgage Agent serving Ontario with personalized mortgage solutions and expert guidance'
  },
  {
    name: 'MY STRATEGY',
    href: '/my-strategy',
    icon: 'target',
    description: 'Discover my proven mortgage strategy and personalized approach to securing the best rates and terms for your home financing needs'
  },
  {
    name: 'RATES',
    href: '/rates',
    icon: 'trending-down',
    description: 'Current mortgage rates in Ontario - compare fixed, variable, and specialty mortgage rates updated daily for best financing options'
  },
  {
    name: 'CALCULATORS',
    href: '/calculator',
    icon: 'calculator',
    description: 'Free mortgage calculators - affordability, payment, amortization tools to help plan your home purchase and financing strategy'
  },
  {
    name: 'CONTACT',
    href: '/contact',
    icon: 'mail',
    description: 'Contact Andreina Ford - Ontario mortgage agent ready to help with your home financing needs. Book a consultation or send a message'
  }
];

// Header-specific navigation (uses main navigation)
export const headerNavigation: NavItem[] = [
  ...mainNavigation
];

// Footer navigation sections
export const footerNavigation = {
  tools: [
    { name: 'Affordability Calculator', href: '/calculator' },
    { name: 'Current Rates', href: '/rates' }
  ],
  services: [
    { name: 'Meet Andreina', href: '/meet' },
    { name: 'My Strategy', href: '/my-strategy' },
    { name: 'Specialty Lending', href: '/specialty-lending' },
    { name: 'Book Consultation', href: 'https://callme.mortgagewithford.ca', external: true }
  ],
  help: [
    { name: 'Contact', href: '/contact' },
    { name: 'Book a Call', href: 'https://callme.mortgagewithford.ca', external: true },
    { name: 'Home', href: '/' }
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' }
  ]
};

// Quick actions for hero section
export const heroActions: NavItem[] = [
  { 
    name: 'Book Call', 
    href: 'https://callme.mortgagewithford.ca', 
    icon: 'phone',
    external: true
  },
  { 
    name: 'Start Application', 
    href: 'https://andreina-ford.mtg-app.com/signup?brokerName=andreina.ford&brokerId=7208e0a3-3590-47b7-a99d-4704d9c75268', 
    icon: 'dollar',
    external: true
  }
];