'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Apple, Smartphone } from 'lucide-react';

type Platform = 'ios' | 'android';

export function DownloadSection() {
  const t = useTranslations('Download');
  const [platform, setPlatform] = useState<Platform>('ios');

  return (
    <section id="download" className="py-24 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-8"
        >
          {t('title')}
        </motion.h2>

        <div className="relative w-48 h-48 mx-auto mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#1E293B] rounded-2xl border-2 border-[#334155] flex items-center justify-center group hover:border-[#4F46E5] transition-colors"
            >
              {platform === 'ios' ? (
                <Apple className="w-16 h-16 text-[#64748B] group-hover:text-[#4F46E5] transition-colors" />
              ) : (
                <Smartphone className="w-16 h-16 text-[#64748B] group-hover:text-[#4F46E5] transition-colors" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[#94A3B8] mb-8"
        >
          {platform === 'ios' ? t('scanIos') : t('scanAndroid')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => setPlatform('ios')}
            size="lg"
            variant={platform === 'ios' ? 'primary' : 'secondary'}
            className="gap-2 hover:scale-[1.02] transition-transform"
          >
            <Apple className="w-5 h-5" />
            {t('ios')}
          </Button>
          <Button
            onClick={() => setPlatform('android')}
            size="lg"
            variant={platform === 'android' ? 'primary' : 'secondary'}
            className="gap-2 hover:scale-[1.02] transition-transform"
          >
            <Smartphone className="w-5 h-5" />
            {t('android')}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[#64748B] mt-8"
        >
          {t('version')} | {t('updateDate')} | {t('size')} | {t('requirements')}
        </motion.p>
      </div>
    </section>
  );
}
