import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  variant?: 'topbar' | 'navbar' | 'mobile' | 'footer';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '',
  variant = 'navbar'
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'topbar') {
    return (
      <div className={`inline-flex items-center rounded-full bg-slate-800 p-0.5 border border-slate-700 text-xs ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded-full font-bold transition-all ${
            language === 'en'
              ? 'bg-maroon-800 text-white shadow-2xs border-b border-maroon-500'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage('bn')}
          className={`px-2 py-0.5 rounded-full font-bold transition-all ${
            language === 'bn'
              ? 'bg-maroon-800 text-white shadow-2xs border-b border-maroon-500'
              : 'text-slate-400 hover:text-white'
          }`}
          title="বাংলায় দেখুন"
        >
          বাং
        </button>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 ${className}`}>
        <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
          <Globe className="w-4 h-4 text-maroon-700" />
          <span>{language === 'bn' ? 'ভাষা নির্বাচন' : 'Language / ভাষা'}</span>
        </div>
        <div className="inline-flex items-center rounded-lg bg-white p-1 border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              language === 'en'
                ? 'bg-maroon-800 text-white shadow-xs border-b border-maroon-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
              language === 'bn'
                ? 'bg-maroon-800 text-white shadow-xs border-b border-maroon-500'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            বাংলা
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Globe className="w-4 h-4 text-slate-400" />
        <div className="inline-flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              language === 'en'
                ? 'bg-maroon-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              language === 'bn'
                ? 'bg-maroon-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            বাংলা
          </button>
        </div>
      </div>
    );
  }

  // Default navbar variant
  return (
    <div className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-2xs ${className}`}>
      <Globe className="w-3.5 h-3.5 text-maroon-700 ml-1" />
      <div className="inline-flex items-center">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-white text-maroon-800 shadow-xs ring-1 ring-maroon-200 border-b-2 border-maroon-500'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="Switch to English"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage('bn')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            language === 'bn'
              ? 'bg-white text-maroon-800 shadow-xs ring-1 ring-maroon-200 border-b-2 border-maroon-500'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          aria-label="বাংলা সংস্করণ নির্বাচন করুন"
        >
          বাংলা
        </button>
      </div>
    </div>
  );
};
