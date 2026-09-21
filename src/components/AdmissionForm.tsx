import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Printer, 
  RefreshCw,
  School,
  Hash,
  MessageCircle
} from 'lucide-react';
import { coursesData } from '../data/courses';
import { useLanguage } from '../context/LanguageContext';

interface AdmissionFormProps {
  initialCourse?: string;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ initialCourse = '' }) => {
  const { isBangla } = useLanguage();
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    phone: '',
    whatsappName: '',
    email: '',
    schoolName: '',
    schoolRoll: '',
    studentClass: '',
    course: initialCourse || '',
    address: '',
    preferredShift: 'Morning'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');

  useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = isBangla ? 'শিক্ষার্থীর নাম আবশ্যক' : 'Student name is required';
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = isBangla ? 'পিতার নাম আবশ্যক' : "Father's name is required";
    }
    if (!formData.motherName.trim()) {
      newErrors.motherName = isBangla ? 'মাতার নাম আবশ্যক' : "Mother's name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = isBangla ? 'যোগাযোগের মোবাইল নম্বর আবশ্যক' : 'Contact phone number is required';
    } else if (!/^[0-9+ -]{9,15}$/.test(formData.phone.trim())) {
      newErrors.phone = isBangla ? 'সঠিক ফোন নম্বর প্রদান করুন' : 'Please enter a valid phone number';
    }
    if (!formData.whatsappName.trim()) {
      newErrors.whatsappName = isBangla ? 'হোয়াটসঅ্যাপ নাম আবশ্যক' : 'WhatsApp name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = isBangla ? 'ইমেইল ঠিকানা আবশ্যক' : 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isBangla ? 'সঠিক ইমেইল ঠিকানা প্রদান করুন' : 'Please enter a valid email address';
    }
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = isBangla ? 'বিদ্যালয় / কলেজের নাম আবশ্যক' : 'School/College name is required';
    }
    if (!formData.schoolRoll.trim()) {
      newErrors.schoolRoll = isBangla ? 'বিদ্যালয়ের রোল নং আবশ্যক' : 'School roll is required';
    }
    if (!formData.studentClass) {
      newErrors.studentClass = isBangla ? 'শ্রেণী নির্বাচন করুন' : 'Please select the student class';
    }
    if (!formData.course) {
      newErrors.course = isBangla ? 'কোর্স নির্বাচন করুন' : 'Please select the desired course/program';
    }
    if (!formData.address.trim()) {
      newErrors.address = isBangla ? 'বর্তমান ঠিকানা আবশ্যক' : 'Residential address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const generatedId = `PAC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(generatedId);
      setSubmissionDate(new Date().toLocaleDateString(isBangla ? 'bn-BD' : 'en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }));

      try {
        const saved = localStorage.getItem('pschye_admin_applications');
        const list = saved ? JSON.parse(saved) : [];
        const newApp = {
          id: generatedId,
          studentName: formData.studentName.trim(),
          fatherName: formData.fatherName.trim(),
          motherName: formData.motherName.trim(),
          phone: formData.phone.trim(),
          whatsappName: formData.whatsappName.trim(),
          email: formData.email.trim(),
          studentClass: formData.studentClass,
          course: formData.course,
          previousSchool: formData.schoolName.trim(),
          schoolRoll: formData.schoolRoll.trim(),
          preferredShift: formData.preferredShift || 'Morning',
          submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          status: 'Pending'
        };
        localStorage.setItem('pschye_admin_applications', JSON.stringify([newApp, ...list]));
      } catch (err) {
        console.error(err);
      }

      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      fatherName: '',
      motherName: '',
      phone: '',
      whatsappName: '',
      email: '',
      schoolName: '',
      schoolRoll: '',
      studentClass: '',
      course: '',
      address: '',
      preferredShift: 'Morning'
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-maroon-200 p-8 sm:p-12 shadow-xl max-w-3xl mx-auto text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center mx-auto mb-6 ring-8 ring-maroon-50/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-maroon-50 text-maroon-800 border border-maroon-200 mb-3">
          {isBangla ? 'আবেদন গৃহীত হয়েছে' : 'Application Received'}
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isBangla ? 'ভর্তি আবেদন সফলভাবে সম্পন্ন হয়েছে!' : 'Admission Application Submitted Successfully!'}
        </h3>

        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {isBangla
            ? 'সাইকি একাডেমিক কেয়ারে আবেদন করার জন্য ধন্যবাদ। আমাদের প্রতিনিধি আগামী ২৪ ঘণ্টার মধ্যে আপনার সাথে ফোনে যোগাযোগ করবেন।'
            : 'Thank you for applying to PSYCHE Academic Care. Our academic counselor will review the details and reach out via phone or email within 24 hours.'}
        </p>

        {/* Application Summary Card */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-left max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs text-slate-500 font-medium">
              {isBangla ? 'আবেদন রেফারেন্স নম্বর:' : 'Application Reference ID:'}
            </span>
            <span className="text-sm font-black text-maroon-800 tracking-wider">{applicationId}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <span className="text-slate-500 block">{isBangla ? 'শিক্ষার্থীর নাম:' : 'Applicant Name:'}</span>
              <span className="font-bold text-slate-800 text-sm">{formData.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isBangla ? 'শ্রেণী ও রোল:' : 'Class & Roll:'}</span>
              <span className="font-bold text-slate-800 text-sm">{formData.studentClass} (রোল: {formData.schoolRoll})</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isBangla ? 'বিদ্যালয়:' : 'School:'}</span>
              <span className="font-bold text-slate-800 text-sm truncate block">{formData.schoolName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isBangla ? 'হোয়াটসঅ্যাপ নাম:' : 'WhatsApp Name:'}</span>
              <span className="font-bold text-slate-800 text-sm truncate block">{formData.whatsappName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isBangla ? 'নির্বাচিত প্রোগ্রাম:' : 'Enrolled Program:'}</span>
              <span className="font-bold text-slate-800 text-sm truncate block">{formData.course}</span>
            </div>
            <div>
              <span className="text-slate-500 block">{isBangla ? 'আবেদনের তারিখ:' : 'Submission Date:'}</span>
              <span className="font-bold text-slate-800 text-sm">{submissionDate}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isBangla ? 'আবেদন রশিদ প্রিন্ট করুন' : 'Print Application Receipt'}</span>
          </button>
          <button
            onClick={resetForm}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer border-b-2 border-maroon-500"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isBangla ? 'আরেকটি আবেদন করুন' : 'Submit Another Application'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
      <div className="mb-8 pb-6 border-b border-slate-100">
        <h3 className="text-2xl font-bold text-slate-900">
          {isBangla ? 'শিক্ষার্থী ভর্তি ফরম' : 'Student Admission Form'}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {isBangla 
            ? 'সাইকি একাডেমিক কেয়ারে ভর্তির জন্য নিচের তথ্যগুলো পূরণ করুন' 
            : 'Fill in the information below to enroll at PSYCHE Academic Care'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Name */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-maroon-700" />
            <span>{isBangla ? 'শিক্ষার্থীর নাম *' : 'Student Name *'}</span>
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder={isBangla ? 'যেমন: মাহির ফয়সাল' : 'e.g. Mahir Faysal'}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.studentName 
                ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
            }`}
          />
          {errors.studentName && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.studentName}
            </p>
          )}
        </div>

        {/* Parents' Names Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              {isBangla ? 'পিতার নাম *' : "Father's Name *"}
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder={isBangla ? 'পিতার পূর্ণ নাম' : "Father's full name"}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.fatherName 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            />
            {errors.fatherName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.fatherName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
              {isBangla ? 'মাতার নাম *' : "Mother's Name *"}
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder={isBangla ? 'মাতার পূর্ণ নাম' : "Mother's full name"}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.motherName 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            />
            {errors.motherName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.motherName}
              </p>
            )}
          </div>
        </div>

        {/* Contact Phone & WhatsApp Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-maroon-700" />
              <span>{isBangla ? 'যোগাযোগের মোবাইল নম্বর *' : 'Contact Phone Number *'}</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={isBangla ? 'যেমন: ০১৭১২-৩৪৫৬৭৮' : 'e.g. +880 1712-345678'}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.phone 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBangla ? 'হোয়াটসঅ্যাপ নাম *' : 'WhatsApp Name *'}</span>
            </label>
            <input
              type="text"
              name="whatsappName"
              value={formData.whatsappName}
              onChange={handleChange}
              placeholder={isBangla ? 'যেমন: মাহির ফয়সাল' : 'e.g. Mahir Faysal'}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.whatsappName 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            />
            {errors.whatsappName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.whatsappName}
              </p>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-maroon-700" />
            <span>{isBangla ? 'ইমেইল ঠিকানা *' : 'Email Address *'}</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="guardian.email@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.email 
                ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* School Name & School Roll Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-maroon-700" />
              <span>{isBangla ? 'বিদ্যালয় / কলেজের নাম *' : 'School / College Name *'}</span>
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder={isBangla ? 'যেমন: চট্টগ্রাম কলেজিয়েট স্কুল' : 'e.g. Chittagong Collegiate School'}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.schoolName 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            />
            {errors.schoolName && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.schoolName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-maroon-700" />
              <span>{isBangla ? 'বিদ্যালয়ের রোল নং *' : 'School Roll *'}</span>
            </label>
            <input
              type="text"
              name="schoolRoll"
              value={formData.schoolRoll}
              onChange={handleChange}
              placeholder={isBangla ? 'যেমন: ১২' : 'e.g. 12'}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.schoolRoll 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            />
            {errors.schoolRoll && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.schoolRoll}
              </p>
            )}
          </div>
        </div>

        {/* Academic Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-maroon-700" />
              <span>{isBangla ? 'শিক্ষার্থীর শ্রেণী *' : 'Student Class *'}</span>
            </label>
            <select
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.studentClass 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            >
              <option value="">{isBangla ? 'শ্রেণী নির্বাচন করুন' : 'Select Student Class'}</option>
              <option value="Class 8">{isBangla ? '৮ম শ্রেণি (Class 8)' : 'Class 8'}</option>
              <option value="Class 9 (Science)">{isBangla ? '৯ম শ্রেণি - বিজ্ঞান (Class 9 Science)' : 'Class 9 (Science)'}</option>
              <option value="Class 9 (Commerce)">{isBangla ? '৯ম শ্রেণি - ব্যবসায় শিক্ষা (Class 9 Commerce)' : 'Class 9 (Commerce)'}</option>
              <option value="Class 10 (Science)">{isBangla ? '১০ম শ্রেণি - বিজ্ঞান (Class 10 Science)' : 'Class 10 (Science)'}</option>
              <option value="Class 10 (Commerce)">{isBangla ? '১০ম শ্রেণি - ব্যবসায় শিক্ষা (Class 10 Commerce)' : 'Class 10 (Commerce)'}</option>
              <option value="SSC Special Batch">{isBangla ? 'এসএসসি স্পেশাল ব্যাচ (SSC Special Batch)' : 'SSC Special Batch'}</option>
              <option value="HSC (Science)">{isBangla ? 'এইচএসসি - বিজ্ঞান (HSC Science)' : 'HSC (Science)'}</option>
              <option value="HSC (Commerce)">{isBangla ? 'এইচএসসি - ব্যবসায় শিক্ষা (HSC Commerce)' : 'HSC (Commerce)'}</option>
            </select>
            {errors.studentClass && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.studentClass}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-maroon-700" />
              <span>{isBangla ? 'কাঙ্ক্ষিত কোর্স / প্রোগ্রাম *' : 'Target Course / Program *'}</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.course 
                  ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                  : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
              }`}
            >
              <option value="">{isBangla ? 'কোর্স নির্বাচন করুন' : 'Select a Course'}</option>
              {coursesData.map(c => (
                <option key={c.id} value={c.name}>
                  {c.name} (৳{c.monthlyFee}/{isBangla ? 'মাস' : 'mo'})
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.course}
              </p>
            )}
          </div>
        </div>

        {/* Residential Address */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-maroon-700" />
            <span>{isBangla ? 'বর্তমান ঠিকানা *' : 'Present Residential Address *'}</span>
          </label>
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            placeholder={isBangla ? 'বাড়ি/বাসা নং, সড়ক, এলাকা, থানা/শহর' : 'House/Apartment, Road, Area, City'}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.address 
                ? 'border-red-300 focus:ring-red-200 bg-red-50/20' 
                : 'border-slate-200 focus:border-maroon-600 focus:ring-maroon-100 bg-slate-50/30'
            }`}
          />
          {errors.address && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.address}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer border-b-2 border-maroon-500"
          >
            <span>{isBangla ? 'আবেদন জমা দিন' : 'Submit Application'}</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-xs text-slate-500 mt-3">
            {isBangla
              ? 'এই ফরমটি জমা দেওয়ার মাধ্যমে আপনি সম্মত হচ্ছেন যে সাইকি অ্যাকাডেমিক কেয়ার ভর্তির যাচাইয়ের জন্য আপনার সাথে যোগাযোগ করতে পারবে।'
              : 'By submitting this form, you acknowledge that PSYCHE Academic Care will process the details for enrollment consultation.'}
          </p>
        </div>
      </form>
    </div>
  );
};
