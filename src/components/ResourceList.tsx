
import React from 'react';

interface Resource {
  name: string;
  description: string;
  url: string;
}

interface ResourceGroupProps {
  title: string;
  resources: Resource[];
}

const ResourceGroup = ({ title, resources }: ResourceGroupProps) => (
  <div className="mb-8">
    {title && <h3 className="text-xl font-hammersmith mb-4 text-hunter-green font-medium">{title}</h3>}
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <div key={index} className="p-4 border border-hunter-green/10 rounded-lg bg-pure-white bg-opacity-70 hover:bg-opacity-90 transition-all">
          <a 
            href={resource.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block hover:text-muted-red"
          >
            <h4 className="font-medium text-lg text-hunter-green mb-1">{resource.name}</h4>
            <p className="text-hunter-green/80 text-sm font-opensauce">{resource.description}</p>
          </a>
        </div>
      ))}
    </div>
  </div>
);

export { ResourceGroup };
export type { Resource };
