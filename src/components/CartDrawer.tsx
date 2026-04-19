'use client';

import { useTranslations } from 'next-intl';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

export function CartDrawer() {
  const t = useTranslations('Menu');
  const commonT = useTranslations('Common');
  
  const { 
    items, 
    isCartOpen: isOpen, 
    setCartOpen: setIsOpen, 
    removeItem, 
    updateQuantity, 
    getTotal,
    setCheckoutOpen
  } = useCartStore();

  const total = getTotal();

  const handleCheckout = () => {
    setIsOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm z-[150]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-charcoal/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">Din Varukorg</h2>
                <p className="text-sm text-brand-charcoal-light">{items.length} {items.length === 1 ? 'produkt' : 'produkter'}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-brand-red/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-brand-charcoal" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p className="text-lg font-serif">Korgen är tom</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-brand-charcoal">{item.name}</h4>
                        <span className="font-bold text-brand-red">{formatCurrency(item.totalPrice * item.quantity)}</span>
                      </div>
                      <p className="text-xs text-brand-charcoal-light mb-3">
                        {item.selectedIngredients.map(i => i.name).join(', ') || 'Standard'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-brand-cream/20 rounded-xl p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-bold min-w-[2rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-brand-charcoal-light opacity-0 group-hover:opacity-100 p-2 hover:text-brand-red transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-brand-cream/10 border-t border-brand-charcoal/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-serif font-bold text-brand-charcoal">Summa</span>
                  <span className="text-3xl font-serif font-black text-brand-red">{formatCurrency(total)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full py-5 bg-brand-red text-white rounded-full font-bold text-lg hover:bg-brand-red-light transition-all shadow-xl hover:shadow-brand-red/40 flex items-center justify-center gap-3 group"
                >
                  Till Betalning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingCart({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
