import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type?: 'Organization' | 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList' | 'Product' | 'ServiceWithReviews';
  data?: Record<string, unknown>;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type = 'LocalBusiness', data }) => {
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://mortgagewithford.ca/#organization",
    "name": "Mortgage with Ford",
    "legalName": "Andreina Ford Mortgage Services",
    "url": "https://mortgagewithford.ca",
    "logo": "https://mortgagewithford.ca/Tango_Ontario_White.png",
    "image": "https://mortgagewithford.ca/andreina/andreina-mwf-social.jpg",
    "description": "Expert mortgage broker in Ontario helping families make sense of mortgages and secure the best rates",
    "telephone": "+1-613-743-7866",
    "email": "hello@mortgagewithford.ca",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Picton",
      "addressRegion": "ON",
      "postalCode": "K0K 2T0",
      "addressCountry": "CA"
    },
    "sameAs": [
      "https://www.facebook.com/mortgagewithford",
      "https://www.instagram.com/mortgage.with.ford/",
      "https://www.linkedin.com/in/mortgagewithford/",
      "https://www.youtube.com/@MortgagewithFord"
    ],
  });

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Andreina Ford - Mortgage Broker",
    "image": "https://mortgagewithford.ca/andreina/andreina-mwf-social.jpg",
    "url": "https://mortgagewithford.ca",
    "telephone": "+1-613-743-7866",
    "priceRange": "Free Consultation",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Picton",
      "addressRegion": "ON",
      "postalCode": "K0K 2T0",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.0089,
      "longitude": -77.1392
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
    ]
  });

  const getFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
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

  const getBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  const getProductSchema = (product: Record<string, unknown>) => ({
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
    }
  });

  const getServiceWithReviewsSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://mortgagewithford.ca/#service",
    "name": "Mortgage Brokerage Services",
    "description": "Professional mortgage brokerage services helping Ontario families secure the best mortgage rates and terms",
    "provider": {
      "@type": "ProfessionalService",
      "name": "Andreina Ford - Mortgage Broker",
      "image": "https://mortgagewithford.ca/andreina/andreina-mwf-social.jpg",
      "telephone": "+1-613-743-7866",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Picton",
        "addressRegion": "ON",
        "postalCode": "K0K 2T0",
        "addressCountry": "CA"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
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
    case 'ServiceWithReviews':
      schema = getServiceWithReviewsSchema();
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
      schema = getServiceWithReviewsSchema();
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