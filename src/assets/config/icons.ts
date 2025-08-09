// Enhanced Centralized Icons Configuration
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
  Youtube,
  TrendingUp,
  CircleDollarSign,
  Menu,
  X
} from 'lucide-react';

// Custom components for icons not available in Lucide
import TikTokIcon from '@/components/icons/TikTokIcon';

// Comprehensive icon mapping for consistent use across components
export const icons = {
  // Navigation icons
  user: User,
  calculator: Calculator,
  document: FileText,
  gift: Gift,
  info: Info,
  message: MessageCircle,
  rates: TrendingUp,
  
  // Contact icons  
  phone: Phone,
  mail: Mail,
  home: Home,
  
  // Social media icons (Lucide versions for consistency)
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  
  // Custom social icons
  tiktok: TikTokIcon,
  
  // Action icons
  dollar: CircleDollarSign,
  
  // UI icons
  menu: Menu,
  close: X
} as const;

// Icon variants for different styles
export const iconVariants = {
  solid: 'solid',
  outline: 'outline', 
  glass: 'glass'
} as const;

// Enhanced icon size standards
export const iconSizes = {
  xs: 12,
  small: 16,
  medium: 20,
  large: 24,
  xl: 32,
  xxl: 48
} as const;

// Helper function to get icon component
export const getIcon = (iconName: keyof typeof icons) => {
  return icons[iconName];
};

// Helper function to get icon size
export const getIconSize = (size: keyof typeof iconSizes) => {
  return iconSizes[size];
};