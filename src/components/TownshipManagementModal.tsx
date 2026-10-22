import React from 'react';
import { X, Building2, Phone, MessageSquare, Shield, FileText } from 'lucide-react';

interface TownshipManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'contact' | 'terms';
}

export const TownshipManagementModal: React.FC<TownshipManagementModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full max-h-[85%] bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-red-50 text-red-500">
              {type === 'contact' ? <Building2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight">
              {type === 'contact' ? 'Elmina Township Management' : 'Terms of Service'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {type === 'contact' ? (
          <div className="space-y-3 text-xs mb-4">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Township Management Office</h4>
              <p className="text-slate-500 text-[11px] mb-3">
                City of Elmina Welcome Centre, Persiaran Elmina, 40160 Shah Alam, Selangor.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+60378398888"
                  className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-100"
                >
                  <span className="font-semibold flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> General Office: +60 3-7839 8888
                  </span>
                  <span className="text-[10px] text-slate-400">9am - 6pm</span>
                </a>

                <a
                  href="tel:1800883564"
                  className="flex items-center justify-between p-2.5 bg-red-50 rounded-xl border border-red-200 text-red-800 font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-red-600" /> Auxiliary Police 24/7 Patrol Hotline
                  </span>
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full">1-TAP</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs mb-4 text-slate-600 overflow-y-auto max-h-[320px] pr-1 leading-relaxed">
            <p>
              <strong>1. Passive NFC Architecture:</strong> TownOS family safety stickers utilize zero-power ISO 14443A passive NFC tags with encrypted identification tokens.
            </p>
            <p>
              <strong>2. Edge Crosswalk Priority:</strong> Smart township beacons EW-XW01 through EW-XW08 automatically extend green light signals when senior or mobility-assisted tags are detected.
            </p>
            <p>
              <strong>3. Bystander Data Privacy:</strong> Bystander scan pages provide emergency contact triggers and essential medical response guidelines without exposing full home address or sensitive records.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
