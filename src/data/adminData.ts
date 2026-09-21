export interface AdminStudent {
  id: string;
  name: string;
  studentId: string;
  batch: string;
  currentClass: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  monthlyFee: number;
  status: 'Active' | 'On Leave' | 'Graduated';
  enrolledDate: string;
}

export interface AdminExamResult {
  id: string;
  studentId: string;
  studentName: string;
  examName: string;
  subject: string;
  batch: string;
  date: string;
  marksObtained: number;
  totalMarks: number;
  gpa: number;
  grade: string;
  remarks: string;
}

export interface AdminInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  batch: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Due';
  paidDate?: string;
  method?: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  phone: string;
  whatsappName?: string;
  email: string;
  studentClass: string;
  course: string;
  previousSchool: string;
  schoolRoll?: string;
  preferredShift: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface BatchInfo {
  id: string;
  name: string;
  code: string;
  targetClass: string;
  instructor: string;
  schedule: string;
  room: string;
  enrolledCount: number;
  capacity: number;
}

export const initialAdminStudents: AdminStudent[] = [
  {
    id: 's1',
    name: 'Sadman Sakib',
    studentId: 'PAC-2026-8842',
    batch: 'Morning Elite Batch-A',
    currentClass: 'Class 10 (SSC)',
    phone: '+880 1712-345678',
    guardianName: 'Dr. Rafiqul Islam',
    guardianPhone: '+880 1819-876543',
    monthlyFee: 2500,
    status: 'Active',
    enrolledDate: 'Jan 10, 2026'
  },
  {
    id: 's2',
    name: 'Tasnim Jahan',
    studentId: 'PAC-2026-8843',
    batch: 'SSC Special Model Test & CQ Batch',
    currentClass: 'SSC Special Batch',
    phone: '+880 1822-112233',
    guardianName: 'Md. Jahangir Alam',
    guardianPhone: '+880 1711-998877',
    monthlyFee: 3200,
    status: 'Active',
    enrolledDate: 'Jan 12, 2026'
  },
  {
    id: 's3',
    name: 'Zubair Hossain',
    studentId: 'PAC-2026-8844',
    batch: 'HSC Science Comprehensive Batch',
    currentClass: 'HSC (Science)',
    phone: '+880 1913-445566',
    guardianName: 'Prof. Anisur Rahman',
    guardianPhone: '+880 1815-667788',
    monthlyFee: 3200,
    status: 'Active',
    enrolledDate: 'Feb 01, 2026'
  },
  {
    id: 's4',
    name: 'Nusrat Fariha',
    studentId: 'PAC-2026-8845',
    batch: 'HSC Commerce Care Batch',
    currentClass: 'HSC (Commerce)',
    phone: '+880 1724-556677',
    guardianName: 'Mrs. Selina Begum',
    guardianPhone: '+880 1923-445511',
    monthlyFee: 2800,
    status: 'Active',
    enrolledDate: 'Feb 15, 2026'
  },
  {
    id: 's5',
    name: 'Arafat Karim',
    studentId: 'PAC-2026-8846',
    batch: 'Class 9 Science Core Batch',
    currentClass: 'Class 9 (Science)',
    phone: '+880 1625-778899',
    guardianName: 'Kabir Ahmed',
    guardianPhone: '+880 1714-332211',
    monthlyFee: 2400,
    status: 'Active',
    enrolledDate: 'Mar 01, 2026'
  },
  {
    id: 's6',
    name: 'Farhan Ahmed',
    studentId: 'PAC-2026-8848',
    batch: 'Class 8 Junior Foundation Batch',
    currentClass: 'Class 8',
    phone: '+880 1683-334080',
    guardianName: 'Mustafizur Rahman',
    guardianPhone: '+880 1711-998800',
    monthlyFee: 2000,
    status: 'Active',
    enrolledDate: 'Jan 05, 2026'
  },
  {
    id: 's7',
    name: 'Mehedi Hasan',
    studentId: 'PAC-2026-8849',
    batch: 'Class 9 Commerce Care Batch',
    currentClass: 'Class 9 (Commerce)',
    phone: '+880 1733-445588',
    guardianName: 'Shafiqul Islam',
    guardianPhone: '+880 1812-334455',
    monthlyFee: 2200,
    status: 'Active',
    enrolledDate: 'Jan 18, 2026'
  },
  {
    id: 's8',
    name: 'Sumaiya Akter',
    studentId: 'PAC-2026-8850',
    batch: 'Class 10 Commerce Board Prep Batch',
    currentClass: 'Class 10 (Commerce)',
    phone: '+880 1555-667788',
    guardianName: 'Kamal Hossain',
    guardianPhone: '+880 1911-223344',
    monthlyFee: 2400,
    status: 'Active',
    enrolledDate: 'Jan 22, 2026'
  }
];

