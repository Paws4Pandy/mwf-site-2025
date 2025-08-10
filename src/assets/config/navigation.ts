// Navigation Configuration
// Centralized navigation structure for consistent menus across components

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  description?: string;
  external?: boolean;
}

// Main navigation menu items
export const mainNavigation: NavItem[] = [
  { 
    name: 'Calculator', 
    href: '/calculator', 
    icon: 'calculator',
    description: 'Run Some Numbers'
  },
  { 
    name: 'Rates', 
    href: '/rates', 
    icon: 'rates',
    description: 'Current Mortgage Rates'
  }
];

// Header-specific navigation (subset for hamburger menu)
export const headerNavigation: NavItem[] = [
  ...mainNavigation,
  { 
    name: 'Liquid Glass Demo', 
    href: '/liquid-glass-test', 
    icon: 'gift',
    description: 'UI Effect Testing'
  }
];

// Footer navigation sections
export const footerNavigation = {
  tools: [
    { name: 'Affordability Calculator', href: '/calculator' },
    { name: 'Current Rates', href: '/rates' }
  ],
  services: [
    { name: 'Book Consultation', href: 'https://callme.mortgagewithford.ca', external: true }
  ],
  help: [
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
  },
  { 
    name: 'Playbooks', 
    href: '/playbooks', 
    icon: 'document'
  }
];