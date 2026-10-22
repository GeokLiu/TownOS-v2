/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Layers,
  Sparkles,
  ShieldAlert,
  BellRing,
  CheckCircle,
} from 'lucide-react';
import { ActiveTab, ViewMode, FamilyTag, EscalationTier, NotificationItem, HouseholdAccount, CoGuardian } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { HomeScreen } from './screens/HomeScreen';
import { FamilyActivityScreen } from './screens/FamilyActivityScreen';
import { ScanTagScreen } from './screens/ScanTagScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BystanderEmergencyCardScreen } from './screens/BystanderEmergencyCardScreen';
import { AiRiskAssessorModal } from './components/AiRiskAssessorModal';
import { SosModal } from './components/SosModal';
import { CallModal } from './components/CallModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileModal } from './components/ProfileModal';
import { EscalationModal } from './components/EscalationModal';
import { AddressModal } from './components/AddressModal';
import { CoGuardiansModal } from './components/CoGuardiansModal';
import { LanguageModal } from './components/LanguageModal';
import { TownshipManagementModal } from './components/TownshipManagementModal';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import {
  INITIAL_TAGS,
  INITIAL_ESCALATION_TIERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACCOUNT,
  INITIAL_CO_GUARDIANS,
} from './data/mockData';

