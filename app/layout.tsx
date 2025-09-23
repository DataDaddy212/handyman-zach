import './globals.css'
import { Poppins, Inter } from 'next/font/google'
import siteData from '../content/site.json'

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
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">{siteData.businessName}</h1>
            <a 
              href="#contact" 
              className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Request a consultation
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2 text-gray-900">{siteData.businessName}</p>
            <p className="text-gray-600 mb-2">Phone: {siteData.contact.phone}</p>
            <p className="text-sm text-gray-500">Serving Saugerties & nearby towns</p>
          </div>
        </footer>
      </body>
    </html>
  )
}