export const initialAdminResults: AdminExamResult[] = [
  {
    id: 'r1',
    studentId: 'PAC-2026-8842',
    studentName: 'Sadman Sakib',
    examName: 'Mid-Term Model Assessment',
    subject: 'Physics',
    batch: 'Morning Elite Batch-A',
    date: 'Sep 10, 2026',
    marksObtained: 94,
    totalMarks: 100,
    gpa: 5.0,
    grade: 'A+',
    remarks: 'Outstanding analytical clarity in Electromagnetism'
  },
  {
    id: 'r2',
    studentId: 'PAC-2026-8842',
    studentName: 'Sadman Sakib',
    examName: 'Chapter-End MCQ Drill',
    subject: 'Higher Mathematics',
    batch: 'Morning Elite Batch-A',
    date: 'Sep 05, 2026',
    marksObtained: 47,
    totalMarks: 50,
    gpa: 5.0,
    grade: 'A+',
    remarks: 'Excellent speed in Coordinate Geometry'
  },
  {
    id: 'r3',
    studentId: 'PAC-2026-8843',
    studentName: 'Tasnim Jahan',
    examName: 'Mid-Term Model Assessment',
    subject: 'Chemistry',
    batch: 'Morning Elite Batch-A',
    date: 'Sep 10, 2026',
    marksObtained: 91,
    totalMarks: 100,
    gpa: 5.0,
    grade: 'A+',
    remarks: 'Strong formula mastery'
  },
  {
    id: 'r4',
    studentId: 'PAC-2026-8844',
    studentName: 'Zubair Hossain',
    examName: 'Quarterly Evaluation',
    subject: 'Physics Paper-I',
    batch: 'HSC Science Care-B',
    date: 'Sep 12, 2026',
    marksObtained: 86,
    totalMarks: 100,
    gpa: 4.8,
    grade: 'A',
    remarks: 'Need attention in Thermodynamics'
  }
];

export const initialAdminInvoices: AdminInvoice[] = [
  {
    id: 'inv-1',
    invoiceNo: 'INV-2026-0912',
    studentId: 'PAC-2026-8842',
    studentName: 'Sadman Sakib',
    batch: 'Morning Elite Batch-A',
    month: 'September 2026',
    amount: 2500,
    dueDate: 'Sep 10, 2026',
    status: 'Paid',
    paidDate: 'Sep 05, 2026',
    method: 'bKash Merchant'
  },
  {
    id: 'inv-2',
    invoiceNo: 'INV-2026-0913',
    studentId: 'PAC-2026-8843',
    studentName: 'Tasnim Jahan',
    batch: 'Morning Elite Batch-A',
    month: 'September 2026',
    amount: 2500,
    dueDate: 'Sep 10, 2026',
    status: 'Paid',
    paidDate: 'Sep 07, 2026',
    method: 'Nagad Gateway'
  },
  {
    id: 'inv-3',
    invoiceNo: 'INV-2026-0914',
    studentId: 'PAC-2026-8844',
    studentName: 'Zubair Hossain',
    batch: 'HSC Science Care-B',
    month: 'September 2026',
    amount: 3200,
    dueDate: 'Sep 15, 2026',
    status: 'Due'
  },
  {
    id: 'inv-4',
    invoiceNo: 'INV-2026-0915',
    studentId: 'PAC-2026-8845',
    studentName: 'Nusrat Fariha',
    batch: 'Medical Biology Care',
    month: 'September 2026',
    amount: 3500,
    dueDate: 'Sep 15, 2026',
    status: 'Paid',
    paidDate: 'Sep 08, 2026',
    method: 'Cash at Desk'
  },
  {
    id: 'inv-5',
    invoiceNo: 'INV-2026-0916',
    studentId: 'PAC-2026-8846',
    studentName: 'Arafat Karim',
    batch: 'General Math & ICT',
    month: 'September 2026',
    amount: 2200,
    dueDate: 'Sep 20, 2026',
    status: 'Due'
  }
];

