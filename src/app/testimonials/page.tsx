import { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import TestimonialCard from '@/components/TestimonialCard';
import CTAButton from '@/components/CTAButton';
import { generateMetadata } from '@/lib/seo';
import { getSiteInfo, getTestimonials } from '@/lib/content';

export const metadata: Metadata = generateMetadata({
  title: 'Customer Testimonials - Handyman Zach in Saugerties, Kingston, Woodstock & Catskill NY',
  description: 'Read what our satisfied customers say about our handyman services in Saugerties, Kingston, Woodstock, and Catskill NY. Quality work and professional service guaranteed.',
  path: '/testimonials'
});

export default function TestimonialsPage() {
  const siteInfo = getSiteInfo();
  const testimonials = getTestimonials();

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Customer Testimonials
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              See what our satisfied customers say about our handyman services in the Hudson Valley.
            </p>
            <CTAButton href="/contact" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100">
              Join Our Happy Customers
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers across the Hudson Valley.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving Happy Customers Across the Hudson Valley
            </h2>
            <p className="text-xl text-gray-600">
              From Saugerties to Catskill, our customers trust us with their home improvement needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {siteInfo.serviceArea.map((area) => (
              <div key={area} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="text-2xl mb-2">⭐</div>
                <div className="font-semibold text-gray-900">{area}</div>
                <div className="text-sm text-gray-600 mt-1">Happy Customers</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote and experience the quality service our customers rave about.
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

