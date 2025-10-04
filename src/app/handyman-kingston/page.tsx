import { Metadata } from 'next'
import Image from 'next/image'
import siteData from '../../../content/site.json'

export const metadata: Metadata = {
  title: "Handyman in Kingston – Handyman Zach",
  description: "Professional handyman services in Kingston, NY. TV mounting, bike repair, lawn care, deck repair, and painting. Call (347) 623-6959 for reliable local service.",
}

export default function HandymanKingston() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-400 via-orange-300 to-blue-400 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading leading-tight">
            Trusted Handyman in Kingston, NY
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            Professional handyman services in Kingston and surrounding areas. From TV mounting to deck repair, 
            Zach delivers quality work with a personal touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:3476236959" 
              className="bg-white text-amber-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block flex items-center justify-center text-center"
            >
              Call (347) 623-6959
            </a>
            <a 
              href="tel:3476236959" 
              className="bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors inline-block flex items-center justify-center text-center"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 font-heading">Services in Kingston</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">
                  {service === 'TV & shelf mounting' && '📺'}
                  {service === 'Bike repair' && '🚲'}
                  {service === 'Lawn services' && '🌱'}
                  {service === 'Gardening' && '🌿'}
                  {service === 'Deck repair' && '🔨'}
                  {service === 'Painting' && '🎨'}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {siteData.serviceDetails[service as keyof typeof siteData.serviceDetails]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white font-heading">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact Handyman Zach for reliable service in Kingston, NY
          </p>
          <a 
            href="tel:3476236959" 
            className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors inline-block"
          >
            Call (347) 623-6959
          </a>
        </div>
      </section>
    </div>
  )
}
