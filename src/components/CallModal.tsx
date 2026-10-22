import React from 'react';
import { Phone, PhoneOff, Shield } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface CallModalProps {
  isOpen: boolean;
  contactName: string;
  phoneNumber: string;
  isPatrol?: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  contactName,
  phoneNumber,
  isPatrol = false,
  onClose,
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-between py-12 px-6 text-white text-center">
      {/* Top info */}
      <div className="flex flex-col items-center mt-6">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isPatrol ? 'bg-red-600/30 text-red-400 border border-red-500/50' : 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/50'}`}>
          {isPatrol ? <Shield className="w-10 h-10" /> : <Phone className="w-10 h-10" />}
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-1">{contactName}</h2>
        <p className="text-slate-400 text-sm font-mono">{phoneNumber}</p>
        <span className="text-xs text-emerald-400 mt-2 font-medium animate-pulse">
          {t.call.connectingSub}
        </span>
      </div>

      {/* TownOS Emergency Dispatch details */}
      <div className="w-full bg-white/10 rounded-2xl p-4 text-xs text-slate-300 text-left space-y-1.5 border border-white/10">
        <div className="flex justify-between">
          <span className="text-slate-400">{t.call.callerLocation}</span>
          <span className="font-semibold text-white">Persiaran Elmina (XW02)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">{t.call.subject}</span>
          <span className="font-semibold text-white">Grandpa Tan (Age 74)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">{t.call.priority}</span>
          <span className="font-semibold text-red-400">{t.call.priorityVal}</span>
        </div>
      </div>

      {/* End Call Button */}
      <div className="flex flex-col items-center mb-4">
        <button
          onClick={onClose}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-xl shadow-red-600/50 active:scale-95 transition-all cursor-pointer"
        >
          <PhoneOff className="w-7 h-7" />
        </button>
        <span className="text-xs text-slate-400 mt-2 font-medium">{t.call.endCallButton}</span>
      </div>
    </div>
  );
};
