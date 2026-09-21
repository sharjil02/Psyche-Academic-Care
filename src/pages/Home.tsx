import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { ResultCard } from '../components/ResultCard';
import { resultsData, statisticsOverview } from '../data/results';
import { initialAdminNotices, AdminNotice } from '../data/adminData';
import { StudentResult } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Microscope, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Calendar,
  X,
  AlertCircle,
  Bell,
  Layers,
  Lightbulb,
} from 'lucide-react';

export const Home: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const [featuredResults, setFeaturedResults] = useState<StudentResult[]>(() => {
    try {
      const saved = localStorage.getItem('psyche_public_results');
      const list = saved ? JSON.parse(saved) : resultsData;
      return list.slice(0, 3);
    } catch {
      return resultsData.slice(0, 3);
    }
  });

  useEffect(() => {
    const handleResultsUpdate = () => {
      try {
        const saved = localStorage.getItem('psyche_public_results');
        const list = saved ? JSON.parse(saved) : resultsData;
        setFeaturedResults(list.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleResultsUpdate);
    window.addEventListener('resultsUpdate', handleResultsUpdate);
    return () => {
      window.removeEventListener('storage', handleResultsUpdate);
      window.removeEventListener('resultsUpdate', handleResultsUpdate);
    };
  }, []);

  const [selectedNoticeModal, setSelectedNoticeModal] = useState<AdminNotice | null>(null);

  const [homeNotices] = useState<AdminNotice[]>(() => {
    const saved = localStorage.getItem('pschye_admin_notices');
    const all: AdminNotice[] = saved ? JSON.parse(saved) : initialAdminNotices;
    return all.filter(n => !n.target || n.target === 'home' || n.target === 'both');
  });

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION & KEY STATS */}
      <Hero />

      {/* 1.5. HOME PAGE OFFICIAL NOTICES */}
      {homeNotices.length > 0 && (
        <section className="bg-gradient-to-b from-maroon-50/50 via-white to-slate-50/40 py-10 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-maroon-100 text-maroon-800 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-maroon-800 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>{isBangla ? 'সর্বশেষ অফিশিয়াল নোটিশ' : 'Official Notice Board'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-maroon-800 text-white uppercase">
                      {isBangla ? 'হোম বিজ্ঞপ্তি' : 'Latest'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBangla ? 'ভর্তি, পরীক্ষা ও প্রাতিষ্ঠানিক সকল গুরুত্বপূর্ণ নোটিশ' : 'Important announcements for students and parents'}
                  </p>
                </div>
              </div>

              <Link
                to="/student-portal"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-800 hover:text-maroon-900 transition-colors self-start sm:self-auto"
              >
                <span>{isBangla ? 'স্টুডেন্ট পোর্টাল নোটিশ' : 'Student Portal Notices'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {homeNotices.slice(0, 3).map((n) => {
                const catColor: Record<string, string> = {
                  Academic: 'bg-rose-50 text-maroon-800 border-rose-200',
                  Exam: 'bg-blue-50 text-blue-700 border-blue-200',
                  Holiday: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  Fee: 'bg-amber-50 text-amber-700 border-amber-200',
                  General: 'bg-slate-100 text-slate-700 border-slate-200',
                };
                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNoticeModal(n)}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${catColor[n.category] || catColor.General}`}>
                          {n.category}
                        </span>
                        {n.priority === 'Urgent' && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 border border-rose-200">
                            <AlertCircle className="w-2.5 h-2.5" />
                            {isBangla ? 'জরুরি' : 'URGENT'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-maroon-800 transition-colors line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {n.body}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {n.publishedDate}
                      </span>
                      <span className="font-bold text-maroon-800 group-hover:underline inline-flex items-center gap-1">
                        {isBangla ? 'বিস্তারিত' : 'Details'} &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* NOTICE DETAIL MODAL */}
      {selectedNoticeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedNoticeModal(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-maroon-50 text-maroon-800 border border-maroon-200">
                  {selectedNoticeModal.category}
                </span>
                {selectedNoticeModal.priority === 'Urgent' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 border border-rose-200">
                    {isBangla ? 'জরুরি' : 'URGENT'}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedNoticeModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {selectedNoticeModal.title}
              </h3>
              <div className="text-xs text-slate-400 flex items-center gap-3">
                <span>{isBangla ? 'প্রকাশক:' : 'Published by:'} <strong className="text-slate-600">{selectedNoticeModal.publishedBy}</strong></span>
                <span>•</span>
                <span>{selectedNoticeModal.publishedDate}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedNoticeModal.body}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedNoticeModal(null)}
                className="px-5 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                {isBangla ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

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
