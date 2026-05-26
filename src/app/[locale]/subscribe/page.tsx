'use client';

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

  const p = t.raw(`plans.${plan}`) as { name: string; price: string; unit: string; features: string[] } | null;

  if (!p) {
    return (
      <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-[#94A3B8] mb-6">{t('planNotFound')}</p>
          <Button href={`/${locale}`}>{t('title')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-[#4F46E5] bg-[#1E293B] p-8 text-center relative"
        >
          <span className="absolute -top-3 right-4 bg-[#4F46E5] text-white text-xs font-medium px-3 py-1 rounded-full">
            {t('selected')}
          </span>
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] text-white flex items-center justify-center mx-auto mb-4">
            {sparklinkLogo}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{p.name}</h1>
          <div className="text-4xl font-bold text-white mb-2">{p.price}</div>
          <div className="text-[#94A3B8] mb-6">{p.unit}</div>

          <ul className="space-y-3 mb-8 text-start">
            {p.features.map((f: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-[#CBD5E1]">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {isLoggedIn ? (
            <div className="space-y-4">
              <Button className="w-full" size="lg">
                {t('subscribeNow')}
              </Button>
              <p className="text-xs text-[#64748B]">{t('redirectToPayment')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Button href={`/${locale}/auth?plan=${plan}`} className="w-full" size="lg">
                {t('signInToSubscribe')}
              </Button>
              <p className="text-xs text-[#64748B]">{t('signInRequired')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
