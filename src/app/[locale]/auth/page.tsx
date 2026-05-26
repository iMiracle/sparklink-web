'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Smartphone, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { api, setToken } from '@/lib/api';

const countryCodes = [
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
];

export default function AuthPage() {
  const t = useTranslations('Auth');
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const plan = searchParams.get('plan');
  const [tab, setTab] = useState<'qr' | 'sms'>('qr');
  const [countryCode, setCountryCode] = useState('+86');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ccOpen, setCcOpen] = useState(false);
  const ccRef = useRef<HTMLDivElement>(null);

  const currentCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  const isValidPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.length >= currentCountry.minLen && digits.length <= currentCountry.maxLen;
  };

  const handleSendCode = async () => {
    if (!isValidPhone(phone)) {
      setError(t('phoneInvalid'));
      return;
    }
    setIsLoading(true);
    setError(null);
    const fullPhone = countryCode + phone;
    const res = await api.sendCode(fullPhone);
    if (res.code !== 0) {
      setError(res.message || '验证码发送失败');
      setIsLoading(false);
      return;
    }
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    setIsLoading(false);
  };

  const handleLogin = async () => {
    if (code.length < 4) return;
    setIsLoading(true);
    setError(null);
    const fullPhone = countryCode + phone;
    const res = await api.login(fullPhone, code);
    if (res.code !== 0 || !res.data) {
      setError(res.message || '登录失败');
      setIsLoading(false);
      return;
    }
    setToken(res.data.token);
    setLoggedIn(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!ccOpen) return;
    const handler = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node)) {
        setCcOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ccOpen]);

  if (loggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t('successTitle')}</h1>
          <p className="text-[#94A3B8] mb-6">{t('successDesc')}</p>
          {plan ? (
            <Button href={`/${locale}/subscribe?plan=${plan}`} size="lg">
              {t('continueToSubscribe')}
            </Button>
          ) : (
            <Button href={`/${locale}`} variant="secondary">
              {t('backToHome')}
            </Button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex mb-8 bg-[#0F172A] rounded-xl p-1 border border-[#334155]">
          <button
            onClick={() => { setTab('qr'); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
              tab === 'qr' ? 'bg-[#4F46E5] text-white' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            {t('qrTab')}
          </button>
          <button
            onClick={() => { setTab('sms'); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
              tab === 'sms' ? 'bg-[#4F46E5] text-white' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            {t('smsTab')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'qr' ? (
            <motion.div
              key="qr"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-center"
            >
              <div className="w-56 h-56 bg-[#1E293B] rounded-2xl border border-[#334155] mx-auto mb-6 flex items-center justify-center">
                <QrCode className="w-20 h-20 text-[#4F46E5]" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{t('qrTitle')}</h2>
              <p className="text-[#94A3B8] text-sm mb-6">{t('qrDesc')}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#64748B]">
                <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                {t('qrPolling')}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sms"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">{t('smsTitle')}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#94A3B8] mb-1">{t('phoneLabel')}</label>
                  <div className="flex gap-2">
                    <div className="relative" ref={ccRef}>
                      <button
                        type="button"
                        onClick={() => setCcOpen(!ccOpen)}
                        className="flex items-center gap-1 px-3 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm hover:border-[#4F46E5] transition-colors whitespace-nowrap"
                      >
                        {countryCode}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${ccOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {ccOpen && (
                        <div className="absolute top-full mt-1 left-0 bg-[#0F172A] border border-[#334155] rounded-xl py-1 min-w-[140px] max-h-60 overflow-y-auto shadow-xl z-10">
                          {countryCodes.map(c => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c.code); setCcOpen(false); setError(null); }}
                              className={`block w-full text-start px-3 py-2 text-sm transition-colors ${
                                c.code === countryCode
                                  ? 'text-[#4F46E5] bg-[#4F46E5]/10'
                                  : 'text-[#CBD5E1] hover:bg-[#1E293B]'
                              }`}
                            >
                              <span className="text-white/60 mr-2">{c.label}</span>
                              {c.code}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => { const v = e.target.value.replace(/\D/g, ''); setPhone(v); setError(null); }}
                      placeholder="13800138000"
                      maxLength={currentCountry.maxLen}
                      className="flex-1 px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>

                {codeSent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="block text-sm text-[#94A3B8] mb-1">{t('codeLabel')}</label>
                    <input
                      type="text"
                      value={code}
                      onChange={e => { setCode(e.target.value); setError(null); }}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#4F46E5]"
                    />
                  </motion.div>
                )}

                {error && (
                  <p className="text-sm text-[#EF4444]">{error}</p>
                )}

                {!codeSent ? (
                  <button
                    onClick={handleSendCode}
                    disabled={!isValidPhone(phone) || isLoading}
                    className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-[#334155] disabled:text-[#64748B] text-white font-medium rounded-xl transition-colors"
                  >
                    {t('sendCode')}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleLogin}
                      disabled={code.length < 4 || isLoading}
                      className="w-full py-3 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-[#334155] disabled:text-[#64748B] text-white font-medium rounded-xl transition-colors"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('signingIn')}
                        </span>
                      ) : (
                        t('signIn')
                      )}
                    </button>
                    <button
                      onClick={handleSendCode}
                      disabled={countdown > 0 || isLoading}
                      className="w-full py-2 text-sm text-[#94A3B8] hover:text-white transition-colors disabled:text-[#64748B]"
                    >
                      {countdown > 0 ? t('resendIn', { seconds: countdown }) : t('resend')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
