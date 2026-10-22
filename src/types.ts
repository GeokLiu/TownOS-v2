export type ActiveTab = 'home' | 'family' | 'scan' | 'settings';

export type ScreenId = 
  | '01_Home'
  | '02_Family_Activity'
  | '03_Scan_Tag_Pairing'
  | '04_General_Settings'
  | '03_AI_Risk_Assessor_Modal'
  | '04_Bystander_Emergency_Card';

export type ViewMode = 
  | 'interactive' 
  | 'board1' // 01_Home & 02_Family_Activity
  | 'board2' // 03_Scan_Tag_Pairing & 04_General_Settings
  | 'board3' // 03_AI_Risk_Assessor_Modal & 04_Bystander_Emergency_Card
  | 'all_screens';

export interface FamilyTag {
  id: string;
  name: string;
  role: string;
  status: string;
  age?: number;
  avatarUrl: string;
  nfcId: string;
  medicalNote?: string;
  assistType?: string;
  primaryContact?: string;
  batteryLevel: number; // e.g. 18 (%) triggers < 20% alert
  hasElderlyAssist?: boolean; // whether this person specifically has crosswalk priority
}

export interface EscalationTier {
  id: string;
  tier: string;
  tierBadgeColor: 'red' | 'amber';
  role: string;
  contact: string;
  phone?: string;
  delaySeconds: number;
  isHotline?: boolean;
}

export interface ActivityLog {
  id: string;
  personName: string;
  roleBadge: string;
  time: string;
  actionText: string;
  highlightTag?: string;
  avatarUrl: string;
  tagId?: string;
}

export interface NotificationItem {
  id: string;
  type: 'arrival' | 'crossing' | 'weather_risk' | 'sos' | 'edge_status' | 'battery_low';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  memberId?: string;
  badge?: string;
}

export interface HouseholdAccount {
  name: string;
  phone: string;
  email: string;
  address: string;
  avatarUrl: string;
}

export interface CoGuardian {
  id: string;
  name: string;
  relation: string;
  phone: string;
  role: 'Admin' | 'Guardian' | 'Emergency Contact';
  nfcWriteAccess: boolean;
}
