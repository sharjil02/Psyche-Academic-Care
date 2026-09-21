import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../components/SectionTitle';
import { useLanguage } from '../context/LanguageContext';
import { 
  Target, 
  Eye, 
  CheckCircle2, 
  BookOpen, 
  Tv, 
  Wifi, 
  Wind, 
  Camera, 
  Users2,
  ArrowRight
} from 'lucide-react';

export const About: React.FC = () => {
  const { t, isBangla } = useLanguage();

  const facilities = [
    {
      icon: Tv,
      title: isBangla ? 'ডিজিটাল স্মার্ট ক্লাসরুম' : 'Digital Smart Classrooms',
      description: isBangla 
        ? 'প্রাণবন্ত ৩ডি বৈজ্ঞানিক সিমুলেশন এবং জ্যামিতিক প্রদর্শনের জন্য ৪কে ইউএইচডি টাচ প্যানেল সজ্জিত।' 
        : 'Equipped with 4K UHD interactive touch panels for vivid 3D scientific simulations and geometry demonstrations.'
    },
    {
      icon: Wind,
      title: isBangla ? 'শীতাতপ নিয়ন্ত্রিত পরিবেশ' : 'Air Conditioned Environment',
      description: isBangla
        ? 'গ্রীষ্মকালের ব্যস্ত সেশনে শিক্ষার্থীদের জন্য সর্বোত্তম স্বাচ্ছন্দ্য নিশ্চিত করা শীতাতপ নিয়ন্ত্রিত কক্ষ।'
        : 'Fully climate-controlled study chambers providing optimal comfort during demanding summer sessions.'
    },
    {
      icon: BookOpen,
      title: isBangla ? 'সমৃদ্ধ রেফারেন্স লাইব্রেরি' : 'Curated Reference Library',
      description: isBangla
        ? 'বোর্ড পরীক্ষার প্রশ্ন আর্কাইভ, ইঞ্জিনিয়ারিং গাইড এবং আন্তর্জাতিক বইয়ের বিশাল সংগ্রহশালা।'
        : 'Extensive repository of board question archives, engineering entrance guides, and international textbooks.'
    },
    {
      icon: Users2,
      title: isBangla ? 'ডেডিকেটেড ডাউট-ক্লিয়ারিং ল্যাব' : 'Dedicated Doubt-Clearing Lab',
      description: isBangla
        ? 'ব্যক্তিগত সমস্যা সমাধান এবং জটিল অধ্যায়ের স্পষ্ট ধারণার জন্য প্রতিদিন বিশেষ মেন্টর সাপোর্ট।'
        : 'Permanent mentor support available every afternoon for personalized problem troubleshooting.'
    },
    {
      icon: Wifi,
      title: isBangla ? 'হাই-স্পিড একাডেমিক ওয়াই-ফাই' : 'High-Speed Academic Wi-Fi',
      description: isBangla
        ? 'অনলাইন প্রশ্নব্যাংক এবং স্টুডেন্ট পোর্টালে দ্রুত অ্যাক্সেসের জন্য ক্যাম্পাসজুড়ে হাই-স্পিড ইন্টারনেট।'
        : 'Campus-wide connectivity for accessing digital question banks and the Student Portal.'
    },
    {
      icon: Camera,
      title: isBangla ? '২৪/৭ সিসিটিভি ও সার্বক্ষণিক নিরাপত্তা' : '24/7 CCTV & Campus Security',
      description: isBangla
        ? 'অভিভাবকদের নিশ্চিন্ত রাখতে সার্বক্ষণিক সিসিটিভি ক্যামেরা পর্যবেক্ষণ ও নিবেদিত সিকিউরিটি টিম।'
        : 'Continuous surveillance and dedicated safety marshals ensuring complete peace of mind for parents.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-b from-maroon-50/70 via-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-4 border border-maroon-200">
            <span>{t('nav.about')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isBangla ? 'আমাদের সম্পর্কে' : 'About'}{' '}
            <span className="text-maroon-800">{isBangla ? 'সাইকি' : 'PSYCHE'}</span>{' '}
            <span className="text-rose-700">{isBangla ? 'একাডেমিক কেয়ার' : 'Academic Care'}</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {isBangla
              ? 'ধারণাগত স্পষ্টতা ও একাডেমিক সততার সাথে প্রতিষ্ঠিত সাইকি একাডেমিক কেয়ার স্কুল, বোর্ড পরীক্ষা ও প্রতিযোগিতামূলক বিশ্ববিদ্যালয় ভর্তিতে সাফল্যের অন্যতম নির্ভরযোগ্য প্রতিষ্ঠান।'
              : "Founded with an unyielding commitment to academic integrity and conceptual clarity, PSYCHE Academic Care is a trusted hub for school, board exam, and competitive admission excellence."}
          </p>
        </div>
      </section>

      {/* Introduction Overview */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-maroon-800">
                {isBangla ? 'এক দশকেরও বেশি সময়ের সাফল্যগাথা' : 'A Decade of Academic Dedication'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                {isBangla 
                  ? 'শিক্ষার্থীদের সর্বোচ্চ সম্ভাবনা বিকাশে সর্বদা পাশে' 
                  : 'Empowering Students to Reach Their Highest Academic Potential'}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {isBangla ? (
                  <>
                    <strong className="text-slate-800">সাইকি একাডেমিক কেয়ার</strong>-এ শিক্ষাকে কখনোই শুধু মুখস্থবিদ্যার মধ্যে সীমাবদ্ধ রাখা হয় না। দশ বছরেরও বেশি সময় ধরে আমরা বাস্তব উদাহরণ, কনসেপ্টভিত্তিক শিখন এবং গভীর তত্ত্বাবধানের মাধ্যমে শিক্ষাদান করে আসছি।
                  </>
                ) : (
                  <>
                    At <strong className="text-slate-800">PSYCHE Academic Care</strong>, education is never viewed as rote memorization. Since our inception over ten years ago, we have pioneered a holistic teaching methodology that unites high-calibre educator guidance, board-calibrated assessment rigor, and empathetic one-on-one student care.
                  </>
                )}
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                {isBangla
                  ? '৮ম শ্রেণি, ৯ম ও ১০ম শ্রেণি (বিজ্ঞান ও ব্যবসায় শিক্ষা), এসএসসি স্পেশাল ব্যাচ এবং এইচএসসি (বিজ্ঞান ও ব্যবসায় শিক্ষা)-এর জন্য আমাদের পদ্ধতিগত পাঠ্যক্রম প্রতিটি শিক্ষার্থীকে আত্মবিশ্বাসী ও বোর্ড পরীক্ষায় সেরা করে গড়ে তোলে।'
                  : 'From Class 8 foundation to Class 9 & 10 (Science & Commerce), SSC Special Batch, and HSC (Science & Commerce), our systematic academic curriculum builds both deep conceptual clarity and board exam excellence.'}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-black text-maroon-800">{isBangla ? '১০+ বছর' : '10+ Years'}</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">{isBangla ? 'অভিজ্ঞতার গৌরব' : 'Proven Experience'}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl font-black text-rose-700">{isBangla ? '১২,৫০০+' : '12,500+'}</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">{isBangla ? 'কৃতী শিক্ষার্থী' : 'Students Guided'}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
                  alt="Modern classroom at PSYCHE Academic Care"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      {isBangla ? 'ক্যাম্পাসের পরিবেশ' : 'Campus Atmosphere'}
                    </p>
                    <p className="text-lg font-bold">
                      {isBangla 
                        ? 'মেধাবীদের জন্য একটি সুশৃঙ্খল, অনুপ্রেরণাদায়ক ও বন্ধুত্বসুলভ শিক্ষাঙ্গন' 
                        : 'A disciplined, inspiring, and friendly home for ambitious minds'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={isBangla ? 'মূল লক্ষ্য' : 'Guiding Principles'}
            title={isBangla ? 'আমাদের লক্ষ্য ও দর্শন' : 'Our Mission & Vision'}
            description={isBangla ? 'শিক্ষার সততা, শিক্ষার্থীর আত্মবিশ্বাস এবং যুগোপযোগী জ্ঞানার্জনের ভিত্তি।' : 'Our compass is centered on educational integrity, student confidence, and future-ready knowledge.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs hover:border-maroon-300 transition-colors space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{isBangla ? 'আমাদের মিশন' : 'Our Mission'}</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isBangla 
                  ? 'মানসম্পন্ন ও ব্যক্তিগত একাডেমিক গাইডেন্স নিশ্চিত করা যা পরীক্ষার ভীতি দূর করে, যৌক্তিক চিন্তা বৃদ্ধি করে এবং প্রতিটি শিক্ষার্থীকে বোর্ড ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষায় শীর্ষ সাফল্য অর্জনের উপযোগী করে।'
                  : 'To provide accessible, high-standard, and personalized academic coaching that eliminates exam anxiety, fosters critical thinking, and equips students with the conceptual mastery necessary to thrive in national board examinations and higher education admissions.'}
              </p>
              <ul className="space-y-2 pt-2 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span>{isBangla ? 'ব্যক্তিগত অগ্রগতি পর্যবেক্ষণ ও ডায়াগনস্টিক ট্র্যাকিং' : 'Individualized pacing and diagnostic tracking'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span>{isBangla ? 'একাডেমিক সততা ও নৈতিকতার প্রতি আপসহীন প্রতিশ্রুতি' : 'Uncompromising adherence to academic ethics'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span>{isBangla ? 'পরীক্ষার কৌশলের পাশাপাশি অনুসন্ধিৎসু মনন গড়ে তোলা' : 'Cultivating intellectual curiosity alongside exam tactics'}</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs hover:border-maroon-300 transition-colors space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-maroon-700 flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{isBangla ? 'আমাদের ভিশন' : 'Our Vision'}</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isBangla
                  ? 'বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ও অনুপ্রেরণাদায়ক একাডেমিক প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া, যা শুধু বোর্ড টপারই তৈরি করে না, বরং সৎ, দক্ষ ও মানবদরদী ভবিষ্যৎ নেতৃত্ব উপহার দেয়।'
                  : 'To be universally recognized as Bangladesh’s most dependable and inspiring academic care center, producing not only board toppers and top university scholars, but intellectually agile, ethical, and compassionate future leaders.'}
              </p>
              <ul className="space-y-2 pt-2 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span>{isBangla ? 'মাধ্যমিক ও উচ্চ মাধ্যমিক কেয়ারে মানদণ্ড স্থাপন' : 'Setting benchmark quality for secondary & higher secondary care'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span>{isBangla ? 'মেধাবী শিক্ষার্থীদের জন্য বিশেষ সুযোগ ও বৃত্তি' : 'Empowering every socio-economic stratum with merit opportunities'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-maroon-700 shrink-0" />
                  <span>{isBangla ? 'ডিজিটাল শিক্ষা উপকরণের সমন্বয়' : 'Integrating modern digital tools with human mentorship'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={isBangla ? 'আধুনিক পরিকাঠামো' : 'Modern Infrastructure'}
            title={isBangla ? 'সাইকির আধুনিক সুবিধাসমূহ' : 'World-Class Facilities at PSYCHE'}
            description={isBangla ? 'শিক্ষার্থীদের মনোযোগ, স্বাচ্ছন্দ্য এবং পড়াশোনার উৎপাদনশীলতা বৃদ্ধিতে পরিকল্পিত ক্যাম্পাস।' : 'We have engineered our campus environment to maximize concentration, comfort, and student productivity.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-maroon-300 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-maroon-50 text-maroon-800 flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {fac.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Director / Principal Message */}
      <section className="py-20 bg-slate-950 text-white border-t border-maroon-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                  alt="Director and Principal of PSYCHE Academic Care"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover mx-auto border-4 border-slate-800 shadow-lg"
                />
                <h3 className="text-xl font-bold text-white mt-4">
                  {isBangla ? 'প্রফেসর ড. মাহফুজুর রহমান' : 'Prof. Dr. Mahfuzur Rahman'}
                </h3>
                <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider mt-1">
                  {isBangla ? 'অধ্যক্ষ ও প্রতিষ্ঠাতা পরিচালক' : 'Principal & Founder Director'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBangla ? 'পিএইচ.ডি. ইন এডুকেশন (ঢাবি), সাবেক ক্যাডেট কলেজ শিক্ষক' : 'Ph.D. in Education (DU), Ex-Cadet College Faculty'}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-900/70 text-rose-200 border border-maroon-700/60 text-xs font-bold uppercase tracking-wider">
                  <span>{isBangla ? 'পরিচালকের বার্তা' : 'Leadership Statement'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                  {isBangla
                    ? '"প্রতিটি শিক্ষার্থীর ভেতরে সুপ্ত সম্ভাবনা রয়েছে; তাদের কেবল সঠিক দিকনির্দেশনা প্রয়োজন।"'
                    : '"Every Student Has Untapped Greatness; They Simply Need the Right Guide."'}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  {isBangla
                    ? '"এক দশক আগে যখন সাইকি একাডেমিক কেয়ার শুরু করেছিলাম, আমাদের স্বপ্ন ছিল সহজ: এমন একটি নির্ভরযোগ্য প্ল্যাটফর্ম তৈরি করা যেখানে কঠিন পদার্থবিজ্ঞান বা রসায়নের সূত্র দেখে শিক্ষার্থীরা ভয় পাবে না, বরং আগ্রহের সাথে বুঝবে। প্রতিটি অভিভাবকের বিশ্বাস আমাদের সবচেয়ে বড় অনুপ্রেরণা।"'
                    : '"When we laid the foundations of PSYCHE Academic Care over a decade ago, our dream was simple: to create a sacred academic space where students are not intimidated by difficult physics equations or complex grammar rules, but rather inspired to explore them with joy and logic."'}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  {isBangla
                    ? '"আমরা প্রতিটি শিক্ষার্থীকে বিশেষ গুরুত্ব দিই। আমাদের শিক্ষকরা প্রতিটি ক্লাসের জন্য নিবেদিতভাবে প্রস্তুতি নেন যাতে কোনো শিক্ষার্থী দ্বিধাদ্বন্দ্বে না থাকে। আপনার সন্তানের উজ্জ্বল শিক্ষাজীবন গড়ে তুলতে আমরা প্রতিশ্রুতিবদ্ধ।"'
                    : '"We look at each student as an individual with unique strengths. Our teachers spend sleepless nights refining lecture notes and checking answer scripts so that no student leaves our classrooms feeling confused or forgotten."'}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-700/80">
                  <div className="text-xs text-slate-400">
                    {isBangla ? 'সাইকি একাডেমিক কেয়ার • জিইসি ক্যাম্পাস' : 'PSYCHE Academic Care • GEC Campus'}
                  </div>
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1"
                  >
                    <span>{isBangla ? 'যোগাযোগ করুন' : 'Schedule an Appointment'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