export const initialAdminApplications: AdmissionApplication[] = [
  {
    id: 'app-101',
    studentName: 'Farhan Tanvir',
    fatherName: 'Md. Tanvirul Huq',
    motherName: 'Rina Begum',
    phone: '+880 1718-223344',
    email: 'farhan.tanvir@gmail.com',
    studentClass: 'Class 10',
    course: 'SSC Comprehensive Care',
    previousSchool: 'Ideal School & College, Motijheel',
    preferredShift: 'Morning',
    submissionDate: 'Sep 16, 2026',
    status: 'Pending'
  },
  {
    id: 'app-102',
    studentName: 'Samira Anjum',
    fatherName: 'Dr. Kamal Anjum',
    motherName: 'Dr. Sharmin Akter',
    phone: '+880 1819-334455',
    email: 'samira.anjum@gmail.com',
    studentClass: 'HSC (Science)',
    course: 'HSC Science Comprehensive Academic Care (1st & 2nd Paper)',
    previousSchool: 'Viqarunnisa Noon School',
    preferredShift: 'Evening',
    submissionDate: 'Sep 15, 2026',
    status: 'Pending'
  },
  {
    id: 'app-103',
    studentName: 'Rayan Al-Mamun',
    fatherName: 'Abdullah Al-Mamun',
    motherName: 'Nasrin Sultana',
    phone: '+880 1912-778899',
    email: 'rayan.mamun@yahoo.com',
    studentClass: 'Class 9 (Science)',
    course: 'Class 9 Science Comprehensive Academic Care',
    previousSchool: 'St. Joseph Higher Secondary',
    preferredShift: 'Morning',
    submissionDate: 'Sep 14, 2026',
    status: 'Approved'
  }
];

export const initialAdminBatches: BatchInfo[] = [
  {
    id: 'b-c8',
    name: 'Class 8 Junior Foundation Batch',
    code: 'PAC-C8-01',
    targetClass: 'Class 8',
    instructor: 'A. K. M. Shamsuddin & Shamim Hossain',
    schedule: 'Sun, Tue, Thu (8:00 AM - 10:30 AM)',
    room: 'Hall A (Smart Room)',
    enrolledCount: 18,
    capacity: 20
  },
  {
    id: 'b-c9-sci',
    name: 'Class 9 Science Core Batch',
    code: 'PAC-C9-SCI-01',
    targetClass: 'Class 9 (Science)',
    instructor: 'Engr. Mahbubur Rahman & Dr. Nusrat Jahan',
    schedule: 'Sat, Mon, Wed (8:00 AM - 10:30 AM)',
    room: 'Hall B (Science Block)',
    enrolledCount: 20,
    capacity: 22
  },
  {
    id: 'b-c9-com',
    name: 'Class 9 Commerce Care Batch',
    code: 'PAC-C9-COM-01',
    targetClass: 'Class 9 (Commerce)',
    instructor: 'Farhana Akhter & Shamim Hossain',
    schedule: 'Sun, Tue, Thu (10:45 AM - 1:15 PM)',
    room: 'Room 102',
    enrolledCount: 16,
    capacity: 20
  },
  {
    id: 'b-c10-sci',
    name: 'Class 10 Science Board Prep Batch',
    code: 'PAC-C10-SCI-01',
    targetClass: 'Class 10 (Science)',
    instructor: 'Engr. Mahbubur Rahman & Dr. Tanvir',
    schedule: 'Sat, Mon, Wed (10:45 AM - 1:15 PM)',
    room: 'Hall A (Smart Lab)',
    enrolledCount: 21,
    capacity: 22
  },
  {
    id: 'b-c10-com',
    name: 'Class 10 Commerce Board Prep Batch',
    code: 'PAC-C10-COM-01',
    targetClass: 'Class 10 (Commerce)',
    instructor: 'Farhana Akhter & Guest Faculty',
    schedule: 'Sun, Tue, Thu (2:00 PM - 4:30 PM)',
    room: 'Room 103',
    enrolledCount: 17,
    capacity: 20
  },
  {
    id: 'b-ssc-sp',
    name: 'SSC Special Model Test & CQ Batch',
    code: 'PAC-SSC-SP-01',
    targetClass: 'SSC Special Batch',
    instructor: 'Engr. Mahbubur Rahman, Dr. Tanvir & Senior Board Panel',
    schedule: 'Sat, Sun, Tue, Thu (3:30 PM - 6:30 PM)',
    room: 'Central Exam Hall',
    enrolledCount: 18,
    capacity: 18
  },
  {
    id: 'b-hsc-sci',
    name: 'HSC Science Comprehensive Batch',
    code: 'PAC-HSC-SCI-01',
    targetClass: 'HSC (Science)',
    instructor: 'Dr. Nusrat Jahan & Engr. Mahbubur Rahman',
    schedule: 'Sat, Mon, Wed (4:00 PM - 6:30 PM)',
    room: 'Room 201 (Science Block)',
    enrolledCount: 19,
    capacity: 22
  },
  {
    id: 'b-hsc-com',
    name: 'HSC Commerce Care Batch',
    code: 'PAC-HSC-COM-01',
    targetClass: 'HSC (Commerce)',
    instructor: 'Farhana Akhter (M.Com) & Senior Mentor',
    schedule: 'Sun, Tue, Thu (4:00 PM - 6:30 PM)',
    room: 'Room 202',
    enrolledCount: 15,
    capacity: 20
  }
];

