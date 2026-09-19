import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t, isBangla } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-maroon-50/70 via-slate-50 to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-wider mb-4 border border-maroon-200">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Campus Address Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">
                {t('contact.campusTitle')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('contact.campusAddress')}<br />
                {isBangla ? 'বাংলাদেশ' : 'Bangladesh'}
              </p>
              <span className="text-xs text-maroon-800 font-semibold inline-block pt-1">
                {t('contact.landmark')}
              </span>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">
                {t('contact.phoneTitle')}
              </h3>
              <p className="text-sm font-medium text-slate-700">
                {t('contact.admissionsHelpline')} <strong className="text-maroon-800">+880 1812-345678</strong>
              </p>
              <p className="text-sm text-slate-600">
                {t('contact.adminDesk')} +880 1711-223344
              </p>
              <p className="text-xs text-slate-500 pt-0.5">
                {t('contact.whatsappNote')}
              </p>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">
                {t('contact.emailTitle')}
              </h3>
              <p className="text-sm text-slate-700 font-medium">
                {isBangla ? 'সাধারণ তথ্য: ' : 'General Info: '}<span className="text-maroon-800 font-semibold">info@psyche.edu.bd</span>
              </p>
              <p className="text-sm text-slate-600">
                {isBangla ? 'ভর্তি ডেস্ক: ' : 'Admissions: '}<span className="text-maroon-800 font-semibold">admissions@psyche.edu.bd</span>
              </p>
              <p className="text-xs text-slate-500 pt-0.5">
                {t('contact.replyTime')}
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">
                {t('contact.hoursTitle')}
              </h3>
              <p className="text-sm text-slate-700">
                {t('contact.hoursDetails')}
              </p>
              <p className="text-xs text-maroon-800 font-semibold">
                {t('contact.noOffDays')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Google Maps Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 bg-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-maroon-950">
            <div className="space-y-1">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                {t('contact.mapBadge')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                {t('contact.mapHeading')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {t('contact.campusTitle')} • GEC, Chattogram
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/Psyche+Academic+care+%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A6%BF,%E0%A6%9C%E0%A6%BF%E0%A6%87%E0%A6%B8%E0%A6%BF/@22.3622348,91.8165713,17z/data=!3m1!4b1!4m6!3m5!1s0x30acd9b62c6dbe6d:0x89ba4f51cf2c9747!8m2!3d22.3622348!4d91.8191462!16s%2Fg%2F11r3m4pq47?entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t('contact.getDirections')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Live Interactive Google Map */}
          <div className="relative h-96 sm:h-[480px] w-full bg-slate-100 overflow-hidden">
            <iframe
              title="Psyche Academic care Location Map"
              src="https://maps.google.com/maps?q=22.3622348,91.8191462&hl=en&z=17&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
