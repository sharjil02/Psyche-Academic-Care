import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Teacher, 
  Notice, 
  Student, 
  AdmissionApplication, 
  ExamResult, 
  FeeInvoice, 
  Batch 
} from '../types';
import { 
  teachers as initialTeachers, 
  notices as initialNotices, 
  students as initialStudents, 
  admissionApplications as initialApplications,
  examResults as initialResults,
  feeInvoices as initialInvoices,
  batches as initialBatches,
  classRoutine as initialRoutine
} from '../data/mockData';

export interface RoutineItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  batch?: string;
  date?: string;
  topics?: string;
}

interface DataContextType {
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  deleteTeacher: (id: string) => void;

  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;

  routine: RoutineItem[];
  addRoutineItem: (item: Omit<RoutineItem, 'id'>) => void;
  deleteRoutineItem: (id: string) => void;

  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  addStudent: (student: Student) => void;

  batches: Batch[];
  setBatches: React.Dispatch<React.SetStateAction<Batch[]>>;

  applications: AdmissionApplication[];
  setApplications: React.Dispatch<React.SetStateAction<AdmissionApplication[]>>;

  results: ExamResult[];
  setResults: React.Dispatch<React.SetStateAction<ExamResult[]>>;
  addResult: (result: ExamResult) => void;

  invoices: FeeInvoice[];
  setInvoices: React.Dispatch<React.SetStateAction<FeeInvoice[]>>;
  addInvoice: (invoice: FeeInvoice) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to localStorage for key ${key}`, error);
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teachers, setTeachersState] = useState<Teacher[]>(() => 
    loadFromStorage('psyche_teachers', initialTeachers)
  );

  const [notices, setNoticesState] = useState<Notice[]>(() => 
    loadFromStorage('psyche_notices', initialNotices)
  );

  const [routine, setRoutineState] = useState<RoutineItem[]>(() => 
    loadFromStorage('psyche_routine', initialRoutine as RoutineItem[])
  );

  const [students, setStudents] = useState<Student[]>(() => 
    loadFromStorage('psyche_students', initialStudents)
  );

  const [batches, setBatches] = useState<Batch[]>(() => 
    loadFromStorage('psyche_batches', initialBatches)
  );

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => 
    loadFromStorage('psyche_applications', initialApplications)
  );

  const [results, setResults] = useState<ExamResult[]>(() => 
    loadFromStorage('psyche_results', initialResults)
  );

  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => 
    loadFromStorage('psyche_invoices', initialInvoices)
  );

  useEffect(() => saveToStorage('psyche_teachers', teachers), [teachers]);
  useEffect(() => saveToStorage('psyche_notices', notices), [notices]);
  useEffect(() => saveToStorage('psyche_routine', routine), [routine]);
  useEffect(() => saveToStorage('psyche_students', students), [students]);
  useEffect(() => saveToStorage('psyche_batches', batches), [batches]);
  useEffect(() => saveToStorage('psyche_applications', applications), [applications]);
  useEffect(() => saveToStorage('psyche_results', results), [results]);
  useEffect(() => saveToStorage('psyche_invoices', invoices), [invoices]);

  const addTeacher = (newTeacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...newTeacherData,
      id: `t_${Date.now()}`
    };
    setTeachersState(prev => [newTeacher, ...prev]);
  };

  const deleteTeacher = (id: string) => {
    setTeachersState(prev => prev.filter(t => t.id !== id));
  };

  const addNotice = (newNoticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...newNoticeData,
      id: `n_${Date.now()}`
    };
    setNoticesState(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNoticesState(prev => prev.filter(n => n.id !== id));
  };

  const addRoutineItem = (newRoutineData: Omit<RoutineItem, 'id'>) => {
    const newItem: RoutineItem = {
      ...newRoutineData,
      id: `r_${Date.now()}`
    };
    setRoutineState(prev => [...prev, newItem]);
  };

  const deleteRoutineItem = (id: string) => {
    setRoutineState(prev => prev.filter(r => r.id !== id));
  };

  const addStudent = (student: Student) => {
    setStudents(prev => [student, ...prev]);
  };

  const addResult = (result: ExamResult) => {
    setResults(prev => [result, ...prev]);
  };

  const addInvoice = (invoice: FeeInvoice) => {
    setInvoices(prev => [invoice, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      teachers,
      addTeacher,
      deleteTeacher,
      notices,
      addNotice,
      deleteNotice,
      routine,
      addRoutineItem,
      deleteRoutineItem,
      students,
      setStudents,
      addStudent,
      batches,
      setBatches,
      applications,
      setApplications,
      results,
      setResults,
      addResult,
      invoices,
      setInvoices,
      addInvoice
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
