import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { ResultCard } from '../components/ResultCard';
import { resultsData, statisticsOverview } from '../data/results';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Microscope, 
  Lightbulb, 
  Layers
} from 'lucide-react';

export const Home: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const featuredResults = resultsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION & KEY STATS */}
      <Hero />

      {/* 2. WHY CHOOSE PSYCHE ACADEMIC CARE */}
      <section className="py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={t('home.whyChooseBadge')}
            title={t('home.whyChooseTitle')}
            description={t('home.whyChooseSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-maroon-800 transition-colors">
                {t('home.feature1Title')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.feature1Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-maroon-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-maroon-800 transition-colors">
                {t('home.feature2Title')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.feature2Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Microscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-maroon-800 transition-colors">
                {t('home.feature3Title')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.feature3Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-maroon-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-maroon-800 transition-colors">
                {t('home.feature4Title')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.feature4Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-maroon-800 transition-colors">
                {t('home.feature5Title')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.feature5Desc')}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-maroon-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-maroon-800 transition-colors">
                {t('home.feature6Title')}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('home.feature6Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR ACHIEVEMENTS SECTION */}
      <section className="py-20 bg-rose-50/60 text-slate-800 relative overflow-hidden border-t border-b border-rose-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-maroon-800 border border-rose-200 shadow-xs mb-3">
              <Award className="w-3.5 h-3.5 text-rose-600" />
              {t('home.milestonesBadge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('home.milestonesTitle')}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {t('home.milestonesSubtitle')}
            </p>
          </div>

          {/* Stat Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs text-center">
              <div className="text-3xl sm:text-4xl font-black text-maroon-800">
                {isBangla ? '৯৫%' : statisticsOverview.gpa5Percentage}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{t('home.statGpa5')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs text-center">
              <div className="text-3xl sm:text-4xl font-black text-rose-600">
                {isBangla ? '৭৫০+' : statisticsOverview.medicalAndEngineeringPlacements}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{t('home.statBuetMed')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs text-center">
              <div className="text-3xl sm:text-4xl font-black text-maroon-800">
                {isBangla ? '৮,৫০০+' : statisticsOverview.totalStudentsTaught}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{t('home.statStudents')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs text-center">
              <div className="text-3xl sm:text-4xl font-black text-rose-600">
                {isBangla ? '৯৯.৪%' : statisticsOverview.overallSuccessRate}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{t('home.statSuccessRate')}</div>
            </div>
          </div>

          {/* Featured Top Students Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResults.map(result => (
              <ResultCard key={result.id} result={result} isFeatured={true} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm shadow-md transition-colors border-b-2 border-maroon-500"
            >
              <span>{t('home.exploreResults')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CALL-TO-ACTION SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-800 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('home.ctaBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {t('home.ctaTitle')}
          </h2>

          <p className="text-rose-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('home.ctaSubtitle')}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/admission"
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-maroon-950 font-extrabold text-base shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {t('home.ctaApply')}
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-maroon-800/70 hover:bg-maroon-800 text-white font-bold text-base border border-maroon-600/40 backdrop-blur-xs transition-all"
            >
              {t('home.ctaVisit')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
