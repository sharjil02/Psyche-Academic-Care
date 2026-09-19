import React, { useState } from 'react';
import { ResultCard } from '../components/ResultCard';
import { resultsData, statisticsOverview } from '../data/results';
import { 
  Trophy, 
  Search
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Results: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedExamType, setSelectedExamType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const years = [
    { id: 'All', label: isBangla ? 'সব বছর' : 'All Years' },
    { id: '2026', label: '2026' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' }
  ];

  const examTypes = [
    { id: 'All', label: isBangla ? 'সকল পরীক্ষার ক্যাটাগরি' : 'All Exam Categories' },
    { id: 'SSC Science', label: isBangla ? 'এসএসসি বিজ্ঞান' : 'SSC Science' },
    { id: 'HSC Science', label: isBangla ? 'এইচএসসি বিজ্ঞান' : 'HSC Science' },
    { id: 'HSC Commerce', label: isBangla ? 'এইচএসসি ব্যবসায় শিক্ষা' : 'HSC Commerce' },
    { id: 'Medical Entrance', label: isBangla ? 'মেডিকেল ভর্তি পরীক্ষা' : 'Medical Entrance' },
    { id: 'Engineering Entrance', label: isBangla ? 'ইঞ্জিনিয়ারিং ভর্তি পরীক্ষা' : 'Engineering Entrance' }
  ];

  const filteredResults = resultsData.filter(res => {
    const matchesYear = selectedYear === 'All' || res.year.toString() === selectedYear;
    const matchesType = selectedExamType === 'All' || res.examType === selectedExamType;
    const matchesQuery = 
      res.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesType && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-maroon-50/70 via-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-4 border border-maroon-200">
            <Trophy className="w-3.5 h-3.5" />
            <span>{t('results.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t('results.title')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('results.subtitle')}
          </p>
        </div>
      </section>

      {/* Achievement Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-maroon-800">
                {statisticsOverview.gpa5Percentage}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                {isBangla ? 'বোর্ড জিপিএ ৫.০০ হার' : 'Board GPA 5.00 Rate'}
              </div>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-rose-700">
                {statisticsOverview.medicalAndEngineeringPlacements}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                {isBangla ? 'বুয়েট, ঢাবি ও মেডিকেল চান্স' : 'BUET, DU & Medical Admissions'}
              </div>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-amber-500">
                {statisticsOverview.overallSuccessRate}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                {isBangla ? 'মোট পাশের হার' : 'Total Exam Pass Percentage'}
              </div>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <div className="text-3xl sm:text-4xl font-black text-maroon-900">
                {isBangla ? '১ম স্থান' : '1st Rank'}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                {isBangla ? 'ঢাকা ও চট্টগ্রাম বোর্ড মেধা তালিকা' : 'Board Merit List Distinction'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Year Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {years.map(y => (
                <button
                  key={y.id}
                  onClick={() => setSelectedYear(y.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedYear === y.id
                      ? 'bg-white text-maroon-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {y.label}
                </button>
              ))}
            </div>

            {/* Exam Type Filter */}
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-100 focus:border-maroon-600"
            >
              {examTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isBangla ? 'শিক্ষার্থী বা প্রতিষ্ঠানের নাম দিয়ে খুঁজুন...' : 'Search student or college...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-maroon-100 focus:border-maroon-600 bg-slate-50/50"
            />
          </div>

        </div>

        <div className="mt-4 px-1 text-xs font-semibold text-slate-500 flex items-center justify-between">
          <span>
            {isBangla ? `${filteredResults.length} জন শিক্ষার্থীর ফলাফল প্রদর্শিত হচ্ছে` : `Showing ${filteredResults.length} student records`}
          </span>
          {(selectedYear !== 'All' || selectedExamType !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedYear('All');
                setSelectedExamType('All');
                setSearchQuery('');
              }}
              className="text-maroon-800 hover:underline"
            >
              {isBangla ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
            </button>
          )}
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResults.map((result, idx) => (
              <ResultCard key={result.id} result={result} isFeatured={idx < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              {isBangla ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results found'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {isBangla ? 'বছর বা পরীক্ষা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try resetting the year or exam filter.'}
            </p>
          </div>
        )}
      </section>

      {/* Verification Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-10 text-xs text-slate-500">
        <p>
          {isBangla
            ? '* এই পৃষ্ঠায় প্রকাশিত সমস্ত পরীক্ষার ফলাফল, মেধা ক্রম এবং প্রতিষ্ঠানের তথ্য পরীক্ষার্থীর বোর্ড অ্যাডমিট কার্ড এবং সংশ্লিষ্ট বিশ্ববিদ্যালয়ের নথিপত্রের মাধ্যমে যাচাইকৃত।'
            : '* All exam scores, merit positions, and institutional affiliations published on this page are officially verified through candidate board admit cards and respective university enrollment records.'}
        </p>
      </section>
    </div>
  );
};
