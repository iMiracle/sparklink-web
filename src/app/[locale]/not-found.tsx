'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LocaleNotFound() {
  const { locale } = useParams();
  const t = useTranslations('NotFound');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-1/2 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-8xl md:text-9xl font-bold text-white mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-text-secondary mb-8 max-w-md mx-auto"
        >
          {t('message')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button href={`/${locale}`} size="lg" className="gap-2">
            <Home className="w-5 h-5" />
            {t('backHome')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
