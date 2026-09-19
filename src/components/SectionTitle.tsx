import React from 'react';

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badgeColor?: 'maroon' | 'rose' | 'blue' | 'emerald';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  description,
  align = 'center',
  badgeColor = 'maroon'
}) => {
  const isCenter = align === 'center';

  const getBadgeClasses = () => {
    switch (badgeColor) {
      case 'rose':
        return {
          container: 'bg-rose-50 text-maroon-700 border border-rose-200',
          dot: 'bg-rose-500'
        };
      case 'maroon':
      default:
        return {
          container: 'bg-maroon-50 text-maroon-800 border border-maroon-200',
          dot: 'bg-maroon-700'
        };
    }
  };

  const badgeStyle = getBadgeClasses();

  return (
    <div className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3 ${badgeStyle.container}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`}></span>
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
