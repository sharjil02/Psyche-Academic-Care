import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ResultCard } from '../components/ResultCard';
import { resultsData } from '../data/results';
import { StudentResult } from '../types';
import { 
  Trophy, 
  Search,
  Plus
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Results: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedExamType, setSelectedExamType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [resultsList, setResultsList] = useState<StudentResult[]>(() => {
    try {
      const saved = localStorage.getItem('psyche_public_results');
      return saved ? JSON.parse(saved) : resultsData;
    } catch {
      return resultsData;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('pschye_auth_user');
      const user = saved ? JSON.parse(saved) : null;
      return user?.role === 'admin';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleResultsUpdate = () => {
      try {
        const saved = localStorage.getItem('psyche_public_results');
        if (saved) {
          setResultsList(JSON.parse(saved));
        }
      } catch (e) {
        console.error(e);
      }
    };

    const handleAuthUpdate = () => {
      try {
        const saved = localStorage.getItem('pschye_auth_user');
        const user = saved ? JSON.parse(saved) : null;
        setIsAdmin(user?.role === 'admin');
      } catch {
        setIsAdmin(false);
      }
    };

    window.addEventListener('storage', handleResultsUpdate);
    window.addEventListener('resultsUpdate', handleResultsUpdate);
    window.addEventListener('authChange', handleAuthUpdate);
    return () => {
      window.removeEventListener('storage', handleResultsUpdate);
      window.removeEventListener('resultsUpdate', handleResultsUpdate);
      window.removeEventListener('authChange', handleAuthUpdate);
    };
  }, []);

  const uniqueYears = Array.from(new Set(resultsList.map(r => r.year.toString()))).sort((a, b) => Number(b) - Number(a));
  const years = [
    { id: 'All', label: isBangla ? 'সব বছর' : 'All Years' },
    ...uniqueYears.map(y => ({ id: y, label: y }))
  ];

  const examTypes = [
    { id: 'All', label: isBangla ? 'সকল পরীক্ষার ক্যাটাগরি' : 'All Exam Categories' },
    { id: 'SSC Science', label: isBangla ? 'এসএসসি বিজ্ঞান' : 'SSC Science' },
    { id: 'HSC Science', label: isBangla ? 'এইচএসসি বিজ্ঞান' : 'HSC Science' },
    { id: 'HSC Commerce', label: isBangla ? 'এইচএসসি ব্যবসায় শিক্ষা' : 'HSC Commerce' },
    { id: 'Medical Entrance', label: isBangla ? 'মেডিকেল ভর্তি পরীক্ষা' : 'Medical Entrance' },
    { id: 'Engineering Entrance', label: isBangla ? 'ইঞ্জিনিয়ারিং ভর্তি পরীক্ষা' : 'Engineering Entrance' }
  ];

  const filteredResults = resultsList.filter(res => {
    const matchesYear = selectedYear === 'All' || res.year.toString() === selectedYear;
    const matchesType = selectedExamType === 'All' || res.examType === selectedExamType;
    const matchesQuery = 
      res.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesType && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-8 sm:pt-10">
      {/* Filter and Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
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

        <div className="mt-4 px-1 text-xs font-semibold text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>
            {isBangla ? `${filteredResults.length} জন শিক্ষার্থীর ফলাফল প্রদর্শিত হচ্ছে` : `Showing ${filteredResults.length} student records`}
          </span>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin-portal"
                className="inline-flex items-center gap-1 text-maroon-800 hover:text-maroon-900 font-bold hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isBangla ? 'নতুন ফলাফল যোগ করুন' : 'Add New Result'}</span>
              </Link>
            )}
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
