import React, { useState, useEffect, useMemo } from 'react';
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
  initialAdminClassRoutines,
  AdminStudent,
  AdminExamResult,
  AdminInvoice,
  AdmissionApplication,
  BatchInfo,
  AdminFaculty,
  AdminNotice,
  AdminRoutine,
  AdminClassRoutine,
  createClassRoutineSvg,
  normalizeClass,
  isClassMatching,
  NoticeCategory,
  NoticePriority,
  NoticeTarget,
  WeekDay,
} from '../data/adminData';
import { StudentResult } from '../types';
import { resultsData } from '../data/results';
import {
  LayoutDashboard,
  Users,
  Award,
  Trophy,
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
  FileText,
  Eye,
  ZoomIn,
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

  // Public Results & Success Showcase (directly feeds /results page and Homepage)
  const [publicResults, setPublicResults] = useState<StudentResult[]>(() => {
    try {
      const saved = localStorage.getItem('psyche_public_results');
      return saved ? JSON.parse(saved) : resultsData;
    } catch {
      return resultsData;
    }
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
    if (!saved) return initialAdminBatches;
    try {
      const parsed: BatchInfo[] = JSON.parse(saved);
      return parsed.map(b => {
        const match = initialAdminBatches.find(init => init.id === b.id || init.code === b.code);
        return {
          ...match,
          ...b,
          photo: b.photo || match?.photo || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
          monthlyFee: b.monthlyFee || match?.monthlyFee || 2500,
          shortDescription: b.shortDescription || match?.shortDescription || '',
          features: b.features || match?.features,
          status: b.status || match?.status || 'Admissions Open',
        };
      });
    } catch {
      return initialAdminBatches;
    }
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

  const [classRoutines, setClassRoutines] = useState<AdminClassRoutine[]>(() => {
    try {
      const saved = localStorage.getItem('pschye_class_routines');
      if (saved) {
        const parsed: AdminClassRoutine[] = JSON.parse(saved);
        return parsed.map(r => {
          if (r.fileUrl && (r.fileUrl.startsWith('data:image/svg+xml;utf8,') || r.fileUrl.startsWith('data:image/svg+xml;charset=utf-8,') || (r.fileUrl.startsWith('data:image/svg+xml') && !r.fileUrl.includes(';base64,')))) {
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

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'results' | 'fees' | 'admissions' | 'batches' | 'faculty' | 'notices' | 'routine' | 'publish-result'>('overview');

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
    localStorage.setItem('psyche_public_results', JSON.stringify(publicResults));
    window.dispatchEvent(new Event('resultsUpdate'));
  }, [publicResults]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('pschye_admin_batches', JSON.stringify(batches));
    window.dispatchEvent(new Event('batchesUpdate'));
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

  useEffect(() => {
    localStorage.setItem('pschye_class_routines', JSON.stringify(classRoutines));
    window.dispatchEvent(new Event('classRoutinesUpdate'));
  }, [classRoutines]);

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
      identifier: 'admin@psyche.edu.bd',
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

  // ================= EXCEL-STYLE BULK SCORE ENTRY (IMAGE 2) =================
  const [showAddResultModal, setShowAddResultModal] = useState(false);
  const [bulkClass, setBulkClass] = useState<string>('All');
  const [bulkExam, setBulkExam] = useState<string>('Final Exam 2026');
  const [bulkSubject, setBulkSubject] = useState<string>('Physics');
  const [bulkTotalMarks, setBulkTotalMarks] = useState<number>(100);
  const [bulkScores, setBulkScores] = useState<{ [studentId: string]: string | number }>({});
  const [bulkRemarks, setBulkRemarks] = useState<{ [studentId: string]: string }>({});

  // Sync existing scores whenever modal opens or exam/subject changes
  useEffect(() => {
    if (!showAddResultModal) return;
    const scoresMap: { [studentId: string]: string | number } = {};
    const remarksMap: { [studentId: string]: string } = {};

    results.forEach(r => {
      if (r.examName === bulkExam && r.subject === bulkSubject) {
        scoresMap[r.studentId] = r.marksObtained;
        if (r.remarks) remarksMap[r.studentId] = r.remarks;
      }
    });

    setBulkScores(scoresMap);
    setBulkRemarks(remarksMap);
  }, [showAddResultModal, bulkExam, bulkSubject, results]);

  // Extract all distinct class options
  const classOptions = useMemo(() => {
    const list = new Set<string>();
    list.add('All');
    list.add('Class 10A');
    list.add('Class 10 (SSC)');
    list.add('Class 9 (Science)');
    list.add('Class 9 (Commerce)');
    list.add('Class 10 (Science)');
    list.add('Class 10 (Commerce)');
    list.add('SSC Special Batch');
    list.add('HSC (Science)');
    list.add('HSC (Commerce)');
    list.add('Class 8');

    students.forEach(s => {
      if (s.currentClass) list.add(s.currentClass);
    });
    batches.forEach(b => {
      if (b.targetClass) list.add(b.targetClass);
    });

    return Array.from(list);
  }, [students, batches]);

  // Filter students based on selected class
  const filteredBulkStudents = useMemo(() => {
    if (bulkClass === 'All' || bulkClass === 'All Classes') {
      return students;
    }
    const target = bulkClass.toLowerCase();
    const matched = students.filter(s => {
      const sClass = (s.currentClass || '').toLowerCase();
      const sBatch = (s.batch || '').toLowerCase();
      if (sClass === target || sBatch === target) return true;
      if (target.includes('10a') && (sClass.includes('10') || sClass.includes('ssc') || sBatch.includes('10') || sBatch.includes('ssc'))) return true;
      if (target.includes('10') && (sClass.includes('10') || sClass.includes('ssc') || sBatch.includes('10') || sBatch.includes('ssc'))) return true;
      if (target.includes('9') && (sClass.includes('9') || sBatch.includes('9'))) return true;
      if (target.includes('8') && (sClass.includes('8') || sBatch.includes('8'))) return true;
      if (target.includes('hsc') && (sClass.includes('hsc') || sBatch.includes('hsc'))) return true;
      return sClass.includes(target) || sBatch.includes(target);
    });

    return matched.length > 0 ? matched : students;
  }, [students, bulkClass]);

  // Handle score change with total marks boundary validation
  const handleScoreChange = (studentId: string, valStr: string) => {
    if (valStr === '') {
      setBulkScores(prev => {
        const next = { ...prev };
        delete next[studentId];
        return next;
      });
      return;
    }
    const val = Number(valStr);
    if (isNaN(val) || val < 0) return;
    if (val > bulkTotalMarks) {
      setBulkScores(prev => ({ ...prev, [studentId]: bulkTotalMarks }));
      showToast(isBangla ? `প্রাপ্ত নম্বর মোট নম্বর (${bulkTotalMarks})-এর বেশি হতে পারবে না` : `Score cannot exceed Total Marks (${bulkTotalMarks})`);
      return;
    }
    setBulkScores(prev => ({ ...prev, [studentId]: val }));
  };

  // Keyboard navigation: Enter / ArrowDown jumps to next student; ArrowUp jumps to previous
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextInput = document.getElementById(`bulk-score-input-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevInput = document.getElementById(`bulk-score-input-${index - 1}`) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
        prevInput.select();
      }
    }
  };

  // Bulk Save / Publish handler
  const handleBulkSaveScores = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const entries = Object.entries(bulkScores).filter(([_, val]) => val !== '' && val !== undefined);
    if (entries.length === 0) {
      alert(isBangla ? 'অনুগ্রহ করে অন্তত একজন শিক্ষার্থীর নম্বর প্রদান করুন।' : 'Please enter scores for at least one student.');
      return;
    }

    // Validate max marks
    for (const [sId, val] of entries) {
      if (Number(val) > bulkTotalMarks) {
        alert(isBangla ? `শিক্ষার্থী ID ${sId}-এর নম্বর মোট নম্বর (${bulkTotalMarks})-এর চেয়ে বেশি হতে পারবে না।` : `Score for Student ID ${sId} cannot exceed Total Marks (${bulkTotalMarks}).`);
        return;
      }
    }

    const updatedResults = [...results];
    let createdCount = 0;
    let updatedCount = 0;

    entries.forEach(([studentId, marksVal]) => {
      const marks = Number(marksVal);
      const student = students.find(s => s.studentId === studentId);
      const percentage = (marks / bulkTotalMarks) * 100;
      
      let grade = 'F';
      let gpa = 0.0;
      if (percentage >= 80) { grade = 'A+'; gpa = 5.0; }
      else if (percentage >= 70) { grade = 'A'; gpa = 4.0; }
      else if (percentage >= 60) { grade = 'A-'; gpa = 3.5; }
      else if (percentage >= 50) { grade = 'B'; gpa = 3.0; }
      else if (percentage >= 40) { grade = 'C'; gpa = 2.0; }
      else if (percentage >= 33) { grade = 'D'; gpa = 1.0; }

      const existingIdx = updatedResults.findIndex(
        r => r.studentId === studentId && r.examName === bulkExam && r.subject === bulkSubject
      );

      const remarks = bulkRemarks[studentId] || (percentage >= 80 ? 'Outstanding analytical performance' : percentage >= 60 ? 'Satisfactory, keep improving' : 'Needs additional care and practice');

      if (existingIdx >= 0) {
        updatedResults[existingIdx] = {
          ...updatedResults[existingIdx],
          marksObtained: marks,
          totalMarks: bulkTotalMarks,
          gpa,
          grade,
          remarks,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        updatedCount++;
      } else {
        const newRecord: AdminExamResult = {
          id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          studentId,
          studentName: student?.name || 'Student',
          batch: student?.batch || student?.currentClass || 'General Batch',
          examName: bulkExam,
          subject: bulkSubject,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          marksObtained: marks,
          totalMarks: bulkTotalMarks,
          gpa,
          grade,
          remarks
        };
        updatedResults.unshift(newRecord);
        createdCount++;
      }
    });

    setResults(updatedResults);
    localStorage.setItem('pschye_admin_results', JSON.stringify(updatedResults));
    window.dispatchEvent(new Event('adminResultsUpdate'));
    window.dispatchEvent(new Event('resultsUpdate'));

    setShowAddResultModal(false);
    showToast(isBangla
      ? `সফলভাবে ${createdCount + updatedCount} জন শিক্ষার্থীর ${bulkSubject} (${bulkExam}) নম্বর প্রকাশ করা হয়েছে!`
      : `Successfully published scores for ${createdCount + updatedCount} students in ${bulkSubject} (${bulkExam})!`
    );
  };

  // ================= PUBLIC RESULTS & SUCCESS SHOWCASE (FOR /results PAGE) =================
  const [resultsSubTab, setResultsSubTab] = useState<'public' | 'internal'>('public');
  const [publicResultSearch, setPublicResultSearch] = useState('');
  const [publicResultYearFilter, setPublicResultYearFilter] = useState('All');
  const [publicResultExamTypeFilter, setPublicResultExamTypeFilter] = useState('All');
  const [showAddPublicResultModal, setShowAddPublicResultModal] = useState(false);
  const [publicResultPhotoPreview, setPublicResultPhotoPreview] = useState('');
  const [newPublicResult, setNewPublicResult] = useState<Omit<StudentResult, 'id'>>({
    studentName: '',
    studentClass: 'HSC Examination',
    gpa: 'GPA 5.00 (Golden)',
    marks: '1180 / 1200',
    year: 2026,
    position: '',
    institution: '',
    examType: 'HSC Science',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
    testimonial: ''
  });

  const handlePublicResultPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(isBangla ? 'ছবির আকার সর্বোচ্চ ২ মেগাবাইট হতে হবে' : 'Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        const base64 = ev.target?.result as string;
        setNewPublicResult(prev => ({ ...prev, photo: base64 }));
        setPublicResultPhotoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePublicResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPublicResult.studentName.trim() || !newPublicResult.position.trim()) {
      alert(isBangla ? 'শিক্ষার্থীর নাম এবং অর্জিত স্থান/মেধাক্রম প্রদান করুন।' : 'Please provide student name and merit position.');
      return;
    }
    const created: StudentResult = {
      ...newPublicResult,
      id: `res-${Date.now()}`,
      studentName: newPublicResult.studentName.trim(),
      position: newPublicResult.position.trim(),
      institution: newPublicResult.institution.trim() || 'Psyche Academic Care',
      photo: newPublicResult.photo || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
      year: Number(newPublicResult.year) || 2026
    };
    setPublicResults(prev => [created, ...prev]);
    setShowAddPublicResultModal(false);
    setNewPublicResult({
      studentName: '',
      studentClass: 'HSC Examination',
      gpa: 'GPA 5.00 (Golden)',
      marks: '1180 / 1200',
      year: 2026,
      position: '',
      institution: '',
      examType: 'HSC Science',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
      testimonial: ''
    });
    setPublicResultPhotoPreview('');
    showToast(isBangla ? 'কৃতী শিক্ষার্থীর ফলাফল সফলভাবে ওয়েবসাইটে প্রকাশিত হয়েছে!' : 'Student result published to website!');
  };

  const handleDeletePublicResult = (id: string) => {
    if (window.confirm(isBangla ? 'আপনি কি নিশ্চিত যে এই ফলাফলটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this result?')) {
      setPublicResults(prev => prev.filter(r => r.id !== id));
      showToast(isBangla ? 'ফলাফল সফলভাবে মুছে ফেলা হয়েছে।' : 'Result removed successfully.');
    }
  };

  const publicResultYears = Array.from(new Set(publicResults.map(r => r.year.toString()))).sort((a, b) => Number(b) - Number(a));

  const filteredPublicResults = publicResults.filter(r => {
    const matchesSearch = 
      r.studentName.toLowerCase().includes(publicResultSearch.toLowerCase()) ||
      r.institution.toLowerCase().includes(publicResultSearch.toLowerCase()) ||
      r.position.toLowerCase().includes(publicResultSearch.toLowerCase()) ||
      r.studentClass.toLowerCase().includes(publicResultSearch.toLowerCase());
    const matchesYear = publicResultYearFilter === 'All' || r.year.toString() === publicResultYearFilter;
    const matchesType = publicResultExamTypeFilter === 'All' || r.examType === publicResultExamTypeFilter;
    return matchesSearch && matchesYear && matchesType;
  });

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

  // ─── BATCH HANDLERS ─────────────────────────────────────────────────────────
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<BatchInfo | null>(null);
  const [newBatch, setNewBatch] = useState({
    name: '',
    code: '',
    targetClass: 'Class 9 (Science)',
    schedule: 'Sat, Mon, Wed (8:00 AM - 10:30 AM)',
    photo: '',
    monthlyFee: 2500,
    shortDescription: '',
    features: '',
    status: 'Admissions Open' as 'Admissions Open' | 'Ongoing' | 'Full' | 'Upcoming',
  });
  const [batchPhotoPreview, setBatchPhotoPreview] = useState<string>('');

  const handleBatchPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast(isBangla ? 'ছবির আকার সর্বোচ্চ ৩ মেগাবাইট হতে হবে' : 'Image size must be under 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBatchPhotoPreview(result);
        setNewBatch(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAddBatch = () => {
    setEditingBatch(null);
    setNewBatch({
      name: '',
      code: `PAC-B${batches.length + 1}`,
      targetClass: 'Class 9 (Science)',
      schedule: 'Sat, Mon, Wed (8:00 AM - 10:30 AM)',
      photo: '',
      monthlyFee: 2500,
      shortDescription: '',
      features: '',
      status: 'Admissions Open',
    });
    setBatchPhotoPreview('');
    setShowAddBatchModal(true);
  };

  const handleOpenEditBatch = (b: BatchInfo) => {
    setEditingBatch(b);
    setNewBatch({
      name: b.name,
      code: b.code,
      targetClass: b.targetClass,
      schedule: b.schedule || '',
      photo: b.photo || '',
      monthlyFee: b.monthlyFee || 2500,
      shortDescription: b.shortDescription || '',
      features: b.features ? b.features.join(', ') : '',
      status: b.status || 'Admissions Open',
    });
    setBatchPhotoPreview(b.photo || '');
    setShowAddBatchModal(true);
  };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatch.name.trim()) return;

    const parsedFeatures = newBatch.features
      ? newBatch.features.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    const finalPhoto = (newBatch.photo || batchPhotoPreview).trim() ||
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';

    if (editingBatch) {
      setBatches(prev => prev.map(b => b.id === editingBatch.id ? {
        ...b,
        name: newBatch.name.trim(),
        code: newBatch.code.trim() || b.code,
        targetClass: newBatch.targetClass,
        schedule: newBatch.schedule.trim() || b.schedule,
        photo: finalPhoto,
        monthlyFee: Number(newBatch.monthlyFee) || 2500,
        shortDescription: newBatch.shortDescription.trim(),
        features: parsedFeatures.length > 0 ? parsedFeatures : undefined,
        status: newBatch.status,
      } : b));
      showToast(isBangla ? 'ব্যাচের তথ্য সফলভাবে আপডেট হয়েছে!' : 'Batch updated successfully!');
    } else {
      const createdBatch: BatchInfo = {
        id: `batch-${Date.now()}`,
        name: newBatch.name.trim(),
        code: newBatch.code.trim() || `PAC-B${Date.now().toString().slice(-4)}`,
        targetClass: newBatch.targetClass,
        schedule: newBatch.schedule.trim() || 'Schedule TBA',
        photo: finalPhoto,
        monthlyFee: Number(newBatch.monthlyFee) || 2500,
        shortDescription: newBatch.shortDescription.trim(),
        features: parsedFeatures.length > 0 ? parsedFeatures : undefined,
        status: newBatch.status,
      };
      setBatches(prev => [createdBatch, ...prev]);
      showToast(isBangla ? 'নতুন ব্যাচ সফলভাবে যোগ করা হয়েছে!' : 'New batch added successfully!');
    }
    setShowAddBatchModal(false);
  };

  const handleDeleteBatch = (id: string, name: string) => {
    if (confirm(isBangla ? `আপনি কি "${name}" ব্যাচটি মুছে ফেলতে চান?` : `Delete batch "${name}"?`)) {
      setBatches(prev => prev.filter(b => b.id !== id));
      showToast(isBangla ? 'ব্যাচ মুছে ফেলা হয়েছে।' : 'Batch removed successfully.');
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

  // ─── CLASS ROUTINE (IMAGE / PDF) STATE & HANDLERS ─────────────────────────
  const [routineViewMode, setRoutineViewMode] = useState<'files' | 'slots'>('files');
  const [routineClassFilter, setRoutineClassFilter] = useState<string>('All');
  const [routineFileTypeFilter, setRoutineFileTypeFilter] = useState<'All' | 'image' | 'pdf'>('All');
  const [showUploadRoutineModal, setShowUploadRoutineModal] = useState(false);
  const [previewRoutineModal, setPreviewRoutineModal] = useState<AdminClassRoutine | null>(null);

  const [uploadRoutineForm, setUploadRoutineForm] = useState({
    title: '',
    targetClass: 'Class 8',
    fileType: 'image' as 'image' | 'pdf',
    fileName: '',
    fileSize: '',
    fileUrl: '',
    effectiveDate: '',
    notes: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const detectedType: 'image' | 'pdf' = isPdf ? 'pdf' : 'image';
    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadRoutineForm(prev => ({
        ...prev,
        fileType: detectedType,
        fileName: file.name,
        fileSize: sizeStr,
        fileUrl: result,
        title: prev.title || `${prev.targetClass} Routine (${file.name.replace(/\.[^/.]+$/, '')})`,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateSampleRoutine = () => {
    const cls = uploadRoutineForm.targetClass || 'Class 8';
    const sampleSvg = createClassRoutineSvg(cls, `${cls} OFFICIAL ACADEMIC ROUTINE 2026`);
    setUploadRoutineForm(prev => ({
      ...prev,
      fileName: `${cls.replace(/\s+/g, '-')}-Official-Routine.png`,
      fileSize: '450 KB',
      fileUrl: sampleSvg,
      title: prev.title || `${cls} Official Academic Schedule 2026`,
    }));
  };

  const handleSaveClassRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadRoutineForm.title.trim()) {
      showToast(isBangla ? 'অনুগ্রহ করে রুটিনের শিরোনাম লিখুন।' : 'Please enter a routine title.');
      return;
    }

    const fileUrl = uploadRoutineForm.fileUrl || createClassRoutineSvg(uploadRoutineForm.targetClass, uploadRoutineForm.title);
    const fileName = uploadRoutineForm.fileName || `${uploadRoutineForm.targetClass}-Routine.${uploadRoutineForm.fileType === 'pdf' ? 'pdf' : 'png'}`;
    const fileSize = uploadRoutineForm.fileSize || (uploadRoutineForm.fileType === 'pdf' ? '1.1 MB' : '450 KB');

    const newRoutine: AdminClassRoutine = {
      id: `rtn-${Date.now()}`,
      title: uploadRoutineForm.title.trim(),
      targetClass: uploadRoutineForm.targetClass,
      fileType: uploadRoutineForm.fileType,
      fileUrl,
      fileName,
      fileSize,
      effectiveDate: uploadRoutineForm.effectiveDate || 'Immediate',
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      notes: uploadRoutineForm.notes.trim(),
    };

    setClassRoutines(prev => [newRoutine, ...prev]);
    setShowUploadRoutineModal(false);
    setUploadRoutineForm({
      title: '',
      targetClass: 'Class 8',
      fileType: 'image',
      fileName: '',
      fileSize: '',
      fileUrl: '',
      effectiveDate: '',
      notes: '',
    });
    showToast(isBangla ? `${newRoutine.targetClass}-এর রুটিন সফলভাবে আপলোড হয়েছে!` : `Routine for ${newRoutine.targetClass} uploaded successfully!`);
  };

  const handleDeleteClassRoutine = (id: string, title: string) => {
    setClassRoutines(prev => prev.filter(r => r.id !== id));
    showToast(isBangla ? 'রুটিন মুছে ফেলা হয়েছে।' : `Routine "${title}" deleted.`);
  };

  const filteredClassRoutines = classRoutines.filter(r => {
    const matchesClass = routineClassFilter === 'All' || isClassMatching(routineClassFilter, r.targetClass);
    const matchesType = routineFileTypeFilter === 'All' || r.fileType === routineFileTypeFilter;
    return matchesClass && matchesType;
  });

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
        <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs flex flex-wrap items-center gap-1.5">
          {[
            { id: 'overview', name: isBangla ? 'ড্যাশবোর্ড' : 'Dashboard', icon: LayoutDashboard },
            { id: 'students', name: isBangla ? 'শিক্ষার্থী' : 'Students', icon: Users, count: totalStudents },
            { id: 'results', name: isBangla ? 'ফলাফল ও সাফল্য' : 'Results & Success', icon: Trophy, count: publicResults.length + results.length },
            { id: 'fees', name: isBangla ? 'ফি ও হিসাব' : 'Fees', icon: CreditCard },
            { id: 'admissions', name: isBangla ? 'ভর্তি আবেদন' : 'Admissions', icon: UserCheck, count: pendingApps, badgeColor: 'bg-rose-700 text-white' },
            { id: 'batches', name: isBangla ? 'ব্যাচ' : 'Batches', icon: Calendar, count: batches.length },
            { id: 'faculty', name: isBangla ? 'শিক্ষকমণ্ডলী' : 'Faculty', icon: BookUser, count: faculty.length },
            { id: 'notices', name: isBangla ? 'নোটিশ বোর্ড' : 'Notice Board', icon: Bell, count: notices.length },
            { id: 'routine', name: isBangla ? 'ক্লাস রুটিন' : 'Routine', icon: CalendarDays },
            { id: 'publish-result', name: isBangla ? 'ফলাফল প্রকাশ' : 'Publish Result', icon: Plus },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                    const enrolled = b.enrolledCount || 0;
                    const cap = b.capacity || 1;
                    const pct = Math.round((enrolled / cap) * 100);
                    return (
                      <div key={b.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-800 truncate">{b.name}</span>
                          <span className="text-slate-500">
                            {enrolled}/{b.capacity || 0} {isBangla ? 'আসন' : 'seats'} ({pct}%)
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

        {/* TAB 3: RESULTS & SUCCESS */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            {/* View Switcher: Public Results & Success (কৃতী শিক্ষার্থী) vs Internal Exam Marks */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setResultsSubTab('public')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    resultsSubTab === 'public'
                      ? 'bg-maroon-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Trophy className={`w-4 h-4 ${resultsSubTab === 'public' ? 'text-amber-300' : 'text-amber-500'}`} />
                  <span>{isBangla ? 'পাবলিক কৃতী শিক্ষার্থী (Results & Success Showcase)' : 'Public Results & Success Showcase'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${resultsSubTab === 'public' ? 'bg-maroon-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {publicResults.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setResultsSubTab('internal')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    resultsSubTab === 'internal'
                      ? 'bg-maroon-800 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{isBangla ? 'অভ্যন্তরীণ মডেল টেস্ট নম্বর (Student Scorecards)' : 'Internal Model Test Scorecards'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${resultsSubTab === 'internal' ? 'bg-maroon-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {results.length}
                  </span>
                </button>
              </div>

              {resultsSubTab === 'public' && (
                <Link
                  to="/results"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-maroon-800 hover:border-maroon-300 text-xs font-bold transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-maroon-600" />
                  <span>{isBangla ? 'পাবলিক Results পেজ দেখুন' : 'View Public Results Page'}</span>
                </Link>
              )}
            </div>

            {/* SUB-VIEW 1: PUBLIC RESULTS & SUCCESS SHOWCASE */}
            {resultsSubTab === 'public' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span>{isBangla ? 'কৃতী শিক্ষার্থী ও পাবলিক ফলাফল ব্যবস্থাপনা' : 'Public Results & Success Stories'}</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isBangla
                        ? 'ওয়েবসাইটের "Results & Success" পৃষ্ঠায় প্রদর্শিত শিক্ষার্থীদের বোর্ড মেধা তালিকা ও বিশ্ববিদ্যালয় ভর্তি রেকর্ড'
                        : 'Manage board toppers, entrance placements, and success records shown on the public "Results & Success" page'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddPublicResultModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBangla ? 'নতুন কৃতী শিক্ষার্থী যোগ করুন' : 'Add Success Result'}</span>
                  </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50/60 p-3 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {/* Year Filter */}
                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setPublicResultYearFilter('All')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          publicResultYearFilter === 'All' ? 'bg-maroon-800 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {isBangla ? 'সব বছর' : 'All Years'}
                      </button>
                      {publicResultYears.map(yr => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setPublicResultYearFilter(yr)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                            publicResultYearFilter === yr ? 'bg-maroon-800 text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>

                    {/* Exam Type Selector */}
                    <select
                      value={publicResultExamTypeFilter}
                      onChange={e => setPublicResultExamTypeFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-100"
                    >
                      <option value="All">{isBangla ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
                      <option value="SSC Science">SSC Science</option>
                      <option value="HSC Science">HSC Science</option>
                      <option value="HSC Commerce">HSC Commerce</option>
                      <option value="Medical Entrance">Medical Entrance</option>
                      <option value="Engineering Entrance">Engineering Entrance</option>
                    </select>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full md:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={isBangla ? 'নাম, প্রতিষ্ঠান বা অবস্থান খুঁজুন...' : 'Search student or college...'}
                      value={publicResultSearch}
                      onChange={e => setPublicResultSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-maroon-100"
                    />
                  </div>
                </div>

                {/* Table of Public Results */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">{isBangla ? 'শিক্ষার্থী' : 'Student'}</th>
                        <th className="px-4 py-3">{isBangla ? 'অর্জিত স্থান / সাফল্য' : 'Merit / Position'}</th>
                        <th className="px-4 py-3">{isBangla ? 'প্রতিষ্ঠান' : 'Institution'}</th>
                        <th className="px-4 py-3">{isBangla ? 'জিপিএ ও নম্বর' : 'GPA & Marks'}</th>
                        <th className="px-4 py-3">{isBangla ? 'ক্যাটাগরি ও বছর' : 'Exam & Year'}</th>
                        <th className="px-4 py-3">{isBangla ? 'প্রতিক্রিয়া' : 'Testimonial'}</th>
                        <th className="px-4 py-3 text-right">{isBangla ? 'অ্যাকশন' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredPublicResults.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                            {isBangla ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results matching criteria'}
                          </td>
                        </tr>
                      ) : (
                        filteredPublicResults.map(res => (
                          <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={res.photo}
                                  alt={res.studentName}
                                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-slate-900">{res.studentName}</div>
                                  <div className="text-[11px] text-slate-500">{res.studentClass}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 font-bold text-maroon-800 bg-maroon-50 border border-maroon-200 px-2 py-0.5 rounded-md text-[11px]">
                                <Trophy className="w-3 h-3 text-amber-500" />
                                <span>{res.position}</span>
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-700 font-semibold">{res.institution}</td>
                            <td className="px-4 py-3">
                              <div className="font-bold text-slate-900">{res.gpa}</div>
                              <div className="text-[11px] text-slate-500">{res.marks}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-semibold text-slate-800">{res.examType}</span>
                              <div className="text-[11px] text-slate-500">{res.year}</div>
                            </td>
                            <td className="px-4 py-3 text-slate-500 max-w-xs truncate italic">
                              {res.testimonial ? `"${res.testimonial}"` : '—'}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeletePublicResult(res.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title={isBangla ? 'মুছে ফেলুন' : 'Delete'}
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

            {/* SUB-VIEW 2: INTERNAL STUDENT MODEL TEST SCORECARDS */}
            {resultsSubTab === 'internal' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {isBangla ? 'অভ্যন্তরীণ পরীক্ষার নম্বর ও গ্রেডিং' : 'Internal Exam Results & Marks'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isBangla ? 'শিক্ষার্থীদের মডেল টেস্ট, CQ/MCQ মূল্যায়ন এবং রিপোর্ট কার্ড সংরক্ষণ' : 'Record internal tests and student scorecard progress'}
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
                      <span className="text-slate-400 block font-semibold">{isBangla ? 'প্রতিষ্ঠান ও রোল:' : 'School & Roll:'}</span>
                      <strong className="text-slate-800">
                        {app.previousSchool || (isBangla ? 'উল্লেখ নেই' : 'Not Specified')}
                        {app.schoolRoll ? ` (${isBangla ? 'রোল:' : 'Roll:'} ${app.schoolRoll})` : ''}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">{isBangla ? 'অভিভাবক ও যোগাযোগ:' : 'Guardian & Contact:'}</span>
                      <strong className="text-slate-800">
                        {app.fatherName} ({app.phone})
                        {app.whatsappName ? ` • WA: ${app.whatsappName}` : ''}
                      </strong>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isBangla ? 'কোচিং ব্যাচ ও ক্লাসরুম' : 'Coaching Batches & Classrooms'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'ক্লাসের সময়সূচী, শিক্ষক, মাসিক ফি এবং আসন প্রাপ্যতা পরিচালনা' : 'Manage class timings, instructors, fees, and seat availability'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddBatch}
                className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isBangla ? 'নতুন ব্যাচ যোগ করুন' : 'Add New Batch'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {batches.map(b => (
                <div key={b.id} className="rounded-2xl border border-slate-200 bg-white hover:border-maroon-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
                  {/* Photo & Status Header */}
                  <div className="relative h-44 bg-slate-100 overflow-hidden group">
                    <img
                      src={b.photo || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-black/20" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-white/95 text-maroon-900 shadow-xs border border-white/40">
                        {b.code}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Full' 
                          ? 'bg-rose-600 text-white' 
                          : b.status === 'Upcoming'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {b.status || 'Admissions Open'}
                      </span>
                    </div>
                    {b.monthlyFee && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-maroon-900/90 backdrop-blur-xs text-white text-xs font-black shadow-xs">
                        ৳{b.monthlyFee.toLocaleString()}/{isBangla ? 'মাস' : 'mo'}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-semibold text-rose-200 block uppercase tracking-wider">{b.targetClass}</span>
                      <h3 className="text-sm font-black text-white line-clamp-1 drop-shadow-xs">{b.name}</h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    {b.shortDescription && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {b.shortDescription}
                      </p>
                    )}

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {b.schedule && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                          <span className="truncate"><strong>{isBangla ? 'সময়সূচী:' : 'Schedule:'}</strong> {b.schedule}</span>
                        </div>
                      )}
                      {b.instructor && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                          <span className="truncate"><strong>{isBangla ? 'শিক্ষক:' : 'Instructor:'}</strong> {b.instructor}</span>
                        </div>
                      )}
                      {b.room && (
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-maroon-700 shrink-0" />
                          <span className="truncate"><strong>{isBangla ? 'রুম নং:' : 'Room:'}</strong> {b.room}</span>
                        </div>
                      )}
                    </div>

                    {/* Capacity Progress Bar (if capacity is defined) */}
                    {b.capacity && b.capacity > 0 ? (
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>{isBangla ? 'আসন পূরণ:' : 'Seat Occupancy:'}</span>
                          <span className={(b.enrolledCount || 0) >= b.capacity ? 'text-rose-600' : 'text-slate-800'}>
                            {b.enrolledCount || 0} / {b.capacity} ({Math.round(((b.enrolledCount || 0) / b.capacity) * 100)}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              (b.enrolledCount || 0) >= b.capacity ? 'bg-rose-500' : 'bg-maroon-800'
                            }`}
                            style={{ width: `${Math.min(100, Math.round(((b.enrolledCount || 0) / b.capacity) * 100))}%` }}
                          />
                        </div>
                      </div>
                    ) : null}

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {isBangla ? 'আইডি:' : 'ID:'} {b.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditBatch(b)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 hover:text-maroon-800 hover:bg-maroon-50 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>{isBangla ? 'এডিট' : 'Edit'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBatch(b.id, b.name)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title={isBangla ? 'মুছে ফেলুন' : 'Delete Batch'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
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
            {/* Top Overview & Action Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-50 border border-maroon-200 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{isBangla ? 'শ্রেণীভিত্তিক ক্লাস রুটিন ব্যবস্থাপনা' : 'Class-Targeted Routine Hub'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isBangla ? 'ক্লাস রুটিন (Image / PDF)' : 'Class Routine Management'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                    {isBangla 
                      ? 'এখানে আপলোড করা ইমেজ বা পিডিএফ রুটিন শুধুমাত্র নির্দিষ্ট ক্লাসের শিক্ষার্থীদের পোর্টালে যাবে (যেমন: Class 8-এর রুটিন শুধু Class 8 এর স্টুডেন্টরা দেখতে ও ডাউনলোড করতে পারবে)।'
                      : 'Upload image or PDF routines targeted per class — only enrolled students of that specific class (e.g. Class 8) will see and download them.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setRoutineViewMode('files')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        routineViewMode === 'files' ? 'bg-white shadow-xs text-maroon-800' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isBangla ? 'রুটিন ফাইল (Image/PDF)' : 'Routine Files (Image/PDF)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoutineViewMode('slots')}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        routineViewMode === 'slots' ? 'bg-white shadow-xs text-maroon-800' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isBangla ? 'সাপ্তাহিক স্লট শিডিউল' : 'Weekly Slot Schedule'}
                    </button>
                  </div>

                  {routineViewMode === 'files' ? (
                    <button
                      type="button"
                      onClick={() => setShowUploadRoutineModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-rose-700 hover:from-maroon-900 hover:to-rose-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isBangla ? 'নতুন রুটিন আপলোড করুন' : 'Upload New Routine'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddRoutineModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isBangla ? 'নতুন ক্লাস স্লট যোগ করুন' : 'Add Class Slot'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* VIEW MODE 1: CLASS ROUTINE FILES (IMAGE / PDF) */}
              {routineViewMode === 'files' && (
                <div className="space-y-6">
                  {/* Filters: By Class and By File Type */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {isBangla ? 'শ্রেণী অনুযায়ী ফিল্টার করুন:' : 'Filter by Class:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['All', 'Class 8', 'Class 9 (Science)', 'Class 9 (Commerce)', 'Class 10 (Science)', 'Class 10 (Commerce)', 'SSC Special Batch', 'HSC (Science)', 'HSC (Commerce)'].map(cls => (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => setRoutineClassFilter(cls)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              routineClassFilter === cls 
                                ? 'bg-maroon-800 text-white shadow-xs' 
                                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                            }`}
                          >
                            {cls === 'All' ? (isBangla ? 'সকল ব্যাচ' : 'All Classes') : cls}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:text-right shrink-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {isBangla ? 'ফরম্যাট:' : 'Format:'}
                      </span>
                      <div className="flex items-center gap-1.5 justify-start sm:justify-end">
                        {(['All', 'image', 'pdf'] as const).map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setRoutineFileTypeFilter(type)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              routineFileTypeFilter === type 
                                ? 'bg-slate-900 text-white' 
                                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {type === 'All' ? (isBangla ? 'সকল' : 'All') : type === 'image' ? (isBangla ? '🖼️ ছবি' : '🖼️ Image') : (isBangla ? '📄 PDF' : '📄 PDF')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Routine Cards Grid */}
                  {filteredClassRoutines.length === 0 ? (
                    <div className="text-center py-16 px-4 bg-slate-50/50 rounded-3xl border border-dashed border-slate-300 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                        <CalendarDays className="w-7 h-7 text-slate-400" />
                      </div>
                      <h4 className="text-base font-bold text-slate-800">
                        {isBangla ? 'এই নির্বাচনের জন্য কোনো রুটিন পাওয়া যায়নি' : 'No Routines Found'}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        {isBangla 
                          ? 'নতুন রুটিন আপলোড করতে উপরের "নতুন রুটিন আপলোড করুন" বাটনে ক্লিক করুন।'
                          : 'Click the "Upload New Routine" button to publish an image or PDF schedule for this class.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowUploadRoutineModal(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-maroon-800 text-white text-xs font-bold hover:bg-maroon-900 transition-colors shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isBangla ? 'নতুন রুটিন যোগ করুন' : 'Add Routine Now'}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredClassRoutines.map(routine => (
                        <div
                          key={routine.id}
                          className="bg-white rounded-3xl border border-slate-200 hover:border-maroon-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                        >
                          <div>
                            {/* Card Header & Badges */}
                            <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2 bg-gradient-to-r from-slate-50 to-white">
                              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-900 border border-rose-200/80 flex items-center gap-1.5 shadow-2xs">
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
                              onClick={() => setPreviewRoutineModal(routine)}
                              className="relative h-44 bg-slate-100 cursor-pointer overflow-hidden flex items-center justify-center group/preview border-b border-slate-100"
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
                                <div className="p-6 text-center space-y-2">
                                  <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-xs">
                                    <FileText className="w-7 h-7" />
                                  </div>
                                  <div className="text-xs font-bold text-slate-800 line-clamp-1">{routine.fileName}</div>
                                  <span className="text-[11px] text-slate-500 font-medium">{routine.fileSize || 'PDF Document'}</span>
                                </div>
                              )}

                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs">
                                <span className="px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                                  <ZoomIn className="w-3.5 h-3.5 text-maroon-800" />
                                  <span>{isBangla ? 'বড় করে দেখুন' : 'Full Preview'}</span>
                                </span>
                              </div>
                            </div>

                            {/* Card Content Info */}
                            <div className="p-4 space-y-1.5">
                              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug line-clamp-2">
                                {routine.title}
                              </h3>

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
                              onClick={() => setPreviewRoutineModal(routine)}
                              className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5 text-maroon-800" />
                              <span>{isBangla ? 'দেখুন' : 'View'}</span>
                            </button>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={routine.fileUrl}
                                download={routine.fileName || `${routine.targetClass}-routine.${routine.fileType === 'pdf' ? 'pdf' : 'png'}`}
                                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-maroon-800 transition-colors cursor-pointer"
                                title={isBangla ? 'ডাউনলোড করুন' : 'Download file'}
                              >
                                <Download className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteClassRoutine(routine.id, routine.title)}
                                className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                title={isBangla ? 'রুটিন মুছুন' : 'Delete routine'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* VIEW MODE 2: WEEKLY SLOT SCHEDULE TABLE */}
              {routineViewMode === 'slots' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {batches.map(b => (
                      <button 
                        key={b.id} 
                        onClick={() => setRoutineBatchFilter(b.name)} 
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          routineBatchFilter === b.name ? 'bg-maroon-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>

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
              )}

            </div>
          </div>
        )}

        {/* TAB 10: PUBLISH RESULT (EXCEL-STYLE BULK SCORE ENTRY) */}
        {activeTab === 'publish-result' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Overview & Filters Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-maroon-900 text-xs font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5 text-rose-600" />
                    <span>{isBangla ? 'এক্সেল-স্টাইল বাল্ক ফলাফল প্রকাশ' : 'Excel-Style Bulk Score Publishing'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isBangla ? 'পরীক্ষার ফলাফল এন্ট্রি ও প্রকাশ' : 'Bulk Exam Score Entry & Publication'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                    {isBangla 
                      ? 'শ্রেণি, পরীক্ষা ও বিষয় নির্বাচন করে শিক্ষার্থীদের নম্বর সরাসরি স্প্রেডশিটের মতো দ্রুত এন্ট্রি করুন (Enter অথবা ArrowDown চেপে পরের ঘরে যান)।'
                      : 'Select Class, Exam, and Subject to rapidly enter scores like an Excel spreadsheet (press Enter or ArrowDown to move to next student).'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddResultModal(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{isBangla ? 'মোডালে খুলুন' : 'Open in Modal'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBulkSaveScores()}
                    className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{isBangla ? 'Save / Publish All Scores' : 'Save / Publish All Scores'}</span>
                  </button>
                </div>
              </div>

              {/* Filters row (Image 2) */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-wrap items-end gap-3 flex-1">
                  {/* Select Class */}
                  <div className="space-y-1 min-w-[140px]">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                      {isBangla ? 'শ্রেণি নির্বাচন' : 'Select Class'}
                    </label>
                    <select
                      value={bulkClass}
                      onChange={e => setBulkClass(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-maroon-600 cursor-pointer shadow-2xs"
                    >
                      {classOptions.map(cls => (
                        <option key={cls} value={cls}>
                          {cls === 'All' ? (isBangla ? 'সকল শ্রেণি (All)' : 'All Classes') : cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Exam */}
                  <div className="space-y-1 min-w-[160px]">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                      {isBangla ? 'পরীক্ষা নির্বাচন' : 'Select Exam'}
                    </label>
                    <select
                      value={bulkExam}
                      onChange={e => setBulkExam(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-maroon-600 cursor-pointer shadow-2xs"
                    >
                      <option value="Final Exam 2026">Final Exam 2026</option>
                      <option value="Mid-Term Evaluation">Mid-Term Evaluation</option>
                      <option value="Model Test 1">Model Test 1</option>
                      <option value="Model Test 2">Model Test 2</option>
                      <option value="Pre-Test Assessment">Pre-Test Assessment</option>
                      <option value="Weekly CQ Practice">Weekly CQ Practice</option>
                      <option value="Monthly Assessment">Monthly Assessment</option>
                    </select>
                  </div>

                  {/* Select Subject */}
                  <div className="space-y-1 min-w-[140px]">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                      {isBangla ? 'বিষয় নির্বাচন' : 'Select Subject'}
                    </label>
                    <select
                      value={bulkSubject}
                      onChange={e => setBulkSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-maroon-600 cursor-pointer shadow-2xs"
                    >
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Higher Mathematics">Higher Mathematics</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                      <option value="Bangla">Bangla</option>
                      <option value="ICT">ICT</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>

                  {/* Set Total Marks (Admin) */}
                  <div className="space-y-1 w-28">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                      {isBangla ? 'মোট নম্বর' : 'Set Total Marks (Admin)'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={bulkTotalMarks}
                      onChange={e => {
                        const val = Number(e.target.value);
                        if (val > 0) setBulkTotalMarks(val);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-center text-slate-800 focus:outline-none focus:border-maroon-600 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBulkSaveScores()}
                    className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{isBangla ? 'Save / Publish All Scores' : 'Save / Publish All Scores'}</span>
                  </button>
                </div>
              </div>

              {/* Table (Image 2) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 w-16 text-center">{isBangla ? 'ক্রম' : 'SL'}</th>
                      <th className="px-4 py-3.5 w-48">{isBangla ? 'শিক্ষার্থী আইডি' : 'Student ID'}</th>
                      <th className="px-4 py-3.5">{isBangla ? 'শিক্ষার্থীর নাম' : 'Student Name'}</th>
                      <th className="px-4 py-3.5 w-48 text-right">
                        {isBangla ? 'প্রাপ্ত নম্বর' : 'Marks Obtained'} <span className="text-rose-600">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBulkStudents.map((student, idx) => {
                      const scoreVal = bulkScores[student.studentId] !== undefined ? bulkScores[student.studentId] : '';
                      const isExceeded = Number(scoreVal) > bulkTotalMarks;
                      return (
                        <tr 
                          key={student.id} 
                          className={`hover:bg-slate-50/80 transition-colors ${scoreVal !== '' ? 'bg-rose-50/20' : ''}`}
                        >
                          <td className="px-4 py-3.5 text-center text-slate-500 font-bold">{idx + 1}</td>
                          <td className="px-4 py-3.5 font-mono font-bold text-slate-800">{student.studentId}</td>
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-slate-900 text-sm">{student.name}</span>
                            <span className="text-xs text-slate-400 ml-2">({student.currentClass || student.batch})</span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <input
                              id={`page-bulk-score-input-${idx}`}
                              type="number"
                              min={0}
                              max={bulkTotalMarks}
                              placeholder="Enter Score"
                              value={scoreVal}
                              onChange={e => handleScoreChange(student.studentId, e.target.value)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === 'ArrowDown') {
                                  e.preventDefault();
                                  const nextInput = document.getElementById(`page-bulk-score-input-${idx + 1}`) as HTMLInputElement | null;
                                  if (nextInput) { nextInput.focus(); nextInput.select(); }
                                } else if (e.key === 'ArrowUp') {
                                  e.preventDefault();
                                  const prevInput = document.getElementById(`page-bulk-score-input-${idx - 1}`) as HTMLInputElement | null;
                                  if (prevInput) { prevInput.focus(); prevInput.select(); }
                                }
                              }}
                              className={`w-full max-w-[160px] ml-auto px-3.5 py-2 text-right rounded-xl border font-bold text-xs transition-all focus:outline-none ${
                                isExceeded
                                  ? 'border-rose-500 bg-rose-50 text-rose-700 focus:ring-2 focus:ring-rose-400'
                                  : scoreVal !== ''
                                  ? 'border-maroon-300 bg-white text-maroon-900 focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600'
                                  : 'border-slate-200 bg-slate-50/60 text-slate-700 focus:bg-white focus:border-maroon-600'
                              }`}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Footer summary */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                  <div className="flex items-center gap-3">
                    <span>
                      {isBangla ? 'মোট শিক্ষার্থী:' : 'Total Students:'}{' '}
                      <strong className="text-slate-800">{filteredBulkStudents.length}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      {isBangla ? 'নম্বর এন্ট্রি করা হয়েছে:' : 'Scores Entered:'}{' '}
                      <strong className="text-maroon-800">
                        {Object.values(bulkScores).filter(v => v !== '' && v !== undefined).length}
                      </strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBulkSaveScores()}
                    className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{isBangla ? 'সংরক্ষণ ও প্রকাশ করুন' : 'Save & Publish All Scores'}</span>
                  </button>
                </div>
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
                    <option value="Class 9 (Science)">Class 9 (Science)</option>
                    <option value="Class 9 (Commerce)">Class 9 (Commerce)</option>
                    <option value="Class 10 (Science)">Class 10 (Science)</option>
                    <option value="Class 10 (Commerce)">Class 10 (Commerce)</option>
                    <option value="SSC Special Batch">SSC Special Batch</option>
                    <option value="HSC (Science)">HSC (Science)</option>
                    <option value="HSC (Commerce)">HSC (Commerce)</option>
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

      {/* ================= MODAL: EXCEL-STYLE BULK EXAM SCORE ENTRY (IMAGE 2) ================= */}
      {showAddResultModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-50 rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200/90 space-y-4 animate-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-maroon-800 text-white flex items-center justify-center shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{isBangla ? 'পরীক্ষার ফলাফল বাল্ক এন্ট্রি' : 'Publish Exam Scores (Bulk Entry)'}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-maroon-900 border border-rose-200">
                      Excel Style
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBangla 
                      ? 'একসাথে সম্পূর্ণ ক্লাসের শিক্ষার্থীদের নম্বর এন্ট্রি ও প্রকাশ করুন (Enter/ArrowDown দিয়ে পরের ঘরে যান)' 
                      : 'Fast batch score publication with spreadsheet keyboard navigation (Press Enter/ArrowDown to jump)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddResultModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Top Filters & Controls Panel (Image 2) */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-end justify-between gap-3">
              <div className="flex flex-wrap items-end gap-3 flex-1">
                {/* Select Class */}
                <div className="space-y-1 min-w-[130px]">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                    {isBangla ? 'শ্রেণি নির্বাচন' : 'Select Class'}
                  </label>
                  <select
                    value={bulkClass}
                    onChange={e => setBulkClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-maroon-600 cursor-pointer shadow-2xs"
                  >
                    {classOptions.map(cls => (
                      <option key={cls} value={cls}>
                        {cls === 'All' ? (isBangla ? 'সকল শ্রেণি (All)' : 'All Classes') : cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Exam */}
                <div className="space-y-1 min-w-[150px]">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                    {isBangla ? 'পরীক্ষা নির্বাচন' : 'Select Exam'}
                  </label>
                  <select
                    value={bulkExam}
                    onChange={e => setBulkExam(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-maroon-600 cursor-pointer shadow-2xs"
                  >
                    <option value="Final Exam 2026">Final Exam 2026</option>
                    <option value="Mid-Term Evaluation">Mid-Term Evaluation</option>
                    <option value="Model Test 1">Model Test 1</option>
                    <option value="Model Test 2">Model Test 2</option>
                    <option value="Pre-Test Assessment">Pre-Test Assessment</option>
                    <option value="Weekly CQ Practice">Weekly CQ Practice</option>
                    <option value="Monthly Assessment">Monthly Assessment</option>
                  </select>
                </div>

                {/* Select Subject */}
                <div className="space-y-1 min-w-[130px]">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                    {isBangla ? 'বিষয় নির্বাচন' : 'Select Subject'}
                  </label>
                  <select
                    value={bulkSubject}
                    onChange={e => setBulkSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-maroon-600 cursor-pointer shadow-2xs"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Higher Mathematics">Higher Mathematics</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="ICT">ICT</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                {/* Set Total Marks (Admin) */}
                <div className="space-y-1 w-28">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-600">
                    {isBangla ? 'মোট নম্বর' : 'Set Total Marks (Admin)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={bulkTotalMarks}
                    onChange={e => {
                      const val = Number(e.target.value);
                      if (val > 0) setBulkTotalMarks(val);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center text-slate-800 focus:outline-none focus:border-maroon-600 shadow-2xs"
                  />
                </div>
              </div>

              {/* Save / Publish All Scores Button */}
              <button
                type="button"
                onClick={() => handleBulkSaveScores()}
                className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{isBangla ? 'Save / Publish All Scores' : 'Save / Publish All Scores'}</span>
              </button>
            </div>

            {/* Bulk Entry Table matching Image 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col">
              <div className="overflow-x-auto flex-1 max-h-[50vh] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider text-[11px] sticky top-0 z-10 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 w-16 text-center">{isBangla ? 'ক্রম' : 'SL'}</th>
                      <th className="px-4 py-3.5 w-48">{isBangla ? 'শিক্ষার্থী আইডি' : 'Student ID'}</th>
                      <th className="px-4 py-3.5">{isBangla ? 'শিক্ষার্থীর নাম' : 'Student Name'}</th>
                      <th className="px-4 py-3.5 w-48 text-right">
                        {isBangla ? 'প্রাপ্ত নম্বর' : 'Marks Obtained'} <span className="text-rose-600">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBulkStudents.map((student, idx) => {
                      const scoreVal = bulkScores[student.studentId] !== undefined ? bulkScores[student.studentId] : '';
                      const isExceeded = Number(scoreVal) > bulkTotalMarks;
                      return (
                        <tr 
                          key={student.id} 
                          className={`hover:bg-slate-50/80 transition-colors ${scoreVal !== '' ? 'bg-rose-50/20' : ''}`}
                        >
                          <td className="px-4 py-3 text-center text-slate-500 font-bold">{idx + 1}</td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-800">{student.studentId}</td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900">{student.name}</span>
                            <span className="text-[10px] text-slate-400 ml-2">({student.currentClass || student.batch})</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <input
                              id={`bulk-score-input-${idx}`}
                              type="number"
                              min={0}
                              max={bulkTotalMarks}
                              placeholder="Enter Score"
                              value={scoreVal}
                              onChange={e => handleScoreChange(student.studentId, e.target.value)}
                              onKeyDown={e => handleKeyDown(e, idx)}
                              className={`w-full max-w-[160px] ml-auto px-3.5 py-2 text-right rounded-xl border font-bold text-xs transition-all focus:outline-none ${
                                isExceeded
                                  ? 'border-rose-500 bg-rose-50 text-rose-700 focus:ring-2 focus:ring-rose-400'
                                  : scoreVal !== ''
                                  ? 'border-maroon-300 bg-white text-maroon-900 focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600'
                                  : 'border-slate-200 bg-slate-50/60 text-slate-700 focus:bg-white focus:border-maroon-600'
                              }`}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Stats & Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center gap-3">
                  <span>
                    {isBangla ? 'মোট শিক্ষার্থী:' : 'Total Students:'}{' '}
                    <strong className="text-slate-800">{filteredBulkStudents.length}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    {isBangla ? 'নম্বর এন্ট্রি করা হয়েছে:' : 'Scores Entered:'}{' '}
                    <strong className="text-maroon-800">
                      {Object.values(bulkScores).filter(v => v !== '' && v !== undefined).length}
                    </strong>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-slate-400">
                    {isBangla ? 'টিপ: এক ঘর থেকে অন্য ঘরে যেতে Enter অথবা ArrowDown চাপুন' : 'Tip: Press Enter or ArrowDown to jump to next student'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddResultModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/60 font-bold transition-colors cursor-pointer"
                  >
                    {isBangla ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBulkSaveScores()}
                    className="px-4 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{isBangla ? 'সংরক্ষণ ও প্রকাশ' : 'Save & Publish'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL: ADD PUBLIC SUCCESS RESULT ================= */}
      {showAddPublicResultModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>{isBangla ? 'নতুন কৃতী শিক্ষার্থী ও সাফল্য যোগ করুন' : 'Add New Results & Success Story'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'এই ফলাফল সরাসরি ওয়েবসাইটের "Results & Success" পেজে প্রদর্শিত হবে' : 'This entry will be publicly displayed on the Results & Success page'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddPublicResultModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePublicResult} className="space-y-4 text-xs font-medium">
              {/* Photo Upload Section */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <label className="block text-slate-700 font-bold">
                  {isBangla ? 'শিক্ষার্থীর ছবি (Photo)' : 'Student Photo'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    {(publicResultPhotoPreview || newPublicResult.photo) ? (
                      <img
                        src={publicResultPhotoPreview || newPublicResult.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setPublicResultPhotoPreview('')}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-maroon-50 hover:border-maroon-300 text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-maroon-700" />
                      <span>{isBangla ? 'ডিভাইস থেকে আপলোড করুন' : 'Upload from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePublicResultPhotoUpload}
                      />
                    </label>
                    <input
                      type="url"
                      placeholder={isBangla ? 'অথবা ছবির ওয়েব URL পেস্ট করুন' : 'Or paste image URL (https://...)'}
                      value={newPublicResult.photo}
                      onChange={e => {
                        const val = e.target.value;
                        setNewPublicResult(prev => ({ ...prev, photo: val }));
                        setPublicResultPhotoPreview(val);
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-100"
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'শিক্ষার্থীর পূর্ণ নাম *' : 'Student Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ আহসানুল কবির' : 'e.g. Ahsanul Kabir'}
                    value={newPublicResult.studentName}
                    onChange={e => setNewPublicResult({ ...newPublicResult, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'পরীক্ষার নাম / স্তর *' : 'Exam / Class Level *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ HSC Examination' : 'e.g. HSC Examination, SSC, Medical'}
                    value={newPublicResult.studentClass}
                    onChange={e => setNewPublicResult({ ...newPublicResult, studentClass: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'পরীক্ষার ক্যাটাগরি *' : 'Exam Category *'}
                  </label>
                  <select
                    value={newPublicResult.examType}
                    onChange={e => setNewPublicResult({ ...newPublicResult, examType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  >
                    <option value="HSC Science">HSC Science</option>
                    <option value="SSC Science">SSC Science</option>
                    <option value="HSC Commerce">HSC Commerce</option>
                    <option value="Medical Entrance">Medical Entrance</option>
                    <option value="Engineering Entrance">Engineering Entrance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'পাসের বছর *' : 'Exam / Passing Year *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={2020}
                    max={2030}
                    value={newPublicResult.year}
                    onChange={e => setNewPublicResult({ ...newPublicResult, year: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'অর্জিত স্থান / মেধা তালিকা / চান্স *' : 'Merit Position / Distinction / Placement *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ 1st in Dhaka Board Merit List অথবা Admitted to DMC' : 'e.g. 1st in Dhaka Board Merit List or Admitted to BUET'}
                    value={newPublicResult.position}
                    onChange={e => setNewPublicResult({ ...newPublicResult, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'জিপিএ / ফলাফল *' : 'GPA / Rank *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ GPA 5.00 (Golden) বা Merit #24' : 'e.g. GPA 5.00 (Golden)'}
                    value={newPublicResult.gpa}
                    onChange={e => setNewPublicResult({ ...newPublicResult, gpa: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'প্রাপ্ত নম্বর / পার্সেন্টাইল' : 'Total Marks / Score'}
                  </label>
                  <input
                    type="text"
                    placeholder={isBangla ? 'উদাঃ 1182 / 1200' : 'e.g. 1182 / 1200 or 89.75 / 100'}
                    value={newPublicResult.marks}
                    onChange={e => setNewPublicResult({ ...newPublicResult, marks: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'প্রতিষ্ঠান / কলেজ / স্কুলের নাম *' : 'College / School / University *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBangla ? 'উদাঃ Notre Dame College, Holy Cross, Dhaka College' : 'e.g. Notre Dame College'}
                    value={newPublicResult.institution}
                    onChange={e => setNewPublicResult({ ...newPublicResult, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">
                    {isBangla ? 'শিক্ষার্থীর মন্তব্য / প্রতিক্রিয়া (Testimonial)' : 'Student Testimonial / Experience'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={isBangla ? 'সাইকি একাডেমিক কেয়ার নিয়ে শিক্ষার্থীর অভিজ্ঞতা বা বক্তব্য...' : 'Student quote about Psyche Academic Care...'}
                    value={newPublicResult.testimonial || ''}
                    onChange={e => setNewPublicResult({ ...newPublicResult, testimonial: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-maroon-600 resize-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPublicResultModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>{isBangla ? 'ফলাফল প্রকাশ করুন' : 'Publish Result'}</span>
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

      {/* MODAL: ADD / EDIT BATCH */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowAddBatchModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingBatch 
                    ? (isBangla ? 'ব্যাচ এডিট করুন' : 'Edit Batch Information') 
                    : (isBangla ? 'নতুন ব্যাচ যোগ করুন' : 'Create New Batch')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'ব্যাচের সময়সূচী, শিক্ষক, ফি এবং ছবি পরিচালনা করুন' : 'Manage batch schedule, instructor, fee, and photo'}
                </p>
              </div>
              <button onClick={() => setShowAddBatchModal(false)} className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4">
              {/* Photo Upload & Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-maroon-700" />
                    <span>{isBangla ? 'ব্যাচ কভার ছবি (Batch Photo / Cover)' : 'Batch Cover Photo'}</span>
                  </label>
                  {(batchPhotoPreview || newBatch.photo) && (
                    <button
                      type="button"
                      onClick={() => {
                        setBatchPhotoPreview('');
                        setNewBatch(prev => ({ ...prev, photo: '' }));
                      }}
                      className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      {isBangla ? 'ছবি মুছুন' : 'Remove Photo'}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-20 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    {(batchPhotoPreview || newBatch.photo) ? (
                      <img
                        src={batchPhotoPreview || newBatch.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setBatchPhotoPreview('')}
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-maroon-50 hover:border-maroon-300 text-xs font-bold cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-maroon-700" />
                        <span>{isBangla ? 'ছবি আপলোড করুন' : 'Upload Image'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBatchPhotoUpload}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">PNG, JPG, WebP</span>
                    </div>
                    <input
                      type="url"
                      placeholder={isBangla ? 'অথবা ছবির অনলাইন URL দিন' : 'Or paste online image URL...'}
                      value={newBatch.photo}
                      onChange={e => {
                        setNewBatch(prev => ({ ...prev, photo: e.target.value }));
                        setBatchPhotoPreview(e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:border-maroon-600"
                    />
                  </div>
                </div>
              </div>

              {/* Name & Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'ব্যাচের নাম *' : 'Batch Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Class 10 Science Model Test Batch"
                    value={newBatch.name}
                    onChange={e => setNewBatch(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'ব্যাচ কোড *' : 'Batch Code *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PAC-C10-02"
                    value={newBatch.code}
                    onChange={e => setNewBatch(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600 uppercase"
                  />
                </div>
              </div>

              {/* Target Class & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'টার্গেট শ্রেণি / গ্রুপ *' : 'Target Class / Group *'}
                  </label>
                  <select
                    value={newBatch.targetClass}
                    onChange={e => setNewBatch(prev => ({ ...prev, targetClass: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9 (Science)">Class 9 (Science)</option>
                    <option value="Class 9 (Commerce)">Class 9 (Commerce)</option>
                    <option value="Class 10 (Science)">Class 10 (Science)</option>
                    <option value="Class 10 (Commerce)">Class 10 (Commerce)</option>
                    <option value="SSC Special Batch">SSC Special Batch</option>
                    <option value="HSC (Science)">HSC (Science)</option>
                    <option value="HSC (Commerce)">HSC (Commerce)</option>
                    <option value="General Foundation">General Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'ভর্তির বর্তমান অবস্থা *' : 'Admission Status *'}
                  </label>
                  <select
                    value={newBatch.status}
                    onChange={e => setNewBatch(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                  >
                    <option value="Admissions Open">Admissions Open</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Full">Full (No Seats)</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              {/* Monthly Fee & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'মাসিক বেতন (৳) *' : 'Monthly Fee (৳) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="2500"
                    value={newBatch.monthlyFee}
                    onChange={e => setNewBatch(prev => ({ ...prev, monthlyFee: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'ক্লাস সময়সূচী *' : 'Schedule *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sat, Mon, Wed (8:00 AM - 10:30 AM)"
                    value={newBatch.schedule}
                    onChange={e => setNewBatch(prev => ({ ...prev, schedule: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBangla ? 'সংক্ষিপ্ত বিবরণ (Short Description)' : 'Short Description'}
                </label>
                <textarea
                  rows={2}
                  placeholder={isBangla ? 'ব্যাচের মূল লক্ষ্য ও বিবরণ লিখুন...' : 'Key objective and focus of this batch...'}
                  value={newBatch.shortDescription}
                  onChange={e => setNewBatch(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                />
              </div>

              {/* Features (Comma-separated) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBangla ? 'প্রধান সুবিধাসমূহ (কমা দিয়ে আলাদা করুন)' : 'Key Features (Comma-separated)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weekly CQ practice, Formula memory maps, Model tests"
                  value={newBatch.features}
                  onChange={e => setNewBatch(prev => ({ ...prev, features: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-maroon-600"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBatchModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  {editingBatch
                    ? (isBangla ? 'আপডেট সংরক্ষণ করুন' : 'Save Changes')
                    : (isBangla ? 'ব্যাচ তৈরি করুন' : 'Create Batch')}
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
                  { label: isBangla ? 'ইমেইল' : 'Email', field: 'email', placeholder: 'name@psyche.edu.bd' },
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

      {/* ===== MODAL: UPLOAD CLASS ROUTINE (IMAGE OR PDF) ===== */}
      {showUploadRoutineModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowUploadRoutineModal(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 my-8" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-maroon-50 text-maroon-800 border border-maroon-200 mb-1">
                  <Upload className="w-3 h-3" />
                  <span>{isBangla ? 'রুটিন আপলোড' : 'Publish Class Routine'}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {isBangla ? 'শ্রেণীভিত্তিক রুটিন আপলোড (Image / PDF)' : 'Upload Class Routine (Image / PDF)'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBangla ? 'যে ক্লাসের রুটিন নির্বাচন করবেন, শুধুমাত্র সেই ক্লাসের শিক্ষার্থীরাই তা দেখতে পাবে।' : 'Only students of the selected class will see this routine.'}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setShowUploadRoutineModal(false)} 
                className="p-2 rounded-xl hover:bg-slate-100 cursor-pointer text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClassRoutine} className="space-y-4">
              {/* Routine Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBangla ? 'রুটিনের শিরোনাম *' : 'Routine Title *'}
                </label>
                <input
                  type="text"
                  placeholder={isBangla ? 'যেমন: Class 8 Academic Routine 2026' : 'e.g. Class 8 Academic Routine 2026'}
                  value={uploadRoutineForm.title}
                  onChange={e => setUploadRoutineForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-medium"
                  required
                />
              </div>

              {/* Target Class Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-maroon-700" />
                    <span>{isBangla ? 'নির্দিষ্ট শ্রেণী (Target Class) *' : 'Target Class *'}</span>
                  </label>
                  <select
                    value={uploadRoutineForm.targetClass}
                    onChange={e => setUploadRoutineForm(prev => ({ ...prev, targetClass: e.target.value }))}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-bold text-maroon-900"
                  >
                    <option value="Class 8">Class 8 (৮ম শ্রেণি)</option>
                    <option value="Class 9 (Science)">Class 9 (Science) - ৯ম বিজ্ঞান</option>
                    <option value="Class 9 (Commerce)">Class 9 (Commerce) - ৯ম ব্যবসায় শিক্ষা</option>
                    <option value="Class 10 (Science)">Class 10 (Science) - ১০ম বিজ্ঞান</option>
                    <option value="Class 10 (Commerce)">Class 10 (Commerce) - ১০ম ব্যবসায় শিক্ষা</option>
                    <option value="SSC Special Batch">SSC Special Batch - এসএসসি স্পেশাল ব্যাচ</option>
                    <option value="HSC (Science)">HSC (Science) - এইচএসসি বিজ্ঞান</option>
                    <option value="HSC (Commerce)">HSC (Commerce) - এইচএসসি ব্যবসায় শিক্ষা</option>
                    <option value="All Classes">All Classes (সকল ব্যাচ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'ফাইলের ধরন (Format) *' : 'File Type *'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUploadRoutineForm(prev => ({ ...prev, fileType: 'image' }))}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        uploadRoutineForm.fileType === 'image'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{isBangla ? 'ছবি (Image)' : 'Image'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadRoutineForm(prev => ({ ...prev, fileType: 'pdf' }))}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        uploadRoutineForm.fileType === 'pdf'
                          ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{isBangla ? 'পিডিএফ (PDF)' : 'PDF'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* File Upload Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBangla ? 'রুটিন ফাইল নির্বাচন করুন (Image বা PDF) *' : 'Choose Routine File (Image or PDF) *'}
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-maroon-400 rounded-2xl p-5 text-center transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    id="routine-file-upload"
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="routine-file-upload" className="cursor-pointer block space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 text-maroon-800 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {isBangla ? 'কম্পিউটার থেকে ছবি বা পিডিএফ বেছে নিন' : 'Click to browse Image or PDF from device'}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      PNG, JPG, WebP অথবা PDF ফাইল (সর্বোচ্চ 10MB)
                    </p>
                  </label>

                  {/* Uploaded File Feedback or Generator option */}
                  {uploadRoutineForm.fileName ? (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-left">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          {uploadRoutineForm.fileType === 'pdf' ? <FileText className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate">{uploadRoutineForm.fileName}</p>
                          <p className="text-[10px] text-slate-500">{uploadRoutineForm.fileSize}</p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-600 font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 shrink-0">
                        Ready ✓
                      </span>
                    </div>
                  ) : (
                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-center gap-2">
                      <span className="text-xs text-slate-400">{isBangla ? 'অথবা' : 'or'}</span>
                      <button
                        type="button"
                        onClick={handleGenerateSampleRoutine}
                        className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{isBangla ? 'ডিফল্ট সাইকি রুটিন তৈরি করুন' : 'Generate Sample Routine Image'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Effective Date & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'কার্যকর হওয়ার তারিখ' : 'Effective Date'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. October 01, 2026"
                    value={uploadRoutineForm.effectiveDate}
                    onChange={e => setUploadRoutineForm(prev => ({ ...prev, effectiveDate: e.target.value }))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBangla ? 'শিক্ষার্থীদের জন্য বিশেষ নির্দেশনা' : 'Notes for Students'}
                  </label>
                  <input
                    type="text"
                    placeholder={isBangla ? 'যেমন: সময়মতো ক্লাসে উপস্থিত থাকতে হবে' : 'e.g. Bring syllabus notebooks daily'}
                    value={uploadRoutineForm.notes}
                    onChange={e => setUploadRoutineForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-600 font-medium"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadRoutineModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer text-xs"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-rose-700 hover:from-maroon-900 hover:to-rose-800 text-white font-bold shadow-md cursor-pointer text-xs flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isBangla ? 'স্টুডেন্ট পোর্টালে প্রকাশ করুন' : 'Publish to Student Portal'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: PREVIEW ROUTINE LIGHTBOX ===== */}
      {previewRoutineModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPreviewRoutineModal(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-5 sm:p-6 space-y-4 animate-in zoom-in-95 my-6 flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-maroon-100 text-maroon-900 border border-maroon-200">
                  {previewRoutineModal.targetClass}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 line-clamp-1">
                    {previewRoutineModal.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {previewRoutineModal.fileName} • {previewRoutineModal.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewRoutineModal.fileUrl}
                  download={previewRoutineModal.fileName || `${previewRoutineModal.targetClass}-routine.${previewRoutineModal.fileType === 'pdf' ? 'pdf' : 'png'}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'ডাউনলোড' : 'Download'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewRoutineModal(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 overflow-auto bg-slate-100 rounded-2xl p-2 sm:p-4 flex items-center justify-center min-h-[350px]">
              {previewRoutineModal.fileType === 'image' || previewRoutineModal.fileUrl.startsWith('data:image') ? (
                <img
                  src={previewRoutineModal.fileUrl}
                  alt={previewRoutineModal.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-xs"
                />
              ) : (
                <div className="w-full h-[65vh] bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-4 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{previewRoutineModal.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{previewRoutineModal.fileName} ({previewRoutineModal.fileSize})</p>
                    <p className="text-xs text-maroon-800 font-semibold mt-0.5">{isBangla ? 'শ্রেণী: ' : 'Class: '}{previewRoutineModal.targetClass}</p>
                  </div>
                  {previewRoutineModal.notes && (
                    <p className="text-xs text-slate-600 max-w-md bg-slate-50 p-3 rounded-xl border border-slate-200">
                      "{previewRoutineModal.notes}"
                    </p>
                  )}
                  <a
                    href={previewRoutineModal.fileUrl}
                    download={previewRoutineModal.fileName}
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
