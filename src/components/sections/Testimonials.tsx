'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

const rowWidths = ['w-[280px]', 'w-[340px]', 'w-[300px]', 'w-[360px]', 'w-[290px]', 'w-[320px]'];
const rowWidths2 = ['w-[320px]', 'w-[290px]', 'w-[360px]', 'w-[300px]', 'w-[340px]', 'w-[280px]'];

export function Testimonials() {
  const t = useTranslations('Testimonials');

  const items = t.raw('items') as Array<{
    name: string;
    country: string;
    avatar: string;
    rating: number;
    text: string;
  }>;

  const row1 = items.filter((_, i) => i % 2 === 0);
  const row2 = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="py-24 bg-[#0F172A]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#4F46E5] text-lg font-medium text-center mb-16"
        >
          {t('count')}
        </motion.p>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {row1.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                  className={`${rowWidths[index % rowWidths.length]} shrink-0 bg-[#1E293B] rounded-2xl p-6`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-[#CBD5E1] mb-4">&ldquo;{item.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-medium shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-[#94A3B8] text-sm">{item.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="shrink-0 w-32 flex items-center justify-center">
                <p className="text-[#334155] text-sm whitespace-nowrap">— End —</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0F172A] to-transparent" />
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {row2.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: Math.min(index * 0.03, 0.3) }}
                  className={`${rowWidths2[index % rowWidths2.length]} shrink-0 bg-[#1E293B] rounded-2xl p-6`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-[#CBD5E1] mb-4">&ldquo;{item.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-medium shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-[#94A3B8] text-sm">{item.country}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="shrink-0 w-32 flex items-center justify-center">
                <p className="text-[#334155] text-sm whitespace-nowrap">— End —</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0F172A] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
