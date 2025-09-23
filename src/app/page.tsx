import { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import CTAButton from '@/components/CTAButton';
import { generateMetadata, generateLocalBusinessSchema } from '@/lib/seo';
import { getSiteInfo, getServices, getTestimonials } from '@/lib/content';

export const metadata: Metadata = generateMetadata({
  title: 'Professional Handyman Services in Saugerties, Kingston, Woodstock & Catskill NY',
  description: 'Expert handyman services in the Hudson Valley. From mounting and bike repair to lawn services and deck repair. Serving Saugerties, Kingston, Woodstock, and Catskill NY with quality and reliability.',
  path: '/'
});

export default function Home() {
  const siteInfo = getSiteInfo();
  const services = getServices().slice(0, 3); // Show first 3 services on home
  const testimonials = getTestimonials().slice(0, 3); // Show first 3 testimonials

  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Handyman Services in the Hudson Valley
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Serving Saugerties, Kingston, Woodstock, and Catskill with expert mounting, bike repair, lawn services, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href="/contact" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Free Quote
              </CTAButton>
              <a
                href={`tel:${siteInfo.phone}`}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                Call {siteInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional handyman services to keep your home and property in perfect condition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-8">
            <CTAButton href="/services" variant="secondary">
              View All Services
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              Proudly serving the Hudson Valley region
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {siteInfo.serviceArea.map((area) => (
              <div key={area} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-semibold text-gray-900">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          <div className="text-center mt-8">
            <CTAButton href="/testimonials" variant="secondary">
              Read More Reviews
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote on your next project. We're here to help!
          </p>
          <CTAButton href="/contact" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100">
            Get Free Quote Today
          </CTAButton>
        </div>
      </section>
    </PageShell>
  );
}

