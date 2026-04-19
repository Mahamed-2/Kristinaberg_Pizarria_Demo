'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onLanguageChange() {
    const nextLocale = locale === 'sv' ? 'en' : 'sv';
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={onLanguageChange}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-charcoal/10 hover:border-brand-red/30 hover:bg-brand-red/5 transition-all text-sm font-medium"
      aria-label="Toggle Language"
    >
      <Languages className="w-4 h-4 text-brand-red" />
      <span>{locale === 'sv' ? 'English' : 'Svenska'}</span>
    </button>
  );
}
