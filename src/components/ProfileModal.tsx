import React, { useState } from 'react';
import { X, ShieldCheck, Camera, Check, User, Phone, Mail } from 'lucide-react';
import { HouseholdAccount } from '../types';
import { AVATARS } from '../data/mockData';
import { useI18n } from '../i18n/I18nContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: HouseholdAccount;
  onSave: (updated: HouseholdAccount) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  account,
  onSave,
}) => {
  const { t } = useI18n();
  const [name, setName] = useState(account.name);
  const [phone, setPhone] = useState(account.phone);
  const [email, setEmail] = useState(account.email);
  const [avatarUrl, setAvatarUrl] = useState(account.avatarUrl);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...account,
      name,
      phone,
      email,
      avatarUrl,
    });
    onClose();
  };

  const avatarOptions = [
    { label: 'Michelle (Default)', url: AVATARS.michelle },
    { label: 'Sporty / Runner', url: AVATARS.meRunner },
    { label: 'Alternate Photo', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80' },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
              {t.profile.title}
            </h3>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {t.profile.verifiedResident}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Avatar Picker */}
        <div className="flex flex-col items-center mb-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100">
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-full shadow-md">
              <Camera className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            {avatarOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAvatarUrl(opt.url)}
                className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                  avatarUrl === opt.url ? 'border-red-500 scale-110 shadow-xs' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={opt.url} alt={opt.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Edit fields */}
        <div className="space-y-3 mb-5 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1 pl-1">{t.profile.fullNameLabel}</label>
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
              <User className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent font-semibold text-slate-800 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1 pl-1">{t.profile.phoneLabel}</label>
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
              <Phone className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent font-semibold text-slate-800 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1 pl-1">{t.profile.emailLabel}</label>
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-semibold text-slate-800 outline-hidden"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.profile.householdId} <strong className="text-slate-800 font-mono">ELMINA-WEST-882</strong></span>
            <span><strong className="text-emerald-700">{t.profile.tagsPaired}</strong></span>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{t.profile.saveButton}</span>
        </button>
      </div>
    </div>
  );
};
