import React, { useState } from 'react';
import { Lock, RotateCw, Shield, AlertTriangle, Phone, Radio } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { CallModal } from '../components/CallModal';
import { AVATARS } from '../data/mockData';
import { useI18n } from '../i18n/I18nContext';

interface BystanderEmergencyCardScreenProps {
  onBackToApp?: () => void;
}

export const BystanderEmergencyCardScreen: React.FC<BystanderEmergencyCardScreenProps> = ({
  onBackToApp,
}) => {
  const { t } = useI18n();
  const [activeCall, setActiveCall] = useState<{
    isOpen: boolean;
    name: string;
    phone: string;
    isPatrol: boolean;
  }>({
    isOpen: false,
    name: '',
    phone: '',
    isPatrol: false,
  });

  return (
    <div className="w-full h-full flex flex-col bg-white text-slate-900 select-none overflow-hidden relative font-sans">
      {/* iOS Status Bar */}
      <StatusBar />

      {/* Safari Mobile Browser URL Bar */}
      <div className="px-5 py-1.5 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="w-full bg-[#f1f3f6] rounded-xl py-1.5 px-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 min-w-0">
            <Lock className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="font-mono text-[11px] truncate tracking-tight text-slate-700">
              townos.my/rescue/token=X89B2
            </span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 ml-2">
            <RotateCw className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Emergency Red Banner */}
      <div className="bg-[#e01923] text-white px-5 py-4 flex items-start gap-3 shadow-md">
        <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center shrink-0 mt-0.5">
          <Shield className="w-4 h-4 fill-white text-[#e01923]" />
        </div>
        <p className="font-bold text-[13px] sm:text-[13.5px] leading-snug">
          {t.bystander.bannerTitle} <span className="font-normal text-white/90">{t.bystander.bannerSub}</span>
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6 space-y-4 bg-white">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3.5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-xs">
            <img
              src={AVATARS.grandpa}
              alt="Grandpa Tan"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-base tracking-tight leading-snug">
              Grandpa Tan (Age 74)
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              {t.bystander.residentSub}
            </p>
          </div>
        </div>

        {/* Critical Medical Note Box */}
        <div className="bg-[#fef9e8] border border-[#f5c96b] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-1.5 text-[#b45309] mb-2">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
            <span className="font-extrabold text-[11px] tracking-wider uppercase">
              {t.bystander.criticalNoteTitle}
            </span>
          </div>

          <p className="font-bold text-[#92400e] text-[13.5px] leading-relaxed">
            {t.bystander.criticalNoteBody}
          </p>
        </div>

        {/* Action Button 1: Call Daughter */}
        <button
          onClick={() =>
            setActiveCall({
              isOpen: true,
              name: 'Michelle Tan (Daughter)',
              phone: '+60 12-345 6789',
              isPatrol: false,
            })
          }
          className="w-full bg-[#0d8754] hover:bg-[#0b7347] active:scale-[0.99] text-white font-bold py-4 px-4 rounded-2xl text-[14px] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Phone className="w-4 h-4 stroke-[2.5]" />
          <span>{t.bystander.callDaughterButton}</span>
        </button>

        {/* Action Button 2: Call Auxiliary Patrol */}
        <button
          onClick={() =>
            setActiveCall({
              isOpen: true,
              name: 'City of Elmina Auxiliary Police Patrol',
              phone: '1-800-88-ELMINA (24/7)',
              isPatrol: true,
            })
          }
          className="w-full bg-[#d91d24] hover:bg-[#c2181e] active:scale-[0.99] text-white font-bold py-4 px-4 rounded-2xl text-[14px] shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Radio className="w-4 h-4 stroke-[2.5]" />
          <span>{t.bystander.callPatrolButton}</span>
        </button>

        {/* Privacy Lock Footer Note */}
        <div className="pt-3 pb-2 text-center flex flex-col items-center justify-center gap-1">
          <Lock className="w-4 h-4 text-slate-400 stroke-[2]" />
          <p className="text-[11px] text-slate-400 max-w-xs leading-normal">
            {t.bystander.privacyFooter}
          </p>
        </div>

        {/* Back to App Switcher */}
        {onBackToApp && (
          <div className="pt-2 text-center">
            <button
              onClick={onBackToApp}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
            >
              {t.bystander.backToApp}
            </button>
          </div>
        )}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-full flex justify-center pb-2 pt-1 bg-white">
        <div className="w-32 h-1 bg-slate-900 rounded-full" />
      </div>

      {/* Call Simulator Modal */}
      <CallModal
        isOpen={activeCall.isOpen}
        contactName={activeCall.name}
        phoneNumber={activeCall.phone}
        isPatrol={activeCall.isPatrol}
        onClose={() =>
          setActiveCall({ isOpen: false, name: '', phone: '', isPatrol: false })
        }
      />
    </div>
  );
};
