import React, { useState } from 'react';
import { X, Users, UserPlus } from 'lucide-react';
import { CoGuardian } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface CoGuardiansModalProps {
  isOpen: boolean;
  onClose: () => void;
  coGuardians: CoGuardian[];
  onAddGuardian: (guardian: CoGuardian) => void;
  onToggleNfcPermission: (id: string) => void;
}

export const CoGuardiansModal: React.FC<CoGuardiansModalProps> = ({
  isOpen,
  onClose,
  coGuardians,
  onAddGuardian,
  onToggleNfcPermission,
}) => {
  const { t } = useI18n();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('Co-Guardian');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!newName) return;
    onAddGuardian({
      id: `cg-${Date.now()}`,
      name: newName,
      phone: newPhone || '+60 12-000 0000',
      relation: newRelation,
      role: 'Guardian',
      nfcWriteAccess: true,
    });
    setNewName('');
    setNewPhone('');
    setShowAddForm(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full max-h-[85%] bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-red-50 text-red-500">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                {t.coguardians.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {t.coguardians.subtitle}
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

        <div className="flex-1 overflow-y-auto space-y-2.5 text-xs pr-0.5">
          {coGuardians.map((cg) => (
            <div
              key={cg.id}
              className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-xs">{cg.name}</h4>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                    {cg.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{cg.relation} · {cg.phone}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-500 font-medium">{t.coguardians.writeAccessLabel}</span>
                  <button
                    onClick={() => onToggleNfcPermission(cg.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      cg.nfcWriteAccess
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {cg.nfcWriteAccess ? t.coguardians.allowed : t.coguardians.readOnly}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {showAddForm ? (
            <div className="bg-white rounded-2xl p-3.5 border-2 border-red-200 space-y-2">
              <span className="font-bold text-slate-900 text-xs">{t.coguardians.addNewTitle}</span>
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 text-xs outline-hidden"
              />
              <input
                type="text"
                placeholder="Phone (e.g. +60 12-345 6789)"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 text-xs outline-hidden"
              />
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  {t.coguardians.cancel}
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-2 bg-red-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  {t.coguardians.save}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.coguardians.addNewButton}</span>
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs mt-3 transition-colors cursor-pointer"
        >
          {t.coguardians.done}
        </button>
      </div>
    </div>
  );
};
