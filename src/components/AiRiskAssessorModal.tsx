import React from 'react';
import { Sparkles, X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface AiRiskAssessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  personName?: string;
  notes?: string;
  hasElderlyAssist?: boolean;
}

export const AiRiskAssessorModal: React.FC<AiRiskAssessorModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  personName = 'Sarah Tan',
  notes,
  hasElderlyAssist,
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  const isMichele =
    personName.toLowerCase().includes('michele') ||
    personName.toLowerCase().includes('michelle') ||
    personName.toLowerCase() === 'me';

  const needsExtension = hasElderlyAssist !== undefined ? hasElderlyAssist : !isMichele;

  const defaultObs = isMichele || !needsExtension
    ? 'Active adult runner. Normal walking and jogging cadence. Standard pedestrian crossing signals apply (no time extension needed).'
    : personName === 'Sarah Tan'
    ? 'Asthma inhaler in blue backpack pocket. Requires +30s extended pedestrian crosswalk time for safe transit.'
    : personName === 'Grandpa Tan'
    ? 'Diabetic / Slow Walker. Gets disoriented in afternoon heat. Needs +30s extended pedestrian green light.'
    : `${personName}: Crosswalk Priority mode active. Requires +30s extended safe crossing buffer.`;

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex flex-col justify-end transition-all duration-200">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Card */}
      <div className="w-full bg-white rounded-t-[32px] px-5 pt-3 pb-7 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        {/* Top Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={needsExtension ? 'text-emerald-600' : 'text-blue-600'}>
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight leading-tight">
                {t.aiModal.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Profile: <strong className="text-slate-900">{personName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Medical observation read-out */}
        <div className="bg-[#f0f4f8] rounded-2xl p-4 mb-3 border border-slate-200/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Evaluated Condition ({personName})
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              needsExtension ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {needsExtension ? 'Matched' : 'Standard'}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {notes || defaultObs}
          </p>
        </div>

        {/* 2. Auto-tuned parameter card */}
        {needsExtension ? (
          <div className="bg-[#edfbf4] border border-[#a3e8c7] rounded-2xl p-4 mb-3">
            <span className="inline-block bg-[#d2f4e4] text-[#0d7d4c] text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 uppercase tracking-wide">
              {t.aiModal.autoTunedBadge}
            </span>
            <p className="font-bold text-[#085a36] text-[15px] tracking-tight">
              +30s Crosswalk Extension Buffer Applied
            </p>
            <p className="text-[11px] text-[#0d7d4c] font-medium mt-1">
              Persiaran Elmina signal beacons updated for <strong>{personName}</strong>.
            </p>
          </div>
        ) : (
          <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-2xl p-4 mb-3">
            <span className="inline-block bg-[#e0f2fe] text-[#0369a1] text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 uppercase tracking-wide">
              TownOS Standard Signal Profile
            </span>
            <p className="font-bold text-[#0c4a6e] text-[15px] tracking-tight">
              Standard Crossing Cadence · No Time Extension Needed
            </p>
            <p className="text-[11px] text-[#0284c7] font-medium mt-1">
              Persiaran Elmina crosswalk timers remain normal for <strong>{personName}</strong>. Edge presence active without traffic signal delay.
            </p>
          </div>
        )}

        {/* 3. Hardware Attachment Reminder */}
        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {isMichele
              ? "Reminder: Keep this tag with Michele Tan's running gear or everyday bag for standard neighborhood edge presence."
              : personName === 'Sarah Tan'
              ? "Reminder: Attach this tag to Sarah's daily backpack so the +30s crosswalk buffer triggers on her journey to school."
              : t.aiModal.reminder(personName)}
          </p>
        </div>

        {/* 4. Action Button */}
        <button
          onClick={onConfirm}
          className={`w-full text-white font-bold py-3.5 px-4 rounded-2xl text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer ${
            needsExtension ? 'bg-[#0d8754] hover:bg-[#0b7448]' : 'bg-[#0284c7] hover:bg-[#0369a1]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{needsExtension ? t.aiModal.confirmButton : 'Confirm Standard Profile & Lock'}</span>
        </button>
      </div>
    </div>
  );
};
