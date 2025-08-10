import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type?: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList' | 'Product';
  data?: any;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type = 'LocalBusiness', data }) => {
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://mortgagewithford.ca/#organization",
    "name": "Mortgage with Ford",
    "legalName": "Andreina Ford Mortgage Services",
    "url": "https://mortgagewithford.ca",
    "logo": "https://mortgagewithford.ca/mwf-logo.png",
    "image": "https://mortgagewithford.ca/andreina-ford.jpg",
    "description": "Expert mortgage broker in Ontario helping families make sense of mortgages and secure the best rates",
    "telephone": "+1-416-555-0123",
    "email": "hello@mortgagewithford.ca",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "sameAs": [
      "https://www.facebook.com/mortgagewithford",
      "https://www.instagram.com/mortgagewithford",
      "https://www.linkedin.com/in/andreinaford",
      "https://www.tiktok.com/@mortgagewithford"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    }
  });

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "MortgageBroker",
    "name": "Andreina Ford - Mortgage Broker",
    "image": "https://mortgagewithford.ca/andreina-ford.jpg",
    "url": "https://mortgagewithford.ca",
    "telephone": "+1-416-555-0123",
    "priceRange": "Free Consultation",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M5V",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6532,
      "longitude": -79.3832
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Toronto"
      },
      {
        "@type": "City",
        "name": "Mississauga"
      },
      {
        "@type": "City",
        "name": "Hamilton"
      },
      {
        "@type": "City",
        "name": "Ottawa"
      },
      {
        "@type": "State",
        "name": "Ontario"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mortgage Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "First-Time Home Buyer Mortgages",
            "description": "Specialized mortgage solutions for first-time buyers in Ontario"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mortgage Refinancing",
            "description": "Refinance your mortgage for better rates or access equity"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mortgage Renewal",
            "description": "Expert guidance for mortgage renewals with all major lenders"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Investment Property Mortgages",
            "description": "Financing solutions for rental and investment properties"
          }
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Mitchell"
        },
        "reviewBody": "Andreina is an absolute pro! Her expertise made the mortgage process smooth and stress-free."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47"
    }
  });

  const getFAQSchema = (faqs: any[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const getBreadcrumbSchema = (items: any[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  const getProductSchema = (product: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Mortgage with Ford"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "CAD",
      "lowPrice": product.lowPrice || "0",
      "highPrice": product.highPrice || "0",
      "offerCount": product.offerCount || "50"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47"
    }
  });

  let schema;
  switch (type) {
    case 'Organization':
      schema = getOrganizationSchema();
      break;
    case 'LocalBusiness':
      schema = getLocalBusinessSchema();
      break;
    case 'FAQPage':
      schema = data?.faqs ? getFAQSchema(data.faqs) : null;
      break;
    case 'BreadcrumbList':
      schema = data?.items ? getBreadcrumbSchema(data.items) : null;
      break;
    case 'Product':
      schema = data?.product ? getProductSchema(data.product) : null;
      break;
    default:
      schema = getLocalBusinessSchema();
  }

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};