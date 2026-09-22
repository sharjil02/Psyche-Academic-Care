import React from 'react';
import { useLocation } from 'react-router-dom';
import { AdmissionForm } from '../components/AdmissionForm';
import { 
  FileText, 
  CheckCircle2, 
  Phone, 
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Admission: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCourse = searchParams.get('course') || '';

  const steps = isBangla ? [
    {
      num: '০১',
      title: 'অনলাইন আবেদন জমা দিন',
      desc: 'ওয়েবসাইটে শিক্ষার্থী ও অভিভাবকের তথ্য প্রদান করে পছন্দের কোর্স নির্বাচন করুন।'
    },
    {
      num: '০২',
      title: 'ব্যাচ ও শিক্ষক নির্ধারণ',
      desc: 'শিক্ষার্থীর লক্ষ্য ও শিডিউল অনুযায়ী উপযুক্ত ব্যাচে ভর্তি নিশ্চিত করা হয়।'
    }
  ] : [
    {
      num: '01',
      title: 'Submit Online Application',
      desc: 'Complete the student and parent details on this portal with preferred course choices.'
    },
    {
      num: '02',
      title: 'Batch & Mentor Allocation',
      desc: 'Get placed in a calibrated peer group matching your target goals and schedule preferences.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-maroon-50/70 via-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-4 border border-maroon-200">
            <span>{t('admission.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t('admission.title')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('admission.subtitle')}
          </p>
        </div>
      </section>

      {/* 2 Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-maroon-800 mb-4 text-center sm:text-left">
            {isBangla ? 'ভর্তি প্রক্রিয়ার সহজ ২টি ধাপ' : 'Simple 2-Step Admission Journey'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 relative">
                <span className="text-2xl font-black text-rose-400 block mb-1">
                  {step.num}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Admission Form & Sidebar Support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Component */}
          <div className="lg:col-span-8">
            <AdmissionForm initialCourse={initialCourse} />
          </div>

          {/* Sidebar Info & Helpline */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Helpline Box */}
            <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-maroon-700/50 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">
                {isBangla ? 'ভর্তি সংক্রান্ত যেকোনো সহায়তা প্রয়োজন?' : 'Need Admission Assistance?'}
              </h3>
              <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed">
                {isBangla
                  ? 'আমাদের ফ্রন্ট ডেস্ক কাউন্সিলররা প্রতিদিন সকাল ৮:০০ থেকে রাত ৮:৩০ পর্যন্ত কোর্স, ব্যাচ ও ফি সংক্রান্ত সকল প্রশ্নের উত্তর প্রদানে প্রস্তুত।'
                  : 'Our front desk counselors are available daily from 8:00 AM to 8:30 PM to answer course inquiries, batch availability, and fee details.'}
              </p>
              <div className="pt-2 border-t border-white/20 text-sm">
                <a href="tel:+8801683334080" className="font-bold text-amber-300 text-lg hover:underline block">
                  +880 1683-334080
                </a>
                <div className="text-xs text-rose-200 mt-0.5">
                  {isBangla ? 'জিইসি মোড়, চট্টগ্রাম-৪০০০, বাংলাদেশ' : 'GEC Circle, Chattogram-4000, Bangladesh'}
                </div>
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-maroon-700" />
                <span>{isBangla ? 'ভর্তির সময় প্রয়োজনীয় কাগজপত্র' : 'Documents for Verification'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-maroon-700 shrink-0 mt-0.5" />
                  <span>{isBangla ? 'শিক্ষার্থীর ১ কপি পাসপোর্ট সাইজ ছবি' : '1 passport-sized photographs of student'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-maroon-700 shrink-0 mt-0.5" />
                  <span>{isBangla ? 'ভর্তি ফি ৫০০ টাকা (অফেরতযোগ্য)' : '500 tk For admission (Not Refundable)'}</span>
                </li>
              </ul>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="bg-rose-50/70 rounded-3xl p-6 border border-rose-200/80 space-y-2">
              <div className="flex items-center gap-2 text-maroon-800 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-maroon-700" />
                <span>{isBangla ? 'স্বচ্ছ ও আস্থাশীল ভর্তি নীতি' : 'Transparent & Fair Admission'}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isBangla
                  ? 'আমরা সম্পূর্ণ স্বচ্ছ শিক্ষায় বিশ্বাসী। ভর্তি হওয়া যেকোনো শিক্ষার্থী ২টি ট্রায়াল ক্লাসে অংশ নিতে পারবে; কোনো কারণে সন্তুষ্ট না হলে টিউশন ফি সম্পূর্ণ ফেরতযোগ্য।'
                  : 'We believe in complete transparency. Enrolled students can attend 2 trial sessions; if not fully satisfied, course tuition is refunded unconditionally.'}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
