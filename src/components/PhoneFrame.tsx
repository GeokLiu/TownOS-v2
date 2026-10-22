import React from 'react';

interface PhoneFrameProps {
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  title,
  children,
  width = 'w-[370px]',
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Title Label if present (e.g. 01_Home, 02_Family_Activity) */}
      {title && (
        <div className="text-slate-400 font-mono text-xs font-semibold mb-2 self-start tracking-wide pl-2">
          {title}
        </div>
      )}

      {/* Phone Body with Apple-grade Bezels and Drop Shadow */}
      <div className={`relative ${width} h-[760px] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border-[4px] border-slate-800 flex flex-col overflow-hidden`}>
        {/* Screen Bezel inner container */}
        <div className="w-full h-full bg-[#f5f6f8] rounded-[38px] overflow-hidden relative flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
