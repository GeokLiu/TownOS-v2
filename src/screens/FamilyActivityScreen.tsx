import React from 'react';
import { Bell, ShieldAlert, CheckCircle2, Clock, BatteryWarning } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { TownshipMap } from '../components/TownshipMap';
import { ActiveTab, HouseholdAccount, FamilyTag } from '../types';
import { AVATARS } from '../data/mockData';
import { useI18n } from '../i18n/I18nContext';

interface FamilyActivityScreenProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onTriggerSos: () => void;
  onSelectPerson?: (person: 'grandpa' | 'sarah') => void;
  onOpenProfile?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  account: HouseholdAccount;
  familyTags?: FamilyTag[];
}

export const FamilyActivityScreen: React.FC<FamilyActivityScreenProps> = ({
  onNavigateTab,
  onTriggerSos,
  onSelectPerson,
  onOpenProfile,
  onOpenNotifications,
  unreadNotificationsCount = 3,
  account,
  familyTags = [],
}) => {
  const { t } = useI18n();

  // Find who has crosswalk priority (Sarah Tan or Grandpa Tan)
  const sarahTag = familyTags.find((t) => t.id === 'sarah');
  const grandpaTag = familyTags.find((t) => t.id === 'grandpa');
  const isSarahCrosswalkActive = sarahTag?.hasElderlyAssist;
  const crosswalkUser = isSarahCrosswalkActive ? 'sarah' : 'grandpa';

  // Check if any tag is below 20%
  const lowBatteryTag = familyTags.find((t) => t.batteryLevel < 20);

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f6f8] text-slate-900 select-none overflow-hidden relative">
      {/* iOS Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-1 pb-4 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.header.townOs}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 bg-[#e8f8f0] text-[#0d945a] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>{t.header.liveBadge}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
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

            {/* Michelle Avatar */}
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

        {/* Low Battery Warning Notice when tag is < 20% */}
        {lowBatteryTag && (
          <div
            onClick={onOpenNotifications}
            className="bg-red-50/80 border border-red-200/80 rounded-2xl p-2.5 flex items-center justify-between cursor-pointer hover:bg-red-100/70 transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shrink-0 leading-none">
                !
              </span>
              <p className="text-[11px] font-semibold text-red-950">
                {t.familyActivity.batteryAlertBanner(lowBatteryTag.name, lowBatteryTag.batteryLevel)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 bg-white border border-red-200 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-red-600 shadow-2xs">
              <span className="w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[8px] font-black flex items-center justify-center leading-none">!</span>
              <span>{lowBatteryTag.batteryLevel}%</span>
            </span>
          </div>
        )}

        {/* 1. Township Map Card with Dynamic Crosswalk User */}
        <TownshipMap
          onSelectPerson={onSelectPerson}
          crosswalkUser={crosswalkUser}
        />

        {/* 2. Family Activity Edge Log Section */}
        <div className="space-y-2.5 pt-1">
          <div>
            <h3 className="font-bold text-slate-900 text-[15px] tracking-tight">
              {t.familyActivity.activityTitle}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              {t.familyActivity.edgeLogSubtitle}
            </p>
          </div>

          {/* Activity Cards List */}
          <div className="space-y-2.5">
            {/* Card 1: Safe Crossing recorded for whichever user has crosswalk priority (Sarah Tan or Grandpa Tan) */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src={isSarahCrosswalkActive ? AVATARS.sarah : AVATARS.grandpa}
                      alt={isSarahCrosswalkActive ? 'Sarah Tan' : 'Grandpa Tan'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">
                      {isSarahCrosswalkActive ? 'Sarah Tan' : 'Grandpa Tan'}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span className="text-slate-400 text-xs font-normal">
                      {isSarahCrosswalkActive ? '(Student / Crosswalk Priority)' : t.familyActivity.seniorSlowWalker}
                    </span>
                  </div>
                </div>

                {/* Status Dot */}
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <p className="text-[12.5px] text-slate-700 leading-snug font-normal mb-2.5 pl-0.5">
                {t.familyActivity.safeCrossingLog(isSarahCrosswalkActive ? 'Sarah Tan' : 'Grandpa Tan')}
              </p>

              {/* Tag pill with ONLY +30s */}
              <div className="inline-flex items-center gap-1.5 bg-[#eaf8f0] text-[#0a824e] text-[11px] font-bold px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+30s Green Light Extended</span>
              </div>
            </div>

            {/* Card 2: Sarah Tan Arrival or Grandpa Activity */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
                    <img
                      src={isSarahCrosswalkActive ? AVATARS.grandpa : AVATARS.sarah}
                      alt={isSarahCrosswalkActive ? 'Grandpa Tan' : 'Sarah Tan'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm">
                      {isSarahCrosswalkActive ? 'Grandpa Tan' : 'Sarah Tan'}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span className="text-slate-400 text-xs font-normal">
                      {isSarahCrosswalkActive ? '(Senior / Home)' : t.familyActivity.child}
                    </span>
                  </div>
                </div>

                {/* Status Dot */}
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <p className="text-[12.5px] text-slate-700 leading-snug font-normal pl-0.5">
                {isSarahCrosswalkActive
                  ? 'Stationary at Elmina West Community Park (Safe)'
                  : t.familyActivity.schoolArrivalLog}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Emergency SOS Button */}
        <button
          onClick={onTriggerSos}
          className="w-full bg-[#d91d24] hover:bg-[#c2181e] active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-2xl text-[14px] shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
          <span>{t.familyActivity.emergencySosButton}</span>
        </button>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNavBar activeTab="family" onTabChange={onNavigateTab} />
    </div>
  );
};
