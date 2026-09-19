import React, { useState } from 'react';
import { Notice } from '../types';
import { Calendar, Bell, ArrowRight, X, Download, AlertCircle } from 'lucide-react';

interface NoticeCardProps {
  notice: Notice;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeStyle = (category: Notice['category']) => {
    switch (category) {
      case 'Admission Notice':
        return 'bg-maroon-50 text-maroon-800 border-maroon-200';
      case 'Exam Notice':
        return 'bg-rose-50 text-maroon-700 border-rose-200';
      case 'Holiday Notice':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Result Publication':
        return 'bg-maroon-100/70 text-maroon-900 border-maroon-300';
      case 'Important Announcement':
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-maroon-300 transition-all duration-200 flex flex-col justify-between h-full group">
        <div>
          {/* Top Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(notice.category)}`}>
              {notice.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{notice.date}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-maroon-800 transition-colors line-clamp-2 leading-snug">
            {notice.title}
          </h3>

          {/* Short Description */}
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {notice.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">
            PSYCHE Notice Board
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-maroon-950 transition-colors group/btn cursor-pointer"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(notice.category)}`}>
                {notice.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">{notice.date}</span>
            </div>

            {/* Modal Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {notice.title}
            </h3>

            {/* Authority Subtext */}
            <div className="mt-2 text-xs text-slate-500 border-b border-slate-100 pb-4">
              Issued by: <strong className="text-slate-700">Office of Academic Affairs & Admissions</strong>, PSYCHE Academic Care
            </div>

            {/* Notice Full Content */}
            <div className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-xl border border-slate-200/80 font-normal">
              {notice.content}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-maroon-700" />
                <span>Verified official announcement</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 w-full sm:w-auto cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert("Official PDF version will download shortly.");
                  }}
                  className="px-4 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs w-full sm:w-auto cursor-pointer border-b border-maroon-500"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Circular</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
