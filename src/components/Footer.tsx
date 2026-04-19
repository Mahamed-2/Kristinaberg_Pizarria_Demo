'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Share2, MapPin, Phone, Clock } from 'lucide-react';

import { usePathname } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('Navbar');
  const commonT = useTranslations('Common');
  const contactT = useTranslations('Contact');
  const pathname = usePathname();

  if (pathname.includes('/admin')) return null;

  return (
    <footer className="bg-brand-charcoal text-brand-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight">
              Kristineberg <span className="text-brand-red">Pizzeria</span>
            </span>
          </div>
          <p className="text-brand-cream/60 text-sm leading-relaxed mb-6">
            Authentic Swedish-style pizzas and specialties in the heart of Borås. Quality and tradition in every slice.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-red transition-all cursor-pointer">
              <Share2 className="w-5 h-5 text-brand-cream" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-6 text-white">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-brand-cream/70 hover:text-white transition-colors">{t('home')}</Link></li>
            <li><Link href="/menu" className="text-brand-cream/70 hover:text-white transition-colors">{t('menu')}</Link></li>
            <li><Link href="/#about" className="text-brand-cream/70 hover:text-white transition-colors">{t('about')}</Link></li>
            <li><Link href="/#contact" className="text-brand-cream/70 hover:text-white transition-colors">{t('contact')}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-6 text-white">{contactT('hours_label')}</h3>
          <ul className="space-y-4 text-brand-cream/70">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-brand-red shrink-0" />
              <span>{contactT('address')}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-red shrink-0" />
              <a href={`tel:${contactT('phone').replace(/\s/g, '')}`} className="hover:text-white transition-colors underline-offset-4 hover:underline">
                {contactT('phone')}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-brand-red shrink-0 mt-1" />
              <div className="flex flex-col text-sm">
                <span className="flex justify-between gap-4"><span>{contactT('hours_week')}</span></span>
                <span className="flex justify-between gap-4"><span>{contactT('hours_weekend')}</span></span>
              </div>
            </li>
          </ul>
        </div>

        {/* Map Placeholder */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-6 text-white">Location</h3>
          <div className="w-full h-40 bg-white/5 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
             <div className="absolute inset-0 flex items-center justify-center text-brand-cream/20 text-xs italic">
               Interactive Map Loading...
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 text-center text-brand-cream/30 text-xs">
        © {new Date().getFullYear()} Kristineberg Pizzeria. All rights reserved. Made for Borås.
      </div>
    </footer>
  );
}
