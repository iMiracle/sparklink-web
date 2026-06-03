'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
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
  const router = useRouter();
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

  const [qrSessionId, setQrSessionId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);
  const [qrExpired, setQrExpired] = useState(false);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const qrLoginSuccess = useCallback((token: string) => {
    setToken(token);
    setLoggedIn(true);
  }, []);

  useEffect(() => {
    if (tab !== 'qr') {
      if (pollingRef.current) clearInterval(pollingRef.current);
      return;
    }
    setQrSessionId(null);
    setQrData(null);
    setQrError(null);
    setQrExpired(false);

    api.getQRCode().then(res => {
      if (res.code === 0 && res.data) {
        setQrSessionId(res.data.sessionId);
        setQrData(res.data.qrData);
      } else {
        setQrError(res.message || 'Failed to generate QR code');
      }
    });

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [tab]);

  useEffect(() => {
    if (!qrSessionId || qrExpired) return;
    pollingRef.current = setInterval(async () => {
      const res = await api.pollQRStatus(qrSessionId);
      if (res.code === 0 && res.data?.token) {
        if (pollingRef.current) clearInterval(pollingRef.current);
        qrLoginSuccess(res.data.token);
      } else if (res.code === 1004) {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setQrExpired(true);
      }
    }, 2000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [qrSessionId, qrExpired, qrLoginSuccess]);

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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t('successTitle')}</h1>
          <p className="text-text-secondary mb-6">{t('successDesc')}</p>
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
    <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex mb-8 bg-bg rounded-xl p-1 border border-bg-surface">
          <button
            onClick={() => { setTab('qr'); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
              tab === 'qr' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            {t('qrTab')}
          </button>
          <button
            onClick={() => { setTab('sms'); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
              tab === 'sms' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'
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
              <div className="w-56 h-56 bg-bg-secondary rounded-2xl border border-bg-surface mx-auto mb-6 flex items-center justify-center">
                {qrData ? (
                  <div className="bg-white p-2 rounded-xl">
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}`}
                      alt="QR Code"
                      width={176}
                      height={176}
                      className="w-44 h-44"
                    />
                  </div>
                ) : qrError ? (
                  <div className="text-center px-4">
                    <p className="text-error text-sm">{qrError}</p>
                  </div>
                ) : qrExpired ? (
                  <div className="text-center px-4">
                    <p className="text-warning text-sm mb-2">{t('qrExpired')}</p>
                  </div>
                ) : (
                  <QrCode className="w-20 h-20 text-primary animate-pulse" />
                )}
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{t('qrTitle')}</h2>
              <p className="text-text-secondary text-sm mb-6">{t('qrDesc')}</p>
              {qrExpired ? (
                <button
                  onClick={() => { setQrExpired(false); setQrSessionId(null); setQrData(null); }}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white text-sm rounded-xl transition-colors"
                >
                  {t('qrRefresh')}
                </button>
              ) : qrError ? (
                <button
                  onClick={() => { setQrError(null); setQrSessionId(null); setQrData(null); }}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white text-sm rounded-xl transition-colors"
                >
                  {t('qrRetry')}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-sm text-text-tertiary">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  {t('qrPolling')}
                </div>
              )}
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
                  <label className="block text-sm text-text-secondary mb-1">{t('phoneLabel')}</label>
                  <div className="flex gap-2">
                    <div className="relative" ref={ccRef}>
                      <button
                        type="button"
                        onClick={() => setCcOpen(!ccOpen)}
                        className="flex items-center gap-1 px-3 py-3 bg-bg border border-bg-surface rounded-xl text-white text-sm hover:border-primary transition-colors whitespace-nowrap"
                      >
                        {countryCode}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${ccOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {ccOpen && (
                        <div className="absolute top-full mt-1 left-0 bg-bg border border-bg-surface rounded-xl py-1 min-w-[140px] max-h-60 overflow-y-auto shadow-xl z-10">
                          {countryCodes.map(c => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c.code); setCcOpen(false); setError(null); }}
                              className={`block w-full text-start px-3 py-2 text-sm transition-colors ${
                                c.code === countryCode
                                  ? 'text-primary bg-primary/10'
                                  : 'text-text-light hover:bg-bg-secondary'
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
                      className="flex-1 px-4 py-3 bg-bg border border-bg-surface rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {codeSent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="block text-sm text-text-secondary mb-1">{t('codeLabel')}</label>
                    <input
                      type="text"
                      value={code}
                      onChange={e => { setCode(e.target.value); setError(null); }}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full px-4 py-3 bg-bg border border-bg-surface rounded-xl text-white placeholder-text-tertiary focus:outline-none focus:border-primary"
                    />
                  </motion.div>
                )}

                {error && (
                  <p className="text-sm text-error">{error}</p>
                )}

                {!codeSent ? (
                  <button
                    onClick={handleSendCode}
                    disabled={!isValidPhone(phone) || isLoading}
                    className="w-full py-3 bg-primary hover:bg-primary-dark disabled:bg-bg-surface disabled:text-text-tertiary text-white font-medium rounded-xl transition-colors"
                  >
                    {t('sendCode')}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleLogin}
                      disabled={code.length < 4 || isLoading}
                      className="w-full py-3 bg-primary hover:bg-primary-dark disabled:bg-bg-surface disabled:text-text-tertiary text-white font-medium rounded-xl transition-colors"
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
                      className="w-full py-2 text-sm text-text-secondary hover:text-white transition-colors disabled:text-text-tertiary"
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
