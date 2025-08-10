import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, FileText, Home, TrendingUp, Users, BookOpen } from 'lucide-react';

interface RelatedLink {
  to: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface InternalLinksProps {
  currentPage?: string;
  showTitle?: boolean;
}

const allLinks: Record<string, RelatedLink> = {
  calculator: {
    to: '/calculator',
    label: 'Mortgage Calculator',
    description: 'Calculate your payments and affordability',
    icon: <Calculator className="w-5 h-5" />
  },
  rates: {
    to: '/rates',
    label: 'Current Rates',
    description: 'View today\'s best mortgage rates',
    icon: <TrendingUp className="w-5 h-5" />
  },
  gettingStarted: {
    to: '/getting-started',
    label: 'Getting Started',
    description: 'First steps to your mortgage',
    icon: <Home className="w-5 h-5" />
  },
  resources: {
    to: '/resources',
    label: 'Resources',
    description: 'Learn about mortgages',
    icon: <BookOpen className="w-5 h-5" />
  },
  meet: {
    to: '/meet',
    label: 'About Andreina',
    description: 'Meet your mortgage expert',
    icon: <Users className="w-5 h-5" />
  },
  playbooks: {
    to: '/playbooks',
    label: 'Mortgage Playbooks',
    description: 'Step-by-step guides',
    icon: <FileText className="w-5 h-5" />
  },
  contact: {
    to: '/contact',
    label: 'Contact',
    description: 'Get in touch today',
    icon: <ArrowRight className="w-5 h-5" />
  }
};

const pageRecommendations: Record<string, string[]> = {
  '/': ['calculator', 'rates', 'gettingStarted', 'meet'],
  '/calculator': ['rates', 'gettingStarted', 'resources', 'contact'],
  '/rates': ['calculator', 'gettingStarted', 'playbooks', 'contact'],
  '/getting-started': ['calculator', 'rates', 'resources', 'meet'],
  '/resources': ['calculator', 'playbooks', 'gettingStarted', 'contact'],
  '/meet': ['gettingStarted', 'calculator', 'rates', 'contact'],
  '/playbooks': ['calculator', 'resources', 'rates', 'contact'],
  '/contact': ['calculator', 'rates', 'meet', 'resources']
};

export const InternalLinks: React.FC<InternalLinksProps> = ({ 
  currentPage = '/', 
  showTitle = true 
}) => {
  const recommendations = pageRecommendations[currentPage] || ['calculator', 'rates', 'meet', 'contact'];
  const links = recommendations.map(key => allLinks[key]).filter(Boolean);

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-light-azure/20 to-light-crimson/10">
      <div className="max-w-6xl mx-auto">
        {showTitle && (
          <div className="text-center mb-8">
            <h3 className="font-hammersmith text-2xl text-hunter-green mb-2">
              Explore More
            </h3>
            <p className="text-gray-600">
              Helpful resources for your mortgage journey
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-muted-red/30"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-light-azure rounded-lg text-hunter-green group-hover:bg-muted-red group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-pure-black group-hover:text-muted-red transition-colors mb-1">
                    {link.label}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Breadcrumb component for better navigation
interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="text-gray-500 hover:text-muted-red transition-colors"
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li className="text-gray-400">/</li>
              <li>
                {item.to ? (
                  <Link 
                    to={item.to}
                    className="text-gray-500 hover:text-muted-red transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-pure-black font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </nav>
  );
};