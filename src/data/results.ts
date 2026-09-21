import { StudentResult, Testimonial } from '../types';

export const resultsData: StudentResult[] = [
  {
    id: 'res-01',
    studentName: 'Arafat Rahman Siddiqui',
    studentClass: 'HSC Examination',
    gpa: 'GPA 5.00 (Golden)',
    marks: '1182 / 1200',
    year: 2026,
    position: '1st in Dhaka Board Merit List',
    institution: 'Notre Dame College',
    examType: 'HSC Science',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
    testimonial: 'The rigorous model tests and formula clinics at Psyche Academic Care made the actual board exam feel completely natural and stress-free.'
  },
  {
    id: 'res-02',
    studentName: 'Tasnim Mehzabin',
    studentClass: 'Medical Admission Test',
    gpa: 'Rank #24 (National)',
    marks: '89.75 / 100',
    year: 2026,
    position: 'Admitted to Dhaka Medical College (DMC)',
    institution: 'Viqarunnisa Noon College',
    examType: 'Medical Entrance',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
    testimonial: 'Dr. Khorshed sir and Dr. Nusrat maam taught biology and organic chemistry in a way that I never had to memorize blindly.'
  },
  {
    id: 'res-03',
    studentName: 'Zubair Hossain Fahim',
    studentClass: 'SSC Examination',
    gpa: 'GPA 5.00 (Golden)',
    marks: '1190 / 1200',
    year: 2026,
    position: 'Board 3rd Rank',
    institution: 'Dhaka Residential Model College',
    examType: 'SSC Science',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    testimonial: 'The regular mock exams and personalized feedback identified my weak points in Higher Math within weeks.'
  },
  {
    id: 'res-04',
    studentName: 'Sadia Afreen Chowdhury',
    studentClass: 'BUET Admission Test',
    gpa: 'Merit #62',
    marks: 'Top 1% Percentile',
    year: 2025,
    position: 'Admitted to CSE, BUET',
    institution: 'Holy Cross College',
    examType: 'Engineering Entrance',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    testimonial: 'Engr. Mahbubur sir’s analytical shortcut methods gave me the crucial speed boost needed for the BUET admission exam.'
  },
  {
    id: 'res-05',
    studentName: 'Nabil Hasan',
    studentClass: 'HSC Examination',
    gpa: 'GPA 5.00 (Golden)',
    marks: '1165 / 1200',
    year: 2025,
    position: '5th in Board Merit',
    institution: 'Dhaka College',
    examType: 'HSC Science',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=500&q=80',
    testimonial: 'Psyche Academic Care was the turning point in my academic life. The teachers are always available for consultation.'
  },
  {
    id: 'res-06',
    studentName: 'Maliha Tabassum',
    studentClass: 'SSC Examination',
    gpa: 'GPA 5.00 (Golden)',
    marks: '1178 / 1200',
    year: 2025,
    position: '8th in Board Merit',
    institution: 'Ideal School & College',
    examType: 'SSC Science',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    testimonial: 'The calm, encouraging environment and structured study plans kept me completely focused throughout my Class 10 year.'
  },
  {
    id: 'res-07',
    studentName: 'Raihan Kabir',
    studentClass: 'HSC Business Studies',
    gpa: 'GPA 5.00',
    marks: '1140 / 1200',
    year: 2025,
    position: 'Board 2nd in Commerce',
    institution: 'Govt. Commerce College',
    examType: 'HSC Commerce',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    testimonial: 'Accounting principles became second nature thanks to Farhana Maam’s crystal clear lectures and mock sheets.'
  },
  {
    id: 'res-08',
    studentName: 'Anika Farzana',
    studentClass: 'Class 8 Junior Scholarship',
    gpa: 'GPA 5.00',
    marks: 'General Grade Talentpool',
    year: 2024,
    position: 'District 1st Position',
    institution: 'Viqarunnisa Noon School',
    examType: 'Junior Scholarship',
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=500&q=80',
    testimonial: 'Psyche helped me build solid basics in math and science when I was just starting out in Class 7.'
  }
];

export const statisticsOverview = {
  totalStudentsTaught: '12,500+',
  gpa5Percentage: '96.4%',
  universityEnrollments: '3,200+',
  medicalAndEngineeringPlacements: '1,450+',
  overallSuccessRate: '98.2%',
  experiencedFaculty: '25+'
};

export const testimonialsData: Testimonial[] = [
  {
    id: 't-01',
    name: 'Mrs. Selina Parveen',
    role: 'Guardian of SSC Candidate (2026)',
    achievement: 'Son secured GPA 5.00 (Golden)',
    content: 'As a working mother, I was worried about my son’s preparation. Psyche Academic Care provided regular SMS attendance updates, weekly test progress, and caring mentors who treated him like family.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 't-02',
    name: 'Arafat Rahman Siddiqui',
    role: 'HSC Batch Topper (1st Dhaka Board)',
    achievement: 'GPA 5.00 | Admitted to BUET',
    content: 'The depth of problem sets and model tests at Psyche is unmatched. They do not just teach you how to pass; they train you to think critically like an engineer or scientist from day one.',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 't-03',
    name: 'Engr. Kamal Hossain',
    role: 'Guardian of Medical Aspirant',
    achievement: 'Daughter admitted to DMC',
    content: 'The faculty’s commitment at Psyche Academic Care is truly commendable. The doubt-clearing labs and disciplined testing environment gave my daughter the poise she needed for medical entrance exams.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 't-04',
    name: 'Sadia Afreen Chowdhury',
    role: 'BUET CSE Student (Alumna)',
    achievement: 'BUET Rank #62',
    content: 'From Class 9 until my admission exams, Psyche was my second home. The faculty taught with tremendous patience and never hesitated to explain concepts multiple times until I mastered them.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
];
