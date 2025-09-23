import { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ServiceCard from '@/components/ServiceCard';
import CTAButton from '@/components/CTAButton';
import { generateMetadata, generateServiceSchema } from '@/lib/seo';
import { getSiteInfo, getServices } from '@/lib/content';

export const metadata: Metadata = generateMetadata({
  title: 'Handyman Services in Saugerties, Kingston, Woodstock & Catskill NY',
  description: 'Complete handyman services including mounting, bike repair, lawn care, gardening, deck repair, and painting. Professional service in Saugerties, Kingston, Woodstock, and Catskill NY.',
  path: '/services'
});

export default function ServicesPage() {
  const siteInfo = getSiteInfo();
  const services = getServices();

  return (
    <PageShell>
      {services.map((service) => (
        <script
          key={service.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema(service.name, service.description)),
          }}
        />
      ))}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Handyman Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Serving Saugerties, Kingston, Woodstock, and Catskill with expert craftsmanship and reliable service.
            </p>
            <CTAButton href="/contact" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100">
              Get Free Quote
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Complete Service List
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From small repairs to major projects, we handle it all with professional expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote on any of our services. We're here to help with your next project!
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
      </section>
    </PageShell>
  );
}

