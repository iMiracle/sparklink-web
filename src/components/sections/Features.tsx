'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Zap, Globe, Gift, Smartphone, Shield, Star,
  Headphones, Layers, RefreshCw, Gauge, Lock, Server,
} from 'lucide-react';

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  globe: Globe,
  gift: Gift,
  smartphone: Smartphone,
  shield: Shield,
  star: Star,
  headphones: Headphones,
  layers: Layers,
  refreshCw: RefreshCw,
  gauge: Gauge,
  lock: Lock,
  server: Server,
};

export function Features() {
  const t = useTranslations('Features');

  const items = t.raw('items') as Array<{ title: string; description: string; icon: string }>;

  return (
    <section id="features" className="py-24 bg-[#020617] scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {items.map((item, index) => {
              const Icon = icons[item.icon] || Zap;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="min-w-[260px] bg-[#1E293B] rounded-2xl p-6 border border-[#334155] hover:border-[#4F46E5] transition-colors shrink-0"
                >
                  <Icon className="w-10 h-10 text-[#4F46E5] mb-4" />
                  <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8]">{item.description}</p>
                </motion.div>
              );
            })}
            <div className="shrink-0 w-32 flex items-center justify-center">
              <p className="text-[#334155] text-sm whitespace-nowrap">— End —</p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent" />
        </div>
      </div>
    </section>
  );
}
