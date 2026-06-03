'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Smartphone } from 'lucide-react';
import { api, Node } from '@/lib/api';

export function Hero() {
  const { locale } = useParams();
  const t = useTranslations('Hero');
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    api.getNodes().then(setNodes).catch(() => {});
  }, []);

  const onlineCount = nodes.filter(n => n.status === 'online').length;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-bg" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button href={`/${locale}/download`} size="lg" className="gap-2">
            <Smartphone className="w-5 h-5" />
            {t('cta')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="w-2 h-2 bg-success rounded-full" />
            <span>{t('appStore')}</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="w-2 h-2 bg-success rounded-full" />
            <span>{t('android')}</span>
          </div>
        </motion.div>

        {onlineCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <span className="text-text-tertiary text-sm">
              {onlineCount} {t('serversOnline')}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
