
import React from 'react';
import { ResourceGroup, Resource } from './ResourceList';

const ResourcesSection = () => {
  const regulatoryResources: Resource[] = [
    { 
      name: "FSRA (Financial Services Regulatory Authority of Ontario)",
      description: "Licensing, conduct rules, consumer protection, and enforcement.",
      url: "https://www.fsrao.ca"
    },
    { 
      name: "MBLAA (Mortgage Brokerages, Lenders and Administrators Act, 2006)",
      description: "Core legislation governing mortgage professionals in Ontario.",
      url: "https://www.ontario.ca/laws/statute/06m29"
    },
    { 
      name: "RECO (Real Estate Council of Ontario)",
      description: "Relevant if real estate and mortgage overlap; consumer protection in real estate.",
      url: "https://www.reco.on.ca"
    },
    { 
      name: "FCA (Financial Consumer Agency of Canada)",
      description: "Federal consumer rights, mortgage rules, and banking oversight.",
      url: "https://www.canada.ca/en/financial-consumer-agency.html"
    },
    { 
      name: "Office of the Superintendent of Financial Institutions (OSFI)",
      description: "Federal mortgage underwriting guidelines (B-20), stress test rules.",
      url: "https://www.osfi-bsif.gc.ca"
    }
  ];

  const housingResources: Resource[] = [
    { 
      name: "CREA (Canadian Real Estate Association) - Market Stats",
      description: "Monthly housing data and national trends.",
      url: "https://www.crea.ca/housing-market-stats"
    },
    { 
      name: "TRREB (Toronto Regional Real Estate Board) Market Watch",
      description: "Deep dives into GTA housing trends.",
      url: "https://trreb.ca"
    },
    { 
      name: "CMHC (Canada Mortgage and Housing Corporation)",
      description: "Rental market reports, affordability indexes, mortgage default trends.",
      url: "https://www.cmhc-schl.gc.ca"
    },
    { 
      name: "Bank of Canada – Interest Rates & Economic Indicators",
      description: "Key rate announcements, inflation data, mortgage-related policy statements.",
      url: "https://www.bankofcanada.ca"
    },
    { 
      name: "Statistics Canada – Housing, Mortgages & Debt Data",
      description: "National census data, debt loads, income-to-mortgage comparisons.",
      url: "https://www.statcan.gc.ca"
    }
  ];

  const legalResources: Resource[] = [
    { 
      name: "Ontario Ministry of Public and Business Service Delivery",
      description: "Consumer protections, legal rights in financing contracts, small claims.",
      url: "https://www.ontario.ca/page/ministry-public-and-business-service-delivery"
    },
    { 
      name: "Steps to Justice (CLEO)",
      description: "Plain-language legal answers for mortgage default, foreclosure, refinancing, etc.",
      url: "https://stepstojustice.ca"
    },
    { 
      name: "Ontario Land Registry Services (Teranet)",
      description: "Title searches, property history, land ownership info.",
      url: "https://www.onland.ca"
    }
  ];

  return (
    <div className="bg-pure-white bg-opacity-70 backdrop-blur-sm border border-hunter-green/30 rounded-lg p-8 mb-10 shadow-sm">
      <h2 className="text-2xl font-hammersmith mb-6 text-hunter-green">Helpful Resources</h2>
      
      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-hammersmith mb-4 text-hunter-green font-semibold">1. Regulatory & Licensing Authorities</h3>
          <p className="text-hunter-green/80 mb-6 font-opensauce">These bodies oversee mortgage licensing, conduct, and legislation in Ontario.</p>
          <ResourceGroup title="" resources={regulatoryResources} />
        </div>
        
        <div>
          <h3 className="text-xl font-hammersmith mb-4 text-hunter-green font-semibold">2. Housing, Market & Economic Data</h3>
          <p className="text-hunter-green/80 mb-6 font-opensauce">Use these for pricing trends, policy changes, affordability stats, and economic forecasts.</p>
          <ResourceGroup title="" resources={housingResources} />
        </div>
        
        <div>
          <h3 className="text-xl font-hammersmith mb-4 text-hunter-green font-semibold">3. Legal & Consumer Rights</h3>
          <p className="text-hunter-green/80 mb-6 font-opensauce">These sources help clients understand contracts, default rights, and dispute resolution.</p>
          <ResourceGroup title="" resources={legalResources} />
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
