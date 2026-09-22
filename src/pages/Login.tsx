import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Shield, 
  KeyRound,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { PsycheLogo } from '../components/Logo';
import { mockStudentProfile } from '../data/studentPortalData';
import { initialAdminStudents } from '../data/adminData';
import { useLanguage } from '../context/LanguageContext';

export type UserRole = 'student' | 'admin';

export const Login: React.FC = () => {
  const { t, isBangla } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialRole = (queryParams.get('role') as UserRole) || 'student';

  const [role, setRole] = useState<UserRole>(initialRole === 'admin' ? 'admin' : 'student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Quick fill demo helper
  const handleQuickFill = (targetChoice: 'student8' | 'student9' | 'student10' | 'studentSSC' | 'studentHSC' | 'admin') => {
    setErrorMessage('');
    if (targetChoice === 'student8') {
      setRole('student');
      setIdentifier('PAC-2026-8848');
      setPassword('student123');
    } else if (targetChoice === 'student9') {
      setRole('student');
      setIdentifier('PAC-2026-8846');
      setPassword('student123');
    } else if (targetChoice === 'student10') {
      setRole('student');
      setIdentifier(mockStudentProfile.studentId);
      setPassword('student123');
    } else if (targetChoice === 'studentSSC') {
      setRole('student');
      setIdentifier('PAC-2026-8843');
      setPassword('student123');
    } else if (targetChoice === 'studentHSC') {
      setRole('student');
      setIdentifier('PAC-2026-8844');
      setPassword('student123');
    } else {
      setRole('admin');
      setIdentifier('admin@psyche.edu.bd');
      setPassword('admin123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage(
        role === 'student' 
          ? (isBangla ? 'অনুগ্রহ করে শিক্ষার্থী আইডি বা ইমেইল লিখুন।' : 'Please enter your Student ID or Registered Email.')
          : (isBangla ? 'অনুগ্রহ করে অ্যাডমিন ইমেইল বা ইউজারনেম লিখুন।' : 'Please enter your Institutional Admin Email or Username.')
      );
      return;
    }

    if (!password.trim()) {
      setErrorMessage(isBangla ? 'অনুগ্রহ করে পাসওয়ার্ড লিখুন।' : 'Please enter your portal password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      let studentName = mockStudentProfile.name;
      let studentId = mockStudentProfile.studentId;
      let studentClass = 'Class 10';

      if (role === 'student') {
        const adminStudents = JSON.parse(localStorage.getItem('pschye_admin_students') || '[]');
        const allStudents = [...adminStudents, ...initialAdminStudents];
        const found = allStudents.find((s: any) => s.studentId?.toLowerCase() === identifier.trim().toLowerCase());
        if (found) {
          studentName = found.name;
          studentId = found.studentId;
          studentClass = found.currentClass;
        } else if (identifier.includes('8848') || identifier.toLowerCase().includes('class 8') || identifier.toLowerCase().includes('farhan')) {
          studentName = 'Farhan Ahmed';
          studentId = 'PAC-2026-8848';
          studentClass = 'Class 8';
        }
      }

      const userSession = {
        role,
        name: role === 'student' ? studentName : 'Dr. Mahfuzul Alam (Admin)',
        identifier: identifier.trim(),
        studentId: role === 'student' ? studentId : undefined,
        currentClass: role === 'student' ? studentClass : undefined,
        avatar: role === 'student' 
          ? mockStudentProfile.avatar 
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('pschye_auth_user', JSON.stringify(userSession));
      window.dispatchEvent(new Event('authChange'));

      if (role === 'admin') {
        navigate('/admin-portal');
      } else {
        navigate('/student-portal');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        
        {/* Top Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
              <PsycheLogo className="w-14 h-14 text-slate-900 group-hover:text-maroon-800 transition-colors" />
            </div>
            <div className="text-left">
              <span className="block text-2xl font-black tracking-tight text-slate-900 leading-none">
                PSYCHE <span className="text-maroon-800">{isBangla ? 'একাডেমিক' : 'Academic'}</span> <span className="text-rose-700">{isBangla ? 'কেয়ার' : 'Care'}</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                {isBangla ? 'প্রাতিষ্ঠানিক প্রবেশদ্বার' : 'Institutional Access'}
              </span>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('login.title')}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Login Container Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
          
          {/* Strictly 2 Portal Tabs: Student & Admin */}
          <div className="p-1 rounded-2xl bg-slate-100 grid grid-cols-2 gap-1 mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-maroon-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{isBangla ? '১. শিক্ষার্থী' : '1. Student'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setErrorMessage('');
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-300" />
              <span>{isBangla ? '২. অ্যাডমিন' : '2. Admin'}</span>
            </button>
          </div>

          {/* Quick Demo Autofill Options */}
          <div className="mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{isBangla ? 'এক ক্লিকে ডেমো লগইন:' : 'Quick Demo 1-Click Fill:'}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickFill('student8')}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  identifier === 'PAC-2026-8848' 
                    ? 'bg-maroon-800 border-maroon-900 text-white shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Login as Farhan Ahmed (Class 8)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-maroon-600" />
                <span className="truncate">{isBangla ? '৮ম শ্রেণি' : 'Class 8'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('student9')}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  identifier === 'PAC-2026-8846' 
                    ? 'bg-maroon-800 border-maroon-900 text-white shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Login as Arafat Karim (Class 9 Science)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-maroon-600" />
                <span className="truncate">{isBangla ? '৯ম শ্রেণি' : 'Class 9'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('student10')}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  identifier === mockStudentProfile.studentId 
                    ? 'bg-maroon-800 border-maroon-900 text-white shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Login as Sadman Sakib (Class 10 Science)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-maroon-600" />
                <span className="truncate">{isBangla ? '১০ম শ্রেণি' : 'Class 10'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('studentSSC')}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  identifier === 'PAC-2026-8843' 
                    ? 'bg-maroon-800 border-maroon-900 text-white shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Login as Tasnim Jahan (SSC Special Batch)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-maroon-600" />
                <span className="truncate">{isBangla ? 'SSC স্পেশাল' : 'SSC Special'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('studentHSC')}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  identifier === 'PAC-2026-8844' 
                    ? 'bg-maroon-800 border-maroon-900 text-white shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title="Login as Zubair Hossain (HSC Science)"
              >
                <GraduationCap className="w-3.5 h-3.5 text-maroon-600" />
                <span className="truncate">{isBangla ? 'এইচএসসি' : 'HSC'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className={`px-1.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  role === 'admin' 
                    ? 'bg-slate-950 border-slate-800 text-white' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span className="truncate">{isBangla ? 'অ্যাডমিন' : 'Admin'}</span>
              </button>
            </div>
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {role === 'student' 
                  ? (isBangla ? 'শিক্ষার্থী আইডি অথবা ইমেইল' : 'Student ID or Email Address')
                  : (isBangla ? 'অ্যাডমিনিস্ট্রেটর ইমেইল / ইউজারনেম' : 'Administrator Email / Username')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {role === 'student' ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    role === 'student' 
                      ? (isBangla ? 'যেমন: PAC-2026-8842 অথবা student@gmail.com' : 'e.g. PAC-2026-8842 or student@gmail.com')
                      : 'e.g. admin@psyche.edu.bd'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {isBangla ? 'পাসওয়ার্ড' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-maroon-800 hover:text-maroon-900 hover:underline cursor-pointer"
                >
                  {isBangla ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isBangla ? 'আপনার অ্যাকাউন্টের পাসওয়ার্ড লিখুন' : 'Enter your account password'}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-maroon-800 border-slate-300 focus:ring-maroon-700"
                />
                <span className="text-xs font-medium text-slate-600">
                  {isBangla ? 'লগইন মনে রাখুন' : 'Keep me signed in'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'admin'
                  ? 'bg-slate-950 hover:bg-slate-900'
                  : 'bg-maroon-800 hover:bg-maroon-900'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>
                    {role === 'admin' 
                      ? (isBangla ? 'অ্যাডমিনে প্রবেশ করুন' : 'Sign In to Admin Portal')
                      : (isBangla ? 'শিক্ষার্থী পোর্টালে প্রবেশ করুন' : 'Sign In to Student Portal')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Access links */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isBangla ? 'নতুন শিক্ষার্থী আবেদনকারী?' : 'New student applicant?'}</span>
            <Link to="/admission" className="font-bold text-maroon-800 hover:underline">
              {isBangla ? 'অনলাইন ভর্তি আবেদন' : 'Apply for Admission'}
            </Link>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-slate-900">
                {isBangla ? 'পাসওয়ার্ড উদ্ধার' : 'Credential Recovery'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isBangla
                  ? 'নিরাপত্তার স্বার্থে পাসওয়ার্ড রিসেট করতে শিক্ষার্থী আইডি সহ সরাসরি আমাদের ফ্রন্ট ডেস্ক বা হেল্পলাইনে যোগাযোগ করুন।'
                  : 'For security reasons, password resets are processed via our Front Desk or Helpline with verified Student ID.'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div><strong>{isBangla ? 'অ্যাডমিন হটলাইন:' : 'Admin Hotline:'}</strong> <a href="tel:+8801683334080" className="hover:underline font-semibold text-maroon-800">+880 1683-334080</a></div>
              <div><strong>{isBangla ? 'সাপোর্ট ডেস্ক:' : 'Support Desk:'}</strong> support@psyche.edu.bd</div>
            </div>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs cursor-pointer"
            >
              {isBangla ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
