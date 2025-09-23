export interface SiteInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  serviceArea: string[];
  description: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
}

export interface SiteContent {
  site: SiteInfo;
  services: Service[];
  testimonials: Testimonial[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export interface ApiResponse {
  ok: boolean;
  error?: string;
}

