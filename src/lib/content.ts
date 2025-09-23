import { SiteContent } from '@/types';
import siteData from '../../content/site.json';

export const siteContent: SiteContent = siteData;

export const getSiteInfo = () => siteContent.site;
export const getServices = () => siteContent.services;
export const getTestimonials = () => siteContent.testimonials;
export const getServiceById = (id: string) => 
  siteContent.services.find(service => service.id === id);

