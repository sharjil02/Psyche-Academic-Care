import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, CheckCircle } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-maroon-200 transition-all duration-200 flex flex-col justify-between h-full relative">
      <div className="space-y-4">
        {/* Rating Stars & Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <Quote className="w-6 h-6 text-maroon-200" />
        </div>

        {/* Content */}
        <p className="text-slate-700 text-sm leading-relaxed italic">
          "{testimonial.content}"
        </p>
      </div>

      {/* Author Details */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border border-slate-200 ring-2 ring-maroon-50"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 leading-snug truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-500 font-medium truncate">
            {testimonial.role}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-maroon-700 font-semibold mt-0.5 truncate">
            <CheckCircle className="w-3 h-3 shrink-0" />
            <span className="truncate">{testimonial.achievement}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
