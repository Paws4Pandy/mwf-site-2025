
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, User, FileText, Gift, Info, MessageSquare } from 'lucide-react';

interface NavCardProps {
  title: string;
  description: string;
  icon: 'calculator' | 'user' | 'document' | 'gift' | 'info' | 'message';
  href: string;
  className?: string;
}

const NavCard: React.FC<NavCardProps> = ({
  title,
  description,
  icon,
  href,
  className = ''
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'calculator':
        return <Calculator className="h-6 w-6 text-white" />;
      case 'user':
        return <User className="h-6 w-6 text-white" />;
      case 'document':
        return <FileText className="h-6 w-6 text-white" />;
      case 'gift':
        return <Gift className="h-6 w-6 text-white" />;
      case 'info':
        return <Info className="h-6 w-6 text-white" />;
      case 'message':
        return <MessageSquare className="h-6 w-6 text-white" />;
      default:
        return <Info className="h-6 w-6 text-white" />;
    }
  };
  
  return (
    <Link
      to={href}
      className={`nav-card block p-6 opacity-0 ${className} w-full max-w-sm text-center`}
    >
      <div className="mb-4 w-12 h-12 rounded-full bg-hunter-green mx-auto flex items-center justify-center">
        {getIcon()}
      </div>
      <h3 className="text-xl font-hammersmith font-semibold mb-2 text-hunter-green">{title}</h3>
      <p className="text-hunter-green/80 text-lg font-opensauce">{description}</p>
    </Link>
  );
};

export default NavCard;
