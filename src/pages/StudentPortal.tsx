import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  mockStudentProfile, 
  mockEnrolledCourses, 
  mockExamResults, 
  mockPaymentInvoices,
  PortalExamResult
} from '../data/studentPortalData';
import {
  initialAdminNotices,
  initialAdminRoutines,
  initialAdminClassRoutines,
  initialAdminResults,
  AdminNotice,
  AdminRoutine,
  AdminClassRoutine,
  AdminExamResult,
  isClassMatching,
  normalizeClass,
  createClassRoutineSvg,
} from '../data/adminData';
import { 
  UserCircle, 
  BookOpen, 
  Award, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  LogOut,
  ShieldCheck,
  KeyRound,
  GraduationCap,
  Bell,
  CalendarDays,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  ZoomIn,
  FileText,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const StudentPortal: React.FC = () => {
  const { isBangla } = useLanguage();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('pschye_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'courses' | 'results' | 'payments' | 'notices' | 'routine'>('profile');
  const [invoices, setInvoices] = useState(mockPaymentInvoices);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('');

  // Read notices & routines from same localStorage keys admin writes to
  const [notices, setNotices] = useState<AdminNotice[]>(() => {
    const saved = localStorage.getItem('pschye_admin_notices');
    return saved ? JSON.parse(saved) : initialAdminNotices;
  });

  const [routines] = useState<AdminRoutine[]>(() => {
    const saved = localStorage.getItem('pschye_admin_routines');
    return saved ? JSON.parse(saved) : initialAdminRoutines;
  });

  // Read class routines from same localStorage key admin writes to
  const [classRoutines, setClassRoutines] = useState<AdminClassRoutine[]>(() => {
    try {
      const saved = localStorage.getItem('pschye_class_routines');
      if (saved) {
        const parsed: AdminClassRoutine[] = JSON.parse(saved);
        return parsed.map(r => {
          if (r.fileUrl && (r.fileUrl.startsWith('data:image/svg+xml;utf8,') || r.fileUrl.startsWith('data:image/svg+xml;charset=utf-8,'))) {
            return {
              ...r,
              fileUrl: createClassRoutineSvg(r.targetClass, r.title)
            };
          }
          return r;
        });
      }
      return initialAdminClassRoutines;
    } catch {
      return initialAdminClassRoutines;
    }
  });

  // Read admin results from localStorage & listen for live updates
  const [adminExamResults, setAdminExamResults] = useState<AdminExamResult[]>(() => {
    try {
      const saved = localStorage.getItem('pschye_admin_results');
      return saved ? JSON.parse(saved) : initialAdminResults;
    } catch {
      return initialAdminResults;
    }
  });

  useEffect(() => {
    const handleResultsUpdate = () => {
      try {
        const saved = localStorage.getItem('pschye_admin_results');
        if (saved) {
          setAdminExamResults(JSON.parse(saved));
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('adminResultsUpdate', handleResultsUpdate);
    window.addEventListener('resultsUpdate', handleResultsUpdate);
    window.addEventListener('storage', handleResultsUpdate);
    return () => {
      window.removeEventListener('adminResultsUpdate', handleResultsUpdate);
      window.removeEventListener('resultsUpdate', handleResultsUpdate);
      window.removeEventListener('storage', handleResultsUpdate);
    };
  }, []);

  // Filter and compute exam results for active student
  const studentExamResults = useMemo<PortalExamResult[]>(() => {
    const activeStudentId = (currentUser?.studentId || currentUser?.identifier || mockStudentProfile.studentId).toLowerCase().trim();
    
    // Find all results matching this student ID
    const myResults = adminExamResults.filter(
      r => (r.studentId || '').toLowerCase().trim() === activeStudentId
    );

    if (myResults.length > 0) {
      return myResults.map(r => {
        // Find highest score in this exam and subject across all students
        const allScores = adminExamResults
          .filter(ar => ar.examName === r.examName && ar.subject === r.subject)
          .map(ar => ar.marksObtained);
        const highest = allScores.length > 0 ? Math.max(...allScores) : r.marksObtained;

        return {
          id: r.id,
          examName: r.examName,
          subject: r.subject,
          date: r.date,
          marksObtained: r.marksObtained,
          totalMarks: r.totalMarks || 100,
          grade: r.grade,
          gpa: r.gpa,
          highestInBatch: highest,
          remarks: r.remarks || (r.marksObtained >= ((r.totalMarks || 100) * 0.8) ? 'Outstanding conceptual performance' : 'Keep practicing regularly')
        };
      });
    }

    // Default fallback to mock exam results so portal always has data
    return mockExamResults;
  }, [adminExamResults, currentUser]);

  // Compute student's average GPA
  const currentGPA = useMemo(() => {
    if (studentExamResults.length === 0) return '5.00';
    const totalGpa = studentExamResults.reduce((acc, curr) => acc + curr.gpa, 0);
    return (totalGpa / studentExamResults.length).toFixed(2);
  }, [studentExamResults]);

  // Selected routine class filter ('All' displays all routines together)
  const [selectedStudentClass, setSelectedStudentClass] = useState<string>('All');

  const [studentRoutinePreview, setStudentRoutinePreview] = useState<AdminClassRoutine | null>(null);
  const [studentRoutineViewMode, setStudentRoutineViewMode] = useState<'files' | 'slots'>('files');

  useEffect(() => {
    const handleRoutineUpdate = () => {
      try {
        const saved = localStorage.getItem('pschye_class_routines');
        if (saved) {
          const parsed: AdminClassRoutine[] = JSON.parse(saved);
          setClassRoutines(parsed.map(r => {
            if (r.fileUrl && (r.fileUrl.startsWith('data:image/svg+xml;utf8,') || r.fileUrl.startsWith('data:image/svg+xml;charset=utf-8,'))) {
              return {
                ...r,
                fileUrl: createClassRoutineSvg(r.targetClass, r.title)
              };
            }
            return r;
          }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('classRoutinesUpdate', handleRoutineUpdate);
    return () => window.removeEventListener('classRoutinesUpdate', handleRoutineUpdate);
  }, []);

  // Student's enrolled batch for routine filtering
  const studentBatch = mockStudentProfile.batch;

  useEffect(() => {
    const checkAuth = () => {
      const saved = localStorage.getItem('pschye_auth_user');
      setCurrentUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pschye_auth_user');
    setCurrentUser(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const handleQuickDemoLogin = () => {
    const userSession = {
      role: 'student',
      name: mockStudentProfile.name,
      identifier: mockStudentProfile.studentId,
      studentId: mockStudentProfile.studentId,
      avatar: mockStudentProfile.avatar,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem('pschye_auth_user', JSON.stringify(userSession));
    setCurrentUser(userSession);
    window.dispatchEvent(new Event('authChange'));
  };

  const handlePayDue = (invId: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invId) {
        return {
          ...inv,
          status: 'Paid',
          paidDate: new Date().toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          method: 'Online Card/bKash'
        };
      }
      return inv;
    }));
    setPaymentSuccessMessage(
      isBangla 
        ? 'পেমেন্ট সফল হয়েছে! আপনার টিউশন ফির রশিদ সংরক্ষিত হয়েছে।' 
        : 'Payment successful! Your tuition fee receipt has been recorded.'
    );
    setTimeout(() => setPaymentSuccessMessage(''), 4000);
  };

  const tabs = [
    { id: 'profile', name: isBangla ? 'শিক্ষার্থী প্রোফাইল' : 'Student Profile', icon: UserCircle },
    { id: 'courses', name: isBangla ? 'অধ্যয়নরত কোর্স' : 'Enrolled Courses', icon: BookOpen },
    { id: 'results', name: isBangla ? 'পরীক্ষার ফলাফল' : 'Exam Results', icon: Award },
    { id: 'payments', name: isBangla ? 'ফি ও পেমেন্ট' : 'Payment Status', icon: CreditCard },
    { id: 'notices', name: isBangla ? 'নোটিশ বোর্ড' : 'Notice Board', icon: Bell },
    { id: 'routine', name: isBangla ? 'ক্লাস রুটিন' : 'Class Routine', icon: CalendarDays },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center mx-auto shadow-xs">
            <KeyRound className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              {isBangla ? 'লগইন আবশ্যক' : 'Authentication Required'}
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {isBangla ? 'শিক্ষার্থী পোর্টালে প্রবেশ করুন' : 'Sign In to Access Portal'}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isBangla 
                ? 'শিক্ষার্থীর প্রোফাইল, পরীক্ষার ফলাফল, মাসিক উপস্থিতি এবং ফি পরিশোধের বিবরণ সুরক্ষিত।' 
                : 'Student profiles, exam marks, monthly attendance, and tuition payment records are protected.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/login"
              className="w-full py-3.5 px-4 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isBangla ? 'লগইন প্যানেলে যান' : 'Go to Log In Panel'}</span>
            </Link>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-maroon-800" />
              <span>{isBangla ? 'তাৎক্ষণিক ডেমো লগইন (সাদমান সাকিব)' : 'Instant 1-Click Demo (Sadman Sakib)'}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            {isBangla ? 'ভর্তি ফরম প্রয়োজন?' : 'Need an admission form?'}{' '}
            <Link to="/admission" className="font-bold text-maroon-800 hover:underline">
              {isBangla ? 'অনলাইনে আবেদন করুন' : 'Apply Online'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/60 pb-20">
      {/* Portal Top Bar */}
      <div className="bg-slate-950 text-white border-b border-maroon-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar || mockStudentProfile.avatar}
                alt={currentUser.name || mockStudentProfile.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-rose-500 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white">
                    {currentUser.name || mockStudentProfile.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-900/40 text-rose-300 border border-rose-800">
                    {currentUser.role ? `${currentUser.role.toUpperCase()}` : mockStudentProfile.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID: <strong className="text-slate-200">{currentUser.studentId || mockStudentProfile.studentId}</strong> • {mockStudentProfile.currentClass}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
                {isBangla ? 'শিক্ষাবর্ষ ২০২৬-২০২৭' : 'Academic Session 2026-2027'}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isBangla ? 'লগআউট' : 'Log Out'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Portal Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              {isBangla ? 'পোর্টাল মেনু' : 'Portal Navigation'}
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-maroon-800 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{tab.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-rose-200' : 'text-slate-400'}`} />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 px-2 space-y-3">
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs text-maroon-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-maroon-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-maroon-700" />
                  {isBangla ? 'সাইকি কেয়ার হেল্পডেস্ক' : 'PSYCHE Care Desk'}
                </span>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {isBangla 
                    ? 'পরীক্ষার নম্বর বা ফি সংশোধনের জন্য কল করুন: +৮৮০ ১৬৮৩-৩৩৪০৮০।'
                    : 'Need fee or test marks correction? Call +880 1683-334080.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{isBangla ? 'পোর্টাল থেকে লগআউট' : 'Sign Out of Portal'}</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Pane */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Global Flash Alert if any */}
            {paymentSuccessMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-maroon-900 text-sm font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-maroon-700 shrink-0" />
                <span>{paymentSuccessMessage}</span>
              </div>
            )}

            {/* TAB 1: STUDENT PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {isBangla ? 'শিক্ষার্থী প্রোফাইল তথ্য' : 'Student Profile Information'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isBangla ? 'সাইকিতে নিবন্ধিত প্রাতিষ্ঠানিক ও অভিভাবকের তথ্য' : 'Verified academic and guardian records on file'}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-maroon-50 text-maroon-800 border border-maroon-200">
                    {isBangla ? 'নিয়মিত শিক্ষার্থী' : 'Active Student'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'শিক্ষার্থীর পুরো নাম:' : 'Student Full Name:'}</span>
                    <div className="font-bold text-slate-900 text-base">{mockStudentProfile.name}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'শিক্ষার্থী আইডি নম্বর:' : 'Student ID Number:'}</span>
                    <div className="font-black text-maroon-800 text-base">{mockStudentProfile.studentId}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'বর্তমান শ্রেণী:' : 'Current Academic Class:'}</span>
                    <div className="font-bold text-slate-900">{mockStudentProfile.currentClass}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'রোল ও ব্যাচ:' : 'Class Roll & Batch:'}</span>
                    <div className="font-bold text-slate-900">
                      {isBangla ? `রোল #${mockStudentProfile.rollNumber} • ${mockStudentProfile.batch}` : `Roll #${mockStudentProfile.rollNumber} • ${mockStudentProfile.batch}`}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'রক্তের গ্রুপ:' : 'Blood Group:'}</span>
                    <div className="font-bold text-rose-700">{mockStudentProfile.bloodGroup}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'ভর্তির তারিখ:' : 'Date of Admission:'}</span>
                    <div className="font-bold text-slate-900">{mockStudentProfile.admissionDate}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'শিক্ষার্থীর যোগাযোগ:' : 'Student Contact:'}</span>
                    <div className="font-medium text-slate-800">{mockStudentProfile.phone}</div>
                    <div className="text-xs text-slate-500">{mockStudentProfile.email}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs font-semibold text-slate-500">{isBangla ? 'অভিভাবকের তথ্য:' : 'Guardian Contact:'}</span>
                    <div className="font-bold text-slate-900">{mockStudentProfile.guardianName}</div>
                    <div className="text-xs text-slate-600 font-medium">{mockStudentProfile.guardianPhone}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ENROLLED COURSES */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {isBangla ? 'অধ্যয়নরত কোর্সসমূহ' : 'Enrolled Academic Courses'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isBangla ? 'আপনার বর্তমান ব্যাচ, শিক্ষক ও ক্লাসরুম সংক্রান্ত তথ্য' : 'Your currently registered modules, instructors, and lecture room locations'}
                  </p>
                </div>

                <div className="space-y-4">
                  {mockEnrolledCourses.map((course) => (
                    <div key={course.id} className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-maroon-200 transition-colors space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded-md border border-maroon-200">
                            {course.code}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {course.name}
                          </h3>
                        </div>
                        <div className="text-xs sm:text-right text-slate-500 font-medium">
                          <span>{isBangla ? 'শিক্ষক:' : 'Instructor:'} <strong className="text-slate-800">{course.instructor}</strong></span>
                          <div className="text-[11px] text-maroon-800 font-semibold">{course.room}</div>
                        </div>
                      </div>

                      {/* Course Completion Progress */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                          <span>{isBangla ? 'সিলেবাস সম্পন্ন:' : 'Syllabus Covered:'} <strong>{course.progress}%</strong></span>
                          <span>{isBangla ? 'উপস্থিতি:' : 'Attended:'} <strong>{course.attendedClasses} / {course.totalClasses} {isBangla ? 'ক্লাস' : 'classes'}</strong></span>
                        </div>
                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-maroon-800 h-full rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EXAM RESULTS */}
            {activeTab === 'results' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {isBangla ? 'মডেল টেস্ট ও মূল্যায়ন পরীক্ষার ফলাফল' : 'Term Assessment & Model Test Results'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isBangla ? 'বিষয়ভিত্তিক প্রাপ্ত নম্বর, গ্রেড এবং ব্যাচ পারফরম্যান্স' : 'Subject-wise marks, grades, and comparative cohort performance'}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-maroon-800 bg-maroon-50 px-3 py-1 rounded-full border border-maroon-200 self-start">
                    {isBangla ? `বর্তমান জিপিএ: ${currentGPA}` : `Current GPA: ${currentGPA}`}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] bg-slate-50">
                        <th className="py-3 px-3 font-bold">{isBangla ? 'পরীক্ষা / বিষয়' : 'Exam / Subject'}</th>
                        <th className="py-3 px-3 font-bold">{isBangla ? 'তারিখ' : 'Date'}</th>
                        <th className="py-3 px-3 font-bold text-center">{isBangla ? 'প্রাপ্ত নম্বর' : 'Score'}</th>
                        <th className="py-3 px-3 font-bold text-center">{isBangla ? 'গ্রেড' : 'Grade'}</th>
                        <th className="py-3 px-3 font-bold text-center">{isBangla ? 'ব্যাচে সর্বোচ্চ' : 'Batch Highest'}</th>
                        <th className="py-3 px-3 font-bold">{isBangla ? 'শিক্ষকের মন্তব্য' : 'Teacher Feedback'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentExamResults.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-3">
                            <div className="font-bold text-slate-900">{item.subject}</div>
                            <div className="text-[11px] text-slate-500">{item.examName}</div>
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="font-extrabold text-maroon-800 text-sm">
                              {item.marksObtained}
                            </span>
                            <span className="text-slate-400 text-xs">/{item.totalMarks}</span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-md font-extrabold text-xs bg-rose-100 text-maroon-900">
                              {item.grade} ({item.gpa.toFixed(1)})
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center font-semibold text-slate-700">
                            {item.highestInBatch}
                          </td>
                          <td className="py-3.5 px-3 text-slate-600 italic text-xs max-w-xs">
                            "{item.remarks}"
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: PAYMENT STATUS */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {isBangla ? 'মাসিক বেতন ও ফি সংক্রান্ত বিবরণ' : 'Monthly Tuition & Fee Invoices'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isBangla ? 'কোর্স টিউশন ও লেকচার শিট ফি প্রদানের তালিকা' : 'Secure payment tracking for tuition, tests, and lecture notes'}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {isBangla ? 'পেমেন্ট গেটওয়ে: বিকাশ / নগদ / ভিসা / মাস্টারকার্ড' : 'Payment Gateway: bKash / Nagad / Visa / Mastercard'}
                  </span>
                </div>

                <div className="space-y-3">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-4 sm:p-5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">{inv.invoiceNo}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            inv.status === 'Paid'
                              ? 'bg-rose-50 text-maroon-800 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {inv.status === 'Paid' ? (isBangla ? 'পরিশোধিত' : 'Paid') : (isBangla ? 'বকেয়া' : 'Due')}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{inv.description}</h4>
                        <div className="text-xs text-slate-500 flex items-center gap-3">
                          <span>{isBangla ? 'মেয়াদ:' : 'Due Date:'} {inv.dueDate}</span>
                          {inv.paidDate && (
                            <span className="text-maroon-800 font-semibold">
                              {isBangla ? `পরিশোধিত: ${inv.paidDate} (${inv.method})` : `Paid on: ${inv.paidDate} (${inv.method})`}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="text-right">
                          <div className="text-base font-extrabold text-slate-900">৳ {inv.amount.toLocaleString()}</div>
                          <div className="text-[11px] text-slate-400">BDT (Inc. VAT)</div>
                        </div>
                        {inv.status === 'Due' && (
                          <button
                            onClick={() => handlePayDue(inv.id)}
                            className="px-4 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                          >
                            {isBangla ? 'অনলাইনে পরিশোধ করুন' : 'Pay Online'}
                          </button>
                        )}
                        {inv.status === 'Paid' && (
                          <button
                            onClick={() => alert(isBangla ? `ইনভয়েস ${inv.invoiceNo} এর রশিদ ডাউনলোড করা হচ্ছে` : `Receipt downloaded for invoice ${inv.invoiceNo}`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                          >
                            {isBangla ? 'রশিদ ডাউনলোড' : 'Download Receipt'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: NOTICE BOARD */}
            {activeTab === 'notices' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {isBangla ? 'প্রতিষ্ঠানের নোটিশ বোর্ড' : 'Institutional Notice Board'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isBangla ? 'কোচিং কর্তৃপক্ষের প্রকাশিত সকল সর্বশেষ নোটিশ ও বিজ্ঞপ্তি' : 'Latest announcements published by coaching administration'}
                  </p>
                </div>
                <div className="space-y-4">
                  {(() => {
                    const studentNotices = notices.filter(n => !n.target || n.target === 'student' || n.target === 'both');
                    if (studentNotices.length === 0) {
                      return (
                        <div className="text-center py-12 text-slate-400 text-sm border border-dashed border-slate-200 rounded-2xl">
                          {isBangla ? 'এখন পর্যন্ত শিক্ষার্থীদের জন্য কোনো নোটিশ প্রকাশিত হয়নি।' : 'No notices published for students yet.'}
                        </div>
                      );
                    }
                    return studentNotices.map(notice => {
                    const catColor: Record<string, string> = {
                      Exam: 'bg-blue-50 text-blue-700 border-blue-200',
                      Academic: 'bg-teal-50 text-teal-700 border-teal-200',
                      Holiday: 'bg-green-50 text-green-700 border-green-200',
                      Fee: 'bg-amber-50 text-amber-700 border-amber-200',
                      General: 'bg-slate-100 text-slate-600 border-slate-200',
                    };
                    return (
                      <div key={notice.id} className={`p-5 rounded-2xl border transition-all bg-white ${notice.priority === 'Urgent' ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200'}`}>
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {notice.priority === 'Urgent' && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 border border-rose-200">
                                <AlertTriangle className="w-2.5 h-2.5" />
                                {isBangla ? 'জরুরি নোটিশ' : 'URGENT'}
                              </span>
                            )}
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${catColor[notice.category] || catColor.General}`}>
                              {notice.category}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">{notice.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed">{notice.body}</p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                            <Bell className="w-3 h-3" />
                            <span>{isBangla ? 'প্রকাশক:' : 'By'} <strong className="text-slate-600">{notice.publishedBy}</strong> • {notice.publishedDate}</span>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
              </div>
            )}

            {/* TAB 6: CLASS ROUTINE (IMAGE / PDF & SLOTS) */}
            {activeTab === 'routine' && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
                {/* Header with Student Class Badge & Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-50 border border-maroon-200 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>
                        {selectedStudentClass === 'All' 
                          ? (isBangla ? 'সকল শ্রেণীর রুটিন' : 'All Class Routines') 
                          : (isBangla ? `নির্বাচিত শ্রেণী: ${selectedStudentClass}` : `Selected Class: ${selectedStudentClass}`)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {isBangla ? 'একাডেমিক ক্লাস রুটিন (Image / PDF)' : 'Academic Class Routines'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {isBangla
                        ? 'অ্যাডমিন প্যানেল থেকে আপলোডকৃত সকল শ্রেণীর রুটিন এখানে প্রদর্শিত হচ্ছে। প্রতিটি রুটিনের উপরে শ্রেণী উল্লেখ রয়েছে।'
                        : 'All class routines uploaded from admin are shown here. Target class is indicated on top of each routine.'}
                    </p>
                  </div>

                  {/* Mode switcher: Files vs Slots */}
                  <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs font-bold shrink-0">
                    <button
                      type="button"
                      onClick={() => setStudentRoutineViewMode('files')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        studentRoutineViewMode === 'files' ? 'bg-white shadow-xs text-maroon-800' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isBangla ? 'রুটিন ফাইল (Image/PDF)' : 'Routine Files'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentRoutineViewMode('slots')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        studentRoutineViewMode === 'slots' ? 'bg-white shadow-xs text-maroon-800' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isBangla ? 'সাপ্তাহিক ছক' : 'Weekly Schedule'}
                    </button>
                  </div>
                </div>

                {/* Routine Filter Switcher (All by default) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 via-rose-50/40 to-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{isBangla ? 'রুটিন ফিল্টার:' : 'Filter Routines:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Class 8', 'Class 9 (Science)', 'Class 9 (Commerce)', 'Class 10 (Science)', 'Class 10 (Commerce)', 'SSC Special Batch', 'HSC (Science)', 'HSC (Commerce)'].map(cls => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setSelectedStudentClass(cls)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                          selectedStudentClass === cls
                            ? 'bg-maroon-800 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                        }`}
                      >
                        {cls === 'All' ? (isBangla ? 'সকল রুটিন' : 'All Routines') : cls}
                      </button>
                    ))}
                  </div>
                </div>

                {/* VIEW 1: CLASS ROUTINE FILES (IMAGE / PDF) */}
                {studentRoutineViewMode === 'files' && (() => {
                  const displayedRoutines = selectedStudentClass === 'All'
                    ? classRoutines
                    : classRoutines.filter(r => isClassMatching(r.targetClass, selectedStudentClass));

                  if (displayedRoutines.length === 0) {
                    return (
                      <div className="text-center py-16 px-4 bg-slate-50/50 rounded-3xl border border-dashed border-slate-300 space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                          <CalendarDays className="w-7 h-7 text-slate-400" />
                        </div>
                        <h4 className="text-base font-bold text-slate-800">
                          {isBangla
                            ? `${selectedStudentClass === 'All' ? 'এখনও কোনো রুটিন আপলোড করা হয়নি' : `${selectedStudentClass}-এর জন্য এখনও কোনো রুটিন প্রকাশ করা হয়নি`}`
                            : `No routine published ${selectedStudentClass === 'All' ? 'yet' : `for ${selectedStudentClass} yet`}`}
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          {isBangla
                            ? 'অ্যাডমিন প্যানেল থেকে ইমেজ বা পিডিএফ রুটিন আপলোড হলে তা সরাসরি সকল শিক্ষার্থীর এই প্যানেলে প্রদর্শিত হবে।'
                            : 'When an admin uploads a routine, it will appear here instantly for all students.'}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayedRoutines.map(routine => (
                        <div
                          key={routine.id}
                          className="bg-white rounded-3xl border border-slate-200 hover:border-maroon-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                        >
                          <div>
                            {/* Card Header & Class Badge */}
                            <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2 bg-gradient-to-r from-slate-50 to-white">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-900 border border-rose-200/80 flex items-center gap-1.5 shadow-2xs">
                                <GraduationCap className="w-3.5 h-3.5 text-rose-700" />
                                {routine.targetClass}
                              </span>

                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                                routine.fileType === 'pdf' 
                                  ? 'bg-rose-50 text-rose-700 border-rose-200' 
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}>
                                {routine.fileType === 'pdf' ? '📄 PDF' : '🖼️ IMAGE'}
                              </span>
                            </div>

                            {/* Preview Area */}
                            <div
                              onClick={() => setStudentRoutinePreview(routine)}
                              className="relative h-44 sm:h-48 bg-slate-100 cursor-pointer overflow-hidden flex items-center justify-center group/preview border-b border-slate-100"
                            >
                              {routine.fileType === 'image' || routine.fileUrl.startsWith('data:image') ? (
                                <img
                                  src={routine.fileUrl}
                                  alt={routine.title}
                                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/preview:scale-105"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    try {
                                      target.src = createClassRoutineSvg(routine.targetClass, routine.title);
                                    } catch {
                                      // ignore
                                    }
                                  }}
                                />
                              ) : (
                                <div className="p-4 text-center space-y-2">
                                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-xs">
                                    <FileText className="w-6 h-6" />
                                  </div>
                                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{routine.fileName}</div>
                                  <span className="text-[11px] text-slate-500 font-medium">{routine.fileSize || 'PDF Document'}</span>
                                </div>
                              )}

                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs">
                                <span className="px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                                  <ZoomIn className="w-3.5 h-3.5 text-maroon-800" />
                                  <span>{isBangla ? 'রুটিন দেখুন' : 'View Routine'}</span>
                                </span>
                              </div>
                            </div>

                            {/* Content Info */}
                            <div className="p-4 space-y-1.5">
                              <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-2">
                                {routine.title}
                              </h4>

                              <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                                <span>{isBangla ? 'আপলোড:' : 'Uploaded:'} <strong className="text-slate-700 font-semibold">{routine.uploadedAt}</strong></span>
                                <span className="text-[11px] font-semibold text-slate-500">{routine.fileSize || '450 KB'}</span>
                              </div>

                              <div className="text-xs text-maroon-800 font-bold">
                                {isBangla ? `কার্যকর: ${routine.effectiveDate || 'তাৎক্ষণিক'}` : `Effective: ${routine.effectiveDate || 'Immediate'}`}
                              </div>

                              {routine.notes && (
                                <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 italic line-clamp-2 mt-1">
                                  "{routine.notes}"
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => setStudentRoutinePreview(routine)}
                              className="px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5 text-maroon-800" />
                              <span>{isBangla ? 'দেখুন' : 'View'}</span>
                            </button>

                            <a
                              href={routine.fileUrl}
                              download={routine.fileName || `${routine.targetClass}-routine.${routine.fileType === 'pdf' ? 'pdf' : 'png'}`}
                              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-maroon-800 transition-colors cursor-pointer"
                              title={isBangla ? 'ডাউনলোড' : 'Download'}
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>

                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* VIEW 2: WEEKLY SCHEDULE TABLE */}
                {studentRoutineViewMode === 'slots' && (() => {
                  const myRoutine = routines.find(r => r.batchName === studentBatch);
                  if (!myRoutine || myRoutine.slots.length === 0) {
                    return (
                      <div className="text-center py-12 text-slate-400 text-sm border border-dashed border-slate-200 rounded-2xl">
                        {isBangla ? 'আপনার ব্যাচের জন্য কোনো স্লট তালিকা নেই।' : 'No weekly schedule slots for your batch.'}
                      </div>
                    );
                  }
                  return (
                    <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                      <table className="w-full text-left text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] bg-slate-50">
                            <th className="py-3 px-4 font-bold">{isBangla ? 'বার' : 'Day'}</th>
                            <th className="py-3 px-4 font-bold">{isBangla ? 'সময়' : 'Time'}</th>
                            <th className="py-3 px-4 font-bold">{isBangla ? 'বিষয়' : 'Subject'}</th>
                            <th className="py-3 px-4 font-bold">{isBangla ? 'শিক্ষক' : 'Teacher'}</th>
                            <th className="py-3 px-4 font-bold">{isBangla ? 'কক্ষ' : 'Room'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'] as string[]).map(day =>
                            myRoutine.slots.filter(sl => sl.day === day).map(sl => (
                              <tr key={sl.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-maroon-50 text-maroon-800 border border-rose-100 whitespace-nowrap">{sl.day}</span>
                                </td>
                                <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" />{sl.time}</span>
                                </td>
                                <td className="py-3.5 px-4 font-bold text-slate-900">{sl.subject}</td>
                                <td className="py-3.5 px-4 text-slate-600">{sl.teacher}</td>
                                <td className="py-3.5 px-4 text-slate-500 text-xs">{sl.room}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}

              </div>
            )}

          </div>

        </div>
      </div>

      {/* ===== STUDENT ROUTINE PREVIEW LIGHTBOX MODAL ===== */}
      {studentRoutinePreview && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setStudentRoutinePreview(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-5 sm:p-6 space-y-4 animate-in zoom-in-95 my-6 flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-maroon-100 text-maroon-900 border border-maroon-200">
                  {studentRoutinePreview.targetClass}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1">
                    {studentRoutinePreview.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {studentRoutinePreview.fileName} • {studentRoutinePreview.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={studentRoutinePreview.fileUrl}
                  download={studentRoutinePreview.fileName || `${studentRoutinePreview.targetClass}-routine.${studentRoutinePreview.fileType === 'pdf' ? 'pdf' : 'png'}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'ডাউনলোড' : 'Download'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setStudentRoutinePreview(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 overflow-auto bg-slate-100 rounded-2xl p-2 sm:p-4 flex items-center justify-center min-h-[350px]">
              {studentRoutinePreview.fileType === 'image' || studentRoutinePreview.fileUrl.startsWith('data:image') ? (
                <img
                  src={studentRoutinePreview.fileUrl}
                  alt={studentRoutinePreview.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-xs"
                />
              ) : (
                <div className="w-full h-[65vh] bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-4 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{studentRoutinePreview.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{studentRoutinePreview.fileName} ({studentRoutinePreview.fileSize})</p>
                    <p className="text-xs text-maroon-800 font-semibold mt-0.5">{isBangla ? 'শ্রেণী: ' : 'Class: '}{studentRoutinePreview.targetClass}</p>
                  </div>
                  {studentRoutinePreview.notes && (
                    <p className="text-xs text-slate-600 max-w-md bg-slate-50 p-3 rounded-xl border border-slate-200">
                      "{studentRoutinePreview.notes}"
                    </p>
                  )}
                  <a
                    href={studentRoutinePreview.fileUrl}
                    download={studentRoutinePreview.fileName}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isBangla ? 'পিডিএফ ফাইল ডাউনলোড করুন' : 'Download PDF Document'}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
