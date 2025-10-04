'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import siteData from '../../../content/site.json'

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      
      if (result.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

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
            <a 
              href="#contact-form" 
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
                      href="#contact-form" 
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
                href="/#our-services" 
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

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white font-heading">Get In Touch</h2>
          
          {status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold">Thanks—We&apos;ll be in touch!</div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 text-center">
              <div className="text-2xl mb-2">❌</div>
              <div className="font-semibold">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bikes-name" className="block text-lg font-medium text-white mb-3">
                Name *
              </label>
              <input
                type="text"
                id="bikes-name"
                required
                minLength={2}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="bikes-email" className="block text-lg font-medium text-white mb-3">
                Email *
              </label>
              <input
                type="email"
                id="bikes-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="bikes-phone" className="block text-lg font-medium text-white mb-3">
                Phone
              </label>
              <input
                type="tel"
                id="bikes-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="(347) 623-6959"
              />
            </div>

            <div>
              <label htmlFor="bikes-message" className="block text-lg font-medium text-white mb-3">
                Message *
              </label>
              <textarea
                id="bikes-message"
                required
                minLength={6}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="Tell us about your bike inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-amber-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-amber-600 disabled:opacity-50 transition-colors"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
