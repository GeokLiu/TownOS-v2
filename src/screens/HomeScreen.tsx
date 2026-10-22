import React from 'react';
import { Bell, ShieldCheck, SlidersHorizontal, ChevronRight, Phone, ArrowRight, Battery, BatteryWarning } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { ActiveTab, FamilyTag, EscalationTier, HouseholdAccount } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface HomeScreenProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onEditProfile?: (tag: FamilyTag) => void;
  onOpenProfile?: () => void;
  onOpenNotifications?: () => void;
  onOpenEscalation?: (tierId?: string) => void;
  unreadNotificationsCount?: number;
  account: HouseholdAccount;
  familyTags: FamilyTag[];
  escalationTiers: EscalationTier[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onEditProfile,
  onOpenProfile,
  onOpenNotifications,
  onOpenEscalation,
  unreadNotificationsCount = 3,
  account,
  familyTags,
  escalationTiers,
}) => {
  const { t } = useI18n();

  const getLocalizedRole = (tagId: string, fallbackRole: string) => {
    if (tagId === 'grandpa') return t.home.roles.senior;
    if (tagId === 'sarah') return t.home.roles.student;
    if (tagId === 'me') return t.home.roles.runner;
    return fallbackRole;
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f6f8] text-slate-900 select-none overflow-hidden relative">
      {/* iOS Status Bar */}
      <StatusBar />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-1 pb-4 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.header.townOs}
            </h1>
            <span className="inline-block mt-0.5 bg-[#eef0f3] text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider">
              {t.header.precinctBadge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell with Badge */}
            <button
              onClick={onOpenNotifications}
              className="relative p-1 text-slate-800 cursor-pointer hover:text-slate-900 transition-transform active:scale-95"
              title="View edge notifications"
            >
              <Bell className="w-5 h-5 stroke-[2.2]" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white animate-pulse"></span>
              )}
            </button>

            {/* Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-xs cursor-pointer hover:ring-2 hover:ring-red-400 transition-all active:scale-95"
              title="Click to view & edit profile"
            >
              <img
                src={account.avatarUrl}
                alt={account.name}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Family Admin Profile Card */}
        <div
          onClick={onOpenProfile}
          className="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100/90 cursor-pointer hover:border-slate-200 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 shadow-xs shrink-0">
              <img
                src={account.avatarUrl}
                alt={account.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm tracking-tight leading-snug">
                {account.name}
              </h2>
              <p className="text-[11.5px] text-slate-500 font-normal leading-tight">
                {t.home.familyAdminTitle}
              </p>
            </div>
          </div>

          <div className="text-emerald-500 pr-1">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        {/* Section: Active Family Tags */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-bold text-slate-900 text-[15px] tracking-tight">
              {t.home.activeTagsTitle}
            </h3>
            <span className="bg-[#e9f8f1] text-[#0d945a] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              {t.home.pairedBadge(familyTags.length)}
            </span>
          </div>

          <div className="space-y-2">
            {familyTags.map((tag) => {
              const isLowBattery = tag.batteryLevel < 20;

              return (
                <div
                  key={tag.id}
                  className={`bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.025)] border transition-all ${
                    isLowBattery ? 'border-amber-300 ring-1 ring-amber-300/50' : 'border-slate-100/90 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-100 relative">
                      <img
                        src={tag.avatarUrl}
                        alt={tag.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 text-[13.5px]">
                          {tag.name}
                        </span>
                        <span className="text-slate-500 text-[11.5px] font-normal">
                          {getLocalizedRole(tag.id, tag.role)}
                        </span>
                        {tag.hasElderlyAssist ? (
                          <span className="text-[9.5px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                            +30s Priority
                          </span>
                        ) : (
                          <span className="text-[9.5px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.2 rounded">
                            Standard Pass
                          </span>
                        )}
                      </div>

                      {/* Tag status with battery indicator - Removed battery-free wording */}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-[11px] text-slate-500 font-normal">
                          {t.home.smartTagStatus}
                        </p>
                        <span className="text-slate-300">·</span>
                        {isLowBattery ? (
                          <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200/90 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs">
                            <span className="w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center leading-none">
                              !
                            </span>
                            <span>{tag.batteryLevel}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[10.5px] font-bold text-slate-500">
                            <Battery className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{tag.batteryLevel}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit profile Action */}
                  <button
                    onClick={() => onEditProfile?.(tag)}
                    className="flex flex-col items-center justify-center text-red-500 hover:text-red-600 transition-colors pl-2 cursor-pointer active:scale-95"
                    title="Scan physical tag to edit profile"
                  >
                    <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
                    <span className="text-[10px] font-bold mt-0.5 tracking-tight">
                      {t.home.editProfile}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Emergency Escalation Hierarchy */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-bold text-slate-900 text-[15px] tracking-tight">
              {t.home.escalationTitle}
            </h3>
            <span
              className="text-[11px] text-red-600 font-semibold cursor-pointer hover:underline"
              onClick={() => onOpenEscalation?.()}
            >
              {t.home.configure}
            </span>
          </div>

          <div className="bg-white rounded-2xl divide-y divide-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100/90 overflow-hidden">
            {escalationTiers.map((tierItem) => {
              const localizedRole =
                tierItem.id === 'tier-1'
                  ? t.home.daughterPrimary
                  : tierItem.id === 'tier-2'
                  ? t.home.spouse
                  : t.home.auxiliaryPatrol;

              const localizedContact = tierItem.isHotline
                ? t.home.hotline247
                : tierItem.contact;

              return (
                <div
                  key={tierItem.id}
                  onClick={() => onOpenEscalation?.(tierItem.id)}
                  className="p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer active:bg-slate-100/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`shrink-0 text-[10.5px] font-extrabold px-2 py-0.5 rounded-md ${
                        tierItem.tierBadgeColor === 'red'
                          ? 'bg-[#fee2e2] text-[#ef4444]'
                          : 'bg-[#fef3c7] text-[#d97706]'
                      }`}
                    >
                      {tierItem.tier}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-[13px] truncate leading-tight">
                        {localizedRole}
                      </p>
                      <p
                        className={`text-[11px] truncate leading-tight mt-0.5 ${
                          tierItem.isHotline
                            ? 'text-[#d97706] font-semibold'
                            : 'text-slate-400 font-normal'
                        }`}
                      >
                        {localizedContact}
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 pl-2 shrink-0">
                    {tierItem.isHotline ? (
                      <Phone className="w-4 h-4 stroke-[2.2] text-amber-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Link Banner */}
          <button
            onClick={() => onOpenEscalation?.()}
            className="w-full bg-[#fdf2f2] hover:bg-[#fae6e6] rounded-xl p-3 flex items-center justify-between text-red-500 transition-colors cursor-pointer"
          >
            <span className="text-[11.5px] font-bold tracking-tight">
              {t.home.escalationTimingBanner}
            </span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNavBar activeTab="home" onTabChange={onNavigateTab} />
    </div>
  );
};
