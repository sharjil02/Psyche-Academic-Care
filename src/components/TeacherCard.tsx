import React from 'react';
import { Teacher } from '../types';
import { Briefcase, GraduationCap, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TeacherCardProps {
  teacher: Teacher;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const { isBangla } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-maroon-300 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Top Header with Avatar */}
      <div className="p-6 pb-4 flex items-start gap-4">
        <div className="shrink-0">
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-maroon-400 transition-colors shadow-xs"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-maroon-50 text-maroon-800 border border-maroon-200 mb-1">
            {teacher.subject}
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-maroon-800 transition-colors truncate">
            {teacher.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {teacher.specialty}
          </p>
        </div>
      </div>

      {/* Details Body */}
      <div className="px-6 py-2 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
          "{teacher.shortBio}"
        </p>

        <div className="space-y-2 py-3 border-t border-slate-100 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <GraduationCap className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" />
            <span className="font-medium leading-tight">{teacher.qualification}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase className="w-4 h-4 text-maroon-700 shrink-0" />
            <span>{teacher.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{isBangla ? 'ব্যাচ সমূহ: ' : 'Focus: '}{teacher.classesHandled}</span>
          </div>
        </div>
      </div>

      {/* Footer Accent */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">{isBangla ? 'সিনিয়র ফ্যাকাল্টি' : 'Senior Faculty Member'}</span>
        <span className="text-maroon-800 font-medium">{isBangla ? 'সাইকি একাডেমিক কেয়ার' : 'PSYCHE Academic Care'}</span>
      </div>
    </div>
  );
};
