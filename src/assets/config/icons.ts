// Centralized Icons Configuration
// Single source for all icons used across the application

import { 
  User, 
  Calculator, 
  FileText, 
  Gift, 
  Info, 
  MessageCircle,
  Phone,
  Mail,
  Home,
  Instagram,
  Facebook,
  Linkedin,
  CircleDollarSign
} from 'lucide-react';

// Icon mapping for consistent use across components
export const icons = {
  // Navigation icons
  user: User,
  calculator: Calculator,
  document: FileText,
  gift: Gift,
  info: Info,
  message: MessageCircle,
  
  // Contact icons  
  phone: Phone,
  mail: Mail,
  home: Home,
  
  // Social media icons
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  
  // Action icons
  dollar: CircleDollarSign
} as const;

// Helper function to get icon component
export const getIcon = (iconName: keyof typeof icons) => {
  return icons[iconName];
};

// Icon size standards
export const iconSizes = {
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 48
} as const;