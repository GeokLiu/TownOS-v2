import React, { useState } from 'react';
import { CheckCircle2, School, Home as HomeIcon } from 'lucide-react';
import { AVATARS } from '../data/mockData';
import { useI18n } from '../i18n/I18nContext';

interface TownshipMapProps {
  onSelectPerson?: (person: 'grandpa' | 'sarah') => void;
}

export const TownshipMap: React.FC<TownshipMapProps> = ({ onSelectPerson }) => {
  const [selectedPin, setSelectedPin] = useState<'grandpa' | 'sarah' | null>(null);
  const { t } = useI18n();

  return (
    <div className="w-full bg-white rounded-3xl p-3.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="font-bold text-slate-900 text-sm tracking-tight">
          {t.familyActivity.familyTagsCount(2)}
        </span>
        <div className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100/60">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
          <span>{t.familyActivity.allSystemsOnline}</span>
        </div>
      </div>

      {/* Stylized Map Viewport */}
      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-[#eaf1e7] select-none border border-slate-200/50">
        <svg
          viewBox="0 0 360 220"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Park Green Areas */}
          <path
            d="M -10,0 L 140,0 C 130,40 100,70 60,85 L -10,100 Z"
            fill="#dbe9d5"
          />
          <path
            d="M 230,0 L 370,0 L 370,120 C 330,110 300,90 280,60 C 260,30 250,15 230,0 Z"
            fill="#dbe9d5"
          />
          
          {/* Riverside Park & River */}
          <path
            d="M 310,90 C 330,130 315,180 340,220 L 370,220 L 370,80 Z"
            fill="#c7e6f8"
          />
          <path
            d="M 290,130 C 310,160 300,195 325,220 L 370,220 C 350,170 330,120 310,90 Z"
            fill="#b8def3"
          />

          {/* Road Network */}
          <path
            d="M -20,180 L 120,110 L 260,75 L 380,45"
            stroke="#ffffff"
            strokeWidth="38"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -20,180 L 120,110 L 260,75 L 380,45"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />

          <path
            d="M 40,230 L 75,130 L 160,0"
            stroke="#ffffff"
            strokeWidth="24"
            fill="none"
          />
          <path
            d="M 120,110 L 190,230"
            stroke="#ffffff"
            strokeWidth="22"
            fill="none"
          />

          {/* Crosswalk Zebra EW-XW02 at (248, 80) */}
          <g transform="translate(245, 76) rotate(-16)">
            <rect x="-8" y="-14" width="3" height="28" fill="#cbd5e1" rx="0.5" />
            <rect x="-3" y="-14" width="3" height="28" fill="#cbd5e1" rx="0.5" />
            <rect x="2" y="-14" width="3" height="28" fill="#cbd5e1" rx="0.5" />
            <rect x="7" y="-14" width="3" height="28" fill="#cbd5e1" rx="0.5" />
            <text x="-4" y="-17" fill="#64748b" fontSize="5.5" fontWeight="600">EW-XW02</text>
          </g>

          {/* Map Typography Labels */}
          <text x="6" y="24" fill="#6b8660" fontSize="6.5" fontWeight="700" letterSpacing="0.4">
            ELMINA
          </text>
          <text x="6" y="32" fill="#6b8660" fontSize="6.5" fontWeight="700" letterSpacing="0.4">
            {t.familyActivity.map.communityPark}
          </text>

          <text x="18" y="155" fill="#94a3b8" fontSize="6.5" fontWeight="600" transform="rotate(-70 18 155)">
            {t.familyActivity.map.jalanElmina2}
          </text>

          <text x="270" y="36" fill="#6b8660" fontSize="6" fontWeight="700">
            ELMINA
          </text>

          <text x="305" y="160" fill="#0284c7" fontSize="6.5" fontWeight="700" letterSpacing="0.3">
            {t.familyActivity.map.riversidePark.split(' ')[0]}
          </text>
          <text x="305" y="168" fill="#0284c7" fontSize="6.5" fontWeight="700" letterSpacing="0.3">
            {t.familyActivity.map.riversidePark.split(' ')[1] || 'PARK'}
          </text>

          {/* 1. Home Perimeter Zone */}
          <rect
            x="48"
            y="152"
            width="88"
            height="44"
            rx="18"
            fill="#3b82f6"
            fillOpacity="0.08"
            stroke="#3b82f6"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />

          {/* Breadcrumb Trail */}
          <circle cx="68" cy="170" r="2.2" fill="#ef4444" />
          <circle cx="82" cy="165" r="2.2" fill="#ef4444" />
          <circle cx="95" cy="155" r="2.2" fill="#ef4444" />
          <circle cx="108" cy="144" r="2.2" fill="#ef4444" />
          <circle cx="120" cy="132" r="2.2" fill="#ef4444" />
          <circle cx="140" cy="120" r="2.2" fill="#ef4444" />
          <circle cx="165" cy="110" r="2.2" fill="#ef4444" />
          <circle cx="195" cy="98" r="2.2" fill="#ef4444" />
          <circle cx="225" cy="88" r="2.2" fill="#ef4444" />

          {/* 2. School Safe Zone */}
          <rect
            x="265"
            y="12"
            width="85"
            height="62"
            rx="20"
            fill="#10b981"
            fillOpacity="0.12"
            stroke="#10b981"
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
        </svg>

        {/* Home Perimeter Label */}
        <div className="absolute left-[54px] top-[172px] flex items-center gap-1 text-[9px] font-bold text-blue-600 bg-white/70 px-1.5 py-0.5 rounded-full backdrop-blur-xs">
          <HomeIcon className="w-2.5 h-2.5" />
          <span>{t.familyActivity.map.homePerimeter}</span>
        </div>

        {/* School Safe Zone Label */}
        <div className="absolute right-3 top-4 flex items-center gap-1 text-[8px] font-bold text-emerald-800 leading-tight">
          <div className="bg-emerald-600 text-white p-0.5 rounded shrink-0">
            <School className="w-2.5 h-2.5" />
          </div>
          <span className="max-w-[76px] leading-[10px]">
            {t.familyActivity.map.schoolSafeZone}
          </span>
        </div>

        {/* Sarah Tan Pin Marker */}
        <div
          onClick={() => {
            setSelectedPin(selectedPin === 'sarah' ? null : 'sarah');
            onSelectPerson?.('sarah');
          }}
          className="absolute right-9 top-8 flex flex-col items-center cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 overflow-hidden shadow-md bg-white">
            <img src={AVATARS.sarah} alt="Sarah Tan" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Sarah Tan Tag Badge */}
        <div className="absolute right-3 top-[58px] bg-white/95 backdrop-blur-xs text-slate-800 text-[8px] sm:text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-slate-200/80 flex items-center gap-1 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{t.familyActivity.map.schoolZoneStationary}</span>
        </div>

        {/* Grandpa Tan Marker */}
        <div
          onClick={() => {
            setSelectedPin(selectedPin === 'grandpa' ? null : 'grandpa');
            onSelectPerson?.('grandpa');
          }}
          className="absolute left-[242px] top-[74px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-10"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border border-red-500/70 animate-ping"></div>
            <div className="absolute w-10 h-10 rounded-full border-2 border-red-500/80 bg-red-500/10"></div>
            
            <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-md bg-white z-10">
              <img src={AVATARS.grandpa} alt="Grandpa Tan" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Grandpa Tan Safe Crossing Badge */}
        <div className="absolute left-[195px] top-[98px] -translate-x-1/2 bg-white/95 backdrop-blur-xs text-slate-800 text-[8px] sm:text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-slate-200/80 flex items-center gap-1 whitespace-nowrap z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{t.familyActivity.map.crosswalkSafeCrossing}</span>
        </div>
      </div>
    </div>
  );
};
