import React from 'react';
import { X, Globe, Check } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../i18n/translations';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChanged?: (name: string) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  onLanguageChanged,
}) => {
  const { language, setLanguage } = useI18n();

  if (!isOpen) return null;

  const languages: { code: Language; name: string; sub: string }[] = [
    { code: 'en', name: 'English (US)', sub: 'Primary display' },
    { code: 'ms', name: 'Bahasa Melayu', sub: 'Bahasa Kebangsaan' },
    { code: 'zh', name: '中文 (简体)', sub: '华语 (马来西亚)' },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-red-50 text-red-500">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
              Select Language / Bahasa / 选择语言
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                onLanguageChanged?.(l.name);
                onClose();
              }}
              className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                language === l.code
                  ? 'border-red-500 bg-red-50/50 shadow-xs'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{l.name}</p>
                <p className="text-[11px] text-slate-400">{l.sub}</p>
              </div>
              {language === l.code && (
                <Check className="w-4 h-4 text-red-600 stroke-[2.5]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
