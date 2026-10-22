import React from 'react';
import { Home, Users, SlidersHorizontal, Scan } from 'lucide-react';
import { ActiveTab } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const { t } = useI18n();

  return (
    <div className="w-full pb-2 pt-1 px-4 bg-transparent select-none">
      {/* Floating Pill Container */}
      <div className="bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-slate-100 px-3 py-1.5 flex items-center justify-around relative">
        {/* Tab 1: Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center transition-all px-3 py-1 rounded-2xl cursor-pointer ${
            activeTab === 'home'
              ? 'text-red-500 font-medium'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-red-50 text-red-500' : ''}`}>
            <Home className="w-5 h-5 stroke-[2]" />
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'home' ? 'font-bold text-red-500' : 'font-medium'}`}>
            {t.nav.home}
          </span>
        </button>

        {/* Tab 2: Family */}
        <button
          onClick={() => onTabChange('family')}
          className={`flex flex-col items-center justify-center transition-all px-3 py-1 rounded-2xl cursor-pointer ${
            activeTab === 'family'
              ? 'text-red-500 font-medium'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'family' ? 'bg-red-50 text-red-500' : ''}`}>
            <Users className="w-5 h-5 stroke-[2]" />
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'family' ? 'font-bold text-red-500' : 'font-medium'}`}>
            {t.nav.family}
          </span>
        </button>

        {/* Center Prominent: Scan Tag */}
        <button
          onClick={() => onTabChange('scan')}
          className="flex flex-col items-center justify-center -mt-5 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-red-500/35 border-2 border-white transform transition-transform group-hover:scale-105 active:scale-95">
            <Scan className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className={`text-[10px] mt-1 tracking-tight font-bold ${activeTab === 'scan' ? 'text-red-600' : 'text-slate-800'}`}>
            {t.nav.scanTag}
          </span>
        </button>

        {/* Tab 4: Settings */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex flex-col items-center justify-center transition-all px-3 py-1 rounded-2xl cursor-pointer ${
            activeTab === 'settings'
              ? 'text-red-500 font-medium'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-red-50 text-red-500' : ''}`}>
            <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'settings' ? 'font-bold text-red-500' : 'font-medium'}`}>
            {t.nav.settings}
          </span>
        </button>
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-full flex justify-center mt-2.5 mb-1">
        <div className="w-32 h-1 bg-slate-900/80 rounded-full" />
      </div>
    </div>
  );
};
