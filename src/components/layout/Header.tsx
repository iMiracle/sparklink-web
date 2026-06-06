'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  locale: string;
}

const locales = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'pt-BR', label: 'Português (BR)' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
];

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const tAccount = useTranslations('Account');

  const localeRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const currentLocale = locales.find(l => l.code === locale);

  useEffect(() => {
    const check = () => setIsLoggedIn(localStorage.getItem('sparklink-auth') === 'true');
    check();
    window.addEventListener('storage', check);
    window.addEventListener('sparklink-auth-change', check);
    return () => {
      window.removeEventListener('storage', check);
      window.removeEventListener('sparklink-auth-change', check);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (localeRef.current && !localeRef.current.contains(e.target as Node)) {
        setLocaleOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (localeOpen || userMenuOpen) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [localeOpen, userMenuOpen]);

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code as any });
    setLocaleOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogout(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('sparklink-auth');
    window.dispatchEvent(new CustomEvent('sparklink-auth-change'));
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setShowLogout(false);
    router.push('/');
  };

  const navLinks = [
    { href: `/${locale}#features`, label: t('features') },
    { href: `/${locale}#pricing`, label: t('pricing') },
    { href: `/${locale}#download`, label: t('download') },
    { href: `/${locale}#faq`, label: t('faq') },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-bg-surface/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex-1 flex items-center">
              <Link
                href={`/${locale}`}
                className="text-xl font-bold text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                  <svg viewBox="28 28 64 64" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" transform="translate(-1.44,-1.44) scale(0.12)" d="M 620.1 555.9 A 4 4 0 0 1 616 551.9 L 616 487.9 A 4 4 0 0 1 619.8 483.9 A 68 68 0 1 0 548 416 L 548 608 A 140 140 0 0 1 408 748 C 330.8 748 268 685.2 268 608 S 328.5 470.2 403.9 468.1 A 4 4 0 0 1 408 472.1 L 408 536.1 A 4 4 0 0 1 404.2 540.1 A 68 68 0 1 0 476 608 L 476 416 A 140 140 0 0 1 616 276 C 693.2 276 756 338.8 756 416 S 695.5 553.8 620.1 555.9 Z" />
                  </svg>
                </div>
                Sparklink
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-white transition-colors text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              {isLoggedIn ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-text-light hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-bg-surface"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">138****5678</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute end-0 top-full mt-1 bg-bg border border-bg-surface rounded-xl py-4 min-w-[200px] shadow-xl">
                      <Link
                        href={`/${locale}/account`}
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 pb-3 border-b border-bg-surface hover:bg-bg-secondary transition-colors"
                      >
                        <p className="text-white font-medium">138****5678</p>
                        <p className="text-text-secondary text-xs mt-1">VIP Member</p>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-start px-4 pt-3 text-sm text-text-light hover:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('signOut')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button href={`/${locale}/auth`} variant="ghost" size="sm">{t('signIn')}</Button>
              )}

              <div className="relative" ref={localeRef}>
                <button
                  onClick={() => setLocaleOpen(!localeOpen)}
                  className="flex items-center gap-1 text-text-secondary hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-bg-surface"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{currentLocale?.code}</span>
                </button>
                {localeOpen && (
                  <div className="absolute end-0 top-full mt-1 bg-bg border border-bg-surface rounded-xl py-2 min-w-[160px] shadow-xl">
                    {locales.map(l => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`block w-full text-start px-4 py-2 text-sm transition-colors ${
                          l.code === locale
                            ? 'text-primary bg-primary/10'
                            : 'text-text-light hover:bg-bg-secondary'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-secondary rounded-2xl border border-bg-surface p-6 max-w-sm w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{tAccount('logoutTitle')}</h3>
                <p className="text-sm text-text-secondary">{tAccount('logoutConfirm')}</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setShowLogout(false)} variant="secondary" className="flex-1">
                  {tAccount('cancel')}
                </Button>
                <Button onClick={confirmLogout} className="flex-1 bg-error hover:bg-red-600">
                  {tAccount('confirmLogout')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
