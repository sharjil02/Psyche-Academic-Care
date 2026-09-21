import { Course } from '../types';

export const coursesData: Course[] = [
  // CLASS 8
  {
    id: 'class-8-foundation',
    name: 'Class 8 Junior Foundation Care',
    category: 'Class 8',
    shortDescription: 'Building rock-solid basics in General Mathematics, General Science, and English for Class 8 students.',
    fullDescription: 'Class 8 is the stepping stone for high school academic excellence. Our teachers focus on conceptual arithmetic, basic algebraic formulas, scientific phenomena, and English grammatical precision through engaging explanations and weekly worksheets.',
    duration: 'Full Academic Year',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 1800,
    batchSize: '20 Students max',
    targetAudience: 'Class 8 Students',
    features: [
      'Core focus on arithmetic, algebra, and geometry concepts',
      'Step-by-step textbook problem solving',
      'Continuous weekly chapter-end quizzes',
      'Regular progress feedback reports shared with guardians'
    ],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'class-8-math-science',
    name: 'Class 8 Math & Science Specialist Care',
    category: 'Class 8',
    shortDescription: 'Intensive problem-solving and visual science experiments clinic tailored for Class 8 curriculums.',
    fullDescription: 'Designed for students who want to master mathematics without fear and understand science with hands-on visual demonstrations. Perfect for preparing early for future high school competitive readiness.',
    duration: '10 Months',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 2000,
    batchSize: '20 Students max',
    targetAudience: 'Class 8 Students',
    features: [
      'Interactive visual science concepts and geometry proofs',
      'Speed arithmetic exercises and formula drills',
      'Special doubt-clearing sessions on Fridays',
      'Free printed chapter practice workbooks'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },

  // CLASS 9
  {
    id: 'class-9-comprehensive',
    name: 'Class 9 Comprehensive Academic Care',
    category: 'Class 9',
    shortDescription: 'In-depth coverage of Class 9 syllabus for Science, Business Studies, and Humanities groups.',
    fullDescription: 'Transitioning to Class 9 introduces brand-new subjects and complex theories. Our expert faculty guides students through Physics, Chemistry, Biology, Higher Math, Accounting, and General Math with clarity and structured daily assignments.',
    duration: 'Full Academic Year',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 2200,
    batchSize: '25 Students max',
    targetAudience: 'Class 9 Students',
    features: [
      'Smooth transition into 9th-grade syllabus breakdown',
      'Bi-weekly diagnostic exams and chapter revisions',
      'Creative Question (CQ) answer writing technique coaching',
      'Individual weak-point counseling sessions'
    ],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'class-9-higher-math-physics',
    name: 'Class 9 Higher Math & Physics Foundation',
    category: 'Class 9',
    shortDescription: 'Specialized clinic focused on solving challenging Higher Math identities and Physics numerical problems.',
    fullDescription: 'Master vectors, kinematics, Newton’s laws of motion, coordinate geometry, and trigonometry from the very beginning of Class 9. Eliminates high school physics/math panic early.',
    duration: '10 Months',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 2400,
    batchSize: '20 Students max',
    targetAudience: 'Class 9 Science Group Students',
    features: [
      'Deep mathematical proofs and physics numerical drills',
      'Classroom exercise breakdowns with shortcut methods',
      'Weekly CQ written evaluations graded with board standards',
      'Exclusive Psyche curated lecture sheets'
    ],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
  },

  // CLASS 10
  {
    id: 'class-10-regular',
    name: 'Class 10 Regular Academic & Board Prep Care',
    category: 'Class 10',
    shortDescription: 'Complete preparation program covering full textbook syllabus revision and standard board questions.',
    fullDescription: 'The regular Class 10 academic care covers textbook revisions, creative question dissection, and structured weekly assessments to make sure students are steady and confident for the upcoming SSC board examinations.',
    duration: '10 Months',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 2500,
    batchSize: '25 Students max',
    targetAudience: 'Class 10 (SSC Candidates)',
    features: [
      'Full textbook syllabus revision twice before pre-test',
      'Board-standard CQ & MCQ practice papers',
      'Printed lecture summaries and formula charts',
      'Personal progress evaluation with parent meetings'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'class-10-science-trio',
    name: 'Class 10 Physics, Chemistry & Higher Math Care',
    category: 'Class 10',
    shortDescription: 'Advanced problem solving and theoretical mastery for the three toughest SSC science subjects.',
    fullDescription: 'Dedicated to SSC science examinees. Intensive drill on electricity, magnetism, chemical bonding, organic chemistry, trigonometry, and calculus basics taught by seasoned engineer instructors.',
    duration: '8 Months',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 2800,
    batchSize: '22 Students max',
    targetAudience: 'Class 10 Science Group Students',
    features: [
      'High-frequency CQ test question dissection',
      'MCQ accuracy and time-budgeting masterclasses',
      'One-to-one problem clinic every weekend',
      'Board question analysis of past 10 years'
    ],
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
  },

  // CLASS 10 SPECIAL BATCH
  {
    id: 'class-10-special-elite',
    name: 'Class 10 Special Batch: Elite Board Model Test & CQ Mastery',
    category: 'Class 10 Special Batch',
    shortDescription: 'Exclusive high-achiever batch designed specifically for scoring Golden GPA 5.00 in SSC examinations.',
    fullDescription: 'Our premier flagship program for Class 10 candidates. Highly rigorous, featuring 40+ full-length board simulated exams, negative marking corrections, pinpoint CQ grading by top board evaluators, and personal mentorship.',
    duration: '6 Months Intensive',
    classDays: 'Sat, Sun, Tue, Thu (4 Days/Week)',
    monthlyFee: 3200,
    batchSize: '18 Students (Screening Selection)',
    targetAudience: 'Class 10 Students Targeting GPA 5.00 & Board Merit',
    features: [
      'Strictly capped at 18 students per batch for focused attention',
      '40+ Full-length board replica model exams with ranking',
      'Line-by-line textbook review and tricky MCQ shortcuts',
      'Personal mentorship by Engr. Mahbubur & Dr. Tanvir'
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'class-10-special-crash',
    name: 'Class 10 Special Batch: Final Revision & MCQ Shortcut Drill',
    category: 'Class 10 Special Batch',
    shortDescription: 'Fast-paced revision crash program focusing on board question prediction, formula capsules, and mock exams.',
    fullDescription: 'Engineered for students looking to convert weaknesses into strengths during the final months before SSC. Rapid review of high-yield chapters, model question answers, and time management coaching under exam conditions.',
    duration: '4 Months Crash',
    classDays: 'Fri, Sat, Mon, Wed (4 Days/Week)',
    monthlyFee: 3000,
    batchSize: '20 Students max',
    targetAudience: 'Class 10 SSC Candidates',
    features: [
      'Comprehensive crash revision of all compulsory subjects',
      'Exclusive Psyche Suggestion & Final Model Question booklet',
      'Daily 30-minute rapid MCQ sprint tests with instant results',
      'Stress management and test-day presentation strategies'
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  }
];
