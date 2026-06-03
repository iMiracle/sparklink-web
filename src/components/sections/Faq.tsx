'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function Faq() {
  const t = useTranslations('Faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t.raw('items') as Array<{ question: string; answer: string }>;

  return (
    <section id="faq" className="py-24 bg-bg scroll-mt-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          {t('title')}
        </motion.h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-bg-secondary rounded-xl border border-bg-surface overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-text-secondary transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-text-secondary">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
