import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const [countdown, setCountdown] = useState(5);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setDispatched(false);
      return;
    }

    if (countdown > 0 && !dispatched) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !dispatched) {
      setDispatched(true);
    }
  }, [isOpen, countdown, dispatched]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl text-center border border-red-100">
        {!dispatched ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-1">
              {t.sos.triggeringTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t.sos.notifyingSub}
            </p>

            <div className="w-14 h-14 rounded-full bg-red-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-500/40">
              {countdown}s
            </div>

            <div className="space-y-2 mb-5 text-left text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-600">
                <span>Tier 1: {t.home.daughterPrimary}</span>
                <span className="text-emerald-600 font-semibold">{t.sos.ready}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Tier 2: {t.home.spouse}</span>
                <span className="text-emerald-600 font-semibold">{t.sos.ready}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-medium text-red-600">
                <span>Tier 3: {t.home.auxiliaryPatrol}</span>
                <span className="font-bold">{t.sos.standby}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                {t.sos.cancelButton}
              </button>
              <button
                onClick={() => setDispatched(true)}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors cursor-pointer"
              >
                {t.sos.dispatchNowButton}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-1">
              {t.sos.patrolDispatchedTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t.sos.patrolEnRouteSub}
            </p>

            <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 mb-5 text-left">
              <p className="font-semibold mb-1">{t.sos.gpsBroadcastTitle}</p>
              <p className="text-[11px] text-emerald-700">{t.sos.gpsBroadcastSub}</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {t.sos.closeMonitorButton}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
