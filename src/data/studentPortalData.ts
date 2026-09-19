export interface StudentPortalProfile {
  name: string;
  studentId: string;
  avatar: string;
  currentClass: string;
  rollNumber: string;
  batch: string;
  bloodGroup: string;
  email: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  admissionDate: string;
  status: 'Active' | 'On Leave';
}

export interface EnrolledCourseItem {
  id: string;
  name: string;
  code: string;
  instructor: string;
  room: string;
  progress: number;
  totalClasses: number;
  attendedClasses: number;
}

export interface PortalExamResult {
  id: string;
  examName: string;
  subject: string;
  date: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gpa: number;
  highestInBatch: number;
  remarks: string;
}

export interface AttendanceRecord {
  month: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  percentage: number;
}

export interface PaymentInvoice {
  id: string;
  invoiceNo: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Due' | 'Pending';
  method?: string;
}

export const mockStudentProfile: StudentPortalProfile = {
  name: 'Sadman Sakib',
  studentId: 'PAC-2026-8842',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  currentClass: 'Class 10 (SSC Batch 2026)',
  rollNumber: '07',
  batch: 'Morning Elite Batch-A',
  bloodGroup: 'B+ (Positive)',
  email: 'sadman.sakib@student.pschye.edu',
  phone: '+880 1712-345678',
  guardianName: 'Dr. Rafiqul Islam',
  guardianPhone: '+880 1819-876543',
  admissionDate: 'January 10, 2026',
  status: 'Active'
};

export const mockEnrolledCourses: EnrolledCourseItem[] = [
  {
    id: 'c1',
    name: 'SSC Physics & Mathematics Special Care',
    code: 'PAC-PHY-MATH-10',
    instructor: 'Engr. Mahbubur Rahman',
    room: 'Hall A (Interactive Smart Lab)',
    progress: 78,
    totalClasses: 36,
    attendedClasses: 34
  },
  {
    id: 'c2',
    name: 'Chemistry Foundation & MCQ Drill',
    code: 'PAC-CHEM-10',
    instructor: 'Dr. Nusrat Jahan',
    room: 'Lab B',
    progress: 82,
    totalClasses: 32,
    attendedClasses: 30
  },
  {
    id: 'c3',
    name: 'English Creative Writing & Grammar Clinic',
    code: 'PAC-ENG-10',
    instructor: 'Prof. Tanvir Ahmed',
    room: 'Lecture Room 03',
    progress: 85,
    totalClasses: 28,
    attendedClasses: 27
  }
];

export const mockExamResults: PortalExamResult[] = [
  {
    id: 'res-1',
    examName: 'Mid-Term CQ & MCQ Assessment',
    subject: 'Physics (Paper 1)',
    date: 'Sep 05, 2026',
    marksObtained: 94,
    totalMarks: 100,
    grade: 'A+',
    gpa: 5.0,
    highestInBatch: 97,
    remarks: 'Outstanding conceptual problem solving.'
  },
  {
    id: 'res-2',
    examName: 'Mid-Term CQ & MCQ Assessment',
    subject: 'Higher Mathematics',
    date: 'Sep 07, 2026',
    marksObtained: 91,
    totalMarks: 100,
    grade: 'A+',
    gpa: 5.0,
    highestInBatch: 95,
    remarks: 'Speed in calculus identities was commendable.'
  },
  {
    id: 'res-3',
    examName: 'Monthly Progress Evaluation',
    subject: 'Organic Chemistry Reactions',
    date: 'Aug 22, 2026',
    marksObtained: 88,
    totalMarks: 100,
    grade: 'A+',
    gpa: 5.0,
    highestInBatch: 92,
    remarks: 'Very neat reaction mechanisms.'
  },
  {
    id: 'res-4',
    examName: 'Diagnostic Review Test',
    subject: 'English Comprehension & Essay',
    date: 'Aug 10, 2026',
    marksObtained: 84,
    totalMarks: 100,
    grade: 'A+',
    gpa: 5.0,
    highestInBatch: 90,
    remarks: 'Rich vocabulary and coherent paragraphs.'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { month: 'September 2026', totalDays: 16, presentDays: 15, absentDays: 1, leaveDays: 0, percentage: 93.8 },
  { month: 'August 2026', totalDays: 24, presentDays: 23, absentDays: 1, leaveDays: 0, percentage: 95.8 },
  { month: 'July 2026', totalDays: 22, presentDays: 21, absentDays: 0, leaveDays: 1, percentage: 95.5 },
  { month: 'June 2026', totalDays: 20, presentDays: 19, absentDays: 1, leaveDays: 0, percentage: 95.0 }
];

export const mockPaymentInvoices: PaymentInvoice[] = [
  {
    id: 'inv-01',
    invoiceNo: 'PAC-INV-2026-0901',
    description: 'Monthly Tuition Fee - September 2026',
    amount: 2500,
    dueDate: 'Sep 10, 2026',
    paidDate: 'Sep 06, 2026',
    status: 'Paid',
    method: 'bKash Online'
  },
  {
    id: 'inv-02',
    invoiceNo: 'PAC-INV-2026-0801',
    description: 'Monthly Tuition Fee - August 2026',
    amount: 2500,
    dueDate: 'Aug 10, 2026',
    paidDate: 'Aug 05, 2026',
    status: 'Paid',
    method: 'Nagad'
  },
  {
    id: 'inv-03',
    invoiceNo: 'PAC-INV-2026-1001',
    description: 'Upcoming Tuition Fee - October 2026',
    amount: 2500,
    dueDate: 'Oct 10, 2026',
    status: 'Due'
  }
];
