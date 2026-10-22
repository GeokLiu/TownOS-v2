import React from 'react';

interface StatusBarProps {
  dark?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ dark = false }) => {
  return (
    <div className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs select-none ${dark ? 'text-white' : 'text-slate-900'}`}>
      {/* Time */}
      <span className="font-semibold tracking-tight text-[15px]">9:41</span>

      {/* Notch / Dynamic Island indicator subtle curve or speaker slot */}
      <div className="w-20 h-4 rounded-full bg-transparent flex items-center justify-center">
        <div className="w-12 h-1 bg-black/10 dark:bg-white/10 rounded-full" />
      </div>

      {/* Signal, Wifi, Battery icons matching iOS */}
      <div className="flex items-center gap-1.5">
        {/* 4 Cell signal bars */}
        <div className="flex items-end gap-[1.5px] h-3">
          <span className="w-[3px] h-1.5 rounded-xs bg-current"></span>
          <span className="w-[3px] h-2 rounded-xs bg-current"></span>
          <span className="w-[3px] h-2.5 rounded-xs bg-current"></span>
          <span className="w-[3px] h-3 rounded-xs bg-current"></span>
        </div>

        {/* Wifi */}
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.25c3.78 0 7.21 1.54 9.69 4.02L12 19.98 2.31 11.27C4.79 8.79 8.22 7.25 12 7.25z" />
        </svg>

        {/* Battery */}
        <div className="flex items-center">
          <div className="w-5 h-2.5 border-[1.2px] border-current rounded-[3px] p-[1px] flex items-center">
            <div className="w-3.5 h-full bg-current rounded-[1px]"></div>
          </div>
          <div className="w-[1px] h-1 bg-current rounded-r-[1px] -ml-[0.5px]"></div>
        </div>
      </div>
    </div>
  );
};