// ─── FACULTY ────────────────────────────────────────────────────────────────

export interface AdminFaculty {
  id: string;
  name: string;
  designation: string;
  subjectExpertise: string;
  qualification: string;
  phone: string;
  email: string;
  joinDate: string;
  status: 'Active' | 'On Leave';
  photo?: string;
}

export const initialAdminFaculty: AdminFaculty[] = [
  {
    id: 'fac-0',
    name: 'Prof. Dr. Mahfuzur Rahman',
    designation: 'Principal & Founder Director',
    subjectExpertise: 'Director, Academic Leadership & Pedagogy',
    qualification: 'Ph.D. in Education (DU), Ex-Cadet College Faculty',
    phone: '+880 1711-000000',
    email: 'director@psyche.edu.bd',
    joinDate: 'Jan 01, 2018',
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-1',
    name: 'Engr. Mahbubur Rahman',
    designation: 'Senior Lecturer – Physics & Math',
    subjectExpertise: 'Physics, Higher Mathematics',
    qualification: 'B.Sc. Engg (BUET), M.Sc. (DU)',
    phone: '+880 1712-000001',
    email: 'mahbub@psyche.edu.bd',
    joinDate: 'Jan 01, 2022',
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-2',
    name: 'Dr. Tanvir Ahmed',
    designation: 'Head of Science Department',
    subjectExpertise: 'Chemistry, Biology',
    qualification: 'MBBS (DMC), Ph.D. Biochemistry (DU)',
    phone: '+880 1819-000002',
    email: 'tanvir@psyche.edu.bd',
    joinDate: 'Mar 15, 2021',
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-3',
    name: 'Dr. Nabila Chowdhury',
    designation: 'Medical Admission Specialist',
    subjectExpertise: 'Biology, Zoology, Botany',
    qualification: 'MBBS (Dhaka Medical College)',
    phone: '+880 1712-000003',
    email: 'nabila@psyche.edu.bd',
    joinDate: 'Jul 01, 2023',
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fac-4',
    name: 'A. K. M. Shamsuddin',
    designation: 'ICT & Mathematics Instructor',
    subjectExpertise: 'ICT, General Mathematics',
    qualification: 'B.Sc. CSE (RUET)',
    phone: '+880 1913-000004',
    email: 'shamsuddin@psyche.edu.bd',
    joinDate: 'Jan 10, 2023',
    status: 'Active',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
];

// ─── NOTICE BOARD ────────────────────────────────────────────────────────────

export type NoticeCategory = 'Academic' | 'Exam' | 'Holiday' | 'Fee' | 'General';
export type NoticePriority = 'Normal' | 'Urgent';
export type NoticeTarget = 'home' | 'student' | 'both';

export interface AdminNotice {
  id: string;
  title: string;
  body: string;
  category: NoticeCategory;
  priority: NoticePriority;
  target?: NoticeTarget;
  publishedBy: string;
  publishedDate: string;
}

export const initialAdminNotices: AdminNotice[] = [
  {
    id: 'notice-1',
    title: 'Mid-Term Model Test Schedule – October 2026',
    body: 'The mid-term model assessment for all batches will be held from October 5–10, 2026. Students must carry their admit cards. Hall seating plans will be posted on the notice board by October 3.',
    category: 'Exam',
    priority: 'Urgent',
    target: 'student',
    publishedBy: 'Dr. Mahfuzul Alam (Director)',
    publishedDate: 'Sep 18, 2026',
  },
  {
    id: 'notice-2',
    title: 'October Monthly Fee Collection Deadline',
    body: 'All students are requested to pay their October 2026 monthly tuition fee by October 10, 2026. Late payments will incur a fine of ৳100 per week. Please contact the accounts desk for bKash or Nagad payment details.',
    category: 'Fee',
    priority: 'Urgent',
    target: 'student',
    publishedBy: 'Accounts Office',
    publishedDate: 'Sep 19, 2026',
  },
  {
    id: 'notice-3',
    title: 'Durga Puja Holiday Notice',
    body: 'The coaching centre will remain closed from October 11–14, 2026 on the occasion of Durga Puja. Regular classes will resume from October 15, 2026 (Wednesday) as per schedule.',
    category: 'Holiday',
    priority: 'Normal',
    target: 'both',
    publishedBy: 'Dr. Mahfuzul Alam (Director)',
    publishedDate: 'Sep 17, 2026',
  },
  {
    id: 'notice-4',
    title: 'Admissions Open for SSC & HSC Board Exam Batches 2026-2027',
    body: 'Fresh enrollment is now open for upcoming SSC and HSC batches. Early registration gives tuition fee concessions and complimentary printed lecture notes.',
    category: 'Academic',
    priority: 'Urgent',
    target: 'home',
    publishedBy: 'Admission Desk',
    publishedDate: 'Sep 19, 2026',
  },
];

// ─── CLASS ROUTINE ───────────────────────────────────────────────────────────

export type WeekDay = 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface RoutineSlot {
  id: string;
  day: WeekDay;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface AdminRoutine {
  id: string;
  batchName: string;
  slots: RoutineSlot[];
}

export const initialAdminRoutines: AdminRoutine[] = [
  {
    id: 'rtn-1',
    batchName: 'Morning Elite Batch-A',
    slots: [
      { id: 'sl-1', day: 'Sunday', time: '8:00 AM – 9:30 AM', subject: 'Physics', teacher: 'Engr. Mahbubur Rahman', room: 'Hall A (Smart Lab)' },
      { id: 'sl-2', day: 'Sunday', time: '9:30 AM – 10:30 AM', subject: 'Higher Mathematics', teacher: 'Engr. Mahbubur Rahman', room: 'Hall A (Smart Lab)' },
      { id: 'sl-3', day: 'Tuesday', time: '8:00 AM – 9:30 AM', subject: 'Chemistry', teacher: 'Dr. Tanvir Ahmed', room: 'Hall A (Smart Lab)' },
      { id: 'sl-4', day: 'Tuesday', time: '9:30 AM – 10:30 AM', subject: 'Biology', teacher: 'Dr. Nabila Chowdhury', room: 'Hall A (Smart Lab)' },
      { id: 'sl-5', day: 'Thursday', time: '8:00 AM – 10:30 AM', subject: 'Model Test (All Subjects)', teacher: 'Panel', room: 'Exam Hall' },
    ],
  },
  {
    id: 'rtn-2',
    batchName: 'HSC Science Care-B',
    slots: [
      { id: 'sl-6', day: 'Saturday', time: '4:00 PM – 5:30 PM', subject: 'Physics Paper-I', teacher: 'Dr. Tanvir Ahmed', room: 'Room 201 (Science Block)' },
      { id: 'sl-7', day: 'Monday', time: '4:00 PM – 5:30 PM', subject: 'Chemistry Paper-II', teacher: 'Dr. Tanvir Ahmed', room: 'Room 201 (Science Block)' },
      { id: 'sl-8', day: 'Wednesday', time: '4:00 PM – 6:30 PM', subject: 'Higher Math & ICT', teacher: 'A. K. M. Shamsuddin', room: 'Room 201 (Science Block)' },
    ],
  },
  {
    id: 'rtn-3',
    batchName: 'Medical & Dental Biology Care',
    slots: [
      { id: 'sl-9', day: 'Friday', time: '9:00 AM – 11:00 AM', subject: 'Biology (Zoology)', teacher: 'Dr. Nabila Chowdhury', room: 'Interactive Bio Hall' },
      { id: 'sl-10', day: 'Saturday', time: '9:00 AM – 12:00 PM', subject: 'Biology (Botany) + MCQ Drill', teacher: 'Dr. Nabila Chowdhury', room: 'Interactive Bio Hall' },
    ],
  },
  {
    id: 'rtn-4',
    batchName: 'General Math & ICT Special',
    slots: [
      { id: 'sl-11', day: 'Saturday', time: '8:30 AM – 10:00 AM', subject: 'General Mathematics', teacher: 'A. K. M. Shamsuddin', room: 'Room 103 (ICT Lab)' },
      { id: 'sl-12', day: 'Monday', time: '8:30 AM – 10:00 AM', subject: 'ICT', teacher: 'A. K. M. Shamsuddin', room: 'Room 103 (ICT Lab)' },
      { id: 'sl-13', day: 'Wednesday', time: '8:30 AM – 10:30 AM', subject: 'Math Practice + Problem Solving', teacher: 'A. K. M. Shamsuddin', room: 'Room 103 (ICT Lab)' },
    ],
  },
];

// ─── CLASS ROUTINE DOCUMENTS (IMAGE & PDF) ──────────────────────────────────

export interface AdminClassRoutine {
  id: string;
  title: string;
  targetClass: string; // e.g. 'Class 8', 'Class 9 (Science)', 'Class 9 (Commerce)', 'Class 10 (Science)', 'Class 10 (Commerce)', 'SSC Special Batch', 'HSC (Science)', 'HSC (Commerce)'
  batchName?: string;
  fileType: 'image' | 'pdf';
  fileUrl: string; // base64 or URL
  fileName: string;
  fileSize?: string;
  effectiveDate?: string;
  uploadedAt: string;
  notes?: string;
}

export const normalizeClass = (className: string): string => {
  if (!className) return '';
  const trimmed = className.trim();
  const lower = trimmed.toLowerCase();

  // SSC Special Batch
  if (lower.includes('special') || lower.includes('স্পেশাল') || lower.includes('ssc special')) {
    return 'SSC Special Batch';
  }

  // Class 8
  if (lower.includes('class 8') || lower.includes('৮ম') || lower.includes('অষ্টম') || lower === '8') {
    return 'Class 8';
  }

  // Class 9 Science vs Commerce vs general
  if (lower.includes('9') || lower.includes('৯ম') || lower.includes('নবম')) {
    if (lower.includes('sci') || lower.includes('বিজ্ঞান')) return 'Class 9 (Science)';
    if (lower.includes('com') || lower.includes('বাণিজ্য') || lower.includes('ব্যবসায়')) return 'Class 9 (Commerce)';
    return 'Class 9';
  }

  // Class 10 Science vs Commerce vs general
  if (lower.includes('10') || lower.includes('১০ম') || lower.includes('দশম') || lower.includes('ssc')) {
    if (lower.includes('sci') || lower.includes('বিজ্ঞান')) return 'Class 10 (Science)';
    if (lower.includes('com') || lower.includes('বাণিজ্য') || lower.includes('ব্যবসায়')) return 'Class 10 (Commerce)';
    return 'Class 10';
  }

  // HSC Science vs Commerce vs general
  if (lower.includes('hsc') || lower.includes('এইচএসসি') || lower.includes('11') || lower.includes('12')) {
    if (lower.includes('sci') || lower.includes('বিজ্ঞান')) return 'HSC (Science)';
    if (lower.includes('com') || lower.includes('বাণিজ্য') || lower.includes('ব্যবসায়')) return 'HSC (Commerce)';
    return 'HSC';
  }

  return trimmed;
};

export const isClassMatching = (targetClass: string, studentClass: string): boolean => {
  if (!targetClass || targetClass === 'All Classes' || targetClass === 'All') return true;
  if (!studentClass) return false;

  const normTarget = normalizeClass(targetClass);
  const normStudent = normalizeClass(studentClass);

  if (normTarget === normStudent) return true;

  // General Class 9 matches both Science and Commerce
  if (normTarget === 'Class 9' && normStudent.startsWith('Class 9')) return true;
  if (normStudent === 'Class 9' && normTarget.startsWith('Class 9')) return true;

  // General Class 10 matches both Science and Commerce
  if (normTarget === 'Class 10' && normStudent.startsWith('Class 10')) return true;
  if (normStudent === 'Class 10' && normTarget.startsWith('Class 10')) return true;

  // General HSC matches both Science and Commerce
  if (normTarget === 'HSC' && normStudent.startsWith('HSC')) return true;
  if (normStudent === 'HSC' && normTarget.startsWith('HSC')) return true;

  return false;
};

export const createClassRoutineSvg = (className: string, title?: string): string => {
  const scheduleRows = [
    { day: 'Saturday', time: '8:00 AM – 9:30 AM', sub: 'General Mathematics', teacher: 'A. K. M. Shamsuddin', room: 'Hall A' },
    { day: 'Saturday', time: '9:45 AM – 11:15 AM', sub: 'General Science', teacher: 'Dr. Tanvir Ahmed', room: 'Lab 201' },
    { day: 'Sunday', time: '8:00 AM – 9:30 AM', sub: 'English 1st & 2nd Paper', teacher: 'Mrs. Farzana Haque', room: 'Hall B' },
    { day: 'Sunday', time: '9:45 AM – 11:15 AM', sub: 'ICT & Smart Computing', teacher: 'Engr. Mahbubur Rahman', room: 'ICT Lab' },
    { day: 'Tuesday', time: '8:00 AM – 9:30 AM', sub: 'Bangla & Bangladesh Studies', teacher: 'Prof. M. A. Karim', room: 'Hall A' },
    { day: 'Tuesday', time: '9:45 AM – 11:15 AM', sub: 'Special Math Problem Clinic', teacher: 'A. K. M. Shamsuddin', room: 'Hall A' },
    { day: 'Thursday', time: '8:00 AM – 10:30 AM', sub: 'Weekly Creative Model Test', teacher: 'Exam Evaluation Board', room: 'Main Exam Hall' },
  ];

  const rowsSvg = scheduleRows.map((r, i) => {
    const y = 195 + i * 54;
    const bg = i % 2 === 0 ? '#ffffff' : '#fdf2f8';
    return `
      <rect x="40" y="${y}" width="820" height="46" rx="8" fill="${bg}" stroke="#fbcfe8" stroke-width="1"/>
      <rect x="52" y="${y + 9}" width="95" height="28" rx="6" fill="#fff1f2" stroke="#fecdd3"/>
      <text x="100" y="${y + 27}" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#881337" text-anchor="middle">${r.day}</text>
      <text x="175" y="${y + 28}" font-family="system-ui, sans-serif" font-size="12" fill="#475569">${r.time}</text>
      <text x="360" y="${y + 28}" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">${r.sub}</text>
      <text x="610" y="${y + 28}" font-family="system-ui, sans-serif" font-size="12" fill="#334155">${r.teacher}</text>
      <text x="770" y="${y + 28}" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">${r.room}</text>
    `;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" width="100%" height="100%">
    <rect width="900" height="640" fill="#fff1f2"/>
    <rect x="20" y="20" width="860" height="600" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <rect x="20" y="20" width="860" height="110" rx="20" fill="#4c0519"/>
    <rect x="20" y="100" width="860" height="30" fill="#4c0519"/>
    <circle cx="70" cy="75" r="28" fill="#ffffff" fill-opacity="0.15"/>
    <text x="70" y="83" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#fbbf24" text-anchor="middle">Ψ</text>
    <text x="115" y="60" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#fbbf24" letter-spacing="2">PSYCHE ACADEMIC CARE • GEC CIRCLE, CHATTOGRAM</text>
    <text x="115" y="94" font-family="system-ui, sans-serif" font-size="24" font-weight="900" fill="#ffffff">${title || `${className} OFFICIAL ACADEMIC ROUTINE`}</text>
    <rect x="710" y="45" width="150" height="48" rx="10" fill="#881337" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="785" y="66" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#fed7aa" text-anchor="middle">TARGET CLASS</text>
    <text x="785" y="85" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#ffffff" text-anchor="middle">${className}</text>
    
    <rect x="40" y="145" width="820" height="42" rx="8" fill="#0f172a"/>
    <text x="100" y="171" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8" text-anchor="middle">DAY</text>
    <text x="175" y="171" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8">TIME PERIOD</text>
    <text x="360" y="171" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8">SUBJECT</text>
    <text x="610" y="171" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8">INSTRUCTOR</text>
    <text x="770" y="171" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8">ROOM</text>

    ${rowsSvg}

    <rect x="40" y="582" width="820" height="1" fill="#e2e8f0"/>
    <text x="40" y="605" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#64748b">Helpline: +880 1683-334080 • Web Portal: psyche.edu.bd • GEC Circle, Chattogram</text>
    <text x="860" y="605" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#881337" text-anchor="end">Official Seal: Approved by Academic Council</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const initialAdminClassRoutines: AdminClassRoutine[] = [
  {
    id: 'rtn-class-8-img',
    title: 'Class 8 Academic Routine 2026 (Morning Shift)',
    targetClass: 'Class 8',
    fileType: 'image',
    fileUrl: createClassRoutineSvg('Class 8', 'CLASS 8 ACADEMIC ROUTINE 2026'),
    fileName: 'Class-8-Academic-Routine-2026.png',
    fileSize: '420 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 20, 2026',
    notes: 'সকল শিক্ষার্থীকে সকাল ৮:০০ টার মধ্যে ক্লাসে উপস্থিত থাকতে হবে। নিয়মিত হোমওয়ার্ক ডায়েরি বহন বাধ্যতামূলক।'
  },
  {
    id: 'rtn-class-8-pdf',
    title: 'Class 8 Model Test & Monthly Exam Routine (PDF)',
    targetClass: 'Class 8',
    fileType: 'pdf',
    fileUrl: createClassRoutineSvg('Class 8', 'CLASS 8 MODEL TEST & EXAM ROUTINE (PDF)'),
    fileName: 'Class-8-Monthly-Exam-Schedule.pdf',
    fileSize: '1.2 MB',
    effectiveDate: 'October 15, 2026',
    uploadedAt: 'Sep 21, 2026',
    notes: 'অক্টোবর মাসের ১ম মডেল টেস্টের পূর্ণাঙ্গ সিলেবাস ও পরীক্ষার সময়সূচি।'
  },
  {
    id: 'rtn-class-9-sci-img',
    title: 'Class 9 Science Academic Class Routine 2026',
    targetClass: 'Class 9 (Science)',
    fileType: 'image',
    fileUrl: createClassRoutineSvg('Class 9 Science', 'CLASS 9 SCIENCE ACADEMIC ROUTINE'),
    fileName: 'Class-9-Science-Routine-2026.png',
    fileSize: '480 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 18, 2026',
    notes: 'নবম শ্রেণির বিজ্ঞান বিভাগের পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের ক্লাস শিডিউল।'
  },
  {
    id: 'rtn-class-9-com-pdf',
    title: 'Class 9 Commerce Routine & Exam Plan (PDF)',
    targetClass: 'Class 9 (Commerce)',
    fileType: 'pdf',
    fileUrl: createClassRoutineSvg('Class 9 Commerce', 'CLASS 9 COMMERCE ROUTINE (PDF)'),
    fileName: 'Class-9-Commerce-Routine.pdf',
    fileSize: '850 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 18, 2026',
    notes: 'হিসাববিজ্ঞান ও ফিন্যান্স ক্লাসের রুটিন ও সাপ্তাহিক ওয়ার্কশীট সাবমিশন ডেট।'
  },
  {
    id: 'rtn-class-10-sci-img',
    title: 'Class 10 Science Board Preparation Routine',
    targetClass: 'Class 10 (Science)',
    fileType: 'image',
    fileUrl: createClassRoutineSvg('Class 10 Science', 'CLASS 10 SCIENCE BOARD PREP ROUTINE'),
    fileName: 'Class-10-Science-Board-Routine.png',
    fileSize: '510 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 19, 2026',
    notes: 'এসএসসি বিজ্ঞান পরীক্ষার্থীদের পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের টেস্ট শিডিউল।'
  },
  {
    id: 'rtn-class-10-com-pdf',
    title: 'Class 10 Commerce Final Revision Routine (PDF)',
    targetClass: 'Class 10 (Commerce)',
    fileType: 'pdf',
    fileUrl: createClassRoutineSvg('Class 10 Commerce', 'CLASS 10 COMMERCE REVISION ROUTINE'),
    fileName: 'Class-10-Commerce-Routine.pdf',
    fileSize: '910 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 19, 2026',
    notes: 'ব্যবসায় শিক্ষা বিভাগের চূড়ান্ত প্রস্তুতি ও মডেল টেস্টের রুটিন।'
  },
  {
    id: 'rtn-ssc-sp-pdf',
    title: 'SSC Special Batch: Mega Model Test Routine (PDF)',
    targetClass: 'SSC Special Batch',
    fileType: 'pdf',
    fileUrl: createClassRoutineSvg('SSC Special', 'SSC SPECIAL BATCH MODEL TEST ROUTINE'),
    fileName: 'SSC-Special-Batch-Model-Test-Schedule.pdf',
    fileSize: '1.4 MB',
    effectiveDate: 'October 05, 2026',
    uploadedAt: 'Sep 21, 2026',
    notes: '৪০+ পূর্ণাঙ্গ বোর্ড স্ট্যান্ডার্ড মডেল টেস্টের বিষয়ভিত্তিক তারিখ ও ওএমআর শিট নির্দেশিকা।'
  },
  {
    id: 'rtn-hsc-sci-img',
    title: 'HSC Science 1st & 2nd Paper Comprehensive Routine',
    targetClass: 'HSC (Science)',
    fileType: 'image',
    fileUrl: createClassRoutineSvg('HSC Science', 'HSC SCIENCE ACADEMIC ROUTINE'),
    fileName: 'HSC-Science-Routine-2026.png',
    fileSize: '530 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 17, 2026',
    notes: 'এইচএসসি বিজ্ঞান বিভাগের পদার্থ, রসায়ন, উচ্চতর গণিত এবং জীববিজ্ঞানের ক্লাস সময়সূচি।'
  },
  {
    id: 'rtn-hsc-com-pdf',
    title: 'HSC Commerce Comprehensive Routine & Syllabus (PDF)',
    targetClass: 'HSC (Commerce)',
    fileType: 'pdf',
    fileUrl: createClassRoutineSvg('HSC Commerce', 'HSC COMMERCE ACADEMIC ROUTINE (PDF)'),
    fileName: 'HSC-Commerce-Routine-2026.pdf',
    fileSize: '970 KB',
    effectiveDate: 'October 01, 2026',
    uploadedAt: 'Sep 17, 2026',
    notes: 'হিসাববিজ্ঞান ১ম ও ২য় পত্র, ব্যবসায় সংগঠন ও ব্যবস্থাপনা ক্লাসের রুটিন।'
  }
];
