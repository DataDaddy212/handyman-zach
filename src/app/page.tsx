'use client'
import { useState } from 'react'
import Image from 'next/image'
import siteData from '../../content/site.json'

export default function Home() {
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

  const getServiceIcon = (service: string) => {
    const icons: { [key: string]: string } = {
      'TV & shelf mounting': '📺',
      'Bike repair': '🚲',
      'Lawn services': '🌱',
      'Gardening': '🌿',
      'Deck repair': '🔨',
      'Painting': '🎨'
    }
    return icons[service] || '🔧'
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-400 via-orange-300 to-blue-400 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-heading leading-tight">
                {siteData.businessName}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                {siteData.tagline}
              </p>
              <a 
                href="#contact" 
                className="bg-white text-amber-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block flex items-center justify-center text-center"
              >
                Request a consultation
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src="/hero-tools.jpg"
                alt="Handyman tools neatly arranged on a wooden workbench"
                width={900}
                height={600}
                className="rounded-xl shadow-xl w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 font-heading">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl card-shadow hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{getServiceIcon(service)}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {siteData.serviceDetails[service as keyof typeof siteData.serviceDetails]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 font-heading">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {siteData.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl card-shadow">
                <div className="text-6xl text-amber-200 mb-4">"</div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <p className="font-semibold text-gray-900">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900 font-heading">Service Areas</h2>
          <p className="text-xl text-gray-600 mb-12">
            Handyman Zach proudly serves these communities in the Hudson Valley
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a 
              href="/handyman-saugerties" 
              className="bg-amber-50 hover:bg-amber-100 p-6 rounded-lg transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600">Saugerties</h3>
              <p className="text-sm text-gray-600">NY</p>
            </a>
            <a 
              href="/handyman-kingston" 
              className="bg-amber-50 hover:bg-amber-100 p-6 rounded-lg transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600">Kingston</h3>
              <p className="text-sm text-gray-600">NY</p>
            </a>
            <a 
              href="/handyman-woodstock" 
              className="bg-amber-50 hover:bg-amber-100 p-6 rounded-lg transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600">Woodstock</h3>
              <p className="text-sm text-gray-600">NY</p>
            </a>
            <a 
              href="/handyman-catskill" 
              className="bg-amber-50 hover:bg-amber-100 p-6 rounded-lg transition-colors group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600">Catskill</h3>
              <p className="text-sm text-gray-600">NY</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
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
              <label htmlFor="name" className="block text-lg font-medium text-white mb-3">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                minLength={2}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-white mb-3">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="(347) 623-6959"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium text-white mb-3">
                Message *
              </label>
              <textarea
                id="message"
                required
                minLength={6}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                placeholder="Tell us about your project..."
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
    </div>
  )
}