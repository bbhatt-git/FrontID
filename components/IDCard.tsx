
import React from 'react';
import { Student, CardConfig } from '../types';
import { RemoteImage } from './Logo';
import { User } from 'lucide-react';

interface IDCardProps {
  student: Student;
  config: CardConfig;
  id?: string;
}

const IDCard: React.FC<IDCardProps> = ({ student, config, id }) => {
  // Helper for applying styles with defaults
  const cardStyle: React.CSSProperties = {
    backgroundColor: config.cardBgColor,
    color: config.textColor,
    borderColor: 'rgba(30, 41, 59, 1)', // slate-800
    printColorAdjust: 'exact',
    WebkitPrintColorAdjust: 'exact',
  };

  // Helper to determine text color brightness for the header
  const isDarkAccent = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return ((r * 299) + (g * 587) + (b * 114)) / 1000 < 128;
  };

  const headerTextColor = isDarkAccent(config.accentColor) ? '#ffffff' : '#1e293b';

  return (
    <div id={id} className="id-card-inner-wrapper flex items-center justify-center p-4 bg-transparent rounded-xl">
      {/* FRONT SIDE ONLY - 80mm x 136mm -> 400px x 680px (1:5 Scale) */}
      <div 
        className="id-card-front relative w-[400px] h-[680px] rounded-[20px] overflow-hidden shadow-2xl flex flex-col shrink-0 border-[0px]"
        style={cardStyle}
      >
        {/* Background Pattern */}
        {config.showPattern && (
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }} 
           />
        )}

        {/* 1. Curved Header Section */}
        <div className="relative h-[240px] w-full shrink-0">
            {/* Colored Background Shape */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ 
                backgroundColor: config.accentColor,
                clipPath: 'ellipse(150% 100% at 50% 0%)' 
              }}
            />
            
            {/* Header Content */}
            <div className="relative z-10 flex flex-col items-center pt-8 px-6">
                <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg mb-3 flex items-center justify-center">
                  <RemoteImage src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                
                <h1 
                  className="text-center font-black uppercase tracking-wider leading-tight text-lg mb-1 drop-shadow-sm" 
                  style={{ color: headerTextColor }}
                >
                  {config.schoolName}
                </h1>
                <p 
                  className="text-center text-[10px] font-bold tracking-wide opacity-90 uppercase leading-tight max-w-[85%]" 
                  style={{ color: headerTextColor }}
                >
                  {config.schoolAddress}
                </p>
            </div>
        </div>

        {/* 2. Photo Section (Overlapping) */}
        <div className="relative z-20 -mt-12 flex justify-center mb-2 shrink-0">
            <div 
              className="w-40 h-40 rounded-full border-[6px] shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center relative"
              style={{ borderColor: config.cardBgColor }}
            >
               <User size={80} className="text-slate-400" />
               {/* Optional: Real image would go here */}
            </div>
        </div>

        {/* 3. Student Identity - Flexible height but constrained */}
        <div className="text-center px-6 mb-4 flex-shrink-0">
            <h2 
              className="text-3xl font-black uppercase tracking-tight leading-none drop-shadow-lg line-clamp-2" 
              style={{ color: config.textColor }}
            >
              {student.name}
            </h2>
        </div>

        {/* 4. Details Box - Pushed to bottom with auto margin if needed, but flex-1 above handles it */}
        <div className="w-full px-8 pb-8 mt-auto">
            <div className="bg-white/5 rounded-2xl border border-white/5 p-5 backdrop-blur-sm shadow-inner">
               
               {/* Grid for Main Details */}
               <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-5">
                  
                  {/* Class - Centered */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5" style={{ color: config.labelColor }}>
                      {config.labelClass}
                    </p>
                    <p className="text-sm font-bold leading-none" style={{ color: config.detailsColor }}>
                      {student.class}
                    </p>
                  </div>

                  {/* Section - Centered */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5" style={{ color: config.labelColor }}>
                      {config.labelSection}
                    </p>
                    <p className="text-sm font-bold leading-none" style={{ color: config.detailsColor }}>
                      {student.section}
                    </p>
                  </div>

                  {/* Student ID - Centered */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5" style={{ color: config.labelColor }}>
                      {config.labelId}
                    </p>
                    <p className="text-sm font-bold leading-none font-mono" style={{ color: config.detailsColor }}>
                      {student.studentId}
                    </p>
                  </div>

                  {/* Contact - Centered */}
                  {config.showContact && (
                    <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5" style={{ color: config.labelColor }}>
                          {config.labelContact}
                        </p>
                        <p className="text-sm font-bold leading-none tracking-wide" style={{ color: config.detailsColor }}>
                          {student.contact || "N/A"}
                        </p>
                    </div>
                  )}

               </div>

               {/* Divider */}
               <div className="h-px w-full bg-white/10 mb-4"></div>

               {/* Footer Dates */}
               <div className="flex items-end justify-between px-2">
                   {/* Issued */}
                   <div className="flex flex-col items-start">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-0.5" style={{ color: config.labelColor }}>
                        {config.labelIssued}
                      </p>
                      <p className="text-xs font-bold leading-none" style={{ color: config.detailsColor }}>
                        {config.issuedYear}
                      </p>
                   </div>
                   
                   {/* Valid */}
                   <div className="flex flex-col items-end">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-0.5" style={{ color: config.labelColor }}>
                        {config.labelValid}
                      </p>
                      <p className="text-xs font-bold leading-none" style={{ color: config.accentColor }}>
                        {config.validUntil}
                      </p>
                   </div>
               </div>

            </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-2 w-full shrink-0" style={{ backgroundColor: config.accentColor }}></div>

      </div>
    </div>
  );
};

export default IDCard;
