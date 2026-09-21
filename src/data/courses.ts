import { Course } from '../types';

export const coursesData: Course[] = [
  // ─── 1. CLASS 8 ─────────────────────────────────────────────────────────────
  {
    id: 'class-8-foundation',
    name: 'Class 8 Junior Academic Foundation Care',
    category: 'Class 8',
    shortDescription: 'Building rock-solid basics in General Mathematics, General Science, English, and Bangla for Class 8 students.',
    fullDescription: 'Class 8 is the critical gateway to high school academic excellence. Our teachers focus on conceptual arithmetic, basic algebraic formulas, scientific phenomena, and English grammatical precision through engaging explanations, visual models, and weekly chapter-end worksheets.',
    duration: 'Full Academic Year',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 1800,
    batchSize: '20 Students max',
    targetAudience: 'Class 8 Students',
    features: [
      'Core focus on arithmetic, algebra, and geometry concepts',
      'Step-by-step textbook problem solving and formula drills',
      'Continuous weekly chapter-end quizzes & diagnostic tests',
      'Regular progress feedback reports shared directly with guardians'
    ],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'class-8-math-science',
    name: 'Class 8 Math & Science Specialist Clinic',
    category: 'Class 8',
    shortDescription: 'Intensive problem-solving, arithmetic speed drills, and visual science demonstrations tailored for Class 8.',
    fullDescription: 'Designed for students who want to conquer mathematics anxiety and comprehend science with clear visual demonstrations. Prepares junior students early for senior high school STEM readiness.',
    duration: '10 Months',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 2000,
    batchSize: '20 Students max',
    targetAudience: 'Class 8 Students',
    features: [
      'Interactive visual science concepts and geometry proofs',
      'Speed arithmetic exercises and formula memory maps',
      'Special doubt-clearing sessions every Friday morning',
      'Exclusive printed chapter practice workbooks'
    ],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 2. CLASS 9 (SCIENCE) ───────────────────────────────────────────────────
  {
    id: 'class-9-science-comprehensive',
    name: 'Class 9 Science Comprehensive Academic Care',
    category: 'Class 9 (Science)',
    shortDescription: 'In-depth coverage of Class 9 Physics, Chemistry, Biology, Higher Mathematics, and General Mathematics.',
    fullDescription: 'Transitioning into Class 9 Science introduces intricate formulas, kinematics, organic elements, and cell biology. Our engineering and university faculty guides students with textbook breakdowns, creative question (CQ) strategies, and numerical drills.',
    duration: 'Full Academic Year',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 2400,
    batchSize: '22 Students max',
    targetAudience: 'Class 9 Science Group Students',
    features: [
      'Smooth transition into 9th-grade Science curriculum',
      'Physics numerical problem solving & Higher Math vector/trigonometry mastery',
      'Chemistry formula & equation balancing workshops',
      'Bi-weekly diagnostic exams and Creative Question (CQ) coaching'
    ],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 3. CLASS 9 (COMMERCE) ──────────────────────────────────────────────────
  {
    id: 'class-9-commerce-comprehensive',
    name: 'Class 9 Commerce (Business Studies) Comprehensive Care',
    category: 'Class 9 (Commerce)',
    shortDescription: 'Mastering Accounting, Finance & Banking, Business Organization, and General Mathematics for Class 9.',
    fullDescription: 'Commerce students develop fundamental mastery of debit-credit journal entries, ledger balancing, financial institutions, and business principles. Taught by certified accounting specialists with real-world case analysis.',
    duration: 'Full Academic Year',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 2200,
    batchSize: '20 Students max',
    targetAudience: 'Class 9 Commerce Group Students',
    features: [
      'Step-by-step Accounting transaction analysis and ledger drills',
      'Finance & Banking mathematical interest and time-value formulas',
      'Creative Question (CQ) structured presentation methods',
      'Weekly practice papers with individual score reviews'
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 4. CLASS 10 (SCIENCE) ──────────────────────────────────────────────────
  {
    id: 'class-10-science-prep',
    name: 'Class 10 Science Board Preparation Care',
    category: 'Class 10 (Science)',
    shortDescription: 'Complete textbook syllabus revision, rigorous CQ dissection, and numerical mastery in Physics, Chemistry, Biology, and Higher Math.',
    fullDescription: 'Intensive academic program dedicated to Class 10 Science candidates. Focuses on completing the full board syllabus thoroughly, solving previous 10 years of board examination questions, and mastering high-yield CQ and MCQ sections under exam conditions.',
    duration: '10 Months',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 2600,
    batchSize: '22 Students max',
    targetAudience: 'Class 10 Science Students',
    features: [
      'Complete board textbook syllabus revision twice before pre-test',
      'Intensive Physics & Chemistry numerical problem sets',
      'Higher Math coordinate geometry, calculus, and trigonometry drills',
      'Board-standard CQ & MCQ test series with model solutions'
    ],
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 5. CLASS 10 (COMMERCE) ─────────────────────────────────────────────────
  {
    id: 'class-10-commerce-prep',
    name: 'Class 10 Commerce Board Preparation Care',
    category: 'Class 10 (Commerce)',
    shortDescription: 'Advanced board-oriented preparation in Accounting, Finance & Banking, Business Studies, and General Mathematics.',
    fullDescription: 'Tailored for Class 10 commerce students striving for A+ and Golden GPA 5.00 in board examinations. Comprehensive coverage of final accounts, worksheet reconciliation, capital budgeting, and structured CQ writing techniques.',
    duration: '10 Months',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 2400,
    batchSize: '20 Students max',
    targetAudience: 'Class 10 Commerce Students',
    features: [
      'Comprehensive final accounts & financial statement preparation clinic',
      'Finance & Banking formula drills and CQ problem analysis',
      'Speed calculation techniques for General Mathematics',
      'Weekly simulated board examination practice with rankings'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 6. SSC SPECIAL BATCH ───────────────────────────────────────────────────
  {
    id: 'ssc-special-elite-model-test',
    name: 'SSC Special Batch: Elite Board Model Test & CQ Mastery',
    category: 'SSC Special Batch',
    shortDescription: 'Our premier flagship intensive batch featuring 40+ board replica model tests, negative marking analysis, and top-board mentorship.',
    fullDescription: 'The definitive intensive exam-cracking program for SSC candidates aiming for board merit and Golden GPA 5.00. Strictly capped batches with personal mentoring, high-stakes simulated board environments, and line-by-line textbook review.',
    duration: '6 Months Intensive',
    classDays: 'Sat, Sun, Tue, Thu (4 Days/Week)',
    monthlyFee: 3200,
    batchSize: '18 Students (Screening Selection)',
    targetAudience: 'SSC Examinees Targeting Golden GPA 5.00',
    features: [
      'Strictly capped at 18 students per batch for individualized attention',
      '40+ Full-length board replica model exams with immediate ranking',
      'Pinpoint CQ grading by experienced board evaluators',
      'Exclusive Psyche Board Exam Suggestion & Final Model Booklet'
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ssc-special-crash-revision',
    name: 'SSC Special Batch: Final Revision Crash & MCQ Shortcut Drill',
    category: 'SSC Special Batch',
    shortDescription: 'Fast-paced revision crash program focusing on board question prediction, formula capsules, and rapid MCQ test sprints.',
    fullDescription: 'Engineered for students looking to convert weaknesses into high-scoring strengths during the final crucial months before SSC. Rapid review of high-yield chapters, model question answers, and time management coaching under exam conditions.',
    duration: '4 Months Crash',
    classDays: 'Fri, Sat, Mon, Wed (4 Days/Week)',
    monthlyFee: 3000,
    batchSize: '20 Students max',
    targetAudience: 'SSC Examinees Seeking Rapid Score Boost',
    features: [
      'Comprehensive crash revision of all compulsory and group subjects',
      'Daily 30-minute rapid MCQ sprint tests with instant answers',
      'Exam stress management and answer script presentation coaching',
      'One-to-one problem clinic every Friday'
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 7. HSC (SCIENCE) ───────────────────────────────────────────────────────
  {
    id: 'hsc-science-comprehensive',
    name: 'HSC Science Comprehensive Academic Care (1st & 2nd Paper)',
    category: 'HSC (Science)',
    shortDescription: 'Rigorous board and foundation coaching in Physics, Chemistry, Higher Mathematics, and Biology (Paper 1 & 2).',
    fullDescription: 'HSC Science demands deep conceptual comprehension, calculus application, chemical equations, and anatomical precision. Taught by BUET engineers and top university faculty to ensure outstanding HSC board GPA 5.00 results.',
    duration: 'Full Academic Cycle',
    classDays: 'Sat, Mon, Wed (3 Days/Week)',
    monthlyFee: 3200,
    batchSize: '22 Students max',
    targetAudience: 'HSC 1st & 2nd Year Science Students',
    features: [
      'Thorough coverage of NCTB textbooks for Physics, Chemistry, Math & Biology',
      'Calculus-based physics numerical mastery and organic reaction mapping',
      'Board-standard CQ writing seminars and monthly mega model tests',
      'Curated lecture notes and digital problem bank access'
    ],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
  },

  // ─── 8. HSC (COMMERCE) ──────────────────────────────────────────────────────
  {
    id: 'hsc-commerce-comprehensive',
    name: 'HSC Commerce Comprehensive Academic Care (1st & 2nd Paper)',
    category: 'HSC (Commerce)',
    shortDescription: 'Complete board preparation in Accounting, Finance, Banking & Insurance, Business Organization & Management.',
    fullDescription: 'Designed for college students striving for top marks in HSC Commerce. Deep dive into partnership accounts, company shares, cash flow statements, and financial analysis taught by qualified financial educators.',
    duration: 'Full Academic Cycle',
    classDays: 'Sun, Tue, Thu (3 Days/Week)',
    monthlyFee: 2800,
    batchSize: '20 Students max',
    targetAudience: 'HSC 1st & 2nd Year Commerce Students',
    features: [
      'In-depth practical problems on Accounting 1st & 2nd papers',
      'Finance & Banking mathematical equations and risk-return modeling',
      'Business Organization structured CQ answer formatting techniques',
      'Continuous chapter exams and board replica test series'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  }
];
