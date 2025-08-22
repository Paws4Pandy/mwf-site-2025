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
    "logo": "https://mortgagewithford.ca/mwf-logo.png",
    "image": "https://mortgagewithford.ca/andreina-ford.jpg",
    "description": "Expert mortgage broker in Ontario helping families make sense of mortgages and secure the best rates",
    "telephone": "+1-613-743-7866",
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
    "@type": "ProfessionalService",
    "name": "Andreina Ford - Mortgage Broker",
    "image": "https://mortgagewithford.ca/andreina-ford.jpg",
    "url": "https://mortgagewithford.ca",
    "telephone": "+1-613-743-7866",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
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
        "reviewBody": "Andreina is an absolute pro! Her expertise made the mortgage process smooth and stress-free.",
        "datePublished": "2024-10-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "reviewBody": "Andreina helped us navigate the complex mortgage landscape with ease. Highly recommended!",
        "datePublished": "2024-11-02"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Jennifer Lopez"
        },
        "reviewBody": "Professional, knowledgeable, and always available to answer questions. Best mortgage broker in Toronto!",
        "datePublished": "2024-11-20"
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
      "image": "https://mortgagewithford.ca/andreina-ford.jpg",
      "telephone": "+1-613-743-7866",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Ontario"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "Service",
          "name": "Mortgage Brokerage Services"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Mitchell"
        },
        "reviewBody": "Andreina is an absolute pro! Her expertise made the mortgage process smooth and stress-free.",
        "datePublished": "2024-10-15"
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "Service",
          "name": "Mortgage Brokerage Services"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "reviewBody": "Andreina helped us navigate the complex mortgage landscape with ease. Highly recommended!",
        "datePublished": "2024-11-02"
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "Service",
          "name": "Mortgage Brokerage Services"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Jennifer Lopez"
        },
        "reviewBody": "Professional, knowledgeable, and always available to answer questions. Best mortgage broker in Toronto!",
        "datePublished": "2024-11-20"
      }
    ]
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