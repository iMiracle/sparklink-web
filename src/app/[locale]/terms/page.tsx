import { getTranslations } from 'next-intl/server';

export default async function TermsPage() {
  const t = await getTranslations('Legal');
  return (
    <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-8">{t('terms.title')}</h1>
      <div className="text-[#94A3B8] space-y-4">
        <p>{t('terms.content')}</p>
      </div>
    </div>
  );
}
