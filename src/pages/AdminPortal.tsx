import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  initialAdminStudents,
  initialAdminResults,
  initialAdminInvoices,
  initialAdminApplications,
  initialAdminBatches,
  initialAdminFaculty,
  initialAdminNotices,
  initialAdminRoutines,
  AdminStudent,
  AdminExamResult,
  AdminInvoice,
  AdmissionApplication,
  BatchInfo,
  AdminFaculty,
  AdminNotice,
  AdminRoutine,
  NoticeCategory,
  NoticePriority,
  NoticeTarget,
  WeekDay,
} from '../data/adminData';
import {
  LayoutDashboard,
  Users,
  Award,
  CreditCard,
  UserCheck,
  Calendar,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Shield,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Sparkles,
  DollarSign,
  Download,
  Filter,
  Check,
  X,
  ExternalLink,
  Bell,
  BookUser,
  CalendarDays,
  AlertTriangle,
  BookOpen,
  Clock,
  Upload,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AdminPortal: React.FC = () => {
  const navigate = useNavigate();
  const { isBangla } = useLanguage();

  // Active Admin Auth
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('pschye_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  // State collections persisted with fallback to initial data
  const [students, setStudents] = useState<AdminStudent[]>(() => {
    const saved = localStorage.getItem('pschye_admin_students');
    return saved ? JSON.parse(saved) : initialAdminStudents;
  });

  const [results, setResults] = useState<AdminExamResult[]>(() => {
    const saved = localStorage.getItem('pschye_admin_results');
    return saved ? JSON.parse(saved) : initialAdminResults;
  });

  const [invoices, setInvoices] = useState<AdminInvoice[]>(() => {
    const saved = localStorage.getItem('pschye_admin_invoices');
    return saved ? JSON.parse(saved) : initialAdminInvoices;
  });

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem('pschye_admin_applications');
    return saved ? JSON.parse(saved) : initialAdminApplications;
  });

  const [batches, setBatches] = useState<BatchInfo[]>(() => {
    const saved = localStorage.getItem('pschye_admin_batches');
    return saved ? JSON.parse(saved) : initialAdminBatches;
  });

  const [faculty, setFaculty] = useState<AdminFaculty[]>(() => {
    const saved = localStorage.getItem('pschye_admin_faculty');
    if (!saved) return initialAdminFaculty;
    try {
      const parsed: AdminFaculty[] = JSON.parse(saved);
      return parsed.map(f => {
        if (!f.photo) {
          const match = initialAdminFaculty.find(init => init.id === f.id);
          if (match?.photo) return { ...f, photo: match.photo };
        }
        return f;
      });
    } catch {
      return initialAdminFaculty;
    }
  });

  const [notices, setNotices] = useState<AdminNotice[]>(() => {
    const saved = localStorage.getItem('pschye_admin_notices');
    if (!saved) return initialAdminNotices;
    try {
      const parsed: AdminNotice[] = JSON.parse(saved);
      return parsed.map(n => {
        if (!n.target) {
          const match = initialAdminNotices.find(init => init.id === n.id);
          if (match?.target) return { ...n, target: match.target };
          return { ...n, target: 'both' as NoticeTarget };
        }
        return n;
      });
    } catch {
      return initialAdminNotices;
    }
  });

  const [routines, setRoutines] = useState<AdminRoutine[]>(() => {
    const saved = localStorage.getItem('pschye_admin_routines');
    return saved ? JSON.parse(saved) : initialAdminRoutines;
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'results' | 'fees' | 'admissions' | 'batches' | 'faculty' | 'notices' | 'routine'>('overview');

  // Flash toast message
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('pschye_admin_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_routines', JSON.stringify(routines));
  }, [routines]);

  // Auth sync
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

  const handleDemoAdminLogin = () => {
    const session = {
      role: 'admin',
      name: 'Dr. Mahfuzul Alam (Director)',
      identifier: 'admin@pschye.edu.bd',
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('pschye_auth_user', JSON.stringify(session));
    setCurrentUser(session);
    window.dispatchEvent(new Event('authChange'));
  };

  // ================= MODAL STATES & HANDLERS =================
  // Add Student Modal
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    batch: batches[0]?.name || 'Morning Elite Batch-A',
    currentClass: 'Class 10 (SSC)',
    phone: '',
    guardianName: '',
    guardianPhone: '',
    monthlyFee: 2500
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name.trim() || !newStudent.phone.trim()) {
      alert('Please fill out student name and phone number');
      return;
    }
    const studentId = `PAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const student: AdminStudent = {
      id: `s-${Date.now()}`,
      name: newStudent.name.trim(),
      studentId,
      batch: newStudent.batch,
      currentClass: newStudent.currentClass,
      phone: newStudent.phone.trim(),
      guardianName: newStudent.guardianName.trim() || 'Parent',
      guardianPhone: newStudent.guardianPhone.trim() || newStudent.phone.trim(),
      monthlyFee: Number(newStudent.monthlyFee) || 2500,
      status: 'Active',
      enrolledDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setStudents(prev => [student, ...prev]);
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      batch: batches[0]?.name || 'Morning Elite Batch-A',
      currentClass: 'Class 10 (SSC)',
      phone: '',
      guardianName: '',
      guardianPhone: '',
      monthlyFee: 2500
    });
    showToast(`Enrolled ${student.name} with Student ID: ${studentId}`);
  };

  // Add Exam Result Modal
  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [newResult, setNewResult] = useState({
    studentId: students[0]?.studentId || '',
    examName: 'Mid-Term Evaluation',
    subject: 'Physics',
    marksObtained: 85,
    totalMarks: 100,
    remarks: 'Consistent analytical technique'
  });

  const handleCreateResult = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.studentId === newResult.studentId);
    const marks = Number(newResult.marksObtained);
    const total = Number(newResult.totalMarks) || 100;
    const percentage = (marks / total) * 100;
    
    let grade = 'F';
    let gpa = 0.0;
    if (percentage >= 80) { grade = 'A+'; gpa = 5.0; }
    else if (percentage >= 70) { grade = 'A'; gpa = 4.0; }
    else if (percentage >= 60) { grade = 'A-'; gpa = 3.5; }
    else if (percentage >= 50) { grade = 'B'; gpa = 3.0; }
    else if (percentage >= 40) { grade = 'C'; gpa = 2.0; }
    else if (percentage >= 33) { grade = 'D'; gpa = 1.0; }

    const createdResult: AdminExamResult = {
      id: `res-${Date.now()}`,
      studentId: newResult.studentId,
      studentName: student?.name || 'Student',
      batch: student?.batch || 'General Batch',
      examName: newResult.examName,
      subject: newResult.subject,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      marksObtained: marks,
      totalMarks: total,
      gpa,
      grade,
      remarks: newResult.remarks
    };

    setResults(prev => [createdResult, ...prev]);
    setShowAddResultModal(false);
    showToast(`Published exam score for ${student?.name || newResult.studentId}`);
  };

  // Add Fee Invoice Modal
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    studentId: students[0]?.studentId || '',
    month: 'October 2026',
    amount: 2500,
    dueDate: 'Oct 10, 2026'
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.studentId === newInvoice.studentId);
    const invoice: AdminInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: newInvoice.studentId,
      studentName: student?.name || 'Student',
      batch: student?.batch || 'Class Batch',
      month: newInvoice.month,
      amount: Number(newInvoice.amount),
      dueDate: newInvoice.dueDate,
      status: 'Due'
    };

    setInvoices(prev => [invoice, ...prev]);
    setShowAddInvoiceModal(false);
    showToast(`Invoice ${invoice.invoiceNo} issued for ${student?.name}`);
  };

  // Mark invoice as paid
  const handleMarkInvoicePaid = (invId: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invId) {
        return {
          ...inv,
          status: 'Paid',
          paidDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          method: 'Direct Cash / Desk Voucher'
        };
      }
      return inv;
    }));
    showToast('Invoice marked as Paid successfully!');
  };

  // Approve Admission Application
  const handleApproveApplication = (app: AdmissionApplication) => {
    const studentId = `PAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    // Create new student
    const newStud: AdminStudent = {
      id: `s-${Date.now()}`,
      name: app.studentName,
      studentId,
      batch: batches[0]?.name || 'Morning Elite Batch-A',
      currentClass: app.studentClass,
      phone: app.phone,
      guardianName: app.fatherName || 'Parent',
      guardianPhone: app.phone,
      monthlyFee: 2500,
      status: 'Active',
      enrolledDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setStudents(prev => [newStud, ...prev]);
    setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: 'Approved' } : a));
    showToast(`Application approved! ${app.studentName} enrolled with ID: ${studentId}`);
  };

  // Reject Application
  const handleRejectApplication = (appId: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Rejected' } : a));
    showToast('Application marked as Rejected');
  };

  // Delete Student
  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove student: ${name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      showToast(`Student ${name} removed`);
    }
  };

  // Delete Result
  const handleDeleteResult = (id: string) => {
    if (confirm('Delete this exam record?')) {
      setResults(prev => prev.filter(r => r.id !== id));
      showToast('Exam result deleted');
    }
  };

  // ─── FACULTY HANDLERS ───────────────────────────────────────────────────────
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    designation: '',
    subjectExpertise: '',
    qualification: '',
    phone: '',
    email: '',
    photo: '',
  });
  const [facultyPhotoPreview, setFacultyPhotoPreview] = useState<string>('');

  const handleFacultyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast(isBangla ? 'ছবির আকার সর্বোচ্চ ৩ মেগাবাইট হতে হবে' : 'Image size must be under 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFacultyPhotoPreview(result);
        setNewFaculty(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name.trim()) return;
    const member: AdminFaculty = {
      id: `fac-${Date.now()}`,
      name: newFaculty.name.trim(),
      designation: newFaculty.designation.trim() || 'Lecturer',
      subjectExpertise: newFaculty.subjectExpertise.trim() || 'General',
      qualification: newFaculty.qualification.trim() || 'N/A',
      phone: newFaculty.phone.trim() || 'N/A',
      email: newFaculty.email.trim() || 'N/A',
      photo: (newFaculty.photo || facultyPhotoPreview).trim() || undefined,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Active',
    };
    setFaculty(prev => [member, ...prev]);
    setShowAddFacultyModal(false);
    setNewFaculty({ name: '', designation: '', subjectExpertise: '', qualification: '', phone: '', email: '', photo: '' });
    setFacultyPhotoPreview('');
    showToast(`Faculty member ${member.name} added successfully!`);
  };

  const handleDeleteFaculty = (id: string, name: string) => {
    if (confirm(`Remove faculty member: ${name}?`)) {
      setFaculty(prev => prev.filter(f => f.id !== id));
      showToast(`${name} removed from faculty.`);
    }
  };

  // ─── NOTICE HANDLERS ─────────────────────────────────────────────────────────
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [noticeFilter, setNoticeFilter] = useState<'all' | 'home' | 'student'>('all');
  const [newNotice, setNewNotice] = useState<{
    title: string;
    body: string;
    category: NoticeCategory;
    priority: NoticePriority;
    target: NoticeTarget;
  }>({
    title: '',
    body: '',
    category: 'General',
    priority: 'Normal',
    target: 'home',
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title.trim() || !newNotice.body.trim()) return;
    const notice: AdminNotice = {
      id: `notice-${Date.now()}`,
      title: newNotice.title.trim(),
      body: newNotice.body.trim(),
      category: newNotice.category,
      priority: newNotice.priority,
      target: newNotice.target || 'both',
      publishedBy: currentUser?.name || 'Admin',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setNotices(prev => [notice, ...prev]);
    setShowAddNoticeModal(false);
    setNewNotice({ title: '', body: '', category: 'General', priority: 'Normal', target: 'home' });
    showToast(isBangla ? 'নোটিশ সফলভাবে প্রকাশিত হয়েছে!' : 'Notice published successfully!');
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm(isBangla ? 'এই নোটিশটি মুছে ফেলতে চান?' : 'Delete this notice?')) {
      setNotices(prev => prev.filter(n => n.id !== id));
      showToast(isBangla ? 'নোটিশ মুছে ফেলা হয়েছে।' : 'Notice deleted.');
    }
  };

  // ─── ROUTINE HANDLERS ────────────────────────────────────────────────────────
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [routineBatchFilter, setRoutineBatchFilter] = useState(batches[0]?.name || 'Morning Elite Batch-A');
  const [newSlot, setNewSlot] = useState({
    batchName: batches[0]?.name || 'Morning Elite Batch-A',
    day: 'Sunday' as WeekDay,
    time: '',
    subject: '',
    teacher: '',
    room: '',
  });

  const handleCreateRoutineSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlot.subject.trim() || !newSlot.time.trim()) return;
    const slot = {
      id: `sl-${Date.now()}`,
      day: newSlot.day,
      time: newSlot.time.trim(),
      subject: newSlot.subject.trim(),
      teacher: newSlot.teacher.trim() || 'TBA',
      room: newSlot.room.trim() || 'TBA',
    };
    setRoutines(prev => {
      const existing = prev.find(r => r.batchName === newSlot.batchName);
      if (existing) {
        return prev.map(r => r.batchName === newSlot.batchName ? { ...r, slots: [...r.slots, slot] } : r);
      }
      return [...prev, { id: `rtn-${Date.now()}`, batchName: newSlot.batchName, slots: [slot] }];
    });
    setShowAddRoutineModal(false);
    setNewSlot({ batchName: batches[0]?.name || 'Morning Elite Batch-A', day: 'Sunday', time: '', subject: '', teacher: '', room: '' });
    showToast('Class slot added to routine!');
  };

  const handleDeleteRoutineSlot = (batchName: string, slotId: string) => {
    setRoutines(prev => prev.map(r => r.batchName === batchName
      ? { ...r, slots: r.slots.filter(s => s.id !== slotId) }
      : r
    ));
    showToast('Routine slot removed.');
  };

  const filteredRoutine = routines.find(r => r.batchName === routineBatchFilter);

  // Search & Filter queries
  const [studentSearch, setStudentSearch] = useState('');
  const [studentBatchFilter, setStudentBatchFilter] = useState('All');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.studentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.phone.includes(studentSearch);
    const matchesBatch = studentBatchFilter === 'All' || s.batch === studentBatchFilter;
    const matchesStatus = studentStatusFilter === 'All' || s.status === studentStatusFilter;
    return matchesSearch && matchesBatch && matchesStatus;
  });

  // Calculate High-level Dashboard Metrics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalDue = invoices.filter(i => i.status === 'Due').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingApps = applications.filter(a => a.status === 'Pending').length;

  // Gatekeeper: If user is not logged in as admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center text-white shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {isBangla ? 'অ্যাডমিন প্রবেশাধিকার সংরক্ষিত' : 'Admin Access Restricted'}
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {isBangla ? 'প্রাতিষ্ঠানিক অ্যাডমিন পোর্টাল' : 'Institutional Admin Portal'}
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isBangla 
                ? 'এই প্যানেলে শিক্ষার্থী পরিচালনা, পরীক্ষার নম্বর প্রকাশ, ফি নিরীক্ষা এবং অনলাইন ভর্তি আবেদনের পূর্ণ নিয়ন্ত্রণ রয়েছে।' 
                : 'This panel provides full administrative controls to manage students, publish exam marks, audit fee payments, and review admissions.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleDemoAdminLogin}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-maroon-800 to-rose-700 hover:from-maroon-700 hover:to-rose-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isBangla ? 'তাৎক্ষণিক ১-ক্লিক ডেমো অ্যাডমিন লগইন' : 'Instant 1-Click Demo Admin Login'}</span>
            </button>

            <Link
              to="/login"
              className="w-full py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs border border-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <span>{isBangla ? 'লগইন প্যানেলে যান' : 'Go to Login Panel'}</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-700/80 text-xs text-slate-400">
            {isBangla ? 'শিক্ষার্থীর তথ্য খুঁজছেন?' : 'Looking for student records?'}{' '}
            <Link to="/student-portal" className="text-rose-400 font-semibold hover:underline">
              {isBangla ? 'শিক্ষার্থী পোর্টাল' : 'Student Portal'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20 text-slate-800">
      {/* Admin Top Utility Navigation */}
      <div className="bg-slate-950 text-white border-b border-maroon-950 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Left Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-maroon-800 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight text-white">
                    {isBangla ? 'সাইকি অ্যাডমিন কনসোল' : 'PSYCHE Admin Console'}
                  </h1>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-maroon-500/20 text-rose-300 border border-rose-500/30">
                    {isBangla ? 'মাস্টার কন্ট্রোল' : 'MASTER CONTROL'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {isBangla ? 'লগইনকৃত:' : 'Logged in as:'} <strong className="text-slate-200">{currentUser.name || (isBangla ? 'পরিচালক' : 'Director')}</strong> ({currentUser.identifier})
                </p>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>{isBangla ? 'ওয়েবসাইট দেখুন' : 'Visit Website'}</span>
              </Link>

              <Link
                to="/student-portal"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                <span>{isBangla ? 'শিক্ষার্থী পোর্টাল' : 'Student Portal'}</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isBangla ? 'লগআউট' : 'Sign Out'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-rose-500/40 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs flex flex-wrap items-center gap-1">
          {[
            { id: 'overview', name: isBangla ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
            { id: 'students', name: isBangla ? 'শিক্ষার্থী' : 'Students', icon: Users, count: totalStudents },
            { id: 'results', name: isBangla ? 'পরীক্ষার ফলাফল' : 'Exam Results', icon: Award, count: results.length },
            { id: 'fees', name: isBangla ? 'ফি ও হিসাব' : 'Fees', icon: CreditCard },
            { id: 'admissions', name: isBangla ? 'ভর্তি আবেদন' : 'Admissions', icon: UserCheck, count: pendingApps, badgeColor: 'bg-rose-700 text-white' },
            { id: 'batches', name: isBangla ? 'ব্যাচ' : 'Batches', icon: Calendar, count: batches.length },
            { id: 'faculty', name: isBangla ? 'শিক্ষকমণ্ডলী' : 'Faculty', icon: BookUser, count: faculty.length },
            { id: 'notices', name: isBangla ? 'নোটিশ বোর্ড' : 'Notice Board', icon: Bell, count: notices.length },
            { id: 'routine', name: isBangla ? 'ক্লাস রুটিন' : 'Routine', icon: CalendarDays },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-maroon-800 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.name}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    tab.badgeColor ? tab.badgeColor : isActive ? 'bg-maroon-900 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBangla ? 'মোট শিক্ষার্থী' : 'Total Enrolled'}
                  </p>
                  <p className="text-2xl font-black text-slate-900 mt-1">
                    {totalStudents} {isBangla ? 'জন' : 'Students'}
                  </p>
                  <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3" /> {activeStudents} {isBangla ? 'জন সক্রিয়' : 'Active this term'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBangla ? 'আদায়কৃত ফি' : 'Fees Collected'}
                  </p>
                  <p className="text-2xl font-black text-maroon-800 mt-1">৳ {totalCollected.toLocaleString()}</p>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">
                    {isBangla ? 'চলতি শিক্ষাবর্ষ' : 'Current September Cycle'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-maroon-800 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBangla ? 'বকেয়া ফি' : 'Pending Dues'}
                  </p>
                  <p className="text-2xl font-black text-amber-600 mt-1">৳ {totalDue.toLocaleString()}</p>
                  <span className="text-[11px] font-semibold text-amber-700 mt-1">
                    {isBangla ? 'ফলোআপ আবশ্যক' : 'Requires follow-up'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBangla ? 'অনলাইন ভর্তি আবেদন' : 'Online Admissions'}
                  </p>
                  <p className="text-2xl font-black text-rose-600 mt-1">
                    {pendingApps} {isBangla ? 'টি অপেক্ষমাণ' : 'Pending'}
                  </p>
                  <span className="text-[11px] font-semibold text-rose-600 mt-1">
                    {isBangla ? 'পর্যালোচনা প্রয়োজন' : 'Needs review'}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Admin Actions Row */}
            <div className="bg-gradient-to-r from-slate-950 to-maroon-950 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {isBangla ? 'সরাসরি প্রশাসনিক অ্যাকশন' : 'Direct Administrative Actions'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isBangla 
                    ? 'দ্রুত নতুন শিক্ষার্থী ভর্তি করুন, মডেল টেস্টের নম্বর প্রকাশ করুন এবং টিউশন ভাউচার তৈরি করুন।' 
                    : 'Fast triggers to enroll new admissions, publish model exam cards, and generate tuition vouchers.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'শিক্ষার্থী ভর্তি' : 'Enroll Student'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddResultModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'ফলাফল প্রকাশ' : 'Publish Result'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs border border-slate-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'ইনভয়েস তৈরি' : 'Issue Invoice'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'নোটিশ প্রকাশ' : 'Post Notice'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddFacultyModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <BookUser className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'শিক্ষক যোগ করুন' : 'Add Faculty'}</span>
                </button>
              </div>
            </div>

            {/* Two Column Grid: Pending Admissions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Pending Admission Applications Queue */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {isBangla ? 'নতুন ভর্তি আবেদন' : 'New Admission Inquiries'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isBangla ? 'ওয়েবসাইট থেকে জমা হওয়া আবেদনসমূহ' : 'Submitted via the public online form'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="text-xs font-bold text-maroon-800 hover:underline cursor-pointer"
                  >
                    {isBangla ? `সব দেখুন (${applications.length})` : `View All (${applications.length})`}
                  </button>
                </div>

                <div className="space-y-3">
                  {applications.slice(0, 3).map(app => (
                    <div key={app.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-maroon-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{app.studentName}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                            {app.studentClass}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            app.status === 'Approved' ? 'bg-rose-50 text-maroon-800' :
                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {app.status === 'Approved' ? (isBangla ? 'অনুমোদিত' : 'Approved') :
                             app.status === 'Rejected' ? (isBangla ? 'বাতিল' : 'Rejected') : (isBangla ? 'অপেক্ষমাণ' : 'Pending')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {isBangla ? 'কোর্স:' : 'Course:'} <strong>{app.course}</strong> • {isBangla ? 'ফোন:' : 'Phone:'} {app.phone}
                        </p>
                      </div>

                      {app.status === 'Pending' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleApproveApplication(app)}
                            className="px-3 py-1.5 rounded-lg bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isBangla ? 'অনুমোদন' : 'Approve'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectApplication(app.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Active Batches Occupancy */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {isBangla ? 'ব্যাচের আসন সংখ্যা' : 'Batches Occupancy'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isBangla ? 'লাইভ ক্লাসরুম ধারণক্ষমতা' : 'Live classroom capacity tracking'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('batches')}
                    className="text-xs font-bold text-maroon-800 hover:underline cursor-pointer"
                  >
                    {isBangla ? 'ব্যবস্থাপনা' : 'Manage'}
                  </button>
                </div>

                <div className="space-y-3.5">
                  {batches.map(b => {
                    const pct = Math.round((b.enrolledCount / b.capacity) * 100);
                    return (
                      <div key={b.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-800 truncate">{b.name}</span>
                          <span className="text-slate-500">
                            {b.enrolledCount}/{b.capacity} {isBangla ? 'আসন' : 'seats'} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 90 ? 'bg-rose-600' : pct >= 75 ? 'bg-amber-500' : 'bg-maroon-800'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: STUDENTS DIRECTORY */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isBangla ? 'শিক্ষার্থী ডিরেক্টরি' : 'Student Directory'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'কোচিংয়ের শিক্ষার্থী তালিকা, যোগাযোগ এবং ফি ব্যবস্থাপনা' : 'Manage enrolled coaching students, contacts, and fees'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddStudentModal(true)}
                className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isBangla ? 'নতুন শিক্ষার্থী ভর্তি' : 'Add New Student'}</span>
              </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={isBangla ? 'শিক্ষার্থীর নাম, আইডি বা ফোন নম্বর দিয়ে খুঁজুন...' : 'Search by student name, ID, or phone...'}
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={studentBatchFilter}
                  onChange={e => setStudentBatchFilter(e.target.value)}
                  className="px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 font-medium"
                >
                  <option value="All">{isBangla ? 'সকল ব্যাচ' : 'All Batches'}</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>

                <select
                  value={studentStatusFilter}
                  onChange={e => setStudentStatusFilter(e.target.value)}
                  className="px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 font-medium"
                >
                  <option value="All">{isBangla ? 'সকল স্ট্যাটাস' : 'All Statuses'}</option>
                  <option value="Active">{isBangla ? 'সক্রিয়' : 'Active'}</option>
                  <option value="On Leave">{isBangla ? 'ছুটিতে' : 'On Leave'}</option>
                  <option value="Graduated">{isBangla ? 'উত্তীর্ণ' : 'Graduated'}</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">{isBangla ? 'শিক্ষার্থীর নাম ও আইডি' : 'Student Name & ID'}</th>
                    <th className="px-4 py-3">{isBangla ? 'ব্যাচ ও শ্রেণি' : 'Batch & Class'}</th>
                    <th className="px-4 py-3">{isBangla ? 'যোগাযোগ' : 'Contact'}</th>
                    <th className="px-4 py-3">{isBangla ? 'অভিভাবক' : 'Guardian'}</th>
                    <th className="px-4 py-3">{isBangla ? 'মাসিক ফি' : 'Monthly Fee'}</th>
                    <th className="px-4 py-3">{isBangla ? 'স্ট্যাটাস' : 'Status'}</th>
                    <th className="px-4 py-3 text-right">{isBangla ? 'অ্যাকশন' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        {isBangla ? 'কোন শিক্ষার্থী পাওয়া যায়নি।' : 'No students found matching current filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{student.name}</div>
                          <div className="text-[11px] text-maroon-800 font-semibold">{student.studentId}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-800">{student.batch}</div>
                          <div className="text-[11px] text-slate-400">{student.currentClass}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {student.phone}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-800">{student.guardianName}</div>
                          <div className="text-[11px] text-slate-400">{student.guardianPhone}</div>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          ৳ {student.monthlyFee.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            student.status === 'Active' ? 'bg-rose-50 text-maroon-800 border border-rose-200' :
                            student.status === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {student.status === 'Active' ? (isBangla ? 'সক্রিয়' : 'Active') :
                             student.status === 'On Leave' ? (isBangla ? 'ছুটিতে' : 'On Leave') :
                             (isBangla ? 'উত্তীর্ণ' : 'Graduated')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteStudent(student.id, student.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title={isBangla ? 'মুছে ফেলুন' : 'Delete Student'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EXAM RESULTS */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isBangla ? 'পরীক্ষার ফলাফল ও নম্বর ব্যবস্থাপনা' : 'Exam Results & Marks Management'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'মডেল টেস্ট, CQ/MCQ মূল্যায়ন এবং গ্রেডিং কার্ড সংরক্ষণ' : 'Record model tests, CQ/MCQ assessments, and grading cards'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddResultModal(true)}
                className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isBangla ? 'পরীক্ষার ফলাফল প্রকাশ' : 'Publish Exam Result'}</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">{isBangla ? 'শিক্ষার্থীর নাম ও আইডি' : 'Student Name & ID'}</th>
                    <th className="px-4 py-3">{isBangla ? 'পরীক্ষার নাম' : 'Exam Title'}</th>
                    <th className="px-4 py-3">{isBangla ? 'বিষয়' : 'Subject'}</th>
                    <th className="px-4 py-3">{isBangla ? 'প্রাপ্ত নম্বর' : 'Marks Obtained'}</th>
                    <th className="px-4 py-3">{isBangla ? 'জিপিএ ও গ্রেড' : 'GPA & Grade'}</th>
                    <th className="px-4 py-3">{isBangla ? 'মন্তব্য' : 'Remarks'}</th>
                    <th className="px-4 py-3 text-right">{isBangla ? 'অ্যাকশন' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {results.map(res => (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{res.studentName}</div>
                        <div className="text-[11px] text-slate-500">{res.studentId} • {res.batch}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800">{res.examName}</div>
                        <div className="text-[11px] text-slate-400">{res.date}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-maroon-800">{res.subject}</td>
                      <td className="px-4 py-3">
                        <strong className="text-slate-900">{res.marksObtained}</strong> / {res.totalMarks}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md font-extrabold bg-rose-50 text-maroon-800 border border-rose-200">
                          {res.grade} ({res.gpa.toFixed(1)})
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                        {res.remarks}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteResult(res.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title={isBangla ? 'মুছে ফেলুন' : 'Delete Result'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: FEES & INVOICES */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isBangla ? 'টিউশন ফি ও ইনভয়েস হিসাব' : 'Tuition Fees & Invoice Accounts'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'আদায় পরিস্থিতি নিরীক্ষা, নগদ/বিকাশ রসিদ এবং ভাউচার তৈরি' : 'Audit collection status, log cash/bKash receipts, and issue vouchers'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddInvoiceModal(true)}
                className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isBangla ? 'মাসিক ভাউচার প্রদান' : 'Issue Monthly Voucher'}</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">{isBangla ? 'ইনভয়েস নং' : 'Invoice No'}</th>
                    <th className="px-4 py-3">{isBangla ? 'শিক্ষার্থী ও ব্যাচ' : 'Student & Batch'}</th>
                    <th className="px-4 py-3">{isBangla ? 'মাসের নাম' : 'Billing Month'}</th>
                    <th className="px-4 py-3">{isBangla ? 'পরিমাণ' : 'Amount'}</th>
                    <th className="px-4 py-3">{isBangla ? 'পরিশোধের তারিখ' : 'Due Date'}</th>
                    <th className="px-4 py-3">{isBangla ? 'অবস্থা' : 'Status'}</th>
                    <th className="px-4 py-3 text-right">{isBangla ? 'অ্যাকশন' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-700">{inv.invoiceNo}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{inv.studentName}</div>
                        <div className="text-[11px] text-slate-500">{inv.studentId} • {inv.batch}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-800">{inv.month}</td>
                      <td className="px-4 py-3 font-extrabold text-slate-900">৳ {inv.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-600">{inv.dueDate}</td>
                      <td className="px-4 py-3">
                        {inv.status === 'Paid' ? (
                          <div>
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-rose-50 text-maroon-800 border border-rose-200">
                              {isBangla ? 'পরিশোধিত' : 'Paid'}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">{inv.paidDate} ({inv.method})</div>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-amber-700 border border-amber-200">
                            {isBangla ? 'বকেয়া' : 'Payment Due'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {inv.status === 'Due' && (
                          <button
                            type="button"
                            onClick={() => handleMarkInvoicePaid(inv.id)}
                            className="px-3 py-1.5 rounded-lg bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            {isBangla ? 'পরিশোধ চিহ্নিত করুন' : 'Mark Paid'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ADMISSIONS DESK */}
        {activeTab === 'admissions' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {isBangla ? 'ভর্তি ডেস্ক ও অনলাইন আবেদন' : 'Admissions Desk & Online Inquiries'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBangla ? 'আবেদন পর্যালোচনা, সাক্ষাৎকার এবং সরাসরি শিক্ষার্থী তালিকায় সংযুক্তি' : 'Review, interview status, and 1-click student roster enrollment'}
              </p>
            </div>

            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="p-5 rounded-2xl border border-slate-200 hover:border-maroon-300 transition-all bg-slate-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-maroon-50 text-maroon-800 border border-rose-100 flex items-center justify-center font-black">
                        {app.studentName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{app.studentName}</h3>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-maroon-800 border border-rose-200">
                            {app.studentClass}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            app.status === 'Approved' ? 'bg-rose-50 text-maroon-800 border border-rose-200' :
                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {app.status === 'Approved' ? (isBangla ? 'অনুমোদিত' : 'Approved') :
                             app.status === 'Rejected' ? (isBangla ? 'বাতিল' : 'Rejected') :
                             (isBangla ? 'অপেক্ষমাণ' : 'Pending')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {isBangla ? 'আবেদনের তারিখ:' : 'Submitted on:'} {app.submissionDate} • {isBangla ? 'শিফট:' : 'Shift:'} {app.preferredShift}
                        </p>
                      </div>
                    </div>

                    {app.status === 'Pending' && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApproveApplication(app)}
                          className="px-4 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isBangla ? 'অনুমোদন ও ভর্তি করুন' : 'Approve & Enroll Student'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectApplication(app.id)}
                          className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          {isBangla ? 'বাতিল' : 'Reject'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block font-semibold">{isBangla ? 'বাছাইকৃত কোর্স:' : 'Course Choice:'}</span>
                      <strong className="text-slate-800">{app.course}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">{isBangla ? 'পূর্ববর্তী প্রতিষ্ঠান:' : 'Previous School:'}</span>
                      <strong className="text-slate-800">{app.previousSchool || (isBangla ? 'উল্লেখ নেই' : 'Not Specified')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">{isBangla ? 'অভিভাবক ও যোগাযোগ:' : 'Guardian & Contact:'}</span>
                      <strong className="text-slate-800">{app.fatherName} ({app.phone})</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BATCHES & SCHEDULE */}
        {activeTab === 'batches' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {isBangla ? 'কোচিং ব্যাচ ও ক্লাসরুম' : 'Coaching Batches & Classrooms'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBangla ? 'ক্লাসের সময়সূচী, শিক্ষক এবং আসন প্রাপ্যতা' : 'Class timings, instructors, and seat availability'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batches.map(b => (
                <div key={b.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-50 text-maroon-800 border border-rose-200">
                        {b.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{b.name}</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {b.enrolledCount} / {b.capacity} {isBangla ? 'জন শিক্ষার্থী' : 'Students'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <div><strong>{isBangla ? 'টার্গেট শ্রেণি:' : 'Target:'}</strong> {b.targetClass}</div>
                    <div><strong>{isBangla ? 'শিক্ষক:' : 'Instructor:'}</strong> {b.instructor}</div>
                    <div><strong>{isBangla ? 'সময়সূচী:' : 'Schedule:'}</strong> {b.schedule}</div>
                    <div><strong>{isBangla ? 'রুম নং:' : 'Room:'}</strong> {b.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: FACULTY */}
        {activeTab === 'faculty' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{isBangla ? 'শিক্ষকমণ্ডলী ব্যবস্থাপনা' : 'Faculty Management'}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{isBangla ? 'কোচিংয়ের সকল শিক্ষক ও প্রভাষকদের তথ্য পরিচালনা' : 'Manage all instructors and lecturers of the coaching centre'}</p>
                </div>
                <button type="button" onClick={() => setShowAddFacultyModal(true)} className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" /><span>{isBangla ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Faculty Member'}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {faculty.map(f => (
                  <div key={f.id} className="p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all bg-white space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      {f.photo ? (
                        <img
                          src={f.photo}
                          alt={f.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-teal-200 shadow-xs shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center font-black text-lg shrink-0">
                          {f.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${f.status === 'Active' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                          {f.status === 'Active' ? (isBangla ? 'সক্রিয়' : 'Active') : (isBangla ? 'ছুটিতে' : 'On Leave')}
                        </span>
                        <button type="button" onClick={() => handleDeleteFaculty(f.id, f.name)} className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{f.name}</div>
                      <div className="text-xs text-teal-700 font-semibold mt-0.5">{f.designation}</div>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span>{f.subjectExpertise}</span></div>
                      <div className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span>{f.qualification}</span></div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span>{f.phone}</span></div>
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span className="truncate">{f.email}</span></div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /><span>{isBangla ? 'যোগদান:' : 'Joined:'} {f.joinDate}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: NOTICE BOARD */}
        {activeTab === 'notices' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{isBangla ? 'নোটিশ বোর্ড ব্যবস্থাপনা' : 'Notice Board Management'}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{isBangla ? 'শিক্ষার্থীদের জন্য প্রকাশিত সকল নোটিশ পরিচালনা করুন' : 'Manage all notices published to students and parents'}</p>
                </div>
                <button type="button" onClick={() => setShowAddNoticeModal(true)} className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer">
                  <Bell className="w-4 h-4" /><span>{isBangla ? 'নতুন নোটিশ প্রকাশ করুন' : 'Post New Notice'}</span>
                </button>
              </div>

              {/* Filter Tabs for Destination */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
                <button
                  type="button"
                  onClick={() => setNoticeFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    noticeFilter === 'all'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isBangla ? 'সকল নোটিশ' : 'All Notices'} ({notices.length})
                </button>
                <button
                  type="button"
                  onClick={() => setNoticeFilter('home')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    noticeFilter === 'home'
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>🏠</span>
                  <span>{isBangla ? 'হোম পেইজ' : 'Home Page'}</span>
                  <span className="text-[10px] opacity-80">({notices.filter(n => n.target === 'home' || n.target === 'both').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNoticeFilter('student')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    noticeFilter === 'student'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>🎓</span>
                  <span>{isBangla ? 'শিক্ষার্থী প্যানেল' : 'Student Panel'}</span>
                  <span className="text-[10px] opacity-80">({notices.filter(n => n.target === 'student' || n.target === 'both').length})</span>
                </button>
              </div>

              <div className="space-y-4 mt-5">
                {(() => {
                  const filtered = notices.filter(n => {
                    if (noticeFilter === 'home') return n.target === 'home' || n.target === 'both';
                    if (noticeFilter === 'student') return n.target === 'student' || n.target === 'both';
                    return true;
                  });
                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-12 text-slate-400 text-sm">{isBangla ? 'এই বিভাগে কোনো নোটিশ নেই।' : 'No notices found in this filter.'}</div>
                    );
                  }
                  return filtered.map(notice => {
                    const catColor: Record<string, string> = {
                      Exam: 'bg-blue-50 text-blue-700 border-blue-200',
                      Academic: 'bg-teal-50 text-teal-700 border-teal-200',
                      Holiday: 'bg-green-50 text-green-700 border-green-200',
                      Fee: 'bg-amber-50 text-amber-700 border-amber-200',
                      General: 'bg-slate-100 text-slate-600 border-slate-200',
                    };
                    return (
                      <div key={notice.id} className={`p-5 rounded-2xl border transition-all bg-white hover:shadow-sm ${notice.priority === 'Urgent' ? 'border-rose-200' : 'border-slate-200'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Destination Badge */}
                              {notice.target === 'home' && (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-maroon-800 border border-rose-200">
                                  <span>🏠</span> {isBangla ? 'হোম পেইজ' : 'Home Page'}
                                </span>
                              )}
                              {notice.target === 'student' && (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                                  <span>🎓</span> {isBangla ? 'শিক্ষার্থী প্যানেল' : 'Student Panel'}
                                </span>
                              )}
                              {(notice.target === 'both' || !notice.target) && (
                                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                  <span>🌐</span> {isBangla ? 'হোম ও শিক্ষার্থী উভয়' : 'Home & Student'}
                                </span>
                              )}

                              {notice.priority === 'Urgent' && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                                  <AlertTriangle className="w-2.5 h-2.5" /> {isBangla ? 'জরুরি' : 'URGENT'}
                                </span>
                              )}
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${catColor[notice.category]}`}>{notice.category}</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">{notice.title}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">{notice.body}</p>
                            <p className="text-[11px] text-slate-400">{isBangla ? 'প্রকাশক:' : 'Published by:'} <strong className="text-slate-600">{notice.publishedBy}</strong> • {notice.publishedDate}</p>
                          </div>
                          <button type="button" onClick={() => handleDeleteNotice(notice.id)} className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: CLASS ROUTINE */}
        {activeTab === 'routine' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{isBangla ? 'ক্লাস রুটিন ব্যবস্থাপনা' : 'Class Routine Management'}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{isBangla ? 'ব্যাচ অনুযায়ী সাপ্তাহিক ক্লাস সময়সূচি তৈরি ও পরিচালনা' : 'Create and manage weekly class schedules per batch'}</p>
                </div>
                <button type="button" onClick={() => setShowAddRoutineModal(true)} className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer">
                  <Plus className="w-4 h-4" /><span>{isBangla ? 'নতুন ক্লাস স্লট যোগ করুন' : 'Add Class Slot'}</span>
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {batches.map(b => (
                  <button key={b.id} onClick={() => setRoutineBatchFilter(b.name)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${routineBatchFilter === b.name ? 'bg-maroon-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{b.name}</button>
                ))}
              </div>
              <div className="mt-5">
                {!filteredRoutine || filteredRoutine.slots.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm border border-dashed border-slate-200 rounded-2xl">
                    {isBangla ? 'এই ব্যাচের জন্য কোনো ক্লাস স্লট নেই।' : 'No class slots found for this batch.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">{isBangla ? 'বার' : 'Day'}</th>
                          <th className="px-4 py-3">{isBangla ? 'সময়' : 'Time'}</th>
                          <th className="px-4 py-3">{isBangla ? 'বিষয়' : 'Subject'}</th>
                          <th className="px-4 py-3">{isBangla ? 'শিক্ষক' : 'Teacher'}</th>
                          <th className="px-4 py-3">{isBangla ? 'কক্ষ' : 'Room'}</th>
                          <th className="px-4 py-3 text-right">{isBangla ? 'অ্যাকশন' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'].flatMap(day =>
                          (filteredRoutine?.slots ?? []).filter(sl => sl.day === day).map(sl => (
                            <tr key={sl.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-4 py-3"><span className="px-2 py-1 rounded-lg text-[10px] font-black bg-maroon-50 text-maroon-800 border border-rose-100">{sl.day}</span></td>
                              <td className="px-4 py-3 text-slate-700 whitespace-nowrap"><span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{sl.time}</span></td>
                              <td className="px-4 py-3 font-bold text-slate-900">{sl.subject}</td>
                              <td className="px-4 py-3 text-slate-600">{sl.teacher}</td>
                              <td className="px-4 py-3 text-slate-500">{sl.room}</td>
                              <td className="px-4 py-3 text-right">
                                <button type="button" onClick={() => handleDeleteRoutineSlot(filteredRoutine!.batchName, sl.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= MODAL: ADD STUDENT ================= */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isBangla ? 'নতুন শিক্ষার্থী ভর্তি' : 'Enroll New Student'}
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {isBangla ? 'শিক্ষার্থীর পূর্ণ নাম *' : 'Student Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBangla ? 'উদাঃ তানভীর হাসান' : 'e.g. Tanvir Hassan'}
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'টার্গেট শ্রেণি *' : 'Target Class *'}
                  </label>
                  <select
                    value={newStudent.currentClass}
                    onChange={e => setNewStudent({ ...newStudent, currentClass: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10 (SSC)">Class 10 (SSC)</option>
                    <option value="Class 11 (HSC 1st)">Class 11 (HSC 1st)</option>
                    <option value="Class 12 (HSC 2nd)">Class 12 (HSC 2nd)</option>
                    <option value="Medical/Varsity Admission">Medical/Varsity Admission</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'ব্যাচ নির্বাচন *' : 'Assign Batch *'}
                  </label>
                  <select
                    value={newStudent.batch}
                    onChange={e => setNewStudent({ ...newStudent, batch: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'শিক্ষার্থীর ফোন *' : 'Student Phone *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+880 17..."
                    value={newStudent.phone}
                    onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'মাসিক ফি (টাকা) *' : 'Monthly Fee (BDT) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newStudent.monthlyFee}
                    onChange={e => setNewStudent({ ...newStudent, monthlyFee: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'অভিভাবকের নাম' : 'Guardian Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={isBangla ? 'পিতা/মাতার নাম' : 'Father/Mother name'}
                    value={newStudent.guardianName}
                    onChange={e => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'অভিভাবকের ফোন' : 'Guardian Phone'}
                  </label>
                  <input
                    type="text"
                    placeholder="+880 18..."
                    value={newStudent.guardianPhone}
                    onChange={e => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold shadow-xs cursor-pointer"
                >
                  {isBangla ? 'ভর্তি সম্পন্ন করুন' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD EXAM RESULT ================= */}
      {showAddResultModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isBangla ? 'পরীক্ষার নম্বর প্রকাশ' : 'Publish Exam Score'}
              </h3>
              <button
                onClick={() => setShowAddResultModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResult} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {isBangla ? 'শিক্ষার্থী নির্বাচন করুন *' : 'Select Student *'}
                </label>
                <select
                  value={newResult.studentId}
                  onChange={e => setNewResult({ ...newResult, studentId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.studentId}>{s.name} ({s.studentId}) - {s.batch}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'পরীক্ষার নাম *' : 'Exam Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ মডেল টেস্ট ১' : 'e.g. Model Test 1'}
                    value={newResult.examName}
                    onChange={e => setNewResult({ ...newResult, examName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'বিষয় *' : 'Subject *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ পদার্থবিজ্ঞান' : 'e.g. Physics, Chemistry'}
                    value={newResult.subject}
                    onChange={e => setNewResult({ ...newResult, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'প্রাপ্ত নম্বর *' : 'Marks Obtained *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newResult.marksObtained}
                    onChange={e => setNewResult({ ...newResult, marksObtained: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'মোট নম্বর *' : 'Total Marks *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newResult.totalMarks}
                    onChange={e => setNewResult({ ...newResult, totalMarks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {isBangla ? 'শিক্ষকের মন্তব্য' : 'Teacher Remarks'}
                </label>
                <input
                  type="text"
                  placeholder={isBangla ? 'উদাঃ চমৎকার উন্নতি হয়েছে' : 'e.g. Excellent conceptual explanation'}
                  value={newResult.remarks}
                  onChange={e => setNewResult({ ...newResult, remarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddResultModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold shadow-xs cursor-pointer"
                >
                  {isBangla ? 'নম্বর প্রকাশ করুন' : 'Publish Score'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD INVOICE ================= */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isBangla ? 'টিউশন ফি ইনভয়েস তৈরি' : 'Issue Tuition Fee Invoice'}
              </h3>
              <button
                onClick={() => setShowAddInvoiceModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {isBangla ? 'শিক্ষার্থী নির্বাচন করুন *' : 'Select Student *'}
                </label>
                <select
                  value={newInvoice.studentId}
                  onChange={e => {
                    const sid = e.target.value;
                    const st = students.find(s => s.studentId === sid);
                    setNewInvoice({
                      ...newInvoice,
                      studentId: sid,
                      amount: st ? st.monthlyFee : 2500
                    });
                  }}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.studentId}>
                      {s.name} ({s.studentId}) - {isBangla ? 'ফি:' : 'Fee:'} ৳ {s.monthlyFee}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'মাসের নাম *' : 'Billing Month *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ অক্টোবর ২০২৬' : 'e.g. October 2026'}
                    value={newInvoice.month}
                    onChange={e => setNewInvoice({ ...newInvoice, month: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'পরিমাণ (টাকা) *' : 'Amount (BDT) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newInvoice.amount}
                    onChange={e => setNewInvoice({ ...newInvoice, amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {isBangla ? 'পরিশোধের শেষ তারিখ *' : 'Payment Due Date *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBangla ? 'উদাঃ ১৫ অক্টোবর, ২০২৬' : 'e.g. Oct 15, 2026'}
                  value={newInvoice.dueDate}
                  onChange={e => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold shadow-xs cursor-pointer"
                >
                  {isBangla ? 'ইনভয়েস তৈরি করুন' : 'Generate Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD FACULTY */}
      {showAddFacultyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowAddFacultyModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{isBangla ? 'নতুন শিক্ষক যোগ করুন' : 'Add New Faculty Member'}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{isBangla ? 'শিক্ষকের তথ্য পূরণ করুন' : 'Fill in the instructor details'}</p>
              </div>
              <button onClick={() => setShowAddFacultyModal(false)} className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleCreateFaculty} className="space-y-4">
              {/* Photo Upload & Preview */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-teal-600" />
                    <span>{isBangla ? 'শিক্ষকের ছবি (Photo)' : 'Faculty Photo'}</span>
                  </label>
                  {(facultyPhotoPreview || newFaculty.photo) && (
                    <button
                      type="button"
                      onClick={() => {
                        setFacultyPhotoPreview('');
                        setNewFaculty(prev => ({ ...prev, photo: '' }));
                      }}
                      className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      {isBangla ? 'ছবি মুছুন' : 'Remove Photo'}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    {(facultyPhotoPreview || newFaculty.photo) ? (
                      <img
                        src={facultyPhotoPreview || newFaculty.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setFacultyPhotoPreview('')}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-300 text-xs font-bold cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-teal-600" />
                        <span>{isBangla ? 'ডিভাইস থেকে আপলোড' : 'Upload File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFacultyPhotoUpload}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">PNG, JPG, WebP</span>
                    </div>
                    <input
                      type="url"
                      placeholder={isBangla ? 'অথবা ছবির ওয়েব লিঙ্ক (URL) পেস্ট করুন' : 'Or paste image URL (https://...)'}
                      value={newFaculty.photo}
                      onChange={e => {
                        const val = e.target.value;
                        setNewFaculty(prev => ({ ...prev, photo: val }));
                        setFacultyPhotoPreview(val);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: isBangla ? 'পুরো নাম *' : 'Full Name *', field: 'name', placeholder: 'e.g. Dr. Karim Ahmed' },
                  { label: isBangla ? 'পদবী' : 'Designation', field: 'designation', placeholder: 'e.g. Senior Lecturer' },
                  { label: isBangla ? 'বিষয় দক্ষতা' : 'Subject Expertise', field: 'subjectExpertise', placeholder: 'e.g. Physics, Math' },
                  { label: isBangla ? 'শিক্ষাগত যোগ্যতা' : 'Qualification', field: 'qualification', placeholder: 'e.g. M.Sc. BUET' },
                  { label: isBangla ? 'ফোন নম্বর' : 'Phone Number', field: 'phone', placeholder: '+880 1X00-000000' },
                  { label: isBangla ? 'ইমেইল' : 'Email', field: 'email', placeholder: 'name@pschye.edu.bd' },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={(newFaculty as any)[field]}
                      onChange={e => setNewFaculty(prev => ({ ...prev, [field]: e.target.value }))}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 font-medium"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAddFacultyModal(false)} className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer text-xs">{isBangla ? 'বাতিল' : 'Cancel'}</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-xs cursor-pointer text-xs">{isBangla ? 'শিক্ষক যোগ করুন' : 'Add Faculty Member'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: ADD NOTICE ===== */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowAddNoticeModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{isBangla ? 'নতুন নোটিশ প্রকাশ করুন' : 'Publish New Notice'}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{isBangla ? 'নোটিশটি শিক্ষার্থী পোর্টালে দৃশ্যমান হবে' : 'This notice will be visible in the Student Portal'}</p>
              </div>
              <button onClick={() => setShowAddNoticeModal(false)} className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleCreateNotice} className="space-y-4">
              {/* Destination Selector: Home Page / Student Panel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isBangla ? 'নোটিশ প্রদর্শনের স্থান (Destination) *' : 'Notice Display Location *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewNotice(prev => ({ ...prev, target: 'home' }))}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      newNotice.target === 'home'
                        ? 'bg-rose-50/80 border-maroon-700 text-maroon-900 ring-2 ring-maroon-700/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">🏠</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        newNotice.target === 'home' ? 'border-maroon-700 bg-maroon-700' : 'border-slate-300'
                      }`}>
                        {newNotice.target === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <div className="text-xs font-bold">{isBangla ? 'হোম পেইজ' : 'Home Page'}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      {isBangla ? 'মূল ওয়েবসাইটে ভিজিটরদের জন্য' : 'Public website visitors'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewNotice(prev => ({ ...prev, target: 'student' }))}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      newNotice.target === 'student'
                        ? 'bg-teal-50/80 border-teal-700 text-teal-900 ring-2 ring-teal-700/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">🎓</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        newNotice.target === 'student' ? 'border-teal-700 bg-teal-700' : 'border-slate-300'
                      }`}>
                        {newNotice.target === 'student' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <div className="text-xs font-bold">{isBangla ? 'শিক্ষার্থী প্যানেল' : 'Student Panel'}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      {isBangla ? 'স্টুডেন্ট পোর্টালে শিক্ষার্থীদের জন্য' : 'In Student Portal'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewNotice(prev => ({ ...prev, target: 'both' }))}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      newNotice.target === 'both'
                        ? 'bg-amber-50/80 border-amber-600 text-amber-950 ring-2 ring-amber-600/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">🌐</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        newNotice.target === 'both' ? 'border-amber-600 bg-amber-600' : 'border-slate-300'
                      }`}>
                        {newNotice.target === 'both' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <div className="text-xs font-bold">{isBangla ? 'উভয় স্থানে' : 'Both Places'}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      {isBangla ? 'হোম ও শিক্ষার্থী উভয় প্যানেলে' : 'Visible everywhere'}
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'নোটিশের শিরোনাম *' : 'Notice Title *'}</label>
                <input
                  type="text"
                  placeholder={isBangla ? 'নোটিশের শিরোনাম লিখুন' : 'Enter notice title...'}
                  value={newNotice.title}
                  onChange={e => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'নোটিশের বিস্তারিত *' : 'Notice Body *'}</label>
                <textarea
                  rows={4}
                  placeholder={isBangla ? 'নোটিশের সম্পূর্ণ বিবরণ লিখুন...' : 'Enter full notice details...'}
                  value={newNotice.body}
                  onChange={e => setNewNotice(prev => ({ ...prev, body: e.target.value }))}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'বিভাগ' : 'Category'}</label>
                  <select
                    value={newNotice.category}
                    onChange={e => setNewNotice(prev => ({ ...prev, category: e.target.value as NoticeCategory }))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                  >
                    {(['Academic','Exam','Holiday','Fee','General'] as NoticeCategory[]).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'অগ্রাধিকার' : 'Priority'}</label>
                  <select
                    value={newNotice.priority}
                    onChange={e => setNewNotice(prev => ({ ...prev, priority: e.target.value as NoticePriority }))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Normal">{isBangla ? 'সাধারণ' : 'Normal'}</option>
                    <option value="Urgent">{isBangla ? 'জরুরি' : 'Urgent'}</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAddNoticeModal(false)} className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer text-xs">{isBangla ? 'বাতিল' : 'Cancel'}</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs cursor-pointer text-xs">{isBangla ? 'নোটিশ প্রকাশ করুন' : 'Publish Notice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: ADD ROUTINE SLOT ===== */}
      {showAddRoutineModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowAddRoutineModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{isBangla ? 'ক্লাস স্লট যোগ করুন' : 'Add Class Slot to Routine'}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{isBangla ? 'ব্যাচ, দিন, সময় ও বিষয় নির্ধারণ করুন' : 'Set batch, day, time and subject details'}</p>
              </div>
              <button onClick={() => setShowAddRoutineModal(false)} className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <form onSubmit={handleCreateRoutineSlot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'ব্যাচ নির্বাচন *' : 'Select Batch *'}</label>
                <select
                  value={newSlot.batchName}
                  onChange={e => setNewSlot(prev => ({ ...prev, batchName: e.target.value }))}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 font-medium"
                >
                  {batches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'বার *' : 'Day *'}</label>
                  <select
                    value={newSlot.day}
                    onChange={e => setNewSlot(prev => ({ ...prev, day: e.target.value as WeekDay }))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 font-medium"
                  >
                    {(['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'] as WeekDay[]).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'সময় *' : 'Time *'}</label>
                  <input
                    type="text"
                    placeholder="e.g. 8:00 AM – 10:00 AM"
                    value={newSlot.time}
                    onChange={e => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-medium"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'বিষয় *' : 'Subject *'}</label>
                <input
                  type="text"
                  placeholder={isBangla ? 'বিষয়ের নাম লিখুন' : 'e.g. Physics, Chemistry...'}
                  value={newSlot.subject}
                  onChange={e => setNewSlot(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-medium"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'শিক্ষক' : 'Teacher'}</label>
                  <input
                    type="text"
                    placeholder={isBangla ? 'শিক্ষকের নাম' : 'Teacher name'}
                    value={newSlot.teacher}
                    onChange={e => setNewSlot(prev => ({ ...prev, teacher: e.target.value }))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{isBangla ? 'কক্ষ নম্বর' : 'Room'}</label>
                  <input
                    type="text"
                    placeholder="e.g. Hall A"
                    value={newSlot.room}
                    onChange={e => setNewSlot(prev => ({ ...prev, room: e.target.value }))}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 font-medium"
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAddRoutineModal(false)} className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer text-xs">{isBangla ? 'বাতিল' : 'Cancel'}</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold shadow-xs cursor-pointer text-xs">{isBangla ? 'রুটিনে যোগ করুন' : 'Add to Routine'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
