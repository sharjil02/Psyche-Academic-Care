import React, { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { NoticeCard } from '../components/NoticeCard';
import { noticesData } from '../data/notices';
import { Notice as NoticeType } from '../types';
import { Bell, Search, Filter, AlertCircle, Info, Calendar } from 'lucide-react';

export const Notice: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Admission Notice',
    'Exam Notice',
    'Holiday Notice',
    'Result Publication',
    'Important Announcement'
  ];

  const filteredNotices = noticesData.filter(notice => {
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesQuery = 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-maroon-50/70 via-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-4 border border-maroon-200">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Announcements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Academic Notice Board
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with official circulars, examination updates, holiday notifications, and institutional announcements from PSYCHE Academic Care.
          </p>
        </div>
      </section>

      {/* Urgent Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-rose-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-maroon-700/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-rose-200 block">
                Immediate Attention:
              </span>
              <p className="text-sm sm:text-base font-bold">
                Admissions for SSC & HSC 2026-2027 Batches are currently underway. Limited seats per room.
              </p>
            </div>
          </div>
          <span className="hidden md:inline-block px-3 py-1 rounded-lg bg-white/15 text-xs font-semibold backdrop-blur-xs shrink-0">
            Session 2026
          </span>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-maroon-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'All' ? 'All Notices' : cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars and notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-maroon-100 focus:border-maroon-600 bg-slate-50/50"
            />
          </div>

        </div>

        <div className="mt-4 px-1 text-xs font-semibold text-slate-500 flex items-center justify-between">
          <span>Displaying {filteredNotices.length} published circulars</span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-maroon-800 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>
      </section>

      {/* Notices Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotices.map(notice => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No notices found</h3>
            <p className="text-sm text-slate-500 mt-1">Try clearing your search query or selecting another category.</p>
          </div>
        )}
      </section>

      {/* SMS & Notice Advisory */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 text-slate-600 text-xs flex flex-col sm:flex-row items-center justify-center gap-3">
          <Info className="w-5 h-5 text-maroon-800 shrink-0" />
          <span>
            Registered guardians also receive urgent examination updates and unpredicted holiday alerts directly via registered mobile phone SMS.
          </span>
        </div>
      </section>
    </div>
  );
};
