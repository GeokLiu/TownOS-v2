import { FamilyTag, EscalationTier, ActivityLog, NotificationItem, HouseholdAccount, CoGuardian } from '../types';

export const AVATARS = {
  michelle: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
  grandpa: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80',
  sarah: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=256&h=256&q=80',
  meRunner: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  daniel: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
};

export const INITIAL_ACCOUNT: HouseholdAccount = {
  name: 'Michelle Tan',
  phone: '+60 12-345 6789',
  email: 'michelle.tan@elminawest.my',
  address: 'No. 28, Jalan Elmina Barat 2/3, Elmina West, 40160 Shah Alam, Selangor',
  avatarUrl: AVATARS.michelle,
};

export const INITIAL_TAGS: FamilyTag[] = [
  {
    id: 'grandpa',
    name: 'Grandpa Tan',
    role: '(Senior)',
    status: 'Paired - Battery-free sticker',
    age: 74,
    avatarUrl: AVATARS.grandpa,
    nfcId: '04:A3:89:FE:12:60:80',
    medicalNote: 'Diabetic / Slow Walker',
    assistType: 'Elderly Assist (Crosswalk Priority)',
    primaryContact: '+60 12-345 6789',
  },
  {
    id: 'sarah',
    name: 'Sarah Tan',
    role: '(Student)',
    status: 'Paired - Battery-free sticker',
    age: 10,
    avatarUrl: AVATARS.sarah,
    nfcId: '04:1B:32:89:C4:20:11',
    medicalNote: 'Asthma inhaler in blue backpack pocket',
    assistType: 'School Zone Transit Safe-Pass',
    primaryContact: '+60 12-345 6789',
  },
  {
    id: 'me',
    name: 'Me',
    role: '(Runner)',
    status: 'Paired - Battery-free sticker',
    age: 34,
    avatarUrl: AVATARS.meRunner,
    nfcId: '04:98:AA:77:2F:55:09',
    medicalNote: 'Allergic to penicillin',
    assistType: 'Night Runner Illuminated Pathway',
    primaryContact: '+60 16-398 4172',
  },
];

export const INITIAL_ESCALATION_TIERS: EscalationTier[] = [
  {
    id: 'tier-1',
    tier: '1st Tier',
    tierBadgeColor: 'red',
    role: 'Daughter - Primary',
    contact: 'Michelle Tan · +60 12-••• 8820',
    phone: '+60 12-345 6789',
    delaySeconds: 0,
  },
  {
    id: 'tier-2',
    tier: '2nd Tier',
    tierBadgeColor: 'red',
    role: 'Spouse',
    contact: 'Daniel Tan · +60 16-••• 4172',
    phone: '+60 16-398 4172',
    delaySeconds: 45,
  },
  {
    id: 'tier-3',
    tier: '3rd Tier',
    tierBadgeColor: 'amber',
    role: 'Elmina Township Auxiliary Police Patrol',
    contact: '24/7 Hotline',
    phone: '1-800-88-ELMINA',
    delaySeconds: 90,
    isHotline: true,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'weather_risk',
    title: 'Extreme Heat Warning (34°C)',
    message: 'High heat index in Elmina West. Grandpa Tan (Diabetic/Senior) risk advisory: ensure hydration & postpone afternoon walks.',
    time: '11:30 AM',
    isRead: false,
    memberId: 'grandpa',
    badge: 'Weather Risk',
  },
  {
    id: 'notif-2',
    type: 'crossing',
    title: 'Safe Crossing Recorded',
    message: 'Grandpa Tan crossed Persiaran Elmina (EW-XW02). Crosswalk radar automatically extended pedestrian green light by +15s.',
    time: '8:15 AM',
    isRead: false,
    memberId: 'grandpa',
    badge: '+15s Green Light',
  },
  {
    id: 'notif-3',
    type: 'arrival',
    title: 'Sarah Tan Arrived at School Gate',
    message: 'Sarah Tan tag detected entering Elmina West Primary School Safe Zone (Gate A). Status: Stationary (Safe).',
    time: '7:45 AM',
    isRead: false,
    memberId: 'sarah',
    badge: 'Safe Arrival',
  },
  {
    id: 'notif-4',
    type: 'edge_status',
    title: 'Township Edge Data Synchronized',
    message: 'Encrypted MQTT local-sync completed across all 14 Elmina West street beacons.',
    time: '6:00 AM',
    isRead: true,
    badge: 'MQTT Synced',
  },
];

export const INITIAL_CO_GUARDIANS: CoGuardian[] = [
  {
    id: 'cg-1',
    name: 'Daniel Tan',
    relation: 'Spouse / Co-Guardian',
    phone: '+60 16-398 4172',
    role: 'Guardian',
    nfcWriteAccess: true,
  },
  {
    id: 'cg-2',
    name: 'Auntie Mei Ling',
    relation: 'Family Emergency Contact',
    phone: '+60 17-224 8831',
    role: 'Emergency Contact',
    nfcWriteAccess: false,
  },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    personName: 'Grandpa Tan',
    roleBadge: '(Senior / Slow Walker)',
    time: '8:15 AM',
    actionText: 'Safe Crossing recorded at Persiaran Elmina (8:15 AM)',
    highlightTag: '+15s Green Light Extended',
    avatarUrl: AVATARS.grandpa,
  },
  {
    id: 'act-2',
    personName: 'Sarah Tan',
    roleBadge: '(Child)',
    time: '7:45 AM',
    actionText: 'Arrived at Elmina West Primary Gate (7:45 AM)',
    avatarUrl: AVATARS.sarah,
  },
];
