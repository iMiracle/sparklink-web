'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const plans = ['monthly', 'quarterly', 'yearly'] as const;

export function Pricing() {
  const { locale } = useParams();
  const t = useTranslations('Pricing');
  const benefits = t.raw('benefits') as Record<string, string>;
  const comparison = t.raw('comparison') as Record<string, { free: string; monthly: string; quarterly: string; yearly: string }>;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [modalPlan, setModalPlan] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = modalPlan ? 'hidden' : '';
    if (!modalPlan) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalPlan(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handler);
    };
  }, [modalPlan]);

  return (
    <section id="pricing" className="py-24 bg-[#0F172A] scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#94A3B8] text-lg text-center mb-16 max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {plans.map((plan, i) => {
            const p = t.raw('plans.' + plan) as { name: string; price: string; unit: string; daily: string; features: string[] };

            return (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPlan(plan)}
                className={`rounded-2xl p-6 border shadow-lg cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan
                    ? 'border-[#4F46E5] bg-[#0F172A] shadow-[#4F46E5]/10'
                    : plan === 'yearly' && !selectedPlan
                      ? 'border-[#4F46E5] bg-[#0F172A] relative shadow-[#4F46E5]/10'
                      : 'border-[#334155] bg-[#1E293B]'
                }`}
              >
                {selectedPlan === plan && (
                  <span className="absolute -top-3 right-4 bg-[#4F46E5] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {t('selected')}
                  </span>
                )}
                {plan === 'yearly' && selectedPlan !== plan && (
                  <span className="absolute -top-3 right-4 bg-[#4F46E5] text-white text-xs font-medium px-3 py-1 rounded-full">
                    {t('badge')}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{p.name}</h3>
                <div className="text-3xl font-bold text-white mb-1">{p.price}</div>
                <div className="text-sm text-[#94A3B8] mb-4">{p.unit}</div>
                <div className="text-xs text-[#64748B] mb-6">{p.daily}</div>
                <Button onClick={() => setModalPlan(plan)} variant={selectedPlan === plan || (plan === 'yearly' && !selectedPlan) ? 'primary' : 'secondary'} className="w-full">
                  {t('cta')}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white text-center mb-6">
            {t('benefitsTitle')}
          </h3>
          <div className="bg-[#1E293B] rounded-2xl border border-[#334155] overflow-x-auto">
            <div className="min-w-[600px] grid grid-cols-5 gap-0">
              <div className="p-3 text-sm font-medium text-[#94A3B8] border-b border-[#334155]" />
              <div className="p-3 text-sm font-medium text-[#94A3B8] text-center border-b border-[#334155]">
                {t('freePlan')}
              </div>
              <div className="p-3 text-sm font-medium text-[#CBD5E1] text-center border-b border-[#334155]">
                {t.raw('plans.monthly.name') as string}
              </div>
              <div className="p-3 text-sm font-medium text-[#CBD5E1] text-center border-b border-[#334155]">
                {t.raw('plans.quarterly.name') as string}
              </div>
              <div className="p-3 text-sm font-medium text-[#818CF8] text-center border-b border-[#334155]">
                {t.raw('plans.yearly.name') as string}
              </div>
              {Object.entries(comparison).map(([key, val]) => (
                <div key={key} className="contents">
                  <div className="p-3 text-sm text-white border-b border-[#334155]">
                    {benefits[key]}
                  </div>
                  <div className="p-3 text-sm text-[#94A3B8] text-center border-b border-[#334155]">
                    {val.free}
                  </div>
                  <div className={`p-3 text-sm text-center border-b border-[#334155] ${key === 'ads' || key === 'support' ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                    {val.monthly}
                  </div>
                  <div className={`p-3 text-sm text-center border-b border-[#334155] ${key === 'ads' || key === 'support' || key === 'routing' ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                    {val.quarterly}
                  </div>
                  <div className="p-3 text-sm text-[#10B981] text-center border-b border-[#334155] font-medium">
                    {val.yearly}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <p className="text-center text-sm text-[#64748B] mt-8">
          {t('refundPolicy')}
        </p>
      </div>

      <AnimatePresence>
        {modalPlan && (() => {
          const mp = t.raw('plans.' + modalPlan) as { name: string; price: string; unit: string; daily: string; features: string[] };
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1E293B] rounded-2xl border border-[#334155] p-8 max-w-sm w-full relative"
              >
                <button
                  onClick={() => setModalPlan(null)}
                  className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-semibold text-white mb-1">{mp.name}</h3>
                <div className="text-3xl font-bold text-white mb-1">{mp.price}</div>
                <div className="text-sm text-[#94A3B8] mb-6">{mp.unit}</div>
                <ul className="space-y-2 mb-8">
                  {mp.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#CBD5E1]">
                      <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href={`/${locale}/subscribe?plan=${modalPlan}`} className="w-full" size="lg">
                  {t('subscribeNow')}
                </Button>
                <p className="text-xs text-[#64748B] text-center mt-3">{t('redirectToPayment')}</p>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
