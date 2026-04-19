'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

interface Ingredient {
  id: string;
  name: string;
  price: number;
  type: string;
}

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: {
    id: string;
    name: string;
    basePrice: number;
    description: string;
  };
  availableIngredients: Ingredient[];
  standardIngredientIds: string[];
}

export function CustomizerModal({
  isOpen,
  onClose,
  recipe,
  availableIngredients,
  standardIngredientIds,
}: CustomizerModalProps) {
  const t = useTranslations('Menu');
  const addItem = useCartStore((state) => state.addItem);
  
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [totalPrice, setTotalPrice] = useState(recipe.basePrice);

  useEffect(() => {
    if (isOpen) {
      const initial = availableIngredients.filter(i => standardIngredientIds.includes(i.id));
      setSelectedIngredients(initial);
    }
  }, [isOpen, availableIngredients, standardIngredientIds]);

  useEffect(() => {
    const extraPrice = selectedIngredients
      .filter(i => !standardIngredientIds.includes(i.id))
      .reduce((acc, i) => acc + i.price, 0);
    setTotalPrice(recipe.basePrice + extraPrice);
  }, [selectedIngredients, recipe.basePrice, standardIngredientIds]);

  const toggleIngredient = (ingredient: Ingredient) => {
    if (selectedIngredients.some(i => i.id === ingredient.id)) {
      // If it's a standard one, maybe we allow removing it (removed from list)
      setSelectedIngredients(selectedIngredients.filter(i => i.id !== ingredient.id));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleAddToCart = () => {
    addItem({
      recipeId: recipe.id,
      name: recipe.name,
      basePrice: recipe.basePrice,
      totalPrice: totalPrice,
      selectedIngredients: selectedIngredients.map(i => ({ id: i.id, name: i.name, price: i.price })),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-brand-charcoal/5 flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-2">{recipe.name}</h2>
              <p className="text-brand-charcoal-light text-sm italic">{recipe.description}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-brand-red/5 rounded-full transition-colors text-brand-charcoal">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8">
            <h3 className="text-lg font-bold text-brand-charcoal mb-6 flex items-center gap-2">
              Extra Toppings
              <span className="text-xs font-normal text-brand-charcoal-light px-2 py-1 bg-brand-charcoal/5 rounded-lg">Variable Pricing</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableIngredients.map((ingredient) => {
                const isSelected = selectedIngredients.some(i => i.id === ingredient.id);
                const isStandard = standardIngredientIds.includes(ingredient.id);

                return (
                  <button
                    key={ingredient.id}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-brand-red bg-brand-red/5' 
                        : 'border-brand-charcoal/5 hover:border-brand-charcoal/20'
                    }`}
                  >
                    <div>
                      <p className={`font-bold text-sm ${isSelected ? 'text-brand-red' : 'text-brand-charcoal'}`}>
                        {ingredient.name}
                      </p>
                      <p className="text-xs text-brand-charcoal-light">
                        {isStandard ? 'Standard' : `+ ${formatCurrency(ingredient.price)}`}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'bg-brand-red text-white' : 'bg-brand-charcoal/5 text-transparent'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-brand-cream/10 border-t border-brand-charcoal/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs text-brand-charcoal-light uppercase tracking-widest font-bold mb-1">Total Price</p>
              <p className="text-4xl font-serif font-black text-brand-red">{formatCurrency(totalPrice)}</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-12 py-5 bg-brand-red text-white rounded-full font-bold text-lg hover:bg-brand-red-light transition-all shadow-xl hover:shadow-brand-red/40 flex items-center justify-center gap-3"
            >
              <Plus className="w-5 h-5" />
              {t('add_to_cart')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
