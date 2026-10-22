import React, { useState } from 'react';
import { X, ShieldAlert, Phone, PhoneCall } from 'lucide-react';
import { EscalationTier } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiers: EscalationTier[];
  selectedTierId?: string;
  onUpdateTier: (tierId: string, updated: Partial<EscalationTier>) => void;
  onTestCall: (name: string, phone: string, isPatrol: boolean) => void;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  tiers,
  selectedTierId,
  onUpdateTier,
  onTestCall,
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'tiers' | 'history'>('tiers');
  const [editingTierId, setEditingTierId] = useState<string | null>(selectedTierId || tiers[0]?.id || null);

  if (!isOpen) return null;

  const currentTier = tiers.find((t) => t.id === editingTierId) || tiers[0];

  const getLocalizedRoleName = (tier: EscalationTier) => {
    if (tier.id === 'tier-1') return t.home.daughterPrimary;
    if (tier.id === 'tier-2') return t.home.spouse;
    return t.home.auxiliaryPatrol;
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex flex-col justify-end transition-all">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full max-h-[90%] bg-white rounded-t-[32px] px-5 pt-3 pb-6 shadow-2xl border-t border-slate-100 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-red-100 text-red-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base tracking-tight leading-tight">
                {t.escalation.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {t.escalation.subtitle}
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

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 mb-3 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tiers')}
            className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'tiers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.escalation.tiersTab}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'history' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.escalation.historyTab}
          </button>
        </div>

        {activeTab === 'tiers' ? (
          <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
            {/* Tier Selector Chips */}
            <div className="flex gap-2">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setEditingTierId(tier.id)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    editingTierId === tier.id
                      ? 'border-red-500 bg-red-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded-md mb-1 ${
                      tier.tierBadgeColor === 'red' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {tier.tier}
                  </span>
                  <p className="font-bold text-slate-900 text-[11px] truncate">
                    {getLocalizedRoleName(tier)}
                  </p>
                </button>
              ))}
            </div>

            {/* Current Tier Details Card */}
            {currentTier && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {getLocalizedRoleName(currentTier)}
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">
                    {t.escalation.triggerDelay} {currentTier.delaySeconds}s
                  </span>
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    {t.escalation.contactLabel}
                  </label>
                  <input
                    type="text"
                    value={currentTier.contact}
                    onChange={(e) =>
                      onUpdateTier(currentTier.id, { contact: e.target.value })
                    }
                    className="w-full bg-white rounded-xl px-3 py-2 border border-slate-200 font-semibold text-slate-800 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    {t.escalation.phoneHotlineLabel}
                  </label>
                  <input
                    type="text"
                    value={currentTier.phone || ''}
                    onChange={(e) =>
                      onUpdateTier(currentTier.id, { phone: e.target.value })
                    }
                    className="w-full bg-white rounded-xl px-3 py-2 border border-slate-200 font-semibold text-slate-800 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    {t.escalation.autoEscalateLabel}
                  </label>
                  <div className="flex gap-2">
                    {[0, 30, 45, 60, 90].map((sec) => (
                      <button
                        key={sec}
                        onClick={() =>
                          onUpdateTier(currentTier.id, { delaySeconds: sec })
                        }
                        className={`flex-1 py-1.5 rounded-lg font-bold text-xs border transition-all cursor-pointer ${
                          currentTier.delaySeconds === sec
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {sec === 0 ? t.escalation.instant : `${sec}s`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Test Call CTA */}
                <button
                  onClick={() =>
                    onTestCall(
                      getLocalizedRoleName(currentTier),
                      currentTier.phone || currentTier.contact,
                      !!currentTier.isHotline
                    )
                  }
                  className="w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.escalation.testCallButton}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-slate-500 text-[10px] mb-1">
                <span className="font-bold text-slate-800">Routine Edge Health Check</span>
                <span>Yesterday 18:00</span>
              </div>
              <p className="text-slate-700 leading-snug">
                Tier 1, 2, and 3 communication latency verified (MQTT response &lt;120ms).
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex justify-between items-center text-emerald-700 text-[10px] mb-1">
                <span className="font-bold text-emerald-900">Drill: Crosswalk Safe Signal</span>
                <span>3 days ago</span>
              </div>
              <p className="text-emerald-800 leading-snug">
                Persiaran Elmina beacon EW-XW02 successfully registered priority trigger for Grandpa Tan's tag.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs mt-3 transition-colors cursor-pointer"
        >
          {t.escalation.doneButton}
        </button>
      </div>
    </div>
  );
};
