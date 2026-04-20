import { getTranslations, setRequestLocale } from 'next-intl/server';
import { KidsPizzaBuilder } from '@/components/KidsPizzaBuilder';

export default async function KidsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Kids');

  return (
    <main className="flex-1 bg-brand-cream/30 py-8 px-4">
      <KidsPizzaBuilder />
    </main>
  );
}
