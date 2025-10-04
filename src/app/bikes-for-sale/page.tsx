import Image from 'next/image'
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
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-amber-400 via-orange-300 to-blue-400 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Bikes for Sale
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Browse bikes currently available for sale. Contact Zach for details.
          </p>
        </div>
      </section>

      {/* Bikes Grid */}
      <section className="py-20">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 font-heading">Interested in a Bike?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact Zach to schedule a viewing or get more information about any of our available bikes.
          </p>
          <div className="bg-white p-8 rounded-xl">
            <p className="text-lg font-semibold mb-2 text-gray-900">{siteData.businessName}</p>
            <p className="text-gray-600 mb-4">
              Phone: <a href={`tel:${siteData.contact.phone}`} className="text-amber-600 hover:text-amber-700 underline">{siteData.contact.phone}</a>
            </p>
            <p className="text-sm text-gray-500">Serving Saugerties, Kingston, Woodstock & Catskill</p>
          </div>
        </div>
      </section>
    </div>
  )
}
