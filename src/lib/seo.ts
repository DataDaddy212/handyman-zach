import { Metadata } from 'next';
import { getSiteInfo } from './content';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

export function generateMetadata({ title, description, path = '' }: SEOProps): Metadata {
  const siteInfo = getSiteInfo();
  const fullTitle = `${title} | ${siteInfo.name}`;
  const fullUrl = `https://handymanzach.com${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteInfo.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export function generateLocalBusinessSchema() {
  const siteInfo = getSiteInfo();
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteInfo.name,
    "description": siteInfo.description,
    "url": "https://handymanzach.com",
    "telephone": siteInfo.phone,
    "email": siteInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteInfo.address.street,
      "addressLocality": siteInfo.address.city,
      "addressRegion": siteInfo.address.state,
      "postalCode": siteInfo.address.zip,
      "addressCountry": "US"
    },
    "areaServed": siteInfo.serviceArea,
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00,Sa 09:00-16:00",
    "sameAs": []
  };
}

export function generateServiceSchema(serviceName: string, serviceDescription: string) {
  const siteInfo = getSiteInfo();
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteInfo.name,
      "url": "https://handymanzach.com",
      "telephone": siteInfo.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteInfo.address.street,
        "addressLocality": siteInfo.address.city,
        "addressRegion": siteInfo.address.state,
        "postalCode": siteInfo.address.zip,
        "addressCountry": "US"
      }
    },
    "areaServed": siteInfo.serviceArea,
    "serviceType": "Handyman Services"
  };
}

