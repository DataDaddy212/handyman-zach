import Image from 'next/image'
import Link from 'next/link'
import siteData from '../../../content/site.json'

export const metadata = {
  title: "Bikes for Sale – Handyman Zach",
  description: "Browse bikes currently available for sale from Handyman Zach. Quality bikes in Saugerties, Kingston, Woodstock, and Catskill.",
}

const bikes = [
  {
    name: "TrailMaster 3000",
    price: "$850",
    specs: "Hardtail mountain bike with 1x12 drivetrain, hydraulic disc brakes, and 29-inch wheels.",
    image: "/bikes/mountain-placeholder.jpg"
  },
  {
    name: "Speedster Road Pro",
    price: "$1,200",
    specs: "Lightweight road bike with carbon fork, Shimano 105 groupset, and 700c wheels.",
    image: "/bikes/road-placeholder.jpg"
  }
]

export default function BikesForSale() {
  return (
    <>
      {/* Navigation Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-amber-600 hover:text-amber-700 underline">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-900 font-medium">Bikes for Sale</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-400 via-orange-300 to-blue-400 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Bikes for Sale
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Browse bikes currently available for sale. Contact Zach for details.
          </p>
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link 
              href="/" 
              className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link 
              href="/handyman-saugerties" 
              className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              Handyman Services
            </Link>
            <a 
              href="#contact" 
              className="bg-white text-amber-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Zach
            </a>
          </div>
        </div>
      </section>

      {/* Bikes Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {bikes.map((bike, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video relative">
                  <Image
                    src={bike.image}
                    alt={`${bike.name} bike for sale`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                    {bike.name}
                  </h2>
                  <p className="text-3xl font-semibold text-amber-600 mb-4">
                    {bike.price}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {bike.specs}
                  </p>
                  <div className="mt-6">
                    <a 
                      href="#contact" 
                      className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors inline-block"
                    >
                      Contact for Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Zach can help you find the perfect bike!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                View All Services
              </Link>
              <a 
                href={`tel:${siteData.contact.phone}`} 
                className="bg-white text-amber-600 border-2 border-amber-500 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                Call Zach: {siteData.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
