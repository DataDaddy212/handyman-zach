import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {service.name}
      </h3>
      <p className="text-gray-600 mb-4">
        {service.description}
      </p>
      <a
        href="/contact"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        Get Quote
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

