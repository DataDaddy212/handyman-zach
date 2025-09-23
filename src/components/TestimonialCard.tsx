import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="flex">
          {renderStars(testimonial.rating)}
        </div>
      </div>
      <blockquote className="text-gray-700 mb-4 italic">
        "{testimonial.text}"
      </blockquote>
      <div className="border-t pt-4">
        <div className="font-semibold text-gray-900">{testimonial.name}</div>
        <div className="text-sm text-gray-600">{testimonial.location}</div>
        <div className="text-sm text-blue-600 font-medium">{testimonial.service}</div>
      </div>
    </div>
  );
}

