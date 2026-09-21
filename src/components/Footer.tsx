import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  Award
} from 'lucide-react';
import { PsycheLogo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isBangla } = useLanguage();

  return (
    <footer className="bg-rose-50/70 text-slate-700 relative border-t border-rose-200/80">
      {/* Top Brand Accent Line */}
      <div className="h-1 w-full brand-accent-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-rose-200/70">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs border border-rose-100 shrink-0 group-hover:scale-105 transition-transform">
                <PsycheLogo className="w-full h-full text-maroon-800" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                {isBangla ? 'সাইকি' : 'PSYCHE'} <span className="text-maroon-800">{isBangla ? 'একাডেমিক' : 'Academic'}</span> <span className="text-rose-600">{isBangla ? 'কেয়ার' : 'Care'}</span>
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-rose-200 text-xs text-maroon-800 font-bold shadow-xs">
                <Award className="w-3.5 h-3.5 text-rose-600" />
                {isBangla ? '১০+ বছরের সাফল্যময় গৌরব' : '10+ Years of Success'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-maroon-900 text-xs font-black uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: t('nav.courses'), path: '/courses' },
                { name: t('nav.teachers'), path: '/teachers' },
                { name: t('nav.results'), path: '/results' },
                { name: t('nav.admission'), path: '/admission' },
                { name: t('nav.login'), path: '/login' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-slate-600 hover:text-maroon-800 flex items-center gap-1.5 transition-colors font-medium group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-rose-400 group-hover:text-maroon-800 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Courses */}
          <div className="space-y-4">
            <h3 className="text-maroon-900 text-xs font-black uppercase tracking-wider">
              {isBangla ? 'জনপ্রিয় প্রোগ্রাম' : 'Popular Programs'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: isBangla ? '১০ম শ্রেণি স্পেশাল ব্যাচ (এলিট সিকিউ)' : 'Class 10 Special Batch (Elite CQ)', path: '/courses' },
                { name: isBangla ? '১০ম শ্রেণি বোর্ড প্রস্তুতি ব্যাচ' : 'Class 10 Regular Academic & Board Prep', path: '/courses' },
                { name: isBangla ? '৯ম শ্রেণি কমপ্রিহেনসিভ কেয়ার' : 'Class 9 Comprehensive Academic Care', path: '/courses' },
                { name: isBangla ? '৯ম শ্রেণি উচ্চতর গণিত ও পদার্থ' : 'Class 9 Higher Math & Physics Foundation', path: '/courses' },
                { name: isBangla ? '৮ম শ্রেণি জুনিয়র ফাউন্ডেশন কেয়ার' : 'Class 8 Junior Foundation Care', path: '/courses' },
                { name: isBangla ? '৮ম শ্রেণি গণিত ও বিজ্ঞান স্পেশাল' : 'Class 8 Math & Science Specialist Care', path: '/courses' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-slate-600 hover:text-maroon-800 flex items-center gap-1.5 transition-colors font-medium group"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-rose-400 group-hover:text-maroon-800 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-maroon-900 text-xs font-black uppercase tracking-wider">
              {t('footer.contactTitle')}
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-maroon-800 shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-maroon-800 shrink-0" />
                <span>+880 1812-345678, +880 1711-223344</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-maroon-800 shrink-0" />
                <span>admissions@psyche.edu.bd</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-maroon-800 shrink-0 mt-0.5" />
                <span>{t('footer.hours')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/contact" className="hover:text-maroon-800 transition-colors font-medium">{t('footer.helpDesk')}</Link>
            <Link to="/admission" className="hover:text-maroon-800 transition-colors font-medium">{t('nav.admission')}</Link>
            <Link to="/student-portal" className="text-maroon-800 hover:text-maroon-900 transition-colors font-bold">{t('nav.studentPortal')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
