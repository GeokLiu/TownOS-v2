import React from 'react';
import { Sparkles, X, AlertTriangle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface AiRiskAssessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  notes?: string;
}

export const AiRiskAssessorModal: React.FC<AiRiskAssessorModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  notes,
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

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
            <div className="text-emerald-600">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight">
              {t.aiModal.title}
            </h3>
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
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {notes || t.aiModal.defaultObservation}
          </p>
        </div>

        {/* 2. Auto-tuned parameter card */}
        <div className="bg-[#edfbf4] border border-[#a3e8c7] rounded-2xl p-4 mb-3">
          <span className="inline-block bg-[#d2f4e4] text-[#0d7d4c] text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 uppercase tracking-wide">
            {t.aiModal.autoTunedBadge}
          </span>
          <p className="font-bold text-[#085a36] text-[15px] tracking-tight">
            {t.aiModal.bufferApplied}
          </p>
        </div>

        {/* 3. Hardware Attachment Reminder */}
        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {t.aiModal.reminder}
          </p>
        </div>

        {/* 4. Action Button */}
        <button
          onClick={onConfirm}
          className="w-full bg-[#0d8754] hover:bg-[#0b7448] text-white font-bold py-3.5 px-4 rounded-2xl text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center cursor-pointer"
        >
          {t.aiModal.confirmButton}
        </button>
      </div>
    </div>
  );
};
