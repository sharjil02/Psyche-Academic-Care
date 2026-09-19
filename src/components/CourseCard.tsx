import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { 
  Clock, 
  CalendarDays, 
  DollarSign, 
  Check, 
  ArrowRight, 
  X, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t, isBangla } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-maroon-300 transition-all duration-300 flex flex-col h-full overflow-hidden group">
        {/* Card Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-maroon-800 shadow-xs border border-maroon-200 backdrop-blur-xs">
              {course.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-maroon-800 transition-colors leading-snug">
              {course.name}
            </h3>
            <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {course.shortDescription}
            </p>
          </div>

          {/* Key Course Meta */}
          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <Clock className="w-3.5 h-3.5 text-maroon-700" />
                {t('courses.duration')}
              </span>
              <span className="font-semibold text-slate-800">{course.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <CalendarDays className="w-3.5 h-3.5 text-maroon-700" />
                {t('courses.classDays')}
              </span>
              <span className="font-semibold text-slate-800">{course.classDays}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                {t('courses.monthlyFee')}
              </span>
              <span className="text-sm font-extrabold text-maroon-800">
                ৳ {course.monthlyFee.toLocaleString()} {t('courses.perMonth')}
              </span>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-maroon-50 text-slate-700 hover:text-maroon-800 border border-slate-200 hover:border-maroon-200 text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer"
            >
              {t('courses.viewDetails')}
            </button>
            <Link
              to={`/admission?course=${encodeURIComponent(course.name)}`}
              className="py-2.5 px-4 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1 border-b border-maroon-500"
            >
              <span>{t('courses.enroll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-maroon-50 text-maroon-800 border border-maroon-200">
                {course.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">PSYCHE Academic Care</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {course.name}
            </h3>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {course.fullDescription}
            </p>

            {/* Course Features */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-maroon-700" />
                {isBangla ? 'এই কোর্সের প্রধান বৈশিষ্ট্যসমূহ' : 'Key Highlights of this Course'}
              </h4>
              <ul className="space-y-2">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-maroon-50/70 border border-maroon-100 text-center">
                <div className="text-[11px] text-maroon-800 font-semibold uppercase">{t('courses.duration')}</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{course.duration}</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-center">
                <div className="text-[11px] text-maroon-700 font-semibold uppercase">{t('courses.classDays')}</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{course.classDays}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[11px] text-slate-600 font-semibold uppercase">{isBangla ? 'সর্বোচ্চ আসন' : 'Batch Limit'}</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{course.batchSize}</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
                <div className="text-[11px] text-amber-700 font-semibold uppercase">{t('courses.monthlyFee')}</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">৳ {course.monthlyFee.toLocaleString()}</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {isBangla ? 'বন্ধ করুন' : 'Close'}
              </button>
              <Link
                to={`/admission?course=${encodeURIComponent(course.name)}`}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 border-b-2 border-maroon-500"
              >
                <span>{isBangla ? 'ভর্তির জন্য এগিয়ে যান' : 'Proceed to Admission'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
