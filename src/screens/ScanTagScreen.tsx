import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2, User, Calendar, Phone, ArrowRight, Lock, Unlock, Radio, BatteryCharging, AlertTriangle } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { BottomNavBar } from '../components/BottomNavBar';
import { ActiveTab, FamilyTag } from '../types';
import { playNfcBeep } from '../utils/sound';
import { useI18n } from '../i18n/I18nContext';

interface ScanTagScreenProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onBack?: () => void;
  onOpenAiRiskAssessor: () => void;
  targetTag?: FamilyTag | null;
  onSaveTagProfile?: (tag: FamilyTag) => void;
}

export const ScanTagScreen: React.FC<ScanTagScreenProps> = ({
  onNavigateTab,
  onBack,
  onOpenAiRiskAssessor,
  targetTag,
  onSaveTagProfile,
}) => {
  const { t } = useI18n();
  const [tagScanned, setTagScanned] = useState(false);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [detectedUid, setDetectedUid] = useState(targetTag?.nfcId || '04:A3:89:FE:12:60:80');
  const [webNfcSupported, setWebNfcSupported] = useState(false);

  // Form states initialized to targetTag
  const [name, setName] = useState(targetTag?.name || '');
  const [age, setAge] = useState(targetTag?.age ? String(targetTag.age) : '');
  const [primaryContact, setPrimaryContact] = useState(targetTag?.primaryContact || '+60 12-345 6789');
  const [medicalNote, setMedicalNote] = useState(targetTag?.medicalNote || '');
  const [assistModeSelected, setAssistModeSelected] = useState(
    targetTag?.hasElderlyAssist ?? (targetTag?.id === 'grandpa')
  );
  const [batteryLevel, setBatteryLevel] = useState(targetTag?.batteryLevel ?? 85);

  // Check for Web NFC
  useEffect(() => {
    if (typeof window !== 'undefined' && 'NDEFReader' in window) {
      setWebNfcSupported(true);
    }
  }, []);

  // Update form whenever target tag changes
  useEffect(() => {
    if (targetTag) {
      setName(targetTag.name);
      setAge(targetTag.age ? String(targetTag.age) : '10');
      setPrimaryContact(targetTag.primaryContact || '+60 12-345 6789');
      setMedicalNote(targetTag.medicalNote || '');
      setDetectedUid(targetTag.nfcId);
      const isMichele =
        targetTag.name.toLowerCase().includes('michele') ||
        targetTag.name.toLowerCase().includes('michelle') ||
        targetTag.id === 'me';
      setAssistModeSelected(isMichele ? false : (targetTag.hasElderlyAssist ?? (targetTag.id === 'grandpa')));
      setBatteryLevel(targetTag.batteryLevel ?? 85);
      setTagScanned(false);
    } else {
      setName('');
      setAge('');
      setMedicalNote('');
      setAssistModeSelected(true);
      setBatteryLevel(85);
      setTagScanned(false);
    }
  }, [targetTag]);

  // Handle Tag Detection
  const handlePerformScan = async () => {
    setIsScanningActive(true);

    if (webNfcSupported && 'NDEFReader' in window) {
      try {
        const NDEF = (window as unknown as {
          NDEFReader: new () => {
            scan: () => Promise<void>;
            addEventListener: (
              event: string,
              handler: (event: { serialNumber?: string }) => void
            ) => void;
          };
        }).NDEFReader;
        const ndef = new NDEF();
        await ndef.scan();
        ndef.addEventListener('reading', ({ serialNumber }) => {
          if (serialNumber) {
            setDetectedUid(serialNumber.toUpperCase());
          }
          playNfcBeep();
          setTagScanned(true);
          setIsScanningActive(false);
          if (!name && !targetTag) {
            setName('Sarah Tan');
            setAge('10');
            setMedicalNote('Asthma inhaler in blue backpack pocket');
            setAssistModeSelected(true);
            setBatteryLevel(18);
          }
        });
        return;
      } catch (err) {
        console.debug('Web NFC scan error or user declined, falling back to simulated read', err);
      }
    }

    setTimeout(() => {
      playNfcBeep();
      setTagScanned(true);
      setIsScanningActive(false);
      if (!name && !targetTag) {
        setName('Sarah Tan');
        setAge('10');
        setMedicalNote('Asthma inhaler in blue backpack pocket');
        setAssistModeSelected(true);
        setBatteryLevel(18);
      }
    }, 600);
  };

  const handleContinue = () => {
    const isMichele =
      (name || targetTag?.name || '').toLowerCase().includes('michele') ||
      (name || targetTag?.name || '').toLowerCase().includes('michelle') ||
      targetTag?.id === 'me';

    // Michele Tan does not need extend time!
    const finalAssist = isMichele ? false : assistModeSelected;

    if (onSaveTagProfile) {
      const updatedTag: FamilyTag = {
        id: targetTag?.id || 'new-tag',
        name: name || targetTag?.name || (isMichele ? 'Michele Tan' : 'Sarah Tan'),
        role: targetTag?.role || (isMichele ? '(Runner / Admin)' : '(Family)'),
        status: targetTag?.status || 'Paired · Smart Edge Tag',
        age: parseInt(age, 10) || targetTag?.age || (isMichele ? 34 : 10),
        avatarUrl: targetTag?.avatarUrl || (isMichele ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80' : 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=256&h=256&q=80'),
        nfcId: detectedUid,
        medicalNote: medicalNote || (isMichele ? 'Active adult runner. Standard crossing cadence.' : ''),
        primaryContact,
        assistType: finalAssist ? 'Elderly Assist (Crosswalk Priority)' : 'Standard Transit Pass (No Extension Needed)',
        hasElderlyAssist: finalAssist,
        batteryLevel,
      };
      onSaveTagProfile(updatedTag);
    }
    onOpenAiRiskAssessor();
  };

  const isLowBattery = batteryLevel < 20;

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f6f8] text-slate-900 select-none overflow-hidden relative">
      {/* iOS Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-1 pb-3 space-y-3.5">
        {/* Top Header */}
        <div className="flex items-start gap-3 pt-1">
          <button
            onClick={onBack || (() => onNavigateTab('home'))}
            className="p-1 -ml-1 text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {targetTag ? t.scan.editTitle(targetTag.name) : t.scan.pairTitle}
            </h1>
            <p className="text-[12px] text-slate-400 font-normal">
              {t.scan.subtitle}
            </p>
          </div>
        </div>

        {/* 1. Phone & Tag NFC Pairing Graphic */}
        <div className="flex flex-col items-center justify-center pt-0 pb-0">
          <div
            onClick={handlePerformScan}
            className="relative w-52 h-28 flex items-center justify-center cursor-pointer group"
            title={t.scan.tapToScanButton}
          >
            {/* Phone Vector Graphic */}
            <div className={`relative w-22 h-26 border-[3px] border-slate-800 rounded-2xl bg-white shadow-sm transform -rotate-12 flex flex-col items-center p-1.5 transition-transform ${isScanningActive ? 'scale-105' : 'group-hover:scale-102'}`}>
              <div className="w-6 h-1 bg-slate-300 rounded-full mb-1"></div>
              <div className="w-full flex-1 border border-slate-100 rounded-lg bg-slate-50 flex items-center justify-center">
                <div className={`w-7 h-7 rounded-full transition-colors flex items-center justify-center ${tagScanned ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200/60'}`}>
                  {tagScanned ? <CheckCircle2 className="w-4 h-4" /> : <Radio className="w-3.5 h-3.5 text-slate-400" />}
                </div>
              </div>
              <div className="w-4 h-0.5 bg-slate-400 rounded-full mt-1"></div>

              {/* Green Radio Waves */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-500">
                <svg className={`w-7 h-10 stroke-current fill-none stroke-[2.5] ${isScanningActive ? 'animate-pulse' : ''}`} viewBox="0 0 24 40">
                  <path d="M 4,8 A 20,20 0 0,1 4,32" strokeLinecap="round" />
                  <path d="M 12,4 A 30,30 0 0,1 12,36" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Round Smart Tag */}
            <div className="relative ml-8 flex items-center justify-center">
              {!tagScanned && (
                <div className="absolute w-18 h-18 rounded-full border border-red-500/60 animate-ping pointer-events-none" />
              )}

              <div className={`w-14 h-14 rounded-full border-2 border-slate-700 bg-white shadow-md flex items-center justify-center transition-all ${tagScanned ? 'ring-4 ring-emerald-400/40' : 'group-hover:ring-4 group-hover:ring-red-400/30'}`}>
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center">
                  <div className="flex items-center gap-0.5 text-red-500">
                    <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                      <path d="M 8,7 A 8,8 0 0,1 8,17" strokeLinecap="round" />
                      <path d="M 13,4 A 14,14 0 0,1 13,20" strokeLinecap="round" />
                      <path d="M 18,1 A 20,20 0 0,1 18,23" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Battery Status Indicator */}
          <div className="w-full mt-1.5 flex flex-col items-center">
            {isLowBattery ? (
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200/90 text-red-600 px-3 py-1 rounded-full text-xs font-extrabold shadow-2xs">
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center leading-none">
                  !
                </span>
                <span>{batteryLevel}%</span>
              </div>
            ) : (
              <div className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                <span>{batteryLevel}%</span>
              </div>
            )}
          </div>

          {/* Interactive Tap-to-Scan prompt button */}
          {!tagScanned ? (
            <button
              onClick={handlePerformScan}
              disabled={isScanningActive}
              className="mt-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full text-xs font-bold shadow-md shadow-red-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Radio className={`w-3.5 h-3.5 ${isScanningActive ? 'animate-spin' : ''}`} />
              <span>{isScanningActive ? t.scan.scanningText : t.scan.tapToScanButton}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setTagScanned(false);
              }}
              className="mt-1 text-[11px] text-slate-400 hover:text-slate-700 font-semibold underline cursor-pointer"
            >
              {t.scan.scanAnotherTag}
            </button>
          )}
        </div>

        {/* 2. Detected Tag Banner */}
        {tagScanned ? (
          <div className="bg-[#edfbf4] border border-[#a6ebd0] rounded-2xl py-2 px-4 flex items-center justify-between text-[#0b824e] shadow-xs animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span className="font-bold text-xs tracking-wider font-mono">
                {t.scan.tagDetected} {detectedUid}
              </span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isLowBattery ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>
              {batteryLevel}%
            </span>
          </div>
        ) : (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl py-2 px-4 flex items-center justify-center gap-2 text-amber-800 text-xs shadow-xs">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-semibold">
              {targetTag ? t.scan.tagPromptLocked : t.scan.tagPromptNew}
            </span>
          </div>
        )}

        {/* 3. Tag Owner Details Form */}
        <div className={`space-y-2 pt-1 transition-all duration-200 ${!tagScanned ? 'opacity-40 pointer-events-none filter blur-[0.5px]' : 'opacity-100'}`}>
          <div className="flex items-center justify-between pl-1">
            <span className="block text-[11.5px] font-bold text-slate-500 tracking-tight">
              {t.scan.tagOwnerDetails}
            </span>
            {tagScanned && (
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                <Unlock className="w-3 h-3" /> {t.scan.unlocked}
              </span>
            )}
          </div>

          {/* Row: Name and Age */}
          <div className="flex items-center gap-2">
            {/* Name input */}
            <div className="flex-1 bg-white rounded-2xl px-3.5 py-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500 shrink-0 stroke-[2]" />
              <input
                type="text"
                disabled={!tagScanned}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-hidden"
                placeholder={`${t.scan.nameLabel}: Sarah Tan`}
              />
            </div>

            {/* Age input */}
            <div className="w-28 bg-white rounded-2xl px-3.5 py-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 stroke-[2]" />
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                <span className="text-slate-500 font-normal">{t.scan.ageLabel}</span>
                <input
                  type="text"
                  disabled={!tagScanned}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-8 font-semibold text-slate-800 bg-transparent outline-hidden"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* Crosswalk Priority / Assist Card */}
          {(() => {
            const isMichele =
              (name || targetTag?.name || '').toLowerCase().includes('michele') ||
              (name || targetTag?.name || '').toLowerCase().includes('michelle') ||
              targetTag?.id === 'me';

            return (
              <div
                onClick={() => {
                  if (tagScanned) {
                    setAssistModeSelected(!assistModeSelected);
                  }
                }}
                className={`cursor-pointer rounded-2xl p-3.5 flex items-center gap-3 transition-all ${
                  assistModeSelected
                    ? 'bg-white border-2 border-red-500 shadow-sm'
                    : 'bg-white border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    assistModeSelected ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  {assistModeSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-[13px] leading-tight">
                      {assistModeSelected
                        ? t.scan.assistTitle
                        : isMichele
                        ? 'Standard Transit Pass (No Extension Needed)'
                        : 'Standard Transit Pass'}
                    </h4>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        assistModeSelected
                          ? 'text-red-600 bg-red-50'
                          : 'text-slate-600 bg-slate-100'
                      }`}
                    >
                      {assistModeSelected ? '+30s Buffer' : 'Standard Speed'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                    {assistModeSelected
                      ? t.scan.assistSubtitle
                      : isMichele
                      ? 'Michele Tan crosses at standard cadence. No traffic light extension needed.'
                      : 'Standard pedestrian crossing time (no extension buffer).'}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Primary contact input */}
          <div className="bg-white rounded-2xl px-3.5 py-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-500 shrink-0 stroke-[2]" />
            <div className="flex items-center gap-1 text-xs text-slate-800 w-full">
              <span className="text-slate-500 font-normal whitespace-nowrap">
                {t.scan.primaryContactLabel}
              </span>
              <input
                type="text"
                disabled={!tagScanned}
                value={primaryContact}
                onChange={(e) => setPrimaryContact(e.target.value)}
                className="w-full font-semibold text-slate-800 bg-transparent outline-hidden"
              />
            </div>
          </div>

          {/* Medical note input */}
          <div className="bg-white rounded-2xl px-3.5 py-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
            <div className="w-4 h-4 border border-slate-500 rounded-[3px] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-slate-600 leading-none">+</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-800 w-full">
              <span className="text-slate-500 font-normal whitespace-nowrap">
                {t.scan.medicalNoteLabel}
              </span>
              <input
                type="text"
                disabled={!tagScanned}
                value={medicalNote}
                onChange={(e) => setMedicalNote(e.target.value)}
                className="w-full font-semibold text-slate-800 bg-transparent outline-hidden"
                placeholder="Asthma inhaler in blue backpack pocket"
              />
            </div>
          </div>
        </div>

        {/* 4. Continue CTA */}
        <div className="pt-2 text-center">
          <button
            onClick={handleContinue}
            disabled={!tagScanned}
            className={`inline-flex items-center gap-1.5 text-[13px] font-bold py-1 transition-all group ${
              tagScanned
                ? 'text-slate-900 hover:text-red-600 cursor-pointer'
                : 'text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <span>{t.scan.continueAiCta}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNavBar activeTab="scan" onTabChange={onNavigateTab} />
    </div>
  );
};
