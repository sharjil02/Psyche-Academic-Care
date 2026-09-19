import React from 'react';
import { StudentResult } from '../types';
import { Trophy, GraduationCap, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ResultCardProps {
  result: StudentResult;
  isFeatured?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, isFeatured = false }) => {
  const { isBangla } = useLanguage();

  return (
    <div className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white ${
      isFeatured 
        ? 'border-maroon-300 shadow-md ring-1 ring-maroon-100 hover:shadow-xl' 
        : 'border-slate-200 shadow-xs hover:shadow-md hover:border-maroon-200'
    }`}>
      {/* Top Banner / Position Badge */}
      <div className={`px-5 py-3 flex items-center justify-between text-xs font-bold ${
        isFeatured 
          ? 'bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 text-white' 
          : 'bg-slate-100 text-slate-700'
      }`}>
        <span className="flex items-center gap-1.5">
          <Trophy className={`w-3.5 h-3.5 ${isFeatured ? 'text-amber-300' : 'text-amber-500'}`} />
          <span>{result.position}</span>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px] backdrop-blur-xs font-semibold">
          {isBangla ? `সাল ${result.year}` : `Year ${result.year}`}
        </span>
      </div>

      {/* Student Profile Body */}
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center gap-4">
          <img
            src={result.photo}
            alt={result.studentName}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-maroon-100 shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 leading-snug truncate">
              {result.studentName}
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
              <span className="truncate">{result.studentClass}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate mt-0.5">
              <Building2 className="w-3 h-3 text-maroon-600 shrink-0" />
              <span className="truncate">{result.institution}</span>
            </div>
          </div>
        </div>

        {/* GPA & Marks Box */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div>
            <div className="text-[11px] text-slate-500 font-medium uppercase">
              {isBangla ? 'ফলাফল / জিপিএ' : 'Result / GPA'}
            </div>
            <div className="text-sm font-extrabold text-maroon-800 mt-0.5">{result.gpa}</div>
          </div>
          <div className="border-l border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium uppercase">
              {isBangla ? 'নম্বর / অবস্থান' : 'Score / Percentile'}
            </div>
            <div className="text-sm font-extrabold text-maroon-700 mt-0.5">{result.marks}</div>
          </div>
        </div>

        {/* Testimonial Quote */}
        {result.testimonial && (
          <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3 pt-1">
            "{result.testimonial}"
          </p>
        )}
      </div>

      {/* Card Bottom Tag */}
      <div className="px-6 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>{isBangla ? 'বোর্ড ও ভর্তি রেকর্ড দ্বারা যাচাইকৃত' : 'Verified Board / Exam Record'}</span>
        <span className="text-maroon-800 font-semibold">{isBangla ? 'সাইকি একাডেমিক কেয়ার' : 'PSYCHE Academic Care'}</span>
      </div>
    </div>
  );
};
