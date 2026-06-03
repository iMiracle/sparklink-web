export const SITE_NAME = 'Sparklink';

export const API_PREFIX = '/api/v1';

export const COUNTRY_CODES = [
  { code: '+86', label: '中国', minLen: 11, maxLen: 11 },
  { code: '+84', label: '越南', minLen: 9, maxLen: 10 },
  { code: '+66', label: '泰国', minLen: 9, maxLen: 10 },
  { code: '+62', label: '印尼', minLen: 10, maxLen: 13 },
  { code: '+60', label: '马来西亚', minLen: 9, maxLen: 10 },
  { code: '+55', label: '巴西', minLen: 10, maxLen: 11 },
  { code: '+1', label: '美/加', minLen: 10, maxLen: 10 },
  { code: '+44', label: '英国', minLen: 10, maxLen: 11 },
  { code: '+34', label: '西班牙', minLen: 9, maxLen: 9 },
  { code: '+52', label: '墨西哥', minLen: 10, maxLen: 10 },
  { code: '+81', label: '日本', minLen: 10, maxLen: 11 },
  { code: '+82', label: '韩国', minLen: 10, maxLen: 11 },
  { code: '+91', label: '印度', minLen: 10, maxLen: 10 },
  { code: '+971', label: '阿联酋', minLen: 9, maxLen: 9 },
  { code: '+966', label: '沙特', minLen: 9, maxLen: 10 },
  { code: '+20', label: '埃及', minLen: 10, maxLen: 10 },
  { code: '+61', label: '澳洲', minLen: 9, maxLen: 10 },
  { code: '+33', label: '法国', minLen: 9, maxLen: 9 },
  { code: '+49', label: '德国', minLen: 10, maxLen: 11 },
  { code: '+39', label: '意大利', minLen: 10, maxLen: 10 },
] as const;

export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'pt-BR', label: 'Português (BR)' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
] as const;

export const MOCK_USER = {
  phone: '138****5678',
  plan: 'VIP Member',
  planType: 'yearly' as const,
  expiryDate: '2026-05-23',
  devices: 'Unlimited',
  status: 'Active' as const,
  inviteCode: 'SPARK123456',
} as const;
