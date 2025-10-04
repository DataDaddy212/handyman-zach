import './globals.css'
import { Poppins, Inter } from 'next/font/google'
import Link from 'next/link'
import siteData from '../../content/site.json'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata = {
  title: "Handyman Zach — Zach of All Trades in Saugerties",
  description: "Professional handyman services in Saugerties: mounting, bike repair, lawn & garden, deck repair, and painting. Friendly, reliable, and local.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Handyman Zach",
              "image": "/hero-tools.jpg",
              "telephone": "(347) 623-6959",
              "areaServed": ["Saugerties NY", "Kingston NY", "Woodstock NY", "Catskill NY"],
              "serviceType": ["Handyman Services"]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 font-heading">{siteData.businessName}</h1>
            </Link>
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
            {/* Mobile menu button */}
            <div className="md:hidden">
              <a 
                href="#contact" 
                className="bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2 text-gray-900">{siteData.businessName}</p>
            <p className="text-gray-600 mb-2">Phone: <a href={`tel:${siteData.contact.phone}`} className="text-amber-600 hover:text-amber-700 underline">{siteData.contact.phone}</a></p>
            <p className="text-sm text-gray-500">Serving Saugerties, Kingston, Woodstock & Catskill</p>
          </div>
        </footer>
      </body>
    </html>
  )
}