function AppContent() {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>('interactive');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Shared state
  const [account, setAccount] = useState<HouseholdAccount>(INITIAL_ACCOUNT);
  const [familyTags, setFamilyTags] = useState<FamilyTag[]>(INITIAL_TAGS);
  const [escalationTiers, setEscalationTiers] = useState<EscalationTier[]>(INITIAL_ESCALATION_TIERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [coGuardians, setCoGuardians] = useState<CoGuardian[]>(INITIAL_CO_GUARDIANS);

  // Active target tag for editing/scanning
  const [activeEditingTag, setActiveEditingTag] = useState<FamilyTag | null>(null);

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);
  const [selectedEscalationTierId, setSelectedEscalationTierId] = useState<string | undefined>();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCoGuardiansOpen, setIsCoGuardiansOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [managementModal, setManagementModal] = useState<{ isOpen: boolean; type: 'contact' | 'terms' }>({
    isOpen: false,
    type: 'contact',
  });

  // Call simulation state
  const [activeCall, setActiveCall] = useState<{
    isOpen: boolean;
    name: string;
    phone: string;
    isPatrol: boolean;
  }>({
    isOpen: false,
    name: '',
    phone: '',
    isPatrol: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEditProfile = (tag: FamilyTag) => {
    setActiveEditingTag(tag);
    setActiveTab('scan');
    setViewMode('interactive');
    showToast(t.toasts.holdNfcNear(tag.name));
  };

  const handleSaveTagProfile = (updated: FamilyTag) => {
    setFamilyTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    showToast(t.toasts.updatedProfile(updated.name));
  };

  const handleAiConfirm = () => {
    setIsAiModalOpen(false);
    showToast(t.toasts.aiLocked);
    setActiveTab('family');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast(t.toasts.allRead);
  };

  const handleUpdateTier = (tierId: string, updated: Partial<EscalationTier>) => {
    setEscalationTiers((prev) =>
      prev.map((t) => (t.id === tierId ? { ...t, ...updated } : t))
    );
    showToast(t.toasts.escalationUpdated);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen w-full bg-[#1e2024] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Controls & Navigation Bar */}
      <header className="w-full bg-[#17181c]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 font-black text-sm">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                {t.header.townOs}
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                City of Elmina
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">
              {t.settings.townshipEdgeSync} · {t.header.precinctBadge}
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              viewMode === 'interactive'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.header.interactiveDevice}</span>
          </button>

          <button
            onClick={() => setViewMode('board1')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              viewMode === 'board1'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.header.board1}</span>
          </button>

          <button
            onClick={() => setViewMode('board2')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              viewMode === 'board2'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.header.board2}</span>
          </button>

          <button
            onClick={() => setViewMode('board3')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              viewMode === 'board3'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.header.board3}</span>
          </button>

          <button
            onClick={() => setViewMode('all_screens')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              viewMode === 'all_screens'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{t.header.allScreens}</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer relative"
          >
            <BellRing className="w-3.5 h-3.5 text-red-400" />
            <span>{t.header.notifications}</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-extrabold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Test AI Assessor */}
          <button
            onClick={() => {
              setViewMode('interactive');
              setActiveTab('scan');
              setIsAiModalOpen(true);
            }}
            className="px-3 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.header.testAiAssessor}</span>
          </button>

          {/* Test SOS Button */}
          <button
            onClick={() => {
              setViewMode('interactive');
              setIsSosModalOpen(true);
            }}
            className="px-3 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-600/40 text-red-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>{t.header.simulateSos}</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-x-auto">
        {/* VIEW 1: Single Interactive Phone */}
        {viewMode === 'interactive' && (
          <div className="flex flex-col items-center">
            {/* Quick Screen Jump Pills */}
            <div className="flex items-center gap-2 mb-3 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-400 flex-wrap justify-center">
              <span className="font-semibold text-slate-300">{t.header.jumpScreen}</span>
              <button
                onClick={() => {
                  setActiveEditingTag(null);
                  setActiveTab('home');
                }}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'home' ? 'bg-red-500 text-white' : 'hover:text-white'
                }`}
              >
                01_Home
              </button>
              <button
                onClick={() => {
                  setActiveEditingTag(null);
                  setActiveTab('family');
                }}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'family' ? 'bg-red-500 text-white' : 'hover:text-white'
                }`}
              >
                02_Family_Activity
              </button>
              <button
                onClick={() => {
                  setActiveEditingTag(null);
                  setActiveTab('scan');
                }}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'scan' ? 'bg-red-500 text-white' : 'hover:text-white'
                }`}
              >
                03_Scan_Tag
              </button>
              <button
                onClick={() => {
                  setActiveEditingTag(null);
                  setActiveTab('settings');
                }}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'settings' ? 'bg-red-500 text-white' : 'hover:text-white'
                }`}
              >
                04_Settings
              </button>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-2 py-0.5 rounded-md font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                {t.header.aiModal}
              </button>
              <button
                onClick={() => setViewMode('board3')}
                className="px-2 py-0.5 rounded-md font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                {t.header.bystanderCard}
              </button>
            </div>

            <PhoneFrame
              title={
                activeTab === 'home'
                  ? '01_Home'
                  : activeTab === 'family'
                  ? '02_Family_Activity'
                  : activeTab === 'scan'
                  ? '03_Scan_Tag_Pairing'
                  : '04_General_Settings'
              }
            >
              {activeTab === 'home' && (
                <HomeScreen
                  onNavigateTab={(tab) => {
                    setActiveEditingTag(null);
                    setActiveTab(tab);
                  }}
                  onEditProfile={handleEditProfile}
                  onOpenProfile={() => setIsProfileOpen(true)}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  onOpenEscalation={(tierId) => {
                    setSelectedEscalationTierId(tierId);
                    setIsEscalationOpen(true);
                  }}
                  unreadNotificationsCount={unreadCount}
                  account={account}
                  familyTags={familyTags}
                  escalationTiers={escalationTiers}
                />
              )}

              {activeTab === 'family' && (
                <FamilyActivityScreen
                  onNavigateTab={(tab) => {
                    setActiveEditingTag(null);
                    setActiveTab(tab);
                  }}
                  onTriggerSos={() => setIsSosModalOpen(true)}
                  onSelectPerson={(person) => {
                    showToast(
                      `Selected ${person === 'grandpa' ? 'Grandpa Tan (+15s Crosswalk Priority)' : 'Sarah Tan (School Safe Zone)'}`
                    );
                  }}
                  onOpenProfile={() => setIsProfileOpen(true)}
                  onOpenNotifications={() => setIsNotificationsOpen(true)}
                  unreadNotificationsCount={unreadCount}
                  account={account}
                />
              )}

              {activeTab === 'scan' && (
                <ScanTagScreen
                  onNavigateTab={(tab) => {
                    setActiveEditingTag(null);
                    setActiveTab(tab);
                  }}
                  onBack={() => {
                    setActiveEditingTag(null);
                    setActiveTab('home');
                  }}
                  onOpenAiRiskAssessor={() => setIsAiModalOpen(true)}
                  targetTag={activeEditingTag}
                  onSaveTagProfile={handleSaveTagProfile}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsScreen
                  onNavigateTab={(tab) => {
                    setActiveEditingTag(null);
                    setActiveTab(tab);
                  }}
                  onOpenBystanderCard={() => setViewMode('board3')}
                  account={account}
                  onOpenAddressModal={() => setIsAddressModalOpen(true)}
                  onOpenProfileModal={() => setIsProfileOpen(true)}
                  onOpenCoGuardiansModal={() => setIsCoGuardiansOpen(true)}
                  onOpenLanguageModal={() => setIsLanguageOpen(true)}
                  onOpenContactModal={() => setManagementModal({ isOpen: true, type: 'contact' })}
                  onOpenTermsModal={() => setManagementModal({ isOpen: true, type: 'terms' })}
                />
              )}

              {/* Modals placed inside phone frame */}
              <AiRiskAssessorModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                onConfirm={handleAiConfirm}
                notes={activeEditingTag?.medicalNote}
              />

              <SosModal
                isOpen={isSosModalOpen}
                onClose={() => setIsSosModalOpen(false)}
              />

              <NotificationsModal
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                notifications={notifications}
                onMarkAllAsRead={handleMarkAllNotificationsRead}
                onNotificationClick={(notif) => {
                  showToast(`Opened alert: ${notif.title}`);
                }}
              />

              <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                account={account}
                onSave={(updated) => {
                  setAccount(updated);
                  showToast(t.toasts.updatedProfile(updated.name));
                }}
              />

              <EscalationModal
                isOpen={isEscalationOpen}
                onClose={() => setIsEscalationOpen(false)}
                tiers={escalationTiers}
                selectedTierId={selectedEscalationTierId}
                onUpdateTier={handleUpdateTier}
                onTestCall={(name, phone, isPatrol) => {
                  setActiveCall({
                    isOpen: true,
                    name,
                    phone,
                    isPatrol,
                  });
                }}
              />

              <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                currentAddress={account.address}
                onSaveAddress={(newAddr) => {
                  setAccount((prev) => ({ ...prev, address: newAddr }));
                  showToast(t.toasts.addressSaved);
                }}
              />

              <CoGuardiansModal
                isOpen={isCoGuardiansOpen}
                onClose={() => setIsCoGuardiansOpen(false)}
                coGuardians={coGuardians}
                onAddGuardian={(g) => {
                  setCoGuardians((prev) => [...prev, g]);
                  showToast(t.toasts.addedGuardian(g.name));
                }}
                onToggleNfcPermission={(id) => {
                  setCoGuardians((prev) =>
                    prev.map((g) =>
                      g.id === id ? { ...g, nfcWriteAccess: !g.nfcWriteAccess } : g
                    )
                  );
                }}
              />

              <LanguageModal
                isOpen={isLanguageOpen}
                onClose={() => setIsLanguageOpen(false)}
                onLanguageChanged={(name) => {
                  showToast(t.toasts.langSwitched(name));
                }}
              />

              <TownshipManagementModal
                isOpen={managementModal.isOpen}
                onClose={() => setManagementModal({ isOpen: false, type: 'contact' })}
                type={managementModal.type}
              />

              <CallModal
                isOpen={activeCall.isOpen}
                contactName={activeCall.name}
                phoneNumber={activeCall.phone}
                isPatrol={activeCall.isPatrol}
                onClose={() =>
                  setActiveCall({ isOpen: false, name: '', phone: '', isPatrol: false })
                }
              />
            </PhoneFrame>
          </div>
        )}

        {/* VIEW 2: Board 1 - Exactly Image 1 */}
        {viewMode === 'board1' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 py-4">
            <PhoneFrame title="01_Home">
              <HomeScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onEditProfile={handleEditProfile}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                onOpenEscalation={(tierId) => {
                  setSelectedEscalationTierId(tierId);
                  setIsEscalationOpen(true);
                }}
                unreadNotificationsCount={unreadCount}
                account={account}
                familyTags={familyTags}
                escalationTiers={escalationTiers}
              />
            </PhoneFrame>

            <PhoneFrame title="02_Family_Activity">
              <FamilyActivityScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onTriggerSos={() => setIsSosModalOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                unreadNotificationsCount={unreadCount}
                account={account}
              />
            </PhoneFrame>
          </div>
        )}

        {/* VIEW 3: Board 2 - Exactly Image 2 */}
        {viewMode === 'board2' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 py-4">
            <PhoneFrame title="03_Scan_Tag_Pairing">
              <ScanTagScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onOpenAiRiskAssessor={() => setIsAiModalOpen(true)}
                targetTag={familyTags[0]}
                onSaveTagProfile={handleSaveTagProfile}
              />
            </PhoneFrame>

            <PhoneFrame title="04_General_Settings">
              <SettingsScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onOpenBystanderCard={() => setViewMode('board3')}
                account={account}
                onOpenAddressModal={() => setIsAddressModalOpen(true)}
                onOpenProfileModal={() => setIsProfileOpen(true)}
                onOpenCoGuardiansModal={() => setIsCoGuardiansOpen(true)}
                onOpenLanguageModal={() => setIsLanguageOpen(true)}
                onOpenContactModal={() => setManagementModal({ isOpen: true, type: 'contact' })}
                onOpenTermsModal={() => setManagementModal({ isOpen: true, type: 'terms' })}
              />
            </PhoneFrame>
          </div>
        )}

        {/* VIEW 4: Board 3 - Exactly Image 3 */}
        {viewMode === 'board3' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 py-4">
            <PhoneFrame title="03_AI_Risk_Assessor_Modal">
              <ScanTagScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onOpenAiRiskAssessor={() => {}}
                targetTag={familyTags[0]}
              />
              <AiRiskAssessorModal
                isOpen={true}
                onClose={() => setViewMode('interactive')}
                onConfirm={handleAiConfirm}
              />
            </PhoneFrame>

            <PhoneFrame title="04_Bystander_Emergency_Card">
              <BystanderEmergencyCardScreen
                onBackToApp={() => {
                  setViewMode('interactive');
                  setActiveTab('home');
                }}
              />
            </PhoneFrame>
          </div>
        )}

        {/* VIEW 5: All 6 Screens Overview Gallery */}
        {viewMode === 'all_screens' && (
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6 justify-items-center">
            {/* 1. Home */}
            <PhoneFrame title="01_Home" width="w-[330px]">
              <HomeScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onEditProfile={handleEditProfile}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                onOpenEscalation={(tierId) => {
                  setSelectedEscalationTierId(tierId);
                  setIsEscalationOpen(true);
                }}
                account={account}
                familyTags={familyTags}
                escalationTiers={escalationTiers}
              />
            </PhoneFrame>

            {/* 2. Family Activity */}
            <PhoneFrame title="02_Family_Activity" width="w-[330px]">
              <FamilyActivityScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onTriggerSos={() => setIsSosModalOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                account={account}
              />
            </PhoneFrame>

            {/* 3. Scan Tag Pairing */}
            <PhoneFrame title="03_Scan_Tag_Pairing" width="w-[330px]">
              <ScanTagScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onOpenAiRiskAssessor={() => {
                  setViewMode('board3');
                }}
                targetTag={familyTags[0]}
              />
            </PhoneFrame>

            {/* 4. Settings */}
            <PhoneFrame title="04_General_Settings" width="w-[330px]">
              <SettingsScreen
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  setViewMode('interactive');
                }}
                onOpenBystanderCard={() => setViewMode('board3')}
                account={account}
                onOpenAddressModal={() => setIsAddressModalOpen(true)}
                onOpenProfileModal={() => setIsProfileOpen(true)}
                onOpenCoGuardiansModal={() => setIsCoGuardiansOpen(true)}
                onOpenLanguageModal={() => setIsLanguageOpen(true)}
                onOpenContactModal={() => setManagementModal({ isOpen: true, type: 'contact' })}
                onOpenTermsModal={() => setManagementModal({ isOpen: true, type: 'terms' })}
              />
            </PhoneFrame>

            {/* 5. AI Risk Assessor Modal */}
            <PhoneFrame title="03_AI_Risk_Assessor_Modal" width="w-[330px]">
              <ScanTagScreen
                onNavigateTab={() => {}}
                onOpenAiRiskAssessor={() => {}}
                targetTag={familyTags[0]}
              />
              <AiRiskAssessorModal
                isOpen={true}
                onClose={() => {}}
                onConfirm={() => {
                  setViewMode('interactive');
                  setActiveTab('family');
                }}
              />
            </PhoneFrame>

            {/* 6. Bystander Emergency Card */}
            <PhoneFrame title="04_Bystander_Emergency_Card" width="w-[330px]">
              <BystanderEmergencyCardScreen
                onBackToApp={() => {
                  setViewMode('interactive');
                  setActiveTab('home');
                }}
              />
            </PhoneFrame>
          </div>
        )}
      </main>

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
