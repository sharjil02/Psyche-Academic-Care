import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { Teachers } from './pages/Teachers';
import { Results } from './pages/Results';
import { Admission } from './pages/Admission';
import { Contact } from './pages/Contact';
import { StudentPortal } from './pages/StudentPortal';
import { AdminPortal } from './pages/AdminPortal';
import { Login } from './pages/Login';

// Component to scroll to top whenever route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-rose-100 selection:text-maroon-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/results" element={<Results />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/student-portal" element={<StudentPortal />} />
              <Route path="/admin-portal" element={<AdminPortal />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/login" element={<Login />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
