import React, { useState } from 'react';
import { X, MapPin, Check, Building2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSaveAddress: (newAddress: string) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  currentAddress,
  onSaveAddress,
}) => {
  const { t } = useI18n();
  const [street, setStreet] = useState(
    currentAddress.includes(',') ? currentAddress.split(',')[0].trim() : 'No. 28, Jalan Elmina Barat 2/3'
  );
  const [precinct, setPrecinct] = useState('Elmina West');
  const [postcode, setPostcode] = useState('40160');
  const [city, setCity] = useState('Shah Alam, Selangor');

  if (!isOpen) return null;

  const handleSave = () => {
    const full = `${street}, ${precinct}, ${postcode} ${city}`;
    onSaveAddress(full);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-red-50 text-red-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                {t.address.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {t.address.subtitle}
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

        <div className="space-y-3 mb-5 text-xs">
          <div>
            <label className="block text-slate-500 font-semibold mb-1 pl-1">
              {t.address.unitStreetLabel}
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 font-semibold text-slate-800 outline-hidden"
              placeholder="e.g. No. 28, Jalan Elmina Barat 2/3"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1 pl-1">
              {t.address.precinctLabel}
            </label>
            <select
              value={precinct}
              onChange={(e) => setPrecinct(e.target.value)}
              className="w-full bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 font-semibold text-slate-800 outline-hidden"
            >
              <option value="Elmina West">Elmina West (Precinct 882)</option>
              <option value="Elmina East">Elmina East</option>
              <option value="Elmina Green">Elmina Green</option>
              <option value="City of Elmina Central">City of Elmina Central</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-500 font-semibold mb-1 pl-1">{t.address.postcodeLabel}</label>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 font-semibold text-slate-800 outline-hidden font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1 pl-1">{t.address.cityStateLabel}</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 font-semibold text-slate-800 outline-hidden"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.address.verifiedNote}</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{t.address.saveButton}</span>
        </button>
      </div>
    </div>
  );
};
