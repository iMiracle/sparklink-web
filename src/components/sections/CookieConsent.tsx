'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CookieConsentProps {
  locale: string;
}

export function CookieConsent({ locale }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('CookieConsent');

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-3xl mx-auto bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-2xl">
            <p className="text-[#CBD5E1] text-sm mb-4">
              {t('message')}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="px-6 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium rounded-xl transition-colors"
              >
                {t('accept')}
              </button>
              <button
                onClick={decline}
                className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-[#CBD5E1] text-sm rounded-xl transition-colors"
              >
                {t('decline')}
              </button>
              <Link
                href={`/${locale}/privacy`}
                className="ml-auto text-xs text-[#64748B] hover:text-[#CBD5E1] underline"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
