import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Trophy, 
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t, isBangla } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-maroon-50/60 via-white to-slate-50/70 pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-maroon-100/60">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-maroon-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Name & Heading */}
            <div className="space-y-2">
              <span className="text-sm sm:text-base font-bold text-maroon-800 uppercase tracking-widest block">
                {isBangla ? 'সাইকি একাডেমিক কেয়ার' : 'PSYCHE Academic Care'}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {t('hero.titlePrefix')} <span className="text-maroon-800">{t('hero.titleQuality')}</span> <span className="text-maroon-500">{t('hero.titleEducation')}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-maroon-600 shrink-0" />
                <span>{t('hero.bullet1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-maroon-600 shrink-0" />
                <span>{t('hero.bullet2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-maroon-600 shrink-0" />
                <span>{t('hero.bullet3')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-maroon-600 shrink-0" />
                <span>{t('hero.bullet4')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-base shadow-sm hover:shadow-md transition-all duration-200 group border-b-2 border-maroon-500"
              >
                <span>{t('hero.joinNow')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-maroon-50/50 text-slate-800 hover:text-maroon-900 font-bold text-base border border-slate-200 shadow-xs hover:border-maroon-300 transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-maroon-700" />
                <span>{t('hero.exploreCourses')}</span>
              </Link>
            </div>

          </div>

          {/* Right Hero Graphic / Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Illustration / Photo Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-maroon-100 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Students studying enthusiastically at Psyche Academic Care"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                
                {/* Overlay gradient badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-xs uppercase tracking-wider font-semibold text-rose-300">
                      {isBangla ? 'সাইকি একাডেমিক শ্রেষ্ঠত্ব' : 'PSYCHE Academic Excellence'}
                    </p>
                    <p className="text-lg font-bold">
                      {t('hero.classroomCaption')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white rounded-xl p-3.5 shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-maroon-50 text-maroon-800 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">{t('hero.badgeBoardExam')}</div>
                  <div className="text-sm font-bold text-slate-900">{t('hero.badgeSuccess')}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Statistics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 hover:border-maroon-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2.5xl sm:text-3xl font-black text-slate-900 leading-none">{t('hero.statTeachersVal')}</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{t('hero.statTeachers')}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 hover:border-maroon-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-maroon-600 flex items-center justify-center shrink-0">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <div className="text-2.5xl sm:text-3xl font-black text-slate-900 leading-none">{t('hero.statSuccessVal')}</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{t('hero.statSuccess')}</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 hover:border-maroon-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2.5xl sm:text-3xl font-black text-slate-900 leading-none">{t('hero.statExpVal')}</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">{t('hero.statExp')}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
