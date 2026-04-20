'use client';

import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { use } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations('Index');
  const contactT = useTranslations('Contact');

  return (
    <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-brand-cream/30 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-brand-charcoal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Logo Container with Baking Background */}
        <div className="relative mb-8 group">
           {/* Baking Feeling Background */}
           <motion.div 
             animate={{ 
               scale: [1, 1.05, 1],
               rotate: [0, 2, 0, -2, 0],
               opacity: [0.8, 1, 0.8]
             }}
             transition={{ 
               duration: 20, 
               repeat: Infinity,
               ease: "linear"
             }}
             className="absolute inset-0 -m-8 md:-m-12 opacity-60 blur-xl pointer-events-none"
           >
             <Image 
               src="/baking-bg.png" 
               alt="Baking background" 
               fill 
               className="object-contain rounded-full opacity-40 mix-blend-multiply"
             />
           </motion.div>
           
           <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_20px_50px_rgba(178,34,34,0.3)] hover:scale-105 transition-transform duration-500 z-10">
              <Image
               src="/logo.png"
               alt="Kristineberg Pizzeria"
               fill
               className="object-contain"
               priority
             />
           </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal mb-6 tracking-tight">
          {t('title')}
          <span className="block text-brand-red text-2xl md:text-3xl mt-4 italic font-light font-sans tracking-widest">{t('location')}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-brand-charcoal-light max-w-2xl mb-12 font-light italic">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
          <Link
            href="/menu"
            className="px-10 py-5 bg-brand-red text-brand-cream rounded-full text-lg font-bold shadow-2xl shadow-brand-red/30 hover:scale-105 hover:bg-brand-red-dark transition-all"
          >
            {t('cta_button')}
          </Link>
          <a
            href={`tel:${contactT('phone').replace(/\s/g, '')}`}
            className="flex items-center gap-3 px-10 py-5 bg-brand-charcoal text-white rounded-full text-lg font-bold shadow-2xl shadow-brand-charcoal/20 hover:scale-105 transition-all"
          >
            <Phone className="w-5 h-5" />
            {contactT('call_now')}
          </a>
        </div>

        {/* Kids Corner CTA */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.5 }}
           className="mt-16"
        >
          <Link 
            href="/kids"
            className="group relative inline-flex items-center gap-4 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-3xl border-2 border-dashed border-brand-red/30 hover:border-brand-red/60 transition-all"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 relative rounded-full border-2 border-white overflow-hidden bg-white">
                <Image src="/kids/pepperoni.png" alt="pepperoni" fill className="object-contain p-1" />
              </div>
              <div className="w-10 h-10 relative rounded-full border-2 border-white overflow-hidden bg-white">
                <Image src="/kids/mushroom.png" alt="mushroom" fill className="object-contain p-1" />
              </div>
            </div>
            <span className="text-brand-charcoal font-bold tracking-tight group-hover:text-brand-red transition-colors">
              {t('kids_cta')}
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
