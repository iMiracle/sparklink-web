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
    <section id="download" className="py-24 bg-gradient-to-b from-bg-secondary to-bg">
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
              className="absolute inset-0 bg-bg-secondary rounded-2xl border-2 border-bg-surface flex items-center justify-center group hover:border-primary transition-colors"
            >
              {platform === 'ios' ? (
                <Apple className="w-16 h-16 text-text-tertiary group-hover:text-primary transition-colors" />
              ) : (
                <Smartphone className="w-16 h-16 text-text-tertiary group-hover:text-primary transition-colors" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-text-secondary mb-8"
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
          className="text-sm text-text-tertiary mt-8"
        >
          {t('version')} | {t('updateDate')} | {t('size')} | {t('requirements')}
        </motion.p>
      </div>
    </section>
  );
}
