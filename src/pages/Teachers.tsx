import React, { useState, useRef, useEffect } from 'react';
import { TeacherCard } from '../components/TeacherCard';
import { teachersData } from '../data/teachers';
import { Teacher } from '../types';
import { Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Teachers: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mouse drag-to-slide state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const subjects = [
    { id: 'All', label: isBangla ? 'সকল বিভাগ' : 'All Departments' },
    { id: 'Physics & Higher Mathematics', label: isBangla ? 'পদার্থ ও উচ্চতর গণিত' : 'Physics & Higher Mathematics' },
    { id: 'Chemistry', label: isBangla ? 'রসায়ন' : 'Chemistry' },
    { id: 'English & Creative Writing', label: isBangla ? 'ইংরেজি' : 'English & Creative Writing' },
    { id: 'Biology & Medical Science', label: isBangla ? 'জীববিজ্ঞান' : 'Biology & Medical Science' },
    { id: 'General Mathematics & ICT', label: isBangla ? 'সাধারণ গণিত ও আইসিটি' : 'General Mathematics & ICT' },
    { id: 'Accounting & Business Studies', label: isBangla ? 'ব্যবসায় শিক্ষা' : 'Accounting & Business Studies' }
  ];

  const checkScroll = () => {
    const el = sliderRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const slide = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const distance = 260;
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = sliderRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const [teachersList] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('pschye_admin_faculty');
    if (saved) {
      try {
        const adminFac: any[] = JSON.parse(saved);
        const customTeachers: Teacher[] = adminFac.map((f, idx) => ({
          id: f.id || `custom-${idx}`,
          name: f.name,
          subject: f.subjectExpertise || 'General',
          qualification: f.qualification || 'Educator',
          experience: f.designation || 'Faculty Member',
          shortBio: `${f.designation} with expertise in ${f.subjectExpertise}. Available for student consultation and academic guidance.`,
          photo: f.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
          specialty: f.subjectExpertise || 'General Science & Math',
          rating: 4.9,
          classesHandled: 'All Batches',
        }));
        const nameSet = new Set(teachersData.map(t => t.name.toLowerCase()));
        const uniqueAdminTeachers = customTeachers.filter(t => !nameSet.has(t.name.toLowerCase()));
        return [...uniqueAdminTeachers, ...teachersData];
      } catch {
        return teachersData;
      }
    }
    return teachersData;
  });

  const filteredTeachers = selectedSubject === 'All'
    ? teachersList
    : teachersList.filter(t => t.subject.toLowerCase().includes(selectedSubject.toLowerCase()) || t.specialty.toLowerCase().includes(selectedSubject.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-maroon-50/70 via-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-4 border border-maroon-200">
            <Users className="w-3.5 h-3.5" />
            <span>{t('teachers.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t('teachers.title')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('teachers.subtitle')}
          </p>
        </div>
      </section>

      {/* Sliding Subject Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="relative flex items-center bg-white/60 p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
          
          {/* Left Slide Arrow */}
          <button
            type="button"
            onClick={() => slide('left')}
            disabled={!canScrollLeft}
            aria-label="Slide left"
            className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all z-10 mr-1.5 ${
              canScrollLeft
                ? 'bg-white border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 hover:text-maroon-800 cursor-pointer active:scale-95'
                : 'bg-slate-100/60 border-slate-200/50 text-slate-300 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Left Fade Gradient Mask */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute left-12 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
          )}

          {/* Sliding Pills Container */}
          <div
            ref={sliderRef}
            onScroll={checkScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth py-1 scrollbar-none cursor-grab active:cursor-grabbing select-none w-full"
          >
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={(e) => {
                  setSelectedSubject(sub.id);
                  (e.currentTarget as HTMLElement).scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                  });
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedSubject === sub.id
                    ? 'bg-maroon-800 text-white shadow-xs scale-100'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Right Fade Gradient Mask */}
          {canScrollRight && (
            <div className="pointer-events-none absolute right-12 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
          )}

          {/* Right Slide Arrow */}
          <button
            type="button"
            onClick={() => slide('right')}
            disabled={!canScrollRight}
            aria-label="Slide right"
            className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all z-10 ml-1.5 ${
              canScrollRight
                ? 'bg-white border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50 hover:text-maroon-800 cursor-pointer active:scale-95'
                : 'bg-slate-100/60 border-slate-200/50 text-slate-300 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>

      {/* Faculty Philosophy Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-maroon-950">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                {isBangla ? 'আমাদের শিক্ষাদর্শন' : 'Our Teaching Philosophy'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isBangla 
                  ? '"কোনো প্রশ্নই ছোট নয়, কোনো অধ্যায়ই অসম্ভব কঠিন নয়।"'
                  : '"No Question Is Too Small, No Concept Too Challenging."'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {isBangla
                  ? 'সাইকি একাডেমিক কেয়ারে প্রতিটি শিক্ষকের সাথে যেকোনো একাডেমিক সমস্যা নিয়ে সরাসরি আলোচনার সুযোগ রয়েছে। ক্লাসের বাইরেও শিক্ষার্থীরা যেকোনো কঠিন অঙ্ক বা দ্বিধাদ্বন্দ্ব সমাধানের জন্য শিক্ষকদের আন্তরিক সহায়তা পায়।'
                  : 'At PSYCHE Academic Care, our teachers hold an open-door policy. Beyond standard lecture periods, students are encouraged to seek personalized counsel to dissect difficult homework questions, explore competitive problem variations, or receive mental encouragement before major tests.'}
              </p>
            </div>
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 text-center">
              <Award className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">
                {isBangla ? 'শিক্ষক বা মেন্টর পরামর্শ প্রয়োজন?' : 'Need Faculty Consultation?'}
              </h4>
              <p className="text-xs text-slate-300">
                {isBangla 
                  ? 'অভিভাবকরা যেকোনো কর্মদিবসে বিভাগীয় প্রধান বা শিক্ষকের সাথে অগ্রগতির আলোচনায় বসতে পারেন।'
                  : 'Guardians can book a 1-on-1 progress meeting with our department heads anytime during weekday office hours.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
