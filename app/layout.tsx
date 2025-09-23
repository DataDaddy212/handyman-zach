import './globals.css'
import { Inter } from 'next/font/google'
import siteData from '../content/site.json'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Handyman Zach — Zach of All Trades",
  description: siteData.tagline,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white py-4">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">{siteData.businessName}</h1>
            <a 
              href="#contact" 
              className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100"
            >
              Request a consultation
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2">{siteData.businessName}</p>
            <p>Phone: {siteData.contact.phone}</p>
            <a href="#contact" className="text-blue-300 hover:text-blue-100">Contact us</a>
          </div>
        </footer>
      </body>
    </html>
  )
}