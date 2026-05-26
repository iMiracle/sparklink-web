import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'Footer' });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-[#020617] border-t border-[#334155]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Sparklink</span>
          </div>

          <nav className="flex gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-[#94A3B8] hover:text-white transition-colors text-sm"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-[#94A3B8] hover:text-white transition-colors text-sm"
            >
              {t('terms')}
            </Link>
            <Link
              href={`/${locale}/faq`}
              className="text-[#94A3B8] hover:text-white transition-colors text-sm"
            >
              {t('faq')}
            </Link>
          </nav>

          <p className="text-[#64748B] text-sm">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
