import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  showText?: boolean;
}

export const PsycheLogo: React.FC<LogoProps> = ({ 
  className = "w-12 h-12", 
  variant = 'full',
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${showText ? '' : ''}`}>
      <svg
        viewBox="0 0 300 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Psyche Academic Care Logo"
      >
        {/* Definition of curved text path along top circle */}
        <defs>
          <path
            id="psycheTopArc"
            d="M 46,130 A 104,104 0 1,1 254,130"
            fill="none"
          />
        </defs>

        {/* Outer Circular Band */}
        <circle cx="150" cy="130" r="115" stroke="currentColor" strokeWidth="8" fill="none" />
        <circle cx="150" cy="130" r="88" stroke="currentColor" strokeWidth="3" fill="none" />

        {/* Arc Text: PSYCHE ACADEMIC CARE */}
        <text className="select-none font-sans font-black uppercase tracking-[0.22em] text-[15px]" fill="currentColor">
          <textPath href="#psycheTopArc" startOffset="50%" textAnchor="middle">
            PSYCHE ACADEMIC CARE
          </textPath>
        </text>

        {/* Quadrant dividing crosshair */}
        <line x1="62" y1="130" x2="238" y2="130" stroke="currentColor" strokeWidth="2.5" />
        <line x1="150" y1="42" x2="150" y2="218" stroke="currentColor" strokeWidth="2.5" />

        {/* Central 4-pointed sparkle diamond cutout */}
        <path
          d="M 150,118 Q 150,130 162,130 Q 150,130 150,142 Q 150,130 138,130 Q 150,130 150,118 Z"
          fill="currentColor"
        />

        {/* --- QUADRANT 1: TOP-LEFT (Physics / Atom) --- */}
        <g transform="translate(106, 86)">
          {/* Nucleus */}
          <circle cx="0" cy="0" r="4" fill="currentColor" />
          {/* Orbital 1 */}
          <ellipse cx="0" cy="0" rx="18" ry="7" stroke="currentColor" strokeWidth="1.8" fill="none" transform="rotate(0)" />
          {/* Orbital 2 */}
          <ellipse cx="0" cy="0" rx="18" ry="7" stroke="currentColor" strokeWidth="1.8" fill="none" transform="rotate(60)" />
          {/* Orbital 3 */}
          <ellipse cx="0" cy="0" rx="18" ry="7" stroke="currentColor" strokeWidth="1.8" fill="none" transform="rotate(-60)" />
          {/* Orbiting particle */}
          <circle cx="16" cy="7" r="2.2" fill="currentColor" />
          <circle cx="-13" cy="11" r="1.8" fill="currentColor" />
        </g>

        {/* --- QUADRANT 2: TOP-RIGHT (Mathematics / Exam / Writing) --- */}
        <g transform="translate(168, 62)">
          {/* Document / Sheet */}
          <rect x="10" y="2" width="26" height="34" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
          {/* Text lines / Math notation */}
          <line x1="15" y1="9" x2="31" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="15" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="15" y1="21" x2="29" y2="21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          {/* Pi / Square root / Math symbol */}
          <text x="14" y="31" fontSize="9" fontWeight="bold" fill="currentColor" fontFamily="serif">π ∑</text>
          
          {/* Leaning Pen / Stylus */}
          <g transform="translate(36, 18) rotate(35)">
            <rect x="-2" y="-14" width="4" height="22" rx="1" fill="currentColor" />
            <polygon points="-2,8 2,8 0,14" fill="currentColor" />
          </g>

          {/* Checklist / Test mark box */}
          <rect x="-4" y="6" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <line x1="-1" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.2" />
          <line x1="-1" y1="14" x2="4" y2="14" stroke="currentColor" strokeWidth="1.2" />
        </g>

        {/* --- QUADRANT 3: BOTTOM-LEFT (Analytics / Growth / Excellence) --- */}
        <g transform="translate(80, 146)">
          {/* Chart Frame */}
          <rect x="0" y="0" width="38" height="30" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
          
          {/* Rising Bar Chart */}
          <rect x="5" y="16" width="4" height="10" fill="currentColor" />
          <rect x="11" y="11" width="4" height="15" fill="currentColor" />
          <rect x="17" y="6" width="4" height="20" fill="currentColor" />

          {/* Upward Trend Line */}
          <path
            d="M 6,15 L 13,10 L 20,4 L 32,1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="32" cy="1" r="2" fill="currentColor" />

          {/* Student Achievement Badge / Circle */}
          <g transform="translate(38, 26)">
            <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.6" fill="white" />
            {/* Student Silhouette */}
            <circle cx="0" cy="-3" r="3.2" fill="currentColor" />
            <path d="M -6,6 C -6,1 6,1 6,6" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </g>
        </g>

        {/* --- QUADRANT 4: BOTTOM-RIGHT (Chemistry & Biology) --- */}
        <g transform="translate(170, 145)">
          {/* Chemistry Erlenmeyer Flask */}
          <path
            d="M 12,2 L 12,10 L 2,28 C 0.5,31 2.5,33 6,33 L 26,33 C 29.5,33 31.5,31 30,28 L 20,10 L 20,2 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Liquid level inside flask */}
          <path d="M 6,24 Q 16,21 26,24" stroke="currentColor" strokeWidth="1.4" fill="none" />
          {/* Rising bubbles */}
          <circle cx="16" cy="18" r="1.5" fill="currentColor" />
          <circle cx="12" cy="27" r="1.8" fill="currentColor" />
          <circle cx="20" cy="28" r="1.4" fill="currentColor" />

          {/* Vertical DNA Double Helix beside Flask */}
          <g transform="translate(36, 4)">
            {/* Strands */}
            <path
              d="M -2,0 C 4,6 4,12 -2,18 C -8,24 -8,30 -2,36"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 2,0 C -4,6 -4,12 2,18 C 8,24 8,30 2,36"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Base pair rungs */}
            <line x1="-1" y1="6" x2="1" y2="6" stroke="currentColor" strokeWidth="1.4" />
            <line x1="-3" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.4" />
            <line x1="-1" y1="18" x2="1" y2="18" stroke="currentColor" strokeWidth="1.4" />
            <line x1="-3" y1="24" x2="3" y2="24" stroke="currentColor" strokeWidth="1.4" />
            <line x1="-1" y1="30" x2="1" y2="30" stroke="currentColor" strokeWidth="1.4" />
          </g>
        </g>

        {/* --- OPEN BOOK PEDESTAL AT THE BOTTOM --- */}
        <g transform="translate(150, 260)">
          {/* Central spine marker */}
          <path d="M 0,-12 L 0,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

          {/* Left fanning pages */}
          <path
            d="M 0,-10 C -40,-24 -90,-20 -130,5 C -85,-7 -40,-5 0,8 Z"
            fill="currentColor"
          />
          <path
            d="M 0,-2 C -38,-14 -85,-11 -122,15 C -80,2 -38,3 0,14 Z"
            fill="currentColor"
          />
          <path
            d="M 0,6 C -35,-4 -78,-2 -112,24 C -72,11 -35,11 0,18 Z"
            fill="currentColor"
          />

          {/* Right fanning pages (symmetrical) */}
          <path
            d="M 0,-10 C 40,-24 90,-20 130,5 C 85,-7 40,-5 0,8 Z"
            fill="currentColor"
          />
          <path
            d="M 0,-2 C 38,-14 85,-11 122,15 C 80,2 38,3 0,14 Z"
            fill="currentColor"
          />
          <path
            d="M 0,6 C 35,-4 78,-2 112,24 C 72,11 35,11 0,18 Z"
            fill="currentColor"
          />
        </g>
      </svg>

      {showText && (
        <div className="leading-tight">
          <span className="block text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            PSYCHE <span className="text-maroon-800">Academic</span> <span className="text-maroon-500">Care</span>
          </span>
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase block">
            Excellence In Education & Success
          </span>
        </div>
      )}
    </div>
  );
};

export default PsycheLogo;
