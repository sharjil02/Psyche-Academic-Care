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
  email: string;
  studentClass: string;
  course: string;
  previousSchool: string;
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
    batch: 'Morning Elite Batch-A',
    currentClass: 'Class 10 (SSC)',
    phone: '+880 1822-112233',
    guardianName: 'Md. Jahangir Alam',
    guardianPhone: '+880 1711-998877',
    monthlyFee: 2500,
    status: 'Active',
    enrolledDate: 'Jan 12, 2026'
  },
  {
    id: 's3',
    name: 'Zubair Hossain',
    studentId: 'PAC-2026-8844',
    batch: 'HSC Science Care-B',
    currentClass: 'Class 12 (HSC)',
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
    batch: 'Medical & Dental Biology Care',
    currentClass: 'HSC Passed / Admission',
    phone: '+880 1724-556677',
    guardianName: 'Mrs. Selina Begum',
    guardianPhone: '+880 1923-445511',
    monthlyFee: 3500,
    status: 'Active',
    enrolledDate: 'Feb 15, 2026'
  },
  {
    id: 's5',
    name: 'Arafat Karim',
    studentId: 'PAC-2026-8846',
    batch: 'General Math & ICT Special',
    currentClass: 'Class 9',
    phone: '+880 1625-778899',
    guardianName: 'Kabir Ahmed',
    guardianPhone: '+880 1714-332211',
    monthlyFee: 2200,
    status: 'On Leave',
    enrolledDate: 'Mar 01, 2026'
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
    studentClass: 'Class 11',
    course: 'HSC Science & Commerce Care',
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
    studentClass: 'Class 9',
    course: 'Junior Secondary Foundation (Class 8 & 9)',
    previousSchool: 'St. Joseph Higher Secondary',
    preferredShift: 'Morning',
    submissionDate: 'Sep 14, 2026',
    status: 'Approved'
  }
];

export const initialAdminBatches: BatchInfo[] = [
  {
    id: 'b1',
    name: 'Morning Elite Batch-A',
    code: 'PAC-SSC-M-01',
    targetClass: 'Class 10 (SSC 2026)',
    instructor: 'Engr. Mahbubur Rahman & Dr. Tanvir',
    schedule: 'Sun, Tue, Thu (8:00 AM - 10:30 AM)',
    room: 'Hall A (Smart Lab)',
    enrolledCount: 22,
    capacity: 25
  },
  {
    id: 'b2',
    name: 'HSC Science Care-B',
    code: 'PAC-HSC-SCI-02',
    targetClass: 'Class 11 & 12 (HSC)',
    instructor: 'Dr. Tanvir Ahmed & A. K. M. Shamsuddin',
    schedule: 'Sat, Mon, Wed (4:00 PM - 6:30 PM)',
    room: 'Room 201 (Science Block)',
    enrolledCount: 18,
    capacity: 20
  },
  {
    id: 'b3',
    name: 'Medical & Dental Biology Care',
    code: 'PAC-MED-BIO-03',
    targetClass: 'HSC 2nd Year & Admission',
    instructor: 'Dr. Nabila Chowdhury (MBBS, DMC)',
    schedule: 'Friday & Saturday (9:00 AM - 12:00 PM)',
    room: 'Interactive Bio Hall',
    enrolledCount: 24,
    capacity: 25
  },
  {
    id: 'b4',
    name: 'General Math & ICT Special',
    code: 'PAC-JSC-ICT-04',
    targetClass: 'Class 8 & 9',
    instructor: 'A. K. M. Shamsuddin',
    schedule: 'Sat, Mon, Wed (8:30 AM - 10:30 AM)',
    room: 'Room 103 (ICT Computer Lab)',
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
    id: 'fac-1',
    name: 'Engr. Mahbubur Rahman',
    designation: 'Senior Lecturer – Physics & Math',
    subjectExpertise: 'Physics, Higher Mathematics',
    qualification: 'B.Sc. Engg (BUET), M.Sc. (DU)',
    phone: '+880 1712-000001',
    email: 'mahbub@pschye.edu.bd',
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
    email: 'tanvir@pschye.edu.bd',
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
    email: 'nabila@pschye.edu.bd',
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
    email: 'shamsuddin@pschye.edu.bd',
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
