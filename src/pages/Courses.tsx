import React, { useState, useMemo } from 'react';
import { CourseCard } from '../components/CourseCard';
import { coursesData } from '../data/courses';
import { Search, BookOpen, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Courses: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', label: isBangla ? 'সকল ব্যাচ ও কোর্স' : 'All Batches' },
    { id: 'Class 8', label: isBangla ? '৮ম শ্রেণি' : 'Class 8' },
    { id: 'Class 9 (Science)', label: isBangla ? '৯ম শ্রেণি (বিজ্ঞান)' : 'Class 9 (Science)' },
    { id: 'Class 9 (Commerce)', label: isBangla ? '৯ম শ্রেণি (ব্যবসায় শিক্ষা)' : 'Class 9 (Commerce)' },
    { id: 'Class 10 (Science)', label: isBangla ? '১০ম শ্রেণি (বিজ্ঞান)' : 'Class 10 (Science)' },
    { id: 'Class 10 (Commerce)', label: isBangla ? '১০ম শ্রেণি (ব্যবসায় শিক্ষা)' : 'Class 10 (Commerce)' },
    { id: 'SSC Special Batch', label: isBangla ? 'এসএসসি স্পেশাল ব্যাচ' : 'SSC Special Batch' },
    { id: 'HSC (Science)', label: isBangla ? 'এইচএসসি (বিজ্ঞান)' : 'HSC (Science)' },
    { id: 'HSC (Commerce)', label: isBangla ? 'এইচএসসি (ব্যবসায় শিক্ষা)' : 'HSC (Commerce)' },
  ];

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesQuery = 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-8 sm:pt-10">
      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-maroon-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isBangla ? 'কোর্স বা বিষয় খুঁজুন...' : 'Search by course or subject...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-100 focus:border-maroon-600 bg-slate-50/50"
            />
          </div>

        </div>

        {/* Results Counter */}
        <div className="mt-4 text-xs font-semibold text-slate-500 px-1 flex items-center justify-between">
          <span>
            {isBangla 
              ? `${filteredCourses.length} টি কোর্স প্রদর্শিত হচ্ছে` 
              : `Showing ${filteredCourses.length} ${filteredCourses.length === 1 ? 'course' : 'courses'}`}
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-maroon-800">
              {isBangla ? `ফিল্টার: ${selectedCategory}` : `Filtered by: ${selectedCategory}`}
            </span>
          )}
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              {isBangla ? 'কোনো কোর্স খুঁজে পাওয়া যায়নি' : 'No courses match your search criteria'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {isBangla ? 'অন্য ক্যাটাগরি বেছে নিন অথবা সার্চ পরিবর্তন করুন।' : 'Try selecting another category or clearing your search term.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-maroon-800 text-white text-xs font-bold hover:bg-maroon-900 transition-colors"
            >
              {isBangla ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
            </button>
          </div>
        )}
      </section>

      {/* Special Highlights Info Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-r from-maroon-50 via-rose-50 to-white rounded-3xl border border-maroon-100 p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isBangla ? 'বিশেষ প্রিন্টেড লেকচার শিট' : 'Custom Printed Lecture Notes'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isBangla 
                    ? 'ভর্তির সাথে প্রতিটি শিক্ষার্থী পায় বিশেষ স্পাইরাল-বাইন্ড থিওরি শিট ও সূত্র সংকলন।'
                    : 'Every student receives exclusive spiral-bound theory booklets & formulas with enrollment.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isBangla ? 'এসএমএস উপস্থিতি ও পরীক্ষার নম্বর' : 'SMS Attendance & Test Updates'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isBangla
                    ? 'অভিভাবকরা তাৎক্ষণিক এসএমএসের মাধ্যমে ক্লাসে উপস্থিতি ও মডেল টেস্টের রেজাল্ট পান।'
                    : 'Guardians receive instant SMS notifications regarding student attendance and mock test marks.'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isBangla ? 'স্কলারশিপ ও ফি ছাড়' : 'Scholarships & Waivers'}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {isBangla
                    ? 'জিপিএ ৫ প্রাপ্ত এবং মেধাবীদের জন্য ৫০% পর্যন্ত বিশেষ টিউশন ফি মওকুফ সুবিধা।'
                    : 'Merit-based tuition concessions of up to 50% for GPA 5.00 achievers and talentpool students.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
