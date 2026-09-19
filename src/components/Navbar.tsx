import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Clock, 
  UserCircle, 
  ArrowRight, 
  Sparkles, 
  KeyRound, 
  LogOut, 
  Shield 
} from 'lucide-react';
import { PsycheLogo } from './Logo';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, isBangla } = useLanguage();
  const [authUser, setAuthUser] = useState<any>(() => {
    const saved = localStorage.getItem('pschye_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const saved = localStorage.getItem('pschye_auth_user');
      setAuthUser(saved ? JSON.parse(saved) : null);
    };

    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pschye_auth_user');
    setAuthUser(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.courses'), path: '/courses' },
    { name: t('nav.teachers'), path: '/teachers' },
    { name: t('nav.results'), path: '/results' },
    { name: t('nav.admission'), path: '/admission' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-maroon-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-maroon-400" />
              <span>+880 1812-345678</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-maroon-400" />
              <span>admissions@pschye.edu.bd</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('nav.hours')}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {authUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to={authUser.role === 'admin' ? '/admin-portal' : '/student-portal'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors font-medium border ${
                    authUser.role === 'admin'
                      ? 'bg-maroon-950/90 hover:bg-maroon-900/90 text-maroon-300 border-maroon-700/50'
                      : 'bg-maroon-950/80 hover:bg-maroon-900/80 text-maroon-300 border-maroon-700/50'
                  }`}
                >
                  {authUser.role === 'admin' ? (
                    <Shield className="w-3.5 h-3.5 text-maroon-400" />
                  ) : (
                    <UserCircle className="w-3.5 h-3.5 text-maroon-400" />
                  )}
                  <span className="max-w-[130px] truncate">{authUser.name}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 text-xs transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-800 hover:bg-maroon-700 text-white text-xs transition-colors font-bold shadow-2xs border-b border-maroon-500"
                >
                  <KeyRound className="w-3.5 h-3.5 text-maroon-200" />
                  <span>{t('nav.login')}</span>
                </Link>
                <Link
                  to="/student-portal"
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs transition-colors font-medium"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-maroon-400" />
                  <span>{t('nav.studentPortal')}</span>
                </Link>
                <Link
                  to="/admin-portal"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs transition-colors font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-maroon-400" />
                  <span>{t('nav.adminPortal')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand Separator Accent Stripe */}
      <div className="h-0.5 w-full brand-accent-line" />

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-maroon-100 py-3' 
          : 'bg-white border-b border-slate-200 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="shrink-0 group-hover:scale-105 transition-transform duration-200">
              <PsycheLogo className="w-12 h-12 text-maroon-900 group-hover:text-maroon-700 transition-colors" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                {isBangla ? 'সাইকি' : 'PSYCHE'} <span className="text-maroon-800">{isBangla ? 'একাডেমিক' : 'Academic'}</span> <span className="text-maroon-500">{isBangla ? 'কেয়ার' : 'Care'}</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                {t('nav.subheading')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links & Action CTA Button */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5">
            <div className="flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive 
                      ? 'text-maroon-800 bg-maroon-50 shadow-2xs font-bold border-b-2 border-maroon-500' 
                      : 'text-slate-700 hover:text-maroon-800 hover:bg-maroon-50/60'
                  }`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <Link
              to="/admission"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-sm font-bold shadow-xs hover:shadow transition-all duration-200 shrink-0 border-b-2 border-maroon-500"
            >
              <span>{t('nav.applyNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/admission"
              className="px-3.5 py-1.5 rounded-lg bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold transition-colors shadow-xs border-b border-maroon-500"
            >
              {t('nav.applyNow')}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-maroon-50 text-maroon-800 font-semibold border-l-3 border-maroon-500' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-maroon-800'
                  }`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                {authUser ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-maroon-700" />
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900 truncate max-w-[160px]">{authUser.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-semibold">{authUser.role}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-maroon-800 text-white font-bold text-sm hover:bg-maroon-900 shadow-xs border-b-2 border-maroon-500"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{t('nav.login')}</span>
                  </Link>
                )}

                <Link
                  to="/student-portal"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm hover:bg-maroon-50 hover:text-maroon-800"
                >
                  <GraduationCap className="w-4 h-4 text-maroon-700" />
                  <span>{t('nav.studentPortal')}</span>
                </Link>
                <Link
                  to="/admin-portal"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm hover:bg-maroon-50 hover:text-maroon-800"
                >
                  <Shield className="w-4 h-4 text-maroon-700" />
                  <span>{t('nav.adminPortal')}</span>
                </Link>
                <Link
                  to="/admission"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-maroon-800 text-white font-bold text-sm hover:bg-maroon-900 border-b-2 border-maroon-500"
                >
                  <Sparkles className="w-4 h-4 text-maroon-300" />
                  <span>{t('admission.title')}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
