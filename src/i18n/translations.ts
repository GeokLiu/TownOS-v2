export type Language = 'en' | 'ms' | 'zh';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    family: string;
    scanTag: string;
    settings: string;
  };
  // Header & Global
  header: {
    townOs: string;
    precinctBadge: string;
    liveBadge: string;
    residentStatus: string;
    notifications: string;
    testAiAssessor: string;
    simulateSos: string;
    interactiveDevice: string;
    board1: string;
    board2: string;
    board3: string;
    allScreens: string;
    jumpScreen: string;
    bystanderCard: string;
    aiModal: string;
  };
  // Home Screen
  home: {
    familyAdminTitle: string;
    activeTagsTitle: string;
    pairedBadge: (count: number) => string;
    editProfile: string;
    batteryFreeSticker: string;
    escalationTitle: string;
    configure: string;
    daughterPrimary: string;
    spouse: string;
    auxiliaryPatrol: string;
    hotline247: string;
    escalationTimingBanner: string;
    roles: {
      senior: string;
      student: string;
      runner: string;
    };
  };
  // Family Activity Screen
  familyActivity: {
    familyTagsCount: (count: number) => string;
    allSystemsOnline: string;
    activityTitle: string;
    edgeLogSubtitle: string;
    seniorSlowWalker: string;
    child: string;
    safeCrossingLog: string;
    greenLightExtended: string;
    schoolArrivalLog: string;
    emergencySosButton: string;
    map: {
      communityPark: string;
      riversidePark: string;
      jalanElmina2: string;
      homePerimeter: string;
      schoolSafeZone: string;
      schoolZoneStationary: string;
      crosswalkSafeCrossing: string;
    };
  };
  // Scan & Pair Screen
  scan: {
    pairTitle: string;
    editTitle: (name: string) => string;
    subtitle: string;
    stickerDesc: string;
    tapToScanButton: string;
    scanningText: string;
    scanAnotherTag: string;
    tagDetected: string;
    tagPromptLocked: string;
    tagPromptNew: string;
    tagOwnerDetails: string;
    unlocked: string;
    nameLabel: string;
    ageLabel: string;
    assistTitle: string;
    assistSubtitle: string;
    primaryContactLabel: string;
    medicalNoteLabel: string;
    continueAiCta: string;
  };
  // AI Risk Assessor Modal
  aiModal: {
    title: string;
    defaultObservation: string;
    autoTunedBadge: string;
    bufferApplied: string;
    reminder: string;
    confirmButton: string;
  };
  // Bystander Emergency Card
  bystander: {
    bannerTitle: string;
    bannerSub: string;
    residentSub: string;
    criticalNoteTitle: string;
    criticalNoteBody: string;
    callDaughterButton: string;
    callPatrolButton: string;
    privacyFooter: string;
    backToApp: string;
  };
  // Settings Screen
  settings: {
    title: string;
    accountSection: string;
    editDetails: string;
    name: string;
    phone: string;
    email: string;
    emailNotSet: string;
    householdAddress: string;
    editAddress: string;
    addAddress: string;
    permissionsCoGuardians: string;
    preferencesSection: string;
    language: string;
    pushNotifications: string;
    criticalEdgeAlerts: string;
    dailyArrivalSummaries: string;
    extremeWeatherWarnings: string;
    securityPrivacySection: string;
    bystanderDataLock: string;
    bystanderDataLockDesc: string;
    townshipEdgeSync: string;
    townshipEdgeSyncDesc: string;
    syncedBadge: string;
    previewBystanderCard: string;
    supportLegalSection: string;
    contactManagement: string;
    termsOfService: string;
    appVersion: string;
  };
  // Notifications Modal
  notifications: {
    title: string;
    unreadCountText: (count: number) => string;
    markAllRead: string;
    allTab: string;
    risksTab: string;
    activityTab: string;
    noNotifications: string;
  };
  // Profile Modal
  profile: {
    title: string;
    verifiedResident: string;
    fullNameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    householdId: string;
    tagsPaired: string;
    saveButton: string;
  };
  // Escalation Modal
  escalation: {
    title: string;
    subtitle: string;
    tiersTab: string;
    historyTab: string;
    triggerDelay: string;
    contactLabel: string;
    phoneHotlineLabel: string;
    autoEscalateLabel: string;
    instant: string;
    testCallButton: string;
    doneButton: string;
  };
  // Address Modal
  address: {
    title: string;
    subtitle: string;
    unitStreetLabel: string;
    precinctLabel: string;
    postcodeLabel: string;
    cityStateLabel: string;
    verifiedNote: string;
    saveButton: string;
  };
  // Co-Guardians Modal
  coguardians: {
    title: string;
    subtitle: string;
    writeAccessLabel: string;
    allowed: string;
    readOnly: string;
    addNewButton: string;
    addNewTitle: string;
    cancel: string;
    save: string;
    done: string;
  };
  // SOS Modal
  sos: {
    triggeringTitle: string;
    notifyingSub: string;
    cancelButton: string;
    dispatchNowButton: string;
    patrolDispatchedTitle: string;
    patrolEnRouteSub: string;
    gpsBroadcastTitle: string;
    gpsBroadcastSub: string;
    closeMonitorButton: string;
    ready: string;
    standby: string;
  };
  // Call Modal
  call: {
    connectingSub: string;
    callerLocation: string;
    subject: string;
    priority: string;
    priorityVal: string;
    endCallButton: string;
  };
  // Toast Messages
  toasts: {
    holdNfcNear: (name: string) => string;
    updatedProfile: (name: string) => string;
    aiLocked: string;
    allRead: string;
    escalationUpdated: string;
    addressSaved: string;
    addedGuardian: (name: string) => string;
    langSwitched: (lang: string) => string;
    patrolSelected: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      family: 'Family',
      scanTag: 'Scan Tag',
      settings: 'Settings',
    },
    header: {
      townOs: 'TownOS',
      precinctBadge: 'ELMINA-WEST-882',
      liveBadge: 'LIVE - ELMINA WEST',
      residentStatus: 'Family Admin · Elmina West resident',
      notifications: 'Alerts',
      testAiAssessor: 'Test AI Assessor',
      simulateSos: 'Simulate SOS',
      interactiveDevice: 'Interactive Device',
      board1: 'Board 1 (01 & 02)',
      board2: 'Board 2 (03 & 04)',
      board3: 'Board 3 (Modal & Card)',
      allScreens: 'All 6 Screens',
      jumpScreen: 'Jump Screen:',
      bystanderCard: 'Bystander Card',
      aiModal: 'AI Modal',
    },
    home: {
      familyAdminTitle: 'Family Admin · Elmina West resident',
      activeTagsTitle: 'Active Family Tags',
      pairedBadge: (count) => `${count} paired`,
      editProfile: 'Edit profile',
      batteryFreeSticker: 'Paired - Battery-free sticker',
      escalationTitle: 'Emergency Escalation Hierarchy',
      configure: 'Configure',
      daughterPrimary: 'Daughter - Primary',
      spouse: 'Spouse',
      auxiliaryPatrol: 'Elmina Township Auxiliary Police Patrol',
      hotline247: '24/7 Hotline',
      escalationTimingBanner: 'Escalation timing, safety triggers & history',
      roles: {
        senior: '(Senior)',
        student: '(Student)',
        runner: '(Runner)',
      },
    },
    familyActivity: {
      familyTagsCount: (count) => `${count} family tags`,
      allSystemsOnline: 'All systems online',
      activityTitle: 'Family Activity',
      edgeLogSubtitle: 'Today, Real-time Edge Log',
      seniorSlowWalker: '(Senior / Slow Walker)',
      child: '(Child)',
      safeCrossingLog: 'Safe Crossing recorded at Persiaran Elmina (8:15 AM)',
      greenLightExtended: '+15s Green Light Extended',
      schoolArrivalLog: 'Arrived at Elmina West Primary Gate (7:45 AM)',
      emergencySosButton: 'Emergency SOS',
      map: {
        communityPark: 'COMMUNITY PARK',
        riversidePark: 'RIVERSIDE PARK',
        jalanElmina2: 'JALAN ELMINA 2',
        homePerimeter: 'Home Perimeter',
        schoolSafeZone: 'Elmina West Primary School Safe Zone',
        schoolZoneStationary: 'Elmina School Zone • Stationary (Safe)',
        crosswalkSafeCrossing: 'Persiaran Elmina Crosswalk • Safe Crossing (+15s)',
      },
    },
    scan: {
      pairTitle: 'Pair a family tag',
      editTitle: (name) => `Edit ${name}`,
      subtitle: 'One tap. A safer everyday.',
      stickerDesc: '25mm NFC sticker · No battery. No charging.',
      tapToScanButton: 'Tap Sticker to Scan',
      scanningText: 'Scanning NFC Sticker...',
      scanAnotherTag: 'Scan another tag',
      tagDetected: 'Tag Detected:',
      tagPromptLocked: 'Tap physical tag to verify ownership & unlock editing',
      tagPromptNew: 'Scan NFC tag first to register details',
      tagOwnerDetails: 'Tag owner details',
      unlocked: 'Unlocked',
      nameLabel: 'Name',
      ageLabel: 'Age:',
      assistTitle: 'Elderly Assist (Crosswalk Priority)',
      assistSubtitle: 'Extra crossing time, automatically.',
      primaryContactLabel: 'Primary contact:',
      medicalNoteLabel: 'Medical note:',
      continueAiCta: 'Continue to AI behavioral & risk profile',
    },
    aiModal: {
      title: 'TownOS AI Risk Assessor',
      defaultObservation: 'Diabetic / Slow Walker. Gets disoriented in afternoon heat.',
      autoTunedBadge: 'Auto-tuned township parameter:',
      bufferApplied: '+30s Crosswalk Extension Buffer Applied',
      reminder: "Reminder: Attach this sticker to Grandpa's daily glasses or walking cane so it leaves the house with him.",
      confirmButton: 'Confirm Safety Profile & Lock',
    },
    bystander: {
      bannerTitle: 'TownOS Emergency Medical ID —',
      bannerSub: 'You can help. Contact family or patrol.',
      residentSub: 'City of Elmina Resident',
      criticalNoteTitle: 'CRITICAL MEDICAL NOTE',
      criticalNoteBody: 'Diabetic / Slow Walker. If conscious, offer sweet juice. Do not give water if lying down.',
      callDaughterButton: 'Call Daughter: +60 12-345 6789',
      callPatrolButton: 'Call Elmina Auxiliary Patrol (1-Tap Call)',
      privacyFooter: 'Sensitive personal data is locked and password-protected by family.',
      backToApp: '← Back to TownOS Resident App',
    },
    settings: {
      title: 'Settings',
      accountSection: 'Account & Household',
      editDetails: 'Edit Details',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      emailNotSet: 'Email not set',
      householdAddress: 'Household address',
      editAddress: 'Edit address',
      addAddress: 'Add address',
      permissionsCoGuardians: 'Permissions & co-guardians',
      preferencesSection: 'Preferences',
      language: 'Language',
      pushNotifications: 'Push Notifications',
      criticalEdgeAlerts: 'Critical edge alerts',
      dailyArrivalSummaries: 'Daily arrival summaries',
      extremeWeatherWarnings: 'Extreme weather warnings',
      securityPrivacySection: 'Security & Privacy',
      bystanderDataLock: 'Bystander Rescue Data Lock',
      bystanderDataLockDesc: 'Masks sensitive medical notes behind passcode/PIN',
      townshipEdgeSync: 'Township Edge Data Sync',
      townshipEdgeSyncDesc: 'Encrypted MQTT local-sync status',
      syncedBadge: 'Synced',
      previewBystanderCard: 'Preview Bystander Emergency Web Card',
      supportLegalSection: 'Support & Legal',
      contactManagement: 'Contact Elmina Township Management',
      termsOfService: 'Terms of Service',
      appVersion: 'App Version',
    },
    notifications: {
      title: 'TownOS Edge Notifications',
      unreadCountText: (count) => (count > 0 ? `${count} unread alert${count > 1 ? 's' : ''}` : 'All caught up'),
      markAllRead: 'Mark all read',
      allTab: 'All',
      risksTab: '⚠️ Risk Alerts',
      activityTab: 'Arrivals & Crossing',
      noNotifications: 'No notifications in this category.',
    },
    profile: {
      title: 'Family Admin Profile',
      verifiedResident: 'Verified Resident',
      fullNameLabel: 'Full Name',
      phoneLabel: 'Mobile Phone (Emergency SMS/Calls)',
      emailLabel: 'Email',
      householdId: 'Household ID:',
      tagsPaired: '3 Paired',
      saveButton: 'Save Profile Changes',
    },
    escalation: {
      title: 'Emergency Escalation Protocol',
      subtitle: 'Automated multi-tier dispatch hierarchy',
      tiersTab: 'Escalation Tiers',
      historyTab: 'Triggers & History Log',
      triggerDelay: 'Trigger Delay:',
      contactLabel: 'Contact / Display Name',
      phoneHotlineLabel: 'Phone Hotline',
      autoEscalateLabel: 'Auto-Escalate If Unanswered After:',
      instant: 'Instant',
      testCallButton: 'Test Emergency Call Simulation',
      doneButton: 'Done',
    },
    address: {
      title: 'Household Address',
      subtitle: 'Connected to Elmina Township Edge IoT & Patrol Dispatch',
      unitStreetLabel: 'Unit & Street Address',
      precinctLabel: 'Township Precinct',
      postcodeLabel: 'Postcode',
      cityStateLabel: 'City / State',
      verifiedNote: 'Township verified: Geofenced within Home Safe Perimeter mesh.',
      saveButton: 'Save Household Address',
    },
    coguardians: {
      title: 'Permissions & Co-Guardians',
      subtitle: 'Household tag pairing & medical data access',
      writeAccessLabel: 'NFC Tag Write Access:',
      allowed: 'Allowed',
      readOnly: 'Read Only',
      addNewButton: 'Add Another Co-Guardian',
      addNewTitle: 'Add New Co-Guardian',
      cancel: 'Cancel',
      save: 'Save Guardian',
      done: 'Done',
    },
    sos: {
      triggeringTitle: 'Triggering Emergency SOS',
      notifyingSub: 'Notifying Elmina Auxiliary Patrol and all family guardians in:',
      cancelButton: 'Cancel SOS',
      dispatchNowButton: 'Dispatch Now',
      patrolDispatchedTitle: 'Patrol Dispatched',
      patrolEnRouteSub: 'Auxiliary Patrol Unit EW-04 is en route to Persiaran Elmina Crosswalk. ETA ~3 mins.',
      gpsBroadcastTitle: 'GPS Broadcast Live',
      gpsBroadcastSub: 'All registered perimeter IoT beacons are prioritizing visual beacon alerts.',
      closeMonitorButton: 'Close & Monitor',
      ready: 'Ready',
      standby: 'Standby',
    },
    call: {
      connectingSub: 'Connecting to City of Elmina Edge Link...',
      callerLocation: 'Caller Location:',
      subject: 'Subject:',
      priority: 'Priority:',
      priorityVal: 'High (Diabetic Alert)',
      endCallButton: 'End Call',
    },
    toasts: {
      holdNfcNear: (name) => `Hold ${name}'s NFC sticker near device to unlock editing.`,
      updatedProfile: (name) => `Updated safety profile for ${name}`,
      aiLocked: 'TownOS Safety Profile & Crosswalk Buffer (+30s) Locked to Tag!',
      allRead: 'All edge notifications marked as read.',
      escalationUpdated: 'Escalation tier preferences updated.',
      addressSaved: 'Household address updated and geofenced!',
      addedGuardian: (name) => `Added ${name} as co-guardian`,
      langSwitched: (lang) => `Language switched to ${lang}`,
      patrolSelected: 'Selected',
    },
  },
  ms: {
    nav: {
      home: 'Utama',
      family: 'Keluarga',
      scanTag: 'Imbas Tag',
      settings: 'Tetapan',
    },
    header: {
      townOs: 'TownOS',
      precinctBadge: 'ELMINA-BARAT-882',
      liveBadge: 'LANGSUNG - ELMINA BARAT',
      residentStatus: 'Pentadbir Keluarga · Penduduk Elmina Barat',
      notifications: 'Pemberitahuan',
      testAiAssessor: 'Uji Penilai AI',
      simulateSos: 'Simulasi SOS',
      interactiveDevice: 'Peranti Interaktif',
      board1: 'Papan 1 (01 & 02)',
      board2: 'Papan 2 (03 & 04)',
      board3: 'Papan 3 (Modal & Kad)',
      allScreens: 'Semua 6 Skrin',
      jumpScreen: 'Pintas Skrin:',
      bystanderCard: 'Kad Orang Awam',
      aiModal: 'Modal AI',
    },
    home: {
      familyAdminTitle: 'Pentadbir Keluarga · Penduduk Elmina Barat',
      activeTagsTitle: 'Tag Keluarga Aktif',
      pairedBadge: (count) => `${count} dipadankan`,
      editProfile: 'Sunting profil',
      batteryFreeSticker: 'Dipadankan - Pelekat tanpa bateri',
      escalationTitle: 'Hierarki Eskalasi Kecemasan',
      configure: 'Konfigurasi',
      daughterPrimary: 'Anak Perempuan - Utama',
      spouse: 'Pasangan',
      auxiliaryPatrol: 'Rondaan Polis Bantuan Perbandaran Elmina',
      hotline247: 'Talian 24/7',
      escalationTimingBanner: 'Masa eskalasi, pencetus keselamatan & sejarah',
      roles: {
        senior: '(Warga Emas)',
        student: '(Pelajar)',
        runner: '(Pelari)',
      },
    },
    familyActivity: {
      familyTagsCount: (count) => `${count} tag keluarga`,
      allSystemsOnline: 'Semua sistem dalam talian',
      activityTitle: 'Aktiviti Keluarga',
      edgeLogSubtitle: 'Hari Ini, Log Pinggir Masa Nyata',
      seniorSlowWalker: '(Warga Emas / Berjalan Perlahan)',
      child: '(Kanak-kanak)',
      safeCrossingLog: 'Lintasan Selamat direkodkan di Persiaran Elmina (8:15 PG)',
      greenLightExtended: '+15s Lampu Hijau Dilanjutkan',
      schoolArrivalLog: 'Tiba di Pintu Sekolah Rendah Elmina Barat (7:45 PG)',
      emergencySosButton: 'Kecemasan SOS',
      map: {
        communityPark: 'TAMAN KOMUNITI',
        riversidePark: 'TAMAN TEPI SUNGAI',
        jalanElmina2: 'JALAN ELMINA 2',
        homePerimeter: 'Perimeter Rumah',
        schoolSafeZone: 'Zon Selamat SK Elmina Barat',
        schoolZoneStationary: 'Zon Sekolah Elmina • Pegun (Selamat)',
        crosswalkSafeCrossing: 'Lintasan Persiaran Elmina • Melintas Selamat (+15s)',
      },
    },
    scan: {
      pairTitle: 'Padankan tag keluarga',
      editTitle: (name) => `Sunting ${name}`,
      subtitle: 'Satu sentuhan. Setiap hari lebih selamat.',
      stickerDesc: 'Pelekat NFC 25mm · Tiada bateri. Tanpa caj.',
      tapToScanButton: 'Sentuh Pelekat untuk Mengimbas',
      scanningText: 'Mengimbas Pelekat NFC...',
      scanAnotherTag: 'Imbas tag lain',
      tagDetected: 'Tag Dikesan:',
      tagPromptLocked: 'Sentuh tag fizikal untuk sahkan pemilikan & buka suntingan',
      tagPromptNew: 'Imbas tag NFC dahulu untuk mendaftar butiran',
      tagOwnerDetails: 'Butiran pemilik tag',
      unlocked: 'Dibuka',
      nameLabel: 'Nama',
      ageLabel: 'Umur:',
      assistTitle: 'Bantuan Warga Emas (Keutamaan Melintas)',
      assistSubtitle: 'Masa melintas tambahan, secara automatik.',
      primaryContactLabel: 'Nombor hubungan utama:',
      medicalNoteLabel: 'Nota perubatan:',
      continueAiCta: 'Teruskan ke profil tingkah laku & risiko AI',
    },
    aiModal: {
      title: 'Penilai Risiko AI TownOS',
      defaultObservation: 'Kencing Manis / Berjalan Perlahan. Cenderung keliru dalam cuaca panas petang.',
      autoTunedBadge: 'Parameter perbandaran talaan automatik:',
      bufferApplied: 'Buffer Lanjutan Lintasan +30s Dikenakan',
      reminder: 'Peringatan: Pasangkan pelekat ini pada cermin mata atau tongkat harian Datuk supaya sentiasa dibawa.',
      confirmButton: 'Sahkan Profil Keselamatan & Kunci',
    },
    bystander: {
      bannerTitle: 'ID Perubatan Kecemasan TownOS —',
      bannerSub: 'Anda boleh bantu. Hubungi keluarga atau peronda.',
      residentSub: 'Penduduk Bandar Elmina',
      criticalNoteTitle: 'NOTA PERUBATAN KRITIKAL',
      criticalNoteBody: 'Kencing Manis / Berjalan Perlahan. Jika sedar, berikan jus manis. Jangan beri air jika sedang berbaring.',
      callDaughterButton: 'Hubungi Anak Perempuan: +60 12-345 6789',
      callPatrolButton: 'Hubungi Peronda Bantuan Elmina (Panggilan 1-Sentuh)',
      privacyFooter: 'Data peribadi sensitif dikunci dan dilindungi kata laluan oleh keluarga.',
      backToApp: '← Kembali ke Aplikasi Penduduk TownOS',
    },
    settings: {
      title: 'Tetapan',
      accountSection: 'Akaun & Isi Rumah',
      editDetails: 'Sunting Butiran',
      name: 'Nama',
      phone: 'Telefon',
      email: 'Emel',
      emailNotSet: 'Emel belum ditetapkan',
      householdAddress: 'Alamat kediaman',
      editAddress: 'Sunting alamat',
      addAddress: 'Tambah alamat',
      permissionsCoGuardians: 'Kebenaran & penjaga bersama',
      preferencesSection: 'Keutamaan',
      language: 'Bahasa',
      pushNotifications: 'Pemberitahuan Tolak',
      criticalEdgeAlerts: 'Makluman pinggir kritikal',
      dailyArrivalSummaries: 'Ringkasan ketibaan harian',
      extremeWeatherWarnings: 'Amaran cuaca ekstrem',
      securityPrivacySection: 'Keselamatan & Privasi',
      bystanderDataLock: 'Kunci Data Penyelamat Awam',
      bystanderDataLockDesc: 'Sembunyikan nota perubatan sensitif di sebalik kod PIN',
      townshipEdgeSync: 'Penyegerakan Data Pinggir Perbandaran',
      townshipEdgeSyncDesc: 'Status penyegerakan tempatan MQTT disulitkan',
      syncedBadge: 'Disegerakkan',
      previewBystanderCard: 'Pratonton Kad Web Kecemasan Orang Awam',
      supportLegalSection: 'Sokongan & Undang-undang',
      contactManagement: 'Hubungi Pengurusan Perbandaran Elmina',
      termsOfService: 'Syarat Perkhidmatan',
      appVersion: 'Versi Aplikasi',
    },
    notifications: {
      title: 'Pemberitahuan Pinggir TownOS',
      unreadCountText: (count) => (count > 0 ? `${count} amaran belum dibaca` : 'Tiada pemberitahuan baharu'),
      markAllRead: 'Tanda semua dibaca',
      allTab: 'Semua',
      risksTab: '⚠️ Amaran Risiko',
      activityTab: 'Ketibaan & Lintasan',
      noNotifications: 'Tiada pemberitahuan dalam kategori ini.',
    },
    profile: {
      title: 'Profil Pentadbir Keluarga',
      verifiedResident: 'Penduduk Disahkan',
      fullNameLabel: 'Nama Penuh',
      phoneLabel: 'Telefon Bimbit (SMS/Panggilan Kecemasan)',
      emailLabel: 'Emel',
      householdId: 'ID Kediaman:',
      tagsPaired: '3 Dipadankan',
      saveButton: 'Simpan Perubahan Profil',
    },
    escalation: {
      title: 'Protokol Eskalasi Kecemasan',
      subtitle: 'Hierarki penghantaran bantuan berbilang peringkat automatik',
      tiersTab: 'Peringkat Eskalasi',
      historyTab: 'Pencetus & Log Sejarah',
      triggerDelay: 'Kelewatan Pencetus:',
      contactLabel: 'Nama Hubungan / Paparan',
      phoneHotlineLabel: 'Talian Telefon',
      autoEscalateLabel: 'Eskalasi Automatik Jika Tidak Dijawab Selepas:',
      instant: 'Serta-merta',
      testCallButton: 'Uji Simulasi Panggilan Kecemasan',
      doneButton: 'Selesai',
    },
    address: {
      title: 'Alamat Kediaman',
      subtitle: 'Dihubungkan ke IoT Pinggir & Polis Bantuan Elmina',
      unitStreetLabel: 'No. Unit & Alamat Jalan',
      precinctLabel: 'Presint Perbandaran',
      postcodeLabel: 'Poskod',
      cityStateLabel: 'Bandar / Negeri',
      verifiedNote: 'Perbandaran disahkan: Dihadkan dalam mesh Perimeter Selamat Rumah.',
      saveButton: 'Simpan Alamat Kediaman',
    },
    coguardians: {
      title: 'Kebenaran & Penjaga Bersama',
      subtitle: 'Padanan tag kediaman & akses data perubatan',
      writeAccessLabel: 'Akses Tulis Tag NFC:',
      allowed: 'Dibenarkan',
      readOnly: 'Baca Sahaja',
      addNewButton: 'Tambah Penjaga Bersama Lain',
      addNewTitle: 'Tambah Penjaga Bersama Baharu',
      cancel: 'Batal',
      save: 'Simpan Penjaga',
      done: 'Selesai',
    },
    sos: {
      triggeringTitle: 'Mencetuskan SOS Kecemasan',
      notifyingSub: 'Memberitahu Polis Bantuan Elmina dan semua penjaga keluarga dalam:',
      cancelButton: 'Batal SOS',
      dispatchNowButton: 'Hantar Bantuan Sekarang',
      patrolDispatchedTitle: 'Peronda Dihantar',
      patrolEnRouteSub: 'Unit Rondaan Bantuan EW-04 sedang menuju ke Persiaran Elmina. Anggaran masa ~3 minit.',
      gpsBroadcastTitle: 'Siaran GPS Langsung',
      gpsBroadcastSub: 'Semua suar IoT perimeter mengutamakan amaran visual.',
      closeMonitorButton: 'Tutup & Pantau',
      ready: 'Sedia',
      standby: 'Bersedia',
    },
    call: {
      connectingSub: 'Menyambung ke Pautan Pinggir Bandar Elmina...',
      callerLocation: 'Lokasi Pemanggil:',
      subject: 'Subjek:',
      priority: 'Keutamaan:',
      priorityVal: 'Tinggi (Amaran Kencing Manis)',
      endCallButton: 'Tamatkan Panggilan',
    },
    toasts: {
      holdNfcNear: (name) => `Dekatkan pelekat NFC ${name} ke telefon untuk menyunting.`,
      updatedProfile: (name) => `Profil keselamatan ${name} dikemas kini`,
      aiLocked: 'Profil Keselamatan & Buffer Lintasan (+30s) Dikunci ke Tag!',
      allRead: 'Semua pemberitahuan ditandakan sebagai dibaca.',
      escalationUpdated: 'Keutamaan peringkat eskalasi dikemas kini.',
      addressSaved: 'Alamat kediaman dikemas kini dan dipagar geofens!',
      addedGuardian: (name) => `${name} ditambah sebagai penjaga bersama`,
      langSwitched: (lang) => `Bahasa ditukar kepada ${lang}`,
      patrolSelected: 'Dipilih',
    },
  },
  zh: {
    nav: {
      home: '首页',
      family: '家庭',
      scanTag: '扫标签',
      settings: '设置',
    },
    header: {
      townOs: 'TownOS',
      precinctBadge: '艾美娜西区-882',
      liveBadge: '实时 - 艾美娜西区',
      residentStatus: '家庭管理员 · 艾美娜西区居民',
      notifications: '警报提醒',
      testAiAssessor: '测试 AI 评估器',
      simulateSos: '模拟 SOS 呼救',
      interactiveDevice: '交互设备',
      board1: '展板 1 (01 与 02)',
      board2: '展板 2 (03 与 04)',
      board3: '展板 3 (弹窗与卡片)',
      allScreens: '全部 6 个界面',
      jumpScreen: '跳转界面:',
      bystanderCard: '急救卡片',
      aiModal: 'AI 弹窗',
    },
    home: {
      familyAdminTitle: '家庭管理员 · 艾美娜西区居民',
      activeTagsTitle: '已激活家庭标签',
      pairedBadge: (count) => `${count} 个已配对`,
      editProfile: '编辑资料',
      batteryFreeSticker: '已配对 - 免电池贴纸',
      escalationTitle: '紧急升级联络层级',
      configure: '配置',
      daughterPrimary: '女儿 - 主要联络人',
      spouse: '配偶',
      auxiliaryPatrol: '艾美娜镇辅警巡逻队',
      hotline247: '24小时应急热线',
      escalationTimingBanner: '升级时限、安全触发条件与历史记录',
      roles: {
        senior: '(长者)',
        student: '(学生)',
        runner: '(跑步者)',
      },
    },
    familyActivity: {
      familyTagsCount: (count) => `${count} 个家庭标签`,
      allSystemsOnline: '所有系统在线运行',
      activityTitle: '家庭活动',
      edgeLogSubtitle: '今日边缘实时日志',
      seniorSlowWalker: '(长者 / 行动缓慢)',
      child: '(儿童)',
      safeCrossingLog: '在艾美娜林荫大道记录到安全通行 (上午 8:15)',
      greenLightExtended: '+15秒 延长绿灯时间',
      schoolArrivalLog: '已到达艾美娜西区小学大门 (上午 7:45)',
      emergencySosButton: '紧急 SOS 救援',
      map: {
        communityPark: '社区公园',
        riversidePark: '滨河公园',
        jalanElmina2: '艾美娜二路',
        homePerimeter: '家庭安全周界',
        schoolSafeZone: '艾美娜西区小学安全区',
        schoolZoneStationary: '艾美娜学校区域 • 静止 (安全)',
        crosswalkSafeCrossing: '艾美娜林荫大道斑马线 • 安全过街 (+15秒)',
      },
    },
    scan: {
      pairTitle: '配对家庭标签',
      editTitle: (name) => `编辑 ${name}`,
      subtitle: '轻碰一下，日常更安全。',
      stickerDesc: '25毫米 NFC 贴纸 · 无需电池 · 无需充电',
      tapToScanButton: '轻碰贴纸进行扫描',
      scanningText: '正在扫描 NFC 贴纸...',
      scanAnotherTag: '扫描其他标签',
      tagDetected: '已检测到标签:',
      tagPromptLocked: '请轻碰实体标签以验证所有权并解锁编辑',
      tagPromptNew: '请先扫描 NFC 标签以登记信息',
      tagOwnerDetails: '标签所有者信息',
      unlocked: '已解锁',
      nameLabel: '姓名',
      ageLabel: '年龄:',
      assistTitle: '长者协助 (斑马线优先通行)',
      assistSubtitle: '系统将自动分配额外的过街通行时间。',
      primaryContactLabel: '紧急主联系人:',
      medicalNoteLabel: '医疗健康备注:',
      continueAiCta: '继续至 AI 行为与风险评估',
    },
    aiModal: {
      title: 'TownOS AI 风险评估器',
      defaultObservation: '糖尿病 / 行动迟缓。在午后高温下容易迷失方向。',
      autoTunedBadge: '自动调节镇区参数:',
      bufferApplied: '已应用 +30秒 斑马线延长缓冲',
      reminder: '提醒: 请将此贴纸贴在爷爷的日常眼镜或拐杖上，确保随身携带。',
      confirmButton: '确认安全档案并锁定',
    },
    bystander: {
      bannerTitle: 'TownOS 紧急医疗身份识别卡 —',
      bannerSub: '您可以施以援手。请联系家属或巡逻队。',
      residentSub: '艾美娜城居民',
      criticalNoteTitle: '关键医疗须知',
      criticalNoteBody: '糖尿病 / 行动迟缓。如神志清醒，可提供甜果汁。平躺时切勿喂水。',
      callDaughterButton: '致电女儿: +60 12-345 6789',
      callPatrolButton: '一键呼叫艾美娜辅警巡逻',
      privacyFooter: '敏感个人隐私资料已由家属锁定并加密保护。',
      backToApp: '← 返回 TownOS 居民主应用',
    },
    settings: {
      title: '设置',
      accountSection: '账户与家庭',
      editDetails: '修改资料',
      name: '姓名',
      phone: '联系电话',
      email: '电子邮箱',
      emailNotSet: '未设置邮箱',
      householdAddress: '家庭住宅地址',
      editAddress: '修改地址',
      addAddress: '添加地址',
      permissionsCoGuardians: '权限与共同监护人',
      preferencesSection: '偏好设置',
      language: '显示语言',
      pushNotifications: '推送通知',
      criticalEdgeAlerts: '关键边缘警报',
      dailyArrivalSummaries: '每日到达行程摘要',
      extremeWeatherWarnings: '极端高温天气预警',
      securityPrivacySection: '安全与隐私',
      bystanderDataLock: '旁观者救援数据锁定',
      bystanderDataLockDesc: '在密码/PIN码后加密遮蔽敏感病史',
      townshipEdgeSync: '镇区边缘数据同步',
      townshipEdgeSyncDesc: '加密 MQTT 局域边缘同步状态',
      syncedBadge: '已同步',
      previewBystanderCard: '预览旁观者应急救援网页卡',
      supportLegalSection: '支持与法律',
      contactManagement: '联系艾美娜镇区管理处',
      termsOfService: '服务条款',
      appVersion: '应用版本',
    },
    notifications: {
      title: 'TownOS 边缘警报通知',
      unreadCountText: (count) => (count > 0 ? `${count} 条未读警报` : '全部已阅'),
      markAllRead: '全部标为已读',
      allTab: '全部',
      risksTab: '⚠️ 风险警报',
      activityTab: '到达与过街',
      noNotifications: '该分类下暂无通知。',
    },
    profile: {
      title: '家庭管理员资料',
      verifiedResident: '认证常住居民',
      fullNameLabel: '全名',
      phoneLabel: '手机号码 (紧急短信/通话)',
      emailLabel: '电子邮箱',
      householdId: '家庭编码:',
      tagsPaired: '已配对 3 个',
      saveButton: '保存个人资料修改',
    },
    escalation: {
      title: '紧急升级联络协议',
      subtitle: '多层级自动化应急联络调度机制',
      tiersTab: '升级层级',
      historyTab: '触发与历史日志',
      triggerDelay: '触发延迟:',
      contactLabel: '联系人 / 显示名称',
      phoneHotlineLabel: '直通电话',
      autoEscalateLabel: '若未接听则自动升级等待时间:',
      instant: '即时',
      testCallButton: '测试紧急呼叫模拟',
      doneButton: '完成',
    },
    address: {
      title: '家庭住宅地址',
      subtitle: '已连结至艾美娜镇区边缘物联网与安保巡逻调度',
      unitStreetLabel: '门牌号与街道名称',
      precinctLabel: '社区分区',
      postcodeLabel: '邮政编码',
      cityStateLabel: '城市 / 州属',
      verifiedNote: '镇区已认证: 已纳入家庭安全周界电子围栏。',
      saveButton: '保存家庭地址',
    },
    coguardians: {
      title: '权限与共同监护人',
      subtitle: '家庭标签配对与医疗数据管理权限',
      writeAccessLabel: 'NFC 标签写入权限:',
      allowed: '允许',
      readOnly: '只读',
      addNewButton: '添加其他共同监护人',
      addNewTitle: '添加新共同监护人',
      cancel: '取消',
      save: '保存监护人',
      done: '完成',
    },
    sos: {
      triggeringTitle: '正在启动紧急 SOS 呼救',
      notifyingSub: '正在通知艾美娜辅警巡逻队与所有家庭监护人，倒计时:',
      cancelButton: '取消 SOS',
      dispatchNowButton: '立即呼叫出警',
      patrolDispatchedTitle: '巡逻队已出发',
      patrolEnRouteSub: '辅警 EW-04 巡逻车正前往 Persiaran Elmina 斑马线，预计 3 分钟内抵达。',
      gpsBroadcastTitle: '实时 GPS 定位广播中',
      gpsBroadcastSub: '所有周边物联网信标已优先激活高亮警示模式。',
      closeMonitorButton: '关闭并持续监控',
      ready: '就绪',
      standby: '待命',
    },
    call: {
      connectingSub: '正在连接艾美娜城物联网专线...',
      callerLocation: '呼叫者位置:',
      subject: '求助对象:',
      priority: '优先级:',
      priorityVal: '高危 (糖尿病患者警报)',
      endCallButton: '结束通话',
    },
    toasts: {
      holdNfcNear: (name) => `请将 ${name} 的 NFC 贴纸靠近手机以解锁编辑。`,
      updatedProfile: (name) => `已更新 ${name} 的安全档案`,
      aiLocked: 'TownOS 安全档案与斑马线缓冲 (+30秒) 已成功写入并锁定！',
      allRead: '所有通知已标记为已读。',
      escalationUpdated: '升级联络层级配置已更新。',
      addressSaved: '家庭地址已更新并纳入电子安全网格！',
      addedGuardian: (name) => `已将 ${name} 添加为共同监护人`,
      langSwitched: (lang) => `已切换语言为 ${lang}`,
      patrolSelected: '已选定',
    },
  },
};
