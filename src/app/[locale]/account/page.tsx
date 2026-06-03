'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Crown, Calendar, Shield, CheckCircle, LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_USER } from '@/lib/constants';

export default function AccountPage() {
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations('Account');
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = () => setIsLoggedIn(localStorage.getItem('sparklink-auth') === 'true');
    check();
    window.addEventListener('storage', check);
    window.addEventListener('sparklink-auth-change', check);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', check);
      window.removeEventListener('sparklink-auth-change', check);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.logout-modal')) setShowLogout(false);
    };
    if (showLogout) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showLogout, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('sparklink-auth');
    window.dispatchEvent(new CustomEvent('sparklink-auth-change'));
    setShowLogout(false);
    router.push(`/${locale}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('notLoggedIn')}</h1>
          <Button href={`/${locale}/auth`}>{t('signIn')}</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto animate-pulse">
          <div className="bg-bg-secondary rounded-2xl border border-bg-surface p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-bg-surface mx-auto mb-4" />
              <div className="h-6 w-32 bg-bg-surface rounded mx-auto mb-3" />
              <div className="h-5 w-24 bg-bg-surface rounded-full mx-auto" />
            </div>
            <div className="space-y-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-bg rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-bg-surface rounded" />
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-bg-surface rounded" />
                      <div className="h-4 w-24 bg-bg-surface rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 w-full bg-bg-surface rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-secondary rounded-2xl border border-bg-surface p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{MOCK_USER.phone}</h1>
            <span className="inline-flex items-center gap-1 text-sm text-warning bg-warning/10 px-3 py-1 rounded-full">
              <Crown className="w-3.5 h-3.5" />
              {MOCK_USER.plan}
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-bg rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">{t('plan')}</p>
                  <p className="text-white font-medium">{t('yearlyPlan')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg rounded-xl">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">{t('expires')}</p>
                  <p className="text-white font-medium">{MOCK_USER.expiryDate}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-text-secondary">{t('devices')}</p>
                  <p className="text-white font-medium">{t('unlimited')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-text-secondary">{t('status')}</p>
                  <p className="text-success font-medium">{t('active')}</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowLogout(true)}
            variant="ghost"
            className="w-full gap-2 text-error hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="logout-modal bg-bg-secondary rounded-2xl border border-bg-surface p-6 max-w-sm w-full"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{t('logoutTitle')}</h3>
                <p className="text-sm text-text-secondary">{t('logoutConfirm')}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setShowLogout(false)} variant="secondary" className="flex-1">
                  {t('cancel')}
                </Button>
                <Button onClick={handleLogout} className="flex-1 bg-error hover:bg-red-600">
                  {t('confirmLogout')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
