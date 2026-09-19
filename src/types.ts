export interface Course {
  id: string;
  name: string;
  category: 'Class 8' | 'Class 9' | 'Class 10' | 'Class 10 Special Batch';
  shortDescription: string;
  fullDescription: string;
  duration: string;
  classDays: string;
  monthlyFee: number;
  batchSize: string;
  targetAudience: string;
  features: string[];
  image: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: string;
  shortBio: string;
  photo: string;
  specialty: string;
  rating: number;
  classesHandled: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admission Notice' | 'Exam Notice' | 'Holiday Notice' | 'Result Publication' | 'Important Announcement';
  shortDescription: string;
  content: string;
  isUrgent?: boolean;
}

export interface StudentResult {
  id: string;
  studentName: string;
  studentClass: string;
  gpa: string;
  marks: string;
  year: number;
  position: string;
  institution: string;
  examType: string;
  photo: string;
  testimonial?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  achievement: string;
  content: string;
  photo: string;
  rating: number;
}
