import React, { useState, useEffect } from 'react';
import { ChevronLeft, CheckCircle2, User, Calendar, Phone, ArrowRight, Lock, Unlock, Radio } from 'lucide-react';
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

  // Form states
  const [name, setName] = useState(targetTag?.name || '');
  const [age, setAge] = useState(targetTag?.age ? String(targetTag.age) : '');
  const [primaryContact, setPrimaryContact] = useState(targetTag?.primaryContact || '+60 12-345 6789');
  const [medicalNote, setMedicalNote] = useState(targetTag?.medicalNote || '');
  const [assistModeSelected, setAssistModeSelected] = useState(true);

  // Check for Web NFC
  useEffect(() => {
    if (typeof window !== 'undefined' && 'NDEFReader' in window) {
      setWebNfcSupported(true);
    }
  }, []);

  // Update form if target tag changes
  useEffect(() => {
    if (targetTag) {
      setName(targetTag.name);
      setAge(targetTag.age ? String(targetTag.age) : '74');
      setPrimaryContact(targetTag.primaryContact || '+60 12-345 6789');
      setMedicalNote(targetTag.medicalNote || 'Diabetic / Slow Walker');
      setDetectedUid(targetTag.nfcId);
      setTagScanned(false);
    } else {
      setName('');
      setAge('');
      setMedicalNote('');
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
            setName('Grandpa Tan');
            setAge('74');
            setMedicalNote('Diabetic / Slow Walker');
          }
        });
        return;
      } catch (err) {
        console.debug('Web NFC scan error or user declined, falling back to instant simulated read', err);
      }
    }

    setTimeout(() => {
      playNfcBeep();
      setTagScanned(true);
      setIsScanningActive(false);
      if (!name && !targetTag) {
        setName('Grandpa Tan');
        setAge('74');
        setMedicalNote('Diabetic / Slow Walker');
      }
    }, 600);
  };

  const handleContinue = () => {
    if (targetTag && onSaveTagProfile) {
      onSaveTagProfile({
        ...targetTag,
        name,
        age: parseInt(age, 10) || targetTag.age,
        primaryContact,
        medicalNote,
        nfcId: detectedUid,
      });
    }
    onOpenAiRiskAssessor();
  };

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
            className="relative w-52 h-32 flex items-center justify-center cursor-pointer group"
            title={t.scan.tapToScanButton}
          >
            {/* Phone Vector Graphic */}
            <div className={`relative w-24 h-28 border-[3px] border-slate-800 rounded-2xl bg-white shadow-sm transform -rotate-12 flex flex-col items-center p-1.5 transition-transform ${isScanningActive ? 'scale-105' : 'group-hover:scale-102'}`}>
              <div className="w-6 h-1 bg-slate-300 rounded-full mb-1"></div>
              <div className="w-full flex-1 border border-slate-100 rounded-lg bg-slate-50 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center ${tagScanned ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200/60'}`}>
                  {tagScanned ? <CheckCircle2 className="w-5 h-5" /> : <Radio className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
              <div className="w-4 h-0.5 bg-slate-400 rounded-full mt-1"></div>

              {/* Green Radio Waves */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-500">
                <svg className={`w-8 h-12 stroke-current fill-none stroke-[2.5] ${isScanningActive ? 'animate-pulse' : ''}`} viewBox="0 0 24 40">
                  <path d="M 4,8 A 20,20 0 0,1 4,32" strokeLinecap="round" />
                  <path d="M 12,4 A 30,30 0 0,1 12,36" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Round NFC Sticker Tag */}
            <div className="relative ml-8 flex items-center justify-center">
              {!tagScanned && (
                <div className="absolute w-20 h-20 rounded-full border border-red-500/60 animate-ping pointer-events-none" />
              )}

              <div className={`w-16 h-16 rounded-full border-2 border-slate-700 bg-white shadow-md flex items-center justify-center transition-all ${tagScanned ? 'ring-4 ring-emerald-400/40' : 'group-hover:ring-4 group-hover:ring-red-400/30'}`}>
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center">
                  <div className="flex items-center gap-0.5 text-red-500">
                    <svg className="w-7 h-7 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                      <path d="M 8,7 A 8,8 0 0,1 8,17" strokeLinecap="round" />
                      <path d="M 13,4 A 14,14 0 0,1 13,20" strokeLinecap="round" />
                      <path d="M 18,1 A 20,20 0 0,1 18,23" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-medium text-center mt-1">
            {t.scan.stickerDesc}
          </p>

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
          <div className="bg-[#edfbf4] border border-[#a6ebd0] rounded-2xl py-2.5 px-4 flex items-center justify-center gap-2 text-[#0b824e] shadow-xs animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span className="font-bold text-xs tracking-wider font-mono">
              {t.scan.tagDetected} {detectedUid}
            </span>
          </div>
        ) : (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl py-2.5 px-4 flex items-center justify-center gap-2 text-amber-800 text-xs shadow-xs">
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
            <div className="flex-1 bg-white rounded-2xl px-3.5 py-3 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500 shrink-0 stroke-[2]" />
              <input
                type="text"
                disabled={!tagScanned}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-hidden"
                placeholder={`${t.scan.nameLabel}: Grandpa Tan`}
              />
            </div>

            {/* Age input */}
            <div className="w-28 bg-white rounded-2xl px-3.5 py-3 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0 stroke-[2]" />
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
                <span className="text-slate-500 font-normal">{t.scan.ageLabel}</span>
                <input
                  type="text"
                  disabled={!tagScanned}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-8 font-semibold text-slate-800 bg-transparent outline-hidden"
                  placeholder="74"
                />
              </div>
            </div>
          </div>

          {/* Special Feature Assist Card */}
          <div
            onClick={() => tagScanned && setAssistModeSelected(!assistModeSelected)}
            className={`cursor-pointer rounded-2xl p-3.5 flex items-center gap-3 transition-all ${
              assistModeSelected
                ? 'bg-white border-2 border-red-500 shadow-sm'
                : 'bg-white border border-slate-200/80'
            }`}
          >
            <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center shrink-0">
              {assistModeSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              )}
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-[13px] leading-tight">
                {t.scan.assistTitle}
              </h4>
              <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                {t.scan.assistSubtitle}
              </p>
            </div>
          </div>

          {/* Primary contact input */}
          <div className="bg-white rounded-2xl px-3.5 py-3 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
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
          <div className="bg-white rounded-2xl px-3.5 py-3 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex items-center gap-2">
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
                placeholder="Diabetic / Slow Walker"
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
