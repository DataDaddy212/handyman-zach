import Link from 'next/link';
import { getSiteInfo } from '@/lib/content';

export default function Footer() {
  const siteInfo = getSiteInfo();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-400">🔧</span>
              <span className="ml-2 text-xl font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4">{siteInfo.tagline}</p>
            <p className="text-gray-300">
              {siteInfo.address.street}<br />
              {siteInfo.address.city}, {siteInfo.address.state} {siteInfo.address.zip}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {siteInfo.serviceArea.map((area) => (
                <span
                  key={area}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <a
                href={`tel:${siteInfo.phone}`}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                {siteInfo.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

