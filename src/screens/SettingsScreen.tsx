import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { ActiveTab, HouseholdAccount } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface SettingsScreenProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenBystanderCard?: () => void;
  account: HouseholdAccount;
  onOpenAddressModal: () => void;
  onOpenProfileModal: () => void;
  onOpenCoGuardiansModal: () => void;
  onOpenLanguageModal: () => void;
  onOpenContactModal: () => void;
  onOpenTermsModal: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigateTab,
  onOpenBystanderCard,
  account,
  onOpenAddressModal,
  onOpenProfileModal,
  onOpenCoGuardiansModal,
  onOpenLanguageModal,
  onOpenContactModal,
  onOpenTermsModal,
}) => {
  const { t, languageLabel } = useI18n();
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [dailySummaries, setDailySummaries] = useState(true);
  const [weatherWarnings, setWeatherWarnings] = useState(false);
  const [lowBatteryAlerts, setLowBatteryAlerts] = useState(true); // <20% battery alert toggle
  const [bystanderDataLock, setBystanderDataLock] = useState(true);

  const displayAddress = account.address
    ? account.address.split(',')[0]
    : 'Elmina West';

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f6f8] text-slate-900 select-none overflow-hidden relative">
      {/* iOS Status Bar */}
      <StatusBar />

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-1 pb-4 space-y-4">
        {/* Top Header */}
        <div className="pt-1">
          <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.settings.title}
          </h1>
        </div>

        {/* 1. Account & Household Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pl-1">
            <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] tracking-tight">
              {t.settings.accountSection}
            </h3>
            <span
              onClick={onOpenProfileModal}
              className="text-[11px] text-red-600 font-semibold cursor-pointer hover:underline"
            >
              {t.settings.editDetails}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 text-xs space-y-2.5">
            <div
              onClick={onOpenProfileModal}
              className="flex justify-between items-center py-0.5 cursor-pointer hover:bg-slate-50/80 -mx-1 px-1 rounded-lg transition-colors"
            >
              <span className="text-slate-400">{t.settings.name}</span>
              <span className="font-bold text-slate-800">{account.name}</span>
            </div>
            <div
              onClick={onOpenProfileModal}
              className="flex justify-between items-center py-0.5 cursor-pointer hover:bg-slate-50/80 -mx-1 px-1 rounded-lg transition-colors"
            >
              <span className="text-slate-400">{t.settings.phone}</span>
              <span className="font-bold text-slate-800">{account.phone}</span>
            </div>
            <div
              onClick={onOpenProfileModal}
              className="flex justify-between items-center py-0.5 cursor-pointer hover:bg-slate-50/80 -mx-1 px-1 rounded-lg transition-colors"
            >
              <span className="text-slate-400">{t.settings.email}</span>
              <span className="font-medium text-slate-800">{account.email || t.settings.emailNotSet}</span>
            </div>
            <div
              onClick={onOpenAddressModal}
              className="flex justify-between items-center py-0.5 cursor-pointer hover:bg-slate-50/80 -mx-1 px-1 rounded-lg transition-colors"
            >
              <span className="text-slate-400">{t.settings.householdAddress}</span>
              <span className="font-medium text-slate-800 text-right truncate max-w-[200px]">
                {displayAddress} · <span className="font-bold text-red-600 hover:underline">{t.settings.editAddress}</span>
              </span>
            </div>
          </div>

          {/* Permissions & co-guardians Link */}
          <div
            onClick={onOpenCoGuardiansModal}
            className="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <span className="font-bold text-slate-800 text-xs">
              {t.settings.permissionsCoGuardians}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
          </div>
        </div>

        {/* 2. Preferences Section */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] tracking-tight pl-1">
            {t.settings.preferencesSection}
          </h3>

          {/* Language Selector */}
          <div
            onClick={onOpenLanguageModal}
            className="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div>
              <p className="font-bold text-slate-900 text-xs leading-tight">
                {t.settings.language}
              </p>
              <p className="text-[10.5px] text-slate-400 mt-0.5 leading-tight">
                {languageLabel}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
          </div>

          {/* Push Notifications Card with Low Battery Alert */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 space-y-3">
            <span className="block font-bold text-slate-900 text-xs">
              {t.settings.pushNotifications}
            </span>

            {/* Toggle 1: Low battery alerts (< 20%) */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-800 font-semibold block">
                  {t.settings.lowBatteryAlerts}
                </span>
                <span className="text-[10.5px] text-amber-600 font-medium">
                  Triggers alert when tag battery drops &lt; 20%
                </span>
              </div>
              <button
                onClick={() => setLowBatteryAlerts(!lowBatteryAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                  lowBatteryAlerts ? 'bg-[#0d945a]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                    lowBatteryAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Critical edge alerts */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-700 font-medium">
                {t.settings.criticalEdgeAlerts}
              </span>
              <button
                onClick={() => setCriticalAlerts(!criticalAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                  criticalAlerts ? 'bg-[#0d945a]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                    criticalAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Daily arrival summaries */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-700 font-medium">
                {t.settings.dailyArrivalSummaries}
              </span>
              <button
                onClick={() => setDailySummaries(!dailySummaries)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                  dailySummaries ? 'bg-[#0d945a]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                    dailySummaries ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 4: Extreme weather warnings */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-700 font-medium">
                {t.settings.extremeWeatherWarnings}
              </span>
              <button
                onClick={() => setWeatherWarnings(!weatherWarnings)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                  weatherWarnings ? 'bg-[#0d945a]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                    weatherWarnings ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Security & Privacy */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] tracking-tight pl-1">
            {t.settings.securityPrivacySection}
          </h3>

          {/* Bystander Rescue Data Lock */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 flex items-center justify-between">
            <div className="max-w-[210px]">
              <p className="font-bold text-slate-900 text-xs leading-tight">
                {t.settings.bystanderDataLock}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                {t.settings.bystanderDataLockDesc}
              </p>
            </div>
            <button
              onClick={() => setBystanderDataLock(!bystanderDataLock)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
                bystanderDataLock ? 'bg-[#0d945a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  bystanderDataLock ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Township Edge Data Sync */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 text-xs leading-tight">
                {t.settings.townshipEdgeSync}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                {t.settings.townshipEdgeSyncDesc}
              </p>
            </div>
            <span className="bg-[#e9f8f1] text-[#0d945a] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {t.settings.syncedBadge}
            </span>
          </div>

          {/* Shortcut to view Bystander Rescue Page */}
          {onOpenBystanderCard && (
            <button
              onClick={onOpenBystanderCard}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl p-3 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer"
            >
              <span>{t.settings.previewBystanderCard}</span>
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          )}
        </div>

        {/* 4. Support & Legal */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] tracking-tight pl-1">
            {t.settings.supportLegalSection}
          </h3>

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.025)] border border-slate-100/90 divide-y divide-slate-100 overflow-hidden text-xs">
            <div
              onClick={onOpenContactModal}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span className="font-bold text-slate-800">
                {t.settings.contactManagement}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
            </div>

            <div
              onClick={onOpenTermsModal}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <span className="font-bold text-slate-800">
                {t.settings.termsOfService}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 stroke-[2]" />
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <span className="font-bold text-slate-800">
                {t.settings.appVersion}
              </span>
              <span className="font-mono text-slate-400 font-medium">
                2.1.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNavBar activeTab="settings" onTabChange={onNavigateTab} />
    </div>
  );
};
