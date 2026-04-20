'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import LanguageToggle from './LanguageToggle';
import { ShoppingBag, Menu as MenuIcon, X, Phone, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

export function Header() {
  const t = useTranslations('Navbar');
  const contactT = useTranslations('Contact');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items, setCartOpen } = useCartStore();
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.includes('/admin')) return null;

  const navLinks = [
    { href: '/', key: 'home' },
    { href: '/menu', key: 'menu' },
    { href: '/#about', key: 'about' },
    { href: '/#contact', key: 'contact' }
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:rotate-12">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-brand-charcoal hidden lg:block">
              Kristineberg <span className="text-brand-red">Pizzeria</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex justify-center">
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-all hover:text-brand-red",
                  pathname === link.href ? "text-brand-red" : "text-brand-charcoal"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end items-center gap-2 sm:gap-6">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <LanguageToggle />
            
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-brand-charcoal hover:text-brand-red transition-all group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white animate-in zoom-in duration-300">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <Link href="/admin" className="p-2 hover:bg-brand-red/5 rounded-full text-brand-charcoal transition-all">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-brand-charcoal"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <a
            href={`tel:${contactT('phone').replace(/\s/g, '')}`}
            className="p-2 bg-brand-red text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-charcoal"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-x-0 top-[--header-height] bg-white border-b border-brand-charcoal/5 md:hidden transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-screen opacity-100 py-8" : "max-h-0 opacity-0 py-0"
      )}>
        <div className="px-4 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-2xl font-serif font-bold text-brand-charcoal"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="pt-6 border-t border-brand-charcoal/5 flex items-center justify-between">
            <LanguageToggle />
            <Link href="/admin" className="flex items-center gap-2 text-brand-charcoal font-bold">
              <User className="w-5 h-5" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
