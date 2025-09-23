import { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ContactForm from '@/components/ContactForm';
import { generateMetadata, generateLocalBusinessSchema } from '@/lib/seo';
import { getSiteInfo } from '@/lib/content';

export const metadata: Metadata = generateMetadata({
  title: 'Contact Handyman Zach - Free Quote in Saugerties, Kingston, Woodstock & Catskill NY',
  description: 'Get a free quote for handyman services in Saugerties, Kingston, Woodstock, and Catskill NY. Professional mounting, bike repair, lawn services, and more. Call or contact us today!',
  path: '/contact'
});

export default function ContactPage() {
  const siteInfo = getSiteInfo();
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us for Your Free Quote
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ready to get started on your next project? Contact us today for professional handyman services in the Hudson Valley.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">📞</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">
                        <a href={`tel:${siteInfo.phone}`} className="hover:text-blue-600 transition-colors">
                          {siteInfo.phone}
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Call for immediate assistance</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">✉️</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">
                        <a href={`mailto:${siteInfo.email}`} className="hover:text-blue-600 transition-colors">
                          {siteInfo.email}
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">📍</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Service Areas</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {siteInfo.serviceArea.map((area) => (
                          <span
                            key={area}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="text-2xl">🕒</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Professional and reliable service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Free estimates on all projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Quality workmanship guaranteed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Serving the Hudson Valley for years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Fully insured and licensed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

