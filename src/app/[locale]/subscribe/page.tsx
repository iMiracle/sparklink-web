'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const sparklinkLogo = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function SubscribePage() {
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const t = useTranslations('Pricing');
  const plan = searchParams.get('plan') || 'monthly';
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('sparklink-auth') === 'true';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const p = t.raw(`plans.${plan}`) as { name: string; price: string; unit: string; features: string[] } | null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="rounded-2xl border-2 border-primary bg-bg-secondary p-8 text-center relative animate-pulse">
            <div className="absolute -top-3 right-4 bg-bg-surface text-xs font-medium px-3 py-1 rounded-full w-16 h-6" />
            <div className="w-14 h-14 rounded-xl bg-bg-surface mx-auto mb-4" />
            <div className="h-7 bg-bg-surface rounded w-1/2 mx-auto mb-4" />
            <div className="h-9 bg-bg-surface rounded w-1/3 mx-auto mb-2" />
            <div className="h-5 bg-bg-surface rounded w-1/4 mx-auto mb-6" />
            <div className="space-y-3 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-bg-surface shrink-0" />
                  <div className="h-4 bg-bg-surface rounded w-3/4" />
                </div>
              ))}
            </div>
            <div className="h-11 bg-bg-surface rounded-lg w-full" />
            <div className="h-4 bg-bg-surface rounded w-1/2 mx-auto mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen bg-bg pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-text-secondary mb-6">{t('planNotFound')}</p>
          <Button href={`/${locale}`}>{t('title')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-primary bg-bg-secondary p-8 text-center relative"
        >
          <span className="absolute -top-3 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
            {t('selected')}
          </span>
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mx-auto mb-4">
            {sparklinkLogo}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{p.name}</h1>
          <div className="text-4xl font-bold text-white mb-2">{p.price}</div>
          <div className="text-text-secondary mb-6">{p.unit}</div>

          <ul className="space-y-3 mb-8 text-start">
            {p.features.map((f: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-text-light">
                <CheckCircle className="w-5 h-5 text-success shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {isLoggedIn ? (
            <div className="space-y-4">
              <Button className="w-full" size="lg">
                {t('subscribeNow')}
              </Button>
              <p className="text-xs text-text-tertiary">{t('redirectToPayment')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Button href={`/${locale}/auth?plan=${plan}`} className="w-full" size="lg">
                {t('signInToSubscribe')}
              </Button>
              <p className="text-xs text-text-tertiary">{t('signInRequired')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
