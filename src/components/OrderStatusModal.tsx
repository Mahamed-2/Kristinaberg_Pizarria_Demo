'use client';

import { useState, useEffect } from 'react';
import { X, Check, MapPin, ChefHat, Bike, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

const STATUS_STAGES = [
  {
    id: 'confirmed',
    title: 'Order confirmed',
    description: "We've received your order",
    icon: Check,
    color: 'bg-green-500'
  },
  {
    id: 'preparing',
    title: 'Preparing order',
    description: 'The kitchen is preparing your food',
    icon: ChefHat,
    color: 'bg-brand-red'
  },
  {
    id: 'delivery',
    title: 'On the way',
    description: 'Your courier is heading to you',
    icon: Bike,
    color: 'bg-blue-500'
  },
  {
    id: 'delivered',
    title: 'Delivered',
    description: 'Enjoy your meal!',
    icon: Heart,
    color: 'bg-brand-gold'
  }
];

export function OrderStatusModal() {
  const { isTrackingOpen: isOpen, setTrackingOpen: setIsOpen, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen && currentStep < STATUS_STAGES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 20000); // 20 seconds as requested

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
    clearCart();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative bg-white w-full max-w-sm rounded-[44px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-8 pb-4 flex justify-between items-center bg-zinc-50/50">
            <h2 className="text-xl font-serif font-black text-brand-charcoal">Order status</h2>
            <button onClick={handleClose} className="p-2 hover:bg-brand-red/5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-48 bg-zinc-100 overflow-hidden">
             {/* Simple themed placeholder pattern */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative">
                   <div className="w-24 h-24 bg-brand-red/10 rounded-full animate-ping absolute inset-0 scale-150" />
                   <div className="relative bg-white p-3 rounded-full shadow-xl">
                      <MapPin className="w-8 h-8 text-brand-red fill-brand-red/20" />
                   </div>
                </div>
                <div className="mt-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-brand-charcoal/5 flex items-center gap-2">
                   <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                   <span className="text-xs font-bold text-brand-charcoal">Live tracking</span>
                </div>
             </div>
          </div>

          <div className="p-8">
             {/* Brand Info */}
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white p-2 rounded-2xl shadow-sm border border-brand-charcoal/5 flex items-center justify-center overflow-hidden">
                   <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                   <h3 className="font-bold text-brand-charcoal leading-tight">Kristineberg Pizzeria</h3>
                   <p className="text-xs text-brand-charcoal-light">Order #KP-{(8000 + Math.floor(Math.random() * 1000)).toString()}</p>
                </div>
             </div>

             {/* Steps */}
             <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-zinc-100" />
                <div className="absolute left-[11px] top-2 w-0.5 bg-green-500 transition-all duration-1000" style={{ height: `${(currentStep / (STATUS_STAGES.length - 1)) * 100}%` }} />

                {STATUS_STAGES.map((stage, index) => {
                  const isActive = index <= currentStep;
                  const Icon = stage.icon;
                  
                  return (
                    <motion.div 
                      key={stage.id} 
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.4 }}
                      className="flex items-start gap-4 relative z-10"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${isActive ? 'bg-green-500 shadow-lg shadow-green-500/20' : 'bg-zinc-200'}`}>
                         <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                      </div>
                      <div>
                         <h4 className={`text-sm font-bold leading-none mb-1 transition-colors ${isActive ? 'text-brand-charcoal' : 'text-zinc-400'}`}>
                            {stage.title}
                         </h4>
                         <p className={`text-xs transition-colors ${isActive ? 'text-brand-charcoal-light' : 'text-zinc-300'}`}>
                            {stage.description}
                         </p>
                      </div>
                    </motion.div>
                  );
                })}
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
