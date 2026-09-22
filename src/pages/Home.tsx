import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { ResultCard } from '../components/ResultCard';
import { resultsData, statisticsOverview } from '../data/results';
import { initialAdminNotices, AdminNotice, BatchInfo, initialAdminBatches } from '../data/adminData';
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
  Users,
  Clock,
  Building,
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

  const [homeNotices, setHomeNotices] = useState<AdminNotice[]>(() => {
    try {
      const saved = localStorage.getItem('pschye_admin_notices');
      const all: AdminNotice[] = saved ? JSON.parse(saved) : initialAdminNotices;
      return all.filter(n => !n.target || n.target === 'home' || n.target === 'both');
    } catch {
      return initialAdminNotices.filter(n => !n.target || n.target === 'home' || n.target === 'both');
    }
  });

  useEffect(() => {
    const handleNoticesUpdate = () => {
      try {
        const saved = localStorage.getItem('pschye_admin_notices');
        const all: AdminNotice[] = saved ? JSON.parse(saved) : initialAdminNotices;
        setHomeNotices(all.filter(n => !n.target || n.target === 'home' || n.target === 'both'));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleNoticesUpdate);
    return () => {
      window.removeEventListener('storage', handleNoticesUpdate);
    };
  }, []);

  const [homeBatches, setHomeBatches] = useState<BatchInfo[]>(() => {
    try {
      const saved = localStorage.getItem('pschye_admin_batches');
      if (saved) {
        const parsed: BatchInfo[] = JSON.parse(saved);
        return parsed.map(b => {
          const match = initialAdminBatches.find(init => init.id === b.id || init.code === b.code);
          return {
            ...match,
            ...b,
            photo: b.photo || match?.photo || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
            monthlyFee: b.monthlyFee || match?.monthlyFee || 2500,
            shortDescription: b.shortDescription || match?.shortDescription || '',
            status: b.status || match?.status || 'Admissions Open',
          };
        });
      }
      return initialAdminBatches;
    } catch {
      return initialAdminBatches;
    }
  });

  const [selectedBatchClass, setSelectedBatchClass] = useState<string>('All');

  useEffect(() => {
    const handleBatchesUpdate = () => {
      try {
        const saved = localStorage.getItem('pschye_admin_batches');
        if (saved) {
          const parsed: BatchInfo[] = JSON.parse(saved);
          setHomeBatches(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleBatchesUpdate);
    window.addEventListener('batchesUpdate', handleBatchesUpdate);
    return () => {
      window.removeEventListener('storage', handleBatchesUpdate);
      window.removeEventListener('batchesUpdate', handleBatchesUpdate);
    };
  }, []);

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

      {/* 3. ACADEMIC COURSES & BATCHES SHOWCASE */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={isBangla ? 'একাডেমিক ব্যাচ ও কোর্স' : 'Academic Courses & Batches'}
            title={isBangla ? 'আমাদের বিশেষায়িত কোচিং ব্যাচসমূহ' : 'Our Specialized Academic Batches'}
            description={isBangla 
              ? 'নির্দিষ্ট সীমিত আসনসংখ্যা, বিষয়ভিত্তিক অভিজ্ঞ শিক্ষক এবং বোর্ড পরীক্ষার পুঙ্খানুপুঙ্খ প্রস্তুতি।' 
              : 'Strictly capped batches with expert faculty, board-aligned curriculum, and continuous personal mentoring.'}
          />

          {/* Quick Filter Chips */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 scrollbar-none">
            {[
              { id: 'All', label: isBangla ? 'সকল ব্যাচ' : 'All Batches' },
              { id: 'Class 8', label: isBangla ? '৮ম শ্রেণি' : 'Class 8' },
              { id: 'Class 9', label: isBangla ? '৯ম শ্রেণি' : 'Class 9' },
              { id: 'Class 10', label: isBangla ? '১০ম শ্রেণি' : 'Class 10' },
              { id: 'SSC Special', label: isBangla ? 'এসএসসি স্পেশাল' : 'SSC Special' },
              { id: 'HSC', label: isBangla ? 'এইচএসসি' : 'HSC' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedBatchClass(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedBatchClass === tab.id
                    ? 'bg-maroon-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Batches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {homeBatches
              .filter(b => {
                if (selectedBatchClass === 'All') return true;
                return b.targetClass.toLowerCase().includes(selectedBatchClass.toLowerCase()) ||
                       b.name.toLowerCase().includes(selectedBatchClass.toLowerCase());
              })
              .map(b => (
                <div
                  key={b.id}
                  className="rounded-3xl border border-slate-200 bg-white hover:border-maroon-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Photo & Overlay Badges */}
                  <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={b.photo || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-black/20" />
                    
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-white/95 text-maroon-900 shadow-sm border border-white/40">
                        {b.code}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        b.status === 'Full'
                          ? 'bg-rose-600 text-white'
                          : b.status === 'Upcoming'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {b.status || 'Admissions Open'}
                      </span>
                    </div>

                    {b.monthlyFee && (
                      <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-xl bg-maroon-900/90 backdrop-blur-xs text-white text-xs font-black shadow-md border border-white/20">
                        ৳{b.monthlyFee.toLocaleString()}/{isBangla ? 'মাস' : 'mo'}
                      </div>
                    )}

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <span className="text-[11px] font-bold text-rose-200 block uppercase tracking-wider mb-0.5">
                        {b.targetClass}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-xs line-clamp-1">
                        {b.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    {b.shortDescription && (
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {b.shortDescription}
                      </p>
                    )}

                    {/* Schedule & Info Pill Box */}
                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                      {b.schedule && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-maroon-700 shrink-0" />
                          <span className="truncate"><strong>{isBangla ? 'সময়:' : 'Time:'}</strong> {b.schedule}</span>
                        </div>
                      )}
                      {b.instructor && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-maroon-700 shrink-0" />
                          <span className="truncate"><strong>{isBangla ? 'শিক্ষক:' : 'Faculty:'}</strong> {b.instructor}</span>
                        </div>
                      )}
                      {b.room && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-maroon-700 shrink-0" />
                          <span className="truncate"><strong>{isBangla ? 'রুম:' : 'Room:'}</strong> {b.room}</span>
                        </div>
                      )}
                    </div>

                    {/* Seat Occupancy Meter (if capacity is defined) */}
                    {b.capacity && b.capacity > 0 ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                          <span>{isBangla ? 'আসন প্রাপ্যতা' : 'Seat Availability'}</span>
                          <span className={`font-bold ${(b.enrolledCount || 0) >= b.capacity ? 'text-rose-600' : 'text-slate-900'}`}>
                            {b.enrolledCount || 0} / {b.capacity} {isBangla ? 'ভর্তি সম্পন্ন' : 'Enrolled'}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              (b.enrolledCount || 0) >= b.capacity ? 'bg-rose-500' : 'bg-gradient-to-r from-maroon-800 to-rose-600'
                            }`}
                            style={{ width: `${Math.min(100, Math.round(((b.enrolledCount || 0) / b.capacity) * 100))}%` }}
                          />
                        </div>
                      </div>
                    ) : null}

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center gap-2.5">
                      <Link
                        to={`/admission?course=${encodeURIComponent(b.name)}`}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{isBangla ? 'আবেদন করুন' : 'Apply Now'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/courses"
                        className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      >
                        {isBangla ? 'বিস্তারিত' : 'Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Section Footer Link */}
          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-maroon-50 text-maroon-800 font-bold text-sm border-2 border-maroon-800 shadow-sm transition-all hover:shadow-md"
            >
              <span>{isBangla ? 'সকল ব্যাচ ও পূর্ণাঙ্গ সিলেবাস দেখুন' : 'Explore All Batches & Courses'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
