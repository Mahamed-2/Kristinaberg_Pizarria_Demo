'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Lock, CreditCard, Apple, Check, User, Phone as PhoneIcon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/lib/utils';

export function CheckoutModal() {
  const { isCheckoutOpen: isOpen, setCheckoutOpen: setIsOpen, setTrackingOpen, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'klarna' | 'swish' | 'apple'>('klarna');

  const total = getTotal();

  const handlePay = () => {
    setIsOpen(false);
    setTrackingOpen(true);
    // clearCart(); // Keep for demo tracking
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-brand-charcoal/5 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-bold text-brand-charcoal">Checkout</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-brand-red/5 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
             {/* User Details */}
             <section>
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-brand-charcoal">Your details</h3>
                   <button className="text-sm font-bold text-brand-red">Change</button>
                </div>
                <div className="flex items-center gap-4 bg-brand-cream/5 p-4 rounded-2xl border border-brand-charcoal/5">
                   <div className="w-12 h-12 bg-brand-charcoal/5 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-brand-charcoal-light" />
                   </div>
                   <div>
                      <p className="font-bold text-brand-charcoal">Ava Larsson</p>
                      <p className="text-sm text-brand-charcoal-light">+46 70 123 45 67</p>
                   </div>
                </div>
             </section>

             {/* Delivery */}
             <section>
                <h3 className="font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                   <MapPin className="w-5 h-5 text-brand-charcoal-light" />
                   Delivery
                </h3>
                <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-brand-red bg-brand-red/5">
                   <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-brand-red rounded-full flex items-center justify-center text-white ring-8 ring-brand-red/10">
                         <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-bold">Home delivery</span>
                   </div>
                   <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-lg uppercase">Foodora</span>
                </div>
             </section>

             {/* Payment */}
             <section>
                <h3 className="font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                   <CreditCard className="w-5 h-5 text-brand-charcoal-light" />
                   Payment
                </h3>
                <div className="space-y-3">
                   {/* Klarna */}
                   <button 
                      onClick={() => setPaymentMethod('klarna')}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                         paymentMethod === 'klarna' ? 'border-brand-red bg-brand-red/5' : 'border-brand-charcoal/5 hover:border-brand-charcoal/10'
                      }`}
                   >
                      <span className="font-bold text-brand-charcoal">Pay with Klarna</span>
                      <div className="px-3 py-1 bg-pink-200 text-pink-700 text-[10px] font-black rounded-lg uppercase">Klarna</div>
                   </button>
                   
                   {/* Swish */}
                   <button 
                      onClick={() => setPaymentMethod('swish')}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                         paymentMethod === 'swish' ? 'border-brand-red bg-brand-red/5' : 'border-brand-charcoal/5 hover:border-brand-charcoal/10'
                      }`}
                   >
                      <span className="font-bold text-brand-charcoal">Swish</span>
                      <div className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-lg uppercase italic font-serif tracking-tighter">Swish</div>
                   </button>

                   {/* Apple Pay */}
                   <button 
                      onClick={() => setPaymentMethod('apple')}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                         paymentMethod === 'apple' ? 'border-brand-red bg-brand-red/5' : 'border-brand-charcoal/5 hover:border-brand-charcoal/10'
                      }`}
                   >
                      <span className="font-bold text-brand-charcoal">Apple Pay</span>
                      <div className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-lg flex items-center gap-1">
                         <Apple className="w-3 h-3 fill-white" />
                         Pay
                      </div>
                   </button>
                </div>
             </section>
          </div>

          {/* Footer */}
          <div className="p-8 bg-brand-cream/10 border-t border-brand-charcoal/5">
             <button 
                onClick={handlePay}
                className="w-full py-5 bg-black text-white rounded-2xl font-bold text-xl hover:bg-brand-charcoal transition-all shadow-xl flex items-center justify-center gap-3"
             >
                Pay order {formatCurrency(total)}
                <Lock className="w-5 h-5" />
             </button>
             <p className="text-center text-[10px] text-brand-charcoal-light mt-4 italic">
                Secure payment powered by {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
             </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
