'use client'
import { useState } from 'react'
import Link from 'next/link'
import siteData from '../../../content/site.json'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          {/* Logo - Always visible and centered on mobile */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" onClick={closeMobileMenu}>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">{siteData.businessName}</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#our-services" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              Our Services
            </a>
            <Link 
              href="/bikes-for-sale" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              Bikes for Sale
            </Link>
            <a 
              href="#contact" 
              className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center justify-center text-center"
            >
              Request a consultation
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when menu is closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100 mt-4'
              : 'max-h-0 opacity-0 mt-0 overflow-hidden'
          }`}
        >
          <nav className="bg-gray-50 rounded-lg p-4 space-y-3">
            <a 
              href="#our-services" 
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Our Services
            </a>
            <Link 
              href="/bikes-for-sale" 
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-amber-600 font-medium transition-colors py-2"
            >
              Bikes for Sale
            </Link>
            <a 
              href="#contact" 
              onClick={closeMobileMenu}
              className="block bg-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors text-center"
            >
              Request a Consultation
